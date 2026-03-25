"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WaterDropletsProps {
  count?: number;
  spread?: number;
  fallSpeed?: number;
  opacity?: number;
  position?: [number, number, number];
}

export default function WaterDroplets({
  count = 40,
  spread = 2,
  fallSpeed = 1.5,
  opacity = 0.6,
  position = [0, 0, 0],
}: WaterDropletsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize droplet data
  const droplets = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * spread,
        y: Math.random() * 3 + 2, // Start above
        z: (Math.random() - 0.5) * spread,
        speed: fallSpeed * (0.5 + Math.random() * 0.5),
        size: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [count, spread, fallSpeed]);

  // Water material with transparency
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#87CEEB"),
      transparent: true,
      opacity: opacity,
      metalness: 0.1,
      roughness: 0.1,
      envMapIntensity: 1.5,
    });
  }, [opacity]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    droplets.forEach((droplet, i) => {
      // Fall down
      droplet.y -= droplet.speed * delta;

      // Reset when below ground
      if (droplet.y < -1) {
        droplet.y = 3 + Math.random();
        droplet.x = (Math.random() - 0.5) * spread;
        droplet.z = (Math.random() - 0.5) * spread;
      }

      // Slight horizontal drift
      const drift = Math.sin(time * 2 + droplet.phase) * 0.01;

      dummy.position.set(
        position[0] + droplet.x + drift,
        position[1] + droplet.y,
        position[2] + droplet.z
      );

      // Elongate droplet based on fall speed (teardrop effect)
      dummy.scale.set(
        droplet.size,
        droplet.size * (1 + droplet.speed * 0.5),
        droplet.size
      );

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} material={material}>
      <sphereGeometry args={[1, 8, 8]} />
    </instancedMesh>
  );
}
