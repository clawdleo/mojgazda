# GAZDA / MojGazda — Design System

## Brand Identity

### Name
- **Primary:** MojGazda (mojgazda.com)
- **Tagline HR:** "Upoznaj svog gazdu" (Know your boss)
- **Tagline SL:** "Spoznaj svojega gazdo" (Know your boss)
- **Tagline SR:** "Упознај свог газду" (Know your boss)

### Logo Concept
- Bold, approachable wordmark: **mojgazda**
- Icon: Stylized shield/badge with a star — represents trust & rating
- The "G" in Gazda could incorporate a rating star

## Color Palette

### Primary Colors
```css
--teal-50:  #f0fdfa;
--teal-100: #ccfbf1;
--teal-200: #99f6e4;
--teal-300: #5eead4;
--teal-400: #2dd4bf;
--teal-500: #14b8a6;  /* Primary action */
--teal-600: #0d9488;  /* Primary hover */
--teal-700: #0f766e;  /* Primary dark */
--teal-800: #115e59;
--teal-900: #134e4a;
```

### Accent / GAZDA Score
```css
--amber-400: #fbbf24;  /* Stars, ratings */
--amber-500: #f59e0b;  /* GAZDA Score highlight */
--amber-600: #d97706;
```

### Semantic Colors
```css
--success: #22c55e;    /* Green — good scores */
--warning: #f59e0b;    /* Amber — mid scores */
--danger:  #ef4444;    /* Red — bad scores, alerts */
--info:    #3b82f6;    /* Blue — informational */
```

### Neutrals
```css
--gray-50:  #f9fafb;   /* Page background */
--gray-100: #f3f4f6;   /* Card background */
--gray-200: #e5e7eb;   /* Borders */
--gray-300: #d1d5db;   
--gray-400: #9ca3af;   /* Placeholder text */
--gray-500: #6b7280;   /* Secondary text */
--gray-600: #4b5563;   
--gray-700: #374151;   /* Body text */
--gray-800: #1f2937;   /* Headings */
--gray-900: #111827;   /* Primary text */
```

## Typography

### Font Stack
- **Headings:** Inter (bold, clean, professional)
- **Body:** Inter (regular, readable)
- **Monospace:** JetBrains Mono (code, stats)
- **Fallback:** system-ui, -apple-system, sans-serif

### Scale
```
text-xs:   12px / 16px
text-sm:   14px / 20px
text-base: 16px / 24px  (body)
text-lg:   18px / 28px
text-xl:   20px / 28px
text-2xl:  24px / 32px  (section headers)
text-3xl:  30px / 36px  (page titles)
text-4xl:  36px / 40px  (hero)
text-5xl:  48px / 48px  (GAZDA Score display)
```

## GAZDA Score Display

The hero component. A large, bold number (1-10) with color-coded ring:

| Score Range | Color | Label |
|-------------|-------|-------|
| 8.0 - 10.0 | 🟢 Green (#22c55e) | Odličen Gazda / Excellent |
| 6.0 - 7.9  | 🟡 Amber (#f59e0b) | Soliden / Decent |
| 4.0 - 5.9  | 🟠 Orange (#f97316) | Povprečen / Average |
| 2.0 - 3.9  | 🔴 Red (#ef4444) | Slab / Poor |
| 1.0 - 1.9  | ⚫ Dark Red (#991b1b) | Katastrofa / Terrible |

```
┌──────────────────────┐
│   ╭──────────╮       │
│   │   8.4    │ ← Big bold number in green ring
│   │  ─────   │
│   │ GAZDA    │
│   │ SCORE    │
│   ╰──────────╯       │
│   Based on 47 reviews │
└──────────────────────┘
```

## Component Library

### Cards
- **Company Card:** Logo, name, industry, GAZDA Score badge, star rating, review count
- **Review Card:** Stars, title, pros/cons, job title, date, helpful button
- **Job Card:** Title, company, location, salary range, remote badge
- **Salary Card:** Job title, range bar, experience level

### Buttons
- **Primary:** Teal background, white text, rounded-lg
- **Secondary:** White/gray border, teal text
- **Danger:** Red background (for reports/flags)
- **Ghost:** Transparent, hover teal underline

### Badges/Tags
- Industry tags: Rounded, gray bg, dark text
- Country flags: 🇸🇮 🇭🇷 🇷🇸 🇧🇦 inline with company name
- Employment type: Colored pill (green=current, gray=former)
- Verification: ✅ Verified Employee badge

### Star Rating
- 5-star system using amber-400 fill
- Half-star support
- Hover interaction for rating input
- Size variants: sm (16px), md (20px), lg (24px)

## Page Layout

### Navigation
- **Desktop:** Fixed top bar — Logo | Search | Companies | Jobs | Salaries | Write Review | [Login/Profile]
- **Mobile:** Bottom tab bar — Home | Search | Write | Profile
- Language switcher: 🇭🇷 🇸🇮 🇷🇸 dropdown in header

### Footer
- About | Contact | Terms | Privacy | For Employers
- Country selector
- Social links

## Responsive Breakpoints
```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (wide)
2xl: 1536px  (ultra-wide)
```

## Animations
- Page transitions: Subtle fade (150ms)
- Card hover: Slight lift (translateY -2px, shadow increase)
- GAZDA Score: Counter animation on load (count up from 0)
- Star rating: Sequential fill on hover
- Toast notifications: Slide in from top-right

## Dark Mode
- Support from day 1 (Tailwind dark: prefix)
- Dark bg: gray-900, cards: gray-800, text: gray-100
- Teal stays vibrant in dark mode
- GAZDA Score ring colors stay the same

## Accessibility
- WCAG 2.1 AA minimum
- Focus rings on all interactive elements
- Screen reader labels for star ratings
- Color not sole indicator (icons + text)
- Minimum 4.5:1 contrast ratio for text
