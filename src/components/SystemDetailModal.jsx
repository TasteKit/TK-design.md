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
  Sparkles,
  Bookmark,
  ShieldCheck,
  Share2,
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
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.6 } });
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
    <div className="tk-modal-overlay" onClick={onClose}>
      <div className="tk-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Navigation Bar */}
        <div className="tk-modal-nav-row">
          <button className="tk-btn-back-link" onClick={onClose}>
            <ArrowLeft size={14} />
            <span>Back to Spec Matrix</span>
          </button>

          <div className="tk-modal-nav-right">
            <button
              className="tk-btn-share"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Permalink copied to clipboard!');
              }}
              title="Share Spec Permalink"
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>

            <button className="tk-btn-close-sheet" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Header */}
        <div className="tk-modal-header-block">
          <div className="tk-header-title-group">
            <div className="tk-brand-chip-row">
              <span className="tk-modal-brand-icon">{getSystemBrandLogo(system.id, 24)}</span>
              <span className="tk-modal-category-tag">{system.category}</span>
              <span className="tk-modal-wcag-tag">WCAG {contrast.score} ({contrast.ratio}:1)</span>
            </div>
            <h1 className="tk-modal-main-title">{system.name} Specification</h1>
          </div>
          <p className="tk-modal-main-tagline">{system.tagline}</p>
        </div>

        {/* CLI Integration Strip */}
        <div className="tk-modal-cli-section">
          <h3 className="tk-cli-section-heading">Agent Installation & Usage</h3>
          <div className="tk-cli-grid">
            <div className="tk-cli-box">
              <div className="tk-cli-command-row">
                <Terminal size={14} color="#f5a623" />
                <code className="tk-cli-command">{npxCommand}</code>
                <button className="tk-btn-copy-cli" onClick={handleCopyCmd}>
                  {isCopiedCmd ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  <span>{isCopiedCmd ? 'Copied' : 'Copy Command'}</span>
                </button>
              </div>
              <p className="tk-cli-instruction">
                Run in your project root to drop <code>DESIGN.md</code> tokens directly into your workspace.
              </p>
            </div>

            <div className="tk-cli-stats-actions">
              <div className="tk-cli-stats-row">
                <div className="tk-stat-cell">
                  <span className="lbl">Downloads</span>
                  <span className="val">{system.downloads}</span>
                </div>
                <div className="tk-stat-cell">
                  <span className="lbl">Community Stars</span>
                  <span className="val">{system.stars}</span>
                </div>
              </div>

              <div className="tk-cli-cta-row">
                <button
                  className={`tk-btn-save-spec ${isSaved ? 'active' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark size={14} fill={isSaved ? '#f5a623' : 'none'} color={isSaved ? '#f5a623' : 'currentColor'} />
                  <span>{isSaved ? 'SAVED' : 'SAVE'}</span>
                </button>

                <button
                  className="tk-btn-launch-playground-cta"
                  onClick={() => {
                    onClose();
                    onLaunchPlayground(system);
                  }}
                >
                  <Sparkles size={14} />
                  <span>Open Playground</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Inspector & Preview */}
        <div className="tk-modal-inspector-section">
          <div className="tk-inspector-toolbar">
            <div className="tk-inspector-tabs">
              <button
                className={`tk-insp-tab ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                <Eye size={13} />
                <span>Live Canvas Simulation</span>
              </button>
              <button
                className={`tk-insp-tab ${activeTab === 'design-md' ? 'active' : ''}`}
                onClick={() => setActiveTab('design-md')}
              >
                <FileText size={13} />
                <span>DESIGN.md (AI Spec)</span>
              </button>
              <button
                className={`tk-insp-tab ${activeTab === 'tailwind' ? 'active' : ''}`}
                onClick={() => setActiveTab('tailwind')}
              >
                <Code2 size={13} />
                <span>Tailwind Config</span>
              </button>
              <button
                className={`tk-insp-tab ${activeTab === 'css' ? 'active' : ''}`}
                onClick={() => setActiveTab('css')}
              >
                <Code2 size={13} />
                <span>CSS Variables</span>
              </button>
              <button
                className={`tk-insp-tab ${activeTab === 'agents' ? 'active' : ''}`}
                onClick={() => setActiveTab('agents')}
              >
                <Terminal size={13} />
                <span>Agent Directives</span>
              </button>
            </div>

            {activeTab === 'live' && (
              <div className="tk-theme-switch-group">
                <button
                  className={`tk-theme-switch-btn ${!isLightMode ? 'active' : ''}`}
                  onClick={() => setIsLightMode(false)}
                >
                  <Moon size={12} />
                  <span>Dark</span>
                </button>
                <button
                  className={`tk-theme-switch-btn ${isLightMode ? 'active' : ''}`}
                  onClick={() => setIsLightMode(true)}
                >
                  <Sun size={12} />
                  <span>Light</span>
                </button>
              </div>
            )}
          </div>

          {/* Inspector Content Frame */}
          <div className="tk-inspector-frame">
            {activeTab === 'live' && (
              <div className="tk-live-canvas-render" style={canvasStyle}>
                <div className="tk-canvas-nav">
                  <div className="tk-cnav-brand">
                    <span className="tk-cnav-logo">{getSystemBrandLogo(system.id, 16)}</span>
                    <span className="tk-cnav-name">{system.name}</span>
                  </div>
                  <div className="tk-cnav-links">
                    <span>Overview</span>
                    <span>Tokens</span>
                    <span>Guardrails</span>
                  </div>
                  <button className="tk-cnav-btn">Launch Protocol</button>
                </div>

                <div className="tk-canvas-hero-card">
                  <span className="tk-canvas-vibe-pill">{system.vibe}</span>
                  <h3 className="tk-canvas-headline">{system.name} Visual Identity</h3>
                  <p className="tk-canvas-body-text">
                    Engineered with background: <code>{tokens.bg}</code>, primary: <code>{tokens.primary}</code>, and radius: <code>{tokens.radius}</code>.
                  </p>
                  <div className="tk-canvas-btn-row">
                    <button className="tk-canvas-btn-pri">Primary Action</button>
                    <button className="tk-canvas-btn-sec">Documentation</button>
                  </div>
                </div>
              </div>
            )}

            {currentCode && (
              <div className="tk-code-inspector-box">
                <div className="tk-code-topbar">
                  <span className="tk-code-filename">{currentCode.name}</span>
                  <button className="tk-btn-copy-code-snippet" onClick={handleCopyCode}>
                    {isCopiedCode ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{isCopiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="tk-code-snippet-pre">
                  <code>{currentCode.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="tk-modal-sheet-footer">
          <div className="tk-footer-left-info">
            <span>TasteKit Standard v2.4 • 100% Slop-Free Machine Protocol</span>
          </div>
          <button className="tk-btn-download-master" onClick={handleDownload}>
            <Download size={14} />
            <span>Download {currentCode ? currentCode.name : 'DESIGN.md'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
