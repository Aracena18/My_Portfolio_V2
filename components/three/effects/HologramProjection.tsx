"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface HologramCard {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  statLabel: string;
  statValue: string;
}

interface HologramProjectionProps {
  opacity?: number;
  color?: string;
  position?: [number, number, number];
  cards?: HologramCard[];
  beamHeight?: number;
  screenAnchor?: [number, number, number];
  mode?: "carousel" | "stack";
  rotationProgress?: number;
}

function BeamRing({
  radius,
  color,
  opacity,
  speed,
}: {
  radius: number;
  color: string;
  opacity: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const progress = (state.clock.getElapsedTime() * speed) % 1;
    const scale = 0.7 + progress * 0.8;
    ref.current.scale.setScalar(scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity * (1 - progress) * 0.42;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius * 0.82, radius, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity * 0.3}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function HologramDust({
  count,
  color,
  opacity,
  height,
}: {
  count: number;
  color: string;
  opacity: number;
  height: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        radius: 0.08 + (index % 5) * 0.055,
        angle: (index / count) * Math.PI * 2,
        y: ((index * 37) % 100) / 100,
        speed: 0.2 + ((index * 19) % 10) / 30,
        scale: 0.4 + ((index * 23) % 10) / 10,
      })),
    [count]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, index) => {
      const y = ((particle.y + time * particle.speed * 0.18) % 1) * height;
      const radius = particle.radius + Math.sin(time + index) * 0.015;
      const angle = particle.angle + time * 0.3;
      dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.55);
      dummy.scale.setScalar(0.012 * particle.scale);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(index, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 5, 5]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity * 0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function CarouselCard({
  card,
  index,
  count,
  opacity,
  mode,
  rotationProgress,
  beamHeight,
}: {
  card: HologramCard;
  index: number;
  count: number;
  opacity: number;
  mode: "carousel" | "stack";
  rotationProgress: number;
  beamHeight: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const accent = useMemo(() => new THREE.Color(card.accentColor), [card.accentColor]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    const normalized = count === 0 ? 0 : index / count;
    const rotation = rotationProgress * Math.PI * 2 + normalized * Math.PI * 2;
    const radius = mode === "carousel" ? 0.26 : 0.16;
    const x = mode === "carousel" ? Math.cos(rotation) * radius : (index - (count - 1) / 2) * 0.22;
    const z = mode === "carousel" ? Math.sin(rotation) * radius * 0.18 : index * -0.03;
    const yBase = beamHeight * (0.55 + normalized * 0.16);

    ref.current.position.set(x, yBase + Math.sin(time * 1.4 + index) * 0.018, z);
    ref.current.rotation.y = mode === "carousel" ? -rotation + Math.PI / 2 : 0;
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[0.46, 0.28]} />
        <meshPhysicalMaterial
          color="#bdeaff"
          transparent
          opacity={opacity * 0.13}
          metalness={0}
          roughness={0.12}
          transmission={0.15}
          clearcoat={1}
          clearcoatRoughness={0.18}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-0.13, 0.07, 0.002]}>
        <planeGeometry args={[0.14, 0.14]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={opacity * 0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.06, 0.08, 0.002]}>
        <planeGeometry args={[0.18, 0.035]} />
        <meshBasicMaterial color="#dff7ff" transparent opacity={opacity * 0.68} depthWrite={false} />
      </mesh>
      <mesh position={[0.03, 0.02, 0.002]}>
        <planeGeometry args={[0.24, 0.02]} />
        <meshBasicMaterial color="#b1e5ff" transparent opacity={opacity * 0.42} depthWrite={false} />
      </mesh>
      <mesh position={[-0.02, -0.06, 0.002]}>
        <planeGeometry args={[0.34, 0.04]} />
        <meshBasicMaterial color="#f5fbff" transparent opacity={opacity * 0.76} depthWrite={false} />
      </mesh>
      <mesh position={[0.1, -0.06, 0.004]}>
        <planeGeometry args={[0.12, 0.05]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={opacity * 0.72}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <lineSegments position={[0, 0, 0.004]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.46, 0.28)]} />
        <lineBasicMaterial color={accent} transparent opacity={opacity * 0.4} />
      </lineSegments>
    </group>
  );
}

export default function HologramProjection({
  opacity = 1,
  color = "#6fdcff",
  position = [0, 0, 0],
  cards = [],
  beamHeight = 1,
  screenAnchor = [0, 0, 0],
  mode = "carousel",
  rotationProgress = 0,
}: HologramProjectionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const beamColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.04;
  });

  return (
    <group ref={groupRef} position={position}>
      <group position={screenAnchor}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.035, 0]}>
          <circleGeometry args={[0.2, 48]} />
          <meshBasicMaterial
            color={beamColor}
            transparent
            opacity={opacity * 0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[0, beamHeight * 0.5, 0]}>
          <cylinderGeometry args={[0.045, 0.18, beamHeight, 40, 1, true]} />
          <meshBasicMaterial
            color={beamColor}
            transparent
            opacity={opacity * 0.08}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <group position={[0, 0.035, 0]}>
          <BeamRing radius={0.2} color={color} opacity={opacity} speed={0.45} />
          <BeamRing radius={0.14} color={color} opacity={opacity * 0.8} speed={0.72} />
        </group>

        <HologramDust count={24} color={color} opacity={opacity} height={beamHeight} />

        {cards.map((card, index) => (
          <CarouselCard
            key={card.id}
            card={card}
            index={index}
            count={cards.length}
            opacity={opacity}
            mode={mode}
            rotationProgress={rotationProgress}
            beamHeight={beamHeight}
          />
        ))}

        <pointLight
          color={beamColor}
          intensity={opacity * 0.65}
          distance={2.6}
          position={[0, beamHeight * 0.45, 0]}
        />
      </group>
    </group>
  );
}
