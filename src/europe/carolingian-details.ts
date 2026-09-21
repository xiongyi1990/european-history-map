import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources,type ReadingReference} from './course-sources';
import type {ReadingGuide} from './LateAntiquityGuide';

type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const reading=(chapter:number,pages:[number,number]):ReadingReference[]=>[{chapter,pages,note:'课程关联阅读；具体城市归属与都城分期另据下列资料核对。'}];
const unknownPeople=fact('没有可用于这一时点的全城人口比例。王朝家族、驻军、教士、商人与当地居民分别理解，不把统治者的祖源当作所有居民的身份。');
const unknownLanguage=fact('本条未收录当地语言的可靠比例；行政书写语言、宗教语言和日常口语不是同一层面。');
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,kind:'历史地点参考',description:description+' 坐标取约略城市位置，不是古城边界或事件的精确发生点。'});
export const carolingianPlaces:GazetteerPlace[]=[
 point('verdun','凡尔登','法国 · 凡尔登',['Verdun','凡尔登条约','843','帝国三分'],[5.38,49.16],'verdun','默兹河畔的城市，843 年帝国分割的条约以此命名；不是新建的王国首都。'),
 point('regensburg','雷根斯堡','德国 · 雷根斯堡',['Regensburg','Ratisbon','Ratisbonne','雷根斯布尔格','东法兰克','巴伐利亚'],[12.10,49.02],'regensburg','多瑙河上游、巴伐利亚的宫廷与交通中心，位于亚琛东南方向。'),
 point('oviedo','奥维耶多','西班牙 · 奥维耶多',['Oviedo','Ovetum','阿斯图里亚斯','阿斯图里亚'],[-5.84,43.36],'oviedo','伊比利亚北部、坎塔布连山地北侧的阿斯图里亚斯王都。'),
 point('baghdad','巴格达','伊拉克 · 巴格达',['Baghdad','Madinat al-Salam','和平城','阿拔斯','智慧宫'],[44.37,33.34],'abbasid','底格里斯河畔的阿拔斯政治与文化中心，762 年建立新都。它不是叙利亚的大马士革。'),
 point('samarra','萨迈拉','伊拉克 · 萨迈拉',['Samarra','萨马拉','萨迈拉古城','阿拔斯宫廷'],[43.88,34.20],'samarra','巴格达以北、底格里斯河畔，836—892 年的阿拔斯宫廷驻地。'),
 point('paris','巴黎','法国 · 巴黎',['Paris','Lutetia','卢泰西亚','西法兰克','塞纳河'],[2.35,48.86],'parisMedieval','塞纳河畔的城市，用于定位西法兰克的北部地区；中世纪王权与地方权力需要分别理解。'),
];
const baghdadBase={placeId:'baghdad',title:'巴格达',displayName:'Baghdad / 和平城',kind:'帝国都城' as const,
 territory:fact('位于两河流域的底格里斯河畔；都城的位置不等于哈里发在各地的实际控制程度。科尔多瓦的后倭马亚政权独立于阿拔斯。','abbasid','umayyad'),
 people:fact('宫廷、商人、工匠和学者共同参与城市生活。阿拔斯文化吸收不同地区的传统，不能把阿拉伯语文化圈画成单一祖源的人群。','abbasid'),language:unknownLanguage,
 nameNote:fact('“和平城”指阿拔斯建造的新都；现代巴格达范围远大于早期圆城。城市代表点不复原八世纪城墙。','abbasid'),reading:reading(153,[1282,1289]),related:['damascus','samarra','cordoba','byzantium']};
const parisBase={placeId:'paris',title:'巴黎',displayName:'Paris',kind:'历史城市' as const,
 territory:fact('塞纳河沿线、亚琛以西。此处用城市帮助定位西法兰克，不把今天法国的国界或巴黎的首都功能直接搬回九世纪。','verdun'),
 people:fact('伯爵、教会与城市居民是不同群体。地方权利与王权交错，政治上属于一个王国不表示由国王直接管理每一项事务。','parisMedieval'),language:unknownLanguage,
 nameNote:fact('古代卢泰西亚与后来的巴黎位于同一城市发展的历史中；本图使用通行中文名巴黎。'),reading:reading(144,[1208,1215]),related:['verdun','aachen','regensburg']};
export const carolingianDetails:HistoricalDetail[]=[
 {id:'verdun-843',placeId:'verdun',title:'凡尔登',from:843,to:843,period:'843 年：凡尔登条约分割之后',kind:'事件地点',
  polity:fact('查理曼的三位孙辈分掌西部、中部和东部：秃头查理、洛泰尔一世、日耳曼人路易。这里标记条约地点，而非三国共有首都。','verdun'),
  territory:fact('先看西部的巴黎、中部的亚琛和意大利、东部的巴伐利亚。中部王国是一条南北延伸的政治空间，不能直接等同今天的意大利。','verdun'),
  people:unknownPeople,language:fact('王朝分割不按现代民族国界进行；居民语言也不会在条约签订时同步变化。','verdun'),
  nameNote:fact('这是 843 年条约的凡尔登，不是第一次世界大战中的凡尔登战役。'),reading:reading(144,[1209,1211]),related:['paris','aachen','regensburg','pavia']},
 {...parisBase,id:'paris-843',from:843,to:843,period:'843 年：西法兰克境内的塞纳河城市',polity:fact('位于秃头查理获得的西法兰克范围，用来对照中部王国的亚琛和东法兰克的雷根斯堡。','verdun')},
 {...parisBase,id:'paris-900',from:900,to:900,period:'900 年：西法兰克的地方城市',polity:fact('此时仍属西法兰克政治空间。加洛林家族的继承争端与地方贵族势力需要同时观察，不能把西法兰克理解成现代中央集权法国。','lotharingia','parisMedieval')},
 {id:'regensburg-east',placeId:'regensburg',title:'雷根斯堡',displayName:'Regensburg / Ratisbon',from:843,to:900,focusYear:843,period:'本条覆盖 843—900 年：东法兰克宫廷中心之一',kind:'宫廷驻地',
  polity:fact('东法兰克统治空间中重要的王室驻地，位于巴伐利亚。君主使用多处宫廷，不能据此设置一个现代意义的唯一首都。','regensburg','lotharingia'),
  territory:fact('在多瑙河上游，连接阿尔卑斯山以北与意大利、波希米亚方向的交通。巴伐利亚是东法兰克的一部分，不代表整个王国。','regensburg'),
  people:fact('宫廷、修道院与贸易活动塑造城市；“东法兰克”是政治归属，不是每一位居民的族群名称。','regensburg'),language:unknownLanguage,
  nameNote:fact('雷根斯堡又译雷根斯布尔格；Ratisbon、Ratisbonne 是这座城市的其他名称。'),reading:reading(144,[1209,1211]),related:['aachen','verdun','pavia','paris']},
 {id:'oviedo-asturias',placeId:'oviedo',title:'奥维耶多',displayName:'Oviedo / Ovetum',from:791,to:909,focusYear:800,period:'本条覆盖 791—909 年：阿斯图里亚斯王都',kind:'王国中心',
  polity:fact('阿斯图里亚斯王国以奥维耶多为都城，文化部资料将其王都时期定为 791—910 年。本卡截至 909 年，避免掩盖 910 年的继承与迁都转折。','oviedo'),
  territory:fact('先找伊比利亚北部的坎塔布连山地，再向南对照科尔多瓦。北部王国的存在说明穆斯林统治没有覆盖整个半岛；其范围也不等于今天阿斯图里亚斯自治区。','oviedo','umayyad'),
  people:fact('王室与教会使用基督教和罗马传统表达自身地位；这种政治文化认同不能用来断言每个居民都是西哥特人的后代。','oviedo'),language:unknownLanguage,
  nameNote:fact('奥维耶多是一座城市，阿斯图里亚斯是王国与历史地域名称，两者尺度不同。'),reading:reading(148,[1245,1246]),readingNote:'课程第 1245 页写征服发生于 717 年；地图沿用另据博物馆资料核对的 711 年起点。王都年代另据西班牙文化部。',readingNoteSource:'umayyad',related:['cordoba','toledo','aachen']},
 {...baghdadBase,id:'baghdad-first-capital',from:762,to:835,focusYear:800,period:'762—835 年：阿拔斯新都',polity:fact('762 年建立的阿拔斯都城。800 年应到伊拉克的巴格达寻找哈里发宫廷，不能继续放在倭马亚时期的大马士革。','abbasid')},
 {...baghdadBase,id:'baghdad-samarra-period',from:836,to:891,focusYear:843,period:'836—891 年：宫廷迁往萨迈拉期间',kind:'历史城市',polity:fact('巴格达仍是阿拔斯的重要城市，但哈里发主要宫廷已迁到北面的萨迈拉。843 年请将城市的文化地位与宫廷驻地分开。','abbasid')},
 {...baghdadBase,id:'baghdad-return',from:892,to:900,focusYear:900,period:'本条覆盖 892—900 年：宫廷返回巴格达后',polity:fact('892 年宫廷离开萨迈拉、回到巴格达；900 年再次在此定位阿拔斯中央宫廷。此时各地政治控制程度仍不能仅凭哈里发称号判断。','abbasid'),readingNote:'900 年是本卡资料覆盖上限，不是巴格达作为都城的结束年份。'},
 {id:'samarra-capital',placeId:'samarra',title:'萨迈拉',from:836,to:891,focusYear:843,period:'本条覆盖 836—891 年：迁回巴格达之前',kind:'帝国都城',
  polity:fact('836 年阿拔斯哈里发把宫廷迁到萨迈拉；892 年离开。843 年的哈里发驻地应在这里定位。','abbasid','samarra'),
  territory:fact('位于巴格达以北的底格里斯河沿岸，两座城可以沿河相互定位；迁都不表示另建了一个萨迈拉国家。','samarra'),
  people:fact('宫廷、军队与城市居民共同构成都城社会。建筑和工艺显示广泛文化联系，不能从都城的艺术风格推出单一人口祖源。','abbasid'),language:unknownLanguage,
  nameNote:fact('中文也作萨马拉；这里指伊拉克的萨迈拉，不是俄罗斯伏尔加河畔的萨马拉。'),reading:reading(153,[1282,1289]),related:['baghdad','damascus','byzantium']},
 {id:'pavia-800',placeId:'pavia',title:'帕维亚',from:800,to:800,period:'800 年：加洛林统治下的意大利王国中心',kind:'王国中心',
  polity:fact('774 年查理曼征服伦巴第王国后，帕维亚进入加洛林统治。亚琛、帕维亚、罗马承担不同政治角色，不能把半岛各地都视作同一直接辖区。','paviaEarly','italyEarly'),
  territory:fact('在波河平原的意大利王国中心；罗马教皇领地与南意大利的多方控制不能全部并为帕维亚辖区。','italyEarly'),
  people:unknownPeople,language:unknownLanguage,nameNote:fact('同一座帕维亚从伦巴第王都延续为意大利王国的政治中心，统治家族变化不等于全城人口更换。','paviaItalian'),reading:reading(141,[1184,1191]),related:['aachen','rome','byzantium']},
 {id:'pavia-843',placeId:'pavia',title:'帕维亚',from:843,to:843,period:'843 年：洛泰尔的意大利统治空间',kind:'王国中心',
  polity:fact('凡尔登分割后，意大利王国位于洛泰尔一世的中部政治空间，帕维亚仍是重要王权中心。它与亚琛同在中部体系，却相隔阿尔卑斯山。','verdun','paviaItalian'),
  territory:fact('中部王国跨越多个历史地域；意大利王国只是其中一部分，也不是今天整个意大利。','verdun','italyEarly'),
  people:unknownPeople,language:unknownLanguage,nameNote:fact('“意大利王国”在这里是中世纪王权与领地的称谓，不是十九世纪统一后的意大利王国。'),reading:reading(144,[1209,1211]),related:['aachen','verdun','regensburg']},
 {id:'aachen-900',placeId:'aachen',title:'亚琛',from:900,to:900,period:'900 年：兹温蒂博尔德去世之后',kind:'历史城市',
  polity:fact('按 900 年兹温蒂博尔德去世之后记录：亚琛所在的洛泰林吉亚由东法兰克国王幼童路易统治。不能继续沿用 843 年洛泰尔一世的中部王国。','lotharingia'),
  territory:fact('880 年里伯蒙条约后洛泰林吉亚整体并入东部体系，895—900 年又出现兹温蒂博尔德的地方王权。这些变化说明 843 年三分并未固定此后疆界。','ribemont','lotharingia'),
  people:unknownPeople,language:unknownLanguage,nameNote:fact('洛泰林吉亚范围大于今天法国的洛林地区；亚琛今天位于德国只能帮助定位，不能替代历史归属。'),reading:reading(144,[1209,1215]),related:['paris','regensburg','verdun']},
];

export const carolingianGuides:Record<number,ReadingGuide>={
 800:{title:'800 年：亚琛的宫廷、罗马的加冕与同时代诸国',orientation:'先用亚琛—帕维亚—罗马辨认查理曼与意大利的关系；向东找到继续存在的君士坦丁堡。伊比利亚北部是奥维耶多，南部是科尔多瓦。阿拔斯的中心则在更东面的巴格达。',people:'法兰克王朝、意大利地方居民与罗马教会不是一个人口类别。伊比利亚的基督教王国与穆斯林政权也不能直接变成人种分界。',reading:'第 141 讲「查理曼大帝」、第 148 讲「西班牙」、第 153 讲「智慧宫」· PDF 1184—1191、1238—1246、1282—1289 页',source:'carolingian',places:[['aachen','主要宫廷 → 亚琛'],['rome','皇帝加冕 → 罗马'],['pavia','意大利王权 → 帕维亚'],['oviedo','阿斯图里亚斯 → 奥维耶多'],['cordoba','后倭马亚 → 科尔多瓦'],['byzantium','东罗马 → 君士坦丁堡'],['baghdad','阿拔斯都城 → 巴格达']]},
 843:{title:'843 年：凡尔登三分，先找西、中、东',orientation:'由凡尔登条约地点出发：向西看巴黎，向东北看亚琛，再跨阿尔卑斯山看帕维亚，向东看雷根斯堡。亚琛与帕维亚都属于中部政治空间，今天的国界会让这一点很容易被误读。',people:'这是王朝继承后的权力分配，不能直接画成法国人、德国人和意大利人的三块人口地图。各地居民、教会和贵族关系延续并变化。',reading:'第 143 讲「虔诚者路易」、第 144 讲「维京南下」· PDF 1199—1207、1208—1215 页；阿拔斯宫廷参第 153 讲',source:'verdun',places:[['verdun','条约地点 → 凡尔登'],['paris','西部参照 → 巴黎'],['aachen','中部北段 → 亚琛'],['pavia','中部意大利 → 帕维亚'],['regensburg','东部巴伐利亚 → 雷根斯堡'],['samarra','同时代阿拔斯宫廷 → 萨迈拉']],realms:[
  {name:'西法兰克 · 秃头查理',time:'843 年分割后的西部份额',regions:'西部高卢，包括塞纳河流域与阿基坦方向；王国权利与地方实际控制仍有差异。',source:'verdun',places:[['paris','在巴黎定位西部']]},
  {name:'中部王国 · 洛泰尔一世',time:'843—855 年；855 年再次分割',regions:'从北海方向，经亚琛、莱茵与罗讷之间的地带，跨阿尔卑斯山进入意大利；既不是单独的洛林，也不是现代意大利。',source:'prum',places:[['aachen','北段：亚琛'],['pavia','南段：帕维亚']]},
  {name:'东法兰克 · 日耳曼人路易',time:'843 年分割后的东部份额',regions:'以莱茵河以东诸地为主，包含巴伐利亚、萨克森与阿勒曼尼亚等地区；莱茵河不是处处严格的边界。',source:'verdun',places:[['regensburg','巴伐利亚：雷根斯堡']]},
 ]},
 900:{title:'900 年：三分格局已经变化，各地区分开看',orientation:'从巴黎的西法兰克，移到亚琛所在的洛泰林吉亚和东南方向的雷根斯堡。洛泰尔一世的中部王国早已再分，不能把 843 年的三块颜色沿用到 900 年。伊比利亚仍要比较北部奥维耶多与南部科尔多瓦。',people:'地方贵族、教士、农民和城市居民的身份与效忠关系交错。王国名称、宗教信仰、日常语言分别记录，现有资料不提供族群比例边界。',reading:'第 144 讲「维京南下」、第 148 讲「西班牙」、第 153 讲「智慧宫」· PDF 1208—1215、1238—1246、1282—1289 页',source:'lotharingia',places:[['paris','西法兰克 → 巴黎'],['aachen','洛泰林吉亚 → 亚琛'],['regensburg','东法兰克 → 雷根斯堡'],['oviedo','北部王都 → 奥维耶多'],['cordoba','尚未称哈里发 → 科尔多瓦'],['byzantium','东罗马都城 → 君士坦丁堡'],['baghdad','宫廷已经返回 → 巴格达']],realms:[
  {name:'西法兰克与东法兰克',time:'900 年；中部地区已多次重新分配',regions:'西部由巴黎辅助定位，东部由雷根斯堡辅助定位。亚琛的本年记录取兹温蒂博尔德去世之后，不把年内政权变化隐藏掉。',source:'lotharingia',places:[['paris','查看西部'],['regensburg','查看东部'],['aachen','查看亚琛的年内变化']]},
  {name:'阿斯图里亚斯与后倭马亚',time:'900 年；科尔多瓦要到 929 年才称哈里发',regions:'奥维耶多在伊比利亚北部，科尔多瓦在南部；两者是同时存在的政治中心，不能将整个半岛合为一个政权。',source:'umayyad',places:[['oviedo','定位北部王国'],['cordoba','定位南部埃米尔国']]},
 ]},
};
