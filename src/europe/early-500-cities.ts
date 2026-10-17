import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {courseSources} from './course-sources';
import {earlyRegionAt} from './early-500-regions';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources:[...new Set(sources)]});
export interface CityRange {id:string;name:string;from:number;to:number;region:string;polity:string;source:Source}
const ranges:CityRange[]=[
 {id:'toulouse',name:'图卢兹',from:507,to:700,region:'gaul',polity:'507 年战后进入法兰克政治空间；不再延用西哥特王都身份。墨洛温诸王分掌与地方权力变化不表示本城二百年制度不变。',source:'toulouseLate'},
 {id:'lyon',name:'里昂',from:534,to:700,region:'gaul',polity:'534 年法兰克诸王征服勃艮第后，进入法兰克王权体系。不能将 500 年的独立勃艮第王国身份沿用到这里。',source:'lyonLate'},
 {id:'paris',name:'巴黎',from:500,to:700,region:'gaul',polity:'法兰克的墨洛温王权体系内城市，诸王宫廷、分掌和地方权力多次变化；本条不认定为整个时期唯一永久首都。',source:'earlyFrankishRhine'},
 {id:'trier',name:'特里尔',from:500,to:700,region:'gaul',polity:'莱茵—摩泽尔方向的法兰克政治与教会城市。此时不能继续写成四帝共治皇帝驻地，也不能提前写成加洛林帝国城市。',source:'earlyFrankishRhine'},
 {id:'tournai',name:'图尔奈',from:501,to:700,region:'gaul',polity:'法兰克统治空间中的城市，早期王室遗产继续作为地方历史存在；不认定此城在整个时期都是所有法兰克国王的首都。',source:'earlyFrankishRhine'},
 {id:'ravenna',name:'拉文纳',from:500,to:539,region:'italy',polity:'东哥特王权的重要中心；535 年战争开始后，东罗马要到 540 年才取得本城，不能提前改属。',source:'earlyItaly'},
 {id:'ravenna',name:'拉文纳',from:540,to:700,region:'italy',polity:'540 年被东罗马取得后，作为意大利军政中心延续，后来设总督体系；伦巴第进入后也未立刻失守。751 年的最终易主还在以后。',source:'earlyItaly'},
 {id:'pavia',name:'帕维亚',from:572,to:599,region:'italy',polity:'572 年伦巴第取得城市后，逐渐形成王都地位；本段补齐原有 600 年以前空档，拉文纳仍是另一政治空间。',source:'paviaEarly'},
 {id:'rome',name:'罗马',from:501,to:534,region:'italy',polity:'东哥特统治下的罗马，元老和主教保有重要地方地位；东罗马对意大利战争尚未开始。',source:'earlyItaly'},
 {id:'rome',name:'罗马',from:535,to:551,region:'italy',polity:'东罗马—东哥特战争中反复易手的城市。此段只补战争背景，具体年份的军队控制尚未逐次核实，不指定整个时段只有同一统治者。',source:'earlyItaly'},
 {id:'rome',name:'罗马',from:552,to:589,region:'italy',polity:'东罗马恢复意大利统治的政治空间内，主教与地方城市社会仍有自身作用；不是已建立八世纪教皇国。',source:'earlyItaly'},
 {id:'rome',name:'罗马',from:605,to:700,region:'italy',polity:'东罗马意大利统治背景中的主教城市，受伦巴第势力压力，主教影响与帝国军政控制不是相同边界。',source:'earlyItaly'},
 {id:'syracuse',name:'叙拉古',from:500,to:534,region:'italy',polity:'西西里岛属于东哥特政治空间，535 年东罗马进入尚未发生；不是古典时代独立城邦身份。',source:'earlyItaly'},
 {id:'syracuse',name:'叙拉古',from:535,to:700,region:'italy',polity:'535 年西西里征服后处于东罗马统治空间。半岛伦巴第扩张不等于本岛同时易主，后来的阿拉伯和诺曼统治都不能提前套入。',source:'earlyItaly'},
 {id:'bari',name:'巴里',from:552,to:700,region:'italy',polity:'东罗马在意大利南部的沿海统治空间内；与帕维亚伦巴第王权及南部内陆公国分别看，不提前使用 1071 年诺曼征服后的身份。',source:'earlyItaly'},
 {id:'toledo',name:'托莱多',from:507,to:599,region:'iberia',polity:'西哥特在伊比利亚发展的内陆政治中心，六世纪后期形成王都地位；本段不认定 507 年起每一年都已是唯一首都。',source:'toledoEarly'},
 {id:'cordoba',name:'科尔多瓦',from:589,to:700,region:'iberia',polity:'西哥特王权体系中的伊比利亚城市；700 年还不是 711 年后倭马亚省级中心，更不是 756 年独立埃米尔国。',source:'earlyIberia'},
 {id:'emerita',name:'梅里达',from:500,to:700,region:'iberia',polity:'西哥特伊比利亚的重要城市与教会中心；当地宗教传统和王权联系需分别读，不能写成当时已有现代葡萄牙或西班牙民族国家。',source:'earlySuevic'},
 {id:'narbonne',name:'纳博讷',from:500,to:700,region:'iberia',polity:'西哥特保有的山北沿岸地域中的城市。507 年战败并不意味着法兰克同时取得整个塞普提马尼亚。',source:'toledoEarly'},
 {id:'carthage',name:'迦太基',from:534,to:697,region:'africa',polity:'汪达尔战争结束后的东罗马北非军政中心；670 年凯鲁万建成后，本城仍不能提前写成 698 年陷落后的状态。',source:'earlyCarthage'},
 {id:'carthage',name:'迦太基',from:699,to:700,region:'africa',polity:'698 年陷落后的旧城市位置，不再是东罗马统治中心。原沿海中心的衰退与凯鲁万内陆基地分别理解。',source:'earlyCarthage'},
 {id:'kairouan',name:'凯鲁万',from:670,to:700,region:'africa',polity:'670 年建立的阿拉伯穆斯林内陆基地，与仍在东罗马手中的迦太基一度并存；反攻和地方争夺不等于整个阶段稳定控制全部北非。',source:'kairouanEarly'},
 {id:'thessaloniki',name:'塞萨洛尼基',from:501,to:700,region:'balkans',polity:'东罗马的重要爱琴海北岸港口。周边阿瓦尔、斯拉夫军事活动和定居不能直接当作这座城市已经被征服的证据。',source:'earlyBalkans'},
 {id:'athens',name:'雅典',from:500,to:700,region:'balkans',polity:'东罗马时代的城市与基督教化背景，529 年学校关闭和古建筑改用不等于另建一个雅典城邦国家。',source:'earlyBalkans'},
 {id:'nicaea',name:'尼西亚',from:500,to:700,region:'anatolia',polity:'东罗马小亚细亚的城市；萨珊和阿拉伯入侵、袭击不能被当作整个二百年全域稳定归属的地图。此时尚无十一世纪鲁姆塞尔柱或十三世纪流亡帝国。',source:'earlyCaucasus'},
 {id:'ephesus',name:'以弗所',from:500,to:600,region:'anatolia',polity:'东罗马爱琴海沿岸港口与教会城市，查士丁尼重建圣约翰教堂。七世纪初战争和地震破坏的后续状态不在本段外推。',source:'earlyCaucasus'},
 {id:'damascus',name:'大马士革',from:500,to:612,region:'levant',polity:'东罗马叙利亚政治空间中的内陆城市，六世纪战争会影响当地，不能提前称为倭马亚首都。',source:'earlyLevant'},
 {id:'damascus',name:'大马士革',from:629,to:634,region:'levant',polity:'萨珊撤军后恢复东罗马治理的阶段，随后面对阿拉伯军进入；635 年城市交接另列。',source:'earlyLevant'},
 {id:'damascus',name:'大马士革',from:635,to:660,region:'levant',polity:'采用常用 635 年交接纪年，处于早期哈里发政治空间；661 年后倭马亚都城身份不提前套入。',source:'earlyIranTimeline'},
 {id:'jerusalem',name:'耶路撒冷',from:500,to:613,region:'levant',polity:'东罗马的巴勒斯坦宗教城市，614 年萨珊取得之前的政治背景；不同基督教与犹太社群仍需分别理解。',source:'earlySouthernProvinces'},
 {id:'jerusalem',name:'耶路撒冷',from:615,to:628,region:'levant',polity:'614 年萨珊取得之后的占领阶段；628 年议和同意交还，不把签约瞬间当作所有地方驻军已撤离。',source:'earlySouthernProvinces'},
 {id:'jerusalem',name:'耶路撒冷',from:629,to:637,region:'levant',polity:'萨珊战后恢复东罗马的阶段，630／约631 年圣十字架归还仪式另见记录。阿拉伯取得城市常记638 年，仍有地方交接纪年讨论。',source:'earlyLevant'},
 {id:'jerusalem',name:'耶路撒冷',from:638,to:660,region:'levant',polity:'采用常用 638 年城市交接纪年，处于早期哈里发统治；不能提前以 661 年倭马亚或后来十字军王国命名。',source:'earlyConquests'},
 {id:'jerusalem',name:'耶路撒冷',from:661,to:700,region:'levant',polity:'倭马亚时期重要宗教城市，大马士革才是王朝中心；691 年建筑事件不能推导全城居民已改宗。',source:'earlyLevant'},
 {id:'antioch',name:'安条克',from:500,to:539,region:'levant',polity:'东罗马叙利亚北部的重要城市；540 年萨珊攻掠与后续战争另列。',source:'earlyJustinian'},
 {id:'antioch',name:'安条克',from:540,to:540,region:'levant',polity:'萨珊霍斯劳一世攻掠并破坏城市，部分居民被迁往泰西封附近新建聚落；一次攻掠不能当作全叙利亚永久归属。',source:'earlyJustinian'},
 {id:'antioch',name:'安条克',from:541,to:609,region:'levant',polity:'540 年攻掠和撤军后的东罗马城市恢复背景，宗教与城市社会延续；不能把萨珊一次攻掠认定为此后全时期永久占领。',source:'earlyAntioch'},
 {id:'antioch',name:'安条克',from:610,to:610,region:'levant',polity:'来源将萨珊取得安条克列为 610 或 611 年，此条保留交接纪年差异，不把 610 年全年指定为无争议的单一军队控制。',source:'earlyAntioch'},
 {id:'antioch',name:'安条克',from:611,to:628,region:'levant',polity:'采用 610／611 年陷落后的萨珊占领阶段；628 年议和交还的安排不能抹去此前的长期占领。',source:'earlyAntioch'},
 {id:'antioch',name:'安条克',from:629,to:636,region:'levant',polity:'萨珊交还后恢复东罗马的城市，阿拉伯取得通常记为 637／638 年；不能把整个时期写成从未易主。',source:'earlyAntioch'},
 {id:'antioch',name:'安条克',from:637,to:638,region:'levant',polity:'阿拉伯取得城市的纪年有 637／638 年两种，此段用于交接背景，不保证两年中每一时点驻军相同。',source:'earlyAntioch'},
 {id:'antioch',name:'安条克',from:639,to:660,region:'levant',polity:'637／638 年交接之后的早期哈里发叙利亚城市，尚不是倭马亚王朝阶段。',source:'earlyAntioch'},
 {id:'antioch',name:'安条克',from:661,to:700,region:'levant',polity:'倭马亚政治体系中的叙利亚北部城市，王朝朝廷在大马士革，不能以罗马时代首府身份推定仍属东罗马。',source:'earlyLevant'},
 {id:'alexandria',name:'亚历山大里亚',from:643,to:644,region:'egypt',polity:'642 年东罗马完成撤离后的早期哈里发治理阶段；地方文书记录财政与社会延续，不把政治更替写成人口整体替换。',source:'earlyEgyptDocuments'},
 {id:'alexandria',name:'亚历山大里亚',from:647,to:660,region:'egypt',polity:'早期哈里发政治空间中的埃及港口，福斯塔特与本城角色不同；本段不外推到更早港口反攻的全部细节。',source:'timelineEgypt'},
 {id:'ctesiphon',name:'泰西封',from:500,to:636,region:'mesopotamia',polity:'萨珊王朝在底格里斯河的主要宫廷中心；东方领土与北两河边城归属不能由一个城市点替代。637 年陷落前不能提前改称巴格达。',source:'earlyIranTimeline'},
 {id:'ctesiphon',name:'泰西封',from:637,to:660,region:'mesopotamia',polity:'637 年阿拉伯取得之后的萨珊旧宫廷城市位置。王朝向东退却与651 年终结不是同一事件，新的军政中心也不等于旧城仍作唯一首都。',source:'earlyIranTimeline'},
 {id:'ctesiphon',name:'泰西封',from:661,to:700,region:'mesopotamia',polity:'倭马亚两河地域中的萨珊旧城市中心；王朝朝廷在大马士革，巴格达尚未建城。',source:'earlyIranTimeline'},
];
function detail(c:CityRange,prefix:string):HistoricalDetail{
 const r=earlyRegionAt(c.region,c.from)!;
 return {id:`${prefix}-${c.id}-${c.from}`,placeId:c.id,from:c.from,to:c.to,focusYear:c.from,title:c.name,kind:'历史城市',period:c.from===c.to?`公元 ${c.from} 年的城市变化`:`${c.from}—${c.to} 年的主要政治背景`,
 polity:fact(c.polity,c.source),territory:fact(r.where+' 城市点帮助定位；具体行省、城墙和逐年军事控制边界不由本点推导。',c.source),
 people:fact('地域背景，非本城普查：'+r.people,...r.sources,...r.phase.sources),language:fact('地域层面的书写与语言背景：'+r.language,...r.sources,...r.phase.sources),
 nameNote:fact(c.id==='toulouse'?'图卢兹是原西哥特重要中心，失去王都角色后仍保留在地图中。':c.id==='ctesiphon'?'泰西封与后来巴格达不是同一座城市；地图不将旧宫廷自动挪到新都。':'采用当时城市的通行中文名称；现代国家仅用于定位。'),
 related:r.places.filter(([id])=>id!==c.id&&(id!=='pliska'||c.from>=681)&&(id!=='kairouan'||c.from>=670)).map(([id])=>id)};
}
export function fillEarlyCityRanges(existing:HistoricalDetail[],ranges:CityRange[],prefix:string):HistoricalDetail[]{
 const extra:HistoricalDetail[]=[];
 for(const c of ranges){
  const candidate=detail(c,prefix);
  let gaps:[number,number][]=[[c.from,c.to]];
  for(const d of [...existing,...extra].filter(d=>d.placeId===c.id))gaps=gaps.flatMap(([a,b])=>d.to<a||d.from>b?[[a,b] as [number,number]]:[...(a<d.from?[[a,d.from-1] as [number,number]]:[]),...(d.to<b?[[d.to+1,b] as [number,number]]:[])]);
  for(const [from,to] of gaps)extra.push({...candidate,id:`${candidate.id}-${from}-${to}`,from,to,focusYear:from});
 }
 return [...existing,...extra];
}

export function completeEarly500(existing:HistoricalDetail[]){return fillEarlyCityRanges(existing,ranges,"early500");}
