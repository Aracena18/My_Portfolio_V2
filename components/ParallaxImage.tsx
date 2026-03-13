"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const ease = [0.22, 0.9, 0.3, 1] as const;

interface ParallaxImageProps {
  src?: string;
  alt?: string;
  height?: string;
  speed?: number;
  overlay?: "none" | "light" | "dark";
  placeholderLabel?: string;
  children?: React.ReactNode;
}

export default function ParallaxImage({
  src,
  alt = "Nature photography",
  height = "70vh",
  speed = 0.5,
  overlay = "none",
  placeholderLabel = "Your Nature Photo",
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `-${speed * 100}px`]);

  // Cinematic entrance: fade in + slight scale as section enters viewport
  const containerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const containerScale = useTransform(scrollYProgress, [0, 0.2], [1.03, 1]);

  const overlayClass =
    overlay === "dark"
      ? "bg-gradient-to-b from-surface-dark/60 via-surface-dark/30 to-surface-dark/60"
      : overlay === "light"
        ? "bg-gradient-to-b from-surface/50 via-transparent to-surface/50"
        : "";

  // Stagger children if they exist
  const staggeredChildren = children
    ? React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            {child}
          </motion.div>
        );
      })
    : null;

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: containerOpacity, scale: containerScale, height }}
      className="relative overflow-hidden"
    >
      {/* Parallax image layer — oversized to prevent gaps during translate */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%]"
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-light/80 via-surface-alt to-green-light/40 flex flex-col items-center justify-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-green/20 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-green/30">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <span className="text-sm text-muted/40 font-heading tracking-wider uppercase">
              {placeholderLabel}
            </span>
            <span className="text-[11px] text-muted/25 max-w-sm text-center leading-relaxed px-4">
              Add a high-res nature / agricultural photo here (1920&times;1080+).
              The parallax scroll effect will be visible once you add the image.
            </span>
          </div>
        )}
      </motion.div>

      {/* Overlay gradient */}
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClass}`} />
      )}

      {/* Optional children — staggered entrance */}
      {staggeredChildren && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {staggeredChildren}
        </div>
      )}
    </motion.div>
  );
}
