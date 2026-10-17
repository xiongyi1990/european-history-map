import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {courseSources} from './course-sources';
import {earlyMedievalSources} from './early-medieval-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
export const medievalExpansionPlaces:GazetteerPlace[]=[{
 id:'pliska',name:'普利斯卡',modern:'保加利亚 · 普利斯卡',aliases:['Pliska','Pliskusa','普里斯卡','第一保加利亚王国'],coords:[27.1147236,43.3873319],kind:'中世纪王都遗址参考',
 source:earlyMedievalSources.earlyPliskaLocation.url,description:'第一保加利亚国家的早期王都遗址，在多瑙河以南、黑海以西。采用文化路线页面的遗址参考 GPS 点，不表示古城范围、宫殿位置或国家边界。'
}];
const city=(placeId:string,from:number,to:number,title:string,polity:string,source:Source,people?:string,language?:string):HistoricalDetail=>({
 id:`medieval-extra-${placeId}-${from}`,placeId,from,to,focusYear:from,title,kind:placeId==='pliska'&&from<893?'王国中心':'历史城市',period:from===to?`公元 ${from} 年，按所述事件之后`:`${from}—${to} 年的城市背景`,
 polity:fact(polity,source),territory:fact('城市参考点帮助比较位置，不代表历史城界、行省界或整个政权的疆界。'),
 people:people?fact(people,source,...(placeId==='pliska'&&from===681?['earlyBalkans' as const]:[])):fact('尚无该城此年人口构成与比例的可靠清单，不把统治集团当作全体居民。'),
 language:language?fact(language,source):fact('本条未补齐日常口语与书写语言的分布；不依据政权名称推定所有居民的母语。'),
 nameNote:fact(placeId==='lyon'?'本时期称里昂；古罗马条目中的卢格杜努姆指向同一城市发展的历史，不是另一座城。':placeId==='pliska'?'现代普利斯卡聚落与中世纪王都遗址不是同一范围，迁都后的旧都也没有在地图上消失。':'采用通行中文地名；现代国家只用于找位置，不决定历史归属。'),related:placeId==='pliska'?['byzantium']:[],
});
const additions:HistoricalDetail[]=[
 city('jerusalem',614,614,'耶路撒冷','萨珊军取得城市；此时不能写成阿拉伯征服或奥斯曼统治。','earlySouthernProvinces'),
 city('jerusalem',630,630,'耶路撒冷','按展览采用的 630 年纪年，希拉克略举行圣十字架归还仪式；此为战后恢复，不是一个新国家成立。','earlySouthernProvinces'),
 city('alexandria',618,618,'亚历山大里亚','萨珊入侵与地方接管的阶段；文献有 618／619 等不同纪年，不在本年强行确定完整的城市控制状态。','earlySasanianEgypt'),
 city('alexandria',619,628,'亚历山大里亚','采用研究中常见的 619 年陷落纪年；入侵起始另有 618／619 的讨论。萨珊占领城市，与后来阿拉伯征服不同。','earlySasanianEgypt','埃及文书记录战争、逃难与征发；科普特教会人物在占领期间仍有活动，不能说居民整体变成波斯人。','萨珊占领时期的埃及保存中古波斯文、希腊文和科普特文文书；这是区域文书证据，不是该城语言人口比例。'),
 city('alexandria',629,640,'亚历山大里亚','萨珊撤军与东罗马恢复控制的阶段；文献将城市撤军置于 629 年。','earlySasanianEgypt'),
 city('alexandria',641,641,'亚历山大里亚','已达成投降与撤离安排，东罗马军队尚按协议分阶段撤离；不能简单说全年已无东罗马驻军。','earlyEgyptDocuments'),
 city('alexandria',642,642,'亚历山大里亚','按东罗马军队完成撤离之后记录。港口归属改变不代表整个北非同时易主。','earlyEgyptDocuments'),
 city('carthage',698,698,'迦太基','阿拉伯军取得城市，东罗马在此的统治结束；地图仍保留原城市位置，不据此推断所有周边内陆的控制。','earlyCarthage'),
 city('carthage',700,700,'迦太基','作为 698 年易主后的原沿海城市位置定位，不能再标为东罗马北非统治中心；与凯鲁万的新基地分别看。','earlyCarthage'),
 city('ravenna',750,750,'拉文纳','仍是东罗马在意大利的总督中心；751 年伦巴第最终取得城市的变化不能提前使用。','earlyRavenna'),
 city('ravenna',751,751,'拉文纳','按伦巴第王阿斯托尔福征服之后记录，东罗马总督体系终结；这并不是同时征服意大利全部地方。','earlyRavenna'),
 city('nicaea',787,787,'尼西亚','第二次尼西亚会议在此恢复圣像敬礼；教会会议不能当作城邦独立或国家边界变化。','earlyNicaea'),
 city('paris',751,751,'巴黎','法兰克地区的城市。丕平即位开启加洛林王朝，不意味着此年在巴黎建立一个现代法国民族国家。','earlyFrankish'),
 city('paris',768,768,'巴黎','法兰克王国进入查理与卡洛曼分掌阶段；本城仅作法兰克腹地定位，不列为两人的共同首都。','earlyFrankish'),
 city('paris',771,771,'巴黎','卡洛曼去世后查理独掌法兰克王国；帝位加冕还在 800 年。','earlyFrankish'),
 city('lyon',843,843,'里昂','罗讷河方向的中部王国城市，用于连接洛泰尔一世的北部地域与意大利部分；不是独立的现代法国行政区。','verdun'),
 city('lyon',855,855,'里昂','分国后属于查理获得的普罗旺斯—勃艮第罗讷河地域，与洛泰尔二世北部王国、路易二世意大利部分分别看。','prum'),
 city('pliska',681,810,'普利斯卡','第一保加利亚国家的王权中心。早期木构建筑与后来石构宫廷的城市变化不能压成一张不变的城市复原图。','earlyPliska','国家包含保加尔人与斯拉夫社群等；这是国家背景，不是普利斯卡城市人口统计。'),
 city('pliska',811,811,'普利斯卡','东罗马远征破坏城市；一次军事破坏不意味着保加利亚从此永久并入东罗马。','earlyPliska'),
 city('pliska',814,863,'普利斯卡','奥穆尔塔格时期重建宫廷建筑，城市继续作为王权中心；不能把 811 年毁城当作永久废弃。','earlyPliska'),
 city('pliska',864,892,'普利斯卡','鲍里斯一世接受基督教后，城市寺庙改建及新教堂建设展开，仍是保加利亚王权中心。','earlyPliska','王权改宗与居民信仰改变并非同一瞬间；建筑转变也不能说明全城没有其他传统。'),
 city('pliska',893,893,'普利斯卡','王都迁往普雷斯拉夫之后，普利斯卡成为旧都，政治行政重要性下降；不是城市立即消失。','earlyPliska'),
];
/** Fill genuinely missing years; never override existing, more specific city records. */
export function completeMedievalExpansion(existing:HistoricalDetail[]):HistoricalDetail[]{
 const extra:HistoricalDetail[]=[];
 for(const candidate of additions){
  let gaps:[number,number][]=[[candidate.from,candidate.to]];
  for(const d of [...existing,...extra].filter(d=>d.placeId===candidate.placeId))gaps=gaps.flatMap(([a,b])=>d.to<a||d.from>b?[[a,b] as [number,number]]:[...(a<d.from?[[a,d.from-1] as [number,number]]:[]),...(d.to<b?[[d.to+1,b] as [number,number]]:[])]);
  for(const [from,to] of gaps)extra.push({...candidate,id:`${candidate.id}-${from}-${to}`,from,to,focusYear:from});
 }
 return [...existing,...extra];
}
