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

      const strips = gsap.utils.toArray<HTMLElement>(".distinction-strip", containerRef.current);

      // Set initial hidden state immediately so strips are never visible before animation
      gsap.set(strips, { opacity: 0, y: 40 });

      // Animate each strip as it enters the viewport individually
      strips.forEach((strip, i) => {
        gsap.to(strip, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: strip,
            start: "top 95%",
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
    <section id="features" className="py-28 md:py-32" style={{ background: "#1C1A17" }}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-16">
          <p className="mb-4 font-josefin tracking-[0.25em] text-[10px] uppercase" style={{ color: "rgba(196,160,96,0.78)" }}>
            Built Different
          </p>
          <h2 className="font-cormorant text-5xl md:text-7xl text-[#F4ECE0] leading-[0.95] max-w-4xl">
            Designed for Distinction
          </h2>
        </div>

        <div ref={containerRef} className="border-t border-[#C4A06033]">
          {distinctionStrips.map((item) => (
            <article
              key={item.title}
              className="distinction-strip border-b border-[#C4A06033] border-l-2 border-l-transparent pl-0 md:pl-1 transition-all duration-300 hover:border-l-[#C4A06099] hover:bg-[#C4A06012]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,380px)_minmax(0,1fr)] gap-5 lg:gap-10 items-start lg:items-center py-8 md:py-10">
                <p
                  className={`font-cormorant leading-[0.9] tracking-[-0.015em] text-[#C4A060] whitespace-nowrap ${getStatSizeClass(item.stat)}`}
                >
                  {item.stat}
                </p>

                <div className="min-w-0 border-l-0 lg:border-l lg:border-[#C4A06033] lg:pl-7">
                  <h3 className="font-tenor text-[1.82rem] md:text-[2.08rem] text-[#F8F1E6] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 font-tenor text-[1.02rem] md:text-[1.14rem] leading-[1.8] text-[#EFE5D8] max-w-3xl">
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