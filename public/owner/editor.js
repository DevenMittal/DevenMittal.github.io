/* Owner controls are an interface. The service verifies identity on every write. */
(async () => {
  if (!new URLSearchParams(location.search).has('owner')) return;
  const css = document.createElement('link'); css.rel='stylesheet'; css.href='/owner/editor.css'; document.head.append(css);
  const config = await fetch('/owner/config.json').then(r=>r.json());
  const fragment = new URLSearchParams(location.hash.slice(1));
  if(fragment.has('owner_session')) { sessionStorage.setItem('owner-session',fragment.get('owner_session')); history.replaceState(null,'',location.pathname+location.search); }
  const data = await fetch('/owner-content.json').then(r=>r.json());
  const bar = document.createElement('div');bar.className='owner-bar';document.body.prepend(bar);
  const status=document.createElement('span');status.textContent='Owner mode · Changes are published through GitHub.';bar.append(status);
  const button=(text,fn,parent)=>{const b=document.createElement('button');b.type='button';b.className='owner-button';b.textContent=text;b.onclick=fn;parent.append(b);return b;};
  const session=()=>sessionStorage.getItem('owner-session');
  button('Sign in with GitHub',()=>{
    if(!config.serviceUrl){status.textContent='GitHub sign-in is awaiting the authentication service setup. You can explore and save drafts locally.';return;}
    location.href=config.serviceUrl+'/login';
  },bar);
  button('Exit',()=>{sessionStorage.removeItem('owner-session');location.href=location.pathname;},bar);
  document.querySelectorAll('a[href^="/"]').forEach(a=>{const u=new URL(a.href);if(u.origin===location.origin&&!u.pathname.startsWith('/owner/')){u.searchParams.set('owner','1');a.href=u.href;}});
  async function api(path,body){
    if(!config.serviceUrl||!session())throw Error('Sign in with GitHub before publishing. Your draft is still saved in this browser.');
    const r=await fetch(config.serviceUrl+path,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${session()}`,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})});
    const v=await r.json();if(!r.ok)throw Error(v.error||'Request failed');return v;
  }
  if(session())try{await api('/session');status.textContent='Signed in as DevenMittal · Ready to edit.';}catch{sessionStorage.removeItem('owner-session');status.textContent='Session expired. Sign in again to publish.';}
  function edit(title,key,value,onPublish){
    const dialog=document.createElement('dialog');dialog.className='owner-dialog';
    const heading=document.createElement('h2');heading.textContent=title;dialog.append(heading);
    const form=document.createElement('form');dialog.append(form);
    let draft=structuredClone(value);try{draft=JSON.parse(localStorage.getItem('owner-draft:'+key))??draft;}catch{}
    const render=(obj,parent)=>Object.keys(obj).forEach(k=>{
      if(Array.isArray(obj[k])&&obj[k].some(v=>typeof v==='object'))return;
      const label=document.createElement('label');label.textContent=k==='body'?'Writeup (Markdown)':k.replace(/([A-Z])/g,' $1');
      const choices=k==='kind'?['note','post']:k==='status'?['in-progress','complete']:null;
      const input=document.createElement(choices?'select':k==='body'||k==='bio'||k==='description'||k==='summary'?'textarea':'input');
      if(choices)for(const choice of choices){const option=document.createElement('option');option.value=choice;option.textContent=choice;input.append(option);}
      if(k==='date')input.type='date';if(k==='month')input.type='month';
      if(typeof obj[k]==='boolean'){input.type='checkbox';input.checked=obj[k];}else input.value=Array.isArray(obj[k])?obj[k].join(', '):String(obj[k]??'');
      input.oninput=()=>{obj[k]=typeof obj[k]==='boolean'?input.checked:Array.isArray(obj[k])?input.value.split(',').map(x=>x.trim()).filter(Boolean):input.value;localStorage.setItem('owner-draft:'+key,JSON.stringify(draft));};
      label.append(input);parent.append(label);
    });
    render(draft,form);
    const note=document.createElement('p');note.className='owner-status';note.setAttribute('role','status');
    const publish=button('Publish changes',async()=>{publish.disabled=true;try{await onPublish(draft);localStorage.removeItem('owner-draft:'+key);note.textContent='Saved to GitHub. The website is rebuilding. Refresh after deployment finishes.';}catch(e){note.textContent=e.message;}finally{publish.disabled=false;}},form);
    button('Close',()=>dialog.close(),form);form.append(note);document.body.append(dialog);dialog.addEventListener('close',()=>dialog.remove());dialog.showModal();
  }
  async function saveSection(key,value){await api('/section',{key,value});}
  const controls=(node)=>{const row=document.createElement('div');row.className='owner-actions';node.append(row);return row;};
  const siteRow=controls(document.querySelector('.personal-header'));
  button('Edit profile & links',()=>edit('Profile & links','site',data.site,v=>saveSection('site',v)),siteRow);
  const about=document.querySelector('.about-copy');if(about)button('Edit about',()=>edit('About','site',data.site,v=>saveSection('site',v)),controls(about.parentElement));
  function list(key,selector){
    const nodes=[...document.querySelectorAll(selector)];
    data[key].forEach((item,index)=>{if(!nodes[index])return;button('Edit',()=>edit('Edit entry',key+index,item,async v=>{const next=structuredClone(data[key]);next[index]=v;await saveSection(key,next);data[key]=next;}),controls(nodes[index]));});
    const parent=nodes[0]?.parentElement;if(parent)button('Add entry',()=>{const blank=Object.fromEntries(Object.entries(data[key][0]).map(([k,v])=>[k,Array.isArray(v)?[]:'']));edit('Add entry',key+'new',blank,async v=>{await saveSection(key,[...data[key],v]);});},controls(parent.parentElement));
  }
  list('experience','#experience-title + .experience-list > li');
  list('archive','.archive-list > li');
  const education=document.querySelector('.education-entry');if(education)button('Edit education',()=>edit('Education','education',data.education,v=>saveSection('education',v)),controls(education));
  const teaching=document.querySelector('#teaching-title')?.parentElement;
  if(teaching){const entries=teaching.querySelectorAll('.experience-list > li');[...data.teaching,...data.community].forEach((item,i)=>{const key=i<data.teaching.length?'teaching':'community';const index=key==='teaching'?i:i-data.teaching.length;button('Edit',()=>edit('Teaching & community',key+index,item,async v=>{const next=structuredClone(data[key]);next[index]=v;await saveSection(key,next);data[key]=next;}),controls(entries[i]));});}
  function post(collection,entry){
    const today=new Date().toLocaleDateString('en-CA');
    const defaults=collection==='reading'?{title:'',date:today,kind:'note',summary:'',paper:'',placeholder:false}:{title:'',month:today.slice(0,7),status:'in-progress',summary:'',tags:[],repo:'',writeup:''};
    const v={slug:entry?.id??'',...(entry?.data??defaults),body:entry?.body??''};if(v.date)v.date=String(v.date).slice(0,10);
    edit(entry?'Edit post':'New post',collection+(entry?.id??'new'),v,async value=>{
      const slug=value.slug||value.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw Error('Use lowercase words separated by hyphens for the slug.');
      if(entry&&slug!==entry.id)throw Error('Keep the existing slug to preserve this post’s URL.');
      const {body,slug:_,...meta}=value;
      const content='---\n'+Object.entries(meta).map(([k,v])=>k+': '+JSON.stringify(v)).join('\n')+'\n---\n\n'+body+'\n';
      await api('/post',{collection,slug,content,create:!entry});
    });
  }
  for(const collection of ['reading','builds']){
    const label=document.querySelector(collection==='reading'?'#reading-title':'#builds-title');
    if(label)button(collection==='reading'?'New reading post':'New monthly build',()=>post(collection),controls(label.parentElement));
    if(location.pathname===`/${collection}/`)button('New post',()=>post(collection),controls(document.querySelector('.page-heading')));
    const edited=new Set();
    for(const a of document.querySelectorAll(`main a[href*="/${collection}/"]`)){
      const slug=new URL(a.href).pathname.split('/')[2];const entry=data[collection].find(e=>e.id===slug);if(entry&&!edited.has(slug)){edited.add(slug);button('Edit post',()=>post(collection,entry),controls(a.closest('article')??a.parentElement));}
    }
    const entry=data[collection].find(e=>location.pathname===`/${collection}/${e.id}/`);if(entry)button('Edit post',()=>post(collection,entry),controls(document.querySelector('.article-heading')));
  }
})();
