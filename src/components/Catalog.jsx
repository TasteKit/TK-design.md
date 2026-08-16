import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Bookmark,
  Star,
  ShieldCheck,
  Eye,
  LayoutGrid,
  List,
  Sparkles,
  SlidersHorizontal,
  FileCode2,
  Terminal
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
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'installs' | 'bookmarks' | 'name'
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('tastekit_bookmarks');
      return saved ? JSON.parse(saved) : ['linear.app', 'claude', 'apple', 'stripe'];
    } catch {
      return ['linear.app', 'claude', 'apple', 'stripe'];
    }
  });

  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter((b) => b !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('tastekit_bookmarks', JSON.stringify(updated));
    } catch {}
  };

  // Filter & Sort
  const filteredSystems = systems
    .filter((sys) => {
      const matchesCategory =
        activeCategory === 'All' ||
        (activeCategory === 'Bookmarked' ? bookmarkedIds.includes(sys.id) : sys.category === activeCategory);

      const matchesSearch =
        sys.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sys.vibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sys.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sys.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'installs') return parseFloat(b.downloads) - parseFloat(a.downloads);
      if (sortBy === 'bookmarks') return b.stars - a.stars;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="tk-catalog-section" id="spec-matrix">
      {/* Search Bar & Filter Controls */}
      <div className="tk-search-toolbar">
        <div className="tk-search-box">
          <Search size={16} className="tk-search-icon" />
          <input
            ref={searchInputRef}
            type="search"
            autoComplete="off"
            placeholder="Search 75+ specs by brand, category, or aesthetic (Press '/' to focus)..."
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

        {/* Categories & View Switcher */}
        <div className="tk-filter-row">
          <div className="tk-categories-list">
            <button
              className={`tk-cat-btn ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All Specs ({systems.length})
            </button>
            <button
              className={`tk-cat-btn ${activeCategory === 'Bookmarked' ? 'active' : ''}`}
              onClick={() => setActiveCategory('Bookmarked')}
            >
              ★ Saved ({bookmarkedIds.length})
            </button>
            {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
              <button
                key={cat}
                className={`tk-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="tk-view-mode-toggle">
            <button
              className={`tk-vm-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Dense Table Matrix"
            >
              <List size={14} />
            </button>
            <button
              className={`tk-vm-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Visual Card Grid"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Dense Matrix Table View */}
      {viewMode === 'table' && (
        <div className="tk-matrix-wrapper">
          <table className="tk-matrix-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Design System & Specification</th>
                <th>Archetype</th>
                <th>Token Swatches</th>
                <th
                  className="clickable"
                  onClick={() => setSortBy(sortBy === 'installs' ? 'featured' : 'installs')}
                  title="Sort by Installs"
                >
                  Downloads {sortBy === 'installs' && '↓'}
                </th>
                <th
                  className="clickable"
                  onClick={() => setSortBy(sortBy === 'bookmarks' ? 'featured' : 'bookmarks')}
                  title="Sort by Bookmarks"
                >
                  Saved {sortBy === 'bookmarks' && '↓'}
                </th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSystems.map((sys, idx) => {
                const isSaved = bookmarkedIds.includes(sys.id);

                return (
                  <tr
                    key={sys.id}
                    onClick={() => onOpenDetailModal(sys)}
                  >
                    <td className="tk-td-num">{idx + 1}</td>

                    <td className="tk-td-brand">
                      <div className="tk-td-brand-inner">
                        <span className="tk-td-logo">
                          {getSystemBrandLogo(sys.id, 18)}
                        </span>
                        <div className="tk-td-brand-text">
                          <span className="tk-brand-title-bold">{sys.name}</span>
                          <span className="tk-brand-sub-tagline">{sys.tagline}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="tk-category-chip">{sys.category}</span>
                    </td>

                    <td>
                      <div className="tk-swatches-strip">
                        <span className="tk-swatch-dot" style={{ background: sys.tokens.bg }} title={`BG: ${sys.tokens.bg}`} />
                        <span className="tk-swatch-dot" style={{ background: sys.tokens.surface }} title={`Surface: ${sys.tokens.surface}`} />
                        <span className="tk-swatch-dot" style={{ background: sys.tokens.primary }} title={`Primary: ${sys.tokens.primary}`} />
                        <span className="tk-swatch-dot" style={{ background: sys.tokens.accent }} title={`Accent: ${sys.tokens.accent}`} />
                      </div>
                    </td>

                    <td className="tk-td-mono">{sys.downloads}</td>

                    <td>
                      <div
                        className="tk-td-save-cell"
                        onClick={(e) => toggleBookmark(e, sys.id)}
                        title={isSaved ? 'Bookmarked' : 'Save Spec'}
                      >
                        <Star
                          size={13}
                          fill={isSaved ? '#f5a623' : 'none'}
                          color={isSaved ? '#f5a623' : '#666'}
                        />
                        <span>{sys.stars + (isSaved ? 1 : 0)}</span>
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="tk-btn-matrix-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDetailModal(sys);
                        }}
                      >
                        <span>Inspect Spec</span>
                        <ArrowRight size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Visual Card Grid View */}
      {viewMode === 'grid' && (
        <div className="tk-grid-layout">
          {filteredSystems.map((sys) => {
            const isSaved = bookmarkedIds.includes(sys.id);

            return (
              <div
                key={sys.id}
                className="tk-card-item"
                onClick={() => onOpenDetailModal(sys)}
              >
                <div className="tk-card-header-row">
                  <div className="tk-card-brand-box">
                    <span className="tk-card-brand-icon">{getSystemBrandLogo(sys.id, 20)}</span>
                    <span className="tk-card-brand-name">{sys.name}</span>
                  </div>
                  <button
                    className="tk-card-star-btn"
                    onClick={(e) => toggleBookmark(e, sys.id)}
                  >
                    <Star
                      size={14}
                      fill={isSaved ? '#f5a623' : 'none'}
                      color={isSaved ? '#f5a623' : '#666'}
                    />
                  </button>
                </div>

                <p className="tk-card-description">{sys.tagline}</p>

                <div className="tk-card-swatches-row">
                  <span style={{ background: sys.tokens.bg }} />
                  <span style={{ background: sys.tokens.surface }} />
                  <span style={{ background: sys.tokens.primary }} />
                  <span style={{ background: sys.tokens.accent }} />
                </div>

                <div className="tk-card-footer-row">
                  <span className="tk-card-category-badge">{sys.category}</span>
                  <button
                    className="tk-btn-card-launch"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(sys);
                    }}
                  >
                    <span>Inspect</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredSystems.length === 0 && (
        <div className="tk-empty-notice">
          <p>No specifications found matching "{searchQuery}".</p>
          <button className="tk-btn-reset" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
