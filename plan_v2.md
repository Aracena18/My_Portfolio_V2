# Portfolio 3D Upgrade Plan V2 - Implemented Showcase Direction

**Date:** 2026-03-26  
**Status:** Implemented baseline for premium cinematic showcase refinement

---

## Summary

This version reflects the actual portfolio architecture and the work now integrated into the repo:

- The showcase canvas is section-scoped and fades in/out cleanly with the `#work` section.
- Each project now uses shared staging positions and safer transition spacing to prevent model collisions.
- The AgriSense phone includes a real hologram moment: the phone lies flat, the beam opens from the screen, and a project carousel rises from the device.
- Camera framing, model choreography, and material polish were tuned for a cleaner premium presentation without introducing external 3D assets.

---

## Current Architecture Truth

### Core Scene Flow

- `components/showcase/ShowcaseSection.tsx`
  Manages section visibility and drives canvas mount/fade behavior.
- `components/three/ShowcaseCanvas.tsx`
  Hosts the shared Three.js scene, lighting, post-processing, and model mounts.
- `contexts/ShowcaseContext.tsx`
  Owns scroll ranges, transition windows, active project state, and shared stage placement config.
- `components/three/CameraController.tsx`
  Handles camera choreography across project entry, active, and exit phases.

### Model Layer

- `components/three/models/AgriSenseModel.tsx`
  Phone reveal, flat-lay hologram sequence, improved screen/glass treatment.
- `components/three/models/ESP32Model.tsx`
  Right-stage entrance, safer exit spacing, improved procedural board presentation.
- `components/three/models/MonitorModel.tsx`
  Left-stage monitor presentation with cleaner spacing and more stable transition timing.
- `components/three/models/IoTHubModel.tsx`
  Right-stage hub presentation with contained orbiting sensor choreography.

### Effects

- `components/three/effects/HologramProjection.tsx`
  Now supports structured hologram card content and renders a phone-anchored project carousel instead of a generic floating beam.

---

## Implemented Changes

### 1. Section-Scoped Canvas Activation

- Kept the existing viewport-based showcase activation.
- Added opacity-based entrance and exit fading so the fixed canvas does not pop in or out abruptly.
- Limited the fixed scene presence to the `#work` section window and its immediate entry/exit buffer.

### 2. Shared Stage Matrix

Added shared placement rules in `ShowcaseContext`:

- `side`
- `rest`
- `entry`
- `exit`
- `safeScale`

This standardizes:

- left/right composition,
- off-screen entry direction,
- exit clearance,
- safe hero scale per project.

### 3. Cleaner Project Choreography

Adjusted project ranges and transition zones to reduce overlap:

- AgriSense enters first with a longer pre-entry buffer.
- ESP32, ARMS, and Realitech now reach hero scale later, after the outgoing object has materially cleared.
- Inactive models decay to zero opacity and zero scale rather than lingering partially visible.

### 4. Flat-Lay Phone Hologram

AgriSense now follows this sequence:

1. Phone enters upright from the left.
2. Phone settles into showcase pose.
3. Phone rotates down into a near-horizontal screen-up position.
4. Hologram beam opens from the screen surface.
5. Project carousel cards rise from the phone.
6. Hologram collapses before exit.
7. Phone clears laterally before ESP32 takes over.

### 5. Hologram Content Model

`HologramProjection` now accepts:

- `cards`
- `beamHeight`
- `screenAnchor`
- `mode`
- `rotationProgress`

Structured card shape:

```ts
interface HologramCard {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  statLabel: string;
  statValue: string;
}
```

The current AgriSense hologram uses a carousel of project cards for:

- AgriSense
- ESP32 Scanner
- ARMS
- Realitech

### 6. Material And Presentation Refinement

- Phone screen emissive and environment response were strengthened.
- Phone glass treatment was upgraded and a dedicated screen overlay was added.
- Procedural models retain their current asset strategy but now use more disciplined staging and visibility behavior.
- Camera framing was adjusted to keep hero models and hologram content inside the frame.

---

## Verification Status

### Completed Checks

- `npm run lint` ✅
- `npm run build` ✅

### Expected Runtime Outcomes

- No 3D model visible before entering the showcase section.
- Cleaner handoff between projects with less stacking.
- Phone hologram originates from the screen instead of floating independently.
- Better readability during the AgriSense hologram segment.

---

## Follow-Up Notes

- The hologram carousel is now structurally correct and visually anchored, but can still be art-directed further if you want denser UI graphics or stronger per-card branding.
- ARMS and Realitech can still accept dedicated screen textures later without changing the new scene structure.
- If needed, the next refinement pass should focus on mobile-specific framing and per-breakpoint staging offsets rather than rewriting the sequence again.
