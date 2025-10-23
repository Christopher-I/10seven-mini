# Design Data Documentation

## Overview

This directory contains the Figma design data and extracted design tokens for Fund Your Future platform.

## Files

### `figma_data.json`
- **Source:** Figma REST API
- **Size:** ~3.8MB
- **Contains:** Complete Figma file structure including all frames, components, styles, and metadata
- **Usage:** Reference for detailed design specifications during implementation

### `design-tokens.json` (Generated)
- **Source:** Extracted from `figma_data.json`
- **Contains:** Processed design tokens (colors, typography, spacing, patterns)
- **Usage:** Direct import into components and style systems

### `tailwind-tokens.json` (Generated)
- **Source:** Converted from `design-tokens.json`
- **Contains:** Tailwind CSS configuration object
- **Usage:** Import into `tailwind.config.js`

## Scripts

### Extract Design Tokens
```bash
# Run the extraction script
node scripts/extract-design-tokens.js
```

This script will:
1. Read `figma_data.json`
2. Extract colors, typography, spacing, and component patterns
3. Generate `design-tokens.json`
4. Generate `tailwind-tokens.json` for Tailwind CSS integration

## Usage During Implementation

### 1. Color System
```javascript
// Import extracted colors
import designTokens from '../data/design/design-tokens.json';

const colors = designTokens.colors;
// colors.purple[0].hex // Primary purple
// colors.blue[0].hex   // Primary blue
```

### 2. Typography Scale
```javascript
import designTokens from '../data/design/design-tokens.json';

const typography = designTokens.typography;
// typography[0].fontFamily // Most used font
// typography[0].fontSize   // Most used size
```

### 3. Tailwind Integration
```javascript
// tailwind.config.js
import tailwindTokens from './data/design/tailwind-tokens.json';

export default {
  theme: {
    extend: {
      colors: tailwindTokens.colors,
      fontFamily: tailwindTokens.fontFamily,
      fontSize: tailwindTokens.fontSize,
      spacing: tailwindTokens.spacing
    }
  }
}
```

### 4. Component Reference
```javascript
import designTokens from '../data/design/design-tokens.json';

// Find component patterns
const modulePatterns = designTokens.patterns.filter(p => p.isModule);
const buttonPatterns = designTokens.patterns.filter(p => p.hasButton);
```

## Visual References

Combined with SVG files in `/public/Design/`, this data provides:

1. **Pixel-perfect specifications** from JSON
2. **Visual context** from SVG files
3. **Automated token extraction** for consistent implementation

## Data Security

- ✅ **Safe to commit:** JSON contains only design data, no API keys
- ✅ **Local access:** No need to re-fetch from Figma API
- ✅ **Version controlled:** Track design changes over time

## Updating Design Data

To refresh design data from Figma:

1. **Manual refresh:**
   ```bash
   curl -H "X-FIGMA-TOKEN: $FIGMA_API_TOKEN" \
     "https://api.figma.com/v1/files/$FIGMA_FILE_KEY" > data/design/figma_data.json
   ```

2. **Re-extract tokens:**
   ```bash
   node scripts/extract-design-tokens.js
   ```

3. **Commit updates:**
   ```bash
   git add data/design/
   git commit -m "Update design tokens from Figma"
   ```

## Development Workflow

1. **Reference SVGs** for visual layout (`/public/Design/--{number}.svg`)
2. **Use JSON data** for exact measurements and colors
3. **Import design tokens** for consistent theming
4. **Extract patterns** for component architecture

## Next Steps

1. Run the extraction script to generate tokens
2. Integrate tokens into Tailwind configuration
3. Create component library based on extracted patterns
4. Reference during Phase 1 implementation

---

*Last updated: 2024-09-23*
*Design source: Figma file S3PlBzGn0FbLJiBI5OZLD6*