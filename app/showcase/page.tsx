"use client";

import CinematicShowcase from "@/components/CinematicShowcase";
import { PhoneAnimationProvider } from "@/contexts/PhoneAnimationContext";
import dynamic from "next/dynamic";

const Background3D = dynamic(
  () => import("@/components/three/Background3D"),
  { ssr: false }
);

export default function ShowcasePage() {
  return (
    <PhoneAnimationProvider>
      {/* Dark background layer to cover default body bg */}
      <div className="fixed inset-0 bg-black z-[5]" />
      {/* 3D Phone canvas — fixed fullscreen for the showcase experience */}
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none">
        <Background3D />
      </div>
      <main className="min-h-screen relative z-20">
        <CinematicShowcase />
      </main>
    </PhoneAnimationProvider>
  );
}
