import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
import {lateMedievalFrames} from './late-medieval';
import {lateMedievalSources as sources} from './late-medieval-sources';
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],key:keyof typeof sources,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:sources[key].url,kind:'中世纪地点参考',description});
// Rounded editorial reference coordinates; not surveyed battlefield or city borders.
export const lateMedievalPlaces:GazetteerPlace[]=[
 point('stirling','斯特灵','英国 · 苏格兰 · 福斯河畔',['Stirling','斯特林','斯特灵桥'],[-3.94,56.12],'lateWallace','城市与福斯河通道的代表点。1297年旧桥战役在附近，不能以现存桥梁或城市中心复原部队位置。'),
 point('scone','斯昆','英国 · 苏格兰 · 珀斯附近',['Scone','斯康','斯昆宫'],[-3.4,56.42],'lateRobert','苏格兰王位仪式地域参照。现代宫殿、纪念物与1306年的精确仪式场地分开理解。'),
 point('bannockburn','班诺克本','英国 · 苏格兰 · 斯特灵以南',['Bannockburn','班诺克本战役'],[-3.91,56.1],'lateBannockburn','1314年6月23—24日会战地域。战场范围和阶段有讨论，代表点不是确定的单一交战中心。'),
 point('kortrijk','科特赖克（库尔特雷）','比利时 · 佛兰德 · 莱厄河畔',['Kortrijk','Courtrai','库尔特雷','金马刺之战','金马刺战役'],[3.27,50.83],'lateFlanders','1297年法军占领的城市，1302年会战在附近地域。今日比利时只帮助找位置。'),
 point('bruges','布鲁日','比利时 · 佛兰德',['Bruges','Brugge','布鲁日晨祷'],[3.22,51.21],'lateSpurs','佛兰德城市与海上贸易方向参照；商业联系、伯爵权利和居民政治立场分别看。'),
 point('ghent','根特','比利时 · 佛兰德 · 斯海尔德河与莱厄河方向',['Ghent','Gent','Gand'],[3.72,51.05],'lateSpurs','佛兰德城市网络中的地点；不把某支参战武装或某次城市起事当作全体居民立场。'),
 point('bordeaux','波尔多','法国 · 吉伦特 · 加龙河畔',['Bordeaux','Burdeaux','阿基坦公国','加斯科涅'],[-.58,44.84],'lateGascon','英王大陆公爵领治理与海上联系的城市参照。不是英格兰本土，也不等于整个阿基坦。'),
 point('bayonne','巴约讷','法国 · 比利牛斯以北 · 阿杜尔河方向',['Bayonne','Baiona'],[-1.47,43.49],'lateGascon','加斯科涅南侧的港口城市参照；波尔多与巴约讷之间的示意色块不是逐村实控疆界。'),
 point('anagni','阿纳尼','意大利 · 拉齐奥 · 罗马东南内陆',['Anagni','阿纳涅','阿纳尼事件','阿纳尼条约'],[13.16,41.74],'lateJoanna','1295年同名条约和1303年教皇遭袭是不同事件。城市坐标仅定位，不证明具体仪式或袭击现场。'),
 point('crecy','克雷西','法国 · 皮卡第 · 蓬蒂厄地区',['Crécy-en-Ponthieu','Crecy','克雷西战役'],[1.89,50.25],'lateEdwardIII','1346年会战以此命名；战场确切位置有研究讨论，不把镇中心等同部队阵地。'),
 point('calais','加来','法国 · 英吉利海峡东端海岸',['Calais','加来围城'],[1.86,50.95],'lateCalais','1346—1347围城后的海峡港口。港口据点、周边边区和整个法国北部是不同尺度。'),
 point('poitiers-1356','普瓦捷战役地域（1356）','法国 · 普瓦捷东南 · 努瓦耶—莫佩尔蒂伊附近',['Poitiers 1356','Nouaillé-Maupertuis','黑太子','普瓦捷战役'],[.41,46.51],'latePoitiersSite','1356年战役地域在普瓦捷城东南；与732年的图尔—普瓦捷战争、普瓦捷市中心分开，坐标不表示精确阵位。'),
 point('nevilles-cross','内维尔十字战役地域','英国 · 英格兰 · 达勒姆附近',['Neville’s Cross','Nevilles Cross','Neville Cross','内维尔十字'],[-1.6,54.77],'lateNeville','1346年10月17日大卫二世被俘的战役地域，在英格兰北部，不是法国的克雷西。'),
 point('nuremberg','纽伦堡','德国 · 巴伐利亚 · 弗兰肯地域',['Nuremberg','Nürnberg','Nurnberg','金玺诏书'],[11.08,49.45],'lateGoldenBull','1356诏书第一阶段及新王首次王廷的制度性地点参照；选王、加冕和王廷不是同一地点。'),
 point('brandenburg','勃兰登堡城','德国 · 哈弗尔河畔勃兰登堡',['Brandenburg an der Havel','勃兰登堡边侯'],[12.55,52.41],'lateGoldenBull','用历史城市代表点辨认勃兰登堡边侯地域，不能把这个点当成边侯全部领地或1356年本人所在处。'),
 point('heidelberg','海德堡','德国 · 内卡河畔',['Heidelberg','莱茵行宫伯爵','普法尔茨选帝侯','莱茵普法尔茨'],[8.69,49.41],'lateGoldenBull','用城市代表点帮助辨认莱茵行宫伯爵的地域方向；点位不表示选侯领边界或1356年选举会场。'),
];
const fact=(text:string,...sources:HistorySource[])=>({text,sources});
function entry(year:number,placeId:string,name:string,polity:string,territory:string,keys:HistorySource[],related:string[],extra:Partial<HistoricalDetail>={}):HistoricalDetail{
 const frame=lateMedievalFrames.find(f=>f.year===year)!;
 return {id:`${placeId}-late-${year}`,placeId,from:year,to:year,focusYear:year,title:name,displayName:name,kind:'历史城市',period:frame.eventDate,polity:fact(polity,...keys),territory:fact(territory,...keys),people:fact('君主、教士、贵族、城市居民与乡村社会的权利不同；本条没有完成全城居民祖源调查。'),language:fact('行政与外交文字、地方口语分开理解；本条没有全城居民母语比例。'),nameNote:fact('采用通行中文历史地名；现今国家用于定位，不推定本年政治归属。'),reading:frame.reading,readingNote:'本条只适用于所标时点；邻年、城界和全部社会史不能从这张卡自动推出。',related,...extra};
}
export const lateMedievalDetails:HistoricalDetail[]=lateMedievalFrames.flatMap(f=>{
 const realm=(id:string)=>f.realms.find(r=>r.id===id)!;
 const en=realm('england'),fr=realm('west-francia'),sc=realm('scotland'),bo=realm('bohemia'),si=realm('sicily'),na=realm('south-italy'),ga=realm('gascony');
 const es:HistorySource=f.year<=1306?'highEdward':f.year<1327?'lateEdwardII':'lateEdwardIII';
 const fs:HistorySource=f.year<1314?'latePhilipIV':f.year===1314?'lateLouisX':f.year===1317?'latePhilipV':f.year<1328?'lateCharlesFrance':f.year<1350?'latePhilipVI':'lateJohnFrance';
 const ss:HistorySource=f.year<=1295?'lateBalliol':f.year<1306?'lateWallace':f.year<=1328?'lateRobert':'lateDavid';
 const is:HistorySource=f.year<=1337?'lateFrederickIII':f.year<=1348?'lateLouisSicily':'lateFrederickIV';
 const ns:HistorySource=f.year<1309?'lateCharlesII':f.year<1343?'lateRobertNaples':'lateJoanna';
 const av=f.year<1309?'教廷尚未在1309年迁驻这里；不能把后来的驻地身份提前套用。':f.year<1348?'教皇驻阿维尼翁，但尚未发生1348年购城；驻留、城市领有及周边沃奈桑分别理解。':'1348年克雷芒六世向乔安娜购得该城；城市尺度与整个罗讷河地域或全部教皇领不同。';
 return [
 entry(f.year,'london','伦敦',`${en.ruler}。${en.status}`,'泰晤士河畔的英格兰政治城市；与北面的苏格兰和海峡南面的公爵领、港口分别定位。',[es],['edinburgh','bordeaux','paris'],{language:fact(en.language,'lateGasconLanguage')}),
 entry(f.year,'paris','巴黎',`${fr.ruler}。${fr.status}`,'塞纳河畔的王室城市；法兰西名义范围、王室直辖、加斯科涅争夺和佛兰德城市是不同层次。',[fs,'lateGascon'],['rouen','bordeaux','kortrijk']),
 entry(f.year,'bordeaux','波尔多',`${ga.ruler}。${ga.status}`,'加龙河与吉伦特河口方向的城市；英格兰本土在海峡另一侧。公爵领阅读范围不等于现代法国的行政大区。',['lateGascon','lateGasconLanguage'],['bayonne','london','paris'],{people:fact(ga.people,'lateGasconLanguage'),language:fact(ga.language,'lateGasconLanguage')}),
 entry(f.year,'edinburgh','爱丁堡',`${sc.ruler}。${sc.status}`,'福斯湾南侧的苏格兰城市参照；全国王位归属不能证明本城市每座城堡和驻军的实际状态。',[ss,...(f.year===1328?['lateNorthampton' as HistorySource]:[])],['stirling','scone','london'],{language:fact(sc.language,'lateWallace')}),
 entry(f.year,'prague','布拉格',`${bo.ruler}。${bo.status}`,'伏尔塔瓦河畔的波希米亚核心城市；王国、帝国制度和后来王冠领地不能拿现代捷克国界合并。',['lateHenryVII','lateCharlesIV',...(f.year>=1348?['latePragueCharter' as HistorySource]:[])],['frankfurt','aachen','nuremberg'],{language:fact(bo.language,...(f.year>=1348?['latePragueCharter' as HistorySource]:[]))}),
 entry(f.year,'palermo','巴勒莫',f.year>=1355?'1354年转向安茹一方的承认区；不能直接把本城写成腓特烈四世统一岛上王廷。':`${si.ruler}。${si.status}`,'西西里岛北岸、西部方向。墨西拿在东北海峡口，南部大陆的那不勒斯又是另一地域。',[is,...(f.year>=1355?['lateJoanna' as HistorySource]:[])],['messina','naples'],{language:fact(si.language)}),
 entry(f.year,'naples','那不勒斯',`${na.ruler}。${na.status}`,'意大利南部大陆的城市。安茹君主的西西里王号、普罗旺斯权利与岛上实际占有分层。',[ns],['palermo','messina','avignon']),
 entry(f.year,'avignon','阿维尼翁',av,'在罗讷河左岸、今天法国南部；它不是现代意大利境内的城镇，也不能把今日法国国界当作十四世纪王权边界。',['avignon','avignonHistory',...(f.year>=1348?['lateJoanna' as HistorySource]:[])],['rome','anagni','naples'],{kind:f.year>=1309?'教廷驻地':'历史城市'}),
 ];
});
const add=(year:number,id:string,title:string,polity:string,territory:string,keys:HistorySource[],related:string[],extra:Partial<HistoricalDetail>={})=>lateMedievalDetails.push(entry(year,id,title,polity,territory,keys,related,{kind:'事件地点',...extra}));
add(1297,'stirling','斯特灵','华莱士与安德鲁·默里领导的军队在斯特灵桥获胜；华莱士不是一位新加冕国王。','福斯河通道，旧桥战事与现存桥、城市中心的坐标不同。',['lateWallace'],['edinburgh','scone','london']);
add(1306,'scone','斯昆','罗伯特·布鲁斯在斯昆取得王号；王号没有让全境城堡在同日归服。','在珀斯附近，斯特灵以东北；不是班诺克本会战地。',['lateRobert'],['stirling','edinburgh']);
add(1314,'bannockburn','班诺克本','罗伯特一世击败爱德华二世的军队；正式英方承认苏格兰王权在1328年。','1314年6月23—24日斯特灵以南地域。这里是阅读定位，不复原精确军队阵位。',['lateBannockburn','lateNorthampton'],['stirling','edinburgh','london']);
add(1295,'anagni','阿纳尼','1295年的阿纳尼条约涉及西西里王号和岛上安排，不能与1303年教皇遭袭混为一事。','罗马东南的内陆城市，与西西里岛及阿维尼翁分开定位。',['lateFrederickIII'],['rome','palermo','avignon']);
add(1303,'anagni','阿纳尼','波尼法爵八世在这里遭袭。采用1303年9月事件后的时点，不把具体掌掴传奇写成已证实阶段。','在罗马东南约数十公里的内陆；不是教皇于1309年迁驻的阿维尼翁。',['lateAnagni'],['rome','avignon','paris']);
for(const y of [1295,1297,1302,1337]){
 const f=lateMedievalFrames.find(f=>f.year===y)!,fl=f.realms.find(r=>r.id==='flanders')!;
 for(const [id,name] of [['bruges','布鲁日'],['ghent','根特'],['kortrijk','科特赖克（库尔特雷）']])add(y,id,name,fl.status,'佛兰德城市网络中的独立城市参照；海上贸易、伯爵封地、城市治理和某次会战的武装并不重合。',['lateFlanders','lateSpurs'],['london','paris','bordeaux'],{people:fact(fl.people,'lateSpurs'),language:fact(fl.language)});
}
for(const y of [1295,1303,1337,1356])add(y,'bayonne','巴约讷','在加斯科涅的地方治理与英法权利争夺中，不能从英王公爵称号推断全部居民来自英格兰。','比利牛斯以北，波尔多以南的港口；不是波尔多同一座城市。',['lateGascon','lateGasconLanguage'],['bordeaux','london']);
add(1346,'crecy','克雷西','爱德华三世的军队击败腓力六世；指挥者与1356年黑太子的会战区分。','法国北部的会战地域；随后加来围城还在继续。城镇代表点不提供确定阵位。',['lateEdwardIII','lateCrecySite'],['calais','paris','london']);
add(1346,'nevilles-cross','内维尔十字战役地域','苏格兰大卫二世在10月17日被俘；罗伯特·斯图尔特在其囚禁期间监国。','在英格兰北部达勒姆附近，与8月法国北部的克雷西是两个战场。',['lateNeville','lateDavid'],['edinburgh','london','crecy']);
for(const y of [1347,1348,1356])add(y,'calais','加来','1347年围城后成为英王的海峡港口据点；不能以一个港口代表全部法国北部。','英吉利海峡东端，克雷西会战地域以北；城镇与周边边区分开。',['lateCalais','lateFrenchLands'],['crecy','london','paris']);
add(1356,'poitiers-1356','普瓦捷战役地域（1356）','黑太子率军击败并俘获法王约翰二世；黑太子不是爱德华三世本人。','在普瓦捷城东南的努瓦耶—莫佩尔蒂伊附近；不是732年的图尔—普瓦捷会战。',['latePoitiers','latePoitiersSite'],['bordeaux','paris','london']);
add(1356,'nuremberg','纽伦堡','《金玺诏书》的纽伦堡阶段及新王首次王廷的规定与此地相连。','选王在法兰克福，王冠传统在亚琛，诏书年末补充条款在梅斯；三项仪式不能放成一个城市。',['lateGoldenBull','lateCharlesIV'],['frankfurt','aachen','metz','prague']);
add(1356,'metz','梅斯','查理四世在梅斯的会议与《金玺诏书》年末补充条款相连。','在摩泽尔河方向、纽伦堡以西。今天属于法国不说明1356年就是法王行政城市。',['lateGoldenBull','lateCharlesIV'],['nuremberg','trier','frankfurt']);
add(1356,'frankfurt','法兰克福','《金玺诏书》将法兰克福规定为选举罗马人国王的地点；不是自动取得皇帝称号。','在美因河畔，与莱茵河畔的美因茨、亚琛及纽伦堡分别定位。',['lateGoldenBull'],['mainz','aachen','nuremberg']);
for(const [id,name,role] of [['mainz','美因茨','美因茨大主教'],['trier','特里尔','特里尔大主教'],['cologne','科隆','科隆大主教'],['wittenberg','维滕贝格','萨克森公爵'],['brandenburg','勃兰登堡城','勃兰登堡边侯'],['heidelberg','海德堡','莱茵行宫伯爵']])add(1356,id,name,`${role}是七位选帝侯之一；城市代表点帮助找到相关地域，不能当作完整选侯领或会场。`,'七位选侯还包括波希米亚国王。教区、世俗领地和城市权利不同；不是把帝国恰好分成七个省。',['lateGoldenBull'],['frankfurt','aachen','prague'],{people:fact('诏书同时涉及贵族、教士、市民及乡村社会的不同权利；选帝侯名录不能代表帝国全部居民。','lateGoldenBull')});
