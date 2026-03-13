"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import WordReveal from "./WordReveal";

const contactLinks = [
  {
    label: "robert@aracena.dev",
    href: "mailto:robert@aracena.dev?subject=Reaching%20out%20from%20your%20portfolio",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/robertaracena",
  },
  {
    label: "GitHub",
    href: "https://github.com/robertaracena",
  },
];

export default function Signal() {
  return (
    <section
      id="contact"
      className="relative bg-surface-dark text-white"
    >
      <div className="max-w-container mx-auto px-6 lg:px-8 py-32 md:py-44">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-label tracking-[0.08em] uppercase text-muted-light mb-8"
        >
          Contact
        </motion.p>

        {/* Closing statement */}
        <h2 className="font-heading text-display-xl max-w-3xl">
          <WordReveal text="Let's build something that grows." />
        </h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 max-w-lg text-body-lg text-muted-light/80 leading-relaxed"
        >
          I&apos;m open to AI engineering roles, research collaborations, and
          consulting in agricultural technology. Reach out directly.
        </motion.p>

        {/* Contact links */}
        <div className="mt-16 flex flex-col md:flex-row gap-6 md:gap-12">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.8 + i * 0.1,
                ease: [0.22, 0.9, 0.3, 1],
              }}
              className="group inline-flex items-center gap-2 text-body-lg text-white hover:text-green-light transition-colors duration-200"
            >
              {link.label}
              <ArrowUpRight
                size={16}
                className="opacity-0 -translate-y-0.5 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200"
              />
            </motion.a>
          ))}
        </div>

        {/* Resume download */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10"
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 text-small text-muted-light hover:text-white transition-colors duration-200"
          >
            Download Resume (PDF)
            <span className="text-xs">&darr;</span>
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-32 md:mt-44 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-muted-light/50">
            &copy; {new Date().getFullYear()} Robert Jhon Aracena
          </p>
          <p className="text-xs text-muted-light/50">
            Built with Next.js
          </p>
        </div>
      </div>
    </section>
  );
}
