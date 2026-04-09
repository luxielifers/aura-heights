"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const tabs = [
  {
    id: "l1-r1",
    label: "2BHK",
    title: "Type L-1 / R-1 - 2 BHK",
    sqft: "1913",
    features: [
      "Smartly planned 2 BHK layout",
      "Expansive balcony for valley-facing openness",
      "High ceilings and cross-ventilation planning",
      "Premium finishes with privacy-first zoning",
    ],
    image: "/images/layouts/floorplan_2bhk_L.jpg",
  },
  {
    id: "l3-r3",
    label: "3BHK",
    title: "Type L-3 / R-3 - 3 BHK",
    sqft: "2570",
    features: [
      "Large-format 3 BHK family planning",
      "Dedicated utility and practical circulation",
      "Balanced public-private room separation",
      "Designed for natural light through major living zones",
    ],
    image: "/images/layouts/floorplan_3bhk_L_vertical.jpg",
  },
  {
    id: "l2-r2",
    label: "3BHK+",
    title: "Type L-2 / R-2 - 3 BHK",
    sqft: "2596",
    features: [
      "Signature 3 BHK with enhanced room proportions",
      "Comfort-led zoning with private retreat feel",
      "Open-format living and dining sequence",
      "Optimized layout for long-term family living",
    ],
    image: "/images/layouts/floorplan_3bhk_R.jpg",
  },
];

export default function Residences() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const currentTab = tabs.find((t) => t.id === activeTab)!;

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

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mt-12 items-start max-w-6xl mx-auto">
          
          {/* Left Details Panel */}
          <div className="w-full lg:w-5/12 flex-shrink-0">
            {/* Tab Switcher */}
            <div className="flex gap-4 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-josefin uppercase text-xs tracking-widest px-6 py-2 rounded-full border transition-colors ${
                    activeTab === tab.id
                      ? "border-bronze bg-bronze text-white"
                      : "border-marble text-muted hover:border-bronze hover:text-bronze"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
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

                <button
                  type="button"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="font-josefin uppercase text-[10px] tracking-[0.2em] border-b border-bronze text-primary hover:text-bronze pb-1 transition-colors inline-block"
                >
                  Enquire About This Unit → 
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Image / Floor Plan */}
          <div className="w-full lg:w-7/12 relative aspect-[4/3] overflow-hidden bg-marble">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.05, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentTab.image}
                  alt={currentTab.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
