import { useContext, useState } from "react";

import { SidebarContext } from "../store/SidebarContextProvider";
import { MainContext } from "../store/MainContextProvider";
import { findUnitInProject } from "../lib/findUnitById";
import { getCompareUnits, removeFromCompare } from "../lib/compareStorage";

import UnitPanel from "./UnitPanel";
import InteriorBrowser from "./InteriorBrowser";
import COMPARE_ICON from "../assets/icons/compare.svg"

export default function CompareView() {
  const { currentProject } = useContext(SidebarContext);
  const { closeOverlay } = useContext(MainContext);

  const [ids, setIds] = useState(() => getCompareUnits());
  const [interiorUnit, setInteriorUnit] = useState(null);

  const units = ids
    .map((id) => findUnitInProject(currentProject, id))
    .filter(Boolean);

  const handleRemove = (id) => {
    removeFromCompare(id);
    setIds((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div className="relative w-full h-full bg-[#2f2f2f] text-white flex flex-col">
      <div className="flex items-center justify-center relative pt-4 pb-1 border-white/10">
        <button
          onClick={closeOverlay}
          className="absolute left-8 top-4 w-10 h-10 rounded-xl bg-white/85 hover:bg-white/70 flex items-center justify-center transition"
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M31 12H2M2 12L9 6M2 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <img src={COMPARE_ICON} alt={'Compare Icon'} className="w-6 h-auto" />
          <h1 className="text-2xl font-bold">Compare</h1>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pt-2 px-2">
        <div className="flex gap-2 h-full divide-x divide-white/10 min-w-fit">
          {units.map((unit) => (
            <div key={unit.id} className="relative w-72 flex-shrink-0 pl-2 pr-4 pt-4">
              <button
                onClick={() => handleRemove(unit.id)}
                className="absolute top-1 right-1 z-10 w-7 h-7 rounded-full bg-[#ca3333] flex items-center justify-center transition"
                aria-label="Remove from compare"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="bg-[#4D4D4D] rounded-xl p-2">
                <UnitPanel unit={unit} inCompareView onOpenInterior={setInteriorUnit} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {interiorUnit && (
        <InteriorBrowser unit={interiorUnit} onClose={() => setInteriorUnit(null)} />
      )}
    </div>
  );
}
