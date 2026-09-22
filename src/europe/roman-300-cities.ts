import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources} from './course-sources';
import {region300ById} from './roman-300-regions';
type Source=keyof typeof courseSources;
type CitySeed={id:string;name:string;latin:string;modern:string;coords:[number,number];region:string;source:Source;role:string;note:string;polity?:string;people?:string};
const seeds:CitySeed[]=[
 {id:'bishapur',name:'比沙普尔',latin:'Bishapur / Bishāpur',modern:'伊朗 · 法尔斯省卡泽伦附近',coords:[51.57,29.78],region:'pars',source:'bishapur300',polity:'萨珊帝国 · 帕尔斯。由沙普尔一世营建的王朝城市，300 年已在萨珊统治下。',role:'扎格罗斯山地南段的王城，与更东南的阿尔达希尔圆形城构成法尔斯腹地的两处定位点。',note:'比沙普尔是古城遗址；建筑中的罗马艺术影响说明交流，不能据此把整座城市归为罗马领土。'},
 {id:'firuzabad',name:'阿尔达希尔圆形城',latin:'Ardashir-Khwarrah / Gor / Firuzabad',modern:'伊朗 · 菲鲁扎巴德附近古城遗址',coords:[52.533,28.853],region:'pars',source:'firuzabad300',polity:'萨珊帝国 · 帕尔斯。阿尔达希尔一世的早期王城，建立于王朝兴起阶段。',role:'位于法尔斯山间平原，古城的圆形规划可帮助区分王朝发源地与两河的宫廷中心。',note:'古代称阿尔达希尔的荣光之城，也称戈尔。代表点在古城遗址附近，不是现代菲鲁扎巴德市中心；现代名称用于古今对照。'},
 {id:'susa',name:'苏萨',latin:'Susa / Shush',modern:'伊朗 · 胡齐斯坦省舒什',coords:[48.257,32.19],region:'khuzestan',source:'susa300',polity:'萨珊帝国 · 胡齐斯坦。这里是延续已久的城市，300 年不属于早已结束的阿契美尼德帝国。',role:'扎格罗斯山麓西侧低地城市，处于两河平原与伊朗高原之间。',note:'古名苏萨对应今舒什。遗址包含埃兰、阿契美尼德和后续多个时期，不能把所有遗存视为 300 年的同期景观。',people:'地方城镇社会与不同宗教社群并存；约 300 年的教会争论记载中出现苏萨主教，可作为当地基督教社群的证据，不代表全城居民都信基督教。'},
 {id:'shushtar',name:'舒什塔尔',latin:'Shushtar / Shushtar Hydraulic System',modern:'伊朗 · 胡齐斯坦省舒什塔尔',coords:[48.85,32.046],region:'khuzestan',source:'shushtar300',polity:'萨珊帝国 · 胡齐斯坦。卡伦河流域的城市及水利节点。',role:'河道、引水渠与灌溉平原共同说明萨珊西南腹地的农业基础；地名点不表示整套水利工程的面积。',note:'与西北方苏萨（舒什）是两个不同地点。水利系统有早期基础、萨珊建设与后世改修，现存桥坝和水磨并非全部建成于 300 年。'},
 {id:'aquileia',name:'阿奎莱亚',latin:'Aquileia',modern:'意大利 · 阿奎莱亚',coords:[13.37,45.77],region:'italy',source:'aquileia300',role:'意大利东北部城市，衔接亚得里亚海北端与通往阿尔卑斯山、多瑙河方向的道路。',note:'在今天意大利东北部，不是威尼斯；后者的中世纪地位不能提前套用。'},
 {id:'gortyn',name:'戈尔廷',latin:'Gortyn / Gortyna',modern:'希腊 · 克里特岛梅萨拉平原',coords:[24.95,35.06],region:'crete',source:'gortyn300',role:'罗马时期克里特的行政中心，位于岛屿南部平原；应与北岸青铜时代的克诺索斯分别理解。',note:'Gortyn 位于今天阿吉伊德卡附近，距伊拉克利翁以南约 45 千米。'},
 {id:'paphos',name:'帕福斯',latin:'Paphos',modern:'塞浦路斯 · 帕福斯',coords:[32.41,34.76],region:'cyprus',source:'paphos300',role:'塞浦路斯西岸的罗马城市与港口，用来建立岛屿与叙利亚、埃及之间的空间联系。',note:'新帕福斯的罗马城市遗址与更东侧库克利亚的旧帕福斯神庙遗址不是同一个点。'},
 {id:'housesteads',name:'豪斯斯特兹军堡',latin:'Vercovicium / Housesteads',modern:'英国 · 诺森伯兰哈德良长城沿线',coords:[-2.331,55.013],region:'britain',source:'housesteads300',role:'哈德良长城军堡，帮助定位罗马不列颠的北部边防。城墙、军堡和墙外聚落是不同空间。',note:'Vercovicium 是古代军堡名，Housesteads 为现代遗址名称。',people:'二世纪末至四世纪驻有第一通格里辅助军团，其名称源自大陆通格里地区。驻军、军属、商人和本地居民的背景不能合并为一种人口。'},
 {id:'cologne',name:'阿格里皮娜殖民城（科隆）',latin:'Colonia Claudia Ara Agrippinensium',modern:'德国 · 科隆',coords:[6.96,50.94],region:'gaul',source:'rhine300',role:'莱茵河西岸的罗马城市，向东面对河外群体，向西南联系特里尔。',note:'古代殖民城名称演变为 Köln / Cologne，即今天科隆；不是法兰克王国首都。'},
 {id:'mainz',name:'莫贡提亚库姆（美因茨）',latin:'Mogontiacum / Mainz',modern:'德国 · 美因茨',coords:[8.27,50],region:'gaul',source:'gallic300',role:'莱茵河与美因河交会附近的罗马军政节点；可与更下游的科隆区分。',note:'Mogontiacum 对应美因茨。三世纪的分立和叛乱历史不能说明 300 年仍另属高卢帝国。'},
 {id:'emerita',name:'奥古斯塔·埃梅里塔',latin:'Augusta Emerita',modern:'西班牙 · 梅里达',coords:[-6.34,38.92],region:'hispania',source:'merida300',role:'卢西塔尼亚的重要行政城市，在伊比利亚内陆、瓜迪亚纳河畔；与东北海岸塔拉科分别定位。',note:'古名 Augusta Emerita，对应今天 Mérida。古代卢西塔尼亚跨越现代西班牙、葡萄牙的部分地区。'},
 {id:'carnuntum',name:'卡农图姆',latin:'Carnuntum',modern:'奥地利 · 维也纳以东佩特罗内尔附近',coords:[16.86,48.12],region:'pannonia',source:'danube300',role:'多瑙河南岸军团基地及城市，连接河流边防、道路与周边居民区。',note:'遗址在维也纳以东，不能直接把卡农图姆标在维也纳市中心。308 年皇帝会议晚于本时点。'},
 {id:'aquincum',name:'阿昆库姆',latin:'Aquincum',modern:'匈牙利 · 布达佩斯奥布达',coords:[19.05,47.56],region:'pannonia',source:'danube300',role:'多瑙河西岸的军团基地和城镇，与对岸平原诸集团隔河相邻。',note:'在现代布达佩斯北部奥布达一带；300 年没有后来匈牙利王国的政治格局。'},
 {id:'sirmium',name:'西尔米乌姆',latin:'Sirmium',modern:'塞尔维亚 · 斯雷姆斯卡米特罗维察',coords:[19.61,44.97],region:'pannonia',source:'sirmium300',role:'萨瓦河畔的军政中心和皇帝驻地，处在意大利与巴尔干之间。皇帝巡行使驻地不是单一固定首都。',note:'Sirmium 对应今天斯雷姆斯卡米特罗维察，不是贝尔格莱德或塞萨洛尼基。'},
 {id:'salona',name:'萨洛纳',latin:'Salona',modern:'克罗地亚 · 索林，斯普利特附近',coords:[16.49,43.54],region:'pannonia',source:'salona300',role:'达尔马提亚沿海大城，连接亚得里亚海航路与内陆；与附近戴克里先宫殿位置分别理解。',note:'古城遗址在索林；今天斯普利特的中心围绕另一处宫殿发展，不能把两者当同一座古城。',people:'商人、港口城市居民和内陆往来人口并存；三世纪已存在有组织的基督教社群，但城市并非全体改宗。'},
 {id:'serdica',name:'塞尔迪卡',latin:'Serdica / Sardica',modern:'保加利亚 · 索非亚',coords:[23.32,42.7],region:'thrace',source:'serdica300',role:'戴克里先时期内陆达契亚的行政城市。这个“达契亚”在多瑙河南侧，与已撤出的河北旧行省不同。',note:'古名 Serdica，对应今天索非亚；不是 300 年的保加利亚国家首都。'},
 {id:'volubilis',name:'沃鲁比利斯',latin:'Volubilis',modern:'摩洛哥 · 梅克内斯附近',coords:[-5.55,34.07],region:'mauretania',source:'volubilis300',polity:'罗马在约 285 年撤出南廷吉塔纳后，这里已不宜继续标为罗马直接控制的城市；地方生活仍延续。',role:'北非西端内陆城市，作为帝国实控收缩的对照点；罗马风格遗存不等于 300 年仍有罗马驻军。',note:'Volubilis 对应今摩洛哥沃鲁比利斯遗址。古代毛里塔尼亚与现代同名国家不是同一范围。'},
 {id:'timgad',name:'塔穆加迪（提姆加德）',latin:'Thamugadi / Timgad',modern:'阿尔及利亚 · 巴特纳以东',coords:[6.47,35.48],region:'africa',source:'timgad300',role:'奥雷斯山地北侧的罗马殖民城市，提供沿海迦太基之外的北非内陆参照。',note:'古名 Thamugadi，今通称 Timgad；遗址的棋盘路网是城市布局，不能当作行省疆界。',people:'城市起源与罗马军事殖民有关，后续生活包括地方居民、土地经营者和城市公共机构；不能只画成一座军营。'},
 {id:'cyrene',name:'昔兰尼',latin:'Cyrene / Kyrene',modern:'利比亚 · 沙哈特附近',coords:[21.86,32.82],region:'libya',source:'cyrene300',role:'昔兰尼加高地城市，位于大苏尔特湾以东，与西侧大莱普提斯分属不同地域。',note:'古城在今日沙哈特附近；昔兰尼是城市，昔兰尼加是更广的地区。'},
 {id:'syene',name:'叙恩（阿斯旺）',latin:'Syene / Aswan',modern:'埃及 · 阿斯旺',coords:[32.9,24.09],region:'egypt',source:'syene300',role:'尼罗河第一瀑布附近的南部边防节点，可向北沿河找到亚历山大里亚，向南联系努比亚。',note:'古名 Syene 对应今天阿斯旺。现代埃及与苏丹国境不是公元 300 年的罗马南界。'},
 {id:'caesarea-cappadocia',name:'卡帕多西亚的凯撒利亚',latin:'Caesarea Mazaca',modern:'土耳其 · 开塞利',coords:[35.49,38.73],region:'pontus',source:'cappadocia300',role:'小亚细亚内陆高原城市，连接本都、叙利亚和亚美尼亚方向。',note:'这里是今开塞利，不是地中海东岸的海滨凯撒利亚；“凯撒利亚”有多处同名城。'},
 {id:'bosra',name:'布斯拉（博斯特拉）',latin:'Bostra / Bosra',modern:'叙利亚 · 布斯拉',coords:[36.48,32.52],region:'arabia',source:'bosra300',role:'罗马阿拉伯行省的重要行政城市，位于豪兰地区，与沙漠商路相连。',note:'Bostra / Bosra 是古今名称；不是伊拉克的巴士拉（Basra）。'},
 {id:'palmyra',name:'帕尔米拉',latin:'Palmyra / Tadmor',modern:'叙利亚 · 泰德穆尔附近',coords:[38.27,34.55],region:'levant',source:'palmyra300',role:'叙利亚内陆绿洲与交通节点。300 年处于罗马统治下，不能继续标为芝诺比娅的独立帝国。',note:'帕尔米拉与泰德穆尔是同一历史地点的不同名称；现存遗址跨越多个阶段。'},
 {id:'vagharshapat',name:'瓦加尔沙帕特',latin:'Vagharshapat',modern:'亚美尼亚 · 瓦加尔沙帕特（埃奇米阿津）',coords:[44.29,40.16],region:'armenia',source:'vagharshapat300',polity:'亚美尼亚阿尔沙克王朝的重要王权城市；不是罗马的普通行省城市。',role:'亚美尼亚高原东北部的城市节点，与两河低地的尼西比斯分开观察。',note:'300 年使用瓦加尔沙帕特。埃奇米阿津名称和著名基督教建筑涉及之后的发展，不直接倒填 300 年。'},
 {id:'mtskheta',name:'姆茨赫塔',latin:'Mtskheta',modern:'格鲁吉亚 · 姆茨赫塔',coords:[44.72,41.84],region:'iberia-caucasus',source:'mtskheta300',polity:'高加索伊比利亚王国的政治中心；“伊比利亚”在这里指高加索，不是西班牙半岛。',role:'位于库拉河与阿拉格维河汇合处，连接高加索山地通道和南部低地。',note:'姆茨赫塔在今天第比利斯西北；现存教堂主要为后代建筑，不意味着 300 年的城市景观已经相同。'},
 {id:'panticapaeum',name:'潘提卡派翁',latin:'Panticapaeum / Pantikapaion',modern:'黑海北岸 · 刻赤',coords:[36.47,45.35],region:'bosporus',source:'bosporus300',polity:'黑海北岸博斯普鲁斯王国的核心城市，具有希腊城市传统并与罗马保持联系。',role:'位于刻赤海峡西岸，帮助辨认博斯普鲁斯王国与君士坦丁堡海峡的区别。',note:'古城潘提卡派翁对应今刻赤一带。地图提供古代地理定位，不用现代行政归属解释古代王国。'},
];
const f=(text:string,...sources:Source[]):HistoricalFact=>({text,sources:[...new Set(sources)]});
function detail(s:Omit<CitySeed,'modern'|'coords'>):HistoricalDetail{
 const r=region300ById(s.region)!;
 return {id:`${s.id}-300`,placeId:s.id,title:s.name,displayName:s.latin,from:300,to:300,focusYear:300,period:'公元 300 年 · 城市与地域',kind:s.id==='housesteads'?'附属地点':'历史城市',
 polity:f(s.polity??`罗马帝国 · ${r.name}。${s.role}`,s.source,...r.sources.slice(0,1)),territory:f(s.role+' 地点为约略定位点，非城墙、行省或王国边界。',s.source),
 people:f(s.people??`地域背景：${r.people} 本条不提供城市居民比例。`,s.source,...r.sources),language:f(`地域语言背景：${r.language}`, ...r.sources),nameNote:f(s.note,s.source),
 reading:[{chapter:98,pages:[792,798],note:'四帝共治的地域背景；城市与人群说明据公开资料独立整理。'}],related:r.cities.filter(id=>id!==s.id)};
}
export const roman300ExtraPlaces:GazetteerPlace[]=seeds.map(s=>({id:s.id,name:s.name,modern:s.modern,aliases:[s.latin,...s.latin.split(' / ')],coords:s.coords,kind:'历史地点参考',source:courseSources[s.source].url,description:s.role+' 坐标用于地域定位，不是古城范围测量。'}));
const existing:Omit<CitySeed,'modern'|'coords'>[]=[
 {id:'massilia',name:'马西利亚（马赛）',latin:'Massilia',region:'gaul',source:'provinces300',role:'高卢南部地中海港口，沿罗讷河方向可联系里昂，沿海可联系意大利。',note:'古名 Massilia，对应今天马赛；希腊起源不表示 300 年仍是独立希腊城邦。'},
 {id:'gades',name:'加德斯',latin:'Gades',region:'hispania',source:'provinces300',role:'伊比利亚西南部港口，面向大西洋，接近地中海与大西洋通道。',note:'Gades 对应今天西班牙加的斯；不是地中海东北部的塔拉科。'},
 {id:'new-carthage',name:'新迦太基',latin:'Carthago Nova',region:'hispania',source:'provinces300',role:'伊比利亚东南岸的罗马城市，隔海与北非联系。',note:'古代新迦太基对应今天西班牙卡塔赫纳；北非的迦太基是另一座城市。'},
 {id:'ostia',name:'奥斯提亚',latin:'Ostia',region:'italy',source:'provinces300',role:'台伯河口的港口城市，与罗马城和邻近波尔图斯港区共同理解海运供应。',note:'Ostia 的古代海岸与现代岸线不同，城市代表点不是 300 年港池重建。'},
 {id:'corinth',name:'科林斯',latin:'Corinthus',region:'greece',source:'provinces300',role:'科林斯地峡附近的罗马城市，连接伯罗奔尼撒与希腊中部，也联系两侧海湾。',note:'这时的科林斯处于罗马统治时期，不能沿用公元前伯罗奔尼撒战争的独立城邦归属。'},
 {id:'ephesus',name:'以弗所',latin:'Ephesus',region:'asia',source:'ephesus300',role:'小亚细亚爱琴海东岸的亚细亚行省重要城市；港湾和海岸随淤积变化。',note:'古以弗所在今天塞尔丘克附近，不是现代伊兹密尔市中心。'},
 {id:'jerusalem',name:'埃利亚·卡皮托利纳（耶路撒冷）',latin:'Aelia Capitolina',region:'levant',source:'jerusalem300',role:'地中海东岸南部内陆的罗马城市；不能提前显示为十字军王国。',note:'Aelia Capitolina 是当时的罗马城市名；耶路撒冷是读者熟悉的延续地名。圣墓教堂的君士坦丁时代营建在 300 年之后。'},
];
export const roman300ExtraDetails:HistoricalDetail[]=[...seeds,...existing].map(detail);
