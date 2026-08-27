import { useState } from "react";
import { HOME_IDLE_VIDEO_STORAGE_KEY, PROJECT_INTRO_VIDEO_STORAGE_KEY } from "../constants/storageKeys";
import { APP_CONFIG, RELOAD_PLACEHOLDER_SOURCE } from "../config/appConfig";
import { AssetType } from "./admin/types";

function readCachedVideo(storageKey) {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Covers the screen with a cached placeholder (cached by SidebarContextProvider on every
// successful load) while a hard reload of /home re-fetches and re-enriches the project —
// replacing what would otherwise be a multi-second blank screen. Unmount once currentProject
// is ready; Home's own video viewer picks up the real assets, so the handoff stays smooth.
//
// APP_CONFIG.RELOAD_PLACEHOLDER_SOURCE picks which cached video is preferred — the project's
// Home idle loop (visually seamless handoff, since it's the exact state Home settles into) or
// its intro/zoomout video (matches the normal selection→Home flow). Falls back to whichever
// one is actually cached if the preferred source hasn't been cached yet.
export default function ReloadLoadingSplash() {
  const [cached] = useState(() => {
    const idle = readCachedVideo(HOME_IDLE_VIDEO_STORAGE_KEY);
    const intro = readCachedVideo(PROJECT_INTRO_VIDEO_STORAGE_KEY);
    const preferIntro = APP_CONFIG.RELOAD_PLACEHOLDER_SOURCE === RELOAD_PLACEHOLDER_SOURCE.INTRO;
    return (preferIntro ? intro : idle) ?? (preferIntro ? idle : intro) ?? null;
  });

  if (!cached?.url) return null;

  const isImage = cached.type === AssetType.IMAGE || cached.type === AssetType.THUMBNAIL;

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {isImage ? (
        <img src={cached.url} className="w-full h-full object-cover" alt="" />
      ) : (
        <video
          className="w-full h-full object-cover"
          src={cached.url}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
        />
      )}
    </div>
  );
}
