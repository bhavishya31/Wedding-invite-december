"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Heart, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeddingInvite() {
  const weddingDate = new Date('2026-11-12T12:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ name: '', status: 'attending', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/wedding-song.mp3'); 
    audioRef.current.loop = true;

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

    return () => {
      clearInterval(timer);
      if (audioRef.current) audioRef.current.pause();
    };
  }, [weddingDate]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio playback blocked initially:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    const FORMSPREE_ENDPOINT = "https://formspree.io";
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#333333] font-serif antialiased overflow-x-hidden relative">
      
      {/* FLOATING AUDIO TOGGLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleMusic}
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-gray-700 px-4 py-2.5 rounded-full shadow-md border border-stone-200 hover:bg-white transition-all text-xs font-sans tracking-wider uppercase"
        >
          {isPlaying ? (
            <>
              <Volume2 size={16} className="text-rose-400 animate-pulse" />
              <span>Mute Audio</span>
            </>
          ) : (
            <>
              <VolumeX size={16} className="text-gray-400" />
              <span>Play Audio</span>
            </>
          )}
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-6 max-w-2xl">
          <span className="text-sm uppercase tracking-[0.25em] text-gray-500 block">Save the Date</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-wide text-gray-800">
            Priyanka <span className="text-rose-400 font-sans block md:inline my-2 md:my-0 md:mx-2">&amp;</span> Girish
          </h1>
          <div className="w-16 h-[1px] bg-rose-300 mx-auto my-4"></div>
          <p className="text-xl md:text-2xl text-gray-600 font-light italic">12 – 13 November 2026</p>
        </motion.div>
        <div className="absolute bottom-10 animate-bounce text-gray-400">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* COUNTDOWN TIMER */}
      <section className="py-16 bg-white border-y border-stone-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-light tracking-widest text-gray-700 uppercase mb-8">Counting Down</h2>
          <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-[#faf8f5] rounded-xl p-3 md:p-6 border border-stone-100 shadow-sm">
                <span className="block text-2xl md:text-4xl font-light text-rose-500 font-mono">{String(value).padStart(2, '0')}</span>
                <span className="text-xs uppercase tracking-wider text-gray-400 block mt-1">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* THE CELEBRATIONS TIMELINE */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-light text-center tracking-widest text-gray-800 uppercase mb-16">The Celebrations</h2>
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-[1px] before:bg-rose-200">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="relative flex flex-col md:flex-row items-start md:justify-between group">
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-rose-400 rounded-full transform -translate-x-[5px] top-2"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] md:text-right">
              <span className="text-rose-500 text-sm font-semibold tracking-wider uppercase block mb-1">November 12</span>
              <h3 className="text-xl font-medium text-gray-800">Ring Ceremony &amp; Sangeet</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 justify-start md:justify-end">
                <Clock size={14} /> <span>04:00 PM onwards</span>
              </div>
            </div>
            <div className="hidden md:block w-[10%]"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] mt-2 md:mt-0 text-gray-600 font-sans text-sm">
              Join us for an evening of music, dance routines, and rings exchanging to kick off our wedding celebrations.
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="relative flex flex-col md:flex-row items-start md:justify-between group">
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-rose-400 rounded-full transform -translate-x-[5px] top-2"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] md:text-right order-1 md:order-3">
              <span className="text-rose-500 text-sm font-semibold tracking-wider uppercase block mb-1">November 13</span>
              <h3 className="text-xl font-medium text-gray-800">The Wedding Muhurtham</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 justify-start md:justify-end">
                <Clock size={14} /> <span>09:30 AM</span>
              </div>
            </div>
            <div className="hidden md:block w-[10%] order-2"></div>
            <div className="pl-10 md:pl-0 md:w-[45%] mt-2 md:mt-0 text-gray-600 font-sans text-sm order-3 md:order-1">
              The main wedding ceremony followed by a traditional lunch feast. Your blessings are highly anticipated.
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE VENUE MAP */}
      <section className="py-20 bg-white border-t border-stone-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto px-6 text-center">
          <MapPin className="mx-auto text-rose-400 mb-4" size={32} />
          <h2 className="text-2xl font-light tracking-widest text-gray-800 uppercase mb-4">The Venue</h2>
          <p className="text-lg text-gray-700">The Royal Orchid Pavilions</p>
          <p className="text-sm text-gray-500 font-sans mt-1">Palace Road, Bengaluru, Karnataka 560001</p>
          <div className="mt-8 rounded-2xl overflow-hidden border border-stone-200 aspect-video max-w-2xl mx-auto">
            <iframe src="https://google.com" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Venue Map"></iframe>
          </div>
        </motion.div>
      </section>

      {/* RSVP FORM */}
      <section className="py-24 max-w-xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-[#faf8f5] rounded-3xl p-8 md:p-12 shadow-sm border border-stone-200/60 text-center" id="rsvp">
          <Heart className="mx-auto text-rose-300 mb-4 fill-rose-100" size={28} />
          <h2 className="text-2xl font-light tracking-widest text-gray-800 uppercase mb-2">Will You Attend?</h2>
          <p className="text-sm text-gray-500 font-sans mb-8">Kindly respond by October 25, 2026</p>

          {submitted ? (
            <div className="py-8">
              <p className="text-xl text-rose-600 font-medium italic">Thank You!</p>
              <p className="text-gray-600 text-sm font-sans mt-2">Your response has been saved directly to our list.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-5 text-left font-sans text-sm">
              <div>
Your Name
<input type="text" required className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300" placeholder="Full name please" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
Attendance
<button type="button" className={py-3 px-4 rounded-xl border text-center ${formData.status === 'attending' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white border-stone-200 text-gray-700'}} onClick={() => setFormData({...formData, status: 'attending'})}>Joyfully Attend
<button type="button" className={py-3 px-4 rounded-xl border text-center ${formData.status === 'declining' ? 'bg-stone-600 text-white border-stone-600' : 'bg-white border-stone-200 text-gray-700'}} onClick={() => setFormData({...formData, status: 'declining'})}>Regretfully Decline

{formData.status === 'attending' && (
Number of Guests
<select className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})}>
{[1, 2, 3, 4, 5].map(n => (
{n} {n === 1 ? 'Person' : 'People'}
))}


)}
Warm Wishes
<textarea rows="3" className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-300 resize-none" placeholder="Write a message to the couple..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
Submit Response


)}
</motion.div>
{/* FOOTER */}

MADE WITH ❤️ FOR PRIYANKA & GIRISH
);
}