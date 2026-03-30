# SIGNAL — The Real-Time Problem in Social Media

A premium monochrome social media platform documenting the signal and the noise.

## Stack

- **React 18 + Vite** — fast dev experience, component-based
- **React Router v6** — client-side routing with nested layouts
- **Zustand** — lightweight state management
- **TailwindCSS** — utility-first styling with CSS variable token bridge
- **Framer Motion** — page transitions + micro-animations
- **Recharts** — analytics charts
- **Lucide React** — icon set

## Design

Premium monochrome aesthetic. Black, white, and zinc grays only — no color. Editorial typography with Cormorant Garamond (display) + DM Sans (body) + DM Mono.

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

**Demo credentials:** `editorial_void` / `signal123`

## Features

- **Auth** — Login/signup with local state persistence
- **Real-Time Feed** — Posts queue every 8–14 seconds; click banner to load
- **Post Creation** — Compose posts with hashtag parsing
- **Likes / Comments / Reposts** — Optimistic interaction updates
- **Dashboard** — Engagement area chart, trending bar chart, activity heatmap, stat cards with count-up animations
- **Dark/Light Toggle** — Smooth theme switch, persisted to localStorage
- **Profile** — Per-user post grid, follow/unfollow, edit profile modal
- **Explore** — Debounced search, trending topics, hashtag feeds

## Project Structure

```
src/
├── components/
│   ├── ui/          # Primitive components (Button, Input, Avatar, etc.)
│   ├── layout/      # AppShell, Sidebar, BottomNav, TopBar, ThemeToggle
│   ├── feed/        # PostCard, PostComposer, FeedList, NewPostsBanner
│   ├── analytics/   # Charts, StatCard, ActivityHeatmap
│   ├── profile/     # ProfileHeader, EditProfileModal, ProfilePostGrid
│   ├── explore/     # SearchBar, TrendingList, HashtagFeed
│   └── auth/        # LoginForm, SignupForm, AuthGuard
├── pages/           # Route-level page components
├── store/           # Zustand stores (auth, feed, ui, analytics, explore)
├── hooks/           # Custom hooks (useRealTimeFeed, useTheme, useDebounce, etc.)
├── data/            # Mock data and post generator
├── utils/           # Formatters, validators, constants
└── styles/          # globals.css (CSS variable theme bridge)
```
