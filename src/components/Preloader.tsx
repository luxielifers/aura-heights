"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const logoRef = useRef<HTMLDivElement>(null);
  const coloredLogoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Keep a stable ref to onComplete so the animation closure never goes stale
  // but we also never need to add it to a deps array (avoiding re-runs).
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    // Create the timeline once on mount. Kill it on unmount.
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => onCompleteRef.current(), 100);
      },
    });

    // 1. Logo fill reveals bottom-to-top
    tl.to(coloredLogoRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2.5,
      ease: "power2.inOut",
    });

    // 2. Brief pause to show completed logo
    tl.to({}, { duration: 0.3 });

    // 3. Find the nav-logo position to fly logo into navbar
    const targetEl = document.getElementById("nav-logo");
    let targetLeft = 24;
    let targetTop = 16;
    let targetWidth = 64;

    if (targetEl && logoRef.current) {
      const rect = targetEl.getBoundingClientRect();
      targetLeft = rect.left;
      targetTop = rect.top;
      targetWidth = rect.width;
    }

    // 4. Background curtain slides up
    tl.to(bgRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power3.inOut",
    }, "shrink");

    // 5. Logo flies to navbar position
    tl.to(logoRef.current, {
      left: targetLeft,
      top: targetTop,
      width: targetWidth,
      height: targetWidth,
      xPercent: 0,
      yPercent: 0,
      transform: "none",
      duration: 1,
      ease: "power3.inOut",
    }, "shrink");

    return () => {
      tl.kill();
    };
  }, []); // intentionally empty — runs once on mount only

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Background panel */}
      <div ref={bgRef} className="absolute inset-0 bg-bg" />

      {/* Center floating logo */}
      <div
        ref={logoRef}
        className="relative z-10 w-[200px] sm:w-[240px] md:w-[300px] aspect-[1/0.8] mix-blend-multiply"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Dimmed base logo */}
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

        {/* Gold reveal logo (clips bottom-to-top as the loading bar) */}
        <div
          ref={coloredLogoRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
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
