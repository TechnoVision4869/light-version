import { useState, useEffect } from "react";
import { getCompareUnits, COMPARE_UPDATED_EVENT } from "../../lib/compareStorage";
import COMPARE_ICON from "../../assets/icons/compare.svg"

export default function CompareButton({ onClick }) {
  const [count, setCount] = useState(() => getCompareUnits().length);

  useEffect(() => {
    const handleUpdate = () => setCount(getCompareUnits().length);
    window.addEventListener(COMPARE_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(COMPARE_UPDATED_EVENT, handleUpdate);
  }, []);

  if (count === 0) return null;

  return (
    <button
      className="relative flex items-center justify-center bg-black/60 backdrop-blur-sm
        w-10 h-10 hover:w-11 hover:h-11
        transition-all duration-500 ease-in-out
        rounded-xl"
      onClick={onClick}
      aria-label="Open compare page"
    >
      <img src={COMPARE_ICON} alt={'Compare Icon'} className="w-5 h-auto" />
      <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center
        w-5 h-5 rounded-full bg-[#ca3333] text-white text-[11px] font-bold leading-none">
        {count}
      </span>
    </button>
  );
}
