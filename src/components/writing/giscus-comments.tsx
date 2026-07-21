import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

export function GiscusComments() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      const stored = localStorage.getItem("theme");
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (stored === "dark") return "dark";
      if (stored === "light") return "light";
      return systemDark ? "dark" : "light";
    };

    setTheme(updateTheme());

    const observer = new MutationObserver(() => {
      setTheme(updateTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleStorage = () => {
      setTheme(updateTheme());
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <Giscus
      id="comments"
      repo="up2dul/site"
      repoId="R_kgDOLrZumQ"
      category="General"
      categoryId="DIC_kwDOLrZumc4DBn0_"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  );
}
