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

  if (!system) return null;

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
      particleCount: 35,
      spread: 50,
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
    <div className="tk-modal-overlay" onClick={onClose}>
      <div className="tk-modal-sheet" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div className="tk-modal-header-block" style={{ paddingBottom: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code2 size={20} color="#f5a623" />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Export Spec & Tokens
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Target System: <strong style={{ color: 'var(--accent-amber)' }}>{system.name}</strong>
                </span>
              </div>
            </div>

            <button className="tk-btn-close-sheet" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Subnav Tabs */}
        <div className="tk-inspector-tabs" style={{ marginBottom: '16px' }}>
          <button
            className={`tk-insp-tab ${activeTab === 'design-md' ? 'active' : ''}`}
            onClick={() => setActiveTab('design-md')}
          >
            <FileText size={13} />
            <span>DESIGN.md</span>
          </button>

          <button
            className={`tk-insp-tab ${activeTab === 'tailwind' ? 'active' : ''}`}
            onClick={() => setActiveTab('tailwind')}
          >
            <Code2 size={13} />
            <span>Tailwind Config</span>
          </button>

          <button
            className={`tk-insp-tab ${activeTab === 'css' ? 'active' : ''}`}
            onClick={() => setActiveTab('css')}
          >
            <Code2 size={13} />
            <span>CSS Variables</span>
          </button>

          <button
            className={`tk-insp-tab ${activeTab === 'agent-rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('agent-rules')}
          >
            <Terminal size={13} />
            <span>AGENTS.md / CursorRules</span>
          </button>
        </div>

        {/* Code Content Box */}
        <div className="tk-code-inspector-box" style={{ borderRadius: '6px', border: '1px solid var(--border-hairline)' }}>
          <div className="tk-code-topbar">
            <span className="tk-code-filename">{filename}</span>
            <button className="tk-btn-copy-code-snippet" onClick={handleCopy}>
              {isCopied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="tk-code-snippet-pre" style={{ maxHeight: '380px' }}>
            <code>{codeContent}</code>
          </pre>
        </div>

        {/* Modal Footer Actions */}
        <div className="tk-modal-sheet-footer">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            💡 Drop <code>{filename}</code> directly into your root workspace for AI coding agents.
          </span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {isCopied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{isCopied ? 'Copied' : 'Copy All'}</span>
            </button>

            <button
              onClick={handleDownload}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'var(--accent-amber)',
                color: '#120b02',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Download size={14} />
              <span>Download {filename}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
