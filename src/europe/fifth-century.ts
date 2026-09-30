import type {courseSources} from './course-sources';
import {lateWestAt} from './fifth-century-rulers';
export type FifthSource=keyof typeof courseSources;
export const inFifthCentury=(year:number)=>year>=400&&year<=500;
export interface FifthEvent {year:number;title:string;text:string;places:string[];regions:string[];source:FifthSource;moreSources?:FifthSource[]}
const e=(year:number,title:string,text:string,places:string[],regions:string[],source:FifthSource):FifthEvent=>({year,title,text,places,regions,source});
export const fifthEvents:FifthEvent[]=[
 e(461,'马约里安失位；塞维鲁斯被拥立','马约里安被推翻并遇害，利比乌斯·塞维鲁斯随后在拉文纳被拥立。东方不承认新皇帝；北高卢的罗马军事势力也没有因此自动服从意大利朝廷。',['ravenna','rome','soissons5'],['italy','gaul'],'severus5'),
 e(465,'西部皇位空缺开始','利比乌斯·塞维鲁斯去世；465—467 年西部没有在位皇帝，里西默的军事权力与地方行政仍然存在。不是西部所有地域一起成为无主之地。',['ravenna','rome'],['italy'],'severus5'),
 e(467,'安特米乌斯取得西部皇位','东方利奥一世支持安特米乌斯进入意大利并成为西部皇帝。两部朝廷继续互动；安特米乌斯的皇帝头衔不代表已恢复北非或统一高卢。',['rome','ravenna','byzantium'],['italy','thrace'],'anthemius5'),
 e(473,'格利凯里乌斯在拉文纳被拥立','贡多巴德支持格利凯里乌斯取得西部皇位，但东方利奥一世没有承认他；次年尼波斯进入意大利，再次改变皇位安排。',['ravenna','salona','byzantium'],['italy','pannonia','thrace'],'glycerius5'),
 e(477,'迦太基从盖萨里克到胡内里克','盖萨里克去世，胡内里克继承汪达尔王权。北非王廷、奥多亚克的意大利和尼波斯的达尔马提亚皇帝主张仍是不同政治中心。',['carthage','ravenna','salona'],['africa','italy','pannonia'],'vandalKings5'),
 e(411,'伊比利亚诸集团分占地域','希达提乌斯记述苏维汇与汪达尔在加拉埃西亚、阿兰在卢西塔尼亚及迦太基行省、另一支汪达尔在贝提卡活动。这不是罗马正式承认的精确分界图；伊比利亚的迦太基行省也不是北非迦太基。',['braga5','emerita','gades'],['hispania'],'hydatius5'),
 e(416,'哥特军队介入半岛战争','瓦利亚与罗马方面达成安排后，哥特军队在伊比利亚打击阿兰与汪达尔集团；416—418 年的军事行动与之后返回高卢安置分开理解。',['emerita','gades','toulouse'],['hispania','gaul'],'hydatius5'),
 e(458,'马约里安重建南高卢影响','马约里安在南高卢活动，西哥特对阿尔勒的压力受到遏制；这说明图卢兹与阿尔勒此时不能涂成同一个已稳定统一的王国。',['arles','toulouse'],['gaul'],'majorian5'),
 e(472,'塔拉科转入西哥特体系','塔拉戈纳市的历史说明把征服系于约 472 年。东北海岸城市加入图卢兹王权，不等于全半岛在这年同时统一，西北苏维汇仍延续。',['tarraco','toulouse','braga5'],['hispania','gaul'],'tarraco5'),
 e(400,'两个罗马朝廷与萨珊邻国','西部宫廷仍在米兰，东方在君士坦丁堡；先从这一年的组成地域看随后各地不同步的变化。',['milan','byzantium','ctesiphon'],['italy','thrace','persia'],'notitia400'),
 e(402,'西部宫廷迁驻拉文纳','阿拉里克战争背景下，霍诺留从米兰迁驻拉文纳。宫廷搬迁不等于罗马城或米兰脱离帝国。',['milan','ravenna'],['italy'],'honorius400'),
 e(406,'莱茵河防线遭突破','汪达尔、苏维汇、阿兰等集团进入高卢。常用纪年为 406 年末，具体渡河年代存在争论；不能据此把整个高卢同日改成一个国家。',['mainz','trier'],['gaul'],'honorius400'),
 e(407,'君士坦丁三世从不列颠到高卢','军队拥立的皇帝渡海进入高卢，阿尔勒成为争夺中心；不列颠与大陆的军政联系进一步改变。',['london','arles'],['britain','gaul'],'honorius400'),
 e(408,'斯提利科遇害；东方皇位交接','西部军事权力重组。东方阿卡狄乌斯去世，狄奥多西二世独掌皇位；两部的变化应分别观察。',['ravenna','byzantium'],['italy','thrace'],'theo5'),
 e(409,'集团进入伊比利亚','苏维汇、汪达尔和阿兰进入半岛，之后逐步形成不同活动区。今天西班牙、葡萄牙的国界不能用来划分这些集团。',['braga5','emerita','tarraco'],['hispania'],'hydatius5'),
 e(410,'罗马城被洗劫；不列颠统治退出','阿拉里克攻入罗马，不等于整个西部帝国此时灭亡。不列颠约在这一阶段脱离常规帝国行政；不是岛上罗马文化一夜消失。',['rome','london'],['italy','britain'],'honorius400'),
 e(413,'君士坦丁堡陆墙建设','狄奥多西时代陆墙的重要建设阶段完成。城墙防卫首都，不能代替整个巴尔干地区的防线。',['byzantium'],['thrace'],'theo5'),
 e(418,'西哥特集团在阿基坦安置','罗马与西哥特的安置安排使高卢西南形成新的权力中心；土地、税收与军队关系不能简化为立即出现现代国境。',['toulouse','arles'],['gaul'],'honorius400'),
 e(421,'罗马东方与萨珊交战','伊嗣俟一世去世前后两国关系转坏。战争与随后的和议，需和尼西比斯早已归萨珊这一事实分开看。',['nisibis','edessa','ctesiphon'],['mesopotamia','persia'],'theo5'),
 e(422,'东方与萨珊议和','两国恢复和平安排；五世纪的大部分时间并非持续全面战争。边区城市与跨境宗教联系仍然存在。',['edessa','nisibis'],['mesopotamia'],'theo5'),
 e(425,'瓦伦提尼安三世成为西部皇帝','东方干预西部皇位争夺，普拉西狄娅与幼帝回到意大利；两部朝廷并未断绝政治联系。',['ravenna','rome','byzantium'],['italy','thrace'],'west5'),
 e(429,'汪达尔集团渡海进入北非','盖萨里克的集团从伊比利亚进入非洲。渡海是过程起点，不能把 429 年写成已经夺取迦太基。',['gades','hippo','carthage'],['hispania','africa'],'africaLate'),
 e(430,'希波围城与奥古斯丁去世','希波位于迦太基以西。围城、居民遭遇与主教去世属于同一战争背景；439 年迦太基易手是另一个节点。',['hippo','carthage'],['africa'],'africaLate'),
 e(431,'以弗所会议','会议在小亚细亚西岸，以弗所、君士坦丁堡与亚历山大里亚的教会联系由此更易定位；教义立场不等于国家边界。',['ephesus','byzantium','alexandria'],['asia','egypt'],'theo5'),
 e(434,'阿提拉与布莱达时代开始','匈人联盟的领导发生变化；多来源的联盟不能视为全体居民同一族群，王廷位置也不画成已考定的精确点。',['sirmium','byzantium'],['pannonia','thrace'],'jordanes5'),
 e(439,'迦太基转归汪达尔','北非港口与财政资源的易手显著改变西部处境；埃及、昔兰尼加仍属东部体系。',['carthage','hippo','alexandria'],['africa','egypt'],'africaLate'),
 e(441,'匈人战争冲击巴尔干','多瑙河城市和巴尔干内陆遭攻击。攻陷、驻军与长期行政控制是不同层次，不能把每处战场都当成新国土。',['sirmium','naissus','byzantium'],['pannonia','thrace'],'theo5'),
 e(442,'北非和约','罗马与汪达尔的安排承认新的北非格局；不能把和约写成罗马已收复迦太基。',['carthage'],['africa'],'procopius5'),
 e(443,'勃艮第集团重新安置','约在这一年，勃艮第集团被安置到阿尔卑斯山西侧的萨包迪亚地区；日后的里昂王权中心不能全部倒推到安置第一年。',['lyon'],['gaul'],'burgundy5'),
 e(447,'巴尔干危机与首都防卫','匈人战争继续压迫东方，首都防御与巴尔干内陆受到的破坏不同。避免用一个色块抹平城市间的差别。',['byzantium','naissus','hadrianople'],['thrace'],'theo5'),
 e(450,'东方从狄奥多西二世到马尔西安','东方皇位交接；西部仍由瓦伦提尼安三世在位。东西部不因同属罗马传统就具有相同的继承时间。',['byzantium','ravenna'],['thrace','italy'],'theo5'),
 e(451,'高卢会战与迦克墩会议','阿提拉进入高卢，罗马与西哥特等军队联合抵抗；卡塔劳努姆会战精确地点有争论，地图只用奥尔良定位战役进程。迦克墩会议则在海峡亚洲岸召开。',['orleans5','toulouse','chalcedon5'],['gaul','asia'],'jordanes5'),
 e(452,'阿提拉进入北意大利','阿奎莱亚及波河平原成为战争区域；这不是建立一个持久统治整个意大利的匈人国家。',['aquileia','milan','rome'],['italy'],'jordanes5'),
 e(453,'阿提拉去世','首领去世后联盟内部重组。不能继续把阿提拉生前的势力范围当作之后每年的固定疆界。',['sirmium'],['pannonia'],'jordanesEnd5'),
 e(454,'埃提乌斯遇害与匈人联盟瓦解','西部军事中枢失去埃提乌斯；尼达奥战役通常定在约 454 年，具体地点未定，故不标精确战场。',['ravenna','sirmium'],['italy','pannonia'],'jordanesEnd5'),
 e(455,'西部皇位危机与汪达尔洗劫罗马','瓦伦提尼安三世遇害后皇位快速更迭。汪达尔船队袭击罗马，洗劫不等于将整个意大利永久并入北非王国。',['rome','carthage'],['italy','africa'],'procopius5'),
 e(456,'苏维汇王权受挫','西哥特对苏维汇的战争改变伊比利亚格局，但西北的苏维汇王国没有就此彻底消失。',['braga5','emerita'],['hispania'],'jordanes5'),
 e(457,'东方利奥一世即位','东方仍有持续运作的宫廷和帝国机构；西部马约里安等试图恢复控制，两边的政治条件已明显不同。',['byzantium','ravenna'],['thrace','italy'],'leo5'),
 e(468,'罗马远征汪达尔失败','东西部组织的北非远征失败，打击财政与军事资源；不能在地图上将北非涂成已被收复。',['carthage','byzantium','ravenna'],['africa','italy'],'leo5'),
 e(474,'芝诺即位与西部尼波斯','东方利奥一世、利奥二世和芝诺先后交接；尼波斯进入意大利，东西部仍通过皇位承认发生联系。',['byzantium','ravenna','salona'],['thrace','italy','pannonia'],'zeno5'),
 e(475,'两部各自出现皇位争夺','芝诺离开首都，巴西利斯库斯掌权；西部尼波斯退到达尔马提亚，罗慕路斯在意大利被拥立。',['byzantium','ravenna','salona'],['thrace','italy','pannonia'],'zeno5'),
 e(476,'意大利停止设立西部皇帝','奥多亚克废黜罗慕路斯并掌握意大利。尼波斯在达尔马提亚仍被东方承认为皇帝，直到 480 年；罗马居民和行政传统并未随年号消失。',['ravenna','rome','salona'],['italy','pannonia'],'endWest5'),
 e(480,'尼波斯去世','达尔马提亚的皇帝主张结束。476 与 480 回答的不是完全相同的问题：意大利皇位和被承认的西部皇帝需要分开。',['salona','ravenna'],['pannonia','italy'],'zeno5'),
 e(482,'芝诺发布联合信条','试图协调基督教教义分歧。亚历山大里亚、安条克、罗马与君士坦丁堡的宗教关系不等于四个独立国家。',['byzantium','alexandria','antioch','rome'],['egypt','levant'],'zeno5'),
 e(484,'萨珊东境受挫','卑路斯在与嚈哒的战争中死亡，波斯朝局随之变化；这是伊朗高原以东的战争背景，泰西封只作王廷入口，非战场。',['ctesiphon'],['persia'],'sasanianDynasty4'),
 e(486,'克洛维击败西阿格里乌斯','苏瓦松附近的战争结束北高卢一支罗马军事政权；不意味着整个高卢或整个西哥特王国已被克洛维征服。',['soissons5','tournai','paris'],['gaul'],'gregory5'),
 e(488,'狄奥多里克转向意大利；卡瓦德即位','芝诺推动狄奥多里克前往意大利，之后与奥多亚克交战；萨珊同时进入卡瓦德一世的统治阶段。',['ravenna','byzantium','ctesiphon'],['italy','persia'],'zeno5'),
 e(491,'阿纳斯塔修斯继位','东方皇权延续。此时意大利仍在狄奥多里克与奥多亚克的战争中，不能提前显示 493 年以后的稳定格局。',['byzantium','ravenna'],['thrace','italy'],'zeno5'),
 e(493,'狄奥多里克控制拉文纳','奥多亚克死后，东哥特王权成为意大利政治中心；原有罗马行政、城市居民及拉丁文化继续存在。',['ravenna','rome','milan'],['italy'],'jordanesEnd5'),
 e(496,'世纪末的改宗与王位争夺','克洛维受洗常被传统叙事系于约 496 年，实际年代有争论，不把全体法兰克居民标成同日改宗。萨珊卡瓦德被废，贾马斯普掌权。',['tournai','ctesiphon'],['gaul','persia'],'kawad5'),
 e(498,'卡瓦德复位','卡瓦德一世恢复王位；500 年不能继续显示贾马斯普，也不能把 502 年对罗马战争提前。',['ctesiphon','nisibis'],['persia','mesopotamia'],'kawad5'),
 e(500,'地中海多政权并存','意大利东哥特、高卢西哥特与法兰克、北非汪达尔和东方罗马并存。西哥特的图卢兹中心仍在；507 年的转折尚未发生。',['ravenna','toulouse','tournai','carthage','byzantium'],['italy','gaul','africa','thrace'],'gaul5'),
];
for(const event of fifthEvents){
 if(event.year===455){event.text+=' 同年依次涉及瓦伦提尼安三世、佩特罗尼乌斯·马克西穆斯与阿维图斯。';event.moreSources=['avitus5','west5'];}
 if(event.year===456){event.text+=' 意大利同时发生阿维图斯失位；伊比利亚战事与意大利皇位分开看。';event.moreSources=['avitus5'];}
 if(event.year===472){event.title+='；罗马皇位内战';event.text+=' 罗马城同时经历安特米乌斯与里西默内战及奥利布里乌斯争位，不把这一年简化为一位皇帝统治全年。';event.places.push('rome');event.regions.push('italy');event.moreSources=['anthemius5','olybrius5'];}
 if(event.year===474)event.moreSources=['glycerius5'];
 if(event.year===484){event.title+='；迦太基国王交接';event.text+=' 北非胡内里克去世、贡塔蒙德继位；与萨珊战争分别定位。';event.places.push('carthage');event.regions.push('africa');event.moreSources=['vandalKings5'];}
 if(event.year===496){event.text+=' 北非同年贡塔蒙德去世，特拉萨蒙德继位，汪达尔王权继续存在。';event.places.push('carthage');event.regions.push('africa');}
}
fifthEvents.sort((a,b)=>a.year-b.year);
for(const event of fifthEvents){if(event.year===410)event.moreSources=['britain5'];if(event.year===451)event.moreSources=['chalcedon5','orleans5'];if(event.year===454)event.moreSources=['west5'];if(event.year===496)event.moreSources=['burgundy5','gregory5','vandalKings5'];}
export const fifthPhaseAt=(year:number)=>{if(!inFifthCentury(year))return undefined;const i=fifthEvents.map(e=>e.year<=year).lastIndexOf(true);return {from:fifthEvents[i].year,to:(fifthEvents[i+1]?.year??501)-1,title:fifthEvents[i].title}};
export function fifthEast(year:number){return year<402?'阿卡狄乌斯在位，君士坦丁堡是东方宫廷。':year<408?'阿卡狄乌斯；狄奥多西二世自 402 年起为共治皇帝。':year===408?'阿卡狄乌斯去世，狄奥多西二世独掌东方。':year<450?'狄奥多西二世在位；君士坦丁堡宫廷与巴尔干、埃及、小亚细亚相联系。':year===450?'狄奥多西二世去世，马尔西安继位。':year<457?'马尔西安在位；东方罗马继续运作。':year===457?'马尔西安去世，利奥一世继位。':year<474?'利奥一世在位；巴尔干军队与北非远征影响朝政。':year===474?'利奥一世、利奥二世、芝诺在本年发生皇位交接与共治。':year===475?'芝诺离开君士坦丁堡，巴西利斯库斯取得皇位。':year===476?'巴西利斯库斯失位，芝诺回到君士坦丁堡。':year<491?'芝诺在位；东方并未随意大利的西部皇位终止而灭亡。':year===491?'芝诺去世，阿纳斯塔修斯一世继位。':'阿纳斯塔修斯一世在位（491—518）；帝国重心仍在君士坦丁堡。'}
export function fifthWest(year:number){return year<402?'霍诺留在位，西部宫廷主要在米兰。':year<423?'霍诺留在位，宫廷主要在拉文纳；高卢与伊比利亚的实际控制需逐地查看。':year<425?'霍诺留去世后的皇位争夺，约翰内斯掌权；东方支持瓦伦提尼安一系。':year===425?'东方出兵后，瓦伦提尼安三世成为西部皇帝。':year<455?'瓦伦提尼安三世在位；普拉西狄娅、埃提乌斯与地方军队的影响不能等同于皇帝亲自统治每一地域。':year<=474?lateWestAt(year):year===475?'尼波斯退往达尔马提亚，罗慕路斯在意大利被拥立。':year===476?'奥多亚克废黜罗慕路斯；尼波斯在达尔马提亚继续提出皇帝主张。':year<480?'奥多亚克统治意大利；尼波斯仍在达尔马提亚并被东方承认为西部皇帝。':year<489?'奥多亚克统治意大利；480 年尼波斯去世后的地区格局已不同于罗马西部朝廷时代。':year<493?'狄奥多里克与奥多亚克争夺意大利；拉文纳围城期间，不能把整个半岛视为单一稳定控制区。':'狄奥多里克的东哥特王权控制意大利，罗马行政和城市社会延续。'}
export function fifthPersia(year:number){return year<420?'伊嗣俟一世（399—约 420）':year<=421?'伊嗣俟一世到巴赫拉姆五世的交接（约 420／421）':year<438?'巴赫拉姆五世（约 420／421—438）':year===438?'巴赫拉姆五世与伊嗣俟二世交接':year<457?'伊嗣俟二世（438—457）':year<=459?'霍尔米兹德三世与卑路斯争位（457—459 前后）':year<484?'卑路斯（约 459—484）':year===484?'卑路斯战死，巴拉什继位':year<488?'巴拉什（484—488）':year===488?'巴拉什到卡瓦德一世的交接':year<496?'卡瓦德一世第一次统治（488—496）':year===496?'卡瓦德一世被废，贾马斯普掌权':year<498?'贾马斯普（496—498）':year===498?'卡瓦德一世复位':'卡瓦德一世第二次统治（498—531）'}

export const fifthReading=[{chapter:125,pages:[1049,1057],note:'教义争论与东方城市'},{chapter:128,pages:[1084,1092],note:'意大利与罗马城的危机'},{chapter:129,pages:[1092,1101],note:'410 年城破与帝国的区别'},{chapter:131,pages:[1108,1115],note:'西部朝廷如何走向终止'},{chapter:132,pages:[1115,1123],note:'拉文纳的不同统治时期'},{chapter:133,pages:[1123,1130],note:'后继王国与地方社会'},{chapter:136,pages:[1144,1151],note:'法兰克人与北高卢'},{chapter:138,pages:[1159,1169],note:'克洛维的扩张与改宗'}];
