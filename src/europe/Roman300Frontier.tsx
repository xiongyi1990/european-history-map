import {frontier300ById,roman300Frontiers} from './roman-300-frontiers';
import {region300ById} from './roman-300-regions';
import {courseSources} from './course-sources';
import {historicalDetail} from './history-details';

export function Frontier300Links({region,onSelect}:{region?:string;onSelect:(id:string)=>void}){
 const entries=roman300Frontiers.filter(f=>!region||f.regions.includes(region));
 if(!entries.length)return null;
 return <section className="r300-frontiers" aria-label="300 年边防入口"><h3>{region?'这一区域附近的边防':'沿边境读懂帝国的范围'}</h3><p>橙色虚线：边防走向示意；紫色点线：东方地点关系。点击查看两侧地域与年代变化。</p><div className="r300-grid">{entries.map(f=><button key={f.id} onClick={()=>onSelect(f.id)}>{f.name}<span>{f.kind==='defence'?'边防走廊':'地点关系，不是国界'} →</span></button>)}</div></section>;
}

export function Roman300Frontier({id,onBack,onRegion,onPlace,onLocate}:{id:string;onBack:()=>void;onRegion:(id:string)=>void;onPlace:(id:string)=>void;onLocate:()=>void}){
 const f=frontier300ById(id);if(!f)return null;
 return <article className="e-detail r300-detail" aria-label="300 年边防详情">
  <button className="e-back" onClick={onBack}>← 返回 300 年地域索引</button>
  <small>公元 300 年 · {f.kind==='defence'?'边防走廊':'东方政治关系'}</small><h2>{f.name}</h2>
  <div className="h-period"><strong>先看地图上的线代表什么</strong><span>{f.precision}</span></div>
  <h3>在哪里？</h3><p>{f.location}</p><button className="e-primary" onClick={onLocate}>查看整段范围 →</button>
  <h3>300 年的状态</h3><p>{f.status}</p>
  <section className="r300-frontier-sides" aria-label="边境两侧"><div><strong>罗马一侧</strong><p>{f.romanSide}</p></div><div><strong>对侧与周边</strong><p>{f.otherSide}</p></div></section>
  <h3>前后怎样变化？</h3><ol className="r300-chronology">{f.chronology.map(c=><li key={c.date}><strong>{c.date}</strong><p>{c.text}</p></li>)}</ol>
  <h3>沿途与周边城市</h3><div className="h-related">{f.cities.map(id=><button key={id} onClick={()=>onPlace(id)}>{historicalDetail(id,300)?.title??id}<span>查看城市与居民 →</span></button>)}</div>
  <h3>继续展开两侧地域</h3><div className="r300-grid">{f.regions.map(id=><button key={id} onClick={()=>onRegion(id)}>{region300ById(id)!.name}<span>地域组成与语言 →</span></button>)}</div>
  <details className="r300-method"><summary>依据与绘图方法</summary><p>线条由编者概括绘制，供阅读定位。来源支持历史背景与大体位置，不提供公元 300 年逐米测绘的疆界。</p>{f.sources.map(key=><p key={key}><a href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a></p>)}</details>
 </article>;
}
