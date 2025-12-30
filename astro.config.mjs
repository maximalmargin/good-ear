import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://goodear.shop',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
