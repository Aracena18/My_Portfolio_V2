"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ShowcaseProvider } from "@/contexts/ShowcaseContext";
import ShowcaseOrchestrator from "./ShowcaseOrchestrator";

// Dynamic import for 3D canvas (SSR disabled)
const ShowcaseCanvas = dynamic(
  () => import("../three/ShowcaseCanvas"),
  { ssr: false }
);

interface ShowcaseSectionProps {
  className?: string;
}

export default function ShowcaseSection({ className = "" }: ShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isCanvasActive, setIsCanvasActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // IntersectionObserver to detect when section is approaching or visible
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Activate canvas when section is visible or about to be visible
        setIsCanvasActive(entry.isIntersecting);
      },
      {
        // Start preloading slightly before the section enters viewport
        rootMargin: "200px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
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
        {/* Fixed 3D Canvas Background - Only render when section is visible */}
        {isCanvasActive && (
          <div className="fixed inset-0 z-0 pointer-events-none">
            <ShowcaseCanvas />
          </div>
        )}

        {/* Scrollable Content Foreground */}
        <div className="relative z-10">
          <ShowcaseOrchestrator />
        </div>
      </section>
    </ShowcaseProvider>
  );
}
