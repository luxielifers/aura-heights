import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-bg py-16 border-t border-marble text-center md:text-left">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-4">
            <Image 
              src="/images/logowithoutbg.png" 
              alt="Aura Heights Logo"
              width={64}
              height={64}
              className="object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity" 
            />
            <span className="font-cormorant text-2xl uppercase tracking-widest text-primary">Aura Heights</span>
          </div>
          <p className="font-josefin uppercase text-[10px] tracking-[0.2em] text-muted max-w-[250px]">
            Where Elevation Meets Elegance.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <nav className="flex flex-wrap justify-center gap-4 text-xs font-josefin uppercase tracking-[0.1em] text-muted">
            <Link href="#about" className="hover:text-bronze transition-colors">Overview</Link>
            <span>·</span>
            <Link href="#residences" className="hover:text-bronze transition-colors">Residences/Layouts</Link>
            <span>·</span>
            <Link href="#vision" className="hover:text-bronze transition-colors">Vision</Link>
            <span>·</span>
            <Link href="#specifications" className="hover:text-bronze transition-colors">Specifications</Link>
            <span>·</span>
            <Link href="#features" className="hover:text-bronze transition-colors">Features</Link>
            <span>·</span>
            <Link href="#gallery" className="hover:text-bronze transition-colors">Gallery</Link>
            <span>·</span>
            <Link href="#location" className="hover:text-bronze transition-colors">Location</Link>
            <span>·</span>
            <Link href="#contact" className="hover:text-bronze transition-colors">Contact</Link>
          </nav>

          <div className="flex flex-col md:flex-row items-center md:items-end gap-2 md:gap-8 font-tenor text-xs text-muted">
            <p>RERA Reg. No. UKREP10250000683 | All images are for representational purposes only.</p>
            <p>© 2026 Aura Heights. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Website built by
              <a
                href="https://luxiesites.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline leading-none transition-opacity hover:opacity-80"
                aria-label="LuxieSites"
              >
                <span className="font-cormorant font-bold text-base text-black">Luxie</span>
                <span className="font-cormorant font-bold italic text-base text-bronze-light">Sites</span>
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
