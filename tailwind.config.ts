import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Newsreader', 'serif'],
    },
    textColor: {
      main: 'rgb(var(--color-text-main) / <alpha-value>)',
    },
    backgroundColor: {
      main: 'rgb(var(--color-bg-main) / <alpha-value>)',
      muted: 'rgb(var(--color-bg-muted) / <alpha-value>)',
    },
    borderColor: {
      main: 'rgb(var(--color-border-main) / <alpha-value>)',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
