"use client";

import dynamic from "next/dynamic";
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
  return (
    <ShowcaseProvider>
      <section
        id="work"
        className={`relative bg-surface-dark ${className}`}
        style={{ minHeight: "500vh" }} // Enough scroll height for all projects
      >
        {/* Fixed 3D Canvas Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ShowcaseCanvas />
        </div>

        {/* Scrollable Content Foreground */}
        <div className="relative z-10">
          <ShowcaseOrchestrator />
        </div>
      </section>
    </ShowcaseProvider>
  );
}
