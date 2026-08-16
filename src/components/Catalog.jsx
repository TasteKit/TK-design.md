import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Download,
  Star,
  ShieldAlert,
  Eye,
  LayoutGrid,
  List,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../data/designSystems';
import { getSystemBrandLogo } from './BrandLogos';

export function Catalog({
  systems,
  selectedSystem,
  onSelectSystem,
  onLaunchPlayground,
  onOpenDetailModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // Default to getdesign.md table view

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
    <div className="gd-catalog-section">
      {/* Search Bar matching getdesign.md */}
      <div className="gd-search-container">
        <div className="gd-search-box">
          <Search size={14} className="gd-search-icon" />
          <input
            type="search"
            autoComplete="off"
            placeholder="Search all designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gd-search-input"
          />
          {searchQuery && (
            <button className="gd-search-clear" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Category Pills & View Switcher */}
        <div className="gd-controls-row">
          <div className="gd-categories-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`gd-cat-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gd-view-toggle">
            <button
              className={`gd-view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={13} />
            </button>
            <button
              className={`gd-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Table View (Matching getdesign.md design-md catalog) */}
      {viewMode === 'table' && (
        <div className="gd-table-container">
          <div className="gd-table-head">
            <span className="gd-th-num">#</span>
            <span className="gd-th-brand">Design Systems Analysis</span>
            <span className="gd-th-category">Category</span>
            <span className="gd-th-palette">Palette</span>
            <span className="gd-th-installs">Installs</span>
            <span className="gd-th-bookmarked">Bookmarked</span>
            <span className="gd-th-action">Action</span>
          </div>

          <div className="gd-table-body">
            {filteredSystems.map((sys, idx) => (
              <div
                key={sys.id}
                className="gd-table-row"
                onClick={() => onOpenDetailModal(sys)}
              >
                {/* Number */}
                <span className="gd-td-num">{idx + 1}</span>

                {/* Brand Logo & Name */}
                <div className="gd-td-brand">
                  <span className="gd-brand-logo-frame">
                    {getSystemBrandLogo(sys.id, 18)}
                  </span>
                  <div className="gd-brand-info">
                    <span className="gd-brand-name">{sys.name}</span>
                    <span className="gd-brand-tagline">{sys.tagline}</span>
                  </div>
                </div>

                {/* Category */}
                <div className="gd-td-category">
                  <span className="gd-cat-badge">{sys.category}</span>
                </div>

                {/* Palette Swatches */}
                <div className="gd-td-palette">
                  <span className="gd-swatch" style={{ background: sys.tokens.bg }}></span>
                  <span className="gd-swatch" style={{ background: sys.tokens.surface }}></span>
                  <span className="gd-swatch" style={{ background: sys.tokens.primary }}></span>
                  <span className="gd-swatch" style={{ background: sys.tokens.accent }}></span>
                </div>

                {/* Installs */}
                <span className="gd-td-installs">{sys.downloads}</span>

                {/* Bookmarked */}
                <span className="gd-td-bookmarked">{sys.stars}</span>

                {/* Action Trigger */}
                <div className="gd-td-action">
                  <button
                    className="gd-row-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(sys);
                    }}
                  >
                    <span>View Spec</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid View (Alternative Visual Cards) */}
      {viewMode === 'grid' && (
        <div className="gd-grid-container">
          {filteredSystems.map((sys) => (
            <div
              key={sys.id}
              className="gd-grid-card"
              onClick={() => onOpenDetailModal(sys)}
            >
              <div className="gd-card-top">
                <div className="gd-card-brand-box">
                  <span className="gd-card-icon">{getSystemBrandLogo(sys.id, 18)}</span>
                  <span className="gd-card-name">{sys.name}</span>
                </div>
                <span className="gd-card-category">{sys.category}</span>
              </div>

              <p className="gd-card-desc">{sys.tagline}</p>

              <div className="gd-card-swatches">
                <span style={{ background: sys.tokens.bg }}></span>
                <span style={{ background: sys.tokens.surface }}></span>
                <span style={{ background: sys.tokens.primary }}></span>
                <span style={{ background: sys.tokens.accent }}></span>
              </div>

              <div className="gd-card-footer">
                <span className="gd-card-stat">★ {sys.stars}</span>
                <button
                  className="gd-card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetailModal(sys);
                  }}
                >
                  Inspect DESIGN.md
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredSystems.length === 0 && (
        <div className="gd-empty-state">
          <p>No design systems found matching "{searchQuery}".</p>
          <button className="gd-btn-reset" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
