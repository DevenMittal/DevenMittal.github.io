# Owner publishing service

The public Astro site remains on GitHub Pages. This Worker handles GitHub sign-in and writes only website content in DevenMittal/DevenMittal.github.io. Every authenticated request checks that GitHub identifies the caller as DevenMittal. Sessions expire after one hour. No GitHub token or client secret belongs in the public repository.

## Setup

1. Deploy worker.mjs as a Cloudflare Worker using the free plan. The configuration is in wrangler.toml. No runtime dependency is required.
2. Register a GitHub App with the website URL https://devenmittal.github.io and callback URL https://YOUR-WORKER.workers.dev/callback. Keep user token expiration enabled. Sessions expire after one hour and require signing in again. Request only repository Contents: read and write and Metadata: read. Install it on DevenMittal.github.io only. Do not enable device flow or webhooks.
3. Add the app client ID and client secret as GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET Worker secrets. Set SESSION_SECRET to a securely generated random value of at least 32 bytes. These must never be committed.
4. Set serviceUrl in public/owner/config.json to the Worker HTTPS origin and deploy the site.
5. Visit /?owner=1. Sign in, approve the app, edit a section, and publish. GitHub Actions rebuilds the public website.

Owner mode is a public interface with authenticated publishing. Browser drafts are local to the device. The encrypted session ticket is stored in sessionStorage, never in the repository. Signing out removes the local ticket; tickets expire within an hour. Content in the public repository, including committed drafts, is public. Use local drafts for unpublished private text.

## Current limitations

Editor forms support profile, experience, education, teaching/community entries, archive entries, reading notes, and Monthly Builds. Post bodies use Markdown. Image uploads, rich rendered previews, unpublishing, and drag-to-reorder are not implemented yet. Content changes take effect after the GitHub build completes. Conflicts from external edits are not yet merged; avoid editing the same content in multiple browser tabs.
