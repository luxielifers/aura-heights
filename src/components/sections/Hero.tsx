"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCookieConsent } from "@/components/providers";

export default function Hero({ isPreloading = false }: { isPreloading?: boolean }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const { canLoadThirdParty } = useCookieConsent();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!bgRef.current) {
        return;
      }

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
    }, bgRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const subLines = ["Residences designed for", "those who expect the", "extraordinary."];
  const baseDelay = isPreloading ? 3.5 : 0.25;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Vimeo Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full pointer-events-none">
        {/* We use 120% height and -10% top so parallax has room to move */}
        <div className="relative w-full h-full bg-black">
          <Image
            src="/images/gallery/exterior/fullbuildingevening.jpg"
            alt="Aura Heights facade"
            fill
            priority
            quality={70}
            sizes="100vw"
            className={`object-cover transition-opacity duration-700 ${canLoadThirdParty ? (videoReady ? "opacity-0" : "opacity-70") : "opacity-85"}`}
          />
          {canLoadThirdParty && (
            <iframe
              src="https://player.vimeo.com/video/1180217460?background=1&autoplay=1&muted=1&loop=1&autopause=0&dnt=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="eager"
              onLoad={() => setVideoReady(true)}
              className={`absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full min-h-full h-[56.25vw] -translate-x-1/2 -translate-y-[52%] md:-translate-y-1/2 object-cover transition-opacity duration-700 [filter:brightness(1.16)_saturate(1.05)] ${videoReady ? "opacity-75" : "opacity-0"}`}
              title="Aura Heights Master"
            ></iframe>
          )}

          {!canLoadThirdParty && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-[10px] tracking-[0.18em] uppercase font-josefin text-white/90 backdrop-blur-sm">
              Accept optional cookies to enable video
            </div>
          )}
        </div>
      </div>

      {/* Dark gradient overlay so text reads easily over the video */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/62 via-black/22 to-black/72 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: baseDelay }}
          className="mb-8 font-josefin tracking-[0.25em] text-xs uppercase"
          style={{ color: "var(--color-bronze)" }}
        >
          <div className="w-12 h-[1px] bg-bronze mx-auto mb-4"></div>
          Dehradun · Uttarakhand
        </motion.div>

        <div
          className="w-full max-w-4xl rounded-[2rem] md:rounded-[2.6rem] px-6 py-8 md:px-12 md:py-12 border border-[#FAF7F2]/40"
          style={{
            background: "linear-gradient(135deg, rgba(250,247,242,0.52) 0%, rgba(240,235,227,0.28) 55%, rgba(250,247,242,0.16) 100%)",
            backdropFilter: "blur(24px) saturate(130%)",
            WebkitBackdropFilter: "blur(24px) saturate(130%)",
            boxShadow: "0 30px 90px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(184,137,42,0.1)",
          }}
        >
          <h1 className="font-cormorant font-light text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: baseDelay + 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Where <span className="italic text-bronze-light">Elevation</span>
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: baseDelay + 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  Meets <span className="italic text-bronze-light">Elegance</span>
                </motion.div>
              </div>
          </h1>

          <div className="mb-12 font-manrope font-light tracking-wide text-base md:text-lg text-white/84 max-w-md mx-auto">
            {subLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: baseDelay + 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: baseDelay + 0.65 }}
          >
            <motion.button
              type="button"
              onClick={() => document.getElementById("residences")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(184,137,42,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 font-josefin uppercase text-xs tracking-[0.25em] rounded-full border border-bronze px-10 py-4 text-bronze transition-all duration-300 hover:bg-bronze hover:text-white"
              style={{
                background: "linear-gradient(135deg, rgba(250,247,242,0.9), rgba(240,235,227,0.7))",
                backdropFilter: "blur(8px)",
              }}
            >
              Explore Residences
              <span className="text-bronze/70">→</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
