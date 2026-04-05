"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Intro() {
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
                  Perched amidst the serene foothills of Dehradun, Aura Heights redefines luxury living. Experience the tranquility of mountain air combined with unparalleled architectural elegance.
                </p>
                <p>
                  Every detail has been meticulously crafted—from breathtaking panoramic views to expansive living spaces designed to harmonise with their natural surroundings. This is not just a residence; it is a sanctuary elevated above the ordinary.
                </p>
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
              {/* {PLACEHOLDER} Image for now - use fallback */}
              <div className="absolute inset-0 bg-marble">
                {/* Fallback pattern until image is loaded */}
              </div>
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000"
                alt="Aura Heights Architecture"
                fill
                className="object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
                unoptimized
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
