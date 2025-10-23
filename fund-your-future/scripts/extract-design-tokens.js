#!/usr/bin/env node

/**
 * Extract Design Tokens from Figma JSON Data
 *
 * This script processes the stored Figma JSON data and extracts:
 * - Color palette
 * - Typography scales
 * - Spacing systems
 * - Component patterns
 *
 * Usage: node scripts/extract-design-tokens.js
 */

const fs = require('fs');
const path = require('path');

const FIGMA_DATA_PATH = path.join(__dirname, '../data/design/figma_data.json');
const OUTPUT_DIR = path.join(__dirname, '../data/design');

function loadFigmaData() {
  try {
    const data = fs.readFileSync(FIGMA_DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading Figma data:', error.message);
    process.exit(1);
  }
}

function extractColors(node, colors = new Map()) {
  if (node.fills) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b, a = 1 } = fill.color;
        const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;

        // Categorize colors
        let category = 'other';
        if (r > 0.9 && g > 0.9 && b > 0.9) category = 'white';
        else if (r < 0.1 && g < 0.1 && b < 0.1) category = 'black';
        else if (r > 0.5 && b > 0.5 && g < 0.5) category = 'purple';
        else if (b > r && b > g) category = 'blue';
        else if (Math.abs(r - g) < 0.1 && Math.abs(g - b) < 0.1) category = 'gray';

        const colorKey = `${category}-${hex}`;
        colors.set(colorKey, {
          hex,
          rgb: { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) },
          hsl: rgbToHsl(r, g, b),
          alpha: a,
          category,
          usage: (colors.get(colorKey)?.usage || 0) + 1
        });
      }
    });
  }

  if (node.children) {
    node.children.forEach(child => extractColors(child, colors));
  }

  return colors;
}

function extractTypography(node, typography = new Map()) {
  if (node.type === 'TEXT' && node.style) {
    const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } = node.style;

    if (fontFamily) {
      const key = `${fontFamily}-${fontSize}-${fontWeight}`;
      typography.set(key, {
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        letterSpacing,
        usage: (typography.get(key)?.usage || 0) + 1,
        sampleText: node.characters?.substring(0, 50) || ''
      });
    }
  }

  if (node.children) {
    node.children.forEach(child => extractTypography(child, typography));
  }

  return typography;
}

function extractSpacing(node, spacing = new Set()) {
  if (node.absoluteBoundingBox) {
    const { width, height } = node.absoluteBoundingBox;
    spacing.add(Math.round(width));
    spacing.add(Math.round(height));
  }

  if (node.constraints) {
    // Extract padding/margin info if available
  }

  if (node.children) {
    node.children.forEach(child => extractSpacing(child, spacing));
  }

  return spacing;
}

function extractComponentPatterns(node, patterns = []) {
  if (node.name && node.type === 'FRAME') {
    const pattern = {
      name: node.name,
      type: node.type,
      size: node.absoluteBoundingBox,
      hasText: containsText(node),
      hasButton: node.name.toLowerCase().includes('button'),
      hasInput: node.name.toLowerCase().includes('input'),
      isModule: node.name.toLowerCase().includes('module'),
      isUnit: node.name.toLowerCase().includes('unit'),
      childCount: node.children?.length || 0
    };

    patterns.push(pattern);
  }

  if (node.children) {
    node.children.forEach(child => extractComponentPatterns(child, patterns));
  }

  return patterns;
}

function containsText(node) {
  if (node.type === 'TEXT') return true;
  if (node.children) {
    return node.children.some(child => containsText(child));
  }
  return false;
}

function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function generateDesignTokens() {
  console.log('🎨 Extracting design tokens from Figma data...');

  const figmaData = loadFigmaData();
  const mainPage = figmaData.document.children[0]; // 'for workshop' page

  console.log(`📊 Analyzing ${mainPage.children.length} frames...`);

  // Extract data
  const colors = extractColors(mainPage);
  const typography = extractTypography(mainPage);
  const spacing = extractSpacing(mainPage);
  const patterns = extractComponentPatterns(mainPage);

  // Process and organize data
  const colorsByCategory = {};
  colors.forEach((color, key) => {
    if (!colorsByCategory[color.category]) {
      colorsByCategory[color.category] = [];
    }
    colorsByCategory[color.category].push(color);
  });

  // Sort colors by usage
  Object.keys(colorsByCategory).forEach(category => {
    colorsByCategory[category].sort((a, b) => b.usage - a.usage);
  });

  const typographyArray = Array.from(typography.values())
    .sort((a, b) => b.usage - a.usage);

  const spacingArray = Array.from(spacing)
    .filter(s => s > 0 && s < 1000)
    .sort((a, b) => a - b);

  const designTokens = {
    colors: colorsByCategory,
    typography: typographyArray,
    spacing: spacingArray,
    patterns: patterns,
    metadata: {
      extractedAt: new Date().toISOString(),
      totalFrames: mainPage.children.length,
      totalColors: colors.size,
      totalTypographyVariants: typography.size,
      totalSpacingValues: spacing.size,
      totalPatterns: patterns.length
    }
  };

  // Save tokens
  const tokensPath = path.join(OUTPUT_DIR, 'design-tokens.json');
  fs.writeFileSync(tokensPath, JSON.stringify(designTokens, null, 2));

  console.log('✅ Design tokens extracted successfully!');
  console.log(`📁 Saved to: ${tokensPath}`);
  console.log(`🎨 Found ${colors.size} unique colors`);
  console.log(`📝 Found ${typography.size} typography variants`);
  console.log(`📏 Found ${spacing.size} spacing values`);
  console.log(`🧩 Found ${patterns.length} component patterns`);

  return designTokens;
}

function generateTailwindConfig(tokens) {
  const tailwindColors = {};

  // Convert colors to Tailwind format
  Object.entries(tokens.colors).forEach(([category, colors]) => {
    colors.forEach((color, index) => {
      const weight = index === 0 ? '500' : `${(index + 1) * 100}`;
      if (!tailwindColors[category]) tailwindColors[category] = {};
      tailwindColors[category][weight] = color.hex;
    });
  });

  const tailwindConfig = {
    colors: tailwindColors,
    fontFamily: {
      display: ['Playfair Display', 'serif'],
      heading: ['Oswald', 'sans-serif'],
      primary: ['Red Hat Display', 'sans-serif'],
      body: ['Mulish', 'sans-serif'],
      system: ['SF Pro', 'system-ui']
    },
    fontSize: tokens.typography
      .filter(t => t.fontSize)
      .reduce((acc, t, index) => {
        acc[`size-${index + 1}`] = `${t.fontSize}px`;
        return acc;
      }, {}),
    spacing: tokens.spacing
      .reduce((acc, value, index) => {
        if (value % 4 === 0) { // Stick to 4px grid
          acc[`space-${value}`] = `${value}px`;
        }
        return acc;
      }, {})
  };

  const configPath = path.join(OUTPUT_DIR, 'tailwind-tokens.json');
  fs.writeFileSync(configPath, JSON.stringify(tailwindConfig, null, 2));

  console.log(`🎯 Tailwind config generated: ${configPath}`);

  return tailwindConfig;
}

// Run extraction
if (require.main === module) {
  try {
    const tokens = generateDesignTokens();
    generateTailwindConfig(tokens);
  } catch (error) {
    console.error('❌ Error extracting design tokens:', error);
    process.exit(1);
  }
}