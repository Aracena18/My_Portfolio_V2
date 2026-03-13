"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    { href: "#work", label: "Work" },
    { href: "#research", label: "Research" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "border-b border-line/60 bg-surface/80 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <div className="max-w-container mx-auto flex items-center justify-between h-14 px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Robert Jhon Aracena"
            className="-ml-4 md:-ml-10 inline-flex items-center transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src="/logo.svg"
              alt="Robert Jhon Aracena logo"
              width={810}
              height={627}
              priority
              className="h-8 w-auto"
            />
            <span className="sr-only">Robert Jhon Aracena</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small uppercase tracking-[0.1em] font-light text-muted hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 text-small uppercase tracking-[0.1em] font-light text-green hover:text-green-dark transition-colors duration-200"
            >
              <ArrowDownToLine size={13} />
              Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "md:hidden text-small uppercase tracking-[0.1em] font-light transition-colors duration-200",
              isScrolled
                ? "text-muted hover:text-ink"
                : "text-white hover:text-surface drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            )}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-surface flex flex-col justify-center px-8"
          >
            <div className="space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block font-heading text-display font-bold text-ink hover:text-green transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.22, 0.9, 0.3, 1] }}
              >
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 font-heading text-h3 font-semibold text-green hover:text-green-dark transition-colors duration-200"
                >
                  <ArrowDownToLine size={20} />
                  Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
