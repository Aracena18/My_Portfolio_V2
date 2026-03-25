"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

interface FloatingWrapperProps {
  children: React.ReactNode;
  floatIntensity?: number;
  floatSpeed?: number;
  rotationSpeed?: number;
}

export default function FloatingWrapper({
  children,
  floatIntensity = 0.1,
  floatSpeed = 1.5,
  rotationSpeed = 0.15,
}: FloatingWrapperProps) {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta * floatSpeed;

    // Gentle bobbing motion
    groupRef.current.position.y = Math.sin(timeRef.current) * floatIntensity;

    // Subtle tilt oscillation
    groupRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.05;
    groupRef.current.rotation.z = Math.cos(timeRef.current * 0.3) * 0.02;

    // Slow continuous rotation
    groupRef.current.rotation.y += delta * rotationSpeed;
  });

  return <group ref={groupRef}>{children}</group>;
}
