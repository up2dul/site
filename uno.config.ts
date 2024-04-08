import { defineConfig, presetUno, presetWind } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      light: '#f2f1ec',
      dark: '#171717',
    },
  },
  presets: [presetUno(), presetWind()],
});
