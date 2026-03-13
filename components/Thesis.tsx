"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Counter from "./Counter";
import NatureOverlay from "./NatureOverlay";

const metrics = [
  {
    target: 92,
    suffix: "%",
    label: "Diagnostic Accuracy",
    description: "Field-validated with real farmers",
  },
  {
    target: 3,
    prefix: "<",
    suffix: "s",
    label: "Edge Inference",
    description: "On $15 hardware, no internet needed",
  },
  {
    target: 150,
    suffix: "+",
    label: "Farms Served",
    description: "Across multiple pilot deployments",
  },
];

export default function Thesis() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Statement moves slower (far), metrics move faster (near) — visible depth split
  const statementY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const metricsY = useTransform(scrollYProgress, [0, 1], ["120px", "-120px"]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-container mx-auto">
        {/* Thesis statement — moves at one speed */}
        <motion.p
          style={{ y: statementY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
          className="font-heading text-h1 md:text-display text-ink max-w-5xl"
        >
          I take AI from the lab to the soil — from model training, through edge
          optimization, to deployment in real agricultural conditions.
        </motion.p>

        {/* Metrics — moves at a different speed (creates visible separation) */}
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
                duration: 0.5,
                delay: i * 0.1,
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

      {/* Fern frond peeking in from the right edge */}
      <NatureOverlay
        src="/images/nature/fern.webp"
        position="right"
        width="400px"
        bleed="-200px"
        parallaxStrength={0.8}
        opacity={0.9}
        rotate={20}
        hideOnMobile
      />
    </section>
  );
}
