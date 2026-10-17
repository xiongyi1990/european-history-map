import {early500PolityTimes} from './early-500-polities';
import {early500Regions,earlyRegionsAt,inEarly500} from './early-500-regions';
import {courseSources} from './course-sources';
export function Early500Guide({year,selected,onRegion,onYear,onPlace,onLocate}:{year:number;selected?:string;onRegion:(id:string|undefined)=>void;onYear:(year:number)=>void;onPlace:(id:string)=>void;onLocate:(coordinates:[number,number][])=>void}){
 if(!inEarly500(year))return null;
 const regions=earlyRegionsAt(year),current=regions.find(r=>r.id===selected);
 return <section className="early500-guide" aria-label="500—700 年连续地域导览">
  <header><span>公元 500—700 年</span><h2>这一年，欧洲各地由谁统治？</h2><p>按地域查看主要政治阶段。分期连续覆盖这些年份，城池易手和边界仍有地方差异；本层不绘制未经核对的逐年国界。</p></header>
  {current?<article aria-label={current.name+'的当年状态'}>
   <button className="e-back" onClick={()=>onRegion(undefined)}>← 返回 {early500Regions.length} 个地域</button>
   <small>公元 {year} 年 · {current.phase.from}—{current.phase.to} 年的地域分期</small><h3>{current.name}</h3><p className="early500-where">{current.where}</p><h4>{current.phase.name}</h4>
   <dl><dt>当时的政权与控制</dt><dd>{current.phase.control}</dd><dt>由哪些地域组成</dt><dd>{current.phase.parts}</dd><dt>前后变化</dt><dd>{current.phase.change}</dd><dt>居民与身份</dt><dd>{current.people}</dd><dt>语言与书写</dt><dd>{current.language}</dd></dl>
   <button className="e-primary" onClick={()=>onLocate(current.bounds)}>在地图上查看这个地域 →</button>
   <small className="e-note">镜头范围仅帮助找位置，不是国家、行省或族群边界。</small>
   <div className="h-site-links">{current.places.filter(([id])=>id!=='pliska'||year>=681).filter(([id])=>id!=='kairouan'||year>=670).map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name}<span>定位并阅读 →</span></button>)}</div>
   {!current.places.length&&<p className="e-note">本区先以地理位置和聚落背景理解；尚未补齐可信的六七世纪城市点与小政权疆界。</p>}
   <h4>沿这个地域读下去</h4><nav className="early500-phases" aria-label={current.name+'的政治分期'}>{current.phases.map(p=><button key={p.from} aria-current={year>=p.from&&year<=p.to?'date':undefined} onClick={()=>onYear(p.from)}><b>{p.from===p.to?p.from:p.from+'—'+p.to}</b>{p.name}</button>)}</nav>
   <details className="chronology-sources"><summary>本地域的参考资料</summary>{[...new Set([...current.sources,...current.phase.sources])].map(key=><a key={key} href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a>)}</details>
  </article>:<><p className="early500-year">当前：公元 {year} 年 · 点击地域或地图上的地域名称</p><div className="early500-index">{regions.map(r=>{const p=r.phase;return <button key={r.id} onClick={()=>onRegion(r.id)}><strong>{r.name}</strong><span>{p.mapName}</span><small>{p.from}—{p.to} 年 · 展开地域与居民 →</small></button>})}</div></>}
  <details className="early500-polity-times"><summary>主要政权的起止时间</summary><p className="e-note">下列是政权或城市王权的时间线索，和上面的资料分期不同；不是本年同时存在的全部国家清单。</p>{early500PolityTimes.filter(p=>!current||p.regions.includes(current.id)).map(p=><article key={p.name}><h4>{p.name}</h4><strong>{p.time}</strong><p>{p.note}</p><a href={courseSources[p.source].url} target="_blank" rel="noreferrer">核对起止与阶段 ↗</a></article>)}</details>
 </section>;
}
