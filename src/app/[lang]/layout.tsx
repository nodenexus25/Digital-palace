import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Mukta, Tiro_Devanagari_Hindi } from 'next/font/google';
import '../globals.css';
import { LanguageProvider } from '@/app/components/LanguageProvider';
import ClientFooter from '@/app/components/ClientFooter';
import ThemedContainer from '@/app/components/ThemedContainer';
import Navbar from '@/app/components/Navbar';
import { locales, ogLocales, toLocale } from '@/i18n/config';
import { getMessages, translate } from '@/i18n/messages';
import { SITE_URL, alternatesFor } from '@/i18n/metadata';

// The site's three families. Latin display faces (Cormorant Garamond) carry
// the headings, Mukta carries body copy and Devanagari text, and Tiro
// Devanagari Hindi carries Hindi headings (see globals.css, html[lang="hi"]).
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'], variable: '--nf-cormorant', display: 'swap' });
const mukta = Mukta({ subsets: ['latin', 'devanagari'], weight: ['400', '500', '600'], variable: '--nf-mukta', display: 'swap' });
const tiroDevanagari = Tiro_Devanagari_Hindi({ subsets: ['devanagari', 'latin'], weight: ['400'], variable: '--nf-tiro', display: 'swap' });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#0E1C3A',
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
      images: [{ url: '/images/Hero/home_.png', alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/Hero/home_.png'] },
    // TODO: replace with the owner-supplied marks once delivered
    // (public/brand/rdp-favicon.svg, public/brand/rdp-app-icon.svg).
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
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`scroll-smooth ${cormorant.variable} ${mukta.variable} ${tiroDevanagari.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LanguageProvider lang={lang} messages={getMessages(lang)}>
          <Navbar />
          <ThemedContainer>{children}</ThemedContainer>
          <ClientFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
