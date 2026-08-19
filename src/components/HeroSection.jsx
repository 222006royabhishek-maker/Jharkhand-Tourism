import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, Trees, Waves, Compass } from 'lucide-react';

const TOTAL_FRAMES = 240;
const KEYFRAME_STEP = 3; // Preload keyframes first (1 out of 3) for instant interaction

export default function HeroSection({ onScrollToCarousel }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Store loaded images map: index -> HTMLImageElement
  const imagesMapRef = useRef(new Map());
  const [loadedCount, setLoadedCount] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  // Progressive Frame Loader: Instant rendering + Background Batch Loading
  useEffect(() => {
    let isMounted = true;
    let count = 0;

    // Helper to load a single frame
    const loadFrame = (frameIndex) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = String(frameIndex + 1).padStart(3, '0');
        img.src = `/hero_images/ezgif-frame-${frameNum}.jpg`;

        img.onload = () => {
          if (!isMounted) return;
          imagesMapRef.current.set(frameIndex, img);
          count++;
          setLoadedCount(count);
          resolve(img);
        };

        img.onerror = () => {
          if (!isMounted) return;
          count++;
          setLoadedCount(count);
          resolve(null);
        };
      });
    };

    // Phase 1: Load Frame 0 INSTANTLY so canvas displays in < 50ms
    loadFrame(0).then(() => {
      if (isMounted) setIsInitialReady(true);
    });

    // Phase 2: Load Keyframes (every 3rd frame) in parallel for immediate smooth scroll responsiveness (~80 frames)
    const keyframeIndices = [];
    for (let i = 0; i < TOTAL_FRAMES; i += KEYFRAME_STEP) {
      if (i !== 0) keyframeIndices.push(i);
    }

    Promise.all(keyframeIndices.map((idx) => loadFrame(idx))).then(() => {
      if (!isMounted) return;

      // Phase 3: Fill in remaining intermediate frames lazily in background batches
      const remainingIndices = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!imagesMapRef.current.has(i)) {
          remainingIndices.push(i);
        }
      }

      // Load remaining in small batches of 15 to keep main thread fast & unblocked
      const loadInBatches = async () => {
        const BATCH_SIZE = 15;
        for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
          if (!isMounted) break;
          const batch = remainingIndices.slice(i, i + BATCH_SIZE);
          await Promise.all(batch.map((idx) => loadFrame(idx)));
          // Yield to main thread briefly
          await new Promise((r) => setTimeout(r, 40));
        }
      };

      loadInBatches();
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Smooth scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const rawProgress = -rect.top / scrollHeight;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
        setScrollProgress(clampedProgress);
        
        targetFrameRef.current = Math.min(
          Math.floor(clampedProgress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        );
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intelligent Nearest-Frame Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let animationFrameId;

    // Find closest loaded frame if exact target frame is still downloading
    const getBestAvailableImage = (targetIndex) => {
      if (imagesMapRef.current.has(targetIndex)) {
        return imagesMapRef.current.get(targetIndex);
      }
      
      // Search backwards first, then forwards for nearest loaded keyframe
      for (let delta = 1; delta < TOTAL_FRAMES; delta++) {
        const prev = targetIndex - delta;
        if (prev >= 0 && imagesMapRef.current.has(prev)) {
          return imagesMapRef.current.get(prev);
        }
        const next = targetIndex + delta;
        if (next < TOTAL_FRAMES && imagesMapRef.current.has(next)) {
          return imagesMapRef.current.get(next);
        }
      }
      return imagesMapRef.current.get(0) || null;
    };

    const render = () => {
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.085;
      const frameIndex = Math.round(currentFrameRef.current);
      const img = getBestAvailableImage(frameIndex);

      if (img && img.complete) {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        
        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
        }

        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvasWidth;
          drawHeight = canvasWidth / imgRatio;
          offsetX = 0;
          offsetY = (canvasHeight - drawHeight) / 2;
        } else {
          drawWidth = canvasHeight * imgRatio;
          drawHeight = canvasHeight;
          offsetX = (canvasWidth - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Window Text Zoom Math
  const titleScale = 1 + scrollProgress * 2.0;
  const titleOpacity = Math.max(1 - scrollProgress * 2.2, 0);

  // Parallax side cards
  const sideOverlayOpacity = Math.min(
    Math.max((scrollProgress - 0.15) * 3.5, 0),
    Math.max((0.85 - scrollProgress) * 3.5, 0)
  );

  // Procedural Cloud Transition Math
  const cloudProgress = Math.min(Math.max((scrollProgress - 0.70) * 3.33, 0), 1);
  const cloudLeftX = (1 - cloudProgress) * -60;
  const cloudRightX = (1 - cloudProgress) * 60;
  const cloudTopY = (1 - cloudProgress) * -50;
  const cloudBottomY = (1 - cloudProgress) * 50;

  return (
    <div ref={containerRef} id="hero" className="relative w-full h-[330vh] bg-black">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* Instant Micro-Loader (Disappears as soon as Frame 0 is ready) */}
        {!isInitialReady && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 transition-opacity duration-300">
            <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-t border-white/80 animate-spin" />
              <Compass className="w-5 h-5 text-white/70" />
            </div>
            <h2 className="font-serif-heading text-base font-medium tracking-widest text-white/80">
              JHARKHAND
            </h2>
          </div>
        )}

        {/* HTML5 Canvas */}
        <canvas ref={canvasRef} className="w-full h-full object-cover block hw-accelerated" />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* ========================================================================= */}
        {/* WINDOW TITLE: "JHARKHAND" */}
        {/* ========================================================================= */}
        {titleOpacity > 0.005 && (
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-4 text-center hw-accelerated"
            style={{
              transform: `scale(${titleScale}) translateZ(0)`,
              opacity: titleOpacity,
              transition: 'transform 0.05s linear, opacity 0.05s linear',
            }}
          >
            <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl font-semibold window-glass-text select-none drop-shadow-lg">
              JHARKHAND
            </h1>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEFT SIDE FLOATING CARD */}
        {/* ========================================================================= */}
        <div 
          className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 z-20 max-w-xs pointer-events-none transition-all duration-500 hw-accelerated"
          style={{
            opacity: sideOverlayOpacity,
            transform: `translateY(-50%) translateX(${(1 - sideOverlayOpacity) * -35}px)`
          }}
        >
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-2.5 text-slate-400">
              <Trees className="w-4 h-4 text-white/90" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/80">Wilderness</span>
            </div>

            <h3 className="font-serif-heading text-lg md:text-xl font-semibold text-white mb-2 leading-snug">
              Netarhat & Saranda Forests
            </h3>

            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Vast pine valleys, sunrise peaks, and Asia’s largest Sal forest canopy.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE FLOATING CARD */}
        {/* ========================================================================= */}
        <div 
          className="absolute right-6 md:left-auto md:right-14 top-1/2 -translate-y-1/2 z-20 max-w-xs pointer-events-none transition-all duration-500 hw-accelerated"
          style={{
            opacity: sideOverlayOpacity,
            transform: `translateY(-50%) translateX(${(1 - sideOverlayOpacity) * 35}px)`
          }}
        >
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-2.5 text-slate-400">
              <Waves className="w-4 h-4 text-white/90" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/80">Waterfalls</span>
            </div>

            <h3 className="font-serif-heading text-lg md:text-xl font-semibold text-white mb-2 leading-snug">
              30+ Cascading Waterfalls
            </h3>

            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Roaring waters of Hundru, Jonha, Dassam, and Lodh falls in untouched nature.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PROCEDURAL ORGANIC LUMINOUS MOUNTAIN CLOUD TRANSITION OVERLAY */}
        {/* ========================================================================= */}
        {cloudProgress > 0.01 && (
          <div 
            className="absolute inset-0 z-40 pointer-events-none overflow-hidden hw-accelerated transition-opacity duration-300"
            style={{ opacity: cloudProgress }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-white/10 to-slate-950/80 backdrop-blur-lg"
              style={{ opacity: cloudProgress * 0.75 }}
            />

            <div 
              className="absolute -top-1/4 -left-1/4 w-[75vw] h-[75vh] procedural-cloud-puff hw-accelerated"
              style={{
                transform: `translateX(${cloudLeftX}%) translateY(${cloudTopY}%) scale(${1 + cloudProgress * 0.25})`,
                transition: 'transform 0.05s linear',
              }}
            />

            <div 
              className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vh] procedural-cloud-puff hw-accelerated"
              style={{
                transform: `translateX(${cloudRightX}%) translateY(${cloudTopY}%) scale(${1 + cloudProgress * 0.2})`,
                transition: 'transform 0.05s linear',
              }}
            />

            <div 
              className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[110vw] h-[85vh] procedural-cloud-puff-soft hw-accelerated"
              style={{
                transform: `translateX(-50%) translateY(${cloudBottomY}%) scale(${1 + cloudProgress * 0.3})`,
                transition: 'transform 0.05s linear',
              }}
            />

            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[65vh] procedural-cloud-puff hw-accelerated"
              style={{
                opacity: cloudProgress * 0.85,
                transform: `translate(-50%, -50%) scale(${0.7 + cloudProgress * 0.5})`,
                transition: 'transform 0.05s linear',
              }}
            />
          </div>
        )}

        {/* Scroll Button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <button 
            onClick={onScrollToCarousel}
            aria-label="Scroll down"
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white transition-all duration-300"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
