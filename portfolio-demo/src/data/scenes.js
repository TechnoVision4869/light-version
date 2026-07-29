export const SPHERE_RADIUS = 50;
export const HOTSPOT_RADIUS = SPHERE_RADIUS * 0.9;

// Real photographed panoramas (unlike synthetic renders) rarely cover the
// full 180° from zenith to nadir -- these two only cover a horizontal band.
// verticalFov (derived from each image's width:height ratio, assuming the
// full 3840px width represents 360° horizontally) tells the sphere geometry
// how tall a slice of the sphere to actually build, so the texture isn't
// stretched to fill a full sphere it was never shot to cover.
export const scenes = [
  {
    id: "exterior",
    label: "Science City Kolkata — Exterior",
    image: "/panoramas/exterior-1.jpg",
    verticalFov: 128,
    initialYaw: 180,
    pitchRange: { min: -35, max: 40 },
    fovRange: { min: 40, max: 90 },
    hotspots: [
      {
        id: "to-space-hall",
        yaw: 50,
        pitch: 0,
        type: "nav",
        label: "Enter Space Odyssey  Hall",
        target: "space-hall-1",
      },
      { id: "info-dome", yaw: 130, pitch: 7, type: "info", label: "Geodesic Dome Theatre" },
    ],
  },
  {
    id: "space-hall-1",
    label: "Space Odyssey Hall",
    image: "/panoramas/space-hall-1.jpg",
    verticalFov: 121,
    initialYaw: 180,
    pitchRange: { min: -30, max: 37.5 },
    fovRange: { min: 40, max: 90 },
    hotspots: [
      { id: "to-exterior", yaw: 175, pitch: 3, type: "nav", label: "Back Outside", target: "exterior" },
      { id: "to-space-hall-2", yaw: -72, pitch: -5, type: "nav", label: "Next Scene", target: "space-hall-2" },
      { id: "info-space", yaw: 85, pitch: -9, type: "info", label: "Space thing" },
    ],
  },
  {
    id: "space-hall-2",
    label: "Space Odyssey Hall",
    image: "/panoramas/space-hall-2.jpg",
    verticalFov: 121,
    initialYaw: 180,
    pitchRange: { min: -30, max: 37.5 },
    fovRange: { min: 40, max: 90 },
    hotspots: [
      { id: "to-space-hall-1", yaw: 160, pitch: -10, type: "nav", label: "Prev Scene", target: "space-hall-1" },
      { id: "info-space", yaw: 200, pitch: -15, type: "info", label: "Space thing" },
    ],
  },
];

export function getSceneById(id) {
  return scenes.find((scene) => scene.id === id);
}
