import type { InferEntrySchema, RenderedContent } from 'astro:content';

export type Writing = {
  id: string;
  body?: string;
  collection: 'writings';
  data: InferEntrySchema<'writings'>;
  rendered?: RenderedContent;
  filePath?: string;
};
