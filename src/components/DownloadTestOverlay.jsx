import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchProjectById } from "../lib/projectFetcher";
import { assetApi } from "../api/admin/assetApi";
import {
  enrichProjectData,
  prefetchProjectByLevels,
  getLevelAssetTotal,
  collectAssetUrls,
} from "../lib/enrichProjectData";

// Must match CACHE_ASSETS in public/sw.js — duplicated here since the service
// worker runs in a separate execution context and can't be imported from.
const CACHE_ASSETS = "techno-vision-assets-v4";

async function isProjectFullyCached(urls) {
  if (!urls.length) return true;
  const cache = await caches.open(CACHE_ASSETS);
  const matches = await Promise.all(urls.map((url) => cache.match(url)));
  return matches.every(Boolean);
}

/**
 * Standalone visual test rig for the Phase 0 offline-download spike.
 * Not wired into any shared state — session-only, throwaway UI to watch a
 * real download run on-device before the full "My Offline Projects" overlay
 * (separate plan) gets built on top of validated storage behavior.
 */
export default function DownloadTestOverlay({ projects, developerId, useStatic }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? "");
  const [state, setState] = useState({ status: "idle", loaded: 0, total: 0, failedItems: [] });

  const percent = state.total > 0 ? Math.round((state.loaded / state.total) * 100) : 0;

  // Fetches + enriches a project, resolving all *AssetId/*VideoId fields to
  // real URLs, without triggering enrichProjectData's own internal preload
  // (preloadDepth: -1) so callers can drive/inspect levels themselves.
  const fetchAndEnrichProject = async (projectId) => {
    const rawProject = await fetchProjectById(projectId, useStatic);
    if (!rawProject) throw new Error(`Project ${projectId} not found`);

    // Project entities never carry their own developerId — merge in the one
    // known from selection context, same as SidebarContextProvider does.
    const projectToEnrich = developerId
      ? { ...rawProject, developerId: rawProject.developerId || developerId }
      : rawProject;

    return enrichProjectData(projectToEnrich, useStatic, -1);
  };

  // Re-verifies against real Cache Storage contents rather than trusting
  // component state, which resets whenever this overlay unmounts (e.g.
  // navigating into a project and back) — so a project downloaded earlier
  // this session is correctly detected as still cached.
  const checkDownloadStatus = async (projectId) => {
    if (!projectId) return;
    setState({ status: "checking", loaded: 0, total: 0, failedItems: [] });

    try {
      const enrichedProject = await fetchAndEnrichProject(projectId);
      const urls = collectAssetUrls(enrichedProject, 3, 0);
      const cached = await isProjectFullyCached(urls);
      setState({
        status: cached ? "downloaded" : "idle",
        loaded: cached ? urls.length : 0,
        total: urls.length,
        failedItems: [],
      });
    } catch (error) {
      console.error(`Failed to check cache status for project ${projectId}:`, error);
      setState({ status: "idle", loaded: 0, total: 0, failedItems: [] });
    }
  };

  useEffect(() => {
    if (panelOpen) checkDownloadStatus(selectedProjectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelOpen, selectedProjectId]);

  // Resolves each failed asset URL's trailing id segment to a human-readable
  // name via the developer's asset list (same pattern as enrichProjectData's
  // buildAssetTypeMap), falling back to the raw value when it isn't a real
  // asset id at all (e.g. a mistyped label like "Location View").
  const resolveFailedLabels = async (urls) => {
    let idToName = new Map();
    if (developerId) {
      try {
        const data = await assetApi.getByDeveloper({ developerId, limit: 1000 });
        const assets = Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
        idToName = new Map(assets.map((a) => [a.id, a.assetKey || a.name || a.id]));
      } catch (error) {
        console.error("Failed to resolve failed-asset names:", error);
      }
    }
    return urls.map((url) => {
      const rawValue = decodeURIComponent(url.split("/").pop() ?? url);
      return { url, label: idToName.get(rawValue) || rawValue };
    });
  };

  const startDownload = async () => {
    if (!selectedProjectId || state.status === "downloading" || state.status === "checking") return;

    setState({ status: "downloading", loaded: 0, total: 0, failedItems: [] });

    try {
      const enrichedProject = await fetchAndEnrichProject(selectedProjectId);

      const levels = [0, 1, 2, 3];
      const grandTotal = levels.reduce((sum, level) => sum + getLevelAssetTotal(enrichedProject, level), 0);

      setState({ status: "downloading", loaded: 0, total: grandTotal, failedItems: [] });

      let cumulativeLoaded = 0;
      const failedUrls = [];

      for (const level of levels) {
        const result = await prefetchProjectByLevels(enrichedProject, level, level, ({ loaded }) => {
          setState({ status: "downloading", loaded: cumulativeLoaded + loaded, total: grandTotal, failedItems: [] });
        });
        cumulativeLoaded += result.loaded;
        failedUrls.push(...result.failedUrls);
      }

      if (failedUrls.length > 0) {
        const failedItems = await resolveFailedLabels(failedUrls);
        setState({ status: "failed", loaded: cumulativeLoaded, total: grandTotal, failedItems });
        toast.error(`${failedUrls.length} asset${failedUrls.length > 1 ? "s" : ""} failed to download`);
      } else {
        setState({ status: "downloaded", loaded: cumulativeLoaded, total: grandTotal, failedItems: [] });
      }
    } catch (error) {
      console.error(`Failed to download project ${selectedProjectId}:`, error);
      toast.error("Failed to download project");
      setState({ status: "failed", loaded: 0, total: 0, failedItems: [] });
    }
  };

  return (
    <div className="fixed top-5 right-6 z-50 flex flex-col items-end gap-2">
      <div className="relative flex items-center">
        {!panelOpen && (
          <div className="absolute right-14 flex items-center animate-bounce pointer-events-none">
            <div className="whitespace-nowrap bg-[#1C1C1CE6] border border-white/10 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
              Offline downloads here
            </div>
            <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-[#1C1C1CE6]" />
          </div>
        )}

        <button
          onClick={() => setPanelOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-[#1C1C1CE6] border border-white/10 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform text-2xl leading-none"
          title="Offline download"
        >
          ⬇
        </button>
      </div>

      {panelOpen && (
        <div className="w-72 rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1CE6] border border-white/10 p-4 shadow-2xl">
          <h3 className="text-white text-sm font-semibold mb-3">Offline Download</h3>

          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            disabled={state.status === "downloading" || state.status === "checking"}
            className="w-full mb-3 py-2 px-3 rounded-lg bg-[#00000066] text-white text-sm border border-white/10 disabled:opacity-50"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id} className="text-black">
                {project.name}
              </option>
            ))}
          </select>

          {state.status === "checking" ? (
            <p className="text-[#DADADA] text-[11px] mb-3">Checking cache…</p>
          ) : state.status === "downloading" ? (
            <div className="mb-3">
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="text-[#DADADA] text-[11px] text-center">
                {state.loaded} / {state.total || "…"} items ({percent}%)
              </p>
            </div>
          ) : state.status === "failed" && state.failedItems.length > 0 ? (
            <div className="mb-3">
              <p className="text-[#DADADA] text-[11px] mb-1">
                ⚠ {state.failedItems.length} asset{state.failedItems.length === 1 ? "" : "s"} failed:
              </p>
              <ul className="max-h-24 overflow-y-auto space-y-0.5">
                {state.failedItems.map((item, i) => (
                  <li key={i} className="text-[#DADADA] text-[11px] truncate" title={item.label}>
                    • {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : state.status === "failed" ? (
            <p className="text-[#DADADA] text-[11px] mb-3">⚠ Failed to load project — see console.</p>
          ) : (
            <p className="text-[#DADADA] text-[11px] mb-3">
              {state.status === "downloaded" && "✓ Downloaded — fully cached."}
              {state.status === "idle" && "Not downloaded yet."}
            </p>
          )}

          <button
            onClick={startDownload}
            disabled={state.status === "downloading" || state.status === "checking"}
            className="w-full py-2 px-4 bg-transparent border hover:bg-white hover:text-black hover:font-bold hover:border-white disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all duration-300"
          >
            {state.status === "downloading"
              ? "Downloading…"
              : state.status === "checking"
              ? "Checking…"
              : state.status === "downloaded"
              ? "Re-download"
              : state.status === "failed"
              ? "⚠ Retry Download"
              : "⬇ Start Download"}
          </button>
        </div>
      )}
    </div>
  );
}
