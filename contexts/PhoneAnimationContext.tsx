"use client";

import {
  createContext,
  useContext,
  useRef,
  ReactNode,
  MutableRefObject,
} from "react";

interface PhoneAnimationState {
  rotationY: number;
  rotationX: number;
  rotationZ: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  opacity: number;
  cameraZ: number;
}

interface PhoneAnimationContextType {
  state: MutableRefObject<PhoneAnimationState>;
  setState: (updates: Partial<PhoneAnimationState>) => void;
  resetState: () => void;
}

const defaultState: PhoneAnimationState = {
  rotationY: 0.3,
  rotationX: 0.1,
  rotationZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  opacity: 1,
  cameraZ: 5,
};

const PhoneAnimationContext = createContext<PhoneAnimationContextType | null>(
  null
);

export function PhoneAnimationProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<PhoneAnimationState>({ ...defaultState });

  return (
    <PhoneAnimationContext.Provider
      value={{
        state: stateRef,
        setState: (updates) => {
          Object.assign(stateRef.current, updates);
        },
        resetState: () => {
          stateRef.current = { ...defaultState };
        },
      }}
    >
      {children}
    </PhoneAnimationContext.Provider>
  );
}

export function usePhoneAnimation() {
  const context = useContext(PhoneAnimationContext);
  if (!context) {
    throw new Error(
      "usePhoneAnimation must be used within PhoneAnimationProvider"
    );
  }
  return context;
}

export function getDefaultPhoneState(): PhoneAnimationState {
  return { ...defaultState };
}
