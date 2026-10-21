import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {courseSources} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
export const medievalPhasePlaces:GazetteerPlace[]=[{id:'cairo',name:'开罗',modern:'埃及 · 开罗',aliases:['Cairo','al-Qahira','Al Qahirah','法蒂玛'],coords:[31.248022,30.051906],kind:'历史城市参考',source:'https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-populated-places-2/',description:'969 年建立的法蒂玛城市，以 Natural Earth v5.1.1 的现代开罗代表点定位；不是十世纪城墙或福斯塔特遗址坐标。'}];
interface Phase {placeId:string;from:number;to:number;name:string;polity:string;source:Source}
const phases:Phase[]=[
 {placeId:'damascus',from:661,to:749,name:'倭马亚都城',polity:'661 年建立的倭马亚王朝以大马士革为政治中心。750 年阿拔斯革命后的格局另列，不能将此记录延伸过去。',source:'timelineUmayyad'},
 {placeId:'damascus',from:750,to:799,name:'阿拔斯时代的叙利亚城市',polity:'阿拔斯取代倭马亚后，大马士革不再是哈里发帝国的首都。政治重心转向伊拉克；地方城市生活并未因此停止。',source:'abbasid'},
 {placeId:'alexandria',from:661,to:749,name:'倭马亚时期的埃及港口',polity:'埃及在倭马亚的政治体系内；亚历山大里亚是地中海港口，不能与王朝首都大马士革混淆。',source:'timelineEgypt'},
 {placeId:'alexandria',from:750,to:867,name:'阿拔斯时期的埃及港口',polity:'阿拔斯取代倭马亚，埃及纳入其治理体系。868 年图伦王朝的地方统治另列。',source:'timelineEgypt'},
 {placeId:'alexandria',from:868,to:904,name:'图伦王朝时期',polity:'埃及由图伦王朝掌握地方军政权力；阿拔斯哈里发的名义地位与实际控制应分别理解。',source:'timelineEgypt'},
 {placeId:'alexandria',from:905,to:934,name:'恢复阿拔斯统治的阶段',polity:'905 年图伦王朝结束，埃及恢复阿拔斯治理。935 年伊赫什德王朝建立后的阶段另列。',source:'timelineEgypt'},
 {placeId:'alexandria',from:935,to:968,name:'伊赫什德王朝时期',polity:'埃及处于伊赫什德王朝的地方统治之下；此时不能提前标为法蒂玛的埃及。',source:'timelineEgypt'},
 {placeId:'alexandria',from:969,to:1000,name:'法蒂玛时期的埃及港口',polity:'969 年法蒂玛征服埃及，亚历山大里亚转入其统治。新建开罗是王朝新中心，这座海港不是法蒂玛首都。',source:'timelineEgypt'},
 {placeId:'kairouan',from:701,to:749,name:'倭马亚时期的伊弗里基亚中心',polity:'凯鲁万是 670 年建立的基地，随后成为伊弗里基亚的重要中心。本段仅补 701 年以后的倭马亚阶段，不将更早的争夺写成连续稳定统治。',source:'kairouanEarly'},
 {placeId:'kairouan',from:750,to:757,name:'东方革命后的地方军政竞争',polity:'东方阿拔斯已更换王朝，但凯鲁万地方军政仍有竞争；不能把本年起全北非一概认定为阿拔斯稳定直辖。',source:'earlyRustamidHistory'},
 {placeId:'kairouan',from:758,to:760,name:'伊巴德派控制凯鲁万',polity:'伊巴德派的阿布·哈塔卜一方取得凯鲁万，任命伊本·鲁斯塔姆治理；城市实际控制不是这几年的阿拔斯总督直辖。',source:'earlyRustamidHistory'},
 {placeId:'kairouan',from:761,to:762,name:'761／762 年阿拔斯军事恢复',polity:'来源将阿拔斯夺回凯鲁万与伊巴德派撤退记为 761 或 761／762 年，保留地方交接纪年差异，不对两年每个时点指定同一驻军。',source:'earlyRustamidResearch'},
 {placeId:'kairouan',from:763,to:771,name:'阿拔斯恢复后的总督与地方争夺',polity:'阿拔斯恢复凯鲁万后治理仍受到地方起事挑战；772 年伊巴德派再度取得后又败于阿拔斯，另列该年变化。',source:'earlyRustamidHistory'},
 {placeId:'kairouan',from:772,to:772,name:'伊巴德派短期夺取与阿拔斯反攻',polity:'阿布·哈提姆一方取得凯鲁万，随后被新总督击败。按年内变化记录，不将全年写成始终只有一个稳定控制者。',source:'earlyRustamidHistory'},
 {placeId:'kairouan',from:773,to:799,name:'阿拔斯总督与塔赫尔特的不同政治中心',polity:'凯鲁万处于恢复阿拔斯治理的伊弗里基亚框架；777 年形成的塔赫尔特鲁斯塔姆伊玛目政权在更西面，不能当作本城同一个王朝。地方争夺与中央称号分开理解。',source:'earlyRustamidHistory'},
 {placeId:'kairouan',from:800,to:908,name:'阿格拉布王朝时期',polity:'阿格拉布王朝治理伊弗里基亚，保留阿拔斯哈里发的名义权威。地方王朝与巴格达不能简单当作一套相同的实际控制。',source:'africaVandal'},
 {placeId:'kairouan',from:909,to:971,name:'法蒂玛北非时期',polity:'909 年法蒂玛取代阿格拉布王朝。969 年取得埃及后政治重心开始东移；凯鲁万仍须作为北非城市理解。',source:'africaVandal'},
 {placeId:'kairouan',from:972,to:1000,name:'齐里德地方治理时期',polity:'972 年起，齐里德作为法蒂玛的地方统治者治理这一地区；实际地方政权与法蒂玛的名义宗主地位分开记录。',source:'africaVandal'},
 {placeId:'pavia',from:774,to:842,name:'法兰克统治下的意大利王国中心',polity:'774 年查理曼征服伦巴第王国之后，帕维亚进入法兰克统治的意大利王国框架。800 年帝位加冕没有使城市变成东罗马领地。',source:'italyEarly'},
 {placeId:'pavia',from:843,to:854,name:'中部王国的意大利部分',polity:'凡尔登分割后，意大利属于洛泰尔一世的中部王国体系；不是西法兰克王国的一部分。',source:'verdun'},
 {placeId:'pavia',from:855,to:870,name:'中部王国分割后的意大利',polity:'855 年洛泰尔一世分国，路易二世取得意大利。意大利与北方的洛塔林吉亚、罗讷河流域的王国分别理解。',source:'prum'},
 {placeId:'pavia',from:962,to:1000,name:'奥托帝国体系中的意大利王国',polity:'奥托一世取得意大利王权并在 962 年加冕为帝后，意大利王国与德意志王权在皇帝之下联系；地方城市与诸侯仍有自己的权力。',source:'ottonian'},
 {placeId:'baghdad',from:901,to:944,name:'宫廷返回后的阿拔斯都城',polity:'阿拔斯宫廷在 892 年返回后继续以巴格达为中心，但王朝的实际权力已不同于早期鼎盛阶段。',source:'abbasid'},
 {placeId:'baghdad',from:945,to:1000,name:'白益实权与阿拔斯哈里发并存',polity:'945 年白益势力取得巴格达主导权。阿拔斯哈里发继续存在，但不能据其称号把地方实权也归给哈里发。',source:'abbasid'},
];
const locations:Record<string,string>={
 damascus:'黎凡特内陆的大马士革，与地中海沿岸及底格里斯河畔的巴格达分别定位。这里的城市点不代表叙利亚的省界。',
 alexandria:'尼罗河三角洲西侧的地中海港口。港口、埃及地方政治中心和整个王朝疆域是三个尺度；本条没有逐年的市界。',
 kairouan:'今天突尼斯的内陆城市，属于历史上的伊弗里基亚。它与尼罗河流域的埃及、海边的迦太基不是同一个地区。',
 pavia:'意大利北部波河平原、提契诺河畔；与中部罗马和南部伦巴第势力区分，不把全意大利视作同一直接控制区。',
 baghdad:'底格里斯河畔的两河地区城市；与北面的萨迈拉分别定位。首都名称或王朝称号不能代替实际疆界。',
};
/** Fill only uncovered intervals; existing, more specific dated records retain priority. */
export function completeMedievalPhases(existing:HistoricalDetail[]):HistoricalDetail[]{
 const additions:HistoricalDetail[]=[];
 for(const phase of phases){
  let gaps:[number,number][]=[[phase.from,phase.to]];
  for(const d of existing.filter(d=>d.placeId===phase.placeId))gaps=gaps.flatMap(([from,to])=>d.to<from||d.from>to?[[from,to] as [number,number]]:[...(from<d.from?[[from,d.from-1] as [number,number]]:[]),...(to>d.to?[[d.to+1,to] as [number,number]]:[])]);
  const original=existing.find(d=>d.placeId===phase.placeId)!;
  for(const [from,to] of gaps)additions.push({
   id:`${phase.placeId}-phase-${from}-${to}`,placeId:phase.placeId,title:original.title,displayName:original.displayName,from,to,focusYear:from,period:`${from}—${to} 年 · ${phase.name}`,kind:'历史城市',
   polity:fact(phase.polity,phase.source),territory:fact(locations[phase.placeId]),
   people:fact('统治者、驻军、教士、商人和本地居民的身份分别理解。本条尚无这座城市在该阶段的族群人口清单或比例；不从王朝名称推定居民祖源。'),
   language:phase.placeId==='damascus'&&phase.from===661?fact('倭马亚以阿拉伯语为官方语言；这不说明所有本地居民都以同一种语言生活。','timelineUmayyad'):fact('本阶段各社群的日常语言及使用比例尚未细化；行政或宗教书写语言不能代替全体居民的语言。'),
   nameNote:{...original.nameNote,sources:[...original.nameNote.sources]},related:original.related,
   reading:original.reading?.map(r=>({...r,note:'关联课程阅读；本条新增的城市政治分期另据下列史料核对。'})),
  });
 }
 const cairo:HistoricalDetail[]=[{from:969,to:972,polity:'法蒂玛征服埃及后于 969 年建立开罗；哈里发尚未迁入。新城与此前的福斯塔特聚落必须区分。'},{from:973,to:1000,polity:'973 年法蒂玛哈里发迁至埃及，开罗成为王朝中心；亚历山大里亚是海港，凯鲁万所在的伊弗里基亚由地方王朝治理。'}].map(phase=>({
  id:`cairo-fatimid-${phase.from}`,placeId:'cairo',title:'开罗',displayName:'al-Qahira / Cairo',from:phase.from,to:phase.to,focusYear:phase.from,period:`${phase.from}—${phase.to} 年 · 法蒂玛新城`,kind:phase.from===969?'早期中心':'帝国都城',
  polity:fact(phase.polity,'timelineEgypt','africaVandal'),territory:fact('位于尼罗河三角洲南缘。地图点采用现代城市代表坐标，只用于定位；不是十世纪城墙、宫殿或整个埃及的边界。'),
  people:fact('宫廷、军队、商人与埃及本地社群需要区分。法蒂玛王朝的宗派身份不能说明每一位居民的信仰或祖源。'),language:fact('尚未收录新城各社群在本阶段的语言使用比例。'),
  nameNote:fact('开罗是法蒂玛新建城市；福斯塔特是更早的聚落。不能将现代大开罗的范围当作 969 年的新城。','timelineEgypt'),related:['alexandria','kairouan','baghdad'],
 }));
 return [...existing,...additions,...cairo];
}
