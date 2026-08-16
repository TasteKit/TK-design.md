import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Code2, Terminal, Sparkles } from 'lucide-react';
import {
  generateDesignMd,
  generateTailwindConfig,
  generateCssVariables,
  generateAgentRules
} from '../utils/exporters';
import confetti from 'canvas-confetti';

export function ExportModal({ system, onClose }) {
  const [activeTab, setActiveTab] = useState('design-md');
  const [isCopied, setIsCopied] = useState(false);

  let codeContent = '';
  let filename = '';
  let fileType = 'text/plain';

  if (activeTab === 'design-md') {
    codeContent = generateDesignMd(system);
    filename = 'DESIGN.md';
    fileType = 'text/markdown';
  } else if (activeTab === 'tailwind') {
    codeContent = generateTailwindConfig(system);
    filename = 'tailwind.config.js';
    fileType = 'application/javascript';
  } else if (activeTab === 'css') {
    codeContent = generateCssVariables(system);
    filename = 'variables.css';
    fileType = 'text/css';
  } else if (activeTab === 'agent-rules') {
    codeContent = generateAgentRules(system);
    filename = 'AGENTS.md';
    fileType = 'text/markdown';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setIsCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([codeContent], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tk-modal-backdrop" onClick={onClose}>
      <div className="tk-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div className="tk-modal-header">
          <div className="tk-modal-title-group">
            <h3 className="tk-modal-title">Export Spec & Tokens</h3>
            <span className="tk-modal-system-pill">{system.name}</span>
          </div>

          <button className="tk-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Subnav Tabs */}
        <div className="tk-modal-tabs">
          <button
            className={`tk-modal-tab-btn ${activeTab === 'design-md' ? 'active' : ''}`}
            onClick={() => setActiveTab('design-md')}
          >
            <FileText size={14} />
            <span>DESIGN.md (AI Agent Spec)</span>
          </button>

          <button
            className={`tk-modal-tab-btn ${activeTab === 'tailwind' ? 'active' : ''}`}
            onClick={() => setActiveTab('tailwind')}
          >
            <Code2 size={14} />
            <span>Tailwind Config</span>
          </button>

          <button
            className={`tk-modal-tab-btn ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            <Code2 size={14} />
            <span>CSS Variables</span>
          </button>

          <button
            className={`tk-modal-tab-btn ${activeTab === 'agent-rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent-rules')}
          >
            <Terminal size={14} />
            <span>AGENTS.md / CursorRules</span>
          </button>
        </div>

        {/* Code Content Display */}
        <div className="tk-modal-code-wrapper">
          <pre className="tk-modal-code">
            <code>{codeContent}</code>
          </pre>
        </div>

        {/* Modal Footer Actions */}
        <div className="tk-modal-footer">
          <span className="tk-modal-hint">
            💡 Drop this <code>{filename}</code> directly into your project root for instant AI coding agent guidance.
          </span>

          <div className="tk-modal-action-btns">
            <button className="tk-btn-modal-copy" onClick={handleCopy}>
              {isCopied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
              <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>

            <button className="tk-btn-modal-download" onClick={handleDownload}>
              <Download size={15} />
              <span>Download {filename}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
