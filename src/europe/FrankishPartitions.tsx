import {partitionAt,partitionSources,partitionStageYears} from './frankish-partitions';

interface FrankishPartitionsProps {
 year:number;active:boolean;selected?:string;
 onOpen:()=>void;onClose:()=>void;onYear:(year:number)=>void;
 onSelect:(id:string|undefined)=>void;onPlace:(id:string)=>void;
}

export function FrankishPartitions({year,active,selected,onOpen,onClose,onYear,onSelect,onPlace}:FrankishPartitionsProps){
 const frame=partitionAt(year);
 if(!frame)return null;
 const successors=year>=900;
 const topic=successors?'法兰克继承诸国':'法兰克分裂';
 const realm=active?frame.realms.find(r=>r.id===selected):undefined;
 return <section className="frankish-partitions" aria-label={`${topic}地图`}>
  <header><small>{successors?'900—1000 · 中西欧地域关系':'加洛林王朝 · 分国地图'}</small><h2>{frame.title}</h2></header>
  {!active?<><p>{successors?'接着880年的分国往下看：洛塔林吉亚转向何处？奥托为什么既是国王又是皇帝？':'从凡尔登三分，到中部王国继续分割。在同一张地图比较王国范围、组成地域和统治者。'}</p><button className="e-primary" onClick={onOpen}>查看{topic}示意 →</button></>:<>
   <div className="frankish-stages" role="group" aria-label="选择历史阶段"><button aria-pressed={!successors} onClick={()=>onYear(843)}>843—880 分国</button><button aria-pressed={successors} onClick={()=>onYear(900)}>900—1000 继承诸国</button></div>
   <nav className={`frankish-years${successors?' successor-years':''}`} aria-label={`${topic}关键年份`}>{partitionStageYears(year).map(y=><button key={y} aria-current={year===y?'date':undefined} onClick={()=>onYear(y)}>{y}</button>)}</nav>
   <p className="frankish-event-date">{frame.eventDate}</p>
   <p>{frame.summary}</p>
   {successors&&<p className="frankish-scope"><strong>这张图怎么读</strong>色块定位中西欧的历史地域，颜色与资料说明所选年份的王权关系。它不是每年的实控疆界；未着色地区仍有居民和政权。</p>}
   <div className="frankish-change"><strong>这一次变了什么？</strong><p>{frame.change}</p></div>
   {frame.relationships&&<section className="frankish-relations" aria-label="此时的政治关系"><h3>先看谁与谁相连</h3>{frame.relationships.map(relation=><article key={relation.title}><strong>{relation.title}</strong><p>{relation.text}</p><div>{relation.realmIds.map(id=>{const item=frame.realms.find(r=>r.id===id);return item?<button key={id} onClick={()=>onSelect(id)} style={{borderLeftColor:item.color}}>{item.name} →</button>:null;})}</div></article>)}</section>}
   <p className="frankish-instruction">点选一个色块或下方名称，查看它在哪里、由哪些地域组成。</p>
   <div className="frankish-legend" role="group" aria-label="分国颜色与范围">{frame.realms.map(r=><button key={r.id} aria-pressed={realm?.id===r.id} onClick={()=>onSelect(r.id)} style={{borderLeftColor:r.color}}><span className="frankish-swatch" style={{backgroundColor:r.color}} aria-hidden="true"/><span><strong>{r.name}</strong><small>定位并展开 →</small></span></button>)}</div>
   {realm&&<article className="frankish-realm" aria-label="分国地域详情">
    <button className="e-back" onClick={()=>onSelect(undefined)}>← 查看全部{successors?'地域':'分国'}</button>
    <h3>{realm.name}</h3><p className="frankish-dates">{realm.dates}</p>
    <h4>在哪里？</h4><p>{realm.geography}</p>
    <h4>由哪些地域组成？</h4><ul>{realm.parts.map(part=><li key={part}>{part}</li>)}</ul>
    <h4>统治者与王国层次</h4><p><strong>{realm.ruler}</strong></p><p>{realm.status}</p>
    <details className="frankish-people"><summary>居民、身份与语言</summary><dl><dt>居民与身份</dt><dd>{realm.people}</dd><dt>语言</dt><dd>{realm.language}</dd></dl></details>
    <h4>从城市辨认位置</h4><div className="h-site-links">{realm.places.map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name}<span>古今地名与当时情况 →</span></button>)}</div>
   </article>}
   <p className="frankish-limit">{frame.note}</p>
   <details className="frankish-reading"><summary>对照顾衡课程阅读</summary>{frame.reading.map((r,i)=><p key={r.chapter+':'+i}>第 {r.chapter} 讲 · PDF {r.pages[0]}{r.pages[1]!==r.pages[0]?`—${r.pages[1]}`:''} 页{r.note&&<small>{r.note}</small>}</p>)}<small>页码从你提供的 PDF 第一页起计。</small></details>
   <details className="frankish-sources"><summary>地图依据与范围说明</summary><p>色块帮助比较这些年份的政治空间，边缘为概略示意；不是现代民族国界，也不表示居民具有同一种身份。</p>{(frame.sources??partitionSources).map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>)}</details>
   <button className="e-back frankish-close" onClick={onClose}>返回欧洲概览 →</button>
  </>}
 </section>;
}
