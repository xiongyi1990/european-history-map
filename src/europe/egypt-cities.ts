import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources} from './course-sources';
const fact=(text:string,...sources:(keyof typeof courseSources)[]):HistoricalFact=>({text,sources});
export const egyptCityRegions:Record<string,string>={pelusium:'egypt-delta',oxyrhynchus:'egypt-middle'};
export const egyptCityPlaces:GazetteerPlace[]=[
 {id:'pelusium',name:'佩卢西乌姆',modern:'埃及 · 法拉马遗址（Tell el-Farama）',aliases:['Pelusium','Pelousion','Tell el-Farama','佩鲁西乌姆','佩卢西翁','佩鲁西翁','法拉马'],coords:[32.54,31.0426],kind:'历史地点参考',source:courseSources.pelusiumGetty.url,description:'尼罗河三角洲东北端的古代港城入口，联系西奈与巴勒斯坦。采用 Getty TGN 7539229 代表点（ODC-By 1.0）；河道、海岸和城市范围随时代变化。'},
 {id:'oxyrhynchus',name:'俄克喜林库斯',modern:'埃及 · 巴赫纳萨（El Bahnasa）',aliases:['Oxyrhynchus','Oxyrhynchos','Oxyrynchus','El Bahnasa','Bahnasa','俄克西林库斯','奥克西林库斯','俄克喜林库斯','巴赫纳萨'],coords:[30.65172,28.542574],kind:'历史地点参考',source:courseSources.oxyrhynchusAtlas.url,description:'三角洲以南、尼罗河主河道以西的河谷城市，沿优素福水道定位。坐标来自 Johan Åhlfeldt / DARE，CC BY-SA 3.0，原资料精度约 2 千米。'},
];
function polity(y:number){return y<395?'罗马帝国在埃及的城市；本年不能把后来的东部朝廷分掌提前当作独立建国。':'罗马帝国东部朝廷治理下的埃及城市。西部皇权及北非西部的政权变化，不直接改变这里的归属。';}
export const egyptCityDetails:HistoricalDetail[]=[
 ...([[300,394],[395,500]] as [number,number][]).map(([from,to]):HistoricalDetail=>({
  id:`pelusium-${from}`,placeId:'pelusium',title:'佩卢西乌姆',displayName:'Pelusium / Pelousion',kind:'港口聚落',from,to,focusYear:from,period:`${from}—${to} 年：三角洲东端的沿海入口`,
  polity:fact(polity(from)+' 城市归属与具体行省分期分别核对；不将“下埃及”阅读窗口当成行省。','provinces300','libyaEasternList'),
  territory:fact('在三角洲东北端，向西联系埃及腹地，向东经西奈方向联系巴勒斯坦。古代河口及湿地有别于今天的海岸；这里只定位城市，没有复原四世纪航道或城墙。','pelusiumExcavation'),
  people:fact('港口贸易与往来人群是理解这座边缘城市的入口。考古发现跨越多个时代，不能把不同层位的器物合成某一年居民的族群比例。','pelusiumExcavation'),
  language:from>=395?fact('四世纪中叶的一份庭审记录（P.Oxy. LXIII 4371）注明庭审在佩卢西乌姆举行：框架用拉丁文，发言用希腊文。这是特定司法场景，不能代表全城母语；文书发现地与庭审发生地也不同。','egyptPapyri'):fact('埃及的公共书写涉及希腊语与拉丁语等不同场景；本条没有本年全城居民的语言统计，也不把罗马归属等同于全体说拉丁语。','inscriptions300'),
  nameNote:fact('佩卢西乌姆的代表位置对应今天的法拉马遗址。现代西奈、埃及国界和苏伊士运河帮助定位，但不能作为四世纪边界或当时已经存在的运河。','pelusiumGetty','pelusiumExcavation'),
  related:['alexandria','paraetonium','oxyrhynchus','antioch'],relatedBattles:[],
 })),
 ...([[300,314],[315,315],[316,341],[342,394],[395,500]] as [number,number][]).map(([from,to]):HistoricalDetail=>({
  id:`oxyrhynchus-${from}`,placeId:'oxyrhynchus',title:'俄克喜林库斯',displayName:'Oxyrhynchus',kind:'历史城市',from,to,focusYear:from,period:`${from}—${to} 年：河谷城市与纸草生活`,
  polity:fact(polity(from)+(from>=342?' 342 年 1 月 28 日，省长写信给当地两位显要，涉及税收事务；信在北面的赫拉克利奥波利斯写成，并非当地发出的征税令。':' 地方行政生活与帝国层面的皇权分别观察。'),'provinces300',...(from>=342?['egyptPapyri'] as const:[])),
  territory:fact('位于尼罗河主河道以西的优素福水道旁。向北是三角洲，沿河谷向南才是上游与阿斯旺；城市不在地中海岸，也不是尼罗河主河道上的河口港。','oxyrhynchusIntro'),
  people:fact(from>=316?'315—316 年的维修文书记录建筑材料需求，还保存医生提交的伤情报告。工匠、医生、官员的具体活动让城市生活可见；这不是城市总人口或族群普查。':from===315?'315—316 年的维修档案涉及公共建筑及材料需求。这里只展示已进入该日期范围的维修背景；316 年医生报告另按年代显示。':'地方城市与农业腹地相联系，纸草材料让普通文书与日常事务可见。这里没有本年居民名册或可靠族群比例。',from>=315?'egyptPapyri':'oxyrhynchusIntro'),
  language:fact('大量城市文书以希腊文保存。希腊语书写、埃及本地社会与罗马政治身份是不同维度，不能据文书语言将全体居民归为一个“人种”。'+(from>=342?' 342 年省长信还使用拉丁文纪年，说明同一行政文书可以包含不同语言层次。':''),'oxyrhynchusIntro',...(from>=342?['egyptPapyri'] as const:[])),
  nameNote:fact('古城对应今巴赫纳萨。出土地与文书记载地点需要分别定位。'+(from>=395?'例如四世纪中叶的佩卢西乌姆庭审，不能因为纸草出土于此就把庭审发生地也标到这里。':''),'oxyrhynchusAtlas',...(from>=395?['egyptPapyri'] as const:[])),
  related:['alexandria','pelusium','syene'],relatedBattles:[],
 })),
];
