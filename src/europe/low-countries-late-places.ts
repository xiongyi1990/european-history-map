import data from './low-countries-late-place-data.json';
import {lowCountriesSources as sources} from './low-countries-late-sources';
import {lowCountriesReading,lowFlandersState} from './low-countries-late';
import {medievalTransitionFrames} from './medieval-transition';
import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
export const lowCountriesPlaces:GazetteerPlace[]=data.map(p=>({id:p.id,name:p.name,modern:p.modern,aliases:p.aliases,coords:p.coords as [number,number],source:sources[p.key as keyof typeof sources].url,kind:'低地历史地点',description:'约略地理代表点，配通行历史名称和现代位置；不是测绘城界、宫廷常驻地或精确阵线。'}));
const fact=(text:string,...sources:HistorySource[])=>({text,sources:[...new Set(sources)]});
export const lowCountriesDetails:HistoricalDetail[]=medievalTransitionFrames.flatMap(f=>{
 const y=f.year;
 const realm=(id:string)=>f.realms.find(r=>r.id===id)!;
 const entry=(id:string,name:string,rid:string,location:string,related:string[],extra:Partial<HistoricalDetail>={}):HistoricalDetail=>{const r=realm(rid);return {id:`${id}-low-countries-${y}`,placeId:id,from:y,to:y,focusYear:y,kind:'历史城市',title:name,displayName:name,period:f.eventDate,polity:fact(r.ruler+'。'+r.status,'lowChronology'),territory:fact(location),people:fact(r.people,'lowDamen'),language:fact(r.language),nameNote:fact('中文名、检索别名及今天位置用于对照；同一历史领地可能横跨现代国界，不能把现代省界倒填。'),related,reading:lowCountriesReading,readingNote:'课程提出荷兰、埃诺与布拉班特的位置问题；时点、头衔、代理治理和城市事件据独立文书、档案及学术资料细分。',...extra};};
 const fl=lowFlandersState(y);
 const flPol=()=>fact(fl.ruler+'。'+fl.status,'lowLouis','lowMargaret','lowRoosebeke','lowGavere');
 const hs=realm('holland-late'),ha=realm('hainaut-late');
 const hollandPeople=fact('伯爵、代理人、贵族、官署人员、城市机构与城乡居民分别理解；胡克派与鳕鱼派是政治阵营，不能解释成两个民族。','lowChronology');
 const hollandLanguage=y>=1377?fact('1367印章使用代理头衔，1389以后改用伯爵；学术研究将拉丁文印章与中古荷兰语文书分别讨论。这是权力和书写材料，不是每座城市的口语调查。','lowSeal'):fact('1367印章尚未出现；本年各城居民口语样本未核齐，不从伯爵家族名称推导语言。');
 const hPeople=fact('蒙斯、瓦朗谢讷的市民、地方官员、贵族、教士及手工业居民有不同身份；与荷兰同奉伯爵不等于居民都来自荷兰。','lowValenciennes');
 const hLang=y>=1450?fact('1440年代，蒙斯的让·沃克兰为公爵制作法语埃诺史译本；宫廷委托、抄写与统治合法性叙事不能当全城口语或祖源统计。','lowHainautBook'):fact('本轮尚无本年埃诺居民语言分布；1440年代蒙斯法语译本尚未形成，不能提前作为本年实物。');
 const ds:HistoricalDetail[]=[
 entry('brussels','布鲁塞尔','brabant-late','布拉班特核心、鲁汶以西，今天比利时布鲁塞尔；不是佛兰德伯国所有城市的统一首都。',['leuven','antwerp','ghent'],{people:y<1409?fact('1356特权说明城市与统治者的承诺，不能当作全体居民享有同等政治权利；1406/1415较晚召集名单不倒填成本年材料。','lowCharter'):fact((y<1415?'1406召集文书':'1406、1415召集文书')+'区分教士、贵族和城市代表；召集不证明实际到场，更不等于全体居民普选。','lowDamen'),language:fact(realm('brabant-late').language,'lowCharter','lowCharterLatin')}),
 entry('leuven','鲁汶','brabant-late','布鲁塞尔以东、迪勒河畔，Leuven与法语Louvain指同一城市；不是法国的里昂。',['brussels','antwerp'],{people:fact('1356特权明确城市、领地与统治者的承诺；这不是现代公民平等或全体居民拥有相同政治权利。','lowCharter'),language:fact(realm('brabant-late').language,'lowCharter','lowCharterLatin')}),
 entry('antwerp','安特卫普','brabant-late','斯海尔德河畔，布鲁塞尔以北；地理上靠近布拉班特，1357—1406领主阶段仍须单独看。',['brussels','leuven','bruges'],{polity:y<=1402?fact('1357和约之后处于佛兰德伯爵一侧的治理关系；不能因今天位于佛兰芒大区或邻近布拉班特，就写成本年布拉班特公爵直辖。'+fl.ruler,'lowAntwerp','lowDamen','lowMargaret'):fact('安托万1405年母亲去世后取得安特卫普领主权，1406年再继布拉班特公爵；随后继承节奏见布拉班特，但不是1405/1406同日军事征服。'+realm('brabant-late').ruler,'lowAntwerp','lowDamen','lowChronology')}),
 ...[['the-hague','海牙','荷兰沿海内陆、代尔夫特以北；伯爵官署和宫廷联系不等于现代荷兰全部疆域或固定全国首都。'],['delft','代尔夫特','海牙南面、莱顿西南；1428协议在这里达成，埃诺蒙斯远在南方，不能混成同一城市。'],['leiden','莱顿','海牙东北的旧莱茵河方向；今天位于荷兰南荷兰省。'],['gouda','豪达','海牙与代尔夫特以东的豪韦河方向；继承战争相关地域，未逐年核齐每座城堡与驻军。'],['middelburg','米德尔堡','西南的泽兰瓦尔赫伦岛方向，远离北面的海牙；本图采用现代海岸，不复原中世纪水道和围垦。']].map(([id,name,loc])=>entry(id,name,'holland-late',loc,['the-hague','delft','leiden','gouda','middelburg','mons'].filter(p=>p!==id),{people:hollandPeople,language:hollandLanguage,...(id==='delft'?{polity:fact(hs.ruler+'。'+hs.status+(y>=1429?'1428年7月3日协议在本城达成；1429/1431仍应区分女伯爵和公爵代理，1433另有正式放弃。':'1428代尔夫特协议尚未发生；不能提前将本城全部写成菲利普善良的伯爵直辖。'),'lowChronology','lowJacoba')}:{}),...(id==='the-hague'&&y>=1435?{nameNote:fact('1433许可文书教学页面提供现代荷兰语译读；不能把现代译文当成1433原文口语，也不据此虚填城市语言比例。','low1433')}:{}),...(id==='middelburg'?{polity:fact(hs.ruler+'。'+hs.status+'泽兰是另一个伯国；本点不代表所有泽兰岛屿都已完整绘出。','lowChronology')}:{} )})),
 entry('mons','蒙斯（贝尔亨）','hainaut-late','埃诺内陆城市，布鲁塞尔西南；Mons与Bergen在此为同城双名，不能误连挪威卑尔根。',['valenciennes','the-hague','delft','brussels'],{people:hPeople,language:hLang,polity:fact(ha.ruler+'。'+ha.status+(y>=1389&&y<=1402?'阿尔布雷希特之子威廉已参与埃诺地方治理，尚不能提前称其正式继三伯国。':''),'lowChronology','lowJacoba')}),
 entry('valenciennes','瓦朗谢讷','hainaut-late','斯海尔德河沿岸、蒙斯西南，今天法国北部；中世纪属于埃诺地域，现代法比国界不等于当时伯国界。',['mons','ghent','the-hague'],{people:hPeople,language:hLang,territory:fact('法国文化部考古资料将本城置于埃诺及可航通商的斯海尔德河网络；1433政治联系与现代法国归属分开。','lowValenciennes')}),
 entry('bruges','布鲁日','flanders','佛兰德西侧、北海贸易方向；历史河港联系不等于现代海岸或现代安特卫普港。',['ghent','ypres','antwerp'],{polity:flPol(),people:fact('北欧和南欧商人、地方中介、旅店主人、银行家、工匠与城市官员身份不同；交易籍贯不是现代国籍统计。','lowBruges'),language:y>=1409?fact('约1400在布鲁日形成的格鲁特胡斯手稿保留中古荷兰语歌诗及多名书手活动；作品圈层不能代表全城母语。约1460才取得手稿的同名藏家不是1400作者。','lowGruuthuse'):fact('约1400手稿的估年不能精确锁定本年已抄成；本年商贸文本与居民语言分布仍待核，不从贸易对象推导口语比例。'),...(y>=1439?{polity:fact(fl.ruler+'。布鲁日1436—1438冲突已被镇压，不是本年仍在全面叛乱；1436原始诉求及誓约体现城内多种权利要求。','lowBruges','lowBrugesRevolt')}:{} )}),
 entry('ghent','根特','flanders','斯海尔德河与莱厄河交汇的城市，布鲁日以东，加弗尔在本城南面。',['bruges','ypres',...(y>=1385?['westrozebeke']:[]),...(y===1453?['gavere']:[])],{polity:flPol(),people:fact('城市机构、工匠行会与伯爵对税政、特权存在冲突；反抗者不是所有居民的统一态度，也不是一个与伯爵不同的民族。','lowGavere'),language:fact('本轮没有核齐根特全城的同期口语构成；不能将布鲁日手稿样本直接当作根特的人口调查。')}),
 entry('ypres','伊普尔','flanders','布鲁日南面、根特西面；织物厅与钟楼是城市制度和贸易的空间线索。',['bruges','ghent',...(y>=1385?['westrozebeke']:[])],{polity:flPol(),people:fact('织物贸易、城市特权、财库与警报机构体现商人、工匠和市政身份；建筑及其后世重建不能等同居民普查。','lowYpres'),language:fact('本轮未核齐本年全城语言；约1610围城图的拉丁题词不能充作1383口语材料。','lowYpresSiege'),nameNote:fact('Ieper、Ypres与伊普尔指同一城。Guillaume du Tielt所作1383围城图约1610才形成，后世纪念叙事不冒充1383现场测绘。','lowYpresSiege')}),
 ];
 if(y>=1385)ds.push(entry('westrozebeke','罗斯贝克会战地域','flanders','西罗斯贝克村南古德贝赫方向；坐标只定位战事地域，不复原方阵、兵力或军队行进路线。',['ghent','bruges','ypres'],{kind:'事件地点',polity:fact('1382年11月27日根特一方城市军战败，但根特仍继续抵抗。'+(y===1385?'本图11月底，12月18日图尔奈和平尚未发生。':'1385年12月18日和平是更晚的另一事件；本年此处为既往战事位置。'),'lowRoosebeke'),people:fact('城市军、领主军队和当地居民分开；参战方不等于一种祖源。'),language:fact('本条定位既往战事，不提供居民语言调查。')}));
 if(y===1453)ds.push(entry('gavere','加弗尔—瑟默扎克会战地域','flanders','根特以南斯海尔德河方向；实际战场在瑟默扎克高地，加弗尔城堡及营地与战场分开。',['ghent','bruges'],{kind:'事件地点',polity:fact('1453年7月23日菲利普善良军队击败根特城市军，随后根特让出部分传统自由。本图年底为事后，不是新建一个低地帝国。','lowGavere'),territory:fact('区域遗产机构将实际作战高地置于Semmerzake；加弗尔为城堡、营地及和平关联地点。代表点不等于精确军阵或现代纪念碑。','lowGaverePlace'),people:fact('根特城市军、公爵军队与当地居民分别理解，不把交战关系变成族群边界。'),language:fact('本条定位战事，不提供口语比例。')}));
 return ds;
});
