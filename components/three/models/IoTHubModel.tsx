"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShowcase } from "@/contexts/ShowcaseContext";
import WaterDroplets from "../effects/WaterDroplets";

interface IoTHubModelProps {
  scale?: number;
}

// Enhanced sensor node component with premium materials
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
  const ledRef = useRef<THREE.Mesh>(null);

  // Premium sensor body material
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2a3a4a"),
        metalness: 0.85,
        roughness: 0.25,
        envMapIntensity: 1.3,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // Animated LED material
  const ledMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00ff88"),
        emissive: new THREE.Color("#00ff88"),
        emissiveIntensity: 1.0,
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

    // Animate LED pulsing
    if (ledRef.current) {
      const pulse = 0.7 + Math.sin(time * 3 + orbitOffset) * 0.4;
      (ledRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={ref}>
      {/* Main sensor body with panels */}
      <mesh material={material} castShadow>
        <boxGeometry args={[size, size * 0.6, size * 0.4]} />
      </mesh>

      {/* Solar panel detail (top) */}
      <mesh position={[0, size * 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size * 0.8, size * 0.3]} />
        <meshStandardMaterial
          color="#1a2a3a"
          metalness={0.3}
          roughness={0.6}
          transparent
          opacity={opacity * 0.9}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, size * 0.4, 0]} material={material}>
        <cylinderGeometry args={[0.012, 0.012, size * 0.5, 8]} />
      </mesh>

      {/* Antenna tip */}
      <mesh position={[0, size * 0.65, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#00aaff"
          emissiveIntensity={0.6}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* LED indicator (pulsing) */}
      <mesh ref={ledRef} position={[size * 0.35, 0, size * 0.21]} material={ledMaterial}>
        <sphereGeometry args={[0.025, 16, 16]} />
      </mesh>

      {/* Secondary indicator */}
      <mesh position={[-size * 0.35, 0, size * 0.21]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={0.4}
          transparent
          opacity={opacity * 0.7}
        />
      </mesh>

      {/* Side vents */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[size * 0.52 * side, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[size * 0.3, 0.01, size * 0.2]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.5}
            roughness={0.7}
            transparent
            opacity={opacity * 0.6}
          />
        </mesh>
      ))}
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

// Premium IoT Hub with animated LED ring
function PlaceholderHub({ opacity }: { opacity: number }) {
  const timeRef = useRef(0);

  // Premium matte dark hub body
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a2e"),
        metalness: 0.8,
        roughness: 0.3,
        envMapIntensity: 1.2,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // Enhanced green accent material
  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1B6B35"),
        emissive: new THREE.Color("#1B6B35"),
        emissiveIntensity: 0.5, // Increased glow
        metalness: 0.6,
        roughness: 0.4,
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // Animated LED ring material
  const ledRingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#00d2d3"),
        emissive: new THREE.Color("#00d2d3"),
        emissiveIntensity: 1.0, // Will be animated
        transparent: true,
        opacity,
      }),
    [opacity]
  );

  // Animate LED ring pulsing
  useFrame((state) => {
    timeRef.current = state.clock.getElapsedTime();
    const pulse = 0.8 + Math.sin(timeRef.current * 2) * 0.3;
    ledRingMaterial.emissiveIntensity = pulse;
  });

  return (
    <group>
      {/* Main body - premium cylindrical hub */}
      <mesh material={bodyMaterial} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.35, 0.25, 32]} />
      </mesh>

      {/* Top dome with subtle metallic finish */}
      <mesh position={[0, 0.15, 0]} material={bodyMaterial}>
        <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>

      {/* Animated LED ring with glow */}
      <mesh position={[0, 0.05, 0]} material={ledRingMaterial}>
        <torusGeometry args={[0.38, 0.018, 16, 64]} />
      </mesh>

      {/* Accent stripe (green) */}
      <mesh position={[0, 0, 0]} material={accentMaterial}>
        <torusGeometry args={[0.41, 0.025, 16, 64]} />
      </mesh>

      {/* Base with chamfered edge */}
      <mesh position={[0, -0.15, 0]} material={bodyMaterial} receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.05, 32]} />
      </mesh>

      {/* Base ring detail */}
      <mesh position={[0, -0.125, 0]}>
        <torusGeometry args={[0.46, 0.01, 16, 64]} />
        <meshStandardMaterial
          color="#3a3a4a"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Status LEDs positioned around the hub */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const ledTime = timeRef.current * 2 + i * Math.PI / 3;
        const ledIntensity = 0.6 + Math.sin(ledTime) * 0.4;

        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.32, 0.08, Math.sin(angle) * 0.32]}
          >
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial
              color="#00d2d3"
              emissive="#00d2d3"
              emissiveIntensity={ledIntensity}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}

      {/* Central antenna/sensor */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.015, 0.025, 0.25, 16]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.3}
          emissive="#00aaff"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Antenna tip LED */}
      <mesh position={[0, 0.525, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#00aaff"
          emissive="#00aaff"
          emissiveIntensity={0.9}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Vent holes (decorative details) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.38;
        const z = Math.sin(angle) * 0.38;
        return (
          <mesh key={`vent-${i}`} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.03, 0.15, 0.01]} />
            <meshStandardMaterial
              color="#0a0a0a"
              metalness={0.3}
              roughness={0.7}
              transparent
              opacity={opacity * 0.8}
            />
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

  // Position on RIGHT side of viewport (index 3 = odd = right side)
  const baseX = 1.8;

  // Current interpolated values - START COMPLETELY HIDDEN
  const current = useRef({
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: baseX,
    positionY: -3,           // Start far below (emerge from below)
    positionZ: -2,           // Start far back
    opacity: 0,              // Completely transparent
    scale: 0,                // Completely scaled down
    floatTime: 0,
    sensorOrbitRadius: 0,
  });

  // Animation keyframes
  const getTargetState = (projectProgress: number) => {
    // Pre-entry - completely hidden
    if (projectProgress <= 0) {
      return {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        positionX: baseX,
        positionY: -3,
        positionZ: -2,
        opacity: 0,
        scale: 0,
        sensorOrbitRadius: 0,
      };
    }

    // Entry - emerge from below with expanding sensors
    if (projectProgress < 0.2) {
      const entryProgress = projectProgress / 0.2;
      const easedProgress = 1 - Math.pow(1 - entryProgress, 3);
      return {
        rotationX: 0,
        rotationY: THREE.MathUtils.lerp(0, Math.PI / 4, easedProgress),
        rotationZ: 0,
        positionX: baseX,
        positionY: THREE.MathUtils.lerp(-2, 0, easedProgress),
        positionZ: THREE.MathUtils.lerp(-1, 0, easedProgress),
        opacity: THREE.MathUtils.lerp(0, 1, easedProgress),
        scale: THREE.MathUtils.lerp(0, 1, easedProgress),
        sensorOrbitRadius: THREE.MathUtils.lerp(0, 1.0, easedProgress),  // Slightly smaller orbit
      };
    }

    // Active state - slow rotation with orbiting sensors
    if (projectProgress < 0.85) {
      const activeProgress = (projectProgress - 0.2) / 0.65;
      return {
        rotationX: 0,
        rotationY: THREE.MathUtils.lerp(Math.PI / 4, Math.PI * 2 + Math.PI / 4, activeProgress),
        rotationZ: 0,
        positionX: baseX,
        positionY: 0,
        positionZ: 0,
        opacity: 1,
        scale: 1,
        sensorOrbitRadius: 1.0,  // Slightly smaller orbit
      };
    }

    // Exit - consolidate and fade
    const exitProgress = (projectProgress - 0.85) / 0.15;
    return {
      rotationX: 0,
      rotationY: THREE.MathUtils.lerp(Math.PI * 2.25, Math.PI * 2.5, exitProgress),
      rotationZ: 0,
      positionX: THREE.MathUtils.lerp(baseX, baseX + 2, exitProgress),  // Move right during exit
      positionY: THREE.MathUtils.lerp(0, 0.5, exitProgress),
      positionZ: THREE.MathUtils.lerp(0, -1, exitProgress),
      opacity: THREE.MathUtils.lerp(1, 0, exitProgress),
      scale: THREE.MathUtils.lerp(1, 0, exitProgress),      // Scale to 0
      sensorOrbitRadius: THREE.MathUtils.lerp(1.0, 0, exitProgress),
    };
  };

  // Frame loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const currentState = state.current;
    const { activeProject, projectProgress, transitionFrom, transitionTo } = currentState;

    const isActive = activeProject === "realitech" || transitionFrom === "realitech" || transitionTo === "realitech";

    // Completely fade out when not active
    if (!isActive) {
      if (current.current.opacity > 0.01 || current.current.scale > 0.01) {
        current.current.opacity *= 0.85;
        current.current.scale *= 0.9;
        current.current.sensorOrbitRadius *= 0.9;
      } else {
        current.current.opacity = 0;
        current.current.scale = 0;
        current.current.sensorOrbitRadius = 0;
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
