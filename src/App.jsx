import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Playground } from './components/Playground';
import { Studio } from './components/Studio';
import { UrlAnalyzer } from './components/UrlAnalyzer';
import { ExportModal } from './components/ExportModal';
import { ImportModal } from './components/ImportModal';
import { SystemDetailModal } from './components/SystemDetailModal';
import { DESIGN_SYSTEMS } from './data/designSystems';

export function App() {
  // LocalStorage persistence for custom created/imported specs
  const [customSystems, setCustomSystems] = useState(() => {
    try {
      const saved = localStorage.getItem('tastekit_custom_specs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [systems, setSystems] = useState(() => [...customSystems, ...DESIGN_SYSTEMS]);
  const [selectedSystem, setSelectedSystem] = useState(DESIGN_SYSTEMS[0]);
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'playground' | 'studio' | 'analyzer'
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [detailModalSystem, setDetailModalSystem] = useState(null);

  // URL Hash Deep Linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) return;

      if (hash.startsWith('spec=')) {
        const specId = hash.replace('spec=', '');
        const found = systems.find((s) => s.id === specId);
        if (found) {
          setSelectedSystem(found);
          setDetailModalSystem(found);
        }
      } else if (hash.startsWith('playground')) {
        setActiveTab('playground');
        const params = new URLSearchParams(hash.split('?')[1]);
        const id = params.get('id');
        if (id) {
          const found = systems.find((s) => s.id === id);
          if (found) setSelectedSystem(found);
        }
      } else if (['catalog', 'studio', 'analyzer'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [systems]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  const handleSelectSystem = (sys) => {
    setSelectedSystem(sys);
  };

  const handleLaunchPlayground = (sys) => {
    setSelectedSystem(sys);
    setActiveTab('playground');
    window.location.hash = `playground?id=${sys.id}`;
  };

  const handleOpenDetailModal = (sys) => {
    setSelectedSystem(sys);
    setDetailModalSystem(sys);
    window.location.hash = `spec=${sys.id}`;
  };

  const handleCloseDetailModal = () => {
    setDetailModalSystem(null);
    window.location.hash = activeTab;
  };

  const handleSaveCustomSystem = (newSys) => {
    const updatedCustom = [newSys, ...customSystems];
    setCustomSystems(updatedCustom);
    try {
      localStorage.setItem('tastekit_custom_specs', JSON.stringify(updatedCustom));
    } catch {}

    setSystems([newSys, ...systems]);
    setSelectedSystem(newSys);
    setActiveTab('playground');
    window.location.hash = `playground?id=${newSys.id}`;
  };

  return (
    <div className="tk-app-root">
      {/* Header & Top Banner */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        totalSystems={systems.length}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenImportModal={() => setIsImportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="tk-main-body">
        {activeTab === 'catalog' && (
          <>
            <Hero
              onExploreCatalog={() => {
                const el = document.getElementById('spec-matrix');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenStudio={() => handleTabChange('studio')}
              totalSpecs={systems.length}
            />
            <Catalog
              systems={systems}
              selectedSystem={selectedSystem}
              onSelectSystem={handleSelectSystem}
              onLaunchPlayground={handleLaunchPlayground}
              onOpenDetailModal={handleOpenDetailModal}
            />
          </>
        )}

        {activeTab === 'playground' && (
          <div style={{ padding: '32px 40px' }}>
            <Playground
              system={selectedSystem}
              systems={systems}
              onSelectSystem={handleSelectSystem}
              onOpenExport={() => setIsExportOpen(true)}
            />
          </div>
        )}

        {activeTab === 'studio' && (
          <div style={{ padding: '32px 40px' }}>
            <Studio
              currentSystem={selectedSystem}
              onSaveCustomSystem={handleSaveCustomSystem}
              onOpenExport={() => setIsExportOpen(true)}
            />
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div style={{ padding: '32px 40px' }}>
            <UrlAnalyzer
              onGenerateFromUrl={handleSaveCustomSystem}
            />
          </div>
        )}
      </main>

      {/* Bespoke TasteKit Footer */}
      <footer style={{ borderTop: '1px solid var(--border-hairline)', background: '#050608', padding: '48px 40px 64px', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/tastekit-logo.jpg" alt="" style={{ width: '22px', height: '22px', borderRadius: '4px' }} />
              <span style={{ fontWeight: '700', fontSize: '15px', color: '#fff' }}>Taste<span style={{ color: '#f5a623' }}>Kit</span></span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', maxWidth: '300px' }}>
              The open design system protocol and token compiler built to eliminate the AI taste gap.
            </p>
            <a
              href="https://github.com/TasteKit"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '12px', color: 'var(--text-secondary)' }}
            >
              Maintained by the TasteKit Organization ↗
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              Platform
            </span>
            <button onClick={() => handleTabChange('catalog')} style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>
              Spec Matrix ({systems.length}+)
            </button>
            <button onClick={() => handleTabChange('playground')} style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>
              Live Component Playground
            </button>
            <button onClick={() => handleTabChange('studio')} style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>
              Custom Token Studio
            </button>
            <button onClick={() => handleTabChange('analyzer')} style={{ background: 'none', border: 'none', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', padding: 0 }}>
              AI Token Extractor
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              Open Source
            </span>
            <a href="https://github.com/TasteKit/TK-design.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              GitHub Repository
            </a>
            <a href="https://github.com/TasteKit" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              TasteKit Organization
            </a>
            <a href="https://github.com/TasteKit/TK-design.md/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              MIT License
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              CLI & Tools
            </span>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#f5a623', background: '#0e1017', padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border-hairline)' }}>
              npx tastekit add linear
            </code>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Works with Cursor, Claude Code, Antigravity, and Codex.
            </span>
          </div>
        </div>
      </footer>

      {/* System Detail Spec Drawer */}
      {detailModalSystem && (
        <SystemDetailModal
          system={detailModalSystem}
          onClose={handleCloseDetailModal}
          onLaunchPlayground={handleLaunchPlayground}
        />
      )}

      {/* Export Multi-Format Modal */}
      {isExportOpen && (
        <ExportModal
          system={selectedSystem}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {/* Drag & Drop Spec Importer */}
      {isImportOpen && (
        <ImportModal
          onClose={() => setIsImportOpen(false)}
          onImportSuccess={handleSaveCustomSystem}
        />
      )}
    </div>
  );
}
export default App;
