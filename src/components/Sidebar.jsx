import React from 'react';
import {
  Send,
  Grid,
  Ticket,
  Sparkles,
  Sliders,
  Cpu,
  ArrowRight,
  ExternalLink,
  Layers
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, totalSystems, selectedSystem }) {
  return (
    <aside className="gd-sidebar">
      <nav className="gd-sidebar-nav">
        {/* Main Links */}
        <div className="gd-sidebar-group">
          <button
            className={`gd-sidebar-link ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => setActiveTab('studio')}
          >
            <span className="gd-sidebar-icon">
              <Send size={15} />
            </span>
            <span className="gd-sidebar-text">Private DESIGN.md</span>
          </button>

          <button
            className={`gd-sidebar-link ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <span className="gd-sidebar-icon">
              <Grid size={15} />
            </span>
            <span className="gd-sidebar-text">Website catalog</span>
            <span className="gd-sidebar-pill">{totalSystems}+</span>
          </button>

          <button
            className={`gd-sidebar-link ${activeTab === 'playground' ? 'active' : ''}`}
            onClick={() => setActiveTab('playground')}
          >
            <span className="gd-sidebar-icon">
              <Sparkles size={15} />
            </span>
            <span className="gd-sidebar-text">Live Playground</span>
            {selectedSystem && (
              <span className="gd-sidebar-dot" style={{ background: selectedSystem.tokens.primary }}></span>
            )}
          </button>

          <button
            className={`gd-sidebar-link ${activeTab === 'analyzer' ? 'active' : ''}`}
            onClick={() => setActiveTab('analyzer')}
          >
            <span className="gd-sidebar-icon">
              <Cpu size={15} />
            </span>
            <span className="gd-sidebar-text">AI Token Extractor</span>
          </button>
        </div>

        {/* Promo Rails (getdesign.md signature bottom promotions) */}
        <div className="gd-sidebar-promos">
          <div className="gd-promo-header">
            <span className="gd-promo-header-title">Vibecoder tools</span>
            <a href="https://github.com/TasteKit" target="_blank" rel="noopener noreferrer" className="gd-promo-add-link">
              TasteKit
              <ExternalLink size={10} />
            </a>
          </div>

          {/* Promo Card 1: AI Management */}
          <a
            href="https://github.com/TasteKit/TK-design.md"
            target="_blank"
            rel="noopener noreferrer"
            className="gd-rail-promo green"
          >
            <div className="gd-rail-promo-top green">
              <span className="gd-rail-promo-title">AI Coding Agent Specs</span>
              <span className="gd-rail-promo-sub">75+ Production Design Profiles for Cursor, Claude & Codex.</span>
            </div>
            <div className="gd-rail-promo-bottom">
              <span className="gd-rail-promo-code">npx tastekit add</span>
              <span className="gd-rail-promo-btn dark">Explore</span>
            </div>
          </a>

          {/* Promo Card 2: Website Starter Kit */}
          <a
            href="https://github.com/TasteKit/TK-design.md"
            target="_blank"
            rel="noopener noreferrer"
            className="gd-rail-promo amber"
          >
            <div className="gd-rail-promo-top amber">
              <span className="gd-rail-promo-title">Website Starter Kit, built for AI</span>
              <span className="gd-rail-promo-sub">Auth, payments, email & analytics wired in. DESIGN.md included.</span>
            </div>
            <div className="gd-rail-promo-bottom">
              <span className="gd-rail-tech-logos">⚡ React + Vite + Tokens</span>
              <span className="gd-rail-promo-btn dark">See Kit</span>
            </div>
          </a>
        </div>
      </nav>
    </aside>
  );
}
