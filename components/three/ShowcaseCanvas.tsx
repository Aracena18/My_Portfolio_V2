"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import CameraController from "./CameraController";
import LightingSystem from "./LightingSystem";

// Lazy load models to prevent SSR issues
const AgriSenseModel = lazy(() => import("./models/AgriSenseModel"));
const ESP32Model = lazy(() => import("./models/ESP32Model"));
const MonitorModel = lazy(() => import("./models/MonitorModel"));
const IoTHubModel = lazy(() => import("./models/IoTHubModel"));

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

      {/* Premium post-processing effects */}
      <EffectComposer>
        {/* Bloom for emissive glow (Apple-like subtle) */}
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.SCREEN}
          mipmapBlur
        />

        {/* Vignette for cinematic focus */}
        <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>

      {/* Preload all models for smoother transitions */}
      <Preload all />
    </>
  );
}

// Inner canvas component - only rendered client-side
function ShowcaseCanvasInner({ className = "" }: ShowcaseCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows="soft"
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}

// Main export - handles client-side mounting
export default function ShowcaseCanvas({ className = "" }: ShowcaseCanvasProps) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    // This is intentional for SSR handling - we need to set state after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanRender(true);
  }, []);

  if (!canRender) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <div className="text-white/20 animate-pulse">Initializing 3D Scene...</div>
      </div>
    );
  }

  return <ShowcaseCanvasInner className={className} />;
}
