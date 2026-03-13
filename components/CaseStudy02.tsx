"use client";

import { projects } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function CaseStudy02() {
  const project = projects.find((p) => p.slug === "esp32-leaf-scanner")!;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 lg:px-8">
      <div className="max-w-container mx-auto">
        {/* Cinematic image with overlay */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br from-surface-dark via-green-dark/80 to-surface-dark">
          {/* Abstract pattern suggesting hardware/circuitry */}
          <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.2] opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(27,107,53,0.3) 1px, transparent 1px),
                linear-gradient(rgba(27,107,53,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }} />
          </motion.div>
          <span className="absolute inset-0 flex items-center justify-center text-xs text-white/20 font-heading tracking-wider uppercase">
            Project Screenshot
          </span>

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/30 to-transparent" />

          {/* Bottom-left: project info */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.9, 0.3, 1] }}
            className="absolute bottom-6 left-6 right-6 md:right-auto md:bottom-10 md:left-10"
          >
            <p className="text-label tracking-[0.08em] uppercase text-white/50 mb-2">
              02
            </p>
            <h3 className="font-heading text-h2 md:text-h1 text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-small text-white/60 max-w-md">
              {project.summary}
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center gap-2 mt-4 text-small font-medium text-white hover:text-green-light transition-colors duration-200"
            >
              Read the case study
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>

          {/* Bottom-right: metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
            className="absolute top-6 right-6 md:top-auto md:bottom-10 md:right-10 flex gap-6 md:gap-12"
          >
            <div className="text-right">
              <p className="font-heading text-h2 md:text-h1 font-bold text-white">
                180ms
              </p>
              <p className="text-xs text-white/50 mt-0.5">Inference Time</p>
            </div>
            <div className="text-right">
              <p className="font-heading text-h2 md:text-h1 font-bold text-white">
                $15
              </p>
              <p className="text-xs text-white/50 mt-0.5">Hardware Cost</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
