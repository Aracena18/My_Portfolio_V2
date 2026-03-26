"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECT_STAGE_CONFIG, useShowcase } from "@/contexts/ShowcaseContext";
import ScanLine from "../effects/ScanLine";

interface ESP32ModelProps {
  scale?: number;
}

// Enhanced PCB Board with premium materials
function PlaceholderBoard({ opacity }: { opacity: number }) {
  const timeRef = useRef(0);
  const copperMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Premium FR-4 PCB material (realistic green)
  const boardMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a4d2e"), // Darker, more realistic PCB green
        metalness: 0.15,
        roughness: 0.75,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // High-quality chip material (matte black silicon)
  const chipMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a0a"),
        metalness: 0.85,
        roughness: 0.25,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // Enhanced camera module with subtle green glow
  const cameraMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        metalness: 0.95,
        roughness: 0.15,
        emissive: new THREE.Color("#00ff88"),
        emissiveIntensity: 0.5, // Increased glow
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // Premium copper trace material
  const copperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#b87333"),
        metalness: 0.9,
        roughness: 0.25,
        emissive: new THREE.Color("#ff8844"),
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: opacity * 0.8,
      }),
    [opacity]
  );

  // Animate copper trace glow
  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    const pulse = 0.3 + Math.sin(timeRef.current * 2) * 0.2;
    if (copperMaterialRef.current) {
      copperMaterialRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <group>
      {/* PCB Board with subtle texture */}
      <mesh material={boardMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 1.6]} />
      </mesh>

      {/* Main ESP32 chip with pin details */}
      <mesh position={[0, 0.1, 0.2]} material={chipMaterial} castShadow>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
      </mesh>

      {/* Chip label (subtle emboss) */}
      <mesh position={[0, 0.17, 0.2]}>
        <planeGeometry args={[0.4, 0.08]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.1}
          transparent
          opacity={opacity * 0.3}
        />
      </mesh>

      {/* Camera module housing */}
      <mesh position={[0, 0.15, -0.5]} material={cameraMaterial} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.2, 16]} />
      </mesh>

      {/* Camera lens with realistic glass */}
      <mesh position={[0, 0.26, -0.5]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.1}
          roughness={0.05}
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* LED indicator on camera */}
      <mesh position={[0.12, 0.26, -0.5]}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.8}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Small components (resistors, capacitors) with varied colors */}
      {[
        { pos: [0.4, 0.06, 0.4], color: "#2a2a2a" },
        { pos: [-0.4, 0.06, 0.4], color: "#8b4513" }, // Brown capacitor
        { pos: [0.4, 0.06, -0.2], color: "#2a2a2a" },
        { pos: [-0.4, 0.06, -0.2], color: "#4169e1" }, // Blue component
        { pos: [0.3, 0.06, 0], color: "#2a2a2a" },
        { pos: [-0.3, 0.06, 0], color: "#ffd700" }, // Gold component
      ].map(({ pos, color }, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.1, 0.05, 0.15]} />
          <meshStandardMaterial
            color={color}
            metalness={0.7}
            roughness={0.4}
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}

      {/* Enhanced circuit traces (copper pathways) */}
      {[
        { x: 0.2, z: 0, length: 1.4 },
        { x: -0.2, z: 0, length: 1.4 },
        { x: 0, z: 0.3, length: 0.8, rotation: Math.PI / 2 },
        { x: 0, z: -0.3, length: 0.6, rotation: Math.PI / 2 },
      ].map((trace, i) => (
        <mesh
          key={`trace-${i}`}
          position={[trace.x, 0.045, trace.z]}
          rotation={[0, trace.rotation || 0, 0]}
          ref={(node) => {
            if (i === 0 && node) {
              copperMaterialRef.current = node.material as THREE.MeshStandardMaterial;
            }
          }}
        >
          <boxGeometry args={[0.02, 0.005, trace.length]} />
          <primitive object={copperMaterial} />
        </mesh>
      ))}

      {/* Solder points (tiny metallic dots) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.45;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={`solder-${i}`} position={[x, 0.045, z]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={1}
              roughness={0.2}
              emissive="#ffffff"
              emissiveIntensity={0.1}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ESP32Model({ scale = 1 }: ESP32ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { state, setModelState } = useShowcase();
  const stage = PROJECT_STAGE_CONFIG.esp32;

  // Current interpolated values - START COMPLETELY HIDDEN
  const current = useRef({
    rotationX: 0.5,
    rotationY: -Math.PI / 2,
    rotationZ: 0,
    positionX: stage.entry.x,
    positionY: stage.entry.y,
    positionZ: stage.entry.z,
    opacity: 0,              // Completely transparent
    scale: 0,                // Completely scaled down
    floatTime: 0,
    scanProgress: 0,
  });

  // Animation keyframes for ESP32
  const getTargetState = (projectProgress: number, isTransitioning: boolean, transitionProgress: number) => {
    // Pre-entry - completely hidden
    if (projectProgress <= 0) {
      return {
        rotationX: 0.5,
        rotationY: -Math.PI / 2,
        rotationZ: 0,
        positionX: stage.entry.x,
        positionY: stage.entry.y,
        positionZ: stage.entry.z,
        opacity: 0,
        scale: 0,
      };
    }

    if (projectProgress < 0.22) {
      const entryProgress = projectProgress / 0.22;
      const easedProgress = 1 - Math.pow(1 - entryProgress, 2.5);
      return {
        rotationX: THREE.MathUtils.lerp(0.45, 0.18, easedProgress),
        rotationY: THREE.MathUtils.lerp(-Math.PI / 2, -0.1, easedProgress),
        rotationZ: 0,
        positionX: THREE.MathUtils.lerp(stage.entry.x, stage.rest.x, easedProgress),
        positionY: THREE.MathUtils.lerp(stage.entry.y, stage.rest.y, easedProgress),
        positionZ: THREE.MathUtils.lerp(stage.entry.z, stage.rest.z, easedProgress),
        opacity: THREE.MathUtils.smoothstep(easedProgress, 0.15, 1),
        scale: THREE.MathUtils.lerp(stage.safeScale.min, stage.safeScale.max, easedProgress),
      };
    }

    if (projectProgress < 0.78) {
      const activeProgress = (projectProgress - 0.22) / 0.56;
      return {
        rotationX: THREE.MathUtils.lerp(0.18, 0.28, Math.sin(activeProgress * Math.PI)),
        rotationY: THREE.MathUtils.lerp(-0.1, Math.PI * 0.38, activeProgress),
        rotationZ: THREE.MathUtils.lerp(0, 0.04, activeProgress),
        positionX: stage.rest.x,
        positionY: stage.rest.y,
        positionZ: stage.rest.z,
        opacity: 1,
        scale: stage.safeScale.max,
      };
    }

    const exitProgress = (projectProgress - 0.78) / 0.22;

    if (isTransitioning) {
      return {
        rotationX: THREE.MathUtils.lerp(0.28, 0.02, exitProgress),
        rotationY: THREE.MathUtils.lerp(Math.PI * 0.38, Math.PI * 0.9, exitProgress),
        rotationZ: THREE.MathUtils.lerp(0, 0.3, exitProgress),
        positionX: THREE.MathUtils.lerp(stage.rest.x, stage.exit.x, transitionProgress),
        positionY: THREE.MathUtils.lerp(stage.rest.y, stage.exit.y, exitProgress),
        positionZ: THREE.MathUtils.lerp(stage.rest.z, stage.exit.z, transitionProgress),
        opacity: THREE.MathUtils.lerp(1, 0, transitionProgress),
        scale: THREE.MathUtils.lerp(stage.safeScale.max, 0, transitionProgress),
      };
    }

    return {
      rotationX: THREE.MathUtils.lerp(0.28, 0.02, exitProgress),
      rotationY: THREE.MathUtils.lerp(Math.PI * 0.38, Math.PI * 0.9, exitProgress),
      rotationZ: 0,
      positionX: stage.rest.x,
      positionY: stage.rest.y,
      positionZ: stage.rest.z,
      opacity: THREE.MathUtils.lerp(1, 0.25, exitProgress),
      scale: THREE.MathUtils.lerp(stage.safeScale.max, 0.55, exitProgress),
    };
  };

  // Frame loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const currentState = state.current;
    const { activeProject, projectProgress, isTransitioning, transitionProgress, transitionFrom, transitionTo } = currentState;

    const isActive = activeProject === "esp32" || transitionFrom === "esp32" || transitionTo === "esp32";

    // Completely fade out when not active
    if (!isActive) {
      if (current.current.opacity > 0.01 || current.current.scale > 0.01) {
        current.current.opacity *= 0.85;
        current.current.scale *= 0.9;
      } else {
        current.current.opacity = 0;
        current.current.scale = 0;
      }
      return;
    }

    const target = getTargetState(
      activeProject === "esp32" ? projectProgress : 1,
      isTransitioning,
      transitionProgress
    );
    const lerp = 1 - Math.pow(0.001, delta);

    // Smooth interpolation
    current.current.rotationX += (target.rotationX - current.current.rotationX) * lerp;
    current.current.rotationY += (target.rotationY - current.current.rotationY) * lerp;
    current.current.rotationZ += (target.rotationZ - current.current.rotationZ) * lerp;
    current.current.positionX += (target.positionX - current.current.positionX) * lerp;
    current.current.positionY += (target.positionY - current.current.positionY) * lerp;
    current.current.positionZ += (target.positionZ - current.current.positionZ) * lerp;
    current.current.opacity += (target.opacity - current.current.opacity) * lerp;
    current.current.scale += (target.scale - current.current.scale) * lerp;

    // Apply transforms
    groupRef.current.rotation.set(
      current.current.rotationX,
      current.current.rotationY,
      current.current.rotationZ
    );
    groupRef.current.position.set(
      current.current.positionX,
      current.current.positionY,
      current.current.positionZ
    );
    groupRef.current.scale.setScalar(current.current.scale * scale);

    // Floating effect
    current.current.floatTime += delta;
    groupRef.current.position.y += Math.sin(current.current.floatTime * 1.2) * 0.002;

    // Scan line animation
    current.current.scanProgress = (current.current.scanProgress + delta * 0.3) % 1;

    // Update context
    setModelState("esp32", {
      positionX: groupRef.current.position.x,
      positionY: groupRef.current.position.y,
      positionZ: groupRef.current.position.z,
      rotationX: groupRef.current.rotation.x,
      rotationY: groupRef.current.rotation.y,
      rotationZ: groupRef.current.rotation.z,
      scale: current.current.scale,
      opacity: current.current.opacity,
      visible: current.current.opacity > 0.01,
    });
  });

  const showScanLine = state.current.activeProject === "esp32" && state.current.projectProgress > 0.25;
  const modelOpacity = state.current.models.esp32.opacity;

  return (
    <group ref={groupRef}>
      <group scale={scale}>
        <PlaceholderBoard opacity={modelOpacity} />
      </group>

      {/* Scan line effect */}
      {showScanLine && (
        <ScanLine
          progress={state.current.projectProgress}
          color="#00ff00"
          width={1.5}
          height={2}
          opacity={modelOpacity * 0.7}
        />
      )}
    </group>
  );
}
