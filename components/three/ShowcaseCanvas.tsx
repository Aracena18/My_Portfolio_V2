"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import CameraController from "./CameraController";
import LightingSystem from "./LightingSystem";

import AgriSenseModel from "./models/AgriSenseModel";
import ESP32Model from "./models/ESP32Model";
import MonitorModel from "./models/MonitorModel";
import IoTHubModel from "./models/IoTHubModel";

interface ShowcaseCanvasProps {
  className?: string;
}

// Loading fallback component
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#1B6B35" transparent opacity={0.5} />
    </mesh>
  );
}

// Scene content - separated for cleaner code
function SceneContent() {
  return (
    <>
      {/* Scroll-driven camera and lighting */}
      <CameraController />
      <LightingSystem />

      {/* Studio environment for reflections */}
      <Environment preset="city" />

      {/* Mount all models; each controls its visibility from showcase state */}
      <Suspense fallback={<LoadingFallback />}>
        <AgriSenseModel />
        <ESP32Model />
        <MonitorModel />
        <IoTHubModel />
      </Suspense>

      {/* Preload all models for smoother transitions */}
      <Preload all />
    </>
  );
}

export default function ShowcaseCanvas({ className = "" }: ShowcaseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        shadows="soft"
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        // Performance optimizations
        performance={{ min: 0.5 }}
        // Disable automatic frame loop when not visible
        frameloop="always"
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}

// Wrapper for dynamic import with SSR disabled
export function ShowcaseCanvasWrapper(props: ShowcaseCanvasProps) {
  return <ShowcaseCanvas {...props} />;
}
