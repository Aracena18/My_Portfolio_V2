"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HologramParticlesProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  spread?: number;
  height?: number;
  position?: [number, number, number];
  opacity?: number;
}

export default function HologramParticles({
  count = 30,
  color = "#1B6B35",
  size = 0.02,
  speed = 0.5,
  spread = 0.5,
  height = 2,
  position = [0, 0, 0],
  opacity = 1,
}: HologramParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize particle positions and velocities
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * spread,
        y: Math.random() * height * 0.3, // Start at random heights
        z: (Math.random() - 0.5) * spread * 0.5,
        speed: 0.3 + Math.random() * speed,
        phase: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    return data;
  }, [count, spread, height, speed]);

  // Create shader material for holographic effect
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color]);

  // Animate particles
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Move particle upward
      particle.y += particle.speed * 0.01;

      // Reset when reaching top
      if (particle.y > height) {
        particle.y = 0;
        particle.x = (Math.random() - 0.5) * spread;
        particle.z = (Math.random() - 0.5) * spread * 0.5;
      }

      // Add wave motion
      const waveX = Math.sin(time * 2 + particle.phase) * 0.05;
      const waveZ = Math.cos(time * 1.5 + particle.phase) * 0.03;

      // Calculate opacity based on height (fade in at bottom, fade out at top)
      const heightProgress = particle.y / height;
      const particleOpacity = Math.sin(heightProgress * Math.PI) * opacity;

      // Update instance
      dummy.position.set(
        position[0] + particle.x + waveX,
        position[1] + particle.y,
        position[2] + particle.z + waveZ
      );

      // Pulse scale
      const pulseScale = particle.scale * (0.8 + Math.sin(time * 3 + particle.phase) * 0.2);
      dummy.scale.setScalar(pulseScale * size * 10);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Update color with opacity
      const color = new THREE.Color(material.color);
      color.multiplyScalar(particleOpacity);
      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={material}>
      <sphereGeometry args={[size, 8, 8]} />
    </instancedMesh>
  );
}
