"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    unit: "",
    message: "",
  });

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
            <form action="#" method="POST" className="space-y-8">
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
                    className="w-full bg-transparent border-b border-marble py-4 font-tenor text-primary focus:outline-none focus:border-bronze transition-colors peer"
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
                    className="w-full bg-transparent border-b border-marble py-4 font-tenor text-primary focus:outline-none focus:border-bronze transition-colors peer"
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

              <div className="relative group">
                <select 
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={e => setFormData({...formData, unit: e.target.value})}
                  className="w-full bg-transparent border-b border-marble py-4 font-tenor text-primary focus:outline-none focus:border-bronze transition-colors peer appearance-none"
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="2BHK">2BHK Luxury Series</option>
                  <option value="3BHK">3BHK Premium Suite</option>
                  <option value="Undecided">Undecided</option>
                </select>
                <label 
                  htmlFor="unit" 
                  className={`absolute left-0 tracking-widest uppercase transition-all duration-300 font-josefin 
                    ${formData.unit ? "-top-4 text-[10px] text-muted" : "top-4 text-xs text-muted peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze"}
                  `}
                >
                  Unit of Interest
                </label>
                {/* Custom dropdown arrow */}
                <div className="absolute right-0 top-6 pointer-events-none border-t-[5px] border-t-muted border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent"></div>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  name="message" 
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-b border-marble py-4 font-tenor text-primary focus:outline-none focus:border-bronze transition-colors peer resize-none h-32"
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="font-josefin uppercase text-xs tracking-[0.2em] rounded-full border border-bronze px-12 py-4 text-white bg-bronze transition-shadow hover:shadow-[0_0_20px_rgba(184,137,42,0.4)] w-full md:w-auto mt-4"
              >
                Submit Request
              </motion.button>
            </form>
          </div>

          {/* Right: Direct Contact */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center gap-12 lg:pl-12 lg:border-l border-marble/50">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4 text-bronze">
                <Phone size={24} strokeWidth={1.5} />
                <h3 className="font-cormorant text-2xl text-primary">Direct Call</h3>
              </div>
              <p className="font-tenor text-muted mb-2">Speak to our sales director directly.</p>
              <a href="tel:+910000000000" className="font-josefin text-lg tracking-widest text-primary hover:text-bronze transition-colors block">
                +91 00000 00000
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4 text-bronze">
                <MessageCircle size={24} strokeWidth={1.5} />
                <h3 className="font-cormorant text-2xl text-primary">WhatsApp</h3>
              </div>
              <p className="font-tenor text-muted mb-2">Get brochure & floor plans instantly.</p>
              <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="font-josefin text-lg tracking-widest text-primary hover:text-bronze transition-colors block">
                Message Us
              </a>
            </motion.div>

          </div>

        </div>
        </div>{/* end glass plate */}
      </div>
    </section>
  );
}
