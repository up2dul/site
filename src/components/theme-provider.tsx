"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  localStorage.setItem(STORAGE_KEY, theme);

  const themeColor = resolved === "dark" ? "#0a0a0a" : "#ffffff";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", themeColor);
}

export function useTheme() {
  // Deterministic on server AND first client render — no mismatch possible.
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme((localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setThemeAndApply = (next: Theme) => {
    applyTheme(next);
    setTheme(next);
  };

  return {
    theme,
    resolvedTheme: mounted ? resolveTheme(theme) : "light",
    setTheme: setThemeAndApply,
    mounted, // expose this so the switcher can hide/placeholder until safe
  };
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
  return <>{children}</>;
}
