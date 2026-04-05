"use client";

import { motion } from "framer-motion";

const highlights = [
  { name: "Max Super Speciality Hospital", distance: "5 Min" },
  { name: "Pacific Mall", distance: "10 Min" },
  { name: "Doon School", distance: "15 Min" },
  { name: "Jolly Grant Airport", distance: "45 Min" },
  { name: "Mussoorie", distance: "60 Min" },
];

export default function Location() {
  return (
    <section id="location" className="py-24 md:py-32 bg-bg/60 backdrop-blur-3xl relative z-20 border-t border-marble/30">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Map */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative w-full aspect-square md:aspect-[4/3] bg-marble overflow-hidden group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110204.66191720875!2d77.94709405469446!3d30.325550881954316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c356c888af%3A0x4c3562c032518799!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(30%)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Aura Heights Location"
              ></iframe>
              
              {/* Interactive Overlay linking to proper URL */}
              <a 
                href="https://maps.app.goo.gl/5x5LdfC88WhJtFwK6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center cursor-pointer"
              >
                <div className="font-josefin uppercase text-[10px] tracking-[0.2em] rounded-full border border-bronze bg-bronze text-white px-8 py-3.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(184,137,42,0.4)]">
                  Open in Maps
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right: Highlights Content */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6 font-josefin tracking-[0.25em] text-xs uppercase" style={{ color: "var(--color-bronze)" }}>
              <div className="w-12 h-[1px] bg-bronze mb-4"></div>
              Location & Neighbourhood
            </div>
            
            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-primary leading-tight mb-12">
              Connected to the <br />
              <span className="italic text-bronze-light">Heart of Dehradun</span>
            </h2>

            <div className="relative">
              {/* Vertical line connecting elements */}
              <div className="absolute left-[3px] top-[10px] bottom-[10px] w-px bg-marble"></div>
              
              <ul className="space-y-8 relative">
                {highlights.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                    className="flex justify-between items-center pl-8"
                  >
                    <span className="absolute left-[0px] w-2 h-2 rounded-full bg-bronze transform -translate-x-[0.5px]"></span>
                    <span className="font-tenor text-lg text-primary">{item.name}</span>
                    <span className="font-josefin uppercase text-xs tracking-widest text-muted whitespace-nowrap">{item.distance}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
