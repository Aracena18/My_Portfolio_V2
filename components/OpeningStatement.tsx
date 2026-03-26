"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Link from "next/link";
import { type Ref, useRef } from "react";
import BrandLogo from "./BrandLogo";
import Image from "next/image";

const smooth = { stiffness: 80, damping: 25, restDelta: 0.001 };

function HeroFrameSvg() {
  return (
    <svg
      viewBox="0 0 953 686"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.5"
        y="5.5"
        width="942"
        height="675"
        rx="47.5"
        stroke="#D7D3CA"
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M894 7C923.823 7 948 31.1766 948 61V625C948 654.823 923.823 679 894 679H60C30.1766 679 6 654.823 6 625V61C6 31.1766 30.1766 7 60 7H894ZM827.346 516.333C817.551 510.258 798.18 512.332 786.45 512.375C776.007 512.412 759.517 511.317 749.93 512.727C737.253 514.801 726.906 519.525 719.153 530.285C715.149 535.902 712.432 542.328 711.188 549.11C709.066 560.472 710.539 577.85 710.294 589.622C709.815 612.782 707.598 637.895 729.378 652.784C743.554 662.566 756.513 660.907 772.614 660.901L814.988 660.88L862.062 660.911C868.321 660.916 882.264 661.252 887.89 660.385C922.777 653.565 928.961 622.9 924.218 592.713C922.431 581.351 914.534 570.063 905.091 563.84C899.066 559.893 892.18 557.462 885.013 556.749C868.178 554.967 842.133 562.77 837.071 539.589C835.279 531.397 835.763 521.551 827.346 516.333ZM266.758 28.042C242.38 28.0308 217.734 27.887 193.347 28.2051C187.518 28.2812 181.017 29.6505 175.726 32.1484C164.213 37.4933 156.045 48.1369 153.856 60.6436C153.032 65.4266 153.018 70.6059 152.042 75.4033C149.676 87.3483 141.847 97.4923 130.894 102.805C105.952 114.679 71.4752 96.5227 47.4141 119.578C26.0362 140.062 30.3292 162.225 30.3936 189.202L30.3809 246.215L30.3594 432.315L30.376 552.204L30.3604 588.524C30.3587 607.908 29.036 625.765 43.3359 641.079C51.7071 650.042 63.6225 656.606 75.9629 657.175C80.3636 657.903 90.5673 657.659 95.4785 657.659L128.791 657.653L251.95 657.627L550.452 657.605L621.71 657.659C626.266 657.664 646.567 657.914 652.365 657.337C653.112 657.262 653.849 657.182 654.598 657.142C664.395 656.62 675.189 650.998 682.413 644.908C699.269 630.711 700.008 612.678 699.642 592.486C699.37 577.651 699.376 561.539 699.774 546.683C700.774 525.714 716.088 506.123 736.518 500.947C747.626 498.132 760.212 498.984 771.586 498.994L842.737 499.055C853.106 499.062 875.295 499.719 884.213 497.809C892.274 496.137 899.783 492.45 906.036 487.092C916.639 477.953 923.53 465.035 924.003 451.137C924.673 431.53 924.317 411.159 924.301 391.505L924.253 278.12L924.259 195.421C924.269 184.576 924.2 173.687 924.264 162.848C924.349 148.495 921.227 135.075 911.502 123.991C904.627 116.075 895.39 110.577 885.154 108.308C875.285 106.208 840.952 107.032 828.642 107.029L712.871 107.019L676.83 107.059C669.806 107.075 662.574 107.255 655.826 106.857C632.281 105.471 617.785 87.3264 617.185 64.5029C616.972 56.5804 612.846 47.2213 607.646 41.2988C600.611 33.2908 590.183 28.6065 579.512 28.3389C559.561 27.8814 539.53 28.0936 519.558 28.1016L404.947 28.0605L266.758 28.042ZM127.173 32.8691C115.536 21.7583 101.23 22.9993 86.4043 23.0791C78.7803 23.1206 70.6131 22.865 63.0332 23.2129C51.3465 23.6204 42.7799 25.165 34.2861 34.3047C27.9463 41.1096 24.6119 50.1824 25.0361 59.4746C25.353 68.5105 29.3401 77.0269 36.0762 83.0547C47.5009 93.2897 58.3888 91.859 72.4961 91.8223L101.611 91.7188C103.346 91.7081 105.173 91.7191 106.899 91.6191C123.866 90.6372 138.135 74.4379 137.88 57.5938C137.711 48.2616 133.863 39.3746 127.173 32.8691Z"
        fill="#F4F1EA"
      />
    </svg>
  );
}

export default function OpeningStatement({ ref }: { ref?: Ref<HTMLElement> }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: innerRef,
    offset: ["start start", "end start"],
  });

  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -18]), smooth);
  const portraitY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -26]), smooth);

  const navLinks = [
    { href: "#work", label: "Projects" },
    { href: "#research", label: "Research" },
    { href: "#about", label: "About" },
  ];

  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-[#2c3e35] px-4 pb-12 pt-5 sm:px-6 sm:pt-7 lg:px-8"
    >
      <div ref={innerRef} className="mx-auto max-w-[1360px]">
        <div className="relative hidden aspect-[953/686] w-full lg:block">
          <div className="absolute inset-0 z-0">
            <HeroFrameSvg />
          </div>

          <div className="absolute inset-[2.2%] z-10">
            <div className="absolute left-[2%] top-[3.3%] flex h-[7.2%] w-[8.8%] items-center justify-center rounded-[1.8rem]">
              <BrandLogo className="h-[64%] w-auto text-[#f4f1ea]" />
            </div>

            <nav className="absolute right-[3.7%] top-[5.25%] flex h-[6.8%] w-[31.8%] items-center justify-between rounded-full px-[3.2%] text-[0.72vw] font-medium uppercase tracking-[0.2em] text-[#18231d]">
              <div className="flex items-center gap-[1.35vw]">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition-opacity duration-200 hover:opacity-65"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-[#2c3e35] px-[0.92vw] py-[0.62vw] text-[0.64vw] text-[#f4f1ea] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Download size={14} />
                Download Resume
              </a>
            </nav>

            <motion.div
              style={{ y: textY }}
              className="absolute left-[6.1%] top-[25%] w-[29.4%] text-[#f4f1ea]"
            >
              <p className="font-hero text-[0.64vw] uppercase tracking-[0.3em] text-[#cdd6cd]">
                Computer Vision / Embedded AI / Product Systems
              </p>
              <h1 className="hero-display mt-[0.9vw] max-w-[8ch] text-[3.28vw] leading-[0.92] text-[#f4f1ea]">
                Engineering vision for the real world.
              </h1>
              <p className="mt-[1.6vw] max-w-[21.5rem] text-[0.92vw] leading-[1.84] text-[#dce2d9]">
                I design and ship intelligent systems that combine resilient computer
                vision, embedded deployment, and interface design into work that is
                technically rigorous and ready to use.
              </p>

              <div className="mt-[2vw] flex flex-wrap items-center gap-[0.85vw]">
                <Link
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-[1.08vw] py-[0.76vw] text-[0.76vw] font-semibold uppercase tracking-[0.16em] text-[#152019] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  View My Work
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-[1.08vw] py-[0.76vw] text-[0.76vw] uppercase tracking-[0.16em] text-[#f4f1ea] transition-colors duration-200 hover:bg-white/10"
                >
                  Get in Touch
                  <Mail size={16} />
                </Link>
              </div>

              <div className="mt-[1.45vw] flex flex-wrap gap-[0.45vw]">
                {["Edge AI", "Embedded Systems", "Applied CV"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/6 px-[0.68vw] py-[0.45vw] text-[0.58vw] uppercase tracking-[0.18em] text-[#d8dfd6]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              style={{ y: portraitY }}
              className="absolute left-[45.1%] top-[21.2%] h-[54.8%] w-[24.6%] overflow-hidden rounded-[2.3rem] border border-white/10 bg-[radial-gradient(circle_at_50%_16%,rgba(244,241,234,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(44,62,53,0.46))]" />
              <Image
                src="/images/Profile-Background.webp"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover opacity-[0.14] mix-blend-screen"
              />
              <Image
                src="/images/Profile-Pict.webp"
                alt="Portrait of Robert Jhon Aracena"
                fill
                priority
                className="object-contain object-[50%_100%] scale-[0.94]"
              />
              <div className="absolute inset-x-[6%] bottom-[5.2%] rounded-[1.05rem] border border-white/10 bg-[rgba(244,241,234,0.08)] px-[1.15vw] py-[0.95vw] backdrop-blur-sm">
                <p className="font-hero text-[0.58vw] uppercase tracking-[0.22em] text-[#dce3da]">
                  Robert Jhon Aracena
                </p>
                <p className="mt-1 text-[0.82vw] leading-[1.55] text-[#f4f1ea]">
                  AI Engineer building deployable vision systems and intelligent products.
                </p>
              </div>
            </motion.div>

            <div className="absolute right-[7.4%] top-[44.6%] w-[12.6%] text-[#d9ded7]">
              <p className="text-[0.66vw] uppercase tracking-[0.22em]">Embedded Deployment</p>
              <div className="mt-[0.55vw] flex items-center gap-[0.55vw]">
                <span className="h-[0.42vw] w-[0.42vw] rounded-full bg-[#f4f1ea]" />
                <span className="h-px w-[3.8vw] bg-[#aab5ab]" />
              </div>
              <div className="mt-[1.8vw] rounded-[1rem] border border-white/10 bg-white/6 px-[0.85vw] py-[0.85vw]">
                <p className="font-hero text-[0.54vw] uppercase tracking-[0.22em] text-[#d7ddd4]">
                  Current Stack
                </p>
                <p className="mt-[0.38vw] text-[0.72vw] leading-[1.58] text-[#f4f1ea]">
                  Edge AI, model optimization, hardware integration, and web delivery.
                </p>
              </div>
            </div>

            <div className="absolute bottom-[5%] right-[4.5%] h-[14.8%] w-[18.9%] rounded-[2.1rem] px-[1.1vw] py-[1vw] text-[#f4f1ea]">
              <p className="font-hero text-[0.58vw] uppercase tracking-[0.28em] text-[#d1d9cf]">
                Current Focus
              </p>
              <p className="mt-[0.46vw] max-w-[11rem] text-[0.8vw] leading-[1.56] text-[#f4f1ea]">
                Developing low-latency object detection models for edge devices.
              </p>
              <Link
                href="/projects/esp32-leaf-scanner"
                className="mt-[0.65vw] inline-flex items-center gap-2 text-[0.66vw] font-medium uppercase tracking-[0.18em] text-[#dce3da] transition-transform duration-200 hover:translate-x-1"
              >
                Case Study
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[#d8ddd1]/20 bg-[#23342d] p-4 text-[#f4f1ea] shadow-[0_24px_60px_rgba(14,22,18,0.18)] lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <BrandLogo className="h-8 w-auto text-[#f4f1ea]" />
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#152019]"
            >
              <Download size={13} />
              Resume
            </a>
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 sm:p-5">
            <p className="font-hero text-[11px] uppercase tracking-[0.24em] text-[#cdd6cd]">
              Computer Vision / Embedded AI / Edge Systems
            </p>
            <h1 className="hero-display mt-4 max-w-[9ch] text-[clamp(2.6rem,11vw,4.4rem)] leading-[0.9] text-[#f4f1ea]">
              Engineering vision for the real world.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#dce2d9]">
              I build intelligent systems that combine computer vision, embedded
              deployment, and product-grade interfaces into work that is both
              technically rigorous and ready to use.
            </p>

            <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_50%_16%,rgba(244,241,234,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]">
              <div className="relative h-[23rem] sm:h-[27rem]">
                <Image
                  src="/images/Profile-Background.webp"
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover opacity-[0.14] mix-blend-screen"
                />
                <Image
                  src="/images/Profile-Pict.webp"
                  alt="Portrait of Robert Jhon Aracena"
                  fill
                  priority
                  className="object-contain object-[52%_100%] scale-[1.06]"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-[#f4f1ea] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#152019]"
              >
                View My Work
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm uppercase tracking-[0.16em] text-[#f4f1ea]"
              >
                Get in Touch
                <Mail size={16} />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-[#d0d8ce]">
              {["Projects", "Research", "About", "Edge AI"].map((item) => (
                <Link
                  key={item}
                  href={item === "Projects" ? "#work" : item === "Research" ? "#research" : item === "About" ? "#about" : "#work"}
                  className="rounded-full border border-white/10 bg-white/6 px-3 py-2"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4">
            <p className="font-hero text-[11px] uppercase tracking-[0.24em] text-[#d1d9cf]">
              Current Focus
            </p>
            <p className="mt-3 text-base leading-7 text-[#f4f1ea]">
              Developing low-latency object detection models for edge devices.
            </p>
            <Link
              href="/projects/esp32-leaf-scanner"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.16em] text-[#dce3da]"
            >
              Case Study
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
