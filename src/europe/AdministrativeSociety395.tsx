import type {AdministrativeReadingGroup} from './administrative-groups-395';
import {readingRegionById} from './reading-centuries';
import {courseSources} from './course-sources';

/** Reuse dated regional evidence; administrative groups are not population areas. */
export function AdministrativeSociety395({group,onRegion}:{group:AdministrativeReadingGroup;onRegion:(id:string)=>void}){
 return <section className="admin395-society" aria-label="395 年地域居民与语言">
  <h4>这里住着谁？使用哪些语言？</h4>
  <p className="e-note">公元 395 年 · 按阅读地域分别查看。下列地域可能跨越行政分组；居民身份、日常语言与行政书写语言不能互相替代。</p>
  {group.regions.map(([id,name])=>{
   const region=readingRegionById(id,395);
   return <details key={id} open={group.regions.length===1?true:undefined} className="admin395-society-card">
    <summary><strong>{name}</strong><span>居民与语言 · 395 年</span></summary>
    {region?<div className="admin395-society-body">
     <p className="e-note">{region.modern}</p>
     <dl><dt>居民与社会</dt><dd>{region.people}</dd><dt>语言与书写</dt><dd>{region.language}</dd></dl>
     <button className="e-back" onClick={()=>onRegion(id)}>展开{name}的政治背景与城市 →</button>
     <details className="admin395-society-sources"><summary>核对这片地域的资料</summary>
      <ul>{region.sources.map(key=><li key={key}><a href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a></li>)}</ul>
     </details>
    </div>:<p className="e-note">这片地域的 395 年居民与语言资料尚未收录。</p>}
   </details>;
  })}
 </section>;
}
