"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const distinctionStrips = [
  {
    stat: "8ft",
    title: "Entrance Doors",
    desc: "Polished hardwood with Godrej or Yale security lock and premium hardware fittings.",
  },
  {
    stat: "Schindler",
    title: "High-Speed Lifts",
    desc: "Access-controlled elevators designed for seamless vertical mobility.",
  },
  {
    stat: "GROHE",
    title: "Kitchen Fittings",
    desc: "Noise-dampening sinks with GROHE or KOHLER CP fittings throughout.",
  },
  {
    stat: "100%",
    title: "Power Backup",
    desc: "Uninterrupted power for all common areas, round the clock.",
  },
  {
    stat: "MDDA",
    title: "Approved Development",
    desc: "Fully approved by MDDA and RERA registered for complete buyer protection.",
  },
  {
    stat: "30'",
    title: "Green Corridor",
    desc: "A 30-foot landscaped green area running through the heart of the complex.",
  },
  {
    stat: "6'",
    title: "Private Balconies",
    desc: "Every unit opens to at least one 6-foot wide personal balcony.",
  },
  {
    stat: "EV",
    title: "Charging Ready",
    desc: "EV charging infrastructure is built into the stilt parking level.",
  },
];

function getStatSizeClass(stat: string) {
  const hasLetters = /[A-Za-z]/.test(stat);

  if (!hasLetters) {
    return "text-[clamp(3.4rem,8vw,6rem)]";
  }

  if (stat.length >= 8) {
    return "text-[clamp(2.8rem,5.5vw,4.6rem)]";
  }

  if (stat.length >= 6) {
    return "text-[clamp(3.1rem,6vw,5rem)]";
  }

  return "text-[clamp(3.2rem,6.2vw,5.2rem)]";
}

export default function EminentFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current) {
        return;
      }

      const heading = containerRef.current.querySelectorAll(".distinction-heading > *");
      const rule = containerRef.current.querySelector(".distinction-rule");
      const strips = gsap.utils.toArray<HTMLElement>(".distinction-strip", containerRef.current);
      const stats = gsap.utils.toArray<HTMLElement>(".distinction-stat", containerRef.current);
      const copyBlocks = gsap.utils.toArray<HTMLElement>(".distinction-copy", containerRef.current);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reducedMotion) {
        gsap.set([heading, rule, strips, stats, copyBlocks], { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.set(heading, { opacity: 0, y: 18 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(strips, { opacity: 0, y: 30, filter: "blur(8px)" });
      gsap.set(stats, { y: 18 });
      gsap.set(copyBlocks, { y: 12, opacity: 0.82 });

      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(rule, {
        scaleX: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
          once: true,
        },
      });

      strips.forEach((strip, i) => {
        gsap.to(strip, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          delay: i < 2 ? i * 0.08 : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: strip,
            start: "top 88%",
            once: true,
          },
        });

        gsap.to(strip.querySelector(".distinction-stat"), {
          y: 0,
          duration: 0.95,
          ease: "expo.out",
          scrollTrigger: {
            trigger: strip,
            start: "top 88%",
            once: true,
          },
        });

        gsap.to(strip.querySelector(".distinction-copy"), {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: strip,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, #211D18 0%, #14110E 48%, #0D0B09 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(196,160,96,0.5), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,160,96,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(196,160,96,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 70%, transparent 100%)",
        }}
      />

      <div ref={containerRef} className="relative w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="distinction-heading mb-14 md:mb-16 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] lg:items-end">
          <div>
            <p className="mb-4 font-josefin tracking-[0.25em] text-[10px] uppercase" style={{ color: "rgba(196,160,96,0.78)" }}>
              Built Different
            </p>
            <h2 className="font-cormorant text-5xl md:text-7xl text-[#F4ECE0] leading-[0.95] max-w-4xl">
              Designed for Distinction
            </h2>
          </div>
          <p className="max-w-md font-manrope text-[1rem] md:text-[1.08rem] leading-[1.85] text-[#EFE5D8]/72 lg:pb-2">
            Signature specifications, daily comforts, and future-ready infrastructure come together with the calm precision of a private address.
          </p>
        </div>

        <div className="distinction-rule h-px w-full bg-gradient-to-r from-[#C4A06099] via-[#C4A06040] to-transparent" />

        <div className="relative">
          {distinctionStrips.map((item, index) => (
            <article
              key={item.title}
              className="distinction-strip group relative border-b border-[#C4A06026] border-l border-l-transparent transition-all duration-500 hover:border-l-[#C4A06099] hover:bg-[#C4A06010]"
            >
              <div
                aria-hidden
                className="absolute inset-y-5 left-0 w-px bg-gradient-to-b from-transparent via-[#C4A060] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="grid grid-cols-1 lg:grid-cols-[72px_minmax(220px,360px)_minmax(0,1fr)] gap-4 lg:gap-9 items-start lg:items-center py-8 md:py-10">
                <p className="hidden lg:block font-josefin text-[10px] uppercase tracking-[0.24em] text-[#C4A06066] pt-3">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p
                  className={`distinction-stat font-cormorant leading-[0.9] text-[#C4A060] whitespace-nowrap ${getStatSizeClass(item.stat)}`}
                >
                  {item.stat}
                </p>

                <div className="distinction-copy min-w-0 lg:border-l lg:border-[#C4A06033] lg:pl-8">
                  <h3 className="font-manrope text-[1.82rem] md:text-[2.08rem] text-[#F8F1E6] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 font-manrope text-[1.02rem] md:text-[1.14rem] leading-[1.8] text-[#EFE5D8]/82 max-w-3xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
