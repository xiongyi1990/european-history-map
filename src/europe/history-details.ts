import {places as greekPlaces,sourceWar} from '../greek/data';
import type {GazetteerPlace} from './model';
import {courseSources,type ReadingReference} from './course-sources';
import {courseDetails} from './course-details';

export const historySources={
 ...courseSources,
 crete:{title:'牛津大学：克里特史前社会与书写',url:'https://crete.classics.ox.ac.uk/U1S3/U1S3L2.html'},
 knossos:{title:'希腊文化部：克诺索斯',url:'https://odysseus.culture.gr/h/3/eh352.jsp?obj_id=2369'},
 minoan:{title:'UNESCO：米诺斯宫殿中心',url:'https://whc.unesco.org/en/list/1733/'},
 minoanCoords:{title:'UNESCO：克里特遗址坐标',url:'https://whc.unesco.org/en/list/1733/maps'},
 mycenaean:{title:'大都会博物馆：迈锡尼文明',url:'https://www.metmuseum.org/essays/mycenaean-civilization'},
 citadels:{title:'UNESCO：迈锡尼与梯林斯',url:'https://whc.unesco.org/en/list/941/'},
 citadelCoords:{title:'UNESCO：迈锡尼与梯林斯坐标',url:'https://whc.unesco.org/en/list/941/maps'},
 war:{title:'修昔底德《伯罗奔尼撒战争史》卷二',url:sourceWar},
 athens:{title:'希腊世界基金会：雅典的政治权利',url:'https://www.ime.gr/chronos/05/en/politics/343isotita.html'},
 sparta:{title:'色诺芬《希腊史》3.3.6（较晚社会背景）',url:'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Aabo%3Atlg%2C0032%2C001%3A3'},
 greek:{title:'大英博物馆：希腊城邦的共同语言与宗教',url:'https://www.britishmuseum.org/sites/default/files/2020-08/Visitor-Journey-large-print-guide.pdf'},
} as const;
export type HistorySource=keyof typeof historySources;
export interface HistoricalFact {text:string;sources:HistorySource[]}
export interface HistoricalDetail {
 id:string;placeId:string;from:number;to:number;period:string;title:string;
 kind:'宫殿中心'|'早期中心'|'城邦'|'附属地点'|'港口聚落'|'帝国都城'|'宫廷驻地'|'王国中心'|'教廷驻地'|'历史城市'|'事件地点';
 displayName?:string;focusYear?:number;reading?:ReadingReference[];readingNote?:string;readingNoteSource?:HistorySource;
 polity:HistoricalFact;territory:HistoricalFact;people:HistoricalFact;language:HistoricalFact;nameNote:HistoricalFact;
 related:string[];relatedBattles?:string[];
}
const fact=(text:string,...sources:HistorySource[]):HistoricalFact=>({text,sources});
const dms=(d:number,m:number,s:number)=>d+m/60+s/3600;
const site=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:HistorySource,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:historySources[source].url,kind:'青铜时代遗址参考',description});
// UNESCO property reference coordinates; these are site locations, never state boundaries.
export const bronzePlaces: GazetteerPlace[]=[
 site('knossos','克诺索斯','希腊 · 克里特岛伊拉克利翁附近',['Knossos','Knosos','克诺萨斯','克诺索斯宫','米诺斯','米诺安'],[dms(25,9,45),dms(35,17,50)],'minoanCoords','克里特岛北部的宫殿与聚落遗址。以遗址代表点定位，宫殿遗址范围不等于古代统治疆域。'),
 site('phaistos','斐斯托斯','希腊 · 克里特岛梅萨拉平原',['Phaistos','Phaestos','Festos','费斯托斯','法伊斯托斯'],[dms(24,48,51),dms(35,3,4)],'minoanCoords','克里特岛南部的宫殿中心，与北部的克诺索斯分别定位。'),
 site('malia','马利亚','希腊 · 克里特岛马利亚附近',['Malia','Mallia','玛利亚宫'],[dms(25,29,33),dms(35,17,36)],'minoanCoords','克里特岛北岸的宫殿遗址，是比较岛上多个宫殿中心的地点。'),
 site('mycenae','迈锡尼','希腊 · 阿尔戈利斯米基内斯附近',['Mycenae','Mykenai','Mykene','迈锡尼文明'],[22.75,dms(37,43,60)],'citadelCoords','位于伯罗奔尼撒东北部。城市名称也被现代考古学用于命名一种更广泛的文化。'),
 site('tiryns','梯林斯','希腊 · 纳夫普利翁附近',['Tiryns','Tirynthe','提林斯'],[22.8,37.6],'citadelCoords','阿尔戈利斯的另一座迈锡尼文化中心，应与迈锡尼城分别辨认。'),
];

const minoanDetails:HistoricalDetail[]=bronzePlaces.slice(0,3).map(p=>({
 id:`${p.id}-second-palace`,placeId:p.id,from:-1700,to:-1450,period:'第二宫殿时期，约前 1700—1450 年',title:p.name,kind:'宫殿中心',
 polity:fact('米诺斯文化的宫殿中心。这里记录政治与经济活动的中心，不把所有宫殿合并成一个已证实的统一王国。','minoan','crete'),
 territory:fact('显示遗址位置；尚无本项目核对过的该宫殿辖区边界。现代克里特岛海岸、世界遗产保护区都不能代替其疆界。'),
 people:fact('“米诺斯／米诺安”是现代研究使用的文化名称，不能据此给全部居民指定同一种族或人口比例。','minoan'),
 language:fact('线形文字 A 用于这一时期，至今尚未破译；不能直接把它标成希腊语。','crete'),
 nameNote:fact(p.id==='knossos'?'克诺索斯是通行遗址名称。ko-no-so 见于较晚的线形文字 B 泥版，不作为本时期已经证实的自称。':'使用通行遗址名定位，本条不声称已经读出这一时期居民自己的地名。',...(p.id==='knossos'?['knossos' as const]:[])),
 related:bronzePlaces.slice(0,3).filter(v=>v.id!==p.id).map(v=>v.id),
}));
const palaceDetails:HistoricalDetail[]=bronzePlaces.slice(3).map(p=>({
 id:`${p.id}-palatial`,placeId:p.id,from:-1400,to:-1200,period:'晚青铜时代宫殿阶段，约前 1400—1200 年',title:p.name,kind:'宫殿中心',
 polity:fact('迈锡尼文化的宫殿中心；“迈锡尼文明”覆盖多个中心，不等于一个具有统一国界的迈锡尼帝国。','citadels','mycenaean'),
 territory:fact('遗址位置已定位，统治疆域尚未收录。城堡围墙属于遗址尺度，不能当作整个政治共同体的边界。'),
 people:fact('这里采用考古文化归类；没有足够资料把全部居民按族群划出比例或边界。','citadels'),
 language:fact('迈锡尼宫殿体系使用线形文字 B 记录早期希腊语。这是书写与行政语言证据，不是所有居民的母语统计。','mycenaean'),
 nameNote:fact('使用现代研究通行的古地名；荷马史诗中的王名与故事不直接作为本条具体年份的君主名录。','citadels'),
 related:[p.id==='mycenae'?'tiryns':'mycenae','knossos'],
}));
const earlyMycenae:HistoricalDetail={...palaceDetails[0],id:'mycenae-early',from:-1600,to:-1500,period:'早期迈锡尼文化，约前 1600—1500 年',kind:'早期中心',
 polity:fact('大陆上正在形成的迈锡尼文化中心。此时段与后来成熟的宫殿行政体系分开记录。','mycenaean'),
 language:fact('这一时期的具体本地语言证据不足；不能把后来的线形文字 B 档案自动搬到前 1500 年。'),
};
const lateKnossos:HistoricalDetail={...minoanDetails[0],id:'knossos-linear-b',from:-1400,to:-1300,period:'克诺索斯线形文字 B 背景，约前 1400—1300 年',
 polity:fact('宫殿行政与希腊大陆的迈锡尼传统发生联系；与此前第二宫殿时期分开阅读。','knossos','crete'),
 people:fact('考古与书写变化反映社会联系和行政变化，不能单凭文字变化推定整座岛的人口被替换。'),
 language:fact('线形文字 B 记录早期希腊语；希腊文化部介绍的前 14 世纪泥版记录了 ko-no-so。','knossos','crete'),
 nameNote:fact('通行名克诺索斯；这一条另列有泥版证据的 ko-no-so。','knossos'),related:['mycenae','tiryns'],
};

const classicalDetails:HistoricalDetail[]=greekPlaces.filter(p=>p.camp!=='context').map(p=>({
 id:`${p.id}-431`,placeId:p.id,from:-431,to:-431,period:'公元前 431 年开战时的文献参照',title:p.name,
 kind:p.id==='naupactus'?'港口聚落':['piraeus','marathon','salamis'].includes(p.id)?'附属地点':'城邦',
 polity:p.id==='athens'?fact('雅典实行民主制，并领导雅典一方的联盟；各盟友不能全部视作雅典直接领土。','war','athens'):fact(p.relation,'war'),territory:fact(p.territory),
 people:p.id==='athens'?fact('公民、外来定居者与奴隶的法律身份不同。妇女、外来定居者与奴隶不享有完整的公共政治参与权；这里记录社会身份，不把它们当作人种。','athens'):
 p.id==='sparta'?fact('可区分斯巴达人、庇里阿西人与黑劳士等社会身份。色诺芬 3.3.6 提供的是较晚背景，不能视作前 431 年人口清单。','sparta'):
 p.id==='naupactus'?fact('修昔底德 2.9 记有居于此的美塞尼亚人；只据此记录群体居住，不推算人口比例。','war'):
 p.id==='plataea'?fact('修昔底德 2.4 的城内战斗叙述涉及妇女与奴隶，可见居民不能等同于作战的男性公民。','war'):
 fact('本条尚无可支持当地居民构成的细化记录；不从政治阵营推定居民身份。'),
 language:fact('希腊城邦共享希腊语文化背景；当地所有居民的语言构成及比例仍未收录。','greek'),
 nameNote:fact(p.id==='sparta'?'斯巴达与拉栖代梦都是阅读中常见名称；城市、地域与政治共同体要结合语境区分。':'古名与今天的位置对照用于阅读定位，不代表城市边界和人口始终不变。'),
 related:(p.id==='athens'?['piraeus','plataea','sparta']:p.id==='sparta'?['athens','corinth','argos']:p.id==='thebes'?['plataea','athens']:p.id==='plataea'?['thebes','athens']:p.camp==='athens'?['athens']:p.camp==='sparta'?['sparta']:['athens','sparta']),
}));
export const historicalDetails:HistoricalDetail[]=[
 ...[...minoanDetails,earlyMycenae,...palaceDetails,lateKnossos,...classicalDetails].map((d):HistoricalDetail=>({...d,reading:d.from===-431?[{chapter:29,pages:[221,230],note:'联盟制度的关联阅读；开战时阵营仍以修昔底德卷二核对。'}]:[{chapter:d.placeId==='mycenae'||d.placeId==='tiryns'?4:3,pages:d.placeId==='mycenae'||d.placeId==='tiryns'?[37,45]:[30,36],note:'课程阅读线索；文字与遗址的分期以条目列出的考古来源为准。'}]})),
 ...courseDetails,
];
export function historicalDetail(placeId:string,year:number){return historicalDetails.find(d=>d.placeId===placeId&&year>=d.from&&year<=d.to);}
export function detailsAt(year:number){return historicalDetails.filter(d=>year>=d.from&&year<=d.to);}
export function detailHistory(placeId:string){return historicalDetails.filter(d=>d.placeId===placeId).sort((a,b)=>a.from-b.from);}
export function alignmentAt(placeId:string,year:number){
 if(year!==-431)return undefined;
 const camp=greekPlaces.find(p=>p.id===placeId)?.camp;
 return camp==='athens'?{color:'#1673bd',label:'雅典一方'}:camp==='sparta'?{color:'#b94e48',label:'斯巴达一方'}:camp==='neutral'?{color:'#85816b',label:'中立或未入雅典盟'}:undefined;
}
export const historyWindows=[{year:-1500,title:'宫殿中心与线形文字 A'},{year:-1300,title:'迈锡尼与线形文字 B'},{year:-500,title:'波斯与爱琴海东岸'},{year:-431,title:'城邦、盟友与居民身份'},{year:-415,title:'叙拉古与西西里远征'},{year:-330,title:'亚历山大的征服世界'},{year:-218,title:'罗马、迦太基与希腊化王国'},{year:-180,title:'战败后的迦太基与希腊化王国'},{year:-146,title:'迦太基被攻陷之后'},{year:-133,title:'帕加马遗赠罗马'},{year:-64,title:'安条克与罗马的叙利亚行省'},{year:-30,title:'埃及转入罗马统治'},{year:300,title:'四帝共治：特里尔、米兰与东部驻地'},{year:395,title:'罗马帝国的东部朝廷'},{year:400,title:'两部朝廷、北非粮运与巴尔干港口'},{year:439,title:'迦太基转入汪达尔统治'},{year:500,title:'东哥特、西哥特、法兰克与汪达尔'},{year:533,title:'东罗马重新取得迦太基'},{year:540,title:'查士丁尼时代的意大利'},{year:600,title:'帕维亚、拉文纳、罗马与托莱多'},{year:700,title:'大马士革、凯鲁万与地中海易主'},{year:800,title:'亚琛、罗马与科尔多瓦'},{year:843,title:'凡尔登三分：巴黎、亚琛与雷根斯堡'},{year:900,title:'西东法兰克、阿斯图里亚斯与阿拔斯'},{year:950,title:'科尔多瓦哈里发国'},{year:1066,title:'诺曼征服与伦敦加冕'},{year:1080,title:'诺曼征服后的伦敦'},{year:1099,title:'十字军与耶路撒冷'},{year:1100,title:'耶路撒冷王国的起点'},{year:1187,title:'萨拉丁取得耶路撒冷'},{year:1204,title:'君士坦丁堡与拉丁帝国'},{year:1350,title:'阿维尼翁与教皇领地'},{year:1492,title:'格拉纳达的政权易手'},{year:1517,title:'维滕贝格与宗教改革'},{year:1618,title:'布拉格与三十年战争'},{year:1642,title:'伦敦与英格兰内战'}];
