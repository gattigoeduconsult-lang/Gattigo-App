/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  BookOpen,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  ChevronDown,
  Info,
  BookMarked,
  Filter,
  Check,
  ChevronRight,
  Award,
  DollarSign,
  Heart,
  TrendingUp,
  Clock,
  ShieldCheck,
  Camera,
  Home,
  MessageSquare,
  BadgeAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking, Destination, Course, Scholarship, BlogPost, Testimonial } from './types';
import {
  DESTINATIONS,
  COURSES,
  SCHOLARSHIPS,
  BLOGS,
  TESTIMONIALS,
  STEP_ACCORDIONS,
  PARTNERS_LOGOS,
} from './data';
import UserPortal from './components/UserPortal';
import AICoPilot from './components/AICoPilot';
import InteractiveHub from './components/InteractiveHub';

export default function App() {
  // Persistence-driven Applications state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('gattigo_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gattigo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Form states
  const [heroForm, setHeroForm] = useState({
    destination: '',
    studyLevel: '',
    intake: '',
    name: '',
    email: '',
    phone: '',
  });

  const [expertForm, setExpertForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    studyLevel: '',
    intake: '',
    message: '',
  });

  // Active Interactive selections
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [courseFilter, setCourseFilter] = useState('All');
  const [accordionOpen, setAccordionOpen] = useState<string | null>('1');
  const [portalOpen, setPortalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Status simulation triggers
  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  // Pre-load example dossier to showcase states
  const handleLoadDummy = () => {
    const dummy: Booking = {
      id: 'mock-' + Date.now(),
      fullName: 'Chinedu Ademola Okafor',
      email: 'chinedu.okafor@gmail.com',
      phone: '+234 803 123 4567',
      destination: 'Canada',
      studyLevel: 'Master of Public Health',
      preferredIntake: 'Fall 2026',
      message: 'Self-sponsored using WAEC waivers and undergraduate GPA evaluation (3.92/5.00).',
      status: 'Reviewing',
      dateSubmitted: new Date().toLocaleDateString(),
      type: 'Consultation',
    };
    setBookings((prev) => [...prev, dummy]);
    setPortalOpen(true);
    triggerToast('Example profile dossier loaded from Lagos center!');
  };

  // Submit forms
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroForm.name || !heroForm.email || !heroForm.phone) {
      alert('Please fill out Name, Email, and Phone fields.');
      return;
    }
    const newBooking: Booking = {
      id: Date.now().toString(),
      fullName: heroForm.name,
      email: heroForm.email,
      phone: heroForm.phone,
      destination: heroForm.destination || 'Not Specified',
      studyLevel: heroForm.studyLevel || 'Not Specified',
      preferredIntake: heroForm.intake || 'Not Specified',
      status: 'Received',
      dateSubmitted: new Date().toLocaleDateString(),
      type: 'Inquiry',
    };
    setBookings((prev) => [...prev, newBooking]);
    setPortalOpen(true);
    // Reset
    setHeroForm({ destination: '', studyLevel: '', intake: '', name: '', email: '', phone: '' });
    triggerToast('🎉 Hurray! Your quick admission inquiry has been queued. Dashboard opened.');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleExpertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expertForm.name || !expertForm.email || !expertForm.phone) {
      alert('Please fill out Name, Email, and Phone fields.');
      return;
    }
    const newBooking: Booking = {
      id: Date.now().toString(),
      fullName: expertForm.name,
      email: expertForm.email,
      phone: expertForm.phone,
      destination: expertForm.destination || 'Not Specified',
      studyLevel: expertForm.studyLevel || 'Not Specified',
      preferredIntake: expertForm.intake || 'Not Specified',
      message: expertForm.message,
      status: 'Received',
      dateSubmitted: new Date().toLocaleDateString(),
      type: 'Consultation',
    };
    setBookings((prev) => [...prev, newBooking]);
    setPortalOpen(true);
    // Reset
    setExpertForm({ name: '', email: '', phone: '', destination: '', studyLevel: '', intake: '', message: '' });
    triggerToast('🎉 Success! Your professional consultation booking has been completed. Track below!');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Direct fast apply triggers from Destination / Scholarship clicks
  const triggerAutoApply = (dest: string, level: string = 'Master Study') => {
    setExpertForm((prev) => ({
      ...prev,
      destination: dest,
      studyLevel: level,
      message: `Enquiring specifically about study opportunities in ${dest} listed on the destination matrix.`,
    }));
    const targetElement = document.getElementById('expert-guidance-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    triggerToast(`Form preselected: study ${level} in ${dest}. Fill details below!`);
  };

  const handleHubApply = (dest: string, level: string, details: string) => {
    setExpertForm((prev) => ({
      ...prev,
      destination: dest,
      studyLevel: level,
      message: `Checked profile using Interactive Hub. ${details} I would like to verify my eligibility.`,
    }));
    const targetElement = document.getElementById('expert-guidance-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    triggerToast(`Profile preselected: study ${level} in ${dest}. Details auto-filled!`);
  };

  // Course categories extraction
  const categories = ['All', ...new Set(COURSES.map((c) => c.category))];
  const filteredCourses = courseFilter === 'All'
    ? COURSES
    : COURSES.filter((c) => c.category === courseFilter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 selection:bg-[#F38B0E] selection:text-white">
      
      {/* SUCCESS TOAST MESSAGE */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            className="fixed top-24 left-6 right-6 md:left-auto md:right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-orange-500 max-w-md flex items-start gap-3"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            <Sparkles className="h-5 w-5 text-[#F38B0E] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">{successToast}</p>
              <p className="text-xs text-slate-400 mt-1">Gattigo student file has been created successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER & STICKY NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#063970] text-white shadow-[#04254b]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F38B0E] text-white text-2xl font-bold border-2 border-white/20 shadow-md group-hover:scale-105 transition duration-300">
                G
              </span>
              <div>
                <span className="block font-display text-xl font-extrabold tracking-tight">
                  GATTIGO
                </span>
                <span className="block text-[10px] tracking-widest text-orange-400 font-semibold uppercase leading-none">
                  Edu Consult & Travel
                </span>
              </div>
            </a>

            {/* Nav Menu */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <a href="#destinations-grid" className="text-blue-100 hover:text-orange-400 transition">Destinations</a>
              <a href="#explore-services" className="text-blue-100 hover:text-orange-400 transition font-sans">Services</a>
              <a href="#success-community" className="text-blue-100 hover:text-orange-400 transition">Community</a>
              <a href="#popular-courses" className="text-blue-100 hover:text-orange-400 transition">Courses</a>
              <a href="#scholarships-block" className="text-blue-100 hover:text-orange-400 transition">Scholarships</a>
              <a href="#educational-resources" className="text-blue-100 hover:text-orange-400 transition">Advice</a>
              <a href="#steps-accordion" className="text-blue-100 hover:text-orange-400 transition">Process</a>
            </nav>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPortalOpen(!portalOpen)}
                className={`relative px-4 py-2 border rounded-xl text-xs font-bold transition flex items-center gap-2 ${portalOpen ? 'bg-orange-500 text-white border-orange-500' : 'bg-[#04254b]/60 border-blue-500/30 text-blue-200 hover:text-white hover:bg-blue-900/40'}`}
              >
                <span>Portal Desktop</span>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${bookings.length > 0 ? 'bg-emerald-400' : 'bg-orange-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${bookings.length > 0 ? 'bg-emerald-400' : 'bg-orange-400'}`}></span>
                </span>
              </button>
              
              <a
                href="#expert-guidance-section"
                className="hidden sm:inline-block px-5 py-2.5 rounded-xl bg-[#F38B0E] hover:bg-[#d87600] text-white text-xs font-bold tracking-wide uppercase transition duration-200 hover:shadow-lg focus:outline-none"
              >
                Free Consultation
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* PORTAL SECTION (IF OPEN) */}
      <AnimatePresence>
        {portalOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-900 border-b border-slate-800"
          >
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              <UserPortal bookings={bookings} onAddDummyBooking={handleLoadDummy} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO SECTION */}
      <section id="hero-banner" className="relative bg-[#063970] text-white overflow-hidden py-16 lg:py-24">
        {/* Faint Background image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.35] mix-blend-overlay z-0 pointer-events-none" 
          style={{ backgroundImage: 'url("/Images/Gattigo%20background%20image.png")' }}
        />
        {/* Darkening overlay for extreme readability and high-contrast text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#063970]/60 via-[#04254b]/85 to-[#04254b] z-0 pointer-events-none" />

        {/* Decorative ambient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Headings & Intro */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30 animate-pulse-slow">
                <Sparkles className="h-3.5 w-3.5 text-[#F38B0E]" />
                Nigeria's Foremost Study Abroad Partner
              </span>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                Study Abroad <br />
                <span className="text-[#F38B0E]">With Confidence</span>
              </h1>
              
              <p className="text-[#D3E4F6] text-md sm:text-lg leading-relaxed max-w-2xl">
                Helping Nigerian students gain admission into top universities in Canada, UK, USA, Australia, Ireland, Germany, and other leading destinations. Start your journey with certified immigration specialists.
              </p>

              {/* Action indicators */}
              <div className="flex flex-wrap gap-4 items-center pt-2">
                <a
                  href="#expert-guidance-section"
                  className="px-6 py-3.5 rounded-xl bg-[#F38B0E] hover:bg-[#d87600] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-orange-500/20 transition flex items-center gap-2"
                >
                  Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#destinations-grid"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition border border-white/10"
                >
                  Explore Destinations
                </a>
              </div>

              {/* Quick statistics checklist */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-white">
                <div>
                  <span className="block text-2xl font-extrabold text-[#F38B0E]">98.2%</span>
                  <span className="block text-xs text-blue-200">Visa Success Rate</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-[#F38B0E]">2500+</span>
                  <span className="block text-xs text-blue-200">Visas Approved</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-[#F38B0E]">50+</span>
                  <span className="block text-xs text-blue-200">Partners Globally</span>
                </div>
              </div>
            </div>

            {/* Right Col: Happiness African Student + Quick Inquiry Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 md:p-8 text-gray-900 shadow-2xl border border-gray-100 flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                  <div className="h-14 w-14 shrink-0 rounded-full overflow-hidden bg-orange-100 border-2 border-[#F38B0E]">
                    <img
                      src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200"
                      alt="Happy student"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#063970] leading-snug">Quick Admission Inquiry</h3>
                    <p className="text-xs text-gray-500">Average response time: 15 minutes</p>
                  </div>
                </div>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Destination</label>
                      <select
                        value={heroForm.destination}
                        onChange={(e) => setHeroForm({ ...heroForm, destination: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:border-[#063970] bg-slate-50 font-medium"
                      >
                        <option value="">Select Country</option>
                        {DESTINATIONS.map((d) => (
                          <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Study Level</label>
                      <select
                        value={heroForm.studyLevel}
                        onChange={(e) => setHeroForm({ ...heroForm, studyLevel: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:border-[#063970] bg-slate-50 font-medium"
                      >
                        <option value="">Select Degree</option>
                        <option value="Undergraduate">Bachelor (Undergraduate)</option>
                        <option value="Postgraduate (Master)">Master (Postgraduate)</option>
                        <option value="PhD Program">PhD / Doctorate</option>
                        <option value="Diploma / Pathway">Vocational Certificate</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Preferred Intake</label>
                    <select
                      value={heroForm.intake}
                      onChange={(e) => setHeroForm({ ...heroForm, intake: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:border-[#063970] bg-slate-50 font-medium"
                    >
                      <option value="">Choose Intake</option>
                      <option value="Fall 2026 (September)">Fall 2026 (September)</option>
                      <option value="Winter 2027 (January)">Winter 2027 (January)</option>
                      <option value="Spring 2027 (May)">Spring 2027 (May/Summer)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oluwaseun Adeleke"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:border-[#063970] bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={heroForm.email}
                        onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:border-[#063970] bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +234 803..."
                        value={heroForm.phone}
                        onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                        className="w-full text-xs rounded-xl border border-gray-200 p-2.5 outline-none focus:border-[#063970] bg-slate-50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#063970] hover:bg-[#04254b] text-white font-bold text-xs uppercase tracking-wide transition duration-200 focus:outline-none"
                  >
                    Submit Quick Inquiry
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHY STUDENTS TRUST GATTIGO */}
      <section id="why-trust-gattigo" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F38B0E] bg-orange-50 px-3.5 py-1.5 rounded-full">
              Built on Integrity
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
              Why Students Trust Gattigo
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Our 100% transparent counseling and legal compliance make study visa filings simple and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#063970] text-white text-lg font-bold group-hover:scale-105 transition">
                🏫
              </span>
              <h3 className="font-display font-bold text-lg text-gray-900 mt-4">University Admissions</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Direct credentials sourcing & documentation audits with WAEC waivers, generating unconditional offers fast.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#063970] text-white text-lg font-bold group-hover:scale-105 transition">
                🛂
              </span>
              <h3 className="font-display font-bold text-lg text-gray-900 mt-4">Visa Assistance</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Fulfilling country-specific study permit proofs, visa statement calculations (UK/CN/AU), and mock reviews.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#063970] text-white text-lg font-bold group-hover:scale-105 transition">
                🎓
              </span>
              <h3 className="font-display font-bold text-lg text-gray-900 mt-4">Scholarship Guidance</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Advising on Fully Funded programs (Commonwealth, DAAD, Mastercard) & securing partner university waivers.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#063970] text-white text-lg font-bold group-hover:scale-105 transition">
                🏠
              </span>
              <h3 className="font-display font-bold text-lg text-gray-900 mt-4">Accommodation Support</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Securing cozy student campus housing & comfortable off-campus family layouts before stepping on board.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#063970] text-white text-lg font-bold group-hover:scale-105 transition">
                💼
              </span>
              <h3 className="font-display font-bold text-lg text-gray-900 mt-4">Career Counseling</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Aligning academic plans with global employment prospects, work rights, and local transition metrics.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition group">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#063970] text-white text-lg font-bold group-hover:scale-105 transition">
                ✈️
              </span>
              <h3 className="font-display font-bold text-lg text-gray-900 mt-4">Travel Arrangements</h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                Handling convenient flight ticket booking, baggage optimizations, transit routing details, and landing protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: GET EXPERT GUIDANCE */}
      <section id="expert-guidance-section" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Consultation Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
              <div className="mb-6">
                <span className="text-xs font-bold text-[#F38B0E] uppercase tracking-wider">Book Free Counseling</span>
                <h3 className="font-display font-bold text-2xl text-[#063970] mt-1">Submit Academic Evaluation File</h3>
                <p className="text-xs text-gray-500 mt-1">Our certified advisors inside Nigeria review your transcripts and respond in 1 working day.</p>
              </div>

              <form onSubmit={handleExpertSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Emeka Obi"
                      value={expertForm.name}
                      onChange={(e) => setExpertForm({ ...expertForm, name: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#063970] focus:ring-1 focus:ring-[#063970]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@gmail.com"
                      value={expertForm.email}
                      onChange={(e) => setExpertForm({ ...expertForm, email: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#063970] focus:ring-1 focus:ring-[#063970]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Active Number"
                      value={expertForm.phone}
                      onChange={(e) => setExpertForm({ ...expertForm, phone: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#063970] focus:ring-1 focus:ring-[#063970]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Country</label>
                    <select
                      value={expertForm.destination}
                      onChange={(e) => setExpertForm({ ...expertForm, destination: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#063970] focus:ring-1 focus:ring-[#063970]"
                    >
                      <option value="">Choose Country</option>
                      {DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Study Level</label>
                    <input
                      type="text"
                      placeholder="e.g. Master of Data Science"
                      value={expertForm.studyLevel}
                      onChange={(e) => setExpertForm({ ...expertForm, studyLevel: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#063970] focus:ring-1 focus:ring-[#063970]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Intake</label>
                    <select
                      value={expertForm.intake}
                      onChange={(e) => setExpertForm({ ...expertForm, intake: e.target.value })}
                      className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#063970] focus:ring-1 focus:ring-[#063970]"
                    >
                      <option value="">Select intake Date</option>
                      <option value="Fall 2026 (September)">Fall 2026 (September)</option>
                      <option value="Winter 2027 (January)">Winter 2027 (January)</option>
                      <option value="Spring 2027 (May)">Spring 2027 (May)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Special message & academic history</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state your WAEC/Undergraduate GPA grade, funding availability, sponsorship, or target university details..."
                    value={expertForm.message}
                    onChange={(e) => setExpertForm({ ...expertForm, message: e.target.value })}
                    className="w-full text-xs rounded-xl border border-gray-200 p-3 outline-none focus:border-[#063970] focus:ring-1 focus:ring-[#063970]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#F38B0E] hover:bg-[#d87600] text-white text-xs font-bold uppercase tracking-wider transition hover:shadow-md"
                >
                  Verify Eligible Entry Channels
                </button>
              </form>
            </div>

            {/* Right: Rich Marketing Images / Facts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden h-96 group">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600"
                  alt="Student campus studies"
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Visual backdrop cover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F38B0E] bg-orange-950/80 px-2 py-1 rounded inline-block mb-2">
                    Acceptance Celebration
                  </span>
                  <h4 className="text-xl font-bold font-display text-white">Direct WAEC Admission Waiver and Proof of Funds Experts</h4>
                </div>
              </div>

              {/* Verified badges details */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  🛡️
                </div>
                <div>
                  <h5 className="font-semibold text-xs text-slate-900 leading-tight">QAC Certified Education Agents</h5>
                  <p className="text-[11px] text-gray-500 mt-0.5">Compliant with Canadian IRCC & UK VI immigration standard procedures.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT YOU SHOULD KNOW */}
      <section id="what-you-should-know" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
              Expert Guidance
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-gray-900">
              Essential Study Abroad Directives
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Stay ahead of policy updates with our handpicked intelligence bulletins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 flex flex-col justify-between hover:border-[#F38B0E]/30 bg-slate-50 transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-orange-500 uppercase">Canada Pathways</span>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-2">How to Study in Canada from Nigeria</h4>
                <p className="text-xs text-gray-500 line-clamp-3">
                  Check rules for WAEC scores, proof of finance requirements, and GIC blocked counts processing.
                </p>
              </div>
              <button
                onClick={() => setSelectedBlog(BLOGS[0])}
                className="text-xs font-bold text-[#063970] hover:text-[#F38B0E] transition inline-flex items-center gap-1 mt-2 text-left"
              >
                Read Guideline <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 flex flex-col justify-between hover:border-[#F38B0E]/30 bg-slate-50 transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-500 uppercase">Scholarships</span>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-2">Top Scholarships for Nigerian Students</h4>
                <p className="text-xs text-gray-500 line-clamp-3">
                  Securing government, corporate, and university shared scholarships to cover 100% tuition expenses.
                </p>
              </div>
              <button
                onClick={() => setSelectedBlog(BLOGS[3])}
                className="text-xs font-bold text-[#063970] hover:text-[#F38B0E] transition inline-flex items-center gap-1 mt-2 text-left"
              >
                Read Guideline <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 flex flex-col justify-between hover:border-[#F38B0E]/30 bg-slate-50 transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Visa Strategy</span>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-2">Student Visa Interview Tips</h4>
                <p className="text-xs text-gray-500 line-clamp-3">
                  Standard responses regarding career outcomes, home ties, and sponsor alignment to pass consular officer checks.
                </p>
              </div>
              <button
                onClick={() => setSelectedBlog(BLOGS[1])}
                className="text-xs font-bold text-[#063970] hover:text-[#F38B0E] transition inline-flex items-center gap-1 mt-2 text-left"
              >
                Read Guideline <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 flex flex-col justify-between hover:border-[#F38B0E]/30 bg-slate-50 transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#063970] uppercase">Tuition Control</span>
                <h4 className="font-bold text-sm text-slate-900 line-clamp-2">Most Affordable Universities Abroad</h4>
                <p className="text-xs text-gray-500 line-clamp-3">
                  Zero tuition universities in Europe or cheap regional institutions in the UK & Canada.
                </p>
              </div>
              <button
                onClick={() => setSelectedBlog(BLOGS[2])}
                className="text-xs font-bold text-[#063970] hover:text-[#F38B0E] transition inline-flex items-center gap-1 mt-2 text-left"
              >
                Read Guideline <ChevronRight className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: STUDY DESTINATIONS */}
      <section id="destinations-grid" className="py-20 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F38B0E] bg-orange-100 px-3.5 py-1.5 rounded-full">
              Global Gateways
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-slate-900">
              Study Destinations Map
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Select a flag to discover premium admissions, stay back parameters, and fast visa options in leading countries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest) => (
              <motion.div
                key={dest.id}
                className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition group cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedDestination(dest)}
                whileHover={{ y: -5 }}
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full text-lg px-2 py-0.5 filter shadow-sm">
                      {dest.flag} {dest.name}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-semibold">{dest.universitiesCount}</span>
                      <span className="bg-blue-50 text-[#063970] font-bold px-2 py-0.5 rounded text-[10px]">
                        Visa: {dest.visaProcessingTime.split(' ')[0]} wks
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono italic">{dest.tuitionEstimate.split('/')[0]}</p>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mt-2 bg-slate-50 p-2 rounded">
                      💡 {dest.workOpportunities.split('-')[0]} rights available after studies.
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-gray-100 flex gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDestination(dest);
                    }}
                    className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-[#063970] bg-slate-100 hover:bg-slate-200 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerAutoApply(dest.name);
                    }}
                    className="flex-1 py-1.5 rounded-lg text-[11px] font-bold text-white bg-[#F38B0E] hover:bg-orange-600 transition"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SMART BUDGET & PATHWAY HUB */}
      <section id="interactive-calculator" className="py-20 bg-slate-100 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveHub onSelectApply={handleHubApply} />
        </div>
      </section>

      {/* SECTION 6: EXPLORE OUR SERVICES */}
      <section id="explore-services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
              Full-Suite Services
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-gray-900 animate-pulse-slow">
              Explore Our Services
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Comprehensive end-to-end processing for admissions, visa support, and student settlement abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-[#063970] transition flex gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">🏫</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Study Abroad</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Admissions processing for universities globally, sorting through academic constraints and securing direct letters of intent.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-[#F38B0E] transition flex gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-orange-100 text-[#F38B0E] flex items-center justify-center font-bold">🛂</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Visa Support</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Adhering strictly to state permit criteria. We write perfect immigration SOPs, arrange biometrics, and schedule physical reviews.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-emerald-500 transition flex gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">💰</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Scholarship Assistance</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Securing academic scholarship and tuition waivers. We help write winner essays and reference statement patterns.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-indigo-500 transition flex gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">✈️</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Travel Packages</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Coordinating flight routes with generous student luggage allowances and fast flight clearances.</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-purple-500 transition flex gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">🏠</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Accommodation</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Pre-arranging secure off-campus family apartments and local university dorm parameters before flight landing.</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-rose-500 transition flex gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">🎓</span>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Pre-Departure Briefing</h4>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Preparation workshops to ease foreign currency conversions, airport transitions, and local campus cultures.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW GATTIGO HELPS YOU */}
      <section id="how-helps-you" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F38B0E] bg-orange-100 px-3.5 py-1.5 rounded-full">
              Transparent Framework
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-[#063970]">
              How Gattigo Helps You
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Our 8-stage client framework maps everything perfectly from career modeling to post-arrival integration.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: '1', emoji: '🧭', title: 'Career Assessment', text: 'Counseling and program selection.' },
              { id: '2', emoji: '🏫', title: 'University Choice', text: 'Narrowing down top eligible schools.' },
              { id: '3', emoji: '📄', title: 'Admission Apply', text: 'Securing fast CAS/admission letters.' },
              { id: '4', emoji: '✉️', title: 'Offer letter Help', text: 'Coordinating acceptance fee deposits.' },
              { id: '5', emoji: '🛂', title: 'Visa Processing', text: 'Perfect visa SOP & document compilation.' },
              { id: '6', emoji: '🏠', title: 'Accommodation', text: 'Housing coordinates lock.' },
              { id: '7', emoji: '✈️', title: 'Flight Booking', text: 'Best routes and luggage discounts.' },
              { id: '8', emoji: '🎓', title: 'Departure Care', text: 'Briefings and student network joins.' },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2 flex flex-col justify-between group hover:border-[#063970] transition">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#F38B0E] font-mono block">STAGE 0{step.id}</span>
                  <span className="text-2xl mt-1 block">{step.emoji}</span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">{step.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-snug">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: STUDENT SUCCESS COMMUNITY */}
      <section id="success-community" className="py-20 bg-gradient-to-tr from-[#063970] to-[#04254b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Stats & Communities */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/40 border border-orange-500/20 px-3.5 py-1 rounded-full animate-pulse-slow">
                Gattigo Community
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Our Nigerian Scholars <br />
                <span className="text-[#F38B0E]">Success Community</span>
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                We maintain active WhatsApp groups and peer support networks in London, Toronto, Dublin, Sydney, and Munich. Join other successful scholars who have achieved their dreams through Gattigo.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <CheckCircle2 className="h-6 w-6 text-[#F38B0E] mx-auto mb-2" />
                  <span className="block text-xl sm:text-2xl font-black text-white">5,000+</span>
                  <span className="block text-[11px] text-blue-200 uppercase tracking-wide">Files Processed</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Users className="h-6 w-6 text-[#F38B0E] mx-auto mb-2" />
                  <span className="block text-xl sm:text-2xl font-black text-white">2,500+</span>
                  <span className="block text-[11px] text-blue-200 uppercase tracking-wide">Study Visas Approved</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Compass className="h-6 w-6 text-[#F38B0E] mx-auto mb-2" />
                  <span className="block text-xl sm:text-2xl font-black text-white">50+</span>
                  <span className="block text-[11px] text-blue-200 uppercase tracking-wide">Partner Institutions</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Globe className="h-6 w-6 text-[#F38B0E] mx-auto mb-2" />
                  <span className="block text-xl sm:text-2xl font-black text-white">15+</span>
                  <span className="block text-[11px] text-blue-200 uppercase tracking-wide">Global Countries</span>
                </div>
              </div>
            </div>

            {/* Right: Success Map and interactive testimonial trigger */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="font-semibold text-sm uppercase text-[#F38B0E] tracking-wider border-b border-white/10 pb-2 flex items-center gap-1.5">
                🌍 Fast Fact Check
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Lagos and Abuja embassies are actively reviewing files for September 2026 resumption intakes. Ensure your bank maintenance balances (excluding tuition deposits paid) are held for at least 28-30 consecutive days before slot booking!
              </p>
              
              <div className="rounded-2xl overflow-hidden h-48 relative border border-white/10 mt-4 group">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
                  alt="Student community"
                  className="h-full w-full object-cover group-hover:scale-102 transition duration-300"
                />
                <div className="absolute inset-0 bg-blue-900/60 p-4 flex flex-col justify-between">
                  <span className="inline-block bg-[#F38B0E] text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded leading-none">
                    Lagos Head Office Panel
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white font-display">Gattigo pre-departure briefing seminar</h4>
                    <p className="text-[10px] text-blue-100">Lagos Ikeja office & virtual streaming channel.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: GATTIGO STUDENT STORIES */}
      <section id="student-stories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-50 px-3.5 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-gray-900">
              Gattigo Student Success Stories
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Heartfelt appreciation from students who navigated local visa setbacks with our support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50 border border-gray-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedTestimonial(t)}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#F38B0E]">
                      <img
                        src={t.portrait}
                        alt={t.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{t.name}</h4>
                      <p className="text-[11px] text-[#063970] font-semibold mt-0.5">{t.university}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-4 leading-relaxed line-clamp-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                  <span className="font-bold underline text-[#063970]">{t.destination} ({t.course.split(' ')[0]})</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F38B0E] bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1">
                    🎥 Success Vlog
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: STUDY ABROAD PROCESS PIED-ACCORDION */}
      <section id="steps-accordion" className="py-20 bg-slate-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063970] bg-blue-50 px-3.5 py-1.5 rounded-full">
              Timeline Step-by-Step
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight mt-3 text-slate-900">
              The Study Abroad Journey Map
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1.5">
              Everything detailed from consultation bookings to land resumes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-gray-100 divide-y divide-gray-100">
            {STEP_ACCORDIONS.map((step) => {
              const isOpen = accordionOpen === step.step;
              return (
                <div key={step.step} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setAccordionOpen(isOpen ? null : step.step)}
                    className="w-full flex items-center justify-between text-left font-display font-bold text-gray-900 py-2 hover:text-[#063970] transition outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-[#F38B0E] text-xs font-mono font-bold leading-none shrink-0">
                        0{step.step}
                      </span>
                      <span className="text-xs sm:text-sm">{step.title}</span>
                    </span>
                    <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 transition ${isOpen ? 'rotate-180 text-[#F38B0E]' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-1.5"
                      >
                        <p className="text-xs text-gray-500 leading-relaxed pl-10 pr-4 py-1.5">
                          {step.content}
                        </p>
                        <div className="pl-10 mt-1 pb-2">
                          <a
                            href="#expert-guidance-section"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F38B0E] hover:underline"
                          >
                            Lock this stage now <ArrowRight className="h-3 w-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11: PARTNER UNIVERSITIES */}
      <section id="partner-universities" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Global Partnerships
            </span>
            <h3 className="font-display font-extrabold text-2xl tracking-tight text-gray-900 mt-3">
              Our Partner Universities & Colleges
            </h3>
            <p className="text-gray-400 text-xs mt-1.5">
              Secure priority application routing, prompt admissions, and tuition discounts with our direct partners.
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-100 p-6 rounded-3xl relative">
            {/* Visual Grid representation of partner options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {PARTNERS_LOGOS.slice(0, 12).map((part, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center hover:shadow-md hover:border-blue-100 transition duration-200 cursor-pointer"
                  onClick={() => triggerAutoApply(part.country, part.name)}
                >
                  <span className="text-2xl mb-1.5">{part.logo}</span>
                  <h4 className="font-bold text-[11px] text-slate-900 leading-tight line-clamp-1">{part.name}</h4>
                  <span className="text-[9px] uppercase tracking-wider text-blue-600 font-mono font-bold mt-1 inline-block">
                    {part.country}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                And 25+ more partners across USA, UK, Canada, and Australia!{' '}
                <a href="#expert-guidance-section" className="text-[#F38B0E] font-bold hover:underline">
                  Evaluate direct waivers
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: POPULAR COURSES FILTERABLE */}
      <section id="popular-courses" className="py-20 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F38B0E] bg-orange-100 px-3.5 py-1.5 rounded-full">
              Courses Matrix
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight mt-3 text-slate-900">
              Popular Programs for Nigerian Applicants
            </h2>
            <p className="text-gray-500 text-sm mt-1.5">
              Click filter buttons to browse career growth, expected local salary stayback, and fast university listings.
            </p>
          </div>

          {/* Filters category wrapper */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-10 bg-white border border-gray-200 p-2 rounded-2xl max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCourseFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${courseFilter === cat ? 'bg-[#063970] text-white' : 'text-gray-600 hover:bg-slate-100 hover:text-[#063970]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.slice(0, 9).map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:border-orange-200 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#F38B0E] uppercase tracking-wide bg-orange-50 px-2.5 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded">
                      <TrendingUp className="h-3 w-3" /> Growth: {course.growthRate}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-display">{course.name}</h4>
                  
                  <div className="space-y-1.5 mt-2">
                    <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Typical Roles</span>
                    <div className="flex flex-wrap gap-1">
                      {course.careerPaths.map((role, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-semibold font-mono">Dest: {course.popularDestinations.join(', ')}</span>
                  <button
                    onClick={() => triggerAutoApply(course.popularDestinations[0], course.name)}
                    className="px-3 py-1 rounded-lg text-[10.5px] font-bold bg-[#063970] text-white hover:bg-[#F38B0E] transition"
                  >
                    Select Program
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: SCHOLARSHIPS SECTION */}
      <section id="scholarships-block" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
              Funding Support
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-gray-900">
              Scholarships & Institutional Funding
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Explore active partial and fully-funded grants eligible for Nigerian applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOLARSHIPS.map((sch) => (
              <div
                key={sch.id}
                className="bg-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition group shrink-0 select-none cursor-pointer"
                onClick={() => setSelectedScholarship(sch)}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-[#063970] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {sch.type}
                    </span>
                    <span className="text-xs font-semibold text-orange-500 font-mono">{sch.destination}</span>
                  </div>

                  <h4 className="font-display font-medium text-slate-900 text-base mt-3 leading-tight line-clamp-2">
                    {sch.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3">
                    {sch.description}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-orange-50/50 border border-orange-100 space-y-1 text-xs">
                    <span className="block text-gray-500 text-[10px] leading-none uppercase font-bold tracking-widest">Eligibility Target</span>
                    <span className="text-slate-800 text-[11px] line-clamp-2 font-medium">{sch.eligibility}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4 flex items-center justify-between font-mono text-[10px] text-gray-400">
                  <span>Deadline: {sch.deadline}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScholarship(sch);
                    }}
                    className="text-[#063970] font-bold text-[11px] underline group-hover:text-[#F38B0E] transition"
                  >
                    View Criteria
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: BLOG SECTION / ARTICLES */}
      <section id="educational-resources" className="py-20 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F38B0E] bg-orange-100 px-3.5 py-1.5 rounded-full">
              Resource Center
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-slate-900">
              Latest Study Abroad Advice
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Helpful answers and articles from certified counselors to clear application blockages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOGS.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-4 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-semibold font-mono">
                    <span className="text-[#F38B0E]">{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>
                  <h4 className="text-base font-bold font-display text-slate-900 leading-tight">
                    {blog.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[#063970] font-bold underline flex items-center gap-1">
                    Read Complete Article
                  </span>
                  <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded font-mono font-medium text-slate-500">{blog.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: FINAL CALL TO ACTION */}
      <section id="final-cta" className="py-20 bg-[#063970] text-white relative overflow-hidden">
        {/* Ambient backing backdrop decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-orange-600/20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F38B0E] text-white text-xl font-bold shadow-lg shadow-orange-500/20 mb-2">
            ✈️
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready To Start Your Study Abroad Journey?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Book a free consultation with a Gattigo advisor today and take the first step toward studying internationally. Let our experts craft a logical SOP and handle visa Statement calculations safely!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
            <a
              href="#expert-guidance-section"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F38B0E] hover:bg-[#d87600] text-white font-bold text-sm tracking-wide shadow-lg uppercase transition"
            >
              Book Consultation Now
            </a>
            <a
              href="https://wa.me/2348030000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase transition flex items-center justify-center gap-2"
            >
              Contact Active Advisor
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 16: FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Bio */}
            <div className="space-y-4 lg:col-span-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F38B0E] text-white text-xl font-bold border border-white/10 shrink-0">
                G
              </span>
              <h4 className="font-display font-extrabold text-[#F38B0E] text-lg uppercase tracking-wider">GATTIGO EDU CONSULT</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Certified educational agency based in Lagos and Abuja. Navigating university admissions, financial statements, medicals, and subclass study permits for Nigerian scholars.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/2348030000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold bg-emerald-950/40 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/25 hover:bg-emerald-900/30 transition"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Col 2: Destinations */}
            <div>
              <h5 className="font-bold text-xs uppercase text-slate-100 tracking-widest border-b border-slate-800 pb-2.5 mb-4">Destinations</h5>
              <ul className="text-xs space-y-2.5">
                <li><a href="#destinations-grid" className="hover:text-white transition">Canada (IRCC Study Path)</a></li>
                <li><a href="#destinations-grid" className="hover:text-white transition">United Kingdom (CAS Track)</a></li>
                <li><a href="#destinations-grid" className="hover:text-white transition">United States (F1 Interview)</a></li>
                <li><a href="#destinations-grid" className="hover:text-white transition">Australia (Genuine Student)</a></li>
                <li><a href="#destinations-grid" className="hover:text-white transition">Schengen (Germany / France / NL)</a></li>
              </ul>
            </div>

            {/* Col 3: Resources */}
            <div>
              <h5 className="font-bold text-xs uppercase text-slate-100 tracking-widest border-b border-slate-800 pb-2.5 mb-4">Resources</h5>
              <ul className="text-xs space-y-2.5">
                <li><a href="#popular-courses" className="hover:text-white transition">Admission Guides</a></li>
                <li><a href="#scholarships-block" className="hover:text-white transition">Scholarship Databases</a></li>
                <li><a href="#educational-resources" className="hover:text-white transition">Academic SOP Writing</a></li>
                <li><a href="#why-trust-gattigo" className="hover:text-white transition">Partner Code Lists</a></li>
                <li><a href="#steps-accordion" className="hover:text-white transition">Visa FAQs</a></li>
              </ul>
            </div>

            {/* Col 4: Reach Contacts */}
            <div>
              <h5 className="font-bold text-xs uppercase text-slate-100 tracking-widest border-b border-slate-800 pb-2.5 mb-4">Address Offices</h5>
              <div className="text-xs space-y-3 leading-relaxed">
                <div>
                  <span className="block font-semibold text-slate-200">Lagos HQ Office:</span>
                  <p className="text-slate-400">Plot 12, Allen Avenue, opposite Union Bank, Ikeja, Lagos State, Nigeria.</p>
                </div>
                <div>
                  <span className="block font-semibold text-slate-200">Liaison Contact:</span>
                  <p className="text-slate-400">gattigoeduconsult@gmail.com</p>
                  <p className="text-slate-400">+234 (0) 803 123 4567</p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Gattigo Edu Consult & Travel Services. All Rights Reserved. Built with trust for Nigerian Scholars.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION OVERLAYS / INTERACTIVE MODALS */}

      {/* Destination Overlay Detail Modal */}
      <AnimatePresence>
        {selectedDestination && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDestination(null)}
          >
            <motion.div
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full text-gray-900 shadow-2xl relative"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Country banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/20 to-transparent" />
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
                >
                  X
                </button>
                <div className="absolute bottom-4 left-6">
                  <h3 className="font-display font-extrabold text-2xl text-white flex items-center gap-2">
                    {selectedDestination.flag} {selectedDestination.name}
                  </h3>
                </div>
              </div>

              {/* Data body parameters */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-gray-100">
                    <span className="block text-gray-400 font-bold uppercase text-[9px] mb-1">Tuition Fees</span>
                    <span className="font-semibold text-slate-800">{selectedDestination.tuitionEstimate}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-gray-100">
                    <span className="block text-gray-400 font-bold uppercase text-[9px] mb-1">Stay Back Period</span>
                    <span className="font-semibold text-slate-800">{selectedDestination.workOpportunities}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wide">💼 Admission & Visa Processing Check</h4>
                  <p className="text-gray-500 leading-relaxed">
                    Visa decisions in West Africa typically occupy <strong className="text-orange-500">{selectedDestination.visaProcessingTime}</strong>. Host cities like <strong className="text-slate-800">{selectedDestination.popularCities.join(', ')}</strong> host top campuses. High WAEC or IELTS grades are highly beneficial.
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setSelectedDestination(null)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                  >
                    Close Sheet
                  </button>
                  <button
                    onClick={() => {
                      triggerAutoApply(selectedDestination.name);
                      setSelectedDestination(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-[#F38B0E] hover:bg-orange-600 transition"
                  >
                    Select Destination
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scholarship Overlay Detail Modal */}
      <AnimatePresence>
        {selectedScholarship && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScholarship(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full text-gray-900 shadow-2xl relative space-y-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-white bg-blue-700 px-2 py-0.5 rounded">
                    {selectedScholarship.type} Award
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 mt-2">
                    {selectedScholarship.title}
                  </h3>
                  <span className="text-xs text-[#F28B0E] block mt-1 font-semibold">{selectedScholarship.destination}</span>
                </div>
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="h-8 w-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center hover:bg-slate-200"
                >
                  X
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
                  <span className="block font-bold text-[#F38B0E] font-mono text-[9px] uppercase">Grants Worth</span>
                  <p className="font-bold text-sm text-slate-900">{selectedScholarship.amount}</p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-900 uppercase">Coverage Description</h4>
                  <p className="text-gray-500">{selectedScholarship.description}</p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-900 uppercase text-[11px]">Nigerian Eligibility Criteria</h4>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border border-gray-100 font-medium">
                    {selectedScholarship.eligibility}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex gap-2 border-t border-gray-100">
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-slate-700"
                >
                  Back to List
                </button>
                <button
                  onClick={() => {
                    triggerAutoApply(selectedScholarship.destination, 'Scholarship Study Stream');
                    setSelectedScholarship(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#F38B0E] text-white hover:bg-orange-600 transition"
                >
                  Book Scholarship Advisory
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Detail Overlay Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full text-gray-900 shadow-2xl relative flex flex-col max-h-[85vh]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image banner */}
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
                >
                  X
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F38B0E] bg-orange-950/80 px-2 py-1 rounded inline-block mb-1.5">
                    {selectedBlog.category}
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg leading-tight text-white line-clamp-2">
                    {selectedBlog.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable text content */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line leading-loose text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Modal footer controls */}
              <div className="p-4 border-t border-gray-100 bg-slate-50 flex justify-between items-center shrink-0">
                <span className="text-[11px] text-gray-400 font-medium">Published: {selectedBlog.date}</span>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="px-6 py-2 rounded-xl bg-[#063970] text-white text-xs font-bold hover:bg-[#F38B0E] transition"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial Modal Viewer */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-md w-full text-gray-900 shadow-2xl relative space-y-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#F38B0E]">
                    <img
                      src={selectedTestimonial.portrait}
                      alt={selectedTestimonial.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{selectedTestimonial.name}</h4>
                    <p className="text-[11px] text-gray-400 font-semibold">{selectedTestimonial.university}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="h-8 w-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center hover:bg-slate-200"
                >
                  X
                </button>
              </div>

              <div className="space-y-3 leading-relaxed text-xs">
                <p className="italic text-gray-600 bg-slate-50 p-4 rounded-xl border border-gray-100">
                  &ldquo;{selectedTestimonial.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Target Destination: {selectedTestimonial.destination}</span>
                  <span className="text-[#F38B0E]">{selectedTestimonial.course}</span>
                </div>

                <div className="p-3 rounded-lg bg-orange-50 border border-orange-100 text-[11px] leading-snug flex items-start gap-2 text-slate-700">
                  <span className="mt-0.5">🎬</span>
                  <div>
                    <span className="font-bold">Active Vlog:</span> {selectedTestimonial.videoThumbPlaceholder}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-gray-100"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    triggerAutoApply(selectedTestimonial.destination, selectedTestimonial.course);
                    setSelectedTestimonial(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#F38B0E] text-white hover:bg-orange-600 transition"
                >
                  Speak with Advisors
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BOT FOR INTERACTIVE COUNSELING */}
      <AICoPilot />

    </div>
  );
}
