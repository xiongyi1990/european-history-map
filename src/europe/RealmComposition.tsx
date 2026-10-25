import {useState} from 'react';
import {realmCompositionAt,realmRelations} from './early-realm-composition';
import {courseSources} from './course-sources';
export function RealmComposition({id,year,onRegion,onLocate,onYear}:{id:string;year:number;onRegion:(id:string)=>void;onLocate:(bounds:[number,number][])=>void;onYear:(year:number)=>void}){
 const [located,setLocated]=useState<{year:number;id:string}>();
 const realm=realmCompositionAt(id,year);if(!realm)return null;
 const focus=located?.year===year?realm.parts.find(p=>p.id===located.id):undefined;
 return <details className="realm-composition" aria-label={`${realm.title}的地域关系`}>
  <summary>展开内部地域与控制关系</summary>
  <section aria-label={`${year} 年${realm.title}地域关系`}>
   <h4>{realm.title} · {year} 年</h4><p className="realm-timeline"><b>政权时间线</b>{realm.timeline}<a href={courseSources[realm.source].url} target="_blank" rel="noreferrer">依据 ↗</a></p>
   <p className="realm-composition-note">核心、地方权力与邻国分开看；点击地域可定位，再查看居民。</p>
   <nav className="realm-years" aria-label={`${realm.title}关键变化年份`}>{realm.milestones.map(y=><button key={y} aria-current={year===y?'date':undefined} onClick={()=>onYear(y)}>{y}</button>)}</nav>
   {focus&&<p role="status" className="realm-location-status">正在定位：{focus.name} · {realmRelations[focus.stage.relation].label}。镜头框用于找位置，不是疆界。</p>}
   <details className="realm-relation-key"><summary>这些关系是什么意思？</summary><p>下方也列出不属同一政权的对照地域。镜头框帮助定位，本轮没有新增精确疆界。</p><dl>{Object.entries(realmRelations).map(([key,r])=><div key={key}><dt>{r.label}</dt><dd>{r.meaning}</dd></div>)}</dl></details>
   {(['inside','outside'] as const).map(group=>{const parts=realm.parts.filter(p=>group==='outside'?p.stage.relation==='outside':p.stage.relation!=='outside');return parts.length>0&&<div key={group} className="realm-parts-group"><h5>{group==='outside'?'地理对照：不属同一政权':'统治、地方权力与政治联系'}</h5>{parts.map(p=><article key={p.id} aria-label={p.name+'的控制关系'} className={focus?.id===p.id?'is-located':''}>
    <div className="realm-part-heading"><strong>{p.name}</strong><span className={'realm-relation is-'+p.stage.relation}>{realmRelations[p.stage.relation].label}</span></div>
    <p>{p.stage.text}</p><small className="realm-stage-date">说明适用分段：{p.stage.from===p.stage.to?p.stage.from:p.stage.from+'—'+p.stage.to} 年；不是政权完整寿命。</small>
    <div className="realm-part-actions"><button onClick={()=>{setLocated({year,id:p.id});onLocate(p.bounds);}}>在地图上找位置</button><button onClick={()=>onRegion(p.region)}>看地域与居民 →</button></div>
    <details className="realm-part-sources"><summary>核对这条关系</summary>{p.stage.sources.map(key=><a key={key} href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a>)}</details>
   </article>)}</div>;})}
  </section>
 </details>;
}
