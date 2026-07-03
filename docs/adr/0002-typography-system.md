# Typography: Lora headings, Inter body, Geist Mono code

Three-font system:
- **Lora** (serif): All headings (h1-h6)
- **Inter** (sans-serif): Body text, UI elements, everything else
- **Geist Mono** (monospace): Code blocks in Writings detail pages

**Why this mix**: Lora adds warmth and readability to headings, Inter keeps body text clean and modern, Geist Mono provides a contemporary code aesthetic. The serif/sans pairing creates visual hierarchy without being jarring.

**Trade-offs considered**:
- Single font family: Simpler but less visual distinction
- Different serif (Playfair, Merriweather): Lora was chosen for its screen optimization
- Different mono (Fira Code, JetBrains): Geist Mono matches the modern aesthetic better

**Consequences**: Three font files to load, impacting initial page weight. Need to ensure font-display strategy handles loading gracefully.
