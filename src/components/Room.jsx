import { useContext, useState, useRef, useEffect } from "react";
import View360, { EquirectProjection, EASING } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { CONFIG } from "../data/layers";
import { MainContext } from "../store/MainContextProvider";
import { getFakeRefurnitureImage } from "../lib/fakeRefurniture";

// Toggle button icons — unused while the manual toggle below is commented out in favor of the
// chatbot-driven Unfurnish/Refurnish options.
// import FURNITURE from "../assets/icons/furniture.svg";
// import UNFURNITURE from "../assets/icons/un-furniture.svg";

const ROOM_VIEW_SWAP_DELAY_MS = 2000;

export default function Room({ room }) {
  const { roomViewRequest, clearRoomViewRequest, setRoomViewMode } = useContext(MainContext);

  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const glRef = useRef(null);
  // Starts unfurnished (per the chatbot-driven flow: unfurnished -> Add Furniture -> furnished
  // -> Remove Furniture / Try Another Style) — falls back to furnished for rooms that don't have
  // a distinct unfurnished image at all (e.g. floor features, which only ever have one 360 image
  // and reuse it for both fields), since there'd be nothing to start unfurnished with.
  const hasDistinctUnfurnished = room.unfurnitureImgId && room.unfurnitureImgId !== room.furnitureImgId;
  const initialMode = hasDistinctUnfurnished ? "unfurnished" : "furnished";
  const initialSrc = initialMode === "unfurnished" ? room.unfurnitureImgId : room.furnitureImgId;
  const initialProjection = useRef(new EquirectProjection({ src: initialSrc }));
  const [isSwapping, setIsSwapping] = useState(false);
  const currentSrcRef = useRef(initialSrc);
  const [textureError, setTextureError] = useState(null);
  console.log("Room component rendered with room:", room);
  // DEV: tunable values — remove before shipping
  // const [testPointerScale, setTestPointerScale] = useState(1.7);
  // const [testDuration, setTestDuration] = useState(750);

  // useEffect(() => {
  //   if (!viewerRef.current) return;
  //   viewerRef.current.control.rotate.pointerScale = [testPointerScale, testPointerScale];
  //   viewerRef.current.control.rotate.duration = testDuration;
  // }, [testPointerScale, testDuration]);

  // Check gl.getError() off the render timeline — setTimeout avoids a GPU pipeline stall on the current frame
  const checkGLError = (src) => {
    setTimeout(() => {
      if (!glRef.current) {
        const canvas = containerRef.current?.querySelector('.view360-canvas');
        if (!canvas) return;
        glRef.current = canvas.getContext('webgl2') || canvas.getContext('webgl');
      }
      const gl = glRef.current;
      if (!gl) return;
      const error = gl.getError();
      if (error !== gl.NO_ERROR) {
        const maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const img = new Image();
        img.onload = () => setTextureError({ maxSize, width: img.width, height: img.height });
        img.src = src;
      } else {
        setTextureError(null);
      }
    }, 0);
  };

  const handleReady = () => {
    if (!viewerRef.current) return;
    viewerRef.current.camera.lookAt({ zoom: CONFIG.INTERIOR_INITIAL_ZOOM ?? 1 });
    // viewerRef.current.control.rotate.pointerScale = [testPointerScale, testPointerScale];
    // viewerRef.current.control.rotate.duration = testDuration;
    viewerRef.current.control.rotate.pointerScale = [1.7, 1.7];
    viewerRef.current.control.rotate.duration = 750;
    viewerRef.current.control.rotate.easing = EASING.EASE_OUT_CUBIC;
  };

  const handleLoad = () => {
    checkGLError(currentSrcRef.current);
  };

  // Old manual toggle — replaced by the chatbot-driven request effect below.
  // const handleToggle = () => {
  //   if (!viewerRef.current) return;
  //   const newFurnished = !isFurnished;
  //   setIsFurnished(newFurnished);
  //   const newView = newFurnished ? room.furnitureImgId : room.unfurnitureImgId;
  //   currentSrcRef.current = newView;
  //   viewerRef.current.load(new EquirectProjection({ src: newView }));
  // };

  // Report the starting mode once, on mount, so the chatbot's gating has something to read right
  // away — it has no other way to know what Room.jsx decided to start with (see initialMode above).
  useEffect(() => {
    setRoomViewMode(room.id, initialMode);
    // Mount-only — room.id/initialMode are stable for this component's lifetime (Room remounts
    // via key={room.id} on room switch, per Home.jsx).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Driven by the chatbot's "Add Furniture" / "Remove Furniture" / "Try Another Style" options
  // (src/lib/faqCategories.js), via MainContext.requestRoomView — see MainContextProvider.jsx.
  // One-shot signal, but NOT cleared up front: clearing it immediately would change
  // `roomViewRequest` (a dependency of this same effect) and re-trigger it right away, running
  // this effect's own cleanup — which cancels the very setTimeout below — before the 2s delay
  // ever elapses. It's cleared only once the swap actually completes (or turns out to be a
  // no-op), which still keeps it one-shot for the "switch rooms and back" replay case.
  useEffect(() => {
    if (!roomViewRequest || roomViewRequest.roomId !== room.id) return;
    const { mode } = roomViewRequest;

    const targetSrc =
      mode === "unfurnished" ? room.unfurnitureImgId :
      mode === "furnished" ? room.furnitureImgId :
      getFakeRefurnitureImage(room);

    if (!targetSrc || !viewerRef.current || targetSrc === currentSrcRef.current) {
      clearRoomViewRequest();
      return;
    }

    setIsSwapping(true);
    const timeoutId = setTimeout(() => {
      currentSrcRef.current = targetSrc;
      // load() swaps the image without remounting — camera position is preserved automatically
      viewerRef.current.load(new EquirectProjection({ src: targetSrc }));
      setRoomViewMode(room.id, mode);
      setIsSwapping(false);
      clearRoomViewRequest();
    }, ROOM_VIEW_SWAP_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [roomViewRequest, room, clearRoomViewRequest, setRoomViewMode]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <View360
        ref={viewerRef}
        className="view360-fullscreen"
        projection={initialProjection.current}
        onReady={handleReady}
        onLoad={handleLoad}
        zoomRange={CONFIG.INTERIOR_ZOOM_RANGE}
        pitchRange={CONFIG.INTERIOR_PITCH_RANGE}
        style={{ touchAction: "none" }}
        scrollable={false}
      />

      {/* DEV: drag tuner — remove before shipping */}
      {/* <div className="absolute top-4 left-4 z-50 bg-black/40 rounded-2xl px-5 py-4 text-white text-sm space-y-5 pointer-events-auto">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between opacity-60">
            <span>pointerScale</span>
            <span className="font-mono">{testPointerScale}</span>
          </div>
          <input
            type="range" min="1" max="3" step="0.1"
            value={testPointerScale}
            onChange={e => setTestPointerScale(Number(e.target.value))}
            className="w-64 h-8 accent-white opacity-50 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between opacity-60">
            <span>duration</span>
            <span className="font-mono">{testDuration}ms</span>
          </div>
          <input
            type="range" min="100" max="2000" step="50"
            value={testDuration}
            onChange={e => setTestDuration(Number(e.target.value))}
            className="w-64 h-8 accent-white opacity-50 cursor-pointer"
          />
        </div>
      </div> */}

      {textureError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90 pointer-events-none">
          <p className="text-white/60 text-sm text-center px-8 leading-relaxed">
            360° view unavailable on this device.<br />
            Image resolution exceeds the graphics limit.<br />
            <span className="text-white/40 text-xs">
              Image: {textureError.width}×{textureError.height}&nbsp;·&nbsp;Device limit: {textureError.maxSize}px
            </span>
          </p>
        </div>
      )}

      {/* Old furniture toggle button — replaced by the chatbot's Unfurnish/Refurnish options.
      {room.unfurnitureImgId && room.furnitureImgId !== room.unfurnitureImgId && (
        <div className="absolute bottom-4 right-4 z-40">
          <button
            className="w-10 h-10 rounded-2xl p-2 bg-[#383838] flex items-center justify-center hover:bg-white/7 transition"
            onClick={handleToggle}
          >
            <img
              className="w-auto h-6 object-contain"
              src={isFurnished ? UNFURNITURE : FURNITURE}
              alt={isFurnished ? "Unfurnish" : "Furnish"}
            />
          </button>
        </div>
      )}
      */}

      {isSwapping && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}
    </div>
  );
}