import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
  const posts = await getCollection("writing", ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime()
  );

  return rss({
    title: "Abdul's digital garden",
    description: "Essays and notes from Abdul's digital garden.",
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
    })),
    customData: [
      `<language>en-us</language>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    ].join(""),
  });
}
