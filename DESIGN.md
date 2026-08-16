# DESIGN.md — TasteKit Obsidian Master Spec
> Standardized Design Reference for TasteKit Ecosystem & AI Coding Agents
> Spec Version: 2.4.0 (Google Stitch & TasteKit Compliant)

---

## 1. Visual Persona & Philosophy
- **Identity & Tone**: Velvet Obsidian & Amber Spark (Dark Luxury & Architectural Precision).
- **Core Philosophy**: Clean, functional, and razor-sharp. Designed specifically to eliminate the "AI taste gap" by replacing generic purple-on-black tropes with deep velvet obsidian surfaces, chiseled titanium borders, and intentional warm amber sparks.

---

## 2. Color Palette & Semantic Tokens

### Canvas & Layered Surfaces
- **Background (`--tk-bg`)**: `#090a0d` (Main canvas substrate)
- **Surface (`--tk-surface`)**: `#111318` (Cards, panels, modals)
- **Surface Hover (`--tk-surface-hover`)**: `#171a22`
- **Surface Active (`--tk-surface-active`)**: `#1f232e`
- **Surface Elevated (`--tk-surface-elevated`)**: `#1a1d26`

### Borders & Hairlines
- **Subtle Border (`--tk-border`)**: `rgba(255, 255, 255, 0.08)` (1px boundary)
- **Highlight Border (`--tk-border-highlight`)**: `rgba(245, 166, 35, 0.4)` (Active focus/hover glow)
- **Strong Border (`--tk-border-strong`)**: `rgba(255, 255, 255, 0.16)`

### Primary Brand & Accents
- **Primary Action (`--tk-primary`)**: `#f5a623` (Warm Amber Spark)
- **Primary Hover (`--tk-primary-hover`)**: `#ffbe4a`
- **Primary Foreground (`--tk-primary-fg`)**: `#120b02` (Deep contrast text on primary buttons)
- **Secondary Accent (`--tk-accent`)**: `#e0e3eb` (Titanium Silver)

### Typography Contrast Levels
- **Text Primary (`--tk-text`)**: `#f4f5f8` (High contrast headings & body)
- **Text Muted (`--tk-text-muted`)**: `#9297a5` (Secondary descriptions & metadata)
- **Text Subtle (`--tk-text-subtle`)**: `#545866` (Tertiary captions, placeholders)

---

## 3. Typography & Sizing Scale

- **Heading Font**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Body Font**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Monospace / Telemetry Font**: `'JetBrains Mono', 'SF Mono', monospace`

### Typographic Rules:
- **Headings (H1-H3)**: Tight tracking (`letter-spacing: -0.02em` to `-0.03em`), line-height `1.15` to `1.25`, font weight `700`.
- **Body**: Line-height `1.6`, font weight `400` / `500`.
- **Badges & Monospace Tags**: `letter-spacing: 0.06em`, uppercase, font size `10.5px` - `12px`.

---

## 4. Geometry, Radii & Depth

- **Base Radius (`--tk-radius`)**: `8px` (Buttons, inputs, compact items)
- **Small Radius (`--tk-radius-sm`)**: `4px` (Tags, chips, status pills)
- **Large Radius (`--tk-radius-lg`)**: `12px` - `16px` (Cards, modals, canvas frames)
- **Box Shadow**: `0 4px 16px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.08)`
- **Ambient Glow**: `0 0 32px rgba(245, 166, 35, 0.18)`

---

## 5. Component Construction Recipes

### Primary Button
- Background: `#f5a623`
- Text: `#120b02` (Font weight: `600`)
- Padding: `9px 16px`
- Radius: `8px`
- Micro-interaction: `transform: translateY(-1px)` and background `#ffbe4a` on hover; `scale(0.98)` on active click.

### Secondary / Outline Button
- Background: `rgba(255, 255, 255, 0.04)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Text: `#f4f5f8`
- Hover: Background `#171a22`, Border `rgba(255, 255, 255, 0.16)`.

### Cards & Panels
- Background: `#111318`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Radius: `12px`
- Padding: `22px - 28px`
- Hover: Subtle `translateY(-2px)` with shadow depth increase.

### Form Inputs
- Background: `#0d0f14`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Radius: `8px`
- Focus State: Border `#f5a623` with ring `box-shadow: 0 0 0 2px rgba(245, 166, 35, 0.15)`.

---

## 6. Forbidden Clichés & Anti-Patterns (AI AGENT GUARDRAILS)

- ❌ **No Clichéd Purple-on-Dark Gradients**: Never use saturated violet/purple gradients on dark backgrounds.
- ❌ **No Flat, Textureless Surfaces**: Every card container must have a subtle 1px border or layered lighting contrast.
- ❌ **No Huge Untracked Typefaces**: Never render large headings without negative tracking (`letter-spacing: -0.02em`).
- ❌ **No Icon-Stuffed Bento Grids**: Do not place arbitrary icons in boxes without clear purpose.
- ❌ **No Biscuit Pill Badges with Pulsing Dots**: Avoid generic animated pulsing dots above hero headlines.
- ❌ **No Unstyled AI Placeholders**: Always use concrete typography, realistic mock data, and functional interactive states.

---
*TasteKit — Bridging the AI Taste Gap.*
