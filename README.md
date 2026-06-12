# BetterIndang

A community-run web portal for the **Municipality of Indang, Cavite** — one bilingual (English / Filipino) place for residents to find local government services, departments and officials, statistics, tourism, and transparency information.

> **Not an official government website.** BetterIndang is a volunteer, community-built project. For official transactions and confirmation, always reach out to the Municipality of Indang or the relevant national agency.

## What's inside

- **Services** — citizen-facing guides (health, business, education, social welfare, environment, disaster preparedness, and more) with requirements and step-by-step processes.
- **Government** — Executive Office directory, Sangguniang Bayan, Legislative information, departments, and reports.
- **Statistics** — Indang's municipal profile and the full DTI CMCI competitiveness breakdown, plus population figures for all 36 barangays — driven entirely from YAML data.
- **Tourism** — heritage sites, spring resorts, and agri-eco destinations.
- **Transparency** — budgets, financial reports, and FOI references.
- **PhilHealth YAKAP** — an interactive guide to free check-ups, 13 covered laboratory tests, and the ₱20k medicines package available at the Indang Rural Health Unit.

Everything is **bilingual (English / Filipino)**, fully responsive, SEO-ready, and animates in on scroll for a polished feel.

## Built on the Local Government Website Starter Kit

BetterIndang stands on the shoulders of the **[Local Government Website Starter Kit](https://github.com/iyanski/betterlocalgov)** — an open-source (CC0) template for Philippine LGU websites created by **[iyanski](https://github.com/iyanski)** with contributors including **[Nicu Listana](https://github.com/niculistana)**.

If you're building a portal for another city or municipality, **start there** — please give the project a star. The starter kit ships with:

- Multilingual support (English, Filipino, and other Philippine languages)
- A YAML + Markdown content system that non-technical staff can edit
- An interactive `npm run setup` wizard to configure your LGU's details
- Accessibility (WCAG 2.1) and built-in SEO / Open Graph
- Easy theming and a modern React + TypeScript + Tailwind foundation

BetterIndang is essentially that template **adapted for a real municipality** — treat this repo as a worked example of what the starter kit can become.

## Tech stack

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · React Router 7 · i18next · [@bettergov/kapwa](https://github.com/bettergov/kapwa) UI primitives · [lucide-react](https://lucide.dev/) icons · js-yaml.

## Run locally

**Prerequisites:** Node.js 20+, npm, Git.

```bash
git clone https://github.com/michaustriaqa/betterindang.git
cd betterindang
npm install
npm run dev
```

Then open `http://localhost:5173`.

> Starting a brand-new LGU site instead? Fork the [starter kit](https://github.com/iyanski/betterlocalgov) and run `npm run setup` to configure it for your municipality.

## Scripts

| Script                      | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| `npm run dev`               | Start the dev server (`localhost:5173`)   |
| `npm run build`             | Type-check and build for production       |
| `npm run preview`           | Preview the production build              |
| `npm run lint` / `lint:fix` | Run / auto-fix ESLint                     |
| `npm run format`            | Format with Prettier                      |
| `npm run dev:yaml`          | Convert YAML data to JSON, then start dev |
| `npm run setup`             | Interactive setup for a new installation  |

A pre-commit hook (Husky + lint-staged) runs ESLint and Prettier on staged files.

## Project structure

```
content/
  government/        # Departments, officials, reports (YAML + Markdown)
  services/          # Citizen services (YAML + Markdown)
  tourism/           # Tourism establishments (JSON)

src/
  components/
    home/            # Home page sections
    layout/          # Navbar, Footer
    sections/        # Hero and large shared sections
    ui/              # Primitives: Section, Heading, Text, Reveal, Breadcrumbs, ...
  data/              # services.yaml, government.yaml, navigation, yakap/ datasets
  hooks/             # useTranslation, useScrollReveal
  i18n.ts            # i18next setup (loads public/locales/{lang}/common.json)
  lib/               # markdownLoader, yamlLoader, markdown components
  pages/             # Route components (Home, Services, Government, Statistics, ...)
  types/             # Shared TypeScript types

public/
  icons/             # Logos and favicon
  locales/{en,fil}/  # Translation files
  tourism/           # Tourism photos
```

## Editing content

Most content lives as YAML and Markdown under `content/` and can be edited without touching code. See the guides in [`docs/`](docs/):

- [docs/CONTENT-MANAGEMENT.md](docs/CONTENT-MANAGEMENT.md) — non-technical, step-by-step editing
- [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) — content writing conventions
- [docs/DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md) — deployment instructions
- [docs/STARTER-KIT-README.md](docs/STARTER-KIT-README.md) — full starter-kit setup and customization reference
- [CHANGELOG.md](CHANGELOG.md) — version history and release notes

Project conventions for contributors and AI assistants are documented in [CLAUDE.md](CLAUDE.md).

## Contributing

Contributions are welcome — content fixes, translations, new service pages, and code improvements. For content, edit the relevant files under `content/` (the GitHub web editor works fine for small changes). For code, fork, branch, run `npm run lint && npm run build`, and open a pull request.

## License

Released under the **Creative Commons Zero (CC0 1.0 Universal)** license — public domain, no attribution required (though crediting BetterIndang and the starter kit is appreciated). See [LICENSE](LICENSE).

## Acknowledgments

- **[Local Government Website Starter Kit](https://github.com/iyanski/betterlocalgov)** by [iyanski](https://github.com/iyanski) and [Nicu Listana](https://github.com/niculistana) — the template BetterIndang is built on.
- [BetterGov.ph](https://bettergov.ph) and the [@bettergov/kapwa](https://github.com/bettergov/kapwa) component library.
- Data sources: Philippine Statistics Authority (PSA), DTI Cities and Municipalities Competitiveness Index (CMCI), and PhilHealth.
- Built with React, Tailwind CSS v4, lucide-react, i18next, and js-yaml.

---

Made by the community, for the people of Indang, Cavite.
