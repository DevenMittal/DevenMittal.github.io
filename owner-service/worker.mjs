const repo='DevenMittal/DevenMittal.github.io';
const origin='https://devenmittal.github.io';
const encoder=new TextEncoder();
const b64=bytes=>btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replaceAll('=','');
const unb64=text=>Uint8Array.from(atob(text.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));
async function seal(value,secret){const key=await crypto.subtle.importKey('raw',await crypto.subtle.digest('SHA-256',encoder.encode(secret)),{name:'AES-GCM'},false,['encrypt']);const iv=crypto.getRandomValues(new Uint8Array(12));return b64(iv)+'.'+b64(new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,encoder.encode(JSON.stringify(value)))));}
async function open(value,secret){const [iv,body]=value.split('.');const key=await crypto.subtle.importKey('raw',await crypto.subtle.digest('SHA-256',encoder.encode(secret)),{name:'AES-GCM'},false,['decrypt']);const result=JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(iv)},key,unb64(body))));if(result.expires<Date.now())throw Error('Session expired');return result;}
async function github(path,token,options={}){const r=await fetch('https://api.github.com/'+path,{...options,headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','User-Agent':'Deven-Website-Editor','Content-Type':'application/json'}});if(!r.ok){if(r.status===404)return null;throw Error('GitHub request failed ('+r.status+'). Refresh and retry; the file may have changed.');}return r.json();}
function encode(text){return btoa(String.fromCharCode(...encoder.encode(text)));}
function decode(text){return new TextDecoder().decode(Uint8Array.from(atob(text.replaceAll('\n','')),c=>c.charCodeAt(0)));}
export default {async fetch(request,env){
  const url=new URL(request.url);
  const headers={'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'Authorization, Content-Type','Access-Control-Allow-Methods':'GET, POST, OPTIONS','Cache-Control':'no-store','Vary':'Origin'};
  const json=(value,status=200)=>Response.json(value,{status,headers});
  try{
    if(request.method==='OPTIONS')return new Response(null,{headers});
    if(!env.GITHUB_CLIENT_ID||!env.GITHUB_CLIENT_SECRET||!env.SESSION_SECRET)return json({error:'Authentication service is not configured.'},503);
    if(url.pathname==='/login'){
      const state=crypto.randomUUID();const ticket=await seal({state,expires:Date.now()+600000},env.SESSION_SECRET);
      const dest=new URL('https://github.com/login/oauth/authorize');dest.searchParams.set('client_id',env.GITHUB_CLIENT_ID);dest.searchParams.set('redirect_uri',url.origin+'/callback');dest.searchParams.set('state',state);
      return new Response(null,{status:302,headers:{Location:dest.href,'Set-Cookie':`owner_login=${ticket}; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`,'Cache-Control':'no-store'}});
    }
    if(url.pathname==='/callback'){
      const cookie=request.headers.get('Cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith('owner_login='))?.slice(12);
      const state=await open(cookie??'',env.SESSION_SECRET);if(state.state!==url.searchParams.get('state'))throw Error('Invalid login state');
      const r=await fetch('https://github.com/login/oauth/access_token',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:env.GITHUB_CLIENT_ID,client_secret:env.GITHUB_CLIENT_SECRET,code:url.searchParams.get('code'),redirect_uri:url.origin+'/callback'})});
      const result=await r.json();if(!result.access_token)throw Error('GitHub sign-in failed');
      const user=await github('user',result.access_token);if(user?.login!=='DevenMittal')return json({error:'Only DevenMittal can use this editor.'},403);
      const ticket=await seal({token:result.access_token,expires:Date.now()+3600000},env.SESSION_SECRET);
      return new Response(null,{status:302,headers:{Location:origin+'/?owner=1#owner_session='+ticket,'Set-Cookie':'owner_login=; HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=0','Cache-Control':'no-store','Referrer-Policy':'no-referrer'}});
    }
    if(request.headers.get('Origin')!==origin)return json({error:'Origin not allowed'},403);
    let auth;try{auth=await open((request.headers.get('Authorization')??'').replace(/^Bearer /,''),env.SESSION_SECRET);}catch{return json({error:'Please sign in again.'},401);}
    const user=await github('user',auth.token);if(user?.login!=='DevenMittal')return json({error:'Access denied'},403);
    if(url.pathname==='/session'&&request.method==='GET')return json({login:user.login});
    if(request.method!=='POST')return json({error:'Not found'},404);
    const raw=await request.text();if(raw.length>250000)return json({error:'Post is too large'},413);const input=JSON.parse(raw);
    let path,content,current;
    if(url.pathname==='/section'){
      if(!['site','experience','education','archive','teaching','community'].includes(input.key))throw Error('Unknown section');
      if(['site','education'].includes(input.key)?(!input.value||Array.isArray(input.value)||typeof input.value!=='object'):!Array.isArray(input.value))throw Error('Invalid section data');
      path='src/data/owner-overrides.json';current=await github(`repos/${repo}/contents/${path}?ref=main`,auth.token);const values=current?JSON.parse(decode(current.content)):{};values[input.key]=input.value;content=JSON.stringify(values,null,2)+'\n';
    }else if(url.pathname==='/post'){
      if(!['reading','builds'].includes(input.collection)||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)||typeof input.content!=='string'||!input.content.startsWith('---\n'))throw Error('Invalid post');
      path=`src/content/${input.collection}/${input.slug}.md`;content=input.content;current=await github(`repos/${repo}/contents/${path}?ref=main`,auth.token);if(input.create&&current)return json({error:'That URL name already exists. Choose a different slug.'},409);
    }else return json({error:'Not found'},404);
    const result=await github(`repos/${repo}/contents/${path}`,auth.token,{method:'PUT',body:JSON.stringify({message:'Update website content from owner mode',content:encode(content),branch:'main',...(current?{sha:current.sha}:{})})});return json({commit:result.commit.sha});
  }catch(error){return json({error:error.message||'Request failed'},400);}
}};
