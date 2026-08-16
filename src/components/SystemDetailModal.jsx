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
  ArrowLeft,
  Sun,
  Moon,
  ExternalLink,
  Bookmark,
  Sparkles,
  Package
} from 'lucide-react';
import { generateDesignMd, generateTailwindConfig, generateCssVariables, generateAgentRules } from '../utils/exporters';
import { calculateContrast } from '../utils/contrast';
import { getSystemBrandLogo } from './BrandLogos';
import confetti from 'canvas-confetti';

export function SystemDetailModal({ system, onClose, onLaunchPlayground }) {
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'design-md' | 'tailwind' | 'css' | 'agents'
  const [isLightMode, setIsLightMode] = useState(false);
  const [isCopiedCmd, setIsCopiedCmd] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!system) return null;

  const tokens = system.tokens;
  const contrast = calculateContrast(tokens.text, tokens.bg);
  const npxCommand = `npx tastekit add ${system.id}`;

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(npxCommand);
    setIsCopiedCmd(true);
    setTimeout(() => setIsCopiedCmd(false), 2000);
  };

  const getCodeContent = () => {
    if (activeTab === 'design-md') return { code: generateDesignMd(system), name: 'DESIGN.md', type: 'text/markdown' };
    if (activeTab === 'tailwind') return { code: generateTailwindConfig(system), name: 'tailwind.config.js', type: 'application/javascript' };
    if (activeTab === 'css') return { code: generateCssVariables(system), name: 'variables.css', type: 'text/css' };
    if (activeTab === 'agents') return { code: generateAgentRules(system), name: 'AGENTS.md', type: 'text/markdown' };
    return null;
  };

  const currentCode = getCodeContent();

  const handleCopyCode = () => {
    if (currentCode) {
      navigator.clipboard.writeText(currentCode.code);
      setIsCopiedCode(true);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
      setTimeout(() => setIsCopiedCode(false), 2000);
    }
  };

  const handleDownload = () => {
    const codeObj = currentCode || { code: generateDesignMd(system), name: 'DESIGN.md', type: 'text/markdown' };
    const blob = new Blob([codeObj.code], { type: codeObj.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = codeObj.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const canvasStyle = {
    '--canvas-bg': isLightMode ? '#fbfbfa' : tokens.bg,
    '--canvas-surface': isLightMode ? '#ffffff' : tokens.surface,
    '--canvas-surface-hover': isLightMode ? '#f4f4f3' : tokens.surfaceHover,
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
    <div className="gd-detail-backdrop" onClick={onClose}>
      <div className="gd-detail-container" onClick={(e) => e.stopPropagation()}>
        {/* Top Breadcrumb & Close Bar */}
        <div className="gd-detail-nav-row">
          <button className="gd-btn-back" onClick={onClose}>
            <ArrowLeft size={14} />
            <span>Back to designs</span>
          </button>
          <button className="gd-btn-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Header Title Section */}
        <div className="gd-detail-header-sec">
          <div className="gd-detail-heading-row">
            <h1 className="gd-detail-title">
              Design System Analysis: <span className="gd-highlight">{system.name}</span>
            </h1>
            <span className="gd-detail-logo-tag">
              {getSystemBrandLogo(system.id, 22)}
            </span>
          </div>
          <p className="gd-detail-tagline">{system.tagline}</p>
        </div>

        {/* Usage Section (Command + Stats & Action Buttons) */}
        <div className="gd-detail-usage-sec">
          <h2 className="gd-sec-heading">Usage</h2>

          <div className="gd-usage-grid">
            {/* Left: NPX Box */}
            <div className="gd-usage-left">
              <div className="gd-npx-box">
                <div className="gd-npx-row">
                  <span className="gd-npx-cmd">{npxCommand}</span>
                  <button className="gd-npx-copy" onClick={handleCopyCmd} title="Copy Command">
                    {isCopiedCmd ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  </button>
                </div>
                <p className="gd-npx-hint">
                  Run this command from your project root, then ask your AI assistant to use <code>DESIGN.md</code> for UI work.
                </p>
              </div>

              <p className="gd-usage-desc">
                {system.name} takes {system.category.toLowerCase()} as its base, defined by its palette (<code>{tokens.primary}</code> / <code>{tokens.bg}</code>), radius <code>{tokens.radius}</code>, and strict typography rules.
              </p>
            </div>

            {/* Right: Stats & Action Buttons */}
            <div className="gd-usage-right">
              {/* Stat Counters */}
              <div className="gd-stats-row">
                <div className="gd-stat-box">
                  <span className="lbl">Installs</span>
                  <span className="val">{system.downloads}</span>
                </div>
                <div className="gd-stat-box">
                  <span className="lbl">Bookmarked</span>
                  <span className="val">{system.stars}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="gd-actions-row">
                <button
                  className={`gd-btn-save ${isSaved ? 'saved' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark size={14} fill={isSaved ? '#f5a623' : 'none'} color={isSaved ? '#f5a623' : 'currentColor'} />
                  <span>{isSaved ? 'SAVED' : 'SAVE'}</span>
                </button>

                <button className="gd-btn-download" onClick={handleDownload}>
                  <Download size={14} />
                  <span>Download DESIGN.md</span>
                </button>
              </div>

              {/* Full Starter Kit Button */}
              <button
                className="gd-btn-starter"
                onClick={() => {
                  onClose();
                  onLaunchPlayground(system);
                }}
              >
                <Package size={15} />
                <span>Open in Live Playground</span>
                <span className="gd-arr">→</span>
              </button>

              <div className="gd-disclaimer">
                <span>✦</span>
                <p>Independent analysis of publicly observable patterns, curated for inspiration and AI coding agents.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="gd-detail-preview-sec">
          <div className="gd-preview-toolbar">
            <h2 className="gd-sec-heading">Preview</h2>

            <div className="gd-preview-controls">
              {/* View Tabs */}
              <div className="gd-preview-tabs">
                <button
                  className={`gd-prev-tab ${activeTab === 'live' ? 'active' : ''}`}
                  onClick={() => setActiveTab('live')}
                >
                  <Eye size={12} />
                  <span>Live Preview</span>
                </button>
                <button
                  className={`gd-prev-tab ${activeTab === 'design-md' ? 'active' : ''}`}
                  onClick={() => setActiveTab('design-md')}
                >
                  <FileText size={12} />
                  <span>DESIGN.md</span>
                </button>
                <button
                  className={`gd-prev-tab ${activeTab === 'tailwind' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tailwind')}
                >
                  <Code2 size={12} />
                  <span>Tailwind</span>
                </button>
                <button
                  className={`gd-prev-tab ${activeTab === 'css' ? 'active' : ''}`}
                  onClick={() => setActiveTab('css')}
                >
                  <Code2 size={12} />
                  <span>CSS</span>
                </button>
              </div>

              {/* Light / Dark Mode Toggle */}
              {activeTab === 'live' && (
                <div className="gd-theme-toggle-group">
                  <button
                    className={`gd-theme-btn ${!isLightMode ? 'active' : ''}`}
                    onClick={() => setIsLightMode(false)}
                  >
                    <Moon size={12} />
                    <span>Dark</span>
                  </button>
                  <button
                    className={`gd-theme-btn ${isLightMode ? 'active' : ''}`}
                    onClick={() => setIsLightMode(true)}
                  >
                    <Sun size={12} />
                    <span>Light</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Canvas or Code Box */}
          <div className="gd-preview-content-box">
            {activeTab === 'live' && (
              <div className="gd-live-canvas-frame" style={canvasStyle}>
                <div className="gd-sim-navbar">
                  <div className="gd-sim-nav-brand">
                    <span className="gd-sim-nav-logo">{getSystemBrandLogo(system.id, 16)}</span>
                    <span className="gd-sim-nav-name">{system.name}</span>
                  </div>
                  <div className="gd-sim-nav-links">
                    <span>Products</span>
                    <span>Developers</span>
                    <span>Company</span>
                  </div>
                  <button className="gd-sim-nav-btn">Get Started</button>
                </div>

                <div className="gd-sim-hero-block">
                  <span className="gd-sim-badge">{system.vibe}</span>
                  <h3 className="gd-sim-title">Engineered with {system.name} Precision</h3>
                  <p className="gd-sim-desc">
                    Machine-verified tokens with WCAG {contrast.score} ({contrast.ratio}:1) contrast compliance.
                  </p>
                  <div className="gd-sim-cta-row">
                    <button className="gd-sim-cta-primary">Primary Action</button>
                    <button className="gd-sim-cta-secondary">Documentation</button>
                  </div>
                </div>
              </div>
            )}

            {currentCode && (
              <div className="gd-code-box">
                <div className="gd-code-header">
                  <span>{currentCode.name}</span>
                  <button className="gd-btn-code-copy" onClick={handleCopyCode}>
                    {isCopiedCode ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{isCopiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="gd-code-pre">
                  <code>{currentCode.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
