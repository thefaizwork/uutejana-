"use client"
import React, { useState, useEffect } from 'react';

interface Project { id: number; title: string; description: string; image: string; }
interface BlogItem { _id: string; title: string; author: string; date: string; category: string; excerpt: string; image: string; content: string[]; featured: boolean; }
interface GalleryBatch { id: number; batchName: string; year: string; members: number; image: string; gallery: string[]; }
interface AboutCard { id: number; category: string; title: string; image: string; }
interface EventItem { id: number; title: string; date: string; shortDescription: string; coverImage: string; gallery: string[]; }

type TabType = 'about' | 'events' | 'projects' | 'blogs' | 'gallery';
const TABS = [
  { id: 'about', label: 'About Cards', icon: 'M4 6h16M4 10h16M4 14h8' },
  { id: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'projects', label: 'Projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'blogs', label: 'Blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
  { id: 'gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
];
const TRASH = 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16';
const LIVE_TABS = ['about', 'events', 'projects', 'blogs', 'gallery'];

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogErr, setBlogErr] = useState('');
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [blogForm, setBlogForm] = useState({ title: '', author: '', date: '', category: '', excerpt: '', image: '', content: '', featured: false });
  const [blogFormErr, setBlogFormErr] = useState('');
  const [addingBlog, setAddingBlog] = useState(false);
  const [blogPrevErr, setBlogPrevErr] = useState(false);
  const [aboutCards, setAboutCards] = useState<AboutCard[]>([]);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [aboutErr, setAboutErr] = useState('');
  const [showAddAbout, setShowAddAbout] = useState(false);
  const [aboutForm, setAboutForm] = useState({ category: '', title: '', image: '' });
  const [aboutFormErr, setAboutFormErr] = useState('');
  const [addingAbout, setAddingAbout] = useState(false);
  const [aboutPrevErr, setAboutPrevErr] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [evLoading, setEvLoading] = useState(false);
  const [evErr, setEvErr] = useState('');
  const [showAddEv, setShowAddEv] = useState(false);
  const [evForm, setEvForm] = useState({ title: '', date: '', shortDescription: '', coverImage: '' });
  const [evFormErr, setEvFormErr] = useState('');
  const [addingEv, setAddingEv] = useState(false);
  const [evPrevErr, setEvPrevErr] = useState(false);
  const [galId, setGalId] = useState<number | null>(null);
  const [newImgUrl, setNewImgUrl] = useState('');
  const [addingImg, setAddingImg] = useState(false);
  const [galErr, setGalErr] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [projLoading, setProjLoading] = useState(false);
  const [projErr, setProjErr] = useState('');
  const [showAddProj, setShowAddProj] = useState(false);
  const [projForm, setProjForm] = useState({ title: '', description: '', image: '' });
  const [projFormErr, setProjFormErr] = useState('');
  const [addingProj, setAddingProj] = useState(false);
  const [projPrevErr, setProjPrevErr] = useState(false);
  const [galBatches, setGalBatches] = useState<GalleryBatch[]>([]);
  const [galLoading, setGalLoading] = useState(false);
  const [galBatchErr, setGalBatchErr] = useState('');
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [batchForm, setBatchForm] = useState({ batchName: '', year: '', members: '', image: '' });
  const [batchFormErr, setBatchFormErr] = useState('');
  const [addingBatch, setAddingBatch] = useState(false);
  const [batchPrevErr, setBatchPrevErr] = useState(false);
  const [galBatchId, setGalBatchId] = useState<number | null>(null);
  const [newBatchImgUrl, setNewBatchImgUrl] = useState('');
  const [addingBatchImg, setAddingBatchImg] = useState(false);
  const [batchImgErr, setBatchImgErr] = useState('');

  useEffect(() => {
    if (!isAuth) return;
    if (activeTab === 'about') fetchAbout();
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'projects') fetchProjects();
    if (activeTab === 'gallery') fetchGallery();
    if (activeTab === 'blogs') fetchBlogs();
  }, [isAuth, activeTab]);

  async function fetchAbout() { setAboutLoading(true); setAboutErr(''); try { const r = await fetch('/api/about-cards'); if (!r.ok) throw 0; setAboutCards(await r.json()); } catch { setAboutErr('Could not load cards.'); } finally { setAboutLoading(false); } }
  async function fetchEvents() { setEvLoading(true); setEvErr(''); try { const r = await fetch('/api/events'); if (!r.ok) throw 0; setEvents(await r.json()); } catch { setEvErr('Could not load events.'); } finally { setEvLoading(false); } }
  async function fetchProjects() { setProjLoading(true); setProjErr(''); try { const r = await fetch('/api/projects'); if (!r.ok) throw 0; setProjects(await r.json()); } catch { setProjErr('Could not load projects.'); } finally { setProjLoading(false); } }
  async function fetchGallery() { setGalLoading(true); setGalBatchErr(''); try { const r = await fetch('/api/gallery'); if (!r.ok) throw 0; setGalBatches(await r.json()); } catch { setGalBatchErr('Could not load gallery batches.'); } finally { setGalLoading(false); } }
  async function fetchBlogs() { setBlogLoading(true); setBlogErr(''); try { const r = await fetch('/api/blogs'); if (!r.ok) throw 0; setBlogs(await r.json()); } catch { setBlogErr('Could not load blogs.'); } finally { setBlogLoading(false); } }
  async function addBlog(e: React.FormEvent) {
    e.preventDefault(); setBlogFormErr('');
    const { title, author, date, category, excerpt, image, content, featured } = blogForm;
    if (!title.trim() || !author.trim() || !date.trim() || !category.trim() || !excerpt.trim() || !image.trim() || !content.trim()) { setBlogFormErr('All fields are required.'); return; }
    const paragraphs = content.split('\n').map(p => p.trim()).filter(Boolean);
    setAddingBlog(true);
    try { const r = await fetch('/api/blogs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, author, date, category, excerpt, image, content: paragraphs, featured }) }); if (!r.ok) throw 0; const nb = await r.json(); setBlogs(p => [nb, ...p]); setBlogForm({ title: '', author: '', date: '', category: '', excerpt: '', image: '', content: '', featured: false }); setShowAddBlog(false); }
    catch { setBlogFormErr('Failed to save blog.'); } finally { setAddingBlog(false); }
  }
  async function delBlog(id: string) { setBlogs(p => p.filter(b => b._id !== id)); try { const r = await fetch(`/api/blogs/${id}`, { method: 'DELETE' }); if (!r.ok) fetchBlogs(); } catch { fetchBlogs(); } }
  async function addAbout(e: React.FormEvent) { e.preventDefault(); setAboutFormErr(''); if (!aboutForm.category.trim() || !aboutForm.title.trim() || !aboutForm.image.trim()) { setAboutFormErr('All fields required.'); return; } setAddingAbout(true); try { const r = await fetch('/api/about-cards', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(aboutForm) }); if (!r.ok) throw 0; const c = await r.json(); setAboutCards(p => [...p, c]); setAboutForm({ category: '', title: '', image: '' }); setShowAddAbout(false); } catch { setAboutFormErr('Failed to add.'); } finally { setAddingAbout(false); } }
  async function delAbout(id: number) { setAboutCards(p => p.filter(c => c.id !== id)); try { const r = await fetch(`/api/about-cards/${id}`, { method: 'DELETE' }); if (!r.ok) fetchAbout(); } catch { fetchAbout(); } }
  async function addEv(e: React.FormEvent) { e.preventDefault(); setEvFormErr(''); if (!evForm.title.trim() || !evForm.date.trim() || !evForm.shortDescription.trim() || !evForm.coverImage.trim()) { setEvFormErr('All fields required.'); return; } setAddingEv(true); try { const r = await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(evForm) }); if (!r.ok) throw 0; const ev = await r.json(); setEvents(p => [...p, ev]); setEvForm({ title: '', date: '', shortDescription: '', coverImage: '' }); setShowAddEv(false); } catch { setEvFormErr('Failed to add.'); } finally { setAddingEv(false); } }
  async function delEv(id: number) { setEvents(p => p.filter(ev => ev.id !== id)); if (galId === id) setGalId(null); try { const r = await fetch(`/api/events/${id}`, { method: 'DELETE' }); if (!r.ok) fetchEvents(); } catch { fetchEvents(); } }
  async function addImg(eid: number) { if (!newImgUrl.trim()) { setGalErr('URL required.'); return; } setAddingImg(true); setGalErr(''); try { const r = await fetch(`/api/events/${eid}/gallery`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: newImgUrl }) }); if (!r.ok) throw 0; const u: EventItem = await r.json(); setEvents(p => p.map(ev => ev.id === eid ? u : ev)); setNewImgUrl(''); } catch { setGalErr('Failed to add image.'); } finally { setAddingImg(false); } }
  async function delImg(eid: number, idx: number) { setEvents(p => p.map(ev => { if (ev.id !== eid) return ev; const g = [...ev.gallery]; g.splice(idx, 1); return { ...ev, gallery: g }; })); try { const r = await fetch(`/api/events/${eid}/gallery`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageIndex: idx }) }); if (!r.ok) fetchEvents(); } catch { fetchEvents(); } }
  async function addProj(e: React.FormEvent) { e.preventDefault(); setProjFormErr(''); if (!projForm.title.trim() || !projForm.description.trim() || !projForm.image.trim()) { setProjFormErr('All fields required.'); return; } setAddingProj(true); try { const r = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(projForm) }); if (!r.ok) throw 0; const p = await r.json(); setProjects(prev => [...prev, p]); setProjForm({ title: '', description: '', image: '' }); setShowAddProj(false); } catch { setProjFormErr('Failed to add.'); } finally { setAddingProj(false); } }
  async function delProj(id: number) { setProjects(p => p.filter(pr => pr.id !== id)); try { const r = await fetch(`/api/projects/${id}`, { method: 'DELETE' }); if (!r.ok) fetchProjects(); } catch { fetchProjects(); } }
  async function addBatch(e: React.FormEvent) { e.preventDefault(); setBatchFormErr(''); if (!batchForm.batchName.trim() || !batchForm.year.trim() || !batchForm.image.trim()) { setBatchFormErr('Batch name, year, and image are required.'); return; } setAddingBatch(true); try { const r = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ batchName: batchForm.batchName, year: batchForm.year, members: parseInt(batchForm.members) || 0, image: batchForm.image }) }); if (!r.ok) throw 0; const nb = await r.json(); setGalBatches(p => [...p, nb]); setBatchForm({ batchName: '', year: '', members: '', image: '' }); setShowAddBatch(false); } catch { setBatchFormErr('Failed to add.'); } finally { setAddingBatch(false); } }
  async function delBatch(id: number) { setGalBatches(p => p.filter(b => b.id !== id)); if (galBatchId === id) setGalBatchId(null); try { const r = await fetch(`/api/gallery/${id}`, { method: 'DELETE' }); if (!r.ok) fetchGallery(); } catch { fetchGallery(); } }
  async function addBatchImg(bid: number) { if (!newBatchImgUrl.trim()) { setBatchImgErr('URL required.'); return; } setAddingBatchImg(true); setBatchImgErr(''); try { const r = await fetch(`/api/gallery/${bid}/images`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageUrl: newBatchImgUrl }) }); if (!r.ok) throw 0; const u: GalleryBatch = await r.json(); setGalBatches(p => p.map(b => b.id === bid ? u : b)); setNewBatchImgUrl(''); } catch { setBatchImgErr('Failed to add image.'); } finally { setAddingBatchImg(false); } }
  async function delBatchImg(bid: number, idx: number) { setGalBatches(p => p.map(b => { if (b.id !== bid) return b; const g = [...b.gallery]; g.splice(idx, 1); return { ...b, gallery: g }; })); try { const r = await fetch(`/api/gallery/${bid}/images`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ imageIndex: idx }) }); if (!r.ok) fetchGallery(); } catch { fetchGallery(); } }
  function handleLogin(e: React.FormEvent) { e.preventDefault(); if (loginData.email === 'admin@kidhope.org' && loginData.password === 'admin123') { setIsAuth(true); setLoginError(''); } else setLoginError('Invalid credentials.'); }

  const managed = events.find(ev => ev.id === galId) || null;
  const managedBatch = galBatches.find(b => b.id === galBatchId) || null;

  if (!isAuth) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 border border-[#7096D1]/20">
        <div className="text-center mb-8">
          <div className="bg-[#334EAC] w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7 text-white"><path d="M12 22v-7l-3-3m3 3l3-3m-3 3A5 5 0 1112 2v10z" /></svg></div>
          <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
          <p className="text-[#334EAC]/60 text-sm">Secure access to KidHope Management</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]">Email</label><input type="email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} placeholder="admin@kidhope.org" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-2xl px-5 py-4 text-[#334EAC] focus:outline-none focus:border-[#7096D1]" /></div>
          <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]">Password</label><input type="password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} placeholder="••••••••" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-2xl px-5 py-4 text-[#334EAC] focus:outline-none focus:border-[#7096D1]" /></div>
          {loginError && <p className="text-red-500 text-xs font-bold text-center">{loginError}</p>}
          <button type="submit" className="w-full bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg">Enter Dashboard</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#334EAC] font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-72 bg-[#334EAC] text-white p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-12"><div className="bg-[#7096D1] w-8 h-8 rounded-full flex items-center justify-center"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path d="M12 15l-3-3m3 3l3-3m-3 3V2" /></svg></div><span className="font-bold text-xl tracking-tight">Uttejana Foundation</span></div>
          <nav className="flex-grow space-y-2">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id as TabType); setGalId(null); setGalBatchId(null); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${activeTab === tab.id ? 'bg-[#7096D1] text-white shadow-lg' : 'hover:bg-white/10 text-white/70'}`}>
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={tab.icon} /></svg>
                {tab.label}
                {LIVE_TABS.includes(tab.id) && <span className="ml-auto bg-[#FFF9F0] text-[#334EAC] text-[0.55rem] font-bold px-2 py-0.5 rounded-full">LIVE</span>}
              </button>
            ))}
          </nav>
          <button onClick={() => setIsAuth(false)} className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-red-500/20 text-red-300 font-bold text-sm transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>Logout</button>
        </aside>
        <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-h-screen">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-3xl font-bold">{activeTab === 'about' && 'About Cards'}{activeTab === 'events' && (galId ? `Gallery — ${managed?.title || ''}` : 'Manage Events')}{activeTab === 'projects' && 'Manage Projects'}{activeTab === 'gallery' && (galBatchId ? `Images — ${managedBatch?.batchName || ''}` : 'Manage Gallery')}{activeTab === 'blogs' && 'Manage Blogs'}</h2>
              <p className="text-[#334EAC]/60 text-sm mt-1">{activeTab === 'about' && 'Add or remove scrollable cards in the About section.'}{activeTab === 'events' && !galId && 'Create events and manage their image galleries.'}{activeTab === 'events' && galId && "Add or remove images from this event's gallery."}{activeTab === 'projects' && 'Add or remove project campaigns.'}{activeTab === 'gallery' && !galBatchId && 'Create volunteer batches and manage their photo galleries.'}{activeTab === 'gallery' && galBatchId && "Add or remove images from this batch's gallery."}{activeTab === 'blogs' && 'Create, edit, or delete blog entries.'}</p>
            </div>
            <div className="shrink-0 flex gap-2">
              {activeTab === 'about' && <button onClick={() => { setShowAddAbout(!showAddAbout); setAboutFormErr(''); setAboutForm({ category: '', title: '', image: '' }); }} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${showAddAbout ? 'bg-gray-100 text-[#334EAC]' : 'bg-[#334EAC] hover:bg-[#7096D1] text-white'}`}>{showAddAbout ? 'Cancel' : '+ Add Card'}</button>}
              {activeTab === 'events' && !galId && <button onClick={() => { setShowAddEv(!showAddEv); setEvFormErr(''); setEvForm({ title: '', date: '', shortDescription: '', coverImage: '' }); }} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${showAddEv ? 'bg-gray-100 text-[#334EAC]' : 'bg-[#334EAC] hover:bg-[#7096D1] text-white'}`}>{showAddEv ? 'Cancel' : '+ Add Event'}</button>}
              {activeTab === 'events' && galId && <button onClick={() => { setGalId(null); setNewImgUrl(''); setGalErr(''); }} className="px-6 py-3 rounded-xl font-bold text-sm bg-gray-100 text-[#334EAC] hover:bg-gray-200 transition-all">Back to Events</button>}
              {activeTab === 'projects' && <button onClick={() => { setShowAddProj(!showAddProj); setProjFormErr(''); setProjForm({ title: '', description: '', image: '' }); }} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${showAddProj ? 'bg-gray-100 text-[#334EAC]' : 'bg-[#334EAC] hover:bg-[#7096D1] text-white'}`}>{showAddProj ? 'Cancel' : '+ Add Project'}</button>}
              {activeTab === 'gallery' && !galBatchId && <button onClick={() => { setShowAddBatch(!showAddBatch); setBatchFormErr(''); setBatchForm({ batchName: '', year: '', members: '', image: '' }); }} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${showAddBatch ? 'bg-gray-100 text-[#334EAC]' : 'bg-[#334EAC] hover:bg-[#7096D1] text-white'}`}>{showAddBatch ? 'Cancel' : '+ Add Batch'}</button>}
              {activeTab === 'gallery' && galBatchId && <button onClick={() => { setGalBatchId(null); setNewBatchImgUrl(''); setBatchImgErr(''); }} className="px-6 py-3 rounded-xl font-bold text-sm bg-gray-100 text-[#334EAC] hover:bg-gray-200 transition-all">Back to Batches</button>}
              {activeTab === 'blogs' && <button onClick={() => { setShowAddBlog(!showAddBlog); setBlogFormErr(''); setBlogForm({ title: '', author: '', date: '', category: '', excerpt: '', image: '', content: '', featured: false }); }} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${showAddBlog ? 'bg-gray-100 text-[#334EAC]' : 'bg-[#334EAC] hover:bg-[#7096D1] text-white'}`}>{showAddBlog ? 'Cancel' : '+ Add Blog'}</button>}
            </div>
          </div>
          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div>
              {showAddAbout && (
                <form onSubmit={addAbout} className="bg-white border border-[#7096D1]/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
                  <h3 className="font-bold text-lg mb-5">New About Card</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Category</label><input type="text" value={aboutForm.category} onChange={e => setAboutForm({ ...aboutForm, category: e.target.value })} placeholder="e.g. Who We Are" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Title</label><input type="text" value={aboutForm.title} onChange={e => setAboutForm({ ...aboutForm, title: e.target.value })} placeholder="e.g. Companies House" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Image URL</label><input type="text" value={aboutForm.image} onChange={e => { setAboutForm({ ...aboutForm, image: e.target.value }); setAboutPrevErr(false); }} placeholder="https://..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  </div>
                  {aboutForm.image && !aboutPrevErr && <img src={aboutForm.image} alt="Preview" className="h-28 w-48 object-cover rounded-xl border border-gray-200 mb-4" onError={() => setAboutPrevErr(true)} />}
                  {aboutFormErr && <p className="text-red-500 text-xs font-bold mb-3">{aboutFormErr}</p>}
                  <button type="submit" disabled={addingAbout} className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold uppercase tracking-widest px-8 py-3 rounded-xl text-sm disabled:opacity-60">{addingAbout ? 'Saving...' : 'Save Card'}</button>
                </form>
              )}
              {aboutLoading && <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#7096D1] border-t-transparent rounded-full"></div></div>}
              {aboutErr && <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 text-sm font-bold mb-6">{aboutErr} <button onClick={fetchAbout} className="underline ml-2">Retry</button></div>}
              {!aboutLoading && !aboutErr && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {aboutCards.map(card => (
                    <div key={card.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                      <div className="relative w-full h-44 overflow-hidden"><img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute top-3 left-3 bg-[#334EAC] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{card.category}</span></div>
                      <div className="p-5 flex flex-col flex-grow"><h4 className="font-bold text-lg mb-1">{card.title}</h4><p className="text-[#334EAC]/40 text-xs mb-4 truncate">{card.image}</p><button onClick={() => delAbout(card.id)} className="mt-auto w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={TRASH} /></svg>Delete</button></div>
                    </div>
                  ))}
                  {aboutCards.length === 0 && <div className="col-span-3 text-center py-20 text-gray-400"><p className="text-xl font-bold">No Cards Yet</p><p className="text-sm mt-1">Add your first about card above.</p></div>}
                </div>
              )}
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && !galId && (
            <div>
              {showAddEv && (
                <form onSubmit={addEv} className="bg-white border border-[#7096D1]/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
                  <h3 className="font-bold text-lg mb-5">New Event</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Event Title</label><input type="text" value={evForm.title} onChange={e => setEvForm({ ...evForm, title: e.target.value })} placeholder="e.g. Annual Charity Gala" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Date</label><input type="text" value={evForm.date} onChange={e => setEvForm({ ...evForm, date: e.target.value })} placeholder="e.g. March 12, 2025" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  </div>
                  <div className="mb-4"><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Short Description</label><textarea rows={2} value={evForm.shortDescription} onChange={e => setEvForm({ ...evForm, shortDescription: e.target.value })} placeholder="Brief description..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1] resize-none" /></div>
                  <div className="mb-4"><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Cover Image URL</label><input type="text" value={evForm.coverImage} onChange={e => { setEvForm({ ...evForm, coverImage: e.target.value }); setEvPrevErr(false); }} placeholder="https://..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  {evForm.coverImage && !evPrevErr && <img src={evForm.coverImage} alt="Preview" className="h-28 w-48 object-cover rounded-xl border border-gray-200 mb-4" onError={() => setEvPrevErr(true)} />}
                  {evFormErr && <p className="text-red-500 text-xs font-bold mb-3">{evFormErr}</p>}
                  <button type="submit" disabled={addingEv} className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold uppercase tracking-widest px-8 py-3 rounded-xl text-sm disabled:opacity-60">{addingEv ? 'Saving...' : 'Save Event'}</button>
                </form>
              )}
              {evLoading && <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#7096D1] border-t-transparent rounded-full"></div></div>}
              {evErr && <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 text-sm font-bold mb-6">{evErr} <button onClick={fetchEvents} className="underline ml-2">Retry</button></div>}
              {!evLoading && !evErr && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {events.map(ev => (
                    <div key={ev.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                      <div className="relative w-full h-44 overflow-hidden"><img src={ev.coverImage} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute top-3 left-3 bg-[#334EAC] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{ev.date}</span><span className="absolute top-3 right-3 bg-[#7096D1] text-white text-[0.6rem] font-bold px-2 py-1 rounded-full">{ev.gallery.length} imgs</span></div>
                      <div className="p-5 flex flex-col flex-grow"><h4 className="font-bold text-lg mb-1">{ev.title}</h4><p className="text-[#334EAC]/60 text-xs mb-4 line-clamp-2">{ev.shortDescription}</p>
                        <div className="mt-auto flex gap-2">
                          <button onClick={() => { setGalId(ev.id); setNewImgUrl(''); setGalErr(''); }} className="flex-1 flex items-center justify-center gap-2 bg-[#7096D1]/10 text-[#334EAC] hover:bg-[#7096D1] hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all">Gallery</button>
                          <button onClick={() => delEv(ev.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={TRASH} /></svg>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && <div className="col-span-3 text-center py-20 text-gray-400"><p className="text-xl font-bold">No Events Yet</p><p className="text-sm mt-1">Add your first event above.</p></div>}
                </div>
              )}
            </div>
          )}

          {/* EVENT GALLERY VIEW */}
          {activeTab === 'events' && galId && managed && (
            <div>
              <div className="bg-white border border-[#7096D1]/20 rounded-3xl p-6 mb-8 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Add Image to Gallery</h3>
                <div className="flex gap-3"><input type="text" value={newImgUrl} onChange={e => setNewImgUrl(e.target.value)} placeholder="Paste image URL here..." className="flex-grow bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /><button onClick={() => addImg(galId)} disabled={addingImg} className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold px-6 py-3 rounded-xl text-sm disabled:opacity-60 shrink-0">{addingImg ? 'Adding...' : 'Add'}</button></div>
                {galErr && <p className="text-red-500 text-xs font-bold mt-2">{galErr}</p>}
              </div>
              {managed.gallery.length === 0 ? <div className="text-center py-20 text-gray-400"><p className="text-xl font-bold">No Images Yet</p><p className="text-sm mt-1">Add the first image above.</p></div> : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {managed.gallery.map((url, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-square border border-gray-100 shadow-sm">
                      <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button onClick={() => delImg(galId, idx)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={TRASH} /></svg></button></div>
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[0.6rem] font-bold px-2 py-1 rounded-full">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div>
              {showAddProj && (
                <form onSubmit={addProj} className="bg-white border border-[#7096D1]/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
                  <h3 className="font-bold text-lg mb-5">New Project</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Project Title</label><input type="text" value={projForm.title} onChange={e => setProjForm({ ...projForm, title: e.target.value })} placeholder="e.g. Fight Poverty Programs" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Image URL</label><input type="text" value={projForm.image} onChange={e => { setProjForm({ ...projForm, image: e.target.value }); setProjPrevErr(false); }} placeholder="https://..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  </div>
                  <div className="mb-4"><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Description</label><textarea rows={2} value={projForm.description} onChange={e => setProjForm({ ...projForm, description: e.target.value })} placeholder="Brief description..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1] resize-none" /></div>
                  {projForm.image && !projPrevErr && <img src={projForm.image} alt="Preview" className="h-28 w-48 object-cover rounded-xl border border-gray-200 mb-4" onError={() => setProjPrevErr(true)} />}
                  {projFormErr && <p className="text-red-500 text-xs font-bold mb-3">{projFormErr}</p>}
                  <button type="submit" disabled={addingProj} className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold uppercase tracking-widest px-8 py-3 rounded-xl text-sm disabled:opacity-60">{addingProj ? 'Saving...' : 'Save Project'}</button>
                </form>
              )}
              {projLoading && <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#7096D1] border-t-transparent rounded-full"></div></div>}
              {projErr && <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 text-sm font-bold mb-6">{projErr} <button onClick={fetchProjects} className="underline ml-2">Retry</button></div>}
              {!projLoading && !projErr && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map(p => (
                    <div key={p.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                      <div className="relative w-full h-44 overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute top-3 left-3 bg-[#7096D1] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Campaign</span></div>
                      <div className="p-5 flex flex-col flex-grow"><h4 className="font-bold text-lg mb-1">{p.title}</h4><p className="text-[#334EAC]/60 text-xs mb-4 line-clamp-2">{p.description}</p><button onClick={() => delProj(p.id)} className="mt-auto w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={TRASH} /></svg>Delete</button></div>
                    </div>
                  ))}
                  {projects.length === 0 && <div className="col-span-3 text-center py-20 text-gray-400"><p className="text-xl font-bold">No Projects Yet</p><p className="text-sm mt-1">Add your first project above.</p></div>}
                </div>
              )}
            </div>
          )}

          {/* GALLERY TAB - BATCH LIST */}
          {activeTab === 'gallery' && !galBatchId && (
            <div>
              {showAddBatch && (
                <form onSubmit={addBatch} className="bg-white border border-[#7096D1]/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
                  <h3 className="font-bold text-lg mb-5">New Volunteer Batch</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Batch Name</label><input type="text" value={batchForm.batchName} onChange={e => setBatchForm({ ...batchForm, batchName: e.target.value })} placeholder="e.g. Spring Education Mentors" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Year</label><input type="text" value={batchForm.year} onChange={e => setBatchForm({ ...batchForm, year: e.target.value })} placeholder="e.g. 2025" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Members Count</label><input type="number" value={batchForm.members} onChange={e => setBatchForm({ ...batchForm, members: e.target.value })} placeholder="e.g. 45" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Cover Image URL</label><input type="text" value={batchForm.image} onChange={e => { setBatchForm({ ...batchForm, image: e.target.value }); setBatchPrevErr(false); }} placeholder="https://..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  </div>
                  {batchForm.image && !batchPrevErr && <img src={batchForm.image} alt="Preview" className="h-28 w-48 object-cover rounded-xl border border-gray-200 mb-4" onError={() => setBatchPrevErr(true)} />}
                  {batchFormErr && <p className="text-red-500 text-xs font-bold mb-3">{batchFormErr}</p>}
                  <button type="submit" disabled={addingBatch} className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold uppercase tracking-widest px-8 py-3 rounded-xl text-sm disabled:opacity-60">{addingBatch ? 'Saving...' : 'Save Batch'}</button>
                </form>
              )}
              {galLoading && <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#7096D1] border-t-transparent rounded-full"></div></div>}
              {galBatchErr && <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 text-sm font-bold mb-6">{galBatchErr} <button onClick={fetchGallery} className="underline ml-2">Retry</button></div>}
              {!galLoading && !galBatchErr && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {galBatches.map(b => (
                    <div key={b.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                      <div className="relative w-full h-44 overflow-hidden"><img src={b.image} alt={b.batchName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><span className="absolute top-3 left-3 bg-[#334EAC] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Batch {b.year}</span><span className="absolute top-3 right-3 bg-[#7096D1] text-white text-[0.6rem] font-bold px-2 py-1 rounded-full">{b.gallery.length} imgs</span></div>
                      <div className="p-5 flex flex-col flex-grow"><h4 className="font-bold text-lg mb-1">{b.batchName}</h4><p className="text-[#334EAC]/60 text-xs mb-4">{b.members} volunteers</p>
                        <div className="mt-auto flex gap-2">
                          <button onClick={() => { setGalBatchId(b.id); setNewBatchImgUrl(''); setBatchImgErr(''); }} className="flex-1 flex items-center justify-center gap-2 bg-[#7096D1]/10 text-[#334EAC] hover:bg-[#7096D1] hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all">Gallery</button>
                          <button onClick={() => delBatch(b.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={TRASH} /></svg>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {galBatches.length === 0 && <div className="col-span-3 text-center py-20 text-gray-400"><p className="text-xl font-bold">No Batches Yet</p><p className="text-sm mt-1">Add your first volunteer batch above.</p></div>}
                </div>
              )}
            </div>
          )}

          {/* GALLERY BATCH IMAGE VIEW */}
          {activeTab === 'gallery' && galBatchId && managedBatch && (
            <div>
              <div className="bg-white border border-[#7096D1]/20 rounded-3xl p-6 mb-8 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Add Image to Gallery</h3>
                <div className="flex gap-3"><input type="text" value={newBatchImgUrl} onChange={e => setNewBatchImgUrl(e.target.value)} placeholder="Paste image URL here..." className="flex-grow bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /><button onClick={() => addBatchImg(galBatchId)} disabled={addingBatchImg} className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold px-6 py-3 rounded-xl text-sm disabled:opacity-60 shrink-0">{addingBatchImg ? 'Adding...' : 'Add'}</button></div>
                {batchImgErr && <p className="text-red-500 text-xs font-bold mt-2">{batchImgErr}</p>}
              </div>
              {managedBatch.gallery.length === 0 ? <div className="text-center py-20 text-gray-400"><p className="text-xl font-bold">No Images Yet</p><p className="text-sm mt-1">Add the first image above.</p></div> : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {managedBatch.gallery.map((url, idx) => (
                    <div key={idx} className="relative group rounded-2xl overflow-hidden aspect-square border border-gray-100 shadow-sm">
                      <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button onClick={() => delBatchImg(galBatchId, idx)} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={TRASH} /></svg></button></div>
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[0.6rem] font-bold px-2 py-1 rounded-full">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div>
              {showAddBlog && (
                <form onSubmit={addBlog} className="bg-white border border-[#7096D1]/20 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
                  <h3 className="font-bold text-lg mb-5">New Blog Post</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Title</label><input type="text" value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} placeholder="e.g. Youth Empowerment in 2025" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Author</label><input type="text" value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} placeholder="e.g. Rahul Sharma" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Date</label><input type="text" value={blogForm.date} onChange={e => setBlogForm({ ...blogForm, date: e.target.value })} placeholder="e.g. January 15, 2026" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                    <div><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Category</label><input type="text" value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value })} placeholder="e.g. Youth Awareness" className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  </div>
                  <div className="mb-4"><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Cover Image URL</label><input type="text" value={blogForm.image} onChange={e => { setBlogForm({ ...blogForm, image: e.target.value }); setBlogPrevErr(false); }} placeholder="https://..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1]" /></div>
                  {blogForm.image && !blogPrevErr && <img src={blogForm.image} alt="Preview" className="h-28 w-48 object-cover rounded-xl border border-gray-200 mb-4" onError={() => setBlogPrevErr(true)} />}
                  <div className="mb-4"><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Excerpt (short summary)</label><textarea rows={2} value={blogForm.excerpt} onChange={e => setBlogForm({ ...blogForm, excerpt: e.target.value })} placeholder="A brief summary shown on the blog listing..." className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1] resize-none" /></div>
                  <div className="mb-4"><label className="block text-xs font-bold uppercase tracking-widest mb-2 text-[#334EAC]/70">Content <span className="normal-case font-normal text-[#334EAC]/50">(each line = one paragraph)</span></label><textarea rows={6} value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} placeholder={"First paragraph of the article...\nSecond paragraph...\nThird paragraph..."} className="w-full bg-[#FFF9F0] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7096D1] resize-none" /></div>
                  <div className="mb-5 flex items-center gap-3">
                    <input type="checkbox" id="featured" checked={blogForm.featured} onChange={e => setBlogForm({ ...blogForm, featured: e.target.checked })} className="w-4 h-4 accent-[#334EAC]" />
                    <label htmlFor="featured" className="text-sm font-bold text-[#334EAC]">Mark as Featured Post <span className="font-normal text-[#334EAC]/50">(shown prominently at top of blog page)</span></label>
                  </div>
                  {blogFormErr && <p className="text-red-500 text-xs font-bold mb-3">{blogFormErr}</p>}
                  <button type="submit" disabled={addingBlog} className="bg-[#334EAC] hover:bg-[#7096D1] text-white font-bold uppercase tracking-widest px-8 py-3 rounded-xl text-sm disabled:opacity-60">{addingBlog ? 'Publishing...' : 'Publish Blog'}</button>
                </form>
              )}
              {blogLoading && <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 border-4 border-[#7096D1] border-t-transparent rounded-full"></div></div>}
              {blogErr && <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 text-sm font-bold mb-6">{blogErr} <button onClick={fetchBlogs} className="underline ml-2">Retry</button></div>}
              {!blogLoading && !blogErr && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {blogs.map(b => (
                    <div key={b._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                      <div className="relative w-full h-44 overflow-hidden">
                        <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 left-3 bg-[#334EAC] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{b.category}</span>
                        {b.featured && <span className="absolute top-3 right-3 bg-[#7096D1] text-white text-[0.6rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Featured</span>}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h4 className="font-bold text-lg mb-1 line-clamp-2">{b.title}</h4>
                        <p className="text-[#7096D1] text-xs mb-1">{b.author} · {b.date}</p>
                        <p className="text-[#334EAC]/60 text-xs mb-4 line-clamp-2">{b.excerpt}</p>
                        <button onClick={() => delBlog(b._id)} className="mt-auto w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl font-bold text-xs transition-all">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={TRASH} /></svg>Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {blogs.length === 0 && <div className="col-span-3 text-center py-20 text-gray-400"><p className="text-xl font-bold">No Blogs Yet</p><p className="text-sm mt-1">Publish your first blog post above.</p></div>}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
