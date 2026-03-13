"use client";

import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, FileText, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Back Button */}
      <div className="bg-white border-b border-line/50">
        <div className="max-w-container mx-auto px-6 md:px-8 py-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted hover:text-green transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20 border-b border-line/50">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-5 max-w-3xl"
          >
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-green-light text-green text-sm font-medium rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-display font-heading font-bold text-ink">
              {project.title}
            </h1>
            <p className="text-lg md:text-body-lg text-muted">{project.problem}</p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image Placeholder */}
      <div className="bg-gradient-to-br from-green-light to-accent-light py-16 md:py-20">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="aspect-video bg-white/60 rounded-2xl border border-line/60 flex items-center justify-center shadow-card">
            <span className="text-muted text-sm">Project Hero Image</span>
          </div>
        </div>
      </div>

      {/* Context & Role */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Role", value: project.context.role },
              { label: "Team Size", value: project.context.teamSize },
              { label: "Duration", value: project.context.duration },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
                  {item.label}
                </h3>
                <p className="text-ink font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-h3 font-heading font-bold text-ink mb-6">
            The Problem
          </h2>
          <ul className="space-y-3">
            {project.problemDetails.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-light rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green rounded-full" />
                </div>
                <p className="text-ink-secondary leading-relaxed">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-h3 font-heading font-bold text-ink mb-6">
            The Solution
          </h2>
          <p className="text-ink-secondary leading-relaxed text-body-lg max-w-3xl">
            {project.solution}
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-h3 font-heading font-bold text-ink mb-8">
            Technical Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-4 bg-white rounded-xl border border-line/50 hover:border-green/30 transition-colors"
              >
                <div className="w-10 h-10 bg-green-light rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-green text-lg font-heading font-bold">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-ink text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-h3 font-heading font-bold text-ink mb-6">
            Architecture
          </h2>
          <div className="aspect-video bg-gradient-to-br from-green-light/50 to-accent-light/50 rounded-2xl border border-line/60 flex items-center justify-center mb-4 shadow-inner">
            <span className="text-muted text-sm">Architecture Diagram</span>
          </div>
          <p className="text-muted text-sm">{project.architecture.description}</p>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-h3 font-heading font-bold text-ink mb-8">
            Quantified Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-line/50"
              >
                <div className="text-3xl font-heading font-bold text-green mb-1">
                  {outcome.value}
                </div>
                <div className="text-sm font-semibold text-ink mb-1">{outcome.metric}</div>
                <div className="text-xs text-muted">{outcome.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-h3 font-heading font-bold text-ink mb-8">
            Development Process
          </h2>
          <div className="space-y-1">
            {project.process.map((phase, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green text-white rounded-full flex items-center justify-center font-heading font-bold text-sm shrink-0">
                    {phase.step}
                  </div>
                  {idx < project.process.length - 1 && (
                    <div className="w-px flex-1 bg-line my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-base font-heading font-semibold text-ink mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-muted text-sm">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links & CTA */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl border border-line/50 shadow-card">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-heading font-semibold text-ink mb-2">
                  Interested in this project?
                </h3>
                <p className="text-muted">
                  Let&apos;s discuss how I can bring similar solutions to your team.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-ink text-white rounded-xl hover:bg-ink/90 transition-colors text-sm font-medium"
                  >
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.links.paper && (
                  <a
                    href={project.links.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-muted text-white rounded-xl hover:bg-muted/90 transition-colors text-sm font-medium"
                  >
                    <FileText size={16} />
                    <span>Paper</span>
                  </a>
                )}
                <Link
                  href="/#contact"
                  className="flex items-center gap-2 px-4 py-2.5 bg-green text-white rounded-xl hover:bg-green-dark transition-colors text-sm font-medium"
                >
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
