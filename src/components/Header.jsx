import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Code2,
  Layers,
  Cpu,
  Sliders,
  X,
  ArrowRight,
  Star,
  UploadCloud,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from './Icons';

export function Header({ activeTab, setActiveTab, totalSystems = 75, onOpenExport, onOpenImportModal }) {
  const [showBanner, setShowBanner] = useState(true);
  const [starCount, setStarCount] = useState(null);

  // Fetch real-time live GitHub stars from TasteKit repository
  useEffect(() => {
    fetch('https://api.github.com/repos/TasteKit/TK-design.md')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.stargazers_count === 'number') {
          const count = data.stargazers_count;
          setStarCount(count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`);
        }
      })
      .catch(() => {
        setStarCount(null);
      });
  }, []);

  return (
    <>
      {/* TasteKit Announcement Bar */}
      {showBanner && (
        <div className="tk-top-banner">
          <div className="tk-banner-content">
            <span className="tk-banner-pill">TASTEKIT v2.4</span>
            <span className="tk-banner-msg">
              Open-source DESIGN.md specifications & live token compiler for AI coding agents.
            </span>
            <a
              href="https://github.com/TasteKit/TK-design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="tk-banner-action"
            >
              <span>GitHub Org</span>
              <ArrowRight size={13} />
            </a>
          </div>
          <button
            className="tk-banner-close"
            onClick={() => setShowBanner(false)}
            title="Dismiss"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Main Glass Header */}
      <header className="tk-main-header">
        <div className="tk-header-container">
          {/* Brand Identity */}
          <div className="tk-brand-anchor" onClick={() => setActiveTab('catalog')}>
            <div className="tk-brand-logo-frame">
              <img src="/tastekit-logo.jpg" alt="TasteKit Logo" className="tk-brand-logo-img" />
            </div>
            <div className="tk-brand-meta">
              <div className="tk-brand-name-row">
                <span className="tk-brand-name">Taste<span>Kit</span></span>
                <span className="tk-brand-badge">TK-design.md</span>
              </div>
              <span className="tk-brand-tagline">AI Design System Protocol</span>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="tk-nav-menu">
            <button
              className={`tk-nav-tab ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <Layers size={14} />
              <span>Spec Matrix</span>
              <span className="tk-nav-pill">{totalSystems}</span>
            </button>

            <button
              className={`tk-nav-tab ${activeTab === 'playground' ? 'active' : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <Sparkles size={14} />
              <span>Live Playground</span>
            </button>

            <button
              className={`tk-nav-tab ${activeTab === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveTab('studio')}
            >
              <Sliders size={14} />
              <span>Custom Studio</span>
            </button>

            <button
              className={`tk-nav-tab ${activeTab === 'analyzer' ? 'active' : ''}`}
              onClick={() => setActiveTab('analyzer')}
            >
              <Cpu size={14} />
              <span>AI Extractor</span>
            </button>
          </nav>

          {/* Header Action Tools */}
          <div className="tk-header-toolset">
            <button
              className="tk-btn-tool"
              onClick={onOpenImportModal}
              title="Import DESIGN.md or JSON Spec"
            >
              <UploadCloud size={14} />
              <span>Import</span>
            </button>

            <button
              className="tk-btn-tool export"
              onClick={onOpenExport}
              title="Export Multi-Format Tokens"
            >
              <Code2 size={14} />
              <span>Export</span>
            </button>

            <a
              href="https://github.com/TasteKit/TK-design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="tk-btn-github-pill"
              title="Star TasteKit on GitHub"
            >
              <GithubIcon size={14} />
              <div className="tk-gh-stars">
                <Star size={11} fill="#f5a623" color="#f5a623" />
                <span>{starCount !== null ? starCount : 'Star'}</span>
              </div>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
