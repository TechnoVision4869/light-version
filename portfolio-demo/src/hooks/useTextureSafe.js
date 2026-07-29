import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Wraps THREE.TextureLoader with cancellation-safety (so a fast scene switch
// can't let a stale load overwrite newer state) and an error callback, so a
// broken/oversized image shows a message instead of a blank canvas or crash.
// Disposal of a *delivered* texture is intentionally NOT done here: once a
// texture is handed off via setTexture, PanoramaSphere takes ownership of it
// (it keeps rendering outgoing textures during a crossfade, so this hook
// disposing them the instant `src` changes would pull them out from under
// that animation). This hook only disposes a load that never got delivered
// at all -- one that finished after being superseded, so PanoramaSphere
// never saw it and never could take ownership of it.
export function useTextureSafe(src, onError, retryToken = 0) {
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
        if (cancelled) {
          loaded.dispose();
          return;
        }
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
  }, [src, retryToken]);

  return texture;
}
