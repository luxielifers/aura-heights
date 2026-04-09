"use client";

import { useState, useEffect, useCallback } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Residences from "@/components/sections/Residences";
import Vision from "@/components/sections/Vision";
import Amenities from "@/components/sections/Amenities";
import Gallery from "@/components/sections/Gallery";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";

// Module-level flag: resets on every hard refresh / new page load,
// but persists in memory during SPA navigation (Next.js link clicks).
// This is exactly what sessionStorage cannot do — sessionStorage survives F5.
let preloaderHasRun = false;

export default function Home() {
  const [isPreloading, setIsPreloading] = useState(() => !preloaderHasRun);

  // Prevent scroll while preloading
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreloading]);

  const handlePreloaderComplete = useCallback(() => {
    preloaderHasRun = true;
    setIsPreloading(false);
  }, []);

  return (
    <>
      {isPreloading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <main className="min-h-screen flex flex-col">
        {/* We keep Navbar visible under preloader so it flows cleanly when preloader fades out */}
        <Navbar isPreloading={isPreloading} />
        
        <Hero />
        <Intro />
        <Residences />
        <Vision />
        <Amenities />
        <Gallery />
        <Location />
        <Contact />
        
        <Footer />
      </main>

      {/* Floating WhatsApp CTA */}
      <WhatsAppButton />
    </>
  );
}
