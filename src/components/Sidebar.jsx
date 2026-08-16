import React from 'react';
import {
  Layers,
  Sparkles,
  Sliders,
  Cpu,
  Bookmark,
  Compass,
  Zap,
  Terminal,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { GithubIcon } from './Icons';

export function Sidebar({ activeTab, setActiveTab, totalSystems, selectedSystem }) {
  return (
    <aside className="tk-sidebar">
      <div className="tk-sidebar-inner">
        {/* Navigation Sections */}
        <div className="tk-sidebar-nav-group">
          <span className="tk-sidebar-group-title">Ecosystem</span>
          <div className="tk-sidebar-links">
            <button
              className={`tk-sidebar-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <Layers size={16} />
              <span className="tk-sidebar-link-text">Website Catalog</span>
              <span className="tk-sidebar-count">{totalSystems}</span>
            </button>

            <button
              className={`tk-sidebar-link ${activeTab === 'playground' ? 'active' : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <Sparkles size={16} />
              <span className="tk-sidebar-link-text">Live Playground</span>
              {selectedSystem && (
                <span className="tk-sidebar-active-dot" style={{ background: selectedSystem.tokens.primary }}></span>
              )}
            </button>

            <button
              className={`tk-sidebar-link ${activeTab === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveTab('studio')}
            >
              <Sliders size={16} />
              <span className="tk-sidebar-link-text">Custom Studio</span>
            </button>

            <button
              className={`tk-sidebar-link ${activeTab === 'analyzer' ? 'active' : ''}`}
              onClick={() => setActiveTab('analyzer')}
            >
              <Cpu size={16} />
              <span className="tk-sidebar-link-text">AI Token Extractor</span>
            </button>
          </div>
        </div>

        {/* Categories Quick Filter */}
        <div className="tk-sidebar-nav-group">
          <span className="tk-sidebar-group-title">Spec Categories</span>
          <div className="tk-sidebar-tags">
            <div className="tk-sidebar-tag-item" onClick={() => setActiveTab('catalog')}>
              <span>AI & DevTools</span>
              <code>28</code>
            </div>
            <div className="tk-sidebar-tag-item" onClick={() => setActiveTab('catalog')}>
              <span>Fintech & Crypto</span>
              <code>12</code>
            </div>
            <div className="tk-sidebar-tag-item" onClick={() => setActiveTab('catalog')}>
              <span>Consumer & Hardware</span>
              <code>16</code>
            </div>
            <div className="tk-sidebar-tag-item" onClick={() => setActiveTab('catalog')}>
              <span>Productivity & Apps</span>
              <code>19</code>
            </div>
          </div>
        </div>

        {/* Promo Card: TasteKit CLI & AI Starter */}
        <div className="tk-sidebar-promo-card">
          <div className="tk-promo-badge">
            <Terminal size={12} />
            <span>TasteKit CLI</span>
          </div>
          <h4 className="tk-promo-title">Add specs in 1 command</h4>
          <code className="tk-promo-code">npx tastekit add linear</code>
          <p className="tk-promo-desc">
            Instantly syncs <code>DESIGN.md</code> & tokens with your AI coding agent.
          </p>
        </div>

        {/* GitHub Organization Card */}
        <div className="tk-sidebar-footer-card">
          <div className="tk-sb-github-row">
            <GithubIcon size={16} />
            <div className="tk-sb-github-info">
              <span className="name">TasteKit Org</span>
              <span className="sub">75+ Open Specs</span>
            </div>
            <a
              href="https://github.com/TasteKit/TK-design.md"
              target="_blank"
              rel="noopener noreferrer"
              className="tk-sb-ext-link"
            >
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
