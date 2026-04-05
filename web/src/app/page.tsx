"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const [isPreloading, setIsPreloading] = useState(true);

  // Prevent scroll while preloading
  useEffect(() => {
    if (isPreloading) {
      document.body.style.overflow = "hidden";
      // ensure we are at top
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    }
  }, [isPreloading]);

  return (
    <>
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      
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
    </>
  );
}
