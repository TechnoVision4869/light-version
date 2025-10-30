import { LAYERS } from "../../data/layers";

export default function FloorButton({
  floor,
  isDisabled,
  isSelected,
  goToFloor,
}) {
  return (
    <button
      key={floor.id}
      onClick={() => {
        goToFloor(floor, LAYERS.FLOOR);
      }}
      disabled={isDisabled}
      className={`w-64 max-w-full mx-auto p-4 rounded-2xl transition
        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : isSelected
            ? "bg-white/10"
            : "bg-black/10 hover:bg-white/7"
        }`}
    >
      <div className="flex items-center justify-between">
        {/* Floor Name */}
        <div className="text-md font-semibold text-white leading-tight">
          {floor.name}
        </div>

        {/* Vertical Divider + Floor Type */}
        <div className="flex items-center">
          <div className="w-0.5 h-5 bg-white mx-3"></div>
          <div className="font-bold text-white">{floor.type}</div>
        </div>
      </div>
    </button>
  );
}