import {millenniumContexts,millenniumContextAt} from './millennium-context';
interface Props {selected:string;onSelect:(id:string|undefined)=>void;onPlace:(id:string)=>void}
export function Contemporary1000({selected,onSelect,onPlace}:Props){
 const region=millenniumContextAt(1000,selected);
 return <section className="frankish-partitions millennium-context" aria-label="1000年同期欧洲">
  <button className="e-back" onClick={()=>onSelect(undefined)}>← 返回中西欧王权地图</button>
  <header><small>同一时间 · 六个方向</small><h2>1000年，欧洲其他地方呢？</h2></header>
  <p>从法兰克继承诸国向外看：越过海峡、比利牛斯山、多瑙河，再沿第聂伯河找到黑海。</p>
  <p className="frankish-scope"><strong>定位标签，不是疆界</strong>中西欧保留原有地域色块，新增六个方向用可点击标签和城市定位。镜头框不是国界；本页不是全欧洲政权清单。</p>
  <button className="e-primary" onClick={()=>onSelect('all')}>查看六个方向全景 →</button>
  <nav className="millennium-context-nav" aria-label="1000年同期地域">{millenniumContexts.map(c=><button key={c.id} aria-pressed={selected===c.id} onClick={()=>onSelect(c.id)}><strong>{c.name}</strong><small>{c.direction}</small></button>)}</nav>
  {region?<article className="frankish-realm millennium-context-detail" aria-label="同期地域详情">
   <h3>{region.name}</h3><p>{region.direction}</p><p className="frankish-dates">{region.dates}</p>
   <h4>谁在统治？</h4><p>{region.power}</p>
   <h4>从哪些地域理解？</h4><ul>{region.parts.map(p=><li key={p}>{p}</li>)}</ul>
   <h4>与邻国是什么关系？</h4><p>{region.relationship}</p>
   <details className="frankish-people"><summary>居民、身份与语言</summary><dl><dt>居民与身份</dt><dd>{region.people}</dd><dt>语言</dt><dd>{region.language}</dd></dl></details>
   <h4>从城市辨认位置</h4><div className="h-site-links">{region.places.map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name}<span>查看古今地名与城市资料 →</span></button>)}</div>
   {region.reading&&<details className="frankish-reading"><summary>对照顾衡课程阅读</summary><p>第 {region.reading.chapter} 讲 · PDF {region.reading.pages.join('—')} 页</p><p>{region.reading.note}</p><small>PDF物理页码；课程背景与1000年状态分别核对。</small></details>}
   <details className="frankish-sources"><summary>本卡依据</summary>{region.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>)}</details>
  </article>:<p className="frankish-instruction">先点一个方向。地图会移动到对应位置，保留1000年，不会跳到另一个时代。</p>}
 </section>;
}
