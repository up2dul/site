// Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Define a `type` and `schema` for each collection
const writingsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/writings',
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    createdAt: z.date(),
    tags: z.array(z.string()),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  writings: writingsCollection,
};
