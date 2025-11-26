# A/B Test Chart

Interactive line chart for visualizing A/B test conversion rates.

## Run Locally

```bash
npm install
npm run dev
```

Build: `npm run build`

## Tech Stack

- **React 19** + **TypeScript**
- **Recharts** - charting library
- **Zustand** - state management
- **Lodash** + **date-fns** - data aggregation
- **html2canvas** - PNG export
- **CSS Modules** - styling

## Features

### Core
- Line chart showing conversion rates for all variations
- Hover tooltip with vertical line and daily data
- At least one variation always selected
- Axes adapt to visible data range
- Day/Week aggregation selector
- Variations selector (toggle lines)
- Responsive layout (671-1300px)

### Bonus
- **Zoom**: Click and drag on chart to select range, "Reset Zoom" button appears
- **Line styles**: Line (linear), Smooth (monotone), Area (filled)
- **Theme**: Light/Dark toggle, persisted in localStorage
- **Export PNG**: Downloads chart as image
