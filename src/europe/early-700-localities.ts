import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const place=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const early700LocalPlaces:GazetteerPlace[]=[
 place('tahert','塔赫尔特','阿尔及利亚 · 提亚雷特西南、塔格德姆特一带',['Tahert','Tihert','Tahart','塔赫特','提赫尔特','鲁斯塔姆','伊巴德派'],[1.22727,35.33543],'earlyTagdemtLocation','鲁斯塔姆伊玛目政权的中心。采用塔格德姆特现代地点作地域参照，研究将古城遗址置于现代提亚雷特以西约 8 公里；本点不是核定古城中心或城墙。'),
 place('sijilmasa','西吉尔马萨','摩洛哥 · 里萨尼附近、塔菲拉勒特绿洲',['Sijilmassa','Sijilmasa','Sigilmassa','锡吉尔马萨','苏夫里派','米德拉尔'],[-4.27583,31.285],'earlySijilmasaLocation','撒哈拉北缘绿洲城市。坐标取考古项目地图代表点，757／758 年是文献中的形成传统，不代表此前没有聚落。'),
 place('volubilis','瓦卢比利斯','摩洛哥 · 穆莱伊德里斯附近',['Volubilis','Walili','沃卢比利斯','瓦利利','伊德里斯'],[-5.55,34.07],'earlyVolubilisLocation','罗马旧城地区延续到早期伊斯兰时代，与伊德里斯一世早期中心有关。地图复用已有遗址附近概略点，UNESCO 坐标供进一步核对；不代表八世纪宫廷精确位置。'),
 place('lindisfarne','林迪斯法恩','英国 · 诺森伯兰郡圣岛',['Lindisfarne','Holy Island','圣岛','林迪斯凡','维京袭击'],[-1.800675,55.669964],'earlyLindisfarneLocation','不列颠东北海岸修道院所在地，793 年遭袭。现存主体遗迹多属后来的重建，不直接当作八世纪建筑轮廓。'),
 place('roncesvalles','龙塞斯瓦列斯地区','西班牙 · 纳瓦拉、比利牛斯山脉',['Roncesvalles','Roncevaux','Orreaga','龙塞斯瓦耶斯','罗兰'],[-1.30731,43.01894],'earlyRoncesvallesLocation','778 年查理远征撤退遭伏击的相关山地区域。采用西班牙档案馆地名记录定位，不认定为精确伏击点，也不把后世教堂当作当年建筑。'),
];
export interface AfricanLocalPolity {id:string;name:string;from:number;to:number;dates:string;site:string;where:string;control:string;people:string;language:string;sources:Source[]}
export const africanLocalPolities:AfricanLocalPolity[]=[
 {id:'sijilmasa',name:'西吉尔马萨的苏夫里派地方政权',from:757,to:800,dates:'文献传统约 757／758 年形成；米德拉尔家族统治还需分段',site:'sijilmasa',where:'最西部马格里布南缘，今天摩洛哥塔菲拉勒特绿洲。',control:'绿洲与商路节点形成地方权力，苏夫里派和塔赫尔特的伊巴德派是不同宗教政治网络；不将整个阶段一概写为同一个家族稳定统治。',people:'柏柏尔／阿马齐格地方社群、宗教领袖与商人共同参与；后世贸易规模和人口不能提前套入建城年。',language:'地方语言与伊斯兰教书写传统并存，暂不提供八世纪各语言的比例。',sources:['earlySijilmasaHistory','earlySijilmasaResearch']},
 {id:'rustamid',name:'鲁斯塔姆伊玛目政权',from:777,to:800,dates:'常用 777—909 年；伊玛目推选也有 776／777 年记法',site:'tahert',where:'中央马格里布，今天阿尔及利亚提亚雷特以西一带。',control:'塔赫尔特为政治、宗教与贸易中心。伊巴德派社群跨地域联系不等于所有联系地区都被同等直辖；九世纪最大范围不倒填到 777 年。',people:'柏柏尔伊巴德派社群、伊朗背景统治家族与其他商人、旧地方居民分别理解；家族祖源不是全民身份。',language:'阿拉伯文宗教学术与地方语言传统分开记录，没有精确语言边界或居民比例。',sources:['earlyRustamidHistory','earlyRustamidResearch','earlyTahertArchaeology']},
 {id:'idrisid',name:'伊德里斯王朝的早期中心',from:788,to:800,dates:'常用王朝起点 788 年；本卡仅详述 788—800 年',site:'volubilis',where:'最西部马格里布北部，瓦卢比利斯／瓦利利地区。',control:'伊德里斯一世在地方支持下建立王权。早期中心、后来的非斯与现代摩洛哥是不同尺度，不把后世非斯都城状态提前放入本期。',people:'伊德里斯家族与支持者、当地柏柏尔社群及旧城市居民不能合并为同一种祖源。',language:'阿拉伯文宗教与王权传统、本地语言及旧城文化并存；不设全体居民统一母语。',sources:['earlyIdrisidHistory','earlyVolubilis']},
];
export function africanPolitiesAt(year:number){return africanLocalPolities.filter(p=>p.from<=year&&year<=p.to);}
export function early700LocalAnchors(region:string,year:number):[string,string][]{
 if(year<500||year>800)return [];
 if(region==='africa')return africanPolitiesAt(year).map(p=>[p.site,early700LocalPlaces.find(s=>s.id===p.site)!.name]);
 if(region==='britain'&&year>=701)return [['lindisfarne','林迪斯法恩 · 修道院']];
 if(region==='iberia'&&year===778)return [['roncesvalles','龙塞斯瓦列斯 · 山地区域']];
 return [];
}
const geographySources:Record<string,Source>={tahert:'earlyTagdemtLocation',sijilmasa:'earlySijilmasaLocation',volubilis:'earlyVolubilisLocation',lindisfarne:'earlyLindisfarneLocation',roncesvalles:'earlyRoncesvallesLocation'};
const city=(id:string,from:number,to:number,polity:HistoricalFact,people:HistoricalFact,language:HistoricalFact,nameNote:HistoricalFact,related:string[]):HistoricalDetail=>({id:`local700-${id}-${from}`,placeId:id,title:early700LocalPlaces.find(p=>p.id===id)!.name,from,to,focusYear:from,kind:id==='roncesvalles'||id==='lindisfarne'&&from===793?'事件地点':id==='lindisfarne'?'早期中心':'历史城市',period:from===to?`公元 ${from} 年的事件位置`:`${from}—${to} 年的地方政治背景`,polity,people,language,nameNote,territory:fact(early700LocalPlaces.find(p=>p.id===id)!.modern+'。城市和遗址代表点用于理解位置，不是国家、城市或族群疆界。',geographySources[id]),related});
export const early700LocalDetails:HistoricalDetail[]=[
 ...africanLocalPolities.map(p=>city(p.site,p.from,p.to,fact(p.control,...p.sources),fact(p.people,...p.sources),fact(p.language,...p.sources),fact(early700LocalPlaces.find(s=>s.id===p.site)!.description,...p.sources,geographySources[p.site]),['kairouan','carthage'])),
 city('lindisfarne',701,792,fact('诺森布里亚王权背景中的修道院，与附近王权有联系；不是麦西亚或一个统一英国的唯一宗教中心。','earlyLindisfarneHistory'),fact('修士、宗教机构及地方社会分别理解，不能从修道院文化推定全岛居民身份。','earlyLindisfarneHistory'),fact('八世纪早期福音书体现拉丁文宗教书写与多种艺术文化联系，不能据此推定所有居民日常只说拉丁语。','earlyLindisfarneHistory'),fact('以现存遗址位置帮助定位早期修道院；可见建筑多为后世重建。','earlyLindisfarneHistory'),['york']),
 city('lindisfarne',793,793,fact('793 年海上袭击目标为这里的修道院；不等于约克同时易主或全诺森布里亚被吞并。','earlyLindisfarne'),fact('袭击涉及修道院共同体，不能由军队称谓推导全岛人口替换。','earlyLindisfarne'),fact('本事件不能证明当地语言在一年内全部改变。'),fact('遗址坐标定位实际目标地区；八世纪建筑布局不由现代遗迹直接复原。','earlyLindisfarneLocation'),['york']),
 city('lindisfarne',794,800,fact('793 年袭击后的早期修道院背景，不能把后来修士离岛或十二世纪重建提前到本期；本卡未逐年核定驻军。','earlyLindisfarneHistory','earlyLindisfarne'),fact('宗教共同体与地方社会继续分开记录；损失数字和人口比例未收录。'),fact('没有足以确定各语言比例的本地资料。'),fact('八世纪早期修道院与后来建筑分开理解。','earlyLindisfarneHistory'),['york']),
 city('roncesvalles',778,778,fact('查理的伊比利亚远征撤退时，后卫在相关山地区域遭袭。艾因哈德称袭击者为加斯科涅人／瓦斯科人；不能把后世史诗中的敌人身份直接当作本事件事实。','earlyEinhard'),fact('远征军和当地袭击者的政治、军事身份不能当作整片山地居民的普查。','earlyEinhard'),fact('本条没有当地语言比例；后世法语史诗不等于当年的通用口语。'),fact('档案馆提供的是地名参考坐标；具体伏击地点和完整行军路线未核实。','earlyRoncesvallesLocation'),['cordoba','narbonne']),
];
