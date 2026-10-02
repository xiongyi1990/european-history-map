import {administrativeGroupsAt,notitiaDateNote} from './administrative-groups-395';

export function AdministrativeGroups395({division,selected,onLocate,onRegion,onPlace}:{division:string;selected?:string;onLocate:(id:string|undefined)=>void;onRegion:(id:string)=>void;onPlace:(id:string)=>void}){
 const groups=administrativeGroupsAt(division,395).filter(g=>!selected||g.id===selected);
 return <section className="admin395-groups" aria-label="管区与行省导览">
  <h3>继续拆开：管区与行省</h3>
  <p>朝廷 → 行政大区 → 管区 → 行省。下列卡片把名册中的分组与今天的地理位置连接起来；部分卡片合并相关地域，便于阅读。</p>
  <p className="e-note">{notitiaDateNote}</p>
  {selected&&<button className="e-back" onClick={()=>onLocate(undefined)}>← 返回本大区全部分组</button>}
  {groups.map(g=><details key={g.id+':'+(selected??'all')} open={selected===g.id?true:undefined} aria-label={g.name}>
   <summary><strong>{g.name}</strong><span>{g.modern}</span></summary>
   <div className="admin395-group-body">
    <button className="e-primary" onClick={()=>onLocate(g.id)}>在地图上定位这组地域 →</button>
    <p className="e-note">地图标签与缩放范围按下方参考城市安排，用于辨认相对位置；不表示管区中心、首府或完整疆域。</p>
    <h4>行省举例（《官职志》所见）</h4><ul>{g.provinces.map(p=><li key={p}>{p}</li>)}</ul>
    <p>{g.note}</p>
    <h4>查看地域、居民与语言</h4>
    <div className="h-related">{g.regions.map(([id,name])=><button key={id} onClick={()=>onRegion(id)}>{name}<span>展开这片地域 →</span></button>)}</div>
    <h4>用城市在地图上定位</h4>
    <div className="h-site-links">{g.cities.map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name}<span>以这座城市定位 →</span></button>)}</div>
    <a href={g.source} target="_blank" rel="noreferrer">核对《官职志》相关名册 ↗</a>
   </div>
  </details>)}
  <p className="e-note">上述地域入口可能跨越多个古代行政单位。地图定位后，可继续查看对应年份的居民与语言；行政管辖范围不等于统一族群或语言区。</p>
 </section>;
}
