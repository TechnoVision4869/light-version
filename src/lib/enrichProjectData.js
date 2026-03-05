import toast from 'react-hot-toast';
import { assetsApi } from '@/api/assetsApi';

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

  // For real data, convert all assetIds/videoIds to file URLs
  return await transformAssetIds(project);
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
  if (typeof obj !== 'object') {
    return obj;
  }

  // Handle objects
  const transformed = { ...obj };

  for (const [key, value] of Object.entries(transformed)) {
    // Check if this is an asset/video ID field
    if ((key.endsWith('AssetId') || key.endsWith('VideoId') || key.includes('highlight') || key.includes('zoomOutVideo')) && typeof value === 'string' && value) {
      try {
        // Call the API to get the file URL
        const fileUrl = await assetsApi.getAssetFileUrl(value);
        transformed[key] = fileUrl;
      } catch (error) {
        const errorMessage = `Failed to fetch asset URL for ${key}: ${value}`;
        console.error(errorMessage, error);
        toast.error(`Asset Error: ${key} (${value}) - Check console for details`);
        // Keep the original assetId if API fails, don't block
        transformed[key] = value;
      }
    } 
    // Recursively handle nested objects and arrays
    else if (typeof value === 'object') {
      transformed[key] = await transformAssetIds(value);
    }
  }
  console.log(transformed);
  
  return transformed;
}
