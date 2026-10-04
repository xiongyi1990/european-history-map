import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {Region300} from './roman-300-regions';
import {courseSources} from './course-sources';

const fact=(text:string,...sources:(keyof typeof courseSources)[]):HistoricalFact=>({text,sources});
export const numidiaPlaces:GazetteerPlace[]=[
 {id:'cirta',name:'基尔塔（君士坦丁）',modern:'阿尔及利亚 · 君士坦丁',aliases:['Cirta','Constantina','Constantine','基尔塔','瑟塔','君士坦丁城'],coords:[6.612555,36.368187],kind:'历史地点参考',source:courseSources.cirtaAtlas.url,description:'希波西南方的内陆城市，后称康斯坦提纳。位置据 Johan Åhlfeldt / DARE（CC BY-SA 3.0），原资料标注约 2 千米定位精度；不是古城边界。'},
 {id:'cuicul',name:'奎库尔（杰米拉）',modern:'阿尔及利亚 · 杰米拉',aliases:['Cuicul','Djemila','Djémila','杰米拉','杰姆拉','奎库尔'],coords:[5+44/60+12.012/3600,36+19/60+14.016/3600],kind:'历史地点参考',source:courseSources.cuiculSite.url,description:'基尔塔以西、塞提夫东北方向的山地古城。采用 UNESCO 遗址代表坐标；今杰米拉与突尼斯的杰姆是两处不同遗址。'},
];
const periods:[number,number,string][]=[[300,394,'罗马北非的内陆城市'],[395,428,'西部朝廷与努米底亚'],[429,438,'汪达尔进入北非后的战争'],[439,441,'迦太基易手之后'],[442,500,'和约之后的地域差异']];
function inlandPolity(year:number):string{
 if(year<395)return '罗马帝国北非的内陆城市。晚期行省的重组需要分期阅读，不能套用 395 年以后东西两部朝廷的格局。';
 if(year<429)return '罗马西部朝廷的北非行政空间；努米底亚与迦太基所在的阿非利加总督省分别理解。';
 if(year<439)return '429 年汪达尔进入北非，430—431 年希波围城发生在海岸方向。这里是内陆城市，本条尚未确定其具体交接年份。';
 if(year<442)return '439 年迦太基易手改变北非的力量对比；这不是本城同年陷落的证据，442 年和约仍是后续节点。';
 return '442 年和约后的北非，汪达尔王权、罗马方面与地方社会的关系需要按地域阅读。不能把拜扎凯纳的整体归属直接复制到所有努米底亚内陆城市；本城逐年实控尚未核定。';
}
export const numidiaDetails:HistoricalDetail[]=numidiaPlaces.flatMap(p=>periods.map(([from,to,label])=>({
 id:`${p.id}-${from}`,placeId:p.id,title:p.name,displayName:p.id==='cirta'?(from>=395?'Constantina':'Cirta / Constantina'):'Cuicul',kind:'历史城市',from,to,focusYear:from,period:`${from}—${to} 年：${label}`,
 polity:fact(inlandPolity(from),'byzacenaList','procopius5','byzacenaTreaty'),
 territory:fact(p.id==='cirta'?'基尔塔位于今阿尔及利亚东北部内陆；希波在东北方向的海岸，奎库尔在西面，提姆加德在南面。四城帮助区分沿海、内陆和山地，不能拼接成已核定的省界。':'奎库尔位于今塞提夫东北约 50 千米、海拔约 900 米的山地；城市布局适应山地地形。向东可定位基尔塔，向东南可定位提姆加德。',p.id==='cirta'?'cirtaAtlas':'cuiculSite'),
 people:fact(p.id==='cirta'?'基尔塔兼有地方行政与基督教社群的历史；古代市政组织和宗教身份不能换算成单一族群。三、四世纪已有的教会活动不代表所有居民信仰一致。':'住宅、市场、公共建筑与早期基督教建筑，呈现山地城市的日常生活和宗教活动。不同年代的遗存不能视为此年全部同时使用，也不能据遗址规模推算族群比例。',p.id==='cirta'?'cirtaHistory':'cuiculSite'),
 language:fact('北非地域背景：拉丁语公共书写与教会传统、地方语言并存。城市改用拉丁名称不等于居民换了母语；本条没有可量化的逐年语言或人口比例。','inscriptions300','augustineLanguage400'),
 nameNote:fact(p.id==='cirta'?'古名基尔塔（Cirta），君士坦丁时代修复后改称康斯坦提纳（Constantina），对应今阿尔及利亚君士坦丁。它不是博斯普鲁斯海峡的君士坦丁堡；本条不为改名指定未经核定的单一年份。':'古名奎库尔（Cuicul），今称杰米拉（Djémila），在阿尔及利亚；突尼斯的杰姆（El Jem）对应提斯德鲁斯，两者不可混淆。',p.id==='cirta'?'cirtaHistory':'cuiculSite'),
 related:p.id==='cirta'?['hippo','cuicul','timgad','carthage','sitifis','caesarea-mauretania']:['cirta','timgad','hippo','thysdrus','sitifis'],relatedBattles:from>=429?['vandals-429']:[],
})));

// Keep the published numidia5 id so older shared links continue to resolve.
export function addNumidia(regions:Region300[],year:number):Region300[]{
 const parent=regions.find(r=>r.id==='africa');
 if(!parent||year<300||year>500)return regions;
 const existing=regions.find(r=>r.id==='numidia5');
 const r:Region300={...parent,...existing,id:'numidia5',parent:'africa',name:'努米底亚：希波海岸与内陆城市',mapName:'努米底亚',coords:[6.9,36.1],bounds:[[5.1,34.8],[8.6,37.3]],
 modern:'今阿尔及利亚东北部，以安纳巴（希波）、君士坦丁（基尔塔）、杰米拉（奎库尔）及巴特纳以东的提姆加德定位；迦太基在更东面。',
 polity:existing?.polity??inlandPolity(year),
 parts:'希波在海岸；基尔塔是内陆行政与城市节点；奎库尔体现山地城市；提姆加德在奥雷斯山地北侧。这里是四城的阅读范围，不是古代努米底亚历朝疆域或逐年行省边界。',
 people:'城市居民、地方精英、教会社群与周围乡村共同构成地域社会。希波的奥古斯丁及教会争论只是其中一部分；“努米底亚人”、罗马公民身份、语言和信仰不能当作同一分类。',language:parent.language,
 change:year<429?'先从希波海岸移向基尔塔、奎库尔和提姆加德，再与东面的迦太基、拜扎凯纳比较；四城的地形与行政角色不同。':'429 年进入北非 → 430—431 年希波围城 → 439 年迦太基易手 → 442 年和约。这是不同地点与不同性质的事件，不是努米底亚全境的一条统一交接线。',
 cities:['hippo','cirta','cuicul','timgad'],sources:[...new Set([...parent.sources,...(existing?.sources??[]),'cirtaAtlas','cirtaHistory','cuiculSite','byzacenaList','procopius5'] as Region300['sources'])]};
 return [...regions.filter(p=>p.id!=='numidia5').map(p=>p.id==='africa'?{...p,cities:[...new Set([...p.cities,...r.cities])]}:p),r];
}
