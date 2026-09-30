import {administrations395,administration395ById,administration395Source,administration395Limit} from './administration-395';
export function Administration395({active,selected,onOpen,onSelect,onRegion,onPlace,onClose}:{active:boolean;selected?:string;onOpen:()=>void;onSelect:(id:string)=>void;onRegion:(id:string)=>void;onPlace:(id:string)=>void;onClose:()=>void}){
 const area=active&&selected?administration395ById(selected):undefined;
 return <section className="admin395" aria-label="395 年行政分区">
  <small>把帝国拆开看 · 约公元 395 年</small><h2>{area?.name??'帝国内部由哪些地域组成？'}</h2>
  {!active?<><p>四个行政大区横跨陆地与海岸。切换到示意图，再从大区进入地域和城市。</p><button className="e-primary" onClick={onOpen}>打开 395 年行政分区示意 →</button></>:<>
   <p className="admin395-intro">两组朝廷，四个行政大区。大区属于罗马帝国的治理体系，不是四个独立国家。</p>
   <div className="admin395-grid">{administrations395.map(a=><button key={a.id} aria-pressed={area?.id===a.id} onClick={()=>onSelect(a.id)} style={{borderLeftColor:a.color}}><small>{a.side==='west'?'西部 · 霍诺里乌斯':'东部 · 阿卡狄乌斯'}</small><strong>{a.name}</strong><span>在地图上展开 →</span></button>)}</div>
   {area&&<article aria-label="行政大区详情"><h3>在哪里？</h3><p>{area.geography}</p><h3>包含哪些地域？</h3><p>{area.parts}</p><div className="h-related">{area.regions.map(([id,name])=><button key={id} onClick={()=>onRegion(id)}>{name}<span>地域、居民与语言 →</span></button>)}</div><h3>从城市辨认位置</h3><div className="h-site-links">{area.cities.map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name}<span>古今地名与当时情况 →</span></button>)}</div><p>{area.note}</p></article>}
   <p className="e-note">{administration395Limit}</p><details><summary>分区依据与资料年代</summary><p>William R. Shepherd，《Historical Atlas》，1923 年版，第 42—43 页。此图是近代学者对古代的概括；本图层采用其四大区框架，手工概括边缘，不复制逐省细界。居民与语言请进入具体地域阅读。</p><a href={administration395Source} target="_blank" rel="noreferrer">核对原图与出版信息 ↗</a><p><a href="https://roman-emperors.sites.luc.edu/arcadius.htm" target="_blank" rel="noreferrer">核对 395 年东西朝廷与巴尔干冲突 ↗</a></p></details><button className="e-back" onClick={onClose}>返回 395 年城市归属对照 →</button>
  </>}
 </section>;
}
