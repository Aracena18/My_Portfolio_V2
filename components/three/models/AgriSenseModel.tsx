"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShowcase } from "@/contexts/ShowcaseContext";
import HologramProjection from "../effects/HologramProjection";

interface AgriSenseModelProps {
  scale?: number;
}

export default function AgriSenseModel({ scale = 1 }: AgriSenseModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene: originalScene } = useGLTF("/models/i_phone_14_pro_copy.gltf");
  const screenTexture = useTexture("/textures/Loading_Screen_Agrisense.jpeg");
  const { state, setModelState } = useShowcase();

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
  const baseX = -1.8;

  const current = useRef({
    rotationX: -0.3,
    rotationY: 0,
    rotationZ: 0,
    positionX: baseX - 1,
    positionY: -2,       // Start far below
    positionZ: -3,       // Start far back
    opacity: 0,          // Completely transparent
    scale: 0,            // Completely scaled down
    floatTime: 0,
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
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111111"),
        metalness: 0.9,
        roughness: 0.05,
        envMapIntensity: 2,
        transparent: true,
        opacity: 0.9,
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
        positionX: baseX - 1,
        positionY: -2,
        positionZ: -3,
        opacity: 0,
        scale: 0,
        hologramActive: false,
      };
    }

    // Entry phase (0-15% of project range) - dramatic reveal from left
    if (projectProgress < 0.15) {
      const entryProgress = projectProgress / 0.15;
      const easedProgress = 1 - Math.pow(1 - entryProgress, 3); // Ease out cubic
      return {
        rotationX: THREE.MathUtils.lerp(-0.2, 0.1, easedProgress),
        rotationY: THREE.MathUtils.lerp(-0.5, 0.3, easedProgress),
        rotationZ: THREE.MathUtils.lerp(-0.1, 0, easedProgress),
        positionX: THREE.MathUtils.lerp(baseX - 1, baseX, easedProgress),
        positionY: THREE.MathUtils.lerp(-1.5, 0, easedProgress),
        positionZ: THREE.MathUtils.lerp(-1, 0, easedProgress),
        opacity: THREE.MathUtils.lerp(0, 1, easedProgress),
        scale: THREE.MathUtils.lerp(0, 1, easedProgress),
        hologramActive: false,
      };
    }

    // Showcase phase (15-30%) - rotate to show off the phone
    if (projectProgress < 0.30) {
      const showcaseProgress = (projectProgress - 0.15) / 0.15;
      return {
        rotationX: 0.1,
        rotationY: THREE.MathUtils.lerp(0.3, 0.6, showcaseProgress),
        rotationZ: 0,
        positionX: baseX,
        positionY: 0,
        positionZ: 0,
        opacity: 1,
        scale: 1,
        hologramActive: false,
      };
    }

    // Lie flat phase (30-35%) - transition to lying flat
    if (projectProgress < 0.35) {
      const layingProgress = (projectProgress - 0.30) / 0.05;
      return {
        rotationX: THREE.MathUtils.lerp(0.1, Math.PI / 2 - 0.1, layingProgress),
        rotationY: THREE.MathUtils.lerp(0.6, 0.3, layingProgress),
        rotationZ: 0,
        positionX: baseX,
        positionY: THREE.MathUtils.lerp(0, -0.3, layingProgress), // Lower slightly
        positionZ: 0,
        opacity: 1,
        scale: 1,
        hologramActive: layingProgress > 0.5, // Start hologram as it lies flat
      };
    }

    // HOLOGRAM SHOWCASE (35-60%) - Phone flat, hologram projecting!
    if (projectProgress < 0.60) {
      const hologramProgress = (projectProgress - 0.35) / 0.25;
      return {
        rotationX: Math.PI / 2 - 0.1, // Near horizontal (screen facing up)
        rotationY: THREE.MathUtils.lerp(0.3, 0.7, hologramProgress), // Slow rotation
        rotationZ: 0,
        positionX: baseX,
        positionY: -0.3, // Lowered position
        positionZ: 0,
        opacity: 1,
        scale: 1,
        hologramActive: true, // HOLOGRAM ACTIVE!
      };
    }

    // Stand back up (60-75%)
    if (projectProgress < 0.75) {
      const standUpProgress = (projectProgress - 0.60) / 0.15;
      const easedStandUp = 1 - Math.pow(1 - standUpProgress, 2);
      return {
        rotationX: THREE.MathUtils.lerp(Math.PI / 2 - 0.1, 0.15, easedStandUp),
        rotationY: THREE.MathUtils.lerp(0.7, 0.5, easedStandUp),
        rotationZ: 0,
        positionX: baseX,
        positionY: THREE.MathUtils.lerp(-0.3, 0, easedStandUp),
        positionZ: 0,
        opacity: 1,
        scale: 1,
        hologramActive: standUpProgress < 0.4, // Hologram fades as phone stands up
      };
    }

    // Exit phase (75-100%)
    const exitProgress = (projectProgress - 0.75) / 0.25;
    if (isTransitioning) {
      return {
        rotationX: THREE.MathUtils.lerp(0.15, 0.3, exitProgress),
        rotationY: THREE.MathUtils.lerp(0.5, Math.PI / 2, exitProgress),
        rotationZ: THREE.MathUtils.lerp(0, 0.2, exitProgress),
        positionX: THREE.MathUtils.lerp(baseX, baseX - 2, transitionProgress),
        positionY: THREE.MathUtils.lerp(0, 0.5, exitProgress),
        positionZ: THREE.MathUtils.lerp(0, -2, transitionProgress),
        opacity: THREE.MathUtils.lerp(1, 0, transitionProgress),
        scale: THREE.MathUtils.lerp(1, 0.2, transitionProgress),
        hologramActive: false,
      };
    }

    return {
      rotationX: THREE.MathUtils.lerp(0.15, 0.3, exitProgress),
      rotationY: THREE.MathUtils.lerp(0.5, Math.PI / 2, exitProgress),
      rotationZ: 0,
      positionX: baseX,
      positionY: 0,
      positionZ: 0,
      opacity: THREE.MathUtils.lerp(1, 0.5, exitProgress),
      scale: THREE.MathUtils.lerp(1, 0.8, exitProgress),
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
    groupRef.current.position.y += Math.sin(current.current.floatTime * 1.5) * 0.003;

    // Apply opacity
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        (child.material as THREE.MeshStandardMaterial).opacity = current.current.opacity;
      }
    });

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

      {/* Hologram projection when phone lies flat - projects from screen */}
      {hologramState.visible && (
        <HologramProjection
          opacity={hologramState.opacity}
          color="#1B6B35"
          position={[0, 0.5, 0]}  // Position above the phone screen
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/i_phone_14_pro_copy.gltf");
useTexture.preload("/textures/Loading_Screen_Agrisense.jpeg");
