"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { homeGalleryImages } from "@/lib/media";

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
      setLightboxIndex(lightboxIndex === 0 ? homeGalleryImages.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === homeGalleryImages.length - 1 ? 0 : lightboxIndex + 1);
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
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bg text-bronze px-8 md:px-12 py-4 hover:bg-bronze hover:text-white transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)]"
              >
                View Full Gallery
              </Link>
              <Link
                href="/gallery?tab=Layouts"
                className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-marble bg-transparent text-primary px-8 md:px-12 py-4 hover:border-bronze hover:text-bronze transition-colors"
              >
                View Layouts
              </Link>
            </div>
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
            {homeGalleryImages.map((src, idx) => (
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
                  />
                  {/* Bronze shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bronze/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: Swipe gallery cards for cleaner touch ergonomics ── */}
        <div className="md:hidden px-4">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {homeGalleryImages.map((src, idx) => (
              <div
                key={idx}
                className="gallery-card relative snap-center shrink-0 w-[82vw] max-w-[360px] aspect-[4/5] cursor-pointer group overflow-hidden border border-bronze/20"
                onClick={() => setLightboxIndex(idx)}
              >
                <Image
                  src={src}
                  alt={`Aura Heights Gallery ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 82vw, 320px"
                  className="object-cover transition-transform duration-700 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bronze/35 via-transparent to-transparent" />
              </div>
            ))}
          </div>
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
              src={homeGalleryImages[lightboxIndex]}
              alt="Aura Heights Detail"
              fill
              className="object-contain"
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
