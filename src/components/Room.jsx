import { useState, useRef } from "react";
import View360, { EquirectProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

import FURNITURE from "../assets/icons/furniture.svg";
import UNFURNITURE from "../assets/icons/un-furniture.svg";

export default function Room({ room }) {
  const ZOOM_OUT = 0.8;
  const ZOOM_NORMAL = 1;
  const ZOOM_IN = 1.333;
  const ZOOM_OUT_TIME = 600;

  const viewerRef = useRef(null);
  const [isFurnished, setIsFurnished] = useState(true);
  const [imageStatus, setImageStatus] = useState('loading'); // 'loading' | 'ok' | 'error'

  const view = isFurnished ? room.furnitureImgId : room.unfurnitureImgId;
  const projection = new EquirectProjection({ src: view });

  const handleReady = () => {
    viewerRef.current.camera.animateTo({
      zoom: ZOOM_NORMAL,
      duration: ZOOM_OUT_TIME,
    });
  };

  const errorFallback = (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/50 text-sm">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Image unavailable
    </div>
  );

  return (
    <div className="relative w-full h-full">
      {/* Hidden probe — validates URL before handing to View360 */}
      <img
        key={`probe-${view}`}
        src={view}
        alt=""
        className="hidden"
        onLoad={() => setImageStatus('ok')}
        onError={() => setImageStatus('error')}
      />

      {imageStatus === 'error' && errorFallback}

      {imageStatus === 'ok' && (
        <View360
          key={`viewer-${view}`}
          ref={viewerRef}
          className="view360-fullscreen"
          projection={projection}
          onReady={handleReady}
          initialZoom={ZOOM_NORMAL}
          zoomRange={{ min: ZOOM_OUT, max: ZOOM_IN }}
          pitchRange={{ min: -30, max: 15 }}
          rotate={{ speed: 6 }}
          style={{ touchAction: "none" }}
          scrollable={false}
        />
      )}

      {/* Furniture toggle button — only shown when two distinct images exist */}
      {room.unfurnitureImgId && room.furnitureImgId !== room.unfurnitureImgId && (
        <div className="absolute bottom-4 right-4 z-40">
          <button
            className="w-10 h-10 rounded-2xl p-2 bg-[#383838] flex items-center justify-center hover:bg-white/7 transition"
            onClick={() => setIsFurnished(f => !f)}
          >
            <img
              className="w-auto h-6 object-contain"
              src={isFurnished ? UNFURNITURE : FURNITURE}
              alt={isFurnished ? "Unfurnish" : "Furnish"}
            />
          </button>
        </div>
      )}
    </div>
  );
}