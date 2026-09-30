import {readingRegionsAt,inReadingCenturies} from './reading-centuries';
import {detailsAt} from './history-details';
import {fourthEvents} from './fourth-century';
import {fifthEvents} from './fifth-century';
import {fourthBattles} from './fourth-century-battles';
import {fifthBattles} from './fifth-century-battles';

export function LateAntiqueOverview({year,onYear,onRegion,onBattle}:{year:number;onYear:(y:number)=>void;onRegion:(id:string)=>void;onBattle:(id:string)=>void}){
 if(!inReadingCenturies(year))return null;
 const regions=readingRegionsAt(year),cityCount=new Set(detailsAt(year).map(d=>d.placeId)).size;
 const events=[...fourthEvents,...fifthEvents].filter((e,i,a)=>a.findIndex(v=>v.year===e.year)===i),battles=[...fourthBattles,...fifthBattles];
 const routes=year<=400?fourthBattles:fifthBattles;
 const areas=[['italy','意大利与朝廷'],['gaul','高卢与后继王权'],['hispania','伊比利亚半岛'],['britain','不列颠'],['africa','北非与迦太基'],['thrace','巴尔干与罗马东方'],['armenia','亚美尼亚与高加索'],['persia','萨珊帝国内部'],['franks','法兰克与莱茵下游'],['goths','哥特与多瑙河'],['ireland','爱尔兰'],['north','北海与斯堪的纳维亚']];
 return <section className="fourth-guide" aria-label="4—5世纪地图总览">
  <h2>4—5世纪：把两百年连起来看</h2><p>当前 {year} 年 · {regions.length} 组地域 · {cityCount} 处有时段记录的城市。先找地域，再看当时的政权、居民、语言与古今地名。</p>
  <div className="fourth-step"><button onClick={()=>onYear(301)}>四世纪起点 · 301 年</button><button onClick={()=>onYear(401)}>五世纪起点 · 401 年</button></div>
  <label className="fourth-year">连续年份 <input aria-label="四至五世纪连续时间轴" type="range" min="301" max="500" value={Math.max(301,year)} onChange={e=>onYear(Number(e.target.value))}/><output>{year} 年</output></label>
  <details open><summary>按地域查找</summary><div className="h-related">{areas.map(([id,name])=><button key={id} onClick={()=>onRegion(id)}>{name}<span>定位、归属与居民 →</span></button>)}{year>=370&&<button onClick={()=>onRegion('huns4')}>匈人联盟的变化<span>首领、出征与瓦解 →</span></button>}</div></details>
  <details><summary>本世纪的重要战争路线 · {routes.length} 个专题</summary><div className="h-related">{routes.map(b=><button key={b.id} onClick={()=>onBattle(b.id)}>{b.title}<span>{b.period} · {b.stages.length} 个阶段 →</span></button>)}</div></details>
  <details><summary>这一部分覆盖到什么程度？</summary><p>301—500 年都能查询所处政治阶段和已收录地域。两世纪共有 {events.length} 个关键年份、{battles.length} 个战争专题；交接年同时说明前后变化，居民与语言分别记录。</p><p>疆界参考仍是300、400、500年快照，中间年份注明借用年代。地域框只定位空间；逐年精确边界、全部地方史及人口比例尚未完成，史料空档不由猜测填充。</p></details>
 </section>;
}
