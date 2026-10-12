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
            {celebrations
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
