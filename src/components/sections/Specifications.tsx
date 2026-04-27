"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type SpecIconName =
  | "flooring"
  | "kitchen"
  | "doors"
  | "walls"
  | "ceilings"
  | "bathroom"
  | "electrical"
  | "power"
  | "ac";

type SpecRow = {
  id: string;
  title: string;
  icon: SpecIconName;
  points: string[];
};

type SpecCategory = {
  label: string;
  rows: SpecRow[];
};

const specCategories: SpecCategory[] = [
  {
    label: "Interiors & Finishes",
    rows: [
      {
        id: "flooring",
        title: "Flooring",
        icon: "flooring",
        points: [
          "Living room, kitchen, and common areas: Italian or imported marble.",
          "Master bedroom and dress area: laminated wooden flooring.",
          "Secondary rooms: vitrified tiles or laminated wooden flooring.",
          "Toilets: anti-skid tiles.",
          "Kitchen countertop: designer quartz stone.",
          "Balconies: granite or designer tiles.",
          "Staircase and lift corridor: granite stone.",
        ],
      },
      {
        id: "dado-walls",
        title: "Dado & Walls",
        icon: "walls",
        points: [
          "POP or putty punning with plastic emulsion paint in all rooms.",
          "Premium tile and stone combinations up to ceiling height in toilets.",
          "Weather-resistant exterior grade paint on balconies.",
        ],
      },
      {
        id: "ceilings",
        title: "Ceilings",
        icon: "ceilings",
        points: [
          "False ceiling with plastic emulsion paint in bedrooms, kitchen, and bathrooms.",
          "Designer false ceiling in living, dining, and family lounge.",
          "Weather-resistant exterior paint finish on balconies.",
        ],
      },
    ],
  },
  {
    label: "Kitchen & Bathrooms",
    rows: [
      {
        id: "kitchen-fittings",
        title: "Kitchen & Fittings",
        icon: "kitchen",
        points: [
          "Complete modular kitchen with hob, chimney, geyser, and RO.",
          "Countertop: premium granite or quartz.",
          "Noise-dampening sink with GROHE or KOHLER CP fittings.",
        ],
      },
      {
        id: "bathroom",
        title: "Bathroom",
        icon: "bathroom",
        points: [
          "Premium sanitary ware and CP fittings throughout.",
          "Glass cubicle, wall-mounted vanity, mirror, exhaust fan, and geyser in all bathrooms.",
        ],
      },
    ],
  },
  {
    label: "Doors, Windows & Millwork",
    rows: [
      {
        id: "doors-windows",
        title: "Doors & Windows",
        icon: "doors",
        points: [
          "8ft main entrance door in polished hardwood with Godrej or Yale security lock.",
          "Internal doors with seasoned hardwood frames and premium hardware.",
          "Aluminium windows at 8ft lintel level with toughened balcony glass.",
        ],
      },
    ],
  },
  {
    label: "Technology & Services",
    rows: [
      {
        id: "electrical",
        title: "Electrical",
        icon: "electrical",
        points: [
          "Copper wiring in concealed conduits with protective MCB by Finolex or Polycab.",
          "Premium modular switches and sockets by Legrand or equivalent.",
          "Provision for TV, telephone, and internet points in all rooms.",
        ],
      },
      {
        id: "lifts-power",
        title: "Lifts & Power",
        icon: "power",
        points: [
          "High-speed access-controlled lifts by Schindler or equivalent.",
          "100% power backup for all common areas.",
          "Adequate apartment backup load available at extra charge.",
          "EV charging station at stilt parking level.",
        ],
      },
      {
        id: "ac-others",
        title: "Air Conditioning & Wardrobes",
        icon: "ac",
        points: [
          "Split AC provision in all bedrooms.",
          "Cassette AC provision in living area.",
          "Modular wardrobes up to 8ft with premium hardware in all bedrooms.",
        ],
      },
    ],
  },
];

// Flatten for accordion state management
const specificationRows: SpecRow[] = specCategories.flatMap((c) => c.rows);

function SpecIcon({ name }: { name: SpecIconName }) {
  const common = "h-5 w-5 md:h-6 md:w-6 text-[#B8892A]";

  if (name === "flooring") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 8L12 4L20 8L12 12L4 8Z" />
        <path d="M4 16L12 12L20 16L12 20L4 16Z" />
      </svg>
    );
  }
  if (name === "kitchen") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 10H20" />
        <path d="M7 10V7H17V10" />
        <path d="M6 10V18H18V10" />
      </svg>
    );
  }
  if (name === "doors") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7 4H17V20H7V4Z" />
        <path d="M7 4L4 6V18L7 20" />
        <path d="M14 12H14.01" />
      </svg>
    );
  }
  if (name === "walls") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 6H20V18H4V6Z" />
        <path d="M9 6V18" />
        <path d="M15 6V18" />
      </svg>
    );
  }
  if (name === "ceilings") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 7H21" />
        <path d="M6 7V13" />
        <path d="M12 7V16" />
        <path d="M18 7V13" />
      </svg>
    );
  }
  if (name === "bathroom") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 12H20" />
        <path d="M6 12V16C6 18 7.5 20 9.5 20H14.5C16.5 20 18 18 18 16V12" />
        <path d="M8 10V8" />
      </svg>
    );
  }
  if (name === "electrical") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M13 2L6 13H12L11 22L18 11H12L13 2Z" />
      </svg>
    );
  }
  if (name === "power") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 2V10" />
        <path d="M6.2 5.8C3.5 8.5 3.5 13 6.2 15.8C8.9 18.5 13.4 18.5 16.2 15.8C18.9 13 18.9 8.5 16.2 5.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12H20" />
      <path d="M12 4V20" />
      <path d="M16 8L20 12L16 16" />
    </svg>
  );
}

export default function Specifications() {
  const [openId, setOpenId] = useState<string>(specificationRows[0].id);
  const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section
      id="specifications"
      className="relative py-24 md:py-32 border-y"
      style={{
        background: "linear-gradient(180deg, #FCFAF7 0%, #F6F1E9 100%)",
        borderColor: "rgba(196,160,96,0.20)",
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-16">
          <p className="font-josefin text-[10px] uppercase tracking-[0.24em] text-muted mb-3">Specifications</p>
          <h2 className="font-cormorant text-5xl md:text-7xl text-primary leading-[0.95]">Crafted in Detail</h2>
          <p className="mt-5 max-w-3xl font-tenor text-base md:text-[1.08rem] text-primary/78 leading-[1.85]">
            Every element at Aura Heights reflects a commitment to excellence.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-10 md:space-y-14">
          {specCategories.map((category) => (
            <div key={category.label}>
              {/* Category label */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-josefin text-[10px] uppercase tracking-[0.22em] text-bronze">
                  {category.label}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#C4A06033] to-transparent" />
              </div>

              {/* Accordion rows for this category */}
              <div className="border-t border-[#C4A06040]">
                {category.rows.map((row) => {
                  const isOpen = openId === row.id;
                  const rowWrapperClass = isOpen
                    ? "my-3 rounded-2xl border border-[#C4A06055] bg-[#F1EBE2]"
                    : "border-b border-[#C4A06040]";

                  return (
                    <motion.div
                      key={row.id}
                      layout
                      transition={{ layout: { duration: 0.4, ease: motionEase } }}
                      className={rowWrapperClass}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId((prev) => (prev === row.id ? "" : row.id))}
                        className="w-full px-3 md:px-5 py-5 md:py-6 text-left flex items-center justify-between gap-5"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-4">
                          <SpecIcon name={row.icon} />
                          <span className="font-tenor text-[18px] md:text-[20px] text-primary/90">{row.title}</span>
                        </div>

                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.28, ease: motionEase }}
                          className="font-josefin text-[1.35rem] leading-none text-bronze min-w-[1.2rem] text-right"
                          aria-hidden
                        >
                          {isOpen ? "−" : "+"}
                        </motion.span>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{
                          height: { duration: 0.42, ease: motionEase },
                          opacity: { duration: isOpen ? 0.3 : 0.2, ease: "easeOut" },
                        }}
                        className="overflow-hidden"
                        aria-hidden={!isOpen}
                      >
                        <motion.div
                          initial={false}
                          animate={{
                            y: isOpen ? 0 : -8,
                            filter: isOpen ? "blur(0px)" : "blur(2px)",
                          }}
                          transition={{ duration: 0.34, ease: motionEase }}
                          className="mb-5 rounded-2xl border border-[#E5D9C8] bg-[#F1EBE2] px-4 md:px-6 py-5"
                        >
                          <ul className="pl-2 md:pl-8 space-y-3">
                            {row.points.map((point) => (
                              <li key={point} className="flex items-start gap-3 font-tenor text-[15px] md:text-[16px] leading-8 text-primary/88">
                                <span className="mt-2.5 h-1 w-1 rounded-full bg-[#B8892A] flex-shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}