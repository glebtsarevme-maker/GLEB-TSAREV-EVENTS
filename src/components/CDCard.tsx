import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, RotateCw, Play, Check } from "lucide-react";
import { Experience } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface CDCardProps {
  key?: string;
  exp: Experience;
  index: number;
  onSelect: (title: string) => void;
}

export default function CDCard({ exp, index, onSelect }: CDCardProps) {
  const { language, t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Custom content block for the back side of each case
  const getBacksideContent = (id: string, lang: string) => {
    if (id === "private") {
      if (lang === "RU") return {
        title: "ЧАСТНЫЕ МЕРОПРИЯТИЯ",
        text1: "Современная интерактивная магия, происходящая прямо среди ваших гостей.",
        text2: "Каждое выступление адаптируется под атмосферу, аудиторию и формат вашего мероприятия.",
        guests: "10–60 гостей"
      };
      if (lang === "LT") return {
        title: "PRIVATŪS RENGINIAI",
        text1: "Šiuolaikinė interaktyvi magija, atliekama tiesiogiai tarp jūsų svečių.",
        text2: "Kiekvienas pasirodymas pritaikomas prie jūsų renginio atmosferos, auditorijos ir formato.",
        guests: "10–60 svečių"
      };
      return {
        title: "PRIVATE EVENTS",
        text1: "Modern interactive magic performed directly among your guests.",
        text2: "Every performance is adapted to the atmosphere, audience and format of your event.",
        guests: "10–60 guests"
      };
    } else if (id === "corporate") {
      if (lang === "RU") return {
        title: "КОРПОРАТИВНЫЕ МЕРОПРИЯТИЯ",
        text1: "Современные иллюзионные программы для конференций, гала-вечеров, приёмов и брендовых мероприятий.",
        text2: "Современная магия, органично встроенная в ход мероприятия.",
        guests: "50–1200+ гостей"
      };
      if (lang === "LT") return {
        title: "KORPORATYVINIAI RENGINIAI",
        text1: "Šiuolaikinės iliuzijų programos konferencijoms, gala vakarams, priėmimams ir prekių ženklų renginiams.",
        text2: "Šiuolaikinė magija natūraliai integruojama į renginio eigą.",
        guests: "50–1200+ svečių"
      };
      return {
        title: "CORPORATE EVENTS",
        text1: "Modern illusion experiences for conferences, gala dinners, receptions and brand events.",
        text2: "Modern illusion integrated naturally into the flow of the event.",
        guests: "50–1200+ guests"
      };
    } else {
      // Theatre & Festivals
      if (lang === "RU") return {
        title: "ТЕАТРЫ И ФЕСТИВАЛИ",
        text1: "Оригинальные сценические выступления, объединяющие иллюзию, сторителлинг и визуальное искусство.",
        text2: "Создано для театров, фестивалей и специальных художественных проектов.",
        guests: "100–2500+ зрителей"
      };
      if (lang === "LT") return {
        title: "TEATRAS IR FESTIVALIAI",
        text1: "Originalūs scenos pasirodymai, apjungiantys iliuziją, istorijų pasakojimą ir vizualųjį meną.",
        text2: "Sukurta teatrams, festivaliams ir specialiems meno projektams.",
        guests: "100–2500+ žiūrovų"
      };
      return {
        title: "THEATRE & FESTIVALS",
        text1: "Original stage performances combining illusion, storytelling and visual art.",
        text2: "Created for theatres, festivals and special artistic projects.",
        guests: "100–2500+ spectators"
      };
    }
  };

  // Luxury-tech high-gloss reflective CD metallic starburst conic-gradient
  const getCdConicGradient = (id: string) => {
    if (id === "private") {
      return "conic-gradient(from 180deg, #0f0203 0deg, #450a0a 35deg, #1c1917 65deg, #18181b 105deg, #7f1d1d 145deg, #090505 185deg, #991b1b 235deg, #09090b 285deg, #5c060a 325deg, #0f0203 360deg)";
    } else if (id === "corporate") {
      return "conic-gradient(from 180deg, #020617 0deg, #172554 35deg, #1c1917 65deg, #18181b 105deg, #1e3a8a 145deg, #020617 185deg, #1d4ed8 235deg, #09090b 285deg, #111827 325deg, #020617 360deg)";
    }
    // Theatre & Festivals
    return "conic-gradient(from 180deg, #0c0214 0deg, #3b0764 35deg, #16121a 65deg, #18181b 105deg, #581c87 145deg, #05010a 185deg, #7e22ce 235deg, #09090b 285deg, #120b1c 325deg, #0c0214 360deg)";
  };

  const getReleaseLabel = () => {
    if (language === "RU") return "ИЗДАНО В ЕВРОПЕ";
    if (language === "LT") return "LEIDĖJAS EUROPOS SĄJUNGA";
    return "PRODUCED IN EUROPE";
  };

  const getFlippingCue = () => {
    if (language === "RU") return "КЛИКНИТЕ ЧТОБЫ ПЕРЕВЕРНУТЬ";
    if (language === "LT") return "PASPAUSKITE, KAD APVERSTUMĖTE";
    return "CLICK TO FLIP CASE";
  };

  const backside = getBacksideContent(exp.id, language);

  return (
    <div 
      className="relative flex flex-col items-center justify-center py-4"
      id={`experience-cd-${exp.id}`}
    >
      {/* Outer 3D Card Containment Grid */}
      <div 
        className="w-full max-w-[340px] xs:max-w-[360px] aspect-square relative"
        style={{ perspective: "1500px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          // Auto flip back if they exit? Keeps interface neat or let them toggle. Let's keep toggle on click, hover is laser glow + CD slide out.
        }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full h-full relative"
        >
          {/* ==================== FRONT SIDE (JEWEL CASE) ==================== */}
          <div 
            style={{ backfaceVisibility: "hidden" }}
            className={`absolute inset-0 w-full h-full rounded-2xl bg-[#090a0f]/80 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden flex flex-col justify-between p-[18px] select-none cursor-pointer transition-all duration-500 ${
              isHovered ? "shadow-[0_0_40px_rgba(59,130,246,0.3)] border-blue-500/25" : ""
            }`}
            onClick={(e) => {
              // Direct target flip check
              setIsFlipped(true);
            }}
          >
            {/* Glossy sheen plastic reflections on the cover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.02] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60 pointer-events-none" />
            <div className="absolute -left-32 top-0 w-96 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rotate-[32deg] transform select-none pointer-events-none" />

            {/* Authentic Acrylic Hinge spine (Tray left edge border) */}
            <div className="absolute left-0 inset-y-0 w-[24px] bg-gradient-to-r from-[#121319] to-[#040407] border-r border-white/5 flex flex-col items-center justify-between py-6">
              {/* Molded plastic circles/ribs */}
              <div className="w-1.5 h-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner" />
              <div className="w-[1px] h-32 bg-white/5 flex flex-col space-y-1 py-1">
                <div className="w-full h-[3px] bg-white/15" />
                <div className="w-full h-[3px] bg-white/15" />
                <div className="w-full h-[3px] bg-white/15" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/5 border border-white/10 shadow-inner" />
            </div>

            {/* Inner jewel tray area inside the frame offsets */}
            <div className="pl-[16px] h-full w-full flex flex-col justify-between relative">
              
              {/* Front Cover Header Row */}
              <div className="flex justify-between items-start">
                {/* Vintage Compact Disc Digital Audio mock logo block */}
                <div className="border border-white/25 rounded px-1.5 py-0.5 opacity-40 flex flex-col items-center leading-none">
                  <span className="font-sans text-[6px] tracking-widest font-black text-white">COMPACT</span>
                  <span className="font-display text-[8px] font-black italic tracking-tight text-white leading-none">disc</span>
                  <span className="font-sans text-[4px] tracking-wide text-white">DIGITAL AUDIO</span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[9px] tracking-[4px] text-zinc-550 block font-bold leading-none">
                    FORMAT_0{index + 1}
                  </span>
                  <span className="font-mono text-[8px] text-blue-400 font-bold tracking-widest block mt-1">
                    EDITION: 2026/27
                  </span>
                </div>
              </div>

              {/* CENTER: THE GRAPHIC METALLIC CD DISC */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-2 pointer-events-none scale-[1.05]">
                {/* 1. Behind-Disc Radial Glow */}
                <div className="absolute inset-0 bg-[#3b82f6]/5 blur-2xl rounded-full group-hover:bg-[#3b82f6]/10 transition-colors" />

                {/* 2. The sliding and rotating CD element itself */}
                <motion.div
                  animate={{ 
                    x: isHovered ? 25 : 0,
                    rotate: isHovered ? 120 : 0
                  }}
                  transition={{ 
                    x: { type: "spring", stiffness: 100, damping: 15 },
                    rotate: { duration: 16, ease: "linear", repeat: isHovered ? Infinity : 0 }
                  }}
                  style={{ backgroundImage: getCdConicGradient(exp.id) }}
                  className="w-44 h-44 rounded-full border border-white/10 p-[1px] absolute shadow-[0_12px_28px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden"
                >
                  {/* Glossy Metallic Silver Overlay to mimic premium polished CD finish */}
                  <div className="absolute inset-0 bg-black/35 mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 bg-white/[0.05] mix-blend-overlay pointer-events-none" />

                  {/* Dynamic iridescent holographic diffraction sheens/bursts that rotate with the CD */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(255,255,255,0.08)_70%)] mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/8 via-purple-500/10 to-yellow-300/5 mix-blend-color-dodge opacity-50 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/8 via-pink-500/8 to-transparent mix-blend-screen opacity-40 pointer-events-none" />
                  
                  {/* Specular premium light reflection beam lines (Luxury CD look) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-[-45deg] scale-150 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-[45deg] scale-150 mix-blend-overlay pointer-events-none" />

                  {/* Concentric CD Sector division lines (Highly subtle, mirror metallic bands, NO vinyl grooves) */}
                  <div className="absolute inset-[3px] rounded-full border border-white/10" />
                  <div className="absolute inset-[24px] rounded-full border border-white/5 opacity-55" />
                  <div className="absolute inset-[40px] rounded-full border border-white/10" />
                  <div className="absolute inset-[54px] rounded-full border border-white/5 opacity-40" />

                  {/* Custom futuristic media labels / printed ring lines */}
                  <div className="absolute inset-8 rounded-full flex items-center justify-center border border-white/5">
                    <span className="font-mono text-[6.5px] text-white/35 tracking-[3px] font-bold uppercase rotate-[-30deg] select-none">
                      GLEB TS {exp.id.toUpperCase()} MEDIA
                    </span>
                  </div>

                  {/* Center Hub Spindle Hole (Transparent Jewel Tray mechanism) */}
                  <div className="w-14 h-14 rounded-full bg-[#05060b] border border-zinc-800/80 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)] flex items-center justify-center z-10">
                    <div className="w-9 h-9 rounded-full border border-zinc-700/40 bg-zinc-950/90 flex items-center justify-center relative">
                      {/* CD teeth pins */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <div
                          key={angle}
                          className="absolute w-1.5 h-1 bg-zinc-850 border-t border-white/10"
                          style={{
                            transform: `rotate(${angle}deg) translate(9px)`,
                          }}
                        />
                      ))}
                      {/* True center hole */}
                      <div className="w-4 h-4 rounded-full bg-black shadow-inner border border-zinc-900" />
                    </div>
                  </div>
                </motion.div>

                {/* 3. Jewel tray sleeve outline sitting directly on the front plastic */}
                <div className="absolute inset-0 rounded-full border border-white/5 opacity-50 pointer-events-none" />
              </div>

              {/* Title & Core metadata footer inside front cover */}
              <div className="mt-4 space-y-2 select-none">
                <h3 className="font-display text-xl sm:text-2xl mt-1 text-white tracking-wider font-extrabold uppercase leading-tight group-hover:text-blue-400 transition-colors">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-[#60A5FA]">
                  <Play className="w-2.5 h-2.5 fill-[#60A5FA]" />
                  <span>{exp.suitability}</span>
                </div>
              </div>

              {/* Bottom bar inside tray */}
              <div className="flex justify-between items-end mt-4 pt-2 border-t border-white/5">
                <span className="text-[8px] font-mono tracking-widest text-zinc-500 font-bold select-none uppercase">
                  ACTIVE WAVE_FORM //
                </span>
                
                {/* Tiny Flip Button icon cue */}
                <div className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                  <span className="text-[7px] font-mono tracking-widest font-bold">INFO</span>
                  <RotateCw className="w-3 h-3 text-blue-400 animate-pulse" />
                </div>
              </div>

            </div>
          </div>

          {/* ==================== BACK SIDE (INLAY COVER / DETAILS) ==================== */}
          <div 
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            className="absolute inset-0 w-full h-full rounded-2xl bg-[#0a0c14] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between p-6 select-none cursor-pointer hover:border-blue-500/20"
            onClick={() => setIsFlipped(false)}
          >
            {/* Subtle vintage matte paper background overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-950/20 via-black to-black opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-white/[0.01] pointer-events-none mix-blend-overlay" />

            {/* Back hinge shadow */}
            <div className="absolute left-0 inset-y-0 w-1 shadow-inner bg-black/50 pointer-events-none" />

            {/* Back Inlay Content Container */}
            <div className="h-full flex flex-col justify-between relative z-10">
              
              {/* Back header metadata */}
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[3px] text-zinc-400 font-bold">GLEB TS RELEASES</span>
                </div>
                <span className="font-mono text-[9px] text-[#60A5FA] font-bold bg-[#60A5FA]/10 px-2 py-0.5 rounded border border-[#60A5FA]/20">
                  CD_0{index + 1}
                </span>
              </div>

              {/* TRACKLIST (Show Segment Master List) */}
              <div className="my-4 space-y-3.5 text-left flex-1 flex flex-col justify-center">
                <div className="space-y-1">
                  <span className="font-mono text-[8px] text-zinc-550 uppercase tracking-widest font-extrabold block">RELEASE DETAILS // ILLUSION SERIES</span>
                  <h4 className="font-display text-lg font-extrabold tracking-wide text-white uppercase leading-none">{backside.title}</h4>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 font-mono text-[11px] leading-relaxed text-zinc-350 font-medium group/track hover:text-white transition-colors">
                    <span className="text-blue-400 font-bold saturate-150">[x]</span>
                    <span className="tracking-wide break-words max-w-[240px]">{backside.text1}</span>
                  </div>
                  <div className="flex items-start gap-2.5 font-mono text-[11px] leading-relaxed text-zinc-350 font-medium group/track hover:text-white transition-colors">
                    <span className="text-blue-400 font-bold saturate-150">[x]</span>
                    <span className="tracking-wide break-words max-w-[240px]">{backside.text2}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-400">
                  <span className="font-bold whitespace-nowrap">{language === "RU" ? "АУДИТОРИЯ" : language === "LT" ? "AUDITORIJA" : "CAPACITY"}</span>
                  <span className="text-[9.5px] tracking-wider text-blue-400 font-bold uppercase">{backside.guests}</span>
                </div>
              </div>

              {/* Foot-row with custom adhesive white barcode sticker & legal copyright info */}
              <div className="flex items-end justify-between border-t border-white/5 pt-4 bg-zinc-950/40 p-2 rounded-lg border border-white/5">
                
                {/* Legal notes */}
                <div className="text-left max-w-[190px] space-y-1 select-none pr-1">
                  <span className="font-mono text-[7px] block tracking-normal text-zinc-500 leading-tight font-medium">
                    © 2026 GLEB TS MAGIC EXPERIENCES. ALL RIGHTS RESERVED. {getReleaseLabel()}.
                  </span>
                  <span className="font-mono text-[7px] text-[#60A5FA] block tracking-widest font-extrabold leading-none uppercase pt-0.5">
                    BILETAI // SUTARTIS // CONCERT
                  </span>
                </div>

                {/* Classic Barcode sticker block (Matches authentic anthony rother CD reference precisely) */}
                <div className="bg-white px-2 py-1 rounded shadow-md flex flex-col items-center select-none shrink-0 border border-zinc-200">
                  <div className="flex gap-[1px] h-6 items-stretch justify-center opacity-90">
                    <div className="w-[1px] bg-black" />
                    <div className="w-[2px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[3px] bg-black" />
                    <div className="w-[1px] bg-transparent" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[2px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[1px] bg-transparent" />
                    <div className="w-[3px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[2px] bg-black" />
                    <div className="w-[1px] bg-transparent" />
                    <div className="w-[2px] bg-black" />
                    <div className="w-[1px] bg-black" />
                    <div className="w-[1px] bg-transparent" />
                    <div className="w-[3px] bg-black" />
                    <div className="w-[1px] bg-black" />
                  </div>
                  <span className="font-sans text-[5.5px] scale-90 font-bold text-black tracking-[1.5px] leading-none mt-0.5 select-none">
                    40178661249{index + 1}
                  </span>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Book this experience selection trigger pill (Sitting directly underneath for clear user UX navigation) */}
      <div className="mt-4 flex flex-col items-center gap-1.5 w-full max-w-[340px] xs:max-w-[360px] px-2 text-center text-zinc-500">
        <div className="flex items-center gap-4 justify-between w-full">
          {/* Flip info button */}
          <button 
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/60 border border-white/5 hover:border-blue-500/30 hover:bg-zinc-950 rounded text-[9px] font-mono tracking-widest font-extrabold uppercase text-zinc-400 transition-all cursor-pointer shadow-sm select-none"
          >
            <RotateCw className="w-2.5 h-2.5 text-blue-400" />
            <span>{isFlipped ? (language === "RU" ? "ЛИЦО" : language === "LT" ? "PRIEKYJE" : "COVER") : (language === "RU" ? "ДЕТАЛИ" : language === "LT" ? "DETALĖS" : "DETAILS")}</span>
          </button>

          {/* Core booking CTA */}
          <button
            onClick={() => onSelect(exp.title)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black hover:bg-blue-400 hover:text-white rounded text-[10px] font-mono tracking-widest font-extrabold uppercase transition-all duration-300 shadow-md cursor-pointer select-none"
          >
            <span>{language === "RU" ? "ВЫБРАТЬ" : language === "LT" ? "PASIRINKTI" : "SELECT"}</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>
        
        {/* Helper guide sentence */}
        <span className="text-[10px] font-mono text-zinc-500/80 uppercase tracking-widest mt-1">
          {getFlippingCue()}
        </span>
      </div>
    </div>
  );
}
