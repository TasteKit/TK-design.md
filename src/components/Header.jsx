import React from 'react';
import { Sparkles, Code2, Layers, Cpu, ExternalLink, Sliders } from 'lucide-react';
import { GithubIcon } from './Icons';

export function Header({ activeTab, setActiveTab, selectedSystem, onOpenExport }) {
  return (
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
            <p className="tk-brand-sub">AI Coding Agent Design System Engine</p>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="tk-nav">
          <button
            className={`tk-nav-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <Layers size={15} />
            <span>Catalog</span>
            <span className="tk-nav-count">10</span>
          </button>

          <button
            className={`tk-nav-btn ${activeTab === 'playground' ? 'active' : ''}`}
            onClick={() => setActiveTab('playground')}
          >
            <Sparkles size={15} />
            <span>Live Playground</span>
            {selectedSystem && (
              <span className="tk-nav-active-pill" style={{ color: selectedSystem.tokens.primary }}>
                {selectedSystem.name}
              </span>
            )}
          </button>

          <button
            className={`tk-nav-btn ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => setActiveTab('studio')}
          >
            <Sliders size={15} />
            <span>Custom Studio</span>
          </button>

          <button
            className={`tk-nav-btn ${activeTab === 'analyzer' ? 'active' : ''}`}
            onClick={() => setActiveTab('analyzer')}
          >
            <Cpu size={15} />
            <span>AI Token Extractor</span>
          </button>
        </nav>

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
            title="GitHub Repository"
          >
            <GithubIcon size={16} />
            <span className="tk-github-text">TasteKit</span>
            <ExternalLink size={12} className="tk-ext-icon" />
          </a>
        </div>
      </div>
    </header>
  );
}
