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

/* ROYAL RAJASTHANI MOTIF ARTWORK (Elephant, Camel, Horse) */
const RoyalElephant = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 80" className={className} fill="currentColor">
    <path d="M78 48 C78 38 72 30 60 28 C56 22 47 18 36 18 C24 18 16 26 14 36 C10 37 6 42 6 47 C6 53 10 57 15 57 C15 67 19 72 23 72 C27 72 28 66 28 58 C32 58 36 58 40 58 C40 66 42 72 46 72 C50 72 52 66 52 58 C56 58 60 58 64 57 C64 66 66 72 70 72 C74 72 76 66 76 56 C82 56 86 52 86 46 C86 38 80 32 76 32 C74 32 74 36 76 40 C77 42 76 46 73 47 C70 48 68 45 68 41 C68 34 71 27 65 24 C59 21 54 24 51 28 C55 31 58 36 58 42 C58 50 51 56 43 56 C37 56 32 52 32 46 C32 38 38 31 46 29 C44 26 40 25 36 25 C28 25 22 30 20 37 C24 37 27 40 27 44 C27 48 24 51 20 51 C19 51 18 50 17 49 C17 56 20 63 24 64 L24 55 C24 53 26 51 28 51 C30 51 32 53 32 55 L32 64 C36 64 40 64 44 64 L44 55 C44 53 46 51 48 51 C50 51 52 53 52 55 L52 64 C56 64 60 63 63 61 L63 54 C63 52 65 50 67 50 C69 50 71 52 71 54 L71 60 C74 58 76 54 77 50 Z" />
    {/* Decorative Royal Howdah & Ambari */}
    <path d="M34 16 L44 16 L42 8 L36 8 Z" fill="#D97706" />
    <circle cx="39" cy="6" r="2.5" fill="#DC2626" />
    <path d="M28 26 C28 26 36 34 46 26 L48 38 C38 43 32 37 28 38 Z" fill="#F59E0B" opacity="0.9" />
  </svg>
);

const RoyalCamel = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 90" className={className} fill="currentColor">
    <path d="M82 14 C78 12 73 14 70 18 L64 28 C61 34 57 37 52 35 C48 33 46 27 43 27 C39 27 36 32 33 36 C30 40 24 43 18 43 C12 43 7 48 7 54 C7 60 11 65 17 65 C19 72 21 82 24 82 C27 82 28 75 29 67 C34 67 40 67 45 67 C46 74 48 82 51 82 C54 82 55 74 56 66 C61 65 67 63 71 59 C74 65 76 77 79 77 C82 77 83 70 83 61 C85 57 87 52 87 47 C87 38 83 33 80 30 L84 20 C86 16 85 14 82 14 Z" />
    {/* Royal Saddle Harness */}
    <path d="M36 38 C39 34 47 34 50 38 L48 48 C43 45 39 46 36 48 Z" fill="#DC2626" />
    <circle cx="76" cy="18" r="2" fill="#FEF08A" />
  </svg>
);

const RoyalHorse = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 100 90" className={className} fill="currentColor">
    <path d="M78 12 C74 12 70 15 67 20 L58 35 C52 37 46 35 41 33 C33 30 25 35 20 42 C16 48 14 55 12 63 C10 70 6 75 6 78 C9 78 14 74 17 68 C19 75 22 84 26 84 C29 84 31 77 32 68 C38 68 44 68 50 67 C51 74 53 84 57 84 C60 84 62 76 63 67 C68 66 73 63 77 58 C79 66 82 78 86 78 C89 78 90 70 89 60 C92 53 93 45 92 37 C91 29 85 22 82 18 L84 14 C85 12 82 12 78 12 Z" />
    {/* Royal Plume / Kalgi */}
    <path d="M76 8 C78 4 82 4 82 7 C82 10 78 11 76 8 Z" fill="#DC2626" />
    <path d="M48 38 C54 44 64 42 67 37 L69 47 C63 50 54 50 47 45 Z" fill="#F59E0B" />
  </svg>
);

/* ORNAMENTAL CORNER BORDER COMPONENT */
const RoyalCorner = ({ position = "top-left" }) => {
  const styles = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2 rotate-90",
    "bottom-left": "bottom-2 left-2 -rotate-90",
    "bottom-right": "bottom-2 right-2 rotate-180"
  };
  return (
    <div className={`absolute ${styles[position]} pointer-events-none w-7 h-7 text-amber-500/50`}>
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 38 L2 14 C2 7.37 7.37 2 14 2 L38 2" />
        <path d="M8 38 L8 16 C8 11.58 11.58 8 16 8 L38 8" strokeDasharray="2 3" />
        <circle cx="16" cy="16" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </div>
  );
};

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

/* BARAAT & DHOL PROCESSION ICON */
const BaraatIcon = () => (
  <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
    {/* Dhol Barrel */}
    <ellipse cx="32" cy="32" rx="14" ry="20" transform="rotate(35 32 32)" fill="#991B1B" stroke="#F59E0B" strokeWidth="1.8" />
    <ellipse cx="20" cy="23" rx="7" ry="12" transform="rotate(35 20 23)" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
    <ellipse cx="44" cy="41" rx="7" ry="12" transform="rotate(35 44 41)" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
    {/* Dhol Ropes / Bracing */}
    <path d="M22 14 L42 32 M25 31 L45 50 M16 26 L36 46" stroke="#FEF08A" strokeWidth="1.2" strokeLinecap="round" />
    {/* Drumsticks / Danka & Chhari */}
    <path d="M10 18 L26 27" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="10" cy="18" r="2.5" fill="#DC2626" />
    <path d="M12 40 L28 35" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    {/* Musical Celebration Sparkles */}
    <circle cx="48" cy="16" r="2" fill="#F59E0B" />
    <circle cx="54" cy="24" r="1.5" fill="#EF4444" />
    <circle cx="44" cy="12" r="1.5" fill="#F59E0B" />
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
        id: "baraat-swagat",
        time: "06:00 PM",
        title: "Baraat Swagat & Dhol Tasha",
        tagline: "Beats, Brass & Grand Welcome",
        attire: "Regal Sherwani / Bandhgala & Vibrant Safa",
        desc: "Joyous arrival of the groom and celebratory Baraat procession with live Punjabi dhol beats, nagada, brass brass band, and warm Milni welcome by the bride's family.",
        logo: <BaraatIcon />,
        badgeColor: "bg-orange-500/10 text-orange-900 border-orange-300",
        ringColor: "ring-orange-200/80 bg-orange-50/70",
        calDates: "20261204T123000Z/20261204T133000Z"
      },
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
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

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
  const defaultFallbackImage = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80";
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

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

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
    <div className="min-h-screen bg-[#faf7f2] text-[#333333] font-serif antialiased overflow-x-hidden relative selection:bg-rose-100 selection:text-rose-900">
      
      {/* INTERACTIVE ROYAL ENVELOPE / GREETING CARD MODAL */}
      {!isInvitationOpened && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-md transition-all duration-700">
          <div className="relative w-full max-w-lg bg-[#fffdf9] rounded-3xl p-8 md:p-12 text-center border-4 border-amber-300/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
            <RoyalCorner position="top-left" />
            <RoyalCorner position="top-right" />
            <RoyalCorner position="bottom-left" />
            <RoyalCorner position="bottom-right" />

            {/* Floating Heritage Watermark Icons in Card */}
            <div className="absolute top-4 left-6 opacity-15 text-amber-800 pointer-events-none">
              <RoyalElephant className="w-12 h-12" />
            </div>
            <div className="absolute top-4 right-6 opacity-15 text-amber-800 pointer-events-none">
              <RoyalHorse className="w-12 h-12" />
            </div>

            <div className="relative z-10 space-y-4">
              <span className="text-xs font-sans tracking-[0.35em] text-rose-600 uppercase font-bold block">
                ॥ श्री गणेशाय नमः ॥
              </span>

              <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

              <p className="text-xs tracking-[0.3em] font-sans text-stone-500 uppercase">
                Royal Wedding Invitation
              </p>

              <h2 className="text-3xl md:text-5xl font-light text-stone-900 tracking-wide">
                Bhavna <span className="text-rose-500 font-serif">&amp;</span> Devansh
              </h2>

              <p className="text-xs md:text-sm text-stone-600 italic font-serif">
                Cordially invite you to grace the auspicious celebrations of their holy union in Jaipur.
              </p>

              {/* Wax Seal Button to Enter */}
              <div className="pt-6 pb-2">
                <button
                  onClick={handleOpenInvitation}
                  className="group relative inline-flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-600 shadow-xl flex items-center justify-center border-2 border-amber-200 text-white ring-4 ring-rose-200/50">
                    <Heart className="w-8 h-8 fill-white/90 animate-pulse text-white" />
                  </div>
                  <span className="mt-3 text-xs font-sans tracking-[0.25em] text-rose-700 uppercase font-semibold group-hover:text-rose-800">
                    Click to Open Card ❦
                  </span>
                </button>
              </div>

              <p className="text-[11px] font-sans text-stone-400">
                Tap to unveil celebrations &amp; festive melodies
              </p>
            </div>
          </div>
        </div>
      )}

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
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroImageSrc} 
            alt="Bhavna & Devansh" 
            className="w-full h-full object-cover object-center filter brightness-[0.88] scale-105 transition-transform duration-1000"
            onError={handleImageFallback}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f2]/80 via-[#faf7f2]/55 to-[#faf7f2]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,241,242,0.6)_0%,transparent_80%)] pointer-events-none" />

          {/* Royal Heritage Watermarks in Hero */}
          <div className="absolute bottom-6 left-6 opacity-20 text-amber-800 pointer-events-none hidden md:block">
            <RoyalElephant className="w-28 h-28" />
          </div>
          <div className="absolute bottom-6 right-6 opacity-20 text-amber-800 pointer-events-none hidden md:block">
            <RoyalCamel className="w-28 h-28" />
          </div>
          <div className="absolute top-1/2 left-8 -translate-y-1/2 opacity-15 text-amber-800 pointer-events-none hidden lg:block">
            <RoyalHorse className="w-24 h-24" />
          </div>
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
          <div className="flex items-center justify-center gap-4 mb-3">
            <RoyalCamel className="w-7 h-7 text-amber-600/60" />
            <RoyalElephant className="w-8 h-8 text-rose-500/70" />
            <RoyalHorse className="w-7 h-7 text-amber-600/60" />
          </div>
          <Sparkles className="mx-auto text-rose-400 mb-3" size={24} />
          <h2 className="text-2xl md:text-3xl font-light tracking-widest text-gray-800 uppercase mb-2">Counting Down To Forever</h2>
          <p className="text-stone-500 text-sm font-sans mb-10">Every second brings us closer to celebrating with you</p>
          
          <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-lg mx-auto">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="bg-[#faf8f5] rounded-2xl p-4 md:p-6 border border-amber-200/50 shadow-sm relative overflow-hidden">
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
                          className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden flex flex-col justify-between group hover:border-amber-300"
                        >
                          <RoyalCorner position="top-left" />
                          <RoyalCorner position="top-right" />
                          
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
