"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShowcase } from "@/contexts/ShowcaseContext";
import HologramParticles from "../effects/HologramParticles";

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

  // Current interpolated values for smooth transitions
  const current = useRef({
    rotationX: -0.1,  // Match entry animation start
    rotationY: 0.1,
    rotationZ: 0,
    positionX: 0,
    positionY: -0.3,    // Match entry animation start
    positionZ: 0,
    opacity: 0.5,       // Start at 50% opacity for immediate visibility
    scale: 0.9,         // Match entry animation start
    floatTime: 0,
  });

  // Configure screen texture
  useMemo(() => {
    screenTexture.flipY = false;
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    screenTexture.center.set(0.5, 0.5);
    screenTexture.rotation = Math.PI;
  }, [screenTexture]);

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

  // Emissive screen material
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: screenTexture,
        emissive: new THREE.Color("#ffffff"),
        emissiveMap: screenTexture,
        emissiveIntensity: 0.5,
        metalness: 0.1,
        roughness: 0.2,
        envMapIntensity: 0.5,
        transparent: true,
      }),
    [screenTexture]
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
    };
  }, [scene, chassisMaterial, screenMaterial, glassMaterial]);

  // Animation keyframes for AgriSense
  const getTargetState = (projectProgress: number, isTransitioning: boolean, transitionProgress: number) => {
    // Entry animation (0-15%) - quick fade in, phone rises into view
    if (projectProgress < 0.15) {
      const entryProgress = projectProgress / 0.15;
      // Use easeOut for faster initial visibility
      const easedProgress = 1 - Math.pow(1 - entryProgress, 3);
      return {
        rotationX: THREE.MathUtils.lerp(-0.1, 0.1, easedProgress),
        rotationY: THREE.MathUtils.lerp(0.1, 0.3, easedProgress),
        rotationZ: 0,
        positionX: 0,
        positionY: THREE.MathUtils.lerp(-0.3, 0, easedProgress),
        positionZ: 0,
        opacity: THREE.MathUtils.lerp(0.5, 1, easedProgress), // Start at 50% opacity
        scale: THREE.MathUtils.lerp(0.9, 1, easedProgress),
      };
    }

    // Active state (15-80%)
    if (projectProgress < 0.8) {
      const activeProgress = (projectProgress - 0.15) / 0.65;
      return {
        rotationX: 0.1,
        rotationY: THREE.MathUtils.lerp(0.3, 0.5, activeProgress),
        rotationZ: 0,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        opacity: 1,
        scale: 1,
      };
    }

    // Exit animation (80-100%) - rotate to show back camera
    const exitProgress = (projectProgress - 0.8) / 0.2;

    // During transition to ESP32, morph behavior
    if (isTransitioning) {
      return {
        rotationX: THREE.MathUtils.lerp(0.1, 0.2, exitProgress),
        rotationY: THREE.MathUtils.lerp(0.5, Math.PI, exitProgress),
        rotationZ: THREE.MathUtils.lerp(0, 0.1, exitProgress),
        positionX: THREE.MathUtils.lerp(0, -1, transitionProgress),
        positionY: THREE.MathUtils.lerp(0, 0.5, exitProgress),
        positionZ: THREE.MathUtils.lerp(0, -1, transitionProgress),
        opacity: THREE.MathUtils.lerp(1, 0, transitionProgress),
        scale: THREE.MathUtils.lerp(1, 0.3, transitionProgress),
      };
    }

    return {
      rotationX: THREE.MathUtils.lerp(0.1, 0.2, exitProgress),
      rotationY: THREE.MathUtils.lerp(0.5, Math.PI, exitProgress),
      rotationZ: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      opacity: 1,
      scale: 1,
    };
  };

  // Frame loop
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const currentState = state.current;
    const { activeProject, projectProgress, isTransitioning, transitionProgress, transitionFrom, transitionTo } = currentState;

    const target = getTargetState(
      activeProject === "agrisense" ? projectProgress : 1,
      isTransitioning,
      transitionProgress
    );
    const lerp = 1 - Math.pow(0.001, delta);

    // Smooth interpolation
    current.current.rotationX += (target.rotationX - current.current.rotationX) * lerp;
    current.current.rotationY += (target.rotationY - current.current.rotationY) * lerp;
    current.current.rotationZ += (target.rotationZ - current.current.rotationZ) * lerp;
    current.current.positionX += (target.positionX - current.current.positionX) * lerp;
    current.current.positionY += (target.positionY - current.current.positionY) * lerp;
    current.current.positionZ += (target.positionZ - current.current.positionZ) * lerp;
    current.current.opacity += (target.opacity - current.current.opacity) * lerp;
    current.current.scale += (target.scale - current.current.scale) * lerp;

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

    // Update context state
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

  // Keep particles available since the phone remains visible across sections
  const showParticles = true;

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={scale} />

      {/* Hologram particles rising from screen */}
      {showParticles && (
        <HologramParticles
          count={25}
          color="#1B6B35"
          size={0.03}
          speed={0.3}
          spread={0.4}
          height={1.5}
          position={[0, 0.3, 0.1]}
          opacity={current.current.opacity}
        />
      )}
    </group>
  );
}

useGLTF.preload("/models/i_phone_14_pro_copy.gltf");
useTexture.preload("/textures/Loading_Screen_Agrisense.jpeg");
