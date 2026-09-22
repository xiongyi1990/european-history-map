import type {Coordinate} from '../greek/battles';
import type {courseSources} from './course-sources';

export interface Frontier300 {
 id:string;name:string;kind:'defence'|'relation';coords:Coordinate;path:Coordinate[];
 location:string;romanSide:string;otherSide:string;status:string;precision:string;
 chronology:{date:string;text:string}[];cities:string[];regions:string[];sources:(keyof typeof courseSources)[];
}

// Hand-generalized reading geometry, never a reconstructed legal boundary or marching itinerary.
export const roman300Frontiers:Frontier300[]=[
 {id:'hadrian',name:'哈德良长城',kind:'defence',coords:[-2.35,55.07],
  path:[[-3.05,54.95],[-2.94,54.91],[-2.79,54.94],[-2.60,54.98],[-2.36,55.01],[-2.14,55.02],[-1.95,55.03],[-1.78,55.00],[-1.61,54.97],[-1.53,54.99]],
  location:'今英格兰北部，从西侧索尔韦湾横贯到东侧泰恩河口附近。它在今天英格兰—苏格兰边界以南，并不是现代两地的分界线。',
  romanSide:'长城以南连接不列颠的罗马军政体系，向南可找到约克和伦敦；长城上的军堡、关口及附近聚落共同组成边防。',
  otherSide:'长城以北是不同地方社群活动的地域。罗马也曾在墙外设据点、进行军事和外交活动，不能把墙外画成一个统一“苏格兰王国”。',
  status:'300 年仍是罗马不列颠北方边防的重要轴线。豪斯斯特兹的驻军和约 300 年铭文，让这一时点有具体地点证据。',
  precision:'橙色虚线概括长城的东西走向，省略堡垒、墙体曲折及墙外设施；它不是实测墙址，也不代表不可逾越的控制界线。',
  chronology:[{date:'122 年起',text:'哈德良下令修建长城。'},{date:'二世纪中叶',text:'罗马曾将主要防线前推至更北的安东尼长城，随后退回。'},{date:'300 年',text:'仍在使用，不能把两道不同时期的长城都当作当年的外边界。'},{date:'五世纪初',text:'罗马中央统治退出不列颠；墙体和部分据点的使用并未在同一天结束。'}],
  cities:['housesteads','york','london'],regions:['britain','north-britain'],sources:['hadrian300','housesteads300']},
 {id:'lower-rhine',name:'下莱茵河边防',kind:'defence',coords:[6.6,51.65],
  path:[[4.4,52.2],[4.65,52.14],[4.97,52.09],[5.13,52.08],[5.34,51.97],[5.63,51.96],[5.91,51.86],[6.16,51.84],[6.45,51.66],[6.62,51.57],[6.73,51.46],[6.82,51.23],[6.96,50.94],[7.1,50.73],[7.25,50.6],[7.33,50.5]],
  location:'今荷兰至德国西部的莱茵河下游，从北海沿岸向东南到莱茵山地；科隆位于这条河防带。特里尔在更南的摩泽尔河流域，不在莱茵干流上。',
  romanSide:'罗马边防设施主要位于下莱茵左岸，背后连向高卢。城镇、军营、港口和交通设施共同维系边区。',
  otherSide:'河流另一侧分布着多种地方群体，三世纪文献中的法兰克诸集团是其中一部分。“罗马一侧”和“法兰克一侧”不能当作居民血缘的严格划分。',
  status:'300 年下莱茵仍是帝国西北的重要边防地域。图示范围只取下游，不把后来放弃的上日耳曼—雷提亚旧防线接成仍在使用的封闭边界。',
  precision:'橙色虚线沿现代河道及古代下游走廊作概括；莱茵三角洲河道曾变迁，线条不证明每段河岸在 300 年的精确位置或控制强度。',
  chronology:[{date:'一至五世纪',text:'下莱茵边防体系长期使用，具体据点的兴衰并不完全同步。'},{date:'260 年代前后',text:'上日耳曼—雷提亚陆上旧防线被放弃；那是另一段边防，不能与下莱茵混为一谈。'},{date:'300 年',text:'从科隆的河防位置回看特里尔的宫廷驻地，理解边境与腹地的配合。'}],
  cities:['cologne','trier','mainz'],regions:['gaul','franks','alamanni'],sources:['rhine300','limes300','franks300']},
 {id:'danube-west',name:'多瑙河边防（西段）',kind:'defence',coords:[14.1,48.5],
  path:[[11.79,48.86],[12.1,49.02],[12.56,48.9],[12.97,48.83],[13.46,48.57],[13.74,48.46],[14.29,48.31],[14.86,48.21],[15.33,48.23],[15.61,48.4],[16.05,48.33],[16.38,48.24],[16.87,48.13],[17.1,48.14],[17.34,48.01],[17.61,47.86],[17.77,47.75],[18.15,47.75],[18.22,47.75]],
  location:'从今德国巴特格金附近，经奥地利的多瑙河谷，到斯洛伐克伊扎一带。卡农图姆在维也纳以东；阿奎因库姆在更下游的今布达佩斯，不属于本次画出的西段。',
  romanSide:'主要对应雷提亚东部、诺里库姆与潘诺尼亚北缘，罗马腹地大体在河流南侧或西侧；沿河有军营、道路与城镇。',
  otherSide:'河对岸存在多种地方社会，也有罗马桥头堡和跨河活动。萨尔马提亚地域在更东面的平原，不能把整条多瑙河北岸都命名为同一个族群国家。',
  status:'300 年仍可从多瑙河理解帝国北缘。本次只画西段，向东经潘诺尼亚、默西亚通往黑海的其余边防，可通过地域入口继续定位。',
  precision:'橙色虚线是河防走廊的概括，使用现代河道方向；不等于世界遗产保护范围，也不是完整多瑙河疆界。河岸、岛屿和渡口细节未重建。',
  chronology:[{date:'帝国时期',text:'多瑙河逐渐形成驻军、交通和地方聚落交织的边防系统。'},{date:'约 270 年代',text:'罗马撤出更东面的多瑙河北岸达契亚；不能据此推断整条多瑙河边防也被放弃。'},{date:'300 年',text:'南岸的新达契亚行政名称与北岸旧达契亚地区必须分开。'}],
  cities:['carnuntum','aquincum','sirmium'],regions:['alps','pannonia','thrace','goths','sarmatians'],sources:['danube300','dacia300']},
 {id:'eastern-contact',name:'罗马—萨珊边境关系',kind:'relation',coords:[40.2,35.6],
  path:[[36.16,36.2],[41.22,37.07],[44.58,33.09]],
  location:'从地中海东北角的安条克，向东看上美索不达米亚的尼西比斯，再向东南看底格里斯河畔的泰西封。三点跨越今天土耳其、叙利亚附近和伊拉克的空间。',
  romanSide:'安条克与尼西比斯在 300 年属罗马一方；尼西比斯处在前沿交往地带，安条克是更靠地中海的东方中心。',
  otherSide:'泰西封是萨珊帝国的重要宫廷中心。北面的亚美尼亚王国另有自己的政治关系，不能把整个东方涂成罗马或萨珊的二选一。',
  status:'三世纪末战事与和约之后，尼西比斯成为双方规定的商业和外交交换点。300 年的边境应在这一背景下阅读，不能采用 363 年让城之后的版图。',
  precision:'紫色点线只连接三个阅读参照点：不是国界、古代道路、商队实际路线或某次进军路线。萨珊的完整疆域仍未重建。',
  chronology:[{date:'224 年',text:'萨珊王朝兴起，300 年不应再沿用帕提亚帝国的名称。'},{date:'298—299 年前后',text:'伽列里乌斯战胜纳尔塞后的和约重整两国关系；文献对战事与缔约年份有不同记法。'},{date:'300 年',text:'尼西比斯在罗马一方，泰西封在萨珊一方。'},{date:'363 年',text:'约维安与沙普尔二世议和，尼西比斯转归萨珊；这是之后的变化。'}],
  cities:['antioch','nisibis','ctesiphon'],regions:['levant','mesopotamia','armenia','persia'],sources:['nisibis300','narseh300','jovian300','sasanian300']},
];
export const frontier300ById=(id:string)=>roman300Frontiers.find(f=>f.id===id);
export function frontier300View(f:Frontier300):[Coordinate,Coordinate] {
 const xs=f.path.map(p=>p[0]),ys=f.path.map(p=>p[1]);
 const west=Math.min(...xs),east=Math.max(...xs),south=Math.min(...ys),north=Math.max(...ys);
 const dx=Math.max(.3,(east-west)*.12),dy=Math.max(.15,(north-south)*.12);
 return [[west-dx,south-dy],[east+dx,north+dy]];
}
export function frontier300Lines(year:number,modern:boolean,enabled:boolean):GeoJSON.FeatureCollection {
 return {type:'FeatureCollection',features:year===300&&!modern&&enabled?roman300Frontiers.map(f=>({type:'Feature',properties:{atlasId:'frontier300:'+f.id,kind:f.kind,color:f.kind==='defence'?'#aa5429':'#7961a7'},geometry:{type:'LineString',coordinates:f.path}})):[]};
}
