import {fourthRegionsAt} from './fourth-century';
import {fifthSubregionsAt} from './fifth-century-subregions';
import type {Region300} from './roman-300-regions';
import {fifthEast,fifthWest,fifthPersia,fifthEvents,type FifthSource} from './fifth-century';
export const fifthCityRegions:Record<string,string>={
 milan:'italy',rome:'italy',ravenna:'italy',ostia:'italy',aquileia:'italy',
 trier:'gaul',arles:'gaul',toulouse:'gaul',tournai:'gaul',paris:'gaul',lyon:'gaul',massilia:'gaul',mainz:'gaul',orleans5:'gaul',soissons5:'gaul',
 london:'britain',york:'britain',braga5:'hispania',emerita:'hispania',tarraco:'hispania',gades:'hispania',
 carthage:'africa',hippo:'africa',lepcis:'tripolitania400',cyrene:'cyrenaica400',alexandria:'egypt',
 byzantium:'thrace',hadrianople:'thrace',naissus:'thrace',thessaloniki:'greece',athens:'greece',
 ephesus:'asia',nicaea:'asia',nicomedia:'asia',chalcedon5:'asia',antioch:'levant',jerusalem:'levant',
 edessa:'mesopotamia',amida:'mesopotamia',nisibis:'mesopotamia',ctesiphon:'persia',sirmium:'pannonia',salona:'pannonia',
};
const westSocial='罗马时代的地方居民、土地所有者、农民、城市手工业者和教会社群继续生活；新的军事集团、统治家族与迁居者加入其中。政权易手、军事驻扎与全体居民身份变化不是同一件事。';
const eastSocial='城镇居民、乡村社群、军队和教会存在不同利益与身份；希腊语公共文化、罗马政治认同与地方传统可以并存。战争影响因地而异，不把攻城直接当作全部人口被替换。';
const societies:Record<string,[string,string]>={
 italy:[westSocial,'拉丁语行政、法律与教会传统延续；哥特军事集团的语言和宗教背景不代表整个意大利改说哥特语。'],
 gaul:[westSocial,'拉丁书写及地方口语、各迁入集团的语言并存；高卢—罗马与法兰克等身份不是现代国籍，也不提供人口比例。'],
 hispania:[westSocial,'拉丁公共书写与地方语言背景延续；苏维汇和哥特统治集团的语言不能据国界推广至所有居民。'],
 britain:['罗马—不列颠地方社会持续重组，来自大陆的迁居者与当地社群发生多种互动。定居扩展不等于一次迁徙就替换整个岛的人口。','不列颠语言、拉丁文化遗留与逐渐扩展的日耳曼语言环境并存；五世纪还不能画出统一英格兰的语言国界。'],
 africa:[westSocial+' 北非地方社群与汪达尔王权、不同基督教团体的关系需要分别看待。','拉丁语文化继续存在，布匿和其他北非语言传统具有地域差异；王权信仰不等于所有居民信仰。'],
 egypt:['埃及地方居民、希腊文化城市社群、犹太人及不同基督教社群并存，主教之间的争论不能概括全部居民。','希腊语与埃及语、科普特语传统交错；教会立场与语言之间不能直接画等号。'],
 mesopotamia:['城市与边境乡村、商旅和不同宗教社群跨越罗马—萨珊边界发生联系。尼西比斯与埃德萨虽不同属一个政权，文化联系仍延续。','阿拉米语的叙利亚语书写传统重要，与希腊语、伊朗语言及帝国行政接触；不以国界画单一语言区。'],
 persia:['王廷、地方贵族、城镇与农业社会包含不同宗教和语言群体；两河居民不因受伊朗王朝统治就都成为同一血缘的波斯人。','中古波斯语具有王朝背景；两河的阿拉米语和叙利亚语传统延续，不能用今日伊朗或伊拉克语言分布回填。'],
 pannonia:['罗马地方社会与匈人联盟、哥特及格皮德等军事集团先后互动；匈人联盟瓦解后，各支集团重新组织。','拉丁军政文化、地方语言和迁居集团语言接触。记录稀疏，不给出单一族群或语言比例。'],
};
function control(id:string,y:number):string{
 if(id==='italy')return fifthWest(y);
 if(id==='gaul')return y<406?'罗马西部的高卢；莱茵河边防与地方军队仍是重要政治力量。':y<418?'渡河集团、皇位争夺与罗马地方军政并存，不能把整个高卢判给一位首领。':y<443?'高卢西南有西哥特安置区，其他地方仍有罗马军政与不同集团；图卢兹不代表整个高卢。':y<476?'西哥特、勃艮第、法兰克和罗马军事势力分处不同地区；里昂、图卢兹、阿尔勒的归属并不同步。':y<486?'高卢南部的西哥特、东南勃艮第及北部法兰克等权力并存；西阿格里乌斯仍在北高卢掌握一支罗马军事政权。':'克洛维战胜西阿格里乌斯后的北高卢，与南部西哥特、东南勃艮第王权并存；507 年西哥特大败尚未发生。';
 if(id==='hispania')return y<409?'罗马西部的伊比利亚行省空间。':y<418?'409 年进入的苏维汇、汪达尔、阿兰等集团与罗马地方行政并存；西哥特随后参与罗马的军事行动。':y<429?'西哥特干预、苏维汇西北据点与汪达尔等活动区并存，罗马控制在各地程度不同。':y<456?'汪达尔主力渡海后，苏维汇扩张与罗马、西哥特军事活动交织；半岛不是一个统一王国。':'西哥特势力扩大，苏维汇仍在西北延续。北部与地方社会有不同处境，不能把整个半岛同年涂成完全统一的西哥特国土。';
 if(id==='britain')return y<407?'处于罗马西部体系内，但军队与帝国中心的联系已不稳定。':y<410?'军队拥立君士坦丁三世并渡海进入高卢；岛内权力与防卫安排正在变化。':'约 410 年后，常规罗马帝国统治退出，地方权力与大陆迁居集团形成多样格局；此时尚无统一英格兰王国。';
 if(id==='africa')return y<429?'罗马西部的北非核心行省和港口；迦太基、希波仍处于罗马体系。':y<439?'汪达尔进入北非并扩张，希波经历围城及随后易手；迦太基直到 439 年才被夺取，不能合并两城的时间。':y<442?'迦太基已归汪达尔，罗马在其他北非地域的控制与和议继续变化。':'迦太基是汪达尔王国中心，内陆及更西侧有不同地方势力；这里不代表整个非洲北岸都被同样控制。';
 if(id==='tripolitania400')return y<439?'五世纪前期处在罗马西部北非行省空间。':'汪达尔扩张影响的黎波里塔尼亚，罗马控制与地方社会逐渐重组；本图尚未核定沿岸每座城市的具体交接年，不能据 439 年迦太基易手推定这里同日易手。';
 if(id==='mesopotamia')return '尼西比斯自 363 年起属萨珊；埃德萨、阿米达仍在罗马东方边区。421—422 年及 440 年前后的战争没有把这些城市合成同一政权；502 年战争尚未发生。';
 if(id==='persia')return '萨珊帝国：'+fifthPersia(y)+'。王廷与两河、伊朗高原相联系，东境战争不等于罗马已攻占泰西封。';
 if(id==='pannonia')return y<434?'潘诺尼亚的罗马控制逐步衰退，多种军事集团活动；亚得里亚海岸达尔马提亚应另看。':y<454?'多瑙河中游有匈人联盟及其附属、邻近集团；不能把达尔马提亚沿海和每座旧罗马城市都当成统一匈人行政区。':y<475?'匈人联盟瓦解后，哥特、格皮德等集团与罗马势力重组；沿海达尔马提亚有自己的军政中心。':y<=480?'尼波斯在达尔马提亚延续西部皇帝主张；多瑙河内陆另有哥特、格皮德等势力，不能用同一颜色代替这些差异。':'尼波斯死后达尔马提亚与意大利王权相联系；多瑙河内陆的控制另有格皮德等集团，不整体归入同一政权。';
 return '罗马东方的地域空间。'+fifthEast(y)+(id==='thrace'?' 巴尔干遭受匈人及哥特军队冲击，攻击范围不等于首都或全部地区易主。':'');
}
export function fifthRegionsAt(year:number):Region300[]{
 if(year<=400||year>500)return [];
 const ids=new Set(Object.values(fifthCityRegions));
 const parents=fourthRegionsAt(400).filter(r=>ids.has(r.id)).map(r=>{
  const social=societies[r.id==='tripolitania400'?'africa':r.id]??[eastSocial,r.id==='levant'?'希腊语与叙利亚语、阿拉米语等地方传统并存；政治、语言、教义边界并不重合。':'希腊语公共文化、拉丁帝国制度及地方语言传统并存；未收录逐城比例。'];
  const sources:FifthSource[]=r.id==='persia'?['sasanianDynasty4','kawad5']:r.id==='britain'?['britain5']:r.id==='hispania'?['hydatius5','tarraco5']:r.id==='gaul'?['gaul5','gregory5']:r.id==='africa'||r.id==='tripolitania400'?['africaLate','procopius5']:r.id==='italy'?['honorius400','endWest5','jordanesEnd5']:r.id==='pannonia'?['jordanesEnd5','zeno5']:['theo5','leo5','zeno5'];
  const recent=fifthEvents.filter(e=>e.year<=year&&e.regions.includes(r.id)).slice(-3);
  const name=r.id==='britain'&&year>=410?'不列颠：罗马统治退出之后':r.id==='africa'&&year>=439?'迦太基与汪达尔北非':r.id==='tripolitania400'?'的黎波里塔尼亚':r.name;
  return {...r,name,mapName:name.split('：')[0],parent:undefined,polity:control(r.id,year),people:social[0],language:social[1],parts:'地理定位：'+r.modern+' 下列城市用于比较地域内部及相邻通道；这是地理分组，不是单一国家的省界。',cities:Object.keys(fifthCityRegions).filter(id=>fifthCityRegions[id]===r.id),sources,change:recent.map(e=>`${e.year} 年：${e.title}。${e.text}`).join(' ')||'本世纪本地域的精细地方年表仍待补充。'};
 });
 return [...parents,...fifthSubregionsAt(year,parents)];
}
