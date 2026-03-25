"use client";

import {
  createContext,
  useContext,
  useRef,
  useMemo,
  type ReactNode,
  type MutableRefObject,
} from "react";

// Project identifiers
export type ProjectId = "agrisense" | "esp32" | "arms" | "realitech";

// Project order for iteration
export const PROJECT_ORDER: ProjectId[] = ["agrisense", "esp32", "arms", "realitech"];

// Lighting presets
export type LightingPreset = "ambient" | "studio" | "dramatic" | "warm" | "cool";

// Scroll ranges for each project (percentage of total scroll)
export const PROJECT_RANGES: Record<ProjectId, { start: number; end: number }> = {
  agrisense: { start: 0, end: 0.25 },
  esp32: { start: 0.25, end: 0.5 },
  arms: { start: 0.5, end: 0.75 },
  realitech: { start: 0.75, end: 1.0 },
};

// Lighting preset per project
export const PROJECT_LIGHTING: Record<ProjectId, LightingPreset> = {
  agrisense: "ambient",
  esp32: "cool",
  arms: "studio",
  realitech: "warm",
};

// Transition zones between projects
export const TRANSITION_ZONES = {
  agrisenseToEsp32: { start: 0.2, end: 0.3 },
  esp32ToArms: { start: 0.45, end: 0.55 },
  armsToRealitech: { start: 0.7, end: 0.8 },
};

// Camera state
export interface CameraState {
  positionX: number;
  positionY: number;
  positionZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  fov: number;
}

// Individual model state
export interface ModelState {
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  opacity: number;
  visible: boolean;
}

// Master showcase state (mutable refs for performance)
export interface ShowcaseState {
  // Scroll tracking
  scrollProgress: number;
  activeProject: ProjectId;
  projectProgress: number; // 0-1 within current project

  // Transition state
  isTransitioning: boolean;
  transitionProgress: number; // 0-1 during transition
  transitionFrom: ProjectId | null;
  transitionTo: ProjectId | null;

  // Camera
  camera: CameraState;

  // Model states (one per project)
  models: Record<ProjectId, ModelState>;

  // Lighting
  lightingPreset: LightingPreset;
  lightingIntensity: number;

  // Effects
  particlesEnabled: boolean;
  bloomIntensity: number;

  // Loading state
  hasLoaded: boolean;
}

// Default camera state
const defaultCamera: CameraState = {
  positionX: 0,
  positionY: 0,
  positionZ: 5,
  targetX: 0,
  targetY: 0,
  targetZ: 0,
  fov: 45,
};

// Default model state
const defaultModel: ModelState = {
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  scale: 1,
  opacity: 0,
  visible: false,
};

// Initial showcase state
const createInitialState = (): ShowcaseState => ({
  scrollProgress: 0,
  activeProject: "agrisense",
  projectProgress: 0,

  isTransitioning: false,
  transitionProgress: 0,
  transitionFrom: null,
  transitionTo: null,

  camera: { ...defaultCamera },

  models: {
    agrisense: { ...defaultModel, opacity: 1, visible: true },
    esp32: { ...defaultModel },
    arms: { ...defaultModel },
    realitech: { ...defaultModel },
  },

  lightingPreset: "studio",
  lightingIntensity: 1,

  particlesEnabled: true,
  bloomIntensity: 0.5,

  hasLoaded: false,
});

// Context type
interface ShowcaseContextType {
  state: MutableRefObject<ShowcaseState>;

  // Helper functions
  getActiveProject: () => ProjectId;
  getProjectProgress: (projectId?: ProjectId) => number;
  isTransitioning: () => boolean;
  getTransitionProgress: () => number;

  // State updaters (for GSAP callbacks)
  setScrollProgress: (progress: number) => void;
  setModelState: (projectId: ProjectId, updates: Partial<ModelState>) => void;
  setCameraState: (updates: Partial<CameraState>) => void;
  setLightingPreset: (preset: LightingPreset) => void;
  setLoaded: (loaded: boolean) => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | null>(null);

// Determine active project from scroll progress
function getActiveProjectFromScroll(scrollProgress: number): ProjectId {
  if (scrollProgress < PROJECT_RANGES.agrisense.end) return "agrisense";
  if (scrollProgress < PROJECT_RANGES.esp32.end) return "esp32";
  if (scrollProgress < PROJECT_RANGES.arms.end) return "arms";
  return "realitech";
}

// Calculate progress within a specific project
function calculateProjectProgress(scrollProgress: number, projectId: ProjectId): number {
  if (!Number.isFinite(scrollProgress)) return 0;

  const range = PROJECT_RANGES[projectId];
  const rangeSize = range.end - range.start;

  if (scrollProgress < range.start) return 0;
  if (scrollProgress > range.end) return 1;

  return (scrollProgress - range.start) / rangeSize;
}

// Check if currently in a transition zone
function checkTransitionZone(scrollProgress: number): {
  isTransitioning: boolean;
  from: ProjectId | null;
  to: ProjectId | null;
  progress: number;
} {
  if (!Number.isFinite(scrollProgress)) {
    return { isTransitioning: false, from: null, to: null, progress: 0 };
  }

  for (const [key, zone] of Object.entries(TRANSITION_ZONES)) {
    if (scrollProgress >= zone.start && scrollProgress <= zone.end) {
      const progress = (scrollProgress - zone.start) / (zone.end - zone.start);

      if (key === "agrisenseToEsp32") {
        return { isTransitioning: true, from: "agrisense", to: "esp32", progress };
      }
      if (key === "esp32ToArms") {
        return { isTransitioning: true, from: "esp32", to: "arms", progress };
      }
      if (key === "armsToRealitech") {
        return { isTransitioning: true, from: "arms", to: "realitech", progress };
      }
    }
  }

  return { isTransitioning: false, from: null, to: null, progress: 0 };
}

// Provider component
export function ShowcaseProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<ShowcaseState>(createInitialState());

  const contextValue = useMemo<ShowcaseContextType>(() => ({
    state: stateRef,

    getActiveProject: () => stateRef.current.activeProject,

    getProjectProgress: (projectId?: ProjectId) => {
      const id = projectId ?? stateRef.current.activeProject;
      return calculateProjectProgress(stateRef.current.scrollProgress, id);
    },

    isTransitioning: () => stateRef.current.isTransitioning,

    getTransitionProgress: () => stateRef.current.transitionProgress,

    setScrollProgress: (progress: number) => {
      const normalizedProgress = Number.isFinite(progress)
        ? Math.max(0, Math.min(1, progress))
        : 0;
      const state = stateRef.current;

      state.scrollProgress = normalizedProgress;
      state.activeProject = getActiveProjectFromScroll(normalizedProgress);
      state.projectProgress = calculateProjectProgress(
        normalizedProgress,
        state.activeProject
      );

      // Check transition zones
      const transition = checkTransitionZone(normalizedProgress);
      state.isTransitioning = transition.isTransitioning;
      state.transitionProgress = transition.progress;
      state.transitionFrom = transition.from;
      state.transitionTo = transition.to;
    },

    setModelState: (projectId: ProjectId, updates: Partial<ModelState>) => {
      const model = stateRef.current.models[projectId];
      Object.assign(model, updates);
    },

    setCameraState: (updates: Partial<CameraState>) => {
      Object.assign(stateRef.current.camera, updates);
    },

    setLightingPreset: (preset: LightingPreset) => {
      stateRef.current.lightingPreset = preset;
    },

    setLoaded: (loaded: boolean) => {
      stateRef.current.hasLoaded = loaded;
    },
  }), []);

  return (
    <ShowcaseContext.Provider value={contextValue}>
      {children}
    </ShowcaseContext.Provider>
  );
}

// Hook to use showcase context
export function useShowcase() {
  const context = useContext(ShowcaseContext);

  if (!context) {
    throw new Error("useShowcase must be used within a ShowcaseProvider");
  }

  return context;
}

// Hook to get current state (for components that need reactive updates)
export function useShowcaseState() {
  const { state } = useShowcase();
  return state.current;
}

// Export defaults for reuse
export { defaultCamera, defaultModel, createInitialState };
