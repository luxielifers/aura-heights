"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Background color transition from previous section to dark vision bg
    if (sectionRef.current) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to("body", { backgroundColor: "var(--color-vision)", color: "#fff", duration: 1 }),
        onLeaveBack: () => gsap.to("body", { backgroundColor: "var(--color-bg)", color: "var(--color-primary)", duration: 1 }),
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative bg-vision min-h-screen flex flex-col justify-center text-white transition-colors duration-700">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        <div className="mb-8 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
          <div className="w-12 h-[1px] bg-bronze mx-auto mb-4"></div>
          The Vision
        </div>
        
        <h2 className="font-cormorant text-5xl md:text-6xl text-white leading-tight text-center max-w-2xl mb-24">
          Every Detail. <br className="hidden md:block"/>
          <span className="italic text-white/70">Before the First Stone.</span>
        </h2>

        {/* Video Embed */}
        <div className="w-full max-w-5xl aspect-video relative group cursor-pointer" onClick={() => setIsPlaying(true)}>
          {!isPlaying ? (
            <>
               {/* Video Thumbnail / Placeholder overlay */}
               <div className="absolute inset-0 bg-black/40 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/20">
                 {/* Custom Play Button */}
                 <div className="w-20 h-20 rounded-full border border-bronze bg-bronze/10 backdrop-blur-md flex items-center justify-center text-bronze transition-transform duration-300 group-hover:scale-110">
                   <Play className="ml-1" size={32} />
                 </div>
               </div>
               
               {/* Thumbnail Image placeholder */}
               <div className="absolute inset-0 -z-10 bg-marble opacity-20"></div>
            </>
          ) : (
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} className="w-full h-full">
              <iframe 
                src="https://player.vimeo.com/video/1180218679?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=0&loop=1" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                title="Aura Heights Vision"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
