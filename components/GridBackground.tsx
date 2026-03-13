"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface GridBackgroundProps {
  rows?: number;
  cols?: number;
  squareSize?: number;
  gap?: number;
  className?: string;
}

export default function GridBackground({
  rows = 9,
  cols = 9,
  squareSize = 52,
  gap = 6,
  className = "",
}: GridBackgroundProps) {
  const squares = useMemo(() => {
    const items: {
      x: number;
      y: number;
      opacity: number;
      fill: string;
      delay: number;
      glow: boolean;
    }[] = [];

    // Seeded pseudo-random for consistent rendering
    const seed = 42;
    const random = (i: number) => {
      const x = Math.sin(seed + i * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };

    const centerR = (rows - 1) / 2;
    const centerC = (cols - 1) / 2;
    const maxDist = Math.sqrt(centerR * centerR + centerC * centerC);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const dist = Math.sqrt((r - centerR) ** 2 + (c - centerC) ** 2);
        const normalizedDist = dist / maxDist;

        // Closer to center = higher chance of being lit, more opaque
        const rng = random(i);
        const isLit = rng > normalizedDist * 0.7;
        const baseOpacity = isLit
          ? 0.08 + (1 - normalizedDist) * 0.35
          : 0.03 + random(i + 100) * 0.04;

        // Green tint for lit squares near center
        const greenIntensity = random(i + 200);
        let fill: string;
        if (isLit && greenIntensity > 0.4) {
          const brightness = 0.3 + (1 - normalizedDist) * 0.5;
          if (brightness > 0.6) {
            fill = "#1B6B35";
          } else if (brightness > 0.45) {
            fill = "#0F4D23";
          } else {
            fill = "#1a3a25";
          }
        } else {
          fill = "#1a2e20";
        }

        const x = c * (squareSize + gap);
        const y = r * (squareSize + gap);

        items.push({
          x,
          y,
          opacity: baseOpacity,
          fill,
          delay: normalizedDist * 0.4 + random(i + 300) * 0.3,
          glow: isLit && normalizedDist < 0.4 && greenIntensity > 0.65,
        });
      }
    }

    return items;
  }, [rows, cols, squareSize, gap]);

  const totalWidth = cols * (squareSize + gap) - gap;
  const totalHeight = rows * (squareSize + gap) - gap;

  return (
    <div className={`relative ${className}`}>
      <svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <filter id="grid-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {squares.map((sq, i) => (
          <motion.rect
            key={i}
            x={sq.x}
            y={sq.y}
            width={squareSize}
            height={squareSize}
            rx={8}
            ry={8}
            fill={sq.fill}
            initial={{ opacity: 0 }}
            animate={{ opacity: sq.opacity }}
            transition={{
              duration: 0.8,
              delay: sq.delay,
              ease: "easeOut",
            }}
            filter={sq.glow ? "url(#grid-glow)" : undefined}
          />
        ))}
      </svg>
    </div>
  );
}
