import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationCarousel from './components/DestinationCarousel';
import JharkhandMap from './components/JharkhandMap';
import AboutSection from './components/AboutSection';
import BookingModal from './components/BookingModal';
import AiTravelAssistant from './components/AiTravelAssistant';
import Footer from './components/Footer';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleOpenBooking = (dest = null) => {
    setSelectedDestination(dest);
    setBookingModalOpen(true);
  };

  const handleScrollToCarousel = () => {
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-slate-100 font-sans selection:bg-white selection:text-black">
      {/* Top Navbar */}
      <Navbar onBookClick={() => handleOpenBooking(null)} />

      {/* Main Sections */}
      <main>
        {/* Scroll-Driven Hero Section */}
        <HeroSection onScrollToCarousel={handleScrollToCarousel} />

        {/* 3D Cover Flow Destination Carousel */}
        <DestinationCarousel onSelectDestination={(dest) => handleOpenBooking(dest)} />

        {/* Interactive Jharkhand Map (Seamless Screen Blend + Red Pushpin Cursor & Markers) */}
        <JharkhandMap />

        {/* Tourism Overview & Culture */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        destination={selectedDestination}
      />

      {/* Floating Jharkhand AI Travel & Safety Planner Assistant */}
      <AiTravelAssistant />
    </div>
  );
}
