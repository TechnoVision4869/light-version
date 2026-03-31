import { createContext, useState, useCallback } from "react";

export const MainContext = createContext({
  // Overlay state: null (no overlay) or { type, data }
  overlay: null,
  
  // Overlay management methods
  openPanorama: () => {},
  openBalconyView: () => {},
  openRoomInterior: () => {},
  openGallery: () => {},
  closeOverlay: () => {},
  
  // Deprecated methods (kept for backward compatibility during migration)
  isPanorama: false,
  isBalconyView: false,
  isRoomInterior: false,
  galleryType: null,
  handleInterior: () => {},

  handleBack: () => {},
});

export default function MainContextProvider({ children }) {
  // New unified overlay state
  const [overlay, setOverlay] = useState(null);

  // Overlay action creators using useCallback for stability
  const openPanorama = useCallback((unit) => {
    setOverlay({ type: 'panorama', data: { unit } });
  }, []);

  const openBalconyView = useCallback((unit) => {
    setOverlay({ type: 'balcony', data: { unit, view: unit.balconyView } });
  }, []);

  const openRoomInterior = useCallback((room) => {
    setOverlay({ type: 'room-interior', data: { room, view: room.furnitureImg } });
  }, []);

  const openGallery = useCallback((unit, galleryType) => {
    setOverlay({ type: 'gallery', data: { unit, galleryType } });
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay(null);
  }, []);

  // Deprecated handler methods (kept for backward compatibility)
  const handleBack = () => closeOverlay();
  
  const ctxValue = {
    // New API
    overlay,
    openPanorama,
    openBalconyView,
    openRoomInterior,
    openGallery,
    closeOverlay,
    
    // Deprecated API (for gradual migration)
    isPanorama: overlay?.type === 'panorama',
    isBalconyView: overlay?.type === 'balcony',
    isRoomInterior: overlay?.type === 'room-interior',
    galleryType: overlay?.type === 'gallery' ? overlay?.data?.galleryType : null,
    
    handleBack,
  };

  return (
    <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>
  );
}
