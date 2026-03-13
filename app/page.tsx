"use client";

import Capabilities from "@/components/Capabilities";
import CaseStudies from "@/components/CaseStudies";
import NavigationBar from "@/components/NavigationBar";
import OpeningStatement from "@/components/OpeningStatement";
import ParallaxImage from "@/components/ParallaxImage";
import Research from "@/components/Research";
import Signal from "@/components/Signal";
import Thesis from "@/components/Thesis";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const signalRef = useRef<HTMLElement>(null);

  return (
    <>
      <NavigationBar />
      <main className="relative">
        <OpeningStatement ref={heroRef} />

        {/* Parallax nature photo — agricultural field / crop close-up */}
        <ParallaxImage
          src="/images/tomatoe_leaf.webp"
          alt="Close-up of a tomato leaf — crop health diagnostics"
          height="70vh"
          speed={0.5}
          overlay="dark"
        >
          <div className="text-center max-w-2xl px-6">
            <p className="section-label text-white/50 mb-5">The Vision</p>
            <p className="font-heading text-h2 md:text-h1 text-white font-light tracking-wide leading-tight">
              Seeing what the eye cannot
            </p>
            <p className="mt-4 text-white/70 text-body md:text-body-lg max-w-lg mx-auto leading-relaxed">
              Computer vision and edge AI, bringing precision
              diagnostics to every field.
            </p>
          </div>
        </ParallaxImage>

        <Thesis />

        {/* Parallax photo — professional workspace / lab setup */}
        <ParallaxImage
          src="/images/Professional_Setup.webp"
          alt="Professional workspace setup for AI development"
          height="60vh"
          speed={0.6}
          overlay="dark"
        >
          <div className="text-center max-w-2xl px-6">
            <p className="section-label text-white/50 mb-5">The Process</p>
            <p className="font-heading text-h2 md:text-h1 text-white font-light tracking-wide leading-tight">
              From prototype to production
            </p>
          </div>
        </ParallaxImage>

        <CaseStudies />
        <Capabilities />

        {/* Parallax photo — wide agricultural field */}
        <ParallaxImage
          src="/images/Wide_Agriculture_image.webp"
          alt="Wide view of an agricultural greenhouse with young crops"
          height="50vh"
          speed={0.4}
          overlay="dark"
        >
          <p className="font-heading text-h2 md:text-h1 text-white font-light tracking-wide text-center px-6 drop-shadow-lg">
            Where AI meets agriculture
          </p>
        </ParallaxImage>

        <Research />
        <Signal ref={signalRef} />
      </main>
    </>
  );
}
