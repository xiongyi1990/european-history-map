import {fourthEvents,fourthPhaseAt,fourthReading,inFourthCentury,sasanianRulerAt} from './fourth-century';
import {courseSources} from './course-sources';

export function FourthCenturyGuide({year,onYear,onPlace,onBattle}:{year:number;onYear:(y:number)=>void;onPlace:(id:string)=>void;onBattle:(id:string)=>void}){
 if(!inFourthCentury(year))return null;
 const phase=fourthPhaseAt(year)!;
 const current=fourthEvents.filter(e=>e.year===year);
 const previous=[...fourthEvents].reverse().find(e=>e.year<year);
 const next=fourthEvents.find(e=>e.year>year);
 return <section className="fourth-guide" aria-label="300—400 年连续历史导览">
  <small>300—400 年 · 帝国、边疆与居民</small><h2>{year} 年：{phase.title}</h2>
  <label className="fourth-year">逐年查看 <input aria-label="四世纪逐年时间轴" type="range" min="300" max="400" value={year} onChange={e=>onYear(Number(e.target.value))}/><output>{year} 年</output></label>
  <div className="fourth-step"><button disabled={!previous} onClick={()=>previous&&onYear(previous.year)}>← {previous?`${previous.year} 年：${previous.title}`:'世纪起点'}</button><button disabled={!next} onClick={()=>next&&onYear(next.year)}>{next?`${next.year} 年：${next.title}`:'世纪终点'} →</button></div>
  <p className="e-note">年份表示年度概览；交接、战争和易手之年会同时说明前后变化。没有新事件的年份仍可查询所在阶段，不代表逐日疆界已经重建。</p>
  <div className="fourth-realms">
   <article><h3>罗马西部</h3><p>{phase.west}</p><button onClick={()=>onPlace('milan')}>米兰与意大利 →</button><button onClick={()=>onPlace('trier')}>特里尔与高卢 →</button></article>
   <article><h3>罗马东方</h3><p>{phase.east}</p><button onClick={()=>onPlace(year<330?'nicomedia':'byzantium')}>{year<330?'尼科米底亚':'君士坦丁堡'} →</button><button onClick={()=>onPlace('antioch')}>安条克与东方边防 →</button></article>
   <article><h3>萨珊帝国</h3><p>{sasanianRulerAt(year)}。与罗马隔上两河、亚美尼亚相接。</p><button onClick={()=>onPlace('ctesiphon')}>泰西封 →</button><button onClick={()=>onPlace('nisibis')}>尼西比斯：{year<363?'罗马边城':year===363?'本年易手':'萨珊控制'} →</button></article>
  </div>
  <h3>这一年发生了什么？</h3>
  {current.length?current.map(e=><article key={e.title} className="fourth-event"><h4>{e.title}</h4><small>{e.where}</small><p>{e.what}</p><p><strong>地图上怎样理解：</strong>{e.effect}</p><div className="h-related"><button onClick={()=>onPlace(e.places[0])}>定位事件地点 →</button>{e.battle&&<button onClick={()=>onBattle(e.battle!)}>分阶段查看战役 →</button>}</div><a href={courseSources[e.source].url} target="_blank" rel="noreferrer">核对事件资料 ↗</a></article>):<p>这一年没有单列已核对事件。当前沿用 {phase.from}—{phase.to} 年的政治阶段；可用上方按钮比较前后转折。</p>}
  <details><summary>展开本世纪 {fourthEvents.length} 个关键节点</summary><div className="fourth-event-list">{fourthEvents.map(e=><button key={e.year} aria-current={year===e.year?'date':undefined} onClick={()=>onYear(e.year)}><b>{e.year}</b><span>{e.title}<small>{e.where}</small></span></button>)}</div></details>
  <details><summary>配合顾衡课程阅读</summary>{fourthReading.map(r=><p key={r.chapter}>第 {r.chapter} 讲 · PDF 第 {r.pages.join('—')} 页<br/>{r.note}</p>)}<p>讲次与页码用于定位你提供的材料；事件、地域和居民说明另据公开史料整理。</p></details>
  <details><summary>覆盖范围与史料精度</summary><p>本世纪主要政治阶段、关键事件和已收录城市可连续查询。地域背景不等于逐城人口普查，点与连接线不等于精确疆域。尚未穷尽全部行省调整、村落、地方战事和族群迁徙。</p><a href={courseSources[phase.source].url} target="_blank" rel="noreferrer">当前政治阶段资料 ↗</a><p><a href={courseSources.sasanianDynasty4.url} target="_blank" rel="noreferrer">萨珊王朝年表 ↗</a></p></details>
 </section>;
}
