import type {Coordinate} from '../greek/battles';
import type {courseSources} from './course-sources';

export interface Ruler300 {
 id:string;name:string;latin:string;role:string;original:string;tenure:string;partner:string;
 direction:string;bounds:[Coordinate,Coordinate];seat:string;seatNote:string;
 geography:string;identity:string;after:string;regions:string[];cities:string[];frontiers:string[];
 sources:(keyof typeof courseSources)[];
}
export const roman300Rulers:Ruler300[]=[
 {id:'diocletian',name:'戴克里先',latin:'Diocletianus',role:'东方正帝',original:'Rome (Diocletianus)',tenure:'正帝：284—305 年',partner:'galerius',direction:'小亚细亚、叙利亚、埃及与东方边境',bounds:[[24,23],[46,43]],seat:'nicomedia',
  seatNote:'尼科米底亚（今土耳其伊兹米特）是重要驻地。戴克里先也在叙利亚、埃及等地活动；驻地不是他每一年都不离开的首都。',
  geography:'先沿小亚细亚找到尼科米底亚，再看地中海东岸的安条克，最后跨海岸线向南看埃及的亚历山大里亚。东方的防务由戴克里先与伽列里乌斯协作承担。',
  identity:'300 年的正帝之一，也是建立四帝共治安排的主导者。东方与西方的分工仍属于一个罗马帝国，不能直接叫作 395 年之后的东西罗马两部朝廷。',
  after:'305 年与马克西米安同时退位，伽列里乌斯升为正帝。退位后的斯普利特宫殿生活属于之后的阶段，不应据此把 300 年的东方驻地放到达尔马提亚。',
  regions:['asia','pontus','levant','egypt','arabia','mesopotamia','cyprus','crete'],cities:['nicomedia','antioch','alexandria','nisibis'],frontiers:['eastern-contact'],sources:['diocletianRuler300','tetrarchy300']},
 {id:'galerius',name:'伽列里乌斯',latin:'Galerius',role:'东方副帝',original:'Rome (Galerius)',tenure:'副帝：293—305 年；正帝：305—311 年',partner:'diocletian',direction:'巴尔干、多瑙河与东方军事行动',bounds:[[12,35],[30,49]],seat:'thessaloniki',
  seatNote:'塞萨洛尼基（今希腊塞萨洛尼基）是重要宫廷中心；西尔米乌姆等巴尔干据点也有意义。他的活动范围不能仅按一座宫殿推定。',
  geography:'从爱琴海北岸的塞萨洛尼基往北看巴尔干腹地和多瑙河，向东北联系色雷斯。对萨珊的战争表明，分掌方向并不禁止皇帝跨区作战。',
  identity:'300 年是与戴克里先配对的副帝，已经在 298 年前后的东方战事中击败纳尔塞。副帝拥有军事和行政责任，不只是等待继位的名义储君。',
  after:'305 年升为正帝，至 311 年去世。305 年以后皇帝组合和争位局势改变，不能把本图中的四个人原样延续到 311 年。',
  regions:['pannonia','thrace','greece'],cities:['thessaloniki','sirmium','serdica','byzantium'],frontiers:['danube-west','eastern-contact'],sources:['galeriusRuler300','tetrarchy300','narseh300','sirmium300']},
 {id:'maximian',name:'马克西米安',latin:'Maximianus',role:'西方正帝',original:'Rome (Maximian)',tenure:'本轮正帝：286—305 年（285 年先任副帝）',partner:'constantius',direction:'意大利、西班牙与北非',bounds:[[-10,26],[20,48]],seat:'milan',
  seatNote:'米兰（今意大利米兰）是重要宫廷驻地；罗马仍有传统政治与象征地位。他也在高卢、北非等地活动，不是只统治米兰周边。',
  geography:'从意大利向西越过地中海看伊比利亚半岛，再向南看毛里塔尼亚、阿非利加与北非沿海。隔海的地区可以处于同一帝国分工体系。',
  identity:'与戴克里先同为正帝，西北方向由副帝君士坦提乌斯一世协助。马克西米安与后来的马克森提乌斯、马克西米努斯·戴亚不是同一个人。',
  after:'305 年退位，306 年又重返帝位，308 年再次退出，310 年再次争权后死亡。因此 286—305 年指本轮正帝任期，不是他所有政治活动的终点。',
  regions:['italy','hispania','islands','mauretania','africa','alps'],cities:['milan','rome','carthage','tarraco'],frontiers:['lower-rhine','danube-west'],sources:['maximianRuler300','tetrarchy300']},
 {id:'constantius',name:'君士坦提乌斯一世',latin:'Constantius I Chlorus',role:'西方副帝',original:'Rome (Constantinus)',tenure:'副帝：293—305 年；正帝：305—306 年',partner:'maximian',direction:'高卢、不列颠与莱茵边境',bounds:[[-7,41],[9,57]],seat:'trier',
  seatNote:'特里尔（今德国特里尔）是西北方向的重要驻地，位于摩泽尔河流域。它与莱茵边城科隆、不列颠的约克是不同地点。',
  geography:'先看大陆高卢，再跨海峡看不列颠；296 年恢复对不列颠的控制后，这两个地域在 300 年已重新联系起来。高卢东北侧面对莱茵河外的地方集团。',
  identity:'300 年的副帝是君士坦提乌斯一世，即后来君士坦丁的父亲。本图原快照写作 Constantinus，已按这一人物关系纠正说明，不能误读成其子已在位。',
  after:'305 年升为正帝，306 年在约克去世，其子君士坦丁随后被拥立。君士坦丁在 324 年成为唯一皇帝，是另外一个阶段。',
  regions:['gaul','britain'],cities:['trier','cologne','london','york'],frontiers:['lower-rhine','hadrian'],sources:['constantiusRuler300','tetrarchy300','britain300']},
];
export const ruler300ById=(id:string)=>roman300Rulers.find(r=>r.id===id);
export const ruler300ByArea=(name:string)=>roman300Rulers.find(r=>r.original===name);
