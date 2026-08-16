import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  Sliders,
  Code2
} from 'lucide-react';

export function Hero({ onExploreCatalog, onOpenStudio, totalSpecs = 75 }) {
  const [activeTab, setActiveTab] = useState('token-engine');

  return (
    <section className="tk-hero-section">
      {/* Ambient Radial Background Glow */}
      <div className="tk-hero-ambient-glow" />

      <div className="tk-hero-container">
        {/* Left: Brand Value Proposition & Directives */}
        <div className="tk-hero-content">
          <div className="tk-hero-badge">
            <span className="tk-hero-badge-sparkle">✦</span>
            <span className="tk-hero-badge-text">TasteKit Protocol v2.4 • Eliminating the AI Taste Gap</span>
          </div>

          <h1 className="tk-hero-headline">
            The Open <span className="tk-gradient-text">DESIGN.md</span> Protocol for AI Coding Agents.
          </h1>

          <p className="tk-hero-description">
            When autonomous coding agents build software, they default to generic layouts.
            <strong> TasteKit</strong> provides machine-readable, production design system specifications that teach
            Claude, Cursor, Codex, and Antigravity your exact visual vocabulary, tokens, and guardrails.
          </p>

          {/* Action CTAs */}
          <div className="tk-hero-cta-group">
            <button className="tk-btn-hero-primary" onClick={onExploreCatalog}>
              <Layers size={15} />
              <span>Explore {totalSpecs}+ Production Specs</span>
              <ArrowRight size={14} />
            </button>

            <button className="tk-btn-hero-secondary" onClick={onOpenStudio}>
              <Sliders size={15} />
              <span>Launch Token Studio</span>
            </button>
          </div>

          {/* Value Pillars */}
          <div className="tk-hero-pillars">
            <div className="tk-pillar-item">
              <CheckCircle2 size={14} className="tk-pillar-icon" />
              <span>100% Slop-Free UI</span>
            </div>
            <div className="tk-pillar-item">
              <CheckCircle2 size={14} className="tk-pillar-icon" />
              <span>WCAG 2.1 Verified</span>
            </div>
            <div className="tk-pillar-item">
              <CheckCircle2 size={14} className="tk-pillar-icon" />
              <span>Multi-Agent Ready</span>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive TasteKit Engine Simulator */}
        <div className="tk-hero-visualizer">
          <div className="tk-engine-card">
            {/* Engine Header */}
            <div className="tk-engine-head">
              <div className="tk-engine-dots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
              <div className="tk-engine-title">
                <Terminal size={12} color="#f5a623" />
                <span>tastekit-protocol // compiler.ts</span>
              </div>
              <span className="tk-engine-status">LIVE SYNC</span>
            </div>

            {/* Visualizer Tabs */}
            <div className="tk-engine-tabs">
              <button
                className={`tk-eng-tab ${activeTab === 'token-engine' ? 'active' : ''}`}
                onClick={() => setActiveTab('token-engine')}
              >
                Token Binding
              </button>
              <button
                className={`tk-eng-tab ${activeTab === 'agent-rules' ? 'active' : ''}`}
                onClick={() => setActiveTab('agent-rules')}
              >
                Agent Guardrails
              </button>
              <button
                className={`tk-eng-tab ${activeTab === 'output' ? 'active' : ''}`}
                onClick={() => setActiveTab('output')}
              >
                Compiled Output
              </button>
            </div>

            {/* Visualizer Body */}
            <div className="tk-engine-body">
              {activeTab === 'token-engine' && (
                <div className="tk-engine-stream">
                  <div className="tk-code-line comment">// TasteKit Master Obsidian Palette Token Injection</div>
                  <div className="tk-code-line">
                    <span className="kw">const</span> <span className="var">tastekitTokens</span> = &#123;
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="prop">background</span>: <span className="str">"#08090c"</span>, <span className="comment">// Velvet Obsidian</span>
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="prop">surface</span>: <span className="str">"#0f1117"</span>, <span className="comment">// Elevated 1px Card</span>
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="prop">primary</span>: <span className="str">"#f5a623"</span>, <span className="comment">// Electric Amber Spark</span>
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="prop">contrastRatio</span>: <span className="num">15.8</span>, <span className="comment">// WCAG AAA Certified</span>
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="prop">radius</span>: <span className="str">"6px"</span>, <span className="prop">fontHeading</span>: <span className="str">"Geist Sans"</span>
                  </div>
                  <div className="tk-code-line">&#125;;</div>
                </div>
              )}

              {activeTab === 'agent-rules' && (
                <div className="tk-engine-stream">
                  <div className="tk-code-line comment">// Strict Anti-Pattern Directives for LLM Coding Agents</div>
                  <div className="tk-code-line">
                    <span className="kw">export const</span> <span className="var">ANTI_PATTERNS</span> = [
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="str">"❌ NEVER use clichéd purple gradients on pitch-black"</span>,
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="str">"❌ NEVER use textureless cards without 1px hairline depth"</span>,
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="str">"❌ NEVER generate untracked headlines — enforce -0.02em"</span>,
                  </div>
                  <div className="tk-code-line ind-1">
                    <span className="str">"✓ ALWAYS preserve strict semantic token consistency"</span>
                  </div>
                  <div className="tk-code-line">];</div>
                </div>
              )}

              {activeTab === 'output' && (
                <div className="tk-engine-stream">
                  <div className="tk-code-line comment">// Auto-generated multi-format compilation</div>
                  <div className="tk-code-line">
                    <span className="tag">✓ DESIGN.md</span> — Standard Root Specification
                  </div>
                  <div className="tk-code-line">
                    <span className="tag">✓ .cursorrules</span> — Cursor AI System Prompt
                  </div>
                  <div className="tk-code-line">
                    <span className="tag">✓ CLAUDE.md</span> — Claude Code Agent Directive
                  </div>
                  <div className="tk-code-line">
                    <span className="tag">✓ tailwind.config.js</span> — Semantic Token Classes
                  </div>
                </div>
              )}
            </div>

            {/* Engine Quick Copy Footer */}
            <div className="tk-engine-footer">
              <div className="tk-npx-strip">
                <span className="tk-npx-prompt">$</span>
                <code className="tk-npx-code">npx tastekit add linear</code>
              </div>
              <button
                className="tk-btn-npx-copy"
                onClick={() => {
                  navigator.clipboard.writeText('npx tastekit add linear');
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
