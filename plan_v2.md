# Portfolio 3D Upgrade Plan V2 - Premium Cinematic Experience

**Date:** 2026-03-26
**Goal:** Transform portfolio into a premium "100k looking" website like Apple with proper 3D model positioning, materials, and cinematic transitions.

---

## Executive Summary

This plan addresses critical 3D rendering issues in the portfolio and outlines a comprehensive upgrade path to achieve Apple-level quality. The main issues identified are:

1. **Phone model incorrectly appearing on home screen** (should only show in case study section)
2. **Improper 3D model positioning and arrangement**
3. **Material integration issues** (especially phone screen)
4. **Placeholder models need premium enhancement**

---

## Current State Analysis

### Architecture Overview
```
Portfolio Structure:
├── contexts/
│   ├── ShowcaseContext.tsx         - State management for all 3D models
│   └── PhoneAnimationContext.tsx   - Phone-specific animations
├── components/
│   ├── showcase/
│   │   └── ShowcaseSection.tsx     - Main showcase section wrapper
│   └── three/
│       ├── ShowcaseCanvas.tsx      - Main Three.js canvas
│       ├── CameraController.tsx    - Camera choreography
│       ├── LightingSystem.tsx      - Scene lighting
│       ├── models/
│       │   ├── AgriSenseModel.tsx  - Phone model (iPhone 14 Pro)
│       │   ├── ESP32Model.tsx      - ESP32-CAM board (placeholder)
│       │   ├── MonitorModel.tsx    - Monitor/MacBook (placeholder)
│       │   └── IoTHubModel.tsx     - IoT Hub (placeholder)
│       └── effects/
│           ├── DataStream.tsx      - Particle data streams
│           ├── HologramParticles.tsx
│           └── WaterDroplets.tsx
```

### Root Cause Analysis

#### Issue 1: Phone Appearing on Home Screen ❌
**Location:** `components/three/models/AgriSenseModel.tsx:44`

**Problem:**
```typescript
const current = useRef({
  rotationX: -0.1,
  rotationY: 0.1,
  rotationZ: 0,
  positionX: 0,
  positionY: -0.3,
  positionZ: 0,
  opacity: 0.5,  // ❌ WRONG: Should be 0
  scale: 0.9,    // ❌ WRONG: Should be 0
  floatTime: 0,
});
```

**Additional Problems:**
- `ShowcaseCanvas` uses `fixed inset-0` positioning, making it visible across entire page
- Scroll progress calculation doesn't properly hide models in hero zone
- Hero buffer zone too small (0-0.10, should be 0-0.15)

**Files Affected:**
- `components/three/models/AgriSenseModel.tsx:44` - Initial state
- `components/showcase/ShowcaseSection.tsx` - Canvas visibility
- `contexts/ShowcaseContext.tsx:24` - Buffer zone range

#### Issue 2: Placeholder Models Need Enhancement 🔧
**Files:**
- `components/three/models/ESP32Model.tsx` - Basic box geometry
- `components/three/models/MonitorModel.tsx` - Simple cylinder stand
- `components/three/models/IoTHubModel.tsx` - Basic shapes

**Current State:** Using procedural geometry placeholders
**Target State:** Premium-looking detailed models with realistic materials

#### Issue 3: Material Quality Needs Improvement 📊
**Current Issues:**
- Phone screen emissive intensity too low (0.4)
- Missing glass reflection/refraction layers
- No fresnel rim lighting effects
- No post-processing (bloom, vignette, ambient occlusion)
- Basic lighting setup without cinematic three-point lighting

---

## User Decisions (Confirmed)

✅ **3D Models:** Enhance procedural placeholders (no external models needed)
✅ **Screen Textures:** User will provide textures for ARMS and Realitech projects
✅ **Visual Style:** Subtle Apple-like - minimal, elegant glow effects with soft particles
✅ **Priority Order:** Bug fixes → All models equally → Transitions (in that order)

---

## Implementation Plan

### Phase 1: Critical Bug Fixes 🚨 (IMMEDIATE)

#### Task 1.1: Fix AgriSenseModel Initial State
**File:** `components/three/models/AgriSenseModel.tsx:36-47`

**Changes:**
```typescript
// BEFORE (line 44):
opacity: 0.5,  // ❌ Visible on home screen
scale: 0.9,

// AFTER:
opacity: 0,    // ✅ Completely hidden
scale: 0,      // ✅ Start from zero
```

**Additional fixes:**
```typescript
// Update getTargetState function (line 124-135)
// Pre-entry phase - ensure complete invisibility
if (projectProgress <= 0) {
  return {
    rotationX: -0.3,
    rotationY: 0,
    rotationZ: 0,
    positionX: 0,
    positionY: -2,      // Move further down
    positionZ: -3,      // Move further back
    opacity: 0,
    scale: 0,           // Ensure scale is zero
  };
}
```

#### Task 1.2: Extend Hero Buffer Zone
**File:** `contexts/ShowcaseContext.tsx:22-28`

**Changes:**
```typescript
// BEFORE (line 24):
agrisense: { start: 0.10, end: 0.32 },

// AFTER:
agrisense: { start: 0.15, end: 0.32 },  // ✅ Extended buffer from 10% to 15%
```

**Impact:** Gives more scroll distance before first model appears, ensuring clean hero section.

#### Task 1.3: Add Viewport-Based Canvas Visibility
**File:** `components/showcase/ShowcaseSection.tsx`

**Changes:**
1. Add IntersectionObserver to detect when showcase section enters viewport
2. Add state to control canvas rendering
3. Only render ShowcaseCanvas when section is visible or approaching

```typescript
// Pseudo-code
const [isCanvasActive, setIsCanvasActive] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      setIsCanvasActive(entries[0].isIntersecting);
    },
    { rootMargin: "100px" } // Preload slightly before visible
  );
  observer.observe(sectionRef.current);
}, []);

return (
  <section ref={sectionRef}>
    {isCanvasActive && <ShowcaseCanvas />}
  </section>
);
```

#### Task 1.4: Verification Test
**Test Steps:**
1. ✅ Navigate to home page - No 3D models should be visible
2. ✅ Scroll to hero section - Still no models
3. ✅ Scroll to showcase section - Phone should fade in smoothly
4. ✅ Check browser console - No errors or warnings

---

### Phase 2: Phone Model Enhancement 📱

**File:** `components/three/models/AgriSenseModel.tsx`

#### Task 2.1: Upgrade Screen Material
**Current (line 41-53):**
```typescript
const screenMaterial = useMemo(
  () =>
      new THREE.MeshStandardMaterial({
        map: configuredScreenTexture,
        emissive: new THREE.Color("#ffffff"),
        emissiveMap: configuredScreenTexture,
        emissiveIntensity: 0.4,  // ❌ Too low
      metalness: 0.1,
      roughness: 0.2,
      envMapIntensity: 0.5,
    }),
  [configuredScreenTexture]
);
```

**Enhanced Version:**
```typescript
const screenMaterial = useMemo(() => {
  const material = new THREE.MeshStandardMaterial({
    map: configuredScreenTexture,
    emissive: new THREE.Color("#ffffff"),
    emissiveMap: configuredScreenTexture,
    emissiveIntensity: 0.8,  // ✅ Increased for "lit screen" effect
    metalness: 0.05,
    roughness: 0.15,
    envMapIntensity: 1.2,
    transparent: true,
  });
  return material;
}, [configuredScreenTexture]);
```

#### Task 2.2: Add Glass Overlay Layer
**Add after screen mesh in return statement:**
```typescript
{/* Screen glass overlay for realistic reflection */}
<mesh position={[0, 0, 0.001]} rotation={[...screenRotation]}>
  <planeGeometry args={[screenWidth, screenHeight]} />
  <meshPhysicalMaterial
    transparent
    opacity={0.15}
    metalness={0}
    roughness={0.05}
    envMapIntensity={2.5}
    clearcoat={1}
    clearcoatRoughness={0.1}
    ior={1.5}  // Glass-like refraction
  />
</mesh>
```

#### Task 2.3: Add Fresnel Rim Lighting
**New shader material for edge glow:**
```typescript
const fresnelMaterial = useMemo(() => {
  return new THREE.ShaderMaterial({
    uniforms: {
      fresnelColor: { value: new THREE.Color("#4a9eff") },
      fresnelPower: { value: 2.0 },
      fresnelOpacity: { value: 0.3 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 fresnelColor;
      uniform float fresnelPower;
      uniform float fresnelOpacity;

      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 viewDir = normalize(vViewPosition);
        float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), fresnelPower);
        gl_FragColor = vec4(fresnelColor, fresnel * fresnelOpacity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
}, []);
```

#### Task 2.4: Soft Particle Emission Effect
**New component:** `components/three/effects/ScreenGlow.tsx`
```typescript
// Particle system that emits from screen edges during entry
// Uses InstancedMesh for performance
// Subtle, Apple-like minimal particles
// Color: soft blue-white (#e0f0ff)
// Particle count: 30-40
// Emission pattern: From screen center, radial outward
```

---

### Phase 3: ESP32 Model Enhancement 🔌

**File:** `components/three/models/ESP32Model.tsx`

#### Task 3.1: Detailed PCB Geometry
```typescript
// Replace PlaceholderBoard with enhanced geometry
function EnhancedPCBBoard({ opacity }: { opacity: number }) {
  // Main PCB board (FR-4 material - greenish)
  const pcbMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1a4d2e"),  // PCB green
    metalness: 0.1,
    roughness: 0.7,
    transparent: true,
    opacity,
  });

  // Copper traces (subtle metallic lines)
  const copperMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#b87333"),  // Copper color
    metalness: 0.9,
    roughness: 0.3,
    emissive: new THREE.Color("#b87333"),
    emissiveIntensity: 0.2,
    transparent: true,
    opacity,
  });

  return (
    <group>
      {/* Main PCB board */}
      <mesh>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <primitive object={pcbMaterial} />
      </mesh>

      {/* Copper traces - decorative lines */}
      {generateCopperTraces().map((trace, i) => (
        <mesh key={i} position={trace.position}>
          <boxGeometry args={[trace.width, 0.02, 0.001]} />
          <primitive object={copperMaterial} />
        </mesh>
      ))}

      {/* ESP32 chip */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.5, 0.5, 0.08]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.4}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Camera module with glowing lens */}
      <CameraModule opacity={opacity} position={[0.6, 0.3, 0.05]} />
    </group>
  );
}
```

#### Task 3.2: Camera Lens with Reflection
```typescript
function CameraModule({ opacity, position }) {
  return (
    <group position={position}>
      {/* Camera housing */}
      <mesh>
        <boxGeometry args={[0.3, 0.3, 0.08]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.7,
          roughness={0.4}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Lens glass with reflection */}
      <mesh position={[0, 0, 0.045]}>
        <circleGeometry args={[0.1, 32]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.1}
          roughness={0.05}
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={new THREE.Color("#00ff88")}
          emissiveIntensity={0.3}  // Subtle green glow
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}
```

#### Task 3.3: Circuit Trace Glow Animation
```typescript
// In useFrame loop, animate the copper trace glow
useFrame((state) => {
  const time = state.clock.getElapsedTime();

  // Pulse effect on circuit traces
  copperMaterial.emissiveIntensity = 0.2 + Math.sin(time * 2) * 0.15;

  // Camera lens indicator LED pulse
  cameraLensMaterial.emissiveIntensity = 0.3 + Math.sin(time * 3) * 0.2;
});
```

---

### Phase 4: Monitor Model Enhancement 💻

**File:** `components/three/models/MonitorModel.tsx`

#### Task 4.1: Apple-Style Monitor Design
```typescript
function PremiumMonitor({ opacity, screenTexture }) {
  // Space gray aluminum material
  const aluminumMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8a8d93"),
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.5,
    transparent: true,
    opacity,
  });

  // Ultra-thin bezel material (dark aluminum)
  const bezelMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#1a1a1a"),
    metalness: 0.85,
    roughness: 0.25,
    transparent: true,
    opacity,
  });

  return (
    <group>
      {/* Ultra-thin bezel frame */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.03]} />
        <primitive object={bezelMaterial} />
      </mesh>

      {/* Screen with subtle glow */}
      <mesh position={[0, 0.8, 0.02]}>
        <planeGeometry args={[2.3, 1.42]} />
        <meshStandardMaterial
          map={screenTexture}
          emissive={new THREE.Color("#ffffff")}
          emissiveMap={screenTexture}
          emissiveIntensity={0.6}
          metalness={0.05}
          roughness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Screen glass overlay */}
      <mesh position={[0, 0.8, 0.025]}>
        <planeGeometry args={[2.3, 1.42]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.1 * opacity}
          metalness={0}
          roughness={0.05}
          envMapIntensity={2}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Elegant cylindrical stand */}
      <mesh position={[0, 0.1, -0.05]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 32]} />
        <primitive object={aluminumMaterial} />
      </mesh>

      {/* Circular base with chamfered edge */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.03, 64]} />
        <primitive object={aluminumMaterial} />
      </mesh>

      {/* Apple logo (subtle) */}
      <mesh position={[0, 0.8, -0.02]}>
        <circleGeometry args={[0.06, 32]} />
        <meshStandardMaterial
          color="#4a4a4a"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={opacity * 0.5}
        />
      </mesh>
    </group>
  );
}
```

#### Task 4.2: Enhanced Floating Charts
```typescript
// Update FloatingChart component with better materials
function FloatingChart({ position, scale, opacity, color }) {
  const chartMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.6,  // Increased glow
    metalness: 0.3,
    roughness={0.4}
    transparent: true,
    opacity: opacity * 0.9,
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Glass panel background */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshPhysicalMaterial
          transparent
          opacity={opacity * 0.15}
          metalness={0}
          roughness={0.1}
          envMapIntensity={1.5}
          clearcoat={0.5}
        />
      </mesh>

      {/* Bar chart with rounded corners */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[(i - 2) * 0.12, (i % 3) * 0.15 + 0.1, 0]}>
          <boxGeometry args={[0.08, 0.1 + (i % 3) * 0.15, 0.02]} />
          <primitive object={chartMaterial} />
        </mesh>
      ))}
    </group>
  );
}
```

---

### Phase 5: IoT Hub Model Enhancement 🌐

**File:** `components/three/models/IoTHubModel.tsx`

#### Task 5.1: Central Hub with LED Ring
```typescript
function PremiumIoTHub({ opacity }) {
  return (
    <group>
      {/* Main hub body - cylindrical */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.45, 0.3, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* LED ring around hub */}
      <LEDRing opacity={opacity} radius={0.5} />

      {/* Top surface with vents */}
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
        <meshStandardMaterial
          color="#3a3a3a"
          metalness={0.7}
          roughness={0.4}
          emissive={new THREE.Color("#00aaff")}
          emissiveIntensity={0.4}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

function LEDRing({ opacity, radius }) {
  const ledCount = 24;
  const leds = [];

  for (let i = 0; i < ledCount; i++) {
    const angle = (i / ledCount) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    leds.push({ position: [x, 0, z], angle: i });
  }

  return (
    <group>
      {leds.map((led, i) => (
        <AnimatedLED
          key={i}
          position={led.position}
          opacity={opacity}
          delay={led.angle * 0.05}
        />
      ))}
    </group>
  );
}

function AnimatedLED({ position, opacity, delay }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Pulsing LED effect with delay
    const intensity = 0.5 + Math.sin(time * 2 + delay) * 0.5;
    meshRef.current.material.emissiveIntensity = intensity * 0.8;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshStandardMaterial
        color="#00aaff"
        emissive={new THREE.Color("#00aaff")}
        emissiveIntensity={0.8}
        metalness={0.2}
        roughness={0.4}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}
```

#### Task 5.2: Sensor Node Satellites
```typescript
function SensorNodes({ opacity, hubPosition }) {
  const nodeCount = 6;
  const orbitRadius = 1.5;

  return (
    <group>
      {Array.from({ length: nodeCount }).map((_, i) => (
        <OrbitingSensorNode
          key={i}
          index={i}
          total={nodeCount}
          orbitRadius={orbitRadius}
          opacity={opacity}
        />
      ))}
    </group>
  );
}

function OrbitingSensorNode({ index, total, orbitRadius, opacity }) {
  const nodeRef = useRef();

  useFrame((state) => {
    if (!nodeRef.current) return;
    const time = state.clock.getElapsedTime();
    const baseAngle = (index / total) * Math.PI * 2;
    const angle = baseAngle + time * 0.3;  // Slow orbit

    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const y = Math.sin(time * 0.5 + index) * 0.2;  // Floating motion

    nodeRef.current.position.set(x, y, z);
    nodeRef.current.rotation.y = -angle;  // Face center
  });

  return (
    <group ref={nodeRef}>
      {/* Sensor node body */}
      <mesh>
        <boxGeometry args={[0.15, 0.15, 0.08]} />
        <meshStandardMaterial
          color="#2a3a4a"
          metalness={0.7}
          roughness={0.4}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Status LED */}
      <mesh position={[0, 0, 0.045]}>
        <circleGeometry args={[0.02, 16]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive={new THREE.Color("#00ff88")}
          emissiveIntensity={0.8}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}
```

---

### Phase 6: Cinematic Transitions 🎬

#### Task 6.1: Enhanced Entry Animations

**AgriSense Phone Entry:**
```typescript
// In getTargetState function, enhance entry phase (0-15%)
if (projectProgress < 0.15) {
  const entryProgress = projectProgress / 0.15;
  const easedProgress = 1 - Math.pow(1 - entryProgress, 3);  // Ease out cubic

  return {
    rotationX: THREE.MathUtils.lerp(-0.2, 0.1, easedProgress),
    rotationY: THREE.MathUtils.lerp(-0.5, 0.3, easedProgress),  // Start tilted
    rotationZ: THREE.MathUtils.lerp(-0.1, 0, easedProgress),    // Slight roll
    positionX: 0,
    positionY: THREE.MathUtils.lerp(-1.5, 0, easedProgress),    // Rise from below
    positionZ: THREE.MathUtils.lerp(-1, 0, easedProgress),      // Move forward
    opacity: THREE.MathUtils.lerp(0, 1, easedProgress),
    scale: THREE.MathUtils.lerp(0, 1, easedProgress),           // Scale up
  };
}
```

**ESP32 Entry (with scan effect):**
```typescript
// Entry phase with slide + scan animation
if (projectProgress < 0.2) {
  const entryProgress = projectProgress / 0.2;
  const easedProgress = 1 - Math.pow(1 - entryProgress, 2);

  return {
    rotationX: THREE.MathUtils.lerp(0.3, 0.1, easedProgress),
    rotationY: THREE.MathUtils.lerp(Math.PI / 2, 0, easedProgress),  // Slide from right
    rotationZ: 0,
    positionX: THREE.MathUtils.lerp(3, 0, easedProgress),
    positionY: 0,
    positionZ: 0,
    opacity: THREE.MathUtils.lerp(0, 1, easedProgress),
    scale: THREE.MathUtils.lerp(0.7, 1, easedProgress),
    scanProgress: entryProgress,  // For scan line effect
  };
}
```

**Monitor Entry (depth approach):**
```typescript
// Push in from depth with screen flicker
if (projectProgress < 0.2) {
  const entryProgress = projectProgress / 0.2;
  const easedProgress = 1 - Math.pow(1 - entryProgress, 3);

  return {
    rotationX: THREE.MathUtils.lerp(-0.2, 0, easedProgress),
    rotationY: THREE.MathUtils.lerp(Math.PI, 0, easedProgress),  // Rotate as approaching
    rotationZ: 0,
    positionX: 0,
    positionY: 0,
    positionZ: THREE.MathUtils.lerp(-4, 0, easedProgress),       // Deep z push
    opacity: THREE.MathUtils.lerp(0, 1, easedProgress),
    scale: THREE.MathUtils.lerp(0.5, 1, easedProgress),
    screenFlicker: entryProgress < 0.3 ? Math.random() * 0.3 : 1,  // Boot flicker
  };
}
```

#### Task 6.2: Transition Effects
**New file:** `components/three/effects/TransitionEffect.tsx`
```typescript
export function TransitionEffect({
  fromProject,
  toProject,
  progress
}: {
  fromProject: ProjectId;
  toProject: ProjectId;
  progress: number;  // 0-1
}) {
  return (
    <group>
      {/* Subtle particle bridge between models */}
      <ParticleBridge
        startModel={fromProject}
        endModel={toProject}
        progress={progress}
        particleCount={40}
        color="#ffffff"
        opacity={0.3}
      />

      {/* Depth-of-field blur simulation */}
      {progress > 0.3 && progress < 0.7 && (
        <DOFBlur intensity={(1 - Math.abs(progress - 0.5) * 2) * 0.5} />
      )}
    </group>
  );
}
```

#### Task 6.3: Camera Choreography Enhancement
**File:** `components/three/CameraController.tsx`

Add smooth camera movements during transitions:
```typescript
// Enhanced camera positions per project
const CAMERA_POSITIONS: Record<ProjectId, CameraState> = {
  agrisense: {
    position: [0.2, 0.1, 4.5],    // Slight offset for dynamic feel
    target: [0, 0, 0],
    fov: 45,
  },
  esp32: {
    position: [-0.3, 0.2, 4],     // View from left
    target: [0, 0, 0],
    fov: 42,
  },
  arms: {
    position: [0, 0.3, 5],         // Slightly elevated view
    target: [0, 0.5, 0],
    fov: 48,
  },
  realitech: {
    position: [0.3, -0.2, 4.2],   // Lower angle
    target: [0, -0.1, 0],
    fov: 45,
  },
};

// Smooth camera interpolation with easing
useFrame(() => {
  const currentProject = state.current.activeProject;
  const targetCam = CAMERA_POSITIONS[currentProject];

  // Smooth lerp with custom easing
  const lerpFactor = 0.03;  // Slow, cinematic movement

  camera.position.lerp(
    new THREE.Vector3(...targetCam.position),
    lerpFactor
  );

  controls.target.lerp(
    new THREE.Vector3(...targetCam.target),
    lerpFactor
  );

  // FOV transition
  camera.fov += (targetCam.fov - camera.fov) * lerpFactor;
  camera.updateProjectionMatrix();
});
```

---

### Phase 7: Post-Processing & Polish ✨

#### Task 7.1: Post-Processing Stack
**File:** `components/three/ShowcaseCanvas.tsx`

Add post-processing effects:
```typescript
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function ShowcaseCanvas() {
  return (
    <Canvas {...canvasProps}>
      {/* Scene content */}
      <ShowcaseOrchestrator />

      {/* Post-processing */}
      <EffectComposer>
        {/* Bloom for emissive glow */}
        <Bloom
          intensity={0.4}          // Subtle, not overpowering
          luminanceThreshold={0.5} // Only bright areas glow
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.SCREEN}
        />

        {/* Vignette for cinematic focus */}
        <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
```

#### Task 7.2: Unified Lighting System
**File:** `components/three/LightingSystem.tsx`

Implement three-point lighting with subtle transitions:
```typescript
export function LightingSystem() {
  const { state } = useShowcase();
  const lightsRef = useRef<LightRefs>({});

  useFrame(() => {
    const project = state.current.activeProject;

    // Key light (main illumination)
    const keyLight = lightsRef.current.key;
    if (keyLight) {
      const targetIntensity = LIGHTING_PRESETS[project].keyIntensity;
      keyLight.intensity += (targetIntensity - keyLight.intensity) * 0.05;
    }

    // Fill light (soften shadows)
    const fillLight = lightsRef.current.fill;
    if (fillLight) {
      const targetColor = LIGHTING_PRESETS[project].fillColor;
      fillLight.color.lerp(new THREE.Color(targetColor), 0.05);
    }

    // Rim light (edge definition)
    const rimLight = lightsRef.current.rim;
    if (rimLight) {
      const targetIntensity = LIGHTING_PRESETS[project].rimIntensity;
      rimLight.intensity += (targetIntensity - rimLight.intensity) * 0.05;
    }
  });

  return (
    <group>
      {/* Key light - main illumination */}
      <directionalLight
        ref={(ref) => (lightsRef.current.key = ref)}
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill light - soften shadows */}
      <directionalLight
        ref={(ref) => (lightsRef.current.fill = ref)}
        position={[-5, 3, -5]}
        intensity={0.5}
        color="#a0c4ff"
      />

      {/* Rim light - edge definition */}
      <directionalLight
        ref={(ref) => (lightsRef.current.rim = ref)}
        position={[0, -2, -5]}
        intensity={0.8}
        color="#ffd6a5"
      />

      {/* Ambient base */}
      <ambientLight intensity={0.15} />

      {/* Environment map */}
      <Environment preset="city" />
    </group>
  );
}

// Lighting presets per project
const LIGHTING_PRESETS = {
  agrisense: {
    keyIntensity: 1.5,
    fillColor: "#a0c4ff",
    rimIntensity: 0.8,
  },
  esp32: {
    keyIntensity: 1.8,    // Brighter for tech feel
    fillColor: "#00ffaa", // Cool tech green
    rimIntensity: 1.0,
  },
  arms: {
    keyIntensity: 1.4,
    fillColor: "#ffffff", // Neutral studio
    rimIntensity: 0.7,
  },
  realitech: {
    keyIntensity: 1.3,
    fillColor: "#ffd6a5", // Warm ambient
    rimIntensity: 0.9,
  },
};
```

#### Task 7.3: Performance Optimization
**Optimizations to implement:**

1. **Frustum Culling** - Already handled by Three.js, but verify
2. **Instance Rendering** - Use `<instancedMesh>` for particles
3. **Level of Detail (LOD)** - Simplify models at distance
4. **Lazy Loading** - Use `<Suspense>` boundaries
5. **Texture Optimization** - Compress textures, use mipmaps
6. **Shadow Optimization** - Limit shadow map size on mobile

```typescript
// Mobile detection and performance scaling
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const PERFORMANCE_SETTINGS = {
  desktop: {
    shadowMapSize: [2048, 2048],
    particleCount: 60,
    bloomIntensity: 0.4,
    antialiasing: true,
  },
  mobile: {
    shadowMapSize: [1024, 1024],
    particleCount: 30,
    bloomIntensity: 0.2,
    antialiasing: false,
  },
};

const settings = isMobile ? PERFORMANCE_SETTINGS.mobile : PERFORMANCE_SETTINGS.desktop;
```

#### Task 7.4: Mobile Responsiveness
```typescript
// Responsive camera FOV
const getFOV = () => {
  if (window.innerWidth < 768) return 60;  // Wider FOV for mobile
  return 45;
};

// Touch interaction for mobile (optional rotation control)
const bind = useGesture({
  onDrag: ({ offset: [x, y] }) => {
    if (!isMobile) return;
    // Allow users to manually rotate models on mobile
    setCameraRotation({ x: y * 0.001, y: x * 0.001 });
  },
});
```

---

## File Changes Summary

### Modified Files (9):
1. ✅ `components/three/models/AgriSenseModel.tsx` - Fix init + enhance materials
2. ✅ `components/three/models/ESP32Model.tsx` - Replace placeholder with detailed PCB
3. ✅ `components/three/models/MonitorModel.tsx` - Replace with Apple-style monitor
4. ✅ `components/three/models/IoTHubModel.tsx` - Add LED ring + sensor nodes
5. ✅ `components/showcase/ShowcaseSection.tsx` - Add viewport visibility control
6. ✅ `contexts/ShowcaseContext.tsx` - Extend hero buffer zone
7. ✅ `components/three/ShowcaseCanvas.tsx` - Add post-processing
8. ✅ `components/three/CameraController.tsx` - Enhanced choreography
9. ✅ `components/three/LightingSystem.tsx` - Three-point lighting system

### New Files (4):
1. 🆕 `components/three/effects/ScreenGlow.tsx` - Phone screen particle emission
2. 🆕 `components/three/effects/TransitionEffect.tsx` - Inter-project transitions
3. 🆕 `components/three/effects/ScanLine.tsx` - ESP32 scan effect
4. 🆕 `components/three/effects/ParticleBridge.tsx` - Transition particle bridge

### Dependencies to Install:
```bash
npm install @react-three/postprocessing
```

### Assets Needed from User:
- [ ] ARMS dashboard screenshot/texture (for Monitor model screen)
- [ ] Realitech interface screenshot/texture (for IoT Hub displays)

---

## Testing Checklist

### Functional Tests:
- [ ] **Home Page**: Navigate to home - NO 3D models visible ✅
- [ ] **Hero Section**: Scroll through hero - Still NO models ✅
- [ ] **Showcase Entry**: Scroll to showcase - Phone fades in smoothly ✅
- [ ] **Scroll Through Projects**: All 4 projects visible in sequence ✅
- [ ] **Transitions**: Smooth crossfades between projects ✅
- [ ] **Materials**: Screen glow, metallic reflections look premium ✅

### Performance Tests:
- [ ] **Desktop (Chrome)**: 60 FPS ✅
- [ ] **Desktop (Safari)**: 60 FPS ✅
- [ ] **Desktop (Firefox)**: 60 FPS ✅
- [ ] **Mobile (iOS)**: 30+ FPS ✅
- [ ] **Mobile (Android)**: 30+ FPS ✅

### Visual Quality Tests:
- [ ] **Phone screen**: Glowing, visible, properly textured ✅
- [ ] **ESP32**: Circuit traces visible, camera lens glowing ✅
- [ ] **Monitor**: Apple-like design, thin bezels, premium feel ✅
- [ ] **IoT Hub**: LED ring pulsing, sensor nodes orbiting ✅
- [ ] **Lighting**: Smooth transitions, no harsh shadows ✅
- [ ] **Post-processing**: Subtle bloom on emissive elements ✅

---

## Timeline Estimate

| Phase | Tasks | Estimated Time |
|-------|-------|----------------|
| **Phase 1: Bug Fixes** | 4 tasks | 1-2 hours |
| **Phase 2: Phone Enhancement** | 4 tasks | 2-3 hours |
| **Phase 3: ESP32 Enhancement** | 3 tasks | 2-3 hours |
| **Phase 4: Monitor Enhancement** | 2 tasks | 2 hours |
| **Phase 5: IoT Hub Enhancement** | 2 tasks | 2 hours |
| **Phase 6: Transitions** | 3 tasks | 2-3 hours |
| **Phase 7: Post-Processing** | 4 tasks | 2-3 hours |
| **Testing & Polish** | - | 1-2 hours |
| **TOTAL** | **26 tasks** | **14-19 hours** |

---

## Success Criteria

The upgrade will be considered successful when:

✅ **Functional:**
1. Phone model NEVER appears on home screen
2. All 4 models render correctly in their respective sections
3. Smooth 60 FPS on desktop, 30+ FPS on mobile
4. No console errors or warnings

✅ **Visual Quality:**
1. Materials look premium and realistic (Apple-quality)
2. Screen textures are clear and properly lit
3. Smooth cinematic transitions between projects
4. Subtle particle effects enhance without distracting

✅ **User Experience:**
1. Scroll-driven animations feel natural and intuitive
2. Models appear at the right time (not too early, not too late)
3. Page performance doesn't degrade on lower-end devices
4. Mobile users can view without issues

---

## Next Steps

After completing this plan:

1. **User provides screen textures** for ARMS and Realitech
2. **Integrate textures** into respective models
3. **User review and feedback** on visual style
4. **Fine-tune timings** based on user preference
5. **Deploy to production** 🚀

---

## Notes

- All changes maintain existing architecture (no major refactoring)
- Performance optimizations are non-breaking
- Mobile-first approach for responsiveness
- Code is maintainable and well-documented
- Uses established Three.js best practices

---

**Plan prepared by:** Claude (Sonnet 4.5)
**Date:** 2026-03-26
**Status:** Ready for Implementation ✅
