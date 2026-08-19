import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowUpRight, Eye, Sparkles } from 'lucide-react';

const DESTINATIONS = [
  {
    id: 'netarhat-sunset',
    title: 'PATRATU & NETARHAT',
    location: 'JHARKHAND, INDIA',
    tagline: 'Where clouds kiss the serpentine valleys',
    description: 'Experience panoramic sunrises over mist-shrouded peaks and winding mountain roads cut through ancient pine forests.',
    image: '/actual_images/A beautiful tourist spot in Jharkhand.jpeg',
    category: 'Hill Station',
    elevation: '3,700 FT',
  },
  {
    id: 'tagore-hill',
    title: 'TAGORE HILL & HERITAGE',
    location: 'RANCHI, JHARKHAND',
    tagline: 'Historical solitude atop serene granite peaks',
    description: 'Perched high above Ranchi city, this historic pavilion served as the quiet sanctuary for Rabindranath Tagore to compose timeless literature.',
    image: '/actual_images/jharkhand_view_portrait_265x450.jpg.jpeg',
    category: 'Heritage',
    elevation: '2,140 FT',
  },
  {
    id: 'forest-waterfall',
    title: 'SARANDA FOREST FALLS',
    location: 'WEST SINGHBHUM, JHARKHAND',
    tagline: 'Untamed waters deep in the 700-hill canopy',
    description: 'Journey through Asia’s largest Sal forest to witness hidden, untouched cascades roaring amidst thick rainforest greenery.',
    image: '/actual_images/jharkhand_waterfall_portrait_265x450.jpg.jpeg',
    category: 'Wilderness',
    elevation: '1,850 FT',
  },
  {
    id: 'jonha-falls',
    title: 'JONHA & DASSAM FALLS',
    location: 'RANCHI DISTRICT, JHARKHAND',
    tagline: 'Cascading majesty descending from sacred heights',
    description: 'Marvel at the multi-tiered waterfalls carving through ancient rock formations, surrounded by lush Buddhist shrines and pristine nature.',
    image: '/actual_images/jonha_falls_portrait_265x450.jpg.jpeg',
    category: 'Waterfalls',
    elevation: '144 FT DROP',
  },
  {
    id: 'nakta-pahad',
    title: 'NAKTA PAHAD OVERLOOK',
    location: 'SANTHAL PARGANA, JHARKHAND',
    tagline: 'A breathtaking cliff perched above infinity',
    description: 'Stand at the edge of dramatic cliff faces offering uninterrupted 360-degree views across Jharkhand’s emerald jungle horizon.',
    image: '/actual_images/nakta_pahad_portrait_265x450.jpg.jpeg',
    category: 'Adventure',
    elevation: '2,890 FT',
  },
];

export default function DestinationCarousel({ onSelectDestination }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Mouse X and Y position for 3D spatial card tilt (-1 to +1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track cursor movement over the section
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized X and Y from -1.0 to +1.0
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    setMousePos({ x: normX, y: normY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? DESTINATIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === DESTINATIONS.length - 1 ? 0 : prev + 1));
  };

  const activeDest = DESTINATIONS[activeIndex];

  return (
    <section 
      id="destinations" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen py-24 bg-black text-white overflow-hidden flex flex-col justify-between select-none"
    >
      
      {/* Full-Page Dynamic Background Image */}
      {DESTINATIONS.map((dest, idx) => (
        <div 
          key={dest.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out pointer-events-none ${
            idx === activeIndex ? 'opacity-45 scale-105 filter blur-[1px]' : 'opacity-0 scale-100'
          }`}
          style={{ 
            backgroundImage: `url("${encodeURI(dest.image)}")`,
          }}
        />
      ))}

      {/* Dark Overlay Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-pill mb-3">
          <Sparkles className="w-3.5 h-3.5 text-white/80" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">
            Interactive Destination Explorer
          </span>
        </div>

        <h2 className="font-serif-heading text-4xl sm:text-6xl font-bold tracking-tight text-white">
          DISCOVER JHARKHAND
        </h2>
        
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light tracking-widest uppercase">
          Move your cursor over the card to tilt it in 3D
        </p>
      </div>

      {/* 3D Stack Container */}
      <div className="relative z-20 my-10 w-full max-w-6xl mx-auto px-4 flex items-center justify-center min-h-[500px]">
        
        {/* Nav Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous destination"
          className="absolute left-2 md:left-6 z-40 w-12 h-12 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative w-full h-[470px] flex items-center justify-center perspective-[1400px]">
          {DESTINATIONS.map((dest, idx) => {
            let offset = idx - activeIndex;

            if (offset < -2) offset += DESTINATIONS.length;
            if (offset > 2) offset -= DESTINATIONS.length;

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Subtle 3D Tilt Math:
            // Moving mouse Y tilts pitch (rotateX): max +- 10deg
            // Moving mouse X tilts yaw (rotateY): max +- 12deg
            const tiltX = isActive ? mousePos.y * -10 : 0;
            const tiltY = isActive ? mousePos.x * 12 : 0;
            const translate3DX = isActive ? mousePos.x * 20 : 0;
            const translate3DY = isActive ? mousePos.y * 15 : 0;

            let translateX = offset * 235 + translate3DX;
            let translateY = translate3DY;
            let translateZ = -Math.abs(offset) * 210;
            let rotateY = offset * -26 + tiltY;
            let rotateX = tiltX;
            let scale = isActive ? 1.05 : 0.82;
            let opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.2;

            if (window.innerWidth < 640) {
              translateX = offset * 115 + (isActive ? mousePos.x * 10 : 0);
              translateZ = -Math.abs(offset) * 140;
              scale = isActive ? 1 : 0.75;
            }

            return (
              <div
                key={dest.id}
                onClick={() => setActiveIndex(idx)}
                className={`absolute w-[250px] sm:w-[290px] md:w-[330px] h-[410px] sm:h-[450px] rounded-[2.2rem] overflow-hidden cursor-pointer transition-all duration-300 ease-out shadow-2xl group glass-card ${
                  isActive ? 'border-white/40 shadow-2xl shadow-black/80' : 'border-white/10'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity,
                  zIndex: 30 - Math.abs(offset) * 10,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image */}
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 ${
                  isActive ? 'opacity-80' : 'opacity-90'
                }`} />

                {/* Elevation Tag */}
                <div className="absolute top-5 left-5 z-10 px-3 py-1 rounded-full glass-pill text-[10px] uppercase tracking-widest text-white/90 font-medium">
                  {dest.elevation}
                </div>

                {/* Text Content */}
                <div className={`absolute bottom-0 inset-x-0 p-7 z-10 flex flex-col justify-end transition-all duration-500 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'
                }`}>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium tracking-widest uppercase mb-1">
                    <MapPin className="w-3 h-3 text-white/70" />
                    <span>{dest.location}</span>
                  </div>

                  <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {dest.title}
                  </h3>

                  {isActive && (
                    <>
                      <p className="text-xs text-slate-300 font-light italic mt-2 line-clamp-2">
                        "{dest.tagline}"
                      </p>
                      
                      <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-medium text-white/90">
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          View Destination
                          <ArrowUpRight className="w-4 h-4 ml-0.5" />
                        </span>
                        <Eye className="w-4 h-4 text-white/40" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nav Right */}
        <button
          onClick={handleNext}
          aria-label="Next destination"
          className="absolute right-2 md:right-6 z-40 w-12 h-12 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ACTIVE DESTINATION DETAILS CARD */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <div className="glass-card p-8 rounded-3xl border border-white/15 shadow-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-medium">
            Destination Highlight
          </span>
          
          <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-white mt-1 mb-2">
            {activeDest.title}
          </h3>

          <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed max-w-xl mx-auto mb-6">
            {activeDest.description}
          </p>

          <button 
            onClick={() => onSelectDestination && onSelectDestination(activeDest)}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-slate-200 active:scale-95 transition-all duration-300 shadow-xl"
          >
            Explore {activeDest.title.split(' ')[0]} Itinerary
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {DESTINATIONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIndex 
                  ? 'w-8 bg-white' 
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
