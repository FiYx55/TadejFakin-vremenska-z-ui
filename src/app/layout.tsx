/**
 * Root Layout Component
 * 
 * Main layout component for the VremenskaPro application.
 * Provides the base HTML structure, global styling, and common layout elements.
 * 
 * Features:
 * - Inter font loading for consistent typography
 * - Global CSS styling and Tailwind CSS setup
 * - Navbar and Footer components for consistent layout
 * - Flex layout for sticky footer design
 * - Slovenian weather app metadata
 * 
 * @layout
 * @author VremenskaPro Team
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/** Inter font configuration for the application */
const inter = Inter({ subsets: ["latin"] });

/** Application metadata for SEO and browser display */
export const metadata: Metadata = {
  title: "VremenskaPro",
  description: "Vremenska aplikacija za Slovenijo z naprednimi funkcijami",
};

/**
 * Root Layout Component
 * 
 * Provides the main HTML structure and layout for all pages in the application.
 * Includes navigation, main content area, and footer with responsive design.
 * 
 * @param props - Layout props
 * @param props.children - Child components/pages to render in the main content area
 * @returns JSX element containing the complete page layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
