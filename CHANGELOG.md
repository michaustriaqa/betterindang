# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR** — breaking changes to the content schema, routing, or public API
- **MINOR** — new pages, sections, or significant features added
- **PATCH** — bug fixes, content updates, styling tweaks, dependency updates

The displayed version in the footer (`src/components/layout/Footer.tsx`) must be kept in sync with the latest entry here.

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
