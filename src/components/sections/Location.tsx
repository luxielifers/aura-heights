"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "@/components/providers";

const AuraMap = dynamic(() => import("@/components/AuraMap"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg" />,
});

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/QFRgpTvonGdywXjC9";

const PREVIEW_COUNT = 5;

const highlights = [
  { name: "Pacific Mall", minutes: 10, km: 7.8 },
  { name: "Mussoorie", minutes: 60, km: 24 },
  { name: "The Taj", minutes: 5, km: 6.1 },
  { name: "Max Hospital", minutes: 5, km: 6.2 },
  { name: "Dehradun Zoo", minutes: 4, km: 4.2 },
  { name: "Shiv Mandir", minutes: 4, km: 4.2 },
  { name: "DIT University", minutes: 2, km: 2.4 },
  { name: "Hyatt Regency", minutes: 5, km: 5.5 },
];

function CountUpNumber({ value, inView, delay = 0, decimals = 0 }: { value: number; inView: boolean; delay?: number; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let stopFn: (() => void) | undefined;
    const t = setTimeout(() => {
      const c = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setDisplay(v) });
      stopFn = () => c.stop();
    }, delay * 1000);
    return () => { clearTimeout(t); stopFn?.(); };
  }, [inView, value, delay]);

  const precision = 10 ** decimals;
  const formatted = (Math.round(display * precision) / precision).toFixed(decimals);

  return <>{formatted}</>;
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
  const [isExpanded, setIsExpanded] = useState(false);
  const shownHighlights = isExpanded ? highlights : highlights.slice(0, PREVIEW_COUNT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9 }}
      className="rounded-[2.5rem] px-8 py-10 md:px-12 md:py-12"
      style={{
        background: "rgba(250,247,242,0.74)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(184,137,42,0.18)",
        boxShadow: "0 14px 46px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
    >
      {/* Label */}
      <div className="mb-6 font-josefin tracking-[0.25em] text-xs uppercase [text-shadow:0_1px_6px_rgba(0,0,0,0.14)]" style={{ color: "var(--color-bronze)" }}>
        <div className="w-12 h-[1px] bg-bronze mb-4" />
        Location &amp; Neighbourhood
      </div>

      {/* Heading */}
      <h2 className="font-cormorant text-4xl md:text-5xl text-primary leading-tight mb-10 [text-shadow:0_3px_12px_rgba(0,0,0,0.2)]">
        Connected to the <br />
        <span className="italic text-bronze-light">Heart of Dehradun</span>
      </h2>

      {/* Highlights */}
      <motion.div
        layout
        ref={listRef}
        className="relative"
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute left-[3px] top-[10px] bottom-[10px] w-px bg-bronze/25" />
        <motion.ul layout className="space-y-7 relative">
          <AnimatePresence initial={false} mode="popLayout">
            {shownHighlights.map((item) => {
              const originalIndex = highlights.indexOf(item);
              const slideDelay = originalIndex * 0.12;
              const countDelay = 0.65 + slideDelay;
              const kmDecimals = Number.isInteger(item.km) ? 0 : 1;
              const expansionDelay = isExpanded && originalIndex >= PREVIEW_COUNT
                ? (originalIndex - PREVIEW_COUNT) * 0.07
                : 0;

              return (
                <motion.li
                  layout
                  key={item.name}
                  initial={{ opacity: 0, x: -18, y: 16, filter: "blur(3px)" }}
                  animate={inView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : { opacity: 0, x: -18, y: 16, filter: "blur(3px)" }}
                  exit={{ opacity: 0, x: -10, y: -10, filter: "blur(3px)", transition: { duration: 0.24 } }}
                  transition={{ duration: 0.38, delay: expansionDelay, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="pl-8 relative overflow-hidden"
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-bronze shadow-[0_0_6px_rgba(184,137,42,0.5)]" />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-manrope text-base md:text-lg text-primary [text-shadow:0_1px_6px_rgba(0,0,0,0.2)]">{item.name}</span>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className="font-josefin uppercase text-[10px] tracking-widest whitespace-nowrap tabular-nums px-3 py-1 rounded-full [text-shadow:0_1px_4px_rgba(0,0,0,0.12)]"
                        style={{ color: "var(--color-bronze)", background: "rgba(184,137,42,0.12)", border: "1px solid rgba(184,137,42,0.26)", minWidth: "5rem", textAlign: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
                      >
                        <CountUpNumber value={item.minutes} inView={inView} delay={countDelay} /> Min
                      </span>

                      <span
                        className="font-josefin uppercase text-[10px] tracking-widest whitespace-nowrap tabular-nums px-3 py-1 rounded-full [text-shadow:0_1px_4px_rgba(0,0,0,0.12)]"
                        style={{ color: "var(--color-bronze)", background: "rgba(184,137,42,0.12)", border: "1px solid rgba(184,137,42,0.26)", minWidth: "5rem", textAlign: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
                      >
                        <CountUpNumber value={item.km} decimals={kmDecimals} inView={inView} delay={countDelay + 0.05} /> km
                      </span>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {highlights.length > PREVIEW_COUNT && (
          <motion.button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.45, delay: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full transition-all duration-300"
            style={{ padding: "10px 22px", background: "rgba(184,137,42,0.10)", border: "1px solid rgba(184,137,42,0.35)", color: "var(--color-bronze)" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#B8892A"; el.style.color = "#FAF7F2"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(184,137,42,0.10)"; el.style.color = "var(--color-bronze)"; }}
          >
            {isExpanded ? "Show fewer nearby locations" : "View more nearby locations"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="inline-flex"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </motion.button>
        )}
      </motion.div>

      {/* View on Google Maps */}
      <motion.a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-8 inline-flex items-center gap-2.5 font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full transition-all duration-300"
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
  const { canLoadThirdParty, acceptCookies } = useCookieConsent();

  const mapPlaceholder = (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{
        background: "linear-gradient(150deg, rgba(232,224,213,0.85), rgba(240,235,227,0.92))",
      }}
    >
      <p className="font-josefin text-[10px] uppercase tracking-[0.22em] text-bronze mb-3">
        Interactive Map Disabled
      </p>
      <p className="font-manrope text-primary max-w-md leading-relaxed">
        Accept optional cookies to enable the live Mapbox experience.
      </p>
      <button
        type="button"
        onClick={acceptCookies}
        className="mt-4 inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-5 py-2.5 hover:shadow-[0_0_18px_rgba(184,137,42,0.35)] transition-shadow"
      >
        Accept Cookies & Enable Map
      </button>
    </div>
  );

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
            {canLoadThirdParty ? <AuraMap /> : mapPlaceholder}
          </div>
          <MapFades />
          {canLoadThirdParty && (
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 cursor-pointer"
              style={{ zIndex: 5 }}
              aria-label="Open Aura Heights in Google Maps"
            />
          )}
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
          {canLoadThirdParty ? <AuraMap /> : mapPlaceholder}
        </div>
        <MapFades />
        {canLoadThirdParty && (
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 cursor-pointer"
            style={{ zIndex: 5 }}
            aria-label="Open Aura Heights in Google Maps"
          />
        )}

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
