import {earlyRegionAt,inEarly500} from './early-500-regions';
import {historicalTurningPoints} from './historical-chronology';
import type {AreaLabel} from '../greek/GreekMap';
export interface YearReadingPower {id:string;number:number;title:string;mapName:string;direction:string;where:string;remember:string;regions:string[]}
const power=(id:string,number:number,title:string,mapName:string,direction:string,where:string,remember:string,...regions:string[]):YearReadingPower=>({id,number,title,mapName,direction,where,remember,regions});
export function yearReadingAt(year:number){
 if(!inEarly500(year))return undefined;
 const franks=year<751?'法兰克王权（墨洛温王朝）':year<800?'法兰克王国（加洛林王朝）':'查理曼的法兰克帝国';
 const eastern=year<632?'萨珊波斯':year<651?'早期哈里发与萨珊波斯':year<661?'早期哈里发统治':year<750?'倭马亚哈里发国':'阿拔斯哈里发国';
 const italy=year<535?'意大利的东哥特王权':year<568?'东罗马战争与重建中的意大利':year<774?'伦巴第与东罗马的意大利':'法兰克、教皇与意大利地方权力';
 const iberia=year<711?'西哥特等半岛王权':year<756?'安达卢斯征服与北部地方王权':'科尔多瓦埃米尔国与北部王权';
 const africa=year<533?'汪达尔与北非地方社会':year===533?'北非征服战争与地方社会':year<698?'东罗马与北非地方权力':year<750?'倭马亚与北非地方权力':year<800?'阿拔斯与北非地方政权':'阿格拉布与马格里布地方政权';
 const powers=[
  power('franks',1,franks,year<751?'法兰克王权':year<800?'法兰克王国':'法兰克帝国','西欧','先找今天法国、比利时和莱茵河一带。',year<751?'王国曾分合；王位、宫相实权和今天的法国不是同一概念。':year<800?'751 年换成加洛林王朝；800 年的帝号还不能提前使用。':'800 年加冕取得帝号；地方王权、边疆战争和居民身份仍需分别看。','gaul','central'),
  power('east-rome',2,'东罗马帝国（拜占庭）','东罗马帝国','东地中海','先找海峡旁的君士坦丁堡，再看今土耳其与巴尔干方向。','西部罗马皇位终止后，东部帝国仍在。帝国范围随年代变化，不能一直沿用查士丁尼时代的版图。','anatolia','balkans','italy'),
  power('near-east',3,eastern,year<632?'萨珊波斯':year<651?'哈里发与萨珊':year<661?'早期哈里发':year<750?'倭马亚哈里发国':'阿拔斯哈里发国','东方','两河流域是底格里斯河、幼发拉底河一带；再向西看叙利亚与埃及。',year<632?'萨珊与东罗马相邻，战争、边地和各地控制需要按年展开。':year<651?'王朝、都城和地方控制的终止不是同一天；不能把全部东方一次涂成同一方。':year<750?'661 年形成倭马亚王朝，750 年换朝；当地居民和语言不会因此整体替换。':year<762?'750 年已换为阿拔斯，巴格达要到 762 年才建立。科尔多瓦另有自己的倭马亚分支。':'巴格达是阿拔斯的重要中心；承认哈里发名义权威不等于各地都由其直接控制。','mesopotamia','levant','egypt','caucasus'),
  power('italy',4,italy,year<535?'东哥特意大利':year<568?'意大利战争与重建':year<774?'意大利：伦巴第等':'意大利：多方权力','地中海中部','看向地中海伸出的靴形半岛，再辨认帕维亚、罗马和拉文纳。','北部王国、罗马教皇及东罗马或南部地方控制分开理解；半岛从来不是在每个节点都同时易主。','italy'),
  power('iberia',5,iberia,year<711?'伊比利亚诸王权':year<756?'安达卢斯与北部王权':'科尔多瓦与北部王权','欧洲西南','今天西班牙、葡萄牙所在的半岛；与高加索的“伊比利亚”区分。',year<711?'西哥特、苏维汇和其他地方权力的关系随年份变化，不沿用现代国界。':year<756?'711 年开始征服，不等于半岛全部地域同日改变统治。':'756 年是独立埃米尔国，929 年才称哈里发；北部诸权力也继续存在。','iberia'),
  power('africa',6,africa,'北非地方权力','地中海南岸','这里先看今突尼斯、阿尔及利亚与马格里布方向，隔海对照意大利。','北非不是一个固定帝国，埃及在另一组地域中阅读；迦太基失守与凯鲁万发展也不是同一事件。','africa','egypt'),
  power('islands',7,'不列颠与爱尔兰诸王权','不列颠与爱尔兰诸王权','欧洲西北','先找不列颠岛，再看它西面的爱尔兰和两侧海域。','本期没有统一的英国；麦西亚、威塞克斯等王权及爱尔兰地方社会分别阅读。','britain'),
  power('north',8,'北欧与波罗的海地方社会','北欧地方权力与聚落','欧洲北部','半岛、丹麦诸岛、瑞典湖区与波罗的海南岸彼此隔水相望。','贸易聚落、王权据点和工程不是同等独立国家；“维京”不代表统一帝国或同一种居民。','north'),
  power('east',9,year<701?'东欧地方社群与草原网络':'可萨与东欧地方社群',year<701?'东欧社群与草原网络':'可萨与东欧地方社群','黑海北方与东欧','把黑海北岸草原与更北的森林、河流和波罗的海东岸分开找。','这些地方不是一个国家；本期聚落和联系不能提前画成九世纪后的基辅罗斯。','east','caucasus'),
 ];
 const headline=year<568?'罗马西部秩序变化后，东罗马与西部诸王权并存。':year<632?'伦巴第进入意大利，法兰克、东罗马和萨珊分别延续。':year<635?'东方出现新的哈里发政治中心，东罗马与萨珊仍在。':year<651?'阿拉伯征服正在改变东地中海，各地交接需要分别看。':year<711?'萨珊王朝已经终结，东罗马与哈里发体系继续存在。':year<750?'安达卢斯形成，法兰克与东罗马各有自己的政治轨迹。':year<751?'东方换朝为阿拔斯，法兰克尚未换成加洛林王朝。':year<756?'法兰克进入加洛林王朝，安达卢斯的独立埃米尔国尚未建立。':year<774?'加洛林法兰克、东罗马与阿拔斯并存，科尔多瓦另有地方王权。':year<800?'法兰克取得伦巴第北部王国，东罗马和东方诸政权继续存在。':'查理曼取得西方帝号，东罗马仍在；欧洲并未统一。';
 const majorYears=[500,507,527,533,534,568,572,585,610,632,636,642,651,661,681,698,711,750,751,756,762,768,771,774,800,814,843];
 const changes=historicalTurningPoints.filter(e=>majorYears.includes(e.year));
 return {year,headline,powers,recent:changes.filter(e=>e.year<=year).slice(-1)[0],next:changes.find(e=>e.year>year)};
}
export function yearReadingLabels(year:number):AreaLabel[]{
 return yearReadingAt(year)?.powers.flatMap(p=>{const region=earlyRegionAt(p.regions[0],year);return region?[{id:'early500:'+region.id,name:`${p.number} · ${p.mapName}`,coords:region.coords,color:'#1967d2',minZoom:2.6,kind:'region' as const}]:[];})??[];
}
