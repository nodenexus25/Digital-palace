import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono, Cinzel, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { LanguageProvider } from "./components/LanguageProvider";
import ClientFooter from "./components/ClientFooter";
import ThemedContainer from "./components/ThemedContainer";
import "./globals.css";
import { serverTranslate } from "./utils/languages";

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

 const titleText = serverTranslate(lang, "home.title");
 const descriptionText = serverTranslate(lang, "home.subtitle");
 const keywordsText = serverTranslate(lang, "meta.keywords");

 return {
 title: `${titleText}${lang === "en" ? "" : " | Rajputana Digital Palace"}`,
 description: descriptionText,
 keywords: keywordsText,
 authors: [{ name: "Rajputana Digital Palace" }],
 creator: "Rajputana Heritage Foundation",
 publisher: "Rajputana Digital Palace",
 robots: "index, follow",
 openGraph: {
 title: titleText,
 description: descriptionText,
 type: "website",
 locale: lang === "en" ? "en_IN" : "hi_IN",
 alternateLocale: [lang === "en" ? "hi_IN" : "en_IN"],
 },
 twitter: {
 card: "summary_large_image",
 title: titleText,
 description: descriptionText,
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
 <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
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
