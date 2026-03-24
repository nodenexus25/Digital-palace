Translation structure
=====================

Languages
---------
- Supported locales: `en`, `hi`
- Locale configuration lives in [next.config.ts](file:///b:/Rajputana/next.config.ts)
- Client language state and helpers live in [LanguageProvider.tsx](file:///b:/Rajputana/src/app/components/LanguageProvider.tsx)

Files
-----
- English strings: [en.json](file:///b:/Rajputana/src/app/i18n/en.json)
- Hindi strings: [hi.json](file:///b:/Rajputana/src/app/i18n/hi.json)

Key conventions
---------------
- Namespaced by feature:
  - `nav.*` for navigation items
  - `common.*` for reusable UI labels
  - `home.*` for landing/hero content
  - `dynasties.*`, `forts.*`, `stories.*`, `weapons.*`, `gallery.*` for section‑specific UI
  - `festival.*`, `audio.*`, `footer.*` for cross‑section features
- Keys are identical across languages; only values differ.

Usage
-----
- Access the current language and translator with the hook:

  - Import: `import { useLanguage } from '../components/LanguageProvider';`
  - Use: `const { t } = useLanguage();`
  - Render: `t('nav.forts')`, `t('stories.title')`, etc.

- The translator behaves as:

  - Look up `translations[currentLanguage][key]`
  - Fallback to `translations.en[key]`
  - Fallback to `key` if nothing is found

Routing and SEO
---------------
- Next.js `i18n` is configured with `locales: ['en', 'hi']` and `defaultLocale: 'en'`.
- Language‑scoped URLs:
  - `/en`, `/en/forts`, `/en/stories`, `/en/weapons`, etc.
  - `/hi`, `/hi/forts`, `/hi/stories`, `/hi/weapons`, etc.
- Incoming `/en/...` and `/hi/...` requests are rewritten to the underlying route while:
  - Preserving the visible `/en`/`/hi` prefix in the browser
  - Writing a `rajputana-language` cookie for SSR metadata and initial language
- Sitemap exposes localized routes for all core pages via [sitemap.ts](file:///b:/Rajputana/src/app/sitemap.ts).

Story translation and audio
---------------------------
- Long‑form story content today is stored primarily in Hindi.
- For English UI, the `translateStory` helper in `LanguageProvider`:
  - Leaves Hindi as‑is for `hi`
  - Applies a domain‑specific Hindi→English word/phrase mapping for `en`
  - Is optimized for narrative content (titles, descriptions, full stories)
- Audio narration:
  - Uses ElevenLabs when configured, otherwise browser `speechSynthesis`
  - Preprocesses text to remove formatting and add dramatic pacing

Extending translations
----------------------
- To add a new UI label:
  - Choose or create a namespace (`section.key`), for example `stories.newFilter`
  - Add the key to both `en.json` and `hi.json`
  - Use `t('stories.newFilter')` in components
- To add another section:
  - Introduce a new prefix, e.g. `battles.*`
  - Keep keys semantic (`title`, `subtitle`, `filterLabel`, `emptyStateTitle`, etc.)

