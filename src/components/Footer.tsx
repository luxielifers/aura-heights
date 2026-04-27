"use client";

import Image from "next/image";
import { useLenis } from "lenis/react";

const navItems = [
  { label: "Overview", id: "about" },
  { label: "Residences", id: "residences" },
  { label: "Vision", id: "vision" },
  { label: "Specifications", id: "specifications" },
  { label: "Features", id: "features" },
  { label: "Gallery", id: "gallery" },
  { label: "Location", id: "location" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0A0806] overflow-hidden border-t border-[#B8892A1A]">

      {/* ── Giant "Aura" watermark ── */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-end justify-center overflow-hidden"
        style={{ zIndex: 0, bottom: "-8%" }}
      >
        <span
          className="font-cormorant italic"
          style={{
            fontSize: "clamp(9rem, 32vw, 28rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.05em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(184,137,42,0.09)",
            /* subtle glow behind the text */
            textShadow: "0 0 120px rgba(184,137,42,0.04)",
            userSelect: "none",
          }}
        >
          Aura
        </span>
      </div>

      {/* ── Top shimmer line ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(184,137,42,0.45) 30%, rgba(201,160,74,0.65) 50%, rgba(184,137,42,0.45) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20 pb-12">

        {/* ── Brand block ── */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="relative mb-6 group">
            <Image
              src="/images/logowithoutbg.png"
              alt="Aura Heights Logo"
              width={68}
              height={68}
              className="object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-500"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            {/* Bronze halo on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "0 0 28px rgba(184,137,42,0.3)" }} />
          </div>

          <p
            className="font-cormorant text-[#EEE8DF] tracking-[0.18em] uppercase mb-2"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
          >
            Aura Heights
          </p>
          <div className="w-8 h-px bg-bronze mx-auto my-3 opacity-60" />
          <p className="font-josefin uppercase text-[10px] tracking-[0.28em] text-[#B8892A] mb-2">
            Where Elevation Meets Elegance
          </p>
          <p className="font-tenor text-[11px] text-[#5A524A] max-w-[280px] leading-relaxed">
            Rajpur Road, Dehradun · Uttarakhand, India
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B8892A28] to-transparent mb-10" />

        {/* ── Nav links ── */}
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 mb-10" aria-label="Footer navigation">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className="font-josefin text-[10px] uppercase tracking-[0.18em] text-[#5A524A] hover:text-[#B8892A] transition-colors duration-300 relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-bronze group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#B8892A18] to-transparent mb-8" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-josefin uppercase tracking-[0.12em] text-[#3E3830]">
          <p className="text-center md:text-left">RERA Reg. No. UKREP10250000683 · All images representational only.</p>

          <p>© 2026 Aura Heights. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>Website by</span>
            <a
              href="https://luxiesites.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline transition-opacity hover:opacity-70"
              aria-label="LuxieSites"
            >
              <span className="font-cormorant font-bold text-[13px] normal-case tracking-normal text-[#B8892A]">Luxie</span>
              <span className="font-cormorant font-bold italic text-[13px] normal-case tracking-normal text-[#DDB862]">Sites</span>
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
