import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SPHERE_RADIUS } from "../data/scenes";

const FADE_SECONDS = 0.6;
let nextLayerId = 0;

function sphereArgs(verticalFov) {
  const thetaLength = THREE.MathUtils.degToRad(verticalFov);
  const thetaStart = (Math.PI - thetaLength) / 2;
  return [SPHERE_RADIUS, 60, 40, 0, Math.PI * 2, thetaStart, thetaLength];
}

// Equirectangular panoramas are meant to be viewed from inside a sphere.
// A sphere's "front" faces point outward by default, so from the camera's
// position at the center, those faces are invisible (back-face culled).
// side: BackSide flips which faces the renderer keeps, showing the inward
// surface -- the correct surface for a viewer standing inside the sphere.
//
// verticalFov restricts the sphere to only the vertical band the source
// photo actually covers (real panoramas rarely reach the zenith/nadir),
// centered on the horizon -- otherwise the image would be stretched to
// cover a full sphere it was never shot to fill.
//
// Scene transitions crossfade rather than hard-cut. Each texture this
// component is ever handed becomes a "layer" (its own sphere + material)
// that fades in, then fades out once superseded. Layers -- not just a
// single current/previous pair -- so nothing ever gets clobbered or
// leaked no matter how fast scenes change: every texture is disposed
// exactly once, whenever its layer stops being needed. Clicking through
// several scenes faster than one fade can finish will briefly composite
// more than one outgoing panorama at once (a visible but harmless
// double-exposure) rather than losing track of any of them -- correctness
// over a pixel-perfect multi-hop crossfade, which isn't worth the extra
// complexity for how rarely that timing actually happens.
export default function PanoramaSphere({ texture, verticalFov = 180 }) {
  const layersRef = useRef([]);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!texture) return;
    const layers = layersRef.current;
    const top = layers[layers.length - 1];
    if (top && top.texture === texture) return;
    layers.push({ id: nextLayerId++, texture, verticalFov, matRef: { current: null }, blend: 0 });
    setTick((t) => t + 1);
  }, [texture, verticalFov]);

  useFrame((_, delta) => {
    const layers = layersRef.current;
    if (layers.length === 0) return;
    const top = layers[layers.length - 1];

    if (top.blend < 1) {
      top.blend = Math.min(1, top.blend + delta / FADE_SECONDS);
      if (top.matRef.current) top.matRef.current.opacity = top.blend;
      for (let i = 0; i < layers.length - 1; i++) {
        if (layers[i].matRef.current) layers[i].matRef.current.opacity = 1 - top.blend;
      }
    }

    if (top.blend >= 1 && layers.length > 1) {
      for (let i = 0; i < layers.length - 1; i++) layers[i].texture.dispose();
      layersRef.current = [top];
      setTick((t) => t + 1);
    }
  });

  const layers = layersRef.current;
  if (layers.length === 0) return null;

  return (
    <group>
      {layers.map((layer, i) => (
        <mesh key={layer.id} renderOrder={i} scale={[-1, 1, 1]}>
          <sphereGeometry args={sphereArgs(layer.verticalFov)} />
          <meshBasicMaterial
            ref={(mat) => {
              layer.matRef.current = mat;
            }}
            map={layer.texture}
            side={THREE.BackSide}
            transparent
            opacity={i === layers.length - 1 ? layer.blend : 1 - layers[layers.length - 1].blend}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      ))}
    </group>
  );
}
