# Decision Cooldown - Project Plan

## Overview
Decision Cooldown is a free, local-only Chrome extension that helps users slow down before making impulsive digital decisions by introducing a customizable cooldown timer and reflection prompt on specified websites.

## Phase 1: Planning and Scaffolding
- [x] Write project plan (`PLAN.md`).
- [ ] Initialize Vite + React + TypeScript project.
- [ ] Install dependencies (Tailwind CSS, Zustand, Lucide React, react-router-dom if needed).
- [ ] Configure Tailwind CSS.
- [ ] Set up Vite configuration for building a Chrome Extension (Manifest V3).

## Phase 2: Core Architecture & Storage
- [ ] Define TypeScript interfaces and data models (Rules, History, Settings).
- [ ] Implement local storage utility using `chrome.storage.local`.
- [ ] Set up Zustand stores for Rules, Cooldown State, and Settings/Theme.
- [ ] Create Manifest V3 `manifest.json`.
- [ ] Implement background service worker (`serviceWorker.ts`).

## Phase 3: Rule Engine & Detection
- [ ] Implement rule matching logic (domain/path matching).
- [ ] Implement content script to detect navigation and trigger cooldown redirects.
- [ ] Implement `declarativeNetRequest` rules generation (optional, or rely on content script redirect for MVP). Let's use content script + service worker redirect for better UX and simpler manifest permissions.

## Phase 4: User Interface (UI) Development
- [ ] **Shared UI Components:** Button, Card, Input, Textarea, Select, Badge, Switch, Toast.
- [ ] **Popup UI:** Current site status, rules summary, quick rule add, rule list.
- [ ] **Options/Settings Page:** Full rule management, reflection history, privacy settings, appearance (Dark/Light mode).
- [ ] **Cooldown Page:** Full-page UI with countdown ring, reflection prompt, and decision buttons.

## Phase 5: Core Features Implementation
- [ ] Rule Creation Flow (Domain, Action Type, Duration, Prompt).
- [ ] 10-minute countdown logic (visual timer + `chrome.alarms` or background interval for persistence).
- [ ] Reflection note saving and history logging.
- [ ] Continue / Decide Later actions.

## Phase 6: Polish and Testing
- [ ] Implement Dark/Light mode theme switching.
- [ ] Refine Tailwind styling for a premium, calm aesthetic.
- [ ] Write unit tests for matching logic, time windows, and storage.
- [ ] Write comprehensive README.md with setup, dev, and build instructions.
- [ ] Test locally by loading unpacked extension.

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- Chrome Extension API (Manifest V3)

## Permissions (Minimal)
- `storage`: For rules, settings, and history.
- `alarms`: For background timing if needed.
- `activeTab` / `scripting` or `tabs`: To monitor navigation for rule matching.

Let's build this!
