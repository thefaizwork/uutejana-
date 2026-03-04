"use client";
import React, { useState } from 'react';

// ==========================================
// 🛠️ CONFIGURATION: EASY TO EDIT
// Add, remove, or modify your navigation links here.
// No need to dig through the complex code below!
// ==========================================
const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Campaigns', href: '#campaigns' },
  { name: 'About Us', href: '#about-us' },
  { name: 'Pages', href: '#pages' },
  { name: 'Blog', href: '/blogs' },
  { name: 'Contacts', href: '#contacts' },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Note: We removed the external font @import to prevent network lag. 
    // The component now relies on your app's global font or system sans-serif defaults.
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-[10%] h-20 flex items-center justify-between">
        
        {/* ============================== */}
        {/* 1. LOGO SECTION                */}
        {/* ============================== */}
        <a href="#home" className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity">
          {/* Logo Icon Background (Planetary Dark Blue) */}
          <div className="bg-[#334EAC] w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
            {/* Custom Sprout SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <path d="M12 22v-7l-3-3" />
              <path d="M12 15l3-3" />
              <path d="M9 12A5 5 0 0 1 9 2a5 5 0 0 1 5 5v5" />
              <path d="M15 12a5 5 0 0 0 5-10 5 5 0 0 0-5 5v5" />
            </svg>
          </div>
          {/* Logo Text */}
          <span className="text-[#334EAC] font-bold text-2xl tracking-tight">
            KidHope
          </span>
        </a>

        {/* ============================== */}
        {/* 2. DESKTOP NAVIGATION LINKS    */}
        {/* ============================== */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="text-[#334EAC] font-semibold text-[0.95rem] hover:text-[#7096D1] transition-colors duration-300 relative group"
              >
                {link.name}
                {/* Hover Underline Animation */}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#7096D1] transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* ============================== */}
        {/* 3. RIGHT ACTION ICONS & BUTTON */}
        {/* ============================== */}
        <div className="flex items-center gap-4 sm:gap-6">
          
          {/* Search Icon (Desktop only) */}
          <button className="hidden sm:flex text-[#334EAC] hover:text-[#7096D1] transition-colors p-2" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* User Account Icon (Desktop only) */}
          <button className="hidden sm:flex text-[#334EAC] hover:text-[#7096D1] transition-colors p-2" aria-label="User Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Main CTA Button */}
          <button className="bg-[#334EAC] hover:bg-[#7096D1] text-white text-[0.75rem] sm:text-[0.8rem] font-bold uppercase tracking-widest px-6 sm:px-8 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-[#334EAC]/20">
            Donate Now
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="lg:hidden text-[#334EAC] p-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ============================== */}
      {/* 4. MOBILE DROPDOWN MENU        */}
      {/* ============================== */}
      <div 
        className={`lg:hidden bg-white border-t border-gray-100 absolute w-full transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'scale-y-100 opacity-100 shadow-xl' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col px-6 py-2">
          {/* Dynamic Mobile Links */}
          {NAV_LINKS.map((link) => (
            <li key={`mobile-${link.name}`} className="border-b border-gray-50 last:border-0">
              <a 
                href={link.href}
                className="block py-4 text-[#334EAC] font-semibold text-[1rem] hover:text-[#7096D1] hover:pl-2 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.name}
              </a>
            </li>
          ))}
          
          {/* Mobile Action Icons (Search & Profile) */}
          <li className="flex gap-8 py-6 sm:hidden border-t border-gray-100 mt-2">
            <button className="flex items-center gap-3 text-[#334EAC] font-semibold text-sm hover:text-[#7096D1] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              Search
            </button>
            <button className="flex items-center gap-3 text-[#334EAC] font-semibold text-sm hover:text-[#7096D1] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              Account
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}