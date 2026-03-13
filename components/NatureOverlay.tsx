"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface NatureOverlayProps {
  /** Path to the nature image (e.g. "/images/nature/palm.webp") */
  src?: string;
  alt?: string;
  /** Which edge the overlay attaches to */
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "left" | "right";
  /** Width of the overlay image */
  width?: string;
  /** How far it extends beyond the section boundary (negative margin) */
  bleed?: string;
  /** Parallax intensity: 0 = static, 1 = strong */
  parallaxStrength?: number;
  /** Flip horizontally */
  flipX?: boolean;
  /** Flip vertically */
  flipY?: boolean;
  /** Rotation in degrees */
  rotate?: number;
  /** Opacity of the overlay (0-1) */
  opacity?: number;
  /** Set true when overlay is on a dark background — inverts blend mode */
  onDark?: boolean;
}

export default function NatureOverlay({
  src,
  alt = "Nature overlay",
  position,
  width = "250px",
  bleed = "-60px",
  parallaxStrength = 0.5,
  flipX = false,
  flipY = false,
  rotate = 0,
  opacity = 0.7,
  onDark = false,
}: NatureOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = parallaxStrength * 80;
  const y = useTransform(scrollYProgress, [0, 1], [`${travel}px`, `-${travel}px`]);

  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": { top: bleed, left: bleed },
    "top-right": { top: bleed, right: bleed },
    "bottom-left": { bottom: bleed, left: bleed },
    "bottom-right": { bottom: bleed, right: bleed },
    left: { top: "50%", left: bleed, transform: "translateY(-50%)" },
    right: { top: "50%", right: bleed, transform: "translateY(-50%)" },
  };

  const transformParts = [
    flipX ? "scaleX(-1)" : "",
    flipY ? "scaleY(-1)" : "",
    rotate ? `rotate(${rotate}deg)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  // multiply makes white bg vanish on light surfaces
  // screen makes white bg vanish on dark surfaces
  const blendMode = onDark ? "screen" : "multiply";

  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none select-none z-10 hidden md:block"
      style={{
        ...positionStyles[position],
        width,
      }}
      aria-hidden="true"
    >
      <motion.div style={{ y }}>
        <div
          style={{
            transform: transformParts || undefined,
            opacity,
            mixBlendMode: blendMode,
          }}
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="w-full h-auto"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full aspect-[3/4] rounded-xl border-2 border-dashed border-green/15 bg-green-light/30 flex flex-col items-center justify-center gap-2 backdrop-blur-[1px]"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-green/25"
              >
                <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                <path d="M9 18c6.218 0 10.5 -3.288 11 -12V4h-4.014c-9 0 -11.986 4 -12 9 0 1 0 3 2 5h3z" />
              </svg>
              <span className="text-[9px] text-green/25 font-heading tracking-wider uppercase text-center leading-tight px-2">
                Nature<br />overlay
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
