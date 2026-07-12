import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
  const writings = await getCollection("writings", ({ data }) => !data.draft);
  const sortedWritings = writings.sort(
    (left, right) =>
      right.data.createdAt.getTime() - left.data.createdAt.getTime()
  );

  return rss({
    title: "Abdul Malik — Writings",
    description: "Tutorials, guides, and thoughts on frontend engineering.",
    site: context.site,
    items: sortedWritings.map((writing) => ({
      title: writing.data.title,
      description: writing.data.subtitle,
      pubDate: writing.data.createdAt,
      link: `/writings/${writing.id}/`,
    })),
    customData: [
      `<language>en-us</language>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ].join(""),
  });
}
