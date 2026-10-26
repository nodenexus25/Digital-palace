# ASSETS.md — Raktim Rann

Checklist of every asset the site references, what is already in the repo, and
what still has to be supplied. Nothing in this file is auto-generated; it is the
handover list for the Art direction brief.

---

## 1. Blocking — the site renders without these, but not as designed

| # | Asset | Expected path | Used by | Status |
|---|-------|---------------|---------|--------|
| 1 | Reversed (gold-on-transparent) jharokha brand mark, square, transparent PNG or SVG, 256×256 available | `public/brand/rdp-mark-reversed.svg` | `Navbar.tsx` (40px) and `ClientFooter.tsx` (64px) | **Missing.** Both components degrade gracefully (`onError` drops the mark), so no broken image icon appears — but the brand is currently text-only. |
| 2 | Developer portrait, square crop, ≥ 400×400 | `public/images/developer/profile.jpg` | `ClientFooter.tsx` creator credit | **Missing.** Medallion currently shows the initials `YSR`. Set `DEVELOPER.photo` in `ClientFooter.tsx` once the file exists. |

### Logo integrity rules (do not violate)
- Never stretch, compress, recolour or re-proportion the mark.
- Keep the source aspect ratio; the layout caps it at 40px (header) / 64px (footer).
- The brief asks for a **reversed** mark (light mark on the ash-black header), not a colour-swapped copy of the light-background logo.

---

## 2. Raster textures — optional, SVG fallbacks already shipped

The brief allows either raster textures or generated SVG/canvas equivalents
(§1D). The generated equivalents are **already implemented**, so these four are
optional upgrades. If supplied: WebP, each **< 150 KB**, seamless/tileable where
noted, no stock watermarks.

| Asset | Expected path | Notes |
|-------|---------------|-------|
| Mist layer 1 | `public/textures/mist-1.webp` | tileable horizontally, soft grey-blue |
| Mist layer 2 | `public/textures/mist-2.webp` | tileable horizontally, denser |
| Cavalry dust | `public/textures/dust.webp` | warm sand tone, tileable |
| Parchment | `public/textures/parchment.webp` | 1024×1024, tileable, warm fibres |

Current fallbacks live in `src/app/globals.css` (inline `feTurbulence` SVG data
URIs on `.mist__layer`, `.sand-cloud__band`, `.parchment`) plus the canvas motes
in `src/app/components/atmosphere/SandCloud.tsx`. Dropping the rasters in and
pointing those rules at the files is the whole change — no component edits.

---

## 3. Period art — licence register

The brief (§6) prefers real public-domain period art over generated imagery and
requires that every piece used carries a visible caption with title / artist /
date / collection / licence. None of the images currently rendered in the build
carries such a caption yet, so the register below starts empty.

**Register — fill one row per image as it is placed.** Until a row is filled,
the image is treated as an unverified placeholder.

| File used on site | Work title | Artist | Date | Collection / source | Licence | Caption shown? |
|---|---|---|---|---|---|---|
| _(empty)_ | | | | | | |

Recommended public-domain sources: Wikimedia Commons, Victoria & Albert Museum
(`collections.vam.ac.uk`), British Library (`bl.uk`), Metropolitan Museum of Art
Open Access, Rijksmuseum.

**Rule for the `legends/` plates:** the 15 files in `public/images/legends/` are
currently atmospheric plates. If any of them turns out to be an AI generation or
an unlicensed photograph, it must either be replaced with a licensed work or be
captioned **"Artistic impression"**.

---

## 4. Known placeholder artwork in the repo

These render today as visible stand-ins and should be replaced with real
portraits or period art. They are counted, not listed one by one.

| Location | Count | Notes |
|---|---|---|
| `public/images/battles/**/placeholder.jpg` | 81 | Battle/warrior portrait stand-ins |
| `public/images/warriors/placeholder-warrior.png` | 1 | Generic warrior stand-in |
| `public/images/dynasties/rulers/default.jpg` | 1 | Fallback ruler portrait |

Total: **83 placeholder files**. Every one of them is a real portrait slot
waiting for a licensed image.

---

## 5. Assets already present and used

| Group | Count | Path |
|---|---|---|
| Cinematic legend plates | 15 | `public/images/legends/` |
| Weapon plates | 78 | `public/images/weapons/` (incl. `talwar.jpg`) |
| Festival plates | 30 | `public/images/festivals/` (incl. `gangaur-mela.jpg`) |
| Dynasty seals (arms) | 8 | `public/images/dynasties/seals/` |
| Dynasty place photography | 9 | `public/images/dynasties/places/` |
| Ruler portraits | ~180 | `public/images/dynasties/rulers/` |
| Fort photography | 14 files in 13 folders | `public/images/forts/` |
| State seals / arms | 49 WebP in `states/`, plus ~20 further arms files in the parent folder | `public/images/home/external/` |
| Homepage hero | 1 | `public/images/Hero/home_.png` |

---

## 6. Font files

Loaded via `next/font/google` in `src/app/[lang]/layout.tsx` with
`display: 'swap'`. No self-hosted font files are required and none are pending.

| CSS variable | Family | Weights |
|---|---|---|
| `--font-epic` | Cinzel | 500, 600, 700 |
| `--font-chronicle` | Cormorant Garamond | 500, 600, 500 italic |
| `--font-body` | Spectral | 300, 400, 500, 400 italic |
| `--font-deva-display` | Tiro Devanagari Hindi | 400 |
| `--font-deva-body` | Noto Serif Devanagari | 400, 500 |

Mukta has been removed from the build.
