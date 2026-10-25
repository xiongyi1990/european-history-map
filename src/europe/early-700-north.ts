import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
const dms=(d:number,m:number,s:number)=>d+m/60+s/3600;
export const northernPlaces:GazetteerPlace[]=[
 point('ribe','里伯','丹麦 · 日德兰半岛西南、瓦登海方向',['Ribe','Ripa','Ripen','里贝'],[8.7648,55.3284],'earlyRibeLocation','用 OpenStreetMap 现代城市代表点找位置。八世纪初市场在里伯河北岸，与今天大教堂周围的后起城区分开；现代点不是 710 年摊位或宫殿坐标。'),
 point('birka','比尔卡','瑞典 · 梅拉伦湖比约克岛、斯德哥尔摩以西',['Birka','Björkö','Bjorko','比约克岛'],[dms(17,32,33.5),dms(59,20,6.5)],'earlyBirkaLocation','采用 UNESCO 比尔卡遗产点坐标，隔水的霍夫戈登是另一个地点。现行 UNESCO 概述采用约 750 年起点，较早评估有八世纪晚期记法；本图以约 750 年阅读，不声称精确建城日。'),
 point('hovgarden','霍夫戈登','瑞典 · 梅拉伦湖阿德尔瑟岛、比尔卡西北隔水相望',['Hovgården','Hovgarden','Adelsö','Adelso','霍夫加登','霍夫花园'],[dms(17,31,47.9),dms(59,21,37.5)],'earlyBirkaLocation','采用 UNESCO 霍夫戈登遗产点坐标。王权据点与比尔卡贸易聚落分开，十三世纪阿尔斯讷宫殿地基、约 1070 年符文石均不提前到八世纪；750 年是本卡覆盖起点，不是据点建造年。'),
 point('danevirke','丹纳维尔克','今德国北部 · 石勒苏益格地峡、日德兰半岛南端',['Danevirke','Danewerk','Dannevirke','丹麦墙','丹尼维尔克'],[dms(9,30,10.6),dms(54,29,14.1)],'earlyDanevirkeLocation','以 UNESCO 主墙第一段代表点定位多段防御体系，不是整条防线的中心线或现代德丹国界。现存遗产含多个世纪的扩建；本点与后起海德比贸易城不是同一地点。'),
 point('kanhave','坎哈沃运河','丹麦 · 萨姆瑟岛中部狭窄地带，连接东侧峡湾与西侧海湾方向',['Kanhave','Kanhavekanalen','Kanhave Canal','Samsø','Samso','坎哈韦运河','卡恩海夫运河'],[10.605524,55.907265],'earlyKanhaveLocation','采用 Outdooractive 开放资料的遗迹代表点。木材年轮为 726 年，博物馆将建造记为 726—729 年；精确进出口与西端是否全程通航仍有研究，不据现代地图画成已核定的古代航道。'),
 point('kaupang','考庞','挪威 · 奥斯陆峡湾西侧、西福尔拉尔维克附近',['Kaupang','Skiringssal','Skíringssalr','考潘','考邦'],[10.10675,59.03406],'earlyKaupangLocation','采用 OpenStreetMap 考古遗址代表点，非同名农场坐标。约 800 年形成贸易聚落；当时岸线与现代不同，800 年是约略阅读节点，不是港口全部设施的确定完工日。'),
];
const locationSources:Record<string,Source>={ribe:'earlyRibeLocation',birka:'earlyBirkaLocation',hovgarden:'earlyBirkaLocation',danevirke:'earlyDanevirkeLocation',kanhave:'earlyKanhaveLocation',kaupang:'earlyKaupangLocation'};
const people='地方农户、工匠、商人、首领及其随从具有不同社会身份；贸易物品来自异地，不等于所有居民也来自那里。考古据点不能代替全北欧的族群或人口普查。';
const language='本条未核定各口语的人数与空间边界；书写传统、日常语言和政治效忠分别理解。';
const reading:ReadingReference[]=[{chapter:144,pages:[1208,1216],note:'课程提供维京贸易、南下与法兰克的后续背景；本条七八世纪地点与建造纪年据独立考古资料补充。'}];
function detail(id:string,from:number,to:number,kind:HistoricalDetail['kind'],control:string,...sources:Source[]):HistoricalDetail{
 const p=northernPlaces.find(p=>p.id===id)!;
 return {id:`northern-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind,period:from===to?`公元 ${from} 年的阅读节点（约略纪年见正文）`:`本条覆盖 ${from}—${to} 年，不是政权完整存续时间`,polity:fact(control,...sources),territory:fact(p.modern+'。地点帮助寻找贸易、王权或工程位置，不生成国家、古城或族群边界。',locationSources[id]),people:fact(people,...sources),language:id==='ribe'?fact('里伯出土符文颅骨片，提供当地书写传统的实物证据；符文不是一种人种，也不能据少数铭文推定商贸聚落所有人的母语与识字率。','earlyRibeRunes'):fact(language),nameNote:fact(p.description,locationSources[id],...sources),reading,readingNote:'课程第 144 讲讨论维京活动及九世纪以后的扩张；本卡为此前的据点背景，不把后来的罗斯、诺曼征服、基督教王国和现代北欧国界提前回填。',readingNoteSource:'earlyNorth',related:['ribe','danevirke','kanhave','birka','hovgarden','kaupang','lindisfarne','iona','gross-stromkendorf','rostock-dierkow','menzlin'].filter(x=>x!==id)};
}
export const northernDetails:HistoricalDetail[]=[
 detail('ribe',710,749,'港口聚落','采用国家博物馆约 710 年的市场节点，也保留约 705 年等建城记法。北岸分区市场、工艺活动和跨海交换逐步发展；早期房屋是否全年居住仍有争议。创建者与逐年掌权者尚未核定，王权介入属于研究解释。','earlyRibe','earlyRibeMarket','earlyRibeDates'),
 detail('ribe',750,800,'历史城市','八世纪中后期的里伯贸易与手工业聚落联系北海和欧洲大陆。市场组织与地方权力并存；本卡用 750 年分隔早期市场与后续城镇背景，不当作一次已知政权更替，也不提前把九世纪教堂或十世纪主教座放在本期。','earlyRibe','earlyRibeMarket','earlyRibeDates'),
 detail('birka',750,800,'港口聚落','按 UNESCO 现行概述，以约 750 年起的梅拉伦湖贸易聚落理解，霍夫戈登承担相联系的王权职能。约 750 年不是统一瑞典建国日；829—831 年安斯加尔传教尚在以后。早期评估的晚八世纪起点另保留在资料中。','earlyBirka','earlyBirkaDates'),
 detail('hovgarden',750,800,'王国中心','比尔卡隔水相望的王权据点，提供贸易活动背后政治组织的空间线索；本卡未核定每年的国王名单与疆域，不称全斯堪的纳维亚的首都。750 年为本条覆盖起点，遗址历史并不从这一天开始。','earlyBirka'),
 detail('danevirke',701,736,'附属地点','多段土垒与湿地构成的早期防御空间，主墙早于八世纪，约 700 年又有弯曲墙段扩建。737 年木栅强化尚未发生；工程显示大型组织能力，不能据此还原一个年度疆界已知的现代丹麦国家。','earlyDanevirke','earlyDanevirkeSite'),
 detail('danevirke',737,737,'事件地点','737 年防御体系以木栅强化，并有北墙和水上阻挡等相关建设。这里标记一轮工程阶段，不把全部现存墙段定为本年完工，也不据此确定唯一的营建君主。','earlyDanevirke'),
 detail('danevirke',738,800,'附属地点','737 年强化后的南部防御与通行控制空间继续作为定位背景，遗址后来还经历多轮改建。现存石墙、砖墙及与海德比的后续连接不能全部提前到八世纪；防御工程也不是现代德丹边界。','earlyDanevirke','earlyDanevirkeSite'),
 detail('kanhave',726,749,'附属地点','木材年轮指向 726 年，萨姆瑟博物馆将营建记为 726—729 年，之后维护数十年。运河缩短岛屿两侧的移动，反映组织工程与控制海上交通的能力；具体营建者、舰队驻泊和西端是否完全贯通仍有研究。','earlyKanhave','earlyKanhaveMeaning'),
 detail('kanhave',750,800,'附属地点','博物馆研究认为运河约在八世纪中叶退出使用。本条以 750 年作为叙述分段，不能当作精确停航日；此后保留工程遗迹的位置，不再把它写成持续通航到 800 年的现役水道。','earlyKanhave','earlyKanhaveMeaning'),
 detail('kaupang',800,800,'港口聚落','约 800 年在西福尔出现的贸易聚落，可定位挪威东南海路和手工业交换。关于丹人宗主或创建设想属于解释，不据此画出已统一挪威或丹麦的精确直辖疆界；具体商人、人口与后续设施不能都压到建点年。800 年是本条资料上限，不是聚落消失之年。','earlyKaupang'),
];
const controlAt=(id:string,year:number)=>northernDetails.find(d=>d.placeId===id&&d.from<=year&&year<=d.to)!.polity.text;
function card(id:string,name:string,site:string,year:number,where:string,...sources:Source[]):RegionalPolityCard{
 const p=northernPlaces.find(p=>p.id===site)!;return {id,name,site,siteName:p.name,from:701,to:800,dates:`本卡细述公元 ${year} 年的王权、聚落或工程背景`,where,control:controlAt(site,year),people,language:site==='ribe'?'里伯符文实物与多地商贸联系分别理解；铭文不能提供全城口语比例。':language,sources};
}
export function northernPolitiesAt(year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 return [
 ...(year>=710?[card('jutland-ribe','日德兰西南：里伯市场与地方权力','ribe',year,'日德兰半岛西南、里伯河通向北海的通道；不是波罗的海湖区比尔卡。','earlyRibe','earlyRibeMarket','earlyRibeDates')]:[]),
 card('southern-defense','日德兰南端：丹纳维尔克防御体系','danevirke',year,'在今天德国北部的石勒苏益格地峡，联系半岛南北通行；不是整个丹人王权辖境。','earlyDanevirke','earlyDanevirkeSite'),
 ...(year>=726?[card('island-passage',year<750?'萨姆瑟岛：坎哈沃运河工程':'萨姆瑟岛：退出使用后的运河遗迹','kanhave',year,'在日德兰与西兰岛之间的萨姆瑟岛，通向两侧海域；与南方土垒是不同工程。','earlyKanhave','earlyKanhaveMeaning')]:[]),
 ...(year>=750?[
  card('malar-trade','梅拉伦湖：比尔卡贸易聚落','birka',year,'今瑞典中东部梅拉伦湖的比约克岛；位于斯德哥尔摩以西。','earlyBirka','earlyBirkaDates'),
  card('malar-royal','梅拉伦湖：霍夫戈登王权据点','hovgarden',year,'阿德尔瑟岛，隔水邻近比尔卡；贸易城与王权居处分别定位。','earlyBirka'),
 ]:[]),
 {id:'norwegian-coast',name:'挪威海岸：地方首领与航海网络',from:701,to:800,dates:`公元 ${year} 年的沿海政治背景；非统一挪威王国年表`,site:'',siteName:'',where:'斯堪的纳维亚半岛西侧海岸、峡湾与岛屿相连；不等于日德兰或梅拉伦湖。',control:'沿海地方首领、聚落与海上联系构成不同权力网络。本层尚未逐项核定各峡湾君主与边界；九世纪以后的挪威王权整合不能提前至本期。',people,language,bounds:[[4,57],[13,66]],locationLabel:'挪威海岸与峡湾方向',sources:['earlyNorth']},
 ...(year>=800?[card('oslofjord-kaupang','奥斯陆峡湾：约 800 年的考庞贸易聚落','kaupang',year,'峡湾西侧的西福尔，拉尔维克附近；不是更北的今日奥斯陆市。','earlyKaupang')]:[]),
 ];
}
export function northernAnchors(region:string,year:number):[string,string][]{
 if(region!=='north'||year<701||year>800)return [];
 return [
 ['danevirke',year===737?'丹纳维尔克 · 木栅强化节点':'丹纳维尔克 · 南部防御体系'],
 ...(year>=710?[['ribe','里伯 · 北海贸易聚落'] as [string,string]]:[]),
 ...(year>=726?[['kanhave',year<750?'坎哈沃运河 · 工程与交通':'坎哈沃运河 · 中叶停用后的遗迹'] as [string,string]]:[]),
 ...(year>=750?[['birka','比尔卡 · 梅拉伦湖贸易'],['hovgarden','霍夫戈登 · 王权据点']] as [string,string][]:[]),
 ...(year>=800?[['kaupang','考庞 · 约 800 年贸易聚落'] as [string,string]]:[]),
 ];
}
