"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HologramProjectionProps {
  opacity?: number;
  color?: string;
  position?: [number, number, number];
}

// Floating UI element
function FloatingUIElement({
  position,
  width,
  height,
  color,
  opacity,
  delay,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  color: string;
  opacity: number;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle floating animation
    meshRef.current.position.y = initialY + Math.sin(time * 1.5 + delay) * 0.03;
    meshRef.current.rotation.y = Math.sin(time * 0.5 + delay) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity * 0.4}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Scan line effect
function ScanLineRing({ radius, opacity, color }: { radius: number; opacity: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialRadius = radius;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Expand and fade
    const progress = (time * 0.5) % 1;
    const scale = 0.3 + progress * 0.7;
    meshRef.current.scale.setScalar(scale);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * (1 - progress) * 0.6;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
      <ringGeometry args={[initialRadius * 0.9, initialRadius, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity * 0.5}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Data points floating up
function DataPoints({ count, color, opacity, spread, height }: {
  count: number;
  color: string;
  opacity: number;
  spread: number;
  height: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pseudoRandom = (seed: number) => {
    const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (pseudoRandom(i * 5 + 1) - 0.5) * spread,
        y: pseudoRandom(i * 5 + 2) * height,
        z: (pseudoRandom(i * 5 + 3) - 0.5) * spread * 0.6,
        speed: 0.2 + pseudoRandom(i * 5 + 4) * 0.3,
        phase: pseudoRandom(i * 5 + 5) * Math.PI * 2,
        size: 0.01 + pseudoRandom(i * 5 + 6) * 0.02,
        seed: i,
      });
    }
    return data;
  }, [count, spread, height]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Rise upward
      p.y += p.speed * 0.008;
      if (p.y > height) {
        p.y = 0;
        p.x = (pseudoRandom(p.seed + Math.floor(time * 10)) - 0.5) * spread;
        p.z = (pseudoRandom(p.seed + Math.floor(time * 10) + 1) - 0.5) * spread * 0.6;
      }

      // Sway motion
      const swayX = Math.sin(time * 2 + p.phase) * 0.02;
      const swayZ = Math.cos(time * 1.5 + p.phase) * 0.015;

      dummy.position.set(p.x + swayX, p.y, p.z + swayZ);

      // Fade based on height
      const fadeProgress = p.y / height;
      const scale = p.size * Math.sin(fadeProgress * Math.PI);
      dummy.scale.setScalar(scale * 10);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.01, 6, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity * 0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// Main hologram projection component
export default function HologramProjection({
  opacity = 1,
  color = "#1B6B35",
  position = [0, 0, 0],
}: HologramProjectionProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Core glow at screen level */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Expanding scan rings */}
      <ScanLineRing radius={0.5} opacity={opacity} color={color} />

      {/* Main hologram beam */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.35, 1.2, 32, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Floating UI cards */}
      <FloatingUIElement
        position={[0, 0.4, 0]}
        width={0.5}
        height={0.3}
        color={color}
        opacity={opacity}
        delay={0}
      />
      <FloatingUIElement
        position={[-0.2, 0.65, 0.1]}
        width={0.25}
        height={0.15}
        color="#4ade80"
        opacity={opacity}
        delay={0.5}
      />
      <FloatingUIElement
        position={[0.25, 0.55, -0.05]}
        width={0.2}
        height={0.2}
        color="#22d3ee"
        opacity={opacity}
        delay={1}
      />

      {/* Data particles rising */}
      <DataPoints
        count={50}
        color={color}
        opacity={opacity}
        spread={0.8}
        height={1.2}
      />

      {/* Central highlight */}
      <pointLight
        color={color}
        intensity={opacity * 0.5}
        distance={2}
        position={[0, 0.5, 0]}
      />
    </group>
  );
}
