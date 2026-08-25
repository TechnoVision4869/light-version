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
  closeOverlay: () => {},
  
  galleryType: null,
  handleInterior: () => {},

  handleBack: () => {},
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

  const openCompare = useCallback(() => {
    previousOverlayRef.current = null;
    setOverlay({ type: 'compare' });
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay(previousOverlayRef.current);
    previousOverlayRef.current = null;
  }, []);

  const handleBack = () => closeOverlay();
  
  const ctxValue = {
    // New API
    overlay,
    openPanorama,
    openBalconyView,
    openRoomInterior,
    openGallery,
    openCompare,
    closeOverlay,

    galleryType: overlay?.type === 'gallery' ? overlay?.data?.galleryType : null,
    
    handleBack,
  };

  return (
    <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>
  );
}
