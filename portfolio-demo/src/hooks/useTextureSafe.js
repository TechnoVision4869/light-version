import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Wraps THREE.TextureLoader with cancellation-safety (so a fast scene switch
// can't let a stale load overwrite newer state) and an error callback, so a
// broken/oversized image shows a message instead of a blank canvas or crash.
// Textures are GPU resources -- unlike JSX-declared geometries/materials,
// which react-three-fiber disposes automatically, this one is created
// imperatively, so we dispose it ourselves whenever it's replaced or the
// component unmounts.
export function useTextureSafe(src, onError, retryToken = 0) {
  const [texture, setTexture] = useState(null);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;
    let loadedTexture = null;
    setTexture(null);
    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (loaded) => {
        if (cancelled) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = THREE.SRGBColorSpace;
        loadedTexture = loaded;
        setTexture(loaded);
      },
      undefined,
      (err) => {
        if (!cancelled) onErrorRef.current?.(err);
      },
    );
    return () => {
      cancelled = true;
      loadedTexture?.dispose();
    };
  }, [src, retryToken]);

  return texture;
}
