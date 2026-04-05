"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Residences", href: "/#residences" },
  { name: "Amenities", href: "/#amenities" },
  { 
    name: "Gallery", 
    href: "/#gallery",
    dropdown: [
      { name: "Quick View", href: "/#gallery" },
      { name: "Full Gallery", href: "/gallery" }
    ]
  },
  { name: "Location", href: "/#location" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar({ isPreloading = false }: { isPreloading?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group py-2"
              >
                <a 
                  href={link.href}
                  onClick={(e) => {
                    const targetId = link.href.split('#')[1];
                    const el = targetId ? document.getElementById(targetId) : null;
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="font-josefin uppercase text-xs tracking-[0.2em] hover:text-bronze transition-colors flex items-center gap-1 group/link relative"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bronze transition-all duration-300 group-hover/link:w-full"></span>
                </a>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-bg/90 backdrop-blur-md border border-marble p-4 flex flex-col gap-4 min-w-[160px] shadow-lg">
                      {link.dropdown.map((drop) => (
                        <a
                          key={drop.name}
                          href={drop.href}
                          onClick={(e) => {
                            const targetId = drop.href.split('#')[1];
                            const el = targetId ? document.getElementById(targetId) : null;
                            if (el) {
                              e.preventDefault();
                              el.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className="font-josefin uppercase text-[10px] tracking-[0.2em] text-primary hover:text-bronze transition-colors"
                        >
                          {drop.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

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
              className="hidden md:inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-8 py-3.5 transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)]"
            >
              Book a Viewing
            </motion.a>

            <button 
              className="lg:hidden text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-bg transition-transform duration-500 flex flex-col justify-center items-center",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link, i) => (
            <div key={link.name} className="flex flex-col items-center">
              <a 
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const targetId = link.href.split('#')[1];
                  setTimeout(() => {
                    if (targetId) {
                      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.location.href = link.href;
                    }
                  }, 300);
                }}
                className="font-josefin uppercase text-xl tracking-[0.2em] text-primary hover:text-bronze transition-colors flex items-center gap-2"
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease-out ${mobileMenuOpen ? i * 100 + 300 : 0}ms`
                }}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={18} />}
              </a>
              
              {link.dropdown && (
                <div className="flex flex-col items-center gap-4 mt-4 overflow-hidden" 
                     style={{
                        maxHeight: mobileMenuOpen ? '200px' : '0px',
                        opacity: mobileMenuOpen ? 1 : 0,
                        transition: `all 0.5s ease-out ${mobileMenuOpen ? i * 100 + 400 : 0}ms`
                     }}>
                  {link.dropdown.map((drop, j) => (
                    <a
                      key={drop.name}
                      href={drop.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        const targetId = drop.href.split('#')[1];
                        setTimeout(() => {
                            if (targetId) {
                              document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                            } else {
                              window.location.href = drop.href;
                            }
                        }, 300);
                      }}
                      className="font-josefin uppercase text-sm tracking-[0.2em] text-muted hover:text-bronze transition-colors"
                    >
                      — {drop.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="mt-6 font-josefin uppercase text-sm tracking-[0.2em] rounded-full border border-bronze px-8 py-4 text-white bg-bronze hover:shadow-[0_0_20px_rgba(184,137,42,0.4)] transition-all"
            style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${mobileMenuOpen ? navLinks.length * 100 + 300 : 0}ms`
            }}
          >
            Book a Viewing
          </a>
        </nav>
      </div>
    </>
  );
}
