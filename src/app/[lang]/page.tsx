"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  BowArrow,
  Castle,
  ChevronLeft,
  ChevronRight,
  Crown,
  Feather,
  Flame,
  Moon,
  Music,
  Shield,
  Shirt,
  Star,
  Sun,
  Swords,
} from "lucide-react";

import Image from "next/image";
import LazyImage from "@/app/components/LazyImage";
import TransText from "@/app/components/TransText";
import SectionHeading from "@/app/components/SectionHeading";
import { useLanguage } from "@/app/components/LanguageProvider";
import LocalizedLink from "@/app/components/LocalizedLink";
import {
  BloodStain,
  Embers,
  Mist,
  ParchmentTexture,
  SandCloud,
  TornEdge,
  Vignette,
} from "@/app/components/atmosphere";

/** Reveal stagger: sets the `--r` delay consumed by `.reveal` in globals.css. */
const stagger = (ms: number) => ({ "--r": `${ms}ms` }) as React.CSSProperties;

/** Roman numeral for the chronicle era tabs (presentation only). */
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

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

// ---------- 4.4 clan banners ----------
const CLAN_DATA = [
 {
 id: "pratihara",
 name: "home.clans.pratihara.name",
 motif: "home.clans.pratihara.motif",
 description: "home.clans.pratihara.desc",
 bar: "var(--bronze)",
 symbol: (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M4 16a6 6 0 0 1 6-6h3a5 5 0 0 1 5 5" />
 <path d="M4 16v3" />
 <path d="M10 16v3" />
 <path d="M16 16v3" />
 <path d="M18 12c2.2 0 4 1.8 4 4s-1.8 4-4 4" />
 <path d="M10 10a4 4 0 0 1 7-2.6" />
 </svg>
 )
 },
 {
 id: "parmar",
 name: "home.clans.parmar.name",
 motif: "home.clans.parmar.motif",
 description: "home.clans.parmar.desc",
 bar: "var(--blood)",
 symbol: <Flame aria-hidden="true" />
 },
 {
 id: "chauhan",
 name: "home.clans.chauhan.name",
 motif: "home.clans.chauhan.motif",
 description: "home.clans.chauhan.desc",
 bar: "var(--saffron)",
 symbol: <BowArrow aria-hidden="true" />
 },
 {
 id: "solanki",
 name: "home.clans.solanki.name",
 motif: "home.clans.solanki.motif",
 description: "home.clans.solanki.desc",
 bar: "var(--steel)",
 symbol: <Sun aria-hidden="true" />
 }
];

type Warrior = { name: string; hindiName: string; region: string; hindiRegion: string; image: string };
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

/** LazyImage whose alt text comes from the UI dictionary (usable in module-level JSX). */
function TImage({ altKey, ...props }: Omit<React.ComponentProps<typeof LazyImage>, 'alt'> & { altKey: string }) {
  const { t } = useLanguage();
  return <LazyImage {...props} alt={t(altKey)} />;
}

type StateEntry = { name: string; hindiName: string; image: string };

const STATE_ENTRIES: StateEntry[] = [
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
  { name: "Jhalawar", hindiName: "झालावाड़", image: "/images/home/external/states/jhalawar.webp" },
  { name: "Karauli", hindiName: "करौली", image: "/images/home/external/states/karauli.webp" },
  { name: "Bharatpur", hindiName: "भरतपुर", image: "/images/home/external/states/bharatpur.webp" },
  { name: "Dholpur", hindiName: "धौलपुर", image: "/images/home/external/states/dholpur.webp" },
  { name: "Tonk", hindiName: "टोंक", image: "/images/home/external/states/tonk.webp" },
  { name: "Dungarpur", hindiName: "डूंगरपुर", image: "/images/home/external/dungarpur.jpg" },
  { name: "Pratapgarh", hindiName: "प्रतापगढ़", image: "/images/home/external/pratapgarh.jpg" },
  { name: "Shahpura", hindiName: "शाहपुरा", image: "/images/home/external/shahpura-arms.jpg" },
  { name: "Kishangarh", hindiName: "किशनगढ़", image: "/images/home/external/kishangarh.jpg" },
  { name: "Rewa", hindiName: "रीवा", image: "/images/home/external/rewa.jpg" },
  { name: "Orchha", hindiName: "ओरछा", image: "/images/home/external/orchha.jpg" },
  { name: "Ratlam", hindiName: "रतलाम", image: "/images/home/external/ratlam.jpg" },
  { name: "Idar", hindiName: "ईडर", image: "/images/home/external/idar.jpg" },
  { name: "Nawanagar", hindiName: "नवानगर", image: "/images/home/external/Nawanagar_State_CoA.jpg" },
  { name: "Bhavnagar", hindiName: "भावनगर", image: "/images/home/external/states/bhavnagar.webp" },
  { name: "Dhrangadhra", hindiName: "ध्रांगध्रा", image: "/images/home/external/states/dhrangadhra.webp" },
  { name: "Gondal", hindiName: "गोंडल", image: "/images/home/external/states/gondal.webp" },
  { name: "Porbandar", hindiName: "पोरबंदर", image: "/images/home/external/states/porbandar.webp" },
  { name: "Rajkot", hindiName: "राजकोट", image: "/images/home/external/states/rajkot.webp" },
  { name: "Wankaner", hindiName: "वांकानेर", image: "/images/home/external/states/wankaner.webp" },
  { name: "Limbdi", hindiName: "लिंबड़ी", image: "/images/home/external/states/limbdi.webp" },
  { name: "Wadhwan", hindiName: "वढवाण", image: "/images/home/external/states/wadhwan.webp" },
  { name: "Palitana", hindiName: "पालीताना", image: "/images/home/external/states/palitana.webp" },
  { name: "Chuda", hindiName: "चूड़ा", image: "/images/home/external/states/chuda.webp" },
  { name: "Muli", hindiName: "मूली", image: "/images/home/external/states/muli.webp" },
  { name: "Khirasra", hindiName: "खिरसरा", image: "/images/home/external/states/khirasra.webp" },
  { name: "Rajpipla", hindiName: "राजपीपला", image: "/images/home/external/states/rajpipla.webp" },
  { name: "Chhota Udaipur", hindiName: "छोटा उदयपुर", image: "/images/home/external/states/chhota-udaipur.webp" },
  { name: "Balasinor", hindiName: "बालासिनोर", image: "/images/home/external/states/balasinor.webp" },
  { name: "Bansda", hindiName: "बांसडा", image: "/images/home/external/states/bansda.webp" },
  { name: "Baria", hindiName: "बरिया", image: "/images/home/external/states/baria.webp" },
  { name: "Lunavada", hindiName: "लुणावाड़ा", image: "/images/home/external/states/lunavada.webp" },
  { name: "Sant", hindiName: "संत", image: "/images/home/external/states/sant.webp" },
  { name: "Danta", hindiName: "डांता", image: "/images/home/external/states/danta.webp" },
  { name: "Dharampur", hindiName: "धरमपुर", image: "/images/home/external/states/dharampur.webp" },
  { name: "Jambughoda", hindiName: "जंबुघोड़ा", image: "/images/home/external/states/jambughoda.webp" },
  { name: "Radhanpur", hindiName: "राधनपुर", image: "/images/home/external/states/radhanpur.webp" },
  { name: "Kutch", hindiName: "कच्छ", image: "/images/home/external/states/kutch.webp" },
  { name: "Panna", hindiName: "पन्ना", image: "/images/home/external/states/panna.webp" },
  { name: "Charkhari", hindiName: "चरखारी", image: "/images/home/external/states/charkhari.webp" },
  { name: "Bijawar", hindiName: "बिजावर", image: "/images/home/external/states/bijawar.webp" },
  { name: "Samthar", hindiName: "समथर", image: "/images/home/external/states/samthar.webp" },
  { name: "Datia", hindiName: "दतिया", image: "/images/home/external/states/datia.webp" },
  { name: "Baraundha", hindiName: "बरौंधा", image: "/images/home/external/states/baraundha.webp" },
  { name: "Sailana", hindiName: "सैलाना", image: "/images/home/external/states/sailana.webp" },
  { name: "Sitamau", hindiName: "सीतामऊ", image: "/images/home/external/states/sitamau.webp" },
  { name: "Jhabua", hindiName: "झाबुआ", image: "/images/home/external/states/jhabua.webp" },
  { name: "Alirajpur", hindiName: "अलीराजपुर", image: "/images/home/external/states/alirajpur.webp" },
  { name: "Barwani", hindiName: "बड़वानी", image: "/images/home/external/states/barwani.webp" },
  { name: "Narsinghgarh", hindiName: "नरसिंहगढ़", image: "/images/home/external/states/narsinghgarh.webp" },
  { name: "Suket", hindiName: "सुकेत", image: "/images/home/external/states/suket.webp" },
  { name: "Sirmur (Nahan)", hindiName: "सिरमौर (नाहन)", image: "/images/home/external/states/sirmur.webp" },
  { name: "Mandi", hindiName: "मंडी", image: "/images/home/external/states/mandi.webp" },
  { name: "Kahlur (Bilaspur)", hindiName: "कहलूर (बिलासपुर)", image: "/images/home/external/states/kahlur.webp" },
  { name: "Chamba", hindiName: "चंबा", image: "/images/home/external/states/chamba.webp" },
  { name: "Kumarsain", hindiName: "कुमारसैन", image: "/images/home/external/states/kumarsain.webp" },
  { name: "Bissau", hindiName: "बिस्साऊ", image: "/images/home/external/states/bissau.webp" },
  { name: "Panarwa", hindiName: "पानरवा", image: "/images/home/external/states/panarwa.webp" },
];

const STATE_PREVIEW_COUNT = 24;

function StateCard({ state }: { state: StateEntry }) {
  const { currentLanguage } = useLanguage();
  const displayName = currentLanguage === 'hi' ? state.hindiName : state.name;
  return (
    <article className="state-tile">
      <div className="state-tile__media">
        <LazyImage fill src={state.image} alt={displayName} className="object-contain" />
      </div>
      <span className="state-tile__name">{displayName}</span>
    </article>
  );
}

/** 4.7 — engraved medallions, first 24 by default, expandable to the full roll. */
function StatesBlock() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const entries = showAll ? STATE_ENTRIES : STATE_ENTRIES.slice(0, STATE_PREVIEW_COUNT);
  return (
    <>
      <div className="state-grid">
        {entries.map((state) => (
          <StateCard key={state.name} state={state} />
        ))}
      </div>
      <div className="state-grid__toggle">
        <button
          type="button"
          className="btn btn-steel"
          aria-expanded={showAll}
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll ? t("home.states.showLess") : t("home.states.showAll")}
        </button>
      </div>
    </>
  );
}

// ---------- 4.2 explore strip ----------
const EXPLORE_ITEMS = [
  { href: "/dynasties", labelKey: "nav.dynasties", subKey: "home.explore.dynasties", Icon: Crown },
  { href: "/forts", labelKey: "nav.forts", subKey: "home.explore.forts", Icon: Castle },
  { href: "/battles", labelKey: "nav.battles", subKey: "home.explore.battles", Icon: Shield },
  { href: "/legends", labelKey: "nav.stories", subKey: "home.explore.legends", Icon: Star },
  { href: "/festivals", labelKey: "nav.festivals", subKey: "home.explore.festivals", Icon: Flame },
  { href: "/blogs", labelKey: "nav.blogs", subKey: "home.explore.blogs", Icon: Feather },
];

// ---------- 4.5 great kingdoms ----------
const KINGDOMS = [
  { id: "mewar", image: "/images/home/chittorgarh-fort.jpg", altKey: "home.alt.mewar", eyebrow: "home.kingdoms.mewar.eyebrow", title: "home.kingdoms.mewar.title", p1: "home.kingdoms.mewar.p1", period: "home.kingdoms.mewar.period", href: "/dynasties#mewar-sisodia" },
  { id: "marwar", image: "/images/home/jodhpur-fort.jpg", altKey: "home.alt.marwar", eyebrow: "home.kingdoms.marwar.eyebrow", title: "home.kingdoms.marwar.title", p1: "home.kingdoms.marwar.p1", period: "home.kingdoms.marwar.period", href: "/dynasties#marwar-rathore" },
  { id: "amber", image: "/images/home/amer-fort.webp", altKey: "home.alt.amber", eyebrow: "home.kingdoms.amber.eyebrow", title: "home.kingdoms.amber.title", p1: "home.kingdoms.amber.p1", period: "home.kingdoms.amber.period", href: "/dynasties#amber-kachwaha" },
  { id: "jaisalmer", image: "/images/home/jaisalmer-fort.jpg", altKey: "home.alt.jaisalmer", eyebrow: "home.kingdoms.jaisalmer.eyebrow", title: "home.kingdoms.jaisalmer.title", p1: "home.kingdoms.jaisalmer.p1", period: "home.kingdoms.jaisalmer.period", href: "/dynasties#jaisalmer-bhati" },
];

// ---------- 4.6 battles — war dispatches ----------
type BattleMeta = {
  id: string;
  titleKey: string;
  stakes: string;
  decision: string;
  consequence: string[];
  outcome: "win" | "loss";
  /** Period painting used as the row's 12% luminosity plate. */
  bg: string;
};

const BATTLES: BattleMeta[] = [
  { id: "haldighati", titleKey: "home.battles.haldighati.title", stakes: "home.battles.haldighati.stakesValue", decision: "home.battles.haldighati.decisionValue", consequence: ["home.battles.haldighati.consequenceValue"], outcome: "win", bg: "/images/legends/haldighati-battlefield.jpg" },
  { id: "dewair", titleKey: "home.battles.dewair.title", stakes: "home.battles.dewair.stakesValue", decision: "home.battles.dewair.decisionValue", consequence: ["home.battles.dewair.consequenceValue"], outcome: "win", bg: "/images/legends/haldighati-ridge.jpg" },
  { id: "tarain", titleKey: "home.battles.tarain.title", stakes: "home.battles.tarain.stakesValue", decision: "home.battles.tarain.decisionValue", consequence: ["home.battles.tarain.consequenceValue"], outcome: "win", bg: "/images/legends/jaipur-lancers-charge.jpg" },
  { id: "chittorgarh", titleKey: "home.battles.chittorgarh.title", stakes: "home.battles.chittorgarh.stakesValue", decision: "home.battles.chittorgarh.decisionValue", consequence: ["home.battles.chittorgarh.consequenceValue1", "home.battles.chittorgarh.consequenceValue2"], outcome: "loss", bg: "/images/legends/chittor-battlements-night.jpg" },
  { id: "ranthambore", titleKey: "home.battles.ranthambore.title", stakes: "home.battles.ranthambore.stakesValue", decision: "home.battles.ranthambore.decisionValue", consequence: ["home.battles.ranthambore.consequenceValue1", "home.battles.ranthambore.consequenceValue2"], outcome: "loss", bg: "/images/legends/desert-fort-night-watch.jpg" },
];

/** One battle as a compact dispatch: [ YEAR · VERDICT ] / PLACE / TITLE / report. */
function BattleCard({ battle, index }: { battle: BattleMeta; index: number }) {
  const { t } = useLanguage();
  const title = t(battle.titleKey);
  const open = title.indexOf("(");
  const place = open > -1 ? title.slice(0, open).trim() : title;
  const rawYear = open > -1 ? title.slice(open + 1).replace(")", "").trim() : "";
  const year = (rawYear.match(/\d{3,4}/) || [rawYear])[0];
  const won = battle.outcome === "win";
  return (
    <article className="battle-card reveal" data-reveal style={stagger((index % 2) * 80)}>
      <span className="battle-card__bg" style={{ backgroundImage: `url("${battle.bg}")` }} aria-hidden="true" />
      <div className="battle-card__head">
        <span className="battle-card__year">{year}</span>
        <span className={`chip ${won ? "chip--win" : "chip--loss"}`}>
          {won ? <TransText k="concepts.victory" /> : <TransText k="concepts.defeat" />}
        </span>
      </div>
      <p className="battle-card__place">{place}</p>
      <h3 className="battle-card__title">{title}</h3>
      <dl className="war-report">
        <div>
          <dt><TransText k="home.battles.stakes" /></dt>
          <dd><TransText k={battle.stakes} /></dd>
        </div>
        <div>
          <dt><TransText k="home.battles.decision" /></dt>
          <dd><TransText k={battle.decision} /></dd>
        </div>
        <div>
          <dt><TransText k="home.battles.consequence" /></dt>
          <dd className="war-report__clamp">
            {battle.consequence.map((key) => (
              <span key={key}><TransText k={key} />{" "}</span>
            ))}
          </dd>
        </div>
      </dl>
      <LocalizedLink href="/battles" className="btn-text battle-card__link">
        <TransText k="home.battles.moreInfo" />
      </LocalizedLink>
    </article>
  );
}

// ---------- 4.9 warrior rows (scroll-snap) ----------
function WarriorRow({
  items,
  eyebrow,
  heading,
  markQueens = false,
}: {
  items: Warrior[];
  eyebrow: React.ReactNode;
  heading: React.ReactNode;
  markQueens?: boolean;
}) {
  const { currentLanguage, t } = useLanguage();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".warrior-card");
    const step = card ? card.offsetWidth + 20 : 240;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="warrior-block reveal" data-reveal>
      <div className="warrior-row__head">
        <div>
          <p className="label">{eyebrow}</p>
          <h3>{heading}</h3>
        </div>
        <div className="warrior-row__nav">
          <button type="button" className="btn btn-steel" aria-label={t("common.previous")} onClick={() => scrollByCard(-1)}>
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <button type="button" className="btn btn-steel" aria-label={t("common.next")} onClick={() => scrollByCard(1)}>
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
      <div className="warrior-row" ref={trackRef}>
        {items.map((item) => {
          const displayName = currentLanguage === "hi" ? item.hindiName : item.name;
          const displayRegion = currentLanguage === "hi" ? item.hindiRegion : item.region;
          return (
            <LocalizedLink key={item.name} href="/battles#warriors" className="warrior-card">
              <div className="arch arch--tall">
                <LazyImage fill sizes="(max-width: 760px) 60vw, 220px" src={item.image} alt={displayName} className="object-cover" />
              </div>
              <p className="warrior-card__name">
                {displayName}
                {markQueens ? (
                  <Flame aria-hidden="true" size={14} style={{ color: "var(--ember)" }} />
                ) : null}
              </p>
              <p className="warrior-card__region">{displayRegion}</p>
            </LocalizedLink>
          );
        })}
      </div>
      {markQueens ? <p className="sr-only">{t("home.queens.emberNote")}</p> : null}
    </div>
  );
}

type HomeSection = {
  id: string;
  title: string;
  /** Section ground class — the page rhythm lives here. */
  tone: string;
  content: React.ReactNode;
  lead?: string;
  label?: string;
  /** Audio-narration source for the section's listen control. */
  text?: string;
  /** Parchment sections carry fibre staining and torn edges. */
  parchment?: boolean;
  edgeTop?: string;
  edgeBottom?: string;
  /** Full-bleed block rendered after the container (quote bands). */
  outro?: React.ReactNode;
};

const SECTIONS: HomeSection[] = [
 {
 id: "origins",
    title: "home.origins.title",
 tone: "section--parchment",
 parchment: true,
 edgeTop: "var(--smoke)",
 edgeBottom: "var(--smoke)",
 content: (
 <div className="space-y-8">
 <p className="reveal" data-reveal style={stagger(0)}><TransText k="home.origins.body1" /></p>
 <div className="origins-grid">
 {/* AGNIKULA — ESSENCE OF FIRE */}
 <article className="origin-col reveal" data-reveal style={stagger(0)}>
 <span className="origin-emblem"><Flame aria-hidden="true" size={40} /></span>
 <h3><TransText k="home.origins.agnikula.title" /></h3>
 <p><TransText k="home.origins.agnikula.desc" /></p>
 <span className="stamp-legend"><TransText k="concepts.legend" /></span>
 </article>

 {/* SURYAVANSHI — ESSENCE OF THE SUN */}
 <article className="origin-col reveal" data-reveal style={stagger(0)}>
 <span className="origin-emblem"><Sun aria-hidden="true" size={40} /></span>
 <h3><TransText k="home.origins.suryavanshi.title" /></h3>
 <p><TransText k="home.origins.suryavanshi.desc" /></p>
 </article>

 {/* CHANDRAVANSHI — ESSENCE OF THE MOON */}
 <article className="origin-col reveal" data-reveal style={stagger(0)}>
 <span className="origin-emblem"><Moon aria-hidden="true" size={40} /></span>
 <h3><TransText k="home.origins.chandravanshi.title" /></h3>
 <p><TransText k="home.origins.chandravanshi.desc" /></p>
 </article>
 </div>
 <p className="reveal" data-reveal style={stagger(0)}><TransText k="home.origins.body2" /></p>
 </div>
 ),
 },
 {
 id: "ascendancy",
    title: "home.ascendancy.title",
 tone: "section--smoke",
 content: (
 <div className="space-y-8">
 <p className="reveal" data-reveal style={stagger(0)}><TransText k="home.ascendancy.body" /></p>
 <div className="banner-grid">
 {CLAN_DATA.map((clan, index) => (
 <article
  key={clan.id}
  className="war-banner reveal"
  data-reveal
  style={{ "--bar": clan.bar, "--r": `${index * 80}ms` } as React.CSSProperties}
 >
 <span className="engraved-icon">{clan.symbol}</span>
 <h3><TransText k={clan.name} /></h3>
 <p><TransText k={clan.motif} /></p>
 <p><TransText k={clan.description} /></p>
 </article>
 ))}
 </div>
 </div>
 ),
 },
 {
 id: "kingdoms",
    title: "home.kingdoms.title",
 tone: "section--ash",
 content: (
 <div className="space-y-6">
 {KINGDOMS.map((kingdom, index) => (
 <article key={kingdom.id} className="kingdom-row reveal" data-reveal style={stagger(index * 60)}>
 <div className="kingdom-row__media">
 <div data-parallax style={{ position: "absolute", inset: 0 }}>
 <TImage
  fill
  sizes="(max-width:900px) 100vw, 60vw"
  src={kingdom.image}
  altKey={kingdom.altKey}
  className="object-cover"
 />
 </div>
 </div>
 <div className="kingdom-row__text">
 <p className="kingdom-eyebrow"><TransText k={kingdom.eyebrow} /></p>
 <h3 className="kingdom-row__title"><TransText k={kingdom.title} /></h3>
 <p className="kingdom-row__sub"><TransText k={kingdom.p1} /></p>
 <p className="kingdom-row__period"><TransText k={kingdom.period} /></p>
 <p style={{ marginBottom: 0 }}>
 <LocalizedLink href={kingdom.href} className="btn-text"><TransText k="footer.explore" /></LocalizedLink>
 </p>
 </div>
 </article>
 ))}
 </div>
 ),
 },

 { 
 id: "battles", 
 title: "home.battles.title", 
 tone: "battles-section",
 lead: "home.battles.summary",
 text: "home.battles.summary",
 content: ( 
 <div>
 <div className="battle-grid">
 {BATTLES.map((battle, index) => (
 <BattleCard key={battle.id} battle={battle} index={index} />
 ))}
 </div>
 <p className="sources-note"><TransText k="home.battles.sourcesNote" /></p>
 </div> 
 ), 
 },

 {
 id: "states",
 title: "home.states.title",
 tone: "section--smoke",
 lead: "home.states.intro",
 text: "home.states.summary",
 content: <StatesBlock />,
 },
 {
 id: "ethos",
    title: "home.ethos.title",
 tone: "section--ash",
    lead: "home.ethos.body",
    text: "home.ethos.summary",
 content: (
 <div>
 <WarriorRow items={MALE_WARRIORS} eyebrow={<TransText k="home.heritage" />} heading={<TransText k="home.ethos.heading" />} />
 <WarriorRow items={FEMALE_WARRIORS} eyebrow={<TransText k="home.ethos.title" />} heading={<TransText k="home.queens.title" />} markQueens />
 </div>
 ),
 },
 {
 id: "culture",
 title: "home.culture.title",
 tone: "section--smoke",
 lead: "home.culture.subtitle",
 text: "home.culture.summary",
 content: (
 <div className="plate-grid">
 {/* WEAPONS */}
 <article className="plate reveal" data-reveal style={stagger(0)}>
 <div className="plate__media">
 <TImage fill sizes="(max-width:760px) 100vw, 50vw" src="/images/weapons/talwar.jpg" altKey="home.culture.weapons.title" className="object-cover" />
 </div>
 <span className="plate__scrim" aria-hidden="true" />
 <div className="plate__body">
 <span className="engraved-icon"><Swords aria-hidden="true" /></span>
 <h3><TransText k="home.culture.weapons.title" /></h3>
 <p><TransText k="home.culture.weapons.p1" /></p>
 <LocalizedLink href="/weapons" className="btn-text"><TransText k="common.readMore" /></LocalizedLink>
 </div>
 </article>

 {/* DRESS */}
 <article className="plate reveal" data-reveal style={stagger(80)}>
 <div className="plate__media">
 <TImage fill sizes="(max-width:760px) 100vw, 50vw" src="/images/legends/rajputana-tapestry.jpg" altKey="home.culture.dress.title" className="object-cover" />
 </div>
 <span className="plate__scrim" aria-hidden="true" />
 <div className="plate__body">
 <span className="engraved-icon"><Shirt aria-hidden="true" /></span>
 <h3><TransText k="home.culture.dress.title" /></h3>
 <p><TransText k="home.culture.dress.p1" /></p>
 </div>
 </article>

 {/* MUSIC */}
 <article className="plate reveal" data-reveal style={stagger(0)}>
 <div className="plate__media">
 <TImage fill sizes="(max-width:760px) 100vw, 50vw" src="/images/legends/kesari-oath-scroll.jpg" altKey="home.culture.music.title" className="object-cover" />
 </div>
 <span className="plate__scrim" aria-hidden="true" />
 <div className="plate__body">
 <span className="engraved-icon"><Music aria-hidden="true" /></span>
 <h3><TransText k="home.culture.music.title" /></h3>
 <p><TransText k="home.culture.music.p1" /></p>
 </div>
 </article>

 {/* RITUALS */}
 <article className="plate reveal" data-reveal style={stagger(80)}>
 <div className="plate__media">
 <TImage fill sizes="(max-width:760px) 100vw, 50vw" src="/images/festivals/gangaur-mela.jpg" altKey="home.culture.rituals.title" className="object-cover" />
 </div>
 <span className="plate__scrim" aria-hidden="true" />
 <div className="plate__body">
 <span className="engraved-icon"><Flame aria-hidden="true" /></span>
 <h3><TransText k="home.culture.rituals.title" /></h3>
 <p><TransText k="home.culture.rituals.p1" /></p>
 <LocalizedLink href="/folklore#rituals" className="btn-text"><TransText k="common.readMore" /></LocalizedLink>
 </div>
 </article>
 </div>
 ),
 },
 {
 id: "modern",
    title: "home.modern.title",
 tone: "section--steel",
    label: "home.modern.period",
    lead: "home.modern.summary",
    text: "home.modern.summary",
 content: (
 <div className="modern-grid">
 <div className="space-y-8">
 <p className="reveal" data-reveal style={stagger(0)}><TransText k="home.modern.p1" /></p>
 <p className="reveal" data-reveal style={stagger(80)}><TransText k="home.modern.p2" /></p>
 </div>
 <figure className="modern-media reveal" data-reveal style={stagger(120)}>
 <div className="arch arch--contain">
 <TImage fill sizes="(max-width:1100px) 100vw, 40vw" src="https://upload.wikimedia.org/wikipedia/commons/0/09/Rajputana_1909.jpg" altKey="home.alt.map" className="object-contain" />
 </div>
 <figcaption className="modern-caption"><TransText k="home.modern.mapCredit" /></figcaption>
 </figure>
 </div>
 ),
 outro: (
 <div className="quote-band" style={{ padding: "clamp(48px, 6vw, 88px) 0" }}>
 <TransText k="home.legacyContinues" />
 </div>
 ),
 }
];

export default function HistoryPage() {
 const [activeEra, setActiveEra] = useState(0);
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

 // Scroll reveals: fade-up 24px / 900ms, staggered via the `--r` custom property.
 // Disabled under `prefers-reduced-motion` (globals.css also forces the end state).
 useEffect(() => {
 const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
 const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
 if (reduce.matches) {
 nodes.forEach((node) => node.classList.add("is-in"));
 return;
 }
 const observer = new IntersectionObserver(
 (entries) => {
 entries.forEach((entry) => {
 if (entry.isIntersecting) {
 entry.target.classList.add("is-in");
 observer.unobserve(entry.target);
 }
 });
 },
 { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
 );
 nodes.forEach((node) => observer.observe(node));
 return () => observer.disconnect();
 }, []);

 // Kingdom plates drift 40px against the scroll (transform only, rAF-throttled).
 useEffect(() => {
 const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
 if (reduce.matches) return;
 const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
 if (nodes.length === 0) return;
 let frame = 0;
 const paint = () => {
 frame = 0;
 const viewport = window.innerHeight;
 nodes.forEach((node) => {
 const rect = node.getBoundingClientRect();
 if (rect.bottom < -200 || rect.top > viewport + 200) return;
 const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
 const shift = Math.max(-20, Math.min(20, -progress * 20));
 node.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.08)`;
 });
 };
 const onScroll = () => {
 if (!frame) frame = window.requestAnimationFrame(paint);
 };
 paint();
 window.addEventListener("scroll", onScroll, { passive: true });
 window.addEventListener("resize", onScroll);
 return () => {
 window.removeEventListener("scroll", onScroll);
 window.removeEventListener("resize", onScroll);
 if (frame) window.cancelAnimationFrame(frame);
 };
 }, []);

 const heroTitle = t("home.title");
 const heroBreak = heroTitle.indexOf(" ");
 const heroHead = heroBreak > 0 ? heroTitle.slice(0, heroBreak) : heroTitle;
 const heroTail = heroBreak > 0 ? heroTitle.slice(heroBreak + 1) : "";

 const renderSection = (section: HomeSection) => {
 const controls = (
 <div className="flex items-center gap-3">
 {section.text ? (
  <button
  type="button"
  className={`listen-btn listen-btn--icon${listeningSection === section.id ? " is-active" : ""}`}
  onClick={() => handleListen(t(section.text as string), section.id)}
  aria-label={listeningSection === section.id ? t("audio.stop") : t("audio.play")}
  >
  {listeningSection === section.id ? (
  <StopIcon className="listen-btn__icon" />
  ) : (
  <VolumeIcon className="listen-btn__icon" />
  )}
  <span className="listen-btn__label">
  {listeningSection === section.id ? t("audio.stop") : t("audio.play")}
  </span>
  </button>
 ) : null}
 {section.id === "battles" ? (
  <LocalizedLink href="/battles" className="btn btn-steel">
  <TransText k="home.battles.allBattles" />
  </LocalizedLink>
 ) : null}
 </div>
 );

 return (
 <section
  key={section.id}
  id={section.id}
  className={`section ${section.tone} scroll-mt-32`}
 >
  {section.parchment ? (
  <>
  <ParchmentTexture stains={2} className="atmos" />
  <TornEdge position="top" style={{ color: section.edgeTop }} />
  <TornEdge position="bottom" style={{ color: section.edgeBottom }} />
  </>
  ) : null}
  <div className="container" style={{ position: "relative", zIndex: 1 }}>
  <SectionHeading
   label={section.label ? <TransText k={section.label} /> : undefined}
   title={<TransText k={section.title} />}
   lead={section.lead ? <TransText k={section.lead} /> : undefined}
   action={section.text || section.id === "battles" ? controls : undefined}
  />
  <div>{section.content}</div>
  </div>
  {section.outro ?? null}
 </section>
 );
 };

 const statesIndex = SECTIONS.findIndex(s => s.id === "states");
 const topSections = statesIndex >= 0 ? SECTIONS.slice(0, statesIndex + 1) : SECTIONS;
 const bottomSections = statesIndex >= 0 ? SECTIONS.slice(statesIndex + 1) : [];

 return (
 <main className="min-h-screen">
 {/* 4.1 HERO */}
 <section className="home-hero">
 <div className="home-hero__art is-zoomed">
 <Image
  src="/images/Hero/home_.png"
  alt={t("home.heroAlt")}
  fill
  priority
  quality={85}
  sizes="100vw"
 />
 </div>
 <div className="home-hero__scrim" aria-hidden="true" />

 {/* battlefield atmosphere: mist, cavalry dust, embers, stains, vignette */}
 <div className="atmos" style={{ zIndex: 2 }}>
 <Mist layers={3} />
 <SandCloud motes={90} />
 <Embers />
 <BloodStain variant="smear" opacity={0.26} rotate={-6} style={{ top: "14%", left: "3%", width: "36%", height: "44%" }} />
 <BloodStain variant="splatter" opacity={0.18} style={{ bottom: "4%", right: "2%", width: "26%", height: "32%" }} />
 <Vignette />
 </div>

 <div className="home-hero__inner">
 <div className="container">
 <div className="home-hero__col">
  <p className="label">{t("home.heritage")}</p>
  <h1 className="home-hero__title reveal-wipe" data-reveal>
  {heroHead}
  {heroTail ? <span className="home-hero__title-sub">{heroTail}</span> : null}
  </h1>
  <p className="home-hero__lead">{t("home.subtitle")}</p>
  <div className="home-hero__actions">
  <LocalizedLink href="/dynasties" className="btn btn-war">{t("home.enterPalace")}</LocalizedLink>
  <LocalizedLink href="/forts" className="btn btn-steel">{t("home.viewMap")}</LocalizedLink>
  </div>
 </div>
 </div>
 </div>

 <div className="home-hero__scroll" aria-hidden="true" />
 </section>

 {/* 4.2 EXPLORE STRIP */}
 <div className="explore-strip">
 <div className="container">
 <div className="explore-strip__grid">
  {EXPLORE_ITEMS.map(({ href, labelKey, subKey, Icon }) => (
  <LocalizedLink key={href} href={href} className="explore-cell">
   <span className="engraved-icon"><Icon aria-hidden="true" /></span>
   <span className="explore-cell__label">{t(labelKey)}</span>
   <span className="explore-cell__sub">{t(subKey)}</span>
  </LocalizedLink>
  ))}
 </div>
 </div>
 </div>

 {/* CONTENT SECTIONS */}
 {topSections.map(renderSection)}

 {/* 4.8 ROYAL CHRONICLE — parchment, horizontal era rail + event grid */}
 <section id="chronicle" className="section section--parchment scroll-mt-32">
 <ParchmentTexture stains={2} className="atmos" />
 <TornEdge position="top" style={{ color: "var(--smoke)" }} />
 <TornEdge position="bottom" style={{ color: "var(--ash)" }} />

 <div className="container" style={{ position: "relative", zIndex: 1 }}>
 <SectionHeading title={<TransText k="home.royalChronicle" />} />
 <div className="chronicle">
 <div className="era-rail" role="group" aria-label={t("home.royalChronicle")}>
 {TIMELINE_DATA.map((group, index) => (
  <button
  key={group.eraKey}
  type="button"
  className="era-chip"
  aria-current={index === activeEra ? "true" : undefined}
  onClick={() => setActiveEra(index)}
  >
  <span className="era-chip__num">{ROMAN[index]}</span>
  <span className="era-chip__name"><TransText k={group.eraKey} /></span>
  <span className="era-chip__date"><TransText k={group.entries[0].dateKey} /></span>
  </button>
 ))}
 </div>

 <div className="chronicle__panel">
 <div className="chronicle__panel-head">
  <span className="chronicle__hilt" aria-hidden="true"><Swords size={18} /></span>
  <h3 className="chronicle__era"><TransText k={TIMELINE_DATA[activeEra]?.eraKey || "home.royalChronicle"} /></h3>
  <span className="chronicle__count">{activeEra + 1} / {TIMELINE_DATA.length}</span>
 </div>

 <ol className="event-grid">
  {TIMELINE_DATA[activeEra]?.entries.map((entry) => (
  <li key={entry.id} className={`event-card${entry.isMajor ? " event-card--major" : ""}`}>
  <span className="event-card__date"><TransText k={entry.dateKey} /></span>
  <p className="event-card__text"><TransText k={entry.textKey} /></p>
  </li>
  ))}
 </ol>

 <div className="chronicle__pager">
  <button
  type="button"
  className="btn btn-steel"
  aria-label={t("common.previous")}
  onClick={() => setActiveEra((i) => (i - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length)}
  >
  <ChevronLeft aria-hidden="true" size={18} />
  </button>
  <button
  type="button"
  className="btn btn-steel"
  aria-label={t("common.next")}
  onClick={() => setActiveEra((i) => (i + 1) % TIMELINE_DATA.length)}
  >
  <ChevronRight aria-hidden="true" size={18} />
  </button>
 </div>
 </div>
 </div>
 </div>
 </section>

 {bottomSections.map(renderSection)}
 </main>
 );
}
