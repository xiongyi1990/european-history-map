import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {Region300} from './roman-300-regions';
import {courseSources} from './course-sources';

const fact=(text:string,...sources:(keyof typeof courseSources)[]):HistoricalFact=>({text,sources});
export const byzacenaPlaces:GazetteerPlace[]=[
 {id:'hadrumetum',name:'哈德鲁梅图姆',modern:'突尼斯 · 苏塞',aliases:['Hadrumetum','Hadrito','Sousse','苏塞','苏斯','哈德鲁米图姆'],coords:[10.63878,35.825866],kind:'历史地点参考',source:courseSources.hadrumetumPlace.url,description:'迦太基以南的突尼斯东岸城市，罗马晚期拜扎凯纳的省会。城市代表点来自 Pleiades contributors（CC BY 3.0），不是古港或省界的精确位置。'},
 {id:'thysdrus',name:'提斯德鲁斯',modern:'突尼斯 · 杰姆（埃尔杰姆）',aliases:['Thysdrus','El Jem','El Djem','杰姆','埃尔杰姆'],coords:[10+42/60+24.984/3600,35+17/60+47.004/3600],kind:'历史地点参考',source:courseSources.thysdrusSite.url,description:'苏塞以南、突尼斯中部平原上的古城。采用 UNESCO 圆形竞技场代表坐标帮助定位城市；遗产保护范围不等于古城辖区。'},
];
export function byzacenaPolity(year:number):string{
 if(year<395)return '罗马帝国的北非行省空间；哈德鲁梅图姆是晚期拜扎凯纳省会。此时尚不能套用 395 年以后的两部朝廷格局。';
 if(year<429)return '罗马西部朝廷体系中的拜扎凯纳，属于阿非利加行政空间。它位于迦太基以南，与更西面的努米底亚分别观察。';
 if(year<439)return '汪达尔进入北非后的战争阶段。进入非洲、占据某城与全省控制不是同一天；本条尚未逐年确定拜扎凯纳各城的交接时点。';
 if(year<442)return '439 年迦太基易手后，汪达尔王权扩展到拜扎凯纳等富庶地域；442 年和约承认是后续节点。此分期不表示本省各城在 439 年同日失守。';
 return '拜扎凯纳进入以迦太基为中心的汪达尔王国体系；442 年和约承认相关征服。王权的统治、地方社会和每座城市的实际处境仍需分别阅读。';
}
const periods:[number,number,string][]=[[300,394,'罗马北非与晚期行省'],[395,428,'西部朝廷下的拜扎凯纳'],[429,438,'北非战争：地方交接待细核'],[439,441,'迦太基易手后、和约之前'],[442,500,'442 年和约后的汪达尔北非']];
export const byzacenaDetails:HistoricalDetail[]=byzacenaPlaces.flatMap(p=>periods.map(([from,to,label])=>({
 id:`${p.id}-${from}`,placeId:p.id,title:p.name,displayName:p.aliases[0],kind:'历史城市',from,to,focusYear:from,period:`${from}—${to} 年：${label}`,
 polity:fact(byzacenaPolity(from),'hadrumetumStudy','byzacenaList','byzacenaTreaty'),
 territory:fact(p.id==='hadrumetum'?'今苏塞位于地中海岸，迦太基在更北面，提斯德鲁斯在南方内陆平原。省会、港口、城市辖地与整个拜扎凯纳是不同尺度。':'今杰姆位于苏塞以南的内陆平原。圆形竞技场是定位参照，不能用它的遗址范围代替城市或行省疆界。',p.id==='hadrumetum'?'hadrumetumPlace':'thysdrusSite'),
 people:fact(p.id==='hadrumetum'?'省会功能、地方精英与港口活动有助于理解城市社会。Ghaddhab 的研究讨论晚期城市收缩及贸易变化，不能把早期港口的繁荣程度原样延续到每一年；尚无本条可用的人口比例。':'三世纪圆形竞技场体现较早的罗马城市公共生活；建筑遗存不能证明四、五世纪每年仍有相同的观众、人口规模或活动。本条尚未重建当地居民构成。',p.id==='hadrumetum'?'hadrumetumStudy':'thysdrusSite'),
 language:fact('北非地域背景：拉丁语用于公共书写和教会，地方语言传统也延续。现有资料不足以给出这座城市此年的母语比例；行政名称或统治者身份不能替代语言调查。','inscriptions300','augustineLanguage400'),
 nameNote:fact(p.id==='hadrumetum'?'哈德鲁梅图姆对应今苏塞；不要与巴尔干的阿德里安堡混淆。地名目录收录的晚期异名不自动当作每一年都在使用。':'提斯德鲁斯对应今杰姆；圆形竞技场建于三世纪，早于本条展示的四、五世纪。',p.id==='hadrumetum'?'hadrumetumPlace':'thysdrusSite'),
 reading:[{chapter:133,pages:[1125,1129],note:'关联阅读：汪达尔与北非的整体背景；本条城市位置、省会与遗址说明另据所列来源。'}],related:p.id==='hadrumetum'?['thysdrus','carthage','hippo']:['hadrumetum','carthage','lepcis'],relatedBattles:from>=429?['vandals-429']:[],
})));

export function addByzacena(regions:Region300[],year:number):Region300[]{
 const parent=regions.find(r=>r.id==='africa');
 if(!parent||year<300||year>500)return regions;
 const r:Region300={...parent,id:'byzacena',parent:'africa',name:'拜扎凯纳：苏塞与突尼斯中部',mapName:'拜扎凯纳',coords:[10.25,35.4],bounds:[[8.7,34.2],[11.4,36.4]],
 modern:'今突尼斯中部及东侧沿岸，以苏塞和杰姆定位；迦太基在北面，努米底亚在西面，的黎波里塔尼亚在更东南。',
 polity:byzacenaPolity(year),parts:'哈德鲁梅图姆（今苏塞）定位省会与沿海方向，提斯德鲁斯（今杰姆）定位南方内陆平原。这是行政名称关联的阅读地域，镜头窗口不重建完整行省边界。',
 people:parent.people,language:parent.language,
 change:year<429?'晚期省会及沿海、内陆城市分别观察；当时的经济状况不能仅按三世纪建筑规模推算。':year<439?'429 年起北非战争改变地域联系；各城交接年尚未逐项核定，不据迁徙路线推算控制线。':year<442?'439 年迦太基易手与 442 年和约是两个节点；省内城市的具体经历仍需分别考证。':'442 年后的王国框架不等于全体居民都变成汪达尔人；罗马时期的地方社会与语言传统继续作为阅读背景。',
 cities:['hadrumetum','thysdrus'],sources:[...new Set([...parent.sources,'hadrumetumPlace','hadrumetumStudy','thysdrusSite','byzacenaList','byzacenaTreaty'] as Region300['sources'])]};
 return [...regions.map(p=>p.id==='africa'?{...p,cities:[...new Set([...p.cities,...r.cities])]}:p),r];
}
