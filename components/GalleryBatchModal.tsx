"use client";

import React, { useState, useEffect, useRef } from 'react';

export interface GalleryBatch {
  id: number;
  batchName: string;
  year: string;
  members: number;
  image: string;
  gallery: string[];
}

interface Props {
  batches: GalleryBatch[];
}

export default function GalleryBatchModal({ batches }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<GalleryBatch | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Duplicate batches for infinite scroll effect
  const extendedBatches = [...batches, ...batches.map(b => ({ ...b, id: b.id + 100000 }))];

  // Auto-scroll logic that pauses when a user hovers or interacts
  useEffect(() => {
    if (isHovered || selectedBatch) return;

    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, [isHovered, selectedBatch]);

  // Auto-moving carousel logic for modal
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedBatch && selectedBatch.gallery.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === selectedBatch.gallery.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [selectedBatch]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedBatch) return;
    setCurrentImageIndex((prev) => (prev === selectedBatch.gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedBatch) return;
    setCurrentImageIndex((prev) => (prev === 0 ? selectedBatch.gallery.length - 1 : prev - 1));
  };

  const openModal = (batch: GalleryBatch) => {
    setSelectedBatch(batch);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedBatch(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Single-Line Scrollable Gallery */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 sm:gap-6 pb-12 pt-4 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 cursor-grab active:cursor-grabbing"
      >
        {extendedBatches.map((batch, index) => (
          <div
            key={`${batch.id}-${index}`}
            onClick={() => openModal(batch)}
            className="group relative w-[65vw] sm:w-[220px] lg:w-[260px] flex-shrink-0 snap-center h-[280px] sm:h-[320px] rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#334EAC]/30 transition-all duration-500 transform hover:-translate-y-2 border border-[#7096D1]/20 cursor-pointer"
          >
            {/* Image */}
            <img
              src={batch.image}
              alt={`${batch.batchName} - ${batch.year}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a264a]/95 via-[#334EAC]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>

            {/* Floating Year Badge */}
            <div className="absolute top-4 right-4 bg-[#7096D1]/90 backdrop-blur-sm text-[#FFF9F0] text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
              Batch {batch.year}
            </div>

            {/* Gallery Count Badge */}
            <div className="absolute top-4 left-4 bg-[#FFF9F0]/90 backdrop-blur-sm text-[#334EAC] text-[0.6rem] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {batch.gallery.length}
            </div>

            {/* Text Content at Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 flex flex-col justify-end transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-1.5 mb-2">
                <svg className="w-3.5 h-3.5 text-[#7096D1]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-[#7096D1] text-[0.65rem] font-bold uppercase tracking-widest">
                  {batch.members} Volunteers
                </span>
              </div>
              <h3 className="text-[#FFF9F0] font-heading text-xl sm:text-2xl font-bold leading-tight">
                {batch.batchName}
              </h3>

              {/* Decorative line that expands on hover */}
              <div className="w-0 h-1 bg-[#7096D1] mt-3 transition-all duration-500 group-hover:w-12 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* ======================== GALLERY MODAL ======================== */}
      {selectedBatch && (
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
              {selectedBatch.gallery.length > 0 ? (
                <img
                  key={currentImageIndex}
                  src={selectedBatch.gallery[currentImageIndex]}
                  alt={`${selectedBatch.batchName} - Image ${currentImageIndex + 1}`}
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
              {selectedBatch.gallery.length > 1 && (
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
              {selectedBatch.gallery.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedBatch.gallery.map((_, idx) => (
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
                <h3 className="text-[#334EAC] font-heading text-xl sm:text-2xl font-bold mb-1">{selectedBatch.batchName}</h3>
                <p className="text-[#7096D1] text-xs font-bold uppercase tracking-widest">Batch of {selectedBatch.year} · {selectedBatch.members} Volunteers</p>
              </div>
              <div className="bg-[#7096D1]/10 text-[#334EAC] px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedBatch.gallery.length > 0 ? `${currentImageIndex + 1} / ${selectedBatch.gallery.length} Images` : '0 Images'}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
