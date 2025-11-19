# AuthFlow - Complete Authentication System

A modern authentication and onboarding flow built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features manual form validation, dark mode support, and a polished user interface.

## Features

### Authentication
- **Sign Up** - Full form validation with password requirements
- **Login** - Email/password authentication
- **Forgot Password** - Email-based password recovery flow
- **Reset Password** - Secure password reset functionality
- **Protected Routes** - Dashboard requires authentication

### Onboarding
Multi-step form with manual validation:
1. Company details (name and role)
2. Team information (size and industry)
3. Goal selection (multi-select checkboxes)

### Dashboard
- User profile display with avatar
- Organization details from onboarding
- Analytics cards with trend indicators
- Recent activity feed
- Dark/Light theme toggle
- Responsive design

### Design System
- Clean, modern UI with vibrant colors
- Seamless dark mode support
- Smooth animations and transitions
- Mobile-first responsive layout
- Professional typography (Geist Sans, Geist Mono)

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **React**: 19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React 0.454.0
- **Theme**: Custom dark/light mode implementation
- **Notifications**: Sonner for toast notifications
- **Analytics**: Vercel Analytics

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx                 # Root layout with theme support
│   ├── page.tsx                   # Landing page
│   ├── login/page.tsx             # Login page
│   ├── signup/page.tsx            # Sign up page
│   ├── onboarding/page.tsx        # Multi-step onboarding
│   ├── dashboard/page.tsx         # Protected dashboard
│   ├── forgot-password/page.tsx   # Password recovery
│   ├── reset-password/page.tsx    # Password reset
│   └── globals.css                # Global styles and theme tokens
├── components/
│   ├── ui/                        # Reusable UI components
│   ├── theme-toggle.tsx           # Dark/Light mode toggle
│   └── theme-provider.tsx         # Theme context provider
├── types/
│   └── index.ts                   # TypeScript interfaces
└── package.json
\`\`\`

## Routes

| Route | Description | Protection |
|-------|-------------|-----------|
| `/` | Landing page with sign up/sign in options | Public |
| `/signup` | User registration with validation | Public |
| `/login` | User authentication | Public |
| `/onboarding` | 3-step onboarding wizard | Protected |
| `/dashboard` | User dashboard with analytics | Protected |
| `/forgot-password` | Password recovery initiation | Public |
| `/reset-password` | Password reset completion | Public |

## Getting Started

### Prerequisites
- Node.js 18+ or later
- pnpm, npm, or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <https://github.com/YeeshaDev/auth-test>
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
# or
pnpm install (currently used)
# or
yarn install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
# or
pnpm dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Data Storage

**⚠️ Important: Assessment/Demo Purpose Only**

This project uses **localStorage** for data persistence for the purpose of this assessment. This approach is **NOT production-ready** and should not be used for real-world applications handling sensitive user information.

### Current Implementation (Demo)

\`\`\`typescript
// User data
localStorage.setItem('user', JSON.stringify({
  name: string,
  email: string,
  password: string,
  createdAt: string
}))

// Onboarding data
localStorage.setItem('onboarding', JSON.stringify({
  company: string,
  role: string,
  teamSize: string,
  industry: string,
  goals: string[]
}))

// Authentication status
localStorage.setItem('isAuthenticated', 'true')
\`\`\`

### Production Considerations

For a real-world application, implement proper security measures:

- **Backend Authentication**: Use secure authentication services (Supabase, Auth0, NextAuth.js)
- **Password Hashing**: Never store plain text passwords (use bcrypt, argon2)
- **Secure Sessions**: Implement JWT tokens or secure session cookies
- **Database Storage**: Store user data in secure databases with encryption
- **HTTPS Only**: Always use secure connections
- **Rate Limiting**: Prevent brute force attacks
- **Input Sanitization**: Validate and sanitize all user inputs server-side
- **CSRF Protection**: Implement cross-site request forgery protection

This demo focuses on the UI/UX flow and form validation logic rather than backend security implementation.

## TypeScript Types

All types are defined in `types/index.ts`:

\`\`\`typescript
interface User {
  name: string
  email: string
  password: string
  createdAt: string
}

interface OnboardingData {
  company: string
  role: string
  teamSize: string
  industry: string
  goals: string[]
}

interface StatCard {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: string
}

interface Activity {
  id: string
  type: string
  message: string
  timestamp: string
  icon: string
}
\`\`\`

## Theme Support

The application supports both light and dark modes with a custom theme implementation:

- Toggle button in the top-right corner on all pages
- Dashboard header includes theme toggle
- Persistent theme preference via localStorage
- System preference detection on first load
- Smooth transitions between themes

### Theme Colors

Defined in `app/globals.css` using CSS variables:

**Light Mode:**
- Primary: Blue (#3b82f6)
- Secondary: Purple (#8b5cf6)
- Accent: Pink (#ec4899)
- Success: Emerald (#10b981)

**Dark Mode:**
- Optimized colors for better contrast
- Reduced brightness for comfort
- Accessible color ratios

## Validation Rules

### Sign Up
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Password**: Minimum 8 characters, must contain uppercase, lowercase, and number
- **Confirm Password**: Must match password

### Login
- **Email**: Required, valid email format
- **Password**: Required

### Onboarding
- **Step 1**: Company name (min 2 chars), Role (required)
- **Step 2**: Team size (required), Industry (required)
- **Step 3**: At least one goal selected

## Features Highlights

- Manual form validation (no external libraries)
- Type-safe TypeScript throughout
- Responsive design (mobile-first)
- Smooth page transitions
- Loading states on form submissions
- Error handling with user-friendly messages
- Protected route checking
- Clean, maintainable code structure
- **Note**: Uses mock localStorage for demo purposes only

## Customization

### Colors
Edit theme variables in `app/globals.css`:
\`\`\`css
@theme inline {
  --color-primary: ...;
  --color-secondary: ...;
}
\`\`\`

### Fonts
Modify fonts in `app/layout.tsx`:
\`\`\`tsx
import { Cute_Font as YourFont } from 'next/font/google'
\`\`\`

### Components
All UI components are in `components/ui/` and can be customized individually.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
\`\`\`bash
npm run build
\`\`\`
Deploy the `.next` folder to any Node.js hosting platform.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Credits

Built with Next.js, React, Tailwind CSS, and Radix UI.
