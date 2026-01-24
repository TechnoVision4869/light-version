import { createContext, useState } from "react";

export const MainContext = createContext({
  isPanorama: false,
  isBalconyView: false,
  galleryType: null,

  handleInterior: () => {},
  handleBalconyView: () => {},
  handleGalleryType: () => {},
  handleBack: () => {},
});

export default function MainContextProvider({ children }) {
  const [isPanorama, setIsPanorama] = useState(false);
  const [isBalconyView, setIsBalconyView] = useState(false);
  const [galleryType, setGalleryType] = useState(null);

  const handleBack = () => {
    setIsPanorama(false);
    setIsBalconyView(false);
    setGalleryType(null);
  };

  const ctxValue = {
    isPanorama,
    isBalconyView,
    galleryType,

    handleInterior: () => setIsPanorama(true),
    handleBalconyView: () => setIsBalconyView(true),
    handleGalleryType: (type) => setGalleryType(type),
    handleBack,
  };

  return (
    <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>
  );
}
