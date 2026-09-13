import {useEffect,useRef} from 'react';

export const westernRegions=[
 {id:'italy',name:'意大利',coords:[12.2,42.5] as [number,number],bounds:[[6,36],[19,47]] as [number,number][],modern:'今天意大利半岛及附近岛屿。',role:'西部朝廷的核心地区；罗马是象征中心，米兰和拉文纳先后是重要宫廷驻地。',after:'476 年后意大利由奥多亚塞统治；493 年后进入东哥特王国时期。',cities:['rome','milan','ravenna'],cityNames:['罗马','米兰','拉文纳']},
 {id:'gaul',name:'高卢',coords:[2.5,47] as [number,number],bounds:[[-5,42],[9,51.5]] as [number,number][],modern:'大体涉及今天法国、比利时及周边地区，不能直接等同法国国界。',role:'西部的军事、城市和税收重地；莱茵河一线联系着帝国边防。',after:'五世纪逐渐出现法兰克、西哥特、勃艮第等势力；并非在 476 年统一转交一个国家。',cities:['lyon','massilia'],cityNames:['里昂','马赛']},
 {id:'iberia',name:'伊比利亚',coords:[-4,40] as [number,number],bounds:[[-10,35],[4,44]] as [number,number][],modern:'今天西班牙、葡萄牙所在半岛；罗马时期常称“西班牙诸行省”。',role:'属于西部统治空间，由多个行省组成，不是一个古代西班牙民族国家。',after:'五世纪经历苏维汇、汪达尔、阿兰和西哥特等势力争夺；各地区变化不同步。',cities:['tarraco','new-carthage','gades'],cityNames:['塔拉科','新迦太基','加的斯']},
 {id:'britain',name:'罗马不列颠',coords:[-2,52.5] as [number,number],bounds:[[-6,49],[2,56]] as [number,number][],modern:'主要对应大不列颠岛南部。不是今天整个英国，更不包括整个爱尔兰。',role:'帝国西北边缘的行省群，隔英吉利海峡与高卢相连。',after:'约 410 年罗马中央统治退出；其后地方权力与盎格鲁—撒克逊诸势力逐渐形成，不立即成为统一英格兰。',cities:['london'],cityNames:['伦敦']},
 {id:'africa',name:'西部罗马的北非领地',coords:[7,34] as [number,number],bounds:[[-7,28],[24,38]] as [number,number][],modern:'主要看今天突尼斯、阿尔及利亚及邻近地中海南岸。这里不是整个北非；埃及属于东部。',role:'以迦太基周边为核心的粮食、税收与海运地区。隔海连接意大利。',after:'429 年汪达尔人进入北非，439 年夺取迦太基，西部朝廷失去关键资源中心；其他地区不能一概视作同日易手。',cities:['carthage','lepcis'],cityNames:['迦太基','大莱普提斯']},
 {id:'danube',name:'西部多瑙河沿线',coords:[14,47] as [number,number],bounds:[[8,43],[21,49.5]] as [number,number][],modern:'涉及今天奥地利、斯洛文尼亚、克罗地亚、匈牙利等国的部分地区。',role:'诺里库姆、潘诺尼亚和达尔马提亚等地区连接阿尔卑斯山与巴尔干；东西分掌与实控变化复杂。',after:'五世纪有匈人、哥特势力及地方罗马权力交错。意大利皇帝被废，不能概括所有地方政权的终点。',cities:['ravenna'],cityNames:['拉文纳（向意大利方向对照）']},
];
export const westernNodes=[
 {year:400,title:'西部朝廷与主要地区',text:'接近 395 年东西部朝廷分掌后的格局。下列六项是帮助阅读的历史地理分组，覆盖主要地区；不是完整行省名录，也不表示岛屿和边区全部列尽。'},
 {year:410,title:'不列颠退出与罗马遭劫',text:'不列颠的中央统治约在此时结束，罗马城也遭西哥特军队洗劫。罗马城受创与西部帝国消失是不同事件。'},
 {year:439,title:'迦太基被汪达尔夺取',text:'北非核心港口和资源区的失去削弱西部朝廷。意大利、高卢及其他地区的变化需要分别观察。'},
 {year:476,title:'意大利的西部皇帝被废',text:'476 年是常用终点：奥多亚塞废黜意大利的罗慕路斯·奥古斯都。尼波斯在达尔马提亚的皇帝身份延续至 480 年，因此并非所有罗马权威在同一天消失。'},
 {year:500,title:'帝国结束，地区继续存在',text:'意大利进入东哥特时期，高卢有法兰克、西哥特和勃艮第等势力，北非有汪达尔王国。旧地理地区仍能帮助理解中世纪的新政权。'},
];
export const westernSources=[
 {title:'西罗马的分掌与终结',url:'https://en.wikipedia.org/wiki/Western_Roman_Empire'},
 {title:'大都会博物馆：北非 1—500 年',url:'https://82nd-and-fifth.metmuseum.org/toah/ht/05/afw.html'},
 {title:'罗马不列颠的结束',url:'https://www.english-heritage.org.uk/learn/story-of-england/romans/'}
];
export function WesternEmpire({year,selected,onYear,onRegion,onCity,onClose}:{year:number;selected?:string;onYear:(y:number)=>void;onRegion:(id:string,coords:[number,number][])=>void;onCity:(id:string)=>void;onClose:()=>void}){
 const regionPanel=useRef<HTMLElement>(null);useEffect(()=>{if(selected)regionPanel.current?.scrollIntoView?.({block:'nearest',behavior:'smooth'})},[selected]);
 const region=westernRegions.find(r=>r.id===selected);
 const node=[...westernNodes].reverse().find(n=>n.year<=year);
 return <article className="e-detail"><button className="e-back" onClick={onClose}>← 返回时代概览</button><small>帝国 → 历史地区 → 城市</small><h2>西罗马帝国</h2>
 <div className="h-period"><strong>常用分期：395—476 年</strong><span>此前已有东西分掌；480 年也是讨论西部皇权终结的重要节点。</span></div>
 <h3>{year<395?'此年尚不能套用 395 年后的西罗马格局':year>=476?'帝国终结与地区延续':'西部朝廷存在的时期'}</h3>
 {node?<p><strong>{node.year} 年节点：{node.title}</strong><br/>{node.text}{year!==node.year&&<><br/>这是此前节点的背景说明，不是对 {year} 年每一条边界的精确复原。</>}</p>:<p>选择下面的节点，查看主要地区及其后来的去向。</p>}
 <div className="h-related">{westernNodes.map(n=><button key={n.year} onClick={()=>onYear(n.year)}>{n.year} 年<span>{n.title} →</span></button>)}</div>
 <h3>{year>=476?'原西部帝国的主要地区':'395 年前后由哪些主要地区组成？'}</h3><p>地区标签跨年代保留。点击展开镜头；镜头范围是定位工具，不是行政边界。</p>
 <div className="h-related">{westernRegions.map(r=><button key={r.id} aria-pressed={selected===r.id} onClick={()=>{onRegion(r.id,r.bounds)}}>{r.name}<span>{r.modern} →</span></button>)}</div>
 {region&&<section ref={regionPanel} aria-label="历史地区说明"><h3>{region.name}</h3><p><strong>对应今天：</strong>{region.modern}</p><p><strong>在帝国中的位置：</strong>{region.role}</p><p><strong>后来去了哪里：</strong>{region.after}</p><div className="h-related">{region.cities.map((id,i)=><button key={id} onClick={()=>onCity(id)}>{region.cityNames[i]}<span>查看城市 →</span></button>)}</div></section>}
 <p className="e-note">{year>=476&&"此年隐藏原始快照中仍标为西罗马帝国的过时区域；不以旧疆界冒充后继政权。"}地图底色与疆界仍使用所标注的参考快照。本层新增地区标签和沿革说明，尚未绘制经核实的行省多边形；地区名称不代表单一族群。</p>
 <details><summary>查看本专题依据</summary>{westernSources.map(s=><p key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a></p>)}</details></article>;
}
