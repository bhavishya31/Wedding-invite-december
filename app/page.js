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
  CalendarPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeddingInvite() {
  const weddingDate = new Date('2026-12-03T10:00:00').getTime();

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

  useEffect(() => {
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const celebrations = [
    {
      date: "December 3, 2026",
      dayLabel: "Day 01",
      events: [
        {
          time: "10:00 AM",
          title: "Ganesh Puja & Mandap Mahurat",
          attire: "Traditional Yellow / Pavitra Ethnic",
          desc: "Seeking the divine blessings of Lord Ganesha to mark the auspicious beginning of our wedding festivities."
        },
        {
          time: "01:30 PM",
          title: "Mehendi Ceremony",
          attire: "Floral Vibes & Shades of Green",
          desc: "An afternoon rich with intricate henna designs, soulful folk melodies, sweets, and joyous celebration."
        },
        {
          time: "04:30 PM",
          title: "Haldi Rasam",
          attire: "Sunshine Yellow & Bright Hues",
          desc: "A lively ritual of auspicious turmeric paste, flower petal showers, laughter, and blessings."
        },
        {
          time: "07:30 PM onwards",
          title: "Ring Ceremony & Sangeet Night",
          attire: "Glamorous Indo-Western / Evening Cocktail",
          desc: "An electrifying night celebrating the exchange of rings, choreographed dances, musical beats, and a dinner feast."
        }
      ]
    },
    {
      date: "December 4, 2026",
      dayLabel: "Day 02",
      events: [
        {
          time: "07:00 PM onwards",
          title: "The Wedding Muhurtham (Baraat & Phere)",
          attire: "Royal Traditional / Grand Ethnic Splendor",
          desc: "The arrival of the Baraat, exchange of Varmala, and the sacred Seven Vows around the holy fire, followed by a royal feast."
        }
      ]
    }
  ];

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,242,242,0.6)_0%,transparent_70%)] pointer-events-none" />
        
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
                <span className="block text-3xl md:text-5xl font-light text-rose-500 font-mono tracking-tight">{String(value).padStart(2, '0')}</span>
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-sans tracking-[0.25em] text-rose-500 uppercase block font-semibold mb-2">Itinerary</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-widest text-gray-800 uppercase">The Celebrations</h2>
            <div className="w-16 h-[1px] bg-rose-300 mx-auto mt-4"></div>
          </div>

          <div className="space-y-16">
            {celebrations.map((day, dIdx) => (
              <div key={dIdx} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] bg-rose-200 flex-1"></div>
                  <div className="text-center px-4">
                    <span className="text-xs font-sans tracking-widest uppercase text-rose-600 font-semibold block">{day.dayLabel}</span>
                    <h3 className="text-xl md:text-2xl font-light text-gray-800 tracking-wider">{day.date}</h3>
                  </div>
                  <div className="h-[1px] bg-rose-200 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {day.events.map((evt, eIdx) => (
                    <motion.div 
                      key={eIdx}
                      initial="hidden" 
                      whileInView="visible" 
                      viewport={{ once: true, margin: "-50px" }} 
                      variants={fadeInUp}
                      className="bg-white rounded-2xl p-6 border border-stone-200/70 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-400"></div>
                      <div>
                        <div className="flex items-center gap-2 text-rose-500 text-xs font-sans font-semibold tracking-wider uppercase mb-2">
                          <Clock size={14} /> <span>{evt.time}</span>
                        </div>
                        <h4 className="text-lg md:text-xl font-medium text-gray-800 mb-2">{evt.title}</h4>
                        <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed mb-4">{evt.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-sans text-stone-500">
                        <span className="font-medium text-stone-700">Attire:</span>
                        <span className="italic">{evt.attire}</span>
                      </div>
                    </motion.div>
                  ))}
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
              allowFullScreen="" 
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
