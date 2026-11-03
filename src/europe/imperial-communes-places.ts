import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
import {imperialCommuneSources as source} from './imperial-communes-sources';
// Editorial city-centre reference coordinates rounded to 0.01 degrees; no exact event-site claim.
export const imperialCommunePlaces:GazetteerPlace[]=[
 {id:'venice',name:'威尼斯',modern:'意大利 · 威尼托 · 威尼斯潟湖',aliases:['Venice','Venezia','威尼斯和约'],coords:[12.34,45.43],source:source.veniceCity.url,kind:'历史城市参考',description:'亚得里亚海北端潟湖中的城市，1177年和谈在此进行；城市代表点不是共和国全部海上领地或精确仪式地点。'},
 {id:'worms',name:'沃尔姆斯',modern:'德国 · 莱茵兰-普法尔茨 · 莱茵河畔',aliases:['Worms','沃姆斯','沃尔姆斯协约','沃尔姆斯协议'],coords:[8.36,49.63],source:source.wormsCity.url,kind:'历史城市参考',description:'莱茵河西岸的历史城市；1122年叙任权协约以此命名。点位是城市中心的概略定位，不是协约签署的精确场地。'},
 {id:'legnano',name:'莱尼亚诺',modern:'意大利 · 伦巴第 · 米兰西北',aliases:['Legnano','莱尼亚诺战役','莱尼亚诺之战','莱尼阿诺'],coords:[8.92,45.59],source:source.legnanoCity.url,kind:'战役地域参考',description:'米兰西北的城镇；1176年伦巴第同盟与帝国军队在附近交战。使用城镇代表点，不据现代纪念碑反推确切战场。'},
 {id:'konstanz',name:'康斯坦茨',modern:'德国 · 巴登-符腾堡 · 博登湖畔',aliases:['Konstanz','Constance','康斯坦茨和约','康斯坦茨会议'],coords:[9.18,47.66],source:source.konstanzCity.url,kind:'历史城市参考',description:'阿尔卑斯北侧的博登湖畔城市；1183年皇帝与伦巴第城市同盟在此达成和约。它与君士坦丁堡不是同一座城市。'},
];
const fact=(text:string,...sources:HistorySource[])=>({text,sources});
const reading167:HistoricalDetail['reading']=[{chapter:167,pages:[1427,1429]}];
const reading169:HistoricalDetail['reading']=[{chapter:169,pages:[1443,1446]}];
function detail(placeId:string,year:number,title:string,period:string,polity:string,territory:string,keys:HistorySource[],related:string[],nameNote:string):HistoricalDetail{
 return {id:`${placeId}-imperial-${year}`,placeId,from:year,to:year,focusYear:year,title,displayName:title,period,kind:'事件地点',
  polity:fact(polity,...keys),territory:fact(territory,...keys),
  people:fact('君主、教士、地方领主、城市居民与随行人员有不同身份；本事件不提供全体居民的族群比例。'),
  language:fact('文书的书写语言与居民日常口语应分开。本条没有城市全体居民的语言统计。'),
  nameNote:fact(nameNote),reading:year<=1122?reading167:reading169,
  readingNote:year>=1176?'课程提供整体线索；1176年战役、1177年和解及停战、1183年正式城市和约按独立来源分开。':'课程作为制度与王朝背景；本地点和确切日期据所列独立来源核对。',related};
}
export const imperialCommuneDetails:HistoricalDetail[]=[
 detail('worms',1122,'沃尔姆斯','1122年9月23日协约之后','亨利五世、教皇加里斯都二世一方的使节及帝国诸侯参与协约。不是两国划定新边界。','皇帝放弃戒指和牧杖所表示的宗教职分授予，仍授予世俗权利；德意志与其他帝国地域的程序不同。',['wormsText','wormsCity'],['aachen','rome','pavia'],'Worms通译沃尔姆斯；与1521年路德出席的沃尔姆斯会议相隔近四百年。'),
 detail('rome',1111,'罗马','1111年4月13日帝号加冕之后','亨利五世在与帕斯卡尔二世的冲突及施压后获帝号；不是亨利四世复位。','加冕发生在罗马。帝号不等于皇帝取得罗马全城和整个意大利半岛的直接所有权。',['henryV'],['worms','aachen','pavia'],'罗马是本次皇帝加冕地点；北侧国王加冕的亚琛是另一座城市。'),
 detail('rome',1133,'罗马','1133年6月4日拉特朗加冕之后','洛泰尔三世由英诺森二世加冕为帝。阿纳克莱图斯二世仍在对立，罗马并未统一服从一方。','仪式在拉特朗举行；不能因为圣彼得大教堂常与加冕相连，就把本次仪式也标在圣彼得。城市代表点不标具体建筑。',['lotharIII'],['aachen','pavia'],'洛泰尔三世也见苏普林堡的洛泰尔；不要与9世纪中部王国的洛泰尔混同。'),
 detail('rome',1155,'罗马','1155年6月18日巴巴罗萨加冕之后','教皇哈德良四世为腓特烈一世加冕为帝；罗马城市力量同时与皇帝存在冲突。','皇帝的加冕地点、罗马城市治理和教皇领地不是同一层次。南部西西里王国另有君主。',['barbarossa'],['aachen','pavia','milan'],'腓特烈一世的外号巴巴罗萨指红胡子；1152年取得王位，1155年才取得帝号。'),
 detail('milan',1158,'米兰','1158年屈服与龙卡利亚会议之后','米兰与腓特烈一世的皇权主张发生冲突，1158年屈服；仍需与1162年的再次投降和城市破坏区别。','北意大利波河平原的城市及周边权利是争夺对象。通行税、铸币和司法等权利，不是一条现代国界。',['barbarossa'],['pavia','rome'],'本期使用米兰，而不是古罗马时期的梅迪奥拉努姆；城市位置延续，政治身份改变。'),
 detail('milan',1162,'米兰','1162年投降与城市破坏之后','米兰投降，随后遭皇帝一方及敌对邻城破坏，居民被迫迁出；不能将这一时期标为稳定自治的同盟核心。','同在北意大利的城市也彼此竞争。城镇遭毁不等于其居民被一种新“人种”整体替换。',['barbarossa'],['pavia','legnano'],'米兰的1162年与1167年分开：失败之后仍会重建，不从地图上永久删除这座城市。'),
 detail('milan',1167,'米兰','1167年重建与城市结盟的阶段','米兰重新集结，并参与伦巴第城市同盟的发展。联盟是多个城市的政治合作，不是统一的意大利民族国家。','地图以米兰定位波河平原城市社会；同盟成员与控制地会变动，不按整块意大利王国包络涂成同盟疆界。',['barbarossa'],['pavia','legnano','venice'],'伦巴第同盟与早期伦巴第王国不是同一个政权，也不能从名称直接推出居民祖源。'),
 detail('legnano',1176,'莱尼亚诺','1176年5月29日战役之后','伦巴第同盟军队在附近击败腓特烈一世军队。皇帝仍在位，战争胜负没有立即终结帝国联系。','位于米兰西北。点位用于找到战役地域，不是已经考证的战场边界，也没有复原两军的确切路线。',['legnanoCity','barbarossa'],['milan','pavia','venice'],'Legnano通译莱尼亚诺。现代纪念活动可帮助辨认城市，不能代替中世纪战场调查。'),
 detail('venice',1177,'威尼斯','1177年夏季和解与停战之后','腓特烈一世承认亚历山大三世，与伦巴第城市同盟安排六年停战。威尼斯是谈判地点，不能据此判为皇帝直接属地。','在亚得里亚海北端。教皇和解、城市停战与1183年正式确认城市权利，分别发生。',['barbarossa'],['legnano','milan','konstanz'],'威尼斯和约常作为1177年安排的总称；不能把1183年康斯坦茨和约提前到本年。'),
 detail('konstanz',1183,'康斯坦茨','1183年6月25日和约之后','腓特烈一世与伦巴第城市同盟达成正式和约。城市保有自治和相关权利，同时仍对皇帝承担义务。','签约地在博登湖畔、阿尔卑斯北侧；主要涉及的城市在山脉南侧。签约城市不会因此成为伦巴第同盟的一块新领土。',['konstanzCity','barbarossa'],['milan','pavia','venice'],'Konstanz又见Constance；1183年和约与1414—1418年教会会议不同，也与君士坦丁堡不同。'),
 detail('milan',1183,'米兰','1183年康斯坦茨和约之后','米兰等同盟城市的治理及相关权利得到确认，仍保留效忠等帝国联系。不能只在“独立国家”与“皇帝直辖”之间二选一。','米兰在阿尔卑斯南侧；和约签署地康斯坦茨在北侧。这两处可互相跳转比较。',['barbarossa','konstanzCity'],['konstanz','pavia','legnano'],'从1162年破坏、1167年结盟到1183年和约，可看同一座城市政治关系的变化。'),
];
