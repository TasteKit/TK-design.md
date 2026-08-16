import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  Copy,
  Check,
  Download,
  Code2,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  Layers,
  Sparkles
} from 'lucide-react';
import { generateDesignMd, generateAgentRules } from '../utils/exporters';
import { calculateContrast } from '../utils/contrast';
import { getSystemBrandLogo } from './BrandLogos';

export function Playground({
  system,
  systems,
  onSelectSystem,
  onOpenExport
}) {
  const [viewport, setViewport] = useState('desktop'); // desktop, tablet, mobile
  const [isLightMode, setIsLightMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [playgroundView, setPlaygroundView] = useState('app'); // 'app' | 'primitives'
  const [formInput, setFormInput] = useState('');
  const [copiedFormat, setCopiedFormat] = useState(null);

  const tokens = system.tokens;

  // Calculate live WCAG contrast compliance
  const primaryContrast = calculateContrast(tokens.primaryForeground, tokens.primary);
  const textContrast = calculateContrast(tokens.text, tokens.bg);

  const canvasStyle = {
    '--canvas-bg': isLightMode ? '#f8f9fa' : tokens.bg,
    '--canvas-surface': isLightMode ? '#ffffff' : tokens.surface,
    '--canvas-surface-hover': isLightMode ? '#f1f3f5' : tokens.surfaceHover,
    '--canvas-border': isLightMode ? 'rgba(0,0,0,0.1)' : tokens.border,
    '--canvas-border-highlight': tokens.borderHighlight,
    '--canvas-primary': tokens.primary,
    '--canvas-primary-hover': tokens.primaryHover,
    '--canvas-primary-fg': tokens.primaryForeground,
    '--canvas-accent': tokens.accent,
    '--canvas-text': isLightMode ? '#111827' : tokens.text,
    '--canvas-text-muted': isLightMode ? '#6b7280' : tokens.textMuted,
    '--canvas-text-subtle': isLightMode ? '#9ca3af' : tokens.textSubtle,
    '--canvas-radius': tokens.radius,
    '--canvas-radius-sm': tokens.radiusSm,
    '--canvas-radius-lg': tokens.radiusLg,
    '--canvas-font-heading': tokens.fontHeading,
    '--canvas-font-body': tokens.fontBody,
    '--canvas-font-mono': tokens.fontMono,
    '--canvas-shadow': tokens.shadow,
    '--canvas-glow': tokens.glow,
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleQuickCopyAgent = (format) => {
    let content = '';
    if (format === 'design-md') {
      content = generateDesignMd(system);
    } else {
      content = generateAgentRules(system);
    }
    navigator.clipboard.writeText(content);
    setCopiedFormat(format);
    triggerToast(`Copied ${format.toUpperCase()} rules to clipboard!`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="tk-playground-wrapper">
      {/* Playground Top Bar */}
      <div className="tk-play-toolbar">
        <div className="tk-play-system-select-group">
          <span className="tk-play-brand-icon">{getSystemBrandLogo(system.id, 18)}</span>
          <select
            className="tk-play-select"
            value={system.id}
            onChange={(e) => {
              const next = systems.find((s) => s.id === e.target.value);
              if (next) onSelectSystem(next);
            }}
          >
            {systems.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.category})
              </option>
            ))}
          </select>

          {/* WCAG Contrast Compliance Badge */}
          <div className="tk-contrast-badge" title={`Text Contrast: ${textContrast.ratio}:1`}>
            <span className="tk-contrast-dot"></span>
            <span>WCAG {textContrast.score} ({textContrast.ratio}:1)</span>
          </div>
        </div>

        {/* View Switcher: Simulated App vs Component Primitives */}
        <div className="tk-play-subview-toggle">
          <button
            className={`tk-subview-btn ${playgroundView === 'app' ? 'active' : ''}`}
            onClick={() => setPlaygroundView('app')}
          >
            <Eye size={13} />
            <span>Interactive App</span>
          </button>
          <button
            className={`tk-subview-btn ${playgroundView === 'primitives' ? 'active' : ''}`}
            onClick={() => setPlaygroundView('primitives')}
          >
            <Layers size={13} />
            <span>UI Primitives</span>
          </button>
        </div>

        {/* Viewport & Theme Controls */}
        <div className="tk-play-controls-center">
          <div className="tk-viewport-toggles">
            <button
              className={`tk-vp-btn ${viewport === 'desktop' ? 'active' : ''}`}
              onClick={() => setViewport('desktop')}
              title="Desktop View (100%)"
            >
              <Monitor size={15} />
            </button>
            <button
              className={`tk-vp-btn ${viewport === 'tablet' ? 'active' : ''}`}
              onClick={() => setViewport('tablet')}
              title="Tablet View (768px)"
            >
              <Tablet size={15} />
            </button>
            <button
              className={`tk-vp-btn ${viewport === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewport('mobile')}
              title="Mobile View (380px)"
            >
              <Smartphone size={15} />
            </button>
          </div>

          <button
            className={`tk-theme-toggle ${isLightMode ? 'light' : 'dark'}`}
            onClick={() => setIsLightMode(!isLightMode)}
            title="Toggle Light / Dark Mode"
          >
            {isLightMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Agent Quick Copy Actions */}
        <div className="tk-play-actions-right">
          <button
            className="tk-btn-play-copy"
            onClick={() => handleQuickCopyAgent('cursor')}
            title="Copy for Cursor / Antigravity / Claude"
          >
            {copiedFormat === 'cursor' ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>.cursorrules</span>
          </button>

          <button className="tk-btn-play-export" onClick={onOpenExport}>
            <Code2 size={13} />
            <span>Export Tokens</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className={`tk-canvas-container vp-${viewport}`}>
        <div className="tk-canvas-frame" style={canvasStyle}>
          {playgroundView === 'app' ? (
            <>
              {/* Simulated App Header */}
              <div className="tk-sim-header">
                <div className="tk-sim-brand">
                  <span className="tk-sim-brand-icon">{getSystemBrandLogo(system.id, 16)}</span>
                  <span className="tk-sim-brand-name">{system.name} Studio</span>
                </div>

                <div className="tk-sim-search">
                  <Search size={13} className="tk-sim-icon" />
                  <span>Search workspace...</span>
                  <kbd className="tk-sim-kbd">⌘K</kbd>
                </div>

                <div className="tk-sim-user">
                  <span className="tk-sim-badge-status">Agent Active</span>
                  <div className="tk-sim-avatar">TK</div>
                </div>
              </div>

              {/* Simulated App Body */}
              <div className="tk-sim-body">
                {/* Hero Card */}
                <div className="tk-sim-hero">
                  <div className="tk-sim-hero-pill">
                    <Zap size={13} style={{ color: tokens.primary }} />
                    <span>{system.vibe}</span>
                  </div>
                  <h2 className="tk-sim-hero-title">
                    Building aesthetic interfaces with zero AI slop.
                  </h2>
                  <p className="tk-sim-hero-subtitle">
                    This live canvas renders using the exact color layers, corner radii ({tokens.radius}),
                    and typography ({tokens.fontHeading.split(',')[0].replace(/['"]/g, '')}) configured in the active spec.
                  </p>

                  <div className="tk-sim-hero-cta-row">
                    <button
                      className="tk-sim-btn-primary"
                      onClick={() => triggerToast(`Triggered primary action for ${system.name}!`)}
                    >
                      <span>Deploy to Production</span>
                      <ArrowRight size={14} />
                    </button>
                    <button
                      className="tk-sim-btn-secondary"
                      onClick={() => triggerToast('Opened configuration dialog')}
                    >
                      Configure Tokens
                    </button>
                  </div>
                </div>

                {/* Metrics Dashboard Row */}
                <div className="tk-sim-metrics-grid">
                  <div className="tk-sim-metric-card">
                    <div className="tk-sim-metric-top">
                      <span className="tk-sim-metric-label">Agent Accuracy</span>
                      <span className="tk-sim-metric-trend positive">
                        <TrendingUp size={12} /> +99.4%
                      </span>
                    </div>
                    <div className="tk-sim-metric-value">99.8%</div>
                    <div className="tk-sim-metric-sub">Zero visual regressions</div>
                  </div>

                  <div className="tk-sim-metric-card">
                    <div className="tk-sim-metric-top">
                      <span className="tk-sim-metric-label">WCAG Contrast</span>
                      <span className="tk-sim-metric-trend neutral">{textContrast.score}</span>
                    </div>
                    <div className="tk-sim-metric-value">{textContrast.ratio}:1</div>
                    <div className="tk-sim-metric-sub">Accessible typography ratio</div>
                  </div>

                  <div className="tk-sim-metric-card">
                    <div className="tk-sim-metric-top">
                      <span className="tk-sim-metric-label">Token Coverage</span>
                      <span className="tk-sim-metric-trend positive">
                        <ShieldCheck size={12} /> 100%
                      </span>
                    </div>
                    <div className="tk-sim-metric-value">48 Tokens</div>
                    <div className="tk-sim-metric-sub">Surfaces, geometry, blurs</div>
                  </div>
                </div>

                {/* Interactive Form & Controls Sandbox */}
                <div className="tk-sim-card-interactive">
                  <div className="tk-sim-card-head">
                    <h4 className="tk-sim-card-title">Interactive Component Controls</h4>
                    <span className="tk-sim-card-tag">Live Sandbox</span>
                  </div>

                  <div className="tk-sim-form-row">
                    <div className="tk-sim-input-group">
                      <label className="tk-sim-input-label">Test Agent Prompt / Command</label>
                      <div className="tk-sim-input-wrapper">
                        <input
                          type="text"
                          className="tk-sim-input"
                          placeholder="e.g. Generate a dark-mode pricing matrix..."
                          value={formInput}
                          onChange={(e) => setFormInput(e.target.value)}
                        />
                        <button
                          className="tk-sim-input-btn"
                          onClick={() => {
                            if (formInput.trim()) {
                              triggerToast(`Executed: "${formInput}"`);
                              setFormInput('');
                            } else {
                              triggerToast('Please type a prompt in the input.');
                            }
                          }}
                        >
                          Execute
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Tags Row */}
                  <div className="tk-sim-tags-row">
                    <span className="tk-sim-tag-pill active">Primary Action</span>
                    <span className="tk-sim-tag-pill">Secondary Surface</span>
                    <span className="tk-sim-tag-pill accent">Accent Color</span>
                    <span className="tk-sim-tag-pill muted">Muted Token</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* UI Primitives Gallery */
            <div className="tk-primitives-gallery">
              <div className="tk-primitives-header">
                <h3 className="tk-primitives-title">UI Component Primitives</h3>
                <p className="tk-primitives-desc">
                  Copy-paste ready UI controls pre-configured with the active <code>{system.name}</code> design tokens.
                </p>
              </div>

              <div className="tk-primitives-grid">
                {/* 1. Buttons */}
                <div className="tk-prim-card">
                  <div className="tk-prim-head">
                    <span>1. Buttons</span>
                    <button
                      className="tk-prim-copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(`<button class="btn-primary" style="background: ${tokens.primary}; color: ${tokens.primaryForeground}; border-radius: ${tokens.radius};">Primary Button</button>`);
                        triggerToast('Copied Button HTML & Tokens!');
                      }}
                    >
                      <Copy size={12} />
                      <span>Copy HTML</span>
                    </button>
                  </div>
                  <div className="tk-prim-preview">
                    <button className="tk-sim-btn-primary">Primary Action</button>
                    <button className="tk-sim-btn-secondary">Outline Action</button>
                    <button style={{ background: 'transparent', border: 'none', color: tokens.textMuted, cursor: 'pointer', fontSize: '13px' }}>
                      Ghost Text
                    </button>
                  </div>
                </div>

                {/* 2. Badges & Status Chips */}
                <div className="tk-prim-card">
                  <div className="tk-prim-head">
                    <span>2. Status Badges & Pills</span>
                    <button
                      className="tk-prim-copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(`<span class="badge" style="background: ${tokens.primary}20; color: ${tokens.primary}; border-radius: ${tokens.radiusSm};">Status Active</span>`);
                        triggerToast('Copied Badge HTML!');
                      }}
                    >
                      <Copy size={12} />
                      <span>Copy HTML</span>
                    </button>
                  </div>
                  <div className="tk-prim-preview">
                    <span className="tk-sim-badge-status">● Operational</span>
                    <span className="tk-sim-tag-pill active">Primary Tag</span>
                    <span className="tk-sim-tag-pill accent">Accent Pill</span>
                  </div>
                </div>

                {/* 3. Inputs */}
                <div className="tk-prim-card full-width">
                  <div className="tk-prim-head">
                    <span>3. Text Field & Input Glow</span>
                    <button
                      className="tk-prim-copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(`<input class="input" style="background: ${tokens.bg}; border: 1px solid ${tokens.border}; color: ${tokens.text}; border-radius: ${tokens.radius};" placeholder="Enter text..." />`);
                        triggerToast('Copied Input HTML!');
                      }}
                    >
                      <Copy size={12} />
                      <span>Copy HTML</span>
                    </button>
                  </div>
                  <div className="tk-prim-preview">
                    <input
                      type="text"
                      className="tk-sim-input"
                      style={{ maxWidth: '340px' }}
                      placeholder="Focus to see exact border highlight..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Toast Notification Simulation */}
          {toastMessage && (
            <div className="tk-sim-toast">
              <CheckCircle2 size={15} style={{ color: tokens.primary }} />
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
