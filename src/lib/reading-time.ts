const DEFAULT_WORDS_PER_MINUTE = 225;

export function estimateReadingMinutes(
  content: string | undefined,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE
): number {
  if (!content) return 0;

  const cleanContent = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_#~>|`-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = cleanContent.split(/\s+/).filter(Boolean).length;
  if (wordCount === 0) return 0;

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 0) return "";
  return `${minutes} min read`;
}
