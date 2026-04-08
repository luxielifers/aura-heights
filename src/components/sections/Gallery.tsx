"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=80&w=1000",
];

// How many degrees to skew (positive = leans right like the reference)
const SKEW_DEG = 10;

export default function Gallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (scrollContainerRef.current) {
      const cards = gsap.utils.toArray(".gallery-card", scrollContainerRef.current);

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <>
      <section id="gallery" className="py-24 md:py-32 bg-bg-secondary w-full overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-12">
          <div className="flex flex-col items-start gap-2">
            <div className="font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
              <div className="w-12 h-[1px] bg-bronze mb-4"></div>
              Gallery
            </div>
            <h2 className="font-cormorant text-4xl md:text-5xl text-primary leading-tight mb-8">
              Visualise <span className="italic text-bronze-light">Perfection</span>
            </h2>
            <Link
               href="/gallery"
               className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bg text-bronze px-12 py-4 hover:bg-bronze hover:text-white transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)]"
            >
               View Full Gallery
            </Link>
          </div>
        </div>

        {/* ── DESKTOP: Parallelogram cards row ── */}
        <div className="hidden md:block" style={{ overflow: "visible" }}>
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-0"
            style={{
              minHeight: 480,
              paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
              paddingRight: "3rem",
              overflow: "visible",
              gap: 36,
            }}
          >
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                className="gallery-card relative flex-shrink-0 cursor-pointer group"
                style={{
                  width: 260,
                  height: 400,
                  transform: `skewX(-${SKEW_DEG}deg)`,
                  zIndex: idx,
                  overflow: "hidden",
                  boxShadow: "6px 0 28px rgba(0,0,0,0.22)",
                  transition: "box-shadow 0.4s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px #B8892A, 6px 0 28px rgba(0,0,0,0.3)"; (e.currentTarget as HTMLElement).style.zIndex = "99"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "6px 0 28px rgba(0,0,0,0.22)"; (e.currentTarget as HTMLElement).style.zIndex = String(idx); }}
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Counter-skew the image so it stays rectangular */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ transform: `skewX(${SKEW_DEG}deg) scaleX(1.2)` }}
                >
                  <Image
                    src={src}
                    alt={`Aura Heights Gallery ${idx + 1}`}
                    fill
                    sizes="320px"
                    className="object-cover"
                    unoptimized
                  />
                  {/* Bronze shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bronze/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: Sticky scroll cards (original layout preserved, parallelogram per card) ── */}
        <div
          className="md:hidden flex flex-col gap-6 px-4"
          ref={scrollContainerRef}
          style={{ position: "relative" }}
        >
          {galleryImages.slice(0, 3).map((src, idx) => (
            <div
              key={idx}
              className="gallery-card relative cursor-pointer group sticky shadow-xl"
              style={{
                top: `${15 + idx * 2}vh`,
                height: 280,
                overflow: "hidden",
                transform: `skewX(-${SKEW_DEG}deg)`,
                borderRadius: 4,
              }}
              onClick={() => setLightboxIndex(idx)}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ transform: `skewX(${SKEW_DEG}deg) scaleX(1.18)` }}
              >
                <Image
                  src={src}
                  alt={`Aura Heights Gallery ${idx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bronze/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors"
            onClick={handlePrev}
          >
            <ChevronLeft size={48} />
          </button>

          <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[lightboxIndex]}
              alt="Aura Heights Detail"
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors"
            onClick={handleNext}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}
