import React from 'react';
import { Compass, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-slate-400 py-16 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif-heading text-lg font-bold tracking-widest text-white">
              JHARKHAND
            </span>
          </div>
          <p className="text-xs font-light leading-relaxed mb-6">
            Official Portal of Jharkhand Tourism. Pristine waterfalls, ancient tribal heritage, and protected wildlife reserves.
          </p>
        </div>

        <div>
          <h4 className="font-serif-heading text-xs font-bold text-white uppercase tracking-widest mb-4">Destinations</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#destinations" className="hover:text-white transition-colors">Netarhat Sunrise Peak</a></li>
            <li><a href="#destinations" className="hover:text-white transition-colors">Patratu Valley Circuit</a></li>
            <li><a href="#destinations" className="hover:text-white transition-colors">Hundru & Jonha Waterfalls</a></li>
            <li><a href="#destinations" className="hover:text-white transition-colors">Tagore Hill & Ranchi</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif-heading text-xs font-bold text-white uppercase tracking-widest mb-4">Tourism Circuits</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#about" className="hover:text-white transition-colors">Eco & Wildlife Trail</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">Spiritual Pilgrimage</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">Sohrai Tribal Art Circuit</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif-heading text-xs font-bold text-white uppercase tracking-widest mb-4">Contact Info</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white/60 shrink-0" />
              <span>Department of Tourism, Government of Jharkhand, Ranchi</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-white/60 shrink-0" />
              <span>+91 651 2400496</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-white/60 shrink-0" />
              <span>info@jharkhandtourism.gov.in</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
        <p>© 2026 Department of Tourism, Government of Jharkhand.</p>
        <p className="mt-2 sm:mt-0 font-mono">Designed to Apple UX Standards</p>
      </div>
    </footer>
  );
}
