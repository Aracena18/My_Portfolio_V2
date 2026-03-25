"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShowcase } from "@/contexts/ShowcaseContext";
import DataStream from "../effects/DataStream";

interface MonitorModelProps {
  scale?: number;
}

// Premium Apple-style Monitor/Studio Display
function PlaceholderMonitor({ opacity, screenTexture }: { opacity: number; screenTexture?: THREE.Texture }) {
  // Space gray aluminum material (Apple Studio Display aesthetic)
  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8a8d93"),
        metalness: 0.9,
        roughness: 0.2,
        envMapIntensity: 1.5,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // Enhanced screen material with premium glow
  const screenMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0a0a0a"),
      metalness: 0.05,
      roughness: 0.1,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: screenTexture ? 0.7 : 0.2, // Increased glow
      transparent: true,
      opacity,
    });
    if (screenTexture) {
      mat.map = screenTexture;
      mat.emissiveMap = screenTexture;
    }
    return mat;
  }, [opacity, screenTexture]);

  // Ultra-thin bezel material (dark aluminum)
  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        metalness: 0.85,
        roughness: 0.25,
        envMapIntensity: 1.2,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  return (
    <group>
      {/* Ultra-thin bezel frame - Apple-style minimal */}
      <mesh position={[0, 0.8, 0]} material={bezelMaterial} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.5, 0.03]} />
      </mesh>

      {/* Premium display screen */}
      <mesh position={[0, 0.8, 0.02]} material={screenMaterial}>
        <planeGeometry args={[2.3, 1.42]} />
      </mesh>

      {/* Screen glass overlay for realistic reflection */}
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
          ior={1.5}
        />
      </mesh>

      {/* Elegant cylindrical stand (Studio Display style) */}
      <mesh position={[0, 0.1, -0.05]} rotation={[0.1, 0, 0]} material={aluminumMaterial} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 32]} />
      </mesh>

      {/* Circular base with chamfered edge */}
      <mesh position={[0, -0.05, 0]} material={aluminumMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.5, 0.03, 64]} />
      </mesh>

      {/* Base top surface (polished) */}
      <mesh position={[0, -0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.44, 64]} />
        <meshStandardMaterial
          color="#a0a3a8"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.8}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Apple logo (subtle, minimal) */}
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

      {/* Camera notch (top center of bezel) */}
      <mesh position={[0, 1.5, 0.018]}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.1}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.05}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Power indicator LED (bottom of screen) */}
      <mesh position={[0, 0.1, 0.02]}>
        <sphereGeometry args={[0.008, 16, 16]} />
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={0.6}
          transparent
          opacity={opacity * 0.7}
        />
      </mesh>
    </group>
  );
}

// Enhanced floating chart element with glass panel
function FloatingChart({
  position,
  scale,
  opacity,
  color,
}: {
  position: [number, number, number];
  scale: number;
  opacity: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  // Enhanced chart material with better glow
  const chartMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.7, // Increased glow
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: opacity * 0.9,
      }),
    [color, opacity]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(time * 2 + position[0]) * 0.05;
    ref.current.rotation.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Glass panel background */}
      <mesh position={[0, 0.15, -0.05]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshPhysicalMaterial
          transparent
          opacity={opacity * 0.15}
          metalness={0}
          roughness={0.1}
          envMapIntensity={1.5}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Bar chart with rounded appearance */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[(i - 2) * 0.12, (i % 3) * 0.15 + 0.1, 0]}>
          <boxGeometry args={[0.08, 0.1 + (i % 3) * 0.15, 0.02]} />
          <primitive object={chartMaterial} />
        </mesh>
      ))}

      {/* Chart frame/border */}
      <lineSegments>
        <edgesGeometry
          args={[
            new THREE.PlaneGeometry(0.8, 0.6),
          ]}
        />
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.3}
        />
      </lineSegments>
    </group>
  );
}

export default function MonitorModel({ scale = 1 }: MonitorModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { state, setModelState } = useShowcase();

  // Current interpolated values
  const current = useRef({
    rotationX: 0,
    rotationY: -Math.PI / 2,
    rotationZ: 0,
    positionX: -3,
    positionY: 0,
    positionZ: 0,
    opacity: 0,
    scale: 0.5,
    floatTime: 0,
    chartOffset: 0,
  });

  // Animation keyframes
  const getTargetState = (projectProgress: number, isTransitioning: boolean, transitionProgress: number) => {
    // Entry - dramatic reveal from behind
    if (projectProgress < 0.2) {
      const entryProgress = projectProgress / 0.2;
      return {
        rotationX: THREE.MathUtils.lerp(0.2, 0, entryProgress),
        rotationY: THREE.MathUtils.lerp(-Math.PI, -0.2, entryProgress),
        rotationZ: 0,
        positionX: THREE.MathUtils.lerp(3, 0, entryProgress),
        positionY: THREE.MathUtils.lerp(-0.5, 0, entryProgress),
        positionZ: THREE.MathUtils.lerp(-2, 0, entryProgress),
        opacity: THREE.MathUtils.lerp(0, 1, entryProgress),
        scale: THREE.MathUtils.lerp(0.7, 1, entryProgress),
      };
    }

    // Active state
    if (projectProgress < 0.8) {
      const activeProgress = (projectProgress - 0.2) / 0.6;
      return {
        rotationX: 0,
        rotationY: THREE.MathUtils.lerp(-0.2, 0.2, activeProgress),
        rotationZ: 0,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        opacity: 1,
        scale: 1,
      };
    }

    // Exit
    const exitProgress = (projectProgress - 0.8) / 0.2;

    if (isTransitioning) {
      return {
        rotationX: THREE.MathUtils.lerp(0, -0.3, exitProgress),
        rotationY: THREE.MathUtils.lerp(0.2, Math.PI / 2, exitProgress),
        rotationZ: 0,
        positionX: THREE.MathUtils.lerp(0, -2, transitionProgress),
        positionY: THREE.MathUtils.lerp(0, 1, exitProgress),
        positionZ: THREE.MathUtils.lerp(0, -1, transitionProgress),
        opacity: THREE.MathUtils.lerp(1, 0, transitionProgress),
        scale: THREE.MathUtils.lerp(1, 0.6, transitionProgress),
      };
    }

    return {
      rotationX: 0,
      rotationY: 0.2,
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

    const isActive = activeProject === "arms" || transitionFrom === "arms" || transitionTo === "arms";

    if (!isActive) {
      if (current.current.opacity > 0.01) {
        current.current.opacity *= 0.9;
      }
      return;
    }

    const target = getTargetState(
      activeProject === "arms" ? projectProgress : 1,
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
    groupRef.current.position.y += Math.sin(current.current.floatTime * 1) * 0.002;

    // Chart animation
    current.current.chartOffset += delta * 0.5;

    // Update context
    setModelState("arms", {
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

  const showCharts = state.current.activeProject === "arms" && state.current.projectProgress > 0.3;
  const modelOpacity = state.current.models.arms.opacity;

  return (
    <group ref={groupRef}>
      <group scale={scale}>
        <PlaceholderMonitor opacity={modelOpacity} />
      </group>

      {/* Floating chart elements */}
      {showCharts && (
        <>
          <FloatingChart
            position={[1.5, 1, 0.5]}
            scale={0.8}
            opacity={modelOpacity}
            color="#1B6B35"
          />
          <FloatingChart
            position={[-1.5, 0.8, 0.3]}
            scale={0.6}
            opacity={modelOpacity}
            color="#4338CA"
          />
          <DataStream
            startPoint={[0.8, 0.5, 0.2]}
            endPoint={[1.5, 1, 0.5]}
            color="#1B6B35"
            particleCount={15}
            opacity={modelOpacity * 0.6}
          />
        </>
      )}
    </group>
  );
}
