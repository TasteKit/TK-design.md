import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, Download, Check, Star, ShieldAlert, Eye, Terminal } from 'lucide-react';
import { CATEGORIES } from '../data/designSystems';

export function Catalog({
  systems,
  selectedSystem,
  onSelectSystem,
  onLaunchPlayground,
  onOpenExport
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const filteredSystems = systems.filter((sys) => {
    const matchesCategory = activeCategory === 'All' || sys.category === activeCategory;
    const matchesSearch =
      sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sys.vibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sys.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sys.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickCopy = (e, sys) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`// Using TasteKit DESIGN.md for ${sys.name}\n// Download complete spec at https://github.com/TasteKit/TK-design.md`);
    setCopiedId(sys.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="tk-catalog-section">
      {/* Hero Banner */}
      <div className="tk-hero-card">
        <div className="tk-hero-content">
          <div className="tk-hero-badge">
            <span className="tk-hero-dot"></span>
            TasteKit Open Spec v2.4 • Eliminating The AI Taste Gap
          </div>
          <h1 className="tk-hero-headline">
            Standardized <span className="tk-gradient-text">DESIGN.md</span> specs for AI coding agents.
          </h1>
          <p className="tk-hero-desc">
            Give Antigravity, Claude Code, Cursor, and Codex deep visual intelligence.
            Choose a battle-tested design system, inspect live components, and export instant agent instructions.
          </p>

          <div className="tk-hero-stats">
            <div className="tk-hero-stat-item">
              <span className="tk-hero-stat-num">10+</span>
              <span className="tk-hero-stat-label">Production Specs</span>
            </div>
            <div className="tk-hero-stat-divider"></div>
            <div className="tk-hero-stat-item">
              <span className="tk-hero-stat-num">100%</span>
              <span className="tk-hero-stat-label">AI Agent Ready</span>
            </div>
            <div className="tk-hero-stat-divider"></div>
            <div className="tk-hero-stat-item">
              <span className="tk-hero-stat-num">0%</span>
              <span className="tk-hero-stat-label">Generic AI Slop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tk-controls-bar">
        <div className="tk-search-wrapper">
          <Search size={16} className="tk-search-icon" />
          <input
            type="text"
            placeholder="Search systems by brand, vibe, or aesthetic (e.g. Linear, Dark Obsidian, Apple)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tk-search-input"
          />
          {searchQuery && (
            <button className="tk-search-clear" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        <div className="tk-categories-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`tk-cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="tk-systems-grid">
        {filteredSystems.map((sys) => {
          const isSelected = selectedSystem?.id === sys.id;
          return (
            <div
              key={sys.id}
              className={`tk-system-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectSystem(sys)}
            >
              {/* Card Top Header */}
              <div className="tk-card-header">
                <div className="tk-card-title-group">
                  <div className="tk-card-meta-row">
                    <span className="tk-card-category">{sys.category}</span>
                    {sys.badge && <span className="tk-card-badge">{sys.badge}</span>}
                  </div>
                  <h3 className="tk-card-title">{sys.name}</h3>
                </div>

                <div className="tk-card-author-tag">
                  <span>{sys.author}</span>
                </div>
              </div>

              {/* Tagline & Vibe */}
              <p className="tk-card-tagline">{sys.tagline}</p>

              {/* Color Swatches Palette */}
              <div className="tk-card-swatches">
                <div className="tk-swatch-item" style={{ background: sys.tokens.bg }} title={`Background: ${sys.tokens.bg}`}>
                  <span className="tk-swatch-label">BG</span>
                </div>
                <div className="tk-swatch-item" style={{ background: sys.tokens.surface }} title={`Surface: ${sys.tokens.surface}`}>
                  <span className="tk-swatch-label">SURF</span>
                </div>
                <div className="tk-swatch-item" style={{ background: sys.tokens.primary }} title={`Primary: ${sys.tokens.primary}`}>
                  <span className="tk-swatch-label" style={{ color: sys.tokens.primaryForeground }}>PRI</span>
                </div>
                <div className="tk-swatch-item" style={{ background: sys.tokens.accent }} title={`Accent: ${sys.tokens.accent}`}>
                  <span className="tk-swatch-label">ACC</span>
                </div>
                <div className="tk-swatch-item" style={{ background: sys.tokens.text }} title={`Text: ${sys.tokens.text}`}>
                  <span className="tk-swatch-label" style={{ color: sys.tokens.bg }}>TXT</span>
                </div>
              </div>

              {/* Specs Feature Matrix */}
              <div className="tk-card-specs-row">
                <div className="tk-card-spec">
                  <span className="tk-spec-lbl">Radius</span>
                  <span className="tk-spec-val">{sys.tokens.radius}</span>
                </div>
                <div className="tk-card-spec">
                  <span className="tk-spec-lbl">Font</span>
                  <span className="tk-spec-val">{sys.tokens.fontHeading.split(',')[0].replace(/['"]/g, '')}</span>
                </div>
                <div className="tk-card-spec">
                  <span className="tk-spec-lbl">Downloads</span>
                  <span className="tk-spec-val">{sys.downloads}</span>
                </div>
              </div>

              {/* Anti-Patterns Snippet */}
              <div className="tk-card-guardrail">
                <ShieldAlert size={13} className="tk-guard-icon" />
                <span className="tk-guard-text">
                  Rule: {sys.antiPatterns[0]}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="tk-card-actions">
                <button
                  className="tk-btn-launch-play"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLaunchPlayground(sys);
                  }}
                >
                  <Eye size={14} />
                  <span>Test in Live Playground</span>
                </button>

                <button
                  className="tk-btn-card-export"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSystem(sys);
                    onOpenExport();
                  }}
                  title="Export DESIGN.md & Code Tokens"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSystems.length === 0 && (
        <div className="tk-empty-state">
          <p>No design systems found matching "{searchQuery}".</p>
          <button className="tk-btn-reset-filter" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
