# Vedant Dubey — Portfolio

Personal portfolio site for an AI engineer: shipped projects, certifications, and experience across LLMs, RAG systems, and full-stack engineering.

**Live:** [vedantdubey.com](https://vedantdubey.com)

## Features

- Responsive layout down to small mobile widths
- Motion-heavy interface built with Framer Motion, with a full `prefers-reduced-motion` fallback (animations, custom cursor, and canvas loops all switch off)
- Canvas constellation background, liquid mouse trail, and a magnetic custom cursor, all disabled on touch devices and for reduced-motion users
- Keyboard-accessible throughout: skip link, visible focus rings, an operable mobile nav, and a certificate lightbox with `role="dialog"`, focus trapping, and Escape-to-close
- 3D tag cloud for the skills section
- Project cards for nine deployed applications with live demo and source links
- Interactive experience timeline with scroll-triggered counters
- Certificate gallery with a full-size lightbox
- Open Graph / Twitter Card metadata and JSON-LD `Person` schema for link previews and search

## Tech stack

**Frontend** — React 19, Vite 7, Framer Motion 12, Lucide React, TagCloud

**Backend** (optional, see below) — Node.js, Express 5, MongoDB, Mongoose 9, Multer

## Repository layout

The frontend is the site. The `backend/` directory is a standalone Express API for
persisting contact-form submissions and certificate uploads; **the deployed
frontend does not currently call it**, so the site builds and runs as a
static SPA with no server required.

```
Portfolio/
├── public/                    # Static assets served as-is
│   ├── certificates/          # Certificate images used by the gallery
│   └── og-image.jpg           # 1200x630 social preview card
├── src/
│   ├── assets/                # Bundled images, resume PDF
│   ├── components/
│   │   ├── Hero.jsx           # Landing section + portrait
│   │   ├── About.jsx
│   │   ├── Skills.jsx         # 3D tag cloud
│   │   ├── BrutalistProjects.jsx   # Full-bleed project showcase
│   │   ├── DeployedProjects.jsx    # Filterable grid of live apps
│   │   ├── Experience.jsx     # Timeline + animated stats
│   │   ├── Achievements.jsx
│   │   ├── Certifications.jsx # Card stack + lightbox
│   │   ├── Contact.jsx
│   │   ├── Navbar.jsx
│   │   ├── Background.jsx     # Canvas constellation
│   │   ├── CustomCursor.jsx
│   │   ├── LiquidTrail.jsx
│   │   └── Preloader.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Design tokens, focus styles, reduced-motion
├── backend/
│   ├── models/                # Mongoose schemas
│   ├── server.js              # Express API
│   ├── .env.example
│   └── package.json
├── index.html                 # Meta tags, JSON-LD, font preconnects
└── package.json
```

## Prerequisites

- Node.js 20 or newer
- npm
- MongoDB — only if you want to run the backend API

## Running the frontend

```bash
git clone https://github.com/vedantdubey19/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run lint      # ESLint
npm run build     # Production build into dist/
npm run preview   # Serve the built output locally
```

## Running the backend (optional)

```bash
cd backend
npm install
cp .env.example .env    # then fill in the values
npm start
```

`backend/.env` requires:

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGO_URI` | yes | MongoDB connection string. The server exits if it is missing or unreachable. |
| `ADMIN_TOKEN` | yes | Bearer token required by `POST /api/certificates`. Minimum 32 characters. |
| `PORT` | no | Defaults to `5001`. |
| `ALLOWED_ORIGINS` | no | Comma-separated CORS allowlist. Defaults to `http://localhost:5173`. |

Generate an admin token with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### API

| Method | Route | Auth | Notes |
| --- | --- | --- | --- |
| `GET` | `/api/health` | — | Reports process and database status |
| `GET` | `/api/certificates` | — | Most recent 100 certificates |
| `POST` | `/api/certificates` | `Authorization: Bearer <ADMIN_TOKEN>` | Multipart upload; JPEG/PNG/WebP only, 5 MB cap, rate limited |
| `POST` | `/api/contact` | — | Validates email and length, rate limited to 5 requests per 15 minutes per IP |

## Deployment

The frontend is a static build — `npm run build` produces `dist/`, which deploys
as-is to Vercel, Netlify, or any static host. If you deploy the backend
separately, add its public origin to `ALLOWED_ORIGINS` and keep `.env` out of
version control.

## License

MIT — see [LICENSE](LICENSE).

## Contact

Vedant Dubey — [vedantdubey.1302@gmail.com](mailto:vedantdubey.1302@gmail.com) · [LinkedIn](https://www.linkedin.com/in/vedant-dubey-a9697b278/) · [GitHub](https://github.com/vedantdubey19)
