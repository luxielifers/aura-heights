"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Intro() {
  const launchDate = new Date("2025-10-01");
  const possessionDate = new Date("2030-04-01");
  const now = new Date();
  const timelineTotal = possessionDate.getTime() - launchDate.getTime();
  const elapsed = Math.min(Math.max(now.getTime() - launchDate.getTime(), 0), timelineTotal);
  const progressPct = Math.round((elapsed / timelineTotal) * 100);

  return (
    <section id="about" className="py-24 md:py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Text Content (40%) */}
          <div className="w-full md:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="mb-8 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
                <div className="w-12 h-[1px] bg-bronze mb-4"></div>
                About The Project
              </div>
              
              <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-8">
                A Symphony of <br />
                <span className="italic text-bronze-light">Nature and Architecture</span>
              </h2>
              
              {/* Extra content to lean into Dehradun elevation / mountain air */}
              <div className="space-y-6 font-tenor text-muted leading-relaxed text-lg">
                <p>
                  Tucked into the prestigious Rajpur Road neighbourhood, Aura Heights brings together Dehradun&apos;s heritage character and contemporary residential calm.
                </p>
                <p>
                  Intelligent planning, wellness-inspired spaces, and future-ready features shape homes that are crafted for comfort and designed for delight.
                </p>
                <p>
                  The project is structured as a single refined tower with 8 floors and 6 units per floor, balancing privacy with a strong community rhythm.
                </p>
              </div>

              <div className="mt-10 p-5 border border-marble/70 bg-bg-secondary rounded-xl overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-josefin text-[10px] uppercase tracking-[0.2em] text-muted">Project Timeline Progress</p>
                  <p className="font-josefin text-[10px] uppercase tracking-[0.2em] text-bronze">{progressPct}%</p>
                </div>
                <div className="h-1.5 bg-marble/80 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-700 relative overflow-hidden"
                    style={{
                      width: `${progressPct}%`,
                      background: "linear-gradient(90deg, #B8892A, #C9A04A, #DDB862, #C9A04A, #B8892A)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-josefin text-[10px] uppercase tracking-[0.16em] text-muted">
                  <span>Launch: Oct 2025</span>
                  <span>Possession: Apr 2030</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image (60%) */}
          <div className="w-full md:w-7/12 mt-12 md:mt-0 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-marble">
                {/* Fallback pattern until image is loaded */}
              </div>
              <Image
                src="/images/gallery/exterior/outsidegarden.jpg"
                alt="Aura Heights Architecture"
                fill
                sizes="(max-width: 768px) 92vw, 56vw"
                quality={72}
                className="object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
