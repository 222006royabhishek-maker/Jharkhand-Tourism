import React, { useState, useEffect } from 'react';
import { Search, Compass, Calendar, Menu, X, MapPin } from 'lucide-react';

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-3.5 bg-black/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl' 
        : 'py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-heading text-lg md:text-xl font-bold tracking-widest text-white group-hover:text-slate-300 transition-colors">
              JHARKHAND
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 glass-pill px-8 py-2.5 rounded-full">
          <a href="#hero" className="text-xs uppercase tracking-widest text-white/70 hover:text-white font-medium transition-colors">
            Overview
          </a>
          <a href="#destinations" className="text-xs uppercase tracking-widest text-white/70 hover:text-white font-medium transition-colors">
            Destinations
          </a>
          <a href="#map-explorer" className="text-xs uppercase tracking-widest text-white/70 hover:text-white font-medium transition-colors flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            Interactive Map
          </a>
          <a href="#about" className="text-xs uppercase tracking-widest text-white/70 hover:text-white font-medium transition-colors">
            Heritage
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button 
            aria-label="Search"
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <button 
            onClick={onBookClick}
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-slate-200 active:scale-95 transition-all duration-300 shadow-xl"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Book Visit
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/10 text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-6 py-6 bg-black/95 border-b border-white/10 backdrop-blur-2xl flex flex-col gap-4">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium tracking-widest text-white/80 hover:text-white uppercase">Overview</a>
          <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium tracking-widest text-white/80 hover:text-white uppercase">Destinations</a>
          <a href="#map-explorer" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium tracking-widest text-white/80 hover:text-white uppercase">Interactive Map</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-xs font-medium tracking-widest text-white/80 hover:text-white uppercase">Heritage</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onBookClick && onBookClick(); }}
            className="w-full mt-2 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase text-center"
          >
            Book Visit
          </button>
        </div>
      )}
    </nav>
  );
}
