import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // TODO: Set this to https://YOUR_GITHUB_USERNAME.github.io before deployment.
  site: 'https://example.com',
  // TODO: Use /YOUR_REPOSITORY for a project site, or / for a user site.
  base: '/',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
