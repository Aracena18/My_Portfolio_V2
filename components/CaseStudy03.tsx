"use client";

import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaseStudy03() {
  const project = projects.find((p) => p.slug === "arms")!;

  const metrics = [
    { value: "150+", label: "Farms Active" },
    { value: "40%", label: "Time Saved" },
    { value: "84%", label: "Prediction Accuracy" },
  ];

  return (
    <section className="overflow-hidden">
      {/* Top half — dark background */}
      <div className="bg-surface-dark text-white py-20 md:py-28 px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: project info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
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

            {/* Right: metrics */}
            <div className="flex flex-wrap gap-8 md:gap-12 md:justify-end md:pt-8">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 0.9, 0.3, 1],
                  }}
                  className="text-center md:text-right"
                >
                  <p className="font-heading text-h1 md:text-display font-bold text-green-light">
                    {metric.value}
                  </p>
                  <p className="text-xs text-white/40 mt-1">{metric.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom half — light background with dashboard placeholder */}
      <div className="bg-surface py-16 md:py-20 px-6 lg:px-8">
        <div className="max-w-container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.9, 0.3, 1] }}
            className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-br from-surface-alt via-card to-surface-alt border border-line/60"
          >
            {/* Abstract dashboard mockup */}
            <div className="absolute inset-0 p-6 md:p-10">
              {/* Simulated dashboard grid */}
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
          <p className="mt-4 text-xs text-muted text-center">
            ARMS dashboard — resource tracking and yield prediction
          </p>
        </div>
      </div>
    </section>
  );
}
