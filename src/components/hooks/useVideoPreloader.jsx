// hooks/useVideoPreloader.js
import { useState, useEffect } from 'react';
import { TABS, LAYERS, TAB_CONFIG, LAYER_CONFIG, DATA } from "../../data/layers"; // Adjust path

export function useVideoPreloader() {
  const [loadingProgress, setLoadingProgress] = useState(0); // 0-100%
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedVideos, setPreloadedVideos] = useState(new Map()); // Store loaded video URLs

  useEffect(() => {
    const allVideoUrls = new Set();

    // Helper to add video paths from a config object
    const addVideoPaths = (pathsObj) => {
      if (pathsObj) {
        Object.values(pathsObj).forEach(path => {
          if (path) allVideoUrls.add(path);
        });
      }
    };

    // Collect all video URLs from TAB_CONFIG
    Object.values(TAB_CONFIG).forEach(config => {
      if (config.videosPath) {
        // If videosPath is a function, we need to call it with a dummy/valid argument
        // or if it's an object, just get its values.
        // For simplicity, assuming it's an object here, adjust as needed.
        if (typeof config.videosPath === 'function') {
            // This is trickier, need to know the arguments.
            // For now, assume it returns an object like { forwardVideo, reverseVideo, idleVideo }
            // You might need to iterate DATA or have specific logic here.
            // Example for HOME:
            if (config.videosPath === TAB_CONFIG[TABS.HOME].videosPath) {
                addVideoPaths(config.videosPath); // Call it without args if it's static
            }
            // Add other specific static calls if applicable
        } else {
            addVideoPaths(config.videosPath);
            console.log(allVideoUrls);
            
        }
      }
    });

    // Collect all video URLs from LAYER_CONFIG for all possible items
    // This is the complex part - you need to iterate through all possible items
    // Zones
    DATA.zones.forEach(zone => {
        const paths = LAYER_CONFIG[LAYERS.ZONE_DETAIL].videosPath(zone);
        addVideoPaths(paths);
        // Buildings within zone
        DATA.buildings.filter(b => b.zoneId === zone.id).forEach(building => {
            const buildingPaths = LAYER_CONFIG[LAYERS.BUILDING].videosPath(building);
            addVideoPaths(buildingPaths);
            // Views for this building
            for (let viewIndex = 0; viewIndex < (building.numViews || 4); viewIndex++) {
                const viewPaths = LAYER_CONFIG[LAYERS.BUILDING].getVideosPathForView(building, viewIndex);
                addVideoPaths(viewPaths);
            }
            // Floors within building
            DATA.floors.filter(f => f.buildingId === building.id).forEach(floor => {
                const floorPaths = LAYER_CONFIG[LAYERS.FLOOR].videosPath(floor);
                addVideoPaths(floorPaths);
                // Apartments within floor
                // DATA.apartments.filter(a => a.floorId === floor.id && a.buildingId === building.id).forEach(apartment => {
                //     const aptPaths = LAYER_CONFIG[LAYERS.APARTMENT].videosPath(apartment);
                //     addVideoPaths(aptPaths);
                // });
            });
        });
    });

    // Surroundings
    DATA.surroundings.forEach(surr => {
        // const surrPaths = LAYER_CONFIG[LAYERS.SURROUNDING_DETAIL].videosPath(surr);
        // addVideoPaths(surrPaths);
    });

    // Amenities
    DATA.amenities.forEach(amen => {
        const amenPaths = LAYER_CONFIG[LAYERS.AMENITY_DETAIL].videosPath(amen);
        addVideoPaths(amenPaths);
    });

    // console.log('Preloading videos:', Array.from(allVideoUrls)); // Debug log

    const videoArray = Array.from(allVideoUrls);
    let loadedCount = 0;

    if (videoArray.length === 0) {
      setIsLoading(false);
      return;
    }

    const preloadVideo = (url) => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.src = url;

        video.onloadeddata = () => {
          setPreloadedVideos(prev => new Map(prev).set(url, video.src));
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / videoArray.length) * 100));
          resolve();
        };

        video.onerror = (e) => {
          console.error(`Failed to load video: ${url}`, e);
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / videoArray.length) * 100));
          resolve(); // Continue even if one fails
        };
      });
    };

    const loadAllVideos = async () => {
        console.log("here");
      try {
        
        await Promise.all(videoArray.map(url => preloadVideo(url)));
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading videos:', error);
        setIsLoading(false);
      }
    };

    loadAllVideos();
  }, []);

  return { isLoading, loadingProgress, preloadedVideos };
}