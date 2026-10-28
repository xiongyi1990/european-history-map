import type {PartitionFrame,PartitionRealm,PartitionSource} from './frankish-partitions';
// Regional reading envelopes, not reconstructed annual frontiers or royal demesne.
const sources:PartitionSource[]=[
 {title:'瑞士历史辞典：鲁道夫二世的意大利王权922—926',url:'https://hls-dhs-dss.ch/de/articles/020778/2009-10-14/'},
 {title:'Treccani：普罗旺斯路易、意大利王位与帝号',url:'https://www.treccani.it/enciclopedia/ludovico-iii-re-di-provenza-re-d-italia-imperatore_%28Dizionario-Biografico%29/'},
 {title:'德国传记：鲁道夫家族与勃艮第的渐次整合',url:'https://www.deutsche-biographie.de/sfz108738.html'},
 {title:'CNRS印章数据库：拉乌尔923—936年王位',url:'https://sigilla.irht.cnrs.fr/45020'},
 {title:'菲茨威廉博物馆：罗贝尔二世996—1031年',url:'https://data.fitzmuseum.cam.ac.uk/id/agent/agent-205932'},
 {title:'德国传记：童子路易、900年王权及洛塔林吉亚',url:'https://www.deutsche-biographie.de/sfz54694.html'},
 {title:'博帕德博物馆：911—925年洛塔林吉亚归属',url:'https://museum-boppard.de/museumsrundgang/stadtgeschichte/kurzegeschichte/kurzegeschichte-2-2/'},
 {title:'LVR：莱茵地区、公爵与925年后的王权',url:'https://rheinische-geschichte.lvr.de/Epochen-und-Themen/Epochen/785-bis-1288---die-rheinlande-im-hochmittelalter/DE-2086/lido/57ab2238c87510.51484097'},
 {title:'瑞士历史辞典：勃艮第王国与1032年以后的继承',url:'https://hls-dhs-dss.ch/de/articles/006620/2005-04-20/'},
 {title:'德国传记：奥托一世、951年意大利王号与962年帝位',url:'https://www.deutsche-biographie.de/sfz74082.html'},
 {title:'大都会博物馆：奥托王朝的年代与跨阿尔卑斯政治空间',url:'https://www.metmuseum.org/essays/ottonian-art'},
 {title:'LVR：奥托三世983年王位与996年帝号',url:'https://rheinische-geschichte.lvr.de/Epochen-und-Themen/Themen/die-koeniglichen-muenzstaetten-im-rheinland/DE-2086/lido/6038bd1091d1a7.64382697'},
 {title:'法国国家图书馆：987—996年于格·卡佩',url:'https://data.bnf.fr/fr/ark%3A/12148/cb12066137r'},
 {title:'格涅兹诺市：1000年会晤与1025年王号',url:'https://www.gniezno.eu/cms/20471/boleslaw_chrobry'},
];
const note='色块是固定阅读地域的概略示意，帮助比较这些年份的王权关系，不是逐年实控疆界，也不表示100年间边界未变。这里只展开中西欧；留白不表示没有居民或政权。';
const residents='王室、贵族、教会、商人和乡村居民处在不同关系中。历史地域名不能当作单一人种；王朝更替不表示居民整体更换。';
const language='拉丁文是重要的教会与文书语言，地方口语另有差异；本图没有足够资料划出全境语言界线或计算族群比例。';
const reading:PartitionFrame['reading']=[
 {chapter:144,pages:[1213,1215],note:'诺曼底、东西法兰克、987年卡佩与936/962年奥托的课程背景。911、925的洛塔林吉亚归属及勃艮第细节由外部资料补充。'},
 {chapter:159,pages:[1350,1352],note:'公国、康拉德、亨利与奥托。1351页配图同时列972和1032两组边界；不能把1032年的勃艮第关系提前套入962或1000年。'},
];
const common={people:residents,language};
function west(ruler:string,status:string,late=false):PartitionRealm{return {...common,id:'west-francia',name:late?'法兰西王国（西法兰克延续）':'西法兰克王国',ruler,dates:late?'987年起为卡佩王朝；王国与王室领地不同':'843年分国之后的西部王国；本卡按所选年阅读',color:'#d99674',coords:[1.7,47.2],bounds:[[-2.1,42.5],[5.6,51.4]],geography:'位于洛塔林吉亚以西的高卢地域，塞纳河与卢瓦尔河是主要定位线索。今天法国只能帮助定位，不代表当时国界。',parts:['巴黎、奥尔良方向的王室核心及交错的教会和贵族领地','阿基坦、图卢兹等南部地方权力','第戎周边的勃艮第公国：与阿尔卑斯西北侧的勃艮第王国分开','塞纳河下游的诺曼底方向：911年后的关系另见事件卡；布列塔尼边缘未完整绘入'],status,places:[['paris','巴黎：王权核心方向'],['rouen','鲁昂：诺曼底方向'],['toulouse','图卢兹：南部地方权力']]};}
function east(ruler:string,status:string):PartitionRealm{return {...common,id:'east-francia',name:'东部王国（东法兰克—德意志）',ruler,dates:'843年分国起；919年进入萨克森王朝，帝号另看962年',color:'#75aa9f',coords:[10.8,52.1],bounds:[[7,46.4],[14.5,54.2]],geography:'莱茵河以东、易北河以西的主要地域与上多瑙河方向。洛塔林吉亚位于西侧，在本图单列，不能从现代德国国界推画。',parts:['北部萨克森与易北河方向','中部法兰克尼亚、图林根等地域','西南士瓦本（阿勒曼尼亚），南部巴伐利亚','洛塔林吉亚另列地域卡；东部边疆、波希米亚等关系未画为同质直辖'],status,places:[['regensburg','雷根斯堡：巴伐利亚与多瑙河'],['magdeburg','马格德堡：萨克森与易北河方向'],['aachen','亚琛：洛塔林吉亚及加冕联系']]};}
function loth(year:number,ruler:string,toWest=false):PartitionRealm{return {...common,id:'lotharingia',name:'洛塔林吉亚（'+(toWest?'联系西部王权':'联系东部王权')+'）',ruler,dates:'911年转向西部王权；925年转入亨利一世一方；959年后分上下两部分',color:toWest?'#d99674':'#75aa9f',coords:[5.8,50.4],bounds:[[3.3,47.7],[7.7,53.8]],geography:'北海低地，经亚琛、默兹河和摩泽尔河到洛林方向。它比今天法国的洛林大得多，也不等于855年洛泰尔二世王国的全部范围。',parts:['北部低地与亚琛方向','摩泽尔河、梅斯及特里尔方向','西邻西法兰克，东邻莱茵河两侧王权地域',...(year>=962?['959年后有上洛林、下洛林两层公爵组织，本图尚未细画内部界线']:[])],status:toWest?'本年取年末状态：地方贵族转向西法兰克的查理三世。单列此块是为了比较地域归属，不表示又建立了完全独立的王国。':'本年联系东部王权，仍经公爵、主教与地方贵族治理。单列地域不表示独立国家；与东部同色也不表示每处都是国王自有领地。',places:[['aachen','亚琛：辨认东西归属'],['metz','梅斯：摩泽尔河方向'],['trier','特里尔：洛林与莱茵的联系']]};}
function upper(ruler:string,status:string):PartitionRealm{return {...common,id:'upper-burgundy',name:'上勃艮第王国',ruler,dates:'888年建立；之后与罗讷河下游王权逐步整合',color:'#b58fbe',coords:[6.7,46.6],bounds:[[5.3,45.2],[8.4,47.8]],geography:'汝拉山、日内瓦湖、西部瑞士及通往阿尔卑斯的通道。不是第戎周边的西法兰克勃艮第公国。',parts:['汝拉以东和日内瓦湖方向','阿尔卑斯西北山口与萨瓦/瓦莱联系','西部瑞士的王室、主教与地方贵族权利'],status,places:[['lyon','里昂：下勃艮第邻接方向，仅作比较'],['pavia','帕维亚：山口以南的意大利对照']]};}
function lower(status:string):PartitionRealm{return {...common,id:'provence',name:'下勃艮第（普罗旺斯王权）',ruler:'路易（后世称盲人路易）；于格等地方权力逐步增强',dates:'879年博索称王；890年路易继承，其王权延续至928年',color:'#c7aa60',coords:[4.9,44.5],bounds:[[3.7,42.7],[7.4,46.1]],geography:'以里昂、维埃纳、阿尔勒的罗讷河走廊帮助定位。法国维埃纳不是奥地利维也纳；普罗旺斯在这里也不是今天大区的边界。',parts:['里昂—维埃纳方向','下罗讷河与阿尔勒','普罗旺斯沿海及地方权力；山区与海岸实控并不均一'],status,places:[['lyon','里昂：罗讷河上段'],['arles','阿尔勒：下罗讷河与地中海']]};}
function burgundy(ruler:string):PartitionRealm{return {...common,id:'burgundy',name:'勃艮第王国（罗讷河—阿尔卑斯）',ruler,dates:'888年上勃艮第起；10世纪整合南部；1032年后才发生帝国继承',color:'#c7aa60',coords:[5.5,45.6],bounds:[[3.7,42.7],[8.4,47.8]],geography:'沿罗讷河从阿尔卑斯西北通向地中海。它与西法兰克境内的勃艮第公国同名，却不是同一政权。',parts:['原上勃艮第的汝拉、日内瓦湖与阿尔卑斯通道','里昂、维埃纳方向','阿尔勒与普罗旺斯方向；地方贵族和教会各有权利'],status:'本年仍有自己的国王。它与奥托王朝有亲属、保护和山口战略联系，但不能据此画为东部国王直接兼有的第三个王国。1032年后的继承及整合不能提前套入本年。',places:[['lyon','里昂：南北连接处'],['arles','阿尔勒：地中海方向'],['pavia','帕维亚：邻国意大利，仅作对照']]};}
function italy(ruler:string,status:string):PartitionRealm{return {...common,id:'italy',name:'意大利王国（北中部）',ruler,dates:'承接加洛林意大利王权；951年奥托取得王号，962年帝号另列',color:'#86a5ca',coords:[10.7,44.4],bounds:[[7.1,42.7],[12.7,46.5]],geography:'阿尔卑斯以南的波河平原及北中部王权地域；帕维亚是定位中心。它不是整个现代意大利半岛。',parts:['帕维亚及伦巴第、波河平原','托斯卡纳等北中部地方权力','山口、主教、伯爵和城镇权利交错；教皇区域、威尼斯与南部未统一着色'],status,places:[['pavia','帕维亚：意大利王权中心'],['rome','罗马：皇帝与教皇关系，非本色块直辖']]};}
const link=(title:string,text:string,...realmIds:string[])=>({title,text,realmIds});
export const successorFrames:PartitionFrame[]=[
 {year:900,title:'900年：分国之后，王权不再只有三家',treaty:'900年王位更替',eventDate:'900年末的王权关系；不表示全年均相同',summary:'先找西部、东部和意大利，再找中间的洛塔林吉亚与上下勃艮第。相邻色块可能同属一个君主，也可能各有王权。',change:'童子路易接掌东部，洛塔林吉亚也转而承认他；南部的路易进入意大利争夺王位。不能把两位路易混成一人。',note,reading,sources,
  relationships:[link('东部王权与洛塔林吉亚','两块同色表示所选时点的王权联系，地域与地方治理仍可分别看。','east-francia','lotharingia'),link('两个路易，身份不同','童子路易在东部；普罗旺斯的路易在意大利争位，901年才取得帝号。','east-francia','provence','italy')],
  realms:[west('查理三世（单纯者）','西部王位继续存在；尚不是987年卡佩王朝。'),east('童子路易（900—911）','年幼的加洛林国王继承东部王权，贵族和主教承担重要治理角色。'),loth(900,'童子路易；兹温蒂博尔德于本年败亡'),upper('鲁道夫一世（888—912）','888年形成的上勃艮第王权仍与下勃艮第分开。'),lower('路易的普罗旺斯王权与其本年在意大利争位相连；一位君主跨地域活动不等于两地成为同一行政区。'),italy('路易（普罗旺斯）与贝伦加尔一世争位','本年末按路易取得王位的阶段阅读；意大利的地方支持分裂。路易的帝号在901年，不能提前标在900年。')]},
 {year:911,title:'911年：洛塔林吉亚转向西部',treaty:'加洛林东部王系终结',eventDate:'911年末；与年初状态区别',summary:'观察亚琛所在的洛塔林吉亚：它转向西部的查理三世。东部另选康拉德一世，亨利一世尚未即位。',change:'童子路易去世后，东部王位不再由加洛林直系继承；洛塔林吉亚的选择不同。西部又出现诺曼底的新地方统治关系。',note,reading,sources,
  relationships:[link('洛塔林吉亚联系西法兰克','亚琛这一块转为与西部同色。保留地域名称，是为看清下一次变化。','west-francia','lotharingia'),link('东部选王，南部另有诸王','康拉德一世的王位，不意味着获得勃艮第或意大利全部王权。','east-francia','upper-burgundy','italy')],
  realms:[west('查理三世（单纯者）','洛塔林吉亚贵族转向其王权；911年诺曼底安排是地方权利关系，不能视作全境王室直辖。'),east('康拉德一世（911—918）','东部选举新国王；919年亨利一世即位是下一节点，不能略过康拉德。'),loth(911,'西法兰克国王查理三世',true),upper('鲁道夫一世（至912）','上勃艮第王权不因东部选王而自动取消。'),lower('路易905年失去意大利争位优势后仍保有普罗旺斯王权；于格等地方掌权者的重要性增加。'),italy('贝伦加尔一世','路易已于905年退出意大利；贝伦加尔的帝号要到915年。王号与帝号分别理解。')]},
 {year:925,title:'925年：洛塔林吉亚归入东部王权',treaty:'亨利一世取得洛塔林吉亚',eventDate:'925年转归之后',summary:'和911年对照：洛塔林吉亚重新与东部同色。再向南看，鲁道夫二世兼涉上勃艮第与意大利，却没有统一所有旧法兰克地域。',change:'亨利一世取得洛塔林吉亚；西部王位已是拉乌尔。意大利争位仍有后续，926年于格即位不能提前套入925年。',note,reading,sources,
  relationships:[link('从西部转向东部','洛塔林吉亚的政治联系改变，亚琛位置和居民没有随之整体迁移。','lotharingia','east-francia'),link('同一个鲁道夫，两块王权地域','上勃艮第的鲁道夫二世当时也争得意大利王位；不是整个现代瑞士与意大利的统一国家。','upper-burgundy','italy')],
  realms:[west('拉乌尔／鲁道夫（923—936）','查理三世已失势被囚；洛塔林吉亚转向亨利一世。'),east('亨利一世（919—936）','新纳入洛塔林吉亚的政治联系；不代表地方公爵、贵族和教会权利消失。'),loth(925,'东部国王亨利一世'),upper('鲁道夫二世（912—937）','同时参与意大利王位；本年不能画成已经合并上下勃艮第。'),lower('路易仍在世，地方权力由于格等人掌握。于格926年在意大利即位另看，不提前并入本年。'),italy('鲁道夫二世（上勃艮第）','贝伦加尔一世924年死后，鲁道夫在意大利的王位仍面临反对；926年将由于格取代。')]},
 {year:962,title:'962年：一个皇帝，两个王国层次',treaty:'奥托一世的罗马加冕',eventDate:'962年2月2日加冕之后；战争与整合仍在继续',summary:'先分别看阿尔卑斯北侧的东部王国与南侧意大利，再看罗马的皇帝加冕。勃艮第仍有自己的国王，西法兰克也未被并入。',change:'奥托936年为王、951年取得意大利王号、962年取得帝号，是三个不同节点。帝号不等于古罗马全部疆域复活，也不表示当天已平定全部意大利。',note,reading,sources,
  relationships:[link('奥托一世：跨阿尔卑斯的两层王权','东部与意大利分别着色以辨认地域，同受奥托王权联系；意大利反抗与地方权利仍存在。','east-francia','italy'),link('洛塔林吉亚在东部体系内','自959年分上下两部分；本图把它作为历史地域单列，而非第三个独立王国。','east-francia','lotharingia'),link('勃艮第仍是邻接王国','联姻和保护关系不能等同并入帝国。课程图上的1032年线属于更晚阶段。','burgundy','east-francia')],
  realms:[west('洛泰尔（954—986）','加洛林西部王权仍在；987年的卡佩更替尚未发生。'),east('奥托一世；奥托二世已于961年为共同国王','奥托一世本年取得帝号。诸公国与教会通过各自权力参与统治，不是一套现代中央行政区。'),loth(962,'奥托一世王权下的公爵、主教与贵族'),burgundy('康拉德（937—993）'),italy('奥托一世；贝伦加尔二世等势力仍抵抗','951年王号与962年帝号分开；贝伦加尔二世的最终失败尚在以后。罗马是加冕和教皇权力中心，不被本图涂成王室自有领地。')]},
 {year:987,title:'987年：西部换王朝，东部仍是奥托王权',treaty:'卡佩即位',eventDate:'987年卡佩即位之后',summary:'在巴黎方向认识卡佩王朝的开始。地域和居民不会随王朝一起全部改变；东部的奥托三世此时年幼，而且还没有皇帝称号。',change:'于格·卡佩取代西部加洛林王系。奥托三世983年已取得王位，996年才加冕为帝；不能把962年的奥托一世一直标到987年。',note,reading:[...reading,{chapter:175,pages:[1489,1490],note:'王国、诸侯和王室领地的制度背景。1491页图是12—14世纪初年的法兰西，不能作为987年的精确疆界。'}],sources,
  relationships:[link('王国范围大于国王自有领地','巴黎方向的王室核心与诸侯领地不能涂成同一种直辖关系。','west-francia'),link('奥托王朝延续，帝位暂未加冕','奥托三世名下的王权及摄政治理与皇帝头衔不同；意大利地方控制另有层次。','east-francia','italy'),link('勃艮第仍有自己的康拉德国王','不要把同名勃艮第公国和勃艮第王国混成一个色块。','west-francia','burgundy')],
  realms:[west('于格·卡佩（987—996）','王朝更替，不等于全国领地全部收归王室，也不是现代法国民族在此年突然形成。',true),east('奥托三世（983—1002）；母亲狄奥法诺摄政','本年还不是皇帝；继承王位与996年帝号应分别阅读。'),loth(987,'奥托三世王权下的上下洛林公爵和地方权力'),burgundy('康拉德（937—993）'),italy('奥托三世名下的王权；地方贵族、主教与摄政权力','奥托二世983年死后，王朝联系继续但控制依赖地方关系。奥托三世的皇帝加冕在996年，不能提前写入987年。')]},
 {year:1000,title:'1000年：帝国、法兰西与独立的勃艮第',treaty:'千年前后的王权关系',eventDate:'1000年；格涅兹诺会晤与周边王权分别阅读',summary:'帝国连接德意志方向与意大利；西部是罗贝尔二世的法兰西；中间还有鲁道夫三世的勃艮第。东面的外交与教会联系也不能直接当作领土。',change:'奥托三世已于996年加冕为帝。于格·卡佩996年去世，1000年西部国王是罗贝尔二世。勃艮第1032年后的继承尚未发生。',note,reading,sources,
  relationships:[link('两块地域相连，仍有不同地方组织','奥托三世兼有帝号，跨阿尔卑斯的王权关系不等于每个地方都是宫廷直接管理。','east-francia','italy'),link('勃艮第与帝国相邻，尚未并入','鲁道夫三世仍在位；课程第1351页的1032年边界不能代替本年。','burgundy','east-francia'),link('法兰西是另一王国','罗贝尔二世与奥托三世不同，居民语言也不能用帝国颜色一概推断。','west-francia','east-francia')],
  realms:[west('罗贝尔二世（996—1031年单独在位）','卡佩王权延续，诸侯和教会仍有自身权利；同一王国不等于王室直接土地。',true),{...east('奥托三世（996—1002年皇帝）','格涅兹诺会晤、教会联系与诸国外交，不等于将波兰、匈牙利直接并入帝国。易北河以东的控制和朝贡关系也不能一律填色。'),places:[['aachen','亚琛：王权传统'],['magdeburg','马格德堡：易北河方向'],['regensburg','雷根斯堡：上多瑙河'],['gniezno','格涅兹诺：1000年会晤，外部比较点'],['esztergom','埃斯泰尔戈姆：匈牙利王权，外部比较点']]},loth(1000,'奥托三世王权下的上下洛林及地方权力'),burgundy('鲁道夫三世（993—1032）'),italy('奥托三世','皇帝在罗马的活动、教皇职权、意大利王权与地方权利并存。半岛南部及威尼斯没有因此全部成为同一行政体系。')]},
];
