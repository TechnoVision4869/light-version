import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Wraps THREE.TextureLoader with cancellation-safety (so a fast scene switch
// can't let a stale load overwrite newer state) and an error callback, so a
// broken/oversized image shows a message instead of a blank canvas or crash.
export function useTextureSafe(src, onError) {
  const [texture, setTexture] = useState(null);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    let cancelled = false;
    setTexture(null);
    const loader = new THREE.TextureLoader();
    loader.load(
      src,
      (loaded) => {
        if (cancelled) return;
        loaded.colorSpace = THREE.SRGBColorSpace;
        setTexture(loaded);
      },
      undefined,
      (err) => {
        if (!cancelled) onErrorRef.current?.(err);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [src]);

  return texture;
}
