import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  Download,
  Check,
  Star,
  ShieldAlert,
  Eye,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES } from '../data/designSystems';
import { getSystemBrandLogo } from './BrandLogos';

export function Catalog({
  systems,
  selectedSystem,
  onSelectSystem,
  onLaunchPlayground,
  onOpenExport
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const filteredSystems = systems.filter((sys) => {
    const matchesCategory = activeCategory === 'All' || sys.category === activeCategory;
    const matchesSearch =
      sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sys.vibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sys.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sys.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="tk-catalog-section">
      {/* Brand Strip */}
      <div className="tk-brand-strip">
        <span className="tk-brand-strip-label">Pre-analyzed Brands & Specs:</span>
        <div className="tk-brand-strip-logos">
          {systems.slice(0, 8).map((sys) => (
            <div
              key={sys.id}
              className="tk-brand-pill"
              onClick={() => onLaunchPlayground(sys)}
              title={`Test ${sys.name} Spec`}
            >
              <span className="tk-brand-pill-icon">{getSystemBrandLogo(sys.id, 14)}</span>
              <span>{sys.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Header */}
      <div className="tk-hero-card">
        <div className="tk-hero-content">
          <div className="tk-hero-badge">
            <span className="tk-hero-dot"></span>
            TasteKit Open Spec v2.4 • Eliminating The AI Taste Gap
          </div>
          <h1 className="tk-hero-headline">
            Standardized <span className="tk-gradient-text">DESIGN.md</span> blueprints for AI coding agents.
          </h1>
          <p className="tk-hero-desc">
            Give Antigravity, Claude Code, Cursor, and Codex deep visual intelligence.
            Choose a verified design profile, inspect live components, and export instant agent instructions.
          </p>

          <div className="tk-hero-stats">
            <div className="tk-hero-stat-item">
              <span className="tk-hero-stat-num">{systems.length}</span>
              <span className="tk-hero-stat-label">Verified Specs</span>
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

      {/* Controls & Filter Bar */}
      <div className="tk-controls-bar">
        <div className="tk-search-wrapper">
          <Search size={16} className="tk-search-icon" />
          <input
            type="text"
            placeholder="Search systems by brand, vibe, or aesthetic (e.g. Linear, Stripe, Apple)..."
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

        <div className="tk-filter-row">
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

          <div className="tk-view-toggle">
            <button
              className={`tk-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              className={`tk-view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Dense Table View"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
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
                      <span className="tk-card-logo-badge">
                        {getSystemBrandLogo(sys.id, 16)}
                      </span>
                      <span className="tk-card-category">{sys.category}</span>
                      {sys.badge && <span className="tk-card-badge">{sys.badge}</span>}
                    </div>
                    <h3 className="tk-card-title">{sys.name}</h3>
                  </div>

                  <div className="tk-card-author-tag">
                    <span>{sys.author}</span>
                  </div>
                </div>

                {/* Tagline */}
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

                {/* Specs Row */}
                <div className="tk-card-specs-row">
                  <div className="tk-card-spec">
                    <span className="tk-spec-lbl">Radius</span>
                    <span className="tk-spec-val">{sys.tokens.radius}</span>
                  </div>
                  <div className="tk-card-spec">
                    <span className="tk-spec-lbl">Typeface</span>
                    <span className="tk-spec-val">{sys.tokens.fontHeading.split(',')[0].replace(/['"]/g, '')}</span>
                  </div>
                  <div className="tk-card-spec">
                    <span className="tk-spec-lbl">Agent Ready</span>
                    <span className="tk-spec-val" style={{ color: '#10b981' }}>✓ Verified</span>
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
      )}

      {/* Table / Dense Minimalist View */}
      {viewMode === 'table' && (
        <div className="tk-dense-table-wrapper">
          <table className="tk-dense-table">
            <thead>
              <tr>
                <th>Brand / System</th>
                <th>Category</th>
                <th>Palette Swatches</th>
                <th>Radius</th>
                <th>Typeface</th>
                <th>Anti-Pattern Rule</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSystems.map((sys) => (
                <tr key={sys.id} onClick={() => onSelectSystem(sys)}>
                  <td className="tk-table-brand-cell">
                    <span className="tk-table-brand-icon">{getSystemBrandLogo(sys.id, 16)}</span>
                    <div>
                      <div className="tk-table-brand-name">{sys.name}</div>
                      <div className="tk-table-brand-vibe">{sys.vibe}</div>
                    </div>
                  </td>
                  <td>
                    <span className="tk-table-category-tag">{sys.category}</span>
                  </td>
                  <td>
                    <div className="tk-table-swatches">
                      <span className="tk-table-swatch" style={{ background: sys.tokens.bg }}></span>
                      <span className="tk-table-swatch" style={{ background: sys.tokens.surface }}></span>
                      <span className="tk-table-swatch" style={{ background: sys.tokens.primary }}></span>
                      <span className="tk-table-swatch" style={{ background: sys.tokens.accent }}></span>
                    </div>
                  </td>
                  <td>
                    <code className="tk-table-mono">{sys.tokens.radius}</code>
                  </td>
                  <td>
                    <span className="tk-table-font">{sys.tokens.fontHeading.split(',')[0].replace(/['"]/g, '')}</span>
                  </td>
                  <td>
                    <span className="tk-table-rule">{sys.antiPatterns[0]}</span>
                  </td>
                  <td className="text-right">
                    <button
                      className="tk-btn-table-test"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLaunchPlayground(sys);
                      }}
                    >
                      <span>Live Test</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
