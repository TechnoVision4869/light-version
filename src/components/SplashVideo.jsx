import { useRef, useState } from "react";

export default function SplashVideo({ src, onFinished, onFadeStart, onReady }) {
  const [isReady, setIsReady] = useState(false);
  const [fading, setFading] = useState(false);
  const hasStartedFadeRef = useRef(false);
  const hasCalledOnReadyRef = useRef(false);

  const startFadeOut = () => {
    if (hasStartedFadeRef.current) return;
    hasStartedFadeRef.current = true;
    setFading(true);
    if (onFadeStart) onFadeStart();
  };

  const handleDone = () => {
    startFadeOut();
  };

  const handleError = (event) => {
    const mediaErrorCode = event.currentTarget?.error?.code;
    if (mediaErrorCode) {
      console.warn("Splash video failed to load/play. MediaError code:", mediaErrorCode);
    }
    startFadeOut();
  };

  const handleTransitionEnd = () => {
    if (!fading) return;
    if (onFinished) onFinished();
  };

  const handleLoadedData = () => {
    setIsReady(true);
    // Fire onReady callback once video is loaded and visible
    if (onReady && !hasCalledOnReadyRef.current) {
      hasCalledOnReadyRef.current = true;
      onReady();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-70 bg-black transition-opacity duration-500 ${
        fading ? "opacity-0" : isReady ? "opacity-100" : "opacity-0"
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23434343' width='1' height='1'/%3E%3C/svg%3E"
        onLoadedData={handleLoadedData}
        onEnded={handleDone}
        onError={handleError}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
    </div>
  );
}
