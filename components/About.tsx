import React from 'react';
import { getAboutCards, AboutCard } from '@/lib/about-cards';

// SERVER COMPONENT — reads data directly from JSON file at request time.
// No client-side fetch, no extra HTTP requests. Data is embedded in the HTML.
export default function About() {
  const cards: AboutCard[] = getAboutCards();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <section className="w-full bg-[#FFF9F0] font-body py-16 lg:py-24 overflow-hidden transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

          {/* ======================================================== */}
          {/* 1. DYNAMIC CARDS ROW                                     */}
          {/* ======================================================== */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 sm:gap-6 lg:gap-8 mb-24 lg:mb-32 pb-6 pt-4 px-4 sm:px-0 -mx-4 sm:mx-0">
            {cards.length === 0 ? (
              <p className="text-[#334EAC]/50 text-sm py-8 px-4">No cards added yet. Add some from the admin panel.</p>
            ) : (
              cards.map((card) => (
                <div
                  key={card.id}
                  className="group relative w-[80vw] sm:w-[320px] lg:flex-1 flex-shrink-0 snap-center h-[260px] sm:h-[300px] lg:h-[360px] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex justify-between items-end">
                    <div className="pr-4">
                      <div className="relative inline-block mb-2 lg:mb-3">
                        <p className="text-[#FFF9F0] text-[0.6rem] lg:text-xs font-bold uppercase tracking-[0.2em] relative z-10">
                          {card.category}
                        </p>
                        <span className="absolute bottom-0 left-0 w-full h-1.5 lg:h-2 bg-[#7096D1] opacity-90 -z-10 -translate-y-0.5 lg:-translate-y-1"></span>
                      </div>
                      <h3 className="text-[#FFF9F0] font-heading text-xl lg:text-3xl font-bold leading-tight">
                        {card.title}
                      </h3>
                    </div>
                    {/* Arrow button */}
                    <div className="w-10 h-10 lg:w-14 lg:h-14 shrink-0 rounded-full bg-[#FFF9F0] flex items-center justify-center text-[#334EAC] transform group-hover:-translate-y-2 group-hover:bg-[#7096D1] group-hover:text-[#FFF9F0] transition-all duration-300 shadow-lg">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ======================================================== */}
          {/* 2. ABOUT US SECTION (static content)                     */}
          {/* ======================================================== */}
          <div className="flex flex-col text-center items-center justify-center mb-16 lg:mb-20">
            <p className="text-[#7096D1] text-[0.75rem] sm:text-sm font-extrabold tracking-[0.2em] mb-4 uppercase flex items-center gap-4">
              <span className="w-12 h-px bg-[#7096D1]"></span>
              Non-Profit Charity
              <span className="w-12 h-px bg-[#7096D1]"></span>
            </p>
            <h2 className="text-[#334EAC] text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-[1.15] max-w-3xl">
              Who We Are & <br className="hidden sm:block" />
              What We Do For Children
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Image Collage */}
            <div className="relative w-full aspect-square sm:aspect-video lg:aspect-square">
              <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-8 border-[#FFF9F0]">
                <img
                  src="https://images.unsplash.com/photo-1603048297172-c92544798d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Happy kids running"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-[2.5rem] overflow-hidden shadow-2xl z-20 border-8 border-[#FFF9F0]">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Close up smiling child"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 z-30 bg-[#7096D1] text-[#FFF9F0] rounded-full w-32 h-32 sm:w-40 sm:h-40 flex flex-col items-center justify-center shadow-xl p-4 text-center">
                <span className="font-heading text-4xl sm:text-5xl font-bold mb-1">15+</span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight">Years of<br/>Impact</span>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#334EAC] mb-6">
                We are on a mission to build a brighter, healthier future for helpless children.
              </h3>
              <p className="text-[#334EAC]/80 text-base sm:text-lg leading-relaxed mb-8">
                KidHope is a global non-profit organization dedicated to empowering children in underserved communities. We believe that every child deserves access to quality education, proper healthcare, and a safe environment to grow and thrive.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  { title: "Education Facilities", desc: "Building schools and providing learning materials." },
                  { title: "Healthy Food & Water", desc: "Ensuring daily nutrition and clean drinking water." },
                  { title: "Medical Assistance", desc: "Free healthcare checkups and medical support." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1 bg-[#7096D1]/20 p-2 rounded-full shrink-0">
                      <svg className="w-5 h-5 text-[#334EAC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#334EAC] font-bold text-lg">{item.title}</h4>
                      <p className="text-[#334EAC]/70 text-sm mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <button className="bg-[#334EAC] hover:bg-[#7096D1] text-[#FFF9F0] text-[0.8rem] sm:text-xs font-bold uppercase tracking-widest px-8 sm:px-10 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#334EAC]/30 flex items-center gap-3">
                  Discover More About Us
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
