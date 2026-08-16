import React, { useState } from 'react';
import { X, UploadCloud, FileText, Check, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { parseDesignMdFile } from '../utils/importer';
import confetti from 'canvas-confetti';

export function ImportModal({ onClose, onImportSuccess }) {
  const [pasteText, setPasteText] = useState('');
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setPasteText(text);
      }
    };
    reader.readAsText(file);
  };

  const handleProcessImport = () => {
    if (!pasteText.trim()) {
      setError('Please paste DESIGN.md markdown content or upload a file.');
      return;
    }

    try {
      // Check if it's JSON
      if (pasteText.trim().startsWith('{')) {
        const parsedJson = JSON.parse(pasteText);
        if (parsedJson.id && parsedJson.tokens) {
          onImportSuccess(parsedJson);
          confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
          onClose();
          return;
        }
      }

      // Otherwise parse as DESIGN.md
      const system = parseDesignMdFile(pasteText, fileName || 'custom-imported-spec.md');
      if (system) {
        onImportSuccess(system);
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
        onClose();
      } else {
        setError('Could not extract tokens. Ensure the file has valid colors or YAML frontmatter.');
      }
    } catch (err) {
      setError('Failed to parse file: ' + err.message);
    }
  };

  return (
    <div className="gd-detail-backdrop" onClick={onClose}>
      <div className="gd-detail-container" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="gd-detail-nav-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UploadCloud size={18} color="#f5a623" />
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Import Custom DESIGN.md or JSON Spec</h3>
          </div>
          <button className="gd-btn-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
          Drop in any <code>DESIGN.md</code> specification, website design analysis, or token JSON. TasteKit will automatically parse tokens and add it to your local catalog.
        </p>

        {/* File Drag Drop Input */}
        <div
          style={{
            border: '2px dashed var(--border-hairline)',
            borderRadius: '8px',
            padding: '24px',
            textAlign: 'center',
            background: 'var(--bg-surface)',
            marginBottom: '16px',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('file-upload-input').click()}
        >
          <input
            id="file-upload-input"
            type="file"
            accept=".md,.json,.txt"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <FileText size={24} color="#f5a623" style={{ margin: '0 auto 8px' }} />
          <span style={{ display: 'block', fontSize: '13px', fontWeight: '600' }}>
            {fileName ? fileName : 'Click or Drag & Drop DESIGN.md / JSON file'}
          </span>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Supports Markdown with YAML frontmatter or TasteKit token schemas
          </span>
        </div>

        {/* Text Area fallback */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
            Or Paste Raw Spec Content Below:
          </label>
          <textarea
            value={pasteText}
            onChange={(e) => {
              setPasteText(e.target.value);
              setError(null);
            }}
            placeholder={`---
name: MyBrand-design-analysis
colors:
  primary: "#f5a623"
  canvas: "#000000"
---
`}
            rows={8}
            style={{
              width: '100%',
              background: '#050608',
              border: '1px solid var(--border-hairline)',
              borderRadius: '6px',
              padding: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#ededed',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontSize: '12.5px', marginBottom: '16px' }}>
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              border: '1px solid var(--border-hairline)',
              borderRadius: '4px',
              color: 'var(--text-secondary)',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleProcessImport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              background: 'var(--accent-amber)',
              color: '#120b02',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <span>Import Spec</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
