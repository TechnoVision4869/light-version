/**
 * UPDATED ASSET LOADING STRATEGY
 * 
 * NEW BEHAVIOR (v2):
 * - enrichProjectData() now BLOCKS until all videos are cached
 * - Videos load in parallel batches (5 at a time)
 * - Service Worker intercepts all fetch requests and caches them
 * - User sees "Loading project assets..." toast during preload
 * - Full project hierarchy is available after loading completes
 * 
 * USAGE:
 */

// In your component (e.g., when project is selected):
import { enrichProjectData } from '@/lib/enrichProjectData';

// Usage example:
async function loadProject(projectId) {
  try {
    // Fetch raw project from API
    const rawProject = await projectApi.getById(projectId);
    
    // Enrich & load all assets upfront (BLOCKING)
    // preloadDepth parameter:
    // 0 = No preloading (not recommended)
    // 1 = Load zones + amenities only (~30-40 videos) ✅ Recommended
    // 2 = Also load properties (~60-80 videos)
    // 3 = Also load unit interiors (~150+ videos, slower)
    
    const enrichedProject = await enrichProjectData(rawProject, false, 1);
    
    // At this point, all videos are cached in Service Worker
    // User can now navigate smoothly - all videos available offline
    
    setCurrentProject(enrichedProject);
  } catch (error) {
    console.error('Failed to load project:', error);
    toast.error('Failed to load project');
  }
}

/**
 * WHAT'S HAPPENING UNDER THE HOOD:
 * 
 * 1. enrichProjectData(project, useMockup, preloadDepth) is called
 * 2. Project data is enriched (all assetIds → file URLs)
 * 3. prefetchProjectByLevels() is awaited (BLOCKING)
 *    - Collects unique video URLs based on depth
 *    - Fetches them in batches of 5
 *    - Service Worker intercepts each fetch and caches it
 *    - Waits for ALL to complete before returning
 * 4. Toast shows "Project assets loaded"
 * 5. enrichProjectData() returns with full project
 * 6. Your component receives enrichedProject with all videos cached
 * 
 * SERVICE WORKER CACHING:
 * - src/sw.js has CacheFirst strategy for /assets/file/* URLs
 * - When video is fetched, SW caches it automatically
 * - Future plays pull from cache (instant, works offline)
 * - Cache expires after 30 days
 * 
 * 
 * DEBUGGING:
 */

import { monitorCaches, inspectAllCaches } from '@/lib/cacheUtils';

// Check cache state anytime:
const summary = await monitorCaches();
// Console output:
// Storage: 45.3MB / 100MB (45.3%)
// Video Caches: 42.1MB
// API Caches: 0.2MB
// Total Caches: 3, Entries: 85

// See all cached videos:
const caches_data = await inspectAllCaches();
console.table(caches_data);

// Search for specific cached videos:
const kogVideos = await searchCaches('kog');

/**
 * DEPTH RECOMMENDATION CHART:
 * 
 * Depth 0: No preload
 *   ├─ Use: Testing, low bandwidth
 *   └─ Impact: Videos load on-demand
 * 
 * Depth 1: Zones + Amenities (RECOMMENDED ✅)
 *   ├─ Videos: ~30-40
 *   ├─ Size: ~80-100 MB
 *   ├─ Time: ~30-60 seconds on 4G
 *   └─ Best for: Most projects, balanced experience
 * 
 * Depth 2: + Properties
 *   ├─ Videos: ~60-80
 *   ├─ Size: ~160-200 MB
 *   ├─ Time: ~2-3 min on 4G
 *   └─ Best for: Power users, WiFi only
 * 
 * Depth 3: + Unit Interiors
 *   ├─ Videos: ~150+
 *   ├─ Size: ~400+ MB
 *   ├─ Time: ~5-10 min on 4G
 *   └─ Best for: Downloads on WiFi
 * 
 * 
 * NETWORK OPTIMIZATION:
 * - Videos load in batches of 5 (configurable in prefetchProjectByLevels)
 * - Each fetch uses default priority (can add { priority: 'high' } if needed)
 * - Failed videos are logged but don't block UI
 * - Return value: { loaded: 85, failed: 0, totalSize: '95.2 MB' }
 * 
 * 
 * OFFLINE SUPPORT:
 * - After preload completes, all cached videos work offline
 * - Service Worker serves from cache (no network needed)
 * - API calls use NetworkFirst (fresh data, cache fallback)
 * - Images use StaleWhileRevalidate (serve cached, update bg)
 */
