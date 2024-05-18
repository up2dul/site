import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const writings = await getCollection('writings');

  return rss({
    // `<title>` field in output xml
    title: 'Abdul Malik',
    // `<description>` field in output xml
    description:
      'A digital garden (personal website) by Abdul Malik, a Frontend Web Developer based in Indonesia',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site as URL,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: writings.map((writing) => ({
      title: writing.data.title,
      pubDate: writing.data.createdAt,
      description: writing.data.subtitle,
      link: `/writings/${writing.slug}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
