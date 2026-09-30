import {controlTransitions,controlTransitionAt,controlPowers,type ControlMoment} from './late-antique-control';
import {courseSources} from './course-sources';
import {ancientPlaces} from './model';

export function LateAntiqueControl({year,moment,enabled,onYear,onMoment,onEnabled,onPlace,onRegion}:{year:number;moment:ControlMoment;enabled:boolean;onYear:(y:number)=>void;onMoment:(v:ControlMoment)=>void;onEnabled:(v:boolean)=>void;onPlace:(id:string)=>void;onRegion:(id:string)=>void}){
 const transition=controlTransitionAt(year),powers=transition?[...new Set(transition.anchors.map(a=>a[moment]))]:[];
 return <section className="control-guide" aria-label="关键年份政权对照">
  <h2>关键年份：政权变化对照</h2>
  <nav className="control-years" aria-label="政权对照年份">{controlTransitions.map(t=><button key={t.year} aria-pressed={year===t.year} onClick={()=>onYear(t.year)}>{t.year} 年</button>)}</nav>
  {!transition?<p>选择上面的年份，看事件前后哪些地点改变归属，以及哪些地方保持延续。</p>:<>
   <h3>{transition.title}</h3><div className="control-moments" role="group" aria-label="事件前后">{(['before','after'] as const).map(v=><button key={v} aria-pressed={moment===v} onClick={()=>onMoment(v)}>{v==='before'?transition.beforeLabel:transition.afterLabel}</button>)}</div>
   <label className="e-check"><input type="checkbox" checked={enabled} onChange={e=>onEnabled(e.target.checked)}/>在地图上按地点归属着色</label>
   <p>{transition.summary}</p>
   <ul className="control-legend" aria-label="地点归属图例">{powers.map(id=><li key={id}><i style={{background:controlPowers[id].color}}/>{controlPowers[id].name}</li>)}</ul>
   <p className="e-note">{transition.anchors.length} 个核查地点。颜色表示城市政治背景；未着色的地点不表示无人居住或没有政权。圆圈不表示疆域或居民分布。</p>
   <div className="control-changes">{transition.anchors.filter(a=>a.changed).map(a=>{const place=ancientPlaces.find(p=>p.id===a.placeId)!;return <article key={a.placeId}>
    <button onClick={()=>onPlace(a.placeId)}>{place.name}<span>查看城市 →</span></button>
    <p><span style={{color:controlPowers[a.before].color}}>{controlPowers[a.before].name}{a.beforeStatus&&` · ${a.beforeStatus}`}</span><b> → </b><span style={{color:controlPowers[a.after].color}}>{controlPowers[a.after].name}{a.afterStatus&&` · ${a.afterStatus}`}</span></p>
    <p>{a.note}</p><button className="e-back" onClick={()=>onRegion(a.region)}>查看组成地域 →</button>
   </article>})}</div>
   <details><summary>核查来源与疆界精度</summary><p>{transition.limit}</p><p>这组对照没有新增精确疆界多边形。关闭地点归属着色后，可查看标注年代的百年疆界参考。</p>{transition.sources.map(id=><a key={id} href={courseSources[id].url} target="_blank" rel="noreferrer">{courseSources[id].title} ↗</a>)}</details>
  </>}
 </section>;
}
