import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: () =>
    z.object({
      title: z.string(),
      images: z.array(z.string()).default([]),
      technologies: z.array(z.string()).default([]),
      accomplishedAt: z.coerce.date(),
      overview: z.string(),
      purpose: z.string(),
      whatIDid: z.string(),
      appLink: z.string().url().optional(),
      repoLink: z.string().url().optional(),
      draft: z.boolean().optional().default(false),
    }),
});

const writings = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writings" }),
  schema: () =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      createdAt: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = { projects, writings };
