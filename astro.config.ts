import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://up2dul.dev',
  integrations: [
    tailwind(),
    sitemap(),
    icon({
      include: {
        tabler: ['*'],
      },
    }),
  ],
});
