"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECT_STAGE_CONFIG, useShowcase } from "@/contexts/ShowcaseContext";
import HologramProjection, { type HologramCard } from "../effects/HologramProjection";

interface AgriSenseModelProps {
  scale?: number;
}

export default function AgriSenseModel({ scale = 1 }: AgriSenseModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const screenOverlayRef = useRef<THREE.Mesh>(null);
  const { scene: originalScene } = useGLTF("/models/i_phone_14_pro_copy.gltf");
  const screenTexture = useTexture("/textures/Loading_Screen_Agrisense.jpeg");
  const { state, setModelState } = useShowcase();
  const stage = PROJECT_STAGE_CONFIG.agrisense;

  // Clone the scene
  const scene = useMemo(() => originalScene.clone(true), [originalScene]);

  // Configure screen texture
  const configuredScreenTexture = useMemo(() => {
    const texture = screenTexture.clone();
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    // Rotate texture 180 degrees to fix orientation
    texture.center.set(0.5, 0.5);
    texture.rotation = Math.PI;
    texture.needsUpdate = true;
    return texture;
  }, [screenTexture]);

  // Current interpolated values for smooth transitions
  // START COMPLETELY HIDDEN to prevent visibility on home screen
  // Position on LEFT side of viewport (index 0 = even = left side)
  const hologramCards = useMemo<HologramCard[]>(
    () => [
      {
        id: "agrisense",
        title: "AgriSense",
        subtitle: "Offline crop diagnosis",
        accentColor: "#79f2ff",
        statLabel: "Accuracy",
        statValue: "92%",
      },
      {
        id: "esp32",
        title: "ESP32 Scanner",
        subtitle: "Edge inference",
        accentColor: "#85ffb8",
        statLabel: "Latency",
        statValue: "180ms",
      },
      {
        id: "arms",
        title: "ARMS",
        subtitle: "Farm operations",
        accentColor: "#7ea8ff",
        statLabel: "Farms",
        statValue: "150+",
      },
      {
        id: "realitech",
        title: "Realitech",
        subtitle: "Smart irrigation",
        accentColor: "#ffe48a",
        statLabel: "Water",
        statValue: "-35%",
      },
    ],
    []
  );

  const current = useRef({
    rotationX: -0.3,
    rotationY: 0,
    rotationZ: 0,
    positionX: stage.entry.x,
    positionY: stage.entry.y,
    positionZ: stage.entry.z,
    opacity: 0,          // Completely transparent
    scale: 0,            // Completely scaled down
    floatTime: 0,
    hologramRotation: 0,
  });

  // Premium dark brushed metal material
  const chassisMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1a1a1a"),
        metalness: 0.95,
        roughness: 0.35,
        envMapIntensity: 1.2,
        transparent: true,
      }),
    []
  );

  // Emissive screen material with UI texture - Enhanced for premium glow
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: configuredScreenTexture,
        emissive: new THREE.Color("#ffffff"),
        emissiveMap: configuredScreenTexture,
        emissiveIntensity: 0.8, // Increased for "lit screen" effect
        metalness: 0.05,
        roughness: 0.15,
        envMapIntensity: 1.2, // Enhanced environment reflections
        transparent: true,
      }),
    [configuredScreenTexture]
  );

  // Glass material
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#a6d9ff"),
        metalness: 0.15,
        roughness: 0.05,
        envMapIntensity: 2.6,
        transparent: true,
        opacity: 0.28,
        transmission: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        ior: 1.45,
      }),
    []
  );

  // Apply materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        child.castShadow = true;
        child.receiveShadow = true;

        if (name.includes("screen") || name.includes("display") || name.includes("lcd")) {
          child.material = screenMaterial;
        } else if (name.includes("lens") || name.includes("camera") || name.includes("glass")) {
          child.material = glassMaterial;
        } else {
          child.material = chassisMaterial;
        }
      }
    });

    return () => {
      chassisMaterial.dispose();
      screenMaterial.dispose();
      glassMaterial.dispose();
      configuredScreenTexture.dispose();
    };
  }, [scene, chassisMaterial, screenMaterial, glassMaterial, configuredScreenTexture]);

  const getTargetState = (
    projectProgress: number,
    isTransitioning: boolean,
    transitionProgress: number
  ) => {
    // Pre-entry phase (hero zone) - completely hidden
    if (projectProgress <= 0) {
      return {
        rotationX: -0.3,
        rotationY: 0,
        rotationZ: 0,
        positionX: stage.entry.x,
        positionY: stage.entry.y,
        positionZ: stage.entry.z,
        opacity: 0,
        scale: 0,
        hologramActive: false,
      };
    }

    if (projectProgress < 0.18) {
      const entryProgress = projectProgress / 0.18;
      const easedProgress = 1 - Math.pow(1 - entryProgress, 3);
      return {
        rotationX: THREE.MathUtils.lerp(-0.38, 0.08, easedProgress),
        rotationY: THREE.MathUtils.lerp(-0.6, 0.24, easedProgress),
        rotationZ: THREE.MathUtils.lerp(-0.08, 0, easedProgress),
        positionX: THREE.MathUtils.lerp(stage.entry.x, stage.rest.x, easedProgress),
        positionY: THREE.MathUtils.lerp(stage.entry.y, stage.rest.y, easedProgress),
        positionZ: THREE.MathUtils.lerp(stage.entry.z, stage.rest.z, easedProgress),
        opacity: THREE.MathUtils.smoothstep(easedProgress, 0.12, 1),
        scale: THREE.MathUtils.lerp(stage.safeScale.min, stage.safeScale.max, easedProgress),
        hologramActive: false,
      };
    }

    if (projectProgress < 0.34) {
      const showcaseProgress = (projectProgress - 0.18) / 0.16;
      return {
        rotationX: THREE.MathUtils.lerp(0.08, 0.14, showcaseProgress),
        rotationY: THREE.MathUtils.lerp(0.24, 0.58, showcaseProgress),
        rotationZ: THREE.MathUtils.lerp(0, 0.02, showcaseProgress),
        positionX: stage.rest.x,
        positionY: stage.rest.y,
        positionZ: stage.rest.z,
        opacity: 1,
        scale: stage.safeScale.max,
        hologramActive: false,
      };
    }

    if (projectProgress < 0.46) {
      const layingProgress = (projectProgress - 0.34) / 0.12;
      return {
        rotationX: THREE.MathUtils.lerp(0.14, Math.PI / 2 - 0.12, layingProgress),
        rotationY: THREE.MathUtils.lerp(0.58, 0.18, layingProgress),
        rotationZ: THREE.MathUtils.lerp(0.02, -0.04, layingProgress),
        positionX: THREE.MathUtils.lerp(stage.rest.x, -0.48, layingProgress),
        positionY: THREE.MathUtils.lerp(stage.rest.y, -0.28, layingProgress),
        positionZ: THREE.MathUtils.lerp(stage.rest.z, 0.1, layingProgress),
        opacity: 1,
        scale: stage.safeScale.max,
        hologramActive: layingProgress > 0.6,
      };
    }

    if (projectProgress < 0.68) {
      const hologramProgress = (projectProgress - 0.46) / 0.22;
      return {
        rotationX: Math.PI / 2 - 0.12,
        rotationY: THREE.MathUtils.lerp(0.18, 0.28, hologramProgress),
        rotationZ: THREE.MathUtils.lerp(-0.04, 0.03, hologramProgress),
        positionX: THREE.MathUtils.lerp(-0.48, -0.16, hologramProgress),
        positionY: -0.3, // Lowered position
        positionZ: THREE.MathUtils.lerp(0.1, 0.12, hologramProgress),
        opacity: 1,
        scale: stage.safeScale.max,
        hologramActive: true,
      };
    }

    if (projectProgress < 0.82) {
      const standUpProgress = (projectProgress - 0.68) / 0.14;
      const easedStandUp = 1 - Math.pow(1 - standUpProgress, 2);
      return {
        rotationX: THREE.MathUtils.lerp(Math.PI / 2 - 0.12, 0.22, easedStandUp),
        rotationY: THREE.MathUtils.lerp(0.28, 0.5, easedStandUp),
        rotationZ: THREE.MathUtils.lerp(0.03, 0, easedStandUp),
        positionX: THREE.MathUtils.lerp(-0.16, stage.rest.x - 0.1, easedStandUp),
        positionY: THREE.MathUtils.lerp(-0.3, stage.rest.y, easedStandUp),
        positionZ: THREE.MathUtils.lerp(0.12, stage.rest.z, easedStandUp),
        opacity: 1,
        scale: stage.safeScale.max,
        hologramActive: standUpProgress < 0.3,
      };
    }

    const exitProgress = (projectProgress - 0.82) / 0.18;
    if (isTransitioning) {
      return {
        rotationX: THREE.MathUtils.lerp(0.22, 0.3, exitProgress),
        rotationY: THREE.MathUtils.lerp(0.5, 1.1, exitProgress),
        rotationZ: THREE.MathUtils.lerp(0, 0.18, exitProgress),
        positionX: THREE.MathUtils.lerp(stage.rest.x - 0.1, stage.exit.x, transitionProgress),
        positionY: THREE.MathUtils.lerp(stage.rest.y, stage.exit.y, exitProgress),
        positionZ: THREE.MathUtils.lerp(stage.rest.z, stage.exit.z, transitionProgress),
        opacity: THREE.MathUtils.lerp(1, 0, transitionProgress),
        scale: THREE.MathUtils.lerp(stage.safeScale.max, 0.05, transitionProgress),
        hologramActive: false,
      };
    }

    return {
      rotationX: THREE.MathUtils.lerp(0.22, 0.3, exitProgress),
      rotationY: THREE.MathUtils.lerp(0.5, 1.1, exitProgress),
      rotationZ: 0,
      positionX: stage.rest.x - 0.1,
      positionY: stage.rest.y,
      positionZ: stage.rest.z,
      opacity: THREE.MathUtils.lerp(1, 0.35, exitProgress),
      scale: THREE.MathUtils.lerp(stage.safeScale.max, 0.72, exitProgress),
      hologramActive: false,
    };
  };

  // Track hologram state for smooth transitions - using state for render decisions
  const hologramOpacityRef = useRef(0);
  const [hologramState, setHologramState] = useState({ visible: false, opacity: 0 });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const currentState = state.current;
    const {
      activeProject,
      projectProgress,
      isTransitioning,
      transitionProgress,
      transitionFrom,
      transitionTo,
    } = currentState;

    const isActive =
      activeProject === "agrisense" ||
      transitionFrom === "agrisense" ||
      transitionTo === "agrisense";

    // Completely fade out when not active
    if (!isActive) {
      if (current.current.opacity > 0.01) {
        current.current.opacity *= 0.85; // Faster fade out
        current.current.scale *= 0.9;
      } else {
        // Ensure completely hidden
        current.current.opacity = 0;
        current.current.scale = 0;
      }
      hologramOpacityRef.current *= 0.9;
      if (hologramState.visible && hologramOpacityRef.current < 0.01) {
        setHologramState({ visible: false, opacity: 0 });
      }
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.MeshStandardMaterial).opacity = current.current.opacity;
        }
      });
      return;
    }

    const target = getTargetState(
      activeProject === "agrisense" ? projectProgress : 1,
      isTransitioning,
      transitionProgress
    );
    const lerp = 1 - Math.pow(0.001, delta);

    current.current.rotationX += (target.rotationX - current.current.rotationX) * lerp;
    current.current.rotationY += (target.rotationY - current.current.rotationY) * lerp;
    current.current.rotationZ += (target.rotationZ - current.current.rotationZ) * lerp;
    current.current.positionX += (target.positionX - current.current.positionX) * lerp;
    current.current.positionY += (target.positionY - current.current.positionY) * lerp;
    current.current.positionZ += (target.positionZ - current.current.positionZ) * lerp;
    current.current.opacity += (target.opacity - current.current.opacity) * lerp;
    current.current.scale += (target.scale - current.current.scale) * lerp;
    current.current.hologramRotation += delta * 0.22;

    // Smooth hologram opacity transition
    const targetHologramOpacity = target.hologramActive ? 1 : 0;
    hologramOpacityRef.current += (targetHologramOpacity - hologramOpacityRef.current) * 0.05;

    // Update hologram state only when crossing visibility threshold to avoid excessive re-renders
    const shouldShowHologram = hologramOpacityRef.current > 0.01;
    if (shouldShowHologram !== hologramState.visible ||
        (shouldShowHologram && Math.abs(hologramOpacityRef.current - hologramState.opacity) > 0.05)) {
      setHologramState({ visible: shouldShowHologram, opacity: hologramOpacityRef.current });
    }

    // Apply transforms
    groupRef.current.rotation.set(
      current.current.rotationX,
      current.current.rotationY,
      current.current.rotationZ
    );
    groupRef.current.position.set(
      current.current.positionX,
      current.current.positionY,
      current.current.positionZ
    );
    groupRef.current.scale.setScalar(current.current.scale * scale);

    // Floating effect
    current.current.floatTime += delta;
    if (!target.hologramActive) {
      groupRef.current.position.y += Math.sin(current.current.floatTime * 1.5) * 0.003;
    }

    // Apply opacity
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        (child.material as THREE.MeshStandardMaterial).opacity = current.current.opacity;
      }
    });

    if (screenOverlayRef.current) {
      const material = screenOverlayRef.current.material as THREE.MeshPhysicalMaterial;
      material.opacity = current.current.opacity * 0.06;
      screenOverlayRef.current.visible = current.current.opacity > 0.01;
    }

    setModelState("agrisense", {
      positionX: groupRef.current.position.x,
      positionY: groupRef.current.position.y,
      positionZ: groupRef.current.position.z,
      rotationX: groupRef.current.rotation.x,
      rotationY: groupRef.current.rotation.y,
      rotationZ: groupRef.current.rotation.z,
      scale: current.current.scale,
      opacity: current.current.opacity,
      visible: current.current.opacity > 0.01,
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={scale} />
      <mesh ref={screenOverlayRef} position={[0, 0, 0.022]} renderOrder={10}>
        <planeGeometry args={[0.72, 1.5]} />
        <meshPhysicalMaterial
          color="#e8f7ff"
          transparent
          opacity={0}
          metalness={0}
          roughness={0.08}
          transmission={0.14}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.4}
          depthWrite={false}
        />
      </mesh>

      {/* Hologram projection when phone lies flat - projects from screen */}
      {hologramState.visible && (
        <HologramProjection
          opacity={hologramState.opacity}
          color="#7addff"
          position={[0, 0.16, 0.02]}
          screenAnchor={[0, 0, 0]}
          beamHeight={0.8}
          cards={hologramCards}
          mode="carousel"
          rotationProgress={0}
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/i_phone_14_pro_copy.gltf");
useTexture.preload("/textures/Loading_Screen_Agrisense.jpeg");
