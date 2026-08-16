import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Bookmark,
  Star,
  ShieldAlert,
  Eye,
  LayoutGrid,
  List,
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../data/designSystems';
import { getSystemBrandLogo } from './BrandLogos';
import confetti from 'canvas-confetti';

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
  const [copiedId, setCopiedId] = useState(null);
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

  const handleQuickCopy = (e, sys) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`npx tastekit add ${sys.id}`);
    setCopiedId(sys.id);
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.7 } });
    setTimeout(() => setCopiedId(null), 2000);
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
      return 0; // featured order
    });

  return (
    <div className="gd-catalog-section" id="catalog-section">
      {/* Search Bar & Shortcuts matching getdesign.md */}
      <div className="gd-search-container">
        <div className="gd-search-box">
          <Search size={15} className="gd-search-icon" />
          <input
            ref={searchInputRef}
            type="search"
            autoComplete="off"
            placeholder="Search all designs... (Press '/' to focus)"
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

        {/* Category Filter Pills & Controls */}
        <div className="gd-controls-row">
          <div className="gd-categories-scroll">
            <button
              className={`gd-cat-chip ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All ({systems.length})
            </button>
            <button
              className={`gd-cat-chip ${activeCategory === 'Bookmarked' ? 'active' : ''}`}
              onClick={() => setActiveCategory('Bookmarked')}
            >
              ★ Saved ({bookmarkedIds.length})
            </button>
            {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
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

      {/* Table View (Matching getdesign.md catalog table) */}
      {viewMode === 'table' && (
        <div className="gd-table-container">
          <div className="gd-table-head">
            <span className="gd-th-num">#</span>
            <span className="gd-th-brand">Design Systems Analysis</span>
            <span className="gd-th-category">Category</span>
            <span className="gd-th-palette">Palette</span>
            <span
              className="gd-th-installs clickable"
              onClick={() => setSortBy(sortBy === 'installs' ? 'featured' : 'installs')}
              title="Click to sort by installs"
            >
              Installs {sortBy === 'installs' && '↓'}
            </span>
            <span
              className="gd-th-bookmarked clickable"
              onClick={() => setSortBy(sortBy === 'bookmarks' ? 'featured' : 'bookmarks')}
              title="Click to sort by bookmarks"
            >
              Bookmarked {sortBy === 'bookmarks' && '↓'}
            </span>
            <span className="gd-th-action">Action</span>
          </div>

          <div className="gd-table-body">
            {filteredSystems.map((sys, idx) => {
              const isSaved = bookmarkedIds.includes(sys.id);
              const isCopied = copiedId === sys.id;

              return (
                <div
                  key={sys.id}
                  className="gd-table-row"
                  onClick={() => onOpenDetailModal(sys)}
                >
                  {/* Row Number */}
                  <span className="gd-td-num">{idx + 1}</span>

                  {/* Brand Column */}
                  <div className="gd-td-brand">
                    <span className="gd-brand-logo-frame">
                      {getSystemBrandLogo(sys.id, 18)}
                    </span>
                    <div className="gd-brand-info">
                      <span className="gd-brand-name">{sys.name}</span>
                      <span className="gd-brand-tagline">{sys.tagline}</span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="gd-td-category">
                    <span className="gd-cat-badge">{sys.category}</span>
                  </div>

                  {/* Palette Swatches */}
                  <div className="gd-td-palette">
                    <span className="gd-swatch" style={{ background: sys.tokens.bg }} title={`BG: ${sys.tokens.bg}`}></span>
                    <span className="gd-swatch" style={{ background: sys.tokens.surface }} title={`Surface: ${sys.tokens.surface}`}></span>
                    <span className="gd-swatch" style={{ background: sys.tokens.primary }} title={`Primary: ${sys.tokens.primary}`}></span>
                    <span className="gd-swatch" style={{ background: sys.tokens.accent }} title={`Accent: ${sys.tokens.accent}`}></span>
                  </div>

                  {/* Installs */}
                  <span className="gd-td-installs">{sys.downloads}</span>

                  {/* Bookmarked Counter + Star Toggle */}
                  <div className="gd-td-bookmarked" onClick={(e) => toggleBookmark(e, sys.id)}>
                    <Star
                      size={12}
                      fill={isSaved ? '#f5a623' : 'none'}
                      color={isSaved ? '#f5a623' : '#666'}
                      className="cursor-pointer"
                    />
                    <span>{sys.stars + (isSaved ? 1 : 0)}</span>
                  </div>

                  {/* Action Quick Trigger */}
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
              );
            })}
          </div>
        </div>
      )}

      {/* Alternative Visual Grid */}
      {viewMode === 'grid' && (
        <div className="gd-grid-container">
          {filteredSystems.map((sys) => {
            const isSaved = bookmarkedIds.includes(sys.id);
            return (
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
                  <button
                    className="gd-card-save-btn"
                    onClick={(e) => toggleBookmark(e, sys.id)}
                    title={isSaved ? 'Remove Bookmark' : 'Bookmark Spec'}
                  >
                    <Star
                      size={14}
                      fill={isSaved ? '#f5a623' : 'none'}
                      color={isSaved ? '#f5a623' : '#666'}
                    />
                  </button>
                </div>

                <p className="gd-card-desc">{sys.tagline}</p>

                <div className="gd-card-swatches">
                  <span style={{ background: sys.tokens.bg }}></span>
                  <span style={{ background: sys.tokens.surface }}></span>
                  <span style={{ background: sys.tokens.primary }}></span>
                  <span style={{ background: sys.tokens.accent }}></span>
                </div>

                <div className="gd-card-footer">
                  <span className="gd-card-stat">
                    {sys.downloads} installs • WCAG AA
                  </span>
                  <button
                    className="gd-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetailModal(sys);
                    }}
                  >
                    Inspect Spec →
                  </button>
                </div>
              </div>
            );
          })}
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
