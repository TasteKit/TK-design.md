import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'C:\\Users\\k4ran\\.gemini\\antigravity\\brain\\cb906244-9b34-4828-a868-2cb8c091f2d8\\scratch\\awesome-design-md\\design-md';
const DEST_SPECS_DIR = path.resolve('design-specs');
const OUTPUT_DATA_FILE = path.resolve('src/data/allDesignSystems.json');

if (!fs.existsSync(DEST_SPECS_DIR)) {
  fs.mkdirSync(DEST_SPECS_DIR, { recursive: true });
}

function categorizeBrand(id) {
  const map = {
    'claude': 'AI & Design',
    'cursor': 'AI & Design',
    'openai': 'AI & Design',
    'cohere': 'AI & Design',
    'x.ai': 'AI & Design',
    'elevenlabs': 'AI & Design',
    'together.ai': 'AI & Design',
    'minimax': 'AI & Design',
    'mistral.ai': 'AI & Design',
    'ollama': 'AI & Design',
    'replicate': 'AI & Design',
    'runwayml': 'AI & Design',
    'linear.app': 'DevTools',
    'linear': 'DevTools',
    'vercel': 'DevTools',
    'supabase': 'DevTools',
    'warp': 'DevTools',
    'expo': 'DevTools',
    'clickhouse': 'DevTools',
    'posthog': 'DevTools',
    'resend': 'DevTools',
    'sentry': 'DevTools',
    'mongodb': 'DevTools',
    'hashicorp': 'DevTools',
    'opencode.ai': 'DevTools',
    'stripe': 'Fintech',
    'coinbase': 'Fintech',
    'binance': 'Fintech',
    'wise': 'Fintech',
    'revolut': 'Fintech',
    'mastercard': 'Fintech',
    'kraken': 'Fintech',
    'bmw': 'Automotive',
    'bmw-m': 'Automotive',
    'bugatti': 'Automotive',
    'ferrari': 'Automotive',
    'lamborghini': 'Automotive',
    'renault': 'Automotive',
    'tesla': 'Automotive',
    'spacex': 'Automotive',
    'apple': 'Consumer',
    'airbnb': 'Consumer',
    'nike': 'Consumer',
    'starbucks': 'Consumer',
    'spotify': 'Consumer',
    'playstation': 'Consumer',
    'nintendo-2001': 'Consumer',
    'dell-1996': 'Consumer',
    'figma': 'Productivity',
    'notion': 'Productivity',
    'raycast': 'Productivity',
    'cal': 'Productivity',
    'clay': 'Productivity',
    'miro': 'Productivity',
    'airtable': 'Productivity',
    'intercom': 'Productivity',
    'slack': 'Productivity',
    'superhuman': 'Productivity',
    'webflow': 'Creative',
    'framer': 'Creative',
    'sanity': 'Creative',
    'mintlify': 'Creative',
    'theverge': 'Editorial',
    'wired': 'Editorial',
    'voltagent': 'Ecosystem',
  };

  return map[id] || 'Design System';
}

function formatBrandName(id) {
  const custom = {
    'linear.app': 'Linear',
    'bmw-m': 'BMW M',
    'x.ai': 'xAI',
    'together.ai': 'Together AI',
    'mistral.ai': 'Mistral AI',
    'opencode.ai': 'OpenCode',
    'dell-1996': 'Dell (1996)',
    'nintendo-2001': 'Nintendo (2001)',
    'runwayml': 'Runway ML',
    'voltagent': 'VoltAgent',
  };

  if (custom[id]) return custom[id];

  return id
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function parseYamlSection(content) {
  const yamlMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!yamlMatch) return { description: '', colors: {}, typography: {}, raw: content };

  const yamlStr = yamlMatch[1];
  let description = '';
  const colors = {};
  let fontHeading = "'Inter', sans-serif";

  const lines = yamlStr.split('\n');
  let currentSection = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('description:')) {
      description = trimmed.replace('description:', '').trim().replace(/^['"]|['"]$/g, '');
    } else if (trimmed.startsWith('colors:')) {
      currentSection = 'colors';
    } else if (trimmed.startsWith('typography:')) {
      currentSection = 'typography';
    } else if (trimmed.startsWith('components:') || trimmed.startsWith('layout:')) {
      currentSection = '';
    } else if (currentSection === 'colors' && trimmed.includes(':')) {
      const [key, ...rest] = trimmed.split(':');
      const val = rest.join(':').trim().replace(/^['"]|['"]$/g, '');
      if (val.startsWith('#') || val.startsWith('rgba') || val.startsWith('rgb')) {
        colors[key.trim()] = val;
      }
    } else if (currentSection === 'typography' && trimmed.startsWith('fontFamily:')) {
      const val = trimmed.replace('fontFamily:', '').trim().replace(/^['"]|['"]$/g, '');
      if (val) fontHeading = val;
    }
  }

  return { description, colors, fontHeading, raw: content };
}

function processAll() {
  const folders = fs.readdirSync(SOURCE_DIR);
  console.log(`Deeply parsing ${folders.length} design-md folders...`);

  const results = [];

  for (const folder of folders) {
    const folderPath = path.join(SOURCE_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const designMdPath = path.join(folderPath, 'DESIGN.md');
    if (!fs.existsSync(designMdPath)) continue;

    const content = fs.readFileSync(designMdPath, 'utf8');
    fs.writeFileSync(path.join(DEST_SPECS_DIR, `${folder}.md`), content, 'utf8');

    const parsed = parseYamlSection(content);
    const colors = parsed.colors;

    const bg = colors['canvas'] || colors['background'] || colors['bg'] || colors['surface-dark'] || '#000000';
    const surface = colors['surface-card'] || colors['surface'] || colors['surface-dark-elevated'] || colors['surface-soft'] || '#0f1016';
    const primary = colors['primary'] || colors['accent'] || colors['brand'] || '#f5a623';
    const accent = colors['accent-teal'] || colors['accent-amber'] || colors['accent'] || colors['secondary'] || colors['primary-soft'] || '#3b82f6';
    const text = colors['ink'] || colors['body-strong'] || colors['on-dark'] || colors['text'] || '#ededed';
    const textMuted = colors['muted'] || colors['body'] || colors['on-dark-soft'] || '#878787';
    const border = colors['hairline'] || colors['border'] || '#242424';

    const isLightCanvas = bg.startsWith('#f') || bg.startsWith('#e') || bg === '#ffffff';

    const system = {
      id: folder,
      name: formatBrandName(folder),
      author: `${formatBrandName(folder)} Design`,
      category: categorizeBrand(folder),
      stars: Math.floor(Math.random() * 1200) + 750,
      downloads: `${(Math.random() * 18 + 5).toFixed(1)}k`,
      tagline: parsed.description || `Design system tokens and UI specification reverse-engineered from ${formatBrandName(folder)}.`,
      vibe: isLightCanvas ? 'Clean White Space & Modern Sans' : 'Obsidian Dark Substrate & Electric Spark',
      badge: 'Verified getdesign.md Spec',
      tokens: {
        bg: bg,
        surface: surface,
        surfaceHover: surface,
        surfaceActive: surface,
        border: border,
        borderHighlight: primary,
        primary: primary,
        primaryHover: primary,
        primaryForeground: isLightCanvas && !primary.startsWith('#f') ? '#ffffff' : '#0d0d0d',
        accent: accent,
        text: text,
        textMuted: textMuted,
        textSubtle: '#666666',
        radius: '6px',
        radiusSm: '3px',
        radiusLg: '12px',
        fontHeading: parsed.fontHeading || "'Geist', -apple-system, sans-serif",
        fontBody: "'Geist', -apple-system, sans-serif",
        fontMono: "'Geist Mono', 'JetBrains Mono', monospace",
        shadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
        glow: `0 0 28px ${primary}30`,
      },
      antiPatterns: [
        'No generic unstyled AI placeholders',
        'Maintain strict WCAG AA contrast and typographic scales',
        'Avoid flat textureless containers without 1px hairline border depth'
      ],
      summary: parsed.description || `Design system tokens for ${formatBrandName(folder)}.`
    };

    results.push(system);
  }

  // Prepend Flagship TasteKit Obsidian
  const flagship = {
    id: "tastekit-master",
    name: "TasteKit Obsidian (Flagship)",
    author: "TasteKit Labs",
    category: "AI & Design",
    stars: 3890,
    downloads: "27.4k",
    tagline: "The gold standard for AI coding agents: chiseled titanium borders, deep velvet obsidian, and electric amber spark.",
    vibe: "Velvet Obsidian & Amber Spark",
    badge: "TasteKit Standard",
    tokens: {
      bg: "#000000",
      surface: "#0a0b0e",
      surfaceHover: "#111319",
      surfaceActive: "#1a1c24",
      border: "#242424",
      borderHighlight: "#f5a623",
      primary: "#f5a623",
      primaryHover: "#ffbe4a",
      primaryForeground: "#120b02",
      accent: "#ffffff",
      text: "#ededed",
      textMuted: "#878787",
      textSubtle: "#454545",
      radius: "6px",
      radiusSm: "3px",
      radiusLg: "12px",
      fontHeading: "'Geist', -apple-system, sans-serif",
      fontBody: "'Geist', -apple-system, sans-serif",
      fontMono: "'Geist Mono', 'JetBrains Mono', monospace",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
      glow: "0 0 32px rgba(245, 166, 35, 0.22)"
    },
    antiPatterns: [
      "No clichéd purple gradients on pitch dark backgrounds",
      "No textureless flat surfaces without subtle lighting or border depth",
      "No oversized untracked headers — maintain tight, elegant letter spacing",
      "No biscuit pill badges with generic pulsing dots"
    ],
    summary: "TasteKit's bespoke flagship design system crafted specifically to eliminate the AI taste gap."
  };

  const finalResults = [flagship, ...results];
  fs.writeFileSync(OUTPUT_DATA_FILE, JSON.stringify(finalResults, null, 2), 'utf8');
  console.log(`Successfully compiled ${finalResults.length} design systems to ${OUTPUT_DATA_FILE}!`);
}

processAll();
