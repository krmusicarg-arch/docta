# Docta Music Site — Workspace Guidelines

## Code Style

**React & Components**
- All components use PascalCase naming (e.g., `MusicPlayer.jsx`, `TrackList.jsx`)
- Functional components with React Hooks: `useState`, `useEffect`, `useRef`, `useContext`
- No TypeScript—plain JavaScript/JSX

**Styling**
- Hybrid approach: Global CSS variables in `src/index.css` + component-level inline styles
- CSS variables for theme (colors like `--color-bg: #050505`, `--gold: #d4a017`)
- Complex components may have companion `.css` files (e.g., `PromoBanner.css`)
- Use Framer Motion for animations (imported from `framer-motion` package)

**Icon Library**
- Use `lucide-react` for icons (Play, Pause, Menu, etc.)

## Architecture

**Component Organization** ([src/components/](src/components/) + [src/context/PlayerContext.jsx](src/context/PlayerContext.jsx))
- [App.jsx](src/App.jsx): Root orchestrator, wraps everything in `<PlayerProvider>`
- Page sections: `Hero`, `Tour`, `FeaturedVideos`, `TrackList`, `Gallery`, `Header`, `Footer`, `MusicPlayer` (floating player)
- Shared state via Context API—no Redux

**Global State Pattern** (using Context)
- [PlayerContext.jsx](src/context/PlayerContext.jsx): Manages music playback state, track list, current index, volume, play/pause state
- Custom hook: `usePlayer()` to access context from any component
- Example usage: `const { tracks, isPlaying, playTrack } = usePlayer()`

**Key Exemplar Files**
- [MusicPlayer.jsx](src/components/MusicPlayer.jsx): Complex hooks, useRef for DOM, Framer Motion animations (~150 lines)
- [TrackList.jsx](src/components/TrackList.jsx): Context consumption, data mapping, inline event handlers
- [Header.jsx](src/components/Header.jsx): Side effects, PWA install prompt, scroll detection

## Build and Test

**Commands**
```bash
npm install                     # Install dependencies
npm run dev                     # Start Vite dev server (port 5173)
npm run build                   # Production build to /dist
npm run lint                    # ESLint (js, jsx)
npm run preview                 # Preview production build locally
```

**Build System**: Vite 5 + @vitejs/plugin-react

**Special Features**
- PWA-ready: Service worker registration in [main.jsx](src/main.jsx)
- ESLint with React-specific rules (react, react-hooks, react-refresh plugins)

## Conventions

**Project Context**
- **Purpose**: Tribute website for Docta Boss (Creedence Clearwater Revival cover band)
- **UI Language**: Spanish (e.g., "Nuestra música", "Escucha")
- **Theme**: Dark background (#050505) with gold accents (#d4a017)

**Component Patterns**
1. **Fetching global state**: Use `const { field } = usePlayer()` at component top
2. **Updating playback**: Call context methods like `playTrack(index)` from event handlers
3. **Styling**: Prefer inline styles for simple cases; create `.css` file for reusable or complex styles
4. **Animations**: Use Framer Motion's `motion.*` components and `animate` props

**File Structure Rules**
- Components go in [src/components/](src/components/) (one file per component)
- Context providers go in [src/context/](src/context/)
- Global CSS in [src/index.css](src/index.css); component CSS in peer `.css` files
- Public assets in [public/](public/) (manifest, service worker, media folders)

**Team Practices**
- No TypeScript—keep it simple
- Leverage React Hooks for state and side effects
- Use Context API sparingly (only for truly global state like playback)
- ESLint rules must pass before commit
