import React, { useState, useRef } from 'react';

export default function TiltCard({ children, className = '', tiltMaxAngle = 18 }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('rotateX(0deg) rotateY(0deg) scale(1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    // Relative mouse offsets from center (-0.5 to +0.5)
    const normX = x / width - 0.5;
    const normY = y / height - 0.5;

    // Calculate 3D tilt angles matching screen recording
    const rotateX = normY * -tiltMaxAngle * 2;
    const rotateY = normX * tiltMaxAngle * 2;

    setTransformStyle(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`);
    setGlarePos({
      x: (x / width) * 100,
      y: (y / height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg) scale(1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-[1200px] transition-transform duration-300 ease-out hw-accelerated ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Specular Glare Reflection */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.25), transparent 60%)`,
          opacity: glarePos.opacity,
        }}
      />
      {children}
    </div>
  );
}
