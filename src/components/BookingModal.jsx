import React, { useState } from 'react';
import { X, Calendar, User, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, destination }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2 Guests',
    destination: destination ? destination.title : 'Netarhat & Patratu Valley',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
      <div className="relative w-full max-w-lg bg-[#0D1117] border border-white/15 rounded-3xl p-7 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-14 h-14 text-white mb-4 animate-bounce" />
            <h3 className="font-serif-heading text-2xl font-bold text-white mb-2">Booking Confirmed</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Our official tourism representative will reach out to <span className="text-white font-mono">{formData.email}</span> with your itinerary details.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold">Jharkhand Tourism Portal</span>
              <h3 className="font-serif-heading text-2xl font-bold text-white mt-1">
                Book Destination Tour
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-white/70" />
                  <input
                    type="text"
                    readOnly
                    value={destination ? destination.title : formData.destination}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">Travel Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 rounded-xl bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-slate-200 transition-all"
              >
                Confirm Tour Inquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
