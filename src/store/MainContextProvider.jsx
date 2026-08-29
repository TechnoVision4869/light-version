import { createContext, useState, useCallback, useRef } from "react";

export const MainContext = createContext({
  // Overlay state: null (no overlay) or { type, data }
  overlay: null,

  // Overlay management methods
  openPanorama: () => {},
  openBalconyView: () => {},
  openRoomInterior: () => {},
  openGallery: () => {},
  openCompare: () => {},
  openPaymentPlan: () => {},
  openSimilarUnit: () => {},
  closeOverlay: () => {},

  galleryType: null,
  handleInterior: () => {},

  handleBack: () => {},

  // One-shot signal for the chatbot to change the displayed image in an already-open
  // room-interior overlay — see requestRoomView below for why this isn't routed through
  // openRoomInterior/openSubOverlay.
  roomViewRequest: null,
  requestRoomView: () => {},
  clearRoomViewRequest: () => {},

  // Room.jsx's own report of what it's currently showing ({ roomId, mode }) — the chatbot needs
  // this to decide which of Add/Remove Furniture/Try Another Style to offer, and has no other way
  // to know it (the data model has no "current view" field).
  roomViewMode: null,
  setRoomViewMode: () => {},
});

export default function MainContextProvider({ children }) {
  // New unified overlay state
  const [overlay, setOverlay] = useState(null);

  // When a sub-overlay (panorama/balcony/gallery/room-interior) is opened while the
  // 'compare' overlay is active, the compare overlay gets stashed here so closeOverlay
  // can restore it instead of falling back to the normal single-unit view — otherwise
  // opening e.g. Interior from a CompareView column would silently unmount the compare
  // page (single-slot overlay state can't hold both at once).
  const previousOverlayRef = useRef(null);

  const openSubOverlay = useCallback((newOverlay) => {
    setOverlay((current) => {
      previousOverlayRef.current = current?.type === 'compare' ? current : null;
      return newOverlay;
    });
  }, []);

  // Overlay action creators using useCallback for stability
  const openPanorama = useCallback((unit) => {
    openSubOverlay({ type: 'panorama', data: { unit } });
  }, [openSubOverlay]);

  const openBalconyView = useCallback((unit) => {
    openSubOverlay({ type: 'balcony', data: { unit, view: unit.balconyView } });
  }, [openSubOverlay]);

  const openRoomInterior = useCallback((room) => {
    openSubOverlay({ type: 'room-interior', data: { room, view: room.furnitureImg } });
  }, [openSubOverlay]);

  const openGallery = useCallback((unit, galleryType) => {
    openSubOverlay({ type: 'gallery', data: { unit, galleryType } });
  }, [openSubOverlay]);

  const openPaymentPlan = useCallback((unit) => {
    openSubOverlay({ type: 'paymentPlan', data: { unit } });
  }, [openSubOverlay]);

  const openSimilarUnit = useCallback((unit) => {
    openSubOverlay({ type: 'similar-unit', data: { unit } });
  }, [openSubOverlay]);

  const openCompare = useCallback(() => {
    previousOverlayRef.current = null;
    setOverlay({ type: 'compare' });
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay(previousOverlayRef.current);
    previousOverlayRef.current = null;
  }, []);

  const handleBack = () => closeOverlay();

  // A separate one-shot signal (not part of the `overlay` single slot) so the chatbot can push a
  // new displayed image into an already-open room-interior overlay without going through
  // openSubOverlay — reusing openRoomInterior for this would reset previousOverlayRef even though
  // room-interior isn't the overlay actually changing, silently dropping a stashed Compare overlay
  // if this room was opened from a CompareView column. Room.jsx consumes and clears it immediately.
  const [roomViewRequest, setRoomViewRequest] = useState(null);

  const requestRoomView = useCallback((roomId, mode) => {
    setRoomViewRequest({ roomId, mode });
  }, []);

  const clearRoomViewRequest = useCallback(() => {
    setRoomViewRequest(null);
  }, []);

  // Room.jsx calls this to report what it's currently displaying (on mount, and after each
  // completed swap) — read by the chatbot's gating logic (src/lib/faqCategories.js).
  const [roomViewMode, setRoomViewModeState] = useState(null);

  const setRoomViewMode = useCallback((roomId, mode) => {
    setRoomViewModeState({ roomId, mode });
  }, []);

  const ctxValue = {
    // New API
    overlay,
    openPanorama,
    openBalconyView,
    openRoomInterior,
    openGallery,
    openCompare,
    openPaymentPlan,
    openSimilarUnit,
    closeOverlay,

    galleryType: overlay?.type === 'gallery' ? overlay?.data?.galleryType : null,

    handleBack,

    roomViewRequest,
    requestRoomView,
    clearRoomViewRequest,

    roomViewMode,
    setRoomViewMode,
  };

  return (
    <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>
  );
}
