# Tech Stack

## Frontend

- **React** with **Vite** (plain JSX, not TypeScript)
- **React Router** for routing
- **Tailwind CSS** for styling
- **Framer Motion** for transitions and step animations

## Backend / Data

- **Supabase** for database (Postgres), auth, and storage
- Row Level Security enabled on every table
- Client-side API calls only; Vercel serverless functions for anything that needs a secret (Anthropic API)

## Deployment

- **Vercel** for hosting and serverless functions
- Serverless functions live in `/api` at the project root (Vercel convention)

## Key Libraries

- **react-simple-maps** + custom Berlin GeoJSON for the district map
- **react-dropzone** for document/photo uploads
- **Anthropic SDK** (server-side only, via Vercel function) for cover letter generation

## Project Structure

```
src/
  lib/          # supabase client, anthropic calls, helpers
  context/      # OnboardingContext (form state across steps)
  hooks/        # useOnboarding, useDistricts, useFormPersist
  components/
    ui/         # Button, Input, Card, ProgressBar, Chip, SkipButton
    map/        # BerlinMap, DistrictChip
    sections/   # Section1, Section2, Section3, Section4, Section5
  pages/        # Onboarding.jsx, CoverLetterReview.jsx, Done.jsx, Dashboard.jsx
api/
  generate-cover-letter.js   # Vercel serverless, calls Anthropic
```

## Folders NOT to create

- `/utils`: put utilities in `/lib` with descriptive names
- `/services`: `/lib` covers it
- `/types`: plain JSX project
- `/styles`: Tailwind + index.css is enough

## Environment Variables

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_NOTIFY_WEBHOOK_URL    # Supabase Edge Function URL for submission notifications
VITE_WHATSAPP_NUMBER       # E.164 format without +, e.g. 4915123456789 — shown on Done screen
ANTHROPIC_API_KEY          # server-side only, no VITE_ prefix
```

## Setup Commands

```bash
npm create vite@latest wohnungsfinder-onboarding -- --template react
cd wohnungsfinder-onboarding
npm install
npm install @supabase/supabase-js react-router-dom
npm install framer-motion
npm install react-simple-maps
npm install react-dropzone
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
mkdir -p src/lib src/context src/hooks src/components/ui src/components/map src/components/sections src/pages api
```

---

## Adding new tools

This stack is the default. If a project genuinely needs something not on this list, just add it. But:

- Update this file when you do, so the next Claude Code session knows.
- Briefly note why it was added.
- Don't replace existing tools without flagging it to the user first.
