"use client";

import { projects } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Counter from "./Counter";

const ease = [0.22, 0.9, 0.3, 1] as const;

export default function CaseStudy01() {
  const project = projects.find((p) => p.slug === "agrisense")!;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
        {/* Image — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:h-[70vh] overflow-hidden rounded-2xl lg:rounded-none lg:rounded-r-3xl mx-6 lg:mx-0"
        >
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 bg-gradient-to-br from-green-light via-surface-alt to-green-light/50"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Abstract pattern suggesting AI/data flow */}
              <div className="relative w-full h-full opacity-30">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-green/20 rounded-full"
                    style={{
                      width: `${120 + i * 80}px`,
                      height: `${120 + i * 80}px`,
                      top: `${30 + i * 4}%`,
                      left: `${20 + i * 6}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
              </div>
              <span className="absolute text-xs text-muted/40 font-heading tracking-wider uppercase">
                Project Screenshot
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Text — slides in from right */}
        <motion.div style={{ y: textY }} className="lg:col-span-5 px-6 lg:pl-16 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <p className="section-label mb-4">01</p>

            <h3 className="font-heading text-h1 text-ink">{project.title}</h3>

            <p className="mt-4 text-body text-muted leading-relaxed">
              {project.summary}
            </p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="my-6 w-16 h-px bg-line origin-left"
            />

            {/* Metrics — staggered with scale */}
            <div className="flex gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease }}
              >
                <Counter target={92} suffix="%" className="font-heading text-h2 font-bold text-green" />
                <p className="text-xs text-muted mt-0.5">Accuracy</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.65, ease }}
              >
                <Counter prefix="<" target={3} suffix="s" className="font-heading text-h2 font-bold text-green" />
                <p className="text-xs text-muted mt-0.5">Response</p>
              </motion.div>
            </div>

            {/* Link */}
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center gap-2 mt-8 text-small font-medium text-ink hover:text-green transition-colors duration-200"
            >
              Read the case study
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
