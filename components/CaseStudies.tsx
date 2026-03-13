"use client";

import { motion } from "framer-motion";
import { type Ref } from "react";
import CaseStudy01 from "./CaseStudy01";
import CaseStudy02 from "./CaseStudy02";
import CaseStudy03 from "./CaseStudy03";

export default function CaseStudies({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <section id="work" ref={ref}>
      <div className="max-w-container mx-auto px-6 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
          className="section-label"
        >
          Selected Work
        </motion.p>
      </div>

      <CaseStudy01 />
      <CaseStudy02 />
      <CaseStudy03 />
    </section>
  );
}
