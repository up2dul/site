const DEFAULT_WORDS_PER_MINUTE = 225;

export function calculateReadingTime(
  content: string,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE
): string {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_#~>|`-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}
