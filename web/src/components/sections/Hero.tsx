"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect on scroll
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const subLines = ["Residences designed for", "those who expect the", "extraordinary."];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Vimeo Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full pointer-events-none">
        {/* We use 120% height and -10% top so parallax has room to move */}
        <div className="relative w-full h-full bg-black">
          <iframe 
            src="https://player.vimeo.com/video/1180217460?background=1&autoplay=1&muted=1&loop=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full min-h-full h-[56.25vw] -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
            title="Aura Heights Master"
          ></iframe>
        </div>
      </div>

      {/* Dark gradient overlay so text reads easily over the video */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }} // delay past preloader
          className="mb-8 font-josefin tracking-[0.25em] text-xs uppercase"
          style={{ color: "var(--color-bronze)" }}
        >
          <div className="w-12 h-[1px] bg-bronze mx-auto mb-4"></div>
          Dehradun · Uttarakhand
        </motion.div>

        <h1 className="font-cormorant font-light text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 3.6, ease: [0.16, 1, 0.3, 1] }}
              >
                Where <span className="italic text-bronze-light">Elevation</span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Meets <span className="italic text-bronze-light">Elegance</span>
              </motion.div>
            </div>
        </h1>

        <div className="mb-12 font-tenor text-base md:text-lg text-white/80 max-w-md mx-auto">
          {subLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 4.0 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4.5 }}
        >
          <Link 
            href="#residences"
            className="inline-flex items-center font-josefin uppercase text-xs tracking-[0.2em] border border-bronze px-8 py-4 hover:bg-bronze hover:text-white transition-colors duration-300"
            style={{ color: "var(--color-bronze)" }}
          >
            <span className="group-hover:text-white">Explore Residences →</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
