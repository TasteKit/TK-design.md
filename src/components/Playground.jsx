import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  Sparkles,
  Copy,
  Check,
  Code2,
  Download,
  Terminal,
  Activity,
  Layers,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  FileCode
} from 'lucide-react';
import { calculateContrast } from '../utils/contrast';
import { generateAgentRules, generateDesignMd } from '../utils/exporters';
import { getSystemBrandLogo } from './BrandLogos';
import confetti from 'canvas-confetti';

export function Playground({ system, systems, onSelectSystem, onOpenExport }) {
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [isLightMode, setIsLightMode] = useState(false);
  const [template, setTemplate] = useState('dashboard'); // 'dashboard' | 'marketing' | 'settings' | 'primitives'
  const [copiedRules, setCopiedRules] = useState(false);
  const [activeButtonState, setActiveButtonState] = useState(false);

  const tokens = system.tokens;
  const contrast = calculateContrast(tokens.text, tokens.bg);

  const handleCopyCursorRules = () => {
    const rules = generateAgentRules(system);
    navigator.clipboard.writeText(rules);
    setCopiedRules(true);
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setCopiedRules(false), 2000);
  };

  const canvasStyle = {
    '--canvas-bg': isLightMode ? '#fafafa' : tokens.bg,
    '--canvas-surface': isLightMode ? '#ffffff' : tokens.surface,
    '--canvas-surface-hover': isLightMode ? '#f4f4f5' : tokens.surfaceHover,
    '--canvas-surface-active': isLightMode ? '#e4e4e7' : tokens.surfaceActive,
    '--canvas-border': isLightMode ? 'rgba(0,0,0,0.1)' : tokens.border,
    '--canvas-border-highlight': tokens.borderHighlight,
    '--canvas-primary': tokens.primary,
    '--canvas-primary-hover': tokens.primaryHover,
    '--canvas-primary-fg': tokens.primaryForeground,
    '--canvas-accent': tokens.accent,
    '--canvas-text': isLightMode ? '#09090b' : tokens.text,
    '--canvas-text-muted': isLightMode ? '#71717a' : tokens.textMuted,
    '--canvas-text-subtle': isLightMode ? '#a1a1aa' : tokens.textSubtle,
    '--canvas-radius': tokens.radius,
    '--canvas-radius-sm': tokens.radiusSm,
    '--canvas-radius-lg': tokens.radiusLg,
    '--canvas-font-heading': tokens.fontHeading,
    '--canvas-font-body': tokens.fontBody,
    '--canvas-font-mono': tokens.fontMono,
    '--canvas-shadow': tokens.shadow,
    '--canvas-glow': tokens.glow,
  };

  return (
    <div className="tk-playground-wrapper">
      {/* Playground Top Control Toolbar */}
      <div className="tk-play-toolbar">
        {/* System Selector */}
        <div className="tk-play-system-select-group">
          <span className="tk-play-brand-icon">
            {getSystemBrandLogo(system.id, 20)}
          </span>
          <select
            value={system.id}
            onChange={(e) => {
              const found = systems.find((s) => s.id === e.target.value);
              if (found) onSelectSystem(found);
            }}
            className="tk-play-select"
          >
            {systems.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.category})
              </option>
            ))}
          </select>

          {/* Contrast Score Badge */}
          <div className="tk-contrast-badge" title={`Contrast ratio: ${contrast.ratio}:1`}>
            <span className="tk-contrast-dot"></span>
            <span>WCAG {contrast.score} ({contrast.ratio}:1)</span>
          </div>
        </div>

        {/* Template Subview Switcher */}
        <div className="tk-play-subview-toggle">
          <button
            className={`tk-subview-btn ${template === 'dashboard' ? 'active' : ''}`}
            onClick={() => setTemplate('dashboard')}
          >
            <Activity size={13} />
            <span>Dashboard</span>
          </button>
          <button
            className={`tk-subview-btn ${template === 'marketing' ? 'active' : ''}`}
            onClick={() => setTemplate('marketing')}
          >
            <Sparkles size={13} />
            <span>Marketing</span>
          </button>
          <button
            className={`tk-subview-btn ${template === 'primitives' ? 'active' : ''}`}
            onClick={() => setTemplate('primitives')}
          >
            <Layers size={13} />
            <span>Primitives</span>
          </button>
        </div>

        {/* Center Controls: Viewport & Light/Dark */}
        <div className="tk-play-controls-center">
          <div className="tk-viewport-toggles">
            <button
              className={`tk-vp-btn ${viewport === 'desktop' ? 'active' : ''}`}
              onClick={() => setViewport('desktop')}
              title="Desktop View (100%)"
            >
              <Monitor size={14} />
            </button>
            <button
              className={`tk-vp-btn ${viewport === 'tablet' ? 'active' : ''}`}
              onClick={() => setViewport('tablet')}
              title="Tablet View (768px)"
            >
              <Tablet size={14} />
            </button>
            <button
              className={`tk-vp-btn ${viewport === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewport('mobile')}
              title="Mobile View (375px)"
            >
              <Smartphone size={14} />
            </button>
          </div>

          <button
            className="tk-theme-toggle"
            onClick={() => setIsLightMode(!isLightMode)}
            title="Toggle Light / Dark mode preview"
          >
            {isLightMode ? <Sun size={14} /> : <Moon size={14} />}
            <span>{isLightMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="tk-play-actions-right">
          <button className="tk-btn-play-copy" onClick={handleCopyCursorRules}>
            {copiedRules ? <Check size={14} color="#10b981" /> : <Terminal size={14} />}
            <span>{copiedRules ? 'Copied Rules!' : 'Copy .cursorrules'}</span>
          </button>

          <button className="tk-btn-play-export" onClick={onOpenExport}>
            <Code2 size={14} />
            <span>Export Tokens</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Frame */}
      <div className={`tk-canvas-container vp-${viewport}`}>
        <div className="tk-canvas-frame" style={canvasStyle}>
          {/* Mock Navigation Bar */}
          <div className="tk-sim-header">
            <div className="tk-sim-brand">
              <span className="tk-sim-brand-icon">{getSystemBrandLogo(system.id, 18)}</span>
              <span className="tk-sim-brand-name">{system.name}</span>
            </div>

            <div className="tk-sim-search">
              <span>Quick search...</span>
              <span className="tk-sim-kbd">⌘K</span>
            </div>

            <div className="tk-sim-user">
              <span className="tk-sim-badge-status">Online</span>
              <div className="tk-sim-avatar">AI</div>
            </div>
          </div>

          {/* Template 1: SaaS Analytics Dashboard */}
          {template === 'dashboard' && (
            <div className="tk-sim-body">
              {/* Hero Banner */}
              <div className="tk-sim-hero">
                <div className="tk-sim-hero-pill">
                  <Sparkles size={12} />
                  <span>{system.vibe}</span>
                </div>
                <h2 className="tk-sim-hero-title">
                  Production Design System Profile
                </h2>
                <p className="tk-sim-hero-subtitle">
                  {system.tagline} Machine-verified token bindings applied across typography, surface elevation, and strict spacing constraints.
                </p>

                <div className="tk-sim-hero-cta-row">
                  <button
                    className="tk-sim-btn-primary"
                    onClick={() => setActiveButtonState(!activeButtonState)}
                  >
                    <span>Primary Interaction</span>
                    <ArrowUpRight size={14} />
                  </button>
                  <button className="tk-sim-btn-secondary" onClick={handleCopyCursorRules}>
                    Copy Agent Brief
                  </button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="tk-sim-metrics-grid">
                <div className="tk-sim-metric-card">
                  <div className="tk-sim-metric-top">
                    <span className="tk-sim-metric-label">Contrast Luminance</span>
                    <span className="tk-sim-metric-trend positive">
                      <TrendingUp size={12} /> {contrast.ratio}:1
                    </span>
                  </div>
                  <div className="tk-sim-metric-value">{contrast.score} Rated</div>
                  <div className="tk-sim-metric-sub">WCAG 2.1 Compliant</div>
                </div>

                <div className="tk-sim-metric-card">
                  <div className="tk-sim-metric-top">
                    <span className="tk-sim-metric-label">Border Radius</span>
                    <span className="tk-sim-metric-trend neutral">
                      {tokens.radius}
                    </span>
                  </div>
                  <div className="tk-sim-metric-value">{tokens.fontHeading.split(',')[0].replace(/['"]/g, '')}</div>
                  <div className="tk-sim-metric-sub">Heading Typeface</div>
                </div>

                <div className="tk-sim-metric-card">
                  <div className="tk-sim-metric-top">
                    <span className="tk-sim-metric-label">Agent Ready</span>
                    <span className="tk-sim-metric-trend positive">
                      <ShieldCheck size={12} /> Active
                    </span>
                  </div>
                  <div className="tk-sim-metric-value">4 Guardrails</div>
                  <div className="tk-sim-metric-sub">Zero AI Slop Guaranteed</div>
                </div>
              </div>

              {/* Form Input and Pills */}
              <div className="tk-sim-card-interactive">
                <div className="tk-sim-card-head">
                  <span className="tk-sim-card-title">Token Form Controls</span>
                  <span className="tk-sim-card-tag">{system.category}</span>
                </div>

                <div className="tk-sim-input-group">
                  <label className="tk-sim-input-label">Project Workspace Command</label>
                  <div className="tk-sim-input-wrapper">
                    <input
                      type="text"
                      readOnly
                      value={`npx tastekit add ${system.id}`}
                      className="tk-sim-input"
                    />
                    <button className="tk-sim-input-btn" onClick={handleCopyCursorRules}>
                      Run Sync
                    </button>
                  </div>
                </div>

                <div className="tk-sim-tags-row">
                  <span className="tk-sim-tag-pill active">Active Profile</span>
                  <span className="tk-sim-tag-pill">Strict Tokens</span>
                  <span className="tk-sim-tag-pill accent">Machine Verified</span>
                </div>
              </div>
            </div>
          )}

          {/* Template 2: Marketing Landing */}
          {template === 'marketing' && (
            <div className="tk-sim-body">
              <div className="tk-sim-hero" style={{ textAlign: 'center', padding: '48px 32px' }}>
                <span className="tk-sim-hero-pill">v2.4 Spec Release</span>
                <h1 className="tk-sim-hero-title" style={{ fontSize: '32px', margin: '12px 0' }}>
                  Built with {system.name} Precision
                </h1>
                <p className="tk-sim-hero-subtitle" style={{ margin: '0 auto 24px', maxWidth: '540px' }}>
                  A harmonious palette balancing <code>{tokens.bg}</code> with electric accents of <code>{tokens.primary}</code>.
                </p>
                <div className="tk-sim-hero-cta-row" style={{ justifyContent: 'center' }}>
                  <button className="tk-sim-btn-primary">Get Started Free</button>
                  <button className="tk-sim-btn-secondary">View Documentation</button>
                </div>
              </div>
            </div>
          )}

          {/* Template 3: UI Primitives Gallery */}
          {template === 'primitives' && (
            <div className="tk-primitives-gallery">
              <div className="tk-primitives-header">
                <h3 className="tk-primitives-title">Active UI Component Tokens</h3>
                <p className="tk-primitives-desc">
                  Every element dynamically inherits <code>{tokens.radius}</code> radius and <code>{tokens.primary}</code> accents.
                </p>
              </div>

              <div className="tk-primitives-grid">
                <div className="tk-prim-card">
                  <div className="tk-prim-head">
                    <span>Action Buttons</span>
                  </div>
                  <div className="tk-prim-preview">
                    <button className="tk-sim-btn-primary">Primary Solid</button>
                    <button className="tk-sim-btn-secondary">Outline Substrate</button>
                  </div>
                </div>

                <div className="tk-prim-card">
                  <div className="tk-prim-head">
                    <span>Status & Badges</span>
                  </div>
                  <div className="tk-prim-preview">
                    <span className="tk-sim-tag-pill active">Verified</span>
                    <span className="tk-sim-tag-pill accent">Accent Spark</span>
                    <span className="tk-sim-badge-status">Online</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
