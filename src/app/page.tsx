"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import LazyImage from "./components/LazyImage";
import { useLanguage } from "./components/LanguageProvider";
import Navbar from "./components/Navbar";

// --- Data ---
// Removed RajputanaMap import as per new hero design requirements

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"] });

const StopIcon = ({ className }: { className?: string }) => (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
 </svg>
);

const VolumeIcon = ({ className }: { className?: string }) => (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
 </svg>
);

// --- Data ---
const TIMELINE_DATA = [

 {
 era: "Proto–Rajput & Early Foundations",
 entries: [
 { date: "c. 1500–1300 BCE", text: "Rigvedic Kshatriya clans establish hereditary warrior leadership and ritual kingship" },
 { date: "c. 1300–1000 BCE", text: "Tribal janapadas evolve into stable martial territories" },
 { date: "800–600 BCE", text: "Kshatriya republics and monarchies dominate political landscape" },
 { date: "600–400 BCE", text: "Mahajanapada states formalize standing armies and territorial rule" },
 { date: "322–185 BCE", text: "Mauryan Empire absorbs local warrior chiefs into imperial military hierarchy" },
 { date: "200–320 CE", text: "Post-Mauryan fragmentation restores autonomy to regional warrior houses" },
 { date: "c. 500 CE", text: "Collapse of Gupta authority creates permanent power vacuum favoring warrior clans" },
 ],
 },

 {
 era: "Formation of Rajput Identity",
 entries: [
 { date: "500–530 CE", text: "Local warrior chieftains consolidate hill forts and agrarian bases" },
 { date: "530–570 CE", text: "Guhila lineage establishes dominance in Mewar" },
 { date: "570–620 CE", text: "Term Rajputra becomes identifier of ruling martial elite" },
 { date: "620–650 CE", text: "Clan purity, ancestry records, and kul-devi worship formalized" },
 { date: "650–680 CE", text: "Agnivanshi, Suryavanshi, and Chandravanshi genealogies codified" },
 { date: "680–720 CE", text: "Rajput code of honor, fort-defense, and refusal of submission crystallizes" },
 { date: "720 CE", text: "Rajput identity emerges as political–military class, not ethnicity" },
 ],
 },

 {
 era: "Imperial Rajput Supremacy",
 entries: [
 { date: "730 CE", text: "Gurjara–Pratihara power rises in western India" },
 { date: "738 CE", text: "Nagabhata I decisively halts Arab expansion" },
 { date: "750–780 CE", text: "Rajput cavalry warfare dominates North Indian battlefields" },
 { date: "800–830 CE", text: "Kannauj becomes imperial Rajput power center" },
 { date: "836 CE", text: "Mihira Bhoja I ascends throne" },
 { date: "850–885 CE", text: "Pratihara empire controls northern trade and defense" },
 ],
 },

 {
 era: "Rise of Regional Rajput Kingdoms",
 entries: [
 { date: "900–950 CE", text: "Parmar dynasty consolidates Malwa" },
 { date: "950–1000 CE", text: "Solanki power stabilizes Gujarat" },
 { date: "1000–1050 CE", text: "Guhila–Sisodia authority entrenched in Mewar" },
 { date: "1050–1100 CE", text: "Chauhans expand Ajmer–Delhi region" },
 { date: "1100–1150 CE", text: "Marwar Rathores secure western desert frontiers" },
 { date: "1150–1200 CE", text: "Jaisalmer Bhatis dominate trans-desert trade routes" },
 ],
 },

 {
 era: "Invasion & Resistance Era",
 entries: [
 { date: "1001–1027 CE", text: "Mahmud of Ghazni conducts repeated raids" },
 { date: "1050–1100 CE", text: "Fort-defense strategies refined across Rajputana" },
 { date: "1080–1143 CE", text: "Raja Bhoj of Malwa exemplifies warrior–scholar kingship" },
 { date: "1177 CE", text: "Prithviraj Chauhan crowned at Ajmer" },
 { date: "1191 CE", text: "First Battle of Tarain halts Ghurid advance" },
 { date: "1192 CE", text: "Second Battle of Tarain shifts power balance" },
 ],
 },

 {
 era: "Delhi Sultanate Pressure",
 entries: [
 { date: "1206 CE", text: "Delhi Sultanate founded" },
 { date: "1220–1250 CE", text: "Rajput forts withstand repeated sieges" },
 { date: "1303 CE", text: "Siege of Chittorgarh; jauhar institutionalized" },
 { date: "1311 CE", text: "Fall of Jalore after prolonged defense" },
 { date: "1326 CE", text: "Ranthambore subdued after heavy losses" },
 { date: "1350 CE", text: "Rajput survival shifts to strategic endurance" },
 ],
 },

 {
 era: "Sisodia Ascendancy (Mewar as Rajput Standard)",
 entries: [
 { date: "1433 CE", text: "Rana Kumbha ascends throne of Mewar" },
 { date: "1440–1468 CE", text: "Construction of Kumbhalgarh and frontier fort system" },
 { date: "1450–1470 CE", text: "Victories over Malwa and Gujarat Sultanates" },
 { date: "1473 CE", text: "Battle of Sarangpur secures dominance" },
 { date: "1508 CE", text: "Rana Sanga defeats Sultanate coalition" },
 { date: "1527 CE", text: "Battle of Khanwa against Babur" },
 { date: "1530 CE", text: "Sisodia refusal to submit defines Rajput resistance" },
 ],
 },

 {
 era: "Mughal–Rajput Confrontation & Defiance",
 entries: [
 { date: "1567–1568 CE", text: "Akbar’s siege of Chittorgarh; mass jauhar" },
 { date: "1576 CE", text: "Battle of Haldighati; Maharana Pratap resists imperial forces" },
 { date: "1577 CE", text: "Siege of Kumbhalgarh fails to break Mewar" },
 { date: "1582 CE", text: "Battle of Dewair restores territories" },
 { date: "1597 CE", text: "Death of Maharana Pratap; resistance legacy secured" },
 ],
 },

 {
 era: "Rajput Kingdoms under Mughal Shadow",
 entries: [
 { date: "1540–1562 CE", text: "Amer practices strategic diplomacy" },
 { date: "1600–1650 CE", text: "Marwar balances resistance and survival" },
 { date: "1638 CE", text: "Jodhpur restored to Rathores" },
 ],
 },

 {
 era: "Late Rajput Resistance & Survival",
 entries: [
 { date: "1615 CE", text: "Mewar treaty preserves Sisodia honor" },
 { date: "1679 CE", text: "Annexation of Marwar sparks rebellion" },
 { date: "1679–1707 CE", text: "Rathore war exhausts Mughal resources" },
 { date: "1707 CE", text: "Death of Aurangzeb triggers Rajput resurgence" },
 { date: "1720–1750 CE", text: "Rajput states reassert autonomy" },
 ],
 },

 {
 era: "Colonial & Modern Transition",
 entries: [
 { date: "1822 CE", text: "Rajputana Agency formalized" },
 { date: "1857 CE", text: "Rajput states navigate rebellion era" },
 { date: "1947 CE", text: "End of princely sovereignty" },
 { date: "1948–1949 CE", text: "Integration into Indian Union" },
 { date: "1956 CE", text: "Formation of Rajasthan" },
 ],
 },
];

const CLAN_DATA = [
 {
 id: "pratihara",
 name: "Pratihara (Gurjara-Pratihara)",
 motif: "Elephant & Guard",
 description: "Guardians of the gate. The elephant silhouette symbolizes imperial strength and protection.",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <path d="M70,30 C70,19 61,10 50,10 C39,10 30,19 30,30 C30,35 32,40 35,43 C34,45 33,48 33,51 C33,59 40,66 48,66 C49,66 50,66 51,66 C52,74 55,82 59,89 C61,93 65,94 67,91 C69,89 68,85 66,82 C63,75 61,69 60,62 C65,60 69,55 69,49 C69,46 68,43 67,41 C70,38 72,34 72,29 Z" />
 </svg>
 )
 },
 {
 id: "parmar",
 name: "Parmar",
 motif: "Fire / Flame (Agnikula)",
 description: "Born from the sacred fire pit. The flame represents purification and the Agnikula lineage.",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <path d="M50,10 Q30,40 30,60 Q30,85 50,85 Q70,85 70,60 Q70,40 50,10 Z M50,25 Q60,45 60,60 Q60,75 50,75 Q40,75 40,60 Q40,45 50,25 Z" />
 </svg>
 )
 },
 {
 id: "chauhan",
 name: "Chauhan",
 motif: "Bow & Arrow",
 description: "Associated with martial prowess and the Agnivanshi tradition. The bow symbolizes focus and defense.",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <path d="M30,20 Q80,50 30,80 M25,50 L85,50 M75,40 L85,50 L75,60" stroke="currentColor" strokeWidth="3" fill="none" />
 </svg>
 )
 },
 {
 id: "solanki",
 name: "Solanki (Chaulukya)",
 motif: "Sun & Geometric",
 description: "Rulers of Gujarat, devoted to solar worship. The sun disc represents divine authority.",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <circle cx="50" cy="50" r="15" />
 <path d="M50,10 L50,25 M50,75 L50,90 M10,50 L25,50 M75,50 L90,50 M22,22 L32,32 M68,68 L78,78 M22,78 L32,68 M68,32 L78,22" stroke="currentColor" strokeWidth="3" />
 </svg>
 )
 }
];

type Warrior = { name: string; region?: string; image: string };
const MALE_WARRIORS: Warrior[] = [
 { name: "Maharana Pratap", region: "Mewar", image: "/images/dynasties/maharana-pratap.jpg" },
 { name: "Rana Kumbha", region: "Mewar", image: "/images/dynasties/rana-kumbha.jpg" },
 { name: "Prithviraj Chauhan", region: "Ajmer–Delhi", image: "/images/dynasties/prithviraj-chauhan.jpg" },
 { name: "Rao Maldeo Rathore", region: "Marwar", image: "/images/dynasties/rao-maldeo.jpg" },
 { name: "Rana Sanga", region: "Mewar", image: "/images/dynasties/rana-sanga.jpg" },
 { name: "Bappa Rawal", region: "Guhila", image: "/images/dynasties/bappa-rawal.jpg" },
 { name: "Hammir Dev Chauhan", region: "Ranthanbore", image: "/images/dynasties/hammir-dev.jpg" },
 { name: "Maharaja Suraj Mal", region: "Bharatpur", image: "/images/dynasties/maharaja-surajmal.jpg" },
 { name: "Rao Jodha", region: "Marwar", image: "/images/dynasties/rao-jodha.jpg" },
 { name: "Rana Raj Singh", region: "Mewar", image: "/images/dynasties/rana-raj-singh.jpg" },
 { name: "Mirza Raja Man Singh", region: "Amer", image: "/images/dynasties/man-singh.jpg" },
 { name: "Maharaja Jaswant Singh", region: "Marwar", image: "/images/dynasties/jaswant-singh.jpg" },
 { name: "Sawai Jai Singh", region: "Jaipur", image: "/images/dynasties/sawai-jai-singh.jpg" },
];

const FEMALE_WARRIORS: Warrior[] = [
 { name: "Rani Padmini", region: "Mewar", image: "/images/dynasties/rani-padmini.jpg" },
 { name: "Rani Karnavati", region: "Mewar", image: "/images/dynasties/rani-karnavati.jpg" },
 { name: "Rani Durgavati", region: "Gondwana", image: "/images/dynasties/rani-durgavati.jpg" },
 { name: "Hadi Rani", region: "Rajasthan", image: "/images/dynasties/hadi-rani.jpg" },
 { name: "Rani Avantibai Lodhi", region: "Ramgarh", image: "/images/dynasties/rani-avantibai.jpg" },
 { name: "Rani Tarabai", region: "Maratha", image: "/images/dynasties/rani-tarabai.jpg" },
 { name: "Rani Ahilyabai Holkar", region: "Malwa", image: "/images/dynasties/ahilyabai-holkar.jpg" },
 { name: "Rani Kamlapati", region: "Gond", image: "/images/dynasties/rani-kamlapati.jpg" },
 { name: "Rani Lakshmibai", region: "Jhansi", image: "/images/dynasties/rani-lakshmibai.jpg" }
];

function Carousel({ items, slower = false }: { items: Warrior[]; slower?: boolean }) {
 // Create 3 sets of items for seamless looping
 const extendedItems = React.useMemo(() => [...items, ...items, ...items], [items]);
 
 // Start in the middle set
 const [current, setCurrent] = useState(items.length);
 const [isTransitioning, setIsTransitioning] = useState(true);
 const trackRef = useRef<HTMLDivElement | null>(null);
 const [slideW, setSlideW] = useState(224);

 useEffect(() => {
 const el = trackRef.current;
 if (!el) return;
 const first = el.querySelector<HTMLElement>('[data-slide]');
 if (first) setSlideW(first.offsetWidth + 12); // width + gap
 }, []);

 // Handle seamless loop reset
 const handleTransitionEnd = () => {
 if (current >= items.length * 2) {
 setIsTransitioning(false);
 setCurrent(current - items.length);
 requestAnimationFrame(() => {
 requestAnimationFrame(() => setIsTransitioning(true));
 });
 } else if (current < items.length) {
 setIsTransitioning(false);
 setCurrent(current + items.length);
 requestAnimationFrame(() => {
 requestAnimationFrame(() => setIsTransitioning(true));
 });
 }
 };

 const prev = () => {
 if (!isTransitioning) return;
 setCurrent((c) => c - 1);
 };

 const next = () => {
 if (!isTransitioning) return;
 setCurrent((c) => c + 1);
 };

 const onPointerDown = (e: React.PointerEvent) => {
 const startX = e.clientX;
 const start = current;
 const handleMove = (ev: PointerEvent) => {
 const dx = ev.clientX - startX;
 const delta = Math.round(-dx / slideW);
 setCurrent(start + delta);
 };
 const handleUp = () => {
 window.removeEventListener("pointermove", handleMove);
 window.removeEventListener("pointerup", handleUp);
 };
 window.addEventListener("pointermove", handleMove);
 window.addEventListener("pointerup", handleUp);
 };

 const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
 if (e.key === "ArrowLeft") {
 prev();
 } else if (e.key === "ArrowRight") {
 next();
 }
 };

 return (
 <div className="relative w-full overflow-hidden" tabIndex={0} onKeyDown={onKeyDown} aria-roledescription="carousel">
 {/* Navigation Controls - Vertically centered, subtle gold outline */}
 <button
 onClick={prev}
 aria-label="Previous"
 className="hidden md:flex absolute z-20 top-1/2 -translate-y-1/2 left-8 w-12 h-12 items-center justify-center rounded-full border border-black/80 text-black hover:text-black hover:border-black hover:bg-black/5 transition-all active:scale-95 bg-transparent"
 >
 <span className="text-3xl font-light pb-1">‹</span>
 </button>
 <button
 onClick={next}
 aria-label="Next"
 className="hidden md:flex absolute z-20 top-1/2 -translate-y-1/2 right-8 w-12 h-12 items-center justify-center rounded-full border border-black/80 text-black hover:text-black hover:border-black hover:bg-black/5 transition-all active:scale-95 bg-transparent"
 >
 <span className="text-3xl font-light pb-1">›</span>
 </button>

 {/* Mobile Navigation */}
 <button
 onClick={prev}
 aria-label="Previous"
 className="md:hidden absolute z-20 top-1/2 -translate-y-1/2 left-2 w-10 h-10 items-center justify-center rounded-full border border-black/80 text-black bg-white/90 backdrop-blur-sm shadow-sm"
 >
 <span className="text-2xl pb-1">‹</span>
 </button>
 <button
 onClick={next}
 aria-label="Next"
 className="md:hidden absolute z-20 top-1/2 -translate-y-1/2 right-2 w-10 h-10 items-center justify-center rounded-full border border-black/80 text-black bg-white/90 backdrop-blur-sm shadow-sm"
 >
 <span className="text-2xl pb-1">›</span>
 </button>

 <div className="overflow-hidden w-full py-0">
 <div
 ref={trackRef}
 onPointerDown={onPointerDown}
 onTransitionEnd={handleTransitionEnd}
 className="flex items-start gap-6 select-none cursor-grab active:cursor-grabbing w-full"
 style={{
 transform: `translateX(${-current * slideW}px)`,
 transition: isTransitioning 
 ? `transform ${slower ? 900 : 700}ms cubic-bezier(0.18,0.76,0.22,0.95)` 
 : 'none'
 }}
 >
 {extendedItems.map((item, i) => {
 const isCenter = i === current;
 const uniqueKey = `${item.name}-${i}`;
 return (
 <div
 key={uniqueKey}
 data-slide
 className={`flex-none w-[240px] h-[420px] transition-transform duration-700 overflow-visible`}
 >
 <Link href="/battles#warriors" className="block w-full h-full cursor-pointer" draggable={false}>
 {/* Frame Container - Fixed Size */}
 <div
  className={`antique-frame antique-frame-hover w-full h-[300px] overflow-visible`}
  role="group"
  aria-label={item.name}
  style={{ 
  transform: isCenter ? "scale(1.02)" : "scale(1.00)", 
  transition: isTransitioning 
  ? `transform ${slower ? 900 : 700}ms cubic-bezier(0.18,0.76,0.22,0.95)` 
  : 'none'
  }}
 >
  <div className="antique-corner tl"></div>
  <div className="antique-corner tr"></div>
  <div className="antique-corner bl"></div>
  <div className="antique-corner br"></div>
  <div className="antique-portrait relative w-full h-full overflow-hidden">
  <LazyImage fill src={item.image}
  alt={item.name}
  className="w-full h-full object-cover"
  />
  </div>
 </div>

 {/* Fixed Caption Container */}
 <div className="mt-6 relative z-10 h-[80px] w-full flex flex-col items-center justify-start text-center">
  <div className="inscription-text text-xl min-h-[40px] flex items-center justify-center w-full px-2">
  {item.name}
  </div>
  <div className="inscription-subtext mt-2 w-full text-center">
  {item.region || ""}
  </div>
 </div>
 </Link>
 </div>
 );
 })}
 </div>
 </div>
 </div>
 );
}

type HomeSection = {
 id: string;
 title: string;
 eraIndex: number;
 content: React.ReactNode;
 text?: string;
};

const SECTIONS: HomeSection[] = [
 {
 id: "origins",
 title: "Origins of Rajput Identity",
 eraIndex: 1,
 content: (
 <div className="space-y-8">
 <p className="text-xl leading-relaxed">
 Derived from historical records and legends, the term <span className="text-shehrawat-blood-red font-bold">Rajput</span> comes from the Sanskrit <em>Raja-putra</em>, meaning &quot;<span className="text-shehrawat-blood-red font-bold">Son of a King</span>&quot;.According to legend, the Agnikula clans emerged from a sacred fire altar at Mount Abu, ritually created to restore kṣatriya order in an age of chaos. Historically, Agnikula lineages consolidated power in western and central India during the early medieval period, anchoring their rule in fortresses and frontier defense.
 Core traits: martial renewal, frontier guardianship, ritual legitimacy.
 Associated houses: <span className="text-shehrawat-blood-red font-bold">Chauhan, Parmar, Solanki, Pratihara</span>
 </p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
 {/* AGNIKULA — ESSENCE OF FIRE */}
 <div className="relative overflow-hidden group border border-royal-silver/30 h-full">
 {/* 1. Background Image Layer (Atmosphere) */}
 <div 
 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-110 blur-[1px] opacity-90"
 style={{ backgroundImage: "url('/images/home/agnikula.webp')" }}
 />
 {/* 2. Strong Overlay Layer */}
 <div className="absolute inset-0 bg-sun-parchment/30 mix-blend-overlay" />

 {/* 4. Inner Content Frame */}
 <div className="relative z-10 h-full p-6 flex flex-col justify-center">
 <div className="bg-sun-parchment/40 backdrop-blur-sm border border-royal-silver/10 p-6 rounded-sm shadow-sm h-full flex flex-col justify-center">
 {/* 3. Text Typography */}
 <h3 className={`text-2xl font-bold text-shehrawat-blood-red mb-3 tracking-wider uppercase ${cinzel.className}`}>Agnikula</h3>
 <p className="text-xl text-ink-black/90 leading-relaxed font-medium drop-shadow-sm">
  Born from the sacred fire. Purified warriors destined to protect the land.
 </p>
 </div>
 </div>
 </div>

 {/* SURYAVANSHI — ESSENCE OF THE SUN */}
 <div className="relative overflow-hidden group border border-royal-silver/30 h-full">
 {/* 1. Background Image Layer (Atmosphere) */}
 <div 
 className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-110 blur-[1px] opacity-90"
 style={{ backgroundImage: "url('/images/home/suryavanshi.jpg')" }}
 />
 {/* 2. Strong Overlay Layer */}
 <div className="absolute inset-0 bg-sun-parchment/30 mix-blend-overlay" />

 {/* 4. Inner Content Frame */}
 <div className="relative z-10 h-full p-6 flex flex-col justify-center">
 <div className="bg-sun-parchment/40 backdrop-blur-sm border border-royal-silver/10 p-6 rounded-sm shadow-sm h-full flex flex-col justify-center">
 {/* 3. Text Typography */}
 <h3 className={`text-2xl font-bold text-imperial-gold mb-3 tracking-wider uppercase ${cinzel.className}`}>Suryavanshi</h3>
 <p className="text-xl text-ink-black/90 leading-relaxed font-medium drop-shadow-sm">
  Descendants of the Sun God (Surya). Radiating authority and consistency.
 </p>
 </div>
 </div>
 </div>

 {/* CHANDRAVANSHI — ESSENCE OF THE MOON */}
 <div className="relative overflow-hidden group border border-royal-silver/30 h-full">
 {/* 1. Background Image Layer (Atmosphere) */}
 <div 
 className="absolute inset-0 bg-cover bg-top transition-transform duration-700 scale-110 blur-[1px] opacity-90"
 style={{ backgroundImage: "url('/images/home/chandravanshi.jpg')" }}
 />
 {/* 2. Strong Overlay Layer */}
 <div className="absolute inset-0 bg-sun-parchment/30 mix-blend-overlay" />

 {/* 4. Inner Content Frame */}
 <div className="relative z-10 h-full p-6 flex flex-col justify-center">
 <div className="bg-sun-parchment/40 backdrop-blur-sm border border-royal-silver/10 p-6 rounded-sm shadow-sm h-full flex flex-col justify-center">
 {/* 3. Text Typography */}
 <h3 className={`text-1xl font-bold text-imperial-gold mb-3 tracking-wider uppercase ${cinzel.className}`}>Chandravanshi</h3>
 <p className="text-xl text-ink-black/90 leading-relaxed font-medium drop-shadow-sm">
  Descendants of the Moon God (Chandra). A lineage of resilience.
 </p>
 </div>
 </div>
 </div>
 </div>
 <p className="text-xl leading-relaxed">
 Historical consensus suggests Rajputs rose to prominence following the breakup of the Gupta Empire, solidifying into distinct warrior lineages by the 6th–7th centuries. Regardless of origin—mythic or martial—what defined them was an unyielding code of valour.Historical consensus suggests Rajputs rose to prominence following the fragmentation of the Gupta Empire, as imperial authority weakened and regional power shifted to local warrior elites. Between the 6th and 7th centuries, these groups consolidated control over land, forts, and agrarian resources, gradually crystallizing into distinct hereditary lineages.

 Their origins drew from multiple streams—former Gupta military officers, local chieftains, frontier defenders, and clans that legitimized rule through genealogy, ritual, and martial service. Mythic narratives provided sacred sanction, while sustained warfare and territorial defense forged real authority.
 </p>
 </div>
 ),
 },
 // {
 // id: "polity",
 // title: "Formation of Rajput Polity",
 // eraIndex: 1,
 // content: (
 // <div className="space-y-6">
 // <div className="border-l-2 border-royal-silver pl-6 py-2">
 // <h4 className={`text-lg font-bold text-ink-black ${cinzel.className}`}>500–650 CE</h4>
 // <p>Warrior chiefs gain autonomy in the post-Gupta vacuum.</p>
 // </div>
 // <div className="border-l-2 border-royal-silver pl-6 py-2">
 // <h4 className={`text-lg font-bold text-ink-black ${cinzel.className}`}>Clan Coalescence</h4>
 // <p>Loose warrior bands crystallize into ruling houses with defined territories.</p>
 // </div>
 // <div className="border-l-2 border-royal-silver pl-6 py-2">
 // <h4 className={`text-lg font-bold text-ink-black ${cinzel.className}`}>Kshatriya Identity</h4>
 // <p>A formalized martial identity cements the social hierarchy.</p>
 // </div>
 // </div>
 // ),
 // },
 {
 id: "ascendancy",
 title: "Imperial Rajput Ascendancy",
 eraIndex: 2,
 content: (
 <div className="space-y-12">
 <p className="text-xl leading-relaxed">
 The rise of the <strong>Gurjara-Pratiharas</strong> marked the zenith of early Rajput power, acting as a bulwark against Arab invasions and expanding dominion across Northern India.
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {CLAN_DATA.map((clan) => (
 <div key={clan.id} className="relative overflow-hidden p-8 border border-imperial-gold/30 bg-royal-ivory/50 shadow-sm group hover:border-imperial-gold/60 transition-colors duration-500">
 
 {/* Background Motif (Low Opacity) */}
 <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
 <div className="w-48 h-48 transform group-hover:scale-105 transition-transform duration-700">
  {clan.symbol}
 </div>
 </div>

 {/* Content */}
 <div className="relative z-10 text-center space-y-3">
  <div className="text-antique-gold text-lg tracking-widest uppercase font-semibold opacity-80">{clan.motif}</div>
  <h3 className={`text-3xl text-shehrawat-blood-red font-bold ${cinzel.className}`}>{clan.name}</h3>
  <div className="w-12 h-px bg-imperial-gold/40 mx-auto my-2"></div>
  <p className="text-xl text-ink-black/80 font-serif italic leading-relaxed max-w-xs mx-auto">
  {clan.description}
  </p>
 </div>
 
 {/* Corner Accents */}
 <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-imperial-gold/40"></div>
 <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-imperial-gold/40"></div>
 <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-imperial-gold/40"></div>
 <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-imperial-gold/40"></div>

 </div>
 ))}
 </div>
 </div>
 ),
 },
 {
 id: "kingdoms",
 title: "Great Rajput Kingdoms",
 eraIndex: 3,
 content: (
 <>
 <div className="space-y-20">

 {/* MEWAR */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
 <div className="space-y-4">
 <h3 className={`text-3xl ${cinzel.className}`}>Mewar — resistance & honor</h3>
 <p className="text-xl opacity-80">
 A polity defined by refusal. Forts were citadels of ethics, courts were
 councils of vows. Honor at the boundary of action.
 </p>
 <p className="text-xl opacity-80">
 Chittorgarh and Kumbhalgarh stand like inscriptions. Decisions were carved,
 not written.
 </p>
 <Link href="/dynasties#mewar-sisodia" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
 Explore Mewar Dynasty <span className="text-sm">→</span>
 </Link>
 </div>

 <div className="relative h-56 border-2 border-imperial-gold overflow-hidden">
 <LazyImage fill src="/images/home/chittorgarh-fort.jpg"
 alt="Mewar Kingdom"
 className="w-full h-full object-cover"
 />
 </div>
 </div>

 {/* MARWAR */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
 <div className="relative h-56 border-2 border-imperial-gold overflow-hidden">
 <LazyImage fill src="/images/home/jodhpur-fort.jpg"
 alt="Marwar Kingdom"
 className="w-full h-full object-cover"
 />
 </div>

 <div className="space-y-4">
 <h3 className={`text-3xl ${cinzel.className}`}>Marwar — expansion & fortitude</h3>
 <p className="text-xl opacity-80">
 Rathore conquest across an unforgiving horizon. Expansion did not chase
 glory; it secured lifelines — trade routes, garrisons, water.
 </p>
 <p className="text-xl opacity-80">
 Fortitude was logistics and patience. Marwar measured time by endurance.
 </p>
 <Link href="/dynasties#marwar-rathore" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
 Explore Marwar Dynasty <span className="text-sm">→</span>
 </Link>
 </div>
 </div>

 {/* AMBER */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
 
 <div className="space-y-4">
 <h3 className={`text-3xl ${cinzel.className}`}>Amber — strategy & statecraft</h3>
 <p className="text-xl opacity-80">
 Strategy was restraint made visible. Alliances formed by dignity,
 counsel over impulse.
 </p>
 <p className="text-xl opacity-80">
 Jaipur’s planning honored geometry and governance.
 </p>
 <Link href="/dynasties#amber-kachwaha" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
 Explore Amber Dynasty <span className="text-sm">→</span>
 </Link>
 </div>

 <div className="relative h-56 border-2 border-imperial-gold overflow-hidden">
 <LazyImage fill src="/images/home/amer-fort.webp"
 alt="Amber Kingdom"
 className="w-full h-full object-cover"
 />
 </div>
 </div>

 {/* JAISALMER */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
 <div className="relative h-56 border-2 border-imperial-gold overflow-hidden">
 <LazyImage fill src="/images/home/jaisalmer-fort.jpg"
 alt="Jaisalmer Kingdom"
 className="w-full h-full object-cover"
 />
 </div>

 <div className="space-y-4">
 <h3 className={`text-3xl ${cinzel.className}`}>Jaisalmer — survival & trade</h3>
 <p className="text-xl opacity-80">
 Desert lines converted into commerce. Trade carved stone, and alliance
 carved identity.
 </p>
 <p className="text-xl opacity-80">
 The fort is a town, the town a memory.
 </p>
 <Link href="/dynasties#jaisalmer-bhati" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
 Explore Jaisalmer Dynasty <span className="text-sm">→</span>
 </Link>
 </div>
 </div>

 </div>
 </>
 ),
 },

 { 
 id: "battles", 
 title: "Battles That Defined Rajputana", 
 eraIndex: 4, 
 text: "Battles That Defined Rajputana. Haldighati, 1576, where Mewar refused to submit. Dewair, 1582, the restoration of lost land and dignity. Tarain, 1191, the guardianship of the northern plains. Chittorgarh, 1568, where honor was chosen over life.",
 content: ( 
 <div className="space-y-32"> 
 
 {/* ================= HALDIGHATI ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
 <h3 className={`text-3xl ${cinzel.className}`}> 
 Haldighati (1576 CE) 
 </h3> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Stakes 
 </div> 
 <p className="text-xl opacity-80"> 
 Existence of Mewar’s sovereignty 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Decision 
 </div> 
 <p className="text-xl opacity-80"> 
 Refusal to submit, even when outnumbered beyond recovery 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Consequence 
 </div> 
 <p className="text-xl opacity-80"> 
 </p> 
 <p className="text-xl opacity-80"> 
 <span className="text-shehrawat-blood-red font-bold">22,000 RAJPUT warriors killed 80,000 soldiers of Mughal Dictator Akbar.</span> 
 A smaller Rajput force stood against a vastly superior imperial army 
 and chose defiance over safety. 
 </p> 
 <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
 For more info <span className="transition-transform group-hover:translate-x-1">→</span>
 </Link>
 </div> 
 </div> 
 
 {/* ================= DEWAIR ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
 <h3 className={`text-3xl ${cinzel.className}`}> 
 Dewair (1582 CE) 
 </h3> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Stakes 
 </div> 
 <p className="text-xl opacity-80"> 
 Restoration of lost land and dignity 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Decision 
 </div> 
 <p className="text-xl opacity-80"> 
 Strike silently, decisively, without spectacle 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Consequence 
 </div> 
 <p className="text-xl opacity-80"> 
 </p> 
 <p className="text-xl opacity-80">Thirty-six Mughal outposts collapsed.
 <span className="text-shehrawat-blood-red font-bold"> 36,000 Mughals surrendered and begged for mercy from MAHARANA PRATAP. </span> 
 40,000 RAJPUT warriors killed lakhs of soldiers of Akbar&apos;s forces.
 </p>
 <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
 For more info <span className="transition-transform group-hover:translate-x-1">→</span>
 </Link> 
 <p className="text-xl opacity-80"> 
 
 </p> 
 </div> 
 </div> 
 
 {/* ================= TARAIN ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
 <h3 className={`text-3xl ${cinzel.className}`}> 
 Tarain (1191 CE) 
 </h3> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Stakes 
 </div> 
 <p className="text-xl opacity-80"> 
 Guardianship of the northern plains 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Decision 
 </div> 
 <p className="text-xl opacity-80"> 
 Stand and confront invasion head-on 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Consequence 
 </div> 
 <p className="text-xl opacity-80"> 
 
 </p> 
 <p className="text-xl opacity-80"> 
 25 year old Hindu <span className="text-shehrawat-blood-red font-bold">Samrat PRITHVIRAJ CHAUHAN defeated the Arab forces 
 17 times and killed arab robber Mohd. Gauri.</span> 
 The first battle proved Rajput armies could stop expansionist forces outright. 
 </p> 
 <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
 For more info <span className="transition-transform group-hover:translate-x-1">→</span>
 </Link> 
 </div> 
 </div> 
 
 {/* ================= CHITTORGARH ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
 <h3 className={`text-3xl ${cinzel.className}`}> 
 Sieges of Chittorgarh (1568 CE) 
 </h3> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Stakes 
 </div> 
 <p className="text-xl opacity-80"> 
 Sanctity of the fort-city and Rajput honor 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Decision 
 </div> 
 <p className="text-xl opacity-80"> 
 Hold, or burn—never bend 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Consequence 
 </div> 
 <p className="text-xl opacity-80">
 <span className="text-shehrawat-blood-red font-bold">8,000 Rajput Warriors killed 40,000 of Akbar&#39;s forces.</span>
 They inflicted devastating losses before making their final stand,
 choosing death over dishonour.
 </p>

 <p className="text-xl opacity-80">
 Chittorgarh was never “taken.”
  Every defender fell, but Rajput honour remained unbroken.
 </p>
 <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
 For more info <span className="transition-transform group-hover:translate-x-1">→</span>
 </Link>
 
 </div> 
 </div> 
 

 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
 <h3 className={`text-3xl ${cinzel.className}`}> 
 Ranthambore (1299 CE) 
 </h3> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Stakes 
 </div> 
 <p className="text-xl opacity-80"> 
 Autonomy of central Rajputana 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Decision 
 </div> 
 <p className="text-xl opacity-80"> 
 Defend until annihilation 
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 Consequence 
 </div> 
 <p className="text-xl opacity-80"> 
 The fort fell—but resistance forced prolonged siege. 
 The cost inflicted reshaped imperial caution. 
 </p> 
 <p className="text-xl opacity-80"> 
 Even in defeat, the defense extracted a price that echoed beyond the walls. 
 </p> 
 </div> 
 </div>
 
 </div> 
 ), 
 },

 {
 id: "states",
 title: "Rajput Princely States & Rule",
 eraIndex: 9,
 content: (
 <div className="space-y-6">
 <p className="text-xl leading-relaxed">
 Even under the British Raj, Rajputana maintained its internal autonomy. The <strong>Princely States</strong> preserved the royal protocols, gun salutes, and the administrative machinery of kingship until the mid-20th century.
 </p>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {[
 { name: "Mewar (Udaipur)", image: "/images/home/external/Coat_of_arms_of_Udaipur_State.png" },
 { name: "Marwar (Jodhpur)", image: "/images/home/external/CoA_Jodhpur_1893.png" },
 { name: "Amber (Jaipur)", image: "/images/home/external/Jaipur_State_CoA_-_colourised.svg" },
 { name: "Bikaner", image: "/images/home/external/Bikaner_State_Coat_of_Arms.svg" },
 { name: "Jaisalmer", image: "/images/home/external/Jaisalmer_Royal_COA.png" },
 { name: "Kota", image: "/images/home/external/Kota_State_CoA.png" },
 { name: "Bundi", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Alwar", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Sirohi", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Banswara", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Jhalawar", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Karauli", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Bharatpur", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Dholpur", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Tonk", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Dungarpur", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Pratapgarh", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Shahpura", image: "/images/home/external/shahpura-arms.jpg" },
 { name: "Kishangarh", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Rewa", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Orchha", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Ratlam", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Idar", image: "/images/dynasties/rulers/default.jpg" },
 { name: "Nawanagar", image: "/images/home/external/Nawanagar_State_CoA.jpg" },
 ].map((state, i) => (
  <div key={i} className="aspect-square border border-royal-silver flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
  <div className="w-24 h-24 md:w-32 md:h-32 relative mb-2">
  <LazyImage
  src={state.image}
  alt={`${state.name} Seal`}
  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
  />
  </div>
  <span className={`text-base md:text-xl text-center font-bold text-shehrawat-blood-red opacity-80 group-hover:opacity-100 ${cinzel.className}`}>
  {state.name}
  </span>
  </div>
 ))}
 </div>
 </div>
 ),
 },
 {
 id: "ethos",
 title: "Legends of Rajputana",
 eraIndex: 9,
 text: "Warriors remembered by deed, not mercy. They did not rule by permission. They endured, resisted, and were remembered. These are the names history could not erase.",
 content: (
 <div className="relative w-full">
 <div className="relative z-10 w-full">
 <div className="max-w-[1800px] mx-auto px-6 md:px-16">
 <div className="w-full lg:w-3/4 mb-12">
 <div className={`manuscript-title ${cinzel.className} text-3xl md:text-4xl tracking-[0.2em] mb-4`}>
 Warriors remembered by deed, not mercy
 </div>
 <p className="max-w-3xl text-base md:text-lg opacity-85 tracking-wide">
 They did not rule by permission. They endured, resisted, and were remembered. These are the names history could not erase.
 </p>
 </div>
 </div>
 
 <div className="w-full">
 <Carousel items={MALE_WARRIORS} />
 </div>
 
 <div className="mt-12 w-full">
 <Carousel items={FEMALE_WARRIORS} slower />
 </div>
 </div>
 </div>
 ),
 },
 {
 id: "culture",
 title: "CULTURE OF POWER",
 eraIndex: 9,
 content: (
 <div className="w-full flex flex-col">
  {/* 1. FULL-WIDTH ROYAL COLLAGE STRIP (70vh) */}
 <div className="relative w-full h-[70vh] overflow-hidden bg-royal-ivory select-none">
 {/* Collage Grid - Controlled Asymmetry */}
 <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-0 opacity-90">
 {/* Large Left Block - Palace/Durbar */}
 <div className="col-span-5 row-span-6 relative">
  <LazyImage
  src="https://thumbs.dreamstime.com/b/passage-indian-rajput-palace-bikaner-rajasthan-india-42806279.jpg"
  alt="Royal Durbar"
  className="w-full h-full object-cover object-center filter sepia-[0.4] saturate-[0.8] contrast-[1.1]"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-royal-ivory/20 via-transparent to-royal-ivory/80"></div>
 </div>

 {/* Center Strip - Weapons & Rituals */}
 <div className="col-span-4 row-span-6 flex flex-col">
  <div className="h-1/2 relative">
  <LazyImage
  src="https://i.pinimg.com/736x/ad/ae/ba/adaeba0dddfbf0da31cf227464f78795.jpg"
  alt="Rajput Weapons"
  className="w-full h-full object-cover object-center filter sepia-[0.5] saturate-[0.6]"
  />
  <div className="absolute inset-0 bg-royal-ivory/10 mix-blend-multiply"></div>
  </div>
  <div className="h-1/2 relative">
  <LazyImage
  src="https://i.ytimg.com/vi/LFVkpPfM9Sw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD4L9CcowkVOLAtCdjpavwXGo5-dg"
  alt="Ritual Ceremony"
  className="w-full h-full object-cover object-top filter sepia-[0.4] saturate-[0.7]"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-royal-ivory/90 via-transparent to-transparent"></div>
  </div>
 </div>

 {/* Right Block - Music & Attire */}
 <div className="col-span-3 row-span-6 flex flex-col">
  <div className="h-2/3 relative">
  <LazyImage
  src="https://upload.wikimedia.org/wikipedia/commons/e/e5/1_Maharaja_Sawai_Jai_Singh_II_ca_1725_Jaipur._British_museum.jpg"
  alt="Royal Attire"
  className="w-full h-full object-cover object-top filter sepia-[0.3] saturate-[0.8]"
  />
  <div className="absolute inset-0 bg-gradient-to-l from-royal-ivory/30 via-transparent to-transparent"></div>
  </div>
  <div className="h-1/3 relative">
  <LazyImage
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHt-zLx2Gl2C0ULsMGiTa-i5HfIZ4d8YO-MQ&s"
  alt="Royal musicians and instruments"
  className="w-full h-full object-cover object-top filter sepia-[0.4] saturate-[0.7]"
  />
  </div>
 </div>
 </div>

 {/* Overlay Gradient for Text Readability */}
 <div className="absolute inset-0 bg-royal-ivory/40 mix-blend-screen pointer-events-none"></div>
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-ivory/20 to-royal-ivory pointer-events-none"></div>

 {/* 2. OVERLAYED DECLARATION (Centered) */}
 <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
 >
  <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black text-shehrawat-blood-red uppercase tracking-[0.15em] leading-none mb-4 ${cinzel.className}`}
  style={{ textShadow: '0 2px 10px rgba(122, 15, 22, 0.1)' }}
  >
  Culture of Power
  </h2>
  <motion.div 
  initial={{ width: 0 }}
  whileInView={{ width: "60%" }}
  transition={{ duration: 1.5, delay: 0.5 }}
  className="h-[4px] bg-imperial-gold mx-auto mb-6 shadow-sm"
  />
  <h3 className={`text-xl md:text-2xl text-ink-black/80 font-serif italic tracking-widest`}>
  Culture as Continuation of Rule
  </h3>
 </motion.div>
 </div>
 </div>

 <div className="w-full bg-royal-ivory border-t-[6px] border-imperial-gold relative z-20 py-12 md:py-20">
 <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
 
 {/* WEAPONS */}
 <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.2 }}
  className="px-8 md:px-12 py-8 border-r-0 md:border-r border-imperial-gold/30 flex flex-col justify-start h-full group relative"
 >
  <Link href="/weapons" className="block h-full flex flex-col">
  <h4 className={`text-3xl font-bold text-shehrawat-blood-red mb-6 tracking-widest uppercase ${cinzel.className} group-hover:underline`}>
  Weapons
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif">
  Hereditary authority, not tools of war.
  </p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed mb-auto">
  Swords and lances defined lineage and legal power.
  </p>
  <div className="mt-4 text-shehrawat-blood-red font-bold uppercase tracking-wider text-sm flex items-center gap-2">
  Know More <span className="text-lg">→</span>
  </div>
  </Link>
 </motion.div>

 {/* DRESS */}
 <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.4 }}
  className="px-8 md:px-12 py-8 border-r-0 xl:border-r border-imperial-gold/30 flex flex-col justify-start h-full"
 >
  <h4 className={`text-3xl font-bold text-shehrawat-blood-red mb-6 tracking-widest uppercase ${cinzel.className}`}>
  Dress
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif">
  Rank made visible.
  </p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed">
  Jewelry and turbans were strict legal markers of status.
  </p>
 </motion.div>

 {/* MUSIC */}
 <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.6 }}
  className="px-8 md:px-12 py-8 border-r-0 md:border-r border-imperial-gold/30 flex flex-col justify-start h-full"
 >
  <h4 className={`text-3xl font-bold text-shehrawat-blood-red mb-6 tracking-widest uppercase ${cinzel.className}`}>
  Music
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif">
  History in melody.
  </p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed">
  Ballads were the legal records of genealogy and debt.
  </p>
 </motion.div>

 {/* RITUALS */}
 <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.8 }}
  className="px-8 md:px-12 py-8 flex flex-col justify-start h-full relative group"
 >
  <Link href="/folklore#rituals" className="block h-full flex flex-col">
  <h4 className={`text-3xl font-bold text-shehrawat-blood-red mb-6 tracking-widest uppercase ${cinzel.className} group-hover:underline`}>
  Rituals
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif">
  The theatre of loyalty.
  </p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed mb-auto">
  Public ceremonies bound the ruler and ruled in blood.
  </p>
  <div className="mt-4 text-shehrawat-blood-red font-bold uppercase tracking-wider text-sm flex items-center gap-2">
  Know More <span className="text-lg">→</span>
  </div>
  </Link>
 </motion.div>

 </div>
 </div>
 </div>
 ),
 },
 {
 id: "modern",
 title: "Modern Integration",
 eraIndex: 9,
 text: "Modern Integration. The political integration into the Indian Union marked the end of princely sovereignty, but not the end of power. As the maps were redrawn, the ruling houses transitioned from governing states to serving the nation, carrying their martial legacy into the democratic era.",
 content: (
 <div className="w-full py-24 relative overflow-hidden flex flex-col items-center justify-center bg-[#fdfbf7]">
 <div className="max-w-[1200px] w-full px-6 md:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
 
 {/* Left Content - 60% */}
 <div className="lg:col-span-3 flex flex-col gap-8">
 <motion.div 
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="relative pl-8 border-l-[3px] border-imperial-gold"
 >
  <h2 className={`text-5xl md:text-6xl font-black text-[#5c0b12] uppercase tracking-wider leading-none ${cinzel.className}`}>
  Modern Integration
  </h2>
  <div className={`text-sm md:text-base text-antique-gold font-bold tracking-[0.2em] uppercase mt-3 ${cinzel.className}`}>
  1947–1956 | From Sovereignty to Service
  </div>
 </motion.div>

 <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1, delay: 0.3 }}
  className="space-y-8 text-lg md:text-xl text-ink-black/90 font-medium leading-relaxed"
 >
  <p>
  The political integration into the Indian Union marked the end of princely sovereignty, but not the end of power. As the maps were redrawn, the ruling houses transitioned from governing states to serving the nation, carrying their martial legacy into the democratic era.
  </p>
  <p>
  Today, the legacy lives on—not just in the palaces that stand as custodians of history, but in the Rajput regiments of the Indian Army and the enduring cultural continuity of the region. The ethos of duty, once bound to the throne, is now pledged to the constitution.
  </p>
 </motion.div>
 </div>

 {/* Right Visual Anchor - 40% */}
 <div className="lg:col-span-2 relative h-[400px] flex items-center justify-center">
 <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1.2 }}
  viewport={{ once: true }}
  transition={{ duration: 1.5, delay: 0.6 }}
  className="absolute inset-0 flex items-center justify-center"
 >
  {/* Visual Anchor: Faded Map */}
  <LazyImage
  src="https://upload.wikimedia.org/wikipedia/commons/0/09/Rajputana_1909.jpg"
  alt="Rajputana Map"
  className="w-full h-full object-contain filter sepia(0.3) contrast-110 drop-shadow-md"
  />
 </motion.div>
 </div>
 </div>
 
 {/* Continuity Indicator */}
 <motion.div
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ delay: 1, duration: 1 }}
 className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 pb-8"
 >
 <span className={`text-xs tracking-[0.2em] uppercase text-ink-black/60 ${cinzel.className}`}>Legacy Continues</span>
 <div className="h-12 w-px bg-imperial-gold/50"></div>
 </motion.div>
 </div>
 ),
 }
];

export default function HistoryPage() {
 const [activeEra, setActiveEra] = useState(0);
 const { scrollYProgress } = useScroll();
 const { speak, stopSpeaking, isSpeaking } = useLanguage();
 const [listeningSection, setListeningSection] = useState<string | null>(null);

 const handleListen = (text: string, id: string) => {
 if (isSpeaking && listeningSection === id) {
 stopSpeaking();
 setListeningSection(null);
 } else {
 stopSpeaking();
 speak(text);
 setListeningSection(id);
 }
 };

 useEffect(() => {
 if (!isSpeaking) {
 setListeningSection(null);
 }
 }, [isSpeaking]);

 const scaleX = useSpring(scrollYProgress, {
 stiffness: 100,
 damping: 30,
 restDelta: 0.001
 });

 // Simple scroll spy to update active era based on section visibility
 useEffect(() => {
 const handleScroll = () => {
 const scrollPosition = window.scrollY + window.innerHeight / 3;
 const sections = SECTIONS.map(s => document.getElementById(s.id));
 
 let foundIndex = -1;
 sections.forEach((section, index) => {
 if (section && section.offsetTop <= scrollPosition) {
 foundIndex = index;
 }
 });

 if (foundIndex !== -1) {
 setActiveEra(SECTIONS[foundIndex].eraIndex);
 } else if (window.scrollY < 500) {
 setActiveEra(0);
 }
 };
 
 window.addEventListener("scroll", handleScroll);
 return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 return (
 <main className={`min-h-screen bg-royal-ivory text-ink-black ${cormorant.className} overflow-x-hidden`}>
 {/* Global Scroll Progress (Gold Line at Top) */}
 <motion.div
 className="fixed top-0 left-0 right-0 h-1.5 bg-imperial-gold origin-left z-50"
 style={{ scaleX }}
 />


    <section className="relative w-full h-screen overflow-hidden">

      {/* Hero Image */}
      <Image
        src="/images/Hero/home_.png"
        alt="Rajputana Battle"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />

      

      {/* Content */}
    

    </section>

    <Navbar />


 {/* MAIN CONTENT + STICKY TIMELINE */}
 <div className="relative max-w-[1800px] mx-auto flex flex-col lg:flex-row">
 <div className="w-full lg:w-3/4 px-6 md:px-16 py-20 space-y-32">
 {(() => {
 const statesIndex = SECTIONS.findIndex(s => s.id === "states");
 const topSections = statesIndex >= 0 ? SECTIONS.slice(0, statesIndex + 1) : SECTIONS;
 return topSections.map((section) => (
 <section key={section.id} id={section.id} className="scroll-mt-32">
  <motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8 }}
  >
  <h2 className={`text-4xl md:text-5xl font-bold text-shehrawat-blood-red mb-2 ${cinzel.className} flex items-center gap-4`}>
  {section.title}
  {section.text && (
  <button
  onClick={(e) => {
   e.stopPropagation();
   handleListen(section.text!, section.id);
  }}
  className={`text-sm px-4 py-2 border rounded-full transition-all duration-300 flex items-center gap-2 ${
   listeningSection === section.id
   ? "bg-shehrawat-blood-red text-royal-ivory border-shehrawat-blood-red"
   : "border-shehrawat-blood-red/30 text-shehrawat-blood-red hover:bg-shehrawat-blood-red hover:text-royal-ivory"
  }`}
  aria-label={listeningSection === section.id ? "Stop narration" : "Play narration"}
  >
  {listeningSection === section.id ? (
   <>
   <StopIcon className="w-4 h-4" /> Stop
   </>
  ) : (
   <>
   <VolumeIcon className="w-4 h-4" /> Listen
   </>
  )}
  </button>
  )}
  </h2>
  <motion.div 
  initial={{ width: 0 }}
  whileInView={{ width: 200 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="h-1 bg-imperial-gold mb-12"
  />
  <div className="text-lg md:text-xl text-ink-black/90">
  {section.content}
  </div>
  </motion.div>
 </section>
 ));
 })()}
 </div>

 <aside className="hidden lg:block w-1/4 border-l border-royal-silver/50 bg-royal-ivory">
 <div className="sticky top-0 py-20 px-2">
 <h3 className={`text-3xl font-bold text-shehrawat-blood-red mb-12 text-center border-b-2 border-imperial-gold pb-4 ${cinzel.className}`}>
  Royal Chronicle
 </h3>
 
 <div className="space-y-16">
  {TIMELINE_DATA.map((group, index) => {
  const isActive = index === activeEra;
  return (
  <div key={group.era}>
  <div className="relative pl-2">
  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 ${isActive ? "bg-imperial-gold border-shehrawat-blood-red shadow-[0_0_10px_#c9a24d]" : "bg-royal-ivory border-royal-silver"}`} />
  <h4 className={`text-xl font-bold ${isActive ? "text-shehrawat-blood-red" : "text-ink-black"} ${cinzel.className}`}>{group.era}</h4>
  </div>
  <div className="mt-6 ml-4 border-l-2 border-royal-silver space-y-6 pl-3">
  {group.entries.map((e) => (
  <div key={`${group.era}-${e.date}-${e.text}`} className="relative">
  <div className={`absolute -left-[14px] top-1.5 w-2 h-2 rotate-45 ${e.text.includes("Battle") || e.text.includes("Siege") || e.text.includes("Integration") || e.text.includes("Formation") ? "bg-imperial-gold" : "bg-royal-silver"}`} />
  <div className="flex items-baseline gap-3">
  <span className="text-shehrawat-blood-red font-bold text-lg">{e.date}</span>
  <span className="text-ink-black text-lg">{e.text}</span>
  </div>
  </div>
  ))}
  </div>
  </div>
  );
  })}
 </div>
 </div>
 </aside>

 <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-royal-ivory border-t-4 border-imperial-gold p-4 z-40 shadow-2xl">
 <div className="flex justify-between items-center">
 <span className={`text-shehrawat-blood-red font-bold ${cinzel.className}`}>
  {TIMELINE_DATA[activeEra]?.era || "Royal Chronicle"}
 </span>
 <span className="text-sm text-royal-silver">
  {activeEra + 1} / {TIMELINE_DATA.length}
 </span>
 </div>
 </div>
 </div>
 
 {(() => {
 const statesIndex = SECTIONS.findIndex(s => s.id === "states");
 const bottomSections = statesIndex >= 0 ? SECTIONS.slice(statesIndex + 1) : [];
 if (bottomSections.length === 0) return null;
 
 return (
 <div className="w-full">
 {bottomSections.map((section) => {
 const isLegends = section.id === "ethos";
 const isCulture = section.id === "culture";
 const isModern = section.id === "modern";
 
 if (isCulture || isModern) {
  return (
  <section key={section.id} id={section.id} className="w-full scroll-mt-0 relative group">
  {/* Floating TTS Button */}
  {section.text && (
  <div className="absolute top-8 right-8 z-50">
  <button
   onClick={(e) => {
   e.stopPropagation();
   handleListen(section.text!, section.id);
   }}
   className={`p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-imperial-gold ${
   listeningSection === section.id
   ? "bg-shehrawat-blood-red text-royal-ivory"
   : "bg-royal-ivory/90 text-shehrawat-blood-red hover:bg-shehrawat-blood-red hover:text-royal-ivory"
   }`}
   aria-label={listeningSection === section.id ? "Stop narration" : "Play narration"}
  >
  {listeningSection === section.id ? <StopIcon className="w-6 h-6" /> : <VolumeIcon className="w-6 h-6" />}
  </button>
  </div>
  )}
  {section.content}
  </section>
  );
 }
 
 if (isLegends) {
  return (
  <section 
  key={section.id} 
  id={section.id} 
  className="w-full bg-[#f9f7f2] border-t border-imperial-gold/40 scroll-mt-32"
  style={{ paddingTop: '80px', paddingBottom: '40px' }}
  >
  <div className="w-full">
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true, margin: "-100px" }}
   transition={{ duration: 0.8 }}
  >
   <div className="w-full">
   <div className="max-w-[1800px] mx-auto px-6 md:px-16">
   <div className="w-full lg:w-3/4">
   <div className="flex items-center gap-4 mb-2">
   <h2 className={`text-4xl md:text-5xl font-bold text-shehrawat-blood-red ${cinzel.className}`}>
    {section.title}
   </h2>
   {section.text && (
    <button
    onClick={(e) => {
    e.stopPropagation();
    handleListen(section.text!, section.id);
    }}
    className={`text-sm px-4 py-2 border rounded-full transition-all duration-300 flex items-center gap-2 ${
    listeningSection === section.id
    ? "bg-shehrawat-blood-red text-royal-ivory border-shehrawat-blood-red"
    : "border-shehrawat-blood-red/30 text-shehrawat-blood-red hover:bg-shehrawat-blood-red hover:text-royal-ivory"
    }`}
    aria-label={listeningSection === section.id ? "Stop narration" : "Play narration"}
    >
    {listeningSection === section.id ? (
    <>
    <StopIcon className="w-4 h-4" /> Stop
    </>
    ) : (
    <>
    <VolumeIcon className="w-4 h-4" /> Listen
    </>
    )}
    </button>
   )}
   </div>
   <motion.div 
   initial={{ width: 0 }}
   whileInView={{ width: 200 }}
   viewport={{ once: true }}
   transition={{ duration: 1 }}
   className="h-1 bg-imperial-gold mb-12"
   />
   </div>
   </div>
   <div className="text-lg md:text-xl text-ink-black/90 w-full mb-8">
   {section.content}
   </div>
   </div>
  </motion.div>
  </div>
  </section>
  );
 }

 return (
  <div key={section.id} className="max-w-[1800px] mx-auto px-6 md:px-16 py-24 space-y-32">
  <section id={section.id} className="scroll-mt-32">
  <motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8 }}
  >
  <div className="w-full lg:w-3/4 mb-12">
  <div className="flex items-center gap-4 mb-2">
  <h2 className={`text-4xl md:text-5xl font-bold text-shehrawat-blood-red ${cinzel.className}`}>
   {section.title}
  </h2>
  {section.text && (
   <button
   onClick={(e) => {
   e.stopPropagation();
   handleListen(section.text!, section.id);
   }}
   className={`text-sm px-4 py-2 border rounded-full transition-all duration-300 flex items-center gap-2 ${
   listeningSection === section.id
   ? "bg-shehrawat-blood-red text-royal-ivory border-shehrawat-blood-red"
   : "border-shehrawat-blood-red/30 text-shehrawat-blood-red hover:bg-shehrawat-blood-red hover:text-royal-ivory"
   }`}
   aria-label={listeningSection === section.id ? "Stop narration" : "Play narration"}
   >
   {listeningSection === section.id ? (
   <>
   <StopIcon className="w-4 h-4" /> Stop
   </>
   ) : (
   <>
   <VolumeIcon className="w-4 h-4" /> Listen
   </>
   )}
   </button>
  )}
  </div>
  <motion.div 
  initial={{ width: 0 }}
  whileInView={{ width: 200 }}
  viewport={{ once: true }}
  transition={{ duration: 1 }}
  className="h-1 bg-imperial-gold"
  />
  </div>
  <div className={`w-full ${section.id === 'modern' ? 'lg:w-3/4' : ''}`}>
  <div className="text-lg md:text-xl text-ink-black/90">
  {section.content}
  </div>
  </div>
  </motion.div>
  </section>
  </div>
 );
 })}
 </div>
 );
 })()}
 </main>
 );
}
