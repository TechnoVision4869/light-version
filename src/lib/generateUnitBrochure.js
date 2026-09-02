import { jsPDF } from "jspdf";
import TECHNO_LOGO from "../assets/techno-logo-black.png";
import { APP_CONFIG } from "../config/appConfig";
import { AssetType } from "../components/admin/types";
import { PAYMENT_MILESTONES, formatMoney } from "./paymentSchedule";
import { DEVELOPER_ALAWALY as DATA } from "../data/siwar";
import { getCachedDeveloperLogo } from "./developerLogoCache";
import EB_GARAMOND_REGULAR_URL from "../fonts/EB_Garamond/static/EBGaramond-Regular.ttf?url";
import EB_GARAMOND_BOLD_URL from "../fonts/EB_Garamond/static/EBGaramond-Bold.ttf?url";

const FONT_FAMILY = "EBGaramond";

const PAGE_WIDTH = 297;
const PAGE_HEIGHT = 210;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
// Every page repeats a banner (unit name + logo) in the MARGIN..MARGIN+14 band — page content
// starts below that, not at MARGIN, so it never overlaps.
const CONTENT_START_Y = MARGIN + 20;

// Rotating the pixels themselves (rather than using jsPDF's addImage rotation option) keeps
// every downstream size/centering calculation unchanged — jsPDF rotates around the unrotated
// box's bottom-left corner, not its center, which would otherwise need special-cased placement
// math for every 90°/-90° case.
function rotateBitmap(bitmap, degrees) {
    const isQuarterTurn = Math.abs(degrees % 180) === 90;
    const canvas = document.createElement("canvas");
    canvas.width = isQuarterTurn ? bitmap.height : bitmap.width;
    canvas.height = isQuarterTurn ? bitmap.width : bitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);
    return canvas;
}

async function loadImageAsPng(url, rotationDegrees = 0) {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const blob = await res.blob();
        const bitmap = await createImageBitmap(blob);
        const canvas = rotationDegrees
            ? rotateBitmap(bitmap, rotationDegrees)
            : (() => {
                const c = document.createElement("canvas");
                c.width = bitmap.width;
                c.height = bitmap.height;
                c.getContext("2d").drawImage(bitmap, 0, 0);
                return c;
            })();
        return {
            dataURL: canvas.toDataURL("image/png"),
            width: canvas.width,
            height: canvas.height,
        };
    } catch {
        return null;
    }
}

async function loadDeveloperLogo(developerId) {
    if (APP_CONFIG.USE_STATIC) {
        return DATA.developerLogo ? loadImageAsPng(DATA.developerLogo) : null;
    }
    // Reuses the URL ProjectSelector already resolved (developerApi.getById + asset lookup)
    // when it first loaded the developer's assets, instead of re-fetching it here.
    const cachedUrl = getCachedDeveloperLogo(developerId);
    return cachedUrl ? loadImageAsPng(cachedUrl) : null;
}

async function loadFontBase64(url) {
    const res = await fetch(url);
    const bytes = new Uint8Array(await res.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
}

// Embeds EB Garamond (regular + bold; no italic weight is used anywhere in this document)
// into the PDF so text renders in a serif face instead of jsPDF's built-in Helvetica/Times.
async function registerBrochureFont(doc) {
    const [regular, bold] = await Promise.all([
        loadFontBase64(EB_GARAMOND_REGULAR_URL),
        loadFontBase64(EB_GARAMOND_BOLD_URL),
    ]);
    doc.addFileToVFS("EBGaramond-Regular.ttf", regular);
    doc.addFont("EBGaramond-Regular.ttf", FONT_FAMILY, "normal");
    doc.addFileToVFS("EBGaramond-Bold.ttf", bold);
    doc.addFont("EBGaramond-Bold.ttf", FONT_FAMILY, "bold");
}

// Streams the video directly (rather than fetch+blob like loadImageAsPng) so only the bytes
// needed to reach the seek point are downloaded — fetching the whole file just for one frame
// would be wasteful on the weak connections this app targets. Risk: if `/assets/file/*` doesn't
// return permissive CORS headers (an already-known, unconfirmed gap — see BACKEND_GAPS.md), the
// canvas ends up tainted and toDataURL throws; caught below and treated as a normal failure.
function captureVideoFrame(url, timeoutMs = 8000) {
    return new Promise((resolve) => {
        const video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        let settled = false;

        const finish = (result) => {
            if (settled) return;
            settled = true;
            clearTimeout(timeoutId);
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            video.removeEventListener("seeked", onSeeked);
            video.removeEventListener("error", onError);
            video.src = "";
            resolve(result);
        };

        const timeoutId = setTimeout(() => finish(null), timeoutMs);

        const onLoadedMetadata = () => {
            video.currentTime = Math.min(0.1, video.duration || 0);
        };

        const onSeeked = () => {
            try {
                const canvas = document.createElement("canvas");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext("2d").drawImage(video, 0, 0);
                finish({
                    dataURL: canvas.toDataURL("image/png"),
                    width: canvas.width,
                    height: canvas.height,
                });
            } catch {
                finish(null);
            }
        };

        const onError = () => finish(null);

        video.addEventListener("loadedmetadata", onLoadedMetadata);
        video.addEventListener("seeked", onSeeked);
        video.addEventListener("error", onError);
        video.src = url;
    });
}

async function loadHeroImage(unit, useStatic) {
    const idleUrl = useStatic
        ? unit?.videos?.idleVideo
        : (unit?.sideVideoId || unit?.idleAssetId || unit?.sideAssetId);
    if (!idleUrl) return null;

    const isImage = useStatic
        ? /\.(png|jpe?g|webp|avif)$/i.test(idleUrl)
        : [unit?.sideVideoType, unit?.idleAssetType, unit?.sideAssetType]
            .some((t) => t === AssetType.IMAGE || t === AssetType.THUMBNAIL);

    return isImage ? loadImageAsPng(idleUrl) : captureVideoFrame(idleUrl);
}

function containSize(naturalW, naturalH, maxW, maxH) {
    const scale = Math.min(maxW / naturalW, maxH / naturalH);
    return { w: naturalW * scale, h: naturalH * scale };
}

function sanitizeFilename(name) {
    return (name || "Unit").trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
}

// Puts a single image alone on its own page (landscape has the width for a much bigger
// image than the old 2-per-page grid did) with a small centered heading/caption, leaving
// room for the repeating header banner above and footer below. Used for the hero image
// and every floor plan / gallery / cut section image. Pass startNewPage: false when the
// image belongs on the document's current (already blank) page rather than a fresh one —
// e.g. the hero image on page 1.
function renderImagePage(doc, heading, img, caption, startNewPage = true) {
    if (startNewPage) doc.addPage();
    doc.setFont(FONT_FAMILY, "bold");
    doc.setFontSize(16);
    doc.text(heading, PAGE_WIDTH / 2, CONTENT_START_Y, { align: "center" });

    const top = CONTENT_START_Y + 6;
    const maxH = PAGE_HEIGHT - top - MARGIN - (caption ? 8 : 0);
    const { w, h } = containSize(img.width, img.height, CONTENT_WIDTH, maxH);
    const x = MARGIN + (CONTENT_WIDTH - w) / 2;
    doc.addImage(img.dataURL, "PNG", x, top, w, h);

    if (caption) {
        doc.setFont(FONT_FAMILY, "normal");
        doc.setFontSize(10);
        doc.text(caption, PAGE_WIDTH / 2, top + h + 6, { align: "center" });
    }
}

// Draws a titled, zebra-striped table (header row + gridlines) starting at cursorY,
// paginating first if it wouldn't fit on the current page. Returns the new cursorY.
function renderTable(doc, cursorY, title, columns, rows) {
    const rowHeight = 9;
    const tableHeight = 12 + rowHeight * (rows.length + 1);
    if (cursorY + tableHeight > PAGE_HEIGHT - MARGIN - 12) {
        doc.addPage();
        cursorY = CONTENT_START_Y;
    } else {
        cursorY += 6;
    }

    doc.setFont(FONT_FAMILY, "bold");
    doc.setFontSize(14);
    doc.text(title, PAGE_WIDTH / 2, cursorY, { align: "center" });
    cursorY += 8;

    const colWidth = CONTENT_WIDTH / columns.length;

    doc.setFillColor(230, 230, 230);
    doc.rect(MARGIN, cursorY, CONTENT_WIDTH, rowHeight, "F");
    doc.setFont(FONT_FAMILY, "bold");
    doc.setFontSize(11);
    columns.forEach((col, i) => {
        doc.text(col.label, MARGIN + colWidth * i + colWidth / 2, cursorY + rowHeight / 2 + 1.5, { align: "center" });
    });
    cursorY += rowHeight;

    doc.setFont(FONT_FAMILY, "normal");
    rows.forEach((row, rowIndex) => {
        if (rowIndex % 2 === 1) {
            doc.setFillColor(245, 245, 245);
            doc.rect(MARGIN, cursorY, CONTENT_WIDTH, rowHeight, "F");
        }
        columns.forEach((col, i) => {
            doc.text(col.value(row), MARGIN + colWidth * i + colWidth / 2, cursorY + rowHeight / 2 + 1.5, { align: "center" });
        });
        cursorY += rowHeight;
    });

    doc.setDrawColor(200, 200, 200);
    doc.rect(MARGIN, cursorY - rowHeight * (rows.length + 1), CONTENT_WIDTH, rowHeight * (rows.length + 1));
    for (let i = 1; i < columns.length; i++) {
        const x = MARGIN + colWidth * i;
        doc.line(x, cursorY - rowHeight * (rows.length + 1), x, cursorY);
    }
    return cursorY + 6;
}

export async function generateUnitBrochure(unit, unitType, { floorPlanRotationDeg = APP_CONFIG.FLOOR_PLAN_ROTATION_DEG, developerId } = {}) {
    const galleryList = unitType?.gallery || [];
    const cutSectionsList = unitType?.cutSections || [];
    const floorPlansList = unitType?.floorPlans || [];

    const [technoLogo, developerLogo, idleHero, gallery, cutSections, floorPlans] = await Promise.all([
        loadImageAsPng(TECHNO_LOGO),
        loadDeveloperLogo(developerId),
        loadHeroImage(unit, APP_CONFIG.USE_STATIC),
        Promise.all(galleryList.map((img) => loadImageAsPng(img.src))),
        Promise.all(cutSectionsList.map((img) => loadImageAsPng(img.src))),
        Promise.all(floorPlansList.map((img) => loadImageAsPng(img.src, floorPlanRotationDeg))),
    ]);
    const headerLogo = developerLogo || technoLogo;

    const galleryLoaded = gallery.filter(Boolean);
    const cutSectionsLoaded = cutSections.filter(Boolean);
    const floorPlansLoaded = floorPlans.filter(Boolean);
    const anyImageFailed =
        galleryLoaded.length < galleryList.length ||
        cutSectionsLoaded.length < cutSectionsList.length ||
        floorPlansLoaded.length < floorPlansList.length;

    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
    await registerBrochureFont(doc);
    const title = unit?.displayName || unit?.name || "Unit";

    // ---- Unit View (page 1, alone) ----
    const heroImage = idleHero || galleryLoaded[0] || floorPlansLoaded[0] || null;
    if (heroImage) {
        renderImagePage(doc, "Unit View", heroImage, null, false);
        doc.addPage();
    }

    let cursorY = CONTENT_START_Y;

    // ---- Unit Overview ----
    doc.setFont(FONT_FAMILY, "bold");
    doc.setFontSize(14);
    doc.text("Unit Overview", PAGE_WIDTH / 2, cursorY, { align: "center" });
    cursorY += 10;

    const facts = [];
    if (unit?.price != null) facts.push(["Price", `${unit.price.toLocaleString()} SAR`]);
    if (unitType?.area != null) facts.push(["Area", `${Math.round(unitType.area)} m²`]);
    if (unitType?.roofarea) facts.push(["Roof Area", `${Math.round(unitType.roofarea)} m²`]);
    if (unit?.bedrooms != null) facts.push(["Bedrooms", String(unit.bedrooms)]);
    if (unit?.bathrooms != null) facts.push(["Bathrooms", String(unit.bathrooms)]);

    doc.setFont(FONT_FAMILY, "normal");
    doc.setFontSize(12);
    facts.forEach(([label, value]) => {
        doc.setFont(FONT_FAMILY, "bold");
        doc.text(`${label}:`, MARGIN, cursorY);
        doc.setFont(FONT_FAMILY, "normal");
        doc.text(String(value), MARGIN + 45, cursorY);
        cursorY += 8;
    });

    const services = unitType?.serviceRooms || [];
    if (services.length > 0) {
        cursorY += 4;
        doc.setFont(FONT_FAMILY, "bold");
        doc.setFontSize(12);
        doc.text("Services", MARGIN, cursorY);
        cursorY += 8;
        doc.setFont(FONT_FAMILY, "normal");
        services.forEach((room) => {
            doc.text(`•  ${room.name}`, MARGIN + 4, cursorY);
            cursorY += 7;
        });
    }
    cursorY += 6;

    // ---- Payment Plans ----
    const paymentPlans = unitType?.paymentPlans || [];
    if (paymentPlans.length > 0) {
        const hasYears = paymentPlans.some((plan) => Number(plan.years) > 0);
        const columns = [
            { label: "Down Payment", value: (plan) => `${Number(plan.downPayment).toLocaleString()} SAR` },
            { label: "Monthly", value: (plan) => `${Number(plan.monthlyPayment).toLocaleString()} SAR` },
        ];
        if (hasYears) {
            columns.push({ label: "Years", value: (plan) => (Number(plan.years) > 0 ? String(plan.years) : "") });
        }
        cursorY = renderTable(doc, cursorY, "Payment Plans", columns, paymentPlans);
    }

    // ---- Payment Schedule ----
    // Mirrors the milestone breakdown shown in the in-app PaymentPlanSchedule overlay.
    // Paid/Due status is deliberately omitted — it's illustrative (first N rows hardcoded
    // as "paid"), not a real buyer's actual payment status, so it doesn't belong in
    // pre-sale collateral handed to any prospective buyer.
    if (unit?.price > 0) {
        const scheduleRows = PAYMENT_MILESTONES.map((milestone, index) => ({
            ...milestone,
            paymentNumber: index + 1,
            amount: unit.price * (milestone.percent / 100),
        }));
        const scheduleColumns = [
            { label: "Payment", value: (row) => `Payment ${row.paymentNumber}` },
            { label: "%", value: (row) => `${row.percent}%` },
            { label: "Amount", value: (row) => formatMoney(row.amount) },
            { label: "Collected", value: (row) => `${row.collected}%` },
            { label: "Construction", value: (row) => row.milestone ?? `${row.progress}%` },
        ];
        cursorY = renderTable(doc, cursorY, "Payment Schedule", scheduleColumns, scheduleRows);
    }

    // ---- Remaining image pages: one image alone per page, nothing else on it ----
    floorPlansLoaded.forEach((img, i) => {
        const caption = floorPlansLoaded.length > 1 ? `Floor Plan ${i + 1} of ${floorPlansLoaded.length}` : null;
        renderImagePage(doc, "Floor Plan", img, caption);
    });

    const galleryToRender = galleryLoaded.slice(heroImage && galleryLoaded[0] === heroImage ? 1 : 0);
    galleryToRender.forEach((img) => {
        renderImagePage(doc, "Gallery", img, null);
    });

    cutSectionsLoaded.forEach((img, i) => {
        const caption = cutSectionsLoaded.length > 1 ? `Cut Section ${i + 1} of ${cutSectionsLoaded.length}` : null;
        renderImagePage(doc, "Cut Sections", img, caption);
    });

    // ---- Header banner + footer on every page ----
    const pageCount = doc.internal.getNumberOfPages();
    const footerLogoSize = technoLogo ? containSize(technoLogo.width, technoLogo.height, 20, 8) : null;
    const headerLogoSize = headerLogo ? containSize(headerLogo.width, headerLogo.height, 30, 14) : null;
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont(FONT_FAMILY, "bold");
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text(title, MARGIN, MARGIN + 9);
        if (headerLogoSize) {
            doc.addImage(
                headerLogo.dataURL, "PNG",
                PAGE_WIDTH - MARGIN - headerLogoSize.w, MARGIN, headerLogoSize.w, headerLogoSize.h,
            );
        }
        doc.setFont(FONT_FAMILY, "normal");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH / 2, PAGE_HEIGHT - 10, { align: "center" });
        if (footerLogoSize) {
            doc.addImage(
                technoLogo.dataURL, "PNG",
                PAGE_WIDTH - MARGIN - footerLogoSize.w, PAGE_HEIGHT - 10 - 5 - footerLogoSize.h,
                footerLogoSize.w, footerLogoSize.h,
            );
        }
        doc.setTextColor(0);
    }

    doc.save(`${sanitizeFilename(title)}-Brochure.pdf`);

    return { anyImageFailed };
}
