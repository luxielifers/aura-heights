"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { useCookieConsent } from "@/components/providers";

export default function Vision() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { canLoadThirdParty, acceptCookies } = useCookieConsent();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let trigger: ScrollTrigger | undefined;

    if (sectionRef.current) {
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: "var(--color-vision)",
            color: "#fff",
            duration: 1,
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to("body", {
            backgroundColor: "var(--color-bg)",
            color: "var(--color-primary)",
            duration: 1,
            overwrite: "auto",
          }),
      });
    }

    return () => {
      trigger?.kill();
      gsap.killTweensOf("body");
    };
  }, []);

  return (
    <section id="vision" ref={sectionRef} className="py-32 relative bg-vision min-h-screen flex flex-col justify-center text-white transition-colors duration-700">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center mb-12 md:mb-20">
        
        <div className="mb-8 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
          <div className="w-12 h-[1px] bg-bronze mx-auto mb-4"></div>
          The Vision
        </div>
        
        <h2 className="font-cormorant text-5xl md:text-6xl text-white leading-tight text-center max-w-2xl">
          Every Detail. <br className="hidden md:block"/>
          <span className="italic text-white/70">Before the First Stone.</span>
        </h2>
      </div>

      {/* Video Embed */}
      <div className="relative z-10 w-full flex justify-center px-2 md:px-8">
        <div
          className={`w-full max-w-[1600px] aspect-video relative group ${canLoadThirdParty ? "cursor-pointer" : "cursor-default"}`}
          style={{
            WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
            maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)"
          }}
          onClick={() => {
            if (canLoadThirdParty) {
              setIsPlaying(true);
            }
          }}
        >
          {!isPlaying ? (
            <>
               {/* Video Thumbnail / Placeholder overlay */}
               <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-black/20">
                 {/* Custom Play Button */}
                 <div className="w-20 h-20 rounded-full border border-bronze bg-bronze/10 backdrop-blur-md flex items-center justify-center text-bronze transition-transform duration-300 group-hover:scale-110">
                   <Play className="ml-1" size={32} />
                 </div>

                 {!canLoadThirdParty && (
                   <>
                     <p className="mt-5 font-josefin text-[10px] uppercase tracking-[0.2em] text-white/85 text-center px-4">
                       Optional cookies required for video playback
                     </p>
                     <button
                       type="button"
                       onClick={(event) => {
                         event.stopPropagation();
                         acceptCookies();
                         setIsPlaying(true);
                       }}
                       className="mt-3 inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-5 py-2.5 hover:shadow-[0_0_18px_rgba(184,137,42,0.35)] transition-shadow"
                     >
                       Accept Cookies & Play
                     </button>
                   </>
                 )}
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
                loading="lazy"
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
