import { useEffect } from "react";

export default function InfoOverlay({ info, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!info) return null;

  return (
    <div className="info-overlay" onClick={onClose}>
      <div className="info-overlay-content" onClick={(e) => e.stopPropagation()}>
        <button className="info-overlay-close" onClick={onClose}>×</button>
        {info.infoType === "image" ? (
          <img src={info.infoContent} alt={info.label} className="info-overlay-image" />
        ) : (
          <div className="info-overlay-text">
            <h3>{info.label}</h3>
            <p>{info.infoContent}</p>
          </div>
        )}
      </div>
    </div>
  );
}
