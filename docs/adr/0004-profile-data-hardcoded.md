# Profile data: hardcoded in pages, not in content collection

Professional experience, education, skills, and contact information remain hardcoded in page components rather than being extracted to a content collection.

**Why hardcoded**: The data is simple, rarely changes, and the duplication between the home page (summary) and CV page (detailed) is acceptable. Adding a content collection introduces schema complexity, build-time processing, and an abstraction layer that doesn't provide proportional benefit.

**Trade-offs considered**:
- Content collection with Zod schema: More structured, but adds complexity for rarely-changing data
- Single source of truth: Prevents drift between pages, but requires managing schema variations (summary vs. detailed descriptions)
- JSON/YAML data files: Simpler than content collections, but still adds an abstraction layer

**Consequences**: Experience data exists in two places (home-page.astro and cv.astro). Updates require editing both files. This is acceptable because the data changes infrequently and the duplication is manageable. Future architecture reviews should not re-suggest extracting this to a content collection unless the data grows significantly or changes frequently.
