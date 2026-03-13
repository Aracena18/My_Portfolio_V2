"use client";

import { projects } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import Counter from "./Counter";

const ease = [0.22, 0.9, 0.3, 1] as const;

export default function CaseStudy03() {
  const project = projects.find((p) => p.slug === "arms")!;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const dashboardY = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const metricsY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  const metrics = [
    { target: 150, suffix: "+", label: "Farms Active" },
    { target: 40, suffix: "%", label: "Time Saved" },
    { target: 84, suffix: "%", label: "Prediction Accuracy" },
  ];

  return (
    <section ref={sectionRef} className="overflow-hidden">
      {/* Top half — dark background */}
      <div className="bg-surface-dark text-white py-20 md:py-28 px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: project info — slides in from left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="text-label tracking-[0.08em] uppercase text-muted-light/50 mb-4">
                03
              </p>
              <h3 className="font-heading text-h1 text-white">
                ARMS
              </h3>
              <p className="mt-1 text-body-lg text-white/50 font-heading">
                Agricultural Resource Management System
              </p>
              <p className="mt-4 text-body text-white/60 leading-relaxed max-w-md">
                {project.summary}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-2 mt-6 text-small font-medium text-white hover:text-green-light transition-colors duration-200"
              >
                Read the case study
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </motion.div>

            {/* Right: metrics — slide in from right with stagger */}
            <motion.div style={{ y: metricsY }} className="flex flex-wrap gap-8 md:gap-12 md:justify-end md:pt-8">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.15,
                    ease,
                  }}
                  className="text-center md:text-right"
                >
                  <Counter target={metric.target} suffix={metric.suffix} className="font-heading text-h1 md:text-display font-bold text-green-light" />
                  <p className="text-xs text-white/40 mt-1">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom half — dashboard scales up on entrance */}
      <div className="bg-surface py-16 md:py-20 px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <motion.div
            style={{ y: dashboardY }}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease }}
            className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-br from-surface-alt via-card to-surface-alt border border-line/60"
          >
            {/* Abstract dashboard mockup */}
            <div className="absolute inset-0 p-6 md:p-10">
              <div className="grid grid-cols-3 gap-3 md:gap-4 h-full opacity-40">
                <div className="col-span-2 bg-line/30 rounded-lg" />
                <div className="bg-line/30 rounded-lg" />
                <div className="bg-line/30 rounded-lg" />
                <div className="bg-line/30 rounded-lg" />
                <div className="bg-line/30 rounded-lg" />
              </div>
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-xs text-muted/30 font-heading tracking-wider uppercase">
              Dashboard Screenshot
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="mt-4 text-xs text-muted text-center"
          >
            ARMS dashboard — resource tracking and yield prediction
          </motion.p>
        </div>
      </div>
    </section>
  );
}
