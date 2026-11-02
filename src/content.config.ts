import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Empty link fields are intentional placeholders, never fake destinations.
const optionalLink = z.union([z.string().url(), z.literal('')]).default('');

const builds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/builds' }),
  schema: z.object({
    title: z.string(),
    month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
    status: z.enum(['in-progress', 'complete']),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    repo: optionalLink,
    writeup: optionalLink,
  }),
});

const reading = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reading' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['note', 'post']),
    summary: z.string(),
    paper: optionalLink,
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { builds, reading };
