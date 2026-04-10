"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/sections/Hero";
import WhatsAppButton from "@/components/WhatsAppButton";

const Intro = dynamic(() => import("@/components/sections/Intro"));
const EminentFeatures = dynamic(() => import("@/components/sections/EminentFeatures"));
const Residences = dynamic(() => import("@/components/sections/Residences"));
const Specifications = dynamic(() => import("@/components/sections/Specifications"));
const Vision = dynamic(() => import("@/components/sections/Vision"));
const Gallery = dynamic(() => import("@/components/sections/Gallery"));
const Location = dynamic(() => import("@/components/sections/Location"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

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
        
        <Hero isPreloading={isPreloading} />
        <Intro />
        <Residences />
        <Vision />
        <Specifications />
        <EminentFeatures />
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
