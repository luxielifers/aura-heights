"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import {
  galleryCategories,
  galleryImagesByCategory,
  layoutGallerySections,
  type GalleryCategory,
} from "@/lib/media";

export function GalleryContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = galleryCategories.includes(tabParam as GalleryCategory)
    ? (tabParam as GalleryCategory)
    : "Exterior";

  const [activeTab, setActiveTab] = useState<GalleryCategory>(initialTab);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isLayoutsTab = activeTab === "Layouts";
  const layoutSectionsWithIndex = useMemo(() => {
    let runningIndex = 0;
    return layoutGallerySections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        lightboxIndex: runningIndex++,
      })),
    }));
  }, []);

  const flattenedLayoutItems = useMemo(
    () => layoutSectionsWithIndex.flatMap((section) => section.items),
    [layoutSectionsWithIndex]
  );

  const images = isLayoutsTab
    ? flattenedLayoutItems.map((item) => item.src)
    : galleryImagesByCategory[activeTab];

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) => {
          if (prev === null) {
            return prev;
          }
          return prev === 0 ? images.length - 1 : prev - 1;
        });
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          if (prev === null) {
            return prev;
          }
          return prev === images.length - 1 ? 0 : prev + 1;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, lightboxIndex]);

  const handlePrev = (event: React.MouseEvent) => {
    event.stopPropagation();
    setLightboxIndex((prev) => {
      if (prev === null) {
        return prev;
      }
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const handleNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    setLightboxIndex((prev) => {
      if (prev === null) {
        return prev;
      }
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col pt-32 pb-24">
      {/* Simple Header */}
      <div className="container mx-auto px-6 md:px-12 mb-16 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-josefin text-xs tracking-widest text-muted hover:text-bronze transition-colors uppercase mb-6">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="font-cormorant text-5xl md:text-6xl text-primary leading-tight">
            {isLayoutsTab ? (
              <>
                Layouts <span className="italic text-bronze-light">Collection</span>
              </>
            ) : (
              <>
                The <span className="italic text-bronze-light">Collection</span>
              </>
            )}
          </h1>
          {isLayoutsTab && (
            <p className="mt-3 font-tenor text-muted max-w-xl leading-relaxed">
              Grouped by residence pair: 2BHK L1 - R1, 3BHK L3 - R3, and 3BHK+ L2 - R2, with Sun and Site maps in a dedicated section.
            </p>
          )}
        </div>

        {/* Tabs Layer */}
        <div className="grid grid-cols-2 md:flex bg-marble/50 p-1 rounded-2xl md:rounded-full border border-marble w-full md:w-auto gap-1">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setLightboxIndex(null);
              }}
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
        {isLayoutsTab ? (
          <div className="space-y-12 md:space-y-14">
            {layoutSectionsWithIndex.map((section, sectionIndex) => (
              <section key={section.id}>
                <div className="mb-6 md:mb-8 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-josefin text-[10px] uppercase tracking-[0.2em] text-bronze mb-2">
                      Layout Group {String(sectionIndex + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-cormorant text-3xl md:text-4xl text-primary leading-tight">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                  {section.items.map((item, i) => (
                    <motion.div
                      key={`${section.id}-${item.src}`}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.38, delay: i * 0.05 }}
                      onClick={() => setLightboxIndex(item.lightboxIndex)}
                      className="group border border-marble bg-bg-secondary p-4 md:p-5 cursor-pointer"
                    >
                      <div className="relative w-full aspect-[16/11] overflow-hidden bg-marble">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 30vw"
                          quality={74}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-5 pb-1">
                        <h3 className="font-cormorant text-2xl md:text-[30px] text-primary leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-josefin text-[10px] uppercase tracking-[0.2em] text-muted">Tap to expand</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {images.map((src, i) => (
                <motion.div
                  key={`${activeTab}-${i}-${src}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setLightboxIndex(i)}
                  className="relative w-full aspect-[4/5] bg-marble overflow-hidden cursor-pointer group"
                >
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close full image"
            >
              <X size={32} />
            </button>

            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 text-white/50 hover:text-white transition-colors"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={42} />
            </button>

            <div
              className="relative w-[94vw] max-w-6xl h-[82vh]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={isLayoutsTab ? (flattenedLayoutItems[lightboxIndex]?.title ?? `Aura Heights Layout ${lightboxIndex + 1}`) : `Aura Heights ${activeTab} ${lightboxIndex + 1}`}
                fill
                quality={88}
                sizes="94vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 text-white/50 hover:text-white transition-colors"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={42} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Put a margin above footer for spacing */}
      <div className="mt-32 w-full">
        <Footer />
      </div>
    </div>
  );
}
