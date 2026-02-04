import MAP_PIN from "../assets/images/map-pin.png";
import ICON_PIN from "../assets/images/icon-pin-transparent.png";
import ChairRoundedIcon from '@mui/icons-material/ChairRounded';

export default function Pin({ type, label, onClick, style }) {
  return (
    <div
      className={`absolute cursor-pointer z-20 ${type === 'search' ? 'search-hotspot' : ''}`}
      style={style}
      // onMouseEnter={onMouseEnter}
      // onTouchStart={onTouchStart}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {type === 'search' ? (
        <div className="w-6 h-6 relative">
          <div className="absolute w-3 h-3 border-2 border-white rounded-full top-0 left-0"></div>
          <div className="absolute w-0.5 h-2 bg-white top-3.5 left-3.5 transform rotate-[-45deg]"></div>
        </div>
      ) : (
        ICON_PIN ? (
          <div className="opacity-90 hover:opacity-100 transition-opacity">
            <img src={MAP_PIN} className="w-12 h-auto" />
            {/* <ChairRoundedIcon className="absolute bottom-[40%] right-[25%] w-4 h-4"/> */}
          </div>
        ) : (
          <div className="text-white font-bold text-center whitespace-pre-line px-2 py-1 bg-black/50 rounded">
            {label}
          </div>
        )
      )}
    </div>
  );
}