"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import PhoneModel from "./PhoneModel";

interface SceneContainerProps {
  className?: string;
}

export default function SceneContainer({ className = "" }: SceneContainerProps) {
  return (
    <div className={`fixed inset-0 w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        {/* Subtle ambient fill */}
        <ambientLight intensity={0.2} />

        {/* Key light with soft shadows */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />

        {/* Rim light for edge definition */}
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.4}
        />

        {/* Environment map for realistic reflections */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <PhoneModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
