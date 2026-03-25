"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import PhoneShowcase from "./PhoneShowcase";

interface Background3DProps {
  className?: string;
}

export default function Background3D({ className = "" }: Background3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows
        dpr={[1, 2]}
      >
        {/* Subtle ambient fill for shadow areas */}
        <ambientLight intensity={0.15} color="#ffffff" />

        {/* Primary key light - soft shadows */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
          shadow-radius={8}
        />

        {/* Rim/back light for edge definition */}
        <directionalLight
          position={[-5, 3, -5]}
          intensity={0.5}
          color="#a0c4ff"
        />

        {/* Fill light from below for premium look */}
        <directionalLight
          position={[0, -5, 2]}
          intensity={0.2}
          color="#ffd6a5"
        />

        {/* Studio environment for reflections */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <PhoneShowcase />
        </Suspense>
      </Canvas>
    </div>
  );
}
