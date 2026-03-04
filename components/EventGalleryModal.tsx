"use client";

import React, { useState, useEffect } from 'react';

export interface EventItem {
  id: number;
  title: string;
  date: string;
  shortDescription: string;
  coverImage: string;
  gallery: string[];
}

interface Props {
  events: EventItem[];
}

export default function EventGalleryModal({ events }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-moving carousel logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedEvent && selectedEvent.gallery.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === selectedEvent.gallery.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [selectedEvent]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    setCurrentImageIndex((prev) => (prev === selectedEvent.gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedEvent) return;
    setCurrentImageIndex((prev) => (prev === 0 ? selectedEvent.gallery.length - 1 : prev - 1));
  };

  const openModal = (event: EventItem) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedEvent(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Single Line Scrollable Cards Container */}
      <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 sm:gap-6 pt-6 pb-10 -mx-4 px-4 sm:-mx-6 sm:px-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => openModal(event)}
            className="group bg-[#FFF9F0] w-[75vw] sm:w-[260px] lg:w-[280px] flex-shrink-0 snap-center rounded-[1.25rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:shadow-black/20 transition-all duration-500 transform hover:-translate-y-3 flex flex-col"
          >
            {/* Image Section */}
            <div className="w-full aspect-[4/3] overflow-hidden p-2 pb-0">
              <div className="w-full h-full rounded-[1rem] overflow-hidden relative">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#334EAC]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="bg-[#FFF9F0] text-[#334EAC] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Gallery ({event.gallery.length})
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow text-center">
              <p className="text-[#7096D1] text-[10px] font-bold mb-2 uppercase tracking-wider">{event.date}</p>
              <h3 className="text-[#334EAC] font-heading text-lg font-bold mb-2 leading-snug">
                {event.title}
              </h3>
              <p className="text-[#334EAC]/70 text-xs leading-relaxed mt-auto">
                {event.shortDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#334EAC]/95 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#FFF9F0] text-[#334EAC] p-2.5 sm:p-3 rounded-full hover:scale-110 transition-transform z-50 shadow-lg"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl bg-[#FFF9F0] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Carousel Image Display */}
            <div className="relative w-full aspect-[4/3] sm:aspect-video max-h-[60vh] bg-[#1a264a] flex items-center justify-center group shrink-0">
              {selectedEvent.gallery.length > 0 ? (
                <img
                  key={currentImageIndex}
                  src={selectedEvent.gallery[currentImageIndex]}
                  alt={`${selectedEvent.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white/50 gap-2">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-bold">No gallery images yet</p>
                </div>
              )}

              {/* Manual Navigation Controls */}
              {selectedEvent.gallery.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={prevImage} className="bg-[#FFF9F0]/80 backdrop-blur-sm text-[#334EAC] p-2.5 sm:p-3 rounded-full hover:bg-[#FFF9F0] transition-colors shadow-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={nextImage} className="bg-[#FFF9F0]/80 backdrop-blur-sm text-[#334EAC] p-2.5 sm:p-3 rounded-full hover:bg-[#FFF9F0] transition-colors shadow-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}

              {/* Progress Indicators */}
              {selectedEvent.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedEvent.gallery.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 sm:w-8 bg-[#FFF9F0]' : 'w-1.5 sm:w-2 bg-[#FFF9F0]/50'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Modal Info Footer */}
            <div className="p-5 sm:p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-200 overflow-y-auto">
              <div>
                <h3 className="text-[#334EAC] font-heading text-xl sm:text-2xl font-bold mb-1">{selectedEvent.title}</h3>
                <p className="text-[#7096D1] text-xs font-bold uppercase tracking-widest">{selectedEvent.date}</p>
              </div>
              <div className="bg-[#7096D1]/10 text-[#334EAC] px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedEvent.gallery.length > 0 ? `${currentImageIndex + 1} / ${selectedEvent.gallery.length} Images` : '0 Images'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
