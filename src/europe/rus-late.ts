import states from './rus-late-states.json';
import type {PartitionRealm,PartitionFrame} from './frankish-partitions';
export const rusLateReading:PartitionFrame['reading']=[
 {chapter:155,pages:[1305,1306],note:'斯拉夫文字与教会联系的早期背景；字母、礼仪语、地方口语分别理解，不作本年居民统计。'},
 {chapter:156,pages:[1308,1314],note:'早期罗斯、森林与草原、河流和海洋的空间背景；本段不能证明14—15世纪的君主、纳贡或疆界。'},
];
export function rusLateState(year:number){return states.find(s=>s.year===year);}
export function rusLateRealms(year:number,moment:string):PartitionRealm[]{
 const s=rusLateState(year);if(!s)return [];
 const people='王公与波雅尔贵族、教士、城镇商人和手工业者、乡村居民处于不同权利关系中；罗斯是历史地域与文化称谓，不能当作全国同一种人种。';
 const language='文字样本与居民口语分开。本轮没有覆盖全地域、逐年的母语调查，不把西里尔字母、教会斯拉夫语及各地方口语合并成一种现代俄语。';
 const make=(id:string,name:string,ruler:string,color:string,coords:[number,number],bounds:PartitionRealm['bounds'],geography:string,parts:string[],status:string,places:PartitionRealm['places'],dates:string,social=people,lang=language):PartitionRealm=>({id,name,ruler,color,coords,bounds,geography,parts,status,places,people:social,language:lang,dates:dates+'；当前时点：'+moment.split('，')[0]});
 return [
 make('moscow-rus','莫斯科与弗拉基米尔：王公和大公权利',s.moscow,'#bd9790',[38.8,55.35],[[35.8,54.2],[42,57.4]],'东欧内陆，莫斯科在莫斯科河畔，弗拉基米尔在其东北；特维尔在西北，诺夫哥罗德更偏西北。两座核心城市不是同名，也不是全部罗斯疆域。',['莫斯科及邻近王公领地的阅读核心','弗拉基米尔：大公头衔所联系的城市；不等于所有罗斯城市均由莫斯科直辖','特罗伊采修道院在莫斯科东北；库利科沃为更南面的事件参照，不属本色块成员'],s.moscowNote,[['moscow','莫斯科：王公、城市与继承战争'],['vladimir-on-klyazma','弗拉基米尔：大公称号对应何处'],['trinity-sergius','特罗伊采修道院（今谢尔吉耶夫镇）'],...(year>=1381?[['kulikovo','库利科沃：1380年会战地域'] as [string,string]]:[])],'莫斯科王公领地自13世纪形成；本段尚不是1547年建立的沙皇国'),
 make('tver-rus','特维尔：独立王公领地核心',s.tver,'#c8b780',[35.6,57.35],[[33.7,56.35],[37.2,58.1]],'在伏尔加河上游，特维尔位于莫斯科西北、托尔若克东南。地方王公、汗国册封及莫斯科的优先权是三层关系。',['特维尔城市与上伏尔加阅读核心','卡申、米库利诺等分封及内部支系未逐一画出','托尔若克虽在邻近交通线上，本图另列诺夫哥罗德关联点，不涂入特维尔'],s.tverNote,[['tver','特维尔：另一支王公与地方核心'],['moscow','莫斯科：比较竞争关系'],['torzhok','托尔若克：比较城镇，不是特维尔直辖证明']],'13世纪形成的王公领地；1485年并入莫斯科尚在本段之后'),
 make('novgorod-rus','诺夫哥罗德：城市共和国与王公联系',s.novgorod,'#8daba7',[31.8,58.85],[[29.5,56.7],[35.3,60.3]],'伊尔门湖北侧、沃尔霍夫河源头附近。向波罗的海与北部森林地带有联系，不能用本核心包络代替延伸至北方的全部领域。',['大诺夫哥罗德与伊尔门湖方向','斯塔拉亚鲁萨在湖的南侧；托尔若克为东南通道','普斯科夫单列；北方附属地域、边区与逐城驻军未全部复原'],s.novgorodNote,[['novgorod','大诺夫哥罗德：议事、商贸与主教'],['staraya-russa','斯塔拉亚鲁萨：伊尔门湖南侧'],['torzhok','托尔若克：东南通道'],['pskov','普斯科夫：另一个政治共同体']],'通常以1136—1478概括共和时期；1478并入莫斯科尚未发生','城市贵族经议事会、市政长官和大主教等制度参与治理；王公仍有军事与司法角色。商人、手工业者及乡村居民的权利不同；不是现代普选民主。','桦树皮文书提供地方日常和事务书写样本；汉萨商院还有低地德语商人群体。古罗斯文字、教会斯拉夫语及外来商人语言不能合成全城一种母语。'),
 make('pskov-rus','普斯科夫：地方议事与法律共同体',s.pskov,'#a9a0b8',[28.45,57.3],[[27.5,56.4],[29.5,58.4]],'韦利卡亚河畔、诺夫哥罗德西南、楚德湖（佩普西湖）南侧。这里是另一处城市与地方制度核心，不能照诺夫哥罗德的一名王公涂为同一直辖区。',['普斯科夫城市及韦利卡亚河方向','地方议事、市政长官和王公职能并存','与诺夫哥罗德有文化、教会及历史联系；不等于政治上仍是其普通属城'],s.pskovNote,[['pskov','普斯科夫：地方议事与法律'],['novgorod','诺夫哥罗德：比较历史联系']],'14世纪已形成独立地方政治共同体；1510并入莫斯科尚未发生','法律文本分别列王公、市政长官及共同体的职责，也记录财产、债务和司法关系；这不是没有王公或社会等级的现代民主共和国。','《普斯科夫司法文书》大学文本同时列古语与现代译文；保存抄本和编纂层次较晚、存在争论，不能拿现代译文当本年全城口语。'),
 ];
}
