import React, { useState } from 'react';

// Domain mapping for all 75+ brands to fetch realtime official logos
export const BRAND_DOMAINS = {
  'airbnb': 'airbnb.com',
  'airtable': 'airtable.com',
  'apple': 'apple.com',
  'binance': 'binance.com',
  'bmw': 'bmw.com',
  'bmw-m': 'bmw-m.com',
  'bugatti': 'bugatti.com',
  'cal': 'cal.com',
  'claude': 'anthropic.com',
  'clay': 'clay.com',
  'clickhouse': 'clickhouse.com',
  'cohere': 'cohere.com',
  'coinbase': 'coinbase.com',
  'composio': 'composio.dev',
  'cursor': 'cursor.com',
  'dell-1996': 'dell.com',
  'elevenlabs': 'elevenlabs.io',
  'expo': 'expo.dev',
  'ferrari': 'ferrari.com',
  'figma': 'figma.com',
  'framer': 'framer.com',
  'hashicorp': 'hashicorp.com',
  'hp': 'hp.com',
  'ibm': 'ibm.com',
  'intercom': 'intercom.com',
  'kraken': 'kraken.com',
  'lamborghini': 'lamborghini.com',
  'linear.app': 'linear.app',
  'linear': 'linear.app',
  'lovable': 'lovable.dev',
  'mastercard': 'mastercard.com',
  'meta': 'meta.com',
  'minimax': 'minimaxi.com',
  'mintlify': 'mintlify.com',
  'miro': 'miro.com',
  'mistral.ai': 'mistral.ai',
  'mongodb': 'mongodb.com',
  'nike': 'nike.com',
  'nintendo-2001': 'nintendo.com',
  'notion': 'notion.so',
  'nvidia': 'nvidia.com',
  'ollama': 'ollama.com',
  'opencode.ai': 'opencode.ai',
  'pinterest': 'pinterest.com',
  'playstation': 'playstation.com',
  'posthog': 'posthog.com',
  'raycast': 'raycast.com',
  'renault': 'renault.com',
  'replicate': 'replicate.com',
  'resend': 'resend.com',
  'revolut': 'revolut.com',
  'runwayml': 'runwayml.com',
  'sanity': 'sanity.io',
  'sentry': 'sentry.io',
  'shopify': 'shopify.com',
  'slack': 'slack.com',
  'spacex': 'spacex.com',
  'spotify': 'spotify.com',
  'starbucks': 'starbucks.com',
  'stripe': 'stripe.com',
  'supabase': 'supabase.com',
  'superhuman': 'superhuman.com',
  'tesla': 'tesla.com',
  'theverge': 'theverge.com',
  'together.ai': 'together.ai',
  'uber': 'uber.com',
  'vercel': 'vercel.com',
  'vodafone': 'vodafone.com',
  'voltagent': 'voltagent.dev',
  'warp': 'warp.dev',
  'webflow': 'webflow.com',
  'wired': 'wired.com',
  'wise': 'wise.com',
  'x.ai': 'x.ai',
  'zapier': 'zapier.com',
  'arc': 'arc.net',
  'teenage-engineering': 'teenage.engineering'
};

export function TasteKitLogoIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z" stroke="#f5a623" strokeWidth="2" strokeLinejoin="round" fill="rgba(245, 166, 35, 0.12)" />
      <path d="M7 8H17M12 8V17M15 13L17 17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Realtime Brand Logo Image Component
 * Fetches official high-res logo/favicon from the live domain with smooth fallback.
 */
export function RealtimeBrandLogo({ id, size = 18, className = '' }) {
  const [errorCount, setErrorCount] = useState(0);

  // If Flagship TasteKit
  if (id === 'tastekit-master' || id === 'tastekit') {
    return <TasteKitLogoIcon size={size} className={className} />;
  }

  const domain = BRAND_DOMAINS[id] || (id.includes('.') ? id : `${id}.com`);

  // Sources in priority order
  const sources = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://unavatar.io/${domain}?fallback=false`
  ];

  const currentSrc = sources[errorCount] || null;

  const handleImageError = () => {
    if (errorCount < sources.length - 1) {
      setErrorCount((prev) => prev + 1);
    } else {
      setErrorCount(sources.length); // Trigger monogram fallback
    }
  };

  if (!currentSrc || errorCount >= sources.length) {
    // Fallback: Initial letter monogram badge
    const initial = id.charAt(0).toUpperCase();
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '4px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${Math.max(10, size * 0.55)}px`,
          fontWeight: '700',
          color: '#f5a623',
          fontFamily: "'Space Mono', monospace",
          textTransform: 'uppercase',
          flexShrink: 0
        }}
        className={className}
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${size + 4}px`,
        height: `${size + 4}px`,
        borderRadius: '5px',
        background: '#0d0f15',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '2px',
        flexShrink: 0
      }}
      className={className}
    >
      <img
        src={currentSrc}
        alt={`${id} logo`}
        width={size}
        height={size}
        onError={handleImageError}
        loading="lazy"
        style={{
          objectFit: 'contain',
          borderRadius: '2px',
          display: 'block'
        }}
      />
    </div>
  );
}

export function getSystemBrandLogo(id, size = 18) {
  return <RealtimeBrandLogo id={id} size={size} />;
}
