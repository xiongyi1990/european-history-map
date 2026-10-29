import type {AreaLabel} from '../greek/GreekMap';
import {courseSources} from './course-sources';
import type {PartitionSource} from './frankish-partitions';
export interface MillenniumContext {
 id:string;name:string;mapName:string;direction:string;coords:[number,number];bounds:[[number,number],[number,number]];
 power:string;dates:string;parts:string[];relationship:string;people:string;language:string;
 places:[string,string][];sources:PartitionSource[];reading?:{chapter:number;pages:[number,number];note:string};
}
const source=(key:keyof typeof courseSources)=>courseSources[key];
// Camera bounds and labels are navigation aids, never political geometry.
export const millenniumContextBounds:[[number,number],[number,number]]=[[-8,35],[36,58]];
export const millenniumContexts:MillenniumContext[]=[
 {id:'england',name:'英格兰与不列颠',mapName:'英格兰 · 定位',direction:'西北：海峡另一边',coords:[-2,53.4],bounds:[[-6,49.5],[2,56]],
 power:'英格兰国王埃塞尔雷德二世；北方和西部仍有其他政治共同体。',dates:'本年处于978—1013年的第一段统治；克努特的英格兰王位始于1016年。',
 parts:['温彻斯特及英格兰南部王权中心','伦敦与泰晤士河城市网络','麦西亚和诺森布里亚等地域传统；不是仍有七个彼此独立的早期王国'],
 relationship:'英格兰在海峡北侧，诺曼底在南侧。本年还没有1066年的诺曼征服，也不能把英格兰等同于整个不列颠岛。',
 people:'地方居民、贵族、教会与来自斯堪的纳维亚的移民及袭击者应分开理解；维京活动不能直接当作全境人口标签。',language:'古英语是重要的地方语言；拉丁文用于教会和部分文书。这里不绘制古英语与斯堪的纳维亚语言的精确分界。',
 places:[['winchester','温彻斯特：南部王权中心'],['london','伦敦：泰晤士河'],['rouen','鲁昂：海峡对岸的诺曼底，仅作比较']],sources:[source('aethelred'),source('winchester'),source('cnutEngland')],
 reading:{chapter:177,pages:[1513,1514],note:'课程的维京入侵背景；1514页把克努特即位写成1014年，此处按王室年表采用1016年，且不采用“克努特杀死埃塞尔雷德”的表述。'}},
 {id:'iberia',name:'伊比利亚与科尔多瓦',mapName:'科尔多瓦王权 · 定位',direction:'西南：比利牛斯山以南',coords:[-4,38.7],bounds:[[-9.5,35.7],[3.5,43.9]],
 power:'科尔多瓦哈里发希沙姆二世；曼苏尔掌握主要军政权力。北部另有基督教政权。',dates:'科尔多瓦哈里发称号阶段929—1031年；不能把1000年提前画成1031年后的泰法诸国。',
 parts:['科尔多瓦与瓜达尔基维尔河流域','安达卢斯的城市和地方控制区，不等于现代安达卢西亚大区','半岛北部的莱昂、潘普洛纳及比利牛斯两侧诸领另有统治关系，本批尚未细画'],
 relationship:'这里的哈里发朝廷与巴格达的阿拔斯朝廷不同；一个宗教传统不等于一个国家。伊比利亚半岛也不是一个统一政权。',
 people:'穆斯林、基督徒和犹太社群并存，地方居民、统治精英与军事群体并非同一类别；本图不提供人口比例。',language:'阿拉伯语的重要书写文化不能等同于全体居民的唯一口语；宗教、语言和政治归属分别阅读。',
 places:[['cordoba','科尔多瓦：哈里发朝廷'],['toledo','托莱多：半岛内陆定位']],sources:[source('umayyad'),{title:'西班牙国家考古博物馆：希沙姆二世钱币与曼苏尔时期',url:'https://www.man.es/man/coleccion/nuevas-adquisiciones/tonegawa.html'}],
 reading:{chapter:148,pages:[1245,1246],note:'课程提供征服与半岛南北关系的背景；1000年的称号、人物与政权状态由独立资料补充。'}},
 {id:'balkans',name:'东罗马与保加利亚',mapName:'巴尔干诸政权 · 定位',direction:'东南：多瑙河、爱琴海与海峡',coords:[25,42.5],bounds:[[19,36],[35,45.5]],
 power:'君士坦丁堡的东罗马朝廷由巴西尔二世主导；保加利亚的政治抵抗仍在继续。',dates:'巴西尔二世统治976—1025年；1018年的征服完成不能提前套入1000年。',
 parts:['君士坦丁堡：博斯普鲁斯海峡的朝廷中心','安纳托利亚及爱琴海方向：东罗马核心空间的定位线索','保加利亚地域与巴尔干内陆：不能整块视为本年已完成征服的帝国行省'],
 relationship:'西方奥托三世的帝号不会取代东罗马皇帝。普雷斯拉夫是旧王都参考点，不能用单城得失代表整个保加利亚国家的终结。',
 people:'“东罗马”“保加利亚”首先是政治与历史身份；地方社会包含不同传统，不能用两个国名划成两块单一人种。',language:'希腊语与斯拉夫语言的宗教和文书传统并存；官方或礼仪语言不等于所有居民的母语。',
 places:[['byzantium','君士坦丁堡：东罗马朝廷'],['preslav','普雷斯拉夫：保加利亚旧王都'],['nicaea','尼西亚：海峡东南的安纳托利亚']],sources:[source('millenniumBalkans'),source('preslavHistory')]},
 {id:'rus',name:'基辅与罗斯',mapName:'基辅罗斯 · 定位',direction:'东北：第聂伯河通向黑海',coords:[31,51.5],bounds:[[24,46],[36,55]],
 power:'弗拉基米尔自980年掌握基辅大公权力；通过诸王公及贡赋关系组织不同地域。',dates:'988年基督教化是重要转折；本卡为1000年，统治者皈依不等于所有居民同时改变信仰。',
 parts:['基辅及第聂伯河中游','北方城镇和贡赋网络：本批没有绘出完整势力范围','向南连接黑海与东罗马的交通方向；此处未绘制精确航路'],
 relationship:'与东罗马的联姻、信仰和贸易联系，不等于成为东罗马行省。不能把现代俄罗斯、乌克兰或白俄罗斯的国界搬到1000年。',
 people:'王公、瓦良格背景的军事群体与斯拉夫地方居民不是可以互换的称呼；“罗斯”不表示所有居民同一祖源。',language:'斯拉夫语言的地方使用与教会书写传统需区分；本批没有足够证据绘制口语边界。',
 places:[['kyiv','基辅：第聂伯河上的中心'],['byzantium','君士坦丁堡：黑海以南的联系对象']],sources:[source('kyivVolodymyr')],
 reading:{chapter:156,pages:[1311,1313],note:'罗斯、河流交通与拜占庭联系；课程解释不直接当作1000年精确疆界或全体居民身份。'}},
 {id:'poland',name:'皮雅斯特波兰',mapName:'皮雅斯特波兰 · 定位',direction:'东部：易北河以东、大波兰',coords:[18.8,53],bounds:[[14,49],[23,55]],
 power:'波列斯瓦夫一世（勇敢者）；1000年接待皇帝奥托三世。',dates:'1000年格涅兹诺会晤与1025年正式加冕必须分开；本年不提前使用1025年后的王号。',
 parts:['格涅兹诺与大波兰的政治、教会中心','大波兰是历史地域名称，不是现代波兰全境','其他城堡、地方贵族与教会网络尚未逐一展开'],
 relationship:'会晤和教会联系不能直接解释为帝国的一块普通直辖领土，也不能据一处中心点推出完整国界。',
 people:'皮雅斯特是统治家族名称，不是全体居民的族群名称；居民身份和后来的现代民族分类应分开。',language:'教会与地方口语属于不同使用场景；本批没有全境语言比例数据。',
 places:[['gniezno','格涅兹诺：1000年会晤中心'],['magdeburg','马格德堡：西侧奥托王朝对照']],sources:[source('gniezno')]},
 {id:'hungary',name:'匈牙利与喀尔巴阡盆地',mapName:'匈牙利王权 · 定位',direction:'东南内陆：多瑙河与山弧之间',coords:[20,47.3],bounds:[[15.5,44.5],[24,49.5]],
 power:'伊什特万（斯蒂芬）主导早期基督教王权的建立。',dates:'加冕通常置于1000年末／1001年初；不能把1000年全年描述为完全相同的加冕后状态。',
 parts:['埃斯泰尔戈姆与多瑙河王室、教会中心','喀尔巴阡盆地的地方权力与渐次整合','镜头只帮助认识盆地位置，不代表后世大匈牙利疆界'],
 relationship:'王冠、传教与西方联系不等于成为奥托帝国普通行省。与北面的波兰、西面的巴伐利亚、南面的巴尔干分别定位。',
 people:'马扎尔统治与迁徙背景不能代表盆地内全部居民；基督教化和地方整合是过程。',language:'宗教与政务书写、马扎尔及其他地方语言分开理解；本卡不据王号推断族群比例。',
 places:[['esztergom','埃斯泰尔戈姆：多瑙河王室中心'],['regensburg','雷根斯堡：西侧巴伐利亚对照']],sources:[source('esztergom')]},
];
export function millenniumContextAt(year:number,id:string){return year===1000?millenniumContexts.find(c=>c.id===id):undefined;}
export function validMillenniumContext(year:number,id:string|null|undefined){return year===1000&&(id==='all'||millenniumContextAt(year,id??''))?id!:undefined;}
export function millenniumContextPlaceIds(year:number){return year===1000?[...new Set(millenniumContexts.flatMap(c=>c.places.map(([id])=>id)))]:[];}
export function millenniumContextLabels(year:number):AreaLabel[]{return year===1000?millenniumContexts.map(c=>({id:'contemporary:'+c.id,name:c.mapName,coords:c.coords,color:'#526b86',kind:'region',minZoom:2.3})):[];}
