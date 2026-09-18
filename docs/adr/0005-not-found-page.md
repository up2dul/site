# Not Found page: dedicated `404.astro` page served by Cloudflare Workers

We serve a custom Not Found page from `src/pages/404.astro`, which Astro emits as a top-level `404.html` in the build output.

**Why this matters**: Cloudflare Workers Static Assets requires its not-found behavior to be configured explicitly. The `assets.not_found_handling` setting in `wrangler.jsonc` is set to `404-page`, so an unmatched route is served from the nearest `404.html` with a `404` status. Before this ADR, visiting `up2dul.dev/non-existent` returned the home page's HTML — the URL didn't change because it was a rewrite, not a redirect.

**Consequences**: Both `src/pages/404.astro` and the `assets.not_found_handling` setting are load-bearing for the deployment. No Cloudflare dashboard configuration is required for the custom 404 response.
