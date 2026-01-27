import { useContext } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { TABS, LAYERS, LAYER_CONFIG, TAB_CONFIG } from "../data/layers";

import ZoneButton from "./buttons/ZoneButton";
import BuildingButton from "./buttons/BuildingButton";
import FloorButton from "./buttons/FloorButton";
import ApartmentButton from "./buttons/ApartmentButton";

import AmenityButton from "./buttons/AmenityButton";
import SurroundingButton from "./buttons/SurroundingButton";


const TOP_LEVEL_BUTTON_MAP = {
  [TABS.ZONES]: { Component: ZoneButton, propName: 'zone' },
  [TABS.SURROUNDINGS]: { Component: SurroundingButton, propName: 'surrounding' },
  [TABS.AMENITIES]: { Component: AmenityButton, propName: 'amenity' },
};

const LAYER_BUTTON_MAP = {
  building: { Component: BuildingButton, propName: 'building' },
  floor: { Component: FloorButton, propName: 'floor' },
  apartment: { Component: ApartmentButton, propName: 'apartment' },
  // ... other layer types
};

export default function SidebarButtons() {
  const { activeTab, activeLayer, currentItem, goToItem } = useContext(SidebarContext);

  // 🛑 Don't render sidebar in unsupported states
  if (activeTab === TABS.HOME) return null;
  if (activeLayer === LAYERS.APARTMENT) return null; // or any layer that shows UnitPanel

  let items = [];
  let isTopLevel = false;

  // ✅ Handle top-level tabs (no layer)
  if (activeLayer === null && activeTab !== TABS.HOME) {
    const tabConfig = TAB_CONFIG[activeTab];
    if (!tabConfig || typeof tabConfig.getItems !== 'function') return null;

    // Top-level items get __type = tab name (e.g., 'zones', 'amenities')
    items = tabConfig.getItems().map(item => ({ ...item, __type: activeTab }));
    isTopLevel = true;
  }
  // ✅ Handle nested layers
  else if (activeLayer !== null) {
    const layerConfig = LAYER_CONFIG[activeLayer];
    if (!layerConfig || typeof layerConfig.getItems !== 'function') return null;

    items = layerConfig.getItems(currentItem);
    isTopLevel = false;
  }

  // Guard against empty or invalid items
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="max-h-[calc(100vh-205px)] scrollbar-custom overflow-y-auto overflow-x-hidden space-y-3 px-2 py-2">
      {items.map(item => {
        // Skip if missing __type
        if (!item.__type) {          
          console.warn('Item missing __type:', item);
          return null;
        }

        // 🔑 Use the correct button map based on context
        const mapping = isTopLevel
          ? TOP_LEVEL_BUTTON_MAP[item.__type]   // e.g., item.__type = 'amenities'
          : LAYER_BUTTON_MAP[item.__type];      // e.g., item.__type = 'building'

        if (!mapping) {
          console.warn('No button mapping for __type:', item.__type, 'in', isTopLevel ? 'top-level' : 'layer');
          return null;
        }

        const { Component, propName } = mapping;

        return (
          <Component
            key={item.id}
            {...{ [propName]: item }}
            goToItem={() => goToItem(item)}
            isSelected={currentItem?.id === item.id}
          />
        );
      })}
    </div>
  );
}