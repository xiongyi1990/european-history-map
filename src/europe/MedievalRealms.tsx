import {courseSources} from './course-sources';
import {medievalRealmFrames,medievalRealmFrameAt} from './medieval-realms';
export function MedievalRealms({year,onYear,onPlace,onLocate}:{year:number;onYear:(year:number)=>void;onPlace:(id:string)=>void;onLocate:(ids:string[])=>void}){
 if(year<600||year>1000)return null;
 const frame=medievalRealmFrameAt(year);
 return <section className="medieval-realms" aria-label="政权与地域导览">
  <h3>政权由哪些地域组成？</h3>
  <nav aria-label="已补地域导览的年份">{medievalRealmFrames.map(f=><button key={f.year} aria-current={f.year===year?'date':undefined} onClick={()=>onYear(f.year)}>{f.year}</button>)}</nav>
  {frame?<><p className="realm-frame-title">{frame.title}</p><p className="e-note">{frame.note}</p>
   {frame.realms.map(r=><details className="realm-card" key={year+':'+r.id}><summary>{r.name}<small>{r.dates}</small></summary>
    <p>{r.status}</p>
    <ul>{r.regions.map(g=><li key={g.name}><strong>{g.name}</strong><span>{g.location}</span><p>{g.status}</p><div className="realm-city-links">{g.places.map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name} ↗</button>)}</div></li>)}</ul>
    <button className="e-primary" onClick={()=>onLocate([...new Set(r.regions.flatMap(g=>g.places.map(([id])=>id)))])}>定位这些地域的参考城市 →</button>
    <dl><dt>居民与身份</dt><dd>{r.people}</dd><dt>语言</dt><dd>{r.language}</dd></dl>
    <details className="chronology-sources"><summary>本政权的参考资料</summary>{r.sources.map(s=><a key={s} href={courseSources[s].url} target="_blank" rel="noreferrer">{courseSources[s].title} ↗</a>)}</details>
   </details>)}
  </>:<p className="e-note">公元 {year} 年的地域分解尚未逐项整理；上方可切换到已补年份，不将邻近年份的政权构成套入本年。</p>}
 </section>;
}
