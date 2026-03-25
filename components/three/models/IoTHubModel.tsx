"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShowcase } from "@/contexts/ShowcaseContext";
import WaterDroplets from "../effects/WaterDroplets";

interface IoTHubModelProps {
  scale?: number;
}

// Sensor node component
function SensorNode({
  orbitRadius,
  orbitSpeed,
  orbitOffset,
  opacity,
  size = 0.15,
}: {
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  opacity: number;
  size?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2d3436"),
        metalness: 0.8,
        roughness: 0.3,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  const ledMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00ff00"),
        emissive: new THREE.Color("#00ff00"),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const angle = time * orbitSpeed + orbitOffset;

    ref.current.position.x = Math.cos(angle) * orbitRadius;
    ref.current.position.z = Math.sin(angle) * orbitRadius;
    ref.current.position.y = Math.sin(time * 2 + orbitOffset) * 0.1;

    // Face center
    ref.current.lookAt(0, ref.current.position.y, 0);
  });

  return (
    <group ref={ref}>
      {/* Main body */}
      <mesh material={material} castShadow>
        <boxGeometry args={[size, size * 0.6, size * 0.4]} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, size * 0.4, 0]} material={material}>
        <cylinderGeometry args={[0.01, 0.01, size * 0.5, 8]} />
      </mesh>

      {/* LED indicator */}
      <mesh position={[size * 0.3, 0, size * 0.21]} material={ledMaterial}>
        <sphereGeometry args={[0.02, 8, 8]} />
      </mesh>
    </group>
  );
}

// Connection line between hub and sensor
function ConnectionLine({
  targetRef,
  color,
  opacity,
}: {
  targetRef: React.RefObject<THREE.Group | null>;
  color: string;
  opacity: number;
}) {
  const lineRef = useRef<THREE.Line>(null!);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array([0, 0, 0, 1, 0, 0]);
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity * 0.5,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [color, opacity]);

  useFrame(() => {
    if (!lineRef.current || !targetRef.current) return;

    const positions = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
    positions.setXYZ(0, 0, 0, 0);
    positions.setXYZ(1, targetRef.current.position.x, targetRef.current.position.y, targetRef.current.position.z);
    positions.needsUpdate = true;
  });

  return <primitive ref={lineRef} object={new THREE.Line(geometry, material)} />;
}

// Placeholder IoT Hub geometry
function PlaceholderHub({ opacity }: { opacity: number }) {
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a2e"),
        metalness: 0.7,
        roughness: 0.4,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1B6B35"),
        emissive: new THREE.Color("#1B6B35"),
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.5,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  const ledRingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00d2d3"),
        emissive: new THREE.Color("#00d2d3"),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  return (
    <group>
      {/* Main body - cylindrical hub */}
      <mesh material={bodyMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.35, 0.25, 32]} />
      </mesh>

      {/* Top dome */}
      <mesh position={[0, 0.15, 0]} material={bodyMaterial}>
        <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* LED ring */}
      <mesh position={[0, 0.05, 0]} material={ledRingMaterial}>
        <torusGeometry args={[0.38, 0.015, 16, 64]} />
      </mesh>

      {/* Accent stripe */}
      <mesh position={[0, 0, 0]} material={accentMaterial}>
        <torusGeometry args={[0.41, 0.02, 16, 64]} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.15, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.45, 0.45, 0.05, 32]} />
      </mesh>

      {/* Status LEDs */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.3, 0.08, Math.sin(angle) * 0.3]}
            material={ledRingMaterial}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function IoTHubModel({ scale = 1 }: IoTHubModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sensorRefA = useRef<THREE.Group | null>(null);
  const sensorRefB = useRef<THREE.Group | null>(null);
  const sensorRefC = useRef<THREE.Group | null>(null);
  const { state, setModelState } = useShowcase();

  // Current interpolated values
  const current = useRef({
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: 0,
    positionY: -2,
    positionZ: 0,
    opacity: 0,
    scale: 0.5,
    floatTime: 0,
    sensorOrbitRadius: 0,
  });

  // Animation keyframes
  const getTargetState = (projectProgress: number) => {
    // Entry - emerge from below with splash effect
    if (projectProgress < 0.2) {
      const entryProgress = projectProgress / 0.2;
      return {
        rotationX: 0,
        rotationY: THREE.MathUtils.lerp(0, Math.PI / 4, entryProgress),
        rotationZ: 0,
        positionX: 0,
        positionY: THREE.MathUtils.lerp(-1.5, 0, entryProgress),
        positionZ: 0,
        opacity: THREE.MathUtils.lerp(0, 1, entryProgress),
        scale: THREE.MathUtils.lerp(0.3, 1, entryProgress),
        sensorOrbitRadius: THREE.MathUtils.lerp(0, 1.2, entryProgress),
      };
    }

    // Active state - slow rotation with orbiting sensors
    if (projectProgress < 0.85) {
      const activeProgress = (projectProgress - 0.2) / 0.65;
      return {
        rotationX: 0,
        rotationY: THREE.MathUtils.lerp(Math.PI / 4, Math.PI * 2 + Math.PI / 4, activeProgress),
        rotationZ: 0,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        opacity: 1,
        scale: 1,
        sensorOrbitRadius: 1.2,
      };
    }

    // Exit - consolidate to center
    const exitProgress = (projectProgress - 0.85) / 0.15;
    return {
      rotationX: 0,
      rotationY: Math.PI * 2.5,
      rotationZ: 0,
      positionX: 0,
      positionY: THREE.MathUtils.lerp(0, 0.5, exitProgress),
      positionZ: 0,
      opacity: THREE.MathUtils.lerp(1, 0.8, exitProgress),
      scale: THREE.MathUtils.lerp(1, 0.7, exitProgress),
      sensorOrbitRadius: THREE.MathUtils.lerp(1.2, 0.3, exitProgress),
    };
  };

  // Frame loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const currentState = state.current;
    const { activeProject, projectProgress, transitionFrom, transitionTo } = currentState;

    const isActive = activeProject === "realitech" || transitionFrom === "realitech" || transitionTo === "realitech";

    if (!isActive) {
      if (current.current.opacity > 0.01) {
        current.current.opacity *= 0.9;
      }
      return;
    }

    const target = getTargetState(activeProject === "realitech" ? projectProgress : 1);
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
    current.current.sensorOrbitRadius += (target.sensorOrbitRadius - current.current.sensorOrbitRadius) * lerp;

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
    groupRef.current.position.y += Math.sin(current.current.floatTime * 0.8) * 0.003;

    // Update context
    setModelState("realitech", {
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

  const showEffects = state.current.activeProject === "realitech" && state.current.projectProgress > 0.15;
  const modelOpacity = state.current.models.realitech.opacity;
  const realtimeProgress =
    state.current.activeProject === "realitech" ? state.current.projectProgress : 1;
  const orbitRadius = getTargetState(realtimeProgress).sensorOrbitRadius;

  return (
    <group ref={groupRef}>
      {/* Central hub */}
      <group scale={scale}>
        <PlaceholderHub opacity={modelOpacity} />
      </group>

      {/* Orbiting sensor nodes */}
      {showEffects && (
        <>
          <group ref={sensorRefA}>
            <SensorNode
              orbitRadius={orbitRadius}
              orbitSpeed={0.5}
              orbitOffset={0}
              opacity={modelOpacity}
            />
          </group>
          <group ref={sensorRefB}>
            <SensorNode
              orbitRadius={orbitRadius * 0.85}
              orbitSpeed={0.7}
              orbitOffset={Math.PI * 0.66}
              opacity={modelOpacity}
            />
          </group>
          <group ref={sensorRefC}>
            <SensorNode
              orbitRadius={orbitRadius * 1.1}
              orbitSpeed={0.4}
              orbitOffset={Math.PI * 1.33}
              opacity={modelOpacity}
            />
          </group>

          {/* Connection lines to sensors */}
          <ConnectionLine targetRef={sensorRefA} color="#00d2d3" opacity={modelOpacity} />
          <ConnectionLine targetRef={sensorRefB} color="#00d2d3" opacity={modelOpacity} />
          <ConnectionLine targetRef={sensorRefC} color="#00d2d3" opacity={modelOpacity} />
        </>
      )}

      {/* Water droplet effects */}
      {showEffects && (
        <WaterDroplets
          count={30}
          spread={2}
          fallSpeed={2}
          opacity={modelOpacity * 0.5}
        />
      )}
    </group>
  );
}
