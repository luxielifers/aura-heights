"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";

const PHONE_DISPLAY = "+91 94123 68618";
const PHONE_HREF = "tel:+919412368618";
const WHATSAPP_NUMBER = "919412368618";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20Aura%20Heights.`;
const UNIT_OPTIONS = ["2BHK", "3BHK", "3BHK+", "Undecided"];
const FORMSPREE_CONTACT = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    unit: "",
    message: "",
  });
  const [submitNotice, setSubmitNotice] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [unitMenuOpen, setUnitMenuOpen] = useState(false);
  const unitMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (unitMenuRef.current && !unitMenuRef.current.contains(event.target as Node)) {
        setUnitMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setUnitMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.unit) {
      setSubmitNotice("Please select your unit of interest before submitting.");
      return;
    }

    // If Formspree is not yet configured, guide user to WhatsApp
    if (!FORMSPREE_CONTACT || FORMSPREE_CONTACT.startsWith("REPLACE_")) {
      setSubmitNotice("Our online form will be live shortly. Please reach us via Direct Call or WhatsApp in the meantime.");
      return;
    }

    setSubmitStatus("submitting");
    setSubmitNotice("");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_CONTACT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          unit: formData.unit,
          message: formData.message || undefined,
          _subject: `Private Viewing Request — Aura Heights (${formData.unit})`,
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setSubmitNotice("Thank you! We’ll reach out shortly to schedule your private viewing.");
        setFormData({ name: "", phone: "", unit: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitNotice("Something went wrong. Please try WhatsApp or call us directly.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-bg-secondary/80 backdrop-blur-3xl relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Heading glass card */}
        <div
          className="mb-10 max-w-3xl mx-auto rounded-[2rem] px-10 py-10 md:px-16 md:py-14 flex flex-col items-center justify-center text-center"
          style={{
            background: "rgba(250,247,242,0.55)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(184,137,42,0.18)",
            boxShadow: "0 12px 60px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          <div className="mb-6 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
            <div className="w-12 h-[1px] bg-bronze mx-auto mb-4"></div>
            Private Viewing
          </div>
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
            Schedule your <span className="italic text-bronze-light">Experience</span>
          </h2>
        </div>

        {/* Glassmorphism content plate */}
        <div
          className="max-w-6xl mx-auto rounded-[2.5rem] px-8 py-12 md:px-14 md:py-16"
          style={{
            background: "rgba(250,247,242,0.55)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(184,137,42,0.18)",
            boxShadow: "0 12px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot */}
              <input type="text" name="_gotcha" style={{ display: "none" }} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-marble py-4 font-manrope text-primary focus:outline-none focus:border-bronze transition-colors peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-4 font-josefin text-xs tracking-widest text-muted uppercase transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    required
                    className="w-full bg-transparent border-b border-marble py-4 font-manrope text-primary focus:outline-none focus:border-bronze transition-colors peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="phone" 
                    className="absolute left-0 top-4 font-josefin text-xs tracking-widest text-muted uppercase transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              <div ref={unitMenuRef} className="relative group">
                <input type="hidden" name="unit" value={formData.unit} />
                <button
                  id="unit"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={unitMenuOpen}
                  onClick={() => setUnitMenuOpen((prev) => !prev)}
                  className="w-full bg-transparent border-b border-marble pt-8 pb-3 pr-9 text-left font-manrope text-primary focus:outline-none focus:border-bronze transition-all duration-300"
                >
                  <span className={formData.unit ? "text-primary" : "text-muted/75"}>
                    {formData.unit || "Select your preferred residence"}
                  </span>
                </button>

                <label
                  htmlFor="unit"
                  className={`absolute left-0 top-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 font-josefin pointer-events-none ${
                    formData.unit || unitMenuOpen ? "text-bronze" : "text-muted"
                  }`}
                >
                  Unit of Interest
                </label>

                <motion.div
                  className="absolute right-0 top-7 pointer-events-none"
                  animate={{ rotate: unitMenuOpen ? 180 : 0, y: unitMenuOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-muted" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute left-0 right-0 -bottom-[1px] h-[1px] bg-bronze"
                  initial={false}
                  animate={{ scaleX: unitMenuOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />

                <AnimatePresence>
                  {unitMenuOpen && (
                    <motion.div
                      role="listbox"
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute left-0 right-0 top-[calc(100%+0.7rem)] z-30 overflow-hidden rounded-2xl border border-marble/90 bg-bg/95 backdrop-blur-xl shadow-[0_20px_55px_rgba(0,0,0,0.12)]"
                    >
                      <div className="py-1.5">
                        {UNIT_OPTIONS.map((option) => {
                          const isActive = formData.unit === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onClick={() => {
                                setFormData({ ...formData, unit: option });
                                setUnitMenuOpen(false);
                                setSubmitNotice("");
                              }}
                              className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                                isActive ? "bg-bronze/10 text-bronze" : "text-primary hover:bg-marble/70"
                              }`}
                            >
                              <span className="font-josefin text-[10px] tracking-[0.2em] uppercase">{option}</span>
                              <span
                                className={`h-2.5 w-2.5 rounded-full border ${
                                  isActive ? "border-bronze bg-bronze" : "border-marble"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  name="message" 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-marble py-4 font-manrope text-primary focus:outline-none focus:border-bronze transition-colors peer resize-none h-32"
                  placeholder=" "
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 font-josefin text-xs tracking-widest text-muted uppercase transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                >
                  Message (Optional)
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={submitStatus === "submitting"}
                whileHover={submitStatus !== "submitting" ? { scale: 1.02 } : {}}
                whileTap={submitStatus !== "submitting" ? { scale: 0.98 } : {}}
                className="font-josefin uppercase text-xs tracking-[0.2em] rounded-full border border-bronze px-12 py-4 text-white bg-bronze transition-all hover:shadow-[0_0_20px_rgba(184,137,42,0.4)] w-full md:w-auto mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitStatus === "submitting" ? "Sending…" : submitStatus === "success" ? "Request Sent ✓" : "Submit Request"}
              </motion.button>

              {submitNotice ? (
                <p className={`font-manrope text-sm ${submitStatus === "success" ? "text-[#4A7C59]" : submitStatus === "error" ? "text-[#A84332]" : "text-muted"}`}>
                  {submitNotice}
                </p>
              ) : null}
            </form>
          </div>

          {/* Right: Direct Contact */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center gap-12 lg:pl-12 lg:border-l border-marble/50">
            
            <motion.a
              href={PHONE_HREF}
              aria-label="Call Aura Heights sales"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="block rounded-2xl border border-marble/60 bg-bg/45 p-6 md:p-7 transition-colors hover:border-bronze/60 hover:bg-bg/65"
            >
              <div className="flex items-center gap-4 mb-4 text-bronze">
                <Phone size={24} strokeWidth={1.5} />
                <h3 className="font-cormorant text-2xl text-primary">Direct Call</h3>
              </div>
              <p className="font-manrope text-muted mb-2">Speak to our sales director directly.</p>
              <p className="font-josefin text-lg tracking-widest text-primary">
                {PHONE_DISPLAY}
              </p>
            </motion.a>

            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Aura Heights on WhatsApp"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block rounded-2xl border border-marble/60 bg-bg/45 p-6 md:p-7 transition-colors hover:border-bronze/60 hover:bg-bg/65"
            >
              <div className="flex items-center gap-4 mb-4 text-bronze">
                <MessageCircle size={24} strokeWidth={1.5} />
                <h3 className="font-cormorant text-2xl text-primary">WhatsApp</h3>
              </div>
              <p className="font-manrope text-muted mb-2">Get brochure & floor plans instantly.</p>
              <p className="font-josefin text-lg tracking-widest text-primary">
                Message Us
              </p>
            </motion.a>

          </div>

        </div>
        </div>{/* end glass plate */}
      </div>
    </section>
  );
}
