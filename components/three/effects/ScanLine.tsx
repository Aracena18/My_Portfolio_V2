"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScanLineProps {
  progress?: number;
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  position?: [number, number, number];
}

export default function ScanLine({
  progress = 0,
  color = "#00ff00",
  width = 2,
  height = 2,
  opacity = 0.7,
  position = [0, 0, 0.1],
}: ScanLineProps) {
  const lineRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create gradient material for the scan line
  const lineMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [color, opacity]);

  // Glow material
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity * 0.3,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, [color, opacity]);

  // Update position based on progress
  useFrame(() => {
    if (!lineRef.current || !glowRef.current) return;

    // Move line from bottom to top based on progress
    const yPos = -height / 2 + progress * height;

    lineRef.current.position.y = yPos;
    glowRef.current.position.y = yPos;

    // Pulse effect
    const pulse = Math.sin(progress * Math.PI * 4) * 0.2 + 1;
    lineRef.current.scale.x = pulse;
  });

  return (
    <group position={position}>
      {/* Main scan line */}
      <mesh ref={lineRef} position={[0, 0, 0]}>
        <planeGeometry args={[width, 0.02]} />
        <primitive object={lineMaterial} />
      </mesh>

      {/* Glow effect behind the line */}
      <mesh ref={glowRef} position={[0, 0, -0.01]}>
        <planeGeometry args={[width, 0.15]} />
        <primitive object={glowMaterial} />
      </mesh>

      {/* Vertical guide lines (subtle) */}
      <mesh position={[-width / 2, 0, 0]}>
        <planeGeometry args={[0.005, height]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[width / 2, 0, 0]}>
        <planeGeometry args={[0.005, height]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
