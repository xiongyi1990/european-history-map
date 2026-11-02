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
sources.push(
 {title:'德国传记：亨利一世919—936年王权',url:'https://www.deutsche-biographie.de/sfz70048.html'},
 {title:'MGH王室文书数据库：西法兰克路易四世936—954年',url:'https://data.mgh.de/databases/abbildungsverzeichnis/abbver_db_search.xql?date=&facs=&group=karolingerreich&id=dlu-iv-37&idno=&issuer=&nmax=1021&num=961&repplace='},
 {title:'德国传记：奥托二世的共同王位、967年帝号与983年继承',url:'https://www.deutsche-biographie.de/sfz74083.html'},
 {title:'LVR：布鲁诺、洛塔林吉亚及965年去世',url:'https://rheinische-geschichte.lvr.de/Persoenlichkeiten/brun-i./DE-2086/lido/66461d636199d9.99695297'},
 {title:'奥格斯堡地区官方旅游局：955年战役与战场位置的不确定性',url:'https://www.augsburger-land.de/augsburger-land/kultur-tradition/sagen-geschichten/lechfeldschlacht-955'},
 {title:'萨克森-安哈尔特州档案馆：965年文书及后世抄本说明',url:'https://lha.sachsen-anhalt.de/onlineangebote/juedisches-leben-in-sachsen-anhalt-eine-archivische-spurensuche/spuren/privilegien-kaiser-ottos-i-an-das-mauritiusstift-in-magdeburg-965'},
);
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
function loth(year:number,ruler:string,toWest=false):PartitionRealm{return {...common,id:'lotharingia',name:'洛塔林吉亚（'+(toWest?'联系西部王权':'联系东部王权')+'）',ruler,dates:'911年转向西部王权；925年转入亨利一世一方；959年后分上下两部分',color:toWest?'#d99674':'#75aa9f',coords:[5.8,50.4],bounds:[[3.3,47.7],[7.7,53.8]],geography:'北海低地，经亚琛、默兹河和摩泽尔河到洛林方向。它比今天法国的洛林大得多，也不等于855年洛泰尔二世王国的全部范围。',parts:['北部低地与亚琛方向','摩泽尔河、梅斯及特里尔方向','西邻西法兰克，东邻莱茵河两侧王权地域',...(year>=959?['959年后有上洛林、下洛林两层公爵组织，本图尚未细画内部界线']:[])],status:toWest?'本年取年末状态：地方贵族转向西法兰克的查理三世。单列此块是为了比较地域归属，不表示又建立了完全独立的王国。':'本年联系东部王权，仍经公爵、主教与地方贵族治理。单列地域不表示独立国家；与东部同色也不表示每处都是国王自有领地。',places:[['aachen','亚琛：辨认东西归属'],['metz','梅斯：摩泽尔河方向'],['trier','特里尔：洛林与莱茵的联系']]};}
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

// Explicitly reviewed states at each date; identical reading envelopes do not imply unchanged borders.
const expandedReading:PartitionFrame['reading']=reading.map(x=>({...x,note:x.note+' 本批新增年份的具体王位、帝号与地方事件以列出的独立史料核验，课程仅作阅读背景。'}));
const frame=(year:PartitionFrame['year'],title:string,eventDate:string,summary:string,change:string,realms:PartitionRealm[],relationships:NonNullable<PartitionFrame['relationships']>):PartitionFrame=>({year,title,treaty:title.slice(5),eventDate,summary,change,realms,relationships,note,reading:expandedReading,sources});
const independentBurgundy=()=>burgundy('康拉德（937—993）');
const westernLothair=()=>west('洛泰尔（954—986）','西部仍为加洛林王系；地方诸侯的领地与国王直接土地并不相同。987年卡佩更替尚未发生。');
successorFrames.push(
 frame(919,'919年：亨利一世即位，洛塔林吉亚仍联系西部','919年东部选王之后',
  '在东部找到萨克森出身的亨利一世，再看亚琛所在的洛塔林吉亚：两者此时还不是同一组政治联系。',
  '康拉德一世于918年去世，亨利一世在919年被选为王。925年取得洛塔林吉亚还在以后；此时也没有奥托的皇帝称号。',
  [west('查理三世（单纯者）','洛塔林吉亚仍承认西部王权，不能提前套入925年。'),east('亨利一世（919—936）','东部新王权依靠诸公国逐步取得承认，不是现代德国统一行政国家的建立。'),loth(919,'西法兰克的查理三世',true),upper('鲁道夫二世（912—937）','本年尚未开始922—926年的意大利王位阶段。'),lower('盲人路易仍在位；于格等地方权力重要，尚未与上勃艮第形成一套统一行政。'),italy('贝伦加尔一世（915—924年间有帝号）','他的意大利王位和帝号不能理解为对东、西法兰克的统治。')],
  [link('东部换王，不等于洛塔林吉亚跟着走','先与911年对照，再看925年的归属改变。','east-francia','lotharingia','west-francia'),link('南方仍有不同王权','上勃艮第、普罗旺斯与意大利分别阅读。','upper-burgundy','provence','italy')]),
 frame(936,'936年：东西两部都迎来新国王','936年两位新国王即位之后',
  '东部是奥托一世，西部是路易四世。两位国王不同，意大利和阿尔卑斯周边也仍有其他王权。',
  '亨利一世去世，奥托在亚琛即位；路易四世在西部继位。951年意大利王号、962年帝号均不能提前套入。',
  [west('路易四世（936—954）','西部加洛林王权恢复；不是987年才开始的卡佩王朝。'),east('奥托一世（936年即王位）','本年是国王，尚未取得962年的帝号；诸公国和教会仍有自身权利。'),loth(936,'奥托一世王权下的吉塞尔伯特公爵及地方权力'),upper('鲁道夫二世（至937）','意大利王位已于926年失去；与于格有关的南部权利安排不表示933年一夜形成统一直辖国家。'),{...lower('盲人路易已于928年去世；于格与鲁道夫之间的权利安排及地方掌权须区分。康拉德时期才逐步巩固罗讷河诸地域。'),ruler:'于格及地方贵族；与鲁道夫二世存在南部权利安排',dates:'本卡为盲人路易928年去世之后；南部整合仍是过程'},italy('于格（926年起）；其子洛泰尔参与共同王权','与东部的奥托分开；本年不是奥托的意大利王国。')],
  [link('亚琛的王位与西部王位并存','奥托一世与路易四世不是同一君主；国王称号也不是皇帝称号。','east-francia','west-francia'),link('勃艮第整合仍在进行','上下两块保留为阅读地域，不把权利交换画成所有地方已同时受控。','upper-burgundy','provence')]),
 frame(951,'951年：奥托越过阿尔卑斯，取得意大利王号','951年帕维亚行动及婚姻之后',
  '北侧东部王权与南侧意大利开始形成跨阿尔卑斯联系。罗马的皇帝加冕还要等到962年。',
  '奥托进入意大利并与阿德莱德结婚，取得意大利王号。贝伦加尔二世并未因此当日完全消失；952年的安排和其后战争另看。',
  [west('路易四世（936—954）','西法兰克没有因奥托南下而被并入。'),east('奥托一世；本年尚未加冕为帝','王号、意大利行动与皇帝称号是三个不同层次。'),loth(951,'奥托一世王权；康拉德公爵及教会、贵族权力'),independentBurgundy(),italy('奥托一世取得王号；贝伦加尔二世势力仍在','本卡不把951年王号当成整个半岛已经平定。罗马、威尼斯及半岛南部也不是因此全部归入。')],
  [link('第一次把两侧王权连起来','从亚琛、雷根斯堡越过阿尔卑斯，找到帕维亚；本图未声称绘出确切行军路线。','east-francia','italy'),link('勃艮第关系密切但仍有自己的国王','阿德莱德与勃艮第家族有关，婚姻联系不等于吞并。','burgundy','italy')]),
 frame(955,'955年：莱希河战后，奥托仍是国王','955年8月10日奥格斯堡附近战役之后',
  '战事在阿尔卑斯北侧的奥格斯堡附近。胜利改变奥托的政治威望，不能等同于立刻吞并整个匈牙利。',
  '奥托一世击败马扎尔军队，962年帝位仍在以后。意大利由贝伦加尔二世和阿达尔贝特等地方王权运作，与奥托存在952年以来的从属安排。',
  [westernLothair(),{...east('奥托一世（王；962年才加冕为帝）','战后威望提高；居民和地方公国不会随一次胜利全部改变。'),places:[['augsburg','奥格斯堡：战役附近城市参照'],['regensburg','雷根斯堡：上多瑙河方向'],['magdeburg','马格德堡：萨克森方向']]},loth(955,'布鲁诺（科隆大主教）参与洛塔林吉亚治理'),independentBurgundy(),italy('贝伦加尔二世与阿达尔贝特；承认奥托的上位权利','名义从属、王位与实际地方控制不同；之后再起冲突，不能画成奥托直接管理每座城市。')],
  [link('战役在阿尔卑斯北侧','奥格斯堡定位城市，不是已确定的精确战场中心。马扎尔军队不等于盆地全体居民。','east-francia'),link('南部王权仍有中间层','952年的从属安排不等于取消地方王权。','east-francia','italy')]),
 frame(965,'965年：帝国、洛林分治与城市社会','965年末；布鲁诺10月去世之后',
  '西部的洛泰尔、东部的奥托一世、勃艮第的康拉德分别在位。再进入马格德堡，辨认帝国里的城市、教会与商人。',
  '奥托一世已于962年成为皇帝；奥托二世仍是共同国王，967年才获共同帝号。布鲁诺于965年去世，959年以来上下洛林的治理层次继续存在。',
  [westernLothair(),{...east('奥托一世（皇帝）；奥托二世（共同国王）','965年7月文书提到马格德堡的犹太人与其他商人；它记录地方权利，不能用来计算全境族群比例。968年大主教区尚未建立。'),people:'马格德堡965年文书留下犹太人与其他商人的并列记录。王室、教会、贵族与城市社群分开阅读；现存为较晚抄本，不能当成人口普查。'},loth(965,'布鲁诺965年去世后的上下洛林及地方权力'),independentBurgundy(),italy('奥托一世王权；地方贵族、主教与城市权力','贝伦加尔二世已在964年被俘；其后仍有反抗与地方权力，罗马的教皇职权也不因此消失。')],
  [link('共同国王还不是共同皇帝','父亲与儿子的称号要分开，965年不提前使用967年的帝号。','east-francia','italy'),link('洛塔林吉亚内部有上下两层','959年的分治与965年布鲁诺去世是不同节点，本图尚未细绘上下两部分的边线。','lotharingia','east-francia')]),
 frame(973,'973年：奥托一世去世，奥托二世承接统治','973年5月7日奥托一世去世之后',
  '跨阿尔卑斯政治结构延续，但君主已经变化。不能把奥托一世一直标到987年。',
  '奥托二世此前已有共同王位及967年的共同帝号，本年成为单独统治者；972年与狄奥法诺结婚，不等于东西两个帝国合并。',
  [westernLothair(),east('奥托二世（973—983年单独统治）','帝号始于967年的共同加冕；973年是承接单独统治，不是其第一次取得帝号。'),loth(973,'奥托二世王权下的上下洛林与地方组织'),independentBurgundy(),italy('奥托二世王权与意大利地方统治者','意大利王权、罗马教皇和南部东罗马据点仍须分别理解。')],
  [link('王朝延续，君主更替','同样颜色用于比较地域；本年统治者、宫廷与地方权利另有具体说明。','east-francia','italy'),link('狄奥法诺婚姻是外交联系','不把东罗马皇帝的领土画作奥托二世婚姻所得。','italy','east-francia')]),
 frame(983,'983年：奥托二世去世，幼年王权面临危机','983年末；12月奥托二世去世与奥托三世在亚琛加冕之后',
  '年初与年末状态不同。本卡取年末的幼年奥托三世；他尚无皇帝称号，王位承接也不意味着各地控制稳定。',
  '东部斯拉夫地区本年出现重大反叛；奥托二世于12月去世。其子在亚琛加冕，但稳定摄政安排尚在随后形成，996年的帝号不能提前使用。',
  [westernLothair(),east('奥托三世（幼年国王）；摄政与监护争夺随之展开','易北河以东的反叛和教会据点失控不能用一整块帝国颜色抹平；本图保留的东部核心阅读地域不表示所有边疆持续受控。'),loth(983,'幼年奥托三世名下的上下洛林与地方权力'),independentBurgundy(),italy('奥托王朝继承联系；地方贵族、教会及阿德莱德等权力参与','不能把年末王位继承当成幼年君主本人已经亲自治理整个意大利。')],
  [link('亚琛是王位，罗马是后来帝号','983年选王、加冕和996年帝号分开。','east-francia','italy'),link('核心地域与东方边疆分开看','983年的反叛影响具体地方，不以统一色块宣称全境持续实控。','east-francia')]),
 frame(996,'996年：奥托三世获帝号，西部进入罗贝尔二世时期','996年末；5月罗马加冕与10月于格·卡佩去世之后',
  '同一年发生两次不同王权变化：奥托三世在罗马成为皇帝，西部则由罗贝尔二世承接单独统治。',
  '奥托三世的帝号来自本年罗马加冕，不来自983年幼年王位。于格·卡佩去世；鲁道夫三世自993年起仍是独立的勃艮第国王。',
  [west('罗贝尔二世（996年起单独在位）','先前已有共同王位；本年取于格·卡佩去世后的状态。王室领地与整个王国仍有区别。',true),east('奥托三世（本年加冕为帝）','亲自治理和罗马活动不能等同全部地域直接行政管理。'),loth(996,'奥托三世王权下的上下洛林及地方权力'),burgundy('鲁道夫三世（993—1032）'),italy('奥托三世；罗马加冕与地方权力分别阅读','罗马是皇帝—教皇关系的重要中心；不把加冕自动转换成整个意大利半岛的实际控制。')],
  [link('两种王权变化，发生在不同地方','巴黎方向的罗贝尔二世与罗马的奥托三世是不同统治者。','west-francia','east-francia','italy'),link('勃艮第尚未进入1032年的继承阶段','先与987年比较国王姓名，再看1000年的邻国关系。','burgundy')]),
);
successorFrames.sort((a,b)=>a.year-b.year);
