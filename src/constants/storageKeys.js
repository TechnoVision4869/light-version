export const PROJECT_STORAGE_KEY = "selectedProject";
export const DEVELOPER_STORAGE_KEY = "selectedDeveloperId";
// Last-known-good Home idle video and project intro video ({ url, type } each), refreshed
// on every successful project load. Used to show a placeholder on a hard reload of /home,
// while the real project data is being re-fetched/enriched — see Home.jsx's
// ReloadLoadingSplash and APP_CONFIG.RELOAD_PLACEHOLDER_SOURCE.
export const HOME_IDLE_VIDEO_STORAGE_KEY = "homeIdleVideo";
export const PROJECT_INTRO_VIDEO_STORAGE_KEY = "projectIntroVideo";
