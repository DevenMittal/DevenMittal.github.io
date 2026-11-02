import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://devenmittal.github.io',
  base: '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
