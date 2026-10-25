import type {courseSources} from './course-sources';
export type RealmRelation='core'|'local'|'war'|'ally'|'nominal'|'outside';
type Source=keyof typeof courseSources;
type Bounds=[[number,number],[number,number]];
interface PartStage {from:number;to:number;relation:RealmRelation;text:string;sources:Source[]}
interface RealmPart {id:string;name:string;region:string;bounds:Bounds;stages:PartStage[]}
interface Realm {id:string;title:(year:number)=>string;timeline:(year:number)=>string;source:(year:number)=>Source;milestones:number[];parts:RealmPart[]}
export const realmRelations:Record<RealmRelation,{label:string;meaning:string}>={
 core:{label:'统治核心',meaning:'王权或帝国治理的主要地域，内部仍有地方差异。'},
 local:{label:'地方权力',meaning:'有公爵、总督或其他地方统治层次，不能等同中央逐地直辖。'},
 war:{label:'战争与争夺',meaning:'军队活动、抵抗或易手过程，不代表全区已经稳定归服。'},
 ally:{label:'合作与保护',meaning:'政治或军事合作，不等于吞并。'},
 nominal:{label:'名义宗主',meaning:'承认上层权威，同时有本地世袭或自主治理。'},
 outside:{label:'另一个政治空间',meaning:'列出作地理对照，不属于这个政权的组成清单。'},
};
const s=(from:number,to:number,relation:RealmRelation,text:string,...sources:Source[]):PartStage=>({from,to,relation,text,sources});
const p=(id:string,name:string,region:string,bounds:Bounds,...stages:PartStage[]):RealmPart=>({id,name,region,bounds,stages});
const franks:Realm={id:'franks',title:y=>y<751?'墨洛温法兰克':y<800?'加洛林法兰克王国':'查理曼的法兰克帝国',timeline:y=>y<751?'克洛维约 481／482 年继承；751 年更换王朝。':'751 年开启加洛林王权；800 年获西方帝号；843 年后分国。',source:y=>y<751?'earlyFrankishRhine':'carolingian',milestones:[751,759,768,771,772,774,788,791,800],parts:[
 p('gaul-core','北部高卢与莱茵腹地','gaul',[[-3,47],[8,52]],s(700,750,'core','国王名号仍属墨洛温，宫相逐渐掌握实权；不是查理曼已经称王。','earlyFrankishRhine'),s(751,767,'core','丕平的加洛林王权；王廷和贵族网络不只设在一座固定首都。','earlySoissonsHistory','earlyFrankishRhine'),s(768,770,'core','查理与卡洛曼分别掌握部分王国；尚未由查理独掌。','earlySoissonsHistory'),s(771,799,'core','卡洛曼去世后查理独掌，称号仍是国王；跨阿尔卑斯兼王号另看北意大利。','earlySoissonsHistory','carolingian'),s(800,800,'core','按年末罗马加冕后叙述：取得西方帝号，地域并非在加冕当天一次征服。','carolingian')),
 p('aquitaine','阿基坦与高卢南部','gaul',[[-2,42.5],[4,47.5]],s(700,800,'local','今法国西南、卢瓦尔河以南至比利牛斯方向。地方公爵、南方战争与王室整合要分开；本卡不逐县复原征服进度。','earlyEinhard','earlyFrankishRhine')),
 p('narbonne','纳博讷与比利牛斯北侧沿岸','iberia',[[1,42],[4.5,44.5]],s(700,718,'outside','纳博讷仍是西哥特的山北据点；不属于北部法兰克腹地。','earlyNarbonne'),s(719,758,'outside','常见交接纪年为 719／720 年；此后为安达卢斯一方的山北据点，不能提前写成丕平已取得。','earlyNarbonne'),s(759,800,'core','759 年丕平取得纳博讷；它在比利牛斯北侧，不代表山南科尔多瓦同时被征服。','earlyNarbonne')),
 p('north-italy','帕维亚与北意大利王国','italy',[[7,43.5],[14,47]],s(700,773,'outside','北部伦巴第王国以帕维亚为中心，与法兰克分别存在。','paviaEarly'),s(774,800,'local','774 年查理兼伦巴第王号，北部王国进入其王权框架；教皇领地、贝内文托及东罗马南部另看。','earlyEinhard','paviaEarly')),
 p('bavaria','巴伐利亚与多瑙河上游','central',[[10,47],[15,50]],s(700,787,'local','公爵及地方贵族保有权力，臣属和冲突关系变化；788 年废黜塔西洛尚未发生。','earlyEinhard','earlyIngelheimTrial'),s(788,800,'core','788 年塔西洛被废，转向伯爵治理；这与更东的阿瓦尔战争不是同一次地方变化。','earlyEinhard','earlyIngelheimTrial')),
 p('saxony','萨克森与威悉河方向','central',[[6.5,50.8],[12.5,54.5]],s(700,771,'outside','位于今德国西北，不是以德累斯顿为中心的现代萨克森州，也尚未被查理完成征服。','earlyFrankishRhine','earlyPaderbornMuseum'),s(772,800,'war','772—804 年长期战争中的进攻、归附与抵抗；785 年受洗或 800 年帝号都不是全区战争终点。','earlyFrankishRhine','earlyEinhard')),
 p('avar-basin','阿瓦尔与中多瑙河盆地','central',[[15,45],[23,49]],s(700,790,'outside','喀尔巴阡盆地的阿瓦尔政治空间，约今匈牙利及邻区；不是巴伐利亚，也不是现代匈牙利国家。','earlyAvars'),s(791,800,'war','791 年起法兰克战争削弱阿瓦尔权力；归附、地方重组和抵抗延续，不能画成全盆地同日直辖。','earlyAvarCampaign','earlyAvars')),
 p('papal-rome','罗马教皇与中部领地','italy',[[10.5,41],[14,44]],s(700,753,'outside','罗马教皇和地方权力处于东罗马、伦巴第关系之中；不是法兰克的普通行政区。','earlyItaly'),s(754,755,'ally','754 年法兰克与教皇合作；756 年赠地尚在后续，合作不等于吞并罗马。','earlyPepinDonation'),s(756,800,'ally','丕平赠地支持教皇世俗领地；赠地承诺、教皇主张和逐地治理仍要区分。','earlyPepinDonation')),
]};
const eastRome:Realm={id:'east-rome',title:()=> '东罗马帝国（拜占庭）',timeline:()=> '通常从 330／395 年叙述至 1453 年；1204 年后的流亡与恢复需另分段。',source:()=> 'byzantine',milestones:[717,718,751,756,775,780,787,797,800],parts:[
 p('anatolia-core','君士坦丁堡与安纳托利亚','anatolia',[[25,36],[42,42.5]],s(700,800,'core','海峡都城与今土耳其的小亚细亚核心延续。717—718 年围城和边境袭掠不等于全帝国已经被征服。','earlySiege718','earlyByzantineRulers')),
 p('aegean','色雷斯与爱琴海城市网络','balkans',[[21,36],[30,42.5]],s(700,800,'core','君士坦丁堡、塞萨洛尼基与爱琴海沿岸分别定位；内陆斯拉夫社群和保加利亚不一概算作同等直辖。','earlyBalkans')),
 p('ravenna','拉文纳及原总督区','italy',[[10,43],[14,45.5]],s(700,750,'local','东罗马在意大利的总督体系仍在；罗马教会、北部伦巴第及南部公国有不同政治关系。','earlyRavenna','earlyItaly'),s(751,755,'outside','751 年伦巴第取得拉文纳，总督体系终结；此时并不是整座半岛都已成为法兰克领土。','earlyRavenna'),s(756,800,'outside','拉文纳方向进入丕平赠地与教皇领地主张背景；不再当作仍由东罗马总督治理。','earlyPepinDonation','earlyRavenna')),
 p('south-italy','西西里与南部沿海据点','italy',[[12,36],[19,40.5]],s(700,800,'core','叙拉古所在的西西里与半岛南部部分沿海仍有东罗马权力；751 年失去拉文纳不等于退出全意大利。','earlyItaly')),
 p('bulgaria','保加利亚与下多瑙河','balkans',[[24,42],[29,45]],s(700,800,'outside','681—1018 年的第一保加利亚国家，与东罗马分别存在；合作或战败都不表示两国合并。','earlyBalkans','earlyMarkellaiBattle')),
 p('levant','叙利亚与巴勒斯坦','levant',[[34,30],[39,37]],s(700,749,'outside','本期处在倭马亚体系；不能继续沿用六世纪东罗马的南部行省版图。','timelineUmayyad'),s(750,800,'outside','阿拔斯体系下的黎凡特；宗教与语言联系不表示仍属东罗马。','abbasid','earlyRamlaHistory')),
 p('egypt','埃及与尼罗河谷','egypt',[[25,22],[36,32]],s(700,749,'outside','福斯塔特是倭马亚埃及的军政中心，亚历山大里亚是港口；不属于本期东罗马行省。','earlyFustat','timelineEgypt'),s(750,800,'outside','阿拔斯埃及以福斯塔特—阿斯卡尔为地方军政空间；不能把 969 年开罗提前当成本期都城。','earlyAskar','timelineEgypt')),
]};
const caliphate:Realm={id:'near-east',title:y=>y<750?'东方倭马亚哈里发体系':'阿拔斯哈里发体系',timeline:y=>y<750?'661—750 年东方倭马亚；756 年后的科尔多瓦是另一条分支时间线。':'常用巴格达王朝纪年 750—1258 年；762 年建巴格达，不等于各地一直由中央直接治理。',source:y=>y<750?'timelineUmayyad':'abbasid',milestones:[711,740,744,749,750,756,758,761,762,772,777,788,796,800],parts:[
 p('iraq','两河与伊拉克腹地','mesopotamia',[[42,29],[48,35]],s(700,748,'local','库法、瓦西特与总督治理分别看；倭马亚朝廷并不设在尚未建立的巴格达。','earlyKufa','earlyWasit'),s(749,749,'war','库法拥立阿拔斯，倭马亚朝廷与驻军仍在抵抗；本年交接没有在所有地方同时完成。','earlyKufa','earlyHarran','earlyWasit'),s(750,761,'core','阿拔斯早期权力重心转到伊拉克，先后使用不同驻地；巴格达要到 762 年才建立。','abbasid','earlyKufa'),s(762,795,'core','巴格达是新都；底格里斯河上的巴格达与幼发拉底河流域的库法是不同城市。','abbasid','earlyKufa'),s(796,800,'core','巴格达仍是重要行政文化中心，哈伦主要宫廷移驻更西北的拉卡—拉菲卡；不是国家一分为二。','earlyHarun','earlyRaqqa')),
 p('syria','叙利亚、巴勒斯坦与上两河联系','levant',[[34,30],[41,38]],s(700,743,'core','大马士革是东方倭马亚的重要王朝中心；耶路撒冷与地方行政城市另有作用。','timelineUmayyad','earlyRamla'),s(744,749,'core','末代倭马亚主要朝廷移至更北的哈兰；大马士革仍在，不能一直将所有驻地压成一个首都点。','earlyHarran'),s(750,771,'local','阿拔斯的黎凡特地方治理，政治重心已转向伊拉克；拉姆拉仍有行政角色。','abbasid','earlyRamlaHistory'),s(772,795,'local','旧拉卡旁新建拉菲卡；本阶段尚不能提前标成 796 年后的哈伦主要宫廷。','earlyRaqqa'),s(796,800,'core','哈伦主要宫廷在拉卡—拉菲卡，巴格达仍重要；两个河流城市要同时定位。','earlyHarun','earlyRaqqa')),
 p('egypt-province','埃及地方治理','egypt',[[25,22],[36,32]],s(700,749,'local','倭马亚体系下的埃及，以福斯塔特军政空间和亚历山大里亚港口分别理解。','earlyFustat','timelineEgypt'),s(750,800,'local','阿拔斯体系下的福斯塔特—阿斯卡尔；地方总督与伊拉克哈里发朝廷不在一处。','earlyAskar','earlyEgyptDocuments')),
 p('andalus','安达卢斯与科尔多瓦','iberia',[[-9,36],[0,41]],s(700,710,'outside','伊比利亚仍是西哥特等地方政治空间；711 年跨海征服尚未开始。','earlyIberia','toledoEarly'),s(711,717,'war','征服、协议与地方交接逐步进行，不是整个半岛在同一天被取得。','umayyad'),s(718,749,'local','安达卢斯处于东方倭马亚体系，半岛北方王权另有自己的发展。','umayyad','earlyAsturiasOrigins'),s(750,755,'outside','东方阿拔斯换朝没有使半岛自动成为其稳定直辖省；地方军政竞争继续。','umayyad'),s(756,800,'outside','科尔多瓦倭马亚埃米尔国独立于东方阿拔斯；929 年才称哈里发，不能把两家同名分支涂为同一政权。','umayyad')),
 p('ifriqiya','伊弗里基亚与凯鲁万','africa',[[7,31],[14,37.5]],s(700,739,'local','约今突尼斯及邻区，凯鲁万为倭马亚省级军政基地；不代表整个马格里布稳定直辖。','kairouanEarly','earlyCarthage'),s(740,749,'war','柏柏尔起事与地方势力改变控制；东方王朝名义不能代替北非逐地实权。','earlyBerberRevolt'),s(750,757,'local','东方革命后的地方军政竞争，不把阿拔斯名号直接等同凯鲁万本地全部实权。','earlyRustamidHistory','africaVandal'),s(758,760,'outside','伊巴德派掌握凯鲁万，本期城内实权不能直接归给阿拔斯。','earlyRustamidHistory','earlyRustamidResearch'),s(761,771,'local','阿拔斯在 761／762 年恢复控制，纪年存在差别；伊巴德派西移不等于地方网络消失。','earlyRustamidHistory','earlyRustamidResearch'),s(772,772,'war','凯鲁万发生短期夺取与阿拔斯反攻；同一年内的交接不能画成全年稳定单色。','earlyRustamidHistory','earlyRustamidResearch'),s(773,799,'local','凯鲁万有阿拔斯总督治理背景；中央马格里布及更西部的地方政权分别存在。','earlyRustamidHistory','africaVandal'),s(800,800,'nominal','阿格拉布在伊弗里基亚形成世袭地方统治，仍承认阿拔斯权威；这不是普通中央直辖省。','africaVandal')),
 p('western-maghrib','中央与西部马格里布','africa',[[-10,28],[6,37]],s(700,739,'local','向西扩张、地方社群和抵抗各有过程；不能从凯鲁万的总督推定全西部均受同样治理。','earlyBerberRevolt','kairouanEarly'),s(740,776,'outside','西部地方权力发展；约 757／758 年的西吉尔马萨城市形成也不等于效忠东方同一中央。','earlyBerberRevolt','earlySijilmasaHistory'),s(777,787,'outside','塔赫尔特的鲁斯塔姆伊玛目政权与西吉尔马萨地方统治并存，不是阿拔斯普通行省。','earlyRustamidHistory','earlyRustamidResearch','earlySijilmasaHistory'),s(788,800,'outside','再向西有伊德里斯早期王权，中央有鲁斯塔姆及绿洲地方权力；不把全马格里布归给其中任何一家。','earlyIdrisidHistory','earlyRustamidResearch','earlySijilmasaHistory')),
 p('byzantine-neighbor','东罗马小亚细亚','anatolia',[[25,36],[42,42.5]],s(700,800,'outside','东罗马在海峡与小亚细亚延续。围城、远征与边境袭掠不表示整个安纳托利亚已成为哈里发行省。','earlySiege718','earlyByzantineRulers')),
]};
export const earlyRealms=[franks,eastRome,caliphate];
export function realmCompositionAt(id:string,year:number){
 if(year<700||year>800)return undefined;
 const realm=earlyRealms.find(r=>r.id===id);if(!realm)return undefined;
 return {id:realm.id,title:realm.title(year),timeline:realm.timeline(year),source:realm.source(year),milestones:realm.milestones,parts:realm.parts.map(part=>({...part,stage:part.stages.find(s=>s.from<=year&&year<=s.to)!}))};
}
