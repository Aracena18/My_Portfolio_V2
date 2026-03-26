"use client";

import Capabilities from "@/components/Capabilities";
import ShowcaseSection from "@/components/showcase/ShowcaseSection";
import NavigationBar from "@/components/NavigationBar";
import OpeningStatement from "@/components/OpeningStatement";
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

        <Thesis />

        <ShowcaseSection />
        <Capabilities />

        <Research />
        <Signal ref={signalRef} />
      </main>
    </>
  );
}
