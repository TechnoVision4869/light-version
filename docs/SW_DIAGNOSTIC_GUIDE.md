## 🔧 Service Worker Debugging Guide

### Step 1: Rebuild & Test

```bash
npm run build
npm run preview
```

### Step 2: Open DevTools & Check Service Worker Registration

1. **Press `F12`** to open DevTools
2. **Go to Application tab** → **Service Workers**
3. Look for entry with URL ending in `/sw.js`
   - Status should be: **"activated and running"**
   - If shows "installing" or "waiting" → page is being controlled
4. **Carefully observe the console logs** for:
   - `[SW] Service Worker script loaded` ✅
   - `[SW] Install event` ✅
   - `[SW] Activate event` ✅

❌ **If no SW is registered:**
- Delete everything in **Application → Cache Storage**
- Unregister SW in **Application → Service Workers** → click "Unregister"
- Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- Check console for errors

### Step 3: Monitor Video Requests

1. **Open Console tab** (Console, not Application)
2. **Look for `[SW] Video request:` logs** while videos are loading
3. Each video should log something like:
   ```
   [SW] Video request: https://api.../assets/file/video-123
   [SW] Caching video: /assets/file/video-123
   ```

### Step 4: Verify Cache Storage

1. Go to **Application → Cache Storage**
2. You should see folders:
   - `techno-vision-videos` ← Videos cache
   - `techno-vision-api` ← API responses
   - `techno-vision-images` ← Images

3. **Click on `techno-vision-videos`**
   - Should list video URLs like: `https://api.../assets/file/video-123`
   - Size column shows cache size per video

❌ **If cache folders don't exist:**
- Check console for `[SW] Caching video:` logs
- If no logs → requests aren't matching the route pattern
- Try Network tab to see actual video URLs

### Step 5: Check Network Tab

1. **Go to Network tab**
2. **Filter by**: Type `media` or `fetch`
3. **Load a project** with videos
4. You should see requests like:
   - `https://api.../assets/file/video-123` (Status: 200)
5. Response headers should show **cached by SW** (look for cache headers or size indicators)

### Step 6: Run Console Diagnostics

Open DevTools **Console** and run:

```javascript
// Check if SW is registered
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('Registered SWs:', regs.length);
  regs.forEach(reg => console.log('- Active:', reg.active?.scriptURL));
});

// Check cache contents
async function checkCaches() {
  const names = await caches.keys();
  console.log('Available caches:', names);
  
  for (const name of names) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    console.log(`${name}: ${keys.length} entries`);
  }
}
checkCaches();

// Check if videos are cached
async function findVideos() {
  const cache = await caches.open('techno-vision-videos');
  const keys = await cache.keys();
  console.table(keys.map(k => ({ url: k.url })));
}
findVideos();
```

### Step 7: Common Issues & Fixes

**Issue: "No SW registered"**
- Solution: Hard refresh (Ctrl+Shift+R), check build output for errors

**Issue: "SW registered but cache is empty"**
- Solution: Check Network tab to see actual video URLs
- The route pattern might not match your actual URLs
- Check console for `[SW] Caching video:` logs

**Issue: "Cache folder exists but no videos"**
- Solution: The fetch might be failing (CORs, network error)
- Check Network tab → Response tab for each video request
- Look for HTTP errors (4xx, 5xx)

**Issue: "Videos load but cache doesn't persist"**
- Solution: Browser might be clearing cache due to storage pressure
- Request persistent storage:
  ```javascript
  navigator.storage.persist().then(persisted => {
    console.log('Persistent:', persisted);
  });
  ```

### Step 8: Verify Video URLs

Check what URLs your app is actually requesting:

```javascript
// In Network tab, click on a video request
// Go to "Headers" tab
// Check "Request URL" - should be like:
// https://api.../assets/file/abc123

// The SW route looks for:
// - url.pathname.includes('/assets/file/')  ← Should match
// OR
// - url.pathname.endsWith('.mp4')
// OR  
// - url.pathname.endsWith('.webm')

// If your URL is different, the route won't match!
```

### Step 9: Check Build Output

After `npm run build`, verify:

```bash
# Check that sw.js was created
ls -la dist/sw.js

# Check output - should show SW was generated
# Message should say something about precache manifest
```

### Step 10: Final Test Flow

1. **Open app in preview mode**
2. **Watch console** for `[SW] Video request:` logs
3. **While loading**, check **Network tab → Cache Storage**
4. **Videos should appear** in `techno-vision-videos` folder
5. After loading completes → **Offline mode**
   - Go to **Network → Offline** (toggle on)
   - Videos should still play from cache

---

### 📊 Expected Console Output During Video Load

```
[SW] Service Worker script loaded
[SW] Precache manifest found, entries: 45
[SW] Install event
[SW] Activate event
[SW] Video request: https://api.../assets/file/zone-1-forward
[SW] Caching video: /assets/file/zone-1-forward
[SW] Video request: https://api.../assets/file/zone-1-reverse
[SW] Caching video: /assets/file/zone-1-reverse
... more videos ...
[Cache] Loading 40 unique videos at depth 1
[Cache] Progress: 5/40
[Cache] Progress: 10/40
... more progress ...
[Cache] Preload complete: 40 loaded, 0 failed, 95.2MB cached
```

If you don't see these logs, the Service Worker isn't being activated. Try the hard refresh and check for build errors!
