"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface NatureBannerProps {
  imageSrc?: string;
  alt?: string;
  height?: string;
  overlayText?: string;
  placeholderLabel?: string;
  variant?: "full" | "contained" | "split";
}

export default function NatureBanner({
  imageSrc,
  alt = "Nature photography",
  height = "60vh",
  overlayText,
  placeholderLabel = "Your Nature Photo",
  variant = "full",
}: NatureBannerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  if (variant === "split") {
    return (
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 lg:px-8 max-w-container mx-auto py-8"
      >
        {[0, 1].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl"
            style={{ height: `calc(${height} * 0.7)` }}
          >
            <motion.div style={{ y, opacity }} className="absolute inset-0 scale-[1.3]">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc}
                  alt={`${alt} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-light via-surface-alt to-green-light/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-green/20 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-green/40"
                    >
                      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z" />
                      <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                    </svg>
                  </div>
                  <span className="text-xs text-muted/40 font-heading tracking-wider uppercase">
                    {placeholderLabel} {i + 1}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "contained") {
    return (
      <div className="px-6 lg:px-8 max-w-container mx-auto py-8">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl"
          style={{ height }}
        >
          <motion.div style={{ y, opacity }} className="absolute inset-0 scale-[1.3]">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-light via-surface-alt to-green-light/60 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-green/20 flex items-center justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-green/40"
                  >
                    <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                    <path d="M9 18c6.218 0 10.5 -3.288 11 -12V4h-4.014c-9 0 -11.986 4 -12 9 0 1 0 3 2 5h3z" />
                  </svg>
                </div>
                <span className="text-xs text-muted/40 font-heading tracking-wider uppercase">
                  {placeholderLabel}
                </span>
                <span className="text-[10px] text-muted/25 max-w-xs text-center">
                  Add a nature or field photograph here to reinforce the agricultural theme
                </span>
              </div>
            )}
          </motion.div>

          {overlayText && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface-dark/20">
              <p className="font-heading text-h2 md:text-h1 text-white font-light tracking-wide text-center px-6">
                {overlayText}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full-bleed variant (default)
  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height }}
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 scale-[1.3]">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-light via-surface-alt to-green-light/60 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-green/15 flex items-center justify-center">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="text-green/30"
              >
                <path d="M5 21c.5 -4.5 2.5 -8 7 -10" />
                <path d="M9 18c6.218 0 10.5 -3.288 11 -12V4h-4.014c-9 0 -11.986 4 -12 9 0 1 0 3 2 5h3z" />
              </svg>
            </div>
            <span className="text-sm text-muted/35 font-heading tracking-wider uppercase">
              {placeholderLabel}
            </span>
            <span className="text-[10px] text-muted/20 max-w-sm text-center leading-relaxed">
              Replace with a high-resolution nature or agricultural field photograph.
              Recommended: 1920x1080 or larger, landscape orientation.
            </span>
          </div>
        )}
      </motion.div>

      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-dark/30">
          <p className="font-heading text-display md:text-display-xl text-white font-light tracking-wide text-center px-6">
            {overlayText}
          </p>
        </div>
      )}
    </div>
  );
}
