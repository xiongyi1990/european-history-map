import type {Region300} from './roman-300-regions';
import type {courseSources,ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
export const west400=['britain','gaul','hispania','italy','islands','alps','pannonia','mauretania','africa','tripolitania400'];
export const east400=['thrace','greece','egypt','crete','cyprus','asia','pontus','levant','arabia','cyrenaica400'];
export const cityRegions400:Record<string,string>={hippo:'africa',toulouse:'gaul',tournai:'gaul',ravenna:'italy',lepcis:'tripolitania400',cyrene:'cyrenaica400'};
export const reading400:ReadingReference[]=[
 {chapter:101,pages:[813,820],note:'衰亡的解释：先看 400 年尚存的西部地域'},
 {chapter:103,pages:[827,835],note:'迁徙、军队与地方社会'},
 {chapter:113,pages:[955,963],note:'宗教政策与居民信仰的区别'},
 {chapter:129,pages:[1092,1101],note:'从罗马与希波定位后来的 410 年城破'},
 {chapter:133,pages:[1123,1130],note:'对照五世纪王国；不要把它们提前放到 400 年'},
];
export interface Reading400 {id:string;title:string;text:string;places:[string,string][];regions:[string,string][];source:Source}
export const questions400:Reading400[]=[
 {id:'courts',title:'皇帝在哪里？罗马城还是首都吗？',text:'霍诺留掌西部，主要宫廷在米兰，斯提利科掌握重要军权；阿卡狄乌斯掌东方，驻君士坦丁堡。罗马仍有元老院、城市行政与宗教地位；拉文纳成为常驻宫廷是 402 年的后续变化。',places:[['milan','米兰：西部宫廷'],['rome','罗马：传统中心'],['ravenna','拉文纳：尚未迁入'],['byzantium','君士坦丁堡：东方宫廷']],regions:[['italy','意大利内部']],source:'honorius400'},
 {id:'africa',title:'北非属于谁？为什么对意大利重要？',text:'迦太基、希波和的黎波里塔尼亚联系西部朝廷；昔兰尼加、埃及联系东方。397—398 年吉尔多事件已结束，400 年的迦太基仍不是汪达尔王都。沿海农业、港口与海运把南岸和意大利连接起来。',places:[['carthage','迦太基：非洲沿岸'],['hippo','希波：奥古斯丁'],['ostia','奥斯提亚：罗马海口']],regions:[['tripolitania400','西侧：的黎波里塔尼亚'],['cyrenaica400','东侧：昔兰尼加'],['egypt','再向东：埃及']],source:'africaLate'},
 {id:'gainas',title:'400 年君士坦丁堡发生了什么？',text:'盖纳斯凭军权介入东方朝政，随后退出君士坦丁堡，留在城中的哥特士兵及相关群体遭到杀戮；他后来败亡。这是军政与城市冲突，不能把所有哥特居民都等同于一支叛军。弗拉维塔同样具有哥特背景，却为朝廷作战。',places:[['byzantium','君士坦丁堡：危机中心'],['hadrianople','色雷斯：内陆方向']],regions:[['thrace','巴尔干与海峡']],source:'gainas400'},
 {id:'alaric',title:'哥特人在哪儿？西哥特王国成立了吗？',text:'阿拉里克及其追随者活动于巴尔干，并与两部朝廷交涉。还不能在高卢南部画出 418 年以后的图卢兹王国，更不能把意大利画成 493 年后的东哥特王国。留在北方的哥特集团与帝国境内群体也不是一个统一国家。',places:[['thessaloniki','巴尔干参照：塞萨洛尼基'],['toulouse','图卢兹：仍在罗马西部'],['ravenna','拉文纳：仍为罗马城市']],regions:[['goths','哥特诸集团'],['greece','希腊与马其顿']],source:'honorius400'},
 {id:'rhine',title:'高卢、西班牙与不列颠已经丢失了吗？',text:'400 年仍需把这些地区放在罗马西部体系内理解。莱茵河边防、地方军队及法兰克集团互动复杂；406 年前后的大规模渡河、409 年进入西班牙和不列颠统治退出属于随后十年的变化。',places:[['trier','特里尔：莱茵方向'],['tournai','图尔奈：罗马城市背景'],['tarraco','塔拉科：西班牙'],['london','伦底尼乌姆：不列颠']],regions:[['franks','法兰克诸集团'],['britain','不列颠']],source:'honorius400'},
 {id:'persia',title:'东方邻国和边城怎样看？',text:'萨珊君主为伊嗣俟一世，399 年即位。泰西封在今天伊拉克境内；尼西比斯自 363 年起属于萨珊，埃德萨仍属罗马。亚美尼亚在约 387 年分区后处于两强影响下，不把整个高原涂成普通罗马行省。',places:[['ctesiphon','泰西封：萨珊宫廷'],['nisibis','尼西比斯：萨珊边城'],['edessa','埃德萨：罗马城市']],regions:[['persia','萨珊内部地域'],['armenia','亚美尼亚的分区']],source:'yazdegerd400'},
];
// These are geographic reading groups, not a claim to have reconstructed every province in the Notitia.
export function enrichRegions400(base:Region300[]):Region300[]{
 const result=base.map(r=>{
  const west=west400.includes(r.id),east=east400.includes(r.id);
  let value={...r,cities:[...r.cities],sources:[...r.sources]};
  if(west||east){
   value.polity=`400 年属于罗马帝国${west?'西部，霍诺留在位（西部统治 395—423），宫廷主要在米兰':'东部，阿卡狄乌斯在位（东方统治 395—408），宫廷在君士坦丁堡'}。地域名是空间阅读分组，不等同于一个行政省。`;
   value.sources.push('notitia400',west?'honorius400':'arcadius400');
  }
  if(r.id==='gaul'){value.cities.push('toulouse','tournai');value.change='400 年尚未出现覆盖高卢的墨洛温王国或图卢兹西哥特王国。406 年前后渡河与 418 年安置是后续节点。';}
  if(r.id==='italy'){value.cities.push('ravenna');value.parts='米兰是宫廷驻地，罗马保有元老院与象征地位；奥斯提亚联系罗马的海上供应，阿奎莱亚联系阿尔卑斯东侧通道，拉文纳在亚得里亚海方向。';}
  if(r.id==='africa'){value.cities.push('hippo');value.change='吉尔多于 397—398 年的反叛已被镇压，地方仍属西部。429 年汪达尔渡海与 439 年夺取迦太基尚未发生。';value.sources.push('honorius400','africaLate');}
  if(r.id==='mauretania')value.polity='西部朝廷控制北非西段的部分沿海与行省空间，内陆地方首领与社群的活动范围不能全部等同罗马实控；沃鲁比利斯不因保留罗马遗迹就自动归为驻军城市。';
  if(r.id==='libya'){value.name='利比亚沿海：跨东西部的地理区域';value.mapName='北非中段';value.polity='这不是一个统一行政省。西侧的黎波里塔尼亚属于西部体系，东侧昔兰尼加联系东部埃及行政系统。';value.change='365 年地震已经发生；400 年应按震后城市社会理解。两段归属分别展开，不沿用现代利比亚国界。';value.sources.push('notitia400');}
  if(r.id==='goths'){value.name='哥特诸集团：多瑙河北岸与巴尔干';value.polity='部分集团留在多瑙河北岸，阿拉里克及追随者活动于巴尔干。军队、定居者与地方原有居民不是同一对象；没有一条囊括所有哥特人的统一国界。';value.change='376 年渡河、378 年战役和 382 年安置是背景；400 年盖纳斯危机是另一个事件，阿拉里克进入意大利及后来图卢兹王国都不应提前。';value.sources.push('arcadius400','gainas400');}
  if(r.id==='huns4'){value.name='匈人诸集团与草原联盟';value.polity='400 年存在多个首领及联盟关系；不能把阿提拉时代的疆界或统一王廷提前。';value.sources.push('gainas400','zosimus400');}
  if(r.id==='persia'||r.parent==='persia'){value.polity=`萨珊帝国（224—651），伊嗣俟一世在位（399—420）。${r.parent?'本条是帝国内部地域。':'泰西封是宫廷重地；王朝领土跨两河与伊朗高原。'}`;value.change='399 年伊嗣俟一世即位。410 年塞琉西亚—泰西封教会会议属于之后的制度变化，不把后来的结果提前到 400 年。';value.sources.push('yazdegerd400');}
  // Original social notes are explicitly broad fourth-century background; retain their evidence limits.
  value.cities=[...new Set(value.cities)];value.sources=[...new Set(value.sources)];return value;
 });
 const libya=result.find(r=>r.id==='libya')!;
 result.push({...libya,id:'tripolitania400',name:'的黎波里塔尼亚：罗马西部',mapName:'的黎波里塔尼亚',parent:'libya',coords:[13.5,32.2],bounds:[[10.5,29.5],[17,33.5]],modern:'今天利比亚西北沿岸；以大莱普提斯定位。',polity:'罗马西部的北非行省空间，属意大利—非洲的行政联系；不是东部埃及的一部分。',parts:'大莱普提斯及附近沿岸农业、港口和内陆边区；名称与现代的黎波里城市有关，但地域不等于单一城市。',change:'400 年仍属罗马西部；此处不以五世纪之后的政治变化回填。',cities:['lepcis']},
 {...libya,id:'cyrenaica400',name:'昔兰尼加：罗马东部',mapName:'昔兰尼加',parent:'libya',coords:[22,32.3],bounds:[[19,29],[25.5,33.5]],modern:'今天利比亚东北部；与西侧的黎波里塔尼亚隔着苏尔特湾。',polity:'罗马东部行政体系，联系埃及方向。晚期古代名录中的上、下利比亚，与现代利比亚国家不是同一范围。',parts:'昔兰尼等希腊传统城市及沿岸、内陆地区；向东连埃及，向北隔海看克里特。',change:'365 年地震后的城市发展各不相同；不把古典时代的繁荣原样复制到 400 年。',cities:['cyrene']});
 return result;
}
