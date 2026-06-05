import { useContext } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { MainContext } from "../store/MainContextProvider";
import { TABS, LAYERS} from "../data/layers";
import { PROPERTY_TYPE } from "../constants/roles";

import ZoneButton from "./buttons/ZoneButton";
import AmenityButton from "./buttons/AmenityButton";
import SurroundingButton from "./buttons/SurroundingButton";

// import TypeButton from "./buttons/TypeButton";
import BuildingButton from "./buttons/BuildingButton";
import FloorButton from "./buttons/FloorButton";
import ApartmentButton from "./buttons/ApartmentButton";

export default function SidebarButtons({ onNavigate = (action) => action() }) {
  const { currentProject, activeTab, activeLayer, currentItem, currentItems, goToItem, isPlaying } = useContext(SidebarContext);
  const { openRoomInterior } = useContext(MainContext);
  
  // Determine which component and props to use for rendering
  let Component = null;
  let propName = "";
  let layerKey = null;

  // Don't render sidebar buttons for UNIT layer (UnitPanel is shown instead)
  if (activeLayer === LAYERS.UNIT) return null;

  if (activeLayer === null) {
    if (activeTab === TABS.ZONES) {
      const zonesItems = currentProject?.zones?.items || [];
      if (zonesItems.length === 1) {
        // Single zone: showing properties
        Component = BuildingButton;
        propName = "building";
        layerKey = LAYERS.BUILDING;
      } else {
        // Multiple zones
        Component = ZoneButton;
        propName = "zone";
        layerKey = LAYERS.ZONE_DETAIL;
      }
    }
    else if (activeTab === TABS.AMENITIES) {
      Component = AmenityButton;
      propName = "amenity";
      layerKey = LAYERS.AMENITY_DETAIL;
    }
    else if (activeTab === TABS.SURROUNDINGS) {
      Component = SurroundingButton;
      propName = "surrounding";
      layerKey = LAYERS.SURROUNDING_DETAIL;
    }
  }
  else {
    if (activeLayer === LAYERS.ZONE_DETAIL) {
      const properties = currentItem?.properties || [];
      if (properties.length === 1) {
        const property = properties[0];        
        if (property.type === PROPERTY_TYPE.VILLA) {
          Component = ApartmentButton;
          propName = "apartment";
          layerKey = LAYERS.UNIT;
        }
        else if (property.type === PROPERTY_TYPE.TOWNHOUSE) {
          Component = BuildingButton;
          propName = "building";
          layerKey = LAYERS.BUILDING;
        }
        else {
          Component = BuildingButton;
          propName = "building";
          layerKey = LAYERS.BUILDING;
        }
      }
      else {
        Component = BuildingButton;
        propName = "building";
        layerKey = LAYERS.BUILDING;
      }
    }
    else if (activeLayer === LAYERS.BUILDING) {
      if (currentItem?.type === PROPERTY_TYPE.TOWER) {
        Component = FloorButton;
        propName = "floor";
        layerKey = LAYERS.FLOOR;
      }
      else {
        Component = ApartmentButton;
        propName = "apartment";
        layerKey = LAYERS.UNIT;
      }
    }
    else if (activeLayer === LAYERS.BUILDING_FEATURE) {
      Component = AmenityButton;
      propName = "amenity";
      layerKey = LAYERS.AMENITY_DETAIL;
    }
    else if (activeLayer === LAYERS.FLOOR) {
      Component = ApartmentButton;
      propName = "apartment";
      layerKey = LAYERS.UNIT;
    }
    else if (activeLayer === LAYERS.SURROUNDING_DETAIL) {
      Component = SurroundingButton;
      propName = "surrounding";
      layerKey = LAYERS.SURROUNDING_DETAIL;
    }
  }

  const isTower = currentItem?.type === PROPERTY_TYPE.TOWER;
  const towerFeatures = activeLayer === LAYERS.BUILDING && isTower ? currentItem?.features : null;

  if (!currentItems || currentItems.length === 0 || Component === null) {
    if (!towerFeatures) return null;
  }

  return (
    <div className="flex-1 min-h-0 scrollbar-custom overflow-y-auto overflow-x-hidden space-y-3 px-2 py-2">
      {towerFeatures?.length > 0 && (
        <button
          onClick={() => onNavigate(() => goToItem(towerFeatures, LAYERS.BUILDING_FEATURE))}
          disabled={isPlaying}
          className="w-full text-left px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {towerFeatures.displayName || "Features"}
        </button>
      )}
      {currentItems.map((item) => {
        const isImageOnly = activeLayer === LAYERS.BUILDING_FEATURE
          && !item.videos?.forwardVideo
          && item.videos?.idleVideo;
        const itemGoToItem = isImageOnly
          ? () => openRoomInterior({ furnitureImg: item.videos.idleVideo, unfurnitureImg: item.videos.idleVideo })
          : () => onNavigate(() => goToItem(item, layerKey));
        return (
          <Component
            key={item.id}
            {...{ [propName]: item }}
            goToItem={itemGoToItem}
            isDisabled={isPlaying}
          />
        );
      })}
    </div>
  );
}
