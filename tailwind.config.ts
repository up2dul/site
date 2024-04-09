import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Newsreader', 'serif'],
    },
    colors: {
      dark: {
        100: '#171717',
        50: '#5D5D5D',
      },
      light: {
        100: '#F2F1EC',
        50: '#DCD9CC',
      },
      transparent: 'transparent',
    },
    extend: {
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
} satisfies Config;
