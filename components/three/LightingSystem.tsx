"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useShowcase, type LightingPreset, type ProjectId } from "@/contexts/ShowcaseContext";
import * as THREE from "three";

// Lighting configurations for each preset
interface LightingConfig {
  ambient: { intensity: number; color: string };
  key: { position: [number, number, number]; intensity: number; color: string };
  rim: { position: [number, number, number]; intensity: number; color: string };
  fill: { position: [number, number, number]; intensity: number; color: string };
}

const LIGHTING_PRESETS: Record<LightingPreset, LightingConfig> = {
  ambient: {
    ambient: { intensity: 0.4, color: "#ffffff" },
    key: { position: [5, 8, 5], intensity: 0.8, color: "#ffffff" },
    rim: { position: [-5, 3, -5], intensity: 0.3, color: "#ffffff" },
    fill: { position: [0, -5, 2], intensity: 0.1, color: "#ffffff" },
  },
  studio: {
    ambient: { intensity: 0.15, color: "#ffffff" },
    key: { position: [5, 8, 5], intensity: 1.5, color: "#ffffff" },
    rim: { position: [-5, 3, -5], intensity: 0.5, color: "#a0c4ff" },
    fill: { position: [0, -5, 2], intensity: 0.2, color: "#ffd6a5" },
  },
  dramatic: {
    ambient: { intensity: 0.05, color: "#1a1a2e" },
    key: { position: [8, 5, 3], intensity: 2.0, color: "#ffffff" },
    rim: { position: [-6, 2, -4], intensity: 0.8, color: "#4a90d9" },
    fill: { position: [-3, -3, 5], intensity: 0.1, color: "#2d3436" },
  },
  warm: {
    ambient: { intensity: 0.2, color: "#fff4e0" },
    key: { position: [4, 6, 4], intensity: 1.2, color: "#ffd93d" },
    rim: { position: [-4, 3, -3], intensity: 0.4, color: "#ff9f43" },
    fill: { position: [0, -4, 3], intensity: 0.15, color: "#ffb347" },
  },
  cool: {
    ambient: { intensity: 0.15, color: "#e0f4ff" },
    key: { position: [5, 7, 5], intensity: 1.3, color: "#e8f4f8" },
    rim: { position: [-5, 3, -4], intensity: 0.6, color: "#00d2d3" },
    fill: { position: [0, -5, 2], intensity: 0.2, color: "#54a0ff" },
  },
};

// Map projects to their lighting presets
const PROJECT_LIGHTING: Record<ProjectId, LightingPreset> = {
  agrisense: "studio",
  esp32: "cool",
  arms: "studio",
  realitech: "warm",
};

// Smooth interpolation factor for lighting changes
const LIGHTING_LERP = 0.05;

export default function LightingSystem() {
  const { state, setLightingPreset } = useShowcase();

  // Refs for smooth color transitions
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);

  // Target colors for interpolation
  const ambientColor = useRef(new THREE.Color("#ffffff"));
  const keyColor = useRef(new THREE.Color("#ffffff"));
  const rimColor = useRef(new THREE.Color("#a0c4ff"));
  const fillColor = useRef(new THREE.Color("#ffd6a5"));

  useFrame(() => {
    const currentState = state.current;
    const { activeProject, isTransitioning, transitionFrom, transitionTo, transitionProgress } = currentState;

    // Determine target lighting preset
    let targetPreset: LightingPreset;

    if (isTransitioning && transitionFrom && transitionTo) {
      // During transition, blend between project presets
      const fromPreset = PROJECT_LIGHTING[transitionFrom];
      const toPreset = PROJECT_LIGHTING[transitionTo];

      // For now, switch at midpoint of transition
      targetPreset = transitionProgress < 0.5 ? fromPreset : toPreset;
    } else {
      targetPreset = PROJECT_LIGHTING[activeProject];
    }

    const config = LIGHTING_PRESETS[targetPreset];

    // Update context
    setLightingPreset(targetPreset);

    // Smoothly interpolate ambient light
    if (ambientRef.current) {
      ambientColor.current.set(config.ambient.color);
      ambientRef.current.color.lerp(ambientColor.current, LIGHTING_LERP);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        config.ambient.intensity,
        LIGHTING_LERP
      );
    }

    // Smoothly interpolate key light
    if (keyRef.current) {
      keyColor.current.set(config.key.color);
      keyRef.current.color.lerp(keyColor.current, LIGHTING_LERP);
      keyRef.current.intensity = THREE.MathUtils.lerp(
        keyRef.current.intensity,
        config.key.intensity,
        LIGHTING_LERP
      );
      keyRef.current.position.lerp(
        new THREE.Vector3(...config.key.position),
        LIGHTING_LERP
      );
    }

    // Smoothly interpolate rim light
    if (rimRef.current) {
      rimColor.current.set(config.rim.color);
      rimRef.current.color.lerp(rimColor.current, LIGHTING_LERP);
      rimRef.current.intensity = THREE.MathUtils.lerp(
        rimRef.current.intensity,
        config.rim.intensity,
        LIGHTING_LERP
      );
      rimRef.current.position.lerp(
        new THREE.Vector3(...config.rim.position),
        LIGHTING_LERP
      );
    }

    // Smoothly interpolate fill light
    if (fillRef.current) {
      fillColor.current.set(config.fill.color);
      fillRef.current.color.lerp(fillColor.current, LIGHTING_LERP);
      fillRef.current.intensity = THREE.MathUtils.lerp(
        fillRef.current.intensity,
        config.fill.intensity,
        LIGHTING_LERP
      );
      fillRef.current.position.lerp(
        new THREE.Vector3(...config.fill.position),
        LIGHTING_LERP
      );
    }
  });

  // Initial config
  const initialConfig = LIGHTING_PRESETS.studio;

  return (
    <>
      {/* Ambient fill for shadow areas */}
      <ambientLight
        ref={ambientRef}
        intensity={initialConfig.ambient.intensity}
        color={initialConfig.ambient.color}
      />

      {/* Primary key light with soft shadows */}
      <directionalLight
        ref={keyRef}
        position={initialConfig.key.position}
        intensity={initialConfig.key.intensity}
        color={initialConfig.key.color}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />

      {/* Rim/back light for edge definition */}
      <directionalLight
        ref={rimRef}
        position={initialConfig.rim.position}
        intensity={initialConfig.rim.intensity}
        color={initialConfig.rim.color}
      />

      {/* Fill light from below for premium look */}
      <directionalLight
        ref={fillRef}
        position={initialConfig.fill.position}
        intensity={initialConfig.fill.intensity}
        color={initialConfig.fill.color}
      />
    </>
  );
}
