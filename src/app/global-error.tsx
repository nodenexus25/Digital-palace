'use client';

// Last-resort error screen, shown only if the root layout itself fails. It
// renders outside LanguageProvider, so it picks its language from the URL.
const COPY = {
  en: { title: 'Something went wrong', body: 'The palace gates are briefly closed. Please try again.', cta: 'Try again' },
  hi: { title: 'कुछ गड़बड़ हो गई', body: 'महल के द्वार कुछ क्षण के लिए बंद हैं। कृपया पुनः प्रयास करें।', cta: 'पुनः प्रयास करें' },
} as const;

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const lang = typeof window !== 'undefined' && window.location.pathname.startsWith('/hi') ? 'hi' : 'en';
  const copy = COPY[lang];
  return (
    <html lang={lang}>
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#FDF6E3', color: '#2C1810', fontFamily: 'serif' }}>
        <main style={{ textAlign: 'center', padding: 24 }}>
          <h1 style={{ fontSize: 28 }}>{copy.title}</h1>
          <p>{copy.body}</p>
          <button onClick={() => reset()} style={{ padding: '10px 20px', background: '#8B4513', color: '#FDF6E3', border: 0, borderRadius: 8 }}>
            {copy.cta}
          </button>
        </main>
      </body>
    </html>
  );
}
