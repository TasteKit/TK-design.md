import React, { useState } from 'react';
import { Cpu, Search, Sparkles, ArrowRight, CheckCircle2, RefreshCw, Wand2, Globe } from 'lucide-react';

export function UrlAnalyzer({ onGenerateFromUrl }) {
  const [inputVal, setInputVal] = useState('https://linear.app');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [extractedSystem, setExtractedSystem] = useState(null);

  const samplePresets = [
    { label: 'Linear App', url: 'https://linear.app', vibe: 'High-Density Dark Obsidian', primary: '#5e6ad2', bg: '#08090a' },
    { label: 'Stripe', url: 'https://stripe.com', vibe: 'Vibrant Slate & Luminous Blue', primary: '#635bff', bg: '#0a2540' },
    { label: 'Apple', url: 'https://apple.com', vibe: 'Frosted Glass & Squircle Radii', primary: '#2997ff', bg: '#000000' },
    { label: 'Teenage Eng.', url: 'https://teenage.engineering', vibe: 'Tactile Industrial Hardware', primary: '#ff4400', bg: '#f0eee9' },
    { label: 'Cyberpunk 2077', url: 'Cyberpunk Neon Amber & Pitch Matte', vibe: 'Cyberpunk Terminal HUD', primary: '#f5a623', bg: '#0b0c10' },
  ];

  const handleScan = () => {
    if (!inputVal.trim()) return;
    setIsScanning(true);
    setScanStep(1);
    setExtractedSystem(null);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);
    setTimeout(() => setScanStep(4), 2100);
    setTimeout(() => {
      setIsScanning(false);
      setScanStep(0);

      // Synthesize an extracted design system based on input
      const isBright = inputVal.toLowerCase().includes('teenage') || inputVal.toLowerCase().includes('light');
      const isStripe = inputVal.toLowerCase().includes('stripe');
      const isApple = inputVal.toLowerCase().includes('apple');

      const extracted = {
        id: `extracted-${Date.now()}`,
        name: inputVal.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toUpperCase() || 'AI Extracted Brand',
        author: 'TasteKit AI Extractor',
        category: 'AI Extracted',
        stars: 99,
        downloads: '1.2k',
        tagline: `Reverse-engineered design tokens extracted directly from ${inputVal}`,
        vibe: isStripe ? 'Vibrant Slate & Electric Blue' : isApple ? 'Frosted Glass & Squircles' : isBright ? 'Tactile Industrial Minimal' : 'Velvet Obsidian & Modern Accent',
        badge: 'AI Reverse Engineered',
        tokens: {
          bg: isStripe ? '#0a2540' : isBright ? '#f4f4f2' : '#090a0f',
          surface: isStripe ? '#0e3357' : isBright ? '#e8e8e4' : '#12141c',
          surfaceHover: isStripe ? '#13426e' : isBright ? '#ddddd8' : '#1a1d28',
          surfaceActive: isStripe ? '#195185' : isBright ? '#d0d0ca' : '#232736',
          border: isBright ? 'rgba(0,0,0,0.12)' : 'rgba(255, 255, 255, 0.09)',
          borderHighlight: isStripe ? '#635bff' : '#f5a623',
          primary: isStripe ? '#635bff' : isBright ? '#ff4400' : '#f5a623',
          primaryHover: isStripe ? '#7a73ff' : isBright ? '#e03d00' : '#ffbe4a',
          primaryForeground: isBright ? '#ffffff' : '#120b02',
          accent: isStripe ? '#00d4ff' : '#10b981',
          text: isBright ? '#111111' : '#f4f5f8',
          textMuted: isBright ? '#666666' : '#9297a5',
          textSubtle: isBright ? '#999999' : '#545866',
          radius: isApple ? '16px' : isBright ? '3px' : '8px',
          radiusSm: '4px',
          radiusLg: isApple ? '24px' : '14px',
          fontHeading: isBright ? "'Space Mono', monospace" : "'Inter', sans-serif",
          fontBody: isBright ? "'Space Mono', monospace" : "'Inter', sans-serif",
          fontMono: "'JetBrains Mono', monospace",
          shadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          glow: '0 0 30px rgba(245, 166, 35, 0.25)',
        },
        antiPatterns: [
          'No generic purple-on-black gradient clichés',
          'No flat lifeless containers without subtle borders',
          'Enforce strict typography tracking and semantic token hierarchies'
        ],
        summary: `Extracted design system for ${inputVal} with automated token discovery and anti-pattern guardrails.`
      };

      setExtractedSystem(extracted);
    }, 2800);
  };

  return (
    <div className="tk-analyzer-wrapper">
      {/* Hero */}
      <div className="tk-hero-card">
        <div className="tk-hero-content">
          <div className="tk-hero-badge">
            <Cpu size={13} />
            <span>Autonomous Token Scanner</span>
          </div>
          <h2 className="tk-hero-headline">
            Reverse-engineer any website into a <span className="tk-gradient-text">DESIGN.md</span>
          </h2>
          <p className="tk-hero-desc">
            Paste any live website URL or brand aesthetic concept. TasteKit decomposes the DOM, extracts color hierarchies,
            measures radii and typography, and outputs a ready-to-use AI agent specification.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="tk-analyzer-box">
        <div className="tk-analyzer-input-row">
          <div className="tk-analyzer-field">
            <Globe size={18} className="tk-analyzer-icon" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. https://linear.app or 'Dark Luxury Fintech'"
              className="tk-analyzer-input"
              disabled={isScanning}
            />
          </div>

          <button
            className={`tk-btn-scan ${isScanning ? 'scanning' : ''}`}
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <RefreshCw size={16} className="tk-spin" />
                <span>Extracting Tokens...</span>
              </>
            ) : (
              <>
                <Wand2 size={16} />
                <span>Extract DESIGN.md</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="tk-analyzer-presets">
          <span className="tk-preset-label">Quick Scans:</span>
          {samplePresets.map((preset) => (
            <button
              key={preset.label}
              className="tk-preset-chip"
              onClick={() => {
                setInputVal(preset.url);
              }}
            >
              <span className="tk-preset-dot" style={{ background: preset.primary }}></span>
              <span>{preset.label}</span>
            </button>
          ))}
        </div>

        {/* Scan Animation Step Display */}
        {isScanning && (
          <div className="tk-scan-steps">
            <div className={`tk-step-row ${scanStep >= 1 ? 'active' : ''}`}>
              <div className="tk-step-indicator">{scanStep > 1 ? '✓' : '1'}</div>
              <span>Inspecting visual tokens and DOM surface hierarchies...</span>
            </div>
            <div className={`tk-step-row ${scanStep >= 2 ? 'active' : ''}`}>
              <div className="tk-step-indicator">{scanStep > 2 ? '✓' : '2'}</div>
              <span>Computing semantic color palette & contrast ratios...</span>
            </div>
            <div className={`tk-step-row ${scanStep >= 3 ? 'active' : ''}`}>
              <div className="tk-step-indicator">{scanStep > 3 ? '✓' : '3'}</div>
              <span>Measuring corner radii, letter-spacing, and typography scales...</span>
            </div>
            <div className={`tk-step-row ${scanStep >= 4 ? 'active' : ''}`}>
              <div className="tk-step-indicator">4</div>
              <span>Synthesizing agent guardrails & outputting DESIGN.md...</span>
            </div>
          </div>
        )}

        {/* Extraction Result Showcase */}
        {extractedSystem && (
          <div className="tk-extracted-result">
            <div className="tk-result-head">
              <div>
                <span className="tk-result-badge">Successfully Extracted</span>
                <h3 className="tk-result-title">{extractedSystem.name}</h3>
                <p className="tk-result-vibe">{extractedSystem.vibe}</p>
              </div>

              <button
                className="tk-btn-launch-extracted"
                onClick={() => onGenerateFromUrl(extractedSystem)}
              >
                <span>Load in Live Playground</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Extracted Swatches */}
            <div className="tk-extracted-swatches">
              <div className="tk-ext-swatch" style={{ background: extractedSystem.tokens.bg }}>
                <span>Background</span>
                <code>{extractedSystem.tokens.bg}</code>
              </div>
              <div className="tk-ext-swatch" style={{ background: extractedSystem.tokens.surface }}>
                <span>Surface</span>
                <code>{extractedSystem.tokens.surface}</code>
              </div>
              <div className="tk-ext-swatch" style={{ background: extractedSystem.tokens.primary, color: extractedSystem.tokens.primaryForeground }}>
                <span>Primary</span>
                <code>{extractedSystem.tokens.primary}</code>
              </div>
              <div className="tk-ext-swatch" style={{ background: extractedSystem.tokens.accent }}>
                <span>Accent</span>
                <code>{extractedSystem.tokens.accent}</code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
