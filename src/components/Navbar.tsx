"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type NavSubItem = {
  name: string;
  href: string;
  external?: boolean;
};

type NavItem = {
  name: string;
  href: string;
  children?: NavSubItem[];
};

const navLinks: NavItem[] = [
  { name: "Residences", href: "/#residences" },
  {
    name: "Amenities",
    href: "/#amenities",
    children: [{ name: "View All Amenities", href: "/amenities" }],
  },
  {
    name: "Gallery",
    href: "/#gallery",
    children: [
      { name: "View Full Gallery", href: "/gallery" },
      { name: "View Layouts", href: "/gallery?tab=Layouts" },
    ],
  },
  { name: "Location", href: "/#location" },
  {
    name: "Contact",
    href: "/#contact",
    children: [
      {
        name: "WhatsApp",
        href: "https://wa.me/919412368618?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Aura%20Heights%20and%20available%20units.%20Please%20share%20details.",
        external: true,
      },
      { name: "Call", href: "tel:+919412368618" },
      { name: "Fill the Form", href: "/#contact" },
    ],
  },
];

export default function Navbar({ isPreloading = false }: { isPreloading?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goToHref = (href: string) => {
    setMenuOpen(false);

    if (href.startsWith("https://")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    if (href.startsWith("tel:")) {
      window.location.assign(href);
      return;
    }

    if (href === "/gallery") {
      window.location.assign(href);
      return;
    }

    const targetId = href.split("#")[1];
    if (!targetId) {
      window.location.assign(href);
      return;
    }

    if (window.location.pathname !== "/") {
      window.location.assign(href);
      return;
    }

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-bg/85 backdrop-blur-md py-4 shadow-sm text-primary" : "bg-transparent py-6 text-white"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <div 
              id="nav-logo" 
              className={cn("relative w-12 h-12 md:w-16 md:h-16 transition-all duration-500", isPreloading && "opacity-0")}
            >
              <Image 
                src="/images/logowithoutbg.png" 
                alt="Aura Heights Logo"
                fill
                sizes="(max-width: 768px) 48px, 64px"
                className={cn(
                  "object-contain transition-all duration-500",
                  scrolled ? "mix-blend-multiply" : "brightness-0 invert opacity-90"
                )} 
              />
            </div>
          </Link>

          {/* Right CTA */}
          <div className="flex items-center gap-4 z-50 relative">
            <motion.a 
              href="/#contact"
              onClick={(e) => {
                const el = document.getElementById('contact');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-5 md:px-8 py-3.5 transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)]"
            >
              Contact Us
            </motion.a>

            <div className={cn("hidden md:block h-6 w-px", scrolled || menuOpen ? "bg-primary/25" : "bg-white/35")} />

            <button 
              className={cn(
                "transition-colors duration-300",
                scrolled || menuOpen ? "text-primary" : "text-[#FAF7F2]"
              )}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-sm"
          >
            <div className="h-full pt-28 md:pt-32 pb-8">
              <div className="container mx-auto px-6 md:px-12 h-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
                <nav className="flex flex-col justify-center">
                  <div className="space-y-3 md:space-y-4">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 + i * 0.05 }}
                        className="border-b border-marble/60 pb-3"
                      >
                        <button
                          onClick={() => goToHref(link.href)}
                          className="w-full text-left group"
                        >
                          <div className="flex items-end gap-4">
                            <span className="font-josefin text-[10px] uppercase tracking-[0.2em] text-muted">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-cormorant text-3xl md:text-5xl text-primary group-hover:text-bronze transition-colors leading-none">
                              {link.name}
                            </span>
                          </div>
                        </button>

                        {link.children && (
                          <div className="mt-3 ml-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-l border-marble/70 pl-4">
                            {link.children.map((child) => (
                              <button
                                key={child.name}
                                onClick={() => goToHref(child.href)}
                                className="font-josefin uppercase text-[10px] md:text-[11px] tracking-[0.2em] text-[#1f1f1f]/75 hover:text-bronze transition-colors"
                              >
                                {child.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="hidden md:block relative overflow-hidden border border-marble/70 h-full min-h-[540px]"
                >
                  <Image
                    src="/images/gallery/exterior/exteriorview.png"
                    alt="Aura Heights exterior"
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute left-6 bottom-6">
                    <p className="font-josefin text-[10px] uppercase tracking-[0.24em] text-white/80">Aura Heights</p>
                    <p className="font-cormorant text-3xl italic text-white">Rajpur, Dehradun</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
