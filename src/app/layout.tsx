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
    icon: [
      { url: "/favicon-for-app/favicon.ico" },
      { url: "/favicon-for-app/icon1.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-for-app/icon0.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-for-app/favicon.ico",
    apple: [
      { url: "/favicon-for-app/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon-for-app/manifest.json",
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
