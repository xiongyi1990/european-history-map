import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact,HistorySource} from './history-details';
import {courseSources} from './course-sources';
import {fifthCityRegions,fifthRegionsAt} from './fifth-century-regions';
import {fifthLocalCityRegions} from './fifth-century-subregions';
import {fifthEast,fifthWest,fifthEvents,fifthReading,type FifthSource} from './fifth-century';
import {fifthAfrica} from './fifth-century-rulers';
import {fifthVisigoths,fifthSuevi} from './fifth-century-western-kingdoms';
import {fifthBattleEvents} from './fifth-century-battles';
const fact=(text:string,...sources:HistorySource[]):HistoricalFact=>({text,sources:[...new Set(sources)]});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:FifthSource,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'五世纪城市定位'});
export const fifthPlaces:GazetteerPlace[]=[
 point('clermont5','阿尔维尔纳（克莱蒙）','法国 · 克莱蒙费朗',['Clermont-Ferrand','Clermont','Arverna','Civitas Arvernorum','Augustonemetum','奥古斯托内梅图姆','奥弗涅','西多尼乌斯','欧里克'],[3.085,45.779],'clermontNames5','罗马时期古名奥古斯托内梅图姆，晚期称阿尔维尔纳等；今克莱蒙费朗的历史核心，在法国中部奥弗涅，不能与地中海岸普罗旺斯混淆。'),
 point('braga5','布拉卡拉（布拉加）','葡萄牙 · 布拉加',['Bracara Augusta','Braga','苏维汇'],[-8.426,41.55],'braga5','伊比利亚西北部的罗马城市与后来的苏维汇王权中心，不能按现代葡萄牙国界理解。'),
 point('orleans5','奥尔良','法国 · 奥尔良',['Aurelianis','Orléans','奥尔良围城'],[1.91,47.9],'orleans5','卢瓦尔河畔城市，451 年阿提拉战争的节点；不是卡塔劳努姆会战的精确战场。'),
 point('soissons5','苏瓦松','法国 · 苏瓦松',['Soissons','Suessiones','西阿格里乌斯'],[3.32,49.38],'gregory5','北高卢城市，486 年克洛维与西阿格里乌斯战争的定位点，非已确定的战阵范围。'),
 point('chalcedon5','迦克墩','土耳其 · 伊斯坦布尔卡德柯伊',['Chalcedon','Kadıköy','卡尔西顿','迦克墩会议'],[29.026,40.988],'chalcedon5','博斯普鲁斯海峡亚洲岸，与欧洲岸的君士坦丁堡分别定位；451 年会议所在地。'),
];
function localPolity(id:string,y:number,fallback:string){
 if(['arles','massilia','tarraco'].includes(id))return fallback+' 此处按城市所在地域分期；同年内的战争与交接不代表整片区域同步变化。';
 if(id==='rome')return fifthWest(y)+(y===410?' 本年阿拉里克军队洗劫罗马；城破不等于西部帝国已经灭亡。':y===455?' 本年汪达尔军队洗劫罗马，但未建立对整个意大利的长期统治。':' 罗马仍有城市、元老院与教会制度；皇帝或国王的主要驻地不在此城。');
 if(id==='ravenna')return (y<402?'西部宫廷尚未迁入；霍诺留主要驻米兰。':y===402?'本年西部朝廷从米兰迁驻拉文纳。':fifthWest(y))+(y<476?' 拉文纳是西部朝廷的意大利军政节点。':' 拉文纳是意大利王权的军政节点。')+' 宫廷统治和全意大利实控范围分开观察。';
 if(id==='byzantium')return fifthEast(y)+' 此处是东方宫廷，476 年以后仍有皇帝。';
 if(id==='nisibis')return '萨珊帝国控制的尼西比斯，363 年交城已经发生；不把对岸埃德萨的罗马归属套到这里。';
 if(id==='edessa'||id==='amida')return '罗马东方边城。'+(id==='edessa'?'埃德萨与萨珊的尼西比斯分属两国，叙利亚语文化联系仍在。':'阿米达在五世纪仍是罗马边防城市；502 年围城在本段之后。');
 if(id==='salona')return y<475?'萨洛纳是达尔马提亚沿海的罗马军政节点；不能用多瑙河匈人势力概括整个沿海。':y<=480?'尼波斯退往达尔马提亚后继续主张西部皇位，至 480 年去世。东方的承认与意大利实控分开看。':y<493?'达尔马提亚在尼波斯死后进入与奥多亚克意大利王权相联系的阶段；具体地方控制不能只看皇帝头衔。':'达尔马提亚沿海与狄奥多里克的意大利王权相联系；不是整个多瑙河流域都属于东哥特。';
 if(id==='soissons5')return y<461?'北高卢的罗马城市背景，不能提前显示克洛维征服。':y<486?'埃吉迪乌斯及其后西阿格里乌斯的北高卢军事势力背景；与南部西哥特王权分开。':y===486?'本年克洛维击败西阿格里乌斯，地方政治归属出现转折。':'处于克洛维扩张后的法兰克权力范围；507 年后的高卢格局尚未形成。';
 if(id==='braga5')return fifthSuevi(y)+' 布拉加位于半岛西北，是比较当地王权与居民社会的入口。';
 if(id==='housesteads')return y<410?'哈德良长城沿线的罗马旧军区背景；驻军安排正在变化，不能把现存遗迹视为仍按三世纪编制满员运作。':'罗马常规军政退出之后的旧堡址及地方社会背景；遗迹延续不等于帝国驻军从410年一直驻到500年。';
 if(id==='volubilis')return '罗马撤出南廷吉塔纳后的地方城镇社会；汪达尔进入北非不证明沃鲁比利斯同年成为其驻军城。';
 if(id==='sirmium')return y<441?'多瑙河与萨瓦河方向的罗马旧军政节点，匈人扩张影响周边。':y<454?'441年前后匈人战争中的西尔米乌姆及多瑙河内陆；不能把沿海萨洛纳的归属套到此城。':'匈人联盟瓦解后的多瑙河权力重组背景，涉及哥特、格皮德等集团；493年意大利东哥特王权建立不证明此城同年也归东哥特。504年的后续变化不提前。';
 if(id==='tournai')return y<481?'罗马旧城与法兰克军政联系的地方背景；五世纪后期希尔德里克与此地关系重要，但不据此把全高卢都划为法兰克。':y<=482?'约481／482年希尔德里克去世，克洛维继承王权；本地王朝交接不等于高卢所有城市同日易主。':'克洛维的法兰克王权背景；486年北高卢战争与507年南方扩张分别看。';
 return '地域背景（不是已逐年核实的城市实控记录）：'+fallback;
}
// Fill dated gaps; refine court cities and southern handovers inside 401–500, retaining neighbouring periods.
export function completeFifthCentury(base:HistoricalDetail[]):HistoricalDetail[]{
 const cleaned=base.flatMap(d=>{
  if(!['rome','byzantium','ravenna','arles','massilia','tarraco'].includes(d.placeId)||d.from>500||d.to<401)return [d];
  const segment=(from:number,to:number)=>({...d,id:d.id+'-retained-'+from+'-'+to,from,to,focusYear:Math.max(from,Math.min(to,d.focusYear??from))});
  return [...(d.from<401?[segment(d.from,400)]:[]),...(d.to>500?[segment(501,d.to)]:[])];
 });
 const out:HistoricalDetail[]=[];
 const cache=new Map(Array.from({length:100},(_,i)=>[401+i,fifthRegionsAt(401+i)]));
 for(const [id,region] of Object.entries(fifthCityRegions)){
   const seed=base.find(d=>d.placeId===id&&d.from<=400&&d.to>=400),place=fifthPlaces.find(p=>p.id===id);
  if(!seed&&!place)throw new Error('Missing fifth century seed: '+id);
  let previous:HistoricalDetail|undefined,previousKey='';
  for(let year=401;year<=500;year++){
   if(cleaned.some(d=>d.placeId===id&&d.from<=year&&d.to>=year)){previous=undefined;previousKey='';continue}
   const r=cache.get(year)!.find(r=>r.id===(fifthLocalCityRegions[id]??region))!;
   const events=fifthEvents.filter(e=>e.year===year&&e.places.includes(id));
   const title=id==='london'&&year>=410?'伦敦旧罗马城址':seed?.title??place!.name;
   const localSource:Record<string,FifthSource>={clermont5:'clermontNames5',braga5:'braga5',orleans5:'orleans5',soissons5:'gregory5',chalcedon5:'chalcedon5'};
   const sources=[...r.sources,...(localSource[id]?[localSource[id]]:[]),...events.flatMap(e=>[e.source,...e.moreSources??[]])];
   const d:HistoricalDetail={id:'',placeId:id,title,from:year,to:year,focusYear:year,period:'',kind:'历史城市',displayName:seed?.displayName,
    polity:fact(localPolity(id,year,r.polity)+(events.length?' 本年关联：'+events.map(e=>e.title+'。'+e.text).join(' '):''),...sources),
    territory:fact((place?.description??('城市的现代位置见标题下方。所在地域：'+r.modern))+' 本页采用城市代表点，不表示城墙、战场或行政边界。',...r.sources),
    people:fact('五世纪地域背景：'+r.people,...r.sources),language:fact(r.language,...r.sources),
    nameNote:fact(place?.description??seed!.nameNote.text,...r.sources),reading:fifthReading.map(v=>({...v,pages:v.pages as [number,number]})),related:id==='clermont5'?['toulouse','arles','lyon']:r.cities.filter(p=>p!==id).slice(0,4),relatedBattles:[...new Set(fifthEvents.filter(e=>e.year<=year&&e.places.includes(id)).flatMap(e=>fifthBattleEvents[e.year]?[fifthBattleEvents[e.year]]:[]))]};
   const key=JSON.stringify([d.title,d.polity,d.people,d.language]);
   if(previous&&previousKey===key){previous.to=year;previous.period=`${previous.from}—${year} 年：五世纪分期背景`;continue}
   d.id=`${id}-fifth-${year}`;d.period=`${year} 年：五世纪分期背景`;out.push(d);previous=d;previousKey=key;
  }
 }
 return [...cleaned,...out].flatMap(d=>{
  if(d.placeId==='toulouse'&&d.from<=500&&d.to>=418){
   const cuts=[d.from,...[418,419,451,452,453,454,466,468,484,485,501].filter(y=>y>d.from&&y<=d.to),d.to+1];
   return cuts.slice(0,-1).map((from,i)=>{
    const to=cuts[i+1]-1,inside=from>=418&&to<=500;
    return {...d,id:`${d.id}-goth-ruler-${from}`,from,to,focusYear:Math.max(from,Math.min(to,d.focusYear??from)),period:inside?`${from}${to===from?'':`—${to}`} 年：图卢兹王权分期`:d.period,
     polity:inside?fact(fifthVisigoths(from)+' '+d.polity.text,...d.polity.sources,'jordanes5','westernKings5','hydatiusStudy5'):d.polity};
   });
  }
  if(d.placeId!=='carthage'||d.from>500||d.to<439)return [d];
  const cuts=[d.from,...[439,477,478,484,485,496,497,501].filter(y=>y>d.from&&y<=d.to),d.to+1];
  return cuts.slice(0,-1).map((from,i)=>{
   const to=cuts[i+1]-1,inside=from>=439&&to<=500;
   return {...d,id:`${d.id}-vandal-ruler-${from}`,from,to,focusYear:Math.max(from,Math.min(to,d.focusYear??from)),
    period:inside?`${from}${to===from?'':`—${to}`} 年：迦太基王权分期`:d.period,
    polity:inside?fact(fifthAfrica(from)+' '+d.polity.text,...d.polity.sources,'vandalKings5','vandalSociety5'):d.polity};
  });
 });
}
