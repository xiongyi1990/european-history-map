import {YearReadingGuide,YearBoundaryKey} from './YearReadingGuide';
import {Early500Guide} from './Early500Guide';
import {MedievalRealms} from './MedievalRealms';
import {useState} from 'react';
import {courseSources} from './course-sources';
import {chronologyPeriods,historicalTurningPoints,turningPointAt} from './historical-chronology';
export function HistoricalChronology({year,boundaryYear,onYear,onPlace,onLocate,borrowed,onBorrowed,earlyRegion,onEarlyRegion,onEarlyLocate}:{year:number;boundaryYear?:number;onYear:(year:number)=>void;onPlace:(id:string)=>void;onLocate:(ids:string[])=>void;borrowed:boolean;onBorrowed:(value:boolean)=>void;earlyRegion?:string;onEarlyRegion:(id:string|undefined)=>void;onEarlyLocate:(coordinates:[number,number][])=>void}){
 const [picked,setPicked]=useState<string>();
 if(year<500||year>2000)return null;
 const period=chronologyPeriods.find(p=>p.id===picked)??chronologyPeriods.find(p=>year>=p.from&&year<=p.to)!;
 const goToYear=(value:number)=>{setPicked(undefined);onYear(value);};
 const entries=historicalTurningPoints.filter(e=>e.year>=period.from&&e.year<=period.to);
 const current=turningPointAt(year),previous=historicalTurningPoints.filter(e=>e.year<year).slice(-1)[0],next=historicalTurningPoints.find(e=>e.year>year);
 return <section className="history-chronology" aria-label="500 年后的关键年份">
  {!earlyRegion&&year<=800?<YearReadingGuide year={year} onRegion={id=>onEarlyRegion(id)} onYear={goToYear} onLocate={onEarlyLocate} boundary={<YearBoundaryKey year={year} boundaryYear={boundaryYear} borrowed={borrowed} onBorrowed={onBorrowed}/>}/>:<YearBoundaryKey year={year} boundaryYear={boundaryYear} borrowed={borrowed} onBorrowed={onBorrowed}/>}
  <div className="chronology-heading"><span>按变化读地图</span><small>{historicalTurningPoints.length} 个关键节点 · 500—2000</small></div>
  <label className="chronology-period">选择历史阶段<select aria-label="选择历史阶段" value={period.id} onChange={e=>setPicked(e.target.value)}>{chronologyPeriods.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
  <div className="chronology-years" aria-label="关键年份">{entries.map(e=><button key={e.year} aria-label={`${e.year} 年：${e.title}`} aria-current={year===e.year?'date':undefined} title={e.title} onClick={()=>goToYear(e.year)}>{e.year}</button>)}</div>
  <nav className="chronology-neighbours" aria-label="前后关键节点"><button disabled={!previous} onClick={()=>previous&&goToYear(previous.year)}>← {previous?.year??'起点'}<span>上一关键年</span></button><button disabled={!next} onClick={()=>next&&goToYear(next.year)}>{next?.year??'后续待补'} →<span>下一关键年</span></button></nav>
  <Early500Guide year={year} selected={earlyRegion} onRegion={onEarlyRegion} onYear={goToYear} onPlace={onPlace} onLocate={onEarlyLocate}/>
  <MedievalRealms year={year} onYear={goToYear} onPlace={onPlace} onLocate={onLocate}/>
  {current?<article aria-label={`${year} 年关键变化`}>
   <small>公元 {year} 年 · 以下按事件发生之后说明</small><h2>{current.title}</h2>
   <dl><dt>此前</dt><dd>{current.before}</dd><dt>此后</dt><dd>{current.after}</dd><dt>在地图上怎么看</dt><dd>{current.spatial}</dd><dt>居民与身份</dt><dd>{current.people}</dd></dl>
   <button className="e-primary" onClick={()=>onLocate(current.places.map(([id])=>id))}>定位相关地区与城市 →</button>
   <div className="h-related">{current.places.map(([id,label])=><button key={id} onClick={()=>onPlace(id)}>{label}<span>查看城市资料 →</span></button>)}</div>
   <details className="chronology-sources"><summary>本节点的史料依据</summary>{current.sources.map(key=><a key={key} href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a>)}</details>
  </article>:<p className="e-note">当前为公元 {year} 年。500—800 年可在地域导览中查看所处政治阶段；上方可进入已核对的关键节点，相邻事件不会自动套入本年。</p>}

 </section>;
}
