# Security & Versioning

This file tracks the version history and changelog for BetterIndang. It also documents the project's security policy.

---

## Versioning Policy

BetterIndang follows [Semantic Versioning](https://semver.org/):

- **MAJOR** — breaking changes to the content schema, routing, or public API
- **MINOR** — new pages, sections, or significant features added
- **PATCH** — bug fixes, content updates, styling tweaks, dependency updates

The displayed version in the footer (`src/components/layout/Footer.tsx`) must be kept in sync with the latest entry in this file.

---

## Changelog

### v0.4.2 — 2026-04-11

**Changed**

- Converted `municipality-profile.md` → `municipality-profile.yaml` as canonical data source for `Statistics.tsx` (overview, stats, CMCI pillars, resources)
- Converted `barangay-list.md` → `barangay-list.yaml` as canonical data source for the barangay grid in `Statistics.tsx`
- `Statistics.tsx` now imports both YAML files via `js-yaml` and derives all rendered data from them; no hardcoded arrays remain
- Removed old MD files; cleared `reports-and-statistics/index.yaml` pages list

---

### v0.4.1 — 2026-04-11

**Changed**

- "View Municipality Profile" link in home StatsSection now navigates to `/statistics` instead of the document viewer
- Barangay list in `Statistics.tsx` now sourced from `content/government/reports-and-statistics/barangay-list.md` (new file) instead of hardcoded data; all 36 Indang barangays with 2020 PSA population figures

---

### v0.4.0 — 2026-04-11

**Added**

- New 404 Not Found page (`src/pages/NotFound.tsx`) with links to homepage and browser back navigation; registered as catch-all route in `App.tsx`

---

### v0.3.4 — 2026-04-11

**Changed**

- Moved `logo.svg`, `logo-clear.svg`, and `favicon.svg` to `public/icons/`; updated all references in `index.html`, `SEO.tsx`, `Navbar.tsx`, and `Footer.tsx`

---

### v0.3.3 — 2026-04-11

**Changed**

- Added official Indang government website link (`indang.gov.ph`) to the Resources section in the footer

---

### v0.3.2 — 2026-04-09

**Security**

- Fixed CWE-134 (externally-controlled format string) in `src/lib/markdownLoader.ts` and `src/data/yamlLoader.ts`: user-controlled slugs are now passed as separate arguments to `console.error`/`console.warn` instead of being interpolated into the format string

---

### v0.3.1 — 2026-04-08

**Content**

- Added `/government/reports-and-statistics/municipality-profile` — full DTI CMCI 2024 profile for Indang (149th nationally, Innovation rank 15th, all 5 pillars with 10 sub-indicators each)
- Created `content/government/reports-and-statistics/index.yaml` and `municipality-profile.md`
- Registered `reports-and-statistics` in `src/data/yamlLoader.ts` (`categoryIndexMap`)
- Corrected CvSU Facebook link to `https://www.facebook.com/CaviteStateU` and added `website` field in `content/tourism/establishments.json`

---

### v0.3.0 — 2026-04-08

**Features**

- Added **Tourism** as a navigation entry inside the Services dropdown in the Navbar (`src/data/navigation.ts`)
- Created `/sitemap` page (`src/pages/Sitemap.tsx`) — full portal sitemap with card grid layout linked from footer Quick Links
- Added `sitemap` route to `src/App.tsx`

**Tourism**

- `EstablishmentCard` now displays real photos from `public/tourism/` for mapped entries (Bonifacio Shrine, St. Gregory Parish, CvSU Main Campus, CvSU Agri-Eco Tourism Park)
- Cards without photos now show a travel-related category icon on a soft colored background instead of the vite.svg placeholder
- Added `image` field support to `content/tourism/establishments.json`
- Expanded `CATEGORY_COLORS` with `placeholder` and `icon` color tokens per category

---

### v0.2.0 — 2026-04

**Features**

- Added Municipal Mayor to the presiding officer section
- Applied updated logo across all pages
- Added `.env` configuration for local government website branding
- Added Executive Office Directory page (`/government/departments/executive`) with data from `executive.json`
- Added Local Officials Directory page (`/government/departments/officials`)
- Added Sangguniang Bayan page with real councilor data
- Restructured navigation to BetterTagaytay pattern
- Populated real Indang, Cavite data across tourism, statistics, and government sections
- Government navigation consolidated and route paths corrected

---

### v0.1.0 — Initial Release

**Features**

- Initial BetterIndang portal scaffolded from BetterTagaytay reference
- React 19 + TypeScript + Vite + Tailwind CSS + React Router
- YAML-based content system for services and government pages
- i18next multilingual support (English / Filipino)
- Home, Services, Government, Transparency, Statistics, Tourism, Legislative pages
- Emergency hotlines bar and info bar (forex, temperature, datetime) in Navbar
- Footer with Quick Links and Resources
- AWS S3 deployment via Terraform

---

## Security Policy

BetterIndang is a **community portal** — not an official government system. It does not handle authentication, payments, or sensitive personal data.

### Reporting a Vulnerability

If you discover a security issue (e.g., XSS, exposed credentials, dependency vulnerability), please report it by:

1. **Opening a GitHub issue** at [michaustriaqa/betterindang](https://github.com/michaustriaqa/betterindang) with the label `security`
2. Or **emailing the maintainer** directly (contact via the GitHub profile)

Please do not publicly disclose the vulnerability until it has been reviewed and addressed.

### Scope

| Area                                          | In Scope                      |
| --------------------------------------------- | ----------------------------- |
| XSS via markdown rendering                    | Yes                           |
| Exposed API keys or `.env` values in the repo | Yes                           |
| Dependency vulnerabilities (npm audit)        | Yes                           |
| Phishing / social engineering                 | No                            |
| The official LGU Indang government systems    | No — contact the LGU directly |

### Supported Versions

Only the latest release on the `main` branch is actively maintained.
