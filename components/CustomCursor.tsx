"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CursorState {
  scale: number;
  opacity: number;
  label: string;
  mode: "default" | "link" | "view" | "drag" | "hidden";
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({
    scale: 1,
    opacity: 1,
    label: "",
    mode: "default",
  });
  const [isVisible, setIsVisible] = useState(false);

  // Spring-animated position values
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    if (!isVisible) {
      setIsVisible(true);
    }
  }, [cursorX, cursorY, isVisible]);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Detect hoverable elements
  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Check for links and buttons
    const isLink = target.closest("a, button, [role='button']");
    const isViewable = target.closest("[data-cursor='view']");
    const isDraggable = target.closest("[data-cursor='drag']");
    const isHidden = target.closest("[data-cursor='hidden']");

    if (isHidden) {
      setState({ scale: 0, opacity: 0, label: "", mode: "hidden" });
    } else if (isViewable) {
      setState({ scale: 2.5, opacity: 1, label: "View", mode: "view" });
    } else if (isDraggable) {
      setState({ scale: 1.5, opacity: 1, label: "", mode: "drag" });
    } else if (isLink) {
      setState({ scale: 2, opacity: 1, label: "", mode: "link" });
    } else {
      setState({ scale: 1, opacity: 1, label: "", mode: "default" });
    }
  }, []);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
    };
  }, [handleMouseMove, handleElementHover, handleMouseEnter, handleMouseLeave]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && state.mode !== "hidden" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: state.mode === "link" || state.mode === "view" ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && state.mode !== "hidden" ? state.opacity : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm"
          animate={{
            width: state.scale * 20,
            height: state.scale * 20,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Label */}
          {state.label && (
            <motion.span
              className="text-[10px] font-medium text-white uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {state.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
