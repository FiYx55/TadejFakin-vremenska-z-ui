/**
 * Navbar Component
 * 
 * Main navigation component for the VremenskaPro application.
 * Provides responsive navigation with mobile hamburger menu and branding.
 * 
 * Features:
 * - VremenskaPro branding with weather emoji logo
 * - Responsive design (desktop horizontal menu, mobile hamburger)
 * - Navigation links to search and history pages
 * - Clean dark theme styling
 * - Smooth mobile menu toggle
 * 
 * @component
 * @author VremenskaPro Team
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Navbar Component
 * 
 * Renders the main navigation bar with responsive menu and branding.
 * Includes links to search and history pages with mobile-friendly hamburger menu.
 * 
 * @returns JSX element containing the navigation bar
 */
const Navbar = () => {
  /** Controls the visibility of the mobile menu */
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌤️</span>
            VremenskaPro
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/search">Iskanje</Link>
          <Link href="/history">Zgodovina</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          <Link href="/search" className="block py-2 px-4 text-sm hover:bg-gray-700">Iskanje</Link>
          <Link href="/history" className="block py-2 px-4 text-sm hover:bg-gray-700">Zgodovina</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
