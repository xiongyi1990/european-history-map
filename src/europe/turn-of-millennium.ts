import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {ReadingGuide} from './LateAntiquityGuide';
import {courseSources,type ReadingReference} from './course-sources';

type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const reading=(chapter:number,pages:[number,number],note='课程关联阅读；该城市的具体年份与补充资料由下列来源另行核对。'):ReadingReference[]=>[{chapter,pages,note}];
const languages=fact('本条没有当地日常语言的可靠人口比例。教会使用的书写语言不能当作全体居民的母语。');
const residents=fact('王室、贵族、教士与当地居民分别理解；政权名称不是全体人口的族群名称，本条不推算族群比例。');
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,kind:'历史地点参考',source:courseSources[source].url,description:description+' 坐标为约略城市位置，不是城墙、教区或王国边界。'});
export const millenniumPlaces:GazetteerPlace[]=[
 point('magdeburg','马格德堡','德国 · 马格德堡',['Magdeburg','马德堡','奥托','萨克森','易北河'],[11.64,52.13],'magdeburg','易北河畔、亚琛以东的奥托王朝重要中心。'),
 point('winchester','温彻斯特','英国 · 英格兰温彻斯特',['Winchester','Wintanceaster','威塞克斯','盎格鲁撒克逊'],[-1.31,51.06],'winchester','英格兰南部的重要王室与教会中心，在伦敦西南方向。'),
 point('gniezno','格涅兹诺','波兰 · 格涅兹诺',['Gniezno','Gnesen','格涅森','格尼兹诺','皮雅斯特','波列斯瓦夫'],[17.60,52.54],'gniezno','大波兰地区的早期皮雅斯特权力与教会中心，1000 年奥托三世来访。'),
 point('esztergom','埃斯泰尔戈姆','匈牙利 · 埃斯泰尔戈姆',['Esztergom','Gran','埃斯特尔戈姆','伊什特万','圣斯蒂芬','阿尔帕德'],[18.74,47.79],'esztergom','多瑙河畔、今天布达佩斯西北的早期匈牙利王室驻地。'),
 point('kyiv','基辅','乌克兰 · 基辅',['Kyiv','Kiev','Kyïv','罗斯','基辅罗斯','弗拉基米尔','沃洛迪米尔'],[30.52,50.45],'kyivVolodymyr','第聂伯河畔的罗斯权力中心，沿河向南通往黑海，再与君士坦丁堡相连。'),
];
const site1000=(d:Omit<HistoricalDetail,'from'|'to'|'period'> & {period?:string}):HistoricalDetail=>({from:1000,to:1000,period:'1000 年：本条仅记录这一时点',...d});
export const millenniumDetails:HistoricalDetail[]=[
 {id:'rome-962',placeId:'rome',title:'罗马',from:962,to:962,period:'962 年：奥托一世接受皇帝加冕之后',kind:'事件地点',
  polity:fact('奥托一世在罗马接受教皇的皇帝加冕。962 年通常用来标记奥托王朝帝国的建立或恢复；“神圣罗马帝国”是本图采用的通行历史名称，不能把后来的完整称号原样倒填。','ottonian','magdeburg'),
  territory:fact('罗马是加冕地点，皇帝在阿尔卑斯山南北的统治空间与教皇在罗马的权力相互交织；这不等于重建古代整个地中海帝国。','ottonian'),
  people:residents,language:languages,nameNote:fact('800 年查理曼加冕和 962 年奥托加冕都发生在罗马，但并非同一王朝和相同疆域。','ottonian'),reading:reading(167,[1423,1424]),related:['aachen','magdeburg','pavia','byzantium']},
 site1000({id:'aachen-1000',placeId:'aachen',title:'亚琛',kind:'宫廷驻地',
  polity:fact('奥托王朝帝国中的重要王室与加冕城市。查理曼的宫廷传统被后来的统治者继承，但 1000 年不能继续标为查理曼在位。','ottonian','aachenSite'),
  territory:fact('亚琛在帝国西部，与易北河畔的马格德堡及阿尔卑斯山以南的帕维亚分别定位。帝国并不包括查理曼时代全部西部法兰西地域。','ottonian'),
  people:residents,language:languages,nameNote:fact('这里的“帝国”包含多种地方权力；城市的现代德国位置不能代替公元 1000 年的历史地域。'),reading:reading(167,[1423,1424]),related:['magdeburg','pavia','rome','paris']}),
 site1000({id:'magdeburg-1000',placeId:'magdeburg',title:'马格德堡',kind:'历史城市',
  polity:fact('奥托王朝帝国内的重要王室与教会中心，968 年成立的大主教区仍在。主教辖区、城市管辖与帝国疆界是三个不同范围。','magdeburg'),
  territory:fact('在易北河畔、历史萨克森方向；向西看亚琛，向东看格涅兹诺，可以区分帝国中心与皮雅斯特的政治中心。','ottonian','gniezno'),
  people:fact('965 年特许状已提到当地“犹太人与其他商人”，说明城市社会不只包括宫廷与教士。这份较早文书不能用来推算 1000 年的族群比例。','magdeburgCharter'),language:languages,
  nameNote:fact('奥托一世所建教堂与今天所见大教堂经历了后世改建；地图城市点不代表现存建筑在 1000 年已经全部建成。','magdeburg'),reading:reading(167,[1423,1424]),related:['aachen','gniezno','pavia']}),
 site1000({id:'pavia-1000',placeId:'pavia',title:'帕维亚',kind:'王国中心',
  polity:fact('帕维亚是奥托王朝统治体系内意大利王国的重要政治与加冕中心。意大利王号、皇帝称号和教皇职权不能合为同一个职位。','paviaItalian','ottonian'),
  territory:fact('位于波河平原。北部意大利属于帝国政治空间，但半岛南部有其他势力，不能把现代意大利轮廓全部并入。','ottonian'),
  people:residents,language:languages,nameNote:fact('同一座城市在 700、800、843、1000 年可连续比较，政治归属变化不代表地名或居民同时更换。'),reading:reading(167,[1423,1424]),related:['magdeburg','aachen','rome','byzantium']}),
 site1000({id:'paris-1000',placeId:'paris',title:'巴黎',kind:'历史城市',
  polity:fact('处于卡佩王朝早期的法兰西王国。于格·卡佩于 987 年开创王朝，其统治至 996 年；1000 年不再是于格本人在位。','capet'),
  territory:fact('巴黎及附近的王室领地，与整个法兰西王国不是同一个范围。贵族、公爵、伯爵与教会各有权利，不能将全王国涂成国王直接管理的领地。','capetPower'),
  people:residents,language:languages,nameNote:fact('从 843 年的西法兰克到卡佩王朝，需要观察王朝与地方权力的变化，不能理解成 987 年所有居民突然获得现代法国国籍。'),reading:reading(175,[1489,1490]),related:['aachen','toulouse','winchester']}),
 site1000({id:'winchester-1000',placeId:'winchester',title:'温彻斯特',kind:'宫廷驻地',
  polity:fact('英格兰王国的重要王室与教会中心，此时埃塞尔雷德二世在位。1066 年诺曼征服尚未发生，不能提前把这里列为诺曼王朝。','winchester','aethelred'),
  territory:fact('在英格兰南部、原威塞克斯核心地区。英格兰不等于整个不列颠，也不是现代联合王国；温彻斯特的重要性不意味着君主只在此一处活动。','winchester'),
  people:fact('王室、教士与城市居民共同活动。盎格鲁—撒克逊、斯堪的纳维亚背景与政治效忠关系需要分开，北欧袭击不能画成全体居民更换。','aethelred'),language:languages,
  nameNote:fact('温彻斯特与伦敦是不同城市；把两者并列才能看见王室中心、商业城市和后来加冕地点的区别。'),reading:reading(177,[1513,1514]),readingNote:'课程第 1514 页将克努特即位写作 1014 年。此卡采用王室年表：埃塞尔雷德在 1014—1016 年复位，不将克努特提前显示为 1000 年国王。',readingNoteSource:'aethelred',related:['london','paris']}),
 site1000({id:'london-1000',placeId:'london',title:'伦敦',kind:'历史城市',
  polity:fact('埃塞尔雷德二世治下的英格兰城市。伦敦经历北欧军队威胁，但 1000 年尚未进入克努特或诺曼统治。','aethelred'),
  territory:fact('位于泰晤士河沿岸、温彻斯特东北方向；河港城市与王室重要驻地应分别定位。'),people:residents,language:languages,
  nameNote:fact('这里使用中世纪的通行地名伦敦，不沿用罗马时期名称伦底尼乌姆来表示当时政权。'),reading:reading(177,[1513,1514]),related:['winchester','paris']}),
 site1000({id:'gniezno-1000',placeId:'gniezno',title:'格涅兹诺',kind:'事件地点',period:'1000 年：格涅兹诺会晤之后',
  polity:fact('皮雅斯特统治者波列斯瓦夫在此接待奥托三世。1000 年会晤与 1025 年正式加冕为波兰国王是两个节点，本图此时使用“皮雅斯特波兰”。','gniezno'),
  territory:fact('位于大波兰地区，马格德堡以东、多瑙河以北；“大波兰”是历史地域名，不是今天整个波兰的别称。会晤和联盟不等于直接并入帝国。','gniezno'),
  people:residents,language:languages,nameNote:fact('格涅兹诺又见格涅森等译名。早期王室和教会中心应在此定位，不能用现代首都华沙取代。'),reading:reading(155,[1304,1306],'课程讨论斯拉夫世界的宗教联系；1000 年会晤与 1025 年王号由格涅兹诺市资料补充。'),related:['magdeburg','esztergom','kyiv']}),
 site1000({id:'esztergom-1000',placeId:'esztergom',title:'埃斯泰尔戈姆',kind:'王国中心',period:'1000 年前后：伊什特万建立基督教王权',
  polity:fact('伊什特万一世的王室与教会中心。市史对加冕列出 1000 年 12 月 25 日或 1001 年 1 月 1 日两种日期，本卡按千年前后的转折阅读，不确定为 1000 年全年均已称王。','esztergom'),
  territory:fact('位于多瑙河转弯附近、喀尔巴阡盆地西北部；早期王权的扩展不等于当时已经拥有现代匈牙利国界，也不能直接套用后来的大匈牙利轮廓。','esztergom'),
  people:fact('统治者推动基督教王权和教会组织，不说明所有居民在加冕当天一起改宗。王室、军队、教士与地方社群应分开理解。','esztergom'),language:languages,
  nameNote:fact('Esztergom 又称 Gran，中文也作埃斯特尔戈姆；这里不是今天首都布达佩斯。'),reading:reading(158,[1323,1345],'课程的中世纪早期总结作为比较背景；本城及加冕日期为市史补充，不表示课程逐项讲述该城。'),related:['gniezno','magdeburg','byzantium']}),
 site1000({id:'kyiv-1000',placeId:'kyiv',title:'基辅',displayName:'Kyiv / Kiev',kind:'王国中心',
  polity:fact('弗拉基米尔（沃洛迪米尔）统治下的罗斯中心。基督教化与拜占庭联姻强化联系，但基辅不因此成为东罗马直接管辖的城市。','kyivVolodymyr'),
  territory:fact('沿第聂伯河连接北方腹地与黑海。罗斯的贡赋和王公统治网络不能直接套入今天俄罗斯、乌克兰或白俄罗斯任一国界。','kyivVolodymyr'),
  people:fact('东斯拉夫社群、瓦兰吉背景的军事人员与王公集团相互联系；基督教化是持续过程，不是全体居民在一年内换成同一种身份。','kyivVolodymyr'),language:languages,
  nameNote:fact('Kyiv 与 Kiev 都指这座城市。罗斯是中世纪政治与历史名称，不等于现代俄罗斯国家。'),reading:reading(156,[1312,1313]),readingNote:'课程第 1313 页将安娜写作君士坦丁七世的妹妹；研究所条目将她明确为巴西尔二世的妹妹，本图按后者记录联姻背景。',readingNoteSource:'kyivVolodymyr',related:['byzantium','gniezno','esztergom']}),
];

export const millenniumGuides:Record<number,ReadingGuide>={
 962:{title:'962 年：奥托在罗马加冕，东西两处皇权仍并存',orientation:'先定位罗马的加冕，再对照君士坦丁堡与科尔多瓦。奥托的帝国接续部分西方皇权传统，疆域不同于古代罗马，也没有吞并东罗马或伊比利亚。',people:'皇帝、教皇、地方贵族和居民的身份分别说明；皇帝称号不能当作语言或族群的总标签。',reading:'第 167 讲「主教叙任权之争」· PDF 1423—1424 页',source:'ottonian',places:[['rome','奥托一世加冕 → 罗马'],['byzantium','东方皇权 → 君士坦丁堡'],['cordoba','伊比利亚哈里发 → 科尔多瓦']]},
 1000:{title:'1000 年：从西欧王国走向中东欧',orientation:'沿西向东看温彻斯特、巴黎、亚琛与马格德堡，再到格涅兹诺、埃斯泰尔戈姆和基辅。跨阿尔卑斯山看帕维亚，向东南看君士坦丁堡，向西南看科尔多瓦。',people:'政治归属、宗教联系、语言与祖源分别理解：皮雅斯特波兰与匈牙利的基督教化不等于并入帝国；罗斯与拜占庭联姻也不等于变成拜占庭行省。',reading:'第 155—156 讲（斯拉夫与罗斯）、第 167 讲（帝国与教权）、第 175、177 讲（法兰西与英格兰）· PDF 1304—1313、1423—1424、1489—1490、1513—1514 页',source:'ottonian',places:[['winchester','英格兰王室 → 温彻斯特'],['paris','卡佩王朝 → 巴黎'],['aachen','帝国西部 → 亚琛'],['magdeburg','萨克森方向 → 马格德堡'],['pavia','意大利王国 → 帕维亚'],['gniezno','皮雅斯特波兰 → 格涅兹诺'],['esztergom','早期匈牙利 → 埃斯泰尔戈姆'],['kyiv','罗斯中心 → 基辅'],['byzantium','东罗马 → 君士坦丁堡'],['cordoba','科尔多瓦哈里发国 → 科尔多瓦']],realms:[
  {name:'奥托王朝帝国（神圣罗马帝国）',time:'962 年加冕开启的新阶段；1000 年在奥托三世时期',regions:'阿尔卑斯山以北的德意志诸地区与山南的意大利王国相连接。用亚琛、萨克森方向的马格德堡和波河平原的帕维亚定位；不包括整个法兰西或整个意大利半岛。',source:'ottonian',places:[['aachen','西部：亚琛'],['magdeburg','东北方向：马格德堡'],['pavia','山南：帕维亚']]},
  {name:'法兰西王国与王室领地',time:'987 年起的卡佩王朝；本图查看 1000 年',regions:'巴黎帮助定位王室核心，南方诸侯领地与王室直辖区有别。“属于王国”不等于国王可以直接管理每一块地方。',source:'capetPower',places:[['paris','查看王权与地方的区别']]},
  {name:'英格兰王国',time:'1000 年：埃塞尔雷德二世在位，诺曼征服尚未发生',regions:'海峡北侧的英格兰，用南部温彻斯特与泰晤士河畔伦敦共同定位；不将苏格兰、威尔士与爱尔兰一起涂入。',source:'aethelred',places:[['winchester','王室与教会中心'],['london','泰晤士河城市']]},
  {name:'皮雅斯特波兰',time:'1000 年会晤；1025 年才正式加冕为王',regions:'以大波兰的格涅兹诺为定位点，观察它与西方帝国、南方匈牙利及东方罗斯的关系。结盟与教会组织不等于帝国直接行政管辖。',source:'gniezno',places:[['gniezno','查看会晤与王号']]},
  {name:'伊什特万时期的匈牙利',time:'加冕转折常记为 1000 年末或 1001 年初',regions:'喀尔巴阡盆地内的多瑙河王室中心，以埃斯泰尔戈姆定位；本时点特别保留加冕日期的不同记法。',source:'esztergom',places:[['esztergom','查看早期王室驻地']]},
  {name:'基辅罗斯',time:'1000 年：弗拉基米尔统治时期',regions:'以基辅和第聂伯河为核心定位，沿河接入黑海与拜占庭交通。王公与贡赋网络不能按现代国界理解。',source:'kyivVolodymyr',places:[['kyiv','查看罗斯与拜占庭联系']]},
 ]},
};
