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
 * @param {number} preloadDepth - How many levels deep to prefetch videos (0-3)
 * @returns {Promise<Object>} The enriched project object
 */
export async function enrichProjectData(project, useMockup, preloadDepth = 3) {
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
  
  // Load all videos upfront and wait for Service Worker to cache them
  if (preloadDepth > 0) {
    try {
      console.log('[Cache] Starting video preload...');
      toast.loading('Loading project assets...', { id: 'asset-load' });
      
      await prefetchProjectByLevels(enrichedProject, preloadDepth);
      
      toast.success('Project assets loaded', { id: 'asset-load' });
      console.log('[Cache] Video preload complete');
    } catch (error) {
      console.error('[Cache] Video preload failed:', error);
      toast.error('Some assets failed to load', { id: 'asset-load' });
    }
  }
  
  return enrichedProject;
}

/**
 * Intelligent preloading strategy based on project hierarchy depth
 * BLOCKING: Waits for all videos to be cached by Service Worker before returning
 * 
 * Level 0: No preloading
 * Level 1: Zones + Surroundings + Amenities videos (fast, ~30-40 videos)
 * Level 2: Also Properties within zones (~60-80 videos total)
 * Level 3: Also Unit interiors (~150+ videos total, takes longer)
 * 
 * @param {Object} project - The enriched project
 * @param {number} depth - Maximum depth to prefetch (0-3)
 * @returns {Promise<{loaded: number, failed: number, totalSize: string}>}
 */
export async function prefetchProjectByLevels(project, depth = 1) {
  if (!project || depth < 1) {
    return { loaded: 0, failed: 0, totalSize: '0 MB' };
  }

  const videoUrls = [];

  // ===== LEVEL 0: Project Videos (already loaded from URL conversion) =====
  const projectVideos = [
    project.zoomoutAssetId,
    project.introAssetId,
    project.idleAssetId,
  ];
  projectVideos.forEach((vid) => {
    if (vid && typeof vid === 'string') videoUrls.push(vid);
  });

  // ===== LEVEL 1: Zone Videos =====
  if (depth >= 1 && project?.zones?.items?.length) {
    project.zones.items.forEach((zone) => {
      const zoneVideos = [
        zone.zoomoutAssetId,
        zone.zoomoutVideo,
        zone.forwardAssetId,
        zone.reverseAssetId,
      ];
      zoneVideos.forEach((vid) => {
        if (vid && typeof vid === 'string' && !videoUrls.includes(vid)) {
          videoUrls.push(vid);
        }
      });

      // ===== LEVEL 2: Property Videos (within zones) =====
      if (depth >= 2 && zone.properties?.length) {
        zone.properties.forEach((property) => {
          const propVideos = [
            property.forwardAssetId,
            property.reverseAssetId,
            property.idleAssetId,
            property.zoomoutAssetId,
          ];
          propVideos.forEach((vid) => {
            if (vid && typeof vid === 'string' && !videoUrls.includes(vid)) {
              videoUrls.push(vid);
            }
          });

          // ===== LEVEL 3: Unit Interior Videos =====
          if (depth >= 3 && property.units?.length) {
            property.units.forEach((unit) => {
              const unitVideos = [
                unit.forwardAssetId,
                unit.reverseAssetId,
                unit.idleAssetId,
              ];
              unitVideos.forEach((vid) => {
                if (vid && typeof vid === 'string' && !videoUrls.includes(vid)) {
                  videoUrls.push(vid);
                }
              });
            });
          }
        });
      }
    });
  }

  // ===== LEVEL 1: Surroundings Videos =====
  if (depth >= 1 && project?.surroundings?.items?.length) {
    project.surroundings.items.forEach((surrounding) => {
      const videos = [
        surrounding.zoomoutAssetId,
        surrounding.forwardAssetId,
        surrounding.reverseAssetId,
        surrounding.idleAssetId || surrounding.sideVideoId,
      ];
      videos.forEach((vid) => {
        if (vid && typeof vid === 'string' && !videoUrls.includes(vid)) {
          videoUrls.push(vid);
        }
      });
    });
  }

  // ===== LEVEL 1: Amenities Videos =====
  if (depth >= 1 && project?.amenities?.items?.length) {
    project.amenities.items.forEach((amenity) => {
      const videos = [
        amenity.zoomoutAssetId,
        amenity.forwardAssetId,
        amenity.reverseAssetId,
        amenity.idleAssetId,
      ];
      videos.forEach((vid) => {
        if (vid && typeof vid === 'string' && !videoUrls.includes(vid)) {
          videoUrls.push(vid);
        }
      });
    });
  }

  // Remove duplicates
  const uniqueUrls = [...new Set(videoUrls)];
  console.log(`[Cache] Loading ${uniqueUrls.length} unique videos at depth ${depth}`);

  // Load videos in parallel batches (5 at a time to avoid overwhelming network)
  const batchSize = 5;
  let loaded = 0;
  let failed = 0;
  let totalBytes = 0;

  for (let i = 0; i < uniqueUrls.length; i += batchSize) {
    const batch = uniqueUrls.slice(i, i + batchSize);
    
    const results = await Promise.allSettled(
      batch.map((url) => loadAndCacheVideo(url))
    );

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        loaded++;
        totalBytes += result.value;
      } else {
        failed++;
        console.warn('[Cache] Failed to load video:', result.reason);
      }
    });

    // Log progress
    const progress = Math.min(i + batchSize, uniqueUrls.length);
    console.log(`[Cache] Progress: ${progress}/${uniqueUrls.length}`);
  }

  const totalSizeMB = (totalBytes / 1024 / 1024).toFixed(2);
  console.log(
    `[Cache] Preload complete: ${loaded} loaded, ${failed} failed, ${totalSizeMB}MB cached`
  );

  return { loaded, failed, totalSize: `${totalSizeMB} MB` };
}

/**
 * Load a single video and ensure Service Worker caches it
 * @private
 */
async function loadAndCacheVideo(url) {
  if (!url) return 0;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const blob = await response.blob();
    return blob.size;
  } catch (error) {
    console.warn(`[Cache] Failed to load ${url}:`, error.message);
    throw error;
  }
}

/**
 * Get detailed level structure for debugging/monitoring
 * Returns information about what's available at each depth
 */
export function describeLevels(project) {
  if (!project) return null;

  return {
    level0: {
      name: 'Project',
      videos: [
        project.zoomoutAssetId,
        project.introAssetId,
        project.idleAssetId,
      ].filter(Boolean).length,
    },
    level1: {
      name: 'Zones + Surroundings + Amenities',
      zones: project.zones?.items?.length || 0,
      surroundings: project.surroundings?.items?.length || 0,
      amenities: project.amenities?.items?.length || 0,
      totalVideos: (project.zones?.items?.length || 0) * 3 +
                   (project.surroundings?.items?.length || 0) * 3 +
                   (project.amenities?.items?.length || 0) * 3,
    },
    level2: {
      name: 'Properties (within Zones)',
      totalProperties: (project.zones?.items || []).reduce(
        (sum, z) => sum + (z.properties?.length || 0),
        0
      ),
      totalVideos: (project.zones?.items || []).reduce(
        (sum, z) => sum + (z.properties?.length || 0),
        0
      ) * 4,
    },
    level3: {
      name: 'Units + Interiors',
      totalUnits: (project.zones?.items || []).reduce(
        (sum, z) => sum + (z.properties || []).reduce(
          (psum, p) => psum + (p.units?.length || 0),
          0
        ),
        0
      ),
      totalVideos: (project.zones?.items || []).reduce(
        (sum, z) => sum + (z.properties || []).reduce(
          (psum, p) => psum + (p.units?.length || 0),
          0
        ),
        0
      ) * 3,
    },
  };
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
        key.endsWith("ImgId") ||
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
  console.log(transformed);
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
