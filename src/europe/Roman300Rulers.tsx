import {roman300Rulers,ruler300ById} from './roman-300-rulers';
import {region300ById} from './roman-300-regions';
import {frontier300ById} from './roman-300-frontiers';
import {historicalDetail} from './history-details';
import {courseSources} from './course-sources';

export function Ruler300Links({region,onSelect}:{region?:string;onSelect:(id:string)=>void}){
 const rulers=roman300Rulers.filter(r=>!region||r.regions.includes(region));if(!rulers.length)return null;
 return <section className="r300-rulers" aria-label="300 年皇帝入口"><h3>{region?'联系到四帝共治':'这一年，谁在治理罗马？'}</h3>
  {!region&&<p>一个帝国，两位正帝、两位副帝。第一轮共治：293—305 年。点人物，查看分掌地域和任职时间。</p>}
  <div className="r300-grid">{rulers.map(r=><button key={r.id} onClick={()=>onSelect(r.id)}><small>{r.role}</small><strong>{r.name}</strong><span>{r.direction} →</span></button>)}</div>
 </section>;
}

export function Roman300Ruler({id,onRuler,onBack,onRegion,onPlace,onFrontier,onLocate}:{id:string;onRuler:(id:string)=>void;onBack:()=>void;onRegion:(id:string)=>void;onPlace:(id:string)=>void;onFrontier:(id:string)=>void;onLocate:()=>void}){
 const r=ruler300ById(id);if(!r)return null;const partner=ruler300ById(r.partner)!;
 return <article className="e-detail r300-detail" aria-label="300 年皇帝与分掌区">
  <button className="e-back" onClick={onBack}>← 返回 300 年地域索引</button><small>公元 300 年 · 罗马帝国 · {r.role}</small><h2>{r.name}</h2>
  <div className="h-period"><strong>{r.tenure}</strong><span>地图停留在 300 年。任职年表中的前后阶段不表示已经切换地图。</span></div>
  <h3>当时是什么身份？</h3><p>{r.identity}</p>
  <div className="h-related"><button onClick={()=>onRuler(partner.id)}>同组共治者：{partner.name}<span>{partner.role} · 查看其分掌方向 →</span></button></div>
  <h3>分掌方向在哪里？</h3><p>{r.geography}</p><button className="e-primary" onClick={onLocate}>查看分掌方向 →</button>
  <h3>从哪些地域展开？</h3><div className="r300-grid">{r.regions.map(id=><button key={id} onClick={()=>onRegion(id)}>{region300ById(id)!.name}<span>组成地域、居民与语言 →</span></button>)}</div>
  <p className="e-note">这些是分掌方向的阅读入口，不是个人私有领土或完整行省名录；各皇帝的行动和责任会跨越地图概括线。</p>
  <h3>驻地和重要城市</h3><p>{r.seatNote}</p><div className="h-related">{r.cities.map(id=><button key={id} onClick={()=>onPlace(id)}>{historicalDetail(id,300)?.title??id}<span>{id===r.seat?'重要宫廷驻地':'关联城市'} · 查看详情 →</span></button>)}</div>
  <h3>相关边防</h3><div className="r300-grid">{r.frontiers.map(id=><button key={id} onClick={()=>onFrontier(id)}>{frontier300ById(id)!.name}<span>查看防线与邻国 →</span></button>)}</div>
  <h3>这轮任职怎样结束？</h3><p>{r.after}</p>
  <details className="r300-method"><summary>原名与资料依据</summary><p>{r.latin}</p>{r.sources.map(key=><p key={key}><a href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a></p>)}</details>
  <p className="late-reading">配合顾衡第 98—99 讲，PDF 第 792—805 页阅读。此处为独立整理，人物出身不代表辖区居民构成。</p>
 </article>;
}
