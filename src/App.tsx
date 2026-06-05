import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ChevronDown, 
  Eye, 
  Award, 
  Instagram, 
  Menu, 
  X,
  ShieldAlert
} from "lucide-react";

import { Experience } from "./types";
import AmbientBackground from "./components/AmbientBackground";
import BookingForm from "./components/BookingForm";
import DisintegratingPortrait from "./components/DisintegratingPortrait";
import { useLanguage } from "./context/LanguageContext";
import CDCard from "./components/CDCard";

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPresetType, setSelectedPresetType] = useState<string>("");

  const aboutRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  // Safe import for the portrait using import.meta.url
  const glebPortrait = new URL("./assets/images/gleb_portrait_1780588373623.png", import.meta.url).href;

  const EXPERIENCE_DATA: Experience[] = [
    {
      id: "private",
      title: t("privateTitle"),
      subtitle: "",
      description: t("privateDesc"),
      highlights: [],
      duration: "",
      suitability: t("privateSuitability"),
    },
    {
      id: "corporate",
      title: t("corporateTitle"),
      subtitle: "",
      description: t("corporateDesc"),
      highlights: [],
      duration: "",
      suitability: t("corporateSuitability"),
    },
    {
      id: "theatre",
      title: t("theatreTitle"),
      subtitle: "",
      description: t("theatreDesc"),
      highlights: [],
      duration: "",
      suitability: t("theatreSuitability"),
    },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSelectBookingPreset = (title: string) => {
    setSelectedPresetType(title);
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen selection:bg-blue-600/30 selection:text-white">
      {/* Decorative Interactive Background */}
      <AmbientBackground />

      {/* NAV / FLOATING HEADER */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 h-20 border-b border-white/5 bg-zinc-950/40 backdrop-blur-md z-40 transition-colors"
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          
          {/* Logo Brand Accent */}
          <div className="flex items-center gap-2">
            <span className="font-display text-lg md:text-xl font-extrabold tracking-[6px] text-white select-none">
              GLEB TS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse hidden md:inline-block" />
          </div>

          {/* Core Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-[#94A3B8]">
            <button 
              onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1 group"
            >
              <span className="text-zinc-650 group-hover:text-blue-400 font-bold mr-1">01/</span> {t("navAbout")}
            </button>
            <button 
              onClick={() => experiencesRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1 group"
            >
              <span className="text-zinc-650 group-hover:text-blue-400 font-bold mr-1">02/</span> {t("navExperiences")}
            </button>
            <button 
              onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1 group"
            >
              <span className="text-zinc-650 group-hover:text-blue-400 font-bold mr-1">03/</span> {t("navBooking")}
            </button>
          </nav>

          {/* Book Header CTA & Language Selector */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selection Pills */}
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/5 text-[10px] font-mono tracking-widest font-bold">
              {(["EN", "LT", "RU"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer text-[10px] font-bold font-mono ${
                    language === lang ? "text-[#60A5FA] bg-blue-500/10" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button 
              id="header-booking-btn"
              onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="px-5 py-2.5 border border-white/10 hover:border-blue-500/50 bg-black/40 hover:bg-white text-white hover:text-black font-semibold text-2xs uppercase tracking-widest rounded transition-all duration-300"
            >
              {t("btnBookEvent")}
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE NAIL OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed inset-0 bg-[#050505]/95 z-30 flex flex-col justify-center px-8 md:hidden"
          >
            <div className="space-y-8 flex flex-col text-left font-display">
              <span className="text-[10px] font-mono tracking-widest text-zinc-650 uppercase border-b border-white/5 pb-2">{t("mobileDeck")}</span>
              
              <button 
                onClick={() => scrollToSection(aboutRef)}
                className="text-2xl text-zinc-400 hover:text-white uppercase tracking-wider text-left flex items-baseline gap-3"
              >
                <span className="text-xs font-mono text-zinc-600 font-bold">01/</span> {t("navAbout")}
              </button>
              <button 
                onClick={() => scrollToSection(experiencesRef)}
                className="text-2xl text-zinc-400 hover:text-white uppercase tracking-wider text-left flex items-baseline gap-3"
              >
                <span className="text-xs font-mono text-zinc-600 font-bold">02/</span> {t("navExperiences")}
              </button>
              <button 
                onClick={() => scrollToSection(bookingRef)}
                className="text-2xl text-zinc-400 hover:text-white uppercase tracking-wider text-left flex items-baseline gap-3"
              >
                <span className="text-xs font-mono text-zinc-600 font-bold">03/</span> {t("navBooking")}
              </button>

              <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                {/* Mobile Language Selector */}
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 bg-zinc-950 border border-white/5 text-[10px] font-mono tracking-widest font-bold w-fit rounded self-start">
                  {(["EN", "LT", "RU"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1 rounded transition-colors cursor-pointer text-xs font-bold font-mono ${
                        language === lang ? "text-[#60A5FA] bg-blue-500/10" : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => scrollToSection(bookingRef)}
                  className="w-full py-3.5 bg-white text-black font-semibold uppercase text-xs tracking-widest rounded text-center"
                >
                  {t("btnScheduleEvent")}
                </button>
                <div className="flex gap-4 items-center justify-start text-zinc-500 font-mono text-xs">
                  <a href="https://instagram.com/gleb_tsarev" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
                  <a href="https://www.tiktok.com/@gleb.magic" target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 overflow-hidden">
        {/* Subtle Ambient Top Accent Glow */}
        <div className="absolute top-20 w-full h-[400px] radial-glow opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center z-10 flex flex-col items-center">
          
          {/* Artist Large Display Heading */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="font-display text-6xl md:text-8xl lg:text-[11rem] font-extrabold tracking-[10px] md:tracking-[24px] uppercase text-white leading-none mb-4 select-none relative"
          >
            GLEB TS
          </motion.h1>

          {/* Explanatory subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="font-mono text-sm md:text-lg text-glow text-blue-400 uppercase tracking-[4px] md:tracking-[10px]">
              {t("worldChampion")}
            </p>
            <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto font-display uppercase tracking-wider font-semibold">
              {t("heroSubtitle")}
            </p>
          </motion.div>

          {/* CTA Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12"
          >
            <button
              id="hero-book-btn"
              onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-white hover:bg-neutral-200 text-black font-semibold tracking-[4px] uppercase text-xs rounded shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span>{t("btnBookAnEvent")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 cursor-pointer text-zinc-500 hover:text-white transition-colors flex flex-col items-center gap-1"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-650">{t("discover")}</span>
          <ChevronDown className="w-4 h-4 text-blue-400" />
        </motion.div>
      </section>

      {/* SECTION 2 — ABOUT */}
      <section 
        ref={aboutRef}
        className="relative py-24 md:py-36 border-t border-white/5 overflow-hidden bg-black/30"
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* About Text details block */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider mb-2 font-bold">
                {t("aboutTitle")}
              </h2>
            </div>

            <div className="space-y-6 text-zinc-300 font-sans font-light leading-relaxed text-base md:text-lg">
              <p>
                <strong className="text-white font-semibold">GLEB TS</strong> {t("aboutP1").startsWith("GLEB TS") ? t("aboutP1").substring(7).trim() : t("aboutP1")}
              </p>
              <p>
                {t("aboutP2")}
              </p>
              <p>
                {t("aboutP3")}
              </p>
            </div>

            {/* Structured Accolade list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              
              <div className="py-5 px-6 bg-zinc-950/40 rounded border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                <span className="font-display text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-white block tracking-wide leading-tight mb-2 font-bold select-none">
                  {t("metricWorldChampion")}
                </span>
                <span className="font-mono text-[14px] tracking-widest text-[#60A5FA] uppercase font-bold block mt-1">
                  {t("metricFism")}
                </span>
              </div>

              <div className="py-5 px-6 bg-zinc-950/40 rounded border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                <span className="font-display text-3xl md:text-4xl text-[#60A5FA] block tracking-wider leading-none mb-1 text-glow font-bold">
                  {t("metricExperienceTime")}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-zinc-300 uppercase font-bold mt-2 block">
                  {t("metricExperienceDesc")}
                </span>
              </div>

              <div className="py-5 px-6 bg-zinc-950/40 rounded border border-white/5 hover:border-blue-500/20 transition-all duration-300">
                <span className="font-display text-3xl md:text-4xl text-white block tracking-wider leading-none mb-1 font-bold">
                  {t("metricAudienceTime")}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-zinc-300 uppercase font-bold mt-2 block">
                  {t("metricAudienceDesc")}
                </span>
              </div>

            </div>
          </div>

          {/* About graphic Portrait Block */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <DisintegratingPortrait src={glebPortrait} />
          </div>

        </div>
      </section>

      {/* SECTION 3 — TAILORED EXPERIENCES */}
      <section 
        ref={experiencesRef}
        className="relative py-24 md:py-36 border-t border-white/5"
      >
        {/* Decorative Grid Line Ambient */}
        <div className="absolute right-0 top-1/4 w-96 h-96 radial-glow opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center md:text-left mb-16 space-y-4">
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-wider font-bold">
              {t("expTitle")}
            </h2>
            <p className="text-zinc-400 text-sm md:text-lg max-w-xl font-sans">
              {t("expSubtitle")}
            </p>
          </div>

          {/* Beautiful Custom Grid of Interactive CD-Jewel-Case Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-12">
            {EXPERIENCE_DATA.map((exp, index) => (
              <CDCard 
                key={exp.id} 
                exp={exp} 
                index={index} 
                onSelect={handleSelectBookingPreset} 
              />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4 — BOOKING */}
      <section 
        ref={bookingRef}
        className="relative py-24 md:py-36 border-t border-white/5 px-6"
      >
        {/* Glow behind booking */}
        <div className="absolute left-1/3 bottom-1/4 w-[500px] h-[500px] radial-glow opacity-40 pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto">
          
          <div className="border-b border-white/5 pb-8 mb-16 text-center">
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-widest font-extrabold select-none">
              {t("bookingTitle")}
            </h2>
          </div>

          {/* Fully Managed contact component */}
          <BookingForm selectedEventType={selectedPresetType} />

        </div>
      </section>

      {/* SOCIAL FOOTER */}
      <footer className="border-t border-white/5 bg-zinc-950/80 py-16 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Logo brand and mantra */}
          <div className="md:col-span-4 flex flex-col space-y-3 items-center md:items-start text-center md:text-left">
            <span className="font-display font-black tracking-[6px] text-zinc-300 text-sm">GLEB TS</span>
            <span className="text-zinc-650 text-xs tracking-widest uppercase pb-2">{t("footerMantra")}</span>
          </div>

          {/* Center concept tagline */}
          <div className="md:col-span-4 flex justify-center text-center">
            <p className="text-[10px] font-mono tracking-wider text-zinc-500 select-none italic text-center">
              "{t("footerQuote")}"
            </p>
          </div>

          {/* Social media connections */}
          <div className="md:col-span-4 flex flex-col md:items-end items-center space-y-3">
            <div className="flex gap-6 items-center text-xs tracking-wider font-mono">
              <a 
                href="https://instagram.com/gleb_tsarev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:underline hover:underline-offset-4 text-zinc-400 transition-all flex items-center gap-1.5"
              >
                <Instagram className="w-4 h-4 text-zinc-500" />
                <span>@gleb_tsarev</span>
              </a>
              <a 
                href="https://www.tiktok.com/@gleb.magic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 hover:underline hover:underline-offset-4 text-zinc-400 transition-all flex items-center gap-1.5 font-mono"
              >
                <svg className="w-4 h-4 text-zinc-500 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.83.97 1.96 1.66 3.2 2.01.02 1.34.01 2.68.01 4.02-.91-.07-1.81-.35-2.61-.83-.87-.52-1.57-1.27-2.07-2.16-.03 2.1-.01 4.2-.02 6.3 0 1.25-.26 2.52-.87 3.61-.71 1.25-1.92 2.22-3.32 2.58-1.58.42-3.31.25-4.78-.49-1.51-.76-2.67-2.18-3.15-3.82-.54-1.78-.29-3.79.67-5.38.9-1.48 2.45-2.52 4.19-2.78.01 1.43 0 2.87.01 4.3-.87.11-1.74.56-2.24 1.3-.59.84-.66 2.01-.19 2.92.48.97 1.53 1.62 2.62 1.59 1.1-.01 2.11-.75 2.45-1.8.12-.41.15-.84.14-1.27-.01-4.05-.01-8.11-.01-12.16z" />
                </svg>
                <span>@gleb.magic</span>
              </a>
            </div>
            
            <div className="text-[10px] text-zinc-550 uppercase tracking-widest leading-none mt-2 font-mono">
              © {new Date().getFullYear()} Gleb Ts. {t("footerRights")}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
