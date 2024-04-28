import type { Icon } from 'virtual:astro-icon';

export const site = {
  siteName: 'Abdul Malik',
  siteUrl: 'https://up2dul.dev',
  github: 'https://github.com/up2dul',
  linkedin: 'https://linkedin.com/in/up2dul',
  cv: 'https://read.cv/up2dul',
  email: 'up2dul@gmail.com',
  description:
    'A digital garden (personal website) by Abdul Malik, a Frontend Web Developer based in Indonesia.',
  keywords: ['personal', 'website', 'blog', 'article', 'portfolio'],
};

export const contacts: { name: string; url: string; icon: Icon }[] = [
  {
    name: 'CV',
    url: 'https://read.cv/up2dul',
    icon: 'tabler:file-text',
  },
  {
    name: 'Email',
    url: 'mailto:up2dul@gmail.com',
    icon: 'tabler:mail',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/up2dul',
    icon: 'tabler:brand-github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/up2dul',
    icon: 'tabler:brand-linkedin',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/up2dul',
    icon: 'tabler:brand-telegram',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/up2dul',
    icon: 'tabler:brand-facebook',
  },
];
