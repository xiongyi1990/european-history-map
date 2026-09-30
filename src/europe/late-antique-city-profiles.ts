import type {GazetteerPlace} from './model';
import type {HistoricalFact,HistorySource} from './history-details';
import {courseSources} from './course-sources';

type Source=keyof typeof courseSources;
type City=GazetteerPlace & {historySource:Source;region:'gaul'|'italy'};
const city=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],region:City['region'],historySource:Source,description:string):City=>({id,name,modern,aliases,coords,region,historySource,description,source:courseSources[historySource].url,kind:'晚期古代城市定位'});
// Representative modern city locations, not ancient walls or battlefield coordinates.
export const lateAntiqueCities:City[]=[
 city('metz','梅斯','法国 · 梅斯',['Metz','Divodurum','Mettis','迪沃杜鲁姆','梅蒂斯'],[6.18,49.12],'gaul','metzNamesLate','在摩泽尔河与塞耶河交会附近，联系莱茵方向和高卢内陆。古名Divodurum，晚期又见Mettis；不能把451年攻城当作一条永久匈人国界。'),
 city('verona','维罗纳','意大利 · 维罗纳',['Verona','维罗纳战役','阿迪杰河'],[10.99,45.44],'italy','veronaLate','意大利北部阿迪杰河畔，阿尔卑斯南麓的城市。312年君士坦丁和489年狄奥多里克的战争分别涉及此地；城内罗马遗迹、后世城墙和会战范围不是同一尺度。'),
 city('narbonne','纳尔博（纳博讷）','法国 · 纳博讷',['Narbo Martius','Narbonne','纳尔博·马尔提乌斯','纳博讷','纳尔邦','纳尔波'],[3.004,43.184],'gaul','narbonneLate','高卢南部奥德河与古代港口网络的节点，联系地中海岸、图卢兹和比利牛斯山。古名Narbo Martius；古代水道和港口不能直接照搬今天海岸线。'),
 city('reims','兰斯','法国 · 兰斯',['Reims','Rheims','Durocortorum','杜罗科尔托鲁姆','兰斯受洗','雷米'],[4.032,49.258],'gaul','reimsNamesLate','罗马高卢的杜罗科尔托鲁姆，即今兰斯。雷米主教与克洛维受洗故事联系此城；受洗常用约496年传统纪年，498年或更晚也有讨论，现存大教堂不是五世纪建筑原貌。'),
];
export const lateAntiqueCityRegions=Object.fromEntries(lateAntiqueCities.map(p=>[p.id,p.region]));
const fact=(text:string,...sources:HistorySource[]):HistoricalFact=>({text,sources});
export function lateAntiqueCityFacts(id:string,y:number,regionalPolity:string){
 const p=lateAntiqueCities.find(v=>v.id===id);
 if(!p||y<300||y>500)return undefined;
 let polity=regionalPolity,people='城市、近郊乡村、军政人员和教会社群有不同身份；此处记录地方背景，没有可据以划出全部居民比例的统计。';
 const sources:HistorySource[]=[p.historySource];
 const battles:string[]=[];
 if(id==='verona'){
  if(y===312)polity+=' 本年君士坦丁与马克森提乌斯一方在维罗纳作战，随后才有罗马城北决战。';
  if(y>=312&&y<=400){battles.push('milvian-312');sources.push('constantine4')}
  if(y>=489){polity=y<=492?'489年狄奥多里克在维罗纳方向与奥多亚克交战，此后争夺意大利、围攻拉文纳；不能把493年最终交接提前到战争开端。':'493年以后联系狄奥多里克的意大利王权；罗马城市制度、居民和拉丁文化没有随王朝变化而全部消失。';battles.push('theodoric-489');sources.push('jordanesEnd5')}
 }
 if(id==='metz'&&y>=451){
  polity='451年阿提拉战争中梅斯受袭；一次劫掠不能证明此后一直存在匈人驻军或永久行政区。'+regionalPolity;
  people='451年叙事涉及城镇居民、教士、死亡及破坏；格雷戈里的圣徒和奇迹故事属于其宗教解释，不用于计算伤亡、人口清空或精确战场。';
  sources.push('metzLate','gregory5');battles.push('attila-gaul-451');
 }
 if(id==='narbonne'&&y>=401){
  polity=y<412?'罗马西部的高卢南部城市背景；约412／413年哥特进入和414年婚姻尚未发生。':y<=415?'约412／413年哥特集团进入纳博讷，414年阿塔乌尔夫在此与普拉西狄娅结婚；军事驻留、婚姻及462年转入西哥特统治是三个不同节点。':y<462?'罗马高卢南部的城市与军政联系；此前哥特驻留不等于已从414年永久归西哥特。462年阿格里皮努斯交城尚未发生。':y===462?'本年阿格里皮努斯将纳博讷交给西哥特狄奥多里克二世，以寻求军事支持；地方交城与阿尔勒、马赛后来的交接分别看。':'462年后纳博讷处在西哥特王权体系中，联系图卢兹及比利牛斯山两侧；仍有高卢—罗马居民和教会社群，507年战争不提前。';
  sources.push('hydatius5','narbonneChronology');
 }
 if(id==='reims'&&y>=401){
  polity='北高卢罗马旧城与主教网络的背景；五世纪军政权力逐步重组，本条没有逐年核定所有驻军和交接。'+(y<486?'克洛维486年之后的扩张不提前。':'处在克洛维扩张后的北高卢阅读空间，和苏瓦松、图尔奈一起比较。')+(y>=496?' 克洛维在兰斯受洗通常系于约496年，也有498年或更晚的讨论；年度视图不能证明仪式一定就在本年。':'');
  people='高卢—罗马地方居民、教会人员与法兰克统治集团的关系逐渐变化；王室受洗不等于全体居民同日换信仰、语言或身份。';sources.push('gregory5','clovisBaptismLate');
 }
 return {polity:fact(polity,...sources),people:fact(people,...sources),language:fact('拉丁语公共书写、法律及教会传统延续；地方口语与迁居、军队集团的语言接触。不按王权易手推断全部居民的母语或人口比例。',...sources),relatedBattles:battles};
}
