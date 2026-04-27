"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLenis } from "lenis/react";

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
  {
    name: "Overview",
    href: "/#about",
  },
  {
    name: "Residences/Layouts",
    href: "/#residences",
    children: [{ name: "View Layouts", href: "/gallery?tab=Layouts" }],
  },
  {
    name: "Specifications",
    href: "/#specifications",
  },
  {
    name: "Features",
    href: "/#features",
  },
  {
    name: "Gallery",
    href: "/#gallery",
    children: [{ name: "View Full Gallery", href: "/gallery" }],
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

const BROCHURE_FILE = "/AuraHeights_Brochure.pdf";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_BROCHURE = process.env.NEXT_PUBLIC_FORMSPREE_BROCHURE;

export default function Navbar({ isPreloading = false }: { isPreloading?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochureError, setBrochureError] = useState("");
  const [brochureForm, setBrochureForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [menuImageSrc, setMenuImageSrc] = useState("/images/gallery/exterior/fullbuildingevening.jpg");
  const [brochureSubmitting, setBrochureSubmitting] = useState(false);

  // Use Lenis to properly stop/start smooth scroll when modals are open.
  // Setting document.body.style.overflow = "hidden" conflicts with Lenis
  // and causes scroll to stop working after modal close.
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen || brochureModalOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      // Always restore on unmount
      lenis.start();
    };
  }, [menuOpen, brochureModalOpen, lenis]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setBrochureModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/gallery");
  }, [router]);

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

    const targetId = href.split("#")[1];
    if (targetId && pathname === "/") {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `/#${targetId}`);
        return;
      }
    }

    if (!targetId) {
      router.push(href);
      return;
    }

    router.push(href);
  };

  const openBrochureModal = () => {
    setMenuOpen(false);
    setBrochureError("");
    setBrochureModalOpen(true);
  };

  const closeBrochureModal = () => {
    setBrochureModalOpen(false);
    setBrochureError("");
  };

  const handleBrochureSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanedName = brochureForm.name.trim();
    const cleanedEmail = brochureForm.email.trim();
    const cleanedMobile = brochureForm.mobile.trim();

    if (!cleanedName) {
      setBrochureError("Please enter your name before opening the brochure.");
      return;
    }

    if (!/^\d{10}$/.test(cleanedMobile)) {
      setBrochureError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (cleanedEmail && !EMAIL_REGEX.test(cleanedEmail)) {
      setBrochureError("Please enter a valid email address or leave it blank.");
      return;
    }

    // Submit to Formspree in the background (fire-and-forget)
    if (FORMSPREE_BROCHURE && !FORMSPREE_BROCHURE.startsWith("REPLACE_")) {
      setBrochureSubmitting(true);
      try {
        await fetch(`https://formspree.io/f/${FORMSPREE_BROCHURE}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: cleanedName,
            email: cleanedEmail || undefined,
            mobile: cleanedMobile,
            _subject: "Brochure Download Request — Aura Heights",
          }),
        });
      } catch {
        // Silently fail — opening the brochure is more important
      } finally {
        setBrochureSubmitting(false);
      }
    }

    // Open the brochure regardless of form submission result
    const brochureWindow = window.open(BROCHURE_FILE, "_blank", "noopener,noreferrer");
    if (!brochureWindow) {
      window.location.assign(BROCHURE_FILE);
    }

    setBrochureModalOpen(false);
    setBrochureError("");
    setBrochureForm({ name: "", email: "", mobile: "" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-4 text-primary" : "bg-transparent py-6 text-white"
        )}
        style={{
          background: scrolled
            ? "linear-gradient(125deg, rgba(255,255,255,0.34) 0%, rgba(250,247,242,0.44) 58%, rgba(255,255,255,0.3) 100%)"
            : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(16px) saturate(135%)" : "blur(0px) saturate(100%)",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(135%)" : "blur(0px) saturate(100%)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.45)" : "1px solid rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 10px 34px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.35)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
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
                priority
                sizes="(max-width: 768px) 48px, 64px"
                className={cn(
                  "object-contain transition-all duration-500",
                  scrolled ? "mix-blend-multiply" : "brightness-0 invert opacity-90"
                )} 
              />
            </div>
          </Link>

          {/* Right CTA */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 z-50 relative">
            <motion.button
              type="button"
              onClick={openBrochureModal}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "inline-flex items-center justify-center font-josefin uppercase text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] rounded-full border px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 md:py-3.5 transition-colors",
                scrolled ? "border-bronze/70 text-bronze bg-bg/60 hover:bg-bronze hover:text-white" : "border-[#FAF7F2]/75 text-[#FAF7F2] bg-transparent hover:bg-[#FAF7F2] hover:text-primary"
              )}
            >
              <span className="sm:hidden">Brochure</span>
              <span className="hidden sm:inline">Download Brochure</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => goToHref("/#contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center font-josefin uppercase text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-3 sm:px-5 md:px-8 py-2.5 sm:py-3 md:py-3.5 transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)]"
            >
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Contact Us</span>
            </motion.button>

            <button
              className={cn(
                "relative inline-flex h-11 items-center pl-5 transition-colors duration-300",
                scrolled || menuOpen ? "text-primary" : "text-[#FAF7F2]"
              )}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1/2 h-7 w-px -translate-y-1/2 transition-opacity duration-300",
                  scrolled || menuOpen ? "bg-primary/45" : "bg-white/65"
                )}
              />
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <div aria-hidden className="flex flex-col items-start gap-2.5">
                <motion.span
                  className="block h-px w-12 sm:w-14 md:w-28 bg-current origin-center"
                  animate={
                    menuOpen
                      ? { scaleX: [1, 0.42, 0.42], rotate: [0, 0, 38], y: [0, 0, 4] }
                      : { scaleX: [0.42, 0.42, 1], rotate: [38, 0, 0], y: [4, 0, 0] }
                  }
                  transition={{ duration: 0.26, times: [0, 0.55, 1], ease: "easeOut" }}
                />
                <motion.span
                  className="block h-px w-12 sm:w-14 md:w-28 bg-current origin-center"
                  animate={
                    menuOpen
                      ? { scaleX: [1, 0.42, 0.42], rotate: [0, 0, -38], y: [0, 0, -4] }
                      : { scaleX: [0.42, 0.42, 1], rotate: [-38, 0, 0], y: [-4, 0, 0] }
                  }
                  transition={{ duration: 0.26, times: [0, 0.55, 1], ease: "easeOut" }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {brochureModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm px-4"
            onClick={closeBrochureModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="mx-auto mt-24 md:mt-28 w-full max-w-xl rounded-[1.75rem] border border-marble/70 bg-bg px-6 sm:px-8 py-7 sm:py-8 shadow-[0_20px_70px_rgba(0,0,0,0.2)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-josefin text-[10px] uppercase tracking-[0.22em] text-bronze mb-3">Download Brochure</p>
                  <h3 className="font-cormorant text-3xl sm:text-4xl text-primary leading-tight">
                    Share your details
                  </h3>
                  <p className="mt-2 font-tenor text-sm text-muted">
                    Enter your name and mobile number. Email is optional.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeBrochureModal}
                  className="font-josefin uppercase text-[10px] tracking-[0.2em] text-muted hover:text-primary transition-colors"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleBrochureSubmit} className="mt-7 space-y-5">
                <div>
                  <label htmlFor="brochure-name" className="block font-josefin text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    Name *
                  </label>
                  <input
                    id="brochure-name"
                    type="text"
                    value={brochureForm.name}
                    onChange={(event) => {
                      setBrochureError("");
                      setBrochureForm((prev) => ({ ...prev, name: event.target.value }));
                    }}
                    className="w-full rounded-xl border border-marble bg-bg-secondary px-4 py-3 font-tenor text-primary placeholder:text-muted/70 focus:outline-none focus:border-bronze"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="brochure-email" className="block font-josefin text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    Email (Optional)
                  </label>
                  <input
                    id="brochure-email"
                    type="email"
                    value={brochureForm.email}
                    onChange={(event) => {
                      setBrochureError("");
                      setBrochureForm((prev) => ({ ...prev, email: event.target.value }));
                    }}
                    className="w-full rounded-xl border border-marble bg-bg-secondary px-4 py-3 font-tenor text-primary placeholder:text-muted/70 focus:outline-none focus:border-bronze"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="brochure-mobile" className="block font-josefin text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                    Mobile Number *
                  </label>
                  <input
                    id="brochure-mobile"
                    type="tel"
                    inputMode="numeric"
                    value={brochureForm.mobile}
                    onChange={(event) => {
                      setBrochureError("");
                      setBrochureForm((prev) => ({
                        ...prev,
                        mobile: event.target.value.replace(/\D/g, "").slice(0, 10),
                      }));
                    }}
                    className="w-full rounded-xl border border-marble bg-bg-secondary px-4 py-3 font-tenor text-primary placeholder:text-muted/70 focus:outline-none focus:border-bronze"
                    placeholder="10-digit mobile number"
                    required
                  />
                </div>

                {brochureError ? (
                  <p className="font-tenor text-sm text-[#A84332]">{brochureError}</p>
                ) : null}

                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={brochureSubmitting}
                    className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-6 py-3.5 transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)] disabled:opacity-60"
                  >
                    {brochureSubmitting ? "Sending…" : "Submit & Open Brochure"}
                  </button>
                  <button
                    type="button"
                    onClick={closeBrochureModal}
                    className="inline-flex items-center justify-center font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-marble bg-transparent text-primary px-6 py-3.5 hover:border-bronze hover:text-bronze transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                    src={menuImageSrc}
                    alt="Aura Heights exterior"
                    fill
                    priority={menuOpen}
                    quality={68}
                    unoptimized
                    sizes="50vw"
                    className="object-cover"
                    onError={() => {
                      if (menuImageSrc !== "/images/gallery/exterior/outside.jpg") {
                        setMenuImageSrc("/images/gallery/exterior/outside.jpg");
                      }
                    }}
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
