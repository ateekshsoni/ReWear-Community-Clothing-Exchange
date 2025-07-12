# ReWear Community Clothing Exchange - React Frontend

A modern React application for the ReWear clothing exchange platform, converted from the original HTML/CSS/JavaScript files.

## Overview

This React application provides a complete frontend solution for the ReWear community clothing exchange platform, featuring user authentication, item browsing, and community engagement features.

## Converted Pages

### 1. Login Page (`/`)
- **File**: `src/pages/Login.jsx`
- **CSS**: `src/Login.css`
- **Features**: 
  - Form validation
  - Password visibility toggle
  - Social login options
  - Responsive design
  - Navigation to other pages

### 2. Signup Page (`/signup`)
- **File**: `src/pages/Signup.jsx`
- **CSS**: `src/Signup.css`
- **Features**:
  - Advanced form validation
  - Password strength checking
  - Confirmation password matching
  - Terms and conditions modal
  - Success modal with navigation

### 3. Item Detail Page (`/item-detail`)
- **File**: `src/pages/ItemDetail.jsx`
- **CSS**: `src/ItemDetail.css`
- **Features**:
  - Interactive image gallery
  - Zoom modal functionality
  - Exchange options (swap/points)
  - Owner information display
  - Modular component architecture

### 4. Success Stories Page (`/success-stories`)
- **File**: `src/SuccessStories.jsx`
- **CSS**: `src/SuccessStories.css`
- **Features**:
  - Animated counters
  - Scroll-triggered animations
  - FAQ section with toggles
  - Community impact metrics
  - User testimonials

## Modular Components

### Layout Components
Located in `src/components/layout/`:

- **Layout.jsx**: Main layout wrapper with header/footer
- **Header.jsx**: Responsive navigation with active states
- **Footer.jsx**: Site footer with links and social media

### Section Components
Located in `src/components/sections/`:

- **HeroSection.jsx**: Reusable hero sections with stats
- **TestimonialsSection.jsx**: User testimonials with animations
- **ImpactSection.jsx**: Impact metrics with counters
- **FAQSection.jsx**: Interactive FAQ accordion
- **CTASection.jsx**: Call-to-action sections with buttons

### Form Components
Located in `src/components/forms/`:

- **LoginForm.jsx**: Enhanced login form with validation

### Common Components
Located in `src/components/common/`:

- **Navigation.jsx**: Shared navigation header
- **Button.jsx**: Reusable button component
- **BrandSection.jsx**: Brand showcase component
- **FormInput.jsx**: Reusable form input component
- **ImageGallery.jsx**: Interactive image viewer
- **ExchangeOptions.jsx**: Item exchange interface
- **OwnerInfo.jsx**: Owner profile display
- **Modal.jsx**: Reusable modal components

## Technology Stack

- **React 19.1.0**: Latest React with hooks
- **React Router DOM 6.x**: Client-side routing
- **Vite 7.0.4**: Fast build tool and dev server
- **Font Awesome 6.4.0**: Icon library
- **Inter Font**: Typography from Google Fonts
- **External CSS**: Separate CSS files for maintainability

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Footer.jsx         # Site footer
│   │   ├── Layout.css
│   │   ├── Header.css
│   │   └── Footer.css
│   ├── sections/
│   │   ├── HeroSection.jsx    # Hero/banner sections
│   │   ├── TestimonialsSection.jsx
│   │   ├── ImpactSection.jsx
│   │   ├── FAQSection.jsx
│   │   ├── CTASection.jsx
│   │   ├── HeroSection.css
│   │   ├── TestimonialsSection.css
│   │   ├── ImpactSection.css
│   │   ├── FAQSection.css
│   │   └── CTASection.css
│   ├── forms/
│   │   ├── LoginForm.jsx      # Login form component
│   │   └── LoginForm.css
│   ├── common/
│   │   ├── Navigation.jsx     # Shared navigation
│   │   ├── Button.jsx         # Reusable button
│   │   ├── BrandSection.jsx   # Brand showcase
│   │   ├── FormInput.jsx      # Form input component
│   │   ├── ImageGallery.jsx   # Image viewer
│   │   ├── ExchangeOptions.jsx
│   │   ├── OwnerInfo.jsx
│   │   ├── Modal.jsx
│   │   ├── BrandSection.css
│   │   └── index.js           # Component exports
│   └── index.js               # Main component exports
├── pages/
│   ├── Login.jsx              # Login page
│   ├── Signup.jsx             # Registration page
│   └── ItemDetail.jsx         # Product detail
├── styles/
│   ├── Login.css              # Login page styles
│   ├── Signup.css             # Signup page styles
│   ├── ItemDetail.css         # Item detail styles
│   └── components/            # Component-specific styles
├── SuccessStories.jsx         # Success stories page
├── SuccessStories.css
├── App.jsx                    # Main app component
├── main.jsx                   # App entry point
├── App.css
└── index.css
```

## Features Implemented

### ✅ Conversion Requirements Met
- [x] Exact visual preservation from original HTML files
- [x] External CSS files maintained (no inline styles)
- [x] Responsive design preserved
- [x] Modular component architecture
- [x] SEO-friendly structure
- [x] Clean code organization

### ✅ Enhanced Modular Architecture
- [x] **Layout System**: Header, Footer, and Layout wrapper components
- [x] **Section Components**: Reusable hero, testimonials, impact, FAQ, and CTA sections
- [x] **Form Components**: Enhanced form components with validation
- [x] **Common Components**: Shared UI components across the application
- [x] **CSS Organization**: Component-specific CSS files for better maintainability
- [x] **Reusable Components**: Props-based configuration for maximum flexibility

### ✅ Interactive Features
- [x] Form validation and state management
- [x] Image gallery with zoom functionality
- [x] FAQ accordion with smooth animations
- [x] Animated counters and scroll effects
- [x] Modal dialogs and overlays
- [x] Navigation between pages

### ✅ Performance Optimizations
- [x] Lazy loading for images
- [x] Optimized animations
- [x] Efficient re-renders with React hooks
- [x] Fast Vite build system

## Navigation Routes

- `/` - Login page (default)
- `/signup` - User registration
- `/item-detail` - Product detail view
- `/success-stories` - Community impact and testimonials

## Development Notes

### Original Files Converted
All files from `Frontend(html)/` have been successfully converted:

1. `index.html` → `pages/Login.jsx`
2. `signup.html` → `pages/Signup.jsx`
3. `item-detail.html` → `pages/ItemDetail.jsx`
4. `success-stories.html` → `SuccessStories.jsx`

### JavaScript Integration
- Form validation logic integrated with React state
- DOM manipulation converted to React hooks
- Event handlers updated for React patterns
- Animation logic preserved with useEffect hooks

### CSS Preservation
- All original styling maintained
- Responsive breakpoints preserved
- Animation keyframes kept intact
- CSS variables and custom properties maintained

## Future Enhancements

- TypeScript migration for better type safety
- API integration for backend connectivity
- State management with Redux/Zustand
- PWA capabilities
- Additional pages (browse, profile, messages)
- Real-time features with WebSocket integration

## Contributing

1. Follow the existing code structure
2. Maintain external CSS approach
3. Use React hooks for state management
4. Ensure responsive design compatibility
5. Test across different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

