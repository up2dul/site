# Personal Site

Abdul Malik's public presence — information, contact, projects, and writings about frontend engineering.

## Language

**Personal site**:
Abdul's public website at up2dul.dev. A personal site showcasing work, writings, and professional background.
_Avoid_: Portfolio, blog, homepage, digital garden

**Writings**:
Chronological articles published as tutorials and guides. Listed in reverse-chronological order. Filter by tag will be added when content grows. Long-form reading experience with table of contents and comment/discussion section.
_Avoid_: Posts, articles, blog posts, notes, garden

**Projects**:
Shipped product applications (mobile or web apps). Each has a detail page with images, technologies, and a markdown body describing the project. Showcase-only presentation — no reading-enhancement features like table of contents or comments.
_Avoid_: Portfolio items, case studies, experiments, open source

**CV**:
A separate page displaying professional resume. Rendered as HTML, not a PDF download.
_Avoid_: Resume, curriculum vitae

**Now**:
A curated snapshot of Abdul's current activities — studying, learning, working on, or reading. Updated manually when significant changes occur.
_Avoid_: Status, updates, timeline, log

**Table of Contents**:
A sticky sidebar navigation on Writing detail pages, built at build time from the Markdown AST. Shows H2 and H3 headings with active-section tracking on scroll. Positioned outside the main content column, sticky to the viewport right side. On mobile, appears inline between the title block and the article body, always expanded. Long headings wrap to multiple lines. If no headings exist, displays "No sections". H3 headings are indented under H2s. Active heading is highlighted with colored text. Clicking a heading updates the URL hash and supports browser back/forward navigation. Scroll offset accounts for header height.
_Avoid_: Sidebar nav, outline, anchor links

**TIL**:
Short for "Today I Learned" — brief, standalone notes about something recently discovered or understood. Listed in reverse-chronological order at `/til`. Minimal reading experience: no table of contents, no discussion section. Content is body text only with a title and date. Date includes the full day. Each entry is independent; no migration path to or from Writings.
_Avoid_: Notes, snippets, quick posts, micro-blog

**Discussion**:
A Giscus-powered comment section at the bottom of Writing detail pages, placed outside the article element with spacing/separator. Backed by GitHub Discussions on the up2dul/site repo. Uses pathname mapping and follows the site's light/dark theme automatically via React component with theme sync.
_Avoid_: Comments, feedback, chat

**Not Found page**:
A page shown when a visitor lands on a URL that doesn't exist on the site. Displays a "404" status heading with guidance and links back to Home, Writings, and Projects. Served by Cloudflare Pages from the top-level `404.html` file.
_Avoid_: 404 page, error page, missing page
