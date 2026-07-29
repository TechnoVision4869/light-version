# Science City Kolkata — 360° Panorama Viewer

A small interactive 360° virtual tour, built with [Three.js](https://threejs.org) via [react-three-fiber](https://docs.pmnd.rs/react-three-fiber). Drag to look around inside a real photographed panorama, scroll to zoom, and click a glowing marker to walk to the next scene.

**Live demo:** deployed via Netlify — see the branch this was built on.

## Why this exists

I've shipped a production 360° panorama viewer with interactive hotspots before, in a React real-estate app, using [`@egjs/react-view360`](https://github.com/naver/egjs-view360) — a library that wraps Three.js under the hood. That project taught me the *domain*: equirectangular panoramas, yaw/pitch hotspot placement, camera zoom-as-field-of-view, scene-to-scene navigation, defensive handling of texture load failures.

What it didn't teach me was Three.js itself — view360 never required touching the Three.js API directly. This project is that translation: the same domain knowledge, rebuilt on raw Three.js, so the hands-on parts (camera math, raycasting, GPU resource management) are mine rather than a library's.

## What's actually hand-rolled here (not just react-three-fiber JSX)

A few pieces intentionally go beneath react-three-fiber's declarative layer, since that's the part a wrapper library never required:

- **`src/utils/sphericalMath.js`** — converts a yaw/pitch angle pair (degrees) into a 3D point on a sphere, by hand. This is the same math a compass and a protractor would use: it's how every hotspot marker and the camera's initial facing direction get placed in 3D space.
- **`src/components/HotspotLayer.jsx`** — hotspot clicking uses a `THREE.Raycaster`, not a DOM click handler. A mesh floating in 3D space has no native "onClick" — a raycaster casts an invisible line from the camera through wherever the pointer is, each frame, and reports which object it hits first. That's how hovering and clicking a marker actually gets detected. It also has to tell a click apart from the start of a drag (both start with the same pointer-down), by checking whether the pointer moved before it lifted.
- **`src/components/PanoramaSphere.jsx`** — scene transitions crossfade rather than hard-cutting. Every texture handed to this component becomes its own fading layer (its own sphere + material); the newest one fades in while older ones fade out and get disposed once they're no longer visible. This also means the component is directly responsible for freeing GPU texture memory once a layer is done with it — that's not automatic for anything loaded outside of JSX.
- **`src/components/CameraRig.jsx`** — "zooming" is implemented as narrowing the camera's field of view (via a manual scroll-wheel handler), not moving the camera closer to anything — the camera never leaves the center of the panorama sphere, exactly like the production view360 viewer's zoom behavior.

## Techniques used, in plain terms

- **Equirectangular panorama sphere**: a photo taken with a 360° camera gets wrapped around the inside of a sphere. The camera sits at the sphere's center; "looking around" is just rotating the camera in place.
- **Partial sphere coverage**: real photographed panoramas (unlike synthetic renders) usually don't capture the very top and bottom (zenith/nadir) — they cover a horizontal band. The sphere geometry here is built to match each photo's actual vertical coverage, so the image isn't stretched to fill a full sphere it was never shot to cover.
- **Raycasting**: see above — the mechanism behind clicking a hotspot.
- **Crossfade via layered materials**: rather than a shader effect, the crossfade is done by literally rendering two overlapping spheres and animating their material opacity in opposite directions.
- **Manual GPU resource cleanup**: textures are a GPU resource. Anything created outside of JSX (this app loads panorama images imperatively via `THREE.TextureLoader`, so it can control exactly when a load is stale) has to be disposed manually once it's no longer needed, or it leaks.

## Running locally

```bash
npm install
npm run dev       # dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Image credits

Panorama photos are from Science City, Kolkata.
