import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const islandPlaces:GazetteerPlace[]=[
 point('tamworth','塔姆沃思','英国 · 英格兰中部、伯明翰东北的塔姆河一带',['Tamworth','Tamuuorthie','塔姆沃斯','麦西亚王廷'],[-1.6948,52.6346],'earlyTamworthLocation','现代市区代表点，不是奥法宫殿的精确位置。早期王廷或宗教围区仍有推定成分；现存诺曼城堡不能提前到八世纪。'),
 point('jarrow','贾罗修道院','英国 · 英格兰东北、泰恩河南岸',['Jarrow','Wearmouth-Jarrow','Monkwearmouth-Jarrow','比德','毕德','雅罗'],[-1.47216,54.98006],'earlyJarrowLocation','采用贾罗圣保罗修道院遗址代表点。韦尔茅斯与贾罗是双院网络中的两个地点，不能把它们压成同一建筑；可见遗迹包含诺曼及更晚重建。'),
 point('canterbury','坎特伯雷','英国 · 英格兰东南、肯特',['Canterbury','Cantwaraburh','坎特布雷','坎特伯里','肯特'],[1.083222,51.28],'earlyCanterburyLocation','采用 UNESCO 大教堂遗产点坐标，辅助定位城市及教会中心；不是肯特王国边界，也不把现存教堂整体视为 597 年建筑。'),
 point('dunadd','邓纳德','英国 · 苏格兰西部、阿盖尔的基尔马丁谷地',['Dunadd','Dún Ad','Dun At','达尔里阿达','Dal Riata','Dál Riata'],[-5.47865,56.08575],'earlyDunaddLocation','采用邓纳德山丘代表点，帮助寻找王权据点。山顶足印可能与即位仪式有关；不认定为某位国王的真实脚印或精确宫殿坐标。'),
 point('iona','爱奥那修道院','英国 · 苏格兰西岸、马尔岛以西的爱奥那岛',['Iona','Í','艾奥纳','爱奥纳','科伦巴'],[-6.3916,56.33529],'earlyIonaLocation','采用现代修道院代表点。现存主体为十三世纪及后世工程；795 年袭击定位相关修院地区，不复原登陆点或航线。'),
 point('clonmacnoise','克朗麦克诺伊斯','爱尔兰 · 岛屿中部、香农河东岸',['Clonmacnoise','Cluain Mhic Nóis','克朗麦克诺斯','克隆麦克诺伊斯'],[-7.9867,53.3261],'earlyClonmacnoiseLocation','采用遗址代表点，不把教会中心当作爱尔兰统一王都。现存诸教堂和石十字架包含较晚建筑，著名经文十字架属十世纪。'),
];
const people='王室、地方贵族、教士及城乡居民的身份各不相同；盎格鲁、撒克逊等历史称谓不能直接换算成现代人种或人口比例。';
const language='古英语背景口语与教会拉丁文书写分别理解；本条没有足以绘制各语言人数与边界的资料。';
const westernPeople='盖尔、不列颠及其他地方社群与教会、王权网络交错；跨海联系不表示居民属于一个统一国家或同一种祖源。';
const westernLanguage='盖尔语、不列颠语言背景及教会拉丁文须分层理解；不按现代英、苏、爱国界倒推八世纪语言分布。';
const geography:Record<string,Source>={tamworth:'earlyTamworthLocation',jarrow:'earlyJarrowLocation',canterbury:'earlyCanterburyLocation',dunadd:'earlyDunaddLocation',iona:'earlyIonaLocation',clonmacnoise:'earlyClonmacnoiseLocation'};
const local=(id:string,from:number,to:number,kind:HistoricalDetail['kind'],control:string,...sources:Source[]):HistoricalDetail=>{
 const p=islandPlaces.find(p=>p.id===id)!;const west=['dunadd','iona','clonmacnoise'].includes(id);
 const reading:ReadingReference[]=[{chapter:177,pages:[1504,1515],note:'对应课程七王国、教会与维京活动背景；具体地点细节另据考古、博物馆及遗产机构资料。'}];
 return {id:`islands-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind,period:from===to?`公元 ${from} 年的地点记录`:`${from}—${to} 年的地点背景`,polity:fact(control,...sources),territory:fact(p.modern+'。点位帮助辨认位置，不代表政权或教区边界。',geography[id]),people:fact(west?westernPeople:people,'earlyIslandKingdoms'),language:fact(west?westernLanguage:language),nameNote:fact(p.description,geography[id],...(id==='dunadd'?['earlyDunaddHistory' as const]:id==='iona'?['earlyIonaHistory' as const]:id==='clonmacnoise'?['earlyClonmacnoiseHistory' as const]:id==='tamworth'?['earlyTamworthHistory' as const]:[])),related:(west?['dunadd','iona','clonmacnoise','lindisfarne']:['tamworth','jarrow','canterbury','york','winchester']).filter(x=>x!==id),reading,...(id==='iona'?{readingNote:'课程第 177 讲 PDF 1513 页把八世纪末袭击与阿尔弗雷德的抗争连讲；阿尔弗雷德在位为 871—899 年，不能提前放入 793 或 795 年。爱奥那与林迪斯法恩也在不同海岸。',readingNoteSource:'earlyAlfredDates' as const}:id==='tamworth'?{readingNote:'课程第 177 讲的“七王国”可作找位置的入口；古代王国与后世郡名有延续，但不能据同名推定疆界千年不变，也不能把每一年都画成七个同等独立国家。',readingNoteSource:'earlyIslandNames' as const}:{})};
};
export const islandDetails:HistoricalDetail[]=[
 local('tamworth',701,756,'早期中心','麦西亚王权活动的重要地区。考古报告讨论七世纪 Tomtun 与本地的联系，并以 751 年 Tamuuorthie 为明确地名记录；早期王宫确址仍有推定成分，不将这里写成唯一固定首都。','earlyTamworthHistory'),
 local('tamworth',757,795,'宫廷驻地','奥法自 757 年统治麦西亚，塔姆沃思是其王权网络的重要中心。对其他王国的优势、臣属关系和直接治理须区别，不能把全不列颠、威尔士和爱尔兰涂成一个国家。','earlyTamworthHistory','earlyOffa'),
 local('tamworth',796,796,'历史城市','796 年奥法去世，其子埃格弗里思也在数月后去世，王位再次更替。年内不同君主不能压成全年奥法仍在位；这里定位麦西亚中心，不指认去世地点。','earlyOffa','earlyTamworthHistory'),
 local('tamworth',797,800,'历史城市','奥法之后麦西亚王权仍延续，塔姆沃思仍是重要中心；不能把 825 年威塞克斯优势或 913 年设防城镇工程提前到本期。','earlyOffa','earlyTamworthHistory'),
 local('jarrow',701,730,'早期中心','诺森布里亚的韦尔茅斯—贾罗修道网络与比德的学习写作背景；不是麦西亚王都。两处修院之间的联系不是统一国家的疆界。','earlyJarrowHistory'),
 local('jarrow',731,731,'事件地点','比德约在 731 年完成《英吉利教会史》，本点定位他活动的贾罗修院。著作把不同地方历史连在一起，不说明政治上已经有统一英格兰；不认定某个现存房间为写作现场。','earlyBede731','earlyJarrowHistory'),
 local('jarrow',732,800,'早期中心','比德著作形成之后的诺森布里亚修院背景；本时段不表示作者始终在世。793 年著名袭击目标是林迪斯法恩，不能把它与贾罗或约克互换。','earlyJarrowHistory','earlyLindisfarne'),
 local('canterbury',701,800,'历史城市','肯特的教会中心，597 年奥古斯丁传教的后续网络。大主教的宗教联系不等于肯特国王对整个群岛的政治统治；八世纪麦西亚势力与地方王权关系须另看。','earlyCanterburyHistory','earlyIslandPolitics'),
 local('dunadd',701,800,'早期中心','达尔里阿达盖尔王权的重要据点，遗产机构将其王权中心背景概括为约 500—800 年。这里还存在手工业与跨海联系；本条未逐年核定八世纪每次战争后的控制，不把它画成现代苏格兰首都。','earlyDunaddHistory'),
 local('iona',701,794,'早期中心','科伦巴自 563 年建立的修道传统继续发展，爱奥那连接爱尔兰与不列颠北部的宗教网络。八世纪艺术、学习与朝圣中心不等于统治整个苏格兰或爱尔兰的王都。','earlyIonaHistory'),
 local('iona',795,795,'事件地点','795 年有袭击爱奥那修院的记录；这是西海岸岛屿上的事件，与 793 年东北海岸林迪斯法恩之袭分开。不能由袭击推出北欧已吞并整个群岛。','earlyIonaRaid'),
 local('iona',796,800,'早期中心','795 年袭击之后的修院背景。九世纪后续袭击及圣物向邓凯尔德、凯尔斯转移另有时间，不能将这些过程都压入 795 年；《凯尔斯书》的制作地点也有不确定性。','earlyIonaHistory','earlyIonaRaid'),
 local('clonmacnoise',701,800,'早期中心','六世纪起发展的香农河修院与聚落，是理解爱尔兰内陆宗教、交通网络的地点。爱尔兰有多个地方王权，修院声望不意味着它是全岛首都或由英格兰王国直辖。','earlyClonmacnoiseHistory','earlyIslandKingdoms'),
];
const city=(id:string,name:string,site:string,siteName:string,dates:string,where:string,control:string,...sources:Source[]):RegionalPolityCard=>({id,name,site,siteName,from:701,to:800,dates,where,control,people,language,sources});
const frame=(id:string,name:string,where:string,control:string,bounds:[number,number][],locationLabel:string,...sources:Source[]):RegionalPolityCard=>({id,name,site:'',siteName:'',from:701,to:800,dates:'本卡说明 701—800 年的地域与政治关系；不是政权完整存续年表',where,control,people,language,bounds,locationLabel,sources});
export function islandPolitiesAt(year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 return [
 city('mercia',year<757?'奥法之前的麦西亚':year<796?'奥法的麦西亚':year===796?'麦西亚的年内王位更替':'奥法之后的麦西亚','tamworth','塔姆沃思','奥法在位 757—796 年；796 年两次王位更替；825 年优势转移另列','大致在今英格兰中部，塔姆沃思及利奇菲尔德是核心地点线索；不是北方约克。',year<757?'麦西亚已是重要王国，不能把奥法的统治提前到本期。':year<796?'奥法取得南方霸权，但臣属关系、联姻和直接领土不同；奥法堤也不是所有民族的固定分界。':year===796?'奥法与继位的埃格弗里思先后去世；年度记录须保留内部先后，不显示成奥法统治到年末。':'麦西亚仍存在，不能因奥法去世就显示威塞克斯已统一全岛。','earlyOffa','earlyTamworthHistory'),
 city('northumbria','诺森布里亚','york','约克','本卡 701—800 年；793 年修院袭击不等于王国灭亡，866 年约克易主更晚','亨伯河以北，向东北海岸和更北延展；约克、贾罗与林迪斯法恩是不同地点。','王权与教会中心并存，不能因麦西亚在南部占优势就把诺森布里亚写为其直辖。比德的历史书也不表示政治统一。','earlyIslandPolitics','earlyBede731','earlyLindisfarne'),
 frame('wessex','威塞克斯（西撒克逊）','今英格兰南部、温彻斯特周边向西南的政治空间，与中部麦西亚相邻。','八世纪有自己的王权，也与麦西亚竞争和联姻；阿尔弗雷德 871 年才即位，不能提前作为本期国王。温彻斯特可作方位线索，不把后来的统一王都地位贯穿全世纪。',[[-3.7,50.5],[-0.7,51.8]],'威塞克斯方向','earlyIslandPolitics','earlyOffa','earlyAlfredDates'),
 city('kent','肯特与坎特伯雷教会中心','canterbury','坎特伯雷','本卡 701—800 年；597 年传教起点早于本期资料','英格兰东南角，接近多佛海峡；不是泰晤士河口北侧的埃塞克斯。','地方王权与麦西亚优势关系在八世纪变化，不能画成百年不变的同等独立王国。坎特伯雷大主教与世俗国王的权力也不相同。','earlyIslandPolitics','earlyCanterburyHistory'),
 frame('east-anglia','东盎格利亚','今诺福克、萨福克方向，面向北海；在麦西亚以东、埃塞克斯以北。','这是与麦西亚、诺森布里亚不同的历史王国和地域，八世纪的强弱与臣属关系变化。本卡未逐年核定地方王位和控制，现代两郡只帮助定位。',[[0.2,51.9],[1.9,53]],'东盎格利亚方向','earlyIslandNames','earlyIslandPolitics'),
 frame('essex','埃塞克斯（东撒克逊）','泰晤士河口以北、今英格兰东南，和南岸肯特分别看。','地方王号、麦西亚影响和伦敦等城市控制不总是相同层次；不能把后来的郡界当作本期完整王国边界。',[[0,51.45],[1.4,52.2]],'埃塞克斯方向','earlyIslandNames','earlyIslandPolitics'),
 frame('sussex','苏塞克斯（南撒克逊）','英格兰南部海岸，肯特以西、威塞克斯东南方向。','八世纪处于地方统治与更强王国压力之下，不能将“七王国”理解为七个始终平等独立的国家；现存东西苏塞克斯名称也不提供古代精确疆界。',[[-0.95,50.7],[0.85,51.2]],'苏塞克斯方向','earlyIslandNames','earlyIslandPolitics'),
 {...frame('welsh','威尔士诸王权与西部边地','大不列颠岛西部，圭内斯在西北、波伊斯在中东部、德韦达在西南方向。','诸地方王权分别存在。奥法堤是边地土方工程，其用途、连续性与政治关系不能直接转换成一条现代英威国界。',[[-5.4,51.4],[-2.8,53.6]],'威尔士诸地域','earlyIslands','earlyOffaDyke'),people:westernPeople,language:westernLanguage},
 {...frame('northern-realms','北方的皮克特、达尔里阿达与不列颠王权','皮克特政治空间主要在今苏格兰东部、北部；达尔里阿达联系西部阿盖尔及跨海地区，克莱德河方向另有不列颠王权。','这些权力并非统一苏格兰的同一个省份。邓纳德可定位西部盖尔王权据点，爱奥那则是海岛修院；两者不能互换成全北方的唯一首都。',[[-7,55.3],[-1.8,59]],'北方诸政治空间','earlyIslandKingdoms','earlyDunaddHistory','earlyIonaHistory'),people:westernPeople,language:westernLanguage},
 {...frame('irish-realms','爱尔兰诸王权与修道网络','大不列颠以西的另一座大岛；阿尔斯特在北、芒斯特在南、伦斯特在东、康诺特在西，另有中部权力。','地方王权、上位王的优势和教会网络分别理解；不能用今天爱尔兰共和国与北爱尔兰的分界回填八世纪。克朗麦克诺伊斯定位香农河修院，并非全岛首都。',[[-10.8,51.3],[-5.4,55.5]],'爱尔兰诸地域','earlyIslands','earlyIslandKingdoms','earlyClonmacnoiseHistory'),people:westernPeople,language:westernLanguage},
 ];
}
export function islandAnchors(region:string,year:number):[string,string][]{
 if(region!=='britain'||year<701||year>800)return [];
 return [['tamworth','塔姆沃思 · 麦西亚中心'],['jarrow','贾罗 · 比德与修院'],['canterbury','坎特伯雷 · 肯特教会中心'],['dunadd','邓纳德 · 西部王权据点'],['iona',year===795?'爱奥那 · 795 年袭击':'爱奥那 · 海岛修道网络'],['clonmacnoise','克朗麦克诺伊斯 · 爱尔兰内陆修院']];
}
