// Prerendered "fake refurniture" images for the room-interior chatbot option — a workaround for
// the data model only having real furnished/unfurnished images (no third "alternate look" field).
// Keyed by room.displayName since this project's room data is API-driven (no stable local ids to
// key against in this codebase). Drop the matching files into public/fake-refurniture/.
export const FAKE_REFURNITURE_BY_ROOM_NAME = {
  "Entrance": "/fake-refurniture/Entrance.jpg",
  "Main Workspace": "/fake-refurniture/Main Workspace.jpg",
  "Meeting Area": "/fake-refurniture/Meeting Area.jpg",
};

export function getFakeRefurnitureImage(room) {
  return FAKE_REFURNITURE_BY_ROOM_NAME[room?.displayName] || null;
}
