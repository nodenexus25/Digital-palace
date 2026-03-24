i18n QA checklist (English + Hindi)
===================================

Global
------
- [ ] Language toggle visible in the navbar on all pages
- [ ] Toggle switches between English and Hindi without full page reload
- [ ] Selected language persists across navigation
- [ ] Refreshing the page keeps language selection
- [ ] Visiting `/en/...` sets English and `/hi/...` sets Hindi
- [ ] `<html lang>` attribute matches active language (`en` or `hi`)

Navigation and footer
---------------------
- [ ] All nav links change language when toggled
- [ ] Nav labels map to `nav.*` keys (no hardcoded text)
- [ ] Footer headings and quick links are translated
- [ ] Newsletter labels and button text are translated
- [ ] “Made in India” line is translated and consistent

Home page
---------
- [ ] Hero title, subtitle, and CTAs come from `home.*` keys
- [ ] Daily quote heading is translated
- [ ] No mixed English/Hindi segments inside a single label

Dynasties
---------
- [ ] Page heading/subheading use `dynasties.*` keys
- [ ] Column labels (region, capital, founder, period) are translated
- [ ] Filter/search labels use `common.*` or `dynasties.*`
- [ ] Long‑form dynasty content renders correctly for both languages

Forts
-----
- [ ] Page heading/subheading use `forts.*` keys
- [ ] Metadata labels (location, built by, type, significance, architecture) are translated
- [ ] Any buttons or CTAs are translated via `common.*`/`forts.*`
- [ ] Audio controls use `audio.*` keys where applicable

Stories
-------
- [ ] Hero title/subtitle/description use `stories.*` keys
- [ ] Search label and placeholder use `stories.search*` keys
- [ ] Category and difficulty filters use `stories.category*` and `stories.difficulty*` keys
- [ ] Empty‑state title/body use `stories.noneFound*` keys
- [ ] Quick facts labels use `stories.*Label` keys
- [ ] Section headings (historical context, moral lesson, timeline, sources) use `stories.*Heading` keys
- [ ] Audio CTA and loading text use `stories.audioCta*` keys
- [ ] Share/favorite CTAs use `stories.shareCta` / `stories.favoriteCta`
- [ ] Error messages use `stories.audioError`

Weapons
-------
- [ ] Hero title/subtitle/description use `weapons.*` keys
- [ ] Sidebar title/subtitle use `weapons.sidebar*` keys
- [ ] Mobile “current sector” label uses `weapons.currentSector`
- [ ] Data‑driven content (names, descriptions) renders consistently for both languages

Routing and SEO
---------------
- [ ] `/en` and `/hi` variants exist for all major sections
- [ ] Sitemap exposes localized URLs for both `en` and `hi`
- [ ] Switching language updates URLs to include the correct prefix
- [ ] No static HTML fallbacks show outdated language

Visual and typography
---------------------
- [ ] Hindi text renders with proper glyphs and spacing
- [ ] No clipped or overlapping Devanagari characters at responsive breakpoints
- [ ] Typography remains readable for both scripts on mobile and desktop
- [ ] Icons/emojis align visually in both languages

Regression checks
-----------------
- [ ] No runtime errors when toggling language on any page
- [ ] No 404s for `/en/...` or `/hi/...` routes configured in sitemap
- [ ] No console errors related to missing translation keys
- [ ] Linting passes for frontend changes (ignoring pre‑existing backend warnings)

