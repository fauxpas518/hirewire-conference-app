# HireWire Conference App – Feature Overview

A concise page-by-page breakdown of core functionality.

---

## Global
- Fixed bottom navigation (`Map, Events, Network, Messages, Profile`) visible on all pages
- Consistent top headers with back navigation and contextual actions
- Mobile-first responsive UI built with Tailwind CSS & Radix UI components

---

## Map (`/map`)
- Day selector chips (Day 1-5) to filter the schedule
- Interactive floor-plan image with animated venue markers
- Tap a marker to highlight & reveal scheduled sessions for that room
- Venue tooltip with name & capacity; selected marker enlarges for focus

---

## Events (`/events`)
- Toggle between **Events List** and **Speakers Directory**
- Search bar filters by title, speaker or company in real time
- Collapsible filter sheet (Type, Industry, Level, Day) with chip selectors
- Event cards show time, location, speaker, attendee count, rating badges
- Speaker view: profile cards with photo, expertise tags, sessions count & rating

---

## Networking (`/networking`)
- Dual **List** and **Card-Swipe** (Tinder-style) views
- Real-time search and multi-facet filters (Industry, Level, Country, Role)
- Card swipe left/right to *Pass* or *Like* with animated heart/X actions
- Profile backs include bio, interests chips, external links (LinkedIn, GitHub)

---

## Messages (`/messages`)
- Conversation list with avatars, online status, unread badges & timestamps
- Search people/messages; AI Chat FAB opens dedicated assistant thread
- Chat view:
  - Sticky header (avatar, status, overflow menu)
  - Rich message bubbles: text, code blocks, schedule cards, networking cards
  - Emoji reactions & picker per message
  - Ice-breaker generator chip cycles & inserts suggested prompts
  - Attachment/plus button, send button; Enter-to-send support
  - Auto-scroll & smooth animations

---

## Profile (`/profile`)
- Editable profile with sections:
  - Photo upload/change
  - Basic info (name, display format, bio)
  - Professional info (title, company, location)
  - Interest tags (choose up to 5 from 30+ suggestions)
  - Privacy toggles: Looking for Job, Appear in Search, Allow Messages
- Save button persists changes (mock – console log placeholder)

---

*Last updated: 2025-06-28*
