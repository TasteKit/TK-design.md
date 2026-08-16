import React, { useState } from 'react';
import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { Playground } from './components/Playground';
import { Studio } from './components/Studio';
import { UrlAnalyzer } from './components/UrlAnalyzer';
import { ExportModal } from './components/ExportModal';
import { DESIGN_SYSTEMS } from './data/designSystems';

export function App() {
  const [systems, setSystems] = useState(DESIGN_SYSTEMS);
  const [selectedSystem, setSelectedSystem] = useState(DESIGN_SYSTEMS[0]);
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'playground' | 'studio' | 'analyzer'
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleSelectSystem = (sys) => {
    setSelectedSystem(sys);
  };

  const handleLaunchPlayground = (sys) => {
    setSelectedSystem(sys);
    setActiveTab('playground');
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
    <div className="tk-app">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSystem={selectedSystem}
        totalSystems={systems.length}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="tk-main-container">
        {activeTab === 'catalog' && (
          <Catalog
            systems={systems}
            selectedSystem={selectedSystem}
            onSelectSystem={handleSelectSystem}
            onLaunchPlayground={handleLaunchPlayground}
            onOpenExport={() => setIsExportOpen(true)}
          />
        )}

        {activeTab === 'playground' && (
          <Playground
            system={selectedSystem}
            systems={systems}
            onSelectSystem={handleSelectSystem}
            onOpenExport={() => setIsExportOpen(true)}
          />
        )}

        {activeTab === 'studio' && (
          <Studio
            currentSystem={selectedSystem}
            onSaveCustomSystem={handleSaveCustomSystem}
            onOpenExport={() => setIsExportOpen(true)}
          />
        )}

        {activeTab === 'analyzer' && (
          <UrlAnalyzer
            onGenerateFromUrl={handleGenerateFromUrl}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="tk-footer">
        <div className="tk-footer-inner">
          <div className="tk-footer-brand">
            <div className="tk-footer-logo-row">
              <img src="/tastekit-logo.jpg" alt="TasteKit" className="tk-footer-logo" />
              <span className="tk-footer-name">TasteKit</span>
              <span className="tk-footer-sub">TK-design.md</span>
            </div>
            <p className="tk-footer-desc">
              Independent design systems analysis and interactive spec engine for AI coding agents.
              Eliminating the AI taste gap with {systems.length}+ open-source specs.
            </p>
          </div>

          <div className="tk-footer-links">
            <div className="tk-footer-col">
              <span className="tk-footer-col-title">Ecosystem</span>
              <a href="https://github.com/TasteKit/TK-design.md" target="_blank" rel="noopener noreferrer">
                TK-design.md ({systems.length} Specs)
              </a>
              <button onClick={() => setActiveTab('catalog')}>Catalog</button>
              <button onClick={() => setActiveTab('playground')}>Live Playground</button>
              <button onClick={() => setActiveTab('studio')}>Studio Builder</button>
            </div>

            <div className="tk-footer-col">
              <span className="tk-footer-col-title">Open Source</span>
              <a href="https://github.com/TasteKit" target="_blank" rel="noopener noreferrer">
                TasteKit Org
              </a>
              <a href="https://github.com/TasteKit/TK-design.md" target="_blank" rel="noopener noreferrer">
                Contribute Spec
              </a>
              <a href="https://github.com/TasteKit/TK-design.md/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
                MIT License
              </a>
            </div>
          </div>
        </div>

        <div className="tk-footer-bottom">
          <span>Crafted with TasteKit for Antigravity, Claude Code, Cursor, and Codex.</span>
          <span>© 2026 TasteKit. All rights reserved.</span>
        </div>
      </footer>

      {/* Export Modal */}
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
