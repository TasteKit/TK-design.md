import React, { useState } from 'react';
import { Sparkles, Code2, Layers, Cpu, ExternalLink, Sliders, X, ArrowRight, Star } from 'lucide-react';
import { GithubIcon } from './Icons';

export function Header({ activeTab, setActiveTab, selectedSystem, totalSystems = 75, onOpenExport }) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {/* Top Announcement Banner */}
      {showBanner && (
        <div className="tk-announcement-banner">
          <div className="tk-banner-inner">
            <span className="tk-banner-badge">2026 OPEN SPEC</span>
            <span className="tk-banner-text">
              TasteKit Studio with {totalSystems}+ DESIGN.md specs for AI coding agents is live.
            </span>
            <a
              href="https://github.com/TasteKit/TK-design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="tk-banner-link"
            >
              <span>Explore GitHub Org</span>
              <ArrowRight size={13} />
            </a>
          </div>
          <button
            className="tk-banner-dismiss"
            onClick={() => setShowBanner(false)}
            title="Dismiss Announcement"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Sticky Header */}
      <header className="tk-header">
        <div className="tk-header-inner">
          {/* Brand Left */}
          <div className="tk-brand" onClick={() => setActiveTab('catalog')}>
            <div className="tk-logo-icon">
              <img src="/tastekit-logo.jpg" alt="TasteKit Logo" className="tk-logo-img" />
            </div>
            <div className="tk-brand-text">
              <div className="tk-brand-title">
                Taste<span>Kit</span>
                <span className="tk-brand-tag">TK-design.md</span>
              </div>
            </div>
          </div>

          {/* Center Action Buttons */}
          <div className="tk-header-center-actions">
            <button
              className={`tk-hdr-btn ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <Layers size={14} />
              <span>Browse Catalog</span>
              <span className="tk-hdr-pill">{totalSystems}+</span>
            </button>

            <button
              className={`tk-hdr-btn ${activeTab === 'playground' ? 'active' : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <Sparkles size={14} />
              <span>Live Playground</span>
            </button>

            <button
              className={`tk-hdr-btn ${activeTab === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveTab('studio')}
            >
              <Sliders size={14} />
              <span>Studio</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="tk-header-actions">
            <button className="tk-btn-export" onClick={onOpenExport}>
              <Code2 size={15} />
              <span>Export Spec</span>
            </button>

            <a
              href="https://github.com/TasteKit/TK-design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="tk-btn-github"
              title="TasteKit on GitHub"
            >
              <GithubIcon size={16} />
              <span className="tk-github-text">TasteKit</span>
              <div className="tk-github-stars-pill">
                <Star size={11} fill="#f5a623" color="#f5a623" />
                <span>1.4k</span>
              </div>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
