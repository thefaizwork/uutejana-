"use client";
import React, { useState } from 'react';
import NavBar from "@/components/NavBar";
// ==========================================
// MOCK DATA (To be replaced by your backend)
// ==========================================
const FEATURED_POST = {
    id: "featured-1",
    title: "How Access to Clean Water Transforms Entire Communities",
    category: "Impact Story",
    date: "October 12, 2025",
    author: "Sarah Jenkins",
    excerpt: "In many parts of the world, children walk miles every day just to fetch water. See how our recent well-building initiative in Sub-Saharan Africa is bringing health, education, and hope back to the villages.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    content: [
        "In many parts of the world, children walk miles every day just to fetch water. This daily trek not only exposes them to physical dangers but also takes away precious hours that could be spent in a classroom learning.",
        "Our recent well-building initiative in Sub-Saharan Africa aims to change this narrative completely. By bringing clean, accessible water directly to the heart of these villages, we are doing much more than just quenching thirst.",
        "We are seeing a dramatic drop in waterborne diseases. Local clinics report a 60% decrease in dysentery and cholera cases among children under five. Health is the foundation upon which education and growth are built.",
        "Furthermore, school attendance has skyrocketed. Girls, who are traditionally tasked with water collection, are now filling the classrooms. The simple act of providing a well is bringing health, education, and undeniable hope back to these communities."
    ]
};

const RECENT_POSTS = [
    {
        id: 1,
        title: "5 Ways You Can Support Children's Education Locally",
        category: "Get Involved",
        date: "October 08, 2025",
        author: "Michael Chang",
        excerpt: "You don't need to travel the globe to make a difference. Here are five practical ways you can help students right in your own community.",
        image: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: [
            "You don't need to travel the globe to make a difference. There are countless children right in your own backyard who could use a helping hand. From underfunded public schools to lacking after-school programs, local communities are in dire need of support.",
            "First, consider donating school supplies. Many teachers spend their own money to equip their classrooms. Organizing a local supply drive can take a massive burden off their shoulders.",
            "Second, volunteer your time. Whether it's tutoring in math, reading to younger children, or helping coach a local sports team, your presence matters.",
            "By taking these small steps, you create a ripple effect that strengthens the educational foundation of your entire community."
        ]
    },
    {
        id: 2,
        title: "The Silent Crisis: Child Malnutrition in 2025",
        category: "Awareness",
        date: "September 28, 2025",
        author: "Dr. Elena Rostova",
        excerpt: "Despite global advancements, millions of children still face severe malnutrition. Let's break down the data and discuss what we are doing to combat it.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: [
            "Despite global advancements in agriculture and logistics, millions of children still face severe malnutrition. It is a silent crisis that stunts physical growth, impairs brain development, and leaves children vulnerable to preventable diseases.",
            "Our organization is tackling this by focusing on sustainable, community-led agriculture. We supply drought-resistant seeds and educate local farmers on high-yield farming techniques.",
            "Additionally, our emergency relief funds are actively distributing high-calorie therapeutic foods to regions facing immediate famine. Together, we can ensure no child goes to bed hungry."
        ]
    },
    {
        id: 3,
        title: "Meet Our Volunteer of the Month: David Reynolds",
        category: "Community",
        date: "September 15, 2025",
        author: "KidHope Team",
        excerpt: "David has dedicated over 500 hours this year to our inner-city youth mentoring program. Read his inspiring story and what drives him to give back.",
        image: "https://images.unsplash.com/photo-1559027615-cd4628ce2751?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        content: [
            "David Reynolds has dedicated over 500 hours this year to our inner-city youth mentoring program, making him our undisputed Volunteer of the Month.",
            "David runs a weekly coding workshop where he teaches teenagers the basics of Python and web development. Several of his students have already built their own basic applications.",
            "His dedication proves that giving back doesn't just change the lives of the recipients; it enriches the life of the volunteer as well. Thank you, David, for your incredible service!"
        ]
    }
];

export default function BlogsPage() {
    const [selectedPost, setSelectedPost] = useState<any>(null);

    const handlePostClick = (post: any) => {
        setSelectedPost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackClick = () => {
        setSelectedPost(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-heading { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}} />

            <div className="min-h-screen bg-[#FFF9F0] font-body transition-colors duration-500">

                <NavBar />

                <main className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-[10%] py-12 lg:py-20">

                    {!selectedPost ? (
                        /* ========================================== */
                        /* LIST VIEW (Featured & Grid)                */
                        /* ========================================== */
                        <div className="animate-in fade-in duration-500">
                            <div className="mb-12 lg:mb-16">
                                <p className="text-[#7096D1] text-[0.75rem] sm:text-sm font-extrabold tracking-[0.2em] mb-4 uppercase flex items-center gap-4">
                                    <span className="w-12 h-px bg-[#7096D1]"></span>
                                    News & Stories
                                </p>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#334EAC] leading-tight">
                                    Read Our Latest <br className="hidden sm:block" />
                                    Impact Stories
                                </h1>
                            </div>

                            {/* FEATURED POST */}
                            <div
                                onClick={() => handlePostClick(FEATURED_POST)}
                                className="group relative w-full rounded-[2rem] overflow-hidden bg-[#334EAC] flex flex-col lg:flex-row shadow-xl hover:shadow-2xl transition-shadow duration-500 mb-20 cursor-pointer"
                            >
                                <div className="w-full lg:w-3/5 h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden relative">
                                    <img src={FEATURED_POST.image} alt={FEATURED_POST.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute top-6 left-6 bg-[#7096D1] text-[#FFF9F0] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">Featured</div>
                                </div>
                                <div className="w-full lg:w-2/5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 text-[#7096D1] text-xs font-bold uppercase tracking-widest mb-4">
                                        <span>{FEATURED_POST.category}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#7096D1]"></span>
                                        <span>{FEATURED_POST.date}</span>
                                    </div>
                                    <h2 className="text-[#FFF9F0] text-3xl sm:text-4xl font-heading font-bold leading-snug mb-6 group-hover:text-[#7096D1] transition-colors duration-300">
                                        {FEATURED_POST.title}
                                    </h2>
                                    <p className="text-[#FFF9F0]/80 text-sm sm:text-base leading-relaxed mb-8 line-clamp-4">{FEATURED_POST.excerpt}</p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#7096D1]/20 flex items-center justify-center text-[#FFF9F0] font-heading font-bold">{FEATURED_POST.author.charAt(0)}</div>
                                            <span className="text-[#FFF9F0] font-bold text-sm">{FEATURED_POST.author}</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-[#7096D1] flex items-center justify-center text-[#FFF9F0] group-hover:bg-[#7096D1] transition-all duration-300 transform group-hover:translate-x-2">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RECENT ARTICLES GRID */}
                            <div className="mb-12 flex items-center justify-between">
                                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#334EAC]">Recent Articles</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                                {RECENT_POSTS.map((post) => (
                                    <article
                                        key={post.id}
                                        onClick={() => handlePostClick(post)}
                                        className="group flex flex-col bg-white rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                                    >
                                        <div className="w-full aspect-[4/3] overflow-hidden relative">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#334EAC] text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">{post.category}</div>
                                        </div>
                                        <div className="p-6 sm:p-8 flex flex-col flex-grow">
                                            <p className="text-[#7096D1] text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest mb-3">{post.date}</p>
                                            <h4 className="text-[#334EAC] font-heading text-xl font-bold leading-snug mb-3 group-hover:text-[#7096D1] transition-colors line-clamp-2">{post.title}</h4>
                                            <p className="text-[#334EAC]/70 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <span className="text-[#334EAC] font-bold text-xs">{post.author}</span>
                                                <span className="text-[#7096D1] text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                    Read <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* ========================================== */
                        /* READING VIEW                               */
                        /* ========================================== */
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-6 sm:p-10 lg:p-16 border border-gray-100">
                            <button onClick={handleBackClick} className="flex items-center gap-2 text-[#7096D1] hover:text-[#334EAC] font-bold uppercase tracking-widest text-xs mb-8 sm:mb-12 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Back to Articles
                            </button>
                            <div className="flex items-center gap-3 text-[#7096D1] text-xs font-bold uppercase tracking-widest mb-6">
                                <span className="bg-[#7096D1]/10 px-3 py-1 rounded-full">{selectedPost.category}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7096D1]"></span>
                                <span>{selectedPost.date}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#334EAC] leading-tight mb-8">{selectedPost.title}</h1>
                            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
                                <div className="w-12 h-12 rounded-full bg-[#334EAC] flex items-center justify-center text-[#FFF9F0] font-heading font-bold text-xl shadow-md">{selectedPost.author.charAt(0)}</div>
                                <div>
                                    <p className="text-[#334EAC] font-bold text-sm">{selectedPost.author}</p>
                                    <p className="text-[#334EAC]/60 text-xs">KidHope Contributor</p>
                                </div>
                            </div>
                            <div className="w-full aspect-video rounded-[1.5rem] overflow-hidden shadow-lg mb-12">
                                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-6 text-[#334EAC]/80 text-base sm:text-lg leading-relaxed">
                                {selectedPost.content.map((paragraph: string, idx: number) => (
                                    <p key={idx} className={idx === 0 ? "text-xl font-medium text-[#334EAC]" : ""}>{paragraph}</p>
                                ))}
                            </div>
                            <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-[#334EAC] font-bold text-sm uppercase tracking-widest">Share this story</p>
                                <div className="flex gap-3">
                                    {/* Mock Social Buttons */}
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border border-[#7096D1]/30 flex items-center justify-center text-[#334EAC] cursor-pointer hover:bg-[#7096D1] hover:text-white transition-all">
                                            <div className="w-4 h-4 bg-current rounded-sm opacity-60"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}