import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Heart, ChevronDown } from 'lucide-react';

export default function WeddingInvite() {
  // 1. SET YOUR WEDDING DATE HERE
  const weddingDate = new Date('2026-11-12T12:00:00').getTime();

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // RSVP Form State
  const [formData, setFormData] = useState({ name: '', status: 'attending', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Countdown Logic Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  // Handle RSVP Submit
  const handleRSVP = (e) => {
    e.preventDefault();
    // Connect to external API, Formspree, or Google Sheets endpoint here
    console.log("RSVP Data Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#333333] font-serif selection:bg-rose-100 antialiased">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-rose-50/40 via-transparent to-transparent">
        <div className="space-y-6 max-w-2xl animate-fade-in">
          <span className="text-sm uppercase tracking-[0.25em] text-gray-500 block">Save the Date</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-wide text-gray-800 drop-shadow-sm">
            Priyanka <span className="text-rose-400 font-sans block md:inline my-2 md:my-0 md:mx-2">&amp;</span> Girish
          </h1>
          <div className="w-16 h-[1px] bg-rose-300 mx-auto my-4"></div>
          <p className="text-xl md:text-2xl text-gray-600 font-light italic">12 – 13 November 2026</p>
        </div>
        
        <div className="absolute bottom-10 animate-bounce text-gray-400">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* COUNTDOWN TIMER */}
      <section className="py-16 bg-white border-y border-stone-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-light tracking-widest text-gray-700 uppercase mb-8">Counting Down</h2>
          <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-[#faf8f5] rounded-xl p-3 md:p-6 shadow-sm border border-stone-100">
                <span className="block text-2xl md:text-4xl font-light text-rose-500 font-mono tracking-tight">{String(value).padStart(2, '0')}</span>
                <span className="text-xs uppercase tracking-wider text-gray-400 block mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / EVENTS */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-light text-center tracking-widest text-gray-800 uppercase mb-16">The Celebrations</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-[1px] before:bg-rose-200">
          
          {/* Day 1: Ring Ceremony */}
          <div className="relative flex flex-col md:flex-row items-start md:justify-between group">
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-rose-400 rounded-full transform -translate-x-[5px] top-2 group-hover:scale-125 transition-transform"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] md:text-right">
              <span className="text-rose-500 text-sm font-semibold tracking-wider uppercase block mb-1">November 12</span>
              <h3 className="text-xl font-medium text-gray-800">Ring Ceremony &amp; Sangeet</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 justify-start md:justify-end">
                <Clock size={14} /> <span>04:00 PM onwards</span>
              </div>
            </div>
            <div className="hidden md:block w-[10%]"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] mt-2 md:mt-0 text-gray-600 font-sans text-sm leading-relaxed">
              Join us for an evening of music, dance routines, and rings exchanging to kick off our wedding celebrations.
            </div>
          </div>

          {/* Day 2: Wedding */}
          <div className="relative flex flex-col md:flex-row items-start md:justify-between group">
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-rose-400 rounded-full transform -translate-x-[5px] top-2 group-hover:scale-125 transition-transform"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] md:text-right order-1 md:order-3">
              <span className="text-rose-500 text-sm font-semibold tracking-wider uppercase block mb-1">November 13</span>
              <h3 className="text-xl font-medium text-gray-800">The Wedding Muhurtham</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 justify-start md:justify-end">
                <Clock size={14} /> <span>09:30 AM</span>
              </div>
            </div>
            <div className="hidden md:block w-[10%] order-2"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] mt-2 md:mt-0 text-gray-600 font-sans text-sm leading-relaxed order-3 md:order-1">
              The main wedding ceremony followed by a traditional lunch feast. Your blessings are highly anticipated.
            </div>
          </div>

        </div>
      </section>

      {/* VENUE & MAP */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <MapPin className="mx-auto text-rose-400 mb-4" size={32} />
          <h2 className="text-2xl font-light tracking-widest text-gray-800 uppercase mb-4">The Venue</h2>
          <p className="text-lg text-gray-700">The Royal Orchid Pavilions</p>
          <p className="text-sm text-gray-500 font-sans mt-1">Palace Road, Bengaluru, Karnataka 560001</p>
          
          {/* Interactive Google Map Embed Frame */}
          <div className="mt-8 rounded-2xl overflow-hidden shadow-inner border border-stone-200 aspect-video max-w-2xl mx-auto">
            <iframe 
              src="https://google.com" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Wedding Venue Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* RSVP FORM */}
      <section className="py-24 max-w-xl mx-auto px-6">
        <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-12 shadow-sm border border-stone-200/60 text-center">
          <Heart className="mx-auto text-rose-300 mb-4 fill-rose-100" size={28} />
          <h2 className="text-2xl font-light tracking-widest text-gray-800 uppercase mb-2">Will You Attend?</h2>
          <p className="text-sm text-gray-500 font-sans mb-8">Kindly respond by October 25, 2026</p>

          {submitted ? (
            <div className="py-8 animate-fade-in">
              <p className="text-xl text-rose-600 font-medium italic">Thank You!</p>
              <p className="text-gray-600 text-sm font-sans mt-2">Your response has been successfully sent to the couple.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-5 text-left font-sans text-sm">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
                <input 
                  type="text" required 
                  className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 transition-colors"
                  placeholder="Full name please"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Attendance</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    className={`py-3 px-4 rounded-xl border transition-all text-center ${formData.status === 'attending' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-stone-200 text-gray-700'}`}
                    onClick={() => setFormData({...formData, status: 'attending'})}
                  >
                    Joyfully Attend
                  </button>
                  <button 
                    type="button"
                    className={`py-3 px-4 rounded-xl border transition-all text-center ${formData.status === 'declining' ? 'bg-stone-600 text-white border-stone-600' : 'bg-white border-stone-200 text-gray-700'}`}
                    onClick={() => setFormData({...formData, status: 'declining'})}
                  >
                    Regretfully Decline
                  </button>
