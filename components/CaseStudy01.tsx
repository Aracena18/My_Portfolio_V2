"use client";

import { projects } from "@/lib/projects";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Counter from "./Counter";
import dynamic from "next/dynamic";

const PhoneScene = dynamic(
  () => import("@/components/three/PhoneScene"),
  { ssr: false }
);

const smooth = { stiffness: 80, damping: 25, restDelta: 0.001 };

export default function CaseStudy01() {
  const project = projects.find((p) => p.slug === "agrisense")!;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), smooth);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [25, -25]), smooth);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
        {/* 3D Phone area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
          className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:h-[70vh] overflow-hidden rounded-2xl lg:rounded-none lg:rounded-r-3xl mx-6 lg:mx-0"
        >
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 bg-gradient-to-br from-[#0a1f0d] via-[#0f2918] to-[#061208]"
          >
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(27,107,53,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(27,107,53,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Radial glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(27,107,53,0.2) 0%, rgba(27,107,53,0.05) 50%, transparent 100%)' }}
              />
            </div>
            {/* 3D Phone Canvas */}
            <div className="absolute inset-0 z-10">
              <PhoneScene />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-green/20 z-20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-green/20 z-20" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div style={{ y: textY }} className="lg:col-span-5 px-6 lg:pl-16 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.9, 0.3, 1] }}
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
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
              className="my-6 w-16 h-px bg-line origin-left"
            />

            {/* Metrics */}
            <div className="flex gap-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 0.9, 0.3, 1] }}
              >
                <Counter target={92} suffix="%" className="font-heading text-h2 font-bold text-green" />
                <p className="text-xs text-muted mt-0.5">Accuracy</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
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
