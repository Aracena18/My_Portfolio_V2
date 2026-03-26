"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ShowcaseProvider } from "@/contexts/ShowcaseContext";
import ShowcaseOrchestrator from "./ShowcaseOrchestrator";
import { CanvasErrorBoundary } from "../three/CanvasErrorBoundary";

// Dynamic import for 3D canvas (SSR disabled)
const ShowcaseCanvas = dynamic(
  () => import("../three/ShowcaseCanvas").then(mod => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/20">Initializing 3D Scene...</div>
      </div>
    ),
  }
);

interface ShowcaseSectionProps {
  className?: string;
}

export default function ShowcaseSection({ className = "" }: ShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const deactivateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCanvasActive, setIsCanvasActive] = useState(false);
  const [canvasOpacity, setCanvasOpacity] = useState(0);

  useEffect(() => {
    const updateCanvasState = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const fadeDistance = viewportHeight * 0.18;
      const isNearViewport = rect.top < viewportHeight + fadeDistance && rect.bottom > -fadeDistance;

      if (!isNearViewport) {
        setCanvasOpacity(0);
        if (deactivateTimerRef.current) {
          clearTimeout(deactivateTimerRef.current);
        }
        deactivateTimerRef.current = setTimeout(() => {
          setIsCanvasActive(false);
        }, 320);
        return;
      }

      if (deactivateTimerRef.current) {
        clearTimeout(deactivateTimerRef.current);
        deactivateTimerRef.current = null;
      }

      setIsCanvasActive(true);

      const enterProgress = THREE.MathUtils.clamp(
        (viewportHeight - rect.top) / fadeDistance,
        0,
        1
      );
      const exitProgress = THREE.MathUtils.clamp(rect.bottom / fadeDistance, 0, 1);
      setCanvasOpacity(Math.min(enterProgress, exitProgress));
    };

    updateCanvasState();
    window.addEventListener("scroll", updateCanvasState, { passive: true });
    window.addEventListener("resize", updateCanvasState);

    return () => {
      if (deactivateTimerRef.current) {
        clearTimeout(deactivateTimerRef.current);
      }
      window.removeEventListener("scroll", updateCanvasState);
      window.removeEventListener("resize", updateCanvasState);
    };
  }, []);

  return (
    <ShowcaseProvider>
      <section
        ref={sectionRef}
        id="work"
        className={`relative bg-surface-dark ${className}`}
        style={{ minHeight: "500vh" }} // Enough scroll height for all projects
      >
        {/* Fixed 3D Canvas Background - Only render when section is visible and client-side mounted */}
        {isCanvasActive && (
          <CanvasErrorBoundary>
            <div
              className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
              style={{ opacity: canvasOpacity }}
            >
              <ShowcaseCanvas sceneOpacity={canvasOpacity} />
            </div>
          </CanvasErrorBoundary>
        )}

        {/* Scrollable Content Foreground */}
        <div className="relative z-10">
          <ShowcaseOrchestrator />
        </div>
      </section>
    </ShowcaseProvider>
  );
}
