"use client";

import dynamic from "next/dynamic";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AuraMap = dynamic(() => import("@/components/AuraMap"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg" />,
});

const highlights = [
  { name: "Max Super Speciality Hospital", distance: 5, unit: "Min" },
  { name: "Pacific Mall", distance: 10, unit: "Min" },
  { name: "Doon School", distance: 15, unit: "Min" },
  { name: "Jolly Grant Airport", distance: 45, unit: "Min" },
  { name: "Mussoorie", distance: 60, unit: "Min" },
];

function CountUpNumber({
  value,
  inView,
  delay = 0,
}: {
  value: number;
  inView: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let stopFn: (() => void) | undefined;
    const timeout = setTimeout(() => {
      const controls = animate(0, value, {
        duration: 1.4,
        ease: "easeOut",
        onUpdate(v) {
          setDisplay(Math.round(v));
        },
      });
      stopFn = () => controls.stop();
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      stopFn?.();
    };
  }, [inView, value, delay]);

  return <>{display}</>;
}

export default function Location() {
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { once: true, margin: "-80px" });

  return (
    <section
      id="location"
      className="relative overflow-hidden border-t border-marble/30"
      style={{ minHeight: "720px" }}
    >
      {/* ── Full-bleed map background ── */}
      <div className="absolute inset-0 z-0">
        <AuraMap />
      </div>

      {/* Top fade into section background */}
      <div
        className="absolute top-0 inset-x-0 pointer-events-none z-10"
        style={{
          height: "28%",
          background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-10"
        style={{
          height: "28%",
          background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
        }}
      />
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
        style={{
          width: "12%",
          background: "linear-gradient(to right, var(--bg) 0%, transparent 100%)",
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
        style={{
          width: "12%",
          background: "linear-gradient(to left, var(--bg) 0%, transparent 100%)",
        }}
      />

      {/* ── Content layer ── */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 py-24 md:py-32 h-full flex items-center">
        <div className="flex justify-end w-full">

          {/* Glassmorphism content card — right side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="w-full lg:w-5/12 rounded-[2.5rem] px-8 py-10 md:px-12 md:py-12"
            style={{
              background: "rgba(250, 247, 242, 0.60)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(184, 137, 42, 0.18)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.65)",
            }}
          >
            {/* Section label */}
            <div
              className="mb-6 font-josefin tracking-[0.25em] text-xs uppercase"
              style={{ color: "var(--color-bronze)" }}
            >
              <div className="w-12 h-[1px] bg-bronze mb-4" />
              Location &amp; Neighbourhood
            </div>

            {/* Heading */}
            <h2 className="font-cormorant text-4xl md:text-5xl text-primary leading-tight mb-10">
              Connected to the <br />
              <span className="italic text-bronze-light">Heart of Dehradun</span>
            </h2>

            {/* Highlights list */}
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
                      transition={{
                        duration: 0.65,
                        delay: slideDelay,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="flex justify-between items-center pl-8 relative"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-bronze shadow-[0_0_6px_rgba(184,137,42,0.5)]" />

                      <span className="font-tenor text-base md:text-lg text-primary">
                        {item.name}
                      </span>

                      <span
                        className="font-josefin uppercase text-[10px] tracking-widest whitespace-nowrap tabular-nums px-3 py-1 rounded-full"
                        style={{
                          color: "var(--color-bronze)",
                          background: "rgba(184,137,42,0.10)",
                          border: "1px solid rgba(184,137,42,0.20)",
                          minWidth: "5rem",
                          textAlign: "center",
                        }}
                      >
                        <CountUpNumber value={item.distance} inView={inView} delay={countDelay} />{" "}
                        {item.unit}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
