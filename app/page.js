"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  MapPin, 
  Heart, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Navigation, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall,
  CalendarPlus,
  Shirt
} from 'lucide-react';
import { motion } from 'framer-motion';

const MEHENDI_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const HALDI_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

/* CEREMONY LOGO ICONS */
const GaneshPujaIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <path d="M32 8 C32 8 26 17 26 22 C26 25.3 28.7 28 32 28 C35.3 28 38 25.3 38 22 C38 17 32 8 32 8Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <path d="M32 14 C32 14 29 19 29 22 C29 23.7 30.3 25 32 25 C33.7 25 35 23.7 35 22 C35 19 32 14 32 14Z" fill="#FDE68A" />
    <ellipse cx="32" cy="33" rx="10" ry="2" stroke="#B45309" strokeWidth="1.5" fill="#FDE68A" />
    <path d="M22 33 Q14 43 20 52 C23 56 41 56 44 52 Q50 43 42 33 Z" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
    <circle cx="32" cy="42" r="2.5" fill="#DC2626" />
    <path d="M25 54 L39 54" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 32 C21 27 16 27 15 29 C17 33 22 33 24 32 Z" fill="#10B981" />
    <path d="M40 32 C43 27 48 27 49 29 C47 33 42 33 40 32 Z" fill="#10B981" />
  </svg>
);

const MehendiIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <circle cx="32" cy="32" r="26" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" />
    <circle cx="32" cy="32" r="20" stroke="#10B981" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="6" fill="#047857" />
    {MEHENDI_ANGLES.map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 32 32)`}>
        <path d="M32 14 C29 18 29 23 32 26 C35 23 35 18 32 14 Z" fill="#A7F3D0" stroke="#059669" strokeWidth="1.2" />
        <circle cx="32" cy="10" r="1.5" fill="#047857" />
      </g>
    ))}
  </svg>
);

const HaldiIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    {HALDI_ANGLES.map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 32 26)`}>
        <path d="M32 8 Q34 14 32 18 Q30 14 32 8 Z" fill="#F59E0B" />
      </g>
    ))}
    <circle cx="32" cy="26" r="9" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
    <path d="M12 40 C12 40 16 54 32 54 C48 54 52 40 52 40 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
    <ellipse cx="32" cy="40" rx="20" ry="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
    <circle cx="26" cy="40" r="2.5" fill="#EF4444" />
    <circle cx="32" cy="41" r="3" fill="#FBBF24" />
    <circle cx="38" cy="40" r="2.5" fill="#EF4444" />
    <path d="M24 54 L40 54" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SangeetIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <circle cx="27" cy="20" r="9" stroke="#EC4899" strokeWidth="2" />
    <circle cx="37" cy="20" r="9" stroke="#8B5CF6" strokeWidth="2" />
    <path d="M37 11 L35 8 L39 8 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
    <path d="M18 39 C18 35 21 33 22 33 L42 33 C43 33 46 35 46 39 L46 49 C46 54 43 56 42 56 L22 56 C21 56 18 54 18 49 Z" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1.5" />
    <ellipse cx="20" cy="44" rx="2" ry="6" fill="#BE185D" />
    <ellipse cx="44" cy="44" rx="2" ry="6" fill="#BE185D" />
    <path d="M20 38 L44 50 M20 50 L44 38 M20 44 L44 44" stroke="#9D174D" strokeWidth="1" />
  </svg>
);

const WeddingMuhurthamIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    <path d="M14 24 C22 16 42 16 50 24 L52 28 L12 28 Z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
    <circle cx="32" cy="14" r="2.5" fill="#F59E0B" />
    <rect x="16" y="28" width="3" height="24" rx="1.5" fill="#DC2626" />
    <rect x="45" y="28" width="3" height="24" rx="1.5" fill="#DC2626" />
    <path d="M19 32 Q32 39 45 32" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="2 3" />
    <path d="M24 48 L40 48 L37 54 L27 54 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    <path d="M32 37 C32 37 28 42 28 45 C28 47.2 29.8 48 32 48 C34.2 48 36 47.2 36 45 C36 42 32 37 32 37 Z" fill="#EF4444" />
    <path d="M32 40 C32 40 30 43 30 44 C30 45.1 30.9 46 32 46 C33.1 46 34 45.1 34 44 C34 43 32 40 32 40 Z" fill="#FBBF24" />
  </svg>
);

const CELEBRATIONS = [
  {
    date: "December 3, 2026",
    dayLabel: "Day 01",
    dayKey: "day1",
    events: [
      {
        id: "ganesh-puja",
        time: "10:00 AM",
        title: "Ganesh Puja & Mandap Mahurat",
        tagline: "Auspicious Beginnings",
        attire: "Traditional Yellow / Pavitra Ethnic",
        desc: "Seeking the divine blessings of Lord Ganesha to mark the auspicious beginning of our wedding festivities.",
        logo: <GaneshPujaIcon />,
        badgeColor: "bg-amber-500/10 text-amber-800 border-amber-300",
        ringColor: "ring-amber-200/80 bg-amber-50/70",
        calDates: "20261203T043000Z/20261203T073000Z"
      },
      {
        id: "mehendi",
        time: "01:30 PM",
        title: "Mehendi Ceremony",
        tagline: "Henna, Folk & Celebrations",
        attire: "Floral Vibes & Shades of Green",
        desc: "An afternoon rich with intricate henna designs, soulful folk melodies, sweets, and joyous celebration.",
        logo: <MehendiIcon />,
        badgeColor: "bg-emerald-500/10 text-emerald-800 border-emerald-300",
        ringColor: "ring-emerald-200/80 bg-emerald-50/70",
        calDates: "20261203T080000Z/20261203T103000Z"
      },
      {
        id: "haldi",
        time: "04:30 PM",
        title: "Haldi Rasam",
        tagline: "Marigold Showers & Turmeric",
        attire: "Sunshine Yellow & Bright Hues",
        desc: "A lively ritual of auspicious turmeric paste, flower petal showers, laughter, and blessings.",
        logo: <HaldiIcon />,
        badgeColor: "bg-yellow-500/15 text-yellow-900 border-yellow-300",
        ringColor: "ring-yellow-200/80 bg-yellow-50/70",
        calDates: "20261203T110000Z/20261203T133000Z"
      },
      {
        id: "sangeet",
        time: "07:30 PM onwards",
        title: "Ring Ceremony & Sangeet Night",
        tagline: "Beats, Rings & Revelry",
        attire: "Glamorous Indo-Western / Evening Cocktail",
        desc: "An electrifying night celebrating the exchange of rings, choreographed dances, musical beats, and a dinner feast.",
        logo: <SangeetIcon />,
        badgeColor: "bg-rose-500/10 text-rose-800 border-rose-300",
        ringColor: "ring-rose-200/80 bg-rose-50/70",
        calDates: "20261203T140000Z/20261203T180000Z"
      }
    ]
  },
  {
    date: "December 4, 2026",
    dayLabel: "Day 02",
    dayKey: "day2",
    events: [
      {
        id: "wedding",
        time: "07:00 PM onwards",
        title: "The Wedding Muhurtham (Baraat & Phere)",
        tagline: "The Sacred Seven Vows",
        attire: "Royal Traditional / Grand Ethnic Splendor",
        desc: "The arrival of the Baraat, exchange of Varmala, and the sacred Seven Vows around the holy fire, followed by a royal feast.",
        logo: <WeddingMuhurthamIcon />,
        badgeColor: "bg-red-500/10 text-red-900 border-red-300",
        ringColor: "ring-red-200/80 bg-red-50/70",
        calDates: "20261204T133000Z/20261204T193000Z"
      }
    ]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function WeddingInvite() {
  const weddingDate = new Date('2026-12-03T10:00:00Z').getTime();
  const [isMounted, setIsMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '',
    status: 'attending', 
    guests: '1', 
    attendingEvents: ['all'],
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const audioRef = useRef(null);
  const [activeDayFilter, setActiveDayFilter] = useState('all');
  const defaultFallbackImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80";
  const [heroImageSrc, setHeroImageSrc] = useState('/hero.jpg');

  const handleImageFallback = () => {
    if (heroImageSrc !== defaultFallbackImage) {
      setHeroImageSrc(defaultFallbackImage);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    audioRef.current = new Audio('/weddingsong.mp3'); 
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
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio playback blocked initially:", err));
    }
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 600);
      return;
    }
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    const shareData = {
      title: "Bhavna & Devansh Wedding Invitation",
      text: "We invite you to celebrate the wedding of Bhavna & Devansh in Jaipur on 3-4 December 2026!",
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard?.writeText(shareData.url);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Bhavna & Devansh Wedding Celebrations")}&dates=20261203T043000Z/20261204T183000Z&details=${encodeURIComponent("Join us in celebrating the wedding festivities of Bhavna and Devansh at Aura Banquet Hall, Jaipur!")}&location=${encodeURIComponent("Aura Banquet Hall, Giriraj Nagar, Dholai, Jaipur, Rajasthan 302020")}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#333333] font-serif antialiased overflow-x-hidden relative">
      
      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-gray-700 px-4 py-2.5 rounded-full shadow-lg border border-stone-200 hover:bg-stone-50 transition-all text-xs font-sans tracking-wider uppercase"
          title="Share Invitation"
        >
          <Share2 size={15} className="text-rose-500" />
          <span>{copiedShare ? "Link Copied!" : "Share"}</span>
        </button>

        <button 
          onClick={toggleMusic}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-gray-700 px-4 py-2.5 rounded-full shadow-lg border border-stone-200 hover:bg-stone-50 transition-all text-xs font-sans tracking-wider uppercase"
        >
          {isPlaying ? (
            <>
              <Volume2 size={16} className="text-rose-400 animate-pulse" />
              <span>Mute Music</span>
            </>
          ) : (
            <>
              <VolumeX size={16} className="text-gray-500" />
              <span>Play Music</span>
            </>
          )}
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
        {/* BACKGROUND IMAGE & OVERLAYS */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImageSrc} 
            alt="Bhavna & Devansh" 
            className="w-full h-full object-cover object-center filter brightness-[0.92]"
            onError={handleImageFallback}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/70 via-[#faf8f5]/50 to-[#faf8f5]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,242,242,0.5)_0%,transparent_75%)] pointer-events-none" />
        </div>
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-6 max-w-3xl z-10">
          <span className="text-xs md:text-sm font-sans tracking-[0.35em] text-rose-500 uppercase block font-medium">
            ॥ श्री गणेशाय नमः ॥
          </span>

          <div className="w-12 h-[1px] bg-rose-200 mx-auto" />

          <span className="text-sm uppercase tracking-[0.3em] text-gray-500 block font-sans">
            Together With Their Families
          </span>

          <h1 className="text-5xl md:text-8xl font-light tracking-wide text-gray-800 leading-tight">
            BHAVNA 
            <span className="text-rose-400 font-serif block md:inline my-2 md:my-0 md:mx-4 font-normal">&amp;</span> 
            DEVANSH
          </h1>

          <p className="text-base md:text-xl text-gray-600 font-light italic max-w-xl mx-auto">
            Invite you to celebrate their union, love, and beginnings of forever
          </p>

          <div className="pt-2">
            <span className="inline-block border-y border-stone-300 py-2 px-6 text-xl md:text-2xl text-gray-700 tracking-wider font-light">
              3 – 4 December 2026
            </span>
            <p className="text-sm font-sans tracking-widest text-stone-500 uppercase mt-2">Jaipur, Rajasthan</p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-sans tracking-wider uppercase">
            <a 
              href={googleCalendarUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-full hover:bg-stone-800 transition-colors shadow-sm"
            >
              <CalendarPlus size={14} /> Add to Calendar
            </a>
            <a 
              href="#rsvp" 
              className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors shadow-sm"
            >
              <Heart size={14} className="fill-white" /> RSVP Now
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-8 animate-bounce text-gray-400">
          <a href="#countdown" aria-label="Scroll Down">
            <ChevronDown size={28} />
          </a>
        </div>
      </section>

      {/* COUNTDOWN TIMER */}
      <section id="countdown" className="py-20 bg-white border-y border-stone-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="max-w-3xl mx-auto px-4 text-center">
          <Sparkles className="mx-auto text-rose-400 mb-3" size={24} />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-800 uppercase mb-2">Counting Down To Forever</h2>
          <p className="text-stone-500 text-sm font-sans mb-10">Every second brings us closer to celebrating with you</p>
          
          <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-[#faf8f5] rounded-2xl p-4 md:p-6 border border-stone-200/60 shadow-sm">
                <span className="block text-3xl md:text-5xl font-light text-rose-500 font-mono tracking-tight">{isMounted ? String(value).padStart(2, '0') : "00"}</span>
                <span className="text-xs uppercase tracking-wider text-gray-400 block mt-1">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-24 max-w-3xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6">
          <span className="text-xs font-sans tracking-[0.25em] text-rose-500 uppercase block font-semibold">Our Journey</span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-800">Two Souls, One Beautiful Beginning</h2>
          <div className="w-16 h-[1px] bg-rose-300 mx-auto"></div>
          <p className="text-stone-600 font-sans text-sm md:text-base leading-relaxed">
            From mutual smiles and unending late-night conversations to realizing that every tomorrow is sweeter together. 
            Surrounded by the warmth of our beloved family and dearest friends, we are thrilled to step into our forever 
            and begin this blessed new chapter.
          </p>
        </motion.div>
      </section>

      {/* THE CELEBRATIONS TIMELINE */}
      <section className="py-24 bg-[#fbf9f6] border-t border-stone-200/70">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-sans tracking-[0.3em] text-rose-500 uppercase block font-semibold mb-2">Itinerary &amp; Events</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-widest text-gray-800 uppercase">The Celebrations</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="h-[1px] w-12 bg-rose-300"></span>
              <span className="text-rose-400 text-xs">❦</span>
              <span className="h-[1px] w-12 bg-rose-300"></span>
            </div>
            <p className="text-stone-500 text-xs md:text-sm font-sans mt-3 max-w-lg mx-auto">
              Join us through every ritual, dance, and prayer as we unite in love and tradition.
            </p>

            {/* DAY SELECTOR TABS */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {[
                { key: 'all', label: 'All Celebrations' },
                { key: 'day1', label: 'Day 01 • Dec 3' },
                { key: 'day2', label: 'Day 02 • Dec 4' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveDayFilter(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200 ${
                    activeDayFilter === tab.key
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-16">
            {CELEBRATIONS
              .filter((day) => activeDayFilter === 'all' || activeDayFilter === day.dayKey)
              .map((day, dIdx) => (
                <div key={dIdx} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] bg-gradient-to-r from-transparent to-rose-200 flex-1"></div>
                    <div className="text-center px-6 py-2 bg-white rounded-full border border-rose-100 shadow-sm">
                      <span className="text-[11px] font-sans tracking-widest uppercase text-rose-600 font-semibold block">{day.dayLabel}</span>
                      <h3 className="text-lg md:text-xl font-light text-gray-800 tracking-wider">{day.date}</h3>
                    </div>
                    <div className="h-[1px] bg-gradient-to-l from-transparent to-rose-200 flex-1"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {day.events.map((evt, eIdx) => {
                      const eventCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        `Bhavna & Devansh: ${evt.title}`
                      )}&dates=${evt.calDates}&details=${encodeURIComponent(
                        evt.desc
                      )}&location=${encodeURIComponent("Aura Banquet Hall, Giriraj Nagar, Dholai, Jaipur")}`;

                      return (
                        <motion.div 
                          key={eIdx}
                          initial="hidden" 
                          whileInView="visible" 
                          viewport={{ once: true, margin: "-50px" }} 
                          variants={fadeInUp}
                          className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden flex flex-col justify-between group"
                        >
                          {/* TOP LOGO EMBLEM */}
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-full p-2.5 flex items-center justify-center ring-4 ${evt.ringColor} shadow-inner mb-4 transition-transform duration-300 group-hover:scale-105`}>
                              {evt.logo}
                            </div>

                            <span className={`text-[10px] font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${evt.badgeColor} mb-2`}>
                              {evt.tagline}
                            </span>

                            <h4 className="text-xl md:text-2xl font-light text-gray-900 tracking-wide mb-2 mt-1">{evt.title}</h4>

                            <div className="inline-flex items-center gap-1.5 text-stone-600 text-xs font-sans font-medium bg-stone-50 border border-stone-200 px-3 py-1 rounded-full mb-4">
                              <Clock size={13} className="text-rose-500" />
                              <span>{evt.time}</span>
                            </div>

                            <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
                              {evt.desc}
                            </p>
                          </div>

                          {/* ATTIRE & ADD TO CALENDAR FOOTER */}
                          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
                            <div className="flex items-center gap-1.5 text-stone-600 text-center sm:text-left">
                              <Shirt size={14} className="text-rose-400 shrink-0" />
                              <span><strong className="text-stone-800">Attire:</strong> <em className="italic">{evt.attire}</em></span>
                            </div>
                            <a
                              href={eventCalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors shrink-0"
                            >
                              <CalendarPlus size={13} />
                              <span>Calendar</span>
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* THE VENUE MAP */}
      <section className="py-24 bg-white border-t border-stone-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-3xl mx-auto px-6 text-center">
          <MapPin className="mx-auto text-rose-400 mb-4" size={32} />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-800 uppercase mb-3">The Venue</h2>
          <p className="text-xl text-gray-800 font-medium">Aura Banquet Hall</p>
          <p className="text-sm text-gray-500 font-sans mt-1 max-w-md mx-auto">
            Aura Banquet, Giriraj Nagar, Dholai, Jaipur, Rajasthan 302020
          </p>

          <div className="mt-6 flex justify-center">
            <a 
              href="https://maps.google.com/?q=Aura+Banquet+Hall+Giriraj+Nagar+Dholai+Jaipur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-5 py-2.5 rounded-full text-xs font-sans tracking-wider uppercase transition-colors"
            >
              <Navigation size={14} className="text-rose-500" /> Get Directions
            </a>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border border-stone-200 aspect-video max-w-2xl mx-auto shadow-sm">
            <iframe 
              src="https://maps.google.com/maps?q=Aura+Banquet+Hall+Giriraj+Nagar+Dholai+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy" 
              title="Venue Location Map"
            />
          </div>
        </motion.div>
      </section>

      {/* STAY & GUEST ASSISTANCE */}
      <section className="py-16 bg-[#faf8f5] border-t border-stone-200/60">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Need Help or Directions?</h3>
          <p className="text-stone-500 font-sans text-xs md:text-sm mb-6">
            For travel assistance, accommodations, or special arrangements, feel free to reach out to our wedding coordinators.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-sans">
            <a 
              href="https://wa.me/?text=Hello!%20I%20have%20a%20query%20regarding%20Bhavna%20and%20Devansh's%20wedding" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-stone-300 bg-white px-5 py-2.5 rounded-full hover:bg-stone-50 transition-colors text-stone-700"
            >
              <PhoneCall size={14} className="text-green-600" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* RSVP FORM */}
      <section id="rsvp" className="py-24 max-w-2xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-200 text-center">
          <Heart className="mx-auto text-rose-300 mb-4 fill-rose-100" size={28} />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-800 uppercase mb-2">Will You Attend?</h2>
          <p className="text-sm text-gray-500 font-sans mb-8">Kindly RSVP by October 25, 2026 so we can prepare for your arrival</p>

          {submitted ? (
            <div className="py-12 flex flex-col items-center">
              <CheckCircle2 size={48} className="text-rose-500 mb-3" />
              <p className="text-2xl text-rose-600 font-serif italic">Thank You!</p>
              <p className="text-gray-600 text-sm font-sans mt-2 max-w-md">
                Your response has been warmly noted. We cannot wait to celebrate our special days with you!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-6 text-left font-sans text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white transition-colors"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white transition-colors"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-xs uppercase tracking-wider">Will you join our celebrations? *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-xl border text-center font-medium transition-all ${
                      formData.status === 'attending' 
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm' 
                        : 'bg-stone-50 border-stone-200 text-gray-700 hover:bg-stone-100'
                    }`}
                    onClick={() => setFormData({ ...formData, status: 'attending' })}
                  >
                    Joyfully Attend
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 rounded-xl border text-center font-medium transition-all ${
                      formData.status === 'declining' 
                        ? 'bg-stone-700 text-white border-stone-700 shadow-sm' 
                        : 'bg-stone-50 border-stone-200 text-gray-700 hover:bg-stone-100'
                    }`}
                    onClick={() => setFormData({ ...formData, status: 'declining' })}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {formData.status === 'attending' && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Number of Guests</label>
                    <select
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Events You'll Attend</label>
                    <select
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white"
                      onChange={(e) => setFormData({ ...formData, attendingEvents: [e.target.value] })}
                    >
                      <option value="all">Attending All Celebrations (Dec 3 &amp; Dec 4)</option>
                      <option value="dec3">December 3rd Only (Sangeet, Haldi &amp; Mehendi)</option>
                      <option value="dec4">December 4th Only (Wedding Muhurtham)</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-xs uppercase tracking-wider">Warm Wishes &amp; Blessings</label>
                <textarea
                  rows="3"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-400 focus:bg-white resize-none"
                  placeholder="Leave a message for Bhavna & Devansh..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white border-t border-stone-100 text-center text-xs text-gray-400 font-sans tracking-widest uppercase">
        <p className="mb-2">MADE WITH ❤️ FOR BHAVNA &amp; DEVANSH</p>
        <p className="text-[10px] text-gray-400 tracking-normal font-serif italic normal-case">
          3 – 4 December 2026 • Aura Banquet Hall, Jaipur
        </p>
      </footer>
    </div>
  );
}
