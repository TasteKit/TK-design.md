#!/usr/bin/env node

/**
 * TasteKit CLI
 * The official command-line tool to add DESIGN.md specifications to any project.
 * Usage:
 *   npx tastekit add <brand>
 *   npx tastekit list
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/TasteKit/TK-design.md/main/design-specs';
const LOCAL_SPECS_DIR = path.resolve(new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'), '../design-specs');

const args = process.argv.slice(2);
const command = args[0] || 'help';
const target = args[1];

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  amber: '\x1b[38;2;245;166;35m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  red: '\x1b[31m',
};

function printBanner() {
  console.log(`
${COLORS.amber}╔═══════════════════════════════════════════════════╗
║   ✦ TasteKit — DESIGN.md Engine for AI Agents     ║
╚═══════════════════════════════════════════════════╝${COLORS.reset}
`);
}

function fetchRemoteSpec(brand) {
  const url = `${GITHUB_RAW_BASE}/${brand}.md`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      } else {
        // Try linear.app if linear, or vice-versa
        const fallbackBrand = brand === 'linear' ? 'linear.app' : brand.replace(/\.app$/, '');
        const fallbackUrl = `${GITHUB_RAW_BASE}/${fallbackBrand}.md`;
        
        https.get(fallbackUrl, (fallbackRes) => {
          if (fallbackRes.statusCode === 200) {
            let data = '';
            fallbackRes.on('data', (chunk) => (data += chunk));
            fallbackRes.on('end', () => resolve(data));
          } else {
            reject(new Error(`Spec '${brand}' not found (HTTP ${res.statusCode})`));
          }
        }).on('error', reject);
      }
    }).on('error', reject);
  });
}

function getLocalSpec(brand) {
  const possibleNames = [
    `${brand}.md`,
    `${brand.replace(/\.app$/, '')}.md`,
    `${brand}.app.md`,
  ];

  for (const name of possibleNames) {
    const fullPath = path.join(LOCAL_SPECS_DIR, name);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }
  }
  return null;
}

async function handleAdd(brand) {
  if (!brand) {
    console.error(`${COLORS.red}Error: Please specify a brand name.${COLORS.reset}`);
    console.log(`Example: ${COLORS.amber}npx tastekit add linear${COLORS.reset}`);
    process.exit(1);
  }

  const normalizedBrand = brand.toLowerCase().trim();
  console.log(`${COLORS.gray}Fetching DESIGN.md specification for '${normalizedBrand}'...${COLORS.reset}`);

  let specContent = getLocalSpec(normalizedBrand);

  if (!specContent) {
    try {
      specContent = await fetchRemoteSpec(normalizedBrand);
    } catch (err) {
      console.error(`${COLORS.red}Failed to retrieve spec '${brand}': ${err.message}${COLORS.reset}`);
      console.log(`Run ${COLORS.amber}npx tastekit list${COLORS.reset} to see all 75+ available specifications.`);
      process.exit(1);
    }
  }

  const targetPath = path.resolve(process.cwd(), 'DESIGN.md');
  fs.writeFileSync(targetPath, specContent, 'utf8');

  console.log(`
${COLORS.green}✔ Successfully created DESIGN.md!${COLORS.reset}
${COLORS.gray}Location:${COLORS.reset} ${targetPath}

${COLORS.bright}Next steps for your AI Coding Agent:${COLORS.reset}
1. Open ${COLORS.cyan}Cursor${COLORS.reset}, ${COLORS.cyan}Claude Code${COLORS.reset}, ${COLORS.cyan}Antigravity${COLORS.reset}, or ${COLORS.cyan}Codex${COLORS.reset}.
2. Mention ${COLORS.amber}@DESIGN.md${COLORS.reset} in your prompt to enforce strict design tokens & guardrails.
`);
}

function handleList() {
  console.log(`${COLORS.bright}Available TasteKit DESIGN.md Specifications (75+):${COLORS.reset}\n`);

  const brands = [
    'linear', 'stripe', 'apple', 'vercel', 'supabase', 'cursor', 'claude', 'notion', 'raycast',
    'airbnb', 'airtable', 'binance', 'bmw', 'bugatti', 'cal', 'clay', 'clickhouse', 'cohere',
    'coinbase', 'composio', 'dell-1996', 'elevenlabs', 'expo', 'ferrari', 'figma', 'framer',
    'hashicorp', 'hp', 'ibm', 'intercom', 'kraken', 'lamborghini', 'lovable', 'mastercard',
    'meta', 'minimax', 'mintlify', 'miro', 'mistral.ai', 'mongodb', 'nike', 'nintendo-2001',
    'nvidia', 'ollama', 'opencode.ai', 'pinterest', 'playstation', 'posthog', 'renault',
    'replicate', 'resend', 'revolut', 'runwayml', 'sanity', 'sentry', 'shopify', 'slack',
    'spacex', 'spotify', 'starbucks', 'superhuman', 'tesla', 'theverge', 'together.ai',
    'uber', 'vodafone', 'voltagent', 'warp', 'webflow', 'wired', 'wise', 'x.ai', 'zapier'
  ];

  const formatted = brands.map((b) => `  • ${COLORS.amber}${b}${COLORS.reset}`).join('\n');
  console.log(formatted);
  console.log(`\nRun ${COLORS.cyan}npx tastekit add <brand>${COLORS.reset} to inject any spec.`);
}

function handleHelp() {
  printBanner();
  console.log(`${COLORS.bright}Usage:${COLORS.reset}`);
  console.log(`  ${COLORS.amber}npx tastekit add <brand>${COLORS.reset}   Download DESIGN.md for a brand (e.g. linear, apple, stripe)`);
  console.log(`  ${COLORS.amber}npx tastekit list${COLORS.reset}          List all 75+ available specifications`);
  console.log(`  ${COLORS.amber}npx tastekit help${COLORS.reset}          Display help information\n`);
}

async function main() {
  switch (command) {
    case 'add':
      printBanner();
      await handleAdd(target);
      break;
    case 'list':
      printBanner();
      handleList();
      break;
    case 'help':
    case '--help':
    case '-h':
    default:
      handleHelp();
      break;
  }
}

main();
