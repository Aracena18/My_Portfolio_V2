"use client";

import { motion } from "framer-motion";
import WordReveal from "./WordReveal";

export default function OpeningStatement() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-[12vh] md:pb-[15vh] px-6 lg:px-[8vw] pt-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
        {/* Text — left side */}
        <div className="md:col-span-7 order-2 md:order-1">
          {/* Name & title label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-label text-muted mb-6"
          >
            Robert Jhon Aracena &mdash; AI Engineer
          </motion.p>

          {/* Main statement */}
          <h1 className="font-heading text-display-xl text-green max-w-4xl">
            <WordReveal text="Building intelligence for the field." delay={0.4} />
          </h1>

          {/* Descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 0.9, 0.3, 1] }}
            className="mt-8 max-w-lg text-body-lg text-muted leading-relaxed"
          >
            Bridging agriculture and artificial intelligence through research-grade
            systems deployed where they matter.
          </motion.p>

          {/* Availability indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-10 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green" />
            <span className="text-small text-muted">
              Available for AI engineering roles
            </span>
          </motion.div>
        </div>

        {/* Portrait photo — right side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
          className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-glow bg-gradient-to-br from-green-light to-surface-alt">
            {/* Replace this placeholder with your actual photo */}
            {/* After adding your photo to public/images/robert-portrait.webp, uncomment the Image below and remove the placeholder div */}

            {/* <Image
              src="/images/robert-portrait.webp"
              alt="Robert Jhon Aracena"
              fill
              className="object-cover"
              priority
            /> */}

            {/* Placeholder — remove once you add the real photo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center">
                <span className="font-heading text-h2 font-bold text-green">RJA</span>
              </div>
              <span className="text-xs text-muted/50 font-heading tracking-wider uppercase">
                Your Photo
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll line indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 2, ease: [0.22, 0.9, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-line origin-left"
      />
    </section>
  );
}
