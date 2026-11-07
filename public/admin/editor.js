const fields = ['section','title','date','slug','summary','kind','status','paper','repo','writeup','tags','body'];
const el = id => document.getElementById(id);
const key = 'deven-writing-draft-v1';
el('date').value = new Date().toLocaleDateString('en-CA');
try { const saved = JSON.parse(localStorage.getItem(key)); for (const id of fields) if (saved?.[id] !== undefined) el(id).value = saved[id]; } catch {}
const quote = value => JSON.stringify(value);
function markdown() {
  const v = Object.fromEntries(fields.map(id => [id, el(id).value]));
  const meta = [`title: ${quote(v.title)}`];
  if (v.section === 'reading') meta.push(`date: ${v.date}`, `kind: ${quote(v.kind)}`, `summary: ${quote(v.summary)}`, `paper: ${quote(v.paper)}`, 'placeholder: false');
  else meta.push(`month: ${quote(v.date.slice(0,7))}`, `status: ${quote(v.status)}`, `summary: ${quote(v.summary)}`, `tags: ${JSON.stringify(v.tags.split(',').map(x=>x.trim()).filter(Boolean))}`, `repo: ${quote(v.repo)}`, `writeup: ${quote(v.writeup)}`);
  return `---\n${meta.join('\n')}\n---\n\n${v.body}\n`;
}
function update() {
  const build = el('section').value === 'builds';
  for (const id of ['status','repo','writeup','tags']) el(`${id}-label`).hidden = !build;
  for (const id of ['kind','paper']) el(`${id}-label`).hidden = build;
  el('preview').textContent = markdown();
  try {localStorage.setItem(key,JSON.stringify(Object.fromEntries(fields.map(id=>[id,el(id).value]))));} catch {}
}
el('title').addEventListener('input',()=>{el('slug').value=el('title').value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');});
el('editor').addEventListener('input',update);
el('editor').addEventListener('submit',event=>{
  event.preventDefault();
  const path = `src/content/${el('section').value}/${el('slug').value}.md`;
  const url = new URL('https://github.com/DevenMittal/DevenMittal.github.io/new/main');
  url.searchParams.set('filename',path); url.searchParams.set('value',markdown());
  if(url.href.length>12000){el('message').textContent='This post is too long for a prefilled GitHub link. Download the Markdown and upload it to the content folder on GitHub.';return;}
  window.open(url.href,'_blank','noopener,noreferrer');
  el('message').textContent='Review the file on GitHub, then choose Commit changes to publish. Your draft stays here.';
});
el('download').addEventListener('click',()=>{
  if(!el('editor').reportValidity())return;
  const url=URL.createObjectURL(new Blob([markdown()],{type:'text/markdown'}));
  const a=document.createElement('a');a.href=url;a.download=`${el('slug').value}.md`;a.click();URL.revokeObjectURL(url);
});
update();
