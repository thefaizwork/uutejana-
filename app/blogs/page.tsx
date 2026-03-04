"use client";
import React, { useState, useEffect } from 'react';
import NavBar from "@/components/NavBar";

interface BlogPost {
  _id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  content: string[];
  featured: boolean;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.ok ? r.json() : Promise.reject('Failed'))
      .then((data: BlogPost[]) => { setBlogs(data); setLoading(false); })
      .catch(() => { setError('Could not load blogs. Please try again later.'); setLoading(false); });
  }, []);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Featured = first blog with featured:true, fallback to most recent
  const featuredPost = blogs.find(b => b.featured) ?? blogs[0] ?? null;
  const recentPosts = blogs.filter(b => b._id !== featuredPost?._id);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          .font-heading { font-family: 'Playfair Display', serif; }
          .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        `
      }} />

      <div className="min-h-screen bg-[#FFF9F0] font-body transition-colors duration-500">
        <NavBar />

        <main className="max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-[10%] py-12 lg:py-20">

          {/* ── READING VIEW ── */}
          {selectedPost ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-6 sm:p-10 lg:p-16 border border-gray-100">
              <button onClick={handleBackClick} className="flex items-center gap-2 text-[#7096D1] hover:text-[#334EAC] font-bold uppercase tracking-widest text-xs mb-8 sm:mb-12 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Articles
              </button>
              <div className="flex items-center gap-3 text-[#7096D1] text-xs font-bold uppercase tracking-widest mb-6">
                <span className="bg-[#7096D1]/10 px-3 py-1 rounded-full">{selectedPost.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7096D1]"></span>
                <span>{selectedPost.date}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#334EAC] leading-tight mb-8">{selectedPost.title}</h1>
              <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#334EAC] flex items-center justify-center text-[#FFF9F0] font-heading font-bold text-xl shadow-md">
                  {selectedPost.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[#334EAC] font-bold text-sm">{selectedPost.author}</p>
                  <p className="text-[#334EAC]/60 text-xs">Uttejana Foundation Contributor</p>
                </div>
              </div>
              <div className="w-full aspect-video rounded-[1.5rem] overflow-hidden shadow-lg mb-12">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-6 text-[#334EAC]/80 text-base sm:text-lg leading-relaxed">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx} className={idx === 0 ? "text-xl font-medium text-[#334EAC]" : ""}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[#334EAC] font-bold text-sm uppercase tracking-widest">Share this story</p>
                <div className="flex gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border border-[#7096D1]/30 flex items-center justify-center text-[#334EAC] cursor-pointer hover:bg-[#7096D1] hover:text-white transition-all">
                      <div className="w-4 h-4 bg-current rounded-sm opacity-60"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : (
            /* ── LIST VIEW ── */
            <div className="animate-in fade-in duration-500">
              {/* Header */}
              <div className="mb-12 lg:mb-16">
                <p className="text-[#7096D1] text-[0.75rem] sm:text-sm font-extrabold tracking-[0.2em] mb-4 uppercase flex items-center gap-4">
                  <span className="w-12 h-px bg-[#7096D1]"></span>
                  News &amp; Stories
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#334EAC] leading-tight">
                  Read Our Latest <br className="hidden sm:block" />
                  Impact Stories
                </h1>
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex justify-center py-32">
                  <div className="animate-spin w-10 h-10 border-4 border-[#7096D1] border-t-transparent rounded-full"></div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-5 text-sm font-bold text-center">
                  {error}
                </div>
              )}

              {/* Empty state */}
              {!loading && !error && blogs.length === 0 && (
                <div className="text-center py-32 text-[#334EAC]/40">
                  <p className="text-2xl font-heading font-bold mb-2">No Stories Yet</p>
                  <p className="text-sm">Check back soon — new articles are on the way.</p>
                </div>
              )}

              {/* Featured Post */}
              {!loading && !error && featuredPost && (
                <div
                  onClick={() => handlePostClick(featuredPost)}
                  className="group relative w-full rounded-[2rem] overflow-hidden bg-[#334EAC] flex flex-col lg:flex-row shadow-xl hover:shadow-2xl transition-shadow duration-500 mb-20 cursor-pointer"
                >
                  <div className="w-full lg:w-3/5 h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden relative">
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-6 left-6 bg-[#7096D1] text-[#FFF9F0] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                      {featuredPost.featured ? 'Featured' : 'Latest'}
                    </div>
                  </div>
                  <div className="w-full lg:w-2/5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-[#7096D1] text-xs font-bold uppercase tracking-widest mb-4">
                      <span>{featuredPost.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7096D1]"></span>
                      <span>{featuredPost.date}</span>
                    </div>
                    <h2 className="text-[#FFF9F0] text-3xl sm:text-4xl font-heading font-bold leading-snug mb-6 group-hover:text-[#7096D1] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[#FFF9F0]/80 text-sm sm:text-base leading-relaxed mb-8 line-clamp-4">{featuredPost.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#7096D1]/20 flex items-center justify-center text-[#FFF9F0] font-heading font-bold">
                          {featuredPost.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[#FFF9F0] font-bold text-sm">{featuredPost.author}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#7096D1] flex items-center justify-center text-[#FFF9F0] group-hover:bg-[#7096D1] transition-all duration-300 transform group-hover:translate-x-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Articles Grid */}
              {!loading && !error && recentPosts.length > 0 && (
                <>
                  <div className="mb-12 flex items-center justify-between">
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#334EAC]">Recent Articles</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {recentPosts.map(post => (
                      <article
                        key={post._id}
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
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
