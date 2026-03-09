import toast from "react-hot-toast";
import { assetApi } from "../api/admin/assetApi";
import { unitTypeApi } from "../api/admin/unitTypeApi";

/**
 * Recursively enriches project data by converting assetIds to file URLs
 * For mock data, returns the project unchanged
 * For real data, converts all *AssetId and *VideoId fields to URLs via the API
 *
 * @param {Object} project - The project object to enrich
 * @param {boolean} useMockup - Whether to use mock data (if true, skips API calls)
 * @returns {Promise<Object>} The enriched project object
 */
export async function enrichProjectData(project, useMockup) {
  if (!project) return null;

  // For mock data, return as-is (already has correct paths/URLs)
  if (useMockup) {
    return project;
  }

  // For real data, convert all assetIds/videoIds to file URLs and fetch unit types
  const enrichedProject = await transformAssetIds(project);
  
  // Fetch and attach unit types to the project
  try {    
    let unitTypes = await unitTypeApi.getByProject(enrichedProject.id);
    if (!unitTypes || unitTypes.length === 0) {
      console.warn(`No unit types found for project ${enrichedProject.id}`);
    } else {
      // Enrich unit types: convert gallery/cutSections/floorPlans assets and levels/rooms images
      unitTypes = await Promise.all(
        unitTypes.map(async (unitType) => {
          const enriched = await transformAssetIds(unitType);
          return await enrichUnitTypeLevels(enriched);
        })
      );
    }
    enrichedProject.unitTypes = unitTypes;
  } catch (error) {
    console.error("Failed to fetch unit types:", error);
    toast.error("Failed to fetch unit types");
  }
  
  return enrichedProject;
}

/**
 * Recursively traverses an object and converts all *AssetId and *VideoId fields to file URLs
 * @private
 */
async function transformAssetIds(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => transformAssetIds(item)));
  }

  // Handle primitive types
  if (typeof obj !== "object") {
    return obj;
  }

  // Handle objects
  const transformed = { ...obj };

  for (const [key, value] of Object.entries(transformed)) {
    // Check if this is an asset/video ID field
    if (
      (key.endsWith("AssetId") ||
        key.endsWith("VideoId") ||
        key.includes("highlight") ||
        key.includes("zoomOutVideo") ||
        key.includes("balconyView")) &&
      typeof value === "string" &&
      value
    ) {
      try {
        // Call the API to get the file URL
        const fileUrl = await assetApi.getAssetFileUrl(value);
        transformed[key] = fileUrl;
      } catch (error) {
        const errorMessage = `Failed to fetch asset URL for ${key}: ${value}`;
        console.error(errorMessage, error);
        toast.error(
          `Asset Error: ${key} (${value}) - Check console for details`,
        );
        // Keep the original assetId if API fails, don't block
        transformed[key] = value;
      }
    }
    // Special handling for gallery, cutSections, and floorPlans arrays
    else if (
      (key === "gallery" || key === "cutSections" || key === "floorPlans") &&
      Array.isArray(value)
    ) {
      transformed[key] = await enrichImageArrays(value);
    }
    // Recursively handle nested objects and arrays
    else if (typeof value === "object") {
      transformed[key] = await transformAssetIds(value);
    }
  }
  // console.log(transformed);
  return transformed;
}

/**
 * Enriches image arrays (gallery, cutSections, floorPlans) by converting assetId to src URLs
 * @private
 */
async function enrichImageArrays(imageArray) {
  return Promise.all(
    imageArray.map(async (item) => {
      if (!item.assetId) return item;
      
      try {
        const fileUrl = await assetApi.getAssetFileUrl(item.assetId);
        return {
          ...item,
          src: fileUrl, // Transform assetId to src for component consumption
        };
      } catch (error) {
        console.error(`Failed to fetch asset URL for gallery item ${item.id}:`, error);
        // Keep the original assetId as fallback
        return item;
      }
    })
  );
}

/**
 * Enriches unitType levels and rooms by converting furnitureImgId and unfurnitureImgId to URLs
 * Knows the exact structure: unitType > levels > rooms
 * @private
 */
async function enrichUnitTypeLevels(unitType) {
  if (!unitType || !unitType.levels || !Array.isArray(unitType.levels)) {
    return unitType;
  }

  const enriched = { ...unitType };
  enriched.levels = await Promise.all(
    unitType.levels.map(async (level) => {
      const enrichedLevel = { ...level };
      
      if (level.rooms && Array.isArray(level.rooms)) {
        enrichedLevel.rooms = await Promise.all(
          level.rooms.map(async (room) => {
            const enrichedRoom = { ...room };
            
            // Transform furnitureImgId
            if (room.furnitureImgId) {
              try {
                enrichedRoom.furnitureImgId = await assetApi.getAssetFileUrl(room.furnitureImgId);
              } catch (error) {
                console.error(`Failed to fetch furnitureImgId for room ${room.id}:`, error);
              }
            }
            
            // Transform unfurnitureImgId
            if (room.unfurnitureImgId) {
              try {
                enrichedRoom.unfurnitureImgId = await assetApi.getAssetFileUrl(room.unfurnitureImgId);
              } catch (error) {
                console.error(`Failed to fetch unfurnitureImgId for room ${room.id}:`, error);
              }
            }
            
            return enrichedRoom;
          })
        );
      }
      
      return enrichedLevel;
    })
  );

  return enriched;
}
