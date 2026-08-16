import React, { useState } from 'react';
import { Sliders, Sparkles, Plus, RefreshCw, Check, ArrowRight, ShieldCheck, Download, Code2 } from 'lucide-react';

export function Studio({ onSaveCustomSystem, onOpenExport, currentSystem }) {
  const [name, setName] = useState('My Custom Brand');
  const [vibe, setVibe] = useState('Ultra Modern Dark Velocity');
  const [tagline, setTagline] = useState('Sleek dark interface with custom neon accents.');
  const [category, setCategory] = useState('AI & Design');

  const [bg, setBg] = useState(currentSystem?.tokens?.bg || '#0b0d11');
  const [surface, setSurface] = useState(currentSystem?.tokens?.surface || '#14171f');
  const [border, setBorder] = useState(currentSystem?.tokens?.border || 'rgba(255, 255, 255, 0.1)');
  const [primary, setPrimary] = useState(currentSystem?.tokens?.primary || '#3b82f6');
  const [accent, setAccent] = useState(currentSystem?.tokens?.accent || '#10b981');
  const [text, setText] = useState(currentSystem?.tokens?.text || '#f9fafb');
  const [textMuted, setTextMuted] = useState(currentSystem?.tokens?.textMuted || '#9ca3af');

  const [radius, setRadius] = useState(currentSystem?.tokens?.radius || '8px');
  const [fontHeading, setFontHeading] = useState("'Inter', sans-serif");

  const [selectedRules, setSelectedRules] = useState([
    'No clichéd purple gradients on dark backgrounds',
    'No icon-stuffed bento boxes without clear hierarchy',
    'No textureless flat surfaces without subtle lighting or border depth',
    'No huge untracked typefaces without proper letter-spacing'
  ]);

  const allRules = [
    'No clichéd purple gradients on dark backgrounds',
    'No icon-stuffed bento boxes without clear hierarchy',
    'No textureless flat surfaces without subtle lighting or border depth',
    'No huge untracked typefaces without proper letter-spacing',
    'No biscuit pill badges with pulsing dots above main hero headlines',
    'No low-contrast gray text on low-contrast cards',
    'No rounded pill buttons for developer tool workflows',
    'No distracting background particle mesh overlays'
  ];

  const toggleRule = (rule) => {
    if (selectedRules.includes(rule)) {
      setSelectedRules(selectedRules.filter((r) => r !== rule));
    } else {
      setSelectedRules([...selectedRules, rule]);
    }
  };

  const buildSystemObject = () => {
    return {
      id: `custom-${Date.now()}`,
      name: name || 'Custom Design System',
      author: 'TasteKit Creator',
      category: category,
      stars: 1,
      downloads: '1',
      tagline: tagline,
      vibe: vibe,
      badge: 'Custom Spec',
      tokens: {
        bg,
        surface,
        surfaceHover: surface,
        surfaceActive: surface,
        border,
        borderHighlight: primary,
        primary,
        primaryHover: primary,
        primaryForeground: '#ffffff',
        accent,
        text,
        textMuted,
        textSubtle: '#64748b',
        radius,
        radiusSm: '4px',
        radiusLg: '14px',
        fontHeading,
        fontBody: fontHeading,
        fontMono: "'JetBrains Mono', monospace",
        shadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        glow: `0 0 24px ${primary}40`,
      },
      antiPatterns: selectedRules,
      summary: `Custom design system with ${vibe}. Spec designed in TasteKit Studio.`
    };
  };

  const handleApply = () => {
    const sys = buildSystemObject();
    onSaveCustomSystem(sys);
  };

  return (
    <div className="tk-studio-wrapper">
      <div className="tk-studio-header">
        <div>
          <div className="tk-hero-badge">
            <Sliders size={13} />
            <span>Interactive Studio Builder</span>
          </div>
          <h2 className="tk-studio-title">Craft Your Custom <span className="tk-gradient-text">DESIGN.md</span></h2>
          <p className="tk-studio-desc">
            Fine-tune tokens in real-time. Everything syncs directly with the Live Playground and exports to standard AI coding agent specifications.
          </p>
        </div>

        <div className="tk-studio-header-actions">
          <button className="tk-btn-studio-apply" onClick={handleApply}>
            <Sparkles size={15} />
            <span>Save & Test in Playground</span>
          </button>
        </div>
      </div>

      <div className="tk-studio-grid">
        {/* Left Column: Form Controls */}
        <div className="tk-studio-controls">
          {/* Metadata Section */}
          <div className="tk-studio-section">
            <h3 className="tk-studio-sec-title">1. System Metadata</h3>
            <div className="tk-studio-form-grid">
              <div className="tk-form-field">
                <label className="tk-form-lbl">Brand / System Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="tk-form-input"
                  placeholder="e.g. Nexus Dark"
                />
              </div>

              <div className="tk-form-field">
                <label className="tk-form-lbl">Vibe / Persona</label>
                <input
                  type="text"
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="tk-form-input"
                  placeholder="e.g. Cyberpunk Obsidian & Amber"
                />
              </div>

              <div className="tk-form-field full">
                <label className="tk-form-lbl">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="tk-form-input"
                  placeholder="Brief one-line summary"
                />
              </div>
            </div>
          </div>

          {/* Color Tokens Section */}
          <div className="tk-studio-section">
            <h3 className="tk-studio-sec-title">2. Color Token Matrix</h3>
            <div className="tk-colors-grid">
              <div className="tk-color-control">
                <label className="tk-color-lbl">Canvas Background</label>
                <div className="tk-color-picker-row">
                  <input
                    type="color"
                    value={bg.startsWith('#') ? bg : '#0b0d11'}
                    onChange={(e) => setBg(e.target.value)}
                    className="tk-color-picker"
                  />
                  <input
                    type="text"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    className="tk-color-hex"
                  />
                </div>
              </div>

              <div className="tk-color-control">
                <label className="tk-color-lbl">Surface Container</label>
                <div className="tk-color-picker-row">
                  <input
                    type="color"
                    value={surface.startsWith('#') ? surface : '#14171f'}
                    onChange={(e) => setSurface(e.target.value)}
                    className="tk-color-picker"
                  />
                  <input
                    type="text"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    className="tk-color-hex"
                  />
                </div>
              </div>

              <div className="tk-color-control">
                <label className="tk-color-lbl">Primary Action</label>
                <div className="tk-color-picker-row">
                  <input
                    type="color"
                    value={primary.startsWith('#') ? primary : '#3b82f6'}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="tk-color-picker"
                  />
                  <input
                    type="text"
                    value={primary}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="tk-color-hex"
                  />
                </div>
              </div>

              <div className="tk-color-control">
                <label className="tk-color-lbl">Secondary Accent</label>
                <div className="tk-color-picker-row">
                  <input
                    type="color"
                    value={accent.startsWith('#') ? accent : '#10b981'}
                    onChange={(e) => setAccent(e.target.value)}
                    className="tk-color-picker"
                  />
                  <input
                    type="text"
                    value={accent}
                    onChange={(e) => setAccent(e.target.value)}
                    className="tk-color-hex"
                  />
                </div>
              </div>

              <div className="tk-color-control">
                <label className="tk-color-lbl">Text Primary</label>
                <div className="tk-color-picker-row">
                  <input
                    type="color"
                    value={text.startsWith('#') ? text : '#f9fafb'}
                    onChange={(e) => setText(e.target.value)}
                    className="tk-color-picker"
                  />
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="tk-color-hex"
                  />
                </div>
              </div>

              <div className="tk-color-control">
                <label className="tk-color-lbl">Text Muted</label>
                <div className="tk-color-picker-row">
                  <input
                    type="color"
                    value={textMuted.startsWith('#') ? textMuted : '#9ca3af'}
                    onChange={(e) => setTextMuted(e.target.value)}
                    className="tk-color-picker"
                  />
                  <input
                    type="text"
                    value={textMuted}
                    onChange={(e) => setTextMuted(e.target.value)}
                    className="tk-color-hex"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Geometry & Typography */}
          <div className="tk-studio-section">
            <h3 className="tk-studio-sec-title">3. Geometry & Typography</h3>
            <div className="tk-studio-form-grid">
              <div className="tk-form-field">
                <label className="tk-form-lbl">Corner Radius ({radius})</label>
                <select
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="tk-form-input"
                >
                  <option value="0px">Sharp 0px (Brutalist / Industrial)</option>
                  <option value="4px">Compact 4px (Dense)</option>
                  <option value="6px">Linear 6px (Modern DevTool)</option>
                  <option value="8px">Refined 8px (Balanced Standard)</option>
                  <option value="12px">Smooth 12px (Polished SaaS)</option>
                  <option value="16px">Apple Squircle 16px (Consumer)</option>
                  <option value="9999px">Pill 9999px (Ultra Rounded)</option>
                </select>
              </div>

              <div className="tk-form-field">
                <label className="tk-form-lbl">Heading & Body Typeface</label>
                <select
                  value={fontHeading}
                  onChange={(e) => setFontHeading(e.target.value)}
                  className="tk-form-input"
                >
                  <option value="'Inter', sans-serif">Inter (Universal Precision)</option>
                  <option value="'Geist', sans-serif">Geist (Modern Monochromatic)</option>
                  <option value="'Space Mono', monospace">Space Mono (Industrial Tactile)</option>
                  <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Warm Geometric)</option>
                  <option value="'Lora', Georgia, serif">Lora (Editorial Serif)</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Guardrails & Anti-patterns */}
          <div className="tk-studio-section">
            <h3 className="tk-studio-sec-title">4. AI Agent Guardrails & Anti-Patterns</h3>
            <div className="tk-rules-checklist">
              {allRules.map((rule) => {
                const isChecked = selectedRules.includes(rule);
                return (
                  <label key={rule} className={`tk-rule-item ${isChecked ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleRule(rule)}
                    />
                    <span>{rule}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Mini Preview Card */}
        <div className="tk-studio-preview-col">
          <div className="tk-preview-sticky">
            <div className="tk-preview-head">
              <span className="tk-preview-head-lbl">Live Spec Preview</span>
              <span className="tk-preview-pill" style={{ background: primary, color: '#fff' }}>
                Active
              </span>
            </div>

            <div
              className="tk-preview-card-live"
              style={{
                backgroundColor: bg,
                borderColor: border,
                borderRadius: radius,
                color: text,
                fontFamily: fontHeading,
              }}
            >
              <div
                className="tk-live-subcard"
                style={{
                  backgroundColor: surface,
                  borderColor: border,
                  borderRadius: radius,
                }}
              >
                <div className="tk-live-badge" style={{ backgroundColor: `${primary}20`, color: primary }}>
                  {vibe}
                </div>
                <h4 style={{ color: text, margin: '8px 0 4px', fontSize: '16px' }}>{name}</h4>
                <p style={{ color: textMuted, fontSize: '13px', margin: 0 }}>{tagline}</p>

                <div className="tk-live-btn-row">
                  <button
                    style={{
                      backgroundColor: primary,
                      color: '#ffffff',
                      borderRadius: radius,
                      border: 'none',
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Primary Button
                  </button>
                  <button
                    style={{
                      backgroundColor: 'transparent',
                      color: text,
                      border: `1px solid ${border}`,
                      borderRadius: radius,
                      padding: '8px 14px',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    Outline
                  </button>
                </div>
              </div>

              <div className="tk-live-guard-summary">
                <ShieldCheck size={14} style={{ color: accent }} />
                <span>{selectedRules.length} Agent Guardrails Active</span>
              </div>
            </div>

            <button className="tk-btn-studio-big-apply" onClick={handleApply}>
              <span>Launch into Playground</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
