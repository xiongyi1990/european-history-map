import {roman300Regions,region300ById,region300Groups,type Region300Group} from './roman-300-regions';
import {courseSources} from './course-sources';
import {historicalDetail} from './history-details';
export function Roman300Atlas({selected,onRegion,onPlace,onBack}:{selected?:string;onRegion:(id:string)=>void;onPlace:(id:string)=>void;onBack:()=>void}){
 const r=selected?region300ById(selected):undefined;
 if(r)return <article className="e-detail r300-detail" aria-label="300 年地域详情">
  <button className="e-back" onClick={onBack}>← 返回 300 年地域索引</button>
  <small>公元 300 年 · {region300Groups[r.group]}</small><h2>{r.name}</h2>
  <div className="h-period"><strong>先在今天的地图上定位</strong><span>{r.modern}</span></div>
  <h3>当时属于谁？</h3><p>{r.polity}</p>
  <h3>里面有哪些地方？</h3><p>{r.parts}</p>
  <div className="h-related">{r.cities.map(id=><button key={id} onClick={()=>onPlace(id)}>{historicalDetail(id,300)?.title??id}<span>{r.group==='roman'?'查看地域内或相邻城市':'查看核心地点或邻近罗马参照点'} →</span></button>)}</div>
  <h3>居民与社会</h3><p>{r.people}</p><h3>语言与书写</h3><p>{r.language}</p>
  <h3>前后发生了什么？</h3><p>{r.change}</p>
  <button className="e-primary" onClick={()=>onRegion(r.id)}>在地图上查看这一带 →</button>
  <p className="e-note">地域名与镜头范围用于建立空间关系，不是行省或族群的精确疆界；同一地域可能跨越多个行政区。居民说明是地域背景，不是人口比例。</p>
  <details><summary>核对资料</summary>{r.sources.map(key=><p key={key}><a href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a></p>)}</details>
  <p className="late-reading">配合顾衡第 98 讲「四帝共治」、第 99 讲「君士坦丁（上）」阅读。PDF 第 792—805 页；地域条目为独立整理。</p>
 </article>;
 return <section className="r300-index" aria-label="300 年地域索引">
  <small>公元 300 年 · 从帝国到地域，再到城市</small><h2>把这一年的地图展开看</h2>
  <p>{roman300Regions.length} 组地域与周边社会。点名称，地图会定位到这一带，并打开居民、语言和城市资料。</p>
  {(Object.keys(region300Groups) as Region300Group[]).map(group=><details key={group} open className="r300-group"><summary>{region300Groups[group]} <span>{roman300Regions.filter(r=>r.group===group).length}</span></summary><div className="r300-grid">{roman300Regions.filter(r=>r.group===group).map(r=><button key={r.id} onClick={()=>onRegion(r.id)}>{r.name}<span>定位与详情 →</span></button>)}</div></details>)}
  <details className="r300-method"><summary>这份 300 年地图怎样读？</summary><p>同色罗马分掌区属于一个帝国；地图上的地域标签帮助识别行省群、地理地区及邻国。地域可以重叠，不等同于改革后的完整行政名录。</p><p>四帝共治第一轮为 293—305 年。300 年还没有君士坦丁堡新都、东西罗马 395 年分掌格局，也没有五世纪的法兰克、汪达尔或西哥特王国。</p><p>戴克里先—君士坦丁时期行政区划持续调整，约 314 年的名录不能逐项当成 300 年的确定边界。萨珊轮廓和部分罗马边境仍待精确重建。</p><a href={courseSources.dioceses300.url} target="_blank" rel="noreferrer">行政区划年代依据 ↗</a></details>
 </section>;
}
