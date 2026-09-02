// Maps a developer id to a loader resolving that developer's project data module into a
// normalized { config, projectPath, DEVELOPER } shape. Every entry is a dynamic import() —
// no developer is treated as a special eager default (see state-management.md) — so large
// static project trees (some project-*.js files run 1000-5000+ lines) are only fetched if
// that developer is actually picked. Matches the jspdf/generateUnitBrochure.js lazy-load
// precedent from CLAUDE.md, load-bearing here for this app's weak-connectivity constraint.
export const DEVELOPER_REGISTRY = {
  // Alawaly
  "89861284-a76d-45d8-aceb-e6bfdaf83599": () =>
    import("./siwar").then((m) => ({
      DEVELOPER: m.DEVELOPER_ALAWALY,
      projectPath: m.projectPath,
      config: m.config,
    })),
  // Techno Vision eBrochure
  "eb6caa42-48b8-47b2-aaa7-1ebface43e95": () =>
    import("./project-lightlight").then((m) => ({
      DEVELOPER: m.DEVELOPER_SOMABAY,
      projectPath: m.projectPath,
      config: m.config,
    })),
  // The Blissful Key
  "573cc8eb-36b2-4192-afef-9ba2adf7bd60": () =>
    import("./project-kog").then((m) => ({
      DEVELOPER: m.DEVELOPER_TBK,
      projectPath: m.projectPath,
      config: m.config,
    })),
};

// Safe shape returned while a developer's config chunk is loading, or for an id not (yet)
// registered — consumers can read these fields without null-checking every time.
export const FALLBACK_RESOLVED = {
  DEVELOPER: null,
  projectPath: null,
  config: {
    USE_PREDEFINED_POS: false,
    PREDEFINED_POS: { x: 0.5, y: 0.5 },
    USE_HOTSPOTS: false,
  },
};

// Resolves a developer id through the registry, merging the module's config over
// FALLBACK_RESOLVED's defaults for any field it doesn't set (e.g. project-lightlight.js has
// no PREDEFINED_POS) — preserves appConfig.js's old per-project fallback, now per-developer.
export async function resolveDeveloperData(developerId) {
  const loader = DEVELOPER_REGISTRY[developerId];
  if (!loader) return FALLBACK_RESOLVED;
  const resolved = await loader();
  return {
    ...resolved,
    config: { ...FALLBACK_RESOLVED.config, ...resolved.config },
  };
}
