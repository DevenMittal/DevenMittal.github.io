import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';
const env={GITHUB_CLIENT_ID:'test-client',GITHUB_CLIENT_SECRET:'test-secret',SESSION_SECRET:'test-session-secret-which-is-not-a-real-secret'};
test('unconfigured service fails closed',async()=>{
  const r=await worker.fetch(new Request('https://editor.example/session'),{});
  assert.equal(r.status,503);
});
test('missing auth cannot publish',async()=>{
  const r=await worker.fetch(new Request('https://editor.example/section',{method:'POST',headers:{Origin:'https://devenmittal.github.io','Content-Type':'application/json'},body:'{}'}),env);
  assert.equal(r.status,401);
});
test('unexpected origins cannot call API',async()=>{
  const r=await worker.fetch(new Request('https://editor.example/section',{method:'POST',headers:{Origin:'https://another.example'},body:'{}'}),env);
  assert.equal(r.status,403);
});
test('login redirects to GitHub and sets protected state cookie',async()=>{
  const r=await worker.fetch(new Request('https://editor.example/login'),env);
  assert.equal(r.status,302);
  assert.equal(new URL(r.headers.get('Location')).hostname,'github.com');
  assert.match(r.headers.get('Set-Cookie'),/HttpOnly; Secure; SameSite=Lax/);
});
test('callback without state cookie cannot authenticate',async()=>{
  const r=await worker.fetch(new Request('https://editor.example/callback?code=fake&state=fake'),env);
  assert.equal(r.status,400);
});
