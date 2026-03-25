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

  const pseudoRandom = (seed: number) => {
    const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  // Initialize droplet data
  const droplets = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 7 + 1);
      const r2 = pseudoRandom(i * 7 + 2);
      const r3 = pseudoRandom(i * 7 + 3);
      const r4 = pseudoRandom(i * 7 + 4);
      const r5 = pseudoRandom(i * 7 + 5);
      const r6 = pseudoRandom(i * 7 + 6);
      data.push({
        x: (r1 - 0.5) * spread,
        y: r2 * 3 + 2, // Start above
        z: (r3 - 0.5) * spread,
        speed: fallSpeed * (0.5 + r4 * 0.5),
        size: 0.02 + r5 * 0.03,
        phase: r6 * Math.PI * 2,
        seed: i,
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
        const cycleSeed = droplet.seed + Math.floor(time * 10);
        droplet.y = 3 + pseudoRandom(cycleSeed * 3 + 1);
        droplet.x = (pseudoRandom(cycleSeed * 3 + 2) - 0.5) * spread;
        droplet.z = (pseudoRandom(cycleSeed * 3 + 3) - 0.5) * spread;
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
