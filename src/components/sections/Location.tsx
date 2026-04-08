"use client";

import dynamic from "next/dynamic";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AuraMap = dynamic(() => import("@/components/AuraMap"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg" />,
});

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/QFRgpTvonGdywXjC9";

const highlights = [
  { name: "Max Super Speciality Hospital", distance: 5, unit: "Min" },
  { name: "Pacific Mall", distance: 10, unit: "Min" },
  { name: "Doon School", distance: 15, unit: "Min" },
  { name: "Jolly Grant Airport", distance: 45, unit: "Min" },
  { name: "Mussoorie", distance: 60, unit: "Min" },
];

function CountUpNumber({ value, inView, delay = 0 }: { value: number; inView: boolean; delay?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let stopFn: (() => void) | undefined;
    const t = setTimeout(() => {
      const c = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setDisplay(Math.round(v)) });
      stopFn = () => c.stop();
    }, delay * 1000);
    return () => { clearTimeout(t); stopFn?.(); };
  }, [inView, value, delay]);
  return <>{display}</>;
}

// Shared fade overlays — works inside any `relative` or `sticky` positioned parent
function MapFades() {
  return (
    <>
      <div className="absolute top-0 inset-x-0 pointer-events-none z-10" style={{ height: "22%", background: "linear-gradient(to bottom, var(--bg), transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-10" style={{ height: "22%", background: "linear-gradient(to top, var(--bg), transparent)" }} />
      <div className="absolute left-0 inset-y-0 pointer-events-none z-10" style={{ width: "10%", background: "linear-gradient(to right, var(--bg), transparent)" }} />
      <div className="absolute right-0 inset-y-0 pointer-events-none z-10" style={{ width: "10%", background: "linear-gradient(to left, var(--bg), transparent)" }} />
    </>
  );
}

// Shared glass card content
function GlassCard({ listRef, inView }: { listRef?: React.RefObject<HTMLDivElement | null>; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9 }}
      className="rounded-[2.5rem] px-8 py-10 md:px-12 md:py-12"
      style={{
        background: "rgba(250,247,242,0.62)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(184,137,42,0.18)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.65)",
      }}
    >
      {/* Label */}
      <div className="mb-6 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
        <div className="w-12 h-[1px] bg-bronze mb-4" />
        Location &amp; Neighbourhood
      </div>

      {/* Heading */}
      <h2 className="font-cormorant text-4xl md:text-5xl text-primary leading-tight mb-10">
        Connected to the <br />
        <span className="italic text-bronze-light">Heart of Dehradun</span>
      </h2>

      {/* Highlights */}
      <div ref={listRef} className="relative">
        <div className="absolute left-[3px] top-[10px] bottom-[10px] w-px bg-bronze/25" />
        <ul className="space-y-7 relative">
          {highlights.map((item, idx) => {
            const slideDelay = idx * 0.12;
            const countDelay = 0.65 + slideDelay;
            return (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.65, delay: slideDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex justify-between items-center pl-8 relative"
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-bronze shadow-[0_0_6px_rgba(184,137,42,0.5)]" />
                <span className="font-tenor text-base md:text-lg text-primary">{item.name}</span>
                <span
                  className="font-josefin uppercase text-[10px] tracking-widest whitespace-nowrap tabular-nums px-3 py-1 rounded-full"
                  style={{ color: "var(--color-bronze)", background: "rgba(184,137,42,0.10)", border: "1px solid rgba(184,137,42,0.20)", minWidth: "5rem", textAlign: "center" }}
                >
                  <CountUpNumber value={item.distance} inView={inView} delay={countDelay} /> {item.unit}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* View on Google Maps */}
      <motion.a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-10 inline-flex items-center gap-2.5 font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full transition-all duration-300"
        style={{ padding: "10px 24px", background: "rgba(184,137,42,0.10)", border: "1px solid rgba(184,137,42,0.35)", color: "var(--color-bronze)" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#B8892A"; el.style.color = "#FAF7F2"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(184,137,42,0.10)"; el.style.color = "var(--color-bronze)"; }}
      >
        View on Google Maps
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </motion.div>
  );
}

export default function Location() {
  const mobileListRef = useRef<HTMLDivElement>(null);
  const desktopListRef = useRef<HTMLDivElement>(null);
  const mobileInView = useInView(mobileListRef, { once: true, margin: "-40px" });
  const desktopInView = useInView(desktopListRef, { once: true, margin: "-80px" });

  return (
    <section id="location" className="border-t border-marble/30">

      {/* ══ MOBILE LAYOUT ══
          Map sticks full-screen at top.
          Card slides up from below and sticks at 15vh — same pattern as Amenities/Gallery. */}
      <div className="md:hidden" style={{ minHeight: "170vh" }}>

        {/* Map: sticky, full viewport height */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: "100svh", zIndex: 1 }}
        >
          <div className="absolute inset-0">
            <AuraMap />
          </div>
          <MapFades />
          {/* Map click area: z-[5] = above map, below card (z-20) */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 cursor-pointer"
            style={{ zIndex: 5 }}
            aria-label="Open Aura Heights in Google Maps"
          />
        </div>

        {/* Card: scrolls up from below, sticks at 15vh */}
        <div
          className="sticky px-4 pb-12"
          style={{ top: "15vh", zIndex: 20 }}
        >
          <GlassCard listRef={mobileListRef} inView={mobileInView} />
        </div>

      </div>

      {/* ══ DESKTOP LAYOUT ══
          Full-bleed map background, content card floats on the right. */}
      <div className="hidden md:block relative overflow-hidden" style={{ minHeight: "720px" }}>

        {/* Map background */}
        <div className="absolute inset-0 z-0">
          <AuraMap />
        </div>
        <MapFades />
        {/* Map click area: z-[5] = above map, below card (z-20) */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 cursor-pointer"
          style={{ zIndex: 5 }}
          aria-label="Open Aura Heights in Google Maps"
        />

        {/* Content — pointer-events-none so map <a> is clickable in non-card areas */}
        <div
          className="relative z-20 container mx-auto px-12 py-32 flex justify-end items-center pointer-events-none"
          style={{ minHeight: "720px" }}
        >
          <div className="w-5/12 pointer-events-auto">
            <GlassCard listRef={desktopListRef} inView={desktopInView} />
          </div>
        </div>

      </div>

    </section>
  );
}
