import React, { useState } from 'react';
import { X, MapPin, Star, Hotel, Phone, Compass, Calendar, ArrowRight, Check, Wifi, Coffee, Car } from 'lucide-react';

export default function LocationDetailsModal({ locationData, isOpen, onClose }) {
  const [bookedHotel, setBookedHotel] = useState(null);

  if (!isOpen || !locationData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0D14] border border-white/15 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl no-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero Image */}
        <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden mb-8 border border-white/10">
          <img 
            src={locationData.image} 
            alt={locationData.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-widest text-white/90 font-semibold mb-2">
              <MapPin className="w-3 h-3 text-red-500" />
              <span>{locationData.district}, Jharkhand</span>
            </div>
            
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {locationData.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light italic mt-1">
              "{locationData.tagline}"
            </p>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <h3 className="font-serif-heading text-xl font-bold text-white mb-3">About This Tourist Destination</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
              {locationData.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {locationData.highlights && locationData.highlights.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Travel Guide</span>
              <div className="mt-3 space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Best Time:</span>
                  <span className="text-white font-medium">{locationData.bestSeason || 'October – March'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Elevation:</span>
                  <span className="text-white font-medium">{locationData.elevation || '2,400 FT'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">Nearest Hub:</span>
                  <span className="text-white font-medium">{locationData.district}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert(`Starting tour navigation guide for ${locationData.name}`)}
              className="w-full mt-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Get Route Directions
            </button>
          </div>
        </div>

        {/* Nearby Recommended Hotels & Stays Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <Hotel className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold">Accredited Stays</span>
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-white">Recommended Nearby Hotels & Resorts</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locationData.hotels && locationData.hotels.map((hotel, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col justify-between hover:border-white/30 transition-all">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-serif-heading text-lg font-bold text-white">{hotel.name}</h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {hotel.distance} from destination
                      </p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-light mb-4 leading-relaxed">{hotel.desc}</p>

                  <div className="flex items-center gap-3 text-slate-400 text-xs mb-4">
                    <span className="flex items-center gap-1"><Wifi className="w-3.5 h-3.5" /> Free WiFi</span>
                    <span className="flex items-center gap-1"><Coffee className="w-3.5 h-3.5" /> Breakfast</span>
                    <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> Parking</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Starting From</span>
                    <span className="font-serif-heading text-lg font-bold text-white">₹{hotel.price} <span className="text-xs font-normal text-slate-400">/ night</span></span>
                  </div>

                  <button 
                    onClick={() => {
                      setBookedHotel(hotel.name);
                      setTimeout(() => setBookedHotel(null), 3000);
                    }}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all ${
                      bookedHotel === hotel.name
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-black hover:bg-slate-200'
                    }`}
                  >
                    {bookedHotel === hotel.name ? 'Room Reserved!' : 'Book Stay'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
