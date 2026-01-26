import { useContext } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { TABS, LAYERS, LAYER_CONFIG, TAB_CONFIG } from "../data/layers";

import ZoneButton from "./buttons/ZoneButton";
import BuildingButton from "./buttons/BuildingButton";
import FloorButton from "./buttons/FloorButton";
import ApartmentButton from "./buttons/ApartmentButton";

import AmenityButton from "./buttons/AmenityButton";
import SurroundingButton from "./buttons/SurroundingButton";

// Button mapping for top-level tabs
// For top-level tabs
const TOP_LEVEL_BUTTON_MAP = {
  [TABS.ZONES]: {
    Component: ZoneButton,
    propName: "zone",
    nextLayer: LAYERS.ZONE_DETAIL,
  },
  [TABS.SURROUNDINGS]: {
    Component: SurroundingButton,
    propName: "surrounding",
    nextLayer: LAYERS.SURROUNDING_DETAIL,
  },
  [TABS.AMENITIES]: {
    Component: AmenityButton,
    propName: "amenity",
    nextLayer: LAYERS.AMENITY_DETAIL,
  },
};

// Button mapping for nested layers (based on __type)
const LAYER_BUTTON_MAP = {
  building: {
    Component: BuildingButton,
    propName: "building",
    nextLayer: LAYERS.BUILDING, // 👈 this is the layer you enter WHEN you click this button
  },
  floor: {
    Component: FloorButton,
    propName: "floor",
    nextLayer: LAYERS.FLOOR,
  },
  unit: {
    Component: ApartmentButton,
    propName: "apartment",
    nextLayer: LAYERS.APARTMENT,
  },
};

export default function Sidebar() {
  const { activeTab, activeLayer, currentItem, goToItem } =
    useContext(SidebarContext);

  // Render top-level items (Zones, Surroundings, etc.)
  if (activeLayer === null && activeTab !== TABS.HOME) {
    const config = TAB_CONFIG[activeTab];
    if (!config) return null;

    const items = config
      .getItems()
      .map((item) => ({ ...item, __type: activeTab })); // e.g., __type: 'zones'
    const { Component, propName, nextLayer } =
      TOP_LEVEL_BUTTON_MAP[activeTab] || {};

    if (!Component) return null;

    return (
      <div className="max-h-[calc(100vh-205px)] scrollbar-custom overflow-y-auto overflow-x-hidden space-y-3 px-2 py-2">
        {items.map((item) => (
          <Component
            key={item.id}
            {...{ [propName]: item }}
            goToItem={() => goToItem(item, nextLayer)}
            isSelected={currentItem?.id === item.id}
          />
        ))}
      </div>
    );
  }

  // Render nested layer items (Buildings → Floors → Units, etc.)
  if (activeLayer !== null && currentItem) {
    const layerConfig = LAYER_CONFIG[activeLayer];
    if (!layerConfig) return null;

    const items = layerConfig.getItems(currentItem); // already has __type!
    return (
      <div className="max-h-[calc(100vh-205px)] scrollbar-custom overflow-y-auto overflow-x-hidden space-y-3 px-2 py-2">
        {items.map((item) => {
          const mapping = LAYER_BUTTON_MAP[item.__type];
          if (!mapping) return null;

          const { Component, propName, nextLayer } = mapping;
          return (
            <Component
              key={item.id}
              {...{ [propName]: item }}
              goToItem={() => goToItem(item, nextLayer)}
              isSelected={currentItem?.id === item.id}
            />
          );
        })}
      </div>
    );
  }

  return null;
}
