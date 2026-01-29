import { useContext } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { TABS, LAYERS, TAB_CONFIG, LAYER_CONFIG } from "../data/layers";

import ZoneButton from "./buttons/ZoneButton";
import AmenityButton from "./buttons/AmenityButton";
import SurroundingButton from "./buttons/SurroundingButton";

import TypeButton from "./buttons/TypeButton";
import BuildingButton from "./buttons/BuildingButton";
import FloorButton from "./buttons/FloorButton";
import ApartmentButton from "./buttons/ApartmentButton";

export default function SideBarButtons() {
  const { activeTab, activeLayer, currentItem, goToItem } = useContext(SidebarContext);
  let items = [];
  let Component = null;
  let propName = "";
  let layerKey = null;

  if (activeLayer === null) {
    if (activeTab === TABS.ZONES) {
      items = TAB_CONFIG[TABS.ZONES].getItems();
      Component = ZoneButton;
      propName = "zone";
      layerKey = LAYERS.ZONE_DETAIL;
    }
    else if (activeTab === TABS.AMENITIES) {
      items = TAB_CONFIG[TABS.AMENITIES].getItems();
      Component = AmenityButton;
      propName = "amenity";
      layerKey = LAYERS.AMENITY_DETAIL; 
    }
    else if (activeTab === TABS.SURROUNDINGS) {
      items = TAB_CONFIG[TABS.SURROUNDINGS].getItems();
      Component = SurroundingButton;
      propName = "surrounding";
      layerKey = LAYERS.SURROUNDING_DETAIL; 
    }
  }
  else {
    if(activeLayer === LAYERS.ZONE_DETAIL) {
      items = LAYER_CONFIG[LAYERS.ZONE_DETAIL].getItems(currentItem);
      if(currentItem.nextLayer === LAYERS.TYPE) {
        Component = TypeButton;
        propName = "type";
        layerKey = LAYERS.TYPE;
      }
      else if(currentItem.nextLayer === LAYERS.BUILDING) {
        Component = BuildingButton;
        propName = "building";
        layerKey = LAYERS.BUILDING;
      }
    }
    else if(activeLayer === LAYERS.TYPE) {
      items = LAYER_CONFIG[LAYERS.TYPE].getItems(currentItem);
      if(currentItem.nextLayer === LAYERS.BUILDING) {
        Component = BuildingButton;
        propName = "building";
        layerKey = LAYERS.BUILDING;
      }
      else if(currentItem.nextLayer === LAYERS.UNIT) {
        Component = ApartmentButton;
        propName = "apartment";
        layerKey = LAYERS.UNIT;
      }
    }
    else if(activeLayer === LAYERS.BUILDING) {
      items = LAYER_CONFIG[LAYERS.BUILDING].getItems(currentItem);
      if(currentItem.nextLayer === LAYERS.FLOOR) {
        Component = FloorButton;
        propName = "floor";
        layerKey = LAYERS.FLOOR;
      }
      else if(currentItem.nextLayer === LAYERS.UNIT) {
        Component = ApartmentButton;
        propName = "apartment";
        layerKey = LAYERS.UNIT;
      }
    }
    else if(activeLayer === LAYERS.FLOOR) {
      items = LAYER_CONFIG[LAYERS.FLOOR].getItems(currentItem);
      Component = ApartmentButton;
      propName = "apartment";
      layerKey = LAYERS.UNIT;
    }
    else if(activeLayer === LAYERS.UNIT) return;
  }

  if(items.length === 0 || Component === null) return null;

  return (
     <div className="max-h-[calc(100vh-205px)] scrollbar-custom overflow-y-auto overflow-x-hidden space-y-3 px-2 py-2">
      {items.map((item) => (
        <Component
          key={item.id}
           {...{ [propName]: item }}
          goToItem={() => goToItem(item, layerKey)}
        />
      ))}
    </div>
  );
}
