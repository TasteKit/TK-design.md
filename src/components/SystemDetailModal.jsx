import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Terminal,
  FileText,
  Code2,
  Eye,
  Layers,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react';
import { generateDesignMd, generateTailwindConfig, generateCssVariables, generateAgentRules } from '../utils/exporters';
import { calculateContrast } from '../utils/contrast';
import { getSystemBrandLogo } from './BrandLogos';
import confetti from 'canvas-confetti';

export function SystemDetailModal({ system, onClose, onLaunchPlayground }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'preview' | 'design-md' | 'tailwind' | 'css' | 'agents'
  const [isCopied, setIsCopied] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  if (!system) return null;

  const tokens = system.tokens;
  const contrast = calculateContrast(tokens.text, tokens.bg);
  const npxCommand = `npx tastekit add ${system.id}`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(npxCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const getActiveCode = () => {
    if (activeTab === 'design-md') return { code: generateDesignMd(system), name: 'DESIGN.md', type: 'text/markdown' };
    if (activeTab === 'tailwind') return { code: generateTailwindConfig(system), name: 'tailwind.config.js', type: 'application/javascript' };
    if (activeTab === 'css') return { code: generateCssVariables(system), name: 'variables.css', type: 'text/css' };
    if (activeTab === 'agents') return { code: generateAgentRules(system), name: 'AGENTS.md', type: 'text/markdown' };
    return null;
  };

  const currentCode = getActiveCode();

  const handleCopyCode = () => {
    if (currentCode) {
      navigator.clipboard.writeText(currentCode.code);
      setIsCopied(true);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (currentCode) {
      const blob = new Blob([currentCode.code], { type: currentCode.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentCode.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const canvasStyle = {
    '--canvas-bg': isLightMode ? '#f8f9fa' : tokens.bg,
    '--canvas-surface': isLightMode ? '#ffffff' : tokens.surface,
    '--canvas-surface-hover': isLightMode ? '#f1f3f5' : tokens.surfaceHover,
    '--canvas-border': isLightMode ? 'rgba(0,0,0,0.1)' : tokens.border,
    '--canvas-border-highlight': tokens.borderHighlight,
    '--canvas-primary': tokens.primary,
    '--canvas-primary-fg': tokens.primaryForeground,
    '--canvas-accent': tokens.accent,
    '--canvas-text': isLightMode ? '#111827' : tokens.text,
    '--canvas-text-muted': isLightMode ? '#6b7280' : tokens.textMuted,
    '--canvas-radius': tokens.radius,
    '--canvas-radius-sm': tokens.radiusSm,
    '--canvas-radius-lg': tokens.radiusLg,
    '--canvas-font-heading': tokens.fontHeading,
    '--canvas-font-body': tokens.fontBody,
    '--canvas-font-mono': tokens.fontMono,
    '--canvas-shadow': tokens.shadow,
  };

  return (
    <div className="tk-detail-backdrop" onClick={onClose}>
      <div className="tk-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="tk-detail-header">
          <div className="tk-detail-brand-row">
            <span className="tk-detail-brand-icon">{getSystemBrandLogo(system.id, 24)}</span>
            <div>
              <div className="tk-detail-meta-tags">
                <span className="tk-detail-cat-badge">{system.category}</span>
                <span className="tk-detail-vibe-badge">{system.vibe}</span>
                <span className="tk-detail-wcag-badge">WCAG {contrast.score} ({contrast.ratio}:1)</span>
              </div>
              <h2 className="tk-detail-title">{system.name}</h2>
            </div>
          </div>

          <div className="tk-detail-head-actions">
            <button
              className="tk-btn-launch-canvas"
              onClick={() => {
                onClose();
                onLaunchPlayground(system);
              }}
            >
              <Eye size={14} />
              <span>Full Playground</span>
            </button>
            <button className="tk-detail-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* NPX CLI Hero Box */}
        <div className="tk-detail-cli-strip">
          <div className="tk-cli-code-row">
            <Terminal size={14} className="tk-cli-icon" />
            <code className="tk-cli-code">{npxCommand}</code>
            <button className="tk-cli-copy-btn" onClick={handleCopyCmd} title="Copy CLI Command">
              {copiedCmd ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="tk-cli-hint">
            Run in your project root to drop <code>DESIGN.md</code> into your codebase for AI coding agents.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tk-detail-tabs">
          <button
            className={`tk-detail-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Sparkles size={14} />
            <span>Design Breakdown</span>
          </button>

          <button
            className={`tk-detail-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye size={14} />
            <span>Live Mock Canvas</span>
          </button>

          <button
            className={`tk-detail-tab-btn ${activeTab === 'design-md' ? 'active' : ''}`}
            onClick={() => setActiveTab('design-md')}
          >
            <FileText size={14} />
            <span>DESIGN.md (AI Spec)</span>
          </button>

          <button
            className={`tk-detail-tab-btn ${activeTab === 'tailwind' ? 'active' : ''}`}
            onClick={() => setActiveTab('tailwind')}
          >
            <Code2 size={14} />
            <span>Tailwind Config</span>
          </button>

          <button
            className={`tk-detail-tab-btn ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            <Code2 size={14} />
            <span>CSS Variables</span>
          </button>

          <button
            className={`tk-detail-tab-btn ${activeTab === 'agents' ? 'active' : ''}`}
            onClick={() => setActiveTab('agents')}
          >
            <Terminal size={14} />
            <span>Agent Guardrails</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="tk-detail-body">
          {activeTab === 'overview' && (
            <div className="tk-overview-view">
              <p className="tk-overview-desc">{system.tagline}</p>

              {/* Color Swatches Grid */}
              <div className="tk-overview-sec">
                <h4 className="tk-overview-sec-title">Semantic Palette & Layer Tokens</h4>
                <div className="tk-overview-swatches-grid">
                  <div className="tk-overview-swatch" style={{ background: tokens.bg, color: tokens.text }}>
                    <span>Background Substrate</span>
                    <code>{tokens.bg}</code>
                  </div>
                  <div className="tk-overview-swatch" style={{ background: tokens.surface, color: tokens.text }}>
                    <span>Surface Container</span>
                    <code>{tokens.surface}</code>
                  </div>
                  <div className="tk-overview-swatch" style={{ background: tokens.primary, color: tokens.primaryForeground }}>
                    <span>Primary Action</span>
                    <code>{tokens.primary}</code>
                  </div>
                  <div className="tk-overview-swatch" style={{ background: tokens.accent, color: '#fff' }}>
                    <span>Accent Spark</span>
                    <code>{tokens.accent}</code>
                  </div>
                </div>
              </div>

              {/* Specs & Metrics */}
              <div className="tk-overview-metrics-grid">
                <div className="tk-overview-metric">
                  <span className="lbl">Base Radius</span>
                  <span className="val">{tokens.radius}</span>
                </div>
                <div className="tk-overview-metric">
                  <span className="lbl">Heading Typeface</span>
                  <span className="val">{tokens.fontHeading.split(',')[0].replace(/['"]/g, '')}</span>
                </div>
                <div className="tk-overview-metric">
                  <span className="lbl">Monospace Font</span>
                  <span className="val">{tokens.fontMono.split(',')[0].replace(/['"]/g, '')}</span>
                </div>
                <div className="tk-overview-metric">
                  <span className="lbl">Text Contrast</span>
                  <span className="val" style={{ color: '#10b981' }}>{contrast.ratio}:1 (WCAG {contrast.score})</span>
                </div>
              </div>

              {/* Strict Negative Guardrails */}
              <div className="tk-overview-sec">
                <h4 className="tk-overview-sec-title">Agent Anti-Pattern Guardrails</h4>
                <div className="tk-overview-guardrails">
                  {system.antiPatterns.map((rule, idx) => (
                    <div key={idx} className="tk-guardrail-item">
                      <ShieldAlert size={14} className="tk-guard-icon" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="tk-detail-preview-view">
              <div className="tk-detail-preview-bar">
                <span className="tk-prev-bar-lbl">Live Canvas Simulation</span>
                <button
                  className="tk-theme-toggle small"
                  onClick={() => setIsLightMode(!isLightMode)}
                >
                  {isLightMode ? <Sun size={13} /> : <Moon size={13} />}
                  <span>{isLightMode ? 'Light' : 'Dark'}</span>
                </button>
              </div>

              <div className="tk-detail-canvas-frame" style={canvasStyle}>
                <div className="tk-sim-hero">
                  <div className="tk-sim-hero-pill">
                    <span>{system.vibe}</span>
                  </div>
                  <h3 className="tk-sim-hero-title">{system.name} Interface</h3>
                  <p className="tk-sim-hero-subtitle">
                    Components automatically inherit background: <code>{tokens.bg}</code>, primary: <code>{tokens.primary}</code>, and radius: <code>{tokens.radius}</code>.
                  </p>
                  <div className="tk-sim-hero-cta-row">
                    <button className="tk-sim-btn-primary">Primary Action</button>
                    <button className="tk-sim-btn-secondary">Secondary Outline</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentCode && (
            <div className="tk-detail-code-view">
              <pre className="tk-detail-pre">
                <code>{currentCode.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="tk-detail-footer">
          {currentCode ? (
            <div className="tk-detail-footer-inner">
              <span className="tk-footer-code-hint">
                Exporting <code>{currentCode.name}</code> for {system.name}
              </span>
              <div className="tk-footer-code-actions">
                <button className="tk-btn-footer-copy" onClick={handleCopyCode}>
                  {isCopied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button className="tk-btn-footer-download" onClick={handleDownload}>
                  <Download size={14} />
                  <span>Download {currentCode.name}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="tk-detail-footer-inner">
              <span className="tk-footer-code-hint">
                TasteKit Standard v2.4 • Verified Human & AI Specification
              </span>
              <button
                className="tk-btn-footer-download"
                onClick={() => {
                  const md = generateDesignMd(system);
                  const blob = new Blob([md], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'DESIGN.md';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
              >
                <Download size={14} />
                <span>Download DESIGN.md</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
