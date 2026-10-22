import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const iberianPlaces:GazetteerPlace[]=[
 point('cangas-de-onis','坎加斯-德奥尼斯','西班牙 · 阿斯图里亚斯、塞利亚河沿岸',['Cangas de Onís','Cangues d’Onís','Canicas','坎加斯','佩拉约'],[-5.131904,43.350495],'earlyCangasLocation','现代市区代表点，用于寻找阿斯图里亚斯早期中心；不是佩拉约王宫或 737 年圣十字教堂的精确遗址坐标。'),
 point('covadonga','科瓦东加地区','西班牙 · 阿斯图里亚斯、坎加斯东南的山地',['Covadonga','Cuadonga','科瓦栋加','科瓦东加'],[-5.053877,43.307084],'earlyCovadongaLocation','以今天科瓦东加圣地定位传统战事区域，不认定为 722 年精确战场。现存大教堂建于 1877—1901 年，不能当作佩拉约时代建筑。'),
 point('pravia','普拉维亚','西班牙 · 阿斯图里亚斯、纳隆河下游',['Pravia','普拉维阿','希洛','阿多辛达'],[-6.111489,43.4875717],'earlyPraviaLocation','采用现代市区参考点，不指认八世纪王宫。邻近圣蒂亚内斯教堂属于希洛时代的宗教建筑线索，也不等于整座宫廷或王国边界。'),
 point('zaragoza','萨拉戈萨','西班牙 · 阿拉贡、埃布罗河中游',['Zaragoza','Saraqusta','Caesaraugusta','萨拉戈斯','萨拉库斯塔'],[-0.8809,41.6521],'earlyZaragozaLocation','OpenStreetMap 现代城市代表点。用于定位 778 年查理未能进入的城市，不表示围城营地、城门或八世纪城墙位置。'),
 point('pamplona','潘普洛纳','西班牙 · 纳瓦拉、比利牛斯西段以南',['Pamplona','Iruña','伊鲁尼亚','潘普罗纳'],[-1.644,42.8182],'earlyPamplonaLocation','OpenStreetMap 现代城市代表点。778 年撤退途中破坏城防的具体位置未在本图核定；现存城防包含后世工程。'),
];
const northernPeople='地方山地社群、王室及其追随者、教会和外来迁入者分别理解；佩拉约的具体出身有争议，不能把所有居民都判为西哥特后裔。';
const southernPeople='阿拉伯和柏柏尔背景的征服者与地方居民并存，基督徒、犹太人及穆斯林等身份各有变化；宗教、军政身份和祖源不是同一分类。';
const language='本条尚未核定当地居民日常语言及其比例；王室、教会或军队使用的书面语言不能代替居民普查。';
const geography:Record<string,Source>={'cangas-de-onis':'earlyCangasLocation',covadonga:'earlyCovadongaLocation',pravia:'earlyPraviaLocation',zaragoza:'earlyZaragozaLocation',pamplona:'earlyPamplonaLocation'};
const local=(id:string,from:number,to:number,kind:HistoricalDetail['kind'],control:string,...sources:Source[]):HistoricalDetail=>{
 const p=iberianPlaces.find(p=>p.id===id)!;const campaign=id==='zaragoza'||id==='pamplona';
 const reading:ReadingReference[]=[{chapter:campaign?141:148,pages:campaign?[1184,1192]:[1238,1247],note:'课程提供阅读背景；本地点纪年、地理及史料差异另据独立资料补充。'}];
 return {id:`iberia-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind,period:from===to?`公元 ${from} 年的事件地区`:`${from}—${to} 年的地方政治背景`,polity:fact(control,...sources),territory:fact(p.modern+'。点位用于找位置，不代表政权疆界。',geography[id]),people:fact(campaign?'远征军、城市守军、地方首领和城内居民须分别理解；不能从一次军事交涉推断全城居民的宗教或祖源。':northernPeople,...sources),language:fact(language),nameNote:fact(p.description,geography[id]),related:campaign?['zaragoza','pamplona','roncesvalles','cordoba'].filter(x=>x!==id):['cangas-de-onis','covadonga','pravia','oviedo','cordoba'].filter(x=>x!==id),reading,...(!campaign?{readingNote:'第 148 讲 PDF 1245 页写跨海征服为 717 年，相邻第 149 讲 1247 页写 711 年；本图据独立资料采用 711 年。第 149 讲开头的“东北角”也不能用来定位阿斯图里亚斯：它在半岛北部偏西。',readingNoteSource:'umayyad' as const}:{})};
};
export const iberianDetails:HistoricalDetail[]=[
 local('cangas-de-onis',718,721,'早期中心','传统纪年以 718 年佩拉约起事为早期节点，坎加斯是北方权力中心的线索。不能据后世叙述复原本期完整国界或精确宫廷建筑。','earlyAsturiasOrigins'),
 local('cangas-de-onis',722,767,'王国中心','坎加斯是阿斯图里亚斯的早期王权中心。722 年科瓦东加采用常见纪年，战事规模与叙事有争议；737 年法维拉时代圣十字教堂是另一宗教纪年线索。','earlyAsturiasOrigins'),
 local('cangas-de-onis',768,800,'历史城市','作为早期王权中心继续定位；不能把 768 年之后王廷始终固定在此。奥雷利奥与纳隆河谷的驻地传统、774 年希洛时期普拉维亚、791 年阿方索二世时期奥维耶多须分别看。','earlyAurelio','earlyPraviaCourt','earlyOviedoCourt'),
 local('covadonga',722,722,'事件地点','以常见的 722 年纪年标出佩拉约与科瓦东加相关战事。后世王国起源叙事与可核实战况应分开，规模、精确战场及参战人数未在本图核定。','earlyAsturiasOrigins'),
 local('pravia',774,790,'宫廷驻地','希洛（774—783 年在位）与阿多辛达将王廷移至普拉维亚，邻近圣蒂亚内斯保存相关宗教建筑线索。本卡连至 790 年，只表达奥维耶多 791 年王都阶段之前的王廷背景，不等于希洛在位至 790 年。','earlyPraviaCourt','earlyOviedoCourt'),
 local('pravia',791,800,'历史城市','阿方索二世时期奥维耶多成为王都；普拉维亚作为此前王廷所在地继续存在。迁移政治中心不表示原有居民和城镇消失。','earlyPraviaCourt','earlyOviedoCourt'),
 local('zaragoza',778,778,'事件地点','查理进入伊比利亚后在萨拉戈萨受阻：接触者的合作承诺与实际守城者立场不同，城方拒绝放行，远征军最终退却。不能标成 778 年已被法兰克吞并。','earlyIberianCampaign','earlyEinhard'),
 local('pamplona',778,778,'事件地点','查理从萨拉戈萨退却后在潘普洛纳破坏城防，再撤向比利牛斯。具体动机和事件细节存在解释差异；随后山中后卫遭袭不等于潘普洛纳城内发生同一场会战。','earlyIberianCampaign','earlyEinhard'),
 {id:'oviedo-early-foundation',placeId:'oviedo',title:'奥维耶多',from:761,to:790,focusYear:761,kind:'早期中心',period:'761—790 年：修院起源传统与早期聚落',polity:fact('圣维森特修院的 761 年起源日期见于后世传存文书，博物馆指出十二世纪抄本有插入内容。弗鲁埃拉一世时代的背景与 791 年阿方索二世王都阶段分开；不能断言城市在 761 年从空地突然建立。','earlyOviedoFoundation','earlyOviedoCourt'),territory:fact('位于伊比利亚北部偏西、阿斯图里亚斯山地北侧；本点复用城市概略定位，不是已核定的 761 年修院边界。','oviedo'),people:fact(northernPeople,'earlyAsturiasOrigins'),language:fact(language),nameNote:fact('奥维耶多的修院起源、后来王都与今天考古博物馆不是同一个年代的建筑。本卡不把 791 年的地位提前到 761 年。','earlyOviedoFoundation'),related:['cangas-de-onis','pravia','cordoba'],reading:[{chapter:148,pages:[1238,1247],note:'北方王国的定位补充；修院文书细节见考古博物馆独立资料。'}]},
];
const cityCard=(id:string,name:string,site:string,siteName:string,dates:string,where:string,control:string,people:string,...sources:Source[]):RegionalPolityCard=>({id,name,from:701,to:800,dates,site,siteName,where,control,people,language,sources});
export function iberianPolitiesAt(year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 const south=cityCard('andalus',year<=710?'托莱多的西哥特王权':year<=717?'征服与地方交接中的半岛':year<=749?'倭马亚体系内的安达卢斯行省':year<=755?'东方革命后的安达卢斯地方竞争':'科尔多瓦埃米尔国',year<=710?'toledo':'cordoba',year<=710?'托莱多':'科尔多瓦','711 年征服开始；756 年独立埃米尔国；929 年才称哈里发','半岛中南部的托莱多、科尔多瓦与北部山地分开；不能套用现代西班牙和葡萄牙国界。',year<=710?'西哥特王国仍存在；纳博讷所在的塞普提马尼亚也未在 507 年全部失去。':year<=717?'711 年起经战争和协议逐步交接，不能把整个半岛写成同日易主。':year<=749?'安达卢斯属于大马士革倭马亚体系，北方王权与比利牛斯地方社群另有政治进程。':year<=755?'750 年东方阿拔斯革命不等于半岛立即成为其稳定直辖省；地方竞争持续。':'756 年阿卜杜勒·拉赫曼一世建立独立埃米尔统治，政治上与阿拔斯分别存在；778 年远征未征服科尔多瓦，929 年哈里发称号尚在以后。',year<=710?'西哥特王权、地方居民和教会不等于同一种血缘人口；政治统治与居民来源分开。':southernPeople,'umayyad','earlyIberia','earlyNarbonneConquest');
 const north:RegionalPolityCard[]=year<718?[]:[year>=768&&year<774?{id:'asturias',name:'奥雷利奥时期的阿斯图里亚斯',from:768,to:773,dates:'768—774 年奥雷利奥在位；本图 774 年采用希洛即位后的阶段',site:'',siteName:'',where:'伊比利亚北部偏西，纳隆河谷与坎加斯、普拉维亚分别定位。',control:'地方资料将奥雷利奥主要驻地与圣马丁-德尔雷奥雷利奥联系起来，带有传统与推定性质。本图只定位纳隆河谷方向，不设未经核定的王宫点，也不把坎加斯到奥维耶多简化为一次直接迁都。',people:northernPeople,language,bounds:[[-5.9,43.15],[-5.45,43.45]],locationLabel:'纳隆河谷方向',sources:['earlyAurelio']}:cityCard('asturias',year<722?'佩拉约与北部早期权力中心':year<774?'坎加斯与阿斯图里亚斯早期王权':year<791?'普拉维亚王廷与阿斯图里亚斯':'奥维耶多王都与阿斯图里亚斯',year<774?'cangas-de-onis':year<791?'pravia':'oviedo',year<774?'坎加斯-德奥尼斯':year<791?'普拉维亚':'奥维耶多','常见起点 718 年；722 年传统战事；774 年普拉维亚；791 年奥维耶多；910 年继承与王廷变化','位于半岛北部偏西、坎塔布连山地及其北侧，不是加泰罗尼亚所在的东北角。',year<722?'佩拉约起事和早期权力中心采用传统纪年；此时不能提前展示科瓦东加已经取胜。':year<774?'科瓦东加的起源叙事与坎加斯的早期王权分别看，不能由战事推出完整国家边界。':year<791?'希洛与阿多辛达将王廷移到普拉维亚；希洛在位止于 783 年，此后仍须区分王位继承和 791 年奥维耶多阶段。':'阿方索二世时期王都在奥维耶多，城市早期修院传统可上溯到 761 年，但两者不是同一事件。',northernPeople,'earlyAsturiasOrigins','earlyPraviaCourt','earlyOviedoCourt')];
 const pyrenees:RegionalPolityCard={id:'pyrenees',name:'比利牛斯西部的地方社群与交通带',from:701,to:800,dates:'本卡 701—800 年；778 年远征单独定位',site:'',siteName:'',where:'潘普洛纳在山南，龙塞斯瓦列斯在比利牛斯山中；与更东南的埃布罗河萨拉戈萨分开。',control:year===778?'依次看萨拉戈萨拒绝放行、撤退中潘普洛纳城防遭破坏、山中后卫受袭。三个地点不是同一场攻城战；连接关系不等于已核定的逐段路线。':'地方首领与山地社群同法兰克、安达卢斯的关系随时间变化。本卡定位交通空间，不提前画出后世纳瓦拉、阿拉贡王国的国界。',people:'瓦斯科／巴斯克等称谓有历史语境；778 年袭击集团不等于全体山地居民，也不能用后世《罗兰之歌》的敌方身份替代史料。',language,bounds:[[-2.8,42.3],[0,43.8]],locationLabel:'比利牛斯西部',sources:['earlyIberianCampaign','earlyEinhard']};
 const narbonne=cityCard('septimania',year<=718?'西哥特塞普提马尼亚':year===719?'纳博讷交接的纪年过渡':year<=758?'纳博讷的穆斯林控制':'法兰克控制下的纳博讷','narbonne','纳博讷','719／720 年交接存在不同记法；759 年法兰克取得城市','比利牛斯以北、地中海沿岸，今法国南部；不是伊比利亚半岛内部城市。',year<=718?'507 年之后西哥特仍保有塞普提马尼亚，不能把全部高卢都提前涂为法兰克。':year===719?'部分纪年写 719 年，研究亦采用 720 年；本年度保留交接不确定性。':year<=758?'作为安达卢斯向比利牛斯以北活动的据点理解，地方居民不等于所有人都变成征服军。':'759 年丕平取得纳博讷；756 年科尔多瓦独立、759 年城市交接、778 年查理远征是三件不同事件。',southernPeople,'earlyNarbonneConquest','earlyNarbonne');
 return [south,...north,pyrenees,narbonne];
}
export function iberianAnchors(region:string,year:number):[string,string][]{
 if(region!=='iberia'||year<701||year>800)return [];
 const anchors:[string,string][]=[];
 if(year>=718)anchors.push(['cangas-de-onis',year<768?'坎加斯 · 早期王权中心':'坎加斯 · 早期中心旧址']);
 if(year===722)anchors.push(['covadonga','科瓦东加 · 传统战事地区']);
 if(year>=761)anchors.push(['oviedo',year<791?'奥维耶多 · 修院起源传统':'奥维耶多 · 王都']);
 if(year>=774)anchors.push(['pravia',year<791?'普拉维亚 · 王廷':'普拉维亚 · 旧王廷所在地']);
 if(year===778)anchors.push(['zaragoza','萨拉戈萨 · 远征受阻'],['pamplona','潘普洛纳 · 撤退与城防']);
 return anchors;
}
