"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

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
  return (
    <section className="py-32 md:py-40 px-6 lg:px-8">
      <div className="max-w-container mx-auto">
        {/* Thesis statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
          className="font-heading text-h1 md:text-display text-ink max-w-5xl"
        >
          I take AI from the lab to the soil — from model training, through edge
          optimization, to deployment in real agricultural conditions.
        </motion.p>

        {/* Metrics */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
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

              {/* Divider on mobile between metrics */}
              {i < metrics.length - 1 && (
                <div className="mt-8 h-px bg-line md:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
