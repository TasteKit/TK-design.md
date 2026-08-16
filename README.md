<p align="center">
  <img src="public/tastekit-logo.jpg" alt="TasteKit Logo" width="120" style="border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.6);" />
</p>

<h1 align="center">TasteKit — TK-design.md</h1>

<p align="center">
  <strong>The Next-Generation DESIGN.md Engine, Live Token Studio & AI Coding Agent Ecosystem.</strong>
</p>

<p align="center">
  <a href="https://github.com/TasteKit/TK-design.md"><img src="https://img.shields.io/badge/License-MIT-amber.svg?style=flat-square" alt="License" /></a>
  <a href="https://github.com/TasteKit/TK-design.md"><img src="https://img.shields.io/badge/Spec-Google%20Stitch%20v2.4-5e6ad2.svg?style=flat-square" alt="Spec" /></a>
  <a href="https://github.com/TasteKit/TK-design.md"><img src="https://img.shields.io/badge/Taste%20Quality-100%25%20Slop--Free-10b981.svg?style=flat-square" alt="Slop Free" /></a>
</p>

---

## ⚡ What is TasteKit?

While tools like `getdesign.md` provide static markdown text, **TasteKit (`TK-design.md`)** is a dynamic, interactive design system platform and generator built specifically to **eliminate the AI taste gap**.

When AI coding assistants (Antigravity, Claude Code, Cursor, Codex) generate frontends, they often default to repetitive, clichéd templates. **TasteKit provides machine-readable, battle-tested design system profiles (`DESIGN.md`)** that give your agent deep aesthetic context: semantic color palettes, strict typography scales, responsive layout tokens, and explicit anti-pattern guardrails.

---

## 🌟 Key Features

* 🚀 **Curated Design Systems Registry**: Pre-configured, high-fidelity specs inspired by Linear, Stripe, Apple, Vercel, Supabase, Raycast, Teenage Engineering, Arc, and Notion.
* 🔮 **Interactive Live Playground**: Real-time canvas testing with live tokens applied directly to headers, hero banners, metrics cards, form inputs, and buttons.
* 🎨 **Visual Custom Studio**: Customize color layers, typography scales, radii, and anti-patterns with instant live sync.
* 🤖 **AI Token Extractor / URL Analyzer**: Reverse-engineer any website URL or aesthetic concept into a structured `DESIGN.md` spec.
* 📦 **Multi-Format Export**: One-click exports to `DESIGN.md`, `tailwind.config.js`, `variables.css`, and AI Agent rules (`AGENTS.md` / `.cursorrules` / `CLAUDE.md`).
* 🛡️ **Anti-Cliché Guardrails**: Strict negative constraints that ban AI slop (oversaturated purple gradients, flat textureless surfaces, oversized untracked type).

---

## 🚀 Quick Start

### 1. Run the Studio Locally
```bash
# Clone the repository
git clone https://github.com/TasteKit/TK-design.md.git
cd TK-design.md

# Install dependencies
npm install

# Start the interactive development server
npm run dev
```

### 2. Use a DESIGN.md with your AI Agent
1. Choose or generate a spec in the TasteKit Studio.
2. Click **Export Spec** and copy or download `DESIGN.md`.
3. Drop `DESIGN.md` in the root of your project workspace.
4. Prompt your AI Agent:
   ```text
   Build the user settings page according to the design system rules in DESIGN.md.
   ```

---

## 📂 Repository Structure

```
TK-design.md/
├── src/
│   ├── data/
│   │   └── designSystems.js    # Curated design systems registry & token maps
│   ├── utils/
│   │   └── exporters.js        # Multi-format generators (DESIGN.md, Tailwind, CSS)
│   ├── components/
│   │   ├── Header.jsx          # Brand nav & quick actions
│   │   ├── Catalog.jsx         # Searchable design system showcase
│   │   ├── Playground.jsx      # Live interactive canvas & token inspector
│   │   ├── Studio.jsx          # Visual design system builder
│   │   ├── UrlAnalyzer.jsx     # AI website reverse-engineering extractor
│   │   └── ExportModal.jsx     # Multi-format export dialog with copy toasts
│   ├── index.css               # Vanilla CSS design system tokens
│   └── App.jsx                 # Master application controller
├── public/
│   └── tastekit-logo.jpg       # TasteKit brand asset
├── DESIGN.md                   # TasteKit Flagship Master Design Specification
└── README.md
```

---

## 📋 Standard `DESIGN.md` Structure

Every spec produced by TasteKit follows the standardized structure:

1. **Visual Persona & Philosophy**: Core identity, mood, and aesthetic tone.
2. **Color Palette & Semantic Tokens**: Canvas background, surfaces, borders, primary action, and typography contrast levels.
3. **Typography & Sizing**: Heading/body font stacks, tracking (`letter-spacing`), and line-heights.
4. **Geometry & Radii**: Precision corner radii, elevation shadows, and glow behaviors.
5. **Component Blueprints**: Button recipes, card layering, input focus rings, and badge treatments.
6. **Forbidden Clichés (Agent Guardrails)**: Explicit negative rules that ban generic AI tropes.

---

## 🤝 Contributing

We welcome contributions of new design system analyses!
1. Fork this repository.
2. Add your design system object into `src/data/designSystems.js`.
3. Test it in the Live Playground (`npm run dev`).
4. Submit a Pull Request.

---

## 📄 License

MIT License © 2026 [TasteKit](https://github.com/TasteKit).
