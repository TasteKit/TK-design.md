import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Terminal } from 'lucide-react';

export function Hero({ onBrowseCatalog }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Style without design skills",
      desc: "Pick a DESIGN.md from a real site and hand it to your AI coder. It already carries the colors, type, and spacing, so you don't need to know any of it."
    },
    {
      title: "Match a style you like",
      desc: "Use the design language of your favorite products — Linear, Stripe, Apple, or Claude — applied directly to your project."
    },
    {
      title: "Stay consistent across pages",
      desc: "Coding agents forget styles across prompts. With a DESIGN.md reference file, every new page shares the same palette and tokens."
    },
    {
      title: "Restyle what you already have",
      desc: "Drop a DESIGN.md file into an existing codebase and tell your AI assistant to update colors and components to match."
    },
    {
      title: "A brief you reuse every time",
      desc: "Stop repeating styling instructions in every prompt. Keep a single DESIGN.md source of truth for your entire web app."
    }
  ];

  return (
    <section className="gd-hero-section">
      <div className="gd-hero-grid">
        {/* Left Column: Headline, Subtitle, Google Spec Badge, Bullets */}
        <div className="gd-hero-left">
          <h1 className="gd-hero-title">
            Give AI-built websites a real design with <span className="gd-accent">DESIGN.md</span>
          </h1>

          <p className="gd-hero-subtitle">
            Give your coding agent a reusable design reference: colors, type, spacing, components, and the reasoning behind them.
          </p>
          <p className="gd-hero-subtitle-sub">
            So every new page follows a specific visual language, not the same generic AI layout.
          </p>

          {/* Google Spec Badge */}
          <div className="gd-hero-badge-row">
            <div className="gd-google-badge">
              <span className="gd-google-icon-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"/>
                </svg>
              </span>
              <span className="gd-google-text">Follows Google's official DESIGN.md spec</span>
            </div>
          </div>

          {/* Quick List */}
          <div className="gd-hero-list-container">
            <span className="gd-list-label">Use a DESIGN.md to:</span>
            <ul className="gd-hero-list">
              <li>
                <ArrowRight size={14} className="gd-list-arr" />
                <span>Style your site without being a designer</span>
              </li>
              <li>
                <ArrowRight size={14} className="gd-list-arr" />
                <span>Match a style you like from any reference site</span>
              </li>
              <li>
                <ArrowRight size={14} className="gd-list-arr" />
                <span>Keep new pages in the same visual language</span>
              </li>
              <li>
                <ArrowRight size={14} className="gd-list-arr" />
                <span>Restyle existing pages without starting over</span>
              </li>
              <li>
                <ArrowRight size={14} className="gd-list-arr" />
                <span>Give your AI coder a reusable design brief</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Browser Window Preview & Slide Switchers */}
        <div className="gd-hero-right">
          <div className="gd-hero-right-inner">
            <div className="gd-slide-content">
              <h3 className="gd-slide-title">{slides[activeSlide].title}</h3>
              <p className="gd-slide-desc">{slides[activeSlide].desc}</p>
            </div>

            {/* Simulated Browser Wireframe Mockup */}
            <div className="gd-mockup-window">
              <div className="gd-mockup-header">
                <div className="gd-mockup-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="gd-mockup-url">
                  <span>yoursite.com</span>
                </div>
              </div>

              <div className="gd-mockup-body">
                <div className="gd-mockup-nav">
                  <div className="gd-mockup-brand-mark"></div>
                  <div className="gd-mockup-links">
                    <span className="mock-bar sm"></span>
                    <span className="mock-bar sm"></span>
                    <span className="mock-pill"></span>
                  </div>
                </div>

                <div className="gd-mockup-hero">
                  <div className="mock-bar lg"></div>
                  <div className="mock-bar md"></div>
                  <div className="mock-bar-sub"></div>
                  <div className="mock-btn-primary"></div>
                </div>

                <div className="gd-mockup-cards">
                  <div className="mock-card"></div>
                  <div className="mock-card"></div>
                  <div className="mock-card"></div>
                </div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="gd-slide-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`gd-slide-dot ${activeSlide === idx ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  title={slides[idx].title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
