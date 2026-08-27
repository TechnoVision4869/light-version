import { jsPDF } from "jspdf";
import TECHNO_LOGO from "../assets/techno-logo-black.png";
import { APP_CONFIG } from "../config/appConfig";
import { developerApi } from "../api/admin/developerApi";
import { assetApi } from "../api/admin/assetApi";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

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
    if (!developerId || APP_CONFIG.USE_STATIC) return null;
    try {
        const developer = await developerApi.getById(developerId);
        const logoAssetId = developer?.logoAssetId ?? developer?.data?.logoAssetId;
        if (!logoAssetId) return null;
        const url = await assetApi.getAssetFileUrl(logoAssetId);
        return await loadImageAsPng(url);
    } catch {
        return null;
    }
}

function containSize(naturalW, naturalH, maxW, maxH) {
    const scale = Math.min(maxW / naturalW, maxH / naturalH);
    return { w: naturalW * scale, h: naturalH * scale };
}

function sanitizeFilename(name) {
    return (name || "Unit").trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
}

export async function generateUnitBrochure(unit, unitType, { floorPlanRotationDeg = APP_CONFIG.FLOOR_PLAN_ROTATION_DEG, developerId } = {}) {
    const galleryList = unitType?.gallery || [];
    const cutSectionsList = unitType?.cutSections || [];
    const floorPlansList = unitType?.floorPlans || [];

    const [technoLogo, developerLogo, gallery, cutSections, floorPlans] = await Promise.all([
        loadImageAsPng(TECHNO_LOGO),
        loadDeveloperLogo(developerId),
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

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let cursorY = MARGIN;

    // ---- Cover / Overview ----
    if (headerLogo) {
        const { w, h } = containSize(headerLogo.width, headerLogo.height, 30, 14);
        doc.addImage(headerLogo.dataURL, "PNG", PAGE_WIDTH - MARGIN - w, MARGIN, w, h);
    }

    doc.setFont(undefined, "bold");
    doc.setFontSize(20);
    const title = unit?.displayName || unit?.name || "Unit";
    doc.text(title, MARGIN, cursorY + 8);
    cursorY += 16;

    const heroImage = galleryLoaded[0] || floorPlansLoaded[0] || null;
    if (heroImage) {
        const maxHeroHeight = 110;
        const { w, h } = containSize(heroImage.width, heroImage.height, CONTENT_WIDTH, maxHeroHeight);
        const x = MARGIN + (CONTENT_WIDTH - w) / 2;
        doc.addImage(heroImage.dataURL, "PNG", x, cursorY, w, h);
        cursorY += h + 10;
    }

    const facts = [];
    if (unit?.price != null) facts.push(["Price", `${unit.price.toLocaleString()} SAR`]);
    if (unitType?.area != null) facts.push(["Area", `${Math.round(unitType.area)} m²`]);
    if (unitType?.roofarea) facts.push(["Roof Area", `${Math.round(unitType.roofarea)} m²`]);
    if (unit?.bedrooms != null) facts.push(["Bedrooms", String(unit.bedrooms)]);
    if (unit?.bathrooms != null) facts.push(["Bathrooms", String(unit.bathrooms)]);
    if (unitType?.serviceRooms?.length) facts.push(["Service Rooms", unitType.serviceRooms.map(room => room.name).join(", ")]);

    doc.setFont(undefined, "normal");
    doc.setFontSize(12);
    facts.forEach(([label, value]) => {
        doc.setFont(undefined, "bold");
        doc.text(`${label}:`, MARGIN, cursorY);
        doc.setFont(undefined, "normal");
        doc.text(String(value), MARGIN + 45, cursorY);
        cursorY += 8;
    });

    // ---- Payment Plans ----
    const paymentPlans = unitType?.paymentPlans || [];
    if (paymentPlans.length > 0) {
        const rowHeight = 9;
        const tableHeight = 12 + rowHeight * (paymentPlans.length + 1);
        if (cursorY + tableHeight > PAGE_HEIGHT - MARGIN - 12) {
            doc.addPage();
            cursorY = MARGIN;
        } else {
            cursorY += 6;
        }

        doc.setFont(undefined, "bold");
        doc.setFontSize(14);
        doc.text("Payment Plans", MARGIN, cursorY);
        cursorY += 8;

        const colWidth = CONTENT_WIDTH / 3;
        const columns = [
            { label: "Down Payment", value: (plan) => `${Number(plan.downPayment).toLocaleString()} SAR` },
            { label: "Monthly", value: (plan) => `${Number(plan.monthlyPayment).toLocaleString()} SAR` },
            { label: "Years", value: (plan) => String(plan.years) },
        ];

        doc.setFillColor(230, 230, 230);
        doc.rect(MARGIN, cursorY, CONTENT_WIDTH, rowHeight, "F");
        doc.setFont(undefined, "bold");
        doc.setFontSize(11);
        columns.forEach((col, i) => {
            doc.text(col.label, MARGIN + colWidth * i + colWidth / 2, cursorY + rowHeight / 2 + 1.5, { align: "center" });
        });
        cursorY += rowHeight;

        doc.setFont(undefined, "normal");
        paymentPlans.forEach((plan, rowIndex) => {
            if (rowIndex % 2 === 1) {
                doc.setFillColor(245, 245, 245);
                doc.rect(MARGIN, cursorY, CONTENT_WIDTH, rowHeight, "F");
            }
            columns.forEach((col, i) => {
                doc.text(col.value(plan), MARGIN + colWidth * i + colWidth / 2, cursorY + rowHeight / 2 + 1.5, { align: "center" });
            });
            cursorY += rowHeight;
        });

        doc.setDrawColor(200, 200, 200);
        doc.rect(MARGIN, cursorY - rowHeight * (paymentPlans.length + 1), CONTENT_WIDTH, rowHeight * (paymentPlans.length + 1));
        for (let i = 1; i < columns.length; i++) {
            const x = MARGIN + colWidth * i;
            doc.line(x, cursorY - rowHeight * (paymentPlans.length + 1), x, cursorY);
        }
        cursorY += 6;
    }

    // ---- Floor Plans ----
    if (floorPlansLoaded.length > 0) {
        floorPlansLoaded.forEach((img, i) => {
            doc.addPage();
            doc.setFont(undefined, "bold");
            doc.setFontSize(16);
            doc.text("Floor Plan", MARGIN, MARGIN);
            const caption = floorPlansLoaded.length > 1 ? `Floor Plan ${i + 1} of ${floorPlansLoaded.length}` : null;
            const maxH = PAGE_HEIGHT - MARGIN * 2 - 14 - (caption ? 8 : 0);
            const { w, h } = containSize(img.width, img.height, CONTENT_WIDTH, maxH);
            const x = MARGIN + (CONTENT_WIDTH - w) / 2;
            const y = MARGIN + 14;
            doc.addImage(img.dataURL, "PNG", x, y, w, h);
            if (caption) {
                doc.setFont(undefined, "normal");
                doc.setFontSize(10);
                doc.text(caption, MARGIN, y + h + 6);
            }
        });
    }

    // ---- Gallery / Cut Sections (2-per-page grid) ----
    const renderGridSection = (heading, images) => {
        if (images.length === 0) return;
        const cellHeight = (PAGE_HEIGHT - MARGIN * 2 - 20) / 2;
        images.forEach((img, i) => {
            if (i % 2 === 0) {
                doc.addPage();
                doc.setFont(undefined, "bold");
                doc.setFontSize(16);
                doc.text(heading, MARGIN, MARGIN);
            }
            const slot = i % 2;
            const slotY = MARGIN + 14 + slot * (cellHeight + 6);
            const { w, h } = containSize(img.width, img.height, CONTENT_WIDTH, cellHeight);
            const x = MARGIN + (CONTENT_WIDTH - w) / 2;
            doc.addImage(img.dataURL, "PNG", x, slotY, w, h);
        });
    };

    renderGridSection("Gallery", galleryLoaded.slice(heroImage && galleryLoaded[0] === heroImage ? 1 : 0));
    renderGridSection("Cut Sections", cutSectionsLoaded);

    // ---- Footer on every page ----
    const pageCount = doc.internal.getNumberOfPages();
    const generatedOn = new Date().toLocaleDateString();
    const footerLogoSize = technoLogo ? containSize(technoLogo.width, technoLogo.height, 20, 8) : null;
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont(undefined, "normal");
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`Page ${i} of ${pageCount}`, MARGIN, PAGE_HEIGHT - 10);
        if (footerLogoSize) {
            doc.text(`Generated ${generatedOn}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10, { align: "right" });
            doc.addImage(
                technoLogo.dataURL, "PNG",
                PAGE_WIDTH - MARGIN - footerLogoSize.w, PAGE_HEIGHT - 10 - 5 - footerLogoSize.h,
                footerLogoSize.w, footerLogoSize.h,
            );
        } else {
            doc.text(`Generated ${generatedOn}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10, { align: "right" });
        }
        doc.setTextColor(0);
    }

    doc.save(`${sanitizeFilename(title)}-Brochure.pdf`);

    return { anyImageFailed };
}
