"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

function resolveThemeSafe(theme: Theme): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return resolveTheme(theme);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps): React.ReactElement {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
    resolveThemeSafe(defaultTheme)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? defaultTheme;
    setThemeState(initial);
    setResolvedTheme(resolveThemeSafe(initial));
    setMounted(true);
  }, [defaultTheme]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const resolved = resolveThemeSafe(theme);
    setResolvedTheme(resolved);

    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const resolved = resolveThemeSafe("system");
      setResolvedTheme(resolved);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(resolved);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
