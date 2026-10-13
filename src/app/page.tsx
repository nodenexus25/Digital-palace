"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import LazyImage from "./components/LazyImage";
import TransText from "./components/TransText";
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
 eraKey: "home.timeline.proto.era",
 entries: [
 { id: "c1500_1300_bce", dateKey: "home.timeline.proto.c1500_1300_bce.date", textKey: "home.timeline.proto.c1500_1300_bce.text" },
 { id: "c1300_1000_bce", dateKey: "home.timeline.proto.c1300_1000_bce.date", textKey: "home.timeline.proto.c1300_1000_bce.text" },
 { id: "800_600_bce", dateKey: "home.timeline.proto.800_600_bce.date", textKey: "home.timeline.proto.800_600_bce.text" },
 { id: "600_400_bce", dateKey: "home.timeline.proto.600_400_bce.date", textKey: "home.timeline.proto.600_400_bce.text" },
 { id: "322_185_bce", dateKey: "home.timeline.proto.322_185_bce.date", textKey: "home.timeline.proto.322_185_bce.text" },
 { id: "200_320_ce", dateKey: "home.timeline.proto.200_320_ce.date", textKey: "home.timeline.proto.200_320_ce.text" },
 { id: "c500_ce", dateKey: "home.timeline.proto.c500_ce.date", textKey: "home.timeline.proto.c500_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.formation.era",
 entries: [
 { id: "500_530_ce", dateKey: "home.timeline.formation.500_530_ce.date", textKey: "home.timeline.formation.500_530_ce.text" },
 { id: "530_570_ce", dateKey: "home.timeline.formation.530_570_ce.date", textKey: "home.timeline.formation.530_570_ce.text" },
 { id: "570_620_ce", dateKey: "home.timeline.formation.570_620_ce.date", textKey: "home.timeline.formation.570_620_ce.text" },
 { id: "620_650_ce", dateKey: "home.timeline.formation.620_650_ce.date", textKey: "home.timeline.formation.620_650_ce.text" },
 { id: "650_680_ce", dateKey: "home.timeline.formation.650_680_ce.date", textKey: "home.timeline.formation.650_680_ce.text" },
 { id: "680_720_ce", dateKey: "home.timeline.formation.680_720_ce.date", textKey: "home.timeline.formation.680_720_ce.text" },
 { id: "720_ce", dateKey: "home.timeline.formation.720_ce.date", textKey: "home.timeline.formation.720_ce.text", isMajor: true },
 ],
 },

 {
 eraKey: "home.timeline.imperial.era",
 entries: [
 { id: "730_ce", dateKey: "home.timeline.imperial.730_ce.date", textKey: "home.timeline.imperial.730_ce.text" },
 { id: "738_ce", dateKey: "home.timeline.imperial.738_ce.date", textKey: "home.timeline.imperial.738_ce.text" },
 { id: "750_780_ce", dateKey: "home.timeline.imperial.750_780_ce.date", textKey: "home.timeline.imperial.750_780_ce.text" },
 { id: "800_830_ce", dateKey: "home.timeline.imperial.800_830_ce.date", textKey: "home.timeline.imperial.800_830_ce.text" },
 { id: "836_ce", dateKey: "home.timeline.imperial.836_ce.date", textKey: "home.timeline.imperial.836_ce.text" },
 { id: "850_885_ce", dateKey: "home.timeline.imperial.850_885_ce.date", textKey: "home.timeline.imperial.850_885_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.regional.era",
 entries: [
 { id: "900_950_ce", dateKey: "home.timeline.regional.900_950_ce.date", textKey: "home.timeline.regional.900_950_ce.text" },
 { id: "950_1000_ce", dateKey: "home.timeline.regional.950_1000_ce.date", textKey: "home.timeline.regional.950_1000_ce.text" },
 { id: "1000_1050_ce", dateKey: "home.timeline.regional.1000_1050_ce.date", textKey: "home.timeline.regional.1000_1050_ce.text" },
 { id: "1050_1100_ce", dateKey: "home.timeline.regional.1050_1100_ce.date", textKey: "home.timeline.regional.1050_1100_ce.text" },
 { id: "1100_1150_ce", dateKey: "home.timeline.regional.1100_1150_ce.date", textKey: "home.timeline.regional.1100_1150_ce.text" },
 { id: "1150_1200_ce", dateKey: "home.timeline.regional.1150_1200_ce.date", textKey: "home.timeline.regional.1150_1200_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.invasion.era",
 entries: [
 { id: "1001_1027_ce", dateKey: "home.timeline.invasion.1001_1027_ce.date", textKey: "home.timeline.invasion.1001_1027_ce.text" },
 { id: "1050_1100_ce", dateKey: "home.timeline.invasion.1050_1100_ce.date", textKey: "home.timeline.invasion.1050_1100_ce.text" },
 { id: "1080_1143_ce", dateKey: "home.timeline.invasion.1080_1143_ce.date", textKey: "home.timeline.invasion.1080_1143_ce.text" },
 { id: "1177_ce", dateKey: "home.timeline.invasion.1177_ce.date", textKey: "home.timeline.invasion.1177_ce.text" },
 { id: "1191_ce", dateKey: "home.timeline.invasion.1191_ce.date", textKey: "home.timeline.invasion.1191_ce.text", isMajor: true },
 { id: "1192_ce", dateKey: "home.timeline.invasion.1192_ce.date", textKey: "home.timeline.invasion.1192_ce.text", isMajor: true },
 ],
 },

 {
 eraKey: "home.timeline.sultanate.era",
 entries: [
 { id: "1206_ce", dateKey: "home.timeline.sultanate.1206_ce.date", textKey: "home.timeline.sultanate.1206_ce.text" },
 { id: "1220_1250_ce", dateKey: "home.timeline.sultanate.1220_1250_ce.date", textKey: "home.timeline.sultanate.1220_1250_ce.text" },
 { id: "1303_ce", dateKey: "home.timeline.sultanate.1303_ce.date", textKey: "home.timeline.sultanate.1303_ce.text", isMajor: true },
 { id: "1311_ce", dateKey: "home.timeline.sultanate.1311_ce.date", textKey: "home.timeline.sultanate.1311_ce.text" },
 { id: "1326_ce", dateKey: "home.timeline.sultanate.1326_ce.date", textKey: "home.timeline.sultanate.1326_ce.text" },
 { id: "1350_ce", dateKey: "home.timeline.sultanate.1350_ce.date", textKey: "home.timeline.sultanate.1350_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.sisodia.era",
 entries: [
 { id: "1433_ce", dateKey: "home.timeline.sisodia.1433_ce.date", textKey: "home.timeline.sisodia.1433_ce.text" },
 { id: "1440_1468_ce", dateKey: "home.timeline.sisodia.1440_1468_ce.date", textKey: "home.timeline.sisodia.1440_1468_ce.text" },
 { id: "1450_1470_ce", dateKey: "home.timeline.sisodia.1450_1470_ce.date", textKey: "home.timeline.sisodia.1450_1470_ce.text" },
 { id: "1473_ce", dateKey: "home.timeline.sisodia.1473_ce.date", textKey: "home.timeline.sisodia.1473_ce.text", isMajor: true },
 { id: "1508_ce", dateKey: "home.timeline.sisodia.1508_ce.date", textKey: "home.timeline.sisodia.1508_ce.text" },
 { id: "1527_ce", dateKey: "home.timeline.sisodia.1527_ce.date", textKey: "home.timeline.sisodia.1527_ce.text", isMajor: true },
 { id: "1530_ce", dateKey: "home.timeline.sisodia.1530_ce.date", textKey: "home.timeline.sisodia.1530_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.mughal.era",
 entries: [
 { id: "1567_1568_ce", dateKey: "home.timeline.mughal.1567_1568_ce.date", textKey: "home.timeline.mughal.1567_1568_ce.text", isMajor: true },
 { id: "1576_ce", dateKey: "home.timeline.mughal.1576_ce.date", textKey: "home.timeline.mughal.1576_ce.text", isMajor: true },
 { id: "1577_ce", dateKey: "home.timeline.mughal.1577_ce.date", textKey: "home.timeline.mughal.1577_ce.text", isMajor: true },
 { id: "1582_ce", dateKey: "home.timeline.mughal.1582_ce.date", textKey: "home.timeline.mughal.1582_ce.text", isMajor: true },
 { id: "1597_ce", dateKey: "home.timeline.mughal.1597_ce.date", textKey: "home.timeline.mughal.1597_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.shadow.era",
 entries: [
 { id: "1540_1562_ce", dateKey: "home.timeline.shadow.1540_1562_ce.date", textKey: "home.timeline.shadow.1540_1562_ce.text" },
 { id: "1600_1650_ce", dateKey: "home.timeline.shadow.1600_1650_ce.date", textKey: "home.timeline.shadow.1600_1650_ce.text" },
 { id: "1638_ce", dateKey: "home.timeline.shadow.1638_ce.date", textKey: "home.timeline.shadow.1638_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.late.era",
 entries: [
 { id: "1615_ce", dateKey: "home.timeline.late.1615_ce.date", textKey: "home.timeline.late.1615_ce.text" },
 { id: "1679_ce", dateKey: "home.timeline.late.1679_ce.date", textKey: "home.timeline.late.1679_ce.text" },
 { id: "1679_1707_ce", dateKey: "home.timeline.late.1679_1707_ce.date", textKey: "home.timeline.late.1679_1707_ce.text" },
 { id: "1707_ce", dateKey: "home.timeline.late.1707_ce.date", textKey: "home.timeline.late.1707_ce.text" },
 { id: "1720_1750_ce", dateKey: "home.timeline.late.1720_1750_ce.date", textKey: "home.timeline.late.1720_1750_ce.text" },
 ],
 },

 {
 eraKey: "home.timeline.colonial.era",
 entries: [
 { id: "1822_ce", dateKey: "home.timeline.colonial.1822_ce.date", textKey: "home.timeline.colonial.1822_ce.text" },
 { id: "1857_ce", dateKey: "home.timeline.colonial.1857_ce.date", textKey: "home.timeline.colonial.1857_ce.text" },
 { id: "1947_ce", dateKey: "home.timeline.colonial.1947_ce.date", textKey: "home.timeline.colonial.1947_ce.text" },
 { id: "1948_1949_ce", dateKey: "home.timeline.colonial.1948_1949_ce.date", textKey: "home.timeline.colonial.1948_1949_ce.text", isMajor: true },
 { id: "1956_ce", dateKey: "home.timeline.colonial.1956_ce.date", textKey: "home.timeline.colonial.1956_ce.text", isMajor: true },
 ],
 },
];

const CLAN_DATA = [
 {
 id: "pratihara",
    name: "home.clans.pratihara.name",
    motif: "home.clans.pratihara.motif",
    description: "home.clans.pratihara.desc",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <path d="M70,30 C70,19 61,10 50,10 C39,10 30,19 30,30 C30,35 32,40 35,43 C34,45 33,48 33,51 C33,59 40,66 48,66 C49,66 50,66 51,66 C52,74 55,82 59,89 C61,93 65,94 67,91 C69,89 68,85 66,82 C63,75 61,69 60,62 C65,60 69,55 69,49 C69,46 68,43 67,41 C70,38 72,34 72,29 Z" />
 </svg>
 )
 },
 {
 id: "parmar",
    name: "home.clans.parmar.name",
    motif: "home.clans.parmar.motif",
    description: "home.clans.parmar.desc",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <path d="M50,10 Q30,40 30,60 Q30,85 50,85 Q70,85 70,60 Q70,40 50,10 Z M50,25 Q60,45 60,60 Q60,75 50,75 Q40,75 40,60 Q40,45 50,25 Z" />
 </svg>
 )
 },
 {
 id: "chauhan",
    name: "home.clans.chauhan.name",
    motif: "home.clans.chauhan.motif",
    description: "home.clans.chauhan.desc",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <path d="M30,20 Q80,50 30,80 M25,50 L85,50 M75,40 L85,50 L75,60" stroke="currentColor" strokeWidth="3" fill="none" />
 </svg>
 )
 },
 {
 id: "solanki",
    name: "home.clans.solanki.name",
    motif: "home.clans.solanki.motif",
    description: "home.clans.solanki.desc",
 symbol: (
 <svg viewBox="0 0 100 100" className="w-full h-full text-imperial-gold opacity-50" fill="currentColor">
 <circle cx="50" cy="50" r="15" />
 <path d="M50,10 L50,25 M50,75 L50,90 M10,50 L25,50 M75,50 L90,50 M22,22 L32,32 M68,68 L78,78 M22,78 L32,68 M68,32 L78,22" stroke="currentColor" strokeWidth="3" />
 </svg>
 )
 }
];

type Warrior = { name: string; hindiName?: string; region?: string; hindiRegion?: string; image: string };
const MALE_WARRIORS: Warrior[] = [
 { name: "Maharana Pratap", hindiName: "महाराणा प्रताप", region: "Mewar", hindiRegion: "मेवाड़", image: "/images/dynasties/maharana-pratap.jpg" },
 { name: "Rana Kumbha", hindiName: "राणा कुम्भा", region: "Mewar", hindiRegion: "मेवाड़", image: "/images/dynasties/rana-kumbha.jpg" },
 { name: "Prithviraj Chauhan", hindiName: "पृथ्वीराज चौहान", region: "Ajmer–Delhi", hindiRegion: "अजमेर–दिल्ली", image: "/images/dynasties/prithviraj-chauhan.jpg" },
 { name: "Rao Maldeo Rathore", hindiName: "राव मालदेव राठौड़", region: "Marwar", hindiRegion: "मारवाड़", image: "/images/dynasties/rao-maldeo.jpg" },
 { name: "Rana Sanga", hindiName: "राणा सांगा", region: "Mewar", hindiRegion: "मेवाड़", image: "/images/dynasties/rana-sanga.jpg" },
 { name: "Bappa Rawal", hindiName: "बप्पा रावल", region: "Guhila", hindiRegion: "गुहिल", image: "/images/dynasties/bappa-rawal.jpg" },
 { name: "Hammir Dev Chauhan", hindiName: "हम्मीर देव चौहान", region: "Ranthambore", hindiRegion: "रणथंभौर", image: "/images/dynasties/hammir-dev.jpg" },
 { name: "Maharaja Suraj Mal", hindiName: "महाराजा सूरज मल", region: "Bharatpur", hindiRegion: "भरतपुर", image: "/images/dynasties/maharaja-surajmal.jpg" },
 { name: "Rao Jodha", hindiName: "राव जोधा", region: "Marwar", hindiRegion: "मारवाड़", image: "/images/dynasties/rao-jodha.jpg" },
 { name: "Rana Raj Singh", hindiName: "राणा राज सिंह", region: "Mewar", hindiRegion: "मेवाड़", image: "/images/dynasties/rana-raj-singh.jpg" },
 { name: "Mirza Raja Man Singh", hindiName: "मिर्जा राजा मान सिंह", region: "Amer", hindiRegion: "आमेर", image: "/images/dynasties/man-singh.jpg" },
 { name: "Maharaja Jaswant Singh", hindiName: "महाराजा जसवंत सिंह", region: "Marwar", hindiRegion: "मारवाड़", image: "/images/dynasties/jaswant-singh.jpg" },
 { name: "Sawai Jai Singh", hindiName: "सवाई जय सिंह", region: "Jaipur", hindiRegion: "जयपुर", image: "/images/dynasties/sawai-jai-singh.jpg" },
];

const FEMALE_WARRIORS: Warrior[] = [
 { name: "Rani Padmini", hindiName: "रानी पद्मिनी", region: "Mewar", hindiRegion: "मेवाड़", image: "/images/dynasties/rani-padmini.jpg" },
 { name: "Rani Karnavati", hindiName: "रानी कर्णावती", region: "Mewar", hindiRegion: "मेवाड़", image: "/images/dynasties/rani-karnavati.jpg" },
 { name: "Rani Durgavati", hindiName: "रानी दुर्गावती", region: "Gondwana", hindiRegion: "गोंडवाना", image: "/images/dynasties/rani-durgavati.jpg" },
 { name: "Hadi Rani", hindiName: "हाड़ी रानी", region: "Rajasthan", hindiRegion: "राजस्थान", image: "/images/dynasties/hadi-rani.jpg" },
 { name: "Rani Avantibai Lodhi", hindiName: "रानी अवंतीबाई लोधी", region: "Ramgarh", hindiRegion: "रामगढ़", image: "/images/dynasties/rani-avantibai.jpg" },
 { name: "Rani Tarabai", hindiName: "रानी ताराबाई", region: "Maratha", hindiRegion: "मराठा", image: "/images/dynasties/rani-tarabai.jpg" },
 { name: "Rani Ahilyabai Holkar", hindiName: "रानी अहिल्याबाई होल्कर", region: "Malwa", hindiRegion: "मालवा", image: "/images/dynasties/ahilyabai-holkar.jpg" },
 { name: "Rani Kamlapati", hindiName: "रानी कमलापति", region: "Gond", hindiRegion: "गोंड", image: "/images/dynasties/rani-kamlapati.jpg" },
 { name: "Rani Lakshmibai", hindiName: "रानी लक्ष्मीबाई", region: "Jhansi", hindiRegion: "झांसी", image: "/images/dynasties/rani-lakshmibai.jpg" }
];

type StateEntry = { name: string; hindiName: string; image: string };

function StateCard({ state }: { state: StateEntry }) {
  const { currentLanguage } = useLanguage();
  const displayName = currentLanguage === 'hi' ? state.hindiName : state.name;
  return (
    <div className="aspect-square border border-royal-silver flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
      <div className="w-24 h-24 md:w-32 md:h-32 relative mb-2">
        <LazyImage fill src={state.image} alt={displayName} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]" />
      </div>
      <div className="inscription-subtext text-center">{displayName}</div>
    </div>
  );
}

function Carousel({ items, slower = false }: { items: Warrior[]; slower?: boolean }) {
 const { currentLanguage } = useLanguage();
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
 const displayName = currentLanguage === 'hi' ? (item.hindiName ?? item.name) : item.name;
 const displayRegion = currentLanguage === 'hi' ? (item.hindiRegion ?? item.region) : item.region;
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
  aria-label={displayName}
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
  alt={displayName}
  className="w-full h-full object-cover"
  />
  </div>
 </div>

 {/* Fixed Caption Container */}
 <div className="mt-6 relative z-10 h-[80px] w-full flex flex-col items-center justify-start text-center">
  <div className="inscription-text text-xl min-h-[40px] flex items-center justify-center w-full px-2">
  {displayName}
  </div>
  <div className="inscription-subtext mt-2 w-full text-center">
  {displayRegion || ""}
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
    title: "home.origins.title",
 eraIndex: 1,
 content: (
 <div className="space-y-8">
<p className="text-xl leading-relaxed"><TransText k="home.origins.body1" /></p>
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
<h3 className={`text-2xl font-bold text-shehrawat-blood-red mb-3 tracking-wider uppercase ${cinzel.className}`}><TransText k="home.origins.agnikula.title" /></h3>
<p className="text-xl text-ink-black/90 leading-relaxed font-medium drop-shadow-sm"><TransText k="home.origins.agnikula.desc" /></p>
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
<h3 className={`text-2xl font-bold text-imperial-gold mb-3 tracking-wider uppercase ${cinzel.className}`}><TransText k="home.origins.suryavanshi.title" /></h3>
<p className="text-xl text-ink-black/90 leading-relaxed font-medium drop-shadow-sm"><TransText k="home.origins.suryavanshi.desc" /></p>
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
<h3 className={`text-1xl font-bold text-imperial-gold mb-3 tracking-wider uppercase ${cinzel.className}`}><TransText k="home.origins.chandravanshi.title" /></h3>
<p className="text-xl text-ink-black/90 leading-relaxed font-medium drop-shadow-sm"><TransText k="home.origins.chandravanshi.desc" /></p>
 </div>
 </div>
 </div>
 </div>
<p className="text-xl leading-relaxed"><TransText k="home.origins.body2" /></p>
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
    title: "home.ascendancy.title",
 eraIndex: 2,
 content: (
 <div className="space-y-12">
        <p className="text-xl leading-relaxed"><TransText k="home.ascendancy.body" /></p>
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
  <div className="text-antique-gold text-lg tracking-widest uppercase font-semibold opacity-80"><TransText k={clan.motif} /></div>
  <h3 className={`text-3xl text-shehrawat-blood-red font-bold ${cinzel.className}`}><TransText k={clan.name} /></h3>
  <div className="w-12 h-px bg-imperial-gold/40 mx-auto my-2"></div>
  <p className="text-xl text-ink-black/80 font-serif italic leading-relaxed max-w-xs mx-auto"><TransText k={clan.description} /></p>
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
    title: "home.kingdoms.title",
 eraIndex: 3,
 content: (
 <>
 <div className="space-y-20">

 {/* MEWAR */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
 <div className="space-y-4">
              <h3 className={`text-3xl ${cinzel.className}`}><TransText k="home.kingdoms.mewar.title" /></h3>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.mewar.p1" /></p>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.mewar.p2" /></p>
 <Link href="/dynasties#mewar-sisodia" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
              <TransText k="home.kingdoms.mewar.cta" /> <span className="text-sm">→</span>
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
              <h3 className={`text-3xl ${cinzel.className}`}><TransText k="home.kingdoms.marwar.title" /></h3>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.marwar.p1" /></p>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.marwar.p2" /></p>
 <Link href="/dynasties#marwar-rathore" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
              <TransText k="home.kingdoms.marwar.cta" /> <span className="text-sm">→</span>
 </Link>
 </div>
 </div>

 {/* AMBER */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
 
 <div className="space-y-4">
              <h3 className={`text-3xl ${cinzel.className}`}><TransText k="home.kingdoms.amber.title" /></h3>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.amber.p1" /></p>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.amber.p2" /></p>
 <Link href="/dynasties#amber-kachwaha" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
              <TransText k="home.kingdoms.amber.cta" /> <span className="text-sm">→</span>
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
              <h3 className={`text-3xl ${cinzel.className}`}><TransText k="home.kingdoms.jaisalmer.title" /></h3>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.jaisalmer.p1" /></p>
              <p className="text-xl opacity-80"><TransText k="home.kingdoms.jaisalmer.p2" /></p>
 <Link href="/dynasties#jaisalmer-bhati" className="text-shehrawat-blood-red text-lg font-bold flex items-center gap-2 mt-4 hover:underline">
              <TransText k="home.kingdoms.jaisalmer.cta" /> <span className="text-sm">→</span>
 </Link>
 </div>
 </div>

 </div>
 </>
 ),
 },

 { 
 id: "battles", 
 title: "home.battles.title", 
 eraIndex: 4, 
 text: "home.battles.summary",
 content: ( 
 <div className="space-y-32"> 
 
 {/* ================= HALDIGHATI ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
 <h3 className={`text-3xl ${cinzel.className}`}> 
 <TransText k="home.battles.haldighati.title" />
 </h3> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.stakes" /></div> 
 <p className="text-xl opacity-80"> 
 <TransText k="home.battles.haldighati.stakesValue" />
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.decision" /></div> 
 <p className="text-xl opacity-80"> 
 <TransText k="home.battles.haldighati.decisionValue" />
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.consequence" /></div> 
 <p className="text-xl opacity-80"> 
 <TransText k="home.battles.haldighati.consequenceValue" />
 </p> 
            <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
            <TransText k="home.battles.moreInfo" /> <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
 </div> 
 </div> 
 
 {/* ================= DEWAIR ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
            <h3 className={`text-3xl ${cinzel.className}`}><TransText k="home.battles.dewair.title" /></h3> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.stakes" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.dewair.stakesValue" /></p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.decision" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.dewair.decisionValue" /></p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.consequence" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.dewair.consequenceValue" /></p>
            <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
            <TransText k="home.battles.moreInfo" /> <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link> 
 </div> 
 </div> 
 
 {/* ================= TARAIN ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
            <h3 className={`text-3xl ${cinzel.className}`}><TransText k="home.battles.tarain.title" /></h3> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.stakes" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.tarain.stakesValue" /></p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.decision" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.tarain.decisionValue" /></p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.consequence" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.tarain.consequenceValue" /></p> 
            <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
            <TransText k="home.battles.moreInfo" /> <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link> 
 </div> 
 </div> 
 
 {/* ================= CHITTORGARH ================= */} 
 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
 <h3 className={`text-3xl ${cinzel.className}`}> 
 <TransText k="home.battles.chittorgarh.title" />
 </h3> 
 <div className="uppercase text-base tracking-widest opacity-60"> 
 <TransText k="home.battles.stakes" />
 </div> 
 <p className="text-xl opacity-80"> 
 <TransText k="home.battles.chittorgarh.stakesValue" />
 </p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.decision" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.chittorgarh.decisionValue" /></p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.consequence" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.chittorgarh.consequenceValue1" /></p>
            <p className="text-xl opacity-80"><TransText k="home.battles.chittorgarh.consequenceValue2" /></p>
            <Link href="/battles" className="inline-flex items-center gap-2 text-shehrawat-blood-red font-bold hover:underline mt-2 group">
            <TransText k="home.battles.moreInfo" /> <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
 
 </div> 
 </div> 
 

 <div className="relative grid grid-cols-1 md:grid-cols-12 gap-x-8"> 
 <div className="md:col-span-3 space-y-3"> 
            <h3 className={`text-3xl ${cinzel.className}`}><TransText k="home.battles.ranthambore.title" /></h3> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.stakes" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.ranthambore.stakesValue" /></p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-3 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.decision" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.ranthambore.decisionValue" /></p> 
 </div> 
 
 <div className="hidden md:flex justify-center md:col-span-1"> 
 <div className="w-px h-24 bg-imperial-gold" /> 
 </div> 
 
 <div className="mt-6 md:mt-0 md:col-span-4 space-y-3"> 
            <div className="uppercase text-base tracking-widest opacity-60"><TransText k="home.battles.consequence" /></div> 
            <p className="text-xl opacity-80"><TransText k="home.battles.ranthambore.consequenceValue1" /></p> 
            <p className="text-xl opacity-80"><TransText k="home.battles.ranthambore.consequenceValue2" /></p> 
 </div> 
 </div>
 
 </div> 
 ), 
 },

 {
 id: "states",
 title: "home.states.title",
 eraIndex: 9,
 text: "home.states.summary",
 content: (
 <div className="space-y-6">
 <p className="text-xl leading-relaxed">
  <TransText k="home.states.intro" />
 </p>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {([
 { name: "Mewar (Udaipur)", hindiName: "मेवाड़ (उदयपुर)", image: "/images/home/external/Coat_of_arms_of_Udaipur_State.png" },
 { name: "Marwar (Jodhpur)", hindiName: "मारवाड़ (जोधपुर)", image: "/images/home/external/CoA_Jodhpur_1893.png" },
 { name: "Amber (Jaipur)", hindiName: "आमेर (जयपुर)", image: "/images/home/external/amer.jpg" },
 { name: "Bikaner", hindiName: "बीकानेर", image: "/images/home/external/bikaner_coa.png" },
 { name: "Jaisalmer", hindiName: "जैसलमेर", image: "/images/home/external/Jaisalmer_Royal_COA.png" },
 { name: "Kota", hindiName: "कोटा", image: "/images/home/external/Kota_State_CoA.png" },
 { name: "Bundi", hindiName: "बूंदी", image: "/images/home/external/bundi_coa.png" },
 { name: "Alwar", hindiName: "अलवर", image: "/images/home/external/alwar1010_thumb.webp" },
 { name: "Sirohi", hindiName: "सिरोही", image: "/images/home/external/sirohi_coa.png" },
 { name: "Banswara", hindiName: "बांसवाड़ा", image: "/images/home/external/banswara_coa.png" },
 { name: "Jhalawar", hindiName: "झालावाड़", image: "/images/home/external/images (1).jpg" },
 { name: "Karauli", hindiName: "करौली", image: "/images/home/external/images (2).jpg" },
 { name: "Bharatpur", hindiName: "भरतपुर", image: "/images/dynasties/maharaja-surajmal.jpg" },
 { name: "Dholpur", hindiName: "धौलपुर", image: "/images/home/external/images (3).jpg" },
 { name: "Tonk", hindiName: "टोंक", image: "/images/home/external/images.jpg" },
 { name: "Dungarpur", hindiName: "डूंगरपुर", image: "/images/home/external/dungarpur.jpg" },
 { name: "Pratapgarh", hindiName: "प्रतापगढ़", image: "/images/home/external/pratapgarh.jpg" },
 { name: "Shahpura", hindiName: "शाहपुरा", image: "/images/home/external/shahpura-arms.jpg" },
 { name: "Kishangarh", hindiName: "किशनगढ़", image: "/images/home/external/kishangarh.jpg" },
 { name: "Rewa", hindiName: "रीवा", image: "/images/home/external/rewa.jpg" },
 { name: "Orchha", hindiName: "ओरछा", image: "/images/home/external/orchha.jpg" },
 { name: "Ratlam", hindiName: "रतलाम", image: "/images/home/external/ratlam.jpg" },
 { name: "Idar", hindiName: "ईडर", image: "/images/home/external/idar.jpg" },
 { name: "Nawanagar", hindiName: "नवानगर", image: "/images/home/external/Nawanagar_State_CoA.jpg" },
 ] as StateEntry[]).map((state, i) => (
  <StateCard key={i} state={state} />
 ))}
 </div>
 </div>
 ),
 },
 {
 id: "ethos",
    title: "home.ethos.title",
 eraIndex: 9,
    text: "home.ethos.summary",
 content: (
 <div className="relative w-full">
 <div className="relative z-10 w-full">
 <div className="max-w-[1800px] mx-auto px-6 md:px-16">
 <div className="w-full lg:w-3/4 mb-12">
    <div className={`manuscript-title ${cinzel.className} text-3xl md:text-4xl tracking-[0.2em] mb-4`}>
    <TransText k="home.ethos.heading" />
    </div>
    <p className="max-w-3xl text-base md:text-lg opacity-85 tracking-wide">
    <TransText k="home.ethos.body" />
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
 title: "home.culture.title",
 eraIndex: 9,
 text: "home.culture.summary",
 content: (
 <div className="w-full flex flex-col">
  {/* 1. FULL-WIDTH ROYAL COLLAGE STRIP (70vh) */}
 <div className="relative w-full h-[70vh] overflow-hidden bg-royal-ivory select-none">
 {/* Collage Grid - Controlled Asymmetry */}
 <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-0 opacity-90">
 {/* Large Left Block - Palace/Durbar */}
 <div className="col-span-5 row-span-6 relative">
  <LazyImage
  src="/images/forts/mehrangarh/500px-Mehrangarh_Fort.jpg"
  alt="Royal Durbar"
  className="w-full h-full object-cover object-center filter sepia-[0.4] saturate-[0.8] contrast-[1.1]"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-royal-ivory/20 via-transparent to-royal-ivory/80"></div>
 </div>

 {/* Center Strip - Weapons & Rituals */}
 <div className="col-span-4 row-span-6 flex flex-col">
  <div className="h-1/2 relative">
  <LazyImage
  src="/images/festivals/gangaur-mela.jpg"
  alt="Rajput Weapons"
  className="w-full h-full object-cover object-center filter sepia-[0.5] saturate-[0.6]"
  />
  <div className="absolute inset-0 bg-royal-ivory/10 mix-blend-multiply"></div>
  </div>
  <div className="h-1/2 relative">
  <LazyImage
  src="/images/festivals/marwar-festival.jpg"
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
  src="/images/dynasties/rulers/sawai-jai-singh.jpg"
  alt="Royal Attire"
  className="w-full h-full object-cover object-top filter sepia-[0.3] saturate-[0.8]"
  />
  <div className="absolute inset-0 bg-gradient-to-l from-royal-ivory/30 via-transparent to-transparent"></div>
  </div>
  <div className="h-1/3 relative">
  <LazyImage
  src="/images/festivals/desert-festival-jaisalmer.jpg"
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
  <TransText k="home.culture.title" />
  </h2>
  <motion.div 
  initial={{ width: 0 }}
  whileInView={{ width: "60%" }}
  transition={{ duration: 1.5, delay: 0.5 }}
  className="h-[4px] bg-imperial-gold mx-auto mb-6 shadow-sm"
  />
  <h3 className={`text-xl md:text-2xl text-ink-black/80 font-serif italic tracking-widest`}>
  <TransText k="home.culture.subtitle" />
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
  <TransText k="home.culture.weapons.title" />
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif"><TransText k="home.culture.weapons.p1" /></p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed mb-auto"><TransText k="home.culture.weapons.p2" /></p>
  <div className="mt-4 text-shehrawat-blood-red font-bold uppercase tracking-wider text-sm flex items-center gap-2">
  <TransText k="common.readMore" /> <span className="text-lg">→</span>
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
  <TransText k="home.culture.dress.title" />
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif"><TransText k="home.culture.dress.p1" /></p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed"><TransText k="home.culture.dress.p2" /></p>
 </motion.div>

 {/* MUSIC */}
 <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1, delay: 0.6 }}
  className="px-8 md:px-12 py-8 border-r-0 md:border-r border-imperial-gold/30 flex flex-col justify-start h-full"
 >
  <h4 className={`text-3xl font-bold text-shehrawat-blood-red mb-6 tracking-widest uppercase ${cinzel.className}`}>
  <TransText k="home.culture.music.title" />
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif"><TransText k="home.culture.music.p1" /></p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed"><TransText k="home.culture.music.p2" /></p>
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
  <TransText k="home.culture.rituals.title" />
  </h4>
  <p className="text-xl md:text-2xl font-bold text-ink-black mb-4 leading-tight font-serif"><TransText k="home.culture.rituals.p1" /></p>
  <p className="text-sm md:text-base text-ink-black/70 font-medium uppercase tracking-wider leading-relaxed mb-auto"><TransText k="home.culture.rituals.p2" /></p>
  <div className="mt-4 text-shehrawat-blood-red font-bold uppercase tracking-wider text-sm flex items-center gap-2">
  <TransText k="common.readMore" /> <span className="text-lg">→</span>
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
    title: "home.modern.title",
 eraIndex: 9,
    text: "home.modern.summary",
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
  <h2 className={`text-5xl md:text-6xl font-black text-[#5c0b12] uppercase tracking-wider leading-none ${cinzel.className}`}><TransText k="home.modern.title" /></h2>
  <div className={`text-sm md:text-base text-antique-gold font-bold tracking-[0.2em] uppercase mt-3 ${cinzel.className}`}>
  <TransText k="home.modern.period" />
  </div>
 </motion.div>

 <motion.div 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1, delay: 0.3 }}
  className="space-y-8 text-lg md:text-xl text-ink-black/90 font-medium leading-relaxed"
 >
  <p><TransText k="home.modern.p1" /></p>
  <p><TransText k="home.modern.p2" /></p>
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
 <span className={`text-xs tracking-[0.2em] uppercase text-ink-black/60 ${cinzel.className}`}><TransText k="home.legacyContinues" /></span>
 <div className="h-12 w-px bg-imperial-gold/50"></div>
 </motion.div>
 </div>
 ),
 }
];

export default function HistoryPage() {
 const [activeEra, setActiveEra] = useState(0);
 const { scrollYProgress } = useScroll();
 const { speak, stopSpeaking, isSpeaking, t } = useLanguage();
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
        alt={t('home.heroAlt')}
        fill
        priority
        quality={85}
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
  <TransText k={section.title} />
  {section.text && (
  <button
  onClick={(e) => {
   e.stopPropagation();
   handleListen(t(section.text!), section.id);
  }}
  className={`text-sm px-4 py-2 border rounded-full transition-all duration-300 flex items-center gap-2 ${
   listeningSection === section.id
   ? "bg-shehrawat-blood-red text-royal-ivory border-shehrawat-blood-red"
   : "border-shehrawat-blood-red/30 text-shehrawat-blood-red hover:bg-shehrawat-blood-red hover:text-royal-ivory"
  }`}
  aria-label={listeningSection === section.id ? t('audio.stop') : t('audio.play')}
  >
  {listeningSection === section.id ? (
   <>
   <StopIcon className="w-4 h-4" /> {t('audio.stop')}
   </>
  ) : (
   <>
   <VolumeIcon className="w-4 h-4" /> {t('audio.play')}
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
  {t('home.royalChronicle')}
 </h3>
 
 <div className="space-y-16">
  {TIMELINE_DATA.map((group, index) => {
  const isActive = index === activeEra;
  return (
  <div key={group.eraKey}>
  <div className="relative pl-2">
  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 ${isActive ? "bg-imperial-gold border-shehrawat-blood-red shadow-[0_0_10px_#c9a24d]" : "bg-royal-ivory border-royal-silver"}`} />
  <h4 className={`text-xl font-bold ${isActive ? "text-shehrawat-blood-red" : "text-ink-black"} ${cinzel.className}`}><TransText k={group.eraKey} /></h4>
  </div>
  <div className="mt-6 ml-4 border-l-2 border-royal-silver space-y-6 pl-3">
  {group.entries.map((e) => (
  <div key={`${group.eraKey}-${e.id}`} className="relative">
  <div className={`absolute -left-[14px] top-1.5 w-2 h-2 rotate-45 ${e.isMajor ? "bg-imperial-gold" : "bg-royal-silver"}`} />
  <div className="flex items-baseline gap-3">
  <span className="text-shehrawat-blood-red font-bold text-lg"><TransText k={e.dateKey} /></span>
  <span className="text-ink-black text-lg"><TransText k={e.textKey} /></span>
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
  {t(TIMELINE_DATA[activeEra]?.eraKey || 'home.royalChronicle')}
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
   <TransText k={section.title} />
   </h2>
   {section.text && (
    <button
    onClick={(e) => {
    e.stopPropagation();
    handleListen(t(section.text!), section.id);
    }}
    className={`text-sm px-4 py-2 border rounded-full transition-all duration-300 flex items-center gap-2 ${
    listeningSection === section.id
    ? "bg-shehrawat-blood-red text-royal-ivory border-shehrawat-blood-red"
    : "border-shehrawat-blood-red/30 text-shehrawat-blood-red hover:bg-shehrawat-blood-red hover:text-royal-ivory"
    }`}
    aria-label={listeningSection === section.id ? t('audio.stop') : t('audio.play')}
    >
    {listeningSection === section.id ? (
    <>
    <StopIcon className="w-4 h-4" /> {t('audio.stop')}
    </>
    ) : (
    <>
    <VolumeIcon className="w-4 h-4" /> {t('audio.play')}
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
   <TransText k={section.title} />
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
