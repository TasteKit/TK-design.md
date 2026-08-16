import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { Playground } from './components/Playground';
import { Studio } from './components/Studio';
import { UrlAnalyzer } from './components/UrlAnalyzer';
import { ExportModal } from './components/ExportModal';
import { SystemDetailModal } from './components/SystemDetailModal';
import { DESIGN_SYSTEMS } from './data/designSystems';

export function App() {
  const [systems, setSystems] = useState(DESIGN_SYSTEMS);
  const [selectedSystem, setSelectedSystem] = useState(DESIGN_SYSTEMS[0]);
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'playground' | 'studio' | 'analyzer'
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [detailModalSystem, setDetailModalSystem] = useState(null);

  const handleSelectSystem = (sys) => {
    setSelectedSystem(sys);
  };

  const handleLaunchPlayground = (sys) => {
    setSelectedSystem(sys);
    setActiveTab('playground');
  };

  const handleOpenDetailModal = (sys) => {
    setSelectedSystem(sys);
    setDetailModalSystem(sys);
  };

  const handleSaveCustomSystem = (newSys) => {
    setSystems([newSys, ...systems]);
    setSelectedSystem(newSys);
    setActiveTab('playground');
  };

  const handleGenerateFromUrl = (newSys) => {
    setSystems([newSys, ...systems]);
    setSelectedSystem(newSys);
    setActiveTab('playground');
  };

  return (
    <div className="gd-app">
      {/* Top Header & Announcement Banner */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalSystems={systems.length}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Split Grid (Sidebar 248px + Content minmax) */}
      <div className="gd-layout-container">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalSystems={systems.length}
          selectedSystem={selectedSystem}
        />

        <main className="gd-main-content">
          {activeTab === 'catalog' && (
            <>
              <Hero onBrowseCatalog={() => setActiveTab('catalog')} />
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
                onGenerateFromUrl={handleGenerateFromUrl}
              />
            </div>
          )}
        </main>
      </div>

      {/* Footer matching getdesign.md */}
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
              <button onClick={() => setActiveTab('catalog')}>Website catalog ({systems.length}+)</button>
              <button onClick={() => setActiveTab('studio')}>Private DESIGN.md</button>
              <button onClick={() => setActiveTab('playground')}>Live Playground</button>
              <button onClick={() => setActiveTab('analyzer')}>AI Token Extractor</button>
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
                Google Stitch Spec
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
          onClose={() => setDetailModalSystem(null)}
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
    </div>
  );
}
export default App;
