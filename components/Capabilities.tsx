"use client";

import { motion } from "framer-motion";
import { type Ref } from "react";

const skills = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "LangChain",
  "LLM / RAG",
  "Computer Vision",
  "Edge AI",
  "ESP32",
  "Arduino",
  "Raspberry Pi",
  "C++",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS IoT",
];

export default function Capabilities({ ref }: { ref?: Ref<HTMLElement> }) {
  // Duplicate for seamless infinite scroll
  const doubled = [...skills, ...skills];

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden">
      {/* Marquee ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 0.9, 0.3, 1] }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="marquee-track animate-marquee">
          {doubled.map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="inline-flex items-center gap-4 px-4 font-heading text-h3 md:text-h2 text-muted-light whitespace-nowrap hover:text-green transition-colors duration-300"
            >
              {skill}
              <span className="text-line text-xs">&#9670;</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Narrative paragraph */}
      <div className="max-w-container mx-auto px-6 lg:px-8 mt-16 md:mt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
          className="max-w-xl text-body text-muted leading-relaxed"
        >
          My practice spans the full pipeline: from training neural networks in
          Python and PyTorch, to quantizing models for ESP32 microcontrollers, to
          building the web interfaces that make it all accessible. I work at every
          layer of the stack because real agricultural AI demands it.
        </motion.p>
      </div>
    </section>
  );
}
