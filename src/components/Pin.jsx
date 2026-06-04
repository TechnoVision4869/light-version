import MAP_PIN from "../assets/images/map-pin.png";
import ICON_PIN from "../assets/images/icon-pin-transparent.png";

export default function Pin({ type, label, className = "" }) {
  return (
    <div
      className={`select-none ${type === 'search' ? 'search-hotspot' : ''} ${className}`}
    >
      {type === 'search' ? (
        <div className="w-6 h-6 relative">
          <div className="absolute w-3 h-3 border-2 border-white rounded-full top-0 left-0"></div>
          <div className="absolute w-0.5 h-2 bg-white top-3.5 left-3.5 transform rotate-[-45deg]"></div>
        </div>
      ) : (
        MAP_PIN ? (
          <div className="opacity-70 hover:opacity-100 transition-opacity">
            <img src={MAP_PIN} className="w-16 m-5 h-auto" />
          </div>
        ) : (
          <div className="text-white opacity-0 w-46 h-46 text-2xl font-bold text-center whitespace-pre-line px-2 py-1 bg-black/50 rounded">
            {label}
          </div>
        )
      )}
    </div>
  );
}