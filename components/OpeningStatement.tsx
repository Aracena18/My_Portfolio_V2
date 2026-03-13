"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { type Ref, useRef } from "react";
import NatureOverlay from "./NatureOverlay";
import WordReveal from "./WordReveal";

const ease = [0.22, 0.9, 0.3, 1] as const;

export default function OpeningStatement({ ref }: { ref?: Ref<HTMLElement> }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Hero fades + shrinks as user scrolls past
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.97]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-start pb-[12vh] md:pb-[15vh] px-6 lg:px-[8vw] pt-24 overflow-hidden"
    >
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        ref={innerRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
      >
        {/* Text — left side */}
        <motion.div style={{ y: textY }} className="md:col-span-7 order-2 md:order-1">
          {/* Name & title label — slides in from left */}
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="section-label text-muted mb-6"
          >
            Robert Jhon Aracena &mdash; AI Engineer
          </motion.p>

          {/* Main statement */}
          <h1 className="font-heading text-display-xl text-green max-w-4xl">
            <WordReveal text="Building intelligence for the field." delay={0.4} />
          </h1>

          {/* Descriptor — slides in from left */}
          <motion.p
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease }}
            className="mt-8 max-w-lg text-body-lg text-muted leading-relaxed"
          >
            Bridging agriculture and artificial intelligence through research-grade
            systems deployed where they matter.
          </motion.p>

          {/* Availability indicator — slides in from left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.6, ease }}
            className="mt-10 flex items-center gap-2"
          >
            <span className="relative w-2 h-2 rounded-full bg-green">
              <span className="absolute inset-0 rounded-full bg-green animate-ping opacity-75" />
            </span>
            <span className="text-small text-muted">
              Available for AI engineering roles
            </span>
          </motion.div>
        </motion.div>

        {/* Portrait photo — scales up with slight rotation on enter */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.88, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative top-[10px] w-80 md:w-96 lg:w-[440px] aspect-[3/4]">
            {/* Background shape pattern */}
            <div className="absolute inset-0 scale-110">
              <Image
                src="/images/Profile-Background.webp"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            {/* Profile photo on top */}
            <div className="relative w-full h-full">
              <Image
                src="/images/Profile-Pict.webp"
                alt="Robert Jhon Aracena"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Nature overlays */}
      <NatureOverlay
        src="/images/nature/palm.webp"
        position="top-right"
        width="350px"
        bleed="-60px"
        parallaxStrength={0.8}
        opacity={0.8}
      />
      <NatureOverlay
        src="/images/nature/vine.webp"
        position="bottom-left"
        width="240px"
        bleed="-50px"
        parallaxStrength={0.4}
        opacity={0.8}
        flipX
      />

      {/* Scroll line indicator — fades as you scroll */}
      <motion.div
        style={{ opacity: lineOpacity }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 2, ease }}
        className="absolute bottom-0 left-0 right-0 h-px bg-line origin-left"
      />
    </section>
  );
}
