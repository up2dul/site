# Not Found page: dedicated `404.astro` page relied on by Cloudflare Pages

We serve a custom Not Found page from `src/pages/404.astro`, which Astro emits as a top-level `404.html` in the build output.

**Why this matters**: Cloudflare Pages does not serve a 404 for unmatched routes. If the project has no top-level `404.html`, Pages assumes a single-page application and serves `index.html` (the home page) for every unmatched URL, with a `200` status and the original URL preserved. Before this ADR, visiting `up2dul.dev/non-existent` returned the home page's HTML — the URL didn't change because it was a rewrite, not a redirect.

**Consequences**: The `404.html` file is load-bearing for the deployment. Removing `src/pages/404.astro` silently reverts to the SPA fallback behavior. No Cloudflare dashboard configuration is required — the file alone triggers Pages' 404 behavior.
