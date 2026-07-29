import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Wraps THREE.TextureLoader with cancellation-safety (so a fast scene switch
// can't let a stale load overwrite newer state) and an error callback, so a
// broken/oversized image shows a message instead of a blank canvas or crash.
//
// Disposal of a *delivered* texture is intentionally NOT done here: once a
// texture is handed off, PanoramaSphere takes ownership of it (it keeps
// rendering outgoing textures during a crossfade, so this hook disposing
// them the instant `src` changes would pull them out from under that
// animation). This hook only disposes a load that never got delivered at
// all -- one that finished after being superseded, so nothing downstream
// ever saw it or could take ownership of it.
//
// The `key` tracking below guards a subtler race: when `src` changes, the
// new load only *starts* in an effect, which React doesn't run until after
// the render that changed `src` has already committed. Without this, a
// caller reading this hook's return value in that same render would still
// see the *previous* src's texture -- still truthy -- and could easily
// mistake "some texture is set" for "this scene's texture is ready",
// firing camera/UI updates for a scene whose image hasn't loaded (or even
// failed to load) yet. Tracking which key the held texture actually
// belongs to, and masking it out otherwise, makes that misattribution
// structurally impossible rather than something every caller has to
// remember to guard against.
export function useTextureSafe(src, onError, retryToken = 0) {
  const [texture, setTexture] = useState(null);
  const [loadedKey, setLoadedKey] = useState(null);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const key = `${src}::${retryToken}`;

  useEffect(() => {
    let cancelled = false;
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
        setLoadedKey(key);
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

  return loadedKey === key ? texture : null;
}
