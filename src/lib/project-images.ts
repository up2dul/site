import type { ImageMetadata } from "astro";

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projects/*.{webp,png,jpg}",
  { eager: true }
);

export function resolveProjectImage(
  filename: string
): ImageMetadata | undefined {
  return modules[`/src/assets/projects/${filename}`]?.default;
}

export function resolveProjectImageSrc(filename: string): string {
  return resolveProjectImage(filename)?.src ?? "";
}
