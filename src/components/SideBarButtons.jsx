import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../store/SidebarContextProvider";
import { MainContext } from "../store/MainContextProvider";
import { TABS, LAYERS} from "../data/layers";
import { PROPERTY_TYPE } from "../constants/roles";
import { featureApi } from "../api/admin/featureApi";
import { assetApi } from "../api/admin/assetApi";

import ZoneButton from "./buttons/ZoneButton";
import AmenityButton from "./buttons/AmenityButton";
import SurroundingButton from "./buttons/SurroundingButton";

// import TypeButton from "./buttons/TypeButton";
import BuildingButton from "./buttons/BuildingButton";
import FloorButton from "./buttons/FloorButton";
import ApartmentButton from "./buttons/ApartmentButton";

export default function SidebarButtons({ onNavigate = (action) => action() }) {
  const {
    currentProject, activeTab, activeLayer, currentItem, currentItems, goToItem, isPlaying,
    viewingFloorFeatures, setViewingFloorFeatures,
  } = useContext(SidebarContext);
  const { openRoomInterior } = useContext(MainContext);

  // Floor features: fetched lazily (only for the floor currently being viewed, not the whole
  // project upfront) since there's no per-project bulk endpoint — only featureApi.getByFloor.
  // Each one is a 360 panorama "room" (idle/side asset only, no forward/reverse transition and
  // no furniture toggle), so it's handled as a local drill-down here rather than through
  // SidebarContext's history/layer machinery, which is built around video transitions.
  // viewingFloorFeatures itself lives in SidebarContext (not local state) so Home.jsx's back
  // button can close it — same priority as it already gives MainContext's overlay.
  const [floorFeatures, setFloorFeatures] = useState([]);

  useEffect(() => {
    setViewingFloorFeatures(false);
    if (activeLayer !== LAYERS.FLOOR || !currentItem?.id) {
      setFloorFeatures([]);
      return;
    }
    let cancelled = false;
    featureApi.getByFloor(currentItem.id)
      .then((features) => Promise.all(features.map(async (feature) => {
        const sideUrl = feature.sideAssetId ? await assetApi.getAssetFileUrl(feature.sideAssetId) : null;
        const thumbnailUrl = feature.thumbnailAssetId ? await assetApi.getAssetFileUrl(feature.thumbnailAssetId) : null;
        return { ...feature, furnitureImgId: sideUrl, unfurnitureImgId: sideUrl, thumbnailAssetId: thumbnailUrl };
      })))
      .then((resolved) => { if (!cancelled) setFloorFeatures(resolved.filter((f) => f.furnitureImgId)); })
      .catch(() => { if (!cancelled) setFloorFeatures([]); });
    return () => { cancelled = true; };
  }, [activeLayer, currentItem?.id, setViewingFloorFeatures]);

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

  if (viewingFloorFeatures) {
    return (
      <div className="flex-1 min-h-0 scrollbar-custom overflow-y-auto overflow-x-hidden space-y-3 px-2 py-2">
        {floorFeatures.map((feature) => (
          <AmenityButton
            key={feature.id}
            amenity={feature}
            isDisabled={isPlaying}
            goToItem={() => onNavigate(() => openRoomInterior(feature))}
          />
        ))}
      </div>
    );
  }

  if (!currentItems || currentItems.length === 0 || Component === null) {
    if (!towerFeatures && floorFeatures.length === 0) return null;
  }

  // Apartment buttons (units, wherever they're shown — a floor, or a villa/townhouse property
  // with no floors) are listed alphabetically; every other button type keeps its natural/API order.
  const itemsToRender = propName === "apartment"
    ? [...currentItems].sort((a, b) =>
        String(a.displayName ?? a.name ?? "").localeCompare(String(b.displayName ?? b.name ?? ""), undefined, { numeric: true, sensitivity: "base" })
      )
    : currentItems;

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
      {floorFeatures.length > 0 && (
        <button
          onClick={() => onNavigate(() => setViewingFloorFeatures(true))}
          disabled={isPlaying}
          className="w-full text-left px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Features
        </button>
      )}
      {itemsToRender.map((item) => {
        const isImageOnly = activeLayer === LAYERS.BUILDING_FEATURE
          && !item.videos?.forwardVideo
          && item.videos?.idleVideo;
        const itemGoToItem = isImageOnly
          ? () => openRoomInterior({ furnitureImgId: item.videos.idleVideo, unfurnitureImgId: item.videos.idleVideo })
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
