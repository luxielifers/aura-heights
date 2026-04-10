import type { Metadata } from "next";
import { Cormorant_Garamond, Tenor_Sans, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tenor = Tenor_Sans({
  variable: "--font-tenor",
  subsets: ["latin"],
  weight: ["400"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Heights | Luxury Residences",
  description: "Where Elevation Meets Elegance. Premium digital showroom for Aura Heights.",
  icons: {
    icon: "/images/faviconlogo.png",
    shortcut: "/images/faviconlogo.png",
    apple: "/images/faviconlogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${tenor.variable} ${josefin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
