"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataStreamProps {
  startPoint: [number, number, number];
  endPoint: [number, number, number];
  color?: string;
  particleCount?: number;
  speed?: number;
  opacity?: number;
  curveHeight?: number;
}

export default function DataStream({
  startPoint,
  endPoint,
  color = "#1B6B35",
  particleCount = 20,
  speed = 1,
  opacity = 0.8,
  curveHeight = 0.3,
}: DataStreamProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const pseudoRandom = (seed: number) => {
    const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  // Create bezier curve path
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...startPoint);
    const end = new THREE.Vector3(...endPoint);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += curveHeight;

    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startPoint, endPoint, curveHeight]);

  // Initialize particle data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      const r1 = pseudoRandom(i * 2 + 1);
      const r2 = pseudoRandom(i * 2 + 2);
      data.push({
        offset: i / particleCount, // Spread particles along curve
        speed: 0.8 + r1 * 0.4,
        size: 0.5 + r2 * 0.5,
      });
    }
    return data;
  }, [particleCount]);

  // Material
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, opacity]);

  // Animate particles along curve
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Calculate position along curve (0-1, looping)
      const t = ((particle.offset + time * speed * particle.speed * 0.1) % 1);

      // Get point on curve
      const point = curve.getPoint(t);

      // Add some variation
      point.x += Math.sin(t * Math.PI * 4 + time) * 0.02;
      point.z += Math.cos(t * Math.PI * 4 + time) * 0.02;

      dummy.position.copy(point);

      // Scale based on position (fade at ends)
      const fadeProgress = Math.sin(t * Math.PI);
      const baseSize = 0.015 * particle.size;
      dummy.scale.setScalar(baseSize * fadeProgress);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Particle stream */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]} material={material}>
        <sphereGeometry args={[1, 8, 8]} />
      </instancedMesh>

      {/* Faint line showing the path */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                Array.from({ length: 50 }, (_, i) => {
                  const point = curve.getPoint(i / 49);
                  return [point.x, point.y, point.z];
                }).flat()
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.2}
          blending={THREE.AdditiveBlending}
        />
      </line>
    </group>
  );
}
