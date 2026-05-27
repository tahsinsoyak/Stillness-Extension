# Decision Cooldown — Design System v2

## Philosophy
**Dark-first. Premium restraint. Clear & Direct.**

Every element serves a purpose. No decorative noise. Color is used only for status and interaction. The dark palette is the primary experience. Inspired by Arc Browser, Linear dark, Discord, and Spotify's premium feel.

---

## Color Tokens

### Dark Mode (Primary Experience)

| Token             | Value       | Usage                          |
|-------------------|-------------|--------------------------------|
| `bg-base`         | `#09090B`   | Page background                |
| `bg-surface`      | `#141416`   | Cards, panels                  |
| `bg-elevated`     | `#1C1C1F`   | Hover states, elevated cards   |
| `bg-subtle`       | `#27272A`   | Subtle fills, inactive states  |
| `border`          | `#27272A`   | Default borders                |
| `border-subtle`   | `#1E1E20`   | Subtle separators              |
| `border-strong`   | `#3F3F46`   | Emphasized borders             |
| `text-primary`    | `#FAFAFA`   | Headings, primary text         |
| `text-secondary`  | `#A1A1AA`   | Body, descriptions             |
| `text-tertiary`   | `#71717A`   | Labels, timestamps, hints      |
| `accent`          | `#818CF8`   | Primary CTA, active states     |
| `accent-hover`    | `#6366F1`   | Hover state for accent         |
| `success`         | `#34D399`   | Completed, timer done          |
| `warning`         | `#FBBF24`   | Warnings, destructive hints    |
| `danger`          | `#F87171`   | Delete, destructive actions    |

### Light Mode (Secondary)

| Token             | Value       | Usage                          |
|-------------------|-------------|--------------------------------|
| `bg-base`         | `#FAFAFA`   | Page background                |
| `bg-surface`      | `#FFFFFF`   | Cards, panels                  |
| `bg-elevated`     | `#F4F4F5`   | Hover states                   |
| `bg-subtle`       | `#E4E4E7`   | Subtle fills                   |
| `border`          | `#E4E4E7`   | Default borders                |
| `text-primary`    | `#09090B`   | Primary text                   |
| `text-secondary`  | `#52525B`   | Body text                      |
| `text-tertiary`   | `#A1A1AA`   | Hints, labels                  |
| `accent`          | `#6366F1`   | Primary CTA                    |
| `accent-hover`    | `#4F46E5`   | Hover state                    |

---

## Typography

| Role          | Font            | Weight | Size   | Tracking    | Line Height |
|---------------|-----------------|--------|--------|-------------|-------------|
| Timer         | JetBrains Mono  | 600    | 56px   | -0.04em     | 1           |
| H1            | Inter           | 600    | 20px   | -0.02em     | 1.2         |
| H2            | Inter           | 600    | 16px   | -0.01em     | 1.3         |
| Body          | Inter           | 400    | 14px   | 0           | 1.5         |
| Body small    | Inter           | 400    | 13px   | 0           | 1.5         |
| Label         | Inter           | 500    | 12px   | 0.02em      | 1.4         |
| Caption       | Inter           | 500    | 11px   | 0.04em      | 1.4         |
| Overline      | Inter           | 600    | 10px   | 0.08em      | 1.4         |

---

## Spacing

Base unit: **4px**

| Token   | Value | Usage                    |
|---------|-------|--------------------------|
| `1`     | 4px   | Tight gaps               |
| `2`     | 8px   | Icon gaps, small spacing |
| `3`     | 12px  | Card padding (compact)   |
| `4`     | 16px  | Default padding          |
| `5`     | 20px  | Section gaps              |
| `6`     | 24px  | Page padding, large gaps |
| `8`     | 32px  | Section separators       |
| `10`    | 40px  | Hero spacing             |

---

## Border Radius

| Element              | Radius |
|----------------------|--------|
| Buttons, inputs      | 10px   |
| Cards                | 14px   |
| Badges, pills        | 9999px |
| Avatars, icons       | 10px   |
| Tabs container       | 12px   |

---

## Shadows (Dark Mode)

Dark mode uses **border luminance** instead of heavy shadows for depth.

| Level    | Treatment                                        |
|----------|--------------------------------------------------|
| Default  | 1px border `#27272A`                              |
| Hover    | border → `#3F3F46`                               |
| Elevated | 1px border `#3F3F46` + `0 2px 8px rgba(0,0,0,0.3)` |
| Modal    | `0 8px 32px rgba(0,0,0,0.5)` + border `#3F3F46`  |

---

## Components

### Button
- **Primary**: accent bg, white text, no border. Hover: darken 10%. Active: scale(0.98)
- **Secondary**: bg-subtle bg, text-primary. Hover: bg-elevated
- **Ghost**: transparent. Hover: bg-subtle bg
- **Outline**: border only. Hover: subtle fill
- Sizes: sm(32px h), md(36px h), lg(44px h)
- All transitions: 150ms ease

### Card
- bg-surface, 1px border, 14px radius
- Padding: 16px (compact) or 20px (default)
- Hover: border brightens slightly (interactive cards only)

### Badge
- Pill shape (9999px radius)
- bg-subtle fill + colored text (no bold colored backgrounds)
- 11px font, weight 500

### Switch
- Off: bg-subtle. On: accent
- White knob, smooth 200ms
- Width: 40px, Height: 22px

### Input / Textarea
- bg-surface or transparent with border
- 10px radius
- Focus: accent ring (2px, 30% opacity)
- Placeholder: text-tertiary

---

## Page Layouts

### Popup (380px × 540px)
```
┌──────────────────────────────────┐
│  ◉ Decision Cooldown         ⚙  │  Header: 16px padding
│                                  │
│  ┌──────────────────────────┐   │  Site card: 14px radius
│  │ ● amazon.com             │   │  
│ │  [ Start 10-min pause ]  │   │  CTA: accent button
│  └──────────────────────────┘   │
│                                  │
│  Rules                    3     │  Section: overline label
│                                  │
│  ┌──────────────────────────┐   │
│  │ amazon.com   Shopping  ○ │   │  Rule: surface bg, switch
│  │              10 min      │   │
│  └──────────────────────────┘   │
│  ┌──────────────────────────┐   │
│  │ ebay.com     Shopping  ● │   │
│  │              5 min       │   │
│  └──────────────────────────┘   │
│                                  │
│  ┌──────────────────────────┐   │
│  │  + Manage Rules          │   │  Footer: outline button
│  └──────────────────────────┘   │
│       LOCAL • NO ACCOUNT        │  Caption
└──────────────────────────────────┘
```

### Cooldown Page (Full Screen)
```
          centered, max-width 440px

          ┌─ circular ring ─┐
          │                  │
          │       ◉          │  icon: accent color
          │      9:42        │  timer: mono, 56px
          │                  │
          └──────────────────┘

     Pause before you decide.        H1
     Waiting for amazon.com          secondary text

     ┌─────────────────────────┐
     │ "Why do you want this?" │     surface card
     │                          │
     │ [Write thoughts...]      │     textarea
     └─────────────────────────┘

     [   I'll decide later   ]       secondary button
     [    Continue Now       ]       primary button (disabled)

          emergency skip               ghost link
```

### Options Page (Max 720px)
```
┌────────────────────────────────────────────┐
│  ◉ Decision Cooldown                       │  Header
│  Manage your rules and settings            │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │  Rules   History   Settings        │   │  Pill tabs
│  └────────────────────────────────────┘   │
│                                            │
│  Your Rules                     + Add Rule │  Section header
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ ● amazon.com      Shopping    ○ 🗑 │   │  Rule card
│  │   10 min                           │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ┌────────────────────────────────────┐   │
│  │ ● ebay.com        Browsing    ● 🗑 │   │
│  │   5 min                            │   │
│  └────────────────────────────────────┘   │
│                                            │
│  ─────────────────────────────────────── │
│  LOCAL ONLY • YOUR DATA STAYS IN BROWSER  │
└────────────────────────────────────────────┘
```

---

## Animation

| Context         | Duration | Easing           | Property         |
|-----------------|----------|------------------|------------------|
| Hover state     | 150ms    | ease             | background/border|
| Button press    | 100ms    | ease             | scale(0.98)      |
| Page enter      | 200ms    | ease-out         | opacity          |
| Focus ring      | 150ms    | ease             | box-shadow       |
| Timer ring      | 1000ms   | linear           | stroke-dashoffset|
| Switch toggle   | 200ms    | ease-in-out      | transform        |

**No staggered animations. No decorative motion.** Everything is functional.

---

## Implementation Order
1. `tailwind.config.js` — tokens
2. `index.css` — reset + utilities
3. Components (Button → Card → Badge → Switch → Input → Textarea)
4. PopupApp → CooldownPage → OptionsApp
