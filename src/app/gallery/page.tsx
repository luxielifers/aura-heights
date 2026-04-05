"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

// We use typical luxury Unsplash placeholder categories
const categories = ["Exterior", "Interior", "Terrace"] as const;
type Category = typeof categories[number];

const galleryData: Record<Category, string[]> = {
  Exterior: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"
  ],
  Interior: [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000"
  ],
  Terrace: [
    "https://images.unsplash.com/photo-1588854337221-4cfb63897dff?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
  ]
};

export default function FullGallery() {
  const [activeTab, setActiveTab] = useState<Category>("Exterior");

  const images = galleryData[activeTab];

  return (
    <div className="min-h-screen bg-bg flex flex-col pt-32 pb-24">
      
      {/* Simple Header */}
      <div className="container mx-auto px-6 md:px-12 mb-16 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-josefin text-xs tracking-widest text-muted hover:text-bronze transition-colors uppercase mb-6">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="font-cormorant text-5xl md:text-6xl text-primary leading-tight">
            The <span className="italic text-bronze-light">Collection</span>
          </h1>
        </div>

        {/* Tabs Layer */}
        <div className="flex bg-marble/50 p-1 rounded-full border border-marble w-full md:w-auto overflow-hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="relative flex-1 md:flex-none px-2 sm:px-4 md:px-8 py-3 rounded-full font-josefin text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] uppercase transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <span className={`relative z-10 ${activeTab === cat ? "text-white" : "text-muted hover:text-primary"}`}>
                {cat}
              </span>
              {activeTab === cat && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-bronze rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout taking up rest of space */}
      <div className="flex-1 container mx-auto px-6 md:px-12">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {images.map((src, i) => (
              <motion.div
                key={src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative w-full aspect-[4/5] bg-marble overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                   <div className="w-12 h-[1px] bg-white"></div>
                </div>
                <Image
                  src={src}
                  alt={`Aura Heights ${activeTab} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Put a margin above footer for spacing */}
      <div className="mt-32 w-full">
         <Footer />
      </div>

    </div>
  );
}
