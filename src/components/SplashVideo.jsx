import { useState } from "react";

export default function SplashVideo({ src, onFinished, onFadeStart }) {
  const [fading, setFading] = useState(false);

  const handleDone = () => {
    setFading(true);
    if (onFadeStart) onFadeStart();
  };

  const handleTransitionEnd = () => {
    if (onFinished) onFinished();
  };

  return (
    <div
      className={`fixed inset-0 z-70 bg-black transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
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
        onEnded={handleDone}
        onError={handleDone}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
    </div>
  );
}
