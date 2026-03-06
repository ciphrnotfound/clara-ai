"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

const cabinetGrotesk = localFont({
  src: "../../public/fonts/CabinetGrotesk_Complete/Fonts/WEB/fonts/CabinetGrotesk-Variable.woff2",
  display: "swap",
  variable: "--font-cabinet",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Hide navbar and footer on these routes
  const hideNavAndFooter = pathname?.startsWith('/dashboard') || 
                           pathname?.startsWith('/signup') || 
                           pathname?.startsWith('/signin');

  return (
    <html lang="en">
      <body className={`${cabinetGrotesk.className} antialiased min-h-screen flex flex-col bg-black text-white`}>
        {!hideNavAndFooter && <Navbar />}
        <main className="flex-1">
          {children}
        </main>
        {!hideNavAndFooter && <Footer />}
      </body>
    </html>
  );
}
