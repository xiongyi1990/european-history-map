import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const southernBalticPlaces:GazetteerPlace[]=[
 point('gross-stromkendorf','大施特勒姆肯多夫','德国北部 · 维斯马湾东岸、大施特勒姆肯多夫村附近',['Groß Strömkendorf','Gross Stromkendorf','Gross Stroemkendorf','Reric','雷里克','大斯特罗姆肯多夫'],[11.488439,53.961359],'earlyStromkendorfLocation','用 OpenStreetMap 现代村庄代表点寻找附近湾岸的早期聚落，不充当古港或墓地坐标。州考古机构将遗址与文献中的雷里克联系；不是今名 Rerik 的另一座城镇，也不把 808 年事件提前到八世纪。'),
 point('rostock-dierkow','罗斯托克—迪尔科夫','德国北部 · 瓦尔诺河下游东侧、普里梅尔贝格附近',['Rostock-Dierkow','Dierkow','Primelberg','迪尔科夫','罗斯托克迪尔科夫'],[12.1398678,54.1037035],'earlyDierkowLocation','用 OpenStreetMap 普里梅尔贝格考古发掘区代表点定位，非现代罗斯托克市中心或 Dierkow-West 居民区中心；中世纪汉萨城与八世纪聚落不能视为同一城市阶段。'),
 point('menzlin','门茨林','德国东北部 · 佩内河下游、今门茨林村以南的旧营地遗址',['Menzlin','Altes Lager Menzlin','Altes Lager (Menzlin)','门兹林','梅茨林','门茨林旧营地'],[13.62861,53.87046],'earlyMenzlinLocation','用 OpenStreetMap 旧营地考古遗址代表点，不是北面的现代村中心，也不是新石器时代的大石墓。Altes Lager 是现用遗址名称，不能由“旧营地”的字义推定八世纪驻军；本点不表示全部聚落和墓地边界。'),
];
const reading:ReadingReference[]=[{chapter:144,pages:[1208,1216],note:'课程提供维京贸易与后续扩张背景；本条南波罗的海具体聚落和测年另据考古机构资料。'}];
const language='斯拉夫地方社会、斯堪的纳维亚与西欧商贸联系不等于每个人的母语；未核定各口语人数或精确语言边界。';
const coordinateSources:Record<string,Source>={'gross-stromkendorf':'earlyStromkendorfLocation','rostock-dierkow':'earlyDierkowLocation',menzlin:'earlyMenzlinLocation'};
function detail(id:string,from:number,to:number,kind:HistoricalDetail['kind'],control:string,people:string,...sources:Source[]):HistoricalDetail{
 const p=southernBalticPlaces.find(p=>p.id===id)!;
 return {id:`southern-baltic-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind,period:`本条覆盖 ${from}—${to} 年；约略纪年与阶段差异见正文`,polity:fact(control,...sources),territory:fact(p.modern+'。湾岸、河口与河流下游是不同位置；地图未据商贸联系生成国家、港区或族群边界。',coordinateSources[id]),people:fact(people,...sources),language:fact(language),nameNote:fact(p.description,coordinateSources[id],...sources),reading,readingNote:'第 144 讲用于理解跨海贸易背景，具体聚落证据为另行补充。不能从维京称谓推导本区全部居民的祖源、语言或统治者。',readingNoteSource:'earlySouthBalticPorts',related:['gross-stromkendorf','rostock-dierkow','menzlin','ribe','danevirke','birka','grobina'].filter(x=>x!==id)};
}
export const southernBalticDetails:HistoricalDetail[]=[
 detail('gross-stromkendorf',730,759,'早期中心','研究报告将较早聚落痕迹置于 730 年代，约 760 年代才发展为海上贸易据点；图中用 730 年开启这一宽泛阶段，不声称精确建城日或完整古港已经形成。没有核定这一阶段每年的统治者与辖境。','南波罗的海斯拉夫地方社会与跨海活动相接；早期聚落、后续贸易人口和墓地样本分别理解，不把器物产地当作居民国籍。','earlyDierkowReport','earlySouthBalticPorts'),
 detail('gross-stromkendorf',760,800,'港口聚落','约 760 年代起贸易与手工业据点发展。州考古机构将这里与后来文献所记雷里克联系；本卡未逐年核定丹人王权、斯拉夫首领及地方商人的权力关系，不能套用 808 年的冲突与迁移。800 年是资料上限，不是聚落终结年。','斯堪的纳维亚和西欧文化联系见于考古材料；工匠、商人、家庭与周边斯拉夫社会并存，不据单一风格或葬俗推算全城族群比例。','earlyDierkowReport','earlyStromkendorfHistory','earlySouthBalticMuseum'),
 detail('rostock-dierkow',760,789,'港口聚落','发掘报告将最早明确建筑活动放在约 760 年，城市概述也有约 750 年的记法。本卡采用约 760 年的考古节点；木构与低湿地出土材料提供港口通行和建设线索，不把后世汉萨城市制度提前。','斯拉夫地方社会与跨地域商人、工匠的交换相联系；没有资料据以把所有人称为同一人种，或宣布这里属于一个统一的维京帝国。','earlyDierkowReport','earlyDierkowCity','earlySouthBalticPorts'),
 detail('rostock-dierkow',790,800,'港口聚落','晚八世纪淤积背景下，聚落向低地扩展；编织木垫、木栅、道路和港区地块体现持续建设。木栅有 790 年代测年，本图以 790 年分段，不称所有工程于本年一次完成；802 年水井不提前出现。','建设者、工匠和使用港区的人属于不同社会角色；工程扩建本身不能证明换了族群、王朝或语言。','earlyDierkowReport','earlySouthBalticPorts'),
 detail('menzlin',760,800,'港口聚落','采用报告约 760 年代发展为海上贸易据点的阶段；这不是此前无人活动的断言。佩内河下游沟通内陆与海路，逐年地方首领和政治边界未核定，不能因墓地与跨海物品就判为丹麦直辖或独立维京王国。','斯拉夫地方居民、与斯堪的纳维亚相联系的来者及商贸活动分别理解。出土双面人头鸟纹针的神祇解释尚有争论，不能据此断言全体居民信奉奥丁。','earlyDierkowReport','earlyMenzlinPin','earlySouthBalticMuseum'),
];
export function southernBalticPolitiesAt(year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 return southernBalticPlaces.flatMap(p=>{
  const d=southernBalticDetails.find(d=>d.placeId===p.id&&d.from<=year&&year<=d.to);if(!d)return [];
  const name=p.id==='gross-stromkendorf'?(year<760?'南岸维斯马湾：早期聚落痕迹':'南岸维斯马湾：雷里克关联贸易据点'):p.id==='rostock-dierkow'?(year<790?'南岸瓦尔诺河：迪尔科夫贸易聚落':'南岸瓦尔诺河：低地与港区扩建'):'南岸佩内河：门茨林贸易聚落';
  return [{id:`southern-baltic-${p.id}`,name,from:d.from,to:d.to,dates:d.period,site:p.id,siteName:p.name,where:p.modern,control:d.polity.text,people:d.people.text,language:d.language.text,sources:[...new Set([...d.polity.sources,...d.people.sources,coordinateSources[p.id]])].filter((key):key is Source=>key in courseSources)}];
 });
}
export function southernBalticAnchors(region:string,year:number):[string,string][]{
 return region==='north'?southernBalticPolitiesAt(year).map(p=>[p.site,p.siteName+(year<760?' · 南岸早期聚落':' · 南岸贸易据点')]):[];
}
