/**
 * TasteKit Universal Spec Importer
 * Parses raw DESIGN.md (with YAML frontmatter) or TasteKit JSON into valid DesignSystem objects.
 */

export function parseDesignMdFile(content, fileName = 'custom-spec.md') {
  try {
    const yamlMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
    const id = fileName.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const name = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    let description = 'Custom imported design system specification.';
    const colors = {};
    let fontHeading = "'Geist', -apple-system, sans-serif";

    if (yamlMatch) {
      const lines = yamlMatch[1].split('\n');
      let currentSec = '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('description:')) {
          description = trimmed.replace('description:', '').trim().replace(/^['"]|['"]$/g, '');
        } else if (trimmed.startsWith('colors:')) {
          currentSec = 'colors';
        } else if (trimmed.startsWith('typography:')) {
          currentSec = 'typography';
        } else if (trimmed.startsWith('components:') || trimmed.startsWith('layout:')) {
          currentSec = '';
        } else if (currentSec === 'colors' && trimmed.includes(':')) {
          const [k, ...v] = trimmed.split(':');
          const val = v.join(':').trim().replace(/^['"]|['"]$/g, '');
          if (val.startsWith('#') || val.startsWith('rgba') || val.startsWith('rgb')) {
            colors[k.trim()] = val;
          }
        } else if (currentSec === 'typography' && trimmed.startsWith('fontFamily:')) {
          fontHeading = trimmed.replace('fontFamily:', '').trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }

    const bg = colors['canvas'] || colors['background'] || colors['bg'] || '#000000';
    const surface = colors['surface-card'] || colors['surface'] || '#0e1017';
    const primary = colors['primary'] || colors['accent'] || '#f5a623';
    const accent = colors['accent-teal'] || colors['accent'] || colors['secondary'] || '#3b82f6';
    const text = colors['ink'] || colors['body-strong'] || colors['text'] || '#ededed';
    const textMuted = colors['muted'] || colors['body'] || '#878787';
    const border = colors['hairline'] || colors['border'] || '#242424';

    return {
      id: `imported-${Date.now()}-${id}`,
      name: name,
      author: 'Imported Spec',
      category: 'Custom & Imported',
      stars: 1,
      downloads: '1',
      tagline: description,
      vibe: 'Custom Imported Spec',
      badge: 'User Import',
      tokens: {
        bg,
        surface,
        surfaceHover: surface,
        surfaceActive: surface,
        border,
        borderHighlight: primary,
        primary,
        primaryHover: primary,
        primaryForeground: bg.startsWith('#f') ? '#111111' : '#ffffff',
        accent,
        text,
        textMuted,
        textSubtle: '#666666',
        radius: '6px',
        radiusSm: '3px',
        radiusLg: '12px',
        fontHeading,
        fontBody: "'Geist', -apple-system, sans-serif",
        fontMono: "'Geist Mono', 'JetBrains Mono', monospace",
        shadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
        glow: `0 0 28px ${primary}30`,
      },
      antiPatterns: [
        'No clichéd purple gradients on pitch dark backgrounds',
        'Maintain strict WCAG contrast and typographic scales',
        'Avoid flat textureless containers without subtle 1px borders'
      ],
      summary: description
    };
  } catch (err) {
    console.error('Error parsing DESIGN.md file:', err);
    return null;
  }
}
