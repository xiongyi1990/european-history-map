import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources,type ReadingReference} from './course-sources';

type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const reading=(chapter:number,pages:[number,number]):ReadingReference[]=>[{chapter,pages,note:'课程关联阅读；城市定位、年代与补充事实另据下列资料核对。'}];
const residents=fact('这里的国王、军队、教士和本地居民应分别理解。现有资料不足以给出这个城市的族群人口比例。');
const languages=fact('本条尚未收录当地各语言的使用比例；国王的祖源、宗教与居民日常语言不是一回事。');
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,kind:'历史地点参考',description:description+' 坐标取约略城市位置，用于阅读定位，不是古城界线。'});
export const earlyMedievalPlaces:GazetteerPlace[]=[
 point('pavia','帕维亚','意大利 · 帕维亚',['Pavia','Ticinum','提契努姆','伦巴第王国','伦巴底'],[9.16,45.19],'paviaEarly','米兰以南、提契诺河畔的伦巴第王权中心，与亚得里亚海一侧的拉文纳分别定位。'),
 point('toledo','托莱多','西班牙 · 托莱多',['Toledo','Toletum','托雷多','西哥特','雷卡雷德'],[-4.02,39.86],'toledoEarly','塔霍河畔、伊比利亚内陆的西哥特王都；与王国早期在高卢的图卢兹区别。'),
 point('damascus','大马士革','叙利亚 · 大马士革',['Damascus','Dimashq','倭马亚','伍麦叶','穆阿维叶'],[36.31,33.51],'damascusEarly','黎凡特内陆城市，倭马亚王朝在此建立政治中心；不是两河流域的巴格达。'),
 point('kairouan','凯鲁万','突尼斯 · 凯鲁万',['Kairouan','Qayrawan','盖鲁万','凯万'],[10.10,35.68],'kairouanEarly','北非内陆的早期阿拉伯穆斯林基地，始建于 670 年，与海岸附近的迦太基区分。'),
];
export const earlyMedievalDetails:HistoricalDetail[]=[
 {id:'pavia-lombard',placeId:'pavia',title:'帕维亚',displayName:'Ticinum / Pavia',from:600,to:773,focusYear:600,period:'本条覆盖 600—773 年：伦巴第王都',kind:'王国中心',
  polity:fact('伦巴第王国的王权中心。572 年取得城市后，帕维亚逐渐形成王都地位；本条从 600 年开始收录，止于 774 年查理曼征服之前。','paviaEarly'),
  territory:fact('位于波河平原北侧、米兰以南。伦巴第控制区与东罗马在意大利的据点交错，不能把整片意大利都涂为伦巴第。','paviaEarly','gregoryEarly'),
  people:residents,language:languages,nameNote:fact('古名 Ticinum，今名 Pavia。伦巴第王国的政治空间不能直接套用现代伦巴第大区边界。'),reading:reading(145,[1219,1222]),related:['milan','ravenna','rome'],readingNote:'起止时间表示本卡资料覆盖，并非王国完整存续时间。'},
 {id:'toledo-visigoth',placeId:'toledo',title:'托莱多',displayName:'Toletum / Toledo',from:600,to:710,focusYear:600,period:'本条覆盖 600—710 年：西哥特王都',kind:'王国中心',
  polity:fact('西哥特王国的政治与教会中心。六世纪后期托莱多已成为王都；600 年和 700 年都应在伊比利亚内陆寻找这个中心。','toledoEarly','toledoChurch'),
  territory:fact('在塔霍河畔，与比利牛斯山北面的图卢兹相距很远。王国还曾跨越山脉保有纳博讷地区，不能直接套用现代西班牙国界。','toledoEarly'),
  people:fact('王室、主教会议和城市居民不是同一种人口分类。“西哥特王国”表示统治共同体，并不说明全城都是哥特人。'),language:languages,
  nameNote:fact('Toletum、Toledo 与托莱多指向同一城市。不要将后来基督徒、穆斯林与犹太人的城市叙事整体提前到 600 年。','toledoEarly'),reading:reading(148,[1238,1246]),related:['toulouse','cordoba','pavia']},
 {id:'rome-gregory',placeId:'rome',title:'罗马',from:590,to:604,focusYear:600,period:'590—604 年：大格列高利任罗马主教',kind:'教廷驻地',
  polity:fact('罗马仍处在东罗马意大利统治的背景中，罗马主教格列高利承担救济、城市事务与对伦巴第人的交涉。教会权力增长不等于此时已有八世纪的教皇国。','gregoryEarly'),
  territory:fact('把罗马、帕维亚、拉文纳组成一个地理三角：主教驻地、伦巴第王都和东罗马总督驻地。军事控制与教会影响并非同一边界。','gregoryEarly'),
  people:fact('贵族、教士、修道团体、贫民与战争中的流离者同时存在；格列高利的救济活动说明城市社会不只有统治者。','gregoryEarly'),language:languages,
  nameNote:fact('罗马城继续存在，城市中教会的作用越来越重要；这不是西罗马皇帝在 600 年复位。'),reading:reading(135,[1137,1143]),related:['pavia','ravenna','byzantium']},
 {id:'carthage-600',placeId:'carthage',title:'迦太基',from:600,to:600,period:'600 年：东罗马统治下的北非中心',kind:'历史城市',
  polity:fact('此时处于东罗马统治。与 500 年的汪达尔时期对照，533 年开始的再征服已经改变了当地归属。','africaVandal','transitionEarly'),
  territory:fact('城市位于今天突尼斯附近、地中海南岸。东罗马的沿海城市和设防据点不代表整个撒哈拉以北地区均受同等控制。','africaVandal'),
  people:fact('地方城市、基督教团体和帝国官员并存；再征服延续部分罗马传统，也伴随边区冲突。','africaVandal'),language:languages,
  nameNote:fact('迦太基与凯鲁万是两个地点。600 年不能显示尚未于 670 年建立的凯鲁万为统治中心。'),reading:reading(120,[1009,1017]),related:['rome','ravenna','byzantium','kairouan']},
 {id:'damascus-700',placeId:'damascus',title:'大马士革',displayName:'Damascus / Dimashq',from:700,to:700,period:'700 年：倭马亚哈里发国的政治中心',kind:'帝国都城',
  polity:fact('倭马亚王朝统治下的都城。帝国的权力中心已从阿拉伯半岛转向叙利亚；此时还不能使用后来阿拔斯时代的巴格达作都城。','damascusEarly','umayyadEarly'),
  territory:fact('城市在地中海东岸内陆，与安条克、耶路撒冷和埃及构成可相互定位的区域。伊比利亚征服在 711 年以后，不能提前画入 700 年。','umayyadEarly','umayyad'),
  people:fact('阿拉伯穆斯林统治与原有城市社会交织，基督教等社群持续存在；政权更换没有使居民在同一年全部更换身份。','transitionEarly'),
  language:fact('倭马亚时期阿拉伯语成为官方语言，原有社会文化传统仍继续影响艺术与日常生活；不能把官方语言当作全民母语。','umayyadEarly'),
  nameNote:fact('大马士革是叙利亚城市；其作为历史都城的统治范围大于现代叙利亚。','damascusEarly'),reading:reading(150,[1256,1263]),related:['jerusalem','alexandria','kairouan','byzantium']},
 {id:'alexandria-700',placeId:'alexandria',title:'亚历山大里亚',from:700,to:700,period:'700 年：倭马亚统治下的埃及港口',kind:'历史城市',
  polity:fact('埃及已脱离东罗马，属于倭马亚统治范围。亚历山大里亚仍是地中海港口，不能据其希腊化城市起源继续判为东罗马领地。','transitionEarly','umayyadEarly'),
  territory:fact('在尼罗河三角洲西侧，与南岸迦太基和东岸黎凡特分别定位。城市归属不能替代埃及所有地区的治理状况。'),
  people:fact('埃及的科普特基督徒等地方社群与新统治者并存；征服、改宗和语言变化是不同过程。','transitionEarly'),
  language:fact('科普特语、希腊语传统与阿拉伯语的传播需要分开理解，现有条目没有这座城市在 700 年的语言人口统计。','transitionEarly'),
  nameNote:fact('继续使用亚历山大里亚这一地名。港口城市、埃及行政中心和哈里发都城是不同地点。'),reading:reading(149,[1251,1255]),related:['damascus','jerusalem','byzantium']},
 {id:'jerusalem-700',placeId:'jerusalem',title:'耶路撒冷',from:700,to:700,period:'700 年：倭马亚时期的圣城',kind:'历史城市',
  polity:fact('处于倭马亚统治之下，阿卜杜勒·马利克主持建造的岩石圆顶建筑已在城中出现。它是宗教重地，都城则在大马士革。','umayyadEarly'),
  territory:fact('位于地中海东岸的内陆高地；与北方的安条克、尼罗河口的亚历山大里亚分别定位。'),
  people:fact('基督徒、犹太人与新兴的穆斯林社群需要分别理解，圣城的宗教意义不等于只有一种居民身份。','transitionEarly'),language:languages,
  nameNote:fact('700 年的耶路撒冷与 1099 年十字军取得的同一座城市相隔约四百年，可用“同一地点，不同时期”对照。'),reading:reading(149,[1251,1255]),related:['damascus','alexandria','byzantium']},
 {id:'kairouan-700',placeId:'kairouan',title:'凯鲁万',displayName:'Kairouan / Qayrawan',from:700,to:700,period:'700 年：北非的阿拉伯穆斯林基地',kind:'历史城市',
  polity:fact('670 年建立的北非阿拉伯穆斯林基地，700 年处在倭马亚扩张的背景下。它位于内陆，不能用它的点位代替沿海迦太基。','kairouanEarly','africaVandal'),
  territory:fact('在今天突尼斯中部，处于海岸与山地之间的平原。城镇基地、周围部落地区和整片北非的控制范围需要分别辨认。','kairouanEarly'),
  people:fact('“阿拉伯穆斯林基地”说明城市建立的背景，不代表整个北非居民都变为阿拉伯人。当地具体族群比例未收录。'),language:languages,
  nameNote:fact('凯鲁万又见盖鲁万等译名。著名清真寺和水池的现存形态包含后世建设，不能把今天全部古迹原样放到 700 年。','kairouanEarly'),reading:reading(149,[1251,1255]),related:['carthage','damascus','alexandria']},
];
