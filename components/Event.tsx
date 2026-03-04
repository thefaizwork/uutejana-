import React from 'react';
import { getEvents } from '@/lib/events';
import EventGalleryModal from './EventGalleryModal';

export default function EventSection() {
  const events = getEvents();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* Hide scrollbar for smooth horizontal scrolling */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Main Container - Planetary Blue Background */}
      <section className="relative w-full bg-[#334EAC] font-body py-16 lg:py-24 overflow-hidden transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-8 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <p className="text-[#7096D1] text-[0.7rem] sm:text-xs font-extrabold tracking-[0.2em] mb-4 uppercase flex items-center gap-4">
                HOW WE HELP
                <span className="w-12 h-px bg-[#7096D1]"></span>
              </p>
              <h2 className="text-[#FFF9F0] text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight">
                Memories From <br/> Past Events
              </h2>
            </div>
            
            <div className="lg:max-w-md">
              <p className="text-[#FFF9F0]/80 text-sm leading-relaxed border-l-2 border-[#7096D1] pl-4 lg:pl-6">
                We are a dedicated charity organization focused on creating sustainable impact in communities. Click on any past event to view our gallery of beautiful moments.
              </p>
            </div>
          </div>

          {/* Client Component: Cards + Modal */}
          <EventGalleryModal events={events} />

          {/* Bottom Button */}
          <div className="mt-12 flex justify-center">
            <button className="border border-[#7096D1] text-[#FFF9F0] hover:bg-[#7096D1] hover:text-[#FFF9F0] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 transform hover:-translate-y-1">
              Explore More Events
            </button>
          </div>

        </div>

        {/* Decorative Background Element */}
        <svg className="absolute bottom-0 right-0 text-[#7096D1] opacity-20 w-64 h-64 translate-x-1/4 translate-y-1/4 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 150 Q 50 50, 100 150 T 190 150" stroke="currentColor" strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M10 180 Q 50 80, 100 180 T 190 180" stroke="currentColor" strokeWidth="15" strokeLinecap="round" fill="none" />
        </svg>
      </section>
    </>
  );
}
