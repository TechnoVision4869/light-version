# Refactoring Guide: MainContextProvider Architecture

## Overview
This document outlines the refactoring of the MainContextProvider to improve state management, component decoupling, and code maintainability.

## Problem Statement

### Issues with Previous Architecture
1. **Multiple Boolean Flags**: Management of separate boolean states (`isPanorama`, `isBalconyView`, `isRoomInterior`) made it difficult to maintain and prone to conflicting states
2. **Tight Component Coupling**: The Balcony component was tightly coupled to `currentItem.balconyView`, making it reusable only for unit balcony views
3. **Scattered State Logic**: Overlay handlers were called from different components (UnitPanel, BaseFloat), making the data flow implicit
4. **Redundant Code**: Each overlay type had nearly identical rendering logic with only minor variations
5. **Poor Scalability**: Adding new overlay types required modifying multiple files

## Solution: Unified Overlay State Management

### New Architecture

```javascript
// New unified overlay state
overlay: null | {
  type: 'panorama' | 'balcony' | 'room-interior' | 'gallery',
  data: {
    // Type-specific data passed to components
    unit?: Object,
    room?: Object,
    imageSource?: string,
    galleryType?: string
  }
}

// New action creators
openPanorama(unit)           // Open panorama view for a unit
openBalconyView(unit)        // Open balcony view for a unit
openRoomInterior(room)       // Open room interior view (modal)
openGallery(unit, type)      // Open gallery (floorPlans, gallery, cutSections)
closeOverlay()               // Close any active overlay
```

## Changes Made

### 1. **MainContextProvider** ([src/store/MainContextProvider.jsx](src/store/MainContextProvider.jsx))

#### Benefits
- **Single Source of Truth**: One `overlay` state object replaces 4 separate boolean flags
- **Type Safety**: The overlay type string makes it explicit which overlay is active
- **Data Encapsulation**: All required data for each overlay type is passed at once
- **Memized Actions**: Handler functions are wrapped in `useCallback` for stability and performance

```javascript
// OLD
const [isPanorama, setIsPanorama] = useState(false);
const [isBalconyView, setIsBalconyView] = useState(false);
const [isRoomInterior, setIsRoomInterior] = useState(false);
const [galleryType, setGalleryType] = useState(null);

// NEW
const [overlay, setOverlay] = useState(null);
```

### 2. **Balcony Component** ([src/components/Balcony.jsx](src/components/Balcony.jsx))

#### Key Changes
- **Decoupled from currentItem**: Now accepts `imageSource` prop directly
- **Generic Design**: Works for any 360° equirectangular image, not just balcony views
- **Room Interior Support**: Can display `room.furnitureImg` without coupling to unit data
- **Backward Compatibility**: Still accepts `apartment` prop for gradual migration

```javascript
// OLD
export default function Balcony({ apartment }) {
  const view = apartment.balconyView;  // Tightly coupled
}

// NEW
export default function Balcony({ imageSource, apartment, apartmentData }) {
  // Supports both new API (imageSource) and legacy API (apartment)
  const view = imageSource || apartment?.balconyView || apartmentData?.balconyView;
}
```

### 3. **Home Component** ([src/components/Home.jsx](src/components/Home.jsx))

#### Before
```javascript
  if (isPanorama) { /* panorama overlay */ }
  if (isBalconyView) { /* balcony overlay */ }
  if (isRoomInterior) { /* room interior modal */ }
  if (galleryType) { /* gallery overlay */ }
```

#### After
```javascript
  if (overlay?.type === 'panorama') { /* unified overlay rendering */ }
  if (overlay?.type === 'balcony') { /* same handler, different data */ }
  if (overlay?.type === 'room-interior') { /* reuses Balcony with room.furnitureImg */ }
  if (overlay?.type === 'gallery') { /* gallery with consistent data structure */ }
```

**Benefits**:
- Unified `closeOverlay()` function replaces `handleBack()`
- All overlays follow consistent rendering patterns
- Image source is passed directly: `<Balcony imageSource={overlay.data?.imageSource} />`

### 4. **BaseFloat Component** ([src/components/floating/BaseFloat.jsx](src/components/floating/BaseFloat.jsx))

#### Key Change
- **Room Data Passed**: When a room is selected, the entire room object is passed to `openRoomInterior(room)`
- **No Coupling**: BaseFloat no longer needs to know about currentItem

```javascript
// OLD
handleRoomInterior();  // Just sets flag, loses context

// NEW
openRoomInterior(room);  // Passes room data with furnitureImg
```

This allows the overlay system to access `room.furnitureImg` directly without needing to reference `currentItem`.

### 5. **UnitPanel Component** ([src/components/UnitPanel.jsx](src/components/UnitPanel.jsx))

#### Updates
```javascript
// OLD
const { handleInterior, handleBalconyView, handleGalleryType } = useContext(MainContext);
onClick={handleInterior}
onClick={handleBalconyView}
onClick={() => handleGalleryType("floorPlans")}

// NEW
const { openPanorama, openBalconyView, openGallery } = useContext(MainContext);
onClick={() => openPanorama(currentItem)}
onClick={() => openBalconyView(currentItem)}
onClick={() => openGallery(currentItem, "floorPlans")}
```

**Benefits**:
- Clearer intent: `openPanorama()` vs `handleInterior()`
- Explicit data passing: component knows what data is needed
- Easier testing: handlers are pure functions

## Best Practices Applied

### 1. **Single Responsibility Principle**
- MainContextProvider: Only manages overlay state
- Each component: Handles its specific rendering responsibility

### 2. **Composition Over Configuration**
```javascript
// Pass data, not flags
openPanorama(unit)          // Clear: opening panorama for specific unit
openGallery(unit, "gallery") // Clear: opening specific gallery type

// Instead of
handleInterior()            // Ambiguous: what interior?
handleGalleryType("gallery") // Relies on context to know which unit
```

### 3. **Derived State Pattern**
The new architecture supports deriving the old boolean flags from the overlay state for backward compatibility:
```javascript
isPanorama: overlay?.type === 'panorama',
isBalconyView: overlay?.type === 'balcony',
isRoomInterior: overlay?.type === 'room-interior',
galleryType: overlay?.type === 'gallery' ? overlay?.data?.galleryType : null,
```

### 4. **Data Encapsulation**
All data needed for rendering is passed at once:
```javascript
overlay: {
  type: 'room-interior',
  data: {
    room: { id, displayName, furnitureImg, ... },
    imageSource: room.furnitureImg
  }
}
```

### 5. **Memoization for Performance**
Handler functions are wrapped in `useCallback` to prevent unnecessary re-renders:
```javascript
const openPanorama = useCallback((unit) => {
  setOverlay({ type: 'panorama', data: { unit } });
}, []);
```

## Migration Path

### For Existing Code
If you have code still using the old API:
1. The old boolean flags (`isPanorama`, `isBalconyView`, etc.) still exist in the context
2. They're derived from the new `overlay` state
3. Gradually replace old calls with new API
4. No breaking changes during migration

### Example Migration
```javascript
// Step 1: Before
const { handleInterior } = useContext(MainContext);
onClick={handleInterior}

// Step 2: Transition (still works)
const { openPanorama } = useContext(MainContext);
const { currentItem } = useContext(SidebarContext);
onClick={() => openPanorama(currentItem)}

// Step 3: Refactored (more flexible)
// Component receives necessary data as props
// No need to access currentItem separately
```

## Testing Considerations

### Unit Tests
```javascript
describe('MainContextProvider', () => {
  it('should set overlay with correct type and data', () => {
    const { openPanorama } = useContext(MainContext);
    const unit = { id: 1, balconyView: '/image.jpg' };
    
    openPanorama(unit);
    
    // overlay.type === 'panorama'
    // overlay.data.unit === unit
  });
});
```

### Component Tests
```javascript
describe('Balcony', () => {
  it('should render with generic imageSource prop', () => {
    const { container } = render(
      <Balcony imageSource="/custom/path.jpg" />
    );
    // Should work with any image source
  });
});
```

## Future Enhancements

1. **Overlay History**: Track overlay stack for "back" navigation
```javascript
overlayHistory: [{type, data}, ...],
pushOverlay(overlay),
popOverlay()
```

2. **Overlay Animations**: Add transition states
```javascript
overlayState: 'entering' | 'active' | 'exiting',
transitionDuration: 300
```

3. **Multi-Modal Overlays**: Support nested overlays
```javascript
overlay: {
  primary: {...},
  secondary: {...}
}
```

4. **Overlay Preloading**: Optimize performance
```javascript
preloadOverlay(type, data),
isLoading: boolean
```

## Summary

The refactoring improves the codebase by:
- ✅ Reducing complexity: 4 flags → 1 state object
- ✅ Improving API clarity: Named functions vs ambiguous handlers
- ✅ Enhancing decoupling: Components accept data as props
- ✅ Enabling scalability: New overlay types add 1 case, not 4 new state variables
- ✅ Maintaining compatibility: Old API still works during migration
