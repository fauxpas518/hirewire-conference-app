# HireWire Conference App

A modern mobile-first Progressive Web App (PWA) designed for conference networking and attendee engagement. Built with Next.js 15, React 19, and TypeScript.

## 🚀 Live Demo

<!-- Add your deployment link when ready -->
**[View Live Demo](https://hirewire-conference.vercel.app/)**

> **Note**: This is a demo application with mock data for demonstration purposes.

## 🎯 Features

### 📍 Interactive Venue Map
- Day-by-day conference schedule visualization
- Interactive floor plan with clickable venue markers
- Real-time session information for each location
- Room capacity and current events display

### 📅 Events & Speakers
- Comprehensive events listing with advanced filtering
- Speakers directory with detailed profiles
- Real-time search by title, speaker, or company
- Filter by event type, industry, level, and day
- Event ratings and attendee count tracking

### 🤝 Networking Hub
- Dual view modes: traditional list and Tinder-style card swiping
- Advanced filtering by industry, experience level, country, and role
- Interactive profile cards with professional information
- Social links integration (LinkedIn, GitHub)
- Like/pass system for efficient networking

### 💬 Rich Messaging System
- Real-time chat interface with multiple message types
- Support for text, code blocks, schedule cards, and networking cards
- Emoji reactions and interactive picker
- AI-powered chat assistant integration
- Ice-breaker suggestion system
- Online status indicators and unread message badges

### 👤 Comprehensive Profile Management
- Editable user profiles with photo upload
- Professional information and bio editing
- Interest tags system (choose from 30+ categories)
- Privacy controls: job seeking status, search visibility, messaging preferences
- Role and company information management

### 🔧 Admin Dashboard
- Conference analytics and attendee insights
- Event management and speaker coordination
- Real-time engagement metrics

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **UI Components**: Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations
- **Mobile**: Progressive Web App (PWA) ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fauxpas518/hirewire-conference-app.git
cd hirewire-conference-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── events/            # Events and speakers
│   ├── map/               # Interactive venue map
│   ├── messages/          # Chat and messaging
│   ├── networking/        # Attendee networking
│   ├── profile/           # User profile management
│   └── layout.tsx         # Root layout with navigation
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui primitive components
│   ├── bottom-nav.tsx    # Global bottom navigation
│   └── ai-chat-fab.tsx   # AI assistant button
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎨 Design System

The app uses a comprehensive design system built on:

- **Color Palette**: Carefully selected colors optimized for accessibility
- **Typography**: Inter font family with responsive sizing
- **Components**: Consistent design patterns using Radix UI primitives
- **Responsive Design**: Mobile-first approach with desktop compatibility
- **Accessibility**: WCAG compliant with proper focus management

## 📱 Progressive Web App (PWA)

This app is designed as a Progressive Web App, which means you can install it on your device for a native app-like experience.

### 📲 How to Install

**On Mobile (iOS/Android):**
1. Open the app in your mobile browser (Safari, Chrome, etc.)
2. Look for the "Add to Home Screen" or "Install App" prompt
3. Tap "Add" or "Install" to add the app to your home screen
4. Launch the app directly from your home screen for the full PWA experience

**On Desktop (Chrome/Edge):**
1. Open the app in your browser
2. Look for the install icon (⊕) in the address bar
3. Click "Install" to add the app to your desktop
4. The app will open in its own window, separate from your browser

### ✨ PWA Features

- **App-like Experience**: Runs in its own window without browser UI
- **Offline Support**: Works even when you're not connected to the internet
- **Fast Loading**: Cached resources for instant startup
- **Push Notifications**: Stay updated with conference announcements (when implemented)
- **Responsive Design**: Optimized for mobile devices with touch-friendly interactions
- **Home Screen Icon**: Easy access directly from your device's home screen

## 🔧 Configuration

The app uses several configuration files:

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui component configuration

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Note**: This is a demo application with mock data for demonstration purposes. It showcases modern web development practices and responsive design patterns suitable for conference and networking applications.