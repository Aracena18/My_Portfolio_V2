"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePhoneAnimation } from "@/contexts/PhoneAnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const agrisenseRef = useRef<HTMLElement>(null);
  const techStackRef = useRef<HTMLElement>(null);
  const { state: animationState } = usePhoneAnimation();

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial state FIRST, before ScrollTrigger setup
    // This prevents the race condition where ScrollTrigger fires before state is initialized
    animationState.current.opacity = 1;
    animationState.current.rotationY = 0.3;
    animationState.current.rotationX = 0.1;
    animationState.current.rotationZ = 0;
    animationState.current.positionX = 0;
    animationState.current.positionY = 0;

    const ctx = gsap.context(() => {
      // Hero Section: Maintain initial state while in hero
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: () => {
          // Keep phone visible and in initial position during hero section
          animationState.current.rotationY = 0.3;
          animationState.current.rotationX = 0.1;
          animationState.current.rotationZ = 0;
          animationState.current.positionX = 0;
          animationState.current.positionY = 0;
          animationState.current.cameraZ = 5;
          animationState.current.opacity = 1;
        },
      });

      // AgriSense Section: Rotate 180° to show back, camera pushes in
      ScrollTrigger.create({
        trigger: agrisenseRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Rotate from front (0.3) to back (Math.PI + 0.3)
          animationState.current.rotationY = 0.3 + progress * Math.PI;
          // Subtle tilt adjustment
          animationState.current.rotationX = 0.1 - progress * 0.15;
          // Push camera closer
          animationState.current.cameraZ = 5 - progress * 1.5;
          // Ensure opacity stays at 1 during this section
          animationState.current.opacity = 1;
          animationState.current.positionX = 0;
        },
      });

      // Tech Stack Section: Float off to the left, fade out
      ScrollTrigger.create({
        trigger: techStackRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Move phone to the left
          animationState.current.positionX = -progress * 5;
          // Slight upward drift
          animationState.current.positionY = progress * 0.5;
          // Fade out
          animationState.current.opacity = 1 - progress;
          // Slight rotation as it exits
          animationState.current.rotationZ = progress * 0.3;
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animationState]);

  return (
    <div ref={containerRef} className="relative z-10">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-[150vh] flex flex-col justify-center items-center px-6 relative"
      >
        <div className="max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6">
            Introducing
          </p>
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-light text-white leading-[0.9] tracking-tight mb-8">
            AgriSense
            <span className="block text-white/30">Pro</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            Precision agriculture meets artificial intelligence.
            Real-time crop diagnostics in your pocket.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-white/30">
            Scroll to explore
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* AgriSense Case Study Section */}
      <section
        ref={agrisenseRef}
        className="min-h-[150vh] flex flex-col justify-center px-6 relative"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="md:order-2">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/70 mb-4">
              Case Study
            </p>
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-light text-white leading-tight mb-6">
              Engineered for
              <span className="block text-emerald-400">the Field</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed mb-8">
              The triple-lens camera system captures multispectral imagery,
              enabling real-time plant health analysis through our edge AI
              pipeline. From leaf chlorophyll levels to early disease detection.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-light text-white">98.7%</p>
                <p className="text-sm text-white/40 mt-1">Detection Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">&lt;50ms</p>
                <p className="text-sm text-white/40 mt-1">Inference Time</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">12+</p>
                <p className="text-sm text-white/40 mt-1">Crop Species</p>
              </div>
            </div>
          </div>
          <div className="md:order-1">
            {/* Spacer for phone 3D model */}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        ref={techStackRef}
        className="min-h-[150vh] flex flex-col justify-center px-6 relative"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-6">
            Under the Hood
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light text-white leading-tight mb-12">
            Built on a Foundation of
            <span className="block text-white/30">Modern Engineering</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Flutter + Dart",
                description:
                  "Cross-platform mobile development with native performance",
                icon: "01",
              },
              {
                title: "TensorFlow Lite",
                description:
                  "On-device machine learning optimized for mobile inference",
                icon: "02",
              },
              {
                title: "Edge Computing",
                description:
                  "Real-time processing without cloud dependency",
                icon: "03",
              },
              {
                title: "Computer Vision",
                description:
                  "Advanced image segmentation and object detection",
                icon: "04",
              },
              {
                title: "IoT Integration",
                description:
                  "Seamless connectivity with ESP32 sensor networks",
                icon: "05",
              },
              {
                title: "Cloud Sync",
                description:
                  "Firebase backend for data persistence and analytics",
                icon: "06",
              },
            ].map((tech) => (
              <div
                key={tech.icon}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-xs text-white/20 font-mono">
                  {tech.icon}
                </span>
                <h3 className="text-lg text-white mt-3 mb-2">{tech.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
