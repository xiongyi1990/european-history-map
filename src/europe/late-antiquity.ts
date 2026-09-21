import {region300ById} from './roman-300-regions';
import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources,type ReadingReference} from './course-sources';

type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const reading=(chapter:number,pages:[number,number]):ReadingReference[]=>[{chapter,pages,note:'课程关联阅读；具体城市分期另据条目中的核对来源。'}];
const noCensus=fact('已知的统治集团不代表全城居民。当前没有可用的当地人口比例，故不绘制族群边界。');
const noLanguage=fact('此地此时的日常语言分布尚待补充，不能从国王的族群或信仰推定全城语言。');
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,kind:'历史地点参考',description:description+' 坐标为约略城市位置，不代表宫殿或城墙的精确测量。'});
export const lateAntiquePlaces:GazetteerPlace[]=[
 point('thessaloniki','塞萨洛尼基','希腊 · 塞萨洛尼基',['Thessaloniki','Thessalonica','萨洛尼卡','帖撒罗尼迦','伽列里乌斯'],[22.95,40.63],'galerius','爱琴海北岸的港口，连接巴尔干内陆与海路。'),
 point('toulouse','图卢兹','法国 · 图卢兹',['Toulouse','Tolosa','托洛萨','西哥特王国'],[1.44,43.60],'toulouseLate','加龙河畔、比利牛斯山以北的城市，是理解西哥特早期王国的入口。'),
 point('tournai','图尔奈','比利时 · 图尔奈',['Tournai','Turnacum','Doornik','希尔德里克','克洛维','法兰克王国'],[3.39,50.61],'tournaiLate','斯海尔德河畔的法兰克王权早期中心。今天在比利时，不应据现代国界排除在法兰克史之外。'),
 point('hippo','希波','阿尔及利亚 · 安纳巴附近',['Hippo Regius','希波雷吉乌斯','奥古斯丁','Annaba'],[7.76,36.88],'africaLate','地中海南岸、迦太基以西的罗马城市；奥古斯丁曾在此担任主教。'),
];
export const lateAntiqueDetails:HistoricalDetail[]=[
 {id:'trier-300',placeId:'trier',title:'特里尔',displayName:'Augusta Treverorum',from:300,to:300,period:'300 年：四帝共治的西北驻地',kind:'宫廷驻地',
  polity:fact('君士坦提乌斯担任西部凯撒时的重要驻地。四帝分担统治事务，不能把他们的辖区看成四个独立国家。','trierLate'),
  territory:fact('位于摩泽尔河谷，联系高卢与莱茵边防。与米兰、尼科米底亚对照，能看出朝廷靠近边疆的布局。','trierLate'),people:fact('地域背景：'+region300ById('gaul')!.people,...region300ById('gaul')!.sources),language:fact(region300ById('gaul')!.language,...region300ById('gaul')!.sources),
  nameNote:fact('奥古斯塔·特雷维罗鲁姆对应今天德国的特里尔；当时属于罗马统治空间。','trierLate'),reading:reading(98,[794,795]),related:['milan','nicomedia','thessaloniki']},
 {id:'thessaloniki-300',placeId:'thessaloniki',title:'塞萨洛尼基',displayName:'Thessalonica',from:300,to:300,period:'约 300 年：伽列里乌斯宫殿建设时期',kind:'宫廷驻地',
  polity:fact('伽列里乌斯在这里建设宫殿建筑群，城市成为四帝共治时代重要的皇帝活动地点。','galerius'),
  territory:fact('在爱琴海北岸连接巴尔干与海路。四帝时期皇帝会移动驻地，宫殿所在地不是一条固定行政国界。','galerius'),people:fact('地域背景：'+region300ById('greece')!.people,...region300ById('greece')!.sources),language:fact(region300ById('greece')!.language,...region300ById('greece')!.sources),
  nameNote:fact('塞萨洛尼基又译萨洛尼卡、帖撒罗尼迦。宫殿始建于三世纪末至四世纪初，本条用 300 年作近似定位。','galerius'),reading:reading(98,[792,798]),related:['trier','nicomedia','milan']},
 {id:'thessaloniki-400',placeId:'thessaloniki',title:'塞萨洛尼基',from:400,to:400,period:'400 年：东部帝国的巴尔干港口',kind:'历史城市',
  polity:fact('罗马帝国东部朝廷统治下的重要城市；应与海峡边的君士坦丁堡分别定位。','byzantine'),territory:fact('从这里向北进入巴尔干，向南通爱琴海；宫殿遗迹体现四世纪皇帝曾在此活动。','galerius'),people:noCensus,language:noLanguage,
  nameNote:fact('今名仍为塞萨洛尼基，位于今天希腊北部。'),reading:reading(113,[955,962]),related:['byzantium','antioch','alexandria']},
 {id:'toulouse-500',placeId:'toulouse',title:'图卢兹',displayName:'Tolosa / Toulouse',from:418,to:506,focusYear:500,period:'418—506 年：西哥特王国的图卢兹时期',kind:'王国中心',
  polity:fact('西哥特王权在高卢的重要中心。到 500 年，寻找西哥特王国要先看比利牛斯山两侧，不能只盯着今天的西班牙。','toulouseLate'),
  territory:fact('图卢兹在比利牛斯山以北。507 年是王国失去高卢核心地区的转折，故本条不把此前的王都状态沿用到 507 年之后。','toulouseLate'),
  people:fact('考古材料同时呈现罗马城市社会与西哥特人活动；王国名称不能当作全部居民身份。','toulouseLate'),language:noLanguage,
  nameNote:fact('Tolosa 是古名，Toulouse 是今名；这里与意大利拉文纳的东哥特王国分别显示。','toulouseLate'),reading:reading(133,[1125,1129]),related:['tournai','lyon','ravenna'],readingNote:'第 138 讲 PDF 第 1161 页继续讲 507 年的转折；本条对应此前的地理格局。'},
 {id:'tournai-500',placeId:'tournai',title:'图尔奈',from:500,to:500,period:'500 年：克洛维时代的法兰克王权中心之一',kind:'王国中心',
  polity:fact('与希尔德里克及其子克洛维相连的早期法兰克王权中心。法兰克王权扩展于高卢，不能等同于现代法国。','tournaiLate'),
  territory:fact('位于斯海尔德河畔、今天比利时西部。从图尔奈向南看高卢，再对照西南的图卢兹，可理解两股王权的位置。','tournaiLate'),people:noCensus,language:noLanguage,
  nameNote:fact('图尔奈的法语名为 Tournai，荷兰语名为 Doornik；两名指向同一城市。','tournaiLate'),reading:reading(138,[1159,1164]),related:['toulouse','lyon','trier'],readingNote:'课程对法兰克人与罗马—高卢居民作出区分；没有逐城人口证据时，地图不套用统一比例。'},
 {id:'lyon-500',placeId:'lyon',title:'里昂',displayName:'Lugdunum / Lyon',from:480,to:533,focusYear:500,period:'480—533 年：勃艮第统治时期的里昂',kind:'历史城市',
  polity:fact('勃艮第人已在里昂建立统治；534 年法兰克诸王征服勃艮第王国，故本条止于此前。','lyonLate'),
  territory:fact('罗讷河与索恩河交汇处，连接高卢内陆、阿尔卑斯方向和地中海。当地王国与今天法国勃艮第地区的边界不同。','lyonLate'),people:noCensus,language:noLanguage,
  nameNote:fact('罗马时期的卢格杜努姆对应今天里昂；选到这一时段显示通行中文名“里昂”。'),reading:reading(133,[1125,1129]),related:['toulouse','tournai','milan'],readingNote:'市档案馆将勃艮第人进入里昂列为 470—474 年。本条从 480 年起收录较稳定的归属，不假定有一个无争议的精确占领日。'},
 {id:'carthage-vandal',placeId:'carthage',title:'迦太基',from:439,to:532,focusYear:500,period:'439 年夺城后—532 年：汪达尔统治',kind:'王国中心',
  polity:fact('439 年后进入汪达尔统治。500 年这里已经不受西罗马朝廷直接控制；东罗马直到 533 年出兵才重新取得城市。','africaLate','africaVandal'),
  territory:fact('以今天突尼斯附近为定位，向北隔海对望西西里和意大利。汪达尔的沿岸控制不能扩画成整个北非。','africaVandal'),
  people:fact('汪达尔统治者人数较少，地方制度仍依赖罗马化的北非精英。阿里乌派王室与其他基督教社群并存。','africaVandal'),language:fact('拉丁语仍有重要地位；统治者更换不等于居民语言全部更换。','africaVandal'),
  nameNote:fact('沿用迦太基地点；本条是晚期罗马城市的后续阶段，不是古代布匿国家复国。'),reading:reading(133,[1125,1129]),related:['hippo','rome','ravenna','byzantium']},
 {id:'carthage-533',placeId:'carthage',title:'迦太基',from:533,to:533,period:'533 年：东罗马取得迦太基之后',kind:'历史城市',
  polity:fact('按贝利撒留远征并取得城市之后记录，迦太基转入查士丁尼的东罗马统治。汪达尔王国的战争结束还延续到次年。','africaVandal'),territory:fact('这是城市控制权变化节点，并非宣称整个北非已在同一天被征服。','africaVandal'),people:noCensus,language:noLanguage,
  nameNote:fact('同一港口先后由罗马、汪达尔与东罗马统治，可以切换时期对照。'),reading:reading(120,[1009,1017]),related:['byzantium','ravenna','hippo']},
 {id:'hippo-400',placeId:'hippo',title:'希波',displayName:'Hippo Regius',from:395,to:429,focusYear:400,period:'395—429 年：奥古斯丁任主教时期，围城之前',kind:'历史城市',
  polity:fact('罗马北非的城市。奥古斯丁于 395 年成为希波主教，430 年汪达尔围城期间去世。','africaLate'),territory:fact('在迦太基以西的地中海南岸、今阿尔及利亚安纳巴附近。用它理解北非教会与罗马世界的联系。','africaLate'),people:fact('主教、教会信众与城市居民是不同层次的群体；宗教影响不等于全城拥有同一身份。'),language:noLanguage,
  nameNote:fact('希波不是迦太基；两座北非城市在同一海岸上相隔数百公里。'),reading:reading(129,[1092,1100]),related:['carthage','rome']},
 {id:'london-400',placeId:'london',title:'伦底尼乌姆',displayName:'Londinium / London',from:400,to:400,period:'400 年：罗马统治结束前的不列颠',kind:'历史城市',
  polity:fact('此时仍处于罗马不列颠的政治背景中。约 410 年行政统治结束是渐进过程，不能提前套用到 400 年。','britainLate'),territory:fact('泰晤士河畔的城市，面向英吉利海峡另一侧的高卢；罗马不列颠不包括今天英国的全部地域。','britainLate'),people:noCensus,language:noLanguage,
  nameNote:fact('伦底尼乌姆是罗马城市名，以今天伦敦的历史核心代表点定位。'),reading:reading(101,[813,819]),related:['trier','milan','rome']},
];
