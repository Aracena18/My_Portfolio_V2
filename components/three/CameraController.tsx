"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useShowcase, type ProjectId } from "@/contexts/ShowcaseContext";
import * as THREE from "three";

// Camera keyframes for each project
interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

// Camera positions for each project phase
const CAMERA_KEYFRAMES: Record<ProjectId, {
  entry: CameraKeyframe;
  active: CameraKeyframe;
  exit: CameraKeyframe;
}> = {
  agrisense: {
    entry: {
      position: [0, 0, 6],
      target: [0, 0, 0],
      fov: 45,
    },
    active: {
      position: [1.5, 0.5, 4],
      target: [0, 0, 0],
      fov: 42,
    },
    exit: {
      position: [2, 0.5, 3.5],
      target: [0, 0, 0],
      fov: 40,
    },
  },
  esp32: {
    entry: {
      position: [-1, 0.5, 4],
      target: [0, 0, 0],
      fov: 45,
    },
    active: {
      position: [0, 0.8, 3.5],
      target: [0, 0, 0],
      fov: 50,
    },
    exit: {
      position: [1.5, 1, 4],
      target: [0, 0, 0],
      fov: 45,
    },
  },
  arms: {
    entry: {
      position: [0, 0, 5],
      target: [0, 0, 0],
      fov: 45,
    },
    active: {
      position: [0, 0.3, 3],
      target: [0, 0, 0],
      fov: 40,
    },
    exit: {
      position: [-1, 0.5, 4],
      target: [0, 0, 0],
      fov: 45,
    },
  },
  realitech: {
    entry: {
      position: [0, 1, 5],
      target: [0, 0, 0],
      fov: 50,
    },
    active: {
      position: [2, 1, 4],
      target: [0, 0, 0],
      fov: 45,
    },
    exit: {
      position: [0, 0, 6],
      target: [0, 0, 0],
      fov: 45,
    },
  },
};

// Smooth interpolation factor
const LERP_FACTOR = 0.08;

// Helper to interpolate between keyframes based on progress
function interpolateKeyframe(
  from: CameraKeyframe,
  to: CameraKeyframe,
  progress: number
): CameraKeyframe {
  const t = Math.max(0, Math.min(1, progress));

  return {
    position: [
      THREE.MathUtils.lerp(from.position[0], to.position[0], t),
      THREE.MathUtils.lerp(from.position[1], to.position[1], t),
      THREE.MathUtils.lerp(from.position[2], to.position[2], t),
    ],
    target: [
      THREE.MathUtils.lerp(from.target[0], to.target[0], t),
      THREE.MathUtils.lerp(from.target[1], to.target[1], t),
      THREE.MathUtils.lerp(from.target[2], to.target[2], t),
    ],
    fov: THREE.MathUtils.lerp(from.fov, to.fov, t),
  };
}

// Get target camera state based on scroll progress within a project
function getTargetCameraState(
  projectId: ProjectId,
  projectProgress: number
): CameraKeyframe {
  const keyframes = CAMERA_KEYFRAMES[projectId];

  // Entry phase: 0-0.2
  if (projectProgress < 0.2) {
    const entryProgress = projectProgress / 0.2;
    return interpolateKeyframe(keyframes.entry, keyframes.active, entryProgress);
  }

  // Active phase: 0.2-0.8
  if (projectProgress < 0.8) {
    return keyframes.active;
  }

  // Exit phase: 0.8-1.0
  const exitProgress = (projectProgress - 0.8) / 0.2;
  return interpolateKeyframe(keyframes.active, keyframes.exit, exitProgress);
}

export default function CameraController() {
  const { camera } = useThree();
  const { state, setCameraState } = useShowcase();

  // Refs for smooth interpolation
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetFov = useRef(45);

  useFrame(() => {
    const currentState = state.current;
    const { activeProject, projectProgress, isTransitioning, transitionProgress, transitionFrom, transitionTo } = currentState;

    let targetCameraState: CameraKeyframe;

    if (isTransitioning && transitionFrom && transitionTo) {
      // During transition, blend between exit of previous and entry of next
      const fromKeyframe = CAMERA_KEYFRAMES[transitionFrom].exit;
      const toKeyframe = CAMERA_KEYFRAMES[transitionTo].entry;
      targetCameraState = interpolateKeyframe(fromKeyframe, toKeyframe, transitionProgress);
    } else {
      // Normal project progression
      targetCameraState = getTargetCameraState(activeProject, projectProgress);
    }

    // Update target refs
    targetPosition.current.set(...targetCameraState.position);
    targetLookAt.current.set(...targetCameraState.target);
    targetFov.current = targetCameraState.fov;

    // Smooth interpolation for camera position
    camera.position.lerp(targetPosition.current, LERP_FACTOR);

    // Smooth interpolation for FOV (only for perspective cameras)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, LERP_FACTOR);
      camera.updateProjectionMatrix();
    }

    // Look at target
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(targetLookAt.current, LERP_FACTOR);
    camera.lookAt(targetLookAt.current);

    // Update context state for other components
    setCameraState({
      positionX: camera.position.x,
      positionY: camera.position.y,
      positionZ: camera.position.z,
      targetX: targetLookAt.current.x,
      targetY: targetLookAt.current.y,
      targetZ: targetLookAt.current.z,
      fov: camera instanceof THREE.PerspectiveCamera ? camera.fov : 45,
    });
  });

  return null;
}
