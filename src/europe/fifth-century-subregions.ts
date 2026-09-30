import {fifthAfrica} from './fifth-century-rulers';
import {fifthVisigoths,fifthSuevi,fifthProvence,fifthAuvergne} from './fifth-century-western-kingdoms';
import type {Region300} from './roman-300-regions';

// Reading areas and camera bounds, never sovereignty polygons. Parent membership is geographical.
export const fifthLocalCityRegions:Record<string,string>={toulouse:'aquitaine5',clermont5:'auvergne5',arles:'provence5',massilia:'provence5',soissons5:'north-gaul5',tournai:'north-gaul5',paris:'north-gaul5',orleans5:'north-gaul5',lyon:'burgundy5',braga5:'gallaecia5',tarraco:'tarraconensis5',carthage:'carthage-region5',hippo:'numidia5'};
type LocalArea=Pick<Region300,'id'|'name'|'coords'|'bounds'|'modern'|'parts'|'sources'> & {parent:string;control:(y:number)=>string;change:string};
const areas:LocalArea[]=[
 {id:'auvergne5',parent:'gaul',name:'奥弗涅与克莱蒙',coords:[3.1,45.7],bounds:[[2.1,44.7],[4.1,46.4]],modern:'今法国中部奥弗涅及克莱蒙费朗一带，位于中央高地；不是法国东南部地中海岸的普罗旺斯。',parts:'克莱蒙在高卢内陆，西南方向是图卢兹，东南方向沿罗讷河通向阿尔勒和马赛。475 年这里的和议让步不等于全部南高卢同日易主。',control:fifthAuvergne,change:'471—474 年抵抗与 475 年和议分开看；476 年普罗旺斯的变化另有城市条目。',sources:['clermont5','clermontNames5','sidonius5']},
 {id:'aquitaine5',parent:'gaul',name:'阿基坦与图卢兹',coords:[0.5,44.3],bounds:[[-1.8,42.7],[3,46]],modern:'今法国西南部，加龙河流域与图卢兹一带；古代阿基坦不等于今天同名行政区。',parts:'以图卢兹联系大西洋方向的西南高卢；东面与罗讷河下游的阿尔勒分开观察。',control:y=>y<418?'罗马高卢西南地域；418 年安置安排尚未发生。':fifthVisigoths(y),change:'418 年是安置转折；随后王权扩张不意味着所有高卢城市同时易主。',sources:['honorius400','hydatius5','provence5']},
 {id:'provence5',parent:'gaul',name:'普罗旺斯与罗讷河下游',coords:[5,43.6],bounds:[[3.5,42.9],[7.5,45]],modern:'今法国东南部地中海岸，罗讷河入海口与马赛；不是整个法国南部。',parts:'阿尔勒是内河与行政节点，马赛是海港；沿罗讷河向北联系里昂。镜头框不表示古代普罗旺斯省界。',control:fifthProvence,change:'418 年图卢兹安置 → 473 年阿尔勒、马赛被占 → 474—475 年前后罗马短暂恢复 → 476 年前后再次进入西哥特体系；475 年奥弗涅和议发生在内陆。',sources:['honorius400','majorian5','provence5']},
 {id:'north-gaul5',parent:'gaul',name:'北高卢：法兰克与罗马地方势力',coords:[2.8,49.8],bounds:[[0,47.5],[5,51]],modern:'今法国北部与比利时南部，塞纳河、瓦兹河至斯海尔德河方向。',parts:'苏瓦松定位罗马军事势力，图尔奈定位法兰克王权；巴黎和奥尔良作邻近城市参照。四城并非每年都属于同一政权。',control:y=>y<461?'罗马地方军政与法兰克集团相互交涉、作战或合作；北高卢并非一个统一法兰克国家。':y<486?'埃吉迪乌斯及西阿格里乌斯的军事势力与法兰克王权并存；“苏瓦松王国”是常见概称，不能据此画出已经精确核定的国境。':'486 年克洛维击败西阿格里乌斯后势力扩大；这个节点不能作为北高卢所有城市同日易主的证明。',change:'486 年改变北高卢力量对比；500 年高卢南方的西哥特王权仍然存在。',sources:['gregory5','gaul5']},
 {id:'burgundy5',parent:'gaul',name:'萨包迪亚与里昂方向',coords:[5.8,46],bounds:[[4,45],[7.5,47.5]],modern:'阿尔卑斯山西侧、日内瓦湖与里昂方向，联系今法国东部和瑞士西部。',parts:'萨包迪亚安置区与后来向里昂、罗讷河方向扩张的王权分开看；不是现代勃艮第行政区边界。里昂是参照城市，不代表 443 年安置中心就在里昂。',control:y=>y<443?'罗马高卢东南的地方社会；不能提前显示 443 年勃艮第集团在萨包迪亚的安置。':y<457?'约 443 年勃艮第集团被安置在萨包迪亚；后来的里昂王权范围不能倒推至此时。':'勃艮第势力向罗讷河方向扩大，与罗马地方精英及相邻王权互动；里昂与图卢兹属于不同政治中心。',change:'同一“勃艮第”名称跨越迁居和扩张阶段；早期莱茵河地区、萨包迪亚与后来里昂一带不可混成一张固定国土。',sources:['burgundy5','provence5']},
 {id:'gallaecia5',parent:'hispania',name:'加拉埃西亚：半岛西北',coords:[-7.6,42.2],bounds:[[-9.6,40.7],[-5.5,43.8]],modern:'今西班牙加利西亚与葡萄牙北部及邻近地区；古代加拉埃西亚比今天加利西亚的范围更广。',parts:'布拉加靠近大西洋方向，西北山地与南面的卢西塔尼亚分别理解；苏维汇活动区不是现代葡萄牙。',control:fifthSuevi,change:'409 年进入半岛、411 年地域分配、约 420 年汪达尔转向南方、456 年西哥特战争，须分段理解。',sources:['hydatius5','braga5']},
 {id:'tarraconensis5',parent:'hispania',name:'塔拉科与伊比利亚东北',coords:[1.1,41.4],bounds:[[-0.5,40],[3.3,43]],modern:'今西班牙东北海岸的塔拉戈纳及邻近腹地；仅以这里定位，不覆盖古代塔拉科行省全部范围。',parts:'塔拉科在地中海岸；加拉埃西亚在半岛另一侧。城市与内陆军队活动区的控制变化未必同步。',control:y=>y<472?'罗马行政传统与军队活动持续较久的东北地域；409 年进入半岛的诸集团不等于当年已建立塔拉科西哥特统治。':y===472?'塔拉戈纳市的历史说明将西哥特征服系于约 472 年；城市进入图卢兹王权体系，罗马城市制度仍有延续。':'塔拉科处在以图卢兹为中心的西哥特王权下；不是已迁往托莱多的六世纪王国阶段。',change:'约 472 年作为城市交接参考年；不把它扩大为全部塔拉科行省在同一天完成控制。',sources:['tarraco5','hydatius5']},
 {id:'carthage-region5',parent:'africa',name:'迦太基与阿非利加核心区',coords:[10.2,36.2],bounds:[[8.7,34.5],[11.3,37.4]],modern:'今突尼斯北部与东部沿海一带；以迦太基定位，古代阿非利加不是整个非洲。',parts:'迦太基港口联系意大利，南侧还有拜扎凯纳农业地域；镜头只帮助找位置，不充当行省界线。',control:fifthAfrica,change:'429 年渡海 → 439 年迦太基易手 → 442 年和约。海上军事行动不表示整个地中海成为陆地国土。',sources:['africaLate','procopius5','west5']},
 {id:'numidia5',parent:'africa',name:'努米底亚与希波海岸',coords:[7.2,36.2],bounds:[[5.5,34.5],[8.8,37.3]],modern:'今阿尔及利亚东北部、安纳巴（希波）及其腹地，位于迦太基以西。',parts:'希波是海岸城市，努米底亚还包括内陆社会；地理范围与汪达尔、罗马、地方集团的控制层次分开看。',control:y=>y<430?'罗马北非地域，429 年起受到汪达尔进入非洲的战争冲击。':y<=431?'希波遭围城，奥古斯丁于 430 年去世；围城与实际易手并非同一个时点。':y<439?'汪达尔逐渐控制希波周边，迦太基尚未在 439 年易手；不把全努米底亚画成控制程度一致的领土。':'北非战争及和约重划势力，海岸、内陆与更西边地方社会的处境不同；资料不足以逐年划出所有控制线。',change:'先比较希波和迦太基的不同经历，再观察更西的毛里塔尼亚；本条不把希波的事件推广到全部北非。',sources:['procopius5','africaLate','west5']},
];
export function fifthSubregionsAt(year:number,parents:Region300[]):Region300[]{
 if(year<=400||year>500)return [];
 return areas.map(a=>{
  const p=parents.find(p=>p.id===a.parent)!;
 const specific=a.control(year);
 const extra=a.id==='aquitaine5'||a.id==='tarraconensis5'?['westernKings5','hydatiusStudy5','jordanes5'] as const:a.id==='gallaecia5'?['westernKings5','hydatiusStudy5'] as const:a.id==='provence5'?['glycerius5'] as const:[];
 return {...p,...a,mapName:a.name.split('：')[0],polity:specific+(a.id==='tarraconensis5'&&year>=472?' '+fifthVisigoths(year):''),sources:[...new Set([...p.sources,...a.sources,...extra])],cities:Object.keys(fifthLocalCityRegions).filter(id=>fifthLocalCityRegions[id]===a.id),people:p.people,language:p.language};
 });
}
