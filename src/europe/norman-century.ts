import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {ReadingGuide} from './LateAntiquityGuide';
import type {Battle} from '../greek/battles';
import {courseSources,type ReadingReference} from './course-sources';

type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const reading=(chapter:164|179):ReadingReference[]=>[{chapter,pages:chapter===179?[1528,1531]:[1391,1396],note:'课程关联阅读；具体地点、日期和空间关系另据公开资料核对。'}];
const people=fact('统治集团、教会与地方居民分别理解；诺曼统治不表示当地居民被全部替换，本条不推算族群比例。');
const language=fact('本条未收录当地语言的人口比例；宫廷、教会和日常交流可能使用不同语言，不能从政权名称直接推断。');
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,kind:'历史地点参考',description:description+' 坐标为约略定位点，不是古代辖区或精确战线。'});
export const normanPlaces:GazetteerPlace[]=[
 point('rouen','鲁昂','法国 · 诺曼底鲁昂',['Rouen','鲁恩','诺曼底','Normandy'],[1.10,49.44],'rouenNorman','塞纳河下游的诺曼底公国重要城市，与海峡北岸的英格兰分别定位。'),
 point('pevensey','佩文西','英国 · 英格兰东萨塞克斯',['Pevensey','佩文塞','威廉登陆'],[0.339,50.819],'pevensey1066','1066 年威廉军队登陆的海湾一带，取城堡附近作位置参考；古代海岸与今天不同。'),
 point('battle','黑斯廷斯战场（巴特尔）','英国 · 英格兰巴特尔镇',['Battle','Hastings','黑斯廷斯','黑斯廷','巴特尔修道院'],[0.487,50.917],'hastingsSite','战场位于今天巴特尔一带，在黑斯廷斯海滨城镇以北，不把两者当作同一个坐标。'),
 point('bari','巴里','意大利 · 普利亚巴里',['Bari','Barium','阿普利亚','普利亚','吉斯卡尔'],[16.87,41.13],'normanBari','意大利半岛东南部、亚得里亚海西岸的港口，是东罗马在南意大利的重要据点。'),
 point('manzikert','曼齐刻尔','土耳其 · 马拉兹吉尔特',['Manzikert','Mantzikert','Malazgirt','曼兹科特','曼齐克特'],[42.54,39.15],'seljuqAnatolia','凡湖以北、安纳托利亚东部的城镇与战役地区，远在君士坦丁堡以东。'),
 point('palermo','巴勒莫','意大利 · 西西里岛巴勒莫',['Palermo','Panormus','Balarm','西西里','Sicily'],[13.36,38.12],'normanSicily','西西里岛北岸城市。应把岛上诺曼伯国、后来西西里王国与英格兰诺曼王朝分开。'),
];
const entry=(year:number,d:Omit<HistoricalDetail,'from'|'to'|'period'> & {period?:string}):HistoricalDetail=>({from:year,to:year,period:`${year} 年：本条只记录这一时点`,...d});
export const normanDetails:HistoricalDetail[]=[
 entry(1066,{id:'rouen-1066',placeId:'rouen',title:'鲁昂',kind:'历史城市',
  polity:fact('诺曼底公爵威廉统治下的城市。威廉在这一年又取得英格兰王位；公爵领地与英格兰王国由同一人统治，但保留不同的政治关系。','normanKing','rouenNorman'),
  territory:fact('鲁昂位于塞纳河下游；诺曼底在英吉利海峡南岸，英格兰在北岸。法兰西国王与诺曼底公爵的关系不能延伸为对英格兰的直接统治。','normanKing'),
  people,language,nameNote:fact('诺曼底是地域及公国名称，不等于全体居民仍是刚从北欧到来的维京战士。'),reading:reading(179),related:['pevensey','battle','london']}),
 entry(1066,{id:'pevensey-1066',placeId:'pevensey',title:'佩文西',kind:'事件地点',period:'1066 年 9 月 28 日登陆之后',
  polity:fact('威廉的军队在佩文西海湾登陆并建立据点，此时还不能把登陆直接等同于征服整个英格兰。','pevensey1066'),
  territory:fact('位于英格兰南岸，黑斯廷斯以西。古罗马堡垒被再利用；海湾淤积使今天的城堡不再紧邻当年的水岸。','pevensey1066'),
  people,language,nameNote:fact('佩文西是登陆地区；黑斯廷斯是沿海集结方向；巴特尔一带是决战地点，三者分开定位。','pevensey1066','hastingsSite'),reading:reading(179),related:['rouen','battle','london']}),
 entry(1066,{id:'battle-1066',placeId:'battle',title:'黑斯廷斯战场（巴特尔）',kind:'事件地点',period:'1066 年 10 月 14 日战役',
  polity:fact('威廉军队击败哈罗德二世的军队，哈罗德战死。战役之后仍有控制城市、平定抵抗和加冕等过程，不能用战场一点表示全境当天易主。','hastingsSite','normanKing'),
  territory:fact('以今天巴特尔修道院附近作战场代表点。战场登记范围、双方阵线与个人死亡位置并非同一种精度，本图不绘制确定的战术阵形。','hastingsSite'),
  people:fact('这里展示交战军队，不是居民分布。诺曼军队的胜利不能被解释为英国全体居民在当天成为诺曼人。'),language,
  nameNote:fact('“黑斯廷斯战役”沿用通行名称；地图定位在巴特尔，而非海滨黑斯廷斯城中心。','hastingsSite'),reading:reading(179),readingNote:'课程第 1530 页把哈罗德之死写成开战不久中箭。此图只记录哈罗德在战役中死亡，不把死亡方式和时刻当作确定的战场坐标。',readingNoteSource:'hastingsSite',related:['pevensey','rouen','london']}),
 entry(1071,{id:'bari-1071',placeId:'bari',title:'巴里',kind:'历史城市',period:'1071 年巴里投降之后',
  polity:fact('巴里被罗贝尔·吉斯卡尔的诺曼军队取得，东罗马在南意大利的统治失去最后的重要据点。吉斯卡尔不是征服英格兰的威廉。','normanBari'),
  territory:fact('从巴里向东隔亚得里亚海望向巴尔干，再向东看君士坦丁堡。南意大利的失地不能等同于整个东罗马帝国灭亡。','normanBari'),
  people,language,nameNote:fact('巴里在意大利半岛，巴勒莫在西西里岛；两个地名容易混淆，政治转折也发生在不同年份。','normanBari','sicilyNomination'),reading:reading(164),related:['palermo','byzantium','manzikert']}),
 entry(1071,{id:'manzikert-1071',placeId:'manzikert',title:'曼齐刻尔',kind:'事件地点',period:'1071 年曼齐刻尔战役',
  polity:fact('东罗马军队在此败于塞尔柱军队。这是安纳托利亚局势变化的重要节点，但不把后来形成的统治范围全部倒填到 1071 年。','seljuqAnatolia'),
  territory:fact('位于安纳托利亚东部、凡湖以北。向西到君士坦丁堡仍有很长距离，不能将战役结果画成全安纳托利亚一夜易主。','seljuqAnatolia'),
  people:fact('突厥社群的进入与既有居民延续是长期过程。军事胜负、政治统治和语言或宗教分布不在同一天完成变化。','seljuqAnatolia'),language,
  nameNote:fact('今名马拉兹吉尔特，英文常见 Manzikert / Malazgirt。城市代表点不表示已测定的交战阵地。','seljuqAnatolia'),reading:reading(164),related:['byzantium','bari','antioch']}),
 entry(1100,{id:'rouen-1100',placeId:'rouen',title:'鲁昂',kind:'历史城市',
  polity:fact('鲁昂所在的诺曼底由罗贝尔·柯索斯统治，英格兰则在 1100 年转由亨利一世统治。亨利到 1106 年才征服诺曼底，不能把 1066 年的共同君主关系一直沿用。','henryNormandy'),
  territory:fact('海峡两岸有王朝联系，但这一时点的英格兰王国与诺曼底公国由不同兄弟掌权。','henryNormandy'),people,language,
  nameNote:fact('同一地点可以对照 1066 与 1100 年，辨别王朝延续和实际统治者变化。'),reading:reading(179),related:['london','palermo']}),
 entry(1100,{id:'london-1100',placeId:'london',title:'伦敦',kind:'历史城市',period:'1100 年亨利一世即位之后',
  polity:fact('亨利一世在威廉二世去世后成为英格兰国王。诺曼底尚在其兄罗贝尔手中，不能提前画成亨利统治海峡两岸。','henryNormandy'),
  territory:fact('英格兰王国与今日联合王国范围不同；本城条目也不将英格兰的臣属及边疆关系全部视为直接行政管辖。'),people,language,
  nameNote:fact('伦敦是泰晤士河城市；王位继承说明适用于当年即位之后，不代表 1100 年全年君主相同。','henryNormandy'),reading:reading(179),related:['rouen','winchester']}),
 entry(1100,{id:'bari-1100',placeId:'bari',title:'巴里',kind:'历史城市',
  polity:fact('巴里处于南意大利诺曼统治空间，已不是东罗马在意大利的据点。这里与西西里岛上诺曼伯爵的领地要分别观察；1130 年的西西里王国尚未成立。','normanBari','normanSicily'),
  territory:fact('本城属于意大利半岛东南部的普利亚方向。西西里岛隔墨西拿海峡相望；共同的诺曼背景不等于同一时点已有统一王国。','normanSicily'),people,language,
  nameNote:fact('普利亚也译阿普利亚；这里的地域名称不直接采用现代大区边界作为中世纪辖区。'),reading:reading(164),related:['palermo','byzantium']}),
 entry(1100,{id:'palermo-1100',placeId:'palermo',title:'巴勒莫',kind:'历史城市',
  polity:fact('1072 年诺曼人取得巴勒莫；1100 年处于西西里伯国阶段。西西里王国到 1130 年才成立，不能把十二世纪王国标题提前三十年。','sicilyNomination','normanSicily'),
  territory:fact('位于西西里岛北岸。与巴里所在的意大利半岛分别定位，也不隶属于英格兰的诺曼王朝。','normanSicily'),
  people:fact('诺曼统治下延续着不同宗教和文化传统；穆斯林、基督徒与犹太社群不能被一个“诺曼人”标签覆盖。本条不提供 1100 年人口比例。','sicilyNomination'),language,
  nameNote:fact('今天所见阿拉伯—诺曼建筑群主要形成于十二世纪，不能当作 1100 年城市景观的完整复原。','normanSicily'),reading:reading(164),related:['bari','rouen','jerusalem']}),
];

export const normanGuides:Record<number,ReadingGuide>={
 1066:{title:'1066 年：跨过海峡，从登陆到英格兰王位',orientation:'先找海峡南岸的鲁昂，再看北岸佩文西登陆地、内陆巴特尔战场，最后到伦敦的加冕。南岸公国、渡海行动和英格兰王位是三个不同层次。',people:'诺曼征服改变了统治集团和土地权利，不意味着全体当地居民被替换。交战军队也不能当作全境居民的样本。',reading:'第 179 讲「征服者威廉」· PDF 1528—1531 页',source:'normanKing',places:[['rouen','诺曼底中心 → 鲁昂'],['pevensey','9 月登陆 → 佩文西'],['battle','10 月决战 → 巴特尔'],['london','圣诞加冕 → 伦敦']],realms:[
  {name:'诺曼底公国与英格兰王国',time:'1066 年底：威廉兼有两种身份',regions:'海峡南岸的诺曼底公国，与北岸英格兰王国由同一人统治；不能把两者视为一套行政区，也不包含现代英国的全部国土。',source:'normanKing',places:[['rouen','公国一侧：鲁昂'],['london','王国一侧：伦敦']]},
 ]},
 1071:{title:'1071 年：东罗马西失巴里，东败于曼齐刻尔',orientation:'先定位意大利半岛东南岸的巴里，再越过巴尔干和君士坦丁堡，找到凡湖以北的曼齐刻尔。同一年发生在帝国两侧的事件，不是同一支军队的一条行军路线。',people:'南意大利的诺曼军队与安纳托利亚的塞尔柱军队分开理解；当地居民、语言和宗教并不随战役在一天内全部改变。',reading:'第 164 讲「十字军王国」· PDF 1391—1396 页；1071 年两个节点为扩展背景',source:'seljuqAnatolia',places:[['bari','西侧据点失守 → 巴里'],['byzantium','仍在延续的帝都 → 君士坦丁堡'],['manzikert','东侧战役 → 曼齐刻尔']]},
 1100:{title:'1100 年：诺曼诸领地与十字军王国不是一个国家',orientation:'由伦敦跨海到鲁昂，再向南看巴里和巴勒莫，最后找到君士坦丁堡与耶路撒冷。相似的统治者背景不表示这些地方属于同一政权。',people:'英格兰、南意大利、西西里与东地中海各有延续的地方社群。“诺曼”描述部分统治集团和文化背景，不能作为跨欧洲的人口分布色块。',reading:'第 164 讲「十字军王国」、第 179 讲「征服者威廉」· PDF 1391—1396、1528—1531 页',source:'henryNormandy',places:[['london','英格兰 → 伦敦'],['rouen','诺曼底 → 鲁昂'],['bari','南意大利 → 巴里'],['palermo','西西里 → 巴勒莫'],['byzantium','东罗马 → 君士坦丁堡'],['jerusalem','拉丁王国 → 耶路撒冷']],realms:[
  {name:'海峡两岸：不同君主',time:'1100 年即位之后；1106 年尚未到来',regions:'亨利一世取得英格兰王位，其兄罗贝尔掌握诺曼底。不能把 1066 年的共同统治关系无限延续。',source:'henryNormandy',places:[['london','英格兰王权：伦敦'],['rouen','诺曼底公爵领地：鲁昂']]},
  {name:'南意大利与西西里：王国之前',time:'西西里王国成立于 1130 年',regions:'巴里所在的半岛南部与巴勒莫所在的西西里岛已有诺曼势力，但 1100 年仍需区别大陆公国与岛上伯国，不能提前使用统一王国的范围。',source:'normanSicily',places:[['bari','半岛一侧：巴里'],['palermo','岛屿一侧：巴勒莫']]},
  {name:'东地中海：两种政治空间',time:'1099 年取得圣城之后',regions:'君士坦丁堡仍是东罗马帝都，耶路撒冷进入拉丁王国时期。十字军诸领地不是东罗马自动收回的行省，也不是英格兰的海外领土。',source:'crusades',places:[['byzantium','东罗马帝都'],['jerusalem','耶路撒冷王国中心']]},
 ]},
};

// Connecting lines explain the order of named events; they are not reconstructed tracks.
export const normanBattles:Battle[]=[{id:'norman-conquest',title:'诺曼征服与黑斯廷斯战役',period:'1066 年',question:'渡海、决战与取得王位，分别发生在哪里？',caveat:'线路是关键地点之间的方向示意，不是精确航迹或行军道路。1066 年海岸与今天不同；伦敦前的支线行军和抵抗未完整收录，不绘制确定战线。',stages:[
 {title:'从索姆河口渡向佩文西',date:'1066 年 9 月 27—28 日',side:'威廉军队 · 渡海',color:'#cc8844',text:'舰队从索姆河口的圣瓦勒里出发，在佩文西海湾登陆。鲁昂是公国城市，并非这次渡海的出发港。',stops:[{name:'索姆河畔圣瓦勒里',coords:[1.63,50.19]},{name:'佩文西海湾',coords:[0.339,50.819]}],path:[[1.63,50.19],[1.35,50.4],[0.85,50.6],[0.339,50.819]],source:courseSources.normanCrossing.url,sections:'英国遗产教学资料：1066 年渡海；线路为编者示意'},
 {title:'由沿海据点前往战场',date:'1066 年 9 月底—10 月 14 日',side:'威廉军队 · 陆路示意',color:'#cc8844',text:'登陆后军队在黑斯廷斯一带建立据点，随后在今天巴特尔附近与哈罗德军队交战。海滨城镇与内陆战场在图上分开。',stops:[{name:'佩文西',coords:[0.339,50.819]},{name:'黑斯廷斯沿海据点',coords:[0.58,50.855]},{name:'巴特尔战场',coords:[0.487,50.917]}],path:[[0.339,50.819],[0.58,50.855],[0.487,50.917]],source:courseSources.hastingsSite.url,sections:'战场登记与战役背景；不重建战术阵形'},
 {title:'战役之后：伦敦加冕',date:'1066 年 12 月 25 日',side:'王位取得 · 事件连线',color:'#cc8844',text:'威廉在威斯敏斯特加冕。此线仅把战场与加冕地点连起来，省略其战后行军、绕行和谈判，不能拿来判断实际进军道路。',stops:[{name:'巴特尔',coords:[0.487,50.917]},{name:'威斯敏斯特',coords:[-0.1276,51.4994]}],path:[[0.487,50.917],[-0.1276,51.4994]],source:courseSources.normanKing.url,sections:'英国王室：威廉一世；加冕事件关联'},
]}];
