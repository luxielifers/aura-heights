"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Car, Wind, Bell, Shield, ArrowUp } from "lucide-react";

const amenities = [
  { icon: Sun, title: "Rooftop Terrace", desc: "Panoramic views of the valley from an exclusive elevated sanctuary." },
  { icon: Bell, title: "Concierge Service", desc: "24/7 dedicated staff catering to your every requirement." },
  { icon: Car, title: "Covered Parking", desc: "Secure, climate-controlled spaces for your premium vehicles." },
  { icon: Wind, title: "Landscaped Garden", desc: "Lush, meticulously maintained flora native to the foothills." },
  { icon: ArrowUp, title: "Elevators", desc: "High-speed, whisper-quiet transit direct to your floor." },
  { icon: Shield, title: "24-Hour Security", desc: "Advanced surveillance ensuring absolute peace of mind." },
];

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
          {amenities.map((item, idx) => (
            <div 
              key={idx} 
              className="sticky top-[15vh] md:static amenity-card bg-marble p-10 border border-marble hover:border-bronze transition-colors flex flex-col items-center text-center group shadow-xl md:shadow-none"
            >
              <div className="mb-6 p-4 rounded-full bg-bg border border-transparent group-hover:border-bronze transition-colors">
                <item.icon size={48} strokeWidth={1} style={{ color: "var(--color-bronze)" }} />
              </div>
              <h3 className="font-cormorant text-2xl text-primary mb-4">{item.title}</h3>
              <p className="font-tenor text-muted leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
