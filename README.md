# Dhaval Kamaliya — UI/UX Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS and TanStack Router.

## Run locally

```sh
npm install
npm run dev
```

## Edit content

- Profile, contact links and projects: `src/data/portfolio.ts`
- Case study details: `src/data/caseStudies.ts`
- Project images: put them in `src/assets/` using these names (png, jpg or webp):
  `safar-mobile-app-mockup-v2`, `job-portal-mobile-app-mockup-v2`,
  `food-delivery-rider-mockup-v2`, `reminder-app`, `inventory-management`, `onboarding-screens`

## Deploy (GitHub Pages)

Push to `main`. In the repository go to **Settings → Pages → Source: GitHub Actions**.
The workflow in `.github/workflows/deploy.yml` builds and publishes the site automatically.
