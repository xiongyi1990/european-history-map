import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const people=fact('本条没有全城居民身份的可靠比例。王室、贵族、教士与普通居民分别理解，不能将统治者身份视作全体居民的身份。');
const language=fact('尚未收录这一时期本地语言分布。政治效忠、宗教归属和日常语言不能互相替代。');
const territory=fact('城市代表点用于定位，不等于王国疆界。中世纪存在领主权利、臣属关系和军事控制交错的情况，本条没有逐年精确辖区。');
export const medievalPlaces:GazetteerPlace[]=[{id:'jerusalem',name:'耶路撒冷',modern:'耶路撒冷 · 古城',aliases:['Jerusalem','Hierosolyma','Al-Quds','圣城','圣墓教堂'],coords:[35+13/60+54/3600,31+46/60+40/3600],description:'地中海东岸内陆的圣城，是理解十字军东征目标、拉丁王国与萨拉丁的重要地点。坐标取古城代表点。',source:courseSources.jerusalemCoords.url,kind:'历史地点参考'}];
const holyCity={placeId:'jerusalem',title:'耶路撒冷',kind:'历史城市' as const,territory,people:fact('犹太教、基督教和伊斯兰教社群与这座城长期相关，各宗教内部也存在不同群体。征服带来杀戮、迁徙与权利变化，不能把一次政权更替画成单一人群的全面替换。','jerusalemMedieval'),language,nameNote:fact('这里是耶路撒冷城。耶路撒冷王国是政治实体，其领地和此后存续情况不能与占有这座城市等同。'),related:['antioch','byzantium','alexandria'],reading:[{chapter:164,pages:[1394,1396]}] as HistoricalDetail['reading']};
export const medievalDetails:HistoricalDetail[]=[
 {id:'aachen-verdun',placeId:'aachen',title:'亚琛',from:843,to:843,period:'843 年凡尔登分割之后',kind:'宫廷驻地',polity:fact('亚琛位于洛泰尔一世获得的中部王国。查理获得西部，路易获得东部；三位继承者的领地不是今天法国、德国和意大利的直接国界。','verdun'),territory:fact('中部王国从北部延伸到意大利，包含亚琛。条约分配的是加洛林统治空间，不是以现代民族划定国家。','verdun'),people,language,nameNote:fact('今天位于德国的亚琛，在 843 年属于中部王国，而非因现代位置就归入东法兰克。','verdun'),reading:[{chapter:144,pages:[1210,1210],note:'课程介绍 840 年后的继承内战；843 年的具体分配另据地区历史资料。'}],related:['rome','byzantium']},
 {id:'london-1066',placeId:'london',title:'伦敦',from:1066,to:1066,period:'1066 年圣诞加冕之后',kind:'事件地点',polity:fact('诺曼底公爵威廉在威斯敏斯特加冕为英格兰国王。同一人同时拥有公爵与国王身份，不等于英格兰成为法国国王直接统治的领地。','william'),territory,people,language,nameNote:fact('本点采用伦敦城市代表位置；加冕发生在威斯敏斯特修道院，不把城市代表点当作仪式发生的精确坐标。','william'),reading:[{chapter:179,pages:[1530,1531],note:'诺曼征服的关联阅读；加冕日期由宫殿管理机构资料补充。'}],related:['aachen','rome']},
 {id:'antioch-crusader',placeId:'antioch',title:'安条克',from:1098,to:1098,period:'1098 年十字军取得城市后',kind:'王国中心',polity:fact('按十字军攻陷之后记录，博希蒙德在这里建立自己的权力中心。安条克公国与耶路撒冷王国是不同政治实体，不能把十字军各国合成一个国家。'),territory:fact('拜占庭对旧领地的主张与博希蒙德的实际控制发生冲突；名义上的归还承诺，不作为帝国直接管辖的证据。'),people,language,nameNote:fact('安条克在奥龙特斯河流域，今安塔基亚。同一城市可以连接古代塞琉古史、罗马史与中世纪十字军史。'),reading:[{chapter:164,pages:[1393,1395]}],related:['byzantium','jerusalem'],readingNote:'此条只收录 1098 年转折。此后公国与拜占庭的关系多次变化，不能自动沿用这一节点至中世纪结束。'},
 {...holyCity,id:'jerusalem-1099',from:1099,to:1099,period:'1099 年十字军攻陷之后',polity:fact('按 7 月攻陷之后记录，十字军取得耶路撒冷。戈弗雷成为统治者；地图将次年鲍德温称王另列，避免把两件事压成同一瞬间。','crusades'),readingNote:'课程使用“回到基督徒手中”的叙事表达。地图用“十字军取得城市”描述政治控制，并另列不同居民群体。'},
 {...holyCity,id:'jerusalem-latin-kingdom',from:1100,to:1186,focusYear:1100,period:'拉丁王国统治：1100—1186 年',kind:'王国中心',polity:fact('耶路撒冷是拉丁耶路撒冷王国的政治与宗教中心。国王、贵族、教会和军事修会各有权利，不能用现代中央集权国家理解其全部关系。'),readingNote:'这段时间表示城市主要归属，不代表王国疆界、君主和居民构成始终相同。'},
 {...holyCity,id:'jerusalem-saladin',from:1187,to:1187,period:'1187 年萨拉丁取得城市后',polity:fact('按萨拉丁重新取得耶路撒冷之后记录，城市进入阿尤布王朝控制。拉丁王国失去圣城，不意味着其沿海据点和王国名号在同一天全部消失。','jerusalemMedieval'),reading:[{chapter:164,pages:[1394,1396],note:'前两次东征的关联阅读；1187 年后续节点另据博物馆资料。'}],readingNote:'本条只标记 1187 年转折，不把这一年的政治归属自动沿用到此后的每一年。'},
];
