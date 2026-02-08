import { useContext, useEffect } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { TABS, LAYERS, DATA } from "../data/layers";

import ZoneButton from "./buttons/ZoneButton";
import AmenityButton from "./buttons/AmenityButton";
import SurroundingButton from "./buttons/SurroundingButton";

// import TypeButton from "./buttons/TypeButton";
import BuildingButton from "./buttons/BuildingButton";
import FloorButton from "./buttons/FloorButton";
import ApartmentButton from "./buttons/ApartmentButton";

export default function SidebarButtons() {
  const { activeTab, activeLayer, currentItem, setCurrentItems, setType, goToItem } = useContext(SidebarContext);
  let items = [];
  let type = "";
  let Component = null;
  let propName = "";
  let layerKey = null;

  if (activeLayer === null) {
    if (activeTab === TABS.ZONES) {
      // items = TAB_CONFIG[TABS.ZONES].getItems();
      items = DATA.project.zones.items;
      Component = ZoneButton;
      propName = "zone";
      layerKey = LAYERS.ZONE_DETAIL;
    }
    else if (activeTab === TABS.AMENITIES) {
      // items = TAB_CONFIG[TABS.AMENITIES].getItems();
      items = DATA.project.amenities.items;
      Component = AmenityButton;
      propName = "amenity";
      layerKey = LAYERS.AMENITY_DETAIL;
    }
    else if (activeTab === TABS.SURROUNDINGS) {
      // items = TAB_CONFIG[TABS.SURROUNDINGS].getItems();
      items = DATA.project.surroundings.items;
      console.log(items);

      Component = SurroundingButton;
      propName = "surrounding";
      layerKey = LAYERS.SURROUNDING_DETAIL;
    }
  }
  else
    {
      if (activeLayer === LAYERS.ZONE_DETAIL) {
        items = currentItem.properties;
        // console.log(items);
        if (items.length === 1) {
          if (items[0].type === "villa") {
            type = "villa";
            items = items[0].units;
            Component = ApartmentButton;
            propName = "apartment";
            layerKey = LAYERS.UNIT;
          }
          else if (items[0].type === "town") {
            items = items[0].units;
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
        // console.log(currentItem.type);
        if (currentItem.type === "tower") {
          items = currentItem.floors;
          Component = FloorButton;
          propName = "floor";
          layerKey = LAYERS.FLOOR;
        }
        else {
          items = currentItem.units;
          Component = ApartmentButton;
          propName = "apartment";
          layerKey = LAYERS.UNIT;
        }
      }
      else if (activeLayer === LAYERS.FLOOR) {
        items = currentItem.units;
        Component = ApartmentButton;
        propName = "apartment";
        layerKey = LAYERS.UNIT;
      }
      else if (activeLayer === LAYERS.UNIT) return;
  }

  useEffect(() => {
    setCurrentItems(items);
    setType(type);
  }, [activeTab, activeLayer]);

  if (!items || items?.length === 0 || Component === null) return null;

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
