"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const coloredLogoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Timeline for preloader
    const tl = gsap.timeline({
      onComplete: () => {
        // Complete preloader
        setTimeout(() => {
           onComplete();
        }, 100);
      },
    });

    // 1. Animate loading bar (clip-path reveal on colored logo)
    tl.to(coloredLogoRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2.5,
      ease: "power2.inOut",
    });

    // 2. We wait a tiny bit to show the completed logo
    tl.to({}, { duration: 0.3 });

    // 3. Calculate destination coordinates for the true Navbar logo
    const targetEl = document.getElementById("nav-logo");
    let targetLeft = 24;
    let targetTop = 16;
    let targetWidth = 64; // default md size
    
    if (targetEl && logoRef.current) {
      const rect = targetEl.getBoundingClientRect();
      targetLeft = rect.left;
      targetTop = rect.top;
      targetWidth = rect.width;
    }

    // Animate background sliding up like a curtain
    tl.to(bgRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power3.inOut",
    }, "shrink");

    // Animate logo to exact navbar coordinates
    tl.to(logoRef.current, {
      left: targetLeft,
      top: targetTop,
      width: targetWidth,
      height: targetWidth, // aspect ratio 1:1 for logo container
      xPercent: 0,
      yPercent: 0,
      transform: "none",
      duration: 1,
      ease: "power3.inOut",
    }, "shrink");

  }, [mounted, onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      {/* Background panel */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-bg"
      ></div>

      {/* Center floating container */}
      <div 
        ref={logoRef}
        className="relative z-10 w-[200px] sm:w-[240px] md:w-[300px] aspect-[1/0.8] mix-blend-multiply"
        style={{
          // Center using fixed CSS
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        {/* Grayscale/Dimmed Base Logo */}
        <div className="absolute inset-0 opacity-20 grayscale brightness-0">
          <Image
            src="/images/logowithoutbg.png"
            alt="Aura Heights"
            fill
            sizes="(max-width: 768px) 240px, 300px"
            className="object-contain"
            priority
          />
        </div>

        {/* Golden Masked Logo (Loading Bar) */}
        <div 
          ref={coloredLogoRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }} // fills bottom-to-top
        >
          <Image
            src="/images/logowithoutbg.png"
            alt="Aura Heights"
            fill
            sizes="(max-width: 768px) 240px, 300px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
