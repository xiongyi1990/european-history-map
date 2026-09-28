import {roman300Regions,cityRegions300,type Region300} from './roman-300-regions';
import type {ReadingReference,courseSources} from './course-sources';
import type {Coordinate} from '../greek/battles';
type Source=keyof typeof courseSources;
export const inFourthCentury=(year:number)=>year>=300&&year<=400;
export interface CenturyPhase {from:number;to:number;title:string;west:string;east:string;source:Source}
const phase=(from:number,to:number,title:string,west:string,east:string,source:Source='emperorIndex4'):CenturyPhase=>({from,to,title,west,east,source});
// Annual summaries describe the transition within boundary years, not a fictitious January 1 snapshot.
export const fourthPhases:CenturyPhase[]=[
 phase(300,304,'第一轮四帝共治','马克西米安与君士坦提乌斯一世分担西部事务。','戴克里先与伽列里乌斯分担东方和巴尔干事务。','tetrarchy300'),
 phase(305,305,'两位正帝退位','马克西米安退位；君士坦提乌斯升为正帝，塞维鲁成为副帝。','戴克里先退位；伽列里乌斯升为正帝，马克西米努斯·戴亚成为副帝。','tetrarchy300'),
 phase(306,311,'共治体系陷入争位','君士坦丁在约克被拥立；马克森提乌斯控制意大利。塞维鲁、马克西米安先后退出争位；北非也曾出现亚历山大的反叛。','伽列里乌斯、马克西米努斯·戴亚及 308 年受立的李锡尼先后并存；311 年伽列里乌斯去世。','tetrarchy300'),
 phase(312,312,'君士坦丁取得罗马','君士坦丁击败马克森提乌斯，意大利转入其控制。','李锡尼和马克西米努斯·戴亚仍为对手；尚未完成全帝国统一。','constantine4'),
 phase(313,315,'君士坦丁与李锡尼','君士坦丁掌握西部。','李锡尼在 313 年击败马克西米努斯·戴亚，控制东方。','constantine4'),
 phase(316,323,'两位皇帝的内战与停战','316／317 年内战后，君士坦丁取得更多巴尔干地区。','李锡尼保有色雷斯及东方；具体和议年代存在 314 与 316 等讨论，本图采用 316／317 年叙述。','constantine4'),
 phase(324,336,'君士坦丁统一帝国','324 年击败李锡尼后，西部和东方同归君士坦丁一世。','330 年君士坦丁堡举行新都落成仪式；不是到 395 年才有这座都城。','constantine4'),
 phase(337,339,'君士坦丁诸子分掌','337 年君士坦丁去世后，君士坦丁二世、君士坦斯在西部及中部各掌区域。','君士坦提乌斯二世负责东方；这是同一帝国的王朝分掌。','constantius4'),
 phase(340,349,'君士坦斯与君士坦提乌斯二世','340 年君士坦丁二世战死，君士坦斯控制西部。','君士坦提乌斯二世统治东方，与萨珊持续交战。','constantius4'),
 phase(350,352,'马格嫩提乌斯争位','350 年君士坦斯遇害，马格嫩提乌斯控制西部大片地区；351 年穆尔萨会战后形势逆转。','君士坦提乌斯二世从东方应对内战；巴尔干也经历维特拉尼奥短暂称帝。','constantius4'),
 phase(353,359,'君士坦提乌斯二世独掌','353 年马格嫩提乌斯败亡；355 年起副帝尤利安在高卢活动，357 年战胜阿勒曼尼人。','东方仍由君士坦提乌斯二世主持对萨珊战争；359 年阿米达失守。','constantius4'),
 phase(360,360,'高卢拥立尤利安','尤利安在巴黎被军队拥立为正帝，与君士坦提乌斯二世对立。','君士坦提乌斯二世仍为在位正帝，并面临波斯战事。','julian4'),
 phase(361,362,'尤利安独掌帝国','361 年君士坦提乌斯二世去世后，尤利安成为唯一皇帝。','尤利安在 362 年驻安条克，准备东方远征。','julian4'),
 phase(363,363,'远征失败与东方退让','尤利安在远征中死亡，约维安继位；本年并非全年由同一皇帝统治。','约维安与沙普尔二世和议，交出尼西比斯、辛加拉及底格里斯河以东若干地区。','ammianus25'),
 phase(364,374,'瓦伦提尼安一世与瓦伦斯','约维安于 364 年去世；瓦伦提尼安一世掌西部，格拉提安于 367 年成为共治皇帝。','瓦伦斯掌东方，面临哥特、亚美尼亚与波斯方向的压力。','valens4'),
 phase(375,377,'西部继位与哥特渡河','375 年瓦伦提尼安一世去世，格拉提安与年幼的瓦伦提尼安二世并立。','瓦伦斯允许部分哥特群体在 376 年渡过多瑙河，随后发生战争。','ammianus31'),
 phase(378,378,'阿德里安堡战败','格拉提安在西部作战，未能与瓦伦斯及时会师。','8 月瓦伦斯在阿德里安堡战败身亡；东方的皇位安排随后改变。','ammianus31'),
 phase(379,382,'狄奥多西就任东方皇帝','格拉提安、瓦伦提尼安二世继续分担西部事务。','379 年狄奥多西一世就任；382 年与哥特人达成安置协议，其完整条款未保存。','theodosius4'),
 phase(383,386,'马格努斯·马克西穆斯争位','383 年马克西穆斯从不列颠进入高卢，格拉提安遇害；瓦伦提尼安二世保有意大利等地区。','狄奥多西一世掌东方，与西部争位者交涉。','theodosius4'),
 phase(387,387,'意大利危机与亚美尼亚分区','马克西穆斯进入意大利，瓦伦提尼安二世东逃。','狄奥多西接纳西部朝廷；约 387 年罗马与萨珊划分亚美尼亚势力范围。','theodosius4'),
 phase(388,391,'狄奥多西击败西部争位者','388 年马克西穆斯败亡；瓦伦提尼安二世恢复地位，军队将领的影响很大。','狄奥多西仍为东方皇帝，并一度留在意大利。','theodosius4'),
 phase(392,393,'欧根尼乌斯与阿尔博加斯特','瓦伦提尼安二世于 392 年死亡，欧根尼乌斯受拥立，由将领阿尔博加斯特支持。','狄奥多西不承认西部新政权；393 年立霍诺留为共治皇帝。','theodosius4'),
 phase(394,394,'弗里吉杜斯战役','狄奥多西击败欧根尼乌斯，短暂恢复对两部的统治。','东方和西部再次由狄奥多西一世共同掌握。','theodosius4'),
 phase(395,400,'两部朝廷延续','395 年狄奥多西去世，霍诺留掌西部；主要宫廷仍在米兰，402 年才迁拉文纳。','阿卡狄乌斯在君士坦丁堡掌东方；两部仍使用罗马帝国的政治传统，不是民族国家式分裂。','theodosius4'),
];
export const fourthPhaseAt=(year:number)=>fourthPhases.find(p=>year>=p.from&&year<=p.to);
export const fourthReading:ReadingReference[]=[{chapter:98,pages:[792,799],note:'四帝共治的制度背景'},{chapter:99,pages:[799,806],note:'君士坦丁堡与帝国重心'},{chapter:100,pages:[806,813],note:'基督教的合法地位'},{chapter:103,pages:[827,835],note:'迁徙与帝国变化'},{chapter:112,pages:[946,955],note:'宗教会议和皇帝政策'},{chapter:113,pages:[955,963],note:'狄奥多西时代'}];
export interface CenturyEvent {year:number;title:string;where:string;what:string;effect:string;places:string[];regions:string[];source:Source;battle?:string}
const event=(year:number,title:string,where:string,what:string,effect:string,places:string[],regions:string[],source:Source,battle?:string):CenturyEvent=>({year,title,where,what,effect,places,regions,source,battle});
export const fourthEvents:CenturyEvent[]=[
 event(301,'最高限价敕令','从东方行省理解帝国财政','戴克里先政府试图以最高价格表应对经济与供应问题。','这是帝国治理措施，不能画成新国家或一次人口迁徙。',['nicomedia'],['asia','italy'],'priceEdict4'),
 event(303,'大迫害开始','尼科米底亚与东方诸省','针对基督徒的迫害展开，各地执行强度不同。','教会和信众受影响，不代表所有居民的信仰被统一。',['nicomedia','alexandria','edessa'],['asia','egypt','levant'],'persecution4'),
 event(305,'戴克里先与马克西米安退位','两组皇帝的交接','正帝退位、副帝晋升，新副帝受任。','帝国没有分成四个独立国家；旧四帝姓名不能继续覆盖随后整世纪。',['nicomedia','milan'],['asia','italy'],'tetrarchy300'),
 event(306,'约克拥立与罗马争位','不列颠—高卢—意大利','君士坦提乌斯一世去世，君士坦丁被拥立；马克森提乌斯在罗马起兵。','争位从西北军区和意大利两个方向展开。',['york','trier','rome'],['britain','gaul','italy'],'constantine4'),
 event(308,'卡农图姆会议','多瑙河边防城市','皇帝们试图修复共治安排，李锡尼受立。','会议未能终止内战。',['carnuntum'],['pannonia'],'tetrarchy300'),
 event(311,'伽列里乌斯宽容敕令','从迫害到容忍的转折','伽列里乌斯临终前承认基督教社群继续存在。','311 年与 313 年是不同步骤，均不等于全体居民改宗。',['nicomedia','thessaloniki'],['asia','greece'],'milan4'),
 event(312,'米尔维安桥战役','罗马城北、台伯河','君士坦丁击败马克森提乌斯。','意大利控制者改变；这是内战，不是罗马征服外国。',['trier','milan','rome'],['gaul','italy'],'constantine4','milvian-312'),
 event(313,'米兰会面与宗教宽容','米兰—尼科米底亚','君士坦丁与李锡尼商定宗教政策，相关文书在东方公布；李锡尼击败马克西米努斯。','基督徒取得合法活动及返还财产的保障；不是 380 年的尼西亚正统政策。',['milan','nicomedia'],['italy','asia'],'milan4'),
 event(314,'阿尔勒会议与多纳徒争议','高卢与北非的教会联系','北非教会争议进入皇帝召集的跨地区会议。','北非基督徒内部也有分歧，不能只用“基督教人口”概括。',['arles','carthage'],['gaul','africa'],'constantine4'),
 event(317,'巴尔干重新分掌','从潘诺尼亚到色雷斯','内战后的安排扩大君士坦丁在巴尔干的控制。','李锡尼仍控制色雷斯及东方；这条分掌界线不沿用 395 年边界。',['sirmium','serdica','byzantium'],['pannonia','thrace'],'constantine4'),
 event(324,'君士坦丁击败李锡尼','阿德里安堡—博斯普鲁斯海峡','战事推进至海峡两岸，李锡尼败于克里索波利斯。','君士坦丁成为唯一皇帝。',['hadrianople','byzantium','nicomedia'],['thrace','asia'],'constantine4','licinius-324'),
 event(325,'尼西亚会议','比提尼亚的尼西亚','皇帝召集主教讨论教义及教会秩序。','会议地点在今伊兹尼克，不是尼科米底亚；争论并未就此终结。',['nicaea','alexandria'],['asia','egypt'],'nicaea4'),
 event(330,'君士坦丁堡落成','博斯普鲁斯海峡欧洲岸','拜占庭城改建为君士坦丁的新都。','连接黑海、爱琴海与巴尔干；四世纪前段仍应按拜占庭城理解。',['byzantium','nicomedia'],['thrace','asia'],'byzantine'),
 event(337,'君士坦丁去世，诸子分掌','从高卢、意大利到东方','君士坦丁二世、君士坦斯、君士坦提乌斯二世分担帝国。','并非三种族群各建一国。',['trier','milan','antioch'],['gaul','italy','levant'],'constantius4'),
 event(340,'君士坦丁二世战死','意大利北部','兄弟冲突后，君士坦斯扩大西部控制。','西部与东方成为两个主要统治中心。',['aquileia','milan'],['italy'],'constantius4'),
 event(350,'马格嫩提乌斯夺权','高卢向意大利扩展','君士坦斯被推翻，君士坦提乌斯二世准备西进。','皇位争夺牵动莱茵河与东方防御。',['lyon','milan'],['gaul','italy'],'constantius4'),
 event(351,'穆尔萨会战','德拉瓦河畔，今奥西耶克','君士坦提乌斯二世战胜马格嫩提乌斯。','胜利没有立刻结束内战，353 年才统一。',['mursa','sirmium'],['pannonia'],'constantius4'),
 event(353,'君士坦提乌斯二世统一','西部争位者败亡','马格嫩提乌斯败亡，帝国再次由一位正帝统领。','高卢仍需要军队应对莱茵方向压力。',['lyon','trier'],['gaul'],'constantius4'),
 event(357,'斯特拉斯堡战役','莱茵河西岸','副帝尤利安战胜阿勒曼尼联军。','罗马边防暂获巩固，不能解释为征服整个日耳曼地区。',['strasbourg','mainz'],['gaul','alamanni'],'ammianus16','strasbourg-357'),
 event(359,'阿米达围城','底格里斯河上游','沙普尔二世攻陷阿米达。','阿米达是今迪亚巴克尔；不能与尼西比斯、埃德萨混为一城。',['amida','nisibis','edessa'],['mesopotamia','persia'],'ammianus19'),
 event(360,'尤利安在巴黎被拥立','高卢军队与皇位继承','军队拥立尤利安为正帝。','与君士坦提乌斯二世的矛盾加剧，次年后者去世。',['paris','trier','strasbourg'],['gaul'],'julian4'),
 event(361,'尤利安成为唯一皇帝','从西部到东方','君士坦提乌斯二世去世，尤利安独掌帝国。','其宗教政策与前任有别，但不是居民信仰即时全部反转。',['byzantium','antioch'],['thrace','levant'],'julian4'),
 event(363,'尤利安远征与约维安和议','安条克—两河—泰西封方向','罗马军抵近泰西封但未占领城市；撤退中尤利安死亡，约维安求和。','尼西比斯等地转归萨珊，原居民迁出；埃德萨接纳部分流亡者。',['antioch','ctesiphon','nisibis','edessa'],['levant','mesopotamia','persia'],'ammianus25','persian-363'),
 event(364,'瓦伦提尼安与瓦伦斯分掌','西部与东方各有皇帝','瓦伦提尼安一世与弟弟瓦伦斯分担帝国。','这比 395 年更早；“分掌”不是首次在 395 年出现。',['milan','trier','antioch'],['italy','gaul','levant'],'valens4'),
 event(367,'不列颠边防危机','不列颠北部与沿海','多方向袭击及军队失序冲击罗马不列颠，随后展开恢复行动。','不等于罗马在 367 年已经永久放弃不列颠。',['london','york','housesteads'],['britain','north-britain'],'britainCrisis4'),
 event(375,'草原压力与西部皇位交替','黑海北岸与多瑙河','370 年代匈人扩张改变阿兰、哥特诸集团关系；375 年西部皇帝去世。','迁徙是多年过程，“375”是阅读锚点，并非所有人同日西迁。',['panticapaeum','sirmium'],['goths','sarmatians','huns4'],'ammianus31'),
 event(376,'部分哥特群体渡过多瑙河','多瑙河下游进入罗马巴尔干','部分哥特人获准入境，但供应与管理危机导致冲突。','移动的是不同社群；不在河两侧各画一个同质民族国家。',['hadrianople','byzantium'],['goths','thrace'],'ammianus31','gothic-378'),
 event(378,'阿德里安堡战役','今土耳其埃迪尔内附近','瓦伦斯败亡，罗马野战军受到重创。','哥特军队获胜不等于取得君士坦丁堡，也不等于当年西罗马灭亡。',['hadrianople','byzantium'],['thrace','goths'],'ammianus31','gothic-378'),
 event(379,'狄奥多西就任','西尔米乌姆与巴尔干','狄奥多西成为东方皇帝，着手处理哥特战争。','新的皇帝需要重建军事与政治安排。',['sirmium','thessaloniki'],['pannonia','greece'],'theodosius4'),
 event(380,'塞萨洛尼基敕令','皇帝政策与宗教共同体','诏令支持尼西亚信仰传统。','政策身份不等于帝国居民同时全部改宗；犹太教、传统祭祀及基督教内部差异仍在。',['thessaloniki','byzantium'],['greece','thrace'],'religionLaw4'),
 event(381,'君士坦丁堡会议','新都与东部主教网络','会议重申并发展尼西亚正统安排。','宗教网络跨越省界，不宜涂成一种族群领地。',['byzantium','nicaea'],['thrace','asia'],'theodosius4'),
 event(382,'与哥特人的安置协议','巴尔干境内','战争后达成哥特群体安置安排。','具体条款和安置边界存在争论；不绘制一个精确的独立哥特王国。',['hadrianople','thessaloniki'],['thrace','goths'],'theodosius4'),
 event(383,'马克西穆斯从不列颠争位','不列颠—高卢','马克西穆斯跨海进入高卢，格拉提安遇害。','抽调与内战影响西北边防，不能把 410 年结束统治提前。',['london','trier','lyon'],['britain','gaul'],'theodosius4'),
 event(387,'亚美尼亚势力范围划分','亚美尼亚高原','罗马与萨珊达成分区安排，较大东部处于萨珊优势之下。','常用纪年为约 387 年，具体年份有争议；东部阿尔沙克王权并非当即全部消失。',['vagharshapat','amida'],['armenia','persia'],'armenia4'),
 event(388,'马克西穆斯败亡','萨瓦河与意大利东北','狄奥多西西进取胜。','西部朝廷得以恢复，皇位与实际军权仍有张力。',['siscia','aquileia','milan'],['pannonia','italy'],'theodosius4'),
 event(390,'塞萨洛尼基事件','巴尔干与米兰教会','镇压事件后，皇帝与米兰主教安布罗斯的关系成为重要议题。','城市社会、军队和教会不能混作一个政治主体。',['thessaloniki','milan'],['greece','italy'],'theodosius4'),
 event(391,'限制传统祭祀的法令','帝国城市与宗教设施','针对祭祀、神庙活动的限制进一步加强。','法令执行及地方反应不同；不能据一纸法令抹去所有旧信仰。',['alexandria','rome'],['egypt','italy'],'religionLaw4'),
 event(392,'欧根尼乌斯受拥立','西部宫廷与军队','瓦伦提尼安二世死亡后，欧根尼乌斯被立为皇帝。','东西部再次面对内战。',['milan'],['italy','gaul'],'theodosius4'),
 event(394,'弗里吉杜斯战役','阿尔卑斯东南通道','狄奥多西击败欧根尼乌斯与阿尔博加斯特一方。','本图以阿奎莱亚和山口方向定位，不伪造有争议的精确战场。',['aquileia','milan'],['alps','italy'],'theodosius4'),
 event(395,'霍诺留与阿卡狄乌斯','米兰与君士坦丁堡','狄奥多西去世，两子分掌；阿拉里克等哥特武装的活动也改变巴尔干局势。','两部朝廷长期延续，西部此时仍拥有意大利、高卢、西班牙、北非和不列颠等地域。',['milan','byzantium','carthage','london'],['italy','thrace','africa','britain'],'theodosius4'),
 event(400,'世纪末的两部朝廷','从北非到黑海','西部朝廷在米兰，东部在君士坦丁堡；多种语言与宗教社群并存。','402 年迁都、406 年莱茵渡河、410 年罗马被劫都在之后。',['milan','byzantium','ctesiphon'],['italy','thrace','persia'],'emperorIndex4'),
];
export function sasanianRulerAt(y:number){return y<=302?'纳尔塞（293—约 302／303）':y<=308?'霍尔米兹德二世（约 302／303—309）':y<=378?'沙普尔二世（309—379）':y<=382?'阿尔达希尔二世（379—383；379 为交接年）':y<=387?'沙普尔三世（383—388；383 为交接年）':y<=398?'巴赫拉姆四世（388—399；388 为交接年）':'伊嗣俟一世（399—420；399 为交接年）'}
const east=new Set(['thrace','greece','egypt','crete','cyprus','asia','pontus','levant','arabia','mesopotamia']);
export const fourthCityRegions:Record<string,string>={...cityRegions300,arles:'gaul',paris:'gaul',nicaea:'asia',hadrianople:'thrace',amida:'mesopotamia',edessa:'mesopotamia',strasbourg:'gaul',siscia:'pannonia',naissus:'thrace',mursa:'pannonia'};
const extraCities:Record<string,string[]>={asia:['nicaea'],thrace:['hadrianople','naissus'],mesopotamia:['amida','edessa'],gaul:['strasbourg','arles','paris'],pannonia:['siscia','mursa']};
export function fourthRegionsAt(year:number):Region300[]{
 if(!inFourthCentury(year))return [];
 if(year===300)return roman300Regions.map(r=>({...r,cities:[...r.cities,...(extraCities[r.id]??[])]}));
 const p=fourthPhaseAt(year)!;
 const regions=roman300Regions.map(base=>{
  const r={...base,cities:[...base.cities,...(extraCities[base.id]??[])],sources:[...base.sources,p.source]};
  const events=fourthEvents.filter(e=>e.year<=year&&e.regions.includes(r.id));
  r.change=events.length?events.slice(-3).map(e=>`${e.year} 年：${e.title}。${e.effect}`).join(' '):'本世纪的详细政治转折见上方阶段说明。没有新增记录的年份沿用该阶段的地域背景，不表示这一带没有发生变化。';
  if(r.group==='roman'||r.id==='mesopotamia')r.polity=`罗马帝国的${r.name}所在空间。${east.has(r.id)?p.east:p.west}`;
  if(r.id==='pannonia'||r.id==='thrace')r.polity=`罗马帝国的巴尔干地区；本条合并多个历史地域，其分掌曾随内战与继承变化，不能统一归给某一位皇帝。${year<317?'本世纪初与伽列里乌斯、李锡尼等的军政活动联系密切。':year<324?'317 年后君士坦丁取得更多巴尔干地区，李锡尼仍保有色雷斯。':year<337?'324 年之后由君士坦丁统一统治。':year<364?'诸子分掌、内战及后来统一统治先后发生；西尔米乌姆和海峡地区并非始终由同一位共治者分掌。':'帝国西部与东方的军事、宫廷联系在此交会；潘诺尼亚方向与色雷斯方向需要分别理解。'}`;
  if(r.id==='mesopotamia'){
   r.name='上美索不达米亚：罗马与萨珊边区';r.mapName='上美索不达米亚';
   r.polity=year<363?'罗马—萨珊接触地带：尼西比斯仍属罗马；阿米达在 359 年围城中失守。各城在战争中的处境不同。':'363 年和议后尼西比斯归萨珊，埃德萨仍属罗马；这一地理区域横跨两国，不能整体归给其中一方。';
   r.parts='尼西比斯在东南，阿米达在更北的底格里斯河上游，埃德萨在西侧；它们不是同一座城市。';r.sources.push('ammianus19','ammianus25','edessa4');
  }
  if(r.id==='persia'||r.parent==='persia')r.polity=`萨珊帝国（224—651）。本阶段君主：${sasanianRulerAt(year)}。${r.parent?'本条是帝国内部地域，不能视为独立王国。':'宫廷中心在两河，王朝故乡在伊朗西南；控制范围超出今天伊朗。'}`;
  if(r.id==='persia'||r.parent==='persia')r.sources.push('sasanianDynasty4','shapur4');
  if(r.id==='armenia'){
   r.polity=year<387?'亚美尼亚阿尔沙克王权及地方贵族处在罗马与萨珊竞争之间；四世纪多次受干预，不能统一画成罗马普通行省。':'约 387 年分区后，西部在罗马势力范围内，较大的东部在萨珊优势下仍保留阿尔沙克王权；428 年的王权终结在本世纪之后。';
   r.change='王室在四世纪初接受基督教，传统纪年为 301 年，年代仍有讨论；不能推断全民同日改宗。约 387 年分区是另一转折。';r.sources.push('armenia4');
  }
  if(r.id==='iberia-caucasus'){r.polity='高加索伊比利亚王国，处于罗马与萨珊竞争之间；本地王权与外部影响并存。';r.change='王室在四世纪接受基督教；不同文献纪年不一，不把现存后代教堂当作当年的完整景观。';r.sources.push('mtskheta300')}
  if(r.id==='goths'){
   r.name='哥特诸集团与多瑙河北岸';r.mapName='哥特诸集团';
   r.polity=year<370?'多瑙河北岸、黑海北侧的多个哥特集团，与罗马有战争、外交和军役关系；不是统一的西哥特或东哥特王国。':year<376?'370 年代匈人扩张冲击阿兰和哥特诸集团，部分群体向多瑙河方向移动。':'部分哥特群体已进入罗马巴尔干，另有群体留在河北或受匈人影响；北侧标签不是全体哥特人的位置。';
   r.people='哥特是多个变化中的集团名称；首领、战士、家属及其他加入者的身份不完全相同。渡河与军队流动不会把当地原有居民全部替换。';r.language='哥特语属于日耳曼语言传统；在罗马境内服役、定居的群体也与拉丁语和希腊语社会接触，不提供统一语言边界。';r.sources.push('ammianus31');
  }
  if(r.id==='sarmatians')r.change='伊阿居格、阿兰等群体不能混作同一王国。四世纪后段的草原战争与联盟重组，改变部分集团的活动方向；未收录逐年活动边界。';
  if(r.id==='gaul')r.parts='阿基坦、卢格杜努姆地区、比利时地区与地中海南部；莱茵城镇面向边防，高卢内陆与港口面向交通和供应。四世纪还没有覆盖整个高卢的法兰克王国。';
  if(r.id==='mauretania')r.polity='罗马仍掌握北非西部的部分沿海地区，南廷吉塔纳旧城与内陆地方社会不能全部视为罗马直接控制。';
  // These fields describe long-lived regional backgrounds, not a census carried forward from 300.
  r.people='四世纪地域背景：'+r.people.replace('300 年','本世纪前段');
  r.language='四世纪语言背景：'+r.language.replace('300 年','本世纪');
  r.sources=[...new Set(r.sources)];return r;
 });
 if(year>=370)regions.push({id:'huns4',name:'匈人与黑海北方草原',mapName:'匈人活动方向',group:'frontier',coords:[36,48],bounds:[[27,43],[44,51]],modern:'黑海以北、顿河和亚速海相关草原空间；点位只用于方向定位。',polity:'370 年代起，匈人及其联盟成为影响黑海北方和多瑙河局势的重要力量。这里不是阿提拉时代的完整帝国疆界。',parts:'联系阿兰和哥特活动区、黑海北岸与多瑙河下游。没有确定的单一首都或可逐年描画的国界。',people:'变化中的草原联盟包含多种来源的群体；古代作者对外族的描述带有偏见，不能当作现代生物人种分类。',language:'语言证据有限，不能把整个联盟统一指定为一种已确定语言。',change:'370 年代的扩张背景与 376 年哥特渡河相关；阿提拉的统治属于五世纪，不提前放入本图。',cities:['panticapaeum','hadrianople'],sources:['ammianus31']});
 return regions;
}
export const fourthRegionById=(id:string,year:number)=>fourthRegionsAt(year).find(r=>r.id===id);
export const fourthEventCoordinates:Record<string,Coordinate>={milvian:[12.467,41.936],chrysopolis:[29.015,41.026],adrianople:[26.56,41.68]};
