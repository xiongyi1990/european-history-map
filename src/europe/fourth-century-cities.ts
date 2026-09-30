import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources} from './course-sources';
import {fourthCityRegions,fourthEvents,fourthPhaseAt,fourthReading,fourthRegionsAt} from './fourth-century';
import {lateAntiqueCities,lateAntiqueCityFacts} from './late-antique-city-profiles';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources:[...new Set(sources)]});
const site=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'四世纪城市定位'});
export const fourthPlaces:GazetteerPlace[]=[
 ...lateAntiqueCities,
 site('arles','阿雷拉特（阿尔勒）','法国 · 阿尔勒',['Arelate','Arles','阿尔勒会议'],[4.631,43.678],'arles4','罗讷河下游的高卢城市，314 年会议地点；与北非教会的联系不意味着会议在迦太基召开。'),
 site('nicaea','尼西亚','土耳其 · 伊兹尼克',['Nicaea','İznik','尼凯亚','尼西亚会议'],[29.72,40.43],'nicaea4','伊兹尼克湖东岸的比提尼亚城市，325 年会议地点；不是尼科米底亚。'),
 site('hadrianople','阿德里安堡','土耳其 · 埃迪尔内',['Hadrianopolis','Adrianople','Edirne','哈德良堡'],[26.56,41.68],'ammianus31','色雷斯内陆城市，324、378 年均有附近战事；城市点不等于已考定战场位置。'),
 site('amida','阿米达','土耳其 · 迪亚巴克尔',['Amida','Diyarbakir','阿弥达'],[40.23,37.91],'amida4','底格里斯河上游的罗马边城，359 年被沙普尔二世攻陷；遗存包含多个时代。'),
 site('edessa','埃德萨','土耳其 · 尚勒乌尔法',['Edessa','Urhai','Urfa','奥尔海'],[38.79,37.16],'edessa4','罗马奥斯若恩地区城市、叙利亚语文化中心，与尼西比斯保持交通和宗教联系。'),
 site('strasbourg','阿根托拉特（斯特拉斯堡）','法国 · 斯特拉斯堡',['Argentoratum','Strasbourg','斯特拉斯堡战役'],[7.75,48.58],'ammianus16','莱茵河附近的军政节点；357 年尤利安与阿勒曼尼联军在附近交战。'),
 site('siscia','西斯西亚','克罗地亚 · 锡萨克',['Siscia','Sisak','锡萨克'],[16.37,45.49],'theodosius4','库帕河与萨瓦河交会附近的罗马城市，是理解巴尔干通往意大利交通的节点。'),
 site('naissus','奈苏斯','塞尔维亚 · 尼什',['Naissus','Niš','尼什'],[21.9,43.32],'constantine4','巴尔干内陆城市，与君士坦丁的出生背景有关；出生地不等于整个帝国首都。'),
 site('mursa','穆尔萨','克罗地亚 · 奥西耶克',['Mursa','Osijek','穆尔萨会战'],[18.7,45.55],'constantius4','德拉瓦河畔的罗马城市，351 年内战会战的附近定位点，不是战场边界。'),
];
// Paris already has a shared medieval gazetteer point; add its ancient profile without a duplicate map point.
const cityProfiles=[...fourthPlaces,site('paris','卢泰西亚（巴黎）','法国 · 巴黎',['Lutetia','Paris','卢泰西亚'],[2.35,48.86],'paris4','塞纳河畔的高卢城市，360 年尤利安在此被拥立。沿用共享的现代城市代表点，不表示古城墙范围。'),
 site('ravenna','拉文纳','意大利 · 拉文纳',['Ravenna'],[12.2,44.42],'ravenna','亚得里亚海沿岸城市与港口空间；四世纪还不能提前当作402年以后西部宫廷常驻地。'),
 site('toulouse','托洛萨（图卢兹）','法国 · 图卢兹',['Tolosa','Toulouse'],[1.44,43.6],'arles4','高卢西南的加龙河城市；418年安置与西哥特王权中心属于五世纪，不提前用于四世纪。'),
 site('tournai','图尔奈','比利时 · 图尔奈',['Tournai','Turnacum'],[3.39,50.61],'tournaiLate','斯海尔德河方向的罗马高卢城市；希尔德里克与克洛维的王权关系属于五世纪后期。'),
 site('hippo','希波','阿尔及利亚 · 安纳巴',['Hippo Regius','Annaba'],[7.77,36.9],'africaLate','北非沿岸城市，在迦太基以西；430年汪达尔围城尚未发生。'),
 site('clermont5','阿尔维尔纳（克莱蒙）','法国 · 克莱蒙费朗',['Arverna','Augustonemetum'],[3.085,45.779],'clermontNames5','罗马时期古名奥古斯托内梅图姆，晚期称阿尔维尔纳等；在高卢内陆奥弗涅，475年割让给西哥特在下一世纪。'),
];
const newCityById=new Map(cityProfiles.map(p=>[p.id,p]));
const newSources:Record<string,Source>={arles:'arles4',paris:'paris4',nicaea:'nicaea4',hadrianople:'ammianus31',amida:'amida4',edessa:'edessa4',strasbourg:'ammianus16',siscia:'theodosius4',naissus:'constantine4',mursa:'constantius4',ravenna:'ravenna',toulouse:'arles4',tournai:'tournaiLate',hippo:'africaLate',clermont5:'clermontNames5'};
// Build dated regional-context records, retaining pre-existing detailed entries where present.
// Adjacent identical records are merged; no annual precision is inferred from a period summary.
export function completeFourthCentury(base:HistoricalDetail[]):HistoricalDetail[]{
 const result:HistoricalDetail[]=[];
 const originals=new Map<string,HistoricalDetail>();
 for(const d of base)if(d.from<=300&&d.to>=300&&fourthCityRegions[d.placeId])originals.set(d.placeId,d);
 const ids=[...new Set([...originals.keys(),...cityProfiles.map(p=>p.id)])];
 const regions=new Map(Array.from({length:101},(_,i)=>[300+i,fourthRegionsAt(300+i)]));
 for(const id of ids){
  let last:HistoricalDetail|undefined;let lastKey='';
  for(let year=300;year<=400;year++){
   if(base.some(d=>d.placeId===id&&d.from<=year&&d.to>=year)){last=undefined;lastKey='';continue}
   const r=regions.get(year)!.find(r=>r.id===fourthCityRegions[id])!;
   const p=fourthPhaseAt(year)!;const seed=originals.get(id),place=newCityById.get(id);
   const source=lateAntiqueCities.find(p=>p.id===id)?.historySource??newSources[id]??r.sources[0];
   let title=seed?.title??place!.name;
   let polity=r.polity;
   let people=r.people;
   let language=r.language;
   let nameNote=place?.description??seed!.nameNote.text;
   if(id==='byzantium'){title=year<330?'拜占庭城':'君士坦丁堡';nameNote=year<330?'海峡欧洲岸的拜占庭城；330 年新都落成发生在此后。':'330 年改建为君士坦丁堡（新罗马）；此名不能提前用于 300 年。'}
   if(id==='nisibis'){
    polity=year<363?'罗马帝国东方边城；沙普尔二世曾多次围攻，未在这些围攻中取得该城。':year===363?'本年和议前属罗马；约维安与沙普尔二世议和后转归萨珊。年度视图列出这一年内的易手。':'萨珊帝国控制，363 年已由罗马交出；不能继续使用早期罗马归属。';
    if(year>=363)people='363 年交城涉及原居民迁离及随后人口安置；部分基督徒前往埃德萨。城市名称延续不等于居民结构始终不变。';
   }
   if(id==='edessa'){polity='罗马帝国的奥斯若恩城市。363 年交出尼西比斯并未同时把埃德萨交给萨珊。';language='阿拉米语的叙利亚语书写传统突出，也处在希腊语和罗马行政网络中。';people=year<363?'本地城市社会中有长期存在的基督教社群，也有其他宗教传统。':'地方居民之外，363 年后接纳来自尼西比斯的流亡者，包括叙利亚人以法莲；不由此推算人口比例。'}
   if(id==='amida'){polity=year<359?'罗马帝国的底格里斯河上游边防城市。':year===359?'本年沙普尔二世围城并攻陷阿米达；围城前后的控制和人口遭遇不同。':'359 年攻陷后的恢复与罗马—萨珊边防重组背景。阿米达未列入 363 年明确交出的尼西比斯、辛加拉等城；不将一次攻陷等同于永久归属。';people=year<359?'地方居民与罗马边防驻军并存；日后 359 年围城会改变人口处境。':'边城居民、驻军和战争中进入城内的人口并存；359 年围城伴随死亡、俘虏和迁移。'}
   if(id==='volubilis')polity='罗马撤出南廷吉塔纳之后的地方城市社会；本世纪不按有罗马遗址就判定为帝国直接控制。';
   if(id==='cologne'&&year>=355&&year<=356)polity='莱茵边防危机：科隆约 355 年被法兰克人夺取，尤利安于 356 年恢复控制；不能把整个时期视为持续罗马实控。';
   if(id==='strasbourg'&&year>=355&&year<=357)polity='莱茵边防争夺区域；周边据点受阿勒曼尼攻势影响，357 年尤利安在附近取胜。';
   if(id==='milan'&&year>=395)polity='罗马帝国西部朝廷的重要驻地，霍诺留在位；迁拉文纳发生在 402 年。';
   const localEvents=fourthEvents.filter(e=>e.year<=year&&e.places.includes(id));
   const recent=localEvents.slice(-2);
   const politicalSource:Source=r.id==='persia'||r.parent==='persia'?'sasanianDynasty4':p.source;
   const localSource:Source=id==='nisibis'?'nisibis300':id==='amida'?'ammianus19':id==='edessa'?'edessa4':source;
   const socialSources:Source[]=[localSource,...r.sources.slice(0,2)];
   const localFacts=lateAntiqueCityFacts(id,year,polity);
   const value={placeId:id,title,displayName:place?.aliases[0]??seed?.displayName,kind:'历史城市' as const,
    polity:localFacts?.polity??fact(polity,politicalSource,localSource),territory:fact(`地域位置：${r.modern} ${r.parts} ${recent.map(e=>`${e.year} 年：${e.title}。${e.effect}`).join(' ')} 点位为古今对照，未重建城墙、行省及族群的精确边界。`,source,...recent.map(e=>e.source)),
    people:localFacts?.people??fact(people,...socialSources),language:localFacts?.language??fact(language,...socialSources),nameNote:fact(nameNote,id==='byzantium'?'byzantine':source),
    reading:fourthReading.filter(ref=>year<324?ref.chapter<=100:year<364?ref.chapter===99||ref.chapter===112:ref.chapter===103||ref.chapter===113),
    related:r.cities.filter(v=>v!==id).slice(0,8),relatedBattles:[...new Set([...localFacts?.relatedBattles??[],...localEvents.flatMap(e=>e.battle?[e.battle]:[])])]};
   const signature=JSON.stringify([value,p.title]);
   if(last&&last.to===year-1&&signature===lastKey){last.to=year;last.period=`${last.from}—${year} 年 · ${p.title}`;continue}
   last={...value,id:`${id}-fourth-${year}`,from:year,to:year,focusYear:year,period:`${year} 年 · ${p.title}`};lastKey=signature;result.push(last);
  }
 }
 return result;
}

// Preserve existing city-specific political entries, while filling previously unrecorded social backgrounds.
export function enrichFourthCenturySocial(base:HistoricalDetail[]):HistoricalDetail[]{
 return base.map(d=>{
  if(d.from<301||d.to>400||!fourthCityRegions[d.placeId])return d;
  const r=fourthRegionsAt(d.from).find(r=>r.id===fourthCityRegions[d.placeId]);
  if(!r)return d;
  return {...d,people:d.people.sources.length?d.people:fact(r.people,...r.sources.slice(0,2)),language:d.language.sources.length?d.language:fact(r.language,...r.sources.slice(0,2))};
 });
}
