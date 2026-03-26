"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useShowcase, PROJECT_ORDER } from "@/contexts/ShowcaseContext";
import { projects } from "@/lib/projects";
import TextReveal from "../animations/TextReveal";
import Counter from "../Counter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Project content data mapping
const PROJECT_CONTENT: Record<string, {
  tagline: string;
  description: string;
  transitionText: string;
  stats: { label: string; value: string }[];
}> = {
  agrisense: {
    tagline: "AI product design grounded in real-world constraints",
    description: "A retrieval-augmented assistant that combines applied research, inference design, and a user-facing product layer into a clear diagnostic workflow.",
    transitionText: "From software products to edge devices...",
    stats: [
      { label: "Accuracy", value: "92%" },
      { label: "Response", value: "<3s" },
      { label: "Offline", value: "100%" },
    ],
  },
  "esp32-leaf-scanner": {
    tagline: "Computer vision compressed into deployable hardware",
    description: "An edge ML build focused on performance, cost, and legibility. The work covers model optimization, embedded constraints, and a system people can operate in the field.",
    transitionText: "From embedded systems to operational dashboards...",
    stats: [
      { label: "Inference", value: "180ms" },
      { label: "Cost", value: "$15" },
      { label: "Accuracy", value: "89%" },
    ],
  },
  arms: {
    tagline: "Full-stack product thinking with measurable utility",
    description: "A platform build that blends interface architecture, application logic, and decision-support tooling into a system with practical day-to-day value.",
    transitionText: "From systems thinking to shipped experiences...",
    stats: [
      { label: "Farms", value: "150+" },
      { label: "Time Saved", value: "40%" },
      { label: "Prediction", value: "84%" },
    ],
  },
  realitech: {
    tagline: "Connected infrastructure with a product mindset",
    description: "A hardware-software system that shows how sensing, automation, and UX can come together as one coherent service layer.",
    transitionText: "Let’s build the next serious product.",
    stats: [
      { label: "Water Saved", value: "35%" },
      { label: "Uptime", value: "99.2%" },
      { label: "ROI", value: "8mo" },
    ],
  },
};

// Map ProjectId to project slug
const PROJECT_SLUGS: Record<string, string> = {
  agrisense: "agrisense",
  esp32: "esp32-leaf-scanner",
  arms: "arms",
  realitech: "realitech",
};

export default function ShowcaseOrchestrator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setScrollProgress } = useShowcase();

  // Set up master scroll tracking
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Master scroll tracker
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setScrollProgress]);

  return (
    <div ref={containerRef} className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
        <motion.div
          className="max-w-4xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/40">
            Selected Work
          </p>
          <h1 className="mb-8 text-[clamp(2.5rem,8vw,6rem)] font-light leading-[0.95] tracking-tight text-white">
            Projects that connect
            <span className="block text-white/30">design, code, and AI.</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-white/50 md:text-xl">
            A portfolio of systems work spanning intelligent interfaces,
            full-stack applications, embedded experiments, and product-focused
            technical execution.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs uppercase tracking-widest text-white/30">
            Scroll to explore
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Project Sections */}
      {PROJECT_ORDER.map((projectId, index) => {
        const slug = PROJECT_SLUGS[projectId];
        const content = PROJECT_CONTENT[slug];
        const project = projects.find((p) => p.slug === slug);

        if (!content || !project) return null;

        const isLast = index === PROJECT_ORDER.length - 1;

        return (
          <ProjectSection
            key={projectId}
            projectId={projectId}
            index={index}
            title={project.title}
            tagline={content.tagline}
            description={content.description}
            stats={content.stats}
            transitionText={content.transitionText}
            isLast={isLast}
            tags={project.tags}
          />
        );
      })}

      {/* Final CTA Section */}
      <section className="min-h-[50vh] flex flex-col justify-center items-center px-6 relative">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-8 text-2xl font-light text-white/70 md:text-3xl">
            Need someone who can think through both product and implementation?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white transition-all duration-300"
          >
            <span>Let&apos;s talk</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </section>
    </div>
  );
}

// Individual project section component
function ProjectSection({
  projectId,
  index,
  title,
  tagline,
  description,
  stats,
  transitionText,
  isLast,
  tags,
}: {
  projectId: string;
  index: number;
  title: string;
  tagline: string;
  description: string;
  stats: { label: string; value: string }[];
  transitionText: string;
  isLast: boolean;
  tags: string[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-[200vh] flex flex-col justify-start px-6 relative py-32"
      data-project={projectId}
    >
      {/* Main content area */}
      <div className="min-h-screen flex items-center sticky top-0">
        <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full ${isEven ? "" : "md:grid-flow-dense"}`}>
          {/* Text content */}
          <div className={isEven ? "md:order-2" : "md:order-1"}>
            {/* Project number */}
            <p className="text-sm font-mono text-white/20 mb-4">
              {String(index + 1).padStart(2, "0")}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/75 border border-white/15"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-[clamp(2rem,5vw,4rem)] font-light text-white leading-tight mb-4">
              <TextReveal text={title} />
            </h2>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-white/70 mb-6">
              {tagline}
            </p>

            {/* Description */}
            <p className="text-base text-white/50 leading-relaxed mb-8 max-w-lg">
              {description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-light text-white">
                    <Counter
                      value={stat.value}
                      duration={1.5}
                    />
                  </p>
                  <p className="text-sm text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* View project link */}
            <a
              href={`/projects/${PROJECT_SLUGS[projectId]}`}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <span>View Case Study</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          {/* 3D model spacer */}
          <div className={`aspect-square md:aspect-auto md:min-h-[500px] ${isEven ? "md:order-1" : "md:order-2"}`}>
            {/* 3D model renders in the fixed canvas layer */}
          </div>
        </div>
      </div>

      {/* Transition text (not on last project) */}
      {!isLast && (
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-xl md:text-2xl text-white/30 font-light italic text-center max-w-lg">
            {transitionText}
          </p>
        </div>
      )}
    </section>
  );
}
