// Root layout for Sanity Studio — no Navbar, Footer, or LanguageProvider.
// The public site has its own root layout at app/[lang]/layout.tsx.
export const metadata = { title: 'Rajputana Studio', robots: 'noindex, nofollow' };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
