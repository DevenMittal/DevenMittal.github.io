import { getCollection } from 'astro:content';
import { site } from '../site';
import { experience, education, archive, teaching, community } from '../data/resume';
export async function GET() {
  const reading = await getCollection('reading');
  const builds = await getCollection('builds');
  return Response.json({ site, experience, education, archive, teaching, community,
    reading: reading.map(e => ({id:e.id, data:e.data, body:e.body})),
    builds: builds.map(e => ({id:e.id, data:e.data, body:e.body})),
  });
}
