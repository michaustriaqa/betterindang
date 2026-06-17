# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR** — breaking changes to the content schema, routing, or public API
- **MINOR** — new pages, sections, or significant features added
- **PATCH** — bug fixes, content updates, styling tweaks, dependency updates

The displayed version in the footer (`src/components/layout/Footer.tsx`) must be kept in sync with the latest entry here.

## [0.7.2] - 2026-06-17

### Changed

- **Filter dropdown — deferred apply** — checkboxes now update a draft/pending selection only; the active filter does not change until **Apply** is clicked. Closing the dropdown without applying discards the draft.
- **Clear button** — resets the draft selection without closing the dropdown; restyled as a proper secondary button (white bg, visible border, dark text) rather than a muted ghost.

## [0.7.1] - 2026-06-17

### Changed

- **Filter dropdown** — tag list is now scrollable (`max-h-[360px] overflow-y-auto`) for categories with many tags. Added a pinned footer with **Clear** (resets selection) and **Apply** (confirms and closes the dropdown) CTAs.

## [0.7.0] - 2026-06-17

### Changed

- **`/tourism/:category` filter bar** — replaced tag chip row and sort select with two dropdown controls styled as a joined pill group: **Filters** (multi-select checklist with count badge, click-outside to close) and **Sort** ("Alphabetically (A–Z)" / "Alphabetically (Z–A)"). Matches the Filters | Sort button group layout pattern.
- Removed "Photos first" sort option — two clean alphabetical options only.

## [0.6.9] - 2026-06-17

### Changed

- **`/tourism/:category` header** — replaced flat white header with a full-width blue hero band (matching site pattern). Each category shows its own color accent, a one-line description, and the establishment count.
- **Establishment card pill** — removed redundant category label pill; each card now shows its most specific tag (first tag from the `tags` array) instead.
- **Tag filter chips** — added a horizontal scrollable row of clickable tag chips below the search bar. Chips are derived from the actual `tags` data per category. Multiple tags can be selected simultaneously (AND logic); a "Clear" button appears when tags are active.
- **Sort control** — added a sort dropdown next to the search input with three options: A → Z (default), Z → A, Photos first (establishments with images surface before placeholders, then A–Z within each group).

## [0.6.8] - 2026-06-17

### Fixed

- **`/tourism` category grid** — removed "Coming soon" dim logic; all categories are now fully clickable regardless of listing count.
- **`/tourism` → `/tourism/history`** — added a footer link inside the Browse by Category section so the history timeline page is reachable from the tourism index again (was orphaned after the amber tile was removed).

## [0.6.7] - 2026-06-17

### Changed

- **`/tourism` Browse by Category** — removed the Tiles/Cards toggle; settled on Cards view only (sorted by count desc, sparse categories dimmed). Removed unused `CAT_TILES` constant and `LayoutGrid`/`List` icon imports.

## [0.6.6] - 2026-06-17

### Changed

- **`/tourism` Browse by Category** — removed the orphaned "History & Culture" amber tile from the category grid (it mixed a content page into a listings grid).
- Added a **Tiles / Cards view toggle** to the Browse by Category section:
  - **Tiles** (default): gradient color tiles sorted by listing count descending — all categories shown, visually rich.
  - **Cards**: white card list sorted by listing count descending; categories with fewer than 3 listings are dimmed and non-interactive with a "Coming soon" label (currently: Cafés & Dining = 2, Adventure & Eco = 1).

## [0.6.5] - 2026-06-17

### Changed

- **`/tourism`** — removed the Heritage Landmarks section (4 landmark cards). Those sites are already reachable via the Heritage category tile (`/tourism/heritage`) and the History & Culture tile (`/tourism/history`), making the inline section redundant. Also dropped `Church`, `BookOpen`, and `ArrowRight` icon imports that were only used by that section.

## [0.6.4] - 2026-06-17

### Changed

- **`/tourism`** — removed the redundant "What Makes Indang Unique" / Culture & Identity summary cards section. All five points (Historical Identity, Heritage & Architecture, Culture & Weaving, Local Produce, Natural Springs) are now covered in full detail by the four dedicated sections below the category grid (Heritage Landmarks, Culture & Traditions, Signature Products, Rivers & Springs). Also removed unused `CULTURE_HIGHLIGHTS` constant, `translatedHighlights` derivation, two scroll-reveal refs, and the `Star`/`Tent` icon imports.

## [0.6.3] - 2026-06-17

### Changed

- **`/tourism/history`** — stripped to timeline + stat cards only (hero, 7-event animated timeline, four key date cards). Removed Heritage Sites, Culture, Agriculture, and Springs sections.
- **`/tourism`** — added four new content sections below the category grid: Historical Landmarks, Culture & Traditions (weaving + Irok Festival), Signature Products, and Rivers & Springs. All sections are fully bilingual (EN/FIL).

## [0.6.2] - 2026-06-17

### Fixed

- Corrected historical name of the agricultural school: "Indang Agricultural School" → **Don Severino Agricultural College** (est. 1906), which was later renamed Cavite State University. Updated in `en/common.json`, `fil/common.json`, and `Indang-culture.md` bibliography.

## [0.6.1] - 2026-06-17

### Added

- **`/tourism/history`** — dedicated History of Indang page covering: full 7-event timeline, key stat cards (1655, 1897, 1906, 299m elevation), heritage landmarks (Bonifacio Shrine, St. Gregory Parish, Community Museum), culture & traditions (weaving, Irok Festival), signature agricultural products, and natural springs & rivers. Route declared before `/tourism/:category` so it takes precedence.
- History & Culture tile added to the Tourism index category grid, linking to `/tourism/history`.

### Changed

- Home `HistorySection` "Full history" link updated from `/statistics` to `/tourism/history`.

## [0.6.0] - 2026-06-17

### Changed

- **Home page layout** — reordered sections for a shorter, more intentional scroll: Hero → Stats → Featured Carousel → Services → Tourism → Plan Your Visit → Government → History → Leadership → Contact.
- **Featured Carousel** (`YakapPromoBanner`) — replaced the single YAKAP promo banner with a 2-slide auto-rotating carousel (6 s interval, pauses on hover). Slide 1: PhilHealth YAKAP; Slide 2: Discover Indang / Tourism. Includes prev/next chevrons and dot indicators.
- **TourismSection** — replaced the 4 detail highlight cards with a clean 2×3 category tile grid (icon + label + count badge per category). Less text, more visual, directly navigates to each category.
- **HistorySection** — reduced from 7 timeline events to 3 key milestones (Precolonial, Revolution, Present). Event text truncated to ~110 chars. Added "Full history →" link pointing to `/statistics`.
- **WeatherMapSection** → **"Plan Your Visit"** — reframed with driving times from Manila (1 hr 15 min), Tagaytay (25 min), and Cavite City (30 min) alongside the live weather widget. Added "Open in Google Maps" link.
- **StatsSection** — moved from position 4 to position 2 (directly below Hero) so visitors get at-a-glance municipality facts before any other content.

## [0.5.9] - 2026-06-17

### Changed

- **Route lazy loading** — all page components in `App.tsx` converted to `React.lazy()` with a `<Suspense>` fallback. Initial JS bundle reduced from 404 KB → 281 KB gzipped (~30%).
- **Self-hosted fonts** — removed all three Google Fonts external requests (Figtree, Inter, Roboto Mono). Replaced with `@fontsource-variable/figtree`, `@fontsource-variable/inter`, and `@fontsource/roboto-mono`, served from the same domain with `font-display: swap`. Latin + Latin-ext subsets only — eliminates the Cyrillic/Greek/Vietnamese font files that were previously bundled unnecessarily.
- **WebP images** — converted `CvSU.jpg` (1.1 MB → 834 KB) and `st-gregory-parish.jpg` (364 KB → 262 KB) to WebP. Updated references in `establishments.json`.

## [0.5.8] - 2026-06-17

### Added

- Google Analytics (gtag.js, ID: G-F86W87CQ3V) added to `index.html`.
- Website Carbon badge repositioned to below the "Contribute at GitHub" button in the footer (was in the bottom bar).

## [0.5.7] - 2026-06-17

### Added

- Website Carbon badge (`wcb-d` dark theme) in the footer bottom bar, showing the site's carbon rating. Script loaded dynamically via `useEffect` to avoid blocking render.

## [0.5.6] - 2026-06-17

### Added

- `scripts/generate-sitemap.js` — build-time script that reads `services.yaml`, `government.yaml`, and `content/tourism/establishments.json` to emit `public/sitemap.xml` with 69 URLs, correct priorities, and `lastmod` dates. Runs automatically at the end of `npm run build`; also available standalone via `npm run generate-sitemap`.
- `sitemap.xml` is now served at `https://betterindang.org/sitemap.xml` and ready for submission in Google Search Console.

## [0.5.5] - 2026-06-17

### Fixed

- Tourism page canonical URLs and `og:url` now point to the correct page path instead of always resolving to the site root — both the index (`/tourism`) and category views (`/tourism/:category`) pass their own URL to the `<SEO>` component.
- Category page SEO description is now bilingual: Filipino users get a Tagalog description instead of the previous hardcoded English string.
- `<meta name="language">` and `og:locale` in the shared `SEO` component are now driven by the active language rather than being hardcoded to `"English"` / `"en_US"`.
- Tourism index view is now wrapped in `<main>` to match the category view (accessibility + crawlability consistency).

### Added

- `SEO` component now accepts `lang` (drives `language` meta and `og:locale`) and `structuredData` (renders a `<script type="application/ld+json">` block) props.
- Tourism index emits `WebPage` + `BreadcrumbList` JSON-LD schema.
- Tourism category pages emit an `ItemList` of `LocalBusiness`/`TouristAttraction`/`Resort`/`FoodEstablishment`/`EventVenue` entries plus a `BreadcrumbList` — enabling Google rich results for individual establishments.

## [0.5.4] - 2026-06-13

### Changed

- Modernized Tailwind utility classes on the Yakap page to their canonical v4 forms (`max-h-[480px]` → `max-h-120`, `max-h-[400px]` → `max-h-100`, `min-h-[250px]` → `min-h-62.5`, `-left-[13px]` → `-left-3.25`, `bg-gradient-to-r` → `bg-linear-to-r`, `break-words` → `wrap-break-word`). Output is identical; clears the remaining canonical-class lint suggestions.

## [0.5.3] - 2026-06-13

### Fixed

- Added explicit `type="button"` to all 23 interactive buttons on the PhilHealth YAKAP page so they cannot accidentally submit a form (clears the corresponding code-scanning hints).

### Changed

- Removed duplicate and dead Tailwind classes on the Yakap page: a doubled `font-bold`, and three section headings that carried both `text-gray-900`/`dark:text-white` and an accent color (the accent color now applies cleanly).

## [0.5.2] - 2026-06-13

### Security

- Resolved CodeQL "externally-controlled format string" alert in `src/lib/markdownLoader.ts`: the user-controlled document slug is no longer interpolated into the `console.error` format string — it is passed as a separate argument with `%s` placeholders.
- Added a minimal `permissions: { contents: read }` block to the CI workflow (`.github/workflows/ci.yml`), resolving the CodeQL "workflow does not contain permissions" alert.
- Ran `npm audit fix` to patch 9 dependency vulnerabilities (5 high, 4 moderate) flagged by Dependabot — across `vite`, `react-router-dom`, `yaml`, `postcss`, `flatted`, `picomatch`, and `i18next-http-backend`. All are semver-compatible patch updates; `npm audit` now reports 0 vulnerabilities and the build still passes.

### Fixed

- Corrected an invalid `setup-node` input in CI (`node-size` → `node-version`) so the workflow actually pins Node 20.

## [0.5.1] - 2026-06-13

### Fixed

- Added an accessible name (`aria-label`) to the medicine-category filter `<select>` on the PhilHealth YAKAP page, resolving a "select element must have an accessible name" accessibility error.

### Docs

- Added a project governance rule in `CLAUDE.md`: `CHANGELOG.md` must be updated before every push (and every PR) so no undocumented or unmonitored changes reach the remote.

## [0.5.0] - 2026-06-12

### Added

- Universal scroll-reveal animation: page heroes and content sections now fade/slide in on scroll across the whole site (matching the homepage). New reusable `Reveal` component (`src/components/ui/Reveal.tsx`); the shared `Section` primitive now reveals automatically (opt out with `reveal={false}`). Applied to Statistics, Transparency, Legislative, Executive Directory, Sangguniang Bayan, Sitemap, NotFound, and all `Section`-based pages (Services, Government, Document, Yakap).
- `branding-consistency` skill expanded with rules for icons (lucide-react only), no emojis, and the scroll-reveal pattern.

### Changed

- Extracted the Yakap page's inline data (`LAB_TESTS`, `MEDICINE_DATABASE`, `MEDICINE_CATEGORIES`) into YAML under `src/data/yakap/`, loaded via `?raw` + `js-yaml`. `YakapInteractive.tsx` shrank from ~2760 to ~2190 lines.
- Replaced every emoji in the UI with lucide-react icons (Tourism highlights, Yakap tabs/cards/sections, Yakap promo banner, markdown task-list checks) and stripped emojis from locale strings, the data README, and the OG image template. The codebase is now emoji-free.

### Tooling

- `.gitignore` now tracks `.claude/skills/` (shared project skills) while keeping the rest of `.claude` local.

### Docs

- Moved the changelog out of `SECURITY.md` into this file (`CHANGELOG.md`) as the single canonical history; `SECURITY.md` is now the security policy only. Updated the `CLAUDE.md` versioning rule to point here.

## [0.4.4] - 2026-06-12

### Removed

- Removed the redundant "Back to Services" button at the bottom of the Yakap page (`/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap`); dropped the now-unused `react-router-dom` `Link` import.

### Added

- Project skill `branding-consistency` (`.claude/skills/branding-consistency/SKILL.md`) documenting the color tokens, hero-band blue (`#003087`), typography, logo variants, naming/voice, and shared UI primitives for consistent BetterIndang UI work.

## [0.4.3] - 2026-06-12

### Fixed

- Resolved build-breaking merge artifacts: malformed `RESOURCE_LINKS` object in `Footer.tsx`, and interleaved hardcoded/YAML JSX in `Statistics.tsx` that referenced deleted constants (`STATS`, `CMCI_PILLARS`, `RESOURCES`). `Statistics.tsx` rebuilt on the clean YAML-driven backbone with working bilingual (`isFil`) page chrome.

### Changed

- Consolidated to a single i18n setup. All components now access translations through the project `useTranslation` hook (`src/hooks/useTranslation.ts`) instead of importing `react-i18next` directly; the hook now accepts an optional namespace argument.
- Synced the app version to `0.4.3` across `package.json`, `Footer.tsx`, and the locale `copyright` strings (previously out of sync: `0.2.0` / `0.4.2`).
- Moved contributor guide docs into `/docs/` (`CONTENT-GUIDE`, `CONTENT-MANAGEMENT`, `DEPLOYMENT-GUIDE`, `INSPIRATION`, `STARTER-KIT-README`, `STARTER-KIT-SUMMARY`); updated README links.
- Updated `CLAUDE.md` routing and i18n sections to match the current app.
- Added `footer.officialWebsite` translation key (`en` + `fil`).

### Removed

- Dead/duplicate code: the unused `src/i18n/` directory (a second, competing i18n setup), `src/components/I18nTest.tsx`, `src/components/LanguageSwitcher.tsx`, `src/components/ui/ThemeSelector.tsx`, and `src/assets/react.svg`.

### Tooling

- Untracked `verify-and-push.ps1` (kept local) and added `*.ps1` to `.gitignore` so personal helper scripts are not committed.

## [0.4.2] - 2026-04-11

### Changed

- Converted `municipality-profile.md` → `municipality-profile.yaml` as canonical data source for `Statistics.tsx` (overview, stats, CMCI pillars, resources)
- Converted `barangay-list.md` → `barangay-list.yaml` as canonical data source for the barangay grid in `Statistics.tsx`
- `Statistics.tsx` now imports both YAML files via `js-yaml` and derives all rendered data from them; no hardcoded arrays remain
- Removed old MD files; cleared `reports-and-statistics/index.yaml` pages list

## [0.4.1] - 2026-04-11

### Changed

- "View Municipality Profile" link in home StatsSection now navigates to `/statistics` instead of the document viewer
- Barangay list in `Statistics.tsx` now sourced from `content/government/reports-and-statistics/barangay-list.md` (new file) instead of hardcoded data; all 36 Indang barangays with 2020 PSA population figures

## [0.4.0] - 2026-04-11

### Added

- New 404 Not Found page (`src/pages/NotFound.tsx`) with links to homepage and browser back navigation; registered as catch-all route in `App.tsx`

## [0.3.4] - 2026-04-11

### Changed

- Moved `logo.svg`, `logo-clear.svg`, and `favicon.svg` to `public/icons/`; updated all references in `index.html`, `SEO.tsx`, `Navbar.tsx`, and `Footer.tsx`

## [0.3.3] - 2026-04-11

### Changed

- Added official Indang government website link (`indang.gov.ph`) to the Resources section in the footer

## [0.3.2] - 2026-04-09

### Security

- Fixed CWE-134 (externally-controlled format string) in `src/lib/markdownLoader.ts` and `src/data/yamlLoader.ts`: user-controlled slugs are now passed as separate arguments to `console.error`/`console.warn` instead of being interpolated into the format string

## [0.3.1] - 2026-04-08

### Added

- Added `/government/reports-and-statistics/municipality-profile` — full DTI CMCI 2024 profile for Indang (149th nationally, Innovation rank 15th, all 5 pillars with 10 sub-indicators each)
- Created `content/government/reports-and-statistics/index.yaml` and `municipality-profile.md`
- Registered `reports-and-statistics` in `src/data/yamlLoader.ts` (`categoryIndexMap`)

### Changed

- Corrected CvSU Facebook link to `https://www.facebook.com/CaviteStateU` and added `website` field in `content/tourism/establishments.json`

## [0.3.0] - 2026-04-08

### Added

- Added **Tourism** as a navigation entry inside the Services dropdown in the Navbar (`src/data/navigation.ts`)
- Created `/sitemap` page (`src/pages/Sitemap.tsx`) — full portal sitemap with card grid layout linked from footer Quick Links
- Added `sitemap` route to `src/App.tsx`
- `EstablishmentCard` now displays real photos from `public/tourism/` for mapped entries (Bonifacio Shrine, St. Gregory Parish, CvSU Main Campus, CvSU Agri-Eco Tourism Park)
- Added `image` field support to `content/tourism/establishments.json`

### Changed

- Cards without photos now show a travel-related category icon on a soft colored background instead of the vite.svg placeholder
- Expanded `CATEGORY_COLORS` with `placeholder` and `icon` color tokens per category

## [0.2.0] - 2026-04

### Added

- Added Municipal Mayor to the presiding officer section
- Added Executive Office Directory page (`/government/departments/executive`) with data from `executive.json`
- Added Local Officials Directory page (`/government/departments/officials`)
- Added Sangguniang Bayan page with real councilor data
- Added `.env` configuration for local government website branding

### Changed

- Applied updated logo across all pages
- Restructured navigation to BetterTagaytay pattern
- Populated real Indang, Cavite data across tourism, statistics, and government sections
- Government navigation consolidated and route paths corrected

## [0.1.0] - Initial Release

### Added

- Initial BetterIndang portal scaffolded from BetterTagaytay reference
- React 19 + TypeScript + Vite + Tailwind CSS + React Router
- YAML-based content system for services and government pages
- i18next multilingual support (English / Filipino)
- Home, Services, Government, Transparency, Statistics, Tourism, Legislative pages
- Emergency hotlines bar and info bar (forex, temperature, datetime) in Navbar
- Footer with Quick Links and Resources
- AWS S3 deployment via Terraform
