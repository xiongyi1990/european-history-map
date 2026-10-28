/** Exact-year reading frames. Never interpolate these political relationships. */
import {successorFrames} from './frankish-successors';
export type PartitionYear=843|855|870|880|900|911|925|962|987|1000;
export interface PartitionSource {title:string;url:string}
export interface PartitionRealm {
 id:string;name:string;ruler:string;dates:string;color:string;coords:[number,number];bounds:[[number,number],[number,number]];
 geography:string;parts:string[];status:string;people:string;language:string;places:[string,string][];
}
export interface PartitionFrame {
 year:PartitionYear;title:string;treaty:string;eventDate:string;summary:string;change:string;note:string;
 reading:{chapter:number;pages:[number,number];note?:string}[];realms:PartitionRealm[];
 sources?:PartitionSource[];relationships?:{title:string;text:string;realmIds:string[]}[];
}
export const partitionYears:PartitionYear[]=[843,855,870,880,900,911,925,962,987,1000];
export function partitionStageYears(year:number){return partitionYears.filter(y=>(y>=900)===(year>=900));}
export function partitionTopic(year:number){return year>=900?'法兰克继承诸国':'法兰克分国';}
export const partitionSources:PartitionSource[]=[
 {title:'INSEI：843年凡尔登三分及代表城市',url:'https://www.insei.fr/ressources/le-partage-de-verdun-en-843'},
 {title:'莱茵地区历史门户：洛泰尔二世与855年继承分割',url:'https://www.rheinische-geschichte.lvr.de/Persoenlichkeiten/lothar-ii./DE-2086/lido/57c943a7f37ea7.34457744'},
 {title:'瓦隆官方历史图集：870年梅尔森分割',url:'https://connaitrelawallonie.wallonie.be/histoire/timeline/8-aout-870-le-traite-de-meerssen'},
 {title:'瓦隆官方历史图集：880年里伯蒙及博索的普罗旺斯',url:'https://connaitrelawallonie.wallonie.be/histoire-et-symboles/histoire/atlas-historique/entre-francie-et-germanie-le-traite-de-ribemont-880'},
 {title:'Schneider（2018）：梅尔森条约的空间重建及边界不确定性',url:'https://journals.openedition.org/cem/15084'},
 {title:'瑞士历史辞典：胖子查理的王权、意大利与881年帝号',url:'https://hls-dhs-dss.ch/de/articles/020774/2010-04-01/'},
 {title:'德国传记：胖子查理于880年在意大利受膏',url:'https://www.deutsche-biographie.de/sfz53391.html'},
 {title:'斯特拉斯堡教育展：842年誓约、罗曼语/日耳曼语与拉丁文书',url:'https://pedagogie.ac-strasbourg.fr/fileadmin/pedagogie/lettres/Dossier_dyslexie_2/Exposition_-_Serments_de_Strasbourg.pdf'},
];
const limits='色块是分国与地域关系的概略示意，边缘不是测绘国界；没有颜色不表示无人居住或没有政权。王朝分配、地方实际控制、居民与语言须分开理解。';
const language='842年斯特拉斯堡誓约保留了罗曼语和日耳曼语口语表达，叙事与教会文书使用拉丁文；这些证据不能划出本王国所有居民的母语边界。';
const west=(ruler:string,status:string):PartitionRealm=>({
 id:'west-francia',name:'西法兰克王国',ruler,dates:'843年分国起；本专题按所选事件年说明',color:'#d99674',coords:[1.8,47.2],bounds:[[-2.1,42.5],[5.8,51.4]],
 geography:'在中部王国以西的高卢地域；以今天法国大部及邻接地区帮助定位，范围不等于现代法国。',
 parts:['塞纳河—卢瓦尔河之间的西部高卢地域','阿基坦及半岛东北边疆方向','勃艮第的西部地域；与罗讷河/汝拉方向的另一部分区别'],status,
 people:'“西法兰克”表示王权和地域关系，不是全体居民已经形成现代法国民族的声明；地方社会不会因分国条约整体更换。',language,
 places:[['paris','巴黎：塞纳河方向'],['lyon','里昂：邻近罗讷河方向对照，不据此判作全期西部直辖']]});
const east=(ruler:string,status:string):PartitionRealm=>({
 id:'east-francia',name:'东法兰克王国',ruler,dates:'843年分国起；其后仍有继承分治',color:'#75aa9f',coords:[10.9,50.3],bounds:[[6.6,46],[16.8,54.4]],
 geography:'莱茵河以东至上多瑙河等地域；今天德国、奥地利和邻接地区只能帮助找位置，不能直接拿现代国界替代。',
 parts:['萨克森与东部法兰克地域','阿勒曼尼亚及阿尔卑斯北侧','巴伐利亚与上多瑙河地域'],status,
 people:'萨克森、巴伐利亚、阿勒曼尼亚等是本图采用的历史地域线索；同属一组王权不表示居民拥有单一祖源或已经形成现代德国民族。',language,
 places:[['regensburg','雷根斯堡：巴伐利亚与多瑙河'],['aachen','亚琛：比较843、855与870年后的归属']]});
const italy=(ruler:string,dates:string,status:string):PartitionRealm=>({
 id:'italy',name:'意大利王国部分',ruler,dates,color:'#86a5ca',coords:[10.4,44.6],bounds:[[6.8,41.8],[13.8,46.7]],
 geography:'阿尔卑斯以南的波河平原及相关王权地域。不是整个靴形半岛，不能把教皇、南部地方权力和岛屿全部合并进去。',
 parts:['帕维亚及波河平原王权中心','阿尔卑斯通道与意大利北中部相关地域','863年后的南部普罗旺斯联系另有继承层次，不以现代大区推画精确范围'],status,
 people:'王国名称是政治层次；意大利地方社会、教会与王朝统治者不应合并成一个“法兰克人种”。',
 language:'教会及王权文书使用拉丁文；地方口语不能从国王家族或地图颜色推断。本图没有完整语言人口分界。',
 places:[['pavia','帕维亚：意大利王权中心'],['rome','罗马：教皇与皇帝关系对照，不表示全部教皇属地都为王室直辖']]});
const provence=(ruler:string,dates:string,status:string):PartitionRealm=>({
 id:'provence',name:'普罗旺斯—罗讷河王权',ruler,dates,color:'#c7aa60',coords:[5.1,44.6],bounds:[[3.4,42.8],[7.8,46.2]],
 geography:'里昂、维埃纳至地中海的罗讷河方向。历史上的勃艮第和普罗旺斯含义随时期变化，并非今天两个行政区。',
 parts:['里昂及罗讷河走廊','普罗旺斯与下罗讷河方向','邻接勃艮第地域；精确归属及实际控制按史料另核'],status,
 people:'王权更替不表示当地居民整体迁走；勃艮第、普罗旺斯的地域身份与国王家族分别理解。',
 language:'拉丁文书与地方罗曼语口语传统需要区别；未核定王国全境母语比例或界线。',
 places:[['lyon','里昂：罗讷河上段'],['arles','阿尔勒：下罗讷河方向']]});
const middle:PartitionRealm={
 id:'middle-francia',name:'中部王国（中法兰克）',ruler:'洛泰尔一世；保有皇帝称号',dates:'843—855年；855年由三个儿子分割',color:'#b58fbe',coords:[6.2,48.2],bounds:[[3.1,41.7],[13.8,53.6]],
 geography:'从北海沿岸，经亚琛、莱茵—默兹之间、勃艮第和罗讷河方向，伸向阿尔卑斯以南的意大利王权地域。',
 parts:['北部：低地、弗里西亚及亚琛方向','中段：汝拉/勃艮第与罗讷河地域','南部：意大利王国部分及皇帝与罗马教会的联系'],
 status:'一个跨阿尔卑斯的王朝分国。皇帝称号不表示东西两位国王的全部领地都由洛泰尔直接治理。855年后不能继续把这整条色带当作一个未变化的王国。',
 people:'北部、中段和意大利地方社会不同；跨越多个语言地域，不能视为单一族群的国家。',language,
 places:[['aachen','亚琛：北部宫廷中心'],['lyon','里昂：罗讷河方向'],['pavia','帕维亚：阿尔卑斯以南']]};
const lotharingia:PartitionRealm={
 id:'lotharingia',name:'洛泰尔二世的北部王国（洛塔林吉亚）',ruler:'洛泰尔二世',dates:'王权855—869年；870年继承分割',color:'#b58fbe',coords:[6.1,49.9],bounds:[[3.2,46.2],[8.8,53.6]],
 geography:'中部王国的北段，从弗里西亚、低地与亚琛延伸至汝拉/阿尔卑斯附近。比今天法国的洛林广大，不能将两者等同。',
 parts:['北海沿岸与低地部分','亚琛及莱茵—默兹附近的王权地域','汝拉与跨汝拉的南部地域，不是只有北方一小块洛林'],
 status:'与意大利、普罗旺斯分别继承，统治者仍属同一家族。其869年后的继承危机导致870年条约，而非855年已被东西两国分完。',
 people:'跨罗曼语和日耳曼语地方社会；“洛塔林吉亚”是王朝与地域称呼，不是另一种人种。',language,
 places:[['aachen','亚琛：洛泰尔二世的宫廷方向']]};
const courseBackground:PartitionFrame['reading']=[
 {chapter:143,pages:[1199,1207],note:'课程背景：继承分配与王权问题；本专题855、870、880年的具体分国细节由外部史料补充。'},
 {chapter:144,pages:[1208,1215],note:'课程背景：东西法兰克、中部地域及维京冲击；不把课程概述当作逐条精确疆界来源。'},
];
export const partitionFrames:PartitionFrame[]=[
 {year:843,title:'843年：凡尔登三分',treaty:'凡尔登条约',eventDate:'843年8月条约之后',
  summary:'先看西、中、东三块，再沿中部王国从北海走到意大利。它们是加洛林家族分国，不是今天法国、德国、意大利的直接国界。',
  change:'洛泰尔一世取得中部地域与帝号；秃头查理掌握西部，日耳曼人路易掌握东部。',note:limits,reading:courseBackground,
  realms:[west('秃头查理','本图为843年凡尔登分国之后。布列塔尼等边缘的地方王权与臣属关系另有层次，不用一整块现代法国表示直辖。'),middle,east('日耳曼人路易','本图为843年分国之后，莱茵河左岸的部分据点也有复杂归属；边界不严格等于一条河或现代德国。')]},
 {year:855,title:'855年：中部王国再分成三支',treaty:'普吕姆分割',eventDate:'855年9月洛泰尔一世退位、分国之后',
  summary:'西法兰克和东法兰克仍在。变化发生在中间：北部洛塔林吉亚、罗讷河的普罗旺斯部分、阿尔卑斯以南的意大利分别继承。',
  change:'洛泰尔二世、普罗旺斯的查理、路易二世分别继承；中部三支不等于整个欧洲只剩三个国家。',note:limits,reading:courseBackground,
  realms:[west('秃头查理','855年的分割针对洛泰尔一世的中部王国；西部王权继续存在。'),lotharingia,
   provence('普罗旺斯的查理','855—863年；863年去世后再分配','855年继承包括普罗旺斯和里昂方向。863年后的继承变化不能提前套回855年；本条也不是879年博索另立的同一阶段。'),
   italy('路易二世','意大利王权840—875年；850年已具帝号','本图为855年继承之后。路易二世承接意大利与皇帝身份，并非855年才第一次成为意大利国王。'),
   east('日耳曼人路易','东部王国继续存在；本次未把它分给洛泰尔一世的三个儿子。')]},
 {year:870,title:'870年：梅尔森分割洛塔林吉亚',treaty:'梅尔森条约',eventDate:'870年8月8日条约之后',
  summary:'先找855年的北部王国。洛泰尔二世去世后，东西两位叔父分得其地域，亚琛进入东部一方。意大利王权继续单独对照。',
  change:'不是把855年的全部三个中部继承王国一次分光。普罗旺斯已于863年另经继承分配，罗讷河/汝拉的归属更需分段核对。',
  note:limits+'梅尔森名册包含郡、主教座和修道院；研究指出不能把全部条目无争议地还原成精确线状边界。',reading:courseBackground,
  realms:[west('秃头查理','取得洛塔林吉亚西部份额；并非占领了全部原中部王国。图示不能表示所有郡、主教座或修道院的精确归属。'),
   {...east('日耳曼人路易','取得洛塔林吉亚东部份额，包括亚琛。没有因此取得路易二世的全部意大利王权。'),bounds:[[5.4,46],[16.8,54.4]],parts:['原东法兰克的萨克森、阿勒曼尼亚、巴伐利亚等地域','新分得的洛塔林吉亚东部与亚琛方向','汝拉及勃艮第条目难以精确划线，保留概略关系']},
   {...italy('路易二世','意大利王权至875年；本图为870年','与东西两位叔父分割洛塔林吉亚的事件区别。863年取得阿尔勒、艾克斯和昂布兰方向的南部普罗旺斯；本图用同色联系意大利及这一份额。855年查理的整块王国没有原封保留。'),bounds:[[4.1,42],[13.8,47.6]],places:[['pavia','帕维亚：意大利王权中心'],['arles','阿尔勒：863年后南部普罗旺斯份额'],['rome','罗马：教皇关系对照，不表示王室直辖']]}]},
 {year:880,title:'880年：洛塔林吉亚转入东部王权',treaty:'里伯蒙条约',eventDate:'880年里伯蒙条约之后；年内分治另有层次',
  summary:'西部继承者交出870年分得的洛塔林吉亚份额，东部小路易取得这一北部地域。罗讷河另有879年兴起的博索王权，意大利与胖子查理相连。',
  change:'880年不是“整个中部王国都归德国”，也不是东部已经由胖子查理一人统一；他的皇帝加冕在881年，统一东部在882年。',
  note:limits+'本图没有细分西部两王、东部诸王的全部内部领地，也不把博索的称王范围等同各地稳定实控。',reading:courseBackground,
  realms:[west('路易三世、卡洛曼二世（西部继承者）','两位西部继承者放弃洛塔林吉亚份额；他们的年内分治不在本专题另画精确内部边界。'),
   {...east('小路易、胖子查理等加洛林王权分治','洛塔林吉亚归东部的小路易；此人与西部同名路易三世分别理解。胖子查理此时掌握阿勒曼尼亚等地域，882年才统一东部王权。'),bounds:[[3.2,46],[16.8,54.4]],parts:['东部原有萨克森、法兰克及巴伐利亚等地域','小路易取得的洛塔林吉亚北部地域','胖子查理的阿勒曼尼亚等地域；与其意大利王权相连但层次不同']},
   italy('胖子查理','879年取得意大利王权；880年受膏，881年才加冕为帝','同一君主可兼有不同王国权力，因此这块颜色用于辨认意大利地域，不表示它与东部王权完全无关。'),
   provence('博索','879—887年王权线索；本图为880年','879年称王的罗讷河/普罗旺斯政治中心；受到加洛林诸王反对，称号、主张与稳定实际控制不完全相同。不是重新恢复855年查理原封不动的全部领地。')]},
 ...successorFrames,
];
export function partitionAt(year:number):PartitionFrame|undefined{return partitionFrames.find(frame=>frame.year===year);}
export function partitionRealmAt(year:number,id:string):PartitionRealm|undefined{return partitionAt(year)?.realms.find(realm=>realm.id===id);}
