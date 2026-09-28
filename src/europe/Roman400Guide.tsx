import {questions400,reading400,west400,east400} from './roman-400';
import {courseSources} from './course-sources';
import type {Region300} from './roman-300-regions';

export function Roman400Guide({regions,onRegion,onPlace,onEmpire}:{regions:Region300[];onRegion:(id:string)=>void;onPlace:(id:string)=>void;onEmpire:(id:'western-rome'|'eastern-rome')=>void}){
 const groups=[{title:'西部：霍诺留',years:'西部统治 395—423 年',center:'米兰',place:'milan',ids:west400,empire:'western-rome' as const},
 {title:'东部：阿卡狄乌斯',years:'东方统治 395—408 年',center:'君士坦丁堡',place:'byzantium',ids:east400,empire:'eastern-rome' as const},
 {title:'萨珊：伊嗣俟一世',years:'在位 399—420 年',center:'泰西封',place:'ctesiphon',ids:['asoristan','pars','khuzestan'],empire:undefined}];
 return <section className="fourth-guide ad400-guide" aria-label="400 年详细阅读导览">
  <small>公元 400 年 · 从版图读到城市生活</small><h2>两个罗马朝廷，同一个地中海世界</h2>
  <p>先辨认宫廷和组成地域，再看边疆、军队与居民。西部尚未瓦解，五世纪后来的王国不能提前放进这一年。</p>
  <div className="fourth-realms">{groups.map(g=><article key={g.title}><h3>{g.title}</h3><small>{g.years}</small><p>宫廷中心：<button onClick={()=>onPlace(g.place)}>{g.center} →</button></p>
   {g.empire?<button onClick={()=>onEmpire(g.empire!)}>查看帝国范围与沿革 →</button>:<button onClick={()=>onRegion('persia')}>查看萨珊帝国 →</button>}
   <details><summary>展开 {g.ids.length} 组组成地域</summary><div className="h-related">{g.ids.map(id=>{const r=regions.find(r=>r.id===id);return r?<button key={id} onClick={()=>onRegion(id)}>{r.name}<span>位置、城市与居民 →</span></button>:null})}</div></details>
  </article>)}</div>
  <h3>读 400 年，先弄清这六件事</h3>
  {questions400.map(q=><details className="ad400-question" key={q.id}><summary>{q.title}</summary><p>{q.text}</p><div className="h-related">{q.places.map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name} →</button>)}{q.regions.map(([id,name])=><button key={id} onClick={()=>onRegion(id)}>{name}<span>展开地域 →</span></button>)}</div><a href={courseSources[q.source].url} target="_blank" rel="noreferrer">核对这一问题的资料 ↗</a></details>)}
  <details className="ad400-question"><summary>周边还有哪些王国和社会？</summary><p>亚美尼亚处在分区之后；高加索、黑海北岸和莱茵河外侧不能直接套用现代国界。匈人和哥特诸集团也不是同质的现代民族国家。</p><div className="h-related">{['armenia','iberia-caucasus','albania-caucasus','bosporus','franks','alamanni','goths','huns4','sarmatians','north-britain','ireland','north'].map(id=>{const r=regions.find(r=>r.id===id);return r?<button key={id} onClick={()=>onRegion(id)}>{r.name} →</button>:null})}</div></details>
  <details className="ad400-question"><summary>怎样把行省、居民和语言分开看？</summary><p>帝国 → 行政大区 → 管区 → 行省，是理解晚期罗马的一条线索；本图的地域卡可能合并多省，也可能跨越两部。行政管区与基督教教区并不是一回事。</p><p>《百官志》各部分编订时间不同，不能当作 400 年同一天的完整实控清单。色块是参考疆界，地域标签帮助定位；居民按地方社会、语言、宗教与军政身份分别叙述。</p><a href={courseSources.notitia400.url} target="_blank" rel="noreferrer">查看《百官志》与编订年代说明 ↗</a></details>
  <details className="ad400-question"><summary>对照顾衡课程阅读</summary>{reading400.map(r=><p key={r.chapter}>第 {r.chapter} 讲 · PDF 第 {r.pages.join('—')} 页<br/>{r.note}</p>)}<p>讲次是阅读入口，卡片文字与史实依据另行整理。</p></details>
 </section>;
}
