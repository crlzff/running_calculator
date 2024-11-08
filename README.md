# Running Calculator

A web application for runners to calculate pace, time, and distance for their runs.

See it running: runcal.crlzff.xyz

## Main Functions

- Calculate pace given distance and time
- Calculate time given distance and pace
- Calculate distance given time and pace
- Support for multiple units (km/mi, min/km, min/mi)
- Multilingual support (English and Italian)

## Technologies Used

- React.js
- Vite (build tool)
- Tailwind CSS (for styling)
- ESLint (for code linting)
- PostCSS (for CSS processing)

## Custom Hooks

- `useCalculator`: Manages the calculation logic
- `useDocumentMeta`: Handles  metadata
- `useLanguage`: Manages language selection and translation

## Components
- DistanceInput
- NumberInput
- PaceInput
- TimeInput

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Build for production: `npm run build`