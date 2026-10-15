import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Inter, Noto_Serif_Devanagari, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { LanguageProvider } from '@/app/components/LanguageProvider';
import ClientFooter from '@/app/components/ClientFooter';
import ThemedContainer from '@/app/components/ThemedContainer';
import Navbar from '@/app/components/Navbar';
import { locales, ogLocales, toLocale } from '@/i18n/config';
import { getMessages, translate } from '@/i18n/messages';
import { SITE_URL, alternatesFor } from '@/i18n/metadata';

// Self-hosted fonts (no render-blocking Google Fonts @import). Latin display
// faces have no Devanagari glyphs, so Hindi pages render every family through
// Noto Serif Devanagari (see globals.css, html[lang="hi"]).
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--nf-cinzel', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--nf-playfair', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], style: ['normal', 'italic'], variable: '--nf-cormorant', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--nf-inter', display: 'swap' });
const devanagari = Noto_Serif_Devanagari({ subsets: ['devanagari', 'latin'], weight: ['400', '500', '600', '700'], variable: '--nf-deva', display: 'swap' });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#800020',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const title = translate(lang, 'meta.siteName');
  const description = translate(lang, 'home.subtitle');
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${title}` },
    description,
    keywords: translate(lang, 'meta.keywords'),
    applicationName: title,
    robots: 'index, follow',
    alternates: alternatesFor(lang, ''),
    openGraph: {
      siteName: title,
      title,
      description,
      type: 'website',
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
    },
    twitter: { card: 'summary_large_image', title, description },
    icons: { icon: '/favicon.ico' },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);

  return (
    <html
      lang={lang}
      data-locale={lang}
      className={`scroll-smooth ${cinzel.variable} ${playfair.variable} ${cormorant.variable} ${inter.variable} ${devanagari.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground font-body">
        <LanguageProvider lang={lang} messages={getMessages(lang)}>
          <Navbar />
          <ThemedContainer>{children}</ThemedContainer>
          <ClientFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
