"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerCallbackRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP ticker for perfect sync
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    tickerCallbackRef.current = tickerCallback;
    gsap.ticker.add(tickerCallback);

    // Disable GSAP's default lag smoothing for Lenis compatibility
    gsap.ticker.lagSmoothing(0);

    return () => {
      const currentTickerCallback = tickerCallbackRef.current;
      if (currentTickerCallback) {
        gsap.ticker.remove(currentTickerCallback);
      }
      tickerCallbackRef.current = null;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
