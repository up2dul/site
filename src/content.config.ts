import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    images: z.array(z.string()),
    technologies: z.array(z.string()),
    accomplishedAt: z.coerce.date(),
    appLink: z.url().optional(),
    repoLink: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writings" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    createdAt: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const til = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/til" }),
  schema: z.object({
    title: z.string(),
    createdAt: z.coerce.date(),
  }),
});

export const collections = { projects, writings, til };
