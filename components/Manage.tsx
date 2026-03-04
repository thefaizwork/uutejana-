"use client"
import React, { useState, useRef } from 'react';

type OptionType = 'volunteer' | 'internship' | 'donate';

export default function App() {
  // State to handle "routing" between views
  const [currentView, setCurrentView] = useState<'options' | 'form'>('options');
  const [selectedOption, setSelectedOption] = useState<OptionType>('volunteer');
  const [showPayment, setShowPayment] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Form data — tracks all fields across all 3 form types
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    // Volunteer
    areaOfInterest: 'Event Organization & Logistics',
    availability: [] as string[],
    // Internship
    university: '',
    fieldOfStudy: '',
    portfolioUrl: '',
    // Donate
    donationAmount: '₹1000',
  });

  // Create a reference to the top of this section for smooth scrolling
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle clicking an option card
  const handleOptionSelect = (option: OptionType) => {
    setSelectedOption(option);
    setShowPayment(false);
    setSubmitState('idle');
    setCurrentView('form');
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Toggle availability checkbox
  const toggleAvailability = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(time)
        ? prev.availability.filter((t) => t !== time)
        : [...prev.availability, time],
    }));
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      firstName: '', lastName: '', email: '', message: '',
      areaOfInterest: 'Event Organization & Logistics', availability: [],
      university: '', fieldOfStudy: '', portfolioUrl: '',
      donationAmount: '₹1000',
    });
  };

  // ==========================================
  // FORMSUBMIT.CO — Email: workfaizan.ahmad@gmail.com
  // First submission sends a confirmation email to activate.
  // After confirming, all submissions go to your inbox.
  // ==========================================
  const FORMSUBMIT_EMAIL = 'workfaizan.ahmad@gmail.com';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('submitting');

    const data = new FormData();
    // Formsubmit.co config
    data.append('_subject', `New ${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Application — KidHope`);
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    // Common fields
    data.append('Form Type', selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1));
    data.append('First Name', formData.firstName);
    data.append('Last Name', formData.lastName);
    data.append('Email', formData.email);

    // Type-specific fields
    if (selectedOption === 'volunteer') {
      data.append('Area of Interest', formData.areaOfInterest);
      data.append('Availability', formData.availability.length > 0 ? formData.availability.join(', ') : 'Not specified');
    }
    if (selectedOption === 'internship') {
      data.append('University / College', formData.university || 'Not provided');
      data.append('Field of Study', formData.fieldOfStudy || 'Not provided');
      data.append('Portfolio / LinkedIn', formData.portfolioUrl || 'Not provided');
    }
    if (selectedOption === 'donate') {
      data.append('Donation Amount', formData.donationAmount);
    }

    if (formData.message) {
      data.append('Message', formData.message);
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        if (selectedOption === 'donate') {
          setShowPayment(true);
          setSubmitState('idle');
        } else {
          setSubmitState('success');
        }
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <>
      {/* Premium typography and custom scrollbar hiding utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* Hide scrollbar for smooth horizontal scrolling on mobile */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Main Container */}
      <div ref={sectionRef} className="w-full bg-[#FFF9F0] font-body py-12 lg:py-20 transition-colors duration-500 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* ======================================================== */}
          {/* VIEW 1: THE OPTIONS CARDS                                */}
          {/* ======================================================== */}
          {currentView === 'options' && (
            <div className="animate-in fade-in duration-700">
              
              <div className="text-center mb-10 lg:mb-12">
                <p className="text-[#7096D1] text-[0.7rem] sm:text-xs font-extrabold tracking-[0.2em] mb-3 uppercase flex items-center justify-center gap-4">
                  <span className="w-8 sm:w-12 h-px bg-[#7096D1]"></span>
                  Get Involved
                  <span className="w-8 sm:w-12 h-px bg-[#7096D1]"></span>
                </p>
                <h2 className="text-[#334EAC] text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight max-w-2xl mx-auto">
                  How Would You Like To Support Us?
                </h2>
              </div>

              {/* Cards Container: Swipeable row on mobile, 3-column grid on desktop */}
              <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
                
                {/* 1. Volunteer Card */}
                <div 
                  onClick={() => handleOptionSelect('volunteer')}
                  className="group bg-[#334EAC] w-[75vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center rounded-[1.5rem] p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#334EAC]/30 border-2 border-transparent hover:border-[#7096D1]"
                >
                  <div className="w-14 h-14 bg-[#7096D1]/20 rounded-full flex items-center justify-center mb-4 text-[#FFF9F0] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-[#FFF9F0] font-heading text-xl sm:text-2xl font-bold mb-3">Volunteer</h3>
                  <p className="text-[#FFF9F0]/80 text-xs sm:text-sm mb-6 leading-relaxed">Give your time and energy to help run our field operations, events, and community support programs.</p>
                  <button className="mt-auto bg-[#7096D1] text-[#FFF9F0] px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[0.65rem] sm:text-xs group-hover:bg-[#FFF9F0] group-hover:text-[#334EAC] transition-colors">
                    Select
                  </button>
                </div>

                {/* 2. Internship Card */}
                <div 
                  onClick={() => handleOptionSelect('internship')}
                  className="group bg-[#334EAC] w-[75vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center rounded-[1.5rem] p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#334EAC]/30 border-2 border-transparent hover:border-[#7096D1]"
                >
                  <div className="w-14 h-14 bg-[#7096D1]/20 rounded-full flex items-center justify-center mb-4 text-[#FFF9F0] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h3 className="text-[#FFF9F0] font-heading text-xl sm:text-2xl font-bold mb-3">Internship</h3>
                  <p className="text-[#FFF9F0]/80 text-xs sm:text-sm mb-6 leading-relaxed">Kickstart your career by learning with our team. We offer hands-on experience in NGO management.</p>
                  <button className="mt-auto bg-[#7096D1] text-[#FFF9F0] px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[0.65rem] sm:text-xs group-hover:bg-[#FFF9F0] group-hover:text-[#334EAC] transition-colors">
                    Select
                  </button>
                </div>

                {/* 3. Donate/Fundraise Card */}
                <div 
                  onClick={() => handleOptionSelect('donate')}
                  className="group bg-[#334EAC] w-[75vw] sm:w-[280px] md:w-auto flex-shrink-0 snap-center rounded-[1.5rem] p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#334EAC]/30 border-2 border-transparent hover:border-[#7096D1]"
                >
                  <div className="w-14 h-14 bg-[#7096D1]/20 rounded-full flex items-center justify-center mb-4 text-[#FFF9F0] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-[#FFF9F0] font-heading text-xl sm:text-2xl font-bold mb-3">Fundraise</h3>
                  <p className="text-[#FFF9F0]/80 text-xs sm:text-sm mb-6 leading-relaxed">Make a direct impact. Your donations fund our critical programs, schools, and healthcare facilities.</p>
                  <button className="mt-auto bg-[#7096D1] text-[#FFF9F0] px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-[0.65rem] sm:text-xs group-hover:bg-[#FFF9F0] group-hover:text-[#334EAC] transition-colors">
                    Select
                  </button>
                </div>

              </div>
            </div>
          )}


          {/* ======================================================== */}
          {/* VIEW 2: THE UNIFIED DYNAMIC FORM                         */}
          {/* ======================================================== */}
          {currentView === 'form' && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-3xl mx-auto">
              
              {/* Back Button */}
              <button 
                onClick={() => {
                  setCurrentView('options');
                  setShowPayment(false);
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="flex items-center gap-2 text-[#334EAC] font-bold uppercase tracking-widest text-[0.65rem] sm:text-xs mb-4 hover:text-[#7096D1] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Options
              </button>

              {/* Form Container */}
              <div className="bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-gray-100">
                
                {/* Form Header / Tab Switcher */}
                <div className="bg-[#334EAC] p-1.5 flex flex-col sm:flex-row gap-1.5">
                  {[
                    { id: 'volunteer', label: 'Become a Volunteer' },
                    { id: 'internship', label: 'Apply for Internship' },
                    { id: 'donate', label: 'Make a Donation' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedOption(tab.id as OptionType);
                        setShowPayment(false);
                      }}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-center font-bold text-xs sm:text-sm transition-all duration-300 ${
                        selectedOption === tab.id 
                          ? 'bg-[#FFF9F0] text-[#334EAC] shadow-md' 
                          : 'text-[#FFF9F0] hover:bg-[#7096D1]/30'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Form Body */}
                <div className="p-5 sm:p-8 relative">
                  
                  {!showPayment ? (
                    <>
                      <div className="mb-5">
                        <h3 className="text-[#334EAC] font-heading text-xl sm:text-2xl font-bold mb-1">
                          {selectedOption === 'volunteer' && "Join Our Volunteer Team"}
                          {selectedOption === 'internship' && "Start Your NGO Career"}
                          {selectedOption === 'donate' && "Support Our Mission"}
                        </h3>
                        <p className="text-[#334EAC]/70 text-xs sm:text-sm">
                          Please fill out the form below. We will get back to you within 24-48 hours.
                        </p>
                      </div>

                      <form className="space-y-4" onSubmit={handleFormSubmit}>
                        
                        {/* Common Fields for all options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#334EAC] mb-1.5">First Name *</label>
                            <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors" placeholder="John" required />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Last Name *</label>
                            <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors" placeholder="Doe" required />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Email Address *</label>
                          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors" placeholder="john@example.com" required />
                        </div>

                        {/* ======================================= */}
                        {/* DYNAMIC FIELDS: VOLUNTEER               */}
                        {/* ======================================= */}
                        {selectedOption === 'volunteer' && (
                          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div>
                              <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Area of Interest</label>
                              <select value={formData.areaOfInterest} onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors appearance-none">
                                <option>Event Organization & Logistics</option>
                                <option>Teaching & Mentoring</option>
                                <option>Healthcare Assistant</option>
                                <option>Fundraising & Outreach</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Availability</label>
                              <div className="flex gap-3 flex-wrap">
                                {['Weekdays', 'Weekends', 'Evenings', 'Flexible'].map((time) => (
                                  <label key={time} className="flex items-center gap-1.5 cursor-pointer text-[#334EAC]">
                                    <input type="checkbox" checked={formData.availability.includes(time)} onChange={() => toggleAvailability(time)} className="w-3.5 h-3.5 text-[#7096D1] bg-[#FFF9F0] border-[#7096D1]/50 rounded focus:ring-[#7096D1]" />
                                    <span className="text-xs">{time}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ======================================= */}
                        {/* DYNAMIC FIELDS: INTERNSHIP              */}
                        {/* ======================================= */}
                        {selectedOption === 'internship' && (
                          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div>
                              <label className="block text-xs font-bold text-[#334EAC] mb-1.5">University / College</label>
                              <input type="text" value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors" placeholder="University Name" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Field of Study / Major</label>
                              <input type="text" value={formData.fieldOfStudy} onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors" placeholder="e.g. Social Work, Marketing" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Portfolio or LinkedIn URL</label>
                              <input type="text" value={formData.portfolioUrl} onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors" placeholder="https://" />
                            </div>
                          </div>
                        )}

                        {/* ======================================= */}
                        {/* DYNAMIC FIELDS: DONATE                  */}
                        {/* ======================================= */}
                        {selectedOption === 'donate' && (
                          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div>
                              <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Donation Amount (INR)</label>
                              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {['₹500', '₹1000', '₹2000', '₹5000', 'Custom'].map((amt) => (
                                  <button key={amt} type="button" onClick={() => setFormData({ ...formData, donationAmount: amt })} className={`py-1.5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm border transition-all ${formData.donationAmount === amt ? 'bg-[#7096D1] text-[#FFF9F0] border-[#7096D1]' : 'bg-[#FFF9F0] text-[#334EAC] border-[#7096D1]/30 hover:border-[#7096D1]'}`}>
                                    {amt}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Universal Message Field */}
                        <div>
                          <label className="block text-xs font-bold text-[#334EAC] mb-1.5">Additional Message (Optional)</label>
                          <textarea rows={2} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-[#FFF9F0] border border-[#7096D1]/30 text-[#334EAC] rounded-lg px-3 py-2 focus:outline-none focus:border-[#7096D1] focus:ring-1 focus:ring-[#7096D1] transition-colors resize-none text-sm" placeholder="Tell us more about yourself..."></textarea>
                        </div>

                        {/* Error Message */}
                        {submitState === 'error' && (
                          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-bold flex items-center gap-3">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            Something went wrong. Please try again.
                          </div>
                        )}

                        {/* Submit Button */}
                        <button type="submit" disabled={submitState === 'submitting'} className="w-full bg-[#334EAC] hover:bg-[#7096D1] text-[#FFF9F0] font-bold uppercase tracking-widest py-3 rounded-xl text-xs sm:text-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2">
                          {submitState === 'submitting' ? (
                            <>
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            selectedOption === 'donate' ? 'Generate Payment QR' : 'Submit Application'
                          )}
                        </button>

                      </form>

                      {/* ======================================= */}
                      {/* SUCCESS VIEW (Volunteer / Internship)   */}
                      {/* ======================================= */}
                      {submitState === 'success' && (
                        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-8 animate-in zoom-in-95 duration-500 rounded-b-[1.5rem]">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-[#334EAC] font-heading text-2xl font-bold mb-2">Application Sent!</h3>
                          <p className="text-[#334EAC]/70 text-sm max-w-sm mb-6">
                            Thank you, {formData.firstName}! We&apos;ve received your {selectedOption} application and will get back to you at <strong>{formData.email}</strong> within 24-48 hours.
                          </p>
                          <button
                            onClick={() => {
                              resetForm();
                              setSubmitState('idle');
                              setCurrentView('options');
                              setTimeout(() => {
                                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, 100);
                            }}
                            className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold uppercase tracking-widest px-8 py-3 rounded-xl text-xs transition-all"
                          >
                            Back to Home
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    /* ======================================= */
                    /* PAYMENT QR CODE VIEW                    */
                    /* ======================================= */
                    <div className="text-center py-6 animate-in zoom-in duration-300">
                      <div className="w-16 h-16 bg-[#7096D1]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#334EAC]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-[#334EAC] font-heading text-2xl font-bold mb-4">Complete Your Donation</h3>
                      
                      <div className="bg-[#FFF9F0] p-6 rounded-2xl inline-block border-2 border-[#7096D1]/20 mb-6 shadow-inner">
                        <div className="w-48 h-48 bg-white border-4 border-[#334EAC] rounded-lg flex items-center justify-center mx-auto relative overflow-hidden">
                           {/* NOTE: This is a placeholder QR code generation URL. 
                             To make it work for real, replace "NGO_UPI_ID@bank" with your actual UPI ID.
                           */}
                           <img 
                             src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=NGO_UPI_ID@bank&pn=KidHope&cu=INR" 
                             alt="Payment QR Code" 
                             className="w-full h-full p-2" 
                           />
                        </div>
                        <p className="mt-4 text-[#334EAC] font-bold text-sm tracking-wide">SCAN TO PAY VIA UPI</p>
                      </div>
                      
                      <div className="space-y-4 max-w-sm mx-auto">
                        <p className="text-xs text-[#334EAC]/70 leading-relaxed">
                          Once payment is successful, our team will verify the transaction and send the 80G tax exemption receipt to your registered email address.
                        </p>
                        <button 
                          onClick={() => setShowPayment(false)} 
                          className="text-[#7096D1] hover:text-[#334EAC] text-xs font-bold uppercase tracking-wider underline transition-colors"
                        >
                          Go Back & Change Amount
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}