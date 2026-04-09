"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import AmenityIcon from "@/components/AmenityIcon";
import { featuredAmenities } from "@/lib/amenities";

export default function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current) {
      const cards = gsap.utils.toArray(".amenity-card", containerRef.current);
      
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
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section id="amenities" className="py-24 md:py-32 bg-bg" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-16 md:mb-24 flex flex-col items-center justify-center text-center">
          <div className="mb-6 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
            <div className="w-12 h-[1px] bg-bronze mx-auto mb-4"></div>
            World-Class Amenities
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Designed for <span className="italic text-bronze-light">Distinction</span>
          </h2>
        </div>

        <div ref={containerRef} className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 relative">
          {featuredAmenities.map((item, idx) => (
            <div 
              key={idx} 
              className="sticky top-[15vh] md:static amenity-card bg-marble p-10 border border-marble hover:border-bronze transition-colors flex flex-col items-center text-center group shadow-xl md:shadow-none"
            >
              <div className="mb-6 p-4 rounded-full bg-bg border border-transparent group-hover:border-bronze transition-colors">
                <AmenityIcon icon={item.icon} className="w-12 h-12 text-black" />
              </div>
              <h3 className="font-cormorant text-2xl text-primary mb-4">{item.title}</h3>
              <p className="font-tenor text-muted leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-14 text-center">
          <Link
            href="/amenities"
            className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bg text-bronze px-12 py-4 hover:bg-bronze hover:text-white transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)]"
          >
            View All Amenities
          </Link>
        </div>

      </div>
    </section>
  );
}
