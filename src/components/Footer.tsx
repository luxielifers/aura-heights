"use client";

import Image from "next/image";
import { MapPin, MessageCircle, Phone } from "lucide-react";
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

const PHONE_DISPLAY = "+91 94123 68618";
const PHONE_HREF = "tel:+919412368618";
const WHATSAPP_LINK =
  "https://wa.me/919412368618?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Aura%20Heights%20and%20available%20units.%20Please%20share%20details.";

export default function Footer() {
  const lenis = useLenis();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, {
        offset: -80,
        duration: 1.25,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#B8892A24] bg-[#080604] text-[#F4ECE0]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,160,96,0.09) 0%, rgba(8,6,4,0) 32%), linear-gradient(120deg, rgba(255,255,255,0.035), transparent 42%, rgba(196,160,96,0.055) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-6vw] hidden select-none justify-center overflow-hidden sm:flex"
      >
        <span
          className="font-cormorant italic"
          style={{
            fontSize: "clamp(11rem, 27vw, 25rem)",
            lineHeight: 0.78,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1.2px rgba(184,137,42,0.075)",
            textShadow: "0 0 110px rgba(184,137,42,0.035)",
          }}
        >
          Aura
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(184,137,42,0.42) 28%, rgba(221,184,98,0.74) 50%, rgba(184,137,42,0.42) 72%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-16 sm:px-6 sm:pb-12 md:px-12 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.35fr] lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative mb-5 h-16 w-16">
              <Image
                src="/images/logowithoutbg.png"
                alt="Aura Heights Logo"
                fill
                sizes="64px"
                className="object-contain opacity-85"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="absolute inset-[-14px] rounded-full border border-[#B8892A1F]" />
            </div>

            <p className="font-cormorant text-[2.15rem] leading-none tracking-[0.11em] text-[#F6EFE4] uppercase sm:text-[2.7rem]">
              Aura Heights
            </p>
            <div className="my-5 h-px w-16 bg-gradient-to-r from-transparent via-[#DDB862] to-transparent lg:from-[#DDB862] lg:via-[#B8892A] lg:to-transparent" />
            <p className="font-josefin text-[10px] uppercase tracking-[0.26em] text-[#DDB862]">
              Where Elevation Meets Elegance
            </p>
            <p className="mt-4 flex max-w-xs items-start justify-center gap-2 font-tenor text-sm leading-relaxed text-[#BDB0A0] lg:justify-start">
              <MapPin size={15} className="mt-1 shrink-0 text-[#B8892A]" strokeWidth={1.5} />
              <span>Rajpur Road, Dehradun - Uttarakhand, India</span>
            </p>

            <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#B8892A55] bg-[#F4ECE00A] px-4 font-josefin text-[10px] uppercase tracking-[0.18em] text-[#F4ECE0] transition-colors hover:border-[#DDB862] hover:bg-[#B8892A]"
              >
                <Phone size={15} strokeWidth={1.6} />
                Call
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#B8892A55] bg-[#B8892A] px-4 font-josefin text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#C9A04A]"
              >
                <MessageCircle size={15} strokeWidth={1.6} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:pt-2">
            <div className="mb-5 flex items-center gap-4">
              <p className="font-josefin text-[10px] uppercase tracking-[0.24em] text-[#DDB862]">Explore</p>
              <div className="h-px flex-1 bg-gradient-to-r from-[#B8892A4D] to-transparent" />
            </div>

            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Footer navigation">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="group min-h-12 rounded-lg border border-[#B8892A1F] bg-[#F4ECE008] px-3 text-left font-josefin text-[10px] uppercase tracking-[0.17em] text-[#BDB0A0] transition-all duration-300 hover:border-[#B8892A66] hover:bg-[#B8892A14] hover:text-[#F4ECE0] sm:text-center"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
                    {label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-10 grid gap-4 border-y border-[#B8892A22] py-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="font-josefin text-[10px] uppercase tracking-[0.22em] text-[#756B60]">Private enquiries</p>
                <a
                  href={PHONE_HREF}
                  className="mt-2 inline-block font-cormorant text-3xl leading-none text-[#F4ECE0] transition-colors hover:text-[#DDB862]"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#DDB86266] px-6 font-josefin text-[10px] uppercase tracking-[0.2em] text-[#DDB862] transition-colors hover:bg-[#DDB862] hover:text-[#080604]"
              >
                Schedule Visit
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-center font-josefin text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[#6E6258] sm:mt-10 md:flex-row md:items-center md:justify-between md:text-left">
          <p>RERA Reg. No. UKREP10250000683 - All images representational only.</p>
          <p>(c) 2026 Aura Heights. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1.5 md:justify-end">
            <span>Website by</span>
            <a
              href="https://luxiesites.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline transition-opacity hover:opacity-75"
              aria-label="LuxieSites"
            >
              <span className="font-cormorant text-[13px] font-bold normal-case tracking-normal text-[#B8892A]">Luxie</span>
              <span className="font-cormorant text-[13px] font-bold italic normal-case tracking-normal text-[#DDB862]">Sites</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
