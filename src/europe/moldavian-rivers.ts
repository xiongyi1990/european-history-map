import data from './moldavian-rivers-place-data.json';
import states from './moldavian-rivers-states.json';
import {moldavianRiverSources as sources} from './moldavian-rivers-sources';
import {medievalTransitionFrames} from './medieval-transition';
import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
import type {ReadingReference} from './course-sources';
export const moldavianRiverReading:ReadingReference[]=[{chapter:156,pages:[1309,1310],note:'课程以河流和贸易建立空间线索；本页讲第聂伯河等更早背景，不能当作德涅斯特河沿岸城市的15世纪控制证据。'},{chapter:206,pages:[1764,1764],note:'本页的巴尔干概括不直接给出白堡、基利亚和霍京的逐年政权；地方港堡时序另核。'}];
export const moldavianRiverPlaces:GazetteerPlace[]=data.map(p=>({id:p.id,name:p.name,modern:p.modern,aliases:p.aliases,coords:p.coords as [number,number],source:sources[p.key as keyof typeof sources].url,kind:p.id==='chilia'?'河港地域约略定位':'历史地点参考',description:p.id==='chilia'?'两岸之间的编辑性河段代表点；古堡位于哪一岸存在研究分歧，不是考古确认坐标。':'约略城市或城堡代表点，不代表全城辖区；现代国家只帮助定位。'}));
const fact=(text:string,...sources:HistorySource[])=>({text,sources});
const names:Record<string,string>={'cetatea-alba':'白堡：德涅斯特河口的城港',chilia:'基利亚：驻军、税关与位置争论',khotyn:'霍京：河防、税关与地方阵营',lviv:'利沃夫：通向摩尔达维亚的商贸城市',suceava:'苏恰瓦：1408贸易特许的发文中心'};
const location:Record<string,string>={
 'cetatea-alba':'德涅斯特河口潟湖西岸，今乌克兰白堡。德涅斯特河与更东面的第聂伯河是两条不同河流；此城不在多瑙河三角洲。它位于苏恰瓦内陆色块之外，城市链接不能证明整条沿河地域都归同一政权。',
 chilia:'多瑙河基利亚支汊、今乌克兰基利亚与罗马尼亚基利亚韦凯附近。此点只代表河段；关于中世纪港城在北岸历史中心还是南侧岛区、何时迁置有不同研究解释，不能仅据今日旧基利亚之名固定古堡。它不是德涅斯特河口的白堡。',
 khotyn:'德涅斯特河沿线的内陆河堡，今乌克兰霍京。在苏恰瓦东北、白堡西北很远处；它是河防与税关地点，不能称为黑海海港。此点在苏恰瓦核心色块之外。',
 lviv:'喀尔巴阡山以北的加利西亚城市，位于波罗的海与黑海流域之间的陆路交通方向。它不在摩尔达维亚内陆色块里，也不是德涅斯特河口；商路把不同政治地域相连，不使它们成为一国。',
 suceava:'喀尔巴阡山东侧的内陆王廷城市，与白堡、霍京及利沃夫的贸易联系分别看。本条是发文与税关专题，没有复原每一段陆路或整条国境。'
};
const placeKeys:Record<string,HistorySource[]>={'cetatea-alba':['riverWhiteTown','riverWhiteTrade','riverWhiteEarly'],chilia:['riverChiliaReview','riverChiliaLocation','riverLublau','riverChiliaHunyadi'],khotyn:['riverHotinCession','riverHotinManoil','riverHotinFort'],lviv:['riverLviv','riverLvivTrade','riverLvivCharters','riverLvivSite'],suceava:['riverWhiteTrade']};
const related:Record<string,string[]>={'cetatea-alba':['suceava','chilia','khotyn','lviv'],chilia:['cetatea-alba','suceava','curtea-de-arges','buda'],khotyn:['suceava','cetatea-alba','lviv'],lviv:['suceava','khotyn','cetatea-alba','krakow'],suceava:['lviv','khotyn','cetatea-alba']};
const make=(id:string,y:number,period:string,polity:string,people:string,language:string,keys:HistorySource[],extra:Partial<HistoricalDetail>={}):HistoricalDetail=>({id:`${id}-moldavian-rivers-${y}`,placeId:id,from:y,to:y,focusYear:y,title:names[id],displayName:names[id],kind:'历史城市',period,polity:fact(polity,...keys),territory:fact(location[id],...placeKeys[id]),people:fact(people,...keys),language:fact(language),nameNote:fact(id==='chilia'?'Chilia、Kilia和Kiliya是相关检索名；Veche和Nouă意为旧/新，现代名称不能独自证明14—15世纪港堡位于哪岸。Licostomo与基利亚是否同城也有争论，不能无条件合并。':id==='cetatea-alba'?'Cetatea Albă、Moncastro、Asprokastron和Akkerman见于不同语言与时期；今比尔霍罗德德尼斯特罗夫斯基帮助定位，不能由异名推断本年归奥斯曼。':id==='khotyn'?'Hotin、Khotyn、Khotin、Chocim是不同语境的同地名称；它与白堡是同一条河上的不同地点。':id==='suceava'?'Suceava等名称用于检索，1388早期文书与本年1408贸易特许是两份不同年代的证据。':'Lviv、Lwów、Lvov、Lemberg和Leopolis供检索；利沃夫、里沃夫、利维夫并非三座城市。现代国名不倒推中世纪国籍。',...placeKeys[id]),related:related[id],reading:moldavianRiverReading,readingNote:'课程只提供河流、商路和区域格局的阅读线索；港堡控制、商人、文书与建筑分期来自独立资料。相同地点按已知事件另补，未知部分保留。',...extra});
export const moldavianRiverDetails:HistoricalDetail[]=medievalTransitionFrames.flatMap(f=>{
 const y=f.year,s=states.find(s=>s.year===y)!;
 return [
 make('cetatea-alba',y,f.eventDate.split('，')[0],s.white,y>=1422?'1421拉努瓦见闻列举热那亚、当地及亚美尼亚社群。这是一次有年代的旅行观察，不是本年人口普查，也不能据列举顺序推人数和支配地位。':y>=1364?'学术研究引1361年2月28日交易，白堡商人与热那亚商人将蜂蜜售予居于基利亚的亚美尼亚商人萨尔基斯；个人身份与跨港活动不等于全城人口构成。':'1361蜂蜜交易在本节点之后，不倒填为1360已经发生的白堡文书。商贸人员、地方官与普通居民须分别研究。',y>=1444?'1440年11月10日希腊文建设铭文是此前特定工程和书写语的证据，不意味着本年全体居民都说希腊语。':y===1440?'本年11月10日有希腊文建设铭文；节点仅定下半年，不能断言此前已刻成，或用铭文推全城家庭语言。':'1440希腊文建设铭文还在本节点之后；本年完整口语分布尚未核验。',['riverWhiteTown','riverWhiteTrade','riverWhiteEarly'],{language:fact(y>=1444?'1440年11月10日希腊文铭文显示特定工程的书写语，不能推广为全体居民母语。':y===1440?'1440年11月10日希腊文铭文属于年内较晚证据；本节点不能笼统写已经刻成，亦不能据此统计母语。':'1440希腊文铭文还在本节点之后；本年城市口语分布尚待核。','riverWhiteTown')}),
 make('chilia',y,f.eventDate.split('，')[0],s.chilia,'1360年公证书记录婚资、借贷、基利亚居民及佩拉居民/市民等身份；1360年8月13日另有Licostomo准备驶往佩拉的粮船。它们不是本年全城人口名册，也不证明两座港口必为同一城。','刊本区分中世纪拉丁文原文与现代法文提要。前者证明公证书写实践，后者不是中世纪居民语言；个人籍贯和居民资格也不等于全体家庭母语。',['riverChiliaReview','riverChiliaHunyadi','riverLublau'],{people:fact('1360公证书中的婚资、借贷和基利亚/佩拉居民或市民身份说明具体法律关系；粮船是另一条海贸证据，不能当作全城人口或两港同城的证明。','riverNotary1360','riverNotaryPeople'),language:fact('刊本区分中世纪拉丁文原文与现代法文提要；不能把法文提要当作当年的居民口语，或把一位商人的出身当作全城祖源。','riverNotary1360','riverNotaryPeople')}),
 make('khotyn',y,f.eventDate.split('，')[0],s.hotin,'文书见证、地方守臣、商人和城堡守军不是同一身份。马诺伊尔的任职与支持哪位竞争者也需分开；本轮没有全城居民或驻军名册。','本批依据文书的学术校读及现代研究；研究所用的现代罗马尼亚语、乌克兰语不能直接当作本年居民口语。',['riverHotinCession','riverHotinManoil'],{territory:fact(location.khotyn+' 保护区把现存高大城墙的主要扩建放在1460—1470年代，不能把今天的全部墙体倒填本节点已经完成。','riverHotinFort')}),
 make('lviv',y,f.eventDate.split('，')[0],s.lviv,'研究转引1356城市特许中的亚美尼亚人、犹太人、鲁塞尼亚人等称谓，反映法律与宗教社群的差别，不能等同现代国籍或全体居民相同权利。','社群称谓、教会礼仪、外交与家庭口语需分开；本轮没有完整城市母语分布。亚美尼亚教堂也不能证明全城居民使用同一种语言。',['riverLviv','riverLvivTrade','riverLvivCharters'],{territory:fact(location.lviv+(y>=1439?' 1437拱廊可作此前建筑阶段证据，现存建筑仍含更晚增建。':y<=1360?' 亚美尼亚教堂核心仍在1356—1363建造范围，不能提前显示全部建成。':' 1356—1363教堂核心与更晚拱廊、钟楼和装饰分开，不将今日遗产整体倒填本年。'),'riverLvivSite','riverLvivCathedral')})
 ];
});
// Local evidence dates only. No surrounding European political frame is borrowed.
const localNote='本条只补这一地点与这次事件；总图其他地域仍需按各自资料或明确标注的参考年代阅读，没有新增全欧洲同期实控疆界。';
const localExtra:Partial<HistoricalDetail>={kind:'事件地点',readingNote:'本条来自独立文书研究或学术章节。'+localNote};
const customs='1408年亚历山德鲁一世贸易特许的学术转引，列苏恰瓦主税关及霍京、白堡等税关，面向利沃夫商人。不同版本有10月6日/8日差异，本条只用年份；本轮未直接查验原始特许全文。';
for(const id of ['suceava','lviv','khotyn','cetatea-alba'])moldavianRiverDetails.push(make(id,1408,'1408年：贸易特许与税关（地点资料）',customs,'特许面向商人并规定贸易权利和税费，不代表全体居民同享权利，也不意味着商路沿线城市同属一个国家。','本轮读到的是学术转引与现代说明，不能把译文语言当成中世纪全城口语。',['riverWhiteTrade'],{...localExtra,territory:fact(location[id]+' '+localNote,...placeKeys[id])}));
for(const id of ['khotyn','lviv'])moldavianRiverDetails.push(make(id,1436,'1436年：割让承诺与是否交付（地点资料）','伊利亚什在利沃夫对波兰王的誓约和割让承诺涉及霍京等地；是否实际交付存在史学分歧。研究依据1438仍见摩尔达维亚地方官，认为承诺未实施，不能直接把霍京涂成波兰直辖。','王公、文书见证与地方官不是整座城市所有居民；誓约中的政治义务不能充当民族分界。','本条使用文书的现代学术校读，没有据现代论文语言推当年居民母语。',['riverHotinCession'],{...localExtra,territory:fact(location[id]+' '+localNote,...placeKeys[id])}));
moldavianRiverDetails.push(make('chilia',1448,'1448年：军援与港堡安排（地点资料）','彼得二世以基利亚等条件换取胡尼亚迪军援。匈牙利军事驻防与瓦拉几亚税关、市镇行政的研究解释分层展示，不能把领军者、地方民政与全河口疆域合并。','军援、城堡守军、税关人员和商人身份不同；本轮没有1448全港居民或驻军人数表。','公证书写语与本年家庭口语不同，现有材料不足以重建完整语言分布。',['riverChiliaHunyadi','riverChiliaReview'],{...localExtra,territory:fact(location.chilia+' '+localNote,'riverChiliaLocation','riverBlackSeaCities')}));
moldavianRiverDetails.push(make('chilia',1465,'1465年：取得基利亚（地点资料）','斯特凡三世取得基利亚。1462尝试失败与本年取得分开；不能提前写成1479北岸新堡已经完成，也不能把港城转移当作全欧洲同期疆界已经核验。','军事取得、地方民政与居民去留分别看；本条没有复原人口或族群边界。','学术章节所用现代语文不等于当年居民口语，港城家庭语言仍待核。',['riverBlackSeaCities'],{...localExtra,territory:fact(location.chilia+' '+localNote,'riverChiliaLocation','riverBlackSeaCities')}));
for(const id of ['chilia','cetatea-alba'])moldavianRiverDetails.push(make(id,1484,'1484年：两港先后失守（地点资料）',(id==='chilia'?'本条取7月基利亚失守之后，城港转入奥斯曼控制。':'本条取8月白堡失守之后，城港转入奥斯曼控制。')+'基利亚7月、白堡8月先后转移；不把两港混作同一座城或同一日，也不据此自动改变苏恰瓦内陆政权。','城港征服与全部居民被替换不是同一命题；本轮未核人口去留、强制迁移和语言分布的完整规模。','统治者改变不能直接证明所有居民立即改用同一母语；具体文书、宗教和家庭语言仍需分别补证。',['riverBlackSeaCities'],{...localExtra,territory:fact(location[id]+' '+localNote,...placeKeys[id])}));
