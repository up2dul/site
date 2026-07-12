# Revamp 2026 - Site Architecture

## Site Structure

### Pages
- **Home** (`/`): Hero, CTA buttons, work experience timeline, contact info
- **Projects** (`/projects`): List of shipped apps
- **Project Detail** (`/projects/[slug]`): Individual project showcase
- **Writings** (`/writings`): Chronological articles
- **Writing Detail** (`/writings/[slug]`): Individual article
- **CV** (`/cv`): Professional resume page

### Navigation
- Left: Menu links (Home, Projects, Writings)
- Right: Theme switcher (light/dark/system)

### Footer
- Copyright notice
- llms.txt link
- RSS feed link
- GitHub repo link

## Content Models

### Projects Collection
```typescript
{
  title: string
  images: string[]
  technologies: string[]
  accomplishedAt: Date
  overview: string
  purpose: string
  whatIDid: string
  appLink?: string
  repoLink?: string
  draft?: boolean
}
```

### Writings Collection
```typescript
{
  title: string
  subtitle: string
  createdAt: Date
  tags: string[]
  draft?: boolean
}
```

### Work Experience
Hardcoded in component (not a content collection)

## Design System

### UI Framework
- **Coss UI** aesthetic with **shadcn** components
- Custom styling layer bridges shadcn to Coss design language
- Dark mode: toggle with system preference

### Typography
- **Lora** (serif): All headings
- **Inter** (sans-serif): Body text, UI elements
- **Geist Mono** (monospace): Code blocks in writings

### Animations
- **Motion** (formerly Framer Motion) for all animations
- Declarative API for complex sequences

## Deployment & SEO
- **Cloudflare Pages** (already configured)
- Sitemap, RSS, LLMs.txt, Open Graph (already configured via astro.config.mjs)

## File Structure
```
/
├── CONTEXT.md (domain glossary)
├── docs/adr/ (architectural decisions)
├── src/
│   ├── content/
│   │   ├── projects/ (shipped apps)
│   │   └── writings/ (articles)
│   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── ui/ (coss + shadcn)
│   └── pages/
└── AGENTS.md (skill configuration)
```

## Status
- [x] Codebase setup complete
- [x] Domain model defined
- [x] Design system decided
- [x] Content schemas updated
- [ ] Implementation (next phase)
