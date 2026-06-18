"use client";

import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { useState } from "react";
import {
  PortfolioSection,
  robertProfile,
} from "@/content/askRobert";
import {
  PortfolioSectionPanel,
} from "@/components/ask-robert/PortfolioPanels";
import BrandLogo from "@/components/BrandLogo";

const navItems: { href: string; label: string; section: PortfolioSection }[] = [
  { href: "/about", label: "About", section: "about" },
  { href: "/projects", label: "Projects", section: "projects" },
  { href: "/skills", label: "Skills", section: "skills" },
  { href: "/resume", label: "Resume", section: "resume" },
  { href: "/timeline", label: "Timeline", section: "timeline" },
  { href: "/recruiter", label: "Recruiter", section: "recruiter" },
  { href: "/contact", label: "Contact", section: "contact" },
];

export default function SectionPage({
  section,
  eyebrow = "Ask Robert",
  intro,
}: {
  section: PortfolioSection;
  eyebrow?: string;
  intro: string;
}) {
  const [isDark, setIsDark] = useState(true);

  return (
    <main className={`${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[var(--bg)] px-4 py-5 text-[var(--text)] sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="mx-auto max-w-6xl">
          {/* Top bar with back button and theme toggle */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--accent)] hover:border-[var(--accent)]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to assistant
            </Link>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-muted)] border border-[var(--border)] transition"
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Header */}
          <header className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-[var(--shadow-soft)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  {eyebrow}
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--text)]">
                  {getSectionTitle(section)}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
                  {intro}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4 lg:max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-[var(--accent-soft)]">
                    <BrandLogo className="size-6 text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{robertProfile.productName}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Chat-first portfolio
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="mt-6 flex flex-wrap gap-2" aria-label="Portfolio sections">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    item.section === section
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text)] border border-[var(--border)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          {/* Content */}
          <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <PortfolioSectionPanel activeSection={section} />
          </section>

          {/* Footer */}
          <footer className="mt-8 pb-8 text-center text-xs text-[var(--text-muted)]">
            Robert Jhon Aracena · Portfolio v2.0 · Built with Next.js
          </footer>
        </div>
      </div>
    </main>
  );
}

function getSectionTitle(section: PortfolioSection) {
  if (section === "about") return robertProfile.name;
  if (section === "projects") return "Project Evidence";
  if (section === "skills") return "Skill Graph";
  if (section === "resume") return "Resume Intelligence";
  if (section === "timeline") return "Timeline";
  if (section === "recruiter") return "Recruiter Mode";
  return "Contact Robert";
}
