import React from 'react';
import { ShieldCheck, Compass, Trees, HeartHandshake, Sun } from 'lucide-react';

export default function AboutSection() {
  const HIGHLIGHTS = [
    {
      icon: Trees,
      title: '79,716 sq. km Eco Canopy',
      desc: 'Over 29% of Jharkhand is covered in dense Sal and Teak forests, forming one of India’s richest green lungs.',
    },
    {
      icon: Compass,
      title: 'Sacred Heights & Peaks',
      desc: 'Home to Parasnath Hill (Shikharji), the highest peak in Jharkhand and holy pilgrimage for Millions.',
    },
    {
      icon: Sun,
      title: 'Queen of Chotanagpur',
      desc: 'Netarhat offers breathtaking sunrises, pine valleys, and serene cool weather year-round.',
    },
    {
      icon: HeartHandshake,
      title: '29+ Indigenous Tribes',
      desc: 'Immerse in authentic Sohrai & Kohvar tribal art, Dokra metal crafts, and vibrant Sarhul festivals.',
    },
  ];

  return (
    <section id="about" className="py-28 bg-black relative z-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-3 block">
              Department of Tourism
            </span>

            <h2 className="font-serif-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              THE UNTOUCHED BEAUTY OF JHARKHAND
            </h2>

            <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed mb-6">
              Jharkhand is a land blessed with sprawling mineral hills, roaring multi-tiered waterfalls, ancient tribal heritage, and protected wildlife sanctuaries like Betla National Park.
            </p>

            <p className="text-slate-400 font-light text-xs md:text-sm leading-relaxed mb-8">
              From the serene sunrises of Netarhat and the iconic serpentine drive through Patratu Valley to historical landmarks like Tagore Hill in Ranchi, experience eco-tourism at its finest.
            </p>

            <div className="flex items-center gap-5 p-6 rounded-2xl apple-glass border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-heading text-base font-bold text-white">Government Certified Tours</h4>
                <p className="text-xs text-slate-400 font-light">Sustainable eco-tourism supported by the Government of Jharkhand.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HIGHLIGHTS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="apple-glass p-6 rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif-heading text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
