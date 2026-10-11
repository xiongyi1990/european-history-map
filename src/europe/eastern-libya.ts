import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {Region300} from './roman-300-regions';
import {courseSources} from './course-sources';
import {libyanCoastPolity} from './libyan-coasts';
const fact=(text:string,...sources:(keyof typeof courseSources)[]):HistoricalFact=>({text,sources});
export const easternLibyaPlaces:GazetteerPlace[]=[
 {id:'ptolemais-libya',name:'托勒密城（昔兰尼加）',modern:'利比亚 · 托尔梅塔（Tolmeita）',aliases:['Ptolemais','Tolmeita','Tolmeta','托勒迈斯','托勒密城','托尔梅塔'],coords:[20+57/60+6.23/3600,32+42/60+28.39/3600],kind:'历史地点参考',source:courseSources.ptolemaisSite.url,description:'昔兰尼加海岸、绿山山麓的古城。采用利比亚向 UNESCO 提交的预备名单代表点；预备名单不等于已列入世界遗产。'},
 {id:'paraetonium',name:'帕莱托尼翁',modern:'埃及 · 马特鲁港（Marsa Matruh）',aliases:['Paraetonium','Paraitonion','Marsa Matruh','Mersa Matruh','马特鲁港','马特鲁','帕莱托尼翁'],coords:[27.236943,31.350247],kind:'历史地点参考',source:courseSources.paraetoniumAtlas.url,description:'今埃及西北海岸港湾，位于昔兰尼加与亚历山大里亚之间。坐标来自 Johan Åhlfeldt / DARE，CC BY-SA 3.0，原资料精度约 2 千米。'},
];
export const easternLibyaCityRegions:Record<string,string>={'ptolemais-libya':'cyrenaica400',paraetonium:'marmarica'};
function corridorPolity(y:number){return (y<395?'罗马帝国的下利比亚沿海地域。':'罗马东方的下利比亚沿海地域；《官职志》将下利比亚列入埃及组。')+'马尔马里卡是历史地理名称，和下利比亚行政范围不能完全画等号；帕莱托尼翁作为省治的具体阶段仍需核对。';}
const corridorPeople='沿海港口、农业聚落与流动社群并存。马尔马里卡的 191 年地籍纸草留下希腊、利比亚和拉丁姓名；这是较早证据，不能直接充当本年的居民名册或族群比例。';
const corridorLanguage='希腊语书写可见于地域资料，地方语言传统也应与行政语言分开理解；古代姓名不能直接判定母语，现今阿拉伯语地名也不回填为四、五世纪语言。';
export const easternLibyaDetails:HistoricalDetail[]=easternLibyaPlaces.flatMap(p=>([[300,394],[395,410],[411,438],[439,500]] as [number,number][]).map(([from,to])=>{
 const port=p.id==='paraetonium';
 return {id:`${p.id}-${from}`,placeId:p.id,title:p.name,displayName:port?'Paraetonium':'Ptolemais',kind:'历史城市',from,to,focusYear:from,period:`${from}—${to} 年：${port?'下利比亚沿海联系':from>=411?'主教书信与城市生活':'昔兰尼加的行省城市'}`,
 polity:port?fact(corridorPolity(from),'libyaEasternList','marmaricaStudy'):fact(libyanCoastPolity(false,from)+' 托勒密城在晚罗马时期曾是上利比亚／五城地区的行政中心；从昔兰尼迁治的确切年份有争议，不把某年直接设成迁都日。','ptolemaisEdict','libyaEasternList'),
 territory:port?fact('港湾位于今天埃及西北岸；沿岸向西联系昔兰尼加，向东通往亚历山大里亚，向西南联系锡瓦绿洲。潟湖提供避风条件，海港与内陆通道共同解释其位置。','paraetoniumStudy'):fact('城市在绿山山麓与海岸之间，位于昔兰尼和阿波罗尼亚以西；早先是内陆巴尔卡的港口。把山麓、通向内陆的道路和港湾一起看，比单看一个省名更容易定位。','ptolemaisSite'),
 people:port?fact('港口服务与附近农业腹地相联系。研究指出，一至四世纪当地集水和农业生产较为活跃；进入五世纪不能据此断言每个聚落仍同样繁荣，也不能由遗址数量换算人口。','paraetoniumStudy'):from>=411?fact('叙涅修斯在 411 年致亚历山大里亚的信中讨论附近地方社群、主教安排及军事危机。这显示五城地区与埃及的教会联系；信中的村镇纠纷不能当作托勒密城全体居民的经历。','synesius67'):fact('希腊城市传统、罗马公共生活与本地社会在这里交汇。遗址包含不同时代的宗教与建筑层次，不能把后来的建筑或居民身份全部回填到本年。','ptolemaisSite'),
 language:port?fact(corridorLanguage,'marmaricaStudy'):fact('希腊语文化背景之外，研究还指出四世纪公共铭文中使用过拉丁语。碑铭使用的语言体现公共书写场景，不能据此推定所有居民的日常母语。','ptolemaisEdict'),
 nameNote:port?fact('帕莱托尼翁对应今马特鲁港，在现代埃及境内。“下利比亚”是晚期行政名，既不是现代利比亚国家的简称，也不是下埃及三角洲。','paraetoniumAtlas','marmaricaStudy'):fact('这里的托勒密城对应今托尔梅塔，是昔兰尼加的一座城市；不要和托勒密王朝、埃及境内或东地中海的同名城市混同。','ptolemaisSite'),
 related:port?['ptolemais-libya','apollonia-cyrenaica','alexandria']:['cyrene','apollonia-cyrenaica','paraetonium','alexandria'],relatedBattles:[]};
}));
export function addEasternLibya(regions:Region300[],year:number):Region300[]{
 const parent=regions.find(r=>r.id==='libya');if(!parent||year<300||year>500)return regions;
 const corridor:Region300={...parent,id:'marmarica',parent:'libya',name:'马尔马里卡与下利比亚沿海',mapName:'马尔马里卡 · 下利比亚',coords:[25.8,31.7],bounds:[[22.4,30],[28.5,33.2]],modern:'今利比亚东北部至埃及西北岸的过渡地带；帕莱托尼翁在今埃及马特鲁港，西侧联系昔兰尼加，东侧联系亚历山大里亚。',polity:corridorPolity(year),parts:'沿地中海看港湾与陆路，再向内陆看半干旱腹地。这是连接五城地区和埃及的阅读窗口，不是下利比亚行省的测绘边界，也不表示整片沙漠都受相同强度的控制。',people:corridorPeople,language:corridorLanguage,change:year<395?'晚期行政改革后，上利比亚的五城地区与下利比亚需要分开辨认；本年不使用 395 年以后两部朝廷的称呼。':'与昔兰尼加、埃及一起联系罗马东方；西部北非的王权变化不能直接复制到这里。',cities:['paraetonium'],sources:['marmaricaStudy','paraetoniumStudy','paraetoniumAtlas','libyaEasternList']};
 return [...regions.map(r=>r.id==='cyrenaica400'?{...r,cities:[...r.cities,'ptolemais-libya'],parts:r.parts+' 托勒密城在西侧山麓海岸，是理解晚期行省城市的另一个入口。',sources:[...r.sources,'ptolemaisSite','ptolemaisEdict'] as Region300['sources']}:r.id==='libya'?{...r,name:'利比亚沿海：西部、五城与东部通道',polity:'这是一组跨越西部的黎波里塔尼亚、东部五城地区及马尔马里卡通道的地理参照；各片地域的政治背景分别查看，不按现代国界合并。',bounds:[[10.5,29],[28.5,34]] as Region300['bounds'],modern:r.modern+' 东部通道延伸到今埃及西北岸，不限于现代利比亚国界。',parts:r.parts+' 再向东经过马尔马里卡和帕莱托尼翁，与埃及沿海相接。',cities:[...r.cities,'ptolemais-libya','paraetonium']}:r),corridor];
}
