"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import NatureOverlay from "./NatureOverlay";

interface Publication {
  title: string;
  venue: string;
  year: string;
  pdfUrl?: string;
  url?: string;
}

const publications: Publication[] = [
  {
    title:
      "AgriSense: Retrieval-Augmented LLM System for Tomato Disease Diagnosis",
    venue: "International Conference on Agricultural AI",
    year: "2025",
    pdfUrl: "/papers/agrisense-paper.pdf",
  },
  {
    title:
      "Edge-Optimized Deep Learning for Real-Time Leaf Disease Detection on ESP32",
    venue: "IEEE IoT Journal",
    year: "2024",
    pdfUrl: "/papers/esp32-paper.pdf",
    url: "https://doi.org/example",
  },
  {
    title: "Precision Irrigation Using IoT Sensors and Machine Learning",
    venue: "Smart Agriculture Workshop",
    year: "2024",
  },
];

function PublicationEntry({ pub, index }: { pub: Publication; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 0.9, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-6 border-b border-line/60 last:border-b-0"
    >
      <h4 className="font-heading text-h3 text-ink">{pub.title}</h4>
      <p className="mt-1.5 text-small text-muted">
        {pub.venue}, {pub.year}
      </p>

      {/* Action links on hover */}
      <AnimatePresence>
        {isHovered && (pub.pdfUrl || pub.url) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 0.9, 0.3, 1] }}
            className="flex gap-4 mt-3 overflow-hidden"
          >
            {pub.pdfUrl && (
              <a
                href={pub.pdfUrl}
                download
                className="text-xs text-green hover:text-green-dark transition-colors duration-200 underline underline-offset-2"
              >
                PDF
              </a>
            )}
            {pub.url && (
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green hover:text-green-dark transition-colors duration-200 underline underline-offset-2"
              >
                View
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Research() {
  return (
    <section id="research" className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      {/* Fern frond on the left edge */}
      <NatureOverlay
        src="/images/nature/fern.webp"
        position="left"
        width="500px"
        bleed="-250px"
        parallaxStrength={0.7}
        opacity={0.8}
        flipX
        rotate={-15}
        hideOnMobile
      />
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Rotated label */}
        <div className="md:col-span-2 flex md:justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label md:[writing-mode:vertical-rl] md:[transform:rotate(180deg)]"
          >
            Research
          </motion.p>
        </div>

        {/* Publication entries */}
        <div className="md:col-span-10">
          {publications.map((pub, i) => (
            <PublicationEntry key={pub.title} pub={pub} index={i} />
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-xs text-muted/50 italic"
          >
            * Placeholder publications — replace with your actual research papers
          </motion.p>
        </div>
      </div>
    </section>
  );
}
