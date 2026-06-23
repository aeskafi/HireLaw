'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll-dependent states
  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky nav style
      setScrolled(window.scrollY > 120);
      // Toggle scroll-to-top button visibility
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Nav Highlighting
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'attorneys'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, {
        rootMargin: '-40% 0px -50% 0px' // Triggers when section is roughly in the center third of viewport
      });

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
      setActiveSection('home');
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const elementTop = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementTop - 80 - 24; // Header height (~80px) + spacing buffer (~24px)

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setActiveSection('home');
  };

  return (
    <div className="relative min-h-screen bg-[#F9F8F3] text-[#111111] overflow-x-hidden selection:bg-[#B4ACE3]/30">
      
      {/* 2. Header / Navigation Bar */}
      <header 
        className={`z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'fixed top-0 left-0 bg-[#F9F8F3]/95 backdrop-blur-md border-b border-neutral-200/50 py-4 shadow-sm animate-header-slide-down' 
            : 'absolute top-0 left-0 bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl font-heading font-extrabold tracking-tight hover:opacity-80 transition-opacity">
            HireLaw<span className="text-xs font-semibold align-super">®</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Sourcing', id: 'about' },
              { label: 'Evaluation', id: 'services' },
              { label: 'Communication', id: 'attorneys' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 hover:text-[#111111] ${
                  activeSection === link.id
                    ? 'text-[#111111] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#111111] after:rounded-full'
                    : 'text-neutral-500'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <a 
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="px-6 py-2.5 rounded-full border border-[#111111] text-sm font-medium hover:bg-[#111111] hover:text-white transition-all duration-300"
            >
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#F9F8F3] border-b border-neutral-200 shadow-xl px-6 py-8 flex flex-col gap-6 animate-fade-in">
            {[
              { label: 'Home', id: 'home' },
              { label: 'Sourcing (About Us)', id: 'about' },
              { label: 'Evaluation (Services)', id: 'services' },
              { label: 'Communication (Attorneys)', id: 'attorneys' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-lg font-bold tracking-wide transition-colors flex items-center gap-2 ${
                  activeSection === link.id
                    ? 'text-[#B4ACE3]'
                    : 'text-neutral-800 hover:text-[#B4ACE3]'
                }`}
              >
                {activeSection === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B4ACE3]" />
                )}
                {link.label}
              </a>
            ))}
            <hr className="border-neutral-200 my-2" />
            <a 
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="w-full text-center py-3 bg-[#111111] text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              Sign In
            </a>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section id="home" className="scroll-mt-24 pt-32 md:pt-40 lg:pt-48 pb-16 lg:pb-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Hero Copy */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-medium tracking-tight text-neutral-500 leading-[1.1] mb-6">
            Trusted Legal Solutions for <br />
            <span className="text-[#111111] font-bold">Your Peace of Mind</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-xl mx-auto">
            At HireLaw, we are committed to providing exceptional legal services tailored to your unique needs.
          </p>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, 'services')}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#111111] text-white rounded-full font-medium hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Schedule Meet
          </a>
        </div>

        {/* 6 Showcase Team Portraits with Duotone background cutout effect */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mt-8">
          {[
            { img: '/images/team_1.jpg', bg: 'bg-[#B4ACE3]' }, // Pastel Purple
            { img: '/images/team_2.jpg', bg: 'bg-[#F3C8C8]' }, // Pastel Pink
            { img: '/images/team_3.jpg', bg: 'bg-[#CCE2CB]' }, // Pastel Green
            { img: '/images/team_4.jpg', bg: 'bg-[#B3CDE3]' }, // Pastel Blue
            { img: '/images/team_5.jpg', bg: 'bg-[#F3C8C8]' }, // Pastel Pink
            { img: '/images/team_6.jpg', bg: 'bg-[#FAD2B4]' }  // Pastel Orange/Yellow
          ].map((member, i) => (
            <div 
              key={i} 
              className={`relative overflow-hidden aspect-[3/4] rounded-2xl group transition-all duration-500 ${member.bg} border border-black/[0.05]`}
            >
              {/* Greyscale + Blend multiply image */}
              <Image
                src={member.img}
                alt={`HireLaw Team Member ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover grayscale mix-blend-multiply contrast-[1.15] brightness-[1.02] transform transition-transform duration-500 group-hover:scale-105"
                priority={i < 3}
              />
              <div className="absolute inset-0 bg-[#111111]/0 group-hover:bg-[#111111]/5 transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Client Logotypes Bar */}
      <section className="py-12 border-y border-neutral-200 bg-[#FAF9F5] overflow-hidden">
        <div className="relative w-full flex items-center">
          {/* Scrolling track */}
          <div className="flex gap-20 whitespace-nowrap animate-infinite-scroll w-max">
            {/* First Set */}
            {[
              { name: 'Baker McKenzie', font: 'font-serif tracking-tight font-extrabold' },
              { name: 'Weil', font: 'font-serif italic font-bold' },
              { name: 'JONES DAY', font: 'font-sans tracking-widest font-black uppercase' },
              { name: 'DLA PIPER', font: 'font-sans font-bold uppercase tracking-wider' },
              { name: 'Skadden', font: 'font-serif font-semibold tracking-wide' },
              { name: 'Mills & Cahill', font: 'font-serif tracking-tight italic' },
              { name: 'Ballard Spahr', font: 'font-sans tracking-tighter uppercase font-light' },
            ].map((logo, idx) => (
              <span 
                key={`logo-1-${idx}`} 
                className={`text-xl md:text-2xl text-neutral-400 opacity-65 hover:opacity-100 hover:text-black transition-all duration-300 select-none ${logo.font}`}
              >
                {logo.name}
              </span>
            ))}
            {/* Second Set (Duplicate for seamless loop) */}
            {[
              { name: 'Baker McKenzie', font: 'font-serif tracking-tight font-extrabold' },
              { name: 'Weil', font: 'font-serif italic font-bold' },
              { name: 'JONES DAY', font: 'font-sans tracking-widest font-black uppercase' },
              { name: 'DLA PIPER', font: 'font-sans font-bold uppercase tracking-wider' },
              { name: 'Skadden', font: 'font-serif font-semibold tracking-wide' },
              { name: 'Mills & Cahill', font: 'font-serif tracking-tight italic' },
              { name: 'Ballard Spahr', font: 'font-sans tracking-tighter uppercase font-light' },
            ].map((logo, idx) => (
              <span 
                key={`logo-2-${idx}`} 
                className={`text-xl md:text-2xl text-neutral-400 opacity-65 hover:opacity-100 hover:text-black transition-all duration-300 select-none ${logo.font}`}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Us Section */}
      <section id="about" className="scroll-mt-24 py-20 lg:py-28 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left vertical/column label */}
          <div className="lg:col-span-2">
            <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase select-none lg:sticky lg:top-28 block">
              ABOUT US
            </span>
          </div>

          {/* Center Column: Text & Features */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 leading-tight">
              About HireLaw<span className="font-semibold text-xl align-super">®</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed text-base sm:text-lg">
              HireLaw is a full-service law firm offering comprehensive legal support across a broad range of practice areas. Our attorneys combine in-depth legal knowledge with a practical, client-focused approach to deliver results you can rely on.
            </p>
            
            {/* Features Badge Pills */}
            <div className="flex flex-col gap-3 mt-4">
              {[
                "Personalized attention",
                "Proven track record of success",
                "Transparent and honest communication"
              ].map((badge, idx) => (
                <div key={idx} className="flex">
                  <span className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-full text-xs font-semibold text-neutral-700 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-black hover:bg-white select-none">
                    <svg className="w-3.5 h-3.5 mr-2 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Lily Flower Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] bg-neutral-100 rounded-3xl overflow-hidden shadow-xl border border-neutral-200/50 group">
              <Image 
                src="/images/about_lily.jpg" 
                alt="Elegant white lily representing integrity and clarity"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#F9F8F3]/5 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Our Mission Section */}
      <section className="relative w-full min-h-[480px] flex items-center overflow-hidden bg-neutral-950">
        {/* Architectural Background Image */}
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <Image 
            src="/images/mission_bg.jpg" 
            alt="Neoclassical Architecture Court Columns"
            fill
            sizes="100vw"
            className="object-cover filter contrast-[1.1] brightness-90 grayscale"
            priority
          />
        </div>
        
        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" />

        {/* Mission Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Label */}
            <div className="lg:col-span-2">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#B4ACE3] uppercase select-none">
                OUR MISSION
              </span>
            </div>
            
            {/* Copy */}
            <div className="lg:col-span-8 flex flex-col gap-6 text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-medium tracking-tight text-neutral-400">
                Trusted Legal <span className="text-white font-bold">Solutions</span>
              </h2>
              <p className="text-xl sm:text-2xl text-neutral-200 leading-relaxed font-light max-w-2xl">
                To serve as trusted advisors who protect your rights and achieve the best possible outcome for your case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Services Section */}
      <section id="services" className="scroll-mt-24 py-20 lg:py-28 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-2">
            <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase select-none">
              OUR SERVICE
            </span>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 leading-tight">
              We Offer Expertise In
            </h2>
          </div>
          <div className="lg:col-span-3 lg:text-right">
            <a 
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="inline-flex px-6 py-2.5 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-neutral-800 transition-all duration-300 shadow"
            >
              Schedule Meet
            </a>
          </div>
        </div>

        {/* 3-Column Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Corporate Law",
              desc: "Supporting entrepreneurs, startups, and established companies with contracts and compliance.",
              icon: (
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )
            },
            {
              title: "Family Law",
              desc: "Compassionate guidance for divorce, custody, and child support matters.",
              icon: (
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )
            },
            {
              title: "Real Estate Law",
              desc: "Helping clients navigate complex property and land use matters.",
              icon: (
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )
            }
          ].map((service, idx) => (
            <div 
              key={idx}
              className="p-8 md:p-10 border border-neutral-300 rounded-3xl bg-transparent transition-all duration-300 hover:border-black hover:bg-[#FAF9F5] hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col gap-6 group"
            >
              {/* Minimalist Icon */}
              <div className="w-16 h-16 rounded-2xl bg-neutral-200/50 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#B4ACE3]/20">
                {service.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#111111]">
                {service.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Client Testimonials Section */}
      <section className="bg-[#B4ACE3] text-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#111111]/60 uppercase select-none">
                CLIENT TESTIMONIALS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-bold leading-tight max-w-sm">
                What Our Clients Are Saying
              </h2>
            </div>

            {/* Right side Testimonials blocks */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote: "Working with HireLaw was a game changer for our business. We needed clear, actionable advice for a complex acquisition, and their team navigated us through the entire process seamlessly. Their expertise saved us time and money, and we couldn't have asked for a better outcome.",
                  name: "David L. Williams",
                  role: "CEO, Williams Technologies",
                  avatar: "/images/avatar_williams.jpg"
                },
                {
                  quote: "When our company was hit with a lawsuit, we were unsure of our next steps. HireLaw not only gave us clear, confident advice but also led us through mediation that resulted in a successful resolution. Their team was always responsive and made us feel like we were in good hands.",
                  name: "Charles M. Green",
                  role: "Founder, Green & Associates Consulting",
                  avatar: "/images/avatar_green.jpg"
                }
              ].map((t, i) => (
                <div 
                  key={i}
                  className="bg-[#F9F8F3] p-8 rounded-[32px] shadow-lg flex flex-col justify-between border border-[#111111]/[0.03] transition-transform duration-300 hover:-translate-y-1"
                >
                  <blockquote className="text-neutral-700 text-sm leading-relaxed mb-8 font-light italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  
                  {/* Client Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-neutral-300">
                      <Image 
                        src={t.avatar} 
                        alt={t.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#111111]">{t.name}</h4>
                      <p className="text-[11px] text-neutral-500 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Our Attorneys Section */}
      <section id="attorneys" className="scroll-mt-24 py-20 lg:py-28 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-2">
            <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase select-none">
              OUR ATTORNEYS
            </span>
          </div>
          <div className="lg:col-span-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-medium tracking-tight leading-tight max-w-4xl text-neutral-500">
              Our Lawyers Are Dedicated To <span className="text-black font-bold">Upholding The Highest Standards Of Ethics & Professionalism</span>
            </h2>
          </div>
        </div>

        {/* 4 Cards Attorney Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "David L. Patel",
              exp: "Real Estate & Property Law",
              img: "/images/attorney_patel.jpg"
            },
            {
              name: "Sophia R. Chen",
              exp: "Business & Corporate Law",
              img: "/images/attorney_chen.jpg"
            },
            {
              name: "Michael O. Brown",
              exp: "Dispute Resolution",
              img: "/images/attorney_brown.jpg"
            },
            {
              name: "John Carter",
              exp: "Trial Advocate & Crime Law",
              img: "/images/attorney_carter.jpg"
            }
          ].map((attorney, idx) => (
            <div 
              key={idx}
              className="relative aspect-[3/4] bg-neutral-900 rounded-[24px] overflow-hidden shadow-lg border border-neutral-800 group cursor-pointer transition-all duration-300"
            >
              {/* Dark moody profile photo */}
              <Image 
                src={attorney.img} 
                alt={`Attorney ${attorney.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover filter contrast-[1.05] brightness-[0.8] group-hover:brightness-[0.95] group-hover:scale-105 transition-all duration-500"
              />
              
              {/* Dark Card Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end text-white z-10">
                <div className="flex justify-between items-end gap-4">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-heading font-extrabold tracking-tight">
                      {attorney.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium">
                      {attorney.exp}
                    </p>
                  </div>
                  {/* Top-Right Arrow Icon on hover */}
                  <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#B4ACE3] text-white hover:text-black flex items-center justify-center backdrop-blur-sm transform transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg className="w-4 h-4 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="bg-black text-white relative pt-20 pb-8 overflow-hidden">
        {/* Top Part */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-800">
            {/* Left logo and closing bio */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="text-3xl font-heading font-black tracking-tight text-white select-none">
                HireLaw<span className="text-xs font-semibold align-super">®</span>
              </h2>
              <p className="text-neutral-400 leading-relaxed text-sm max-w-sm">
                At HireLaw, we are committed to providing exceptional legal services tailored to your unique needs. We believe in high ethical standards and results you can rely on.
              </p>
            </div>

            {/* Right Navigation links */}
            <div className="lg:col-span-7 flex justify-start lg:justify-end">
              <div className="flex flex-col gap-5">
                <span className="text-neutral-500 text-xs font-bold tracking-[0.25em] uppercase select-none">
                  Quick Navigation
                </span>
                <nav className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm">
                  {[
                    { label: 'Home', id: 'home' },
                    { label: 'About Us', id: 'about' },
                    { label: 'Practice Areas', id: 'services' },
                    { label: 'Attorneys', id: 'attorneys' },
                    { label: 'Testimonials', id: 'home' } // can scroll back up or standard link
                  ].map((link, i) => (
                    <a 
                      key={i}
                      href={`#${link.id}`} 
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="text-neutral-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom copyright and socials */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
            <div>
              <p>© 2026 HireLaw. All rights reserved. Registered Trademark.</p>
            </div>
            
            {/* Social media icons */}
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors duration-200" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Large stylized low-opacity watermark text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
          <h1 className="text-[12vw] sm:text-[14vw] font-heading font-black tracking-widest leading-none text-white">
            HireLaw®
          </h1>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3.5 rounded-full bg-[#111111] text-white border border-neutral-800 shadow-2xl hover:bg-[#B4ACE3] hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 group ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

    </div>
  );
}
