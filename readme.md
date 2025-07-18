# SpaceX Launch Portal

A modern web application built with Next.js 14, TypeScript, and Tailwind CSS to track and explore SpaceX launches, missions, and rocket data.

## Features

- 🚀 Real-time SpaceX launch tracking
- 📡 Historical mission data
- 🛸 Rocket fleet information
- 📱 Responsive design
- ⚡ Fast performance with Next.js 14

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **API:** SpaceX API v4
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd spacex-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
spacex-portal/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                   # Utility functions
│   └── api.ts            # SpaceX API functions
├── types/                 # TypeScript type definitions
│   └── index.ts          # SpaceX API types
├── public/               # Static assets
└── ...config files
```

## API Integration

This project uses the official SpaceX API v4 to fetch:
- Launch data (upcoming and historical)
- Rocket information
- Company details

API base URL: `https://api.spacexdata.com/v4`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass and code is linted
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [SpaceX API](https://api.spacexdata.com) for providing the data
- [Next.js](https://nextjs.org) for the framework
- [Tailwind CSS](https://tailwindcss.com) for styling
