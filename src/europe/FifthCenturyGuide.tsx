import {fifthEvents,fifthPhaseAt,fifthEast,fifthWest,fifthPersia,fifthReading,inFifthCentury} from './fifth-century';
import {courseSources} from './course-sources';
import {fifthAfrica,lateWestSources} from './fifth-century-rulers';
import {fifthVisigoths,fifthSuevi} from './fifth-century-western-kingdoms';
export function FifthCenturyGuide({year,onYear,onPlace,onRegion}:{year:number;onYear:(y:number)=>void;onPlace:(id:string)=>void;onRegion:(id:string)=>void}){
 if(!inFifthCentury(year))return null;
 const phase=fifthPhaseAt(year)!,current=fifthEvents.filter(e=>e.year===year),before=[...fifthEvents].reverse().find(e=>e.year<year),after=fifthEvents.find(e=>e.year>year);
 return <section className="fourth-guide" aria-label="400—500 年连续历史导览">
  <small>400—500 年 · 西部重组，东方延续</small><h2>{year} 年：各地怎样变化？</h2>
  <label className="fourth-year">逐年查看 <input aria-label="五世纪逐年时间轴" type="range" min="400" max="500" value={year} onChange={e=>onYear(Number(e.target.value))}/><output>{year} 年</output></label>
  <div className="fourth-step"><button disabled={!before} onClick={()=>before&&onYear(before.year)}>← {before?`${before.year}：${before.title}`:'世纪起点'}</button><button disabled={!after} onClick={()=>after&&onYear(after.year)}>{after?`${after.year}：${after.title}`:'世纪终点'} →</button></div>
  <p className="e-note">按年查看政治背景；同一年内可能先后易主。轮廓仍来自标注年份的参考地图，未重建 101 张逐年国界；地域和城市条目另记当年情况。</p>
  <div className="fourth-realms">
   <article><h3>{year<476?'罗马西部与地方势力':'意大利与西部后继政权'}</h3><p>{fifthWest(year)}</p><button onClick={()=>onPlace(year<402?'milan':'ravenna')}>查看宫廷城市 →</button><button onClick={()=>onRegion('italy')}>展开意大利地域 →</button>{lateWestSources(year).map(s=><p key={s}><a href={courseSources[s].url} target="_blank" rel="noreferrer">{courseSources[s].title} ↗</a></p>)}</article>
   <article><h3>罗马东方</h3><p>{fifthEast(year)}</p><button onClick={()=>onPlace('byzantium')}>君士坦丁堡 →</button><button onClick={()=>onRegion('thrace')}>巴尔干与海峡 →</button></article>
   <article><h3>萨珊帝国</h3><p>{fifthPersia(year)}。两河与伊朗高原的居民不能按王朝名称归成单一族群。</p><button onClick={()=>onPlace('ctesiphon')}>泰西封与王廷 →</button><button onClick={()=>onRegion('mesopotamia')}>罗马—萨珊边区 →</button></article>
   <article><h3>北非：迦太基与汪达尔</h3><p>{fifthAfrica(year)}</p><button onClick={()=>onPlace('carthage')}>查看迦太基 →</button><button onClick={()=>onRegion(year===400?'africa':'carthage-region5')}>北非王权中心 →</button><p><a href={courseSources[year>=477?'vandalKings5':'procopius5'].url} target="_blank" rel="noreferrer">{courseSources[year>=477?'vandalKings5':'procopius5'].title} ↗</a></p></article>
  </div>
  <details open><summary>高卢与伊比利亚：西哥特、苏维汇分别看</summary><div className="fourth-realms">
   <article><h3>西哥特：图卢兹与比利牛斯山两侧</h3><p>{fifthVisigoths(year)}</p><button onClick={()=>onPlace('toulouse')}>查看图卢兹 →</button><button onClick={()=>onRegion(year===400?'gaul':'aquitaine5')}>高卢西南的阿基坦 →</button>{year>400&&<button onClick={()=>onRegion('auvergne5')}>内陆奥弗涅与克莱蒙 →</button>}<p><a href={courseSources.hydatiusStudy5.url} target="_blank" rel="noreferrer">{courseSources.hydatiusStudy5.title} ↗</a></p></article>
   <article><h3>苏维汇：半岛西北的加拉埃西亚</h3><p>{fifthSuevi(year)}</p><button disabled={year===400} onClick={()=>onPlace('braga5')}>查看布拉加 →</button><button onClick={()=>onRegion(year===400?'hispania':'gallaecia5')}>定位半岛西北 →</button><p><a href={courseSources.westernKings5.url} target="_blank" rel="noreferrer">{courseSources.westernKings5.title} ↗</a></p></article>
  </div></details>
  <h3>这一年与前后转折</h3>
  {current.length?current.map(e=><article className="fourth-event" key={e.year}><h4>{e.title}</h4><p>{e.text}</p><div className="h-related">{e.places.map(id=><button key={id} onClick={()=>onPlace(id)}>{({milan:'米兰',ravenna:'拉文纳',byzantium:'君士坦丁堡',ctesiphon:'泰西封',rome:'罗马',carthage:'迦太基',hippo:'希波',braga5:'布拉加',orleans5:'奥尔良',soissons5:'苏瓦松',chalcedon5:'迦克墩'} as Record<string,string>)[id]??labels[id]??'查看关联城市'} →</button>)}</div>{[e.source,...e.moreSources??[]].map(s=><p key={s}><a href={courseSources[s].url} target="_blank" rel="noreferrer">{courseSources[s].title} ↗</a></p>)}</article>):<p>本年未单列新事件。最近转折为 {phase.from} 年“{phase.title}”；城市与地域仍可查询，不表示各地没有发生其他变化。</p>}
  <details open><summary>同一年，五个西部地域分别看</summary><div className="h-related">{[['britain','不列颠：罗马统治退出'],['gaul','高卢：多个王权与地方势力'],['hispania','伊比利亚：苏维汇与西哥特'],['africa','北非：从罗马到汪达尔'],['italy','意大利：从皇帝到国王']].map(([id,name])=><button key={id} onClick={()=>onRegion(id)}>{name}<span>位置、城市、居民与语言 →</span></button>)}</div></details>
  <details><summary>展开 {fifthEvents.length} 个关键年份</summary><div className="fourth-event-list">{fifthEvents.map(e=><button key={e.year} onClick={()=>onYear(e.year)} aria-current={year===e.year?'date':undefined}><b>{e.year}</b><span>{e.title}</span></button>)}</div></details>
  <details><summary>对照顾衡课程阅读</summary>{fifthReading.map(r=><p key={r.chapter}>第 {r.chapter} 讲 · PDF 第 {r.pages.join('—')} 页<br/>{r.note}</p>)}<p>课程仅作为阅读索引；政治、居民和地理说明另据公开资料整理。</p></details>
 </section>;
}
const labels:Record<string,string>={clermont5:'克莱蒙',massilia:'马赛',mainz:'美因茨',trier:'特里尔',london:'伦敦',arles:'阿尔勒',emerita:'梅里达',tarraco:'塔拉科',toulouse:'图卢兹',nisibis:'尼西比斯',edessa:'埃德萨',gades:'加的斯',ephesus:'以弗所',alexandria:'亚历山大里亚',sirmium:'西尔米乌姆',naissus:'奈苏斯',lyon:'里昂',hadrianople:'阿德里安堡',aquileia:'阿奎莱亚',salona:'萨洛纳',antioch:'安条克',tournai:'图尔奈',paris:'巴黎'};
