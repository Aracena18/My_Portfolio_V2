"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
  minimumDuration?: number;
}

export default function Preloader({
  onComplete,
  minimumDuration = 2500,
}: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"line" | "grid" | "logo" | "dissolve" | "complete">("line");

  const completeLoading = useCallback(() => {
    setStage("dissolve");
    setTimeout(() => {
      setStage("complete");
      setTimeout(() => {
        setIsLoading(false);
        onComplete?.();
      }, 500);
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Stage transitions
    const lineTimer = setTimeout(() => setStage("grid"), 800);
    const gridTimer = setTimeout(() => setStage("logo"), 1400);
    const completeTimer = setTimeout(() => completeLoading(), minimumDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(lineTimer);
      clearTimeout(gridTimer);
      clearTimeout(completeTimer);
    };
  }, [minimumDuration, completeLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-surface-dark flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full max-w-md px-8">
            {/* Line animation */}
            <AnimatePresence mode="wait">
              {stage === "line" && (
                <motion.div
                  key="line"
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="h-px bg-white/50"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </motion.div>
              )}

              {/* Grid animation */}
              {stage === "grid" && (
                <motion.div
                  key="grid"
                  className="relative h-32 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-white/30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: i * 0.03,
                          duration: 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Logo animation */}
              {(stage === "logo" || stage === "dissolve") && (
                <motion.div
                  key="logo"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Initials / Logo */}
                  <motion.div
                    className="text-4xl font-light text-white mb-8 tracking-wider"
                    animate={stage === "dissolve" ? { opacity: 0, y: -20 } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-emerald-400">R</span>
                    <span className="text-white/50">J</span>
                    <span className="text-white">A</span>
                  </motion.div>

                  {/* Progress bar */}
                  <div className="w-48 h-px bg-white/10 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>

                  {/* Progress text */}
                  <motion.p
                    className="mt-4 text-xs text-white/30 font-mono"
                    animate={stage === "dissolve" ? { opacity: 0 } : {}}
                  >
                    {progress}%
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading text */}
            <motion.p
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: stage !== "dissolve" && stage !== "complete" ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              Loading Experience
            </motion.p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-8 h-px bg-white/10" />
          <div className="absolute top-8 left-8 w-px h-8 bg-white/10" />
          <div className="absolute bottom-8 right-8 w-8 h-px bg-white/10" />
          <div className="absolute bottom-8 right-8 w-px h-8 bg-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
