# Empathy

Your AI-powered investing companion for low-risk assets.

## Quick Start

```bash
npm install
npm start
```

## Features

- Connect card and set monthly investment amount
- Auto-Invest or approve Empathy's recommendations
- Smart analysis of gold, bonds, and conservative ETFs
- Track portfolio and profits in real time
- Complete investment history

## Tech Stack

- React Native
- Expo Router (file-based routing)
- TypeScript
- Context API

## Project Structure

```
app/
├── (tabs)/          # Tab navigation screens
├── _layout.tsx      # Root layout
├── index.tsx        # Entry point
├── onboarding.tsx   # Onboarding flow
├── card-linking.tsx
└── monthly-plan.tsx

src/
├── context/         # State management
└── types/          # TypeScript types
```

## Run Commands

- `npm start` - Start Expo
- `npm run android` - Android build
- `npm run ios` - iOS build
- `npm run web` - Web build
