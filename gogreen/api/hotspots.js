const LAMPUNG_BBOX = '103.5,-6.2,106.1,-3.7';
const DEFAULT_SOURCE = 'VIIRS_NOAA21_NRT';

function parseCsv(text){
  const rows=[]; let row=[], cell='', quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i], next=text[i+1];
    if(ch==='"'){
      if(quoted && next==='"'){cell+='"';i++;}
      else quoted=!quoted;
    }else if(ch===',' && !quoted){row.push(cell);cell='';}
    else if((ch==='\n'||ch==='\r') && !quoted){
      if(ch==='\r'&&next==='\n')i++;
      row.push(cell);cell=''; if(row.some(v=>v!==''))rows.push(row); row=[];
    }else cell+=ch;
  }
  if(cell||row.length){row.push(cell);if(row.some(v=>v!==''))rows.push(row)}
  if(!rows.length)return [];
  const headers=rows.shift().map(h=>h.trim());
  return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,(r[i]??'').trim()])));
}

export default async function handler(req,res){
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const key=process.env.FIRMS_MAP_KEY;
  if(!key)return res.status(500).json({error:'FIRMS_MAP_KEY is not configured on the server.'});
  const days=Math.min(5,Math.max(1,Number(req.query?.days||3)));
  const source=String(req.query?.source||DEFAULT_SOURCE);
  if(!/^[A-Z0-9_]+$/.test(source))return res.status(400).json({error:'Invalid FIRMS source.'});
  const url=`https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(key)}/${source}/${LAMPUNG_BBOX}/${days}`;
  const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),15000);
  try{
    const r=await fetch(url,{signal:controller.signal,headers:{Accept:'text/csv'}});
    const text=await r.text();
    if(!r.ok)return res.status(r.status).json({error:`NASA FIRMS returned HTTP ${r.status}.`});
    const data=parseCsv(text);
    const valid=data.filter(x=>Number.isFinite(Number(x.latitude))&&Number.isFinite(Number(x.longitude))&&/^\d{4}-\d{2}-\d{2}$/.test(x.acq_date));
    res.setHeader('Cache-Control','s-maxage=600, stale-while-revalidate=300');
    return res.status(200).json({source,days,region:'Lampung',data:valid,meta:{retrievedAt:new Date().toISOString(),rawRecords:data.length,validRecords:valid.length}});
  }catch(e){
    const msg=e?.name==='AbortError'?'NASA FIRMS request timed out.':(e?.message||'Unable to reach NASA FIRMS.');
    return res.status(502).json({error:msg});
  }finally{clearTimeout(timer)}
}
