import {RealmComposition} from './RealmComposition';
import {useState,type ReactNode} from 'react';
import {yearReadingAt} from './year-reading';
import {earlyRegionAt} from './early-500-regions';
import {courseSources} from './course-sources';
export function YearReadingGuide({year,onRegion,onYear,onLocate,boundary}:{boundary?:ReactNode;year:number;onRegion:(id:string)=>void;onYear:(year:number)=>void;onLocate:(coordinates:[number,number][])=>void}){
 const [walk,setWalk]=useState<{year:number;index:number}>();
 const reader=yearReadingAt(year);if(!reader)return null;
 const active=walk?.year===year?walk.index:undefined;
 return <section className="year-reader" aria-label={`${year} 年新手总览`}>
  <header><span className="year-reader-kicker">第一次读这张图，从这里开始</span><h2>公元 {year} 年，先看全局</h2><p>{reader.headline}</p></header>
  <nav className="year-walk" aria-label="三步认识当年地图">{reader.powers.slice(0,3).map((p,index)=><button key={p.id} aria-pressed={active===index} onClick={()=>{setWalk({year,index});const r=earlyRegionAt(p.regions[0],year);if(r)onLocate(r.bounds);}}><b>{index+1}</b><span>{p.direction}<small>{p.mapName}</small></span></button>)}</nav>
  {active!==undefined&&<p className="year-walk-message" role="status">第 {active+1} 步：{reader.powers[active].where} 镜头只帮你找位置，不是疆界。</p>}
  {boundary}
  <details className="year-reader-rule"><summary>编号怎样读？为什么不是九个国家？</summary><p>数字和地图名称一一对应。下面按阅读方向分组：一个帝国可以跨多个地域，一组也可能有多个政权。点击名称，再看地域、城市与居民。</p></details>
  <div className="year-power-list">{reader.powers.map(p=>{const r=earlyRegionAt(p.regions[0],year)!;return <article key={p.id} className="year-power">
   <div className="year-power-title"><b>{p.number}</b><div><small>{p.direction}</small><h3>{p.title}</h3></div></div><p>{p.where}</p><p className="year-power-remember">{p.remember}</p><p className="year-power-stage"><b>这一年的地域状态</b>{r.phase.name}<small>地域说明分段：{r.phase.from}—{r.phase.to} 年</small></p><RealmComposition id={p.id} year={year} onRegion={onRegion} onYear={onYear} onLocate={onLocate}/>
   <button className="year-power-open" onClick={()=>onRegion(p.regions[0])}>读懂{p.mapName}的位置与居民 →</button>
   <details><summary>相关地域与依据</summary><div className="year-power-regions">{p.regions.map(id=>{const region=earlyRegionAt(id,year)!;return <button key={id} onClick={()=>onRegion(id)}>{region.name} →</button>})}</div>{[...new Set([...r.sources,...r.phase.sources])].map(key=><a key={key} href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a>)}</details>
  </article>})}</div>
  <div className="year-reading-context"><h3>这个年份前后，先记住什么？</h3>{reader.recent&&<button onClick={()=>onYear(reader.recent!.year)}><small>{reader.recent.year===year?'本年的大转折':'此前最近的大转折'} · {reader.recent.year} 年</small><strong>{reader.recent.title}</strong></button>}{reader.next&&<button onClick={()=>onYear(reader.next!.year)}><small>接下来 · {reader.next.year} 年</small><strong>{reader.next.title}</strong></button>}<p>这是前后背景，不把相邻年份的事件套入 {year} 年。</p></div>
  <details className="year-reading-terms"><summary>新手容易混淆的几个词</summary><dl><dt>政权和王朝</dt><dd>王朝是统治家族；换王朝不等于居民全部更换，也不一定重建一个国家。</dd><dt>地域和国家</dt><dd>高卢、伊比利亚、北非等先是找位置的地域名称，不直接等于今天国家的边界。</dd><dt>名义归属和实际控制</dt><dd>承认某位皇帝或哈里发，不等于他能直接管理每个地方。</dd><dt>东罗马与拜占庭</dt><dd>这里指同一个延续下来的罗马帝国；“拜占庭”是后世常用名称，首都在君士坦丁堡。</dd><dt>宫相</dt><dd>法兰克王国的重要官职；加洛林家族先掌握宫相权力，751 年取得王位。</dd><dt>哈里发与埃米尔</dt><dd>哈里发是伊斯兰世界的统治者称号；埃米尔常指地方军事或政治统治者。具体权力和独立程度要看时代。</dd><dt>居民与语言</dt><dd>统治者、军队、本地居民、宗教与母语分别看；疆界颜色不能代替人群分布。</dd></dl></details>
 </section>;
}
export function YearBoundaryKey({year,boundaryYear,borrowed,onBorrowed}:{year:number;boundaryYear?:number;borrowed:boolean;onBorrowed:(value:boolean)=>void}){
 const same=boundaryYear===year;
 return <aside className={'year-boundary-key'+(borrowed&&!same?' is-borrowed':'')} aria-label="年份与疆界说明"><strong>先核对年份，再看颜色</strong><p>{same?`你选择公元 ${year} 年，疆界参考资料也标为 ${year} 年；仍是概略参考，不是精确国界测绘。`:boundaryYear===undefined?`你选择公元 ${year} 年；目前没有可用的疆界参考。已有地点和文字资料仍可阅读。`:borrowed?`你正在读 ${year} 年，叠加的是 ${boundaryYear} 年参考疆界，相差 ${Math.abs(boundaryYear-year)} 年。这些色块不是 ${year} 年的版图。`:`你正在读 ${year} 年；目前未叠加 ${boundaryYear} 年的邻近疆界。地点和文字按各自适用时段显示。`}</p><details className="year-boundary-legend"><summary>地图符号与资料范围</summary><ul><li>圆点：城市或遗址</li><li>名称：政权或地域入口</li><li>色块：标注年份的疆界参考</li></ul><small>地形、海岸与湖面是现代地理参照；没有色块不等于无人居住。</small></details>{boundaryYear!==undefined&&!same&&<label className="e-check"><input type="checkbox" checked={borrowed} onChange={e=>onBorrowed(e.target.checked)}/>叠加 {boundaryYear} 年疆界参考</label>}</aside>;
}
