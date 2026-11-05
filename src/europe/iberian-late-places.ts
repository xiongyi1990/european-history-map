import data from './iberian-late-place-data.json';
import {iberianLateSources as sources} from './iberian-late-sources';
import {medievalTransitionFrames} from './medieval-transition';
import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
export const iberianLatePlaces:GazetteerPlace[]=data.map(p=>({id:p.id,name:p.name,modern:p.modern,aliases:p.aliases,coords:p.coords as [number,number],source:sources[p.key as keyof typeof sources].url,kind:'中世纪地点参考',description:'约略城市或战役地域定位；当年政治关系看年份卡，不据现代国家或城镇点复原历史疆界。'}));
const fact=(text:string,...sources:HistorySource[])=>({text,sources});
export const iberianLateDetails:HistoricalDetail[]=medievalTransitionFrames.flatMap(f=>{
 const y=f.year,r=(id:string)=>f.realms.find(r=>r.id===id)!;
 const detail=(id:string,name:string,rid:string,keys:HistorySource[],related:string[],polity?:string,territory?:string):HistoricalDetail=>{const realm=r(rid);return {id:`${id}-iberian-late-${y}`,placeId:id,from:y,to:y,focusYear:y,title:name,displayName:name,kind:'历史城市',period:f.eventDate.split('，')[0],polity:fact(polity??realm.ruler+'。'+realm.status,...keys),territory:fact(territory??realm.geography,...keys),people:fact(realm.people,...(rid==='castile-crown'?['iberianToledo' as HistorySource]:rid==='navarre-late'?['iberianPamplona' as HistorySource]:[])),language:fact(realm.language,...(rid==='aragon-crown'?['iberianAragonese' as HistorySource]:rid==='granada-late'?['iberianArabic' as HistorySource]:[])),nameNote:fact('中文名与现代位置用于找地点；王冠名称、王国起止、君主任期及城镇实控须分别阅读。'),related,reading:f.reading.filter(v=>[148,233].includes(v.chapter)),readingNote:'课程提供半岛方位和后续格局比较，本年君主、城市制度与事件以独立来源核验；固定核心不是逐年前线。'};};
 const ds:HistoricalDetail[]=[
 detail('toledo','托莱多','castile-crown',['iberianKings','iberianToledo'],['seville','cordoba','granada'],r('castile-crown').ruler+'。本城位于卡斯蒂利亚王冠的内陆，不因阿拉伯文化遗存就仍属于格拉纳达。','塔霍河畔的内陆城市。十四世纪会堂与王室官员例子说明社会身份的多样性，不是本年居民统计。'),
 detail('seville','塞维利亚','castile-crown',['iberianKings'],['toledo','cordoba','granada']),
 detail('cordoba','科尔多瓦','castile-crown',['iberianKings'],['seville','granada'],'本年为卡斯蒂利亚王冠下的城市。'+r('castile-crown').ruler+'；不能继续沿用十世纪科尔多瓦哈里发国的归属。'),
 detail('zaragoza','萨拉戈萨','aragon-crown',['iberianKings','iberianCaspe','iberianCoronation'],['barcelona','valencia','caspe']),
 detail('barcelona','巴塞罗那','aragon-crown',['iberianCrown','iberianKings'],['zaragoza','valencia','palma']),
 detail('valencia','瓦伦西亚（巴伦西亚）','aragon-crown',['iberianCrown','iberianKings'],['barcelona','zaragoza','palma']),
 detail('palma','帕尔马','aragon-crown',['iberianCrown','iberianKings'],['barcelona','valencia'],'马略卡在阿拉贡王冠体系中，与本土诸地域有共同君主和不同制度。'+r('aragon-crown').ruler,'在马略卡岛，不属于半岛大陆；本专题未把海面补成同色陆地。'),
 detail('lisbon','里斯本','portugal-late',['iberianPortugal','iberianWindsor','iberianRegency'],['coimbra','porto','aljubarrota','ceuta']),
 detail('coimbra','科英布拉','portugal-late',['iberianPortugal','iberianWindsor'],['lisbon','porto']),
 detail('porto','波尔图','portugal-late',['iberianPortugal'],['lisbon','coimbra']),
 detail('pamplona','潘普洛纳','navarre-late',['iberianNavarre','iberianNavarreStudy','iberianPamplona'],['tudela','zaragoza'],r('navarre-late').ruler+'。'+r('navarre-late').status,(y<1423?'本年尚在1423联合之前：圣尼古拉斯、纳瓦雷里亚、圣塞尔南三个城区的权利应分别看。':'1423年9月8日联合文书后，三城区合为一套市政；不能继续画成三个毫无变化的独立城区。')+' 城区联合不是纳瓦拉与别国合并。'),
 detail('tudela','图德拉','navarre-late',['iberianNavarreStudy','iberianNavarre'],['pamplona','zaragoza']),
 ...(['granada','malaga','almeria'] as const).map((id,i)=>detail(id,['格拉纳达','马拉加','阿尔梅里亚'][i],'granada-late',['iberianGranada','iberianMuhammadV','iberianMuhammadVII','iberianYusufIII','iberianMuhammadIX'],['granada','malaga','almeria'].filter(p=>p!==id))),
 ];
 if(y>=1385)ds.push(detail('aljubarrota','阿尔茹巴罗塔战役地域','portugal-late',['iberianWindsor'],['lisbon','coimbra','toledo'],'1385年8月14日若昂一世阵营击败卡斯蒂利亚入侵军。'+(y===1386?'本图取1386年3月底，温莎条约尚未在5月9日签署。':'会战年份与当前所选年份分开；葡萄牙没有由此变成英格兰的一省。'),'圣若热—巴塔利亚附近的战役地域。点位不是村镇中心、确切部队阵位或精确行军轨迹。'));
 if(y>=1414)ds.push(detail('caspe','卡斯佩','aragon-crown',['iberianCaspe','iberianCoronation'],['zaragoza','barcelona','palermo'],'1412年6月28日宣布费尔南多继承；1414年在萨拉戈萨加冕，1416年阿方索继承。所标年份为'+y+'年，不能把三件事当作同一天。'));
 if(y>=1415)ds.push(detail('ceuta','休达','portugal-late',['iberianCeuta'],['lisbon','granada'],'若昂一世在1415年8月21日夺取休达，此后是葡萄牙跨海据点。其归属不说明北非全境都属葡萄牙。','直布罗陀海峡南岸、北非海岸。今天由西班牙管辖的现代说明，不回填成'+y+'年的政治归属。'));
 return ds;
});
