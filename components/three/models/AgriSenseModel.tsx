"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useShowcase } from "@/contexts/ShowcaseContext";

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
  const current = useRef({
    rotationX: -0.1,
    rotationY: 0.1,
    rotationZ: 0,
    positionX: 0,
    positionY: -0.3,
    positionZ: 0,
    opacity: 0,
    scale: 0,
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
        positionX: 0,
        positionY: -2,
        positionZ: -3,
        opacity: 0,
        scale: 0,
      };
    }

    // Entry phase (0-15% of project range)
    if (projectProgress < 0.15) {
      const entryProgress = projectProgress / 0.15;
      const easedProgress = 1 - Math.pow(1 - entryProgress, 3);
      return {
        rotationX: THREE.MathUtils.lerp(-0.1, 0.1, easedProgress),
        rotationY: THREE.MathUtils.lerp(0.1, 0.3, easedProgress),
        rotationZ: 0,
        positionX: 0,
        positionY: THREE.MathUtils.lerp(-0.3, 0, easedProgress),
        positionZ: 0,
        opacity: THREE.MathUtils.lerp(0.5, 1, easedProgress),
        scale: THREE.MathUtils.lerp(0.9, 1, easedProgress),
      };
    }

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

    const exitProgress = (projectProgress - 0.8) / 0.2;
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

    if (!isActive) {
      if (current.current.opacity > 0.01) {
        current.current.opacity *= 0.9;
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
    </group>
  );
}

useGLTF.preload("/models/i_phone_14_pro_copy.gltf");
useTexture.preload("/textures/Loading_Screen_Agrisense.jpeg");
