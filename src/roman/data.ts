import gazetteer from './pleiades.json';
import type {MapAtlas,AtlasPlace} from '../greek/GreekMap';
import type {Coordinate} from '../greek/battles';
import type {Landform} from '../greek/landforms';
export type RomanPeriodId='punic'|'trajan'|'division';
export type RomanGroup='roman'|'carthage'|'ally'|'hellenistic'|'west'|'east';
export const groupNames:Record<RomanGroup,string>={roman:'罗马统治',carthage:'迦太基势力',ally:'罗马盟友（非直属领土）',hellenistic:'希腊／希腊化诸政体',west:'西部朝廷辖区',east:'东部朝廷辖区'};
export const groupColors:Record<RomanGroup,string>={roman:'#f1ba76',carthage:'#85cee0',ally:'#d5d6a5',hellenistic:'#b3acdf',west:'#f1ba76',east:'#91cfc7'};
export interface RomanPeriod {id:RomanPeriodId;date:string;title:string;intro:string;reading:string;source:string;sourceTitle:string}
export const romanPeriods:RomanPeriod[]=[
 {id:'punic',date:'公元前 218 年',title:'共和国与迦太基',intro:'第二次布匿战争开始时，先认清罗马、迦太基、西西里和伊比利亚的位置。',reading:'此时地中海沿岸存在多个政体。罗马公民城市、意大利盟邦与海外盟友的身份不同；同色点不代表连续疆域。本场景侧重战争开始时的主要地点，不覆盖这一年每次易手。',source:'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/3%2A.html',sourceTitle:'波利比乌斯《历史》第三卷'},
 {id:'trajan',date:'公元 117 年',title:'帝国的地中海世界',intro:'以图拉真统治末期为观察点，从不列颠、高卢到埃及和叙利亚，认识帝国的尺度。',reading:'地点颜色表示所选城市属于罗马世界，不是帝国最大疆界的复原。图拉真末年的东方征服与反叛非常复杂，本版不把短暂军事占领直接画成稳定行省边界。',source:'https://www.britishmuseum.org/collection/galleries/roman-empire',sourceTitle:'大英博物馆：罗马帝国'},
 {id:'division',date:'公元 395 年',title:'东、西两处朝廷',intro:'狄奥多西一世去世后，以东、西部朝廷的分掌关系重新观察同一片地中海。',reading:'这是罗马帝国内部的统治分掌。东、西颜色不表示民族边界，也不意味着两边立即成为互不相关的现代国家。米兰、罗马和君士坦丁堡各自的地位需要区分。',source:'https://www.britishmuseum.org/exhibitions/nero-man-behind-myth/introduction-to-ancient-rome',sourceTitle:'大英博物馆：认识古罗马'},
];
export interface RomanPlace {id:string;pid:string;name:string;latin:string;modern:string;region:string;coords:Coordinate;source:string;precision:string;description:string;punic?:RomanGroup;punicNote?:string;east?:boolean;lateNote?:string}
type Seed=Omit<RomanPlace,'coords'|'source'|'precision'>;
const seeds:Seed[]=[
 {id:'rome',pid:'423025',name:'罗马',latin:'Roma',modern:'意大利 · 罗马',region:'意大利',description:'台伯河沿岸的城市，也是理解共和国制度与帝国政治的核心地点。城市本身、意大利与整个罗马帝国是三个不同尺度。',punic:'roman',punicNote:'共和国的政治中心。',lateNote:'仍有重要的象征与制度地位，但不能把罗马城等同于所有皇帝实际驻留的地方。'},
 {id:'ostia',pid:'422995',name:'奥斯提亚',latin:'Ostia',modern:'意大利 · 罗马西南',region:'意大利',description:'靠近台伯河口的港口城市，适合与罗马一起观察内陆城市和海上交通的关系。现代海岸已与古代不同。',punic:'roman'},
 {id:'capua',pid:'432754',name:'卡普阿',latin:'Capua',modern:'意大利 · 圣玛丽亚卡普阿韦泰雷',region:'意大利',description:'坎帕尼亚的重要城市；古城位置与今天名为 Capua 的城市不同。',punic:'roman',punicNote:'开战时处于罗马体系内，享有不完全公民权；前 216 年坎尼之后的转向不提前套到前 218 年。'},
 {id:'naples',pid:'433014',name:'那不勒斯',latin:'Neapolis',modern:'意大利 · 那不勒斯',region:'意大利',description:'源自希腊殖民城市的南意大利港口。城市的希腊文化传统与其政治归属不能混为一谈。',punic:'ally'},
 {id:'brundisium',pid:'442509',name:'布林迪西',latin:'Brundisium',modern:'意大利 · 布林迪西',region:'意大利',description:'意大利东南的港口，是理解跨越亚得里亚海、前往巴尔干行动的重要起点。',punic:'roman'},
 {id:'ravenna',pid:'393480',name:'拉文纳',latin:'Ravenna',modern:'意大利 · 拉文纳',region:'意大利',description:'靠近亚得里亚海的北意大利城市，港湾、湿地与内陆的关系对其历史很重要。',lateNote:'本图是 395 年；不要把 402 年之后西部朝廷迁驻拉文纳的局面提前套用。'},
 {id:'milan',pid:'383706',name:'米兰',latin:'Mediolanum',modern:'意大利 · 米兰',region:'意大利',description:'位于波河流域北侧，接近通往阿尔卑斯山的交通方向。',lateNote:'晚期西部朝廷的重要驻地。与罗马的传统政治地位、拉文纳后来的地位分别理解。'},
 {id:'ariminum',pid:'393379',name:'阿里米努姆',latin:'Ariminum',modern:'意大利 · 里米尼',region:'意大利',description:'亚得里亚海沿岸的城市，是凯撒越过卢比孔河之后的重要节点。',punic:'roman'},
 {id:'carthage',pid:'314921',name:'迦太基',latin:'Carthago',modern:'突尼斯 · 迦太基遗址',region:'北非',description:'与罗马隔海相望的北非城市。布匿时代的迦太基和毁灭后重建的罗马城市，必须按时期区分。',punic:'carthage',punicNote:'独立的迦太基国家中心，不是罗马城市。'},
 {id:'utica',pid:'315248',name:'乌提卡',latin:'Utica',modern:'突尼斯 · 乌提卡遗址',region:'北非',description:'迦太基西北方的古代港口；海岸淤积使今天的遗址离海更远。',punic:'carthage'},
 {id:'lepcis',pid:'344448',name:'大莱普提斯',latin:'Lepcis Magna',modern:'利比亚 · 胡姆斯附近',region:'北非',description:'北非地中海岸的城市，在罗马帝国时期留下规模宏大的公共建筑。'},
 {id:'new-carthage',pid:'265849',name:'新迦太基',latin:'Carthago Nova',modern:'西班牙 · 卡塔赫纳',region:'伊比利亚',description:'伊比利亚东南岸港口。不要与北非的迦太基本城混淆。',punic:'carthage',punicNote:'汉尼拔在伊比利亚的重要基地，后来被罗马军攻占。'},
 {id:'gades',pid:'256177',name:'加德斯',latin:'Gades',modern:'西班牙 · 加的斯',region:'伊比利亚',description:'靠近直布罗陀海峡的大西洋岸城市，可帮助认识地中海世界的西端。',punic:'carthage'},
 {id:'tarraco',pid:'246349',name:'塔拉科',latin:'Tarraco',modern:'西班牙 · 塔拉戈纳',region:'伊比利亚',description:'伊比利亚东北岸的重要罗马城市。前 218 年的军事活动复杂，本版共和国场景暂不对该点作全年归属判断。'},
 {id:'massilia',pid:'148127',name:'马西利亚',latin:'Massalia / Massilia',modern:'法国 · 马赛',region:'高卢',description:'希腊殖民背景的港口，连接地中海航行与罗讷河方向。',punic:'ally',punicNote:'罗马的盟友，不能涂成罗马直属领土。'},
 {id:'lyon',pid:'167717',name:'卢格杜努姆',latin:'Lugdunum',modern:'法国 · 里昂',region:'高卢',description:'罗讷河与索恩河汇流地区的罗马城市。前 43 年建殖民城，因此不以这座罗马城市的身份出现在前 218 年场景。'},
 {id:'trier',pid:'108894',name:'特里尔',latin:'Augusta Treverorum',modern:'德国 · 特里尔',region:'莱茵方向',description:'高卢东北的重要罗马城市，晚期也是皇帝驻留与行政活动的中心之一。'},
 {id:'london',pid:'79574',name:'伦底尼乌姆',latin:'Londinium',modern:'英国 · 伦敦',region:'不列颠',description:'罗马征服不列颠之后兴起的城市。此罗马城市不应出现在共和国早期的地图里。'},
 {id:'york',pid:'89175',name:'埃博拉库姆',latin:'Eburacum',modern:'英国 · 约克',region:'不列颠',description:'不列颠北部的重要军政中心，可与伦敦的位置放在一起观察。'},
 {id:'athens',pid:'579885',name:'雅典',latin:'Athenae',modern:'希腊 · 雅典',region:'希腊',description:'连接古希腊与古罗马两个阅读单元的熟悉地点。文化影响并不等同于独立政治地位。',punic:'hellenistic',east:true},
 {id:'corinth',pid:'570182',name:'科林斯',latin:'Corinthus',modern:'希腊 · 古科林斯',region:'希腊',description:'地峡附近的城市。前 146 年毁灭与前 44 年重建，是理解希腊城邦进入罗马世界的重要断点。',punic:'hellenistic',east:true},
 {id:'syracuse',pid:'462503',name:'叙拉古',latin:'Syracusae',modern:'意大利 · 锡拉库萨',region:'西西里',description:'西西里东岸的希腊城市，后来纳入罗马统治。',punic:'ally',punicNote:'希耶罗二世时期为罗马盟友，不能把它等同于罗马直属行省城市。'},
 {id:'alexandria',pid:'727070',name:'亚历山大里亚',latin:'Alexandria',modern:'埃及 · 亚历山大',region:'埃及',description:'尼罗河三角洲西侧的地中海港口，先后属于托勒密王国和罗马世界。',punic:'hellenistic',punicNote:'托勒密王国的中心。',east:true},
 {id:'antioch',pid:'658381',name:'安条克',latin:'Antiochia',modern:'土耳其 · 安塔基亚',region:'叙利亚',description:'奥龙特斯河流域的安条克。古代存在多座同名城市，本点指叙利亚地区的主要城市。',punic:'hellenistic',punicNote:'塞琉古王国的重要中心。',east:true},
 {id:'byzantium',pid:'520985',name:'拜占庭城',latin:'Byzantium',modern:'土耳其 · 伊斯坦布尔',region:'博斯普鲁斯',description:'位于海峡要冲。395 年场景改用“君士坦丁堡”；不能把整个“拜占庭帝国”的后世名称套到任何时期的这座城上。',punic:'hellenistic',east:true,lateNote:'东部朝廷的中心。此处的东部仍属于罗马帝国历史。'},
];
export const romanPlaces:RomanPlace[]=seeds.map(s=>{const r=gazetteer[s.pid as keyof typeof gazetteer];return {...s,coords:r.coords as Coordinate,source:r.url,precision:r.precision}});
export function placeName(p:RomanPlace,period:RomanPeriodId){return p.id==='byzantium'&&period==='division'?'君士坦丁堡':p.name}
export function placeGroup(p:RomanPlace,period:RomanPeriodId):RomanGroup|undefined{return period==='punic'?p.punic:period==='trajan'?'roman':p.east?'east':'west'}
export function periodPlaces(period:RomanPeriodId){return romanPlaces.filter(p=>placeGroup(p,period))}
export function searchRoman(query:string,period:RomanPeriodId){const q=query.trim().toLowerCase();return periodPlaces(period).filter(p=>[p.name,placeName(p,period),p.modern,p.latin,p.region].some(s=>s.toLowerCase().includes(q)))}
const geoSource='https://registry.opendata.aws/terrain-tiles/';
export const romanLandforms:Landform[]=[
 {id:'alps',name:'阿尔卑斯山脉',latin:'ALPES',kind:'mountain',coords:[8.3,46.1],zoom:7.8,minZoom:4.1,bearing:10,text:'意大利北方的山地屏障。汉尼拔横穿的是这一山系；本图不指定有争议的唯一古代山口。',source:geoSource},
 {id:'apennines',name:'亚平宁山脉',latin:'APENNINUS',kind:'mountain',coords:[13.25,42.35],zoom:8.5,minZoom:5,bearing:-25,text:'山脉纵贯意大利半岛。观察山脊两侧的海岸与低地，再理解意大利内部的交通方向。',source:geoSource},
 {id:'pyrenees',name:'比利牛斯山脉',latin:'PYRENAEI',kind:'mountain',coords:[1,42.65],zoom:7.7,minZoom:4.4,bearing:10,text:'伊比利亚与高卢之间的山系；古代军队的跨越方向不等于今天的国家边界。',source:geoSource},
 {id:'po',name:'波河平原',latin:'PADUS · PO VALLEY',kind:'plain',coords:[10.4,45],zoom:7.5,minZoom:5.4,bearing:-20,text:'阿尔卑斯山与亚平宁山之间的低地。这里的绿色表达较低海拔，不是古代耕地或植被比例。',source:geoSource},
 {id:'tyrrhenian',name:'第勒尼安海',latin:'MARE TYRRHENUM',kind:'sea',coords:[11.5,39.3],zoom:6.4,minZoom:4.6,maxZoom:7.4,bearing:-15,text:'意大利西侧、撒丁岛和西西里附近的水域。罗马与迦太基的关系必须放在这个海上空间里理解。',source:geoSource},
 {id:'mediterranean',name:'地 中 海',latin:'MARE INTERNUM',kind:'sea',coords:[17,35],zoom:4.8,minZoom:2.5,maxZoom:5.3,bearing:0,text:'地中海连接欧洲、北非和西亚。水深颜色来自现代高程，不是古代航海图或安全水深。',source:geoSource},
 {id:'adriatic',name:'亚得里亚海',latin:'MARE HADRIATICUM',kind:'sea',coords:[16.2,42.2],zoom:6.4,minZoom:4.9,maxZoom:7.5,bearing:-25,text:'意大利东岸与巴尔干之间的水域，可配合凯撒内战的渡海阶段观察。',source:geoSource},
];
export function romanMapAtlas(period:RomanPeriodId):MapAtlas{
 const ps:AtlasPlace[]=periodPlaces(period).map(p=>({id:p.id,name:placeName(p,period),modern:p.modern,coords:p.coords,color:groupColors[placeGroup(p,period)!]}));
 return {places:ps,terrainPrefix:'roman-terrain',surfacePrefix:'roman-surface',bounds:[-11,25,43,57],maxzoom:8,center:[15,39],zoom:4.8,minZoom:2.8,extent:[[-23,13],[58,68]],landforms:romanLandforms,presets:['alps','po','tyrrhenian'].map(id=>romanLandforms.find(p=>p.id===id)!),attribution:'地点 Pleiades（CC BY 3.0）· 点色不是疆界',title:'古罗马交互地图'};
}
