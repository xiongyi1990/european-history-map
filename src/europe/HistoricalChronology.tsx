import {useState} from 'react';
import {courseSources} from './course-sources';
import {chronologyPeriods,historicalTurningPoints,turningPointAt} from './historical-chronology';
export function HistoricalChronology({year,boundaryYear,onYear,onPlace,onLocate,borrowed,onBorrowed}:{year:number;boundaryYear?:number;onYear:(year:number)=>void;onPlace:(id:string)=>void;onLocate:(ids:string[])=>void;borrowed:boolean;onBorrowed:(value:boolean)=>void}){
 const [picked,setPicked]=useState<string>();
 if(year<600||year>1648)return null;
 const period=chronologyPeriods.find(p=>p.id===picked)??chronologyPeriods.find(p=>year>=p.from&&year<=p.to)!;
 const goToYear=(value:number)=>{setPicked(undefined);onYear(value);};
 const entries=historicalTurningPoints.filter(e=>e.year>=period.from&&e.year<=period.to);
 const current=turningPointAt(year),previous=historicalTurningPoints.filter(e=>e.year<year).slice(-1)[0],next=historicalTurningPoints.find(e=>e.year>year);
 return <section className="history-chronology" aria-label="600 年后的关键年份">
  <div className="chronology-heading"><span>按变化读地图</span><small>{historicalTurningPoints.length} 个关键节点 · 600—1648</small></div>
  <label className="chronology-period">选择历史阶段<select aria-label="选择历史阶段" value={period.id} onChange={e=>setPicked(e.target.value)}>{chronologyPeriods.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
  <div className="chronology-years" aria-label="关键年份">{entries.map(e=><button key={e.year} aria-label={`${e.year} 年：${e.title}`} aria-current={year===e.year?'date':undefined} title={e.title} onClick={()=>goToYear(e.year)}>{e.year}</button>)}</div>
  <nav className="chronology-neighbours" aria-label="前后关键节点"><button disabled={!previous} onClick={()=>previous&&goToYear(previous.year)}>← {previous?.year??'起点'}<span>上一关键年</span></button><button disabled={!next} onClick={()=>next&&goToYear(next.year)}>{next?.year??'后续待补'} →<span>下一关键年</span></button></nav>
  {current?<article aria-label={`${year} 年关键变化`}>
   <small>公元 {year} 年 · 以下按事件发生之后说明</small><h2>{current.title}</h2>
   <dl><dt>此前</dt><dd>{current.before}</dd><dt>此后</dt><dd>{current.after}</dd><dt>在地图上怎么看</dt><dd>{current.spatial}</dd><dt>居民与身份</dt><dd>{current.people}</dd></dl>
   <button className="e-primary" onClick={()=>onLocate(current.places.map(([id])=>id))}>定位相关地区与城市 →</button>
   <div className="h-related">{current.places.map(([id,label])=><button key={id} onClick={()=>onPlace(id)}>{label}<span>查看城市资料 →</span></button>)}</div>
   <details className="chronology-sources"><summary>本节点的史料依据</summary>{current.sources.map(key=><a key={key} href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a>)}</details>
  </article>:<p className="e-note">当前为公元 {year} 年。上方可进入已核对的关键节点；相邻节点的事件说明不会自动当作这一年的完整政治局势。</p>}
  <aside className="chronology-boundary"><strong>事件年份与疆界年份</strong><p>{boundaryYear===year?`当前疆界参考也是 ${year} 年，仍属于待逐项核对的概略资料。`:boundaryYear?`当前选中 ${year} 年，邻近疆界资料为 ${boundaryYear} 年。默认只显示地形与地点，避免把邻近年份当作当年版图。`:'该年尚无可用的疆界参考。'}</p>{boundaryYear!==undefined&&boundaryYear!==year&&<label className="e-check"><input type="checkbox" checked={borrowed} onChange={e=>onBorrowed(e.target.checked)}/>叠加 {boundaryYear} 年疆界参考</label>}</aside>
 </section>;
}
