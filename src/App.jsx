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
  // Load custom saved specs from localStorage
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

  // URL Hash Deep Linking & History
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

  // Update hash on tab change
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

  const handleImportSpec = (newSys) => {
    handleSaveCustomSystem(newSys);
  };

  return (
    <div className="gd-app">
      {/* Top Header & Announcement Banner */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        totalSystems={systems.length}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenImportModal={() => setIsImportOpen(true)}
      />

      {/* Main Split Grid (Sidebar 248px + Content minmax) */}
      <div className="gd-layout-container">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          totalSystems={systems.length}
          selectedSystem={selectedSystem}
          onOpenImportModal={() => setIsImportOpen(true)}
        />

        <main className="gd-main-content">
          {activeTab === 'catalog' && (
            <>
              <Hero onBrowseCatalog={() => handleTabChange('catalog')} />
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
            <div className="gd-page-wrapper">
              <Playground
                system={selectedSystem}
                systems={systems}
                onSelectSystem={handleSelectSystem}
                onOpenExport={() => setIsExportOpen(true)}
              />
            </div>
          )}

          {activeTab === 'studio' && (
            <div className="gd-page-wrapper">
              <Studio
                currentSystem={selectedSystem}
                onSaveCustomSystem={handleSaveCustomSystem}
                onOpenExport={() => setIsExportOpen(true)}
              />
            </div>
          )}

          {activeTab === 'analyzer' && (
            <div className="gd-page-wrapper">
              <UrlAnalyzer
                onGenerateFromUrl={handleSaveCustomSystem}
              />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="gd-footer">
        <div className="gd-footer-inner">
          <div className="gd-footer-col brand">
            <a href="/" className="gd-footer-logo">
              taste<span className="gd-accent">kit</span>.md
            </a>
            <p className="gd-footer-tagline">
              Design, build, launch and grow products with the AI you already use.
            </p>
            <a
              href="https://github.com/TasteKit"
              target="_blank"
              rel="noopener noreferrer"
              className="gd-footer-team"
            >
              <img src="/tastekit-logo.jpg" alt="" className="gd-team-avatar" />
              <span>Maintained by the TasteKit team</span>
            </a>
          </div>

          <div className="gd-footer-col">
            <span className="gd-footer-title">Products</span>
            <div className="gd-footer-links">
              <button onClick={() => handleTabChange('catalog')}>Website catalog ({systems.length}+)</button>
              <button onClick={() => handleTabChange('studio')}>Private DESIGN.md</button>
              <button onClick={() => handleTabChange('playground')}>Live Playground</button>
              <button onClick={() => handleTabChange('analyzer')}>AI Token Extractor</button>
              <button onClick={() => setIsImportOpen(true)}>Import Spec (.md / .json)</button>
              <a href="https://github.com/TasteKit/TK-design.md" target="_blank" rel="noopener noreferrer">
                Website Starter Kit ↗
              </a>
            </div>
          </div>

          <div className="gd-footer-col">
            <span className="gd-footer-title">Resources</span>
            <div className="gd-footer-links">
              <a href="https://github.com/TasteKit/TK-design.md" target="_blank" rel="noopener noreferrer">
                State of DESIGN.md
              </a>
              <a href="https://github.com/TasteKit/TK-design.md" target="_blank" rel="noopener noreferrer">
                Google Stitch Spec v2.4
              </a>
              <a href="https://github.com/TasteKit/TK-design.md" target="_blank" rel="noopener noreferrer">
                GitHub Repository
              </a>
            </div>
          </div>

          <div className="gd-footer-col">
            <span className="gd-footer-title">Legal</span>
            <div className="gd-footer-links">
              <a href="https://github.com/TasteKit/TK-design.md/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
                MIT License
              </a>
              <span>© 2026 TasteKit. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Deep-Dive Detail Modal */}
      {detailModalSystem && (
        <SystemDetailModal
          system={detailModalSystem}
          onClose={handleCloseDetailModal}
          onLaunchPlayground={handleLaunchPlayground}
        />
      )}

      {/* Multi-Format Export Modal */}
      {isExportOpen && (
        <ExportModal
          system={selectedSystem}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {/* Spec Importer Modal */}
      {isImportOpen && (
        <ImportModal
          onClose={() => setIsImportOpen(false)}
          onImportSuccess={handleImportSpec}
        />
      )}
    </div>
  );
}
export default App;
