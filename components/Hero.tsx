"use client";

import React from 'react';

export default function App() {
  return (
    <>
      {/* Import premium fonts to match the design's elegant typography */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />

      {/* Main Hero Container - Fixed height to viewport minus 80px (5rem) navbar.
        This ensures it perfectly fits a single view without any scrolling.
      */}
      <div className="w-full h-[calc(100vh-5rem)] flex flex-col lg:flex-row font-body overflow-hidden">

        {/* ======================================================== */}
        {/* LEFT SECTION: IMAGE (Previously on the right)          */}
        {/* ======================================================== */}
        {/* Height split 40/60 on mobile to ensure it fits the single screen */}
        <div className="bg-[#FFF9F0] w-full lg:w-[45%] h-[40%] lg:h-full relative p-6 lg:p-16 xl:pl-[10%] flex items-center justify-center transition-colors duration-500">
          
          {/* Image Wrapper */}
          <div className="relative w-full h-full rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-xl z-10">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="A group of happy, diverse children smiling together"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Custom Sunburst Decoration - Moved to the left corner to match the swap */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 lg:-bottom-4 lg:-left-4 xl:left-[5%] w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 text-[#334EAC] z-20 animate-[spin_30s_linear_infinite] pointer-events-none opacity-80">
            <svg viewBox="0 0 100 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-full h-full">
              {/* Generate 12 rays for the burst effect */}
              {[...Array(12)].map((_, i) => (
                <line 
                  key={i} 
                  x1="50" y1="50" 
                  x2="50" y2="10" 
                  transform={`rotate(${i * 30} 50 50)`} 
                />
              ))}
            </svg>
          </div>
          
        </div>

        {/* ======================================================== */}
        {/* RIGHT SECTION: TEXT CONTENT (Previously on the left)   */}
        {/* ======================================================== */}
        <div className="bg-[#334EAC] w-full lg:w-[55%] h-[60%] lg:h-full p-6 sm:p-10 lg:p-20 xl:pr-[10%] flex flex-col justify-center relative z-10 transition-colors duration-500">
          
          {/* Subtitle */}
          <p className="text-[#7096D1] text-[0.7rem] sm:text-xs font-extrabold tracking-[0.2em] mb-4 sm:mb-6 lg:mb-8 uppercase">
            Non-profit Charity
          </p>

          {/* Main Headline - Text slightly scaled to guarantee it fits without scroll */}
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-heading font-semibold leading-[1.1] mb-6 sm:mb-10 lg:mb-14">
            Give{' '}
            <span className="relative inline-block">
              Hope
              
              {/* Custom Underline SVG */}
              <svg
                className="absolute -bottom-1 sm:-bottom-3 lg:-bottom-4 left-0 w-full h-2 sm:h-3 lg:h-4 text-[#7096D1]"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 2 12 Q 30 18 70 12 T 98 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              {/* Custom Sparkle/Star SVG */}
              <svg
                className="absolute -top-4 -right-6 sm:-top-6 sm:-right-8 lg:-top-8 lg:-right-12 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#7096D1]"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 2 Q12 10 20 12 Q12 14 12 22 Q12 14 4 12 Q12 10 12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <br />
            To Children
            <br />
            In Need.
          </h1>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Donate Button */}
            <button className="bg-[#7096D1] hover:bg-[#5a80bf] text-white text-[0.7rem] sm:text-xs font-bold uppercase tracking-widest px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#7096D1]/40">
              Donate Now
            </button>
            
            {/* Video Button */}
            <button className="group flex items-center gap-2 lg:gap-3 border border-[#7096D1] hover:bg-white/10 text-white text-[0.7rem] sm:text-xs font-bold uppercase tracking-widest px-5 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-full transition-all duration-300">
              <span className="flex items-center justify-center transition-transform group-hover:scale-110">
                {/* Play Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 lg:w-4 lg:h-4">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Video Playing Theme
            </button>
          </div>
        </div>

      </div>
    </>
  );
}