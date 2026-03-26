"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.82;
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const navLinks = [
    { href: "#work", label: "Projects" },
    { href: "#research", label: "Research" },
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: isScrolled ? 0 : -10,
        }}
        transition={{ duration: 0.6, ease: [0.22, 0.9, 0.3, 1] }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "top-4 opacity-100" : "pointer-events-none top-2 opacity-0"
        )}
      >
        <div className="mx-auto flex max-w-[1380px] items-start justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="Robert Jhon Aracena"
            className="pointer-events-auto inline-flex h-14 items-center rounded-full border border-[#d8ddd1] bg-[rgba(244,241,234,0.94)] px-5 text-[#152019] shadow-[0_18px_42px_rgba(24,36,28,0.12)] backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <BrandLogo className="h-7 w-auto text-[#152019]" />
              <div className="hidden sm:block">
                <p className="font-heading text-[11px] uppercase tracking-[0.2em]">Robert Jhon Aracena</p>
                <p className="text-[11px] text-[#152019]/60">AI + full-stack systems</p>
              </div>
            </div>
          </Link>

          <div className="pointer-events-auto hidden items-center gap-2 rounded-full border border-[#d8ddd1] bg-[rgba(244,241,234,0.94)] p-2 text-[#152019] shadow-[0_18px_42px_rgba(24,36,28,0.12)] backdrop-blur md:flex">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: [0.22, 0.9, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className="flex h-10 items-center gap-2 rounded-full px-4 text-[11px] uppercase tracking-[0.16em] text-[#152019]/72 transition-colors duration-200 hover:bg-[#e8e5dc] hover:text-[#152019]"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.35, ease: [0.22, 0.9, 0.3, 1] }}
              href="/resume.pdf"
              download
              className="flex h-10 items-center gap-2 rounded-full bg-[#2c3e35] px-4 text-[11px] uppercase tracking-[0.16em] text-[#f4f1ea] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Download size={14} strokeWidth={1.8} />
              Download Resume
            </motion.a>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d8ddd1] bg-[rgba(244,241,234,0.94)] text-[#152019] shadow-[0_18px_42px_rgba(24,36,28,0.12)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[rgba(20,31,26,0.96)] px-8 backdrop-blur-md"
          >
            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-[rgba(244,241,234,0.08)] p-8">
              <p className="font-hero text-xs uppercase tracking-[0.28em] text-white/42">
                Robert Jhon Aracena
              </p>
              <div className="mt-6 space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 font-heading text-h3 text-white transition-colors duration-200 hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
                href="/resume.pdf"
                download
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#152019]"
              >
                <Download size={14} />
                Download Resume
              </motion.a>
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-6 inline-flex items-center gap-2 text-white/72"
              >
                <Mail size={16} />
                Start a conversation
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
