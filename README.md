# Trevia

Trevia is a modern travel planner app built with Next.js, Tailwind CSS, and Supabase. Plan your journeys, manage your activities, and explore destinations with a beautiful, responsive interface.

## Features

- 🗺️ Discover and save destinations, hotels, and activities
- 📅 Plan and manage your itineraries
- ❤️ Favorites system for destinations, hotels, and activities
- 🔒 Auth with Supabase (email/password)
- 🌗 Light/Dark mode toggle
- 📱 Mobile-first responsive design
- ⚡ Fast navigation with persistent bottom nav bar
- 🔔 Toast notifications
- ✨ Beautiful UI with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn
- [Supabase](https://supabase.com/) project (for authentication and data)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/kaho0/Trevia.git
   cd Trevia
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```
3. **Configure environment:**
   - Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `/app` — Next.js app directory (pages, layouts, API routes)
- `/components` — React components (UI, layout, screens)
- `/styles` — Global styles (Tailwind CSS)
- `/hooks` — Custom React hooks
- `/types` — TypeScript types (e.g., Supabase)
- `/public` — Static assets (images, fonts)

## Customization
- Update branding in `/components/login-screen.tsx` and other UI components as needed.
- Modify theme colors in `tailwind.config.ts`.

