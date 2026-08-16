import React, { useState } from 'react';
import { Sparkles, Code2, Layers, Cpu, ExternalLink, Sliders, X, ArrowRight, Star, Send, Search, UploadCloud } from 'lucide-react';
import { GithubIcon } from './Icons';

export function Header({ activeTab, setActiveTab, totalSystems = 75, onOpenExport, onOpenImportModal }) {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {/* Top Announcement Banner */}
      {showBanner && (
        <div className="gd-announcement-banner">
          <div className="gd-banner-inner">
            <span className="gd-banner-badge">2026</span>
            <span className="gd-banner-strong">Website Starter Kit</span>
            <span className="gd-banner-desc">The full website + startup starter, DESIGN.md included. Own your codebase. No monthly fees.</span>
            <a
              href="https://github.com/TasteKit/TK-design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="gd-banner-link"
            >
              <ArrowRight size={14} />
            </a>
          </div>
          <button
            className="gd-banner-dismiss"
            onClick={() => setShowBanner(false)}
            title="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Sticky Header */}
      <header className="gd-header">
        <div className="gd-header-inner">
          {/* Brand Left */}
          <div className="gd-brand-left" onClick={() => setActiveTab('catalog')}>
            <a href="/" className="gd-logo-text" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}>
              taste<span className="gd-accent">kit</span>.md
            </a>
          </div>

          {/* Center Actions */}
          <div className="gd-header-center">
            <button
              className="gd-btn-request"
              onClick={() => setActiveTab('studio')}
            >
              <Send size={13} className="gd-btn-icon" />
              <span>Create / Request Spec</span>
            </button>

            <button
              className={`gd-btn-browse ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <Search size={13} className="gd-btn-icon" />
              <span>Browse website catalog</span>
              <span className="gd-browse-count">{totalSystems}+</span>
            </button>

            <button
              className={`gd-btn-tab ${activeTab === 'playground' ? 'active' : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <Sparkles size={13} />
              <span>Live Playground</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="gd-header-right">
            {/* Import Spec Action */}
            <button className="gd-btn-export" onClick={onOpenImportModal} title="Import Custom Spec">
              <UploadCloud size={13} />
              <span>Import</span>
            </button>

            {/* GitHub Widget */}
            <a
              href="https://github.com/TasteKit/TK-design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="gd-github-widget"
              title="TasteKit on GitHub"
            >
              <span className="gd-gh-icon-box">
                <GithubIcon size={14} />
              </span>
              <span className="gd-gh-star-box">
                <Star size={11} fill="#F5A623" color="#F5A623" />
                <span className="gd-star-count">1.4k</span>
              </span>
            </a>

            {/* Export Spec CTA */}
            <button className="gd-btn-export" onClick={onOpenExport}>
              <Code2 size={13} />
              <span>Export Spec</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
