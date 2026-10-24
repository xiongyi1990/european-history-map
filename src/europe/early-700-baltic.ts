import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const balticPlaces:GazetteerPlace[]=[
 point('grobina','格罗比尼亚','拉脱维亚西部 · 利耶帕亚附近、阿兰德河沿岸',['Grobiņa','Grobina','Grobin','格罗比纳','格罗比尼亚遗址'],[21+9/60+58/3600,56+32/60+6/3600],'earlyGrobina','采用拉脱维亚提交至 UNESCO 预备名单的遗址群代表点，不是全体墓地、聚落或领土边界；预备名单不等于已列入世界遗产。今中世纪城堡遗迹不能当作八世纪建筑。'),
 point('salme-ships','萨尔梅船葬','爱沙尼亚 · 萨雷马岛南部、今萨尔梅聚落附近',['Salme','Salme ships','Saaremaa','Ösel','萨尔梅','萨雷马岛','厄塞尔岛'],[22.25138,58.16694],'earlySalmeLocation','采用地方旅游与步道资料的船葬展示区代表点，不是每具遗骸坐标。八世纪海峡与今日河道、岸线不同；约 750 年为常见概述，新近地貌研究采用约 750—775 年，不能确定为某一天的会战。'),
 point('staraya-ladoga','旧拉多加','俄罗斯西北 · 拉多加湖南侧、沃尔霍夫河下游',['Staraya Ladoga','Staraia Ladoga','Aldeigjuborg','Aldeigja','Старая Ладога','老拉多加','斯塔拉亚拉多加'],[32.3,60],'earlyLadogaLocation','采用 Getty TGN 6005614 的约略现代城市位置（ODC-By 1.0）。遗址在沃尔霍夫河西岸，代表点不能作出土房基、宫殿或古港的精确坐标；不与后起新拉多加混同。'),
];
const reading:ReadingReference[]=[{chapter:144,pages:[1208,1216],note:'课程提供维京贸易与后来的东向罗斯背景；七八世纪的具体遗址、测年与人员研究另据考古资料。'}];
const common={territory:'波罗的海东岸、岛屿与拉多加湖河网分别定位；地点和出土物联系不能自动转成国家、宗主权或族群边界。',language:'器物风格、同位素与遗传资料不能直接判定母语；本条没有核定语言人数与分布线。'};
function detail(id:string,from:number,to:number,kind:HistoricalDetail['kind'],control:string,people:string,...sources:Source[]):HistoricalDetail{
 const place=balticPlaces.find(p=>p.id===id)!;
 const coordinate:Source=id==='grobina'?'earlyGrobina':id==='salme-ships'?'earlySalmeLocation':'earlyLadogaLocation';
 return {id:`baltic-${id}-${from}`,placeId:id,title:place.name,from,to,focusYear:from,kind,period:`本条覆盖 ${from}—${to} 年；纪年窗口与遗址阶段见正文`,polity:fact(control,...sources),territory:fact(place.modern+'。'+common.territory,coordinate),people:fact(people,...sources),language:fact(common.language),nameNote:fact(place.description,coordinate,...sources),related:['grobina','salme-ships','staraya-ladoga','birka','hovgarden','cherson-taurica'].filter(p=>p!==id),reading,readingNote:'第 144 讲的东向罗斯公国属于后来的时期。本层补充更早的跨海活动，不把课程里的九世纪政治格局提前到八世纪。',readingNoteSource:'earlyNorth'};
}
export const balticDetails:HistoricalDetail[]=[
 detail('grobina',701,800,'港口聚落','七世纪起形成的跨海聚落与当地库尔人社会相联系，具有贸易与农耕活动；本条从 701 年接续阅读，非建城年。尚未核定逐年首领、独立国家身份或斯堪的纳维亚王权直辖范围；九世纪文献中的征服事件不提前。','当地库尔人与来自斯堪的纳维亚的移居者留下不同葬俗及交流证据；不能将全部居民统一归为一种人种或现代国籍。','earlyGrobina','earlyGrobinaEvaluation'),
 detail('salme-ships',750,775,'事件地点','两处八世纪船葬提供跨海人员活动及暴力死亡的证据。常用约 750 年，新近地貌研究给出约 750—775 年；这是考古纪年窗口，不表示连续作战 26 年。对手身份、战役经过和统治权未核实。','墓葬样本中的个体来源存在差异，研究支持与斯堪的纳维亚的联系；少数死者不代表全岛居民，不能将他们全部称为现代瑞典国民。','earlySalmeStudy','earlySalmeLandscape','earlySalmeMuseum'),
 detail('salme-ships',776,800,'附属地点','在所采用的约 750—775 年纪年窗口之后，本卡保留船葬遗址的位置。776 年仅是叙述分段，不是另一场已知战役，也没有证据据此宣布全岛被征服。','船葬中死者及其可能的同伴，与萨雷马岛地方社会分别理解；不由墓葬数量推算全岛人口或语言。','earlySalmeStudy','earlySalmeLandscape','earlySalmeMuseum'),
 detail('staraya-ladoga',753,800,'港口聚落','考古木建筑年轮测年表明，居住建筑不晚于 753 年已存在；图中以 753 年开启入口，不断言此前无人居住或本年统一建城。聚落连接波罗的海与河流交通；九世纪留里克叙事及后世石堡不提前回填。','来自不同方向的商人、工匠及居民在此活动；与斯堪的纳维亚的联系不能证明全体居民同一祖源，也不能据聚落推定已建立统一罗斯国家。','earlyLadogaResearch'),
];
export function balticPolitiesAt(year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 return balticPlaces.flatMap(place=>{
  const d=balticDetails.find(d=>d.placeId===place.id&&d.from<=year&&year<=d.to);if(!d)return [];
  const name=place.id==='grobina'?'波罗的海东岸：格罗比尼亚聚落':place.id==='salme-ships'?(year<=775?'萨雷马岛：约 750—775 年的船葬证据':'萨雷马岛：船葬遗址位置'):'沃尔霍夫河：旧拉多加贸易聚落';
  return [{id:`baltic-${place.id}`,name,from:d.from,to:d.to,dates:d.period,site:place.id,siteName:place.name,where:place.modern,control:d.polity.text,people:d.people.text,language:d.language.text,sources:[...new Set([...d.polity.sources,...d.nameNote.sources])].filter((key):key is Source=>key in courseSources)}];
 });
}
export function balticAnchors(region:string,year:number):[string,string][]{
 return region==='east'?balticPolitiesAt(year).map(p=>[p.site,p.siteName+(p.site==='salme-ships'?(year<=775?' · 船葬纪年窗口':' · 船葬遗迹'):' · 贸易与聚落')]):[];
}
