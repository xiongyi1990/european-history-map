import {useEffect,useRef} from 'react';
import {easternRegionStatus,easternCheckpointYears,easternSuccessors} from './eastern-context';
import type {westernRegions} from './WesternEmpire';
export const easternAreaNames=['Eastern Roman Empire','Byzantine Empire'];
export const easternRegions:typeof westernRegions=[
 {id:'thrace',name:'色雷斯与海峡',coords:[27,42],bounds:[[23,39],[30,44]],modern:'今天土耳其欧洲部分、希腊东北部和保加利亚南部。君士坦丁堡对应伊斯坦布尔。',role:'首都位于博斯普鲁斯海峡，连接黑海与地中海、巴尔干与小亚细亚。地区与首都的政治命运不能完全等同。',after:'1204 年首都被第四次十字军攻占；1261 年复都；1453 年君士坦丁堡被奥斯曼攻取。',cities:['byzantium'],cityNames:['君士坦丁堡（今伊斯坦布尔）']},
 {id:'balkans',name:'希腊与巴尔干',coords:[22,39],bounds:[[18,35],[29,46]],modern:'今天希腊及巴尔干半岛若干地区；不等于整片巴尔干始终归属东罗马。',role:'帝国在欧洲的腹地与边防空间。希腊半岛、马其顿及北部边区的控制强弱随时期改变。',after:'斯拉夫人定居、保加利亚和塞尔维亚等政权兴起，使这一空间多次分合。1204 年后还出现拉丁与希腊语政权并存。',cities:['athens','corinth'],cityNames:['雅典','科林斯']},
 {id:'anatolia',name:'小亚细亚（安纳托利亚）',coords:[33,39],bounds:[[26,35],[44,42]],modern:'主要对应今天土耳其的亚洲部分；与欧洲一侧隔海峡相望。',role:'帝国长期的重要兵源、税收和陆上防御地区。沿海、内陆高原和东部边区不能看作同一种地理环境。',after:'十一世纪后突厥势力逐步扩张，东罗马仍多次恢复部分沿海控制。1204 年后的尼西亚政权在这里延续皇权，并于 1261 年收复首都。',cities:['ephesus','byzantium'],cityNames:['以弗所','君士坦丁堡（海峡对照）']},
 {id:'levant',name:'叙利亚与巴勒斯坦',coords:[36,34],bounds:[[33,30],[41,38]],modern:'涉及今天叙利亚、黎巴嫩、以色列、巴勒斯坦及周边部分地区；历史叙利亚不等于现代叙利亚国界。',role:'早期东罗马的城市、贸易和宗教重地，包括安条克与耶路撒冷。',after:'七世纪阿拉伯征服使帝国失去大部分地区；十世纪曾收复安条克一带，不能因此把整个东地中海沿岸重新涂为东罗马。',cities:['antioch','jerusalem'],cityNames:['安条克','耶路撒冷']},
 {id:'egypt',name:'埃及与尼罗河谷',coords:[30,28],bounds:[[25,22],[36,33]],modern:'今天埃及的尼罗河谷、三角洲及邻近地区。亚历山大位于地中海南岸。',role:'早期帝国的重要粮食供应地，也是基督教修道传统的重要发源地。埃及属于非洲，仍是东罗马历史的一部分。',after:'七世纪阿拉伯征服后脱离东罗马；晚期帝国的疆域不能再包含埃及。',cities:['alexandria'],cityNames:['亚历山大']},
 {id:'aegean',name:'爱琴海与克里特',coords:[25,36],bounds:[[22,34],[29,40]],modern:'今天希腊与土耳其之间的海域及岛屿，克里特位于爱琴海南缘。',role:'连接希腊半岛、小亚细亚和东地中海的航海空间；岛屿并非在所有年代拥有相同归属。',after:'克里特经历阿拉伯统治与东罗马收复，1204 年后逐渐进入威尼斯控制。海上势力变化需要逐岛辨认。',cities:['knossos'],cityNames:['克诺索斯遗址（克里特定位）']},
 {id:'east-italy',name:'意大利与西西里（再征服）',coords:[14,40],bounds:[[6,36],[19,47]],modern:'今天意大利半岛与西西里岛。它们在 395 年分掌时主要属于西部。',role:'查士丁尼六世纪战争重新取得意大利等地，使东罗马再次深入地中海西部。这不是从 395 年起一直拥有的领地。',after:'伦巴第扩张后东罗马仍保有部分地区；拉文纳与南意大利又在不同世纪丧失，不能把整半岛看作一次同时易手。',cities:['ravenna','rome','syracuse'],cityNames:['拉文纳','罗马','叙拉古']},
 {id:'east-africa',name:'迦太基与北非（再征服）',coords:[9,34],bounds:[[-1,29],[24,38]],modern:'以今天突尼斯为中心的部分地中海南岸。与埃及分开阅读。',role:'六世纪从汪达尔王国夺回的地区，是东罗马向西恢复旧罗马统治的重要部分。',after:'七世纪末阿拉伯势力扩张使东罗马失去这一地区；这里的历史继续存在，但已不属于晚期帝国。',cities:['carthage','lepcis'],cityNames:['迦太基','大莱普提斯']},
];
export const easternNodes=[
 {year:330,title:'新罗马落成',text:'君士坦丁堡成为新的帝国政治中心。330 年是常见文化史起点，此时不能理解为两个独立民族国家已经成立。'},
 {year:395,title:'东西部朝廷分掌',text:'先看巴尔干、海峡、小亚细亚、叙利亚和埃及。意大利与迦太基当时主要属于西部，六世纪再征服后才进入东部朝廷的统治。'},
 {year:565,title:'查士丁尼时代的地中海扩张',text:'意大利、北非及伊比利亚南部部分地区先后被重新征服。此专题列出主要阅读地区，不是全部行省与岛屿清单。'},
 {year:600,title:'意大利分治，南方行省仍在',text:'帕维亚是伦巴第王权中心；东罗马仍保有拉文纳、罗马等意大利据点，埃及和迦太基也仍在帝国统治下。'},
 {year:650,title:'失去叙利亚与埃及后的帝国',text:'七世纪战争和阿拉伯征服改变了东地中海格局。埃及与大部分叙利亚已脱离帝国，小亚细亚和巴尔干的重要性进一步上升。'},
 {year:700,title:'北非再失，帝国核心仍延续',text:'东罗马已经失去迦太基，倭马亚政治中心在大马士革；君士坦丁堡、小亚细亚以及部分欧洲和意大利据点仍维持帝国的延续。'},
 {year:800,title:'西方加冕，东方帝国继续',text:'查理曼在罗马加冕没有终结君士坦丁堡的帝国。把两处皇权中心与意大利分治并列观察，不能画成重新统一的罗马帝国。'},
 {year:843,title:'圣像恢复，与凡尔登分割是两件事',text:'君士坦丁堡恢复圣像敬礼；同年西方发生凡尔登分割。宗教争论的结束和西方法兰克的王朝分割不属于同一个政权变化。'},
 {year:900,title:'宗教影响不等于领土扩张',text:'拜占庭与保加利亚之间的宗教、文字和文化联系增强，但保加利亚仍是不同的政治实体。埃及与北非也没有因基督徒社群的延续而恢复帝国归属。'},
 {year:1025,title:'中期恢复与扩展',text:'巴西尔二世统治末期，帝国在巴尔干与东方取得扩展。但不能据此认为叙利亚全境、埃及或旧罗马全部领土已经恢复。'},
 {year:1071,title:'曼齐刻尔特与小亚细亚转折',text:'战败、内争与后续突厥扩张共同改变小亚细亚。1071 年不是整个半岛在同一天全部失去的日期。'},
 {year:1204,title:'首都陷落与继承政权',text:'第四次十字军攻占君士坦丁堡，拉丁帝国建立。尼西亚、伊庇鲁斯和特拉布宗等政权分别延续或争夺东罗马传统，不能画成一个仍由首都统一控制的帝国。'},
 {year:1261,title:'复都，但未恢复旧疆域',text:'尼西亚一方收复君士坦丁堡，恢复以首都为中心的帝国。政治与文化延续不意味着查士丁尼时代的疆域重现。'},
 {year:1453,title:'君士坦丁堡陷落',text:'以首都帝国为主线的常用终点。摩里亚和特拉布宗等相关政权并非都在这一年同时结束。地区标签仍作为历史定位保留。'},
];
export function EasternEmpire({year,selected,onYear,onRegion,onCity,onClose}:{year:number;selected?:string;onYear:(y:number)=>void;onRegion:(id:string,coords:[number,number][])=>void;onCity:(id:string)=>void;onClose:()=>void}){
 const panel=useRef<HTMLElement>(null);useEffect(()=>{if(selected)panel.current?.scrollIntoView?.({block:'nearest',behavior:'smooth'})},[selected]);
 const region=[...easternRegions,...easternSuccessors].find(r=>r.id===selected),node=[...easternNodes].reverse().find(n=>n.year<=year);
 return <article className="e-detail"><button className="e-back" onClick={onClose}>← 返回时代概览</button><small>帝国 → 历史地区 → 城市</small><h2>东罗马帝国（拜占庭）</h2>
 <div className="h-period"><strong>常用分期：330／395—1453 年</strong><span>330 年新都落成；395 年东西分掌。1204—1261 年首都由拉丁帝国控制，东罗马传统由多个政权延续。</span></div>
 <p>“拜占庭帝国”是后世名称；其居民中使用“罗马人”身份者，并不因此具有同一种语言或族群背景。</p>
 <h3>{year<330?'此年尚未进入本专题分期':year>=1453?'首都帝国结束，地区继续存在':year>=1204&&year<1261?'首都失陷与多个继承政权':'随时间变化的东罗马'}</h3>
 {node?<p><strong>{node.year} 年节点：{node.title}</strong><br/>{node.text}{year!==node.year&&<><br/>这是此前关键节点的背景，不是 {year} 年疆界的逐项复原。</>}</p>:<p>选择下面的年份进入专题。</p>}
 <h3>这一年的地区状态</h3><p>下表在已整理的关键年份显示地区概况；同一年有重大事件时按事件发生后阅读。</p>
 {easternCheckpointYears.includes(year)?<div className="h-related" aria-label="地区年代状态">{easternRegions.map(r=><button key={r.id} onClick={()=>onRegion(r.id,r.bounds)}>{r.name}<span>{easternRegionStatus(r.id,year)}</span></button>)}</div>:<p className="e-note">{year} 年尚无逐地区状态表。请选择下方关键年份；不把附近年份的状态自动套用到这一年。</p>}
 <div className="h-related">{easternNodes.map(n=><button key={n.year} onClick={()=>onYear(n.year)}>{n.year} 年<span>{n.title} →</span></button>)}</div>
 <h3>1204 年后：谁在争夺罗马的延续？</h3><p>点击政权定位其代表城市。标记只表示政治中心，不表示完整疆域；这是并列比较，不是四个政权都在当前年份存在。</p>
 <div className="h-related" aria-label="继承政权比较">{easternSuccessors.map(r=><button key={r.id} onClick={()=>onRegion(r.id,r.bounds)}>{r.name}<span>{r.period} · {year<r.from?'此年尚未形成':year<=r.to?'处于本卡覆盖时段':'本卡阶段已结束，查看后续'} →</span></button>)}</div>
 <h3>主要地区及其得失</h3><p>下列地区在不同阶段与帝国有关，不表示它们在当前年份全部属于帝国。点击地区查看位置和沿革。</p>
 <div className="h-related">{easternRegions.map(r=><button key={r.id} aria-pressed={selected===r.id} onClick={()=>onRegion(r.id,r.bounds)}>{r.name}<span>{r.modern} →</span></button>)}</div>
 {region&&<section ref={panel} aria-label="历史地区说明"><h3>{region.name}</h3>{easternRegionStatus(region.id,year)&&<p><strong>{year} 年：</strong>{easternRegionStatus(region.id,year)}</p>}{"period" in region&&<p><strong>时段：</strong>{String(region.period)}</p>}<p><strong>对应今天：</strong>{region.modern}</p><p><strong>在帝国中的位置：</strong>{region.role}</p><p><strong>得失与延续：</strong>{region.after}</p><div className="h-related">{region.cities.map((id,i)=><button key={id} onClick={()=>onCity(id)}>{region.cityNames[i]}<span>查看城市 →</span></button>)}</div>{"source" in region&&"locationSource" in region&&<p><a href={String(region.source)} target="_blank" rel="noreferrer">政权沿革依据 ↗</a> · <a href={String(region.locationSource)} target="_blank" rel="noreferrer">古今地点依据 ↗</a></p>}</section>}
 <h3>居民、语言与身份</h3><p>早期帝国使用拉丁语与希腊语，后来希腊语在国家与教会中居于主导。不同地区还有多种语言、宗教传统与地方身份；地图不把政权颜色当作族群边界。</p>
 <p className="e-note">地区标签用于跨年代定位，镜头范围不是行政边界。疆界仍使用页面标明的参考快照，尚未新增精确行省多边形。{year>=1453&&'此年隐藏仍以东罗马或拜占庭帝国命名的旧参考区域；相关继承政权需要分别查看。'}</p>
 <details><summary>查看本专题依据</summary><p><a href="https://www.metmuseum.org/essays/byzantium-ca-330-1453" target="_blank" rel="noreferrer">大都会博物馆：拜占庭的早、中、晚期 ↗</a></p><p><a href="https://www.metmuseum.org/toah/ht/06/eusb.html" target="_blank" rel="noreferrer">大都会博物馆：巴尔干、保加利亚与圣像恢复 ↗</a></p><p><a href="https://www.metmuseum.org/toah/ht/06/eust.html" target="_blank" rel="noreferrer">大都会博物馆：意大利与西西里的政治变化 ↗</a></p><p><a href="https://en.wikipedia.org/wiki/Byzantine_Empire" target="_blank" rel="noreferrer">东罗马的政治与领土沿革 ↗</a></p></details></article>;
}
