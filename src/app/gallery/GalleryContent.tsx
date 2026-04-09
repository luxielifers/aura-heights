"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import {
  galleryCategories,
  galleryImagesByCategory,
  layoutImageTitles,
  type GalleryCategory,
} from "@/lib/media";

export function GalleryContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = galleryCategories.includes(tabParam as GalleryCategory)
    ? (tabParam as GalleryCategory)
    : "Exterior";

  const [activeTab, setActiveTab] = useState<GalleryCategory>(initialTab);

  const images = galleryImagesByCategory[activeTab];
  const isLayoutsTab = activeTab === "Layouts";

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
        <div className="grid grid-cols-2 md:flex bg-marble/50 p-1 rounded-2xl md:rounded-full border border-marble w-full md:w-auto gap-1">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="relative min-w-0 px-2 md:px-8 py-3 rounded-xl md:rounded-full font-josefin text-[9px] sm:text-[10px] md:text-xs tracking-[0.08em] md:tracking-[0.2em] uppercase transition-colors overflow-hidden whitespace-nowrap"
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
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
            isLayoutsTab ? "gap-8 sm:gap-10 md:gap-12" : "gap-4 sm:gap-6 md:gap-8"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {images.map((src, i) => (
              <motion.div
                key={`${activeTab}-${i}-${src}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={
                  isLayoutsTab
                    ? "group border border-marble bg-bg-secondary p-4 md:p-5"
                    : "relative w-full aspect-[4/5] bg-marble overflow-hidden cursor-pointer group"
                }
              >
                {isLayoutsTab ? (
                  <>
                    <div className="relative w-full aspect-[16/11] overflow-hidden bg-marble">
                      <Image
                        src={src}
                        alt={`Aura Heights ${activeTab} ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-5 pb-1">
                      <h3 className="font-cormorant text-2xl md:text-[30px] text-primary leading-tight">
                        {layoutImageTitles[i] ?? `Layout ${i + 1}`}
                      </h3>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <div className="w-12 h-[1px] bg-white"></div>
                    </div>
                    <Image
                      src={src}
                      alt={`Aura Heights ${activeTab} ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </>
                )}
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
