"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { layoutGalleryGroups } from "@/lib/media";

const tabs = [
  {
    id: "2bhk-l1-r1",
    label: "2BHK L1 - R1",
    title: "2BHK L1 - R1",
    sqft: "1913",
    features: [
      "Smartly planned 2 BHK layout",
      "Expansive balcony for valley-facing openness",
      "High ceilings and cross-ventilation planning",
      "Premium finishes with privacy-first zoning",
    ],
  },
  {
    id: "3bhk-l3-r3",
    label: "3BHK L3 - R3",
    title: "3BHK L3 - R3",
    sqft: "2570",
    features: [
      "Large-format 3 BHK family planning",
      "Dedicated utility and practical circulation",
      "Balanced public-private room separation",
      "Designed for natural light through major living zones",
    ],
  },
  {
    id: "3bhkplus-l2-r2",
    label: "3BHK+ L2 - R2",
    title: "3BHK+ L2 - R2",
    sqft: "2596",
    features: [
      "Signature 3 BHK with enhanced room proportions",
      "Comfort-led zoning with private retreat feel",
      "Open-format living and dining sequence",
      "Optimized layout for long-term family living",
    ],
  },
];

export default function Residences() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const currentGroup = layoutGalleryGroups.find((group) => group.id === activeTab);
  const currentImages = currentGroup?.items ?? [];
  const currentImage = currentImages[activeImageIndex] ?? currentImages[0];

  const goToPreviousImage = () => {
    if (currentImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    if (currentImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="residences" className="py-24 md:py-32 bg-bg-secondary min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center justify-center text-center">
          <div className="mb-6 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
            <div className="w-12 h-[1px] bg-bronze mx-auto mb-4"></div>
            The Residences
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Curated <span className="italic text-bronze-light">Living Spaces</span>
          </h2>
          <p className="mt-5 font-josefin text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted">
            6 units per floor · 8 floors total
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 mt-12 items-start max-w-[1320px] mx-auto">
          
          {/* Left Details Panel */}
          <div className="w-full lg:w-4/12 flex-shrink-0">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-3 bg-marble/50 p-1 rounded-2xl md:rounded-full border border-marble w-full gap-1 mb-12">
              {tabs.map((tab, idx) => {
                const isLastOddItem = tabs.length % 2 !== 0 && idx === tabs.length - 1;

                return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveImageIndex(0);
                  }}
                  className={`relative min-w-0 px-2 md:px-4 py-3 rounded-xl md:rounded-full font-josefin text-[9px] sm:text-[10px] md:text-[10px] tracking-[0.08em] md:tracking-[0.16em] uppercase transition-colors overflow-hidden whitespace-nowrap w-full ${
                    isLastOddItem ? "col-span-2 sm:col-span-1 max-w-[260px] justify-self-center sm:max-w-none" : ""
                  }`}
                >
                  <span className={`relative z-10 ${activeTab === tab.id ? "text-white" : "text-muted hover:text-primary"}`}>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="residencesTabIndicator"
                      className="absolute inset-0 bg-bronze rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-cormorant text-3xl md:text-4xl text-primary mb-4">
                  {currentTab.title}
                </h3>
                <p className="font-tenor text-muted uppercase tracking-widest text-sm mb-8">
                  {currentTab.sqft} SQ.FT.
                </p>

                <ul className="mb-12 space-y-4 font-tenor text-primary">
                  {currentTab.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-bronze block"></span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-5">
                  <Link
                    href="/gallery?tab=Layouts"
                    prefetch
                    className="inline-flex items-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze text-bronze px-7 py-3 transition-all duration-300 hover:bg-bronze hover:text-white hover:shadow-[0_0_20px_rgba(184,137,42,0.32)]"
                    style={{
                      background: "linear-gradient(120deg, rgba(250,247,242,0.96), rgba(240,235,227,0.92))",
                      boxShadow: "0 8px 22px rgba(184,137,42,0.16), inset 0 1px 0 rgba(255,255,255,0.7)",
                    }}
                  >
                    View Layouts
                  </Link>

                  <button
                    type="button"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="font-josefin uppercase text-[10px] tracking-[0.2em] border-b border-bronze text-primary hover:text-bronze pb-1 transition-colors inline-block"
                  >
                    Enquire About This Unit →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Image / Floor Plan */}
          <div className="w-full lg:w-8/12">
            <div className="relative aspect-[16/10] md:aspect-[16/10] lg:min-h-[500px] overflow-hidden bg-marble border border-marble">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeImageIndex}`}
                  initial={{ opacity: 0, scale: 1.04, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {currentImage ? (
                    <Image
                      src={currentImage.src}
                      alt={`${currentTab.title} - ${currentImage.title}`}
                      fill
                      sizes="(max-width: 1024px) 92vw, 62vw"
                      quality={78}
                      className="object-cover"
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>

              {currentImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-white/65 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 transition-colors flex items-center justify-center"
                    aria-label="Previous layout image"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-white/65 bg-black/35 text-white backdrop-blur-sm hover:bg-black/55 transition-colors flex items-center justify-center"
                    aria-label="Next layout image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/65 via-black/30 to-transparent px-5 py-4">
                <p className="font-josefin text-[10px] uppercase tracking-[0.2em] text-white/80">{currentTab.title}</p>
                <p className="font-cormorant text-xl text-white leading-tight">{currentImage?.title}</p>
                <p className="font-josefin text-[10px] uppercase tracking-[0.2em] text-white/75 mt-1">
                  {activeImageIndex + 1} / {currentImages.length}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
