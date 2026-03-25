"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture, Float, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function PhoneModel({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene: originalScene } = useGLTF("/models/i_phone_14_pro_copy.gltf");
  const screenTexture = useTexture("/textures/Loading_Screen_Agrisense.jpeg");

  // Clone the scene so multiple instances can coexist
  const scene = useMemo(() => originalScene.clone(true), [originalScene]);

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
        emissiveIntensity: 0.4,
        metalness: 0.1,
        roughness: 0.2,
        envMapIntensity: 0.5,
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

  // Apply materials to cloned scene
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

  // Slow rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.1, 0.3, 0]}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

export default function PhoneScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#a0c4ff" />
      <directionalLight position={[0, -5, 2]} intensity={0.2} color="#ffd6a5" />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.2}>
          <PhoneModel scale={1} />
        </Float>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/i_phone_14_pro_copy.gltf");
useTexture.preload("/textures/Loading_Screen_Agrisense.jpeg");
