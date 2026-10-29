'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P='gg_',ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(P+k))??d}catch{return d}},sv=(k,v)=>{try{localStorage.setItem(P+k,JSON.stringify(v))}catch{}};
const el=(t,txt,cls)=>{const e=document.createElement(t);if(txt!=null)e.textContent=txt;if(cls)e.className=cls;return e};
const mod=$('#modal');function openM(t,b){$('#mT').textContent=t;const B=$('#mB');B.replaceChildren(...(Array.isArray(b)?b:[el('p',b)]));mod.showModal()}$('#mX').onclick=()=>mod.close();
/* NAV */
$('#burger').onclick=e=>{const o=$('#menu').classList.toggle('open');e.target.setAttribute('aria-expanded',o)};
$$('#menu a').forEach(a=>a.addEventListener('click',()=>$('#menu').classList.remove('open')));
addEventListener('scroll',()=>$('#nav').classList.toggle('sm',scrollY>40));
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id));ctx=e.target.id;chipsFor()}}),{threshold:.4}).observe&&$$('main section').forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+s.id));ctx=s.id;chipsFor()}}),{threshold:.4}).observe(s));
/* CARDS */
const CR=[['🔥','Forest Fires','Land clearing, deliberate burning, accidental ignition, and dry conditions can all contribute to forest and land fires.','Fires can start or spread when dry vegetation meets ignition sources. Prevention relies on avoiding open burning, early reporting, and community awareness.'],
['🦧','Biodiversity Loss','Habitat destruction threatens wildlife, ecological balance, and vulnerable species.','When forests shrink or fragment, animals lose food, shelter, and migration routes, and ecosystems become less resilient.'],
['🌫️','Climate and Air Pollution','Forest fires release smoke and pollutants, affect air quality, and contribute to greenhouse gas emissions.','Smoke can harm health, especially for children, older adults, and people with respiratory conditions. Burning also releases carbon stored in vegetation.']];
const ED=[['🌳','Plant and Care for Trees','Choose native species, water young trees, and keep checking on them.','Plant native species suited to your area, protect saplings from damage, and keep caring for them after planting.'],
['♻️','Reduce, Reuse, Recycle','Cut waste at the source first.','Carry a bottle and bag, repair before replacing, and separate waste so recyclables stay clean.'],
['💧','Save Water and Energy','Small daily habits add up.','Fix leaks, shorten showers, switch off unused lights and devices, and unplug idle chargers.'],
['🦜','Protect Wildlife and Habitats','Respect wild animals and their homes.','Do not buy wild-caught pets, keep distance from wildlife, avoid littering, and support conservation groups.']];
function cards(id,arr,btn,im){const c=$(id);arr.forEach(([i,t,s,d],n)=>{const k=el('article',null,'card im'),g=el('img');g.src='assets/'+im[n]+'.svg';g.alt='';const bd=el('div',null,'bd');bd.append(el('h3',i+' '+t),el('p',s));const b=el('button',btn,'btn dark');b.onclick=()=>openM(t,d);bd.append(b);k.append(g,bd);c.append(k)})}
cards('#crisisCards',CR,'Learn More',['fire','bio','smoke']);cards('#learnCards',ED,'Discover More',['plant','recycle','water','wild']);
$('#srcs').append(...[['Ministry of Forestry (KLHK)','https://www.menlhk.go.id'],['BNPB','https://bnpb.go.id'],['BMKG','https://www.bmkg.go.id'],['Global Forest Watch','https://www.globalforestwatch.org'],['UNEP','https://www.unep.org'],['NASA Earth','https://earth.gov']].map(([n,u])=>{const l=el('li'),a=el('a',n);a.href=u;a.target='_blank';a.rel='noopener noreferrer';l.append(a);return l}));
/* FORESTWATCH — NASA FIRMS */
let H=[];
const COL={HIGH:'#C84C42',MEDIUM:'#E98235',LOW:'#E9B635'};
let map,layer,mk={};
let fwState={loading:false,error:null,lastUpdated:null,latestDetection:null,mapError:null,timeMode:'7d'};

const FIRMS_API='/api/hotspots';
const LAMPUNG_VIEW=[-4.9,105.2];

try{
  if(!window.L)throw new Error('Leaflet unavailable');
  map=L.map('map').setView(LAMPUNG_VIEW,8);
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19}).addTo(map);
  tiles.on('tileerror',()=>{
    if(fwState.mapError)return;
    fwState.mapError='Map tiles are unavailable. Hotspot data can still be reviewed in the list.';
    setWatchState(fwState.mapError,'error');
  });
  layer=L.layerGroup().addTo(map);
}catch{
  map=null;
  fwState.mapError='Map unavailable (offline or blocked). Hotspot data can still be reviewed in the list.';
  $('#map').textContent=fwState.mapError;
}

function normalizeConfidence(v){
  const x=String(v??'').trim().toLowerCase();
  if(x==='h'||x==='high')return 'HIGH';
  if(x==='n'||x==='nominal')return 'MEDIUM';
  if(x==='l'||x==='low')return 'LOW';
  return null;
}

function normalizeHotspot(row,i){
  const lat=Number(row.latitude),lng=Number(row.longitude);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return null;
  const d=String(row.acq_date||'').slice(0,10);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d))return null;
  const conf=normalizeConfidence(row.confidence);
  if(!conf)return null;
  const id=[d,row.acq_time,row.latitude,row.longitude,row.satellite||row.instrument||'',i].join('_');
  const rawTime=String(row.acq_time??'').trim().padStart(4,'0');
  const timeUtc=rawTime.length===4?`${rawTime.slice(0,2)}:${rawTime.slice(2)}`:'—';
  return {id,n:'Hotspot '+(i+1),r:'Lampung',d,c:null,k:conf,sourceConfidence:normalizeConfidence(row.confidence)||'—',lat,lng,frp:Number.isFinite(Number(row.frp))?Number(row.frp):null,satellite:String(row.satellite||'—'),instrument:String(row.instrument||'—'),daynight:String(row.daynight||'—'),version:String(row.version||'—'),timeUtc,w:'Hotspot adalah indikasi anomali termal dari pengamatan satelit, bukan konfirmasi kebakaran.'};
}

function setWatchState(text,kind='info'){
  const tag=$('#watchStatus');
  if(!tag)return;
  tag.textContent=text;
  tag.className='tag '+(kind==='error'?'warn':'');
}

function todayUtcDate(){return new Date().toISOString().slice(0,10)}
function detectionDateTime(h){
  const raw=String(h.d||'')+'T'+String(h.timeUtc||'00:00').padStart(5,'0')+':00Z';
  const dt=new Date(raw);
  return Number.isNaN(dt.getTime())?null:dt;
}
function dateMinusDaysLocal(date,days){
  const d=new Date(`${date}T00:00:00Z`);d.setUTCDate(d.getUTCDate()-days);return d.toISOString().slice(0,10);
}
function activePeriod(){
  const now=new Date(),today=todayUtcDate(),selected=$('#fDate')?.value||'';
  if(selected)return {label:`date ${selected}`,test:h=>h.d===selected};
  if(fwState.timeMode==='today')return {label:`today ${today}`,test:h=>h.d===today};
  if(fwState.timeMode==='24h'){
    const cutoff=new Date(now.getTime()-24*60*60*1000);
    return {label:'last 24 hours',test:h=>{const dt=detectionDateTime(h);return dt&&dt>=cutoff&&dt<=now;}};
  }
  const from=dateMinusDaysLocal(today,6);
  return {label:'last 7 days',test:h=>h.d>=from&&h.d<=today};
}
function setTimeMode(mode){
  fwState.timeMode=mode;
  const date=$('#fDate');if(date)date.value='';
  $$('.time-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  renderWatch();
}
function renderWatch(){
  const k=$('#fCat').value,period=activePeriod();
  const D=H.filter(h=>(!k||h.k===k)&&period.test(h));
  const filterLabel=[k&&`category ${k.toLowerCase()}`,period.label].filter(Boolean).join(' · ');
  const filterNote=filterLabel?` · ${filterLabel}`:'';
  const dist=[['HIGH','H'],['MEDIUM','M'],['LOW','L']].map(([c,l])=>`${l}:${D.filter(h=>h.k===c).length}`).join(' ');
  $('#stats').replaceChildren(
    ...[['Hotspots',D.length],['Coverage','Lampung'],['Confidence (H/M/L)',dist],['NASA retrieval',fwState.lastUpdated||'—'],['Latest detection (UTC)',fwState.latestDetection||'—']].map(([l,v])=>{const d=el('div');d.append(el('b',v),el('span',l));return d})
  );
  const ul=$('#hotList');ul.replaceChildren();
  if(!D.length)ul.append(el('li',fwState.error?'No hotspot data available. Use Retry after checking the connection.':(H.length?`No hotspots match the selected period${k?` and ${k.toLowerCase()} category`:''}.`:'NASA FIRMS returned no hotspot records for the selected period.')));
  if(D.length===0 && !fwState.error)setWatchState(`NASA FIRMS data loaded · 0 records match current filters${filterNote}.`,'info');
  if(layer){layer.clearLayers();mk={}}
  D.forEach((h,idx)=>{
    const li=el('li'),s=el('span',`Hotspot ${idx+1} · ${h.k}`);li.append(s);
    const b=el('button','View on Map');
    b.onclick=()=>{if(map){$('#map').scrollIntoView({block:'center'});map.setView([h.lat,h.lng],11);mk[h.id]?.openPopup()}else openM('Hotspot detail',h.w)};
    li.append(b);ul.append(li);
    if(layer){
      const m=L.circleMarker([h.lat,h.lng],{radius:2.8,color:COL[h.k],fillColor:COL[h.k],fillOpacity:.9,weight:1}).addTo(layer);
      const p=el('div','', 'fw-popup');
      p.append(el('b',`Hotspot · ${h.k}`),el('div',`Lampung · ${h.d} ${h.timeUtc||''} UTC`),el('div',`Confidence: ${h.sourceConfidence}`),el('div',`Satellite: ${h.satellite}`),el('div',`Instrument: ${h.instrument}`),el('div',`FRP: ${Number.isFinite(h.frp)?h.frp+' MW':'—'}`),el('div',`Day/Night: ${h.daynight}`),el('div',`Version: ${h.version}`),el('div',h.w));
      m.bindPopup(p);
      m.on('click',()=>{[...ul.children].forEach((item,j)=>item.classList.toggle('active',D[j]?.id===h.id));});
      mk[h.id]=m;
    }
  });
}

async function loadHotspots(){
  if(fwState.loading)return;
  fwState.loading=true;fwState.error=null;setWatchState('Loading NASA FIRMS hotspot data…');
  const ul=$('#hotList');ul.replaceChildren(el('li','Loading hotspot data…'));
  try{
    const r=await fetch(`${FIRMS_API}?days=7`,{headers:{Accept:'application/json'},cache:'no-store'});
    const d=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(d.error||`NASA FIRMS request failed (${r.status})`);
    if(!Array.isArray(d.data))throw new Error('Invalid hotspot response structure.');
    H=d.data.map(normalizeHotspot).filter(Boolean);
    fwState.lastUpdated=d.meta?.retrievedAt?new Date(d.meta.retrievedAt).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'}):new Date().toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'});
    fwState.latestDetection=d.meta?.latestDetectionUtc||null;
    setWatchState(`Live NASA FIRMS data · ${H.length} valid hotspot records · S-NPP + NOAA-20 + NOAA-21 · retrieved ${fwState.lastUpdated} · confidence shown as LOW / MEDIUM / HIGH`);
    renderWatch();
    if(map && H.length){
      const bounds=L.latLngBounds(H.map(h=>[h.lat,h.lng]));
      if(bounds.isValid()) map.fitBounds(bounds,{padding:[24,24],maxZoom:9});
    }
    if(fwState.mapError)setWatchState(fwState.mapError,'error');
  }catch(e){
    H=[];fwState.error=e.message||'Unknown error';fwState.latestDetection=null;setWatchState(`NASA FIRMS unavailable: ${fwState.error}`,'error');renderWatch();
  }finally{fwState.loading=false}
}

$('#filters').addEventListener('submit',e=>e.preventDefault());
['change','input'].forEach(e=>$('#filters').addEventListener(e,renderWatch));
$$('.time-mode').forEach(b=>b.addEventListener('click',()=>setTimeMode(b.dataset.mode)));
$('#fDate').addEventListener('change',()=>{if($('#fDate').value){fwState.timeMode='date';$$('.time-mode').forEach(b=>b.classList.remove('active'));renderWatch();}});
$('#filters').addEventListener('reset',()=>setTimeout(()=>{fwState.timeMode='7d';$('#fDate').value='';$$('.time-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode==='7d'));renderWatch()},0));
const retry=el('button','Retry','btn ghost dark');retry.type='button';retry.onclick=loadHotspots;retry.style.marginTop='8px';$('#watchStatus')?.parentElement?.append(retry);
loadHotspots();
/* ECOREPORT */
const rep=()=>ld('reports',[]);
function rr(){const R=rep(),ul=$('#rList');ul.replaceChildren();
const cats={};R.forEach(r=>cats[r.cat]=(cats[r.cat]||0)+1);
$('#rStats').replaceChildren(...[['Total demo reports',R.length],['By category',Object.entries(cats).map(([k,v])=>k.split(' ')[0]+' '+v).join(', ')||'—']].map(([l,v])=>{const d=el('div');d.append(el('b',v),el('span',l));return d}));
if(!R.length)ul.append(el('li','No reports yet. Fill in the form to create your first demo report.'));
R.slice().reverse().forEach(r=>{const li=el('li');li.append(el('span',r.id+' · '+r.title));const b=el('button','Details');b.onclick=()=>openM(r.title,[el('p','ID: '+r.id+' · Status: Demo Submitted'),el('p','Category: '+r.cat),el('p','Location: '+r.loc),el('p','Observed: '+r.date),el('p',r.desc),el('p',r.photo?'Photo: '+r.photo+' (not stored)':'No photo')]);li.append(b);ul.append(li)})}
$('#rDate').max=new Date().toISOString().slice(0,10);
$('#rPhoto').onchange=e=>{const f=e.target.files[0],p=$('#prev'),er=$('#rErr');p.hidden=true;er.textContent='';if(!f)return;
if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>2097152){er.textContent='Photo must be JPG, PNG or WebP and under 2 MB.';e.target.value='';return}
p.src=URL.createObjectURL(f);p.hidden=false};
$('#rform').onsubmit=e=>{e.preventDefault();const v=i=>$(i).value.trim(),er=$('#rErr');
if(!v('#rTitle')||!$('#rCat').value||!v('#rLoc')||!$('#rDate').value||v('#rDesc').length<10){er.textContent='Please complete every required field (description: at least 10 characters).';return}
if(!$('#rOk').checked){er.textContent='Please confirm that this is a prototype submission.';return}
const R=rep(),id='DEMO-'+Date.now().toString(36).toUpperCase();
R.push({id,title:v('#rTitle'),cat:$('#rCat').value,loc:v('#rLoc'),date:$('#rDate').value,desc:v('#rDesc'),photo:$('#rPhoto').files[0]?.name||'',status:'Demo Submitted'});sv('reports',R);
e.target.reset();$('#prev').hidden=true;er.textContent='';rr();openM('Demo report saved','Report '+id+' was saved in this browser with status "Demo Submitted". It was not sent to any authority.')};
$('#rClear').onclick=()=>{if(confirm('Delete all demo reports?')){sv('reports',[]);rr()}};rr();
/* GREEN ACTION */
const DAYS=[['🚰','Bring a reusable bottle','Skip bottled drinks today.'],['🛍️','Reduce single-use plastics','Refuse one plastic bag, straw, or cup.'],['💧','Save water at home','Shorten a shower and fix a drip.'],['💡','Switch off unnecessary lights','Turn off lights in empty rooms.'],['📚','Learn about forest conservation','Read one article from the sources list.'],['🌱','Care for a plant or tree','Water or tidy a plant.'],['📣','Share an awareness message','Tell one friend what you learned.']];
const BAD=[[0,'—'],[1,'Green Beginner'],[3,'Eco Explorer'],[5,'Forest Protector'],[7,'Green Champion']];
const LB=[['Demo_Rimba',70],['Demo_Hijau',50],['Demo_Orangutan',30]];
function ar(){const done=ld('done',[]),pts=done.length*10,bd=BAD.filter(b=>done.length>=b[0]).pop()[1];
$('#aStats').replaceChildren(...[['Completed',done.length+'/7'],['Progress',Math.round(done.length/7*100)+'%'],['Points',pts],['Badge',bd+' (1/3/5/7 days)']].map(([l,v])=>{const d=el('div');d.append(el('b',v),el('span',l));return d}));
$('#aBar').style.width=done.length/7*100+'%';
const g=$('#days');g.replaceChildren();DAYS.forEach(([i,t,s],n)=>{const ok=done.includes(n),c=el('article',null,'card'+(ok?' done':''));c.append(el('div',i,'ic'),el('h3','Day '+(n+1)+': '+t),el('p',s+' (+10 pts)'));const b=el('button',ok?'✓ Completed':'Mark complete','btn dark');b.disabled=ok;b.onclick=()=>{const d=ld('done',[]);if(!d.includes(n)){d.push(n);sv('done',d)}ar()};c.append(b);g.append(c)});
const L=[...LB,['You (this browser)',pts]].sort((a,b)=>b[1]-a[1]);$('#lead').replaceChildren(...L.map(([n,p])=>{const li=el('li');li.append(el('span',n),el('b',p+' pts'));return li}))}
$('#aReset').onclick=()=>{if(confirm('Reset your challenge progress?')){sv('done',[]);ar()}};ar();
/* ECOIMPACT */
const CALC={plastic:(a,b)=>'≈ '+a*b+' single-use plastic items avoided (self-reported estimate)',energy:(a,b)=>'≈ '+(a*b).toFixed(1)+' kWh saved (self-reported estimate)',trees:(a,b)=>'Trees recorded: '+a+(isNaN(b)?'':' · Survival: '+(b/a*100).toFixed(0)+'%')};
$$('.calc').forEach(f=>{f.onsubmit=e=>{e.preventDefault();const o=f.querySelector('output'),a=parseFloat(f.a.value),b=parseFloat(f.b.value);
const tr=f.dataset.c=='trees',bad=isNaN(a)||a<0||(!tr&&(isNaN(b)||b<0))||(tr&&!isNaN(b)&&(b<0||b>a||a==0));
o.textContent=bad?'Enter valid non-negative numbers (alive trees cannot exceed planted trees).':CALC[f.dataset.c](a,b)};f.onreset=()=>f.querySelector('output').textContent=''});
/* RESET */
$('#resetAll').onclick=()=>{if(confirm('Clear all GO GREEN demo data in this browser?')){Object.keys(localStorage).filter(k=>k.startsWith(P)).forEach(k=>localStorage.removeItem(k));rr();ar();bm.length=0;$('#msgs').replaceChildren();welcome()}};
/* ECOBOT */
const KB=[
{k:['kebakaran','fire','wildfire','dangerous','bahaya','cause','penyebab','burn','bakar'],en:'🔥 Forest fires can harm wildlife and habitats, release smoke that affects health, and emit greenhouse gases. Common contributors include land clearing, deliberate burning, accidental ignition, and dry conditions.',id:'🔥 Kebakaran hutan dapat merusak habitat satwa, menghasilkan asap yang mengganggu kesehatan, dan melepas gas rumah kaca. Penyebab umum: pembukaan lahan, pembakaran sengaja, ketidaksengajaan, dan kondisi kering.'},
{k:['prevent','cegah','pencegahan','stop','help','membantu','mencegah'],en:'🌿 Ways to help protect forests:\n1. Never burn vegetation or waste near forests.\n2. Avoid activities that could ignite dry vegetation.\n3. Share verified prevention information.\n4. Support responsible conservation programs.\n5. Report suspected illegal burning to local authorities.\n\nIf you see an active fire, keep a safe distance and contact emergency services. Do not fight a dangerous wildfire yourself.',id:'🌿 Cara membantu melindungi hutan:\n1. Jangan membakar vegetasi atau sampah dekat hutan.\n2. Hindari aktivitas yang bisa memicu api pada vegetasi kering.\n3. Bagikan informasi pencegahan yang terverifikasi.\n4. Dukung program konservasi yang bertanggung jawab.\n5. Laporkan dugaan pembakaran ilegal ke pihak berwenang setempat.\n\nJika melihat api aktif, jaga jarak aman dan hubungi layanan darurat. Jangan memadamkan kebakaran besar sendiri.'},
{k:['deforestation','deforestasi','penebangan','logging','clearing','gundul'],en:'🌳 Deforestation is driven by land conversion (agriculture, plantations, development), logging, and fire. It reduces habitat, stored carbon, and watershed protection.',id:'🌳 Deforestasi dipicu alih fungsi lahan (pertanian, perkebunan, pembangunan), penebangan, dan kebakaran. Dampaknya: hilangnya habitat, cadangan karbon, dan perlindungan daerah aliran air.'},
{k:['wildlife','satwa','animal','hewan','biodiversity','biodiversitas','orangutan','habitat'],en:'🦧 Protect wildlife: keep your distance, never buy wild-caught animals, avoid littering, support habitat conservation, and report suspected wildlife crime.',id:'🦧 Lindungi satwa: jaga jarak, jangan membeli satwa liar tangkapan, jangan buang sampah sembarangan, dukung konservasi habitat, dan laporkan dugaan kejahatan satwa.'},
{k:['plan','rencana','7-day','7 hari','week','minggu','habit','kebiasaan','challenge'],en:'📅 7-day plan: 1 reusable bottle · 2 cut single-use plastics · 3 save water · 4 switch off lights · 5 learn about forests · 6 care for a plant · 7 share a message. Track it in Green Action!',id:'📅 Rencana 7 hari: 1 botol minum ulang · 2 kurangi plastik sekali pakai · 3 hemat air · 4 matikan lampu · 5 belajar tentang hutan · 6 rawat tanaman · 7 bagikan pesan lingkungan. Catat di Green Action!'},
{k:['report','lapor','melapor','pelaporan','ecoreport','problem','masalah'],en:'📝 Use EcoReport: pick a category, describe location and date, and save. Remember: reports here are demo-only and not sent to authorities. For real incidents, contact local emergency services or environmental agencies. Stay safe.',id:'📝 Gunakan EcoReport: pilih kategori, isi lokasi dan tanggal, lalu simpan. Ingat: laporan di sini hanya demo dan tidak dikirim ke pihak berwenang. Untuk kejadian nyata, hubungi layanan darurat atau instansi lingkungan setempat.'},
{k:['climate','iklim','warming','pemanasan','carbon','karbon','emisi'],en:'🌍 Forests store carbon and influence local climate. Burning or clearing releases carbon and weakens that role.',id:'🌍 Hutan menyimpan karbon dan memengaruhi iklim lokal. Pembakaran atau penebangan melepas karbon dan melemahkan fungsi itu.'},
{k:['smoke','asap','haze','kabut','air quality','udara','masker','mask'],en:'😷 In heavy smoke: stay indoors with windows closed, limit outdoor activity, use a well-fitted mask (N95/KN95 type), and follow local health advice.',id:'😷 Saat asap tebal: tetap di dalam ruangan, tutup jendela, batasi aktivitas luar, gunakan masker yang pas (jenis N95/KN95), dan ikuti arahan kesehatan setempat.'},
{k:['waste','sampah','plastic','plastik','recycle','daur'],en:'♻️ Reduce first, then reuse, then recycle. Carry a bottle and bag, separate waste, and never burn trash.',id:'♻️ Kurangi dulu, lalu pakai ulang, lalu daur ulang. Bawa botol dan tas sendiri, pilah sampah, dan jangan bakar sampah.'},
{k:['tree','pohon','plant','tanam','reforestation','restorasi'],en:'🌱 Plant native species, protect saplings, and keep caring for them afterwards. Try the Tree Care Tracker in EcoImpact.',id:'🌱 Tanam spesies asli, lindungi bibit, dan terus rawat. Coba Tree Care Tracker di EcoImpact.'},
{k:['website','navigate','menu','feature','fitur','forestwatch','about'],en:'🧭 GO GREEN has ForestWatch (NASA FIRMS hotspot map), EcoBot (me), EcoReport, Green Action, and EcoImpact. Use the top menu to jump between them.',id:'🧭 GO GREEN punya ForestWatch (NASA FIRMS), EcoBot (saya), EcoReport, Green Action, dan EcoImpact. Gunakan menu atas untuk berpindah.'},
{k:['hello','hi','halo','hai','selamat'],en:'Hello, Green Guardian! 🌱 Ask me about forests, fires, wildlife, or sustainable living.',id:'Halo, Green Guardian! 🌱 Tanyakan tentang hutan, kebakaran, satwa, atau hidup berkelanjutan.'}];
const ID_RE=/\b(apa|bagaimana|cara|kenapa|mengapa|hutan|yang|dan|saya|bisa|untuk|tolong|sampah|lapor|kebakaran|hewan|bahaya|rencana|dengan|itu|ini|di|ke)\b/i;
const reply=q=>{const t=q.toLowerCase(),id=ID_RE.test(t);let best=null,sc=0;KB.forEach(e=>{const s=e.k.reduce((a,w)=>a+(t.includes(w)?1:0),0);if(s>sc){sc=s;best=e}});
if(best&&/cegah|prevent|mencegah|help|membantu|stop/.test(t)&&/fire|api|kebakaran|hutan|forest/.test(t))best=KB[1];
return best?(id?best.id:best.en):(id?'Maaf, saya belum punya jawaban untuk itu. Coba tanyakan tentang kebakaran hutan, deforestasi, satwa, sampah, atau cara melapor. 🌿':"I don't have an answer for that yet. Try asking about forest fires, deforestation, wildlife, waste, or how to report a problem. 🌿")};
const bm=[];let ctx='home';
const CH={default:['Why are forest fires dangerous?','How can we prevent forest fires?','What causes deforestation?','How can I protect wildlife?','Give me a 7-day Go Green plan.','How can I report an environmental problem?'],
watch:['How do I read hotspot data?','Why are forest fires dangerous?','Kenapa titik panas penting?'],report:['How can I report an environmental problem?','Is it safe to report a fire?'],action:['Give me a 7-day Go Green plan.','How can I reduce plastic waste?']};
function chipsFor(){const c=$('#chips');c.replaceChildren();(CH[ctx]||CH.default).forEach(q=>{const b=el('button',q);b.type='button';b.onclick=()=>send(q);c.append(b)})}
function add(t,w){const m=el('div',t,'m '+w);$('#msgs').append(m);$('#msgs').scrollTop=1e9;return m}
function welcome(){add('Hi, Green Guardian! 🌱 I’m EcoBot, your environmental assistant. Ask me about forest fires, biodiversity, climate change, or sustainable living. Let’s protect our planet together!','b')}
function send(q){q=q.trim();if(!q){$('#bin').placeholder='Please type a question first.';return}add(q,'u');$('#bin').value='';const ty=add('EcoBot is typing…','b');setTimeout(()=>{try{ty.textContent=/hotspot|titik panas/i.test(q)?'🗺️ ForestWatch markers come from NASA FIRMS satellite hotspot detections. They indicate thermal anomalies, include a confidence value, and are not confirmation of a fire; ground verification is still needed.':reply(q)}catch{ty.textContent='Something went wrong. Please try again.'}$('#msgs').scrollTop=1e9},500)}
$('#bform').onsubmit=e=>{e.preventDefault();send($('#bin').value)};
const open=()=>{$('#bot').hidden=false;$('#bot').classList.remove('min');$('#bin').focus()};
$('#botBtn').onclick=()=>$('#bot').hidden?open():($('#bot').hidden=true);$('#botX').onclick=()=>$('#bot').hidden=true;$('#botMin').onclick=()=>$('#bot').classList.toggle('min');
$('#botClear').onclick=()=>{$('#msgs').replaceChildren();welcome()};$('#openBot2').onclick=open;$('[data-bot]').addEventListener('click',open);
welcome();chipsFor();

$('#openBot3').onclick=open;
$('#qbar').onsubmit=e=>{e.preventDefault();$('#fCat').value=$('#qC').value;renderWatch();$('#watch').scrollIntoView()};
