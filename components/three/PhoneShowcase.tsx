"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePhoneAnimation } from "@/contexts/PhoneAnimationContext";

interface PhoneShowcaseProps {
  scale?: number;
}

export default function PhoneShowcase({ scale = 1 }: PhoneShowcaseProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene: originalScene } = useGLTF("/models/i_phone_14_pro_copy.gltf");
  const screenTexture = useTexture("/textures/Loading_Screen_Agrisense.jpeg");
  const { state: animationState } = usePhoneAnimation();
  const { camera } = useThree();

  // Clone the scene so multiple instances don't conflict
  const scene = useMemo(() => originalScene.clone(true), [originalScene]);

  // Store current interpolated values for smooth transitions
  const current = useRef({
    rotationX: 0.1,
    rotationY: 0.3,
    rotationZ: 0,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    opacity: 1,
    cameraZ: 5,
  });

  // Mount protection to prevent immediate fade on page load
  const hasMounted = useRef(false);

  // Configure screen texture
  useMemo(() => {
    screenTexture.flipY = false;
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    // Rotate texture 180 degrees to fix upside-down image
    screenTexture.center.set(0.5, 0.5);
    screenTexture.rotation = Math.PI;
  }, [screenTexture]);

  // Premium dark brushed metal material for chassis
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

  // Emissive screen material with UI texture
  const screenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: screenTexture,
        emissive: new THREE.Color("#ffffff"),
        emissiveMap: screenTexture,
        emissiveIntensity: 0.4,
        metalness: 0.1,
        roughness: 0.2,
        envMapIntensity: 0.5,
        transparent: true,
      }),
    [screenTexture]
  );

  // Glass material for camera lens and other glass elements
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

  // Traverse and apply custom materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();

        child.castShadow = true;
        child.receiveShadow = true;

        if (
          name.includes("screen") ||
          name.includes("display") ||
          name.includes("lcd")
        ) {
          child.material = screenMaterial;
        } else if (
          name.includes("lens") ||
          name.includes("camera") ||
          name.includes("glass")
        ) {
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

  // Animate based on scroll state with smooth interpolation
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Protect first frame - force full opacity to prevent flicker on page load
    if (!hasMounted.current) {
      hasMounted.current = true;
      current.current.opacity = 1;
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          (child.material as THREE.MeshStandardMaterial).opacity = 1;
        }
      });
      return;
    }

    const target = animationState.current;
    const lerp = 1 - Math.pow(0.001, delta);

    // Smooth interpolation towards target values
    current.current.rotationX += (target.rotationX - current.current.rotationX) * lerp;
    current.current.rotationY += (target.rotationY - current.current.rotationY) * lerp;
    current.current.rotationZ += (target.rotationZ - current.current.rotationZ) * lerp;
    current.current.positionX += (target.positionX - current.current.positionX) * lerp;
    current.current.positionY += (target.positionY - current.current.positionY) * lerp;
    current.current.positionZ += (target.positionZ - current.current.positionZ) * lerp;
    current.current.opacity += (target.opacity - current.current.opacity) * lerp;
    current.current.cameraZ += (target.cameraZ - current.current.cameraZ) * lerp;

    // Apply transforms
    groupRef.current.rotation.x = current.current.rotationX;
    groupRef.current.rotation.y = current.current.rotationY;
    groupRef.current.rotation.z = current.current.rotationZ;
    groupRef.current.position.x = current.current.positionX;
    groupRef.current.position.y = current.current.positionY;
    groupRef.current.position.z = current.current.positionZ;

    // Apply opacity to all materials
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.opacity = current.current.opacity;
      }
    });

    // Animate camera
    camera.position.z = current.current.cameraZ;
  });

  // Subtle floating effect layered on top
  const floatRef = useRef(0);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    floatRef.current += delta;
    groupRef.current.position.y += Math.sin(floatRef.current * 1.5) * 0.002;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

useGLTF.preload("/models/i_phone_14_pro_copy.gltf");
useTexture.preload("/textures/Loading_Screen_Agrisense.jpeg");
