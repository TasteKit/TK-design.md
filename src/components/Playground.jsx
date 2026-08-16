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
  Bell,
  Sliders,
  Terminal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { generateDesignMd } from '../utils/exporters';

export function Playground({
  system,
  systems,
  onSelectSystem,
  onOpenExport
}) {
  const [viewport, setViewport] = useState('desktop'); // desktop, tablet, mobile
  const [isLightMode, setIsLightMode] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [formInput, setFormInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const tokens = system.tokens;

  // Custom inline style mapping dynamically onto the canvas
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

  const handleCopySpec = () => {
    const md = generateDesignMd(system);
    navigator.clipboard.writeText(md);
    setIsCopied(true);
    triggerToast('Copied DESIGN.md to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="tk-playground-wrapper">
      {/* Playground Top Bar */}
      <div className="tk-play-toolbar">
        <div className="tk-play-system-select-group">
          <label className="tk-play-lbl">Active System:</label>
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
          <span className="tk-play-vibe-tag">{system.vibe}</span>
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
            {isLightMode ? <Sun size={15} /> : <Moon size={15} />}
            <span>{isLightMode ? 'Light Canvas' : 'Dark Canvas'}</span>
          </button>
        </div>

        {/* Quick Spec Action */}
        <div className="tk-play-actions-right">
          <button className="tk-btn-play-copy" onClick={handleCopySpec}>
            {isCopied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{isCopied ? 'Copied' : 'Copy DESIGN.md'}</span>
          </button>
          <button className="tk-btn-play-export" onClick={onOpenExport}>
            <Code2 size={14} />
            <span>Export Tokens</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className={`tk-canvas-container vp-${viewport}`}>
        <div className="tk-canvas-frame" style={canvasStyle}>
          {/* Simulated App Header */}
          <div className="tk-sim-header">
            <div className="tk-sim-brand">
              <div className="tk-sim-brand-dot"></div>
              <span className="tk-sim-brand-name">{system.name} App</span>
            </div>

            <div className="tk-sim-search">
              <Search size={13} className="tk-sim-icon" />
              <span>Search workspace...</span>
              <kbd className="tk-sim-kbd">⌘K</kbd>
            </div>

            <div className="tk-sim-user">
              <span className="tk-sim-badge-status">Online</span>
              <div className="tk-sim-avatar">TK</div>
            </div>
          </div>

          {/* Simulated App Body */}
          <div className="tk-sim-body">
            {/* Hero Card */}
            <div className="tk-sim-hero">
              <div className="tk-sim-hero-pill">
                <Zap size={13} style={{ color: tokens.primary }} />
                <span>Powered by TasteKit Design Tokens</span>
              </div>
              <h2 className="tk-sim-hero-title">
                Building refined interfaces with zero AI slop.
              </h2>
              <p className="tk-sim-hero-subtitle">
                This live interactive canvas uses the exact color layers, corner radii ({tokens.radius}),
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
                  onClick={() => triggerToast('Opened secondary preferences modal')}
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
                  <span className="tk-sim-metric-label">Taste Quality Score</span>
                  <span className="tk-sim-metric-trend neutral">Elite</span>
                </div>
                <div className="tk-sim-metric-value">10/10</div>
                <div className="tk-sim-metric-sub">Verified human design spec</div>
              </div>

              <div className="tk-sim-metric-card">
                <div className="tk-sim-metric-top">
                  <span className="tk-sim-metric-label">Token Coverage</span>
                  <span className="tk-sim-metric-trend positive">
                    <ShieldCheck size={12} /> 100%
                  </span>
                </div>
                <div className="tk-sim-metric-value">48 Tokens</div>
                <div className="tk-sim-metric-sub">Surfaces, typography, blurs</div>
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
                  <label className="tk-sim-input-label">Test Agent Prompt / Component Input</label>
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
                <span className="tk-sim-tag-pill active">Primary Tag</span>
                <span className="tk-sim-tag-pill">Secondary Layer</span>
                <span className="tk-sim-tag-pill accent">Accent Color</span>
                <span className="tk-sim-tag-pill muted">Muted Token</span>
              </div>
            </div>
          </div>

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
