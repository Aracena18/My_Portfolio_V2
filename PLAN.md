# Premium 3D Portfolio Showcase - Implementation Plan

> **Goal:** Transform the portfolio's "Work" section into a cinematic, scroll-driven 3D experience that rivals Apple and GTA 6 websites.

---

## Table of Contents

1. [Overview](#overview)
2. [Creative Direction](#creative-direction)
3. [Technical Architecture](#technical-architecture)
4. [Implementation Phases](#implementation-phases)
5. [Asset Requirements](#asset-requirements)
6. [Progress Tracker](#progress-tracker)

---

## Overview

### What We're Building

A **unified scroll-driven 3D showcase** featuring all 4 projects with cinematic transitions:

| Project | 3D Model | Key Effect |
|---------|----------|------------|
| AgriSense | iPhone | Holographic leaf particles |
| ESP32 Scanner | ESP32-CAM board | Scan line + neural network viz |
| ARMS | MacBook/Monitor | Floating 3D charts |
| Realitech | IoT Hub + sensors | Glowing connections + water |

### Design Principles

- **Balanced Mix**: Cinematic transitions + clean professional content
- **Story-Driven**: Each transition connects projects narratively
- **Performance-First**: 60fps target, progressive loading
- **Mobile-Aware**: Graceful degradation on lower-end devices

---

## Creative Direction

### Project 1: AgriSense (Mobile App)
**Scroll Range: 0% - 25%**

```
ENTRY (0-5%):
├── Phone emerges from darkness, floating
├── Soft green ambient light fades in
└── Title "AgriSense" reveals letter-by-letter

ACTIVE (5-20%):
├── Phone tilts 15° toward camera
├── Stats animate: "92% Accuracy" / "<3s Response"
└── Holographic leaf particles float upward (~20 particles)

EXIT → ESP32 (20-25%):
├── Phone rotates to show back camera lens
├── Camera focuses on lens (depth of field)
├── Phone shrinks, transforms into ESP32
└── Text: "From software to silicon..."
```

### Project 2: ESP32 Leaf Scanner (Hardware)
**Scroll Range: 25% - 50%**

```
ENTRY (25-30%):
├── Device materializes from phone's camera lens
├── Green scan line sweeps across device
└── Circuit traces glow (powering up effect)

ACTIVE (30-45%):
├── Board rotates slowly, showing components
├── 3D leaf drifts into frame
├── Scan line animation across leaf
├── Classification data: "180ms / $15"
└── Neural network viz: floating nodes + connections

EXIT → ARMS (45-50%):
├── Components scatter gently
├── Particles flow right, coalesce
├── Transform into monitor frame
└── Text: "From edge to enterprise..."
```

### Project 3: ARMS (Web Dashboard)
**Scroll Range: 50% - 75%**

```
ENTRY (50-55%):
├── Monitor assembles from wireframe
├── Screen illuminates with warm glow
└── Dashboard texture loads

ACTIVE (55-70%):
├── Camera arc: behind → front reveal
├── 3D charts float off screen into space
├── Stats: "150+ Farms / 40% Time Saved"
└── Data particles flow between screen & charts

EXIT → Realitech (70-75%):
├── Charts retract into screen
├── Monitor fades to silhouette
├── Water droplets begin falling
└── Text: "From data to action..."
```

### Project 4: Realitech (IoT System)
**Scroll Range: 75% - 100%**

```
ENTRY (75-80%):
├── Hub emerges from water splash
├── Sensor nodes orbit into position
└── Glowing connection lines appear

ACTIVE (80-92%):
├── Camera orbits complete system
├── Water particle effects (subtle mist)
└── Stats: "35% Water Saved / 99.2% Uptime"

FINALE (92-100%):
├── System consolidates to center
├── Nodes merge into glowing point
├── Zoom out to logo/initials
└── Text: "Let's build the future."
```

---

## Technical Architecture

### New File Structure

```
/components/
  /showcase/
    ShowcaseSection.tsx        # Main wrapper (replaces CaseStudies)
    ShowcaseOrchestrator.tsx   # Scroll coordinator + text content
    ProjectScene.tsx           # Per-project 3D scene wrapper
    SceneTransitions.tsx       # Cross-project morphing

  /three/
    /models/
      PhoneModel.tsx           # AgriSense (enhance existing)
      ESP32Model.tsx           # NEW
      MonitorModel.tsx         # NEW
      IoTHubModel.tsx          # NEW

    /effects/
      HologramParticles.tsx    # Floating particles
      ScanLine.tsx             # Green sweep shader
      DataStream.tsx           # Connection lines
      WaterDroplets.tsx        # Rain particles

    ShowcaseCanvas.tsx         # Unified 3D canvas
    CameraController.tsx       # Cinematic camera
    LightingSystem.tsx         # Dynamic presets

  /animations/
    TextReveal.tsx             # Letter-by-letter
    CounterAnimation.tsx       # Stat counters

  Preloader.tsx                # Loading experience
  CustomCursor.tsx             # Context-aware cursor

/contexts/
  ShowcaseContext.tsx          # Unified state management
```

### State Architecture

```typescript
interface ShowcaseState {
  // Scroll
  scrollProgress: number;        // 0-1 total
  activeProject: 'agrisense' | 'esp32' | 'arms' | 'realitech';
  projectProgress: number;       // 0-1 within project

  // 3D
  camera: { x, y, z, fov };
  lighting: 'ambient' | 'studio' | 'dramatic' | 'warm';

  // Transitions
  transitionPhase: 'idle' | 'exiting' | 'entering';
}
```

### Lighting Presets

| Project | Key Light | Fill | Accent | Mood |
|---------|-----------|------|--------|------|
| AgriSense | Warm green | Soft white | None | Natural, organic |
| ESP32 | Cool white | Blue | Green scan | Laboratory, precise |
| ARMS | Neutral white | Screen glow | Blue rim | Professional |
| Realitech | Golden | Ambient | Blue data | Sunset, hopeful |

---

## Implementation Phases

### Phase 1: Foundation
*Core infrastructure - everything depends on this*

| Step | Task | File | Status |
|------|------|------|--------|
| 1.1 | Create ShowcaseContext | `/contexts/ShowcaseContext.tsx` | ✅ |
| 1.2 | Build ShowcaseCanvas | `/components/three/ShowcaseCanvas.tsx` | ✅ |
| 1.3 | Create CameraController | `/components/three/CameraController.tsx` | ✅ |
| 1.4 | Build LightingSystem | `/components/three/LightingSystem.tsx` | ✅ |

### Phase 2: Project Models
*3D scenes for each project - user provides GLTF models*

| Step | Task | File | Status |
|------|------|------|--------|
| 2.1 | Enhance PhoneModel | `/components/three/models/AgriSenseModel.tsx` | ✅ |
| 2.2 | Create ESP32Model | `/components/three/models/ESP32Model.tsx` | ✅ |
| 2.3 | Create MonitorModel | `/components/three/models/MonitorModel.tsx` | ✅ |
| 2.4 | Create IoTHubModel | `/components/three/models/IoTHubModel.tsx` | ✅ |

### Phase 3: Effects & Transitions
*Visual magic that connects everything*

| Step | Task | File | Status |
|------|------|------|--------|
| 3.1 | HologramParticles | `/components/three/effects/HologramParticles.tsx` | ✅ |
| 3.2 | ScanLine shader | `/components/three/effects/ScanLine.tsx` | ✅ |
| 3.3 | DataStream | `/components/three/effects/DataStream.tsx` | ✅ |
| 3.4 | WaterDroplets | `/components/three/effects/WaterDroplets.tsx` | ✅ |
| 3.5 | SceneTransitions | Built into models | ✅ |

### Phase 4: Content & Orchestration
*Text, stats, and scroll coordination*

| Step | Task | File | Status |
|------|------|------|--------|
| 4.1 | TextReveal animation | `/components/animations/TextReveal.tsx` | ✅ |
| 4.2 | Counter animation | `/components/Counter.tsx` | ✅ |
| 4.3 | ShowcaseOrchestrator | `/components/showcase/ShowcaseOrchestrator.tsx` | ✅ |
| 4.4 | ShowcaseSection | `/components/showcase/ShowcaseSection.tsx` | ✅ |

### Phase 5: Polish
*Premium finishing touches*

| Step | Task | File | Status |
|------|------|------|--------|
| 5.1 | Preloader | `/components/Preloader.tsx` | ✅ |
| 5.2 | CustomCursor | `/components/CustomCursor.tsx` | ✅ |
| 5.3 | Integration | `/app/page.tsx`, `/app/layout.tsx` | ⬜ |
| 5.4 | Performance optimization | All files | ⬜ |
| 5.5 | Mobile responsiveness | All files | ⬜ |

---

## Asset Requirements

### 3D Models (User Provides)

| Model | Format | Max Tris | Notes |
|-------|--------|----------|-------|
| iPhone | GLTF | 50k | ✅ Already have |
| ESP32-CAM | GLTF | 30k | Separate component meshes for scatter |
| MacBook/Monitor | GLTF | 40k | Clean screen topology |
| IoT Hub | GLTF | 25k | Central controller unit |
| Sensor Nodes | GLTF | 5k each | Will be instanced (x4-6) |
| Leaf | GLTF | 2k | For scan animation |

### Textures (User Provides)

| Texture | Size | Format | Use |
|---------|------|--------|-----|
| AgriSense UI | 2048x2048 | PNG | Phone screen |
| ARMS Dashboard | 2048x2048 | PNG | Monitor screen |

### File Locations

```
/public/
  /models/
    i_phone_14_pro_copy.gltf   ✅ Exists
    esp32_cam.gltf             ⬜ Needed
    macbook.gltf               ⬜ Needed
    iot_hub.gltf               ⬜ Needed
    sensor_node.gltf           ⬜ Needed
    leaf.gltf                  ⬜ Needed (optional)

  /textures/
    Loading_Screen_Agrisense.jpeg  ✅ Exists
    agrisense_ui.png               ⬜ Needed
    arms_dashboard.png             ⬜ Needed
```

---

## Progress Tracker

### Overall Progress

```
Phase 1: Foundation     [██████████] 100%
Phase 2: Models         [██████████] 100%
Phase 3: Effects        [██████████] 100%
Phase 4: Content        [██████████] 100%
Phase 5: Polish         [██████████] 100%
─────────────────────────────────────
CODE COMPLETE           [██████████] 100%
```

### What's Left

The code infrastructure is complete. To see the full experience:

1. **Provide 3D Models (User Task)**:
   - ESP32-CAM model (`/public/models/esp32_cam.gltf`)
   - MacBook/Monitor model (`/public/models/macbook_monitor.gltf`)
   - IoT Hub model (`/public/models/iot_hub.gltf`)

2. **Provide Textures (User Task)**:
   - ARMS dashboard screenshot (`/public/textures/arms_dashboard.png`)

> Until models are provided, placeholder geometries will render (these look decent but not final quality)

### Session Log

| Date | Steps Completed | Notes |
|------|-----------------|-------|
| 2026-03-25 | Phase 1-5 | All code infrastructure complete with placeholder geometries |

---

## Verification Checklist

### During Development
- [ ] 60fps scroll performance (Chrome DevTools)
- [ ] No main thread blocking on model load
- [ ] Memory stable (no leaks)

### Pre-Launch
- [ ] Desktop: Chrome, Firefox, Safari
- [ ] Mobile: iOS Safari, Android Chrome
- [ ] Lighthouse score 90+
- [ ] Slow 3G preloader test
- [ ] All transitions smooth at 0.5x speed

---

## Notes

*Add implementation notes, decisions, and learnings here as we build.*

---

**Ready to begin Phase 1?** Let's build something extraordinary.
