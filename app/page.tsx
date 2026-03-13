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

        {/* Parallax nature photo — landscape / agricultural field */}
        <ParallaxImage
          height="70vh"
          speed={0.5}
          placeholderLabel="Agricultural Landscape Photo"
          overlay="light"
        />

        <Thesis />

        {/* Parallax nature photo — close-up crops / leaves / fieldwork */}
        <ParallaxImage
          height="60vh"
          speed={0.6}
          placeholderLabel="Crop Close-up / Fieldwork Photo"
          overlay="none"
        />

        <CaseStudies />
        <Capabilities />

        {/* Parallax nature photo — deployment / technology in the field */}
        <ParallaxImage
          height="50vh"
          speed={0.4}
          placeholderLabel="Field Deployment Photo"
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
