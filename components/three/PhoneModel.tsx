"use client";

import { useGLTF } from "@react-three/drei";
import FloatingWrapper from "./FloatingWrapper";

interface PhoneModelProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  floatIntensity?: number;
  floatSpeed?: number;
  rotationSpeed?: number;
}

export default function PhoneModel({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  floatIntensity = 0.1,
  floatSpeed = 1.5,
  rotationSpeed = 0.15,
}: PhoneModelProps) {
  const { scene } = useGLTF("/models/i_phone_14_pro_copy.gltf");

  return (
    <group position={position} rotation={rotation}>
      <FloatingWrapper
        floatIntensity={floatIntensity}
        floatSpeed={floatSpeed}
        rotationSpeed={rotationSpeed}
      >
        <primitive object={scene} scale={scale} />
      </FloatingWrapper>
    </group>
  );
}

useGLTF.preload("/models/i_phone_14_pro_copy.gltf");
