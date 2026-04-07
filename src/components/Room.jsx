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

  const view = isFurnished ? room.furnitureImg : room.unfurnitureImg;
  const projection = new EquirectProjection({ src: view });

  const handleReady = () => {
    viewerRef.current.camera.animateTo({
      zoom: ZOOM_NORMAL,
      duration: ZOOM_OUT_TIME,
    });
  };

  return (
    <div className="relative w-full h-full">
      <View360
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

      {/* Furniture toggle button */}
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
    </div>
  );
}
