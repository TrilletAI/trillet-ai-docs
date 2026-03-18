# Jamdesk Starter Template

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

The official starter template for [Jamdesk](https://jamdesk.com) documentation sites. Clone this repository to create beautiful, professional documentation in minutes.

**[Documentation](https://jamdesk.com/docs)** · **[Get Started](https://jamdesk.com/docs/quickstart)** · **[Dashboard](https://dashboard.jamdesk.com)**

## What is Jamdesk?

[Jamdesk](https://jamdesk.com) is a modern documentation platform that transforms MDX (Markdown + React components) into polished, production-ready documentation websites.

**Why teams choose Jamdesk:**
- **Write in MDX** - Markdown with React components for interactive docs
- **Deploy instantly** - Push to GitHub, deploy globally in seconds
- **Professional themes** - Three built-in themes (Jam, Nebula, Pulsar)
- **AI-ready** - Auto-generates `llms.txt` for ChatGPT, Claude, Copilot
- **Built-in search** - AI-powered search out of the box
- **Analytics included** - Track page views and search queries

## What's Included

This starter template includes everything you need to get started:

```
starter-docs/
├── docs.json              # Site configuration (theme, colors, navigation)
├── introduction.mdx       # Welcome page
├── quickstart.mdx         # Getting started guide
├── components/            # Component examples
│   ├── callouts.mdx       # Notes, warnings, tips
│   ├── cards.mdx          # Card layouts
│   ├── steps.mdx          # Step-by-step guides
│   └── tabs-and-accordions.mdx
└── writing/               # Content writing guides
    ├── code-blocks.mdx    # Syntax highlighting
    ├── components.mdx     # Using MDX components
    └── pages.mdx          # Page structure
```

**Theme:** This template uses the **Jam** theme - a clean, modern design with purple accent colors. [See all themes →](https://jamdesk.com/docs/customization/theming)

## Quick Start

### Option 1: Use the Dashboard (Recommended)

1. Sign up at [dashboard.jamdesk.com](https://dashboard.jamdesk.com)
2. Create a new project and select "Starter Template"
3. Connect your GitHub repository
4. Start editing - changes deploy automatically

### Option 2: Use This Template

Click the green **"Use this template"** button at the top of this page to create your own repository based on this starter.

### Option 3: Clone and Deploy

```bash
# Clone this template
git clone https://github.com/jamdesk/starter-docs.git my-docs
cd my-docs

# Preview locally (requires Jamdesk CLI)
npm install -g jamdesk
jamdesk dev

# Open http://localhost:3000
```

Then connect your repository to Jamdesk via the [dashboard](https://dashboard.jamdesk.com).

## Customization

### Change Theme Colors

Edit `docs.json` to customize your brand colors:

```json
{
  "colors": {
    "primary": "#6366F1",
    "light": "#818CF8",
    "dark": "#4F46E5"
  }
}
```

### Switch Themes

Change the theme in `docs.json`:

```json
{
  "theme": "jam"      // Options: "jam", "nebula", "pulsar"
}
```

### Add Your Logo

```json
{
  "logo": {
    "light": "/images/logo-light.svg",
    "dark": "/images/logo-dark.svg"
  }
}
```

## Writing Content

All content is written in MDX - Markdown with React components:

```mdx
---
title: My Page
description: A brief description for SEO
---

# Welcome

This is regular Markdown with **bold** and *italic* text.

<Note>
  This is a callout component for important information.
</Note>

<Steps>
  <Step title="First">Do this first</Step>
  <Step title="Second">Then do this</Step>
</Steps>
```

**Available components:** Cards, Tabs, Accordions, Steps, Callouts, Code Groups, and [25+ more →](https://jamdesk.com/docs/components/overview)

## Local Development

Preview your docs locally with hot reload:

```bash
# Install the CLI (choose one)
npm install -g jamdesk          # via npm
brew install jamdesk/tap/jamdesk # via Homebrew

# Start the dev server
jamdesk dev

# Validate your docs
jamdesk validate

# Check for broken links
jamdesk broken-links
```

## Documentation

- [Jamdesk Documentation](https://jamdesk.com/docs) - Full platform docs
- [Quickstart Guide](https://jamdesk.com/docs/quickstart) - Get started in 5 minutes
- [MDX Basics](https://jamdesk.com/docs/content/mdx-basics) - Writing content
- [Components](https://jamdesk.com/docs/components/overview) - All available components
- [Theming](https://jamdesk.com/docs/customization/theming) - Customize your site
- [docs.json Reference](https://jamdesk.com/docs/config/docs-json-reference) - Full configuration options

## Deploy

Jamdesk handles deployment automatically:

1. Push changes to your connected GitHub repository
2. Jamdesk builds your site (typically under 30 seconds)
3. Your docs are live on your custom domain or `yoursite.jamdesk.app`

No build configuration required. No CI/CD setup needed.

## Support

- **Documentation:** [jamdesk.com/docs](https://jamdesk.com/docs)
- **Help Center:** [jamdesk.com/docs/help](https://jamdesk.com/docs/help/faq)
- **Issues:** [github.com/jamdesk/starter-docs/issues](https://github.com/jamdesk/starter-docs/issues)

## License

MIT - Use this template for any project, commercial or personal.

---

Built with [Jamdesk](https://jamdesk.com) - Beautiful documentation that developers actually love.
