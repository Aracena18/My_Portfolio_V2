"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

interface PreloaderProps {
  onComplete?: () => void;
  minimumDuration?: number;
}

export default function Preloader({
  onComplete,
  minimumDuration = 2200,
}: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"intro" | "active" | "outro">("intro");

  const completeLoading = useCallback(() => {
    setPhase("outro");
    setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 520);
  }, [onComplete]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = prev < 55 ? 4 : prev < 82 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 42);

    const phaseTimer = setTimeout(() => setPhase("active"), 280);
    const completeTimer = setTimeout(() => completeLoading(), minimumDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimer);
      clearTimeout(completeTimer);
    };
  }, [minimumDuration, completeLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-[#203129]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 0.9, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,241,234,0.06),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(244,241,234,0.04),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(244,241,234,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,234,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />

          <div className="relative flex min-h-screen items-center justify-center px-5 py-10">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 1.02 }}
              transition={{ duration: 0.55, ease: [0.22, 0.9, 0.3, 1] }}
              className="relative w-full max-w-[860px] rounded-[2.4rem] border border-[#f4f1ea]/12 bg-[rgba(244,241,234,0.08)] p-4 shadow-[0_30px_90px_rgba(10,16,12,0.28)] backdrop-blur-xl"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-[#f4f1ea] p-[14px]">
                <div className="relative min-h-[520px] overflow-hidden rounded-[1.7rem] bg-[#2c3e35] px-6 py-6 sm:px-8 sm:py-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(244,241,234,0.08),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="rounded-full bg-[#f4f1ea] px-5 py-3 text-[#152019] shadow-[0_10px_24px_rgba(21,32,25,0.12)]">
                      <BrandLogo className="h-8 w-auto" />
                    </div>

                    <div className="rounded-full bg-[#f4f1ea] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-[#152019] sm:px-5">
                      Robert Jhon Aracena
                    </div>
                  </div>

                  <div className="relative mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_280px]">
                    <div className="min-w-0">
                      <motion.p
                        animate={{ opacity: phase === "outro" ? 0 : 1, y: phase === "outro" ? -8 : 0 }}
                        className="font-hero text-[11px] uppercase tracking-[0.32em] text-[#d2dad0]"
                      >
                        Preparing Portfolio Interface
                      </motion.p>

                      <motion.h2
                        animate={{ opacity: phase === "outro" ? 0 : 1, y: phase === "outro" ? -12 : 0 }}
                        className="hero-display mt-4 max-w-[9ch] text-[clamp(2.7rem,7vw,5.4rem)] leading-[0.9] text-[#f4f1ea]"
                      >
                        Loading intelligent systems.
                      </motion.h2>

                      <motion.p
                        animate={{ opacity: phase === "outro" ? 0 : 1 }}
                        className="mt-5 max-w-[34rem] text-sm leading-8 text-[#d7ded5] sm:text-base"
                      >
                        Initializing projects, research, and interactive case studies
                        for a portfolio focused on computer vision, embedded AI, and
                        product-grade execution.
                      </motion.p>

                      <div className="mt-10 max-w-[28rem]">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#d7ded5]">
                          <span>System Status</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="mt-3 h-[10px] rounded-full bg-white/8 p-[2px]">
                          <motion.div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#f4f1ea_0%,#dfe6db_45%,#f4f1ea_100%)]"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative hidden overflow-hidden rounded-[1.65rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 lg:block">
                      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(244,241,234,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,234,0.55)_1px,transparent_1px)] [background-size:46px_46px]" />
                      <div className="relative">
                        <p className="font-hero text-[10px] uppercase tracking-[0.26em] text-[#d7ded5]">
                          Boot Sequence
                        </p>
                        <div className="mt-5 space-y-4 text-[11px] uppercase tracking-[0.18em] text-[#edf0ea]">
                          {[
                            "Loading hero interface",
                            "Syncing selected work",
                            "Preparing research index",
                            "Activating smooth transitions",
                          ].map((item, index) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: phase === "outro" ? 0.3 : 1, x: 0 }}
                              transition={{ delay: 0.15 + index * 0.1, duration: 0.35 }}
                              className="flex items-center gap-3"
                            >
                              <motion.span
                                animate={{
                                  opacity: progress > index * 22 ? 1 : 0.28,
                                  scale: progress > index * 22 ? 1 : 0.86,
                                }}
                                className="h-2.5 w-2.5 rounded-full bg-[#f4f1ea]"
                              />
                              <span>{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      opacity: phase === "active" ? 1 : 0.45,
                      scaleX: phase === "outro" ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.45 }}
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[linear-gradient(90deg,transparent,#f4f1ea,transparent)]"
                    style={{ width: `${Math.max(progress, 12)}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
