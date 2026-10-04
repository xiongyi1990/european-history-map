import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {Region300} from './roman-300-regions';
import {courseSources} from './course-sources';

type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const cities=[
 {id:'tingis',name:'廷吉斯（丹吉尔）',latin:'Tingis / Tingi',modern:'摩洛哥 · 丹吉尔',aliases:['Tingis','Tingi','Tangier','Tanger','丹吉尔'],coords:[-5.810419,35.787168] as [number,number],region:'tingitana',source:'tingisAtlas' as Source,
 territory:'今摩洛哥北端、直布罗陀海峡南岸；隔海面向伊比利亚南部。沃鲁比利斯在其南方内陆，舍尔沙勒远在东方的阿尔及利亚海岸。',
 people:'从海峡城市的位置理解廷吉斯，与南方内陆城镇分别观察。北非本地社会、罗马制度与跨海往来是不同层面的背景；现有条目不提供这座城市的居民比例。',
 nameNote:'廷吉斯对应今丹吉尔，廷吉塔纳省名与这座城市有关。它在非洲；列入古代西班牙行政体系不意味着地理上位于欧洲。',related:['volubilis','emerita','caesarea-mauretania']},
 {id:'caesarea-mauretania',name:'毛里塔尼亚的凯撒利亚',latin:'Iol / Caesarea Mauretaniae',modern:'阿尔及利亚 · 舍尔沙勒',aliases:['Iol','Caesarea Mauretaniae','Cherchell','Cherchel','舍尔沙勒','舍尔谢勒','约尔'],coords:[2.186828,36.607284] as [number,number],region:'caesariensis',source:'cherchellAtlas' as Source,
 territory:'今阿尔及利亚地中海岸，位于阿尔及尔以西；北面是海，南面是山地腹地。向东经塞提夫方向可联系努米底亚，向西到丹吉尔则是很长一段北非海岸。',
 people:'地方研究将这座省会与周围乡村、农业和水利设施共同考察；沿海城市不能代表全部山地居民。早期王都的铭文与建筑，也不能直接当作四、五世纪的人口统计。',
 nameNote:'早期名约尔（Iol），后称凯撒利亚，今舍尔沙勒。这里不是小亚细亚的卡帕多基亚凯撒利亚，也不是地中海东岸的同名城市。',related:['tingis','sitifis','cirta','caesarea-cappadocia']},
 {id:'sitifis',name:'锡提菲斯（塞提夫）',latin:'Sitifis / Setifis',modern:'阿尔及利亚 · 塞提夫',aliases:['Sitifis','Setifis','Sétif','Setif','塞提夫','塞蒂夫','锡提菲斯'],coords:[5.412646,36.195749] as [number,number],region:'sitifensis',source:'sitifisAtlas' as Source,
 territory:'今阿尔及利亚北部内陆高地；奎库尔（杰米拉）在东北，基尔塔（君士坦丁）在更东面。它与海岸的舍尔沙勒、海峡边的丹吉尔分别定位。',
 people:'塞提夫的墓地、宗教建筑、商铺、浴场和马赛克，为认识城市生活提供证据。遗存年代并不全部相同；不能把祭祀图像或教堂遗存解释成每一年全城居民信仰一致。',
 nameNote:'锡提菲斯对应今塞提夫，锡提芬西斯是相关的晚期行省名称。塞提夫与邻近的杰米拉是不同城市，不能把一个遗址当作另一个的市中心。',related:['cuicul','cirta','caesarea-mauretania','timgad']},
];
export const mauretaniaPlaces:GazetteerPlace[]=cities.map(c=>({id:c.id,name:c.name,modern:c.modern,aliases:c.aliases,coords:c.coords,kind:'历史地点参考',source:courseSources[c.source].url,description:c.territory+' 城市代表坐标据 Johan Åhlfeldt / DARE（CC BY-SA 3.0），原资料标注约 2 千米精度，不是城市或行省边界。'}));
export const mauretaniaCityRegions:Record<string,string>={tingis:'tingitana',volubilis:'tingitana','caesarea-mauretania':'caesariensis',sitifis:'sitifensis'};
export function mauretaniaPolity(id:string,year:number):string{
 const administration=id==='tingitana'?'廷吉塔纳在晚期《官职志》中列入西班牙管区，与海峡北岸相联系；南方沃鲁比利斯早已不是同样的罗马直接控制状态。':id==='caesariensis'?'凯撒里恩西斯在晚期《官职志》中列入阿非利加，省会位于今舍尔沙勒；不是归入西班牙组的廷吉塔纳。':'锡提芬西斯在晚期《官职志》中列入阿非利加，以内陆塞提夫定位；应与努米底亚以及海岸凯撒里恩西斯分别阅读。';
 if(year<395)return '罗马帝国北非西部的行政与地方社会。'+administration+' 名册是晚期制度参照，不是本年精确实控图。';
 if(year<429)return '西部朝廷背景下的北非地域。'+administration+' 行政隶属与驻军、地方实际控制分别看。';
 if(year<439)return '429 年汪达尔从伊比利亚进入北非，改变沿岸的军事局势；迁徙经过不等于各城同时易主。本地域逐城交接年份尚未全部核定。';
 if(year<442)return '439 年迦太基易手发生在更东面；不能据此将毛里塔尼亚全部涂成同等强度的汪达尔实控区。442 年和约是后续节点。';
 return '442 年之后的北非西部，沿海城市、地方首领和罗马及汪达尔势力的关系需要逐地核对。晚期行省名称仍用于定位，不代表旧行政体系一直完整运作到 500 年。';
}
const periods:[number,number,string][]=[[300,394,'罗马行政与地方地域'],[395,428,'西部朝廷背景'],[429,438,'汪达尔进入北非'],[439,441,'迦太基易手后的西部北非'],[442,500,'和约后的地方差异']];
export const mauretaniaDetails:HistoricalDetail[]=cities.flatMap(c=>periods.map(([from,to,label])=>({
 id:`${c.id}-${from}`,placeId:c.id,title:c.name,displayName:c.latin,kind:'历史城市',from,to,focusYear:from,period:`${from}—${to} 年：${label}`,
 polity:fact(mauretaniaPolity(c.region,from),'mauretaniaSpains','byzacenaList','procopius5','byzacenaTreaty'),territory:fact(c.territory,c.source),
 people:fact(c.people,c.id==='sitifis'?'sitifisHeritage':c.id==='caesarea-mauretania'?'cherchellLandscape':'provinces300'),
 language:fact('地域背景：拉丁语用于罗马公共书写，北非地方语言传统同时存在。行政上的“罗马”、古代的“摩尔”等称谓，不能直接当作某一种母语或现代民族的边界；未收录本城逐年语言比例。','inscriptions300','provinces300'),
 nameNote:fact(c.nameNote,c.source,c.id==='tingis'?'mauretaniaSpains':'byzacenaList'),related:c.related,relatedBattles:from>=429?['vandals-429']:[],
})));
const areas:Pick<Region300,'id'|'name'|'mapName'|'coords'|'bounds'|'modern'|'parts'>[]=[
 {id:'tingitana',name:'廷吉塔纳：丹吉尔与摩洛哥北部',mapName:'廷吉塔纳',coords:[-5.65,35.05],bounds:[[-6.7,33.6],[-4.6,36.4]],modern:'今摩洛哥北部，以海峡南岸的丹吉尔与更南面的沃鲁比利斯定位；对岸是伊比利亚。',parts:'廷吉斯看海峡与行政联系，沃鲁比利斯看罗马撤出后的内陆城镇。阅读窗口包含不同控制状态的地点，不能把整个窗口当作罗马领土。'},
 {id:'caesariensis',name:'凯撒里恩西斯：舍尔沙勒海岸',mapName:'凯撒里恩西斯',coords:[2.2,36.3],bounds:[[0.7,35.4],[3.6,37.1]],modern:'今阿尔及利亚北部、阿尔及尔以西的舍尔沙勒沿海及其腹地；丹吉尔在遥远的西方。',parts:'凯撒利亚（舍尔沙勒）定位省会与海岸，南面接山地和乡村。镜头只覆盖城市周边，不复原完整凯撒里恩西斯省界。'},
 {id:'sitifensis',name:'锡提芬西斯：塞提夫内陆高地',mapName:'锡提芬西斯',coords:[5.25,36.15],bounds:[[4.5,35.5],[5.9,36.9]],modern:'今阿尔及利亚北部塞提夫及邻近高地；东北方向联系杰米拉，东面通向基尔塔和努米底亚。',parts:'锡提菲斯（塞提夫）是内陆城市参照。这里位于广义毛里塔尼亚的东侧，不能把古代名称限制为今天的摩洛哥或现代毛里塔尼亚国家。'},
];
export function addMauretania(regions:Region300[],year:number):Region300[]{
 const parent=regions.find(r=>r.id==='mauretania');
 if(!parent||year<300||year>500)return regions;
 const sources:Source[]=['tingisAtlas','cherchellAtlas','sitifisAtlas','mauretaniaSpains','byzacenaList','cherchellLandscape','sitifisHeritage','procopius5'];
 const children:Region300[]=areas.map(a=>({...parent,...a,parent:'mauretania',polity:mauretaniaPolity(a.id,year),cities:Object.keys(mauretaniaCityRegions).filter(id=>mauretaniaCityRegions[id]===a.id),
  change:year<429?'从西向东比较廷吉塔纳、凯撒里恩西斯和锡提芬西斯；只有廷吉塔纳列在《官职志》的西班牙组，另外两省列在阿非利加组。':'429 年渡海、439 年迦太基易手和 442 年和约是不同节点；本地域没有据此生成未经考证的逐年国界。',sources:[...new Set([...parent.sources,...sources])]}));
 return [...regions.map(r=>r.id==='mauretania'?{...r,coords:[-0.6,35.5] as [number,number],bounds:[[-7,33],[6,37.5]] as Region300['bounds'],modern:'今摩洛哥北部到阿尔及利亚北部的部分地域，以丹吉尔、舍尔沙勒、塞提夫串联；不是现代毛里塔尼亚国家。',parts:'从西向东分别查看廷吉塔纳、凯撒里恩西斯、锡提芬西斯；它们的行政归组、城市地形和实际控制不能合并成一种状态。',cities:['tingis','volubilis','caesarea-mauretania','sitifis'],sources:[...new Set([...r.sources,...sources])]}:r),...children];
}
