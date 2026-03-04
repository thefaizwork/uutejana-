
"use client"
import React, { useState } from 'react';

export default function App() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />

      <section className="w-full bg-[#FFF9F0] font-body py-8 lg:py-12 transition-colors duration-500 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Compact Header Section */}
          <div className="flex flex-col items-center text-center mb-8 lg:mb-10">
            <p className="text-[#7096D1] text-[0.65rem] font-extrabold tracking-[0.2em] mb-2 uppercase flex items-center gap-3">
              <span className="w-6 h-px bg-[#7096D1]"></span>
              Get In Touch
              <span className="w-6 h-px bg-[#7096D1]"></span>
            </p>
            <h2 className="text-[#334EAC] text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              Let's Connect
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Top/Horizontal: Compact Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Address */}
              <div className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-[#334EAC]/10 rounded-xl flex items-center justify-center text-[#334EAC] group-hover:bg-[#334EAC] group-hover:text-white transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#334EAC] font-bold text-sm">Location</h4>
                  <p className="text-[#334EAC]/70 text-xs">Delhi</p>
                </div>
              </div>

              {/* Email */}
              <div className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-[#334EAC]/10 rounded-xl flex items-center justify-center text-[#334EAC] group-hover:bg-[#334EAC] group-hover:text-white transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#334EAC] font-bold text-sm">Email</h4>
                  <p className="text-[#334EAC]/70 text-xs">xyz</p>
                </div>
              </div>

              {/* Phone */}
              <div className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-[#334EAC]/10 rounded-xl flex items-center justify-center text-[#334EAC] group-hover:bg-[#334EAC] group-hover:text-white transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[#334EAC] font-bold text-sm">Call Us</h4>
                  <p className="text-[#334EAC]/70 text-xs">123</p>
                </div>
              </div>
            </div>

            {/* Compact Form */}
            <div className="bg-[#334EAC] p-6 sm:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#7096D1]/20 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              
              {formState !== 'success' ? (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[#FFF9F0] text-[0.65rem] font-bold uppercase tracking-widest pl-1">Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#FFF9F0]/10 border border-[#FFF9F0]/20 text-[#FFF9F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1] focus:bg-[#FFF9F0]/20 transition-all placeholder:text-[#FFF9F0]/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[#FFF9F0] text-[0.65rem] font-bold uppercase tracking-widest pl-1">Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full bg-[#FFF9F0]/10 border border-[#FFF9F0]/20 text-[#FFF9F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1] focus:bg-[#FFF9F0]/20 transition-all placeholder:text-[#FFF9F0]/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#FFF9F0] text-[0.65rem] font-bold uppercase tracking-widest pl-1">Message</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="How can we help?"
                      className="w-full bg-[#FFF9F0]/10 border border-[#FFF9F0]/20 text-[#FFF9F0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1] focus:bg-[#FFF9F0]/20 transition-all placeholder:text-[#FFF9F0]/30 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full bg-[#7096D1] hover:bg-[#FFF9F0] text-[#FFF9F0] hover:text-[#334EAC] font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 text-xs"
                  >
                    {formState === 'submitting' ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 bg-[#7096D1] rounded-full flex items-center justify-center text-[#FFF9F0] mb-4 shadow-xl">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[#FFF9F0] font-heading text-2xl font-bold mb-2">Sent!</h3>
                  <p className="text-[#FFF9F0]/80 text-xs max-w-xs mb-6">
                    We'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-[#7096D1] font-bold uppercase tracking-widest text-[0.65rem] hover:text-[#FFF9F0] transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Happy Doodle at the End of the Page */}
          <div className="mt-16 sm:mt-24 w-full flex flex-col items-center justify-center opacity-70 pointer-events-none">
            {/* Happy Smiley Face */}
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#7096D1] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M8 9.05v-.1M16 9.05v-.1" strokeWidth="3" />
              <path d="M8 14c.5 1.5 2 3 4 3s3.5-1.5 4-3" />
            </svg>
            {/* Playful Wavy Line */}
            <svg className="w-full max-w-md h-6 sm:h-8 text-[#7096D1]" viewBox="0 0 400 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 15 Q 40 -5 70 15 T 130 15 T 190 15 T 250 15 T 310 15 T 370 15 T 390 15" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}