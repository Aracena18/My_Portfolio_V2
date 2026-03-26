"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Counter from "./Counter";
import NatureOverlay from "./NatureOverlay";

const smooth = { stiffness: 80, damping: 25, restDelta: 0.001 };

const metrics: Array<{
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
}> = [
  {
    target: 20,
    suffix: "+",
    label: "Built Projects",
    description: "Across AI systems, web platforms, and experiments",
  },
  {
    target: 4,
    suffix: "+",
    label: "Core Disciplines",
    description: "AI, front-end, full-stack, and product execution",
  },
  {
    target: 100,
    suffix: "%",
    label: "Execution Focus",
    description: "Designing for polished, portfolio-ready delivery",
  },
];

export default function Thesis() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const statementY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), smooth);
  const metricsY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), smooth);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden px-6 py-32 md:py-40 lg:px-8">
      <div className="max-w-container mx-auto">
        {/* Thesis statement */}
        <motion.p
          style={{ y: statementY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
          className="max-w-5xl font-heading text-h1 text-ink md:text-display"
        >
          I work across the full stack of modern product building: strategy,
          interface design, front-end engineering, and AI-powered functionality
          delivered as cohesive user-facing systems.
        </motion.p>

        {/* Metrics */}
        <motion.div
          style={{ y: metricsY }}
          className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.1,
                ease: [0.22, 0.9, 0.3, 1],
              }}
            >
              <Counter
                target={metric.target}
                suffix={metric.suffix}
                prefix={metric.prefix}
                className="block font-heading text-[3.5rem] md:text-[4rem] font-bold text-green leading-none"
              />
              <p className="mt-3 section-label">{metric.label}</p>
              <p className="mt-1.5 text-small text-muted">
                {metric.description}
              </p>

              {i < metrics.length - 1 && (
                <div className="mt-8 h-px bg-line md:hidden" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <NatureOverlay
        src="/images/nature/fern.webp"
        position="right"
        width="400px"
        bleed="-200px"
        parallaxStrength={0.8}
        opacity={0.4}
        rotate={20}
        hideOnMobile
      />
    </section>
  );
}
