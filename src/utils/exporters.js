export function generateDesignMd(system) {
  const { name, vibe, tokens, antiPatterns, summary } = system;

  return `# DESIGN.md — ${name} Design System
> Generated via TasteKit Studio (https://github.com/TasteKit/TK-design.md)
> Standardized Design Reference for AI Coding Agents

## 1. Visual Persona & Philosophy
- **Identity & Tone**: ${vibe}
- **Summary**: ${summary}

---

## 2. Color Palette & Semantic Tokens

### Core Surfaces & Backgrounds
- **Background (\`--color-bg\`)**: \`${tokens.bg}\` (Main canvas substrate)
- **Surface (\`--color-surface\`)**: \`${tokens.surface}\` (Cards, panels, modals)
- **Surface Hover (\`--color-surface-hover\`)**: \`${tokens.surfaceHover}\`
- **Surface Active (\`--color-surface-active\`)**: \`${tokens.surfaceActive}\`

### Borders & Dividers
- **Subtle Border (\`--color-border\`)**: \`${tokens.border}\`
- **Highlight Border (\`--color-border-highlight\`)**: \`${tokens.borderHighlight}\`

### Brand & Interactive Accents
- **Primary Action (\`--color-primary\`)**: \`${tokens.primary}\`
- **Primary Hover (\`--color-primary-hover\`)**: \`${tokens.primaryHover}\`
- **Primary Foreground (\`--color-primary-fg\`)**: \`${tokens.primaryForeground}\`
- **Secondary Accent (\`--color-accent\`)**: \`${tokens.accent}\`

### Typography Hierarchy
- **Text Primary (\`--color-text\`)**: \`${tokens.text}\`
- **Text Muted (\`--color-text-muted\`)**: \`${tokens.textMuted}\`
- **Text Subtle (\`--color-text-subtle\`)**: \`${tokens.textSubtle}\`

---

## 3. Typography & Sizing Scale

- **Heading Font**: \`${tokens.fontHeading}\`
- **Body Font**: \`${tokens.fontBody}\`
- **Monospace Font**: \`${tokens.fontMono}\`

### Typographic Principles:
- **Headings**: Tight tracking (\`-0.02em\` to \`-0.03em\`), heavy/semi-bold weight, tight line-height (\`1.15\`).
- **Body**: Generous line-height (\`1.6\`), optimized for maximum legibility.
- **Micro-labels / Monospace**: \`letter-spacing: 0.08em\`, uppercase for tags and telemetry.

---

## 4. Geometry, Radii & Shadows

- **Base Radius**: \`${tokens.radius}\`
- **Small Radius (badges, pills)**: \`${tokens.radiusSm}\`
- **Large Radius (modals, hero cards)**: \`${tokens.radiusLg}\`
- **Box Shadow**: \`${tokens.shadow}\`
- **Accent Glow**: \`${tokens.glow}\`

---

## 5. Component Construction Rules

### Buttons:
- Primary: Background \`${tokens.primary}\`, Text \`${tokens.primaryForeground}\`, Radius \`${tokens.radius}\`, Padding \`8px 16px\`.
- Secondary: Background \`${tokens.surface}\`, Border \`1px solid ${tokens.border}\`, Text \`${tokens.text}\`.
- Micro-interactions: Smooth \`150ms ease\` scale (\`0.98\` active) and brightness shift.

### Cards & Panels:
- Background \`${tokens.surface}\`, 1px border \`${tokens.border}\`.
- Radius \`${tokens.radiusLg}\`, padding \`20px - 28px\`.
- Hover transition to \`${tokens.surfaceHover}\` with subtle highlight border \`${tokens.borderHighlight}\`.

### Form Inputs:
- Background \`${tokens.surface}\`, border \`1px solid ${tokens.border}\`, text \`${tokens.text}\`.
- Focus ring: \`2px solid ${tokens.primary}\`, \`outline: none\`.

---

## 6. Forbidden Clichés & Anti-Patterns (AGENT GUARDRAILS)
${antiPatterns.map((rule) => `- ❌ ${rule}`).join("\n")}
- ❌ No generic unstyled AI placeholders or lorem ipsum
- ❌ No misaligned text baselines or inconsistent spacing units

---
*TasteKit — Bridging the AI Taste Gap.*
`;
}

export function generateTailwindConfig(system) {
  const { tokens } = system;
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '${tokens.bg}',
        surface: {
          DEFAULT: '${tokens.surface}',
          hover: '${tokens.surfaceHover}',
          active: '${tokens.surfaceActive}',
        },
        border: {
          DEFAULT: '${tokens.border}',
          highlight: '${tokens.borderHighlight}',
        },
        primary: {
          DEFAULT: '${tokens.primary}',
          hover: '${tokens.primaryHover}',
          foreground: '${tokens.primaryForeground}',
        },
        accent: '${tokens.accent}',
        muted: '${tokens.textMuted}',
        subtle: '${tokens.textSubtle}',
      },
      borderRadius: {
        DEFAULT: '${tokens.radius}',
        sm: '${tokens.radiusSm}',
        lg: '${tokens.radiusLg}',
      },
      fontFamily: {
        sans: [${tokens.fontBody}],
        heading: [${tokens.fontHeading}],
        mono: [${tokens.fontMono}],
      },
      boxShadow: {
        tk: '${tokens.shadow}',
        glow: '${tokens.glow}',
      }
    },
  },
  plugins: [],
};`;
}

export function generateCssVariables(system) {
  const { tokens } = system;
  return `/* ==========================================================================
   TasteKit Design Tokens — ${system.name}
   ========================================================================== */

:root {
  --tk-bg: ${tokens.bg};
  --tk-surface: ${tokens.surface};
  --tk-surface-hover: ${tokens.surfaceHover};
  --tk-surface-active: ${tokens.surfaceActive};

  --tk-border: ${tokens.border};
  --tk-border-highlight: ${tokens.borderHighlight};

  --tk-primary: ${tokens.primary};
  --tk-primary-hover: ${tokens.primaryHover};
  --tk-primary-fg: ${tokens.primaryForeground};
  --tk-accent: ${tokens.accent};

  --tk-text: ${tokens.text};
  --tk-text-muted: ${tokens.textMuted};
  --tk-text-subtle: ${tokens.textSubtle};

  --tk-radius: ${tokens.radius};
  --tk-radius-sm: ${tokens.radiusSm};
  --tk-radius-lg: ${tokens.radiusLg};

  --tk-font-heading: ${tokens.fontHeading};
  --tk-font-body: ${tokens.fontBody};
  --tk-font-mono: ${tokens.fontMono};

  --tk-shadow: ${tokens.shadow};
  --tk-glow: ${tokens.glow};
}

body {
  background-color: var(--tk-bg);
  color: var(--tk-text);
  font-family: var(--tk-font-body);
  -webkit-font-smoothing: antialiased;
}`;
}

export function generateAgentRules(system) {
  return `<!-- AGENTS.md / .cursorrules / CLAUDE.md -->
# Role & Aesthetic Directive
You are building user interfaces strictly matching the **${system.name}** design system from TasteKit.

## Visual Tokens to Obey:
- Background substrate: \`${system.tokens.bg}\`
- Surface layers: \`${system.tokens.surface}\` (hover: \`${system.tokens.surfaceHover}\`)
- Primary brand action: \`${system.tokens.primary}\` (foreground: \`${system.tokens.primaryForeground}\`)
- Subtle border lines: \`${system.tokens.border}\`
- Corner radius: \`${system.tokens.radius}\` (large panels: \`${system.tokens.radiusLg}\`)
- Typography: Heading font \`${system.tokens.fontHeading}\`, Body \`${system.tokens.fontBody}\`, Mono \`${system.tokens.fontMono}\`.

## Negative Constraints (Strict Guardrails):
${system.antiPatterns.map(ap => `- ${ap}`).join("\n")}

Always use crisp micro-animations (150ms ease-out transitions), proper letter-spacing (-0.02em on headings), and clean semantic HTML.
`;
}
