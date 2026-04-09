"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import AmenityIcon from "@/components/AmenityIcon";
import { amenities } from "@/lib/amenities";

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 mb-12 md:mb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-josefin text-xs tracking-widest text-muted hover:text-bronze transition-colors uppercase mb-6"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-end">
          <div>
            <p className="font-josefin tracking-[0.24em] text-xs uppercase text-bronze mb-3">All Amenities</p>
            <h1 className="font-cormorant text-5xl md:text-6xl text-primary leading-tight">
              Every <span className="italic text-bronze-light">Privilege</span> Included
            </h1>
          </div>
          <div className="relative hidden lg:block aspect-[4/3] border border-marble overflow-hidden">
            <Image
              src="/images/gallery/exterior/exteriorview.png"
              alt="Aura Heights amenity preview"
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {amenities.map((item, idx) => (
            <article key={idx} className="bg-marble p-8 border border-marble hover:border-bronze transition-colors text-center">
              <div className="mx-auto mb-5 w-fit p-3 rounded-full bg-bg border border-bronze/30">
                <AmenityIcon icon={item.icon} className="w-10 h-10 text-black" />
              </div>
              <h2 className="font-cormorant text-3xl text-primary mb-3">{item.title}</h2>
              <p className="font-tenor text-muted text-sm leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20 w-full">
        <Footer />
      </div>
    </div>
  );
}
