import type {westernRegions} from './WesternEmpire';
// These are reading checkpoints, not interpolated annual sovereignty records.
const rows:Record<number,string[]>={
 395:['东部朝廷与首都所在地','东部主要统治地区，北界另核','东部主要统治地区','东部统治下的东方行省','东部统治与粮食供应地','东部海上交通空间','主要属西部，尚非再征服领地','主要属西部，尚非再征服领地'],
 565:['首都与欧洲门户','仍有帝国统治与边防压力','帝国的重要腹地','仍属帝国，东方边境有战争','仍属帝国','帝国的重要海上空间','再征服后控制大部，战乱破坏严重','再征服后以迦太基为统治中心'],
 600:['首都与海峡核心地区','重要城市仍属帝国，北部边防承受压力','帝国主要统治地区','尚属帝国，七世纪征服尚未发生','仍属帝国；不能提前套用阿拉伯统治','帝国的海上交通空间','与伦巴第诸领地交错：拉文纳、罗马等据点仍在','迦太基等沿海城市与设防据点仍属帝国'],
 650:['仍为帝国首都与海峡要地','斯拉夫定居等造成复杂控制格局','帝国重要防御腹地','大部分已失去，进入哈里发统治','已失去，进入哈里发统治','许多岛屿仍属帝国，海上争夺加剧','仅部分地区，不能视作统一控制','仍保有迦太基等地区，面临阿拉伯扩张'],
 700:['帝国仍以君士坦丁堡为中心','帝国据点与斯拉夫、保加利亚等势力交错','帝国核心防御地区，面临阿拉伯袭击','大部分已转入倭马亚统治','属于倭马亚统治范围，不再属东罗马','仍有重要岛屿与航道，海上控制有争夺','拉文纳等据点仍存；帕维亚属于伦巴第王国','七世纪末丧失迦太基；凯鲁万是另一处内陆基地'],
 800:['君士坦丁堡仍是东罗马都城，未与查理曼合并','帝国与保加利亚等势力并存，不能把整片巴尔干涂为帝国','帝国核心腹地，东部边区与阿拔斯交战','叙利亚与巴勒斯坦主体已不属东罗马','已不属东罗马，不能继续沿用六世纪粮仓版图','帝国重要海上交通空间；各岛须分别核对','拉文纳总督区已结束；南部及岛屿的控制须与加洛林、教皇领地分开','已不属东罗马，不能沿用查士丁尼再征服后的范围'],
 900:['帝国都城继续存在，与西方王国分别理解','保加利亚已接受基督教，但并未因此成为帝国领土','帝国核心腹地，东方边境仍需逐地核对','主体不属帝国，不能提前套用十世纪收复安条克后的状态','不属东罗马；当地基督徒的存在不等于帝国统治','海上据点与航道仍重要，岛屿控制不能用一个城市代表','北部意大利不属帝国；南部仍有帝国统治与军事活动，西西里正经历长期征服','不属帝国；凯鲁万所在地区与埃及也不能视作同一个行政区'],
 1025:['帝国首都与核心地带','征服保加利亚后的扩展格局','帝国控制广泛，东部边界另核','安条克等北部地区恢复；巴勒斯坦不属帝国','不属帝国','克里特已收复；各岛情况另核','仍有南意大利领地；西西里不属帝国','不属帝国'],
 1071:['帝国首都与核心地带','控制与周边势力关系复杂','曼齐刻尔特战败之年，不能视为全境已失','安条克等地与南方地区归属不同','不属帝国','仍有重要岛屿和海上交通','巴里陷落，南意大利主要统治据点终结','不属帝国'],
 1204:['按首都陷落后看：拉丁帝国控制首都','拉丁、伊庇鲁斯等势力分立','尼西亚等继承政权与突厥势力并存','不属统一东罗马，十字军与穆斯林政权并存','不属东罗马','进入拉丁与威尼斯等势力争夺的分割过程','不属东罗马','不属东罗马'],
 1261:['按复都后看：帝国恢复首都','帝国、伊庇鲁斯与拉丁等势力并存','西部仍有帝国领地，不能代表整半岛','不属帝国','不属帝国','帝国与威尼斯等势力分有岛屿','不属帝国','不属帝国'],
 1453:['按陷落后看：首都归奥斯曼','摩里亚等地仍有延续，非全区同日终结','奥斯曼等政权；特拉布宗仍存','不属首都帝国','不属首都帝国','岛屿分属多方，不能统一涂色','不属首都帝国','不属首都帝国'],
};
const ids=['thrace','balkans','anatolia','levant','egypt','aegean','east-italy','east-africa'];
export function easternRegionStatus(id:string,year:number){const index=ids.indexOf(id);return index<0?undefined:rows[year]?.[index];}
export const easternCheckpointYears=Object.keys(rows).map(Number);
export const easternSuccessors:(typeof westernRegions[number]&{period:string;from:number;to:number;source:string;locationSource:string})[]=[
 {id:'successor-latin',name:'拉丁帝国 · 君士坦丁堡',coords:[28.98,41.01],bounds:[[26,39],[30,43]],modern:'今土耳其伊斯坦布尔；扼守博斯普鲁斯海峡。',role:'1204 年占领首都的十字军政权，与尼西亚等政权争夺原帝国空间。',after:'1261 年尼西亚一方收复首都，拉丁帝国在君士坦丁堡的统治结束。',period:'1204—1261 年（首都统治）',from:1204,to:1260,cities:['byzantium'],cityNames:['君士坦丁堡'],source:'https://www.metmuseum.org/essays/byzantium-ca-330-1453',locationSource:'https://en.wikipedia.org/wiki/Constantinople'},
 {id:'successor-nicaea',name:'尼西亚帝国 · 尼西亚',coords:[29.72,40.43],bounds:[[27,38],[32,42]],modern:'尼西亚对应今土耳其伊兹尼克，在伊兹尼克湖东岸、海峡东南方向；不是尼科米底亚。',role:'小亚细亚西部的东罗马继承政权。尼西亚是重要皇权和教会中心，宫廷也使用其他驻地，不能把政治活动局限于一城。',after:'1261 年收复君士坦丁堡，延续为复都后的东罗马帝国，而不是被外敌灭亡。',period:'1204—1261 年（形成日期存在不同分期）',from:1204,to:1260,cities:[],cityNames:[],source:'https://en.wikipedia.org/wiki/Empire_of_Nicaea',locationSource:'https://whc.unesco.org/en/tentativelists/5900/'},
 {id:'successor-epirus',name:'伊庇鲁斯 · 阿尔塔',coords:[20.987,39.158],bounds:[[19,38],[23,41]],modern:'阿尔塔在今希腊西北部，靠近爱奥尼亚海；位于君士坦丁堡的西南方。',role:'1204 年后以希腊西北为基础的继承政权。阿尔塔是重要中心；“专制公国”是历史称呼，不是对现代政治制度的评价。',after:'此处展示 1204—1261 年与首都争夺相关的阶段；1261 年后仍延续，并非随复都自动并入或终结。',period:'本卡覆盖 1204—1261 年，非政权完整寿命',from:1204,to:1261,cities:[],cityNames:[],source:'https://www.metmuseum.org/essays/byzantium-ca-330-1453',locationSource:'https://www.religiousgreece.gr/en/destinations/arta'},
 {id:'successor-trebizond',name:'特拉布宗帝国 · 特拉布宗',coords:[39.73,41.005],bounds:[[37,39],[42,42]],modern:'今土耳其特拉布宗，位于黑海南岸偏东；与尼西亚远隔小亚细亚北部。',role:'1204 年兴起的科穆宁家族政权，拥有独立的皇权主张。它与尼西亚不是同一个政权。',after:'1261 年复都后仍保持独立，1453 年首都帝国终结后仍存续，到 1461 年被奥斯曼征服。',period:'1204—1461 年',from:1204,to:1460,cities:[],cityNames:[],source:'https://en.wikipedia.org/wiki/Empire_of_Trebizond',locationSource:'https://en.wikipedia.org/wiki/Trabzon'},
];
export const easternTopicRegions=[...easternSuccessors];
