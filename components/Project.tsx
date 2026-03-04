import React from 'react';
import { getProjects } from '@/lib/projects';

export default function Project() {
  const campaigns = getProjects();

  return (
    <>
      {/* Premium typography matching the rest of the site */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Main Section - Milky Way Cream Background (#FFF9F0) */}
      <section className="w-full bg-[#FFF9F0] font-body py-20 lg:py-32 relative overflow-hidden transition-colors duration-500">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <p className="text-[#7096D1] text-[0.7rem] sm:text-xs font-extrabold tracking-[0.2em] mb-4 uppercase flex items-center gap-4">
                HOW WE HELP
                <span className="w-12 h-px bg-[#7096D1]"></span>
              </p>
              {/* Headline is now Dark Blue to contrast the Cream background */}
              <h2 className="text-[#334EAC] text-4xl sm:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Delivering Solutions <br />
                For A Better Future
              </h2>
            </div>
            
            <div className="lg:max-w-md">
              {/* Description is now Dark Blue */}
              <p className="text-[#334EAC]/80 text-sm leading-relaxed border-l-2 border-[#7096D1] pl-4 lg:pl-6">
                We are a dedicated charity organization focused on creating sustainable impact in communities. From education to healthcare, we aim to empower those in need.
              </p>
            </div>
          </div>

          {/* Campaigns Grid / Scrollable Row */}
          <div className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-12 pt-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-8">
            {campaigns.map((campaign) => {
              return (
                <div 
                  key={campaign.id}
                  className="group bg-[#334EAC] w-[85vw] sm:w-[320px] lg:w-auto flex-shrink-0 snap-center rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#334EAC]/30 transition-all duration-500 transform hover:-translate-y-3 flex flex-col border border-transparent hover:border-[#7096D1]/50"
                >
                  {/* Image Container */}
                  <div className="w-full h-56 sm:h-64 overflow-hidden relative">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4 bg-[#7096D1] text-[#FFF9F0] text-[0.65rem] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-md">
                      Ongoing Campaign
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow bg-[#334EAC]">
                    <h3 className="text-[#FFF9F0] font-heading text-xl sm:text-2xl font-bold mb-4 leading-snug line-clamp-2">
                      {campaign.title}
                    </h3>
                    <p className="text-[#FFF9F0]/80 text-xs sm:text-sm leading-relaxed flex-grow line-clamp-4">
                      {campaign.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Explore Button */}
          <div className="mt-8 flex justify-center">
            <button className="bg-[#334EAC] hover:bg-[#7096D1] text-[#FFF9F0] font-bold uppercase tracking-widest text-xs px-10 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#334EAC]/30">
              Explore All Campaigns
            </button>
          </div>

        </div>

        {/* Decorative Background Element */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#7096D1] rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      </section>
    </>
  );
}
