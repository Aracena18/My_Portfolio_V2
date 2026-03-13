"use client";

import { motion } from "framer-motion";
import { type Ref } from "react";
import CaseStudy01 from "./CaseStudy01";
import CaseStudy02 from "./CaseStudy02";
import CaseStudy03 from "./CaseStudy03";

const ease = [0.22, 0.9, 0.3, 1] as const;

export default function CaseStudies({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <section id="work" ref={ref}>
      <div className="max-w-container mx-auto px-6 lg:px-8 mb-8 flex items-center gap-6">
        {/* Label slides in from left */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="section-label"
        >
          Selected Work
        </motion.p>

        {/* Decorative line draws alongside the label */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="flex-1 h-px bg-line origin-left"
        />
      </div>

      <CaseStudy01 />
      <CaseStudy02 />
      <CaseStudy03 />
    </section>
  );
}
