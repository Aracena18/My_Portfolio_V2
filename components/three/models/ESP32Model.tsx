"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShowcase } from "@/contexts/ShowcaseContext";
import ScanLine from "../effects/ScanLine";

interface ESP32ModelProps {
  scale?: number;
}

// Placeholder geometry when model isn't available
function PlaceholderBoard({ opacity }: { opacity: number }) {
  const boardMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a472a"),
        metalness: 0.1,
        roughness: 0.8,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  const chipMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111111"),
        metalness: 0.9,
        roughness: 0.3,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  const cameraMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        metalness: 0.95,
        roughness: 0.2,
        emissive: new THREE.Color("#003300"),
        emissiveIntensity: 0.3,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  return (
    <group>
      {/* PCB Board */}
      <mesh material={boardMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 1.6]} />
      </mesh>

      {/* Main chip */}
      <mesh position={[0, 0.1, 0.2]} material={chipMaterial} castShadow>
        <boxGeometry args={[0.5, 0.12, 0.5]} />
      </mesh>

      {/* Camera module */}
      <mesh position={[0, 0.15, -0.5]} material={cameraMaterial} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.2, 16]} />
      </mesh>

      {/* Camera lens */}
      <mesh position={[0, 0.26, -0.5]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
      </mesh>

      {/* Small components */}
      {[
        [0.4, 0.06, 0.4],
        [-0.4, 0.06, 0.4],
        [0.4, 0.06, -0.2],
        [-0.4, 0.06, -0.2],
        [0.3, 0.06, 0],
        [-0.3, 0.06, 0],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} material={chipMaterial}>
          <boxGeometry args={[0.1, 0.05, 0.15]} />
        </mesh>
      ))}

      {/* Circuit traces (emissive lines) */}
      {[0.2, -0.2].map((x, i) => (
        <mesh key={`trace-${i}`} position={[x, 0.045, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.02, 0.005, 1.4]} />
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00ff00"
            emissiveIntensity={0.5}
            transparent
            opacity={opacity * 0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ESP32Model({ scale = 1 }: ESP32ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { state, setModelState } = useShowcase();

  // Current interpolated values
  const current = useRef({
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: 2,
    positionY: 0,
    positionZ: 0,
    opacity: 0,
    scale: 0.5,
    floatTime: 0,
    scanProgress: 0,
  });

  // Animation keyframes for ESP32
  const getTargetState = (projectProgress: number, isTransitioning: boolean, transitionProgress: number) => {
    // Entry animation (0-20%)
    if (projectProgress < 0.2) {
      const entryProgress = projectProgress / 0.2;
      return {
        rotationX: THREE.MathUtils.lerp(0.5, 0, entryProgress),
        rotationY: THREE.MathUtils.lerp(-Math.PI / 2, 0, entryProgress),
        rotationZ: 0,
        positionX: THREE.MathUtils.lerp(2, 0, entryProgress),
        positionY: THREE.MathUtils.lerp(-0.5, 0, entryProgress),
        positionZ: 0,
        opacity: THREE.MathUtils.lerp(0, 1, entryProgress),
        scale: THREE.MathUtils.lerp(0.3, 1, entryProgress),
      };
    }

    // Active state (20-80%) - slow rotation to show components
    if (projectProgress < 0.8) {
      const activeProgress = (projectProgress - 0.2) / 0.6;
      return {
        rotationX: THREE.MathUtils.lerp(0, 0.3, Math.sin(activeProgress * Math.PI)),
        rotationY: THREE.MathUtils.lerp(0, Math.PI * 0.5, activeProgress),
        rotationZ: 0,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        opacity: 1,
        scale: 1,
      };
    }

    // Exit animation (80-100%)
    const exitProgress = (projectProgress - 0.8) / 0.2;

    if (isTransitioning) {
      return {
        rotationX: THREE.MathUtils.lerp(0.3, 0, exitProgress),
        rotationY: THREE.MathUtils.lerp(Math.PI * 0.5, Math.PI, exitProgress),
        rotationZ: THREE.MathUtils.lerp(0, 0.2, exitProgress),
        positionX: THREE.MathUtils.lerp(0, -2, transitionProgress),
        positionY: THREE.MathUtils.lerp(0, 1, exitProgress),
        positionZ: THREE.MathUtils.lerp(0, -1, transitionProgress),
        opacity: THREE.MathUtils.lerp(1, 0, transitionProgress),
        scale: THREE.MathUtils.lerp(1, 0.5, transitionProgress),
      };
    }

    return {
      rotationX: 0.3,
      rotationY: Math.PI * 0.5,
      rotationZ: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      opacity: 1,
      scale: 1,
    };
  };

  // Frame loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const currentState = state.current;
    const { activeProject, projectProgress, isTransitioning, transitionProgress, transitionFrom, transitionTo } = currentState;

    const isActive = activeProject === "esp32" || transitionFrom === "esp32" || transitionTo === "esp32";

    if (!isActive) {
      if (current.current.opacity > 0.01) {
        current.current.opacity *= 0.9;
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

  return (
    <group ref={groupRef}>
      <group scale={scale}>
        <PlaceholderBoard opacity={current.current.opacity} />
      </group>

      {/* Scan line effect */}
      {showScanLine && (
        <ScanLine
          progress={current.current.scanProgress}
          color="#00ff00"
          width={1.5}
          height={2}
          opacity={current.current.opacity * 0.7}
        />
      )}
    </group>
  );
}
