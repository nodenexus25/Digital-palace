import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Cinzel, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { LanguageProvider } from "./components/LanguageProvider";
import Navbar from "./components/Navbar";
import ClientFooter from "./components/ClientFooter";
import ThemedContainer from "./components/ThemedContainer";
import "./globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

const cinzel = Cinzel({
 variable: "--font-cinzel",
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
 variable: "--font-playfair",
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 style: ["normal", "italic"],
});

const cormorantGaramond = Cormorant_Garamond({
 variable: "--font-cormorant",
 subsets: ["latin"],
 weight: ["300", "400", "500", "600", "700"],
 style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
 const cookieStore = await cookies();
 const lang = (cookieStore.get("rajputana-language")?.value || "en") as "en" | "hi";

 const titles = {
 en: "Rajputana Digital Palace",
 hi: "राजपूताना डिजिटल महल",
 };

 const descriptions = {
 en: "Explore Rajputana’s heritage — dynasties, forts, warriors, and timeless legends — with curated storytelling, audio, and multimedia archives.",
 hi: "राजपूताना की धरोहर — राजवंश, किले, वीर योद्धा और अमर कथाएं — सुसंगत कथा, ऑडियो और मल्टीमीडिया संकलन के साथ।",
 };

 const keywords = {
 en: "Rajputana, Rajput history, Rajasthan culture, dynasties, forts, Maharana Pratap, Prithviraj Chauhan",
 hi: "राजपूताना, राजपूत इतिहास, राजस्थान संस्कृति, राजवंश, किले, महाराणा प्रताप, पृथ्वीराज चौहान",
 };

 return {
 title: `${titles[lang]}${lang === "en" ? "" : " | Rajputana Digital Palace"}`,
 description: descriptions[lang],
 keywords: keywords[lang],
 authors: [{ name: "Rajputana Digital Palace" }],
 creator: "Rajputana Heritage Foundation",
 publisher: "Rajputana Digital Palace",
 robots: "index, follow",
 openGraph: {
 title: titles[lang],
 description: lang === "en" ? "Experience the valor and heritage of Rajputana through immersive digital storytelling" : "राजपूताना की वीरता और धरोहर का अनुभव करें",
 type: "website",
 locale: lang === "en" ? "en_IN" : "hi_IN",
 alternateLocale: [lang === "en" ? "hi_IN" : "en_IN"],
 },
 twitter: {
 card: "summary_large_image",
 title: titles[lang],
 description: descriptions[lang],
 },
 };
}

export default async function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const langCookie = await cookies();
 const lang = (langCookie.get("rajputana-language")?.value || "en") as "en" | "hi";
 return (
 <html lang={lang} className="scroll-smooth">
 <head>
 <link rel="icon" href="/favicon.ico" />
 <meta name="theme-color" content="#800020" />
 <meta name="viewport" content="width=device-width, initial-scale=1" />
 </head>
 <body
 className={`${
 geistSans.variable
 } ${
 geistMono.variable
 } ${
 cinzel.variable
 } ${
 playfairDisplay.variable
 } ${
 cormorantGaramond.variable
 } antialiased bg-background text-foreground font-body`}
 >
 <LanguageProvider initialLanguage={lang}>
          <ThemedContainer>
            {children}
          </ThemedContainer>
 <ClientFooter />
 </LanguageProvider>
 </body>
 </html>
 );
}
