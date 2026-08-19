import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import LocationDetailsModal from './LocationDetailsModal';

const MAP_LOCATIONS = [
  {
    id: 'netarhat',
    name: 'Netarhat Sunrise Peak',
    district: 'Latehar District',
    tagline: 'Queen of Chotanagpur',
    x: 32,
    y: 52,
    image: '/actual_images/A beautiful tourist spot in Jharkhand.jpeg',
    description: 'Netarhat is a pristine hill station famed for its glorious sunrise viewpoints over pine valleys, Magnolia Sunset Point, and cool mountain weather year-round.',
    elevation: '3,700 FT',
    bestSeason: 'October – March',
    highlights: ['Magnolia Sunset Point', 'Upper Ghaghri Falls', 'Netarhat Residential School', 'Pine Forest Trails'],
    hotels: [
      {
        name: 'Netarhat Forest Bungalow & Resort',
        distance: '0.8 km',
        rating: '4.8',
        price: '3,499',
        desc: 'Government Heritage Bungalow surrounded by pine trees offering panoramic sunrise balcony views.',
      },
      {
        name: 'Prabhat Vihar Tourism Lodge',
        distance: '1.2 km',
        rating: '4.6',
        price: '2,899',
        desc: 'Scenic hilltop retreat next to the sunrise point with authentic local cuisine.',
      },
    ],
  },
  {
    id: 'patratu',
    name: 'Patratu Valley & Dam',
    district: 'Ramgarh District',
    tagline: 'The Serpentine Highway Paradise',
    x: 48,
    y: 56,
    image: '/actual_images/A beautiful tourist spot in Jharkhand.jpeg',
    description: 'A breathtaking valley known for its winding hairpin curves, emerald blue lake waters, speed boating, and scenic island resorts.',
    elevation: '1,420 FT',
    bestSeason: 'September – April',
    highlights: ['Patratu Lake Resort', 'Speed Boating', 'Hairpin Valley Road', 'Sunrise Island'],
    hotels: [
      {
        name: 'Patratu Lake Resort (Jharkhand Tourism)',
        distance: '0.2 km',
        rating: '4.9',
        price: '4,200',
        desc: 'Luxury waterfront resort featuring floating restaurants, motorboat rides, and infinity lake views.',
      },
      {
        name: 'Valley View Eco Cabins',
        distance: '2.5 km',
        rating: '4.7',
        price: '3,100',
        desc: 'Private wooden chalets overlooking Patratu’s winding mountain curves.',
      },
    ],
  },
  {
    id: 'ranchi',
    name: 'Tagore Hill & Ranchi City',
    district: 'Ranchi District',
    tagline: 'Capital of Waterfalls & Literary Heritage',
    x: 52,
    y: 62,
    image: '/actual_images/jharkhand_view_portrait_265x450.jpg.jpeg',
    description: 'Ranchi features Tagore Hill, Rock Garden, Kanke Dam, and cascading waterfalls like Dassam, Hundru, and Jonha Falls surrounding the capital city.',
    elevation: '2,140 FT',
    bestSeason: 'All Year',
    highlights: ['Tagore Hill Pavilion', 'Rock Garden & Kanke Dam', 'Dassam Falls', 'Birsa Zoological Park'],
    hotels: [
      {
        name: 'Radisson Blu Hotel Ranchi',
        distance: '3.5 km',
        rating: '4.9',
        price: '6,500',
        desc: '5-star luxury stay with premium spa, outdoor pool, and multi-cuisine dining.',
      },
      {
        name: 'Capitol Hill Heritage Hotel',
        distance: '2.0 km',
        rating: '4.6',
        price: '4,500',
        desc: 'Central Ranchi boutique hotel close to Tagore Hill and Main Road shopping.',
      },
    ],
  },
  {
    id: 'jonha-falls',
    name: 'Jonha & Dassam Waterfalls',
    district: 'Ranchi District (East)',
    tagline: 'Sacred Cascades & Buddhist Shrines',
    x: 60,
    y: 64,
    image: '/actual_images/jonha_falls_portrait_265x450.jpg.jpeg',
    description: 'Known as Gautamdhara, Jonha Falls cascades down 144 feet amidst lush forests and ancient Buddhist monasteries.',
    elevation: '144 FT DROP',
    bestSeason: 'Monsoon & Winter',
    highlights: ['Jonha Waterfall Steps', 'Gautam Buddha Ashram', 'Dassam Falls Gorge', 'Sita Falls Trek'],
    hotels: [
      {
        name: 'Gautamdhara Eco Retreat',
        distance: '1.0 km',
        rating: '4.6',
        price: '2,500',
        desc: 'Eco-friendly jungle cottages next to the roaring Jonha waterfall steps.',
      },
    ],
  },
  {
    id: 'betla',
    name: 'Betla National Park & Lodh Falls',
    district: 'Palamu / Latehar',
    tagline: 'Untamed Tiger Reserve & 468 ft Waterfall',
    x: 24,
    y: 42,
    image: '/actual_images/jharkhand_waterfall_portrait_265x450.jpg.jpeg',
    description: 'One of India’s earliest tiger reserves, Betla features wild elephants, bison, historic Chero dynasty forts, and Lodh Falls – Jharkhand’s highest waterfall.',
    elevation: '1,200 FT',
    bestSeason: 'November – May',
    highlights: ['Elephant Safari', 'Chero Dynasty Fort Ruins', 'Lodh Falls (468 ft)', 'Kamaldah Lake'],
    hotels: [
      {
        name: 'Van Vihar Forest Lodge Betla',
        distance: '0.5 km',
        rating: '4.7',
        price: '2,900',
        desc: 'Government wildlife safari lodge at the entrance gate of Betla Tiger Reserve.',
      },
    ],
  },
  {
    id: 'deoghar',
    name: 'Deoghar Baidyanath Temple',
    district: 'Deoghar District',
    tagline: 'Holy Abode of Lord Shiva',
    x: 72,
    y: 32,
    image: '/actual_images/jharkhand_view_portrait_265x450.jpg.jpeg',
    description: 'Deoghar is one of India’s 12 sacred Jyotirlinga shrines, attracting millions of Shravani Mela pilgrims, alongside Trikuta Parvat ropeway.',
    elevation: '833 FT',
    bestSeason: 'October – March',
    highlights: ['Baidyanath Jyotirlinga Temple', 'Trikut Pahar Cable Car', 'Naulakha Temple', 'Tapovan Caves'],
    hotels: [
      {
        name: 'Hotel Baidyanath Heritage Inn',
        distance: '0.4 km',
        rating: '4.8',
        price: '3,200',
        desc: 'Sacred pilgrimage hotel walking distance from the main Jyotirlinga temple gate.',
      },
    ],
  },
  {
    id: 'parasnath',
    name: 'Parasnath Hill (Shikharji)',
    district: 'Giridih District',
    tagline: 'Highest Peak in Jharkhand',
    x: 64,
    y: 44,
    image: '/actual_images/nakta_pahad_portrait_265x450.jpg.jpeg',
    description: 'Standing at 4,478 feet, Parasnath Hill is the highest peak in Jharkhand and the holiest Jain pilgrimage destination.',
    elevation: '4,478 FT',
    bestSeason: 'October – March',
    highlights: ['Shikharji Temple Shrines', 'Highest Peak Summit Trek', 'Madhuvan Base Camp'],
    hotels: [
      {
        name: 'Parasnath Valley Pilgrimage Resort',
        distance: '1.2 km',
        rating: '4.7',
        price: '3,000',
        desc: 'Serene mountain stay at the base of Parasnath hill trek.',
      },
    ],
  },
  {
    id: 'nakta-pahad',
    name: 'Nakta Pahad Overlook',
    district: 'Santhal Pargana',
    tagline: 'Panoramic Jungle Cliff Heights',
    x: 82,
    y: 36,
    image: '/actual_images/nakta_pahad_portrait_265x450.jpg.jpeg',
    description: 'Dramatic vertical cliff face offering 360-degree views across Santhal Pargana’s vast forest canopy and hill ranges.',
    elevation: '2,890 FT',
    bestSeason: 'October – April',
    highlights: ['360-Degree Cliff Overlook', 'Santhal Tribal Heritage Trail', 'Sunset Edge Point'],
    hotels: [
      {
        name: 'Santhal Jungle Eco Camp',
        distance: '1.8 km',
        rating: '4.5',
        price: '2,400',
        desc: 'Rustic luxury safari tents overlooking the Nakta Pahad valley horizon.',
      },
    ],
  },
  {
    id: 'saranda',
    name: 'Saranda 700-Hill Sal Forest',
    district: 'West Singhbhum',
    tagline: 'Asia’s Largest Dense Sal Forest Canopy',
    x: 52,
    y: 82,
    image: '/actual_images/jharkhand_waterfall_portrait_265x450.jpg.jpeg',
    description: 'Spanning 700 hills, Saranda is Asia’s largest Sal tree forest canopy, home to tribal villages, hidden iron ore mines, and roaring forest cascades.',
    elevation: '1,850 FT',
    bestSeason: 'October – March',
    highlights: ['700 Hills Viewpoint', 'Tholkobad Forest Rest House', 'Kiriburu Sunset Point'],
    hotels: [
      {
        name: 'Tholkobad Forest Heritage Bungalow',
        distance: '2.0 km',
        rating: '4.7',
        price: '2,700',
        desc: 'Colonial timber forest lodge located deep inside Saranda’s virgin Sal canopy.',
      },
    ],
  },
];

export default function JharkhandMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  
  // Custom Map Pin Cursor Tracking
  const mapContainerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, isHoveringMap: false });

  const handleMapMouseMove = (e) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHoveringMap: true,
    });
  };

  const handleMapMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, isHoveringMap: false }));
  };

  return (
    <section id="map-explorer" className="relative min-h-screen py-24 bg-black text-white border-t border-white/10 select-none overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-8 relative z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-pill mb-3">
          <Sparkles className="w-3.5 h-3.5 text-white/80" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">
            Geographical Pin Explorer
          </span>
        </div>

        <h2 className="font-serif-heading text-4xl sm:text-6xl font-bold text-white tracking-tight">
          EXPLORE JHARKHAND
        </h2>
        
        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light tracking-widest uppercase">
          Pinpoint any location on the map canvas to inspect tourist highlights & nearby hotel accommodations.
        </p>
      </div>

      {/* Main Clean Full-Bleed Map Canvas Area (Clean without background shapes) */}
      <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-center">
        <div 
          ref={mapContainerRef}
          onMouseMove={handleMapMouseMove}
          onMouseLeave={handleMapMouseLeave}
          className="relative w-full h-[600px] sm:h-[700px] overflow-hidden flex items-center justify-center cursor-none"
        >

          {/* Floating Red 3D Pushpin Cursor from materials */}
          {cursorPos.isHoveringMap && (
            <div 
              className="absolute z-50 pointer-events-none transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-full"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            >
              <div className="flex flex-col items-center">
                <img 
                  src="/materials/WhatsApp Image 2026-08-19 at 11.17.08 PM.jpeg" 
                  alt="Red Pushpin Cursor"
                  className="w-10 h-10 object-contain drop-shadow-[0_10px_25px_rgba(239,68,68,0.9)] animate-bounce"
                />
                <span className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-white/20 text-[9px] font-mono tracking-widest text-white whitespace-nowrap shadow-xl">
                  Pin Location To Explore
                </span>
              </div>
            </div>
          )}

          {/* Clean Map Silhouette Layer */}
          <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center">
            
            {/* Clean White Jharkhand Map Silhouette from materials */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src="/materials/WhatsApp Image 2026-08-19 at 11.20.11 PM.jpeg" 
                alt="Jharkhand State Map"
                className="max-w-full max-h-full object-contain filter opacity-40 mix-blend-screen drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:opacity-60 transition-opacity duration-700"
              />
            </div>

            {/* Clean Map Watermark & Coordinates */}
            <div className="absolute top-2 left-2 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-mono block">STATE MAP</span>
              <span className="font-serif-heading text-lg font-bold text-white/40">JHARKHAND</span>
            </div>
            
            <div className="absolute bottom-2 right-2 pointer-events-none text-right">
              <span className="text-[10px] font-mono text-slate-500 block">23.6102° N, 85.2799° E</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">9 Official Locations Pinned</span>
            </div>

            {/* ========================================================================= */}
            {/* RED 3D PUSHPINS PINNED ON MAP */}
            {/* ========================================================================= */}
            {MAP_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                }}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setSelectedLocation(loc)}
                className="absolute -translate-x-1/2 -translate-y-full z-30 cursor-pointer group"
              >
                {/* 3D Pushpin Icon from materials */}
                <div className="relative flex flex-col items-center">
                  <div className="relative group-hover:scale-125 transition-transform duration-300">
                    <img 
                      src="/materials/WhatsApp Image 2026-08-19 at 11.17.08 PM.jpeg" 
                      alt="Map Red Pushpin" 
                      className="w-9 h-9 sm:w-11 sm:h-11 object-contain filter drop-shadow-[0_8px_18px_rgba(239,68,68,0.8)]"
                    />
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-red-600/80 rounded-full blur-[2px] animate-ping" />
                  </div>
                  
                  {/* Location Label Badge */}
                  <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-white/20 text-[10px] text-white font-medium whitespace-nowrap opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all text-center shadow-xl">
                    {loc.name.split(' ')[0]}
                  </div>
                </div>

                {/* Glass Hover Preview Card */}
                {hoveredLocation && hoveredLocation.id === loc.id && (
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 w-60 p-3 rounded-2xl glass-card border border-white/20 shadow-2xl pointer-events-none animate-fade-in">
                    <div className="w-full h-24 rounded-xl overflow-hidden mb-2">
                      <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold block">{loc.district}</span>
                    <h4 className="font-serif-heading text-xs font-bold text-white">{loc.name}</h4>
                    <p className="text-[10px] text-slate-300 font-light italic mt-0.5 line-clamp-1">"{loc.tagline}"</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-semibold text-white uppercase">
                      Click Pin For Hotels & Info →
                    </span>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Location Details & Hotels Modal */}
      <LocationDetailsModal
        locationData={selectedLocation}
        isOpen={Boolean(selectedLocation)}
        onClose={() => setSelectedLocation(null)}
      />

    </section>
  );
}
