import React from 'react';
import { getGalleryBatches } from '@/lib/gallery';
import GalleryBatchModal from './GalleryBatchModal';

export default function Gallery() {
  const batches = getGalleryBatches();

  return (
    <>
      {/* Premium typography matching the rest of the site */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* Hide scrollbar for smooth horizontal scrolling */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Main Section - Light Cream Background */}
      <section className="w-full bg-[#FFF9F0] font-body py-16 lg:py-24 relative overflow-hidden transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
            <p className="text-[#7096D1] text-[0.7rem] sm:text-xs font-extrabold tracking-[0.2em] mb-4 uppercase flex items-center gap-4">
              <span className="w-8 sm:w-12 h-px bg-[#7096D1]"></span>
              OUR HEROES
              <span className="w-8 sm:w-12 h-px bg-[#7096D1]"></span>
            </p>
            {/* Dark Blue text for contrast against the light background */}
            <h2 className="text-[#334EAC] text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight max-w-3xl">
              Volunteer Batches <br className="hidden sm:block" />
              Over The Years
            </h2>
            <p className="text-[#334EAC]/70 text-xs sm:text-sm leading-relaxed max-w-2xl mt-4 sm:mt-6">
              A heartfelt tribute to the amazing individuals who have dedicated their time, energy, and love to making a real impact in the lives of children worldwide. Click on any batch to view their gallery.
            </p>
          </div>

          {/* Client-side scrollable cards + modal */}
          <GalleryBatchModal batches={batches} />

        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7096D1] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      </section>
    </>
  );
}
