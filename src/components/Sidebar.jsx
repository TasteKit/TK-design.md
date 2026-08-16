import React from 'react';
import {
  Layers,
  Sparkles,
  Sliders,
  Cpu,
  UploadCloud,
  Terminal,
  ExternalLink,
  ShieldAlert,
  Zap,
  Bookmark
} from 'lucide-react';
import { GithubIcon } from './Icons';

export function Sidebar({ activeTab, setActiveTab, totalSystems, selectedSystem, onOpenImportModal }) {
  return (
    <aside className="tk-sidebar">
      <div className="tk-sidebar-wrapper">
        {/* Navigation Section */}
        <div className="tk-sidebar-block">
          <span className="tk-sidebar-block-title">TasteKit Protocol</span>
          <nav className="tk-sidebar-nav-list">
            <button
              className={`tk-sb-link ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              <Layers size={15} />
              <span className="tk-sb-label">Spec Matrix</span>
              <span className="tk-sb-count">{totalSystems}</span>
            </button>

            <button
              className={`tk-sb-link ${activeTab === 'playground' ? 'active' : ''}`}
              onClick={() => setActiveTab('playground')}
            >
              <Sparkles size={15} />
              <span className="tk-sb-label">Live Playground</span>
              {selectedSystem && (
                <span className="tk-sb-status-dot" style={{ background: selectedSystem.tokens.primary }} />
              )}
            </button>

            <button
              className={`tk-sb-link ${activeTab === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveTab('studio')}
            >
              <Sliders size={15} />
              <span className="tk-sb-label">Custom Studio</span>
            </button>

            <button
              className={`tk-sb-link ${activeTab === 'analyzer' ? 'active' : ''}`}
              onClick={() => setActiveTab('analyzer')}
            >
              <Cpu size={15} />
              <span className="tk-sb-label">AI Extractor</span>
            </button>

            <button
              className="tk-sb-link"
              onClick={onOpenImportModal}
            >
              <UploadCloud size={15} />
              <span className="tk-sb-label">Import Spec</span>
            </button>
          </nav>
        </div>

        {/* Categories Quick Filter */}
        <div className="tk-sidebar-block">
          <span className="tk-sidebar-block-title">Spec Archetypes</span>
          <div className="tk-sidebar-archetypes">
            <div className="tk-archetype-item" onClick={() => setActiveTab('catalog')}>
              <span>AI & Engineering</span>
              <code>28</code>
            </div>
            <div className="tk-archetype-item" onClick={() => setActiveTab('catalog')}>
              <span>Fintech & Ledger</span>
              <code>12</code>
            </div>
            <div className="tk-archetype-item" onClick={() => setActiveTab('catalog')}>
              <span>Hardware & Consumer</span>
              <code>16</code>
            </div>
            <div className="tk-archetype-item" onClick={() => setActiveTab('catalog')}>
              <span>High-Velocity DevTools</span>
              <code>19</code>
            </div>
          </div>
        </div>

        {/* Promo / CLI Card */}
        <div className="tk-sidebar-cli-card">
          <div className="tk-cli-card-badge">
            <Terminal size={11} />
            <span>TasteKit CLI</span>
          </div>
          <h4 className="tk-cli-card-title">Sync Specs in 1 Command</h4>
          <div className="tk-cli-card-code">
            <code>npx tastekit-cli add linear</code>
          </div>
          <p className="tk-cli-card-desc">
            Instantly embeds <code>DESIGN.md</code> tokens into your coding agent workspace.
          </p>
        </div>

        {/* GitHub Org Footer Card */}
        <div className="tk-sidebar-org-card">
          <div className="tk-org-row">
            <GithubIcon size={16} />
            <div className="tk-org-info">
              <span className="tk-org-name">TasteKit Org</span>
              <span className="tk-org-meta">{totalSystems} Curated Specs</span>
            </div>
            <a
              href="https://github.com/TasteKit"
              target="_blank"
              rel="noopener noreferrer"
              className="tk-org-link"
              title="View on GitHub"
            >
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
