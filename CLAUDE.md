# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:4200
npm run build      # production build
npm test           # run all tests (Vitest via ng test)
npm run test-chr   # run tests in Chromium
npm run test-chr-hdls  # run tests headless
```

To run tests for a specific feature, edit the `test-one` script pattern in `package.json` and run `npm run test-one`, or pass `--include` directly:
```bash
npx ng test --include='**/pet-create/*.spec.ts'
```

## Tech Stack

- **Angular 21** — standalone components, no NgModules, zoneless-ready
- **PrimeNG 21** with Aura theme (`@primeuix/themes/aura`)
- **Tailwind CSS v4** (PostCSS plugin)
- **Vitest** as test runner (configured via `@angular/build:unit-test`)
- **MSW (Mock Service Worker)** — intercepts HTTP in dev mode via a Service Worker; no real backend exists

## Architecture

### Feature Structure
Each feature (`pet/`, `vet/`) follows the same layout:
```
src/<feature>/
  model/        # interfaces + FormGroup factory functions
  components/   # reusable form components (accept FormGroup via input())
  pages/        # routed page components (own the FormGroup instance)
```

### Form Pattern
- `model/<Feature>FormGroup.ts` exports a factory function (e.g. `getPetFormGroup()`) that returns a typed FormControls object — keeps form shape reusable across create/update/wizard pages.
- `components/<feature>-form/` is a presentational component that receives a `FormGroup` via `input.required<FormGroup<...>>()` and a `formSubmitted` signal. Validation display logic lives here.
- Page components (e.g. `PetCreate`, `VetWithPets`) own the `FormBuilder`-constructed `FormGroup`, pass sub-groups/arrays down to form components, and call the HTTP API on submit.

### Wizard (VetWithPets)
`vet/pages/vet-with-pets/` demonstrates a multi-step form using PrimeNG `Stepper`. A root `FormGroup` contains a nested `vet` sub-group and a `pets` `FormArray`. Both reusable form components (`VetForm`, `PetForm`) are embedded in separate stepper panels.

### Mock Backend (MSW)
`src/mocks/` contains:
- `browser.ts` — sets up the MSW service worker
- `handlers.ts` — REST handlers for `/api/pets` and `/api/vetWithPets`
- `pets.db.ts` — in-memory data store (resets on page reload)

MSW is started in `main.ts` only in `isDevMode()`. The `mockServiceWorker.js` file is served as a static asset (configured in `angular.json`).

### Global Providers
`src/app/app.config.ts` — provides `provideRouter` (with `withComponentInputBinding`), `providePrimeNG`, and `MessageService`.

`src/test-providers.ts` — shared test providers (`provideHttpClient`, `provideHttpClientTesting`, `MessageService`), referenced by `angular.json` `test.options.providersFile`.

### Layout
`src/app-layout/` wraps all pages. It renders a PrimeNG `<p-toast>`, side nav via `<p-menu>`, and projects page content via `<ng-content>`. `App` component wraps `<router-outlet>` inside `<app-layout>`.

## Code Style

Prettier is configured (100 char width, single quotes, Angular HTML parser for templates). TypeScript strict mode is enabled including `strictTemplates`.