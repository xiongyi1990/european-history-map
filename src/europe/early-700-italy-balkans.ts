import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import {courseSources,type ReadingReference} from './course-sources';
import {africanPolitiesAt,early700LocalPlaces,type AfricanLocalPolity} from './early-700-localities';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const italyBalkanPlaces:GazetteerPlace[]=[
 point('spoleto','斯波莱托','意大利 · 翁布里亚、亚平宁山脉中部',['Spoleto','Spoletium','斯波列托','斯波莱托公国'],[12+44/60+36/3600,42+44/60+31/3600],'earlyLombardCoordinates','采用 UNESCO 圣萨尔瓦托雷教堂代表坐标帮助寻找这座公国城市；不是公爵府、城市中心、城墙或公国疆界。'),
 point('benevento','贝内文托','意大利 · 坎帕尼亚内陆',['Benevento','Beneventum','贝内文图','贝内文托公国','阿雷基斯'],[14+46/60+53/3600,41+7/60+50/3600],'earlyLombardCoordinates','以 UNESCO 圣索菲亚遗产代表点定位南部伦巴第中心；774 年北部王国被征服后，本地政权仍延续。现代遗产范围不是公国疆界。'),
 point('sutri','苏特里','意大利 · 拉齐奥、罗马以北',['Sutri','Sutrium','苏特里赠地','728年赠地'],[12.220462,42.242794],'earlySutriLocation','采用 Pleiades 古城代表点（W. V. Harris 等，CC BY 3.0）。728 年赠地的城市与邻近土地不能由一个点推定完整边界，也不同于 756 年丕平赠地。'),
 point('anchialos','安基阿洛斯地区','保加利亚 · 黑海西岸、今波莫里',['Anchialos','Anchialus','Pomorie','安基阿卢斯','安基阿罗斯','安恰卢斯','波莫里'],[27.64638,42.55452],'earlyAnchialosLocation','用现代波莫里历史博物馆位置作古城地区参照（OpenStreetMap 贡献者，经 Mapcarta）；不是 763 年会战中心、军队驻地或精确战场。'),
 point('markellai','马尔凯莱地区','保加利亚 · 卡尔诺巴特以西、希萨尔山一带',['Markellai','Marcellae','Markeli','马尔凯利','马克莱','马尔凯莱'],[26.8946412,42.6375275],'earlyMarkellaiLocation','采用官方欧盟基金项目册的遗址旅游项目 GPS 参考点，帮助寻找卡尔诺巴特以西约 7.5 公里的遗址；不是 756／792 年战场中心或当时全部城墙。'),
];
export interface RegionalPolityCard extends AfricanLocalPolity {siteName:string}
const card=(id:string,name:string,from:number,to:number,dates:string,site:string,siteName:string,where:string,control:string,people:string,language:string,...sources:Source[]):RegionalPolityCard=>({id,name,from,to,dates,site,siteName,where,control,people,language,sources});
const italianPeople='伦巴第统治精英、旧地方居民、教士与其他社会群体分开理解；政权名称与遗产建筑都不能给出全体居民的祖源比例。';
const italianLanguage='拉丁文教会与知识文化传统仍重要；没有本地家庭口语和各语言比例的可靠清单，不画统一语言疆界。';
const italianStages:RegionalPolityCard[]=[
 card('north-italy','北部伦巴第王国',701,773,'568 年进入意大利；572 年取得帕维亚；774 年北部王国被征服','pavia','帕维亚','波河平原的北部王权，以帕维亚为中心。','北部国王与半岛中南部公国、罗马教会、东罗马沿海不是同一层级的直接治理；现代伦巴第大区不等于王国疆域。',italianPeople,italianLanguage,'paviaEarly','earlyLombardCulture'),
 card('north-italy','法兰克统治下的意大利北部王国',774,800,'774 年查理兼伦巴第王号；800 年才获西方帝号','pavia','帕维亚','帕维亚与北意大利王国，跨阿尔卑斯联系法兰克腹地。','查理取得北部王冠；贝内文托、教皇领地和东罗马南部不能随之一笔并入同一个直辖区。',italianPeople,italianLanguage,'earlyEinhard','earlyLombardCulture'),
 card('spoleto','斯波莱托公国',701,728,'568 年后不久形成；本卡为 729 年臣属于北方王权之前','spoleto','斯波莱托','亚平宁山脉中部，今天翁布里亚方向，位于罗马东北。','公国有较强地方自主性；和北方伦巴第王国有联系，但不是现代意大利的普通统一行政区。',italianPeople,italianLanguage,'earlySpoletoPolitics','earlyLombardCulture'),
 card('spoleto','北方王权下的斯波莱托公国',729,773,'729 年臣属于伦巴第国王；公国本身继续存在','spoleto','斯波莱托','中部内陆的斯波莱托与北方帕维亚分开定位。','地方资料以 729 年为臣属于柳特普兰德王权的节点。公国保留地方层次，臣属不等于所有土地由帕维亚同等直接管理。',italianPeople,italianLanguage,'earlySpoletoPolitics','earlyLombardCulture'),
 card('spoleto','法兰克框架中的斯波莱托公国',774,800,'774 年北部王国倒台后延续；随后进入法兰克控制框架','spoleto','斯波莱托','意大利中部内陆，不在波河平原，也不是贝内文托。','公国没有在 774 年随北部王国一起消失，转入法兰克控制框架；不把 1198 年后归入教皇国的状态提前到八世纪。',italianPeople,italianLanguage,'earlySpoletoPolitics','earlyLombardCulture'),
 card('benevento','贝内文托公国',701,773,'地方遗产资料常以 571 年为公国起点；774 年后仍延续','benevento','贝内文托','坎帕尼亚内陆的南部伦巴第中心，与帕维亚相距很远。','南部公国拥有自身政治网络；不能因为与北方共享伦巴第名称，就将两者当作始终同等直辖的一个区域。',italianPeople,italianLanguage,'earlyBeneventoPolitics','earlyLombardCulture'),
 card('benevento','北方灭国后延续的贝内文托政权',774,786,'774 年北部王国被征服，本地伦巴第权力继续存在','benevento','贝内文托','意大利南部内陆，阿雷基斯二世的地方政治与文化中心。','保留自己的地方王权和南部政治空间；北方王国覆亡没有把伦巴第统治和居民一起从意大利清除。',italianPeople,italianLanguage,'earlyBeneventoPolitics','earlyBeneventoCulture'),
 card('benevento','与法兰克交涉后的贝内文托政权',787,800,'787 年史料记载交出质子与承诺归服；本卡详述至 800 年','benevento','贝内文托','贝内文托仍是南部中心；史料中的查理军营在更西面的卡普阿。','艾因哈德记查理在卡普阿施压，阿雷基斯送出质子并承诺归服；承诺、宗主关系与逐地驻军不同，不能据此画成南意大利全部被直接吞并。后续各年协议执行未逐项核定。',italianPeople,italianLanguage,'earlyEinhard','earlyBeneventoPolitics','earlyBeneventoCulture'),
 card('papal','罗马教皇与地方权力',701,727,'本卡为 728 年苏特里赠地之前','rome','罗马','半岛中部的罗马与东罗马拉文纳联系背景。','教皇地方权力逐渐增强，仍需放在东罗马意大利体系与伦巴第压力之间理解；尚未发生苏特里或丕平赠地。','罗马居民、教士、地方贵族与外来驻军不由教皇称号统一为一个祖源。',italianLanguage,'earlyItaly','gregoryEarly'),
 card('papal','苏特里赠地后的罗马教会领地',728,755,'728 年苏特里赠地；754 年合作与 756 年赠地是后续节点','sutri','苏特里','罗马及其北面的苏特里，属于中部意大利问题。','柳特普兰德将苏特里及邻近土地给予格列高利二世，是教皇世俗领地逐步形成的线索；不是整个意大利同时成为教皇国。','教皇、当地居民与伦巴第交涉者分别理解，领地主张不等于人口替换。',italianLanguage,'earlySutriHistory','earlyPepinDonation'),
 card('papal','丕平赠地后的教皇世俗领地',756,800,'728 年早期赠地；754—756 年合作与丕平赠地','rome','罗马','罗马、拉文纳等不同地方，不能直接套用后世教皇国轮廓。','赠地承诺、教皇主张与各地实际治理有差别；774 年北部兼王号和 800 年加冕都没有使全半岛归同一政府直辖。','教皇领地下的旧地方居民、教士与贵族不是一个新出现的单一族群。',italianLanguage,'earlyPepinDonation','earlySutriHistory'),
 card('byzantine-south','东罗马在南部与西西里的政治空间',701,800,'本卡 701—800 年；751 年拉文纳失守不等于全意大利退出','syracuse','叙拉古','半岛南部部分沿海与西西里；叙拉古只是其中一个可定位城市。','北部伦巴第王国、教皇与法兰克扩张之外，东罗马仍保留南部和岛屿据点；不把 827 年后的西西里战争提前显示。','地方居民、驻军和不同教会社群并存，帝国名称不等于居民全是同一种祖源。','希腊文与拉丁文的宗教文化传统分别看；本卡不推定每个地方的多数口语。','earlyItaly'),
];
const bulgarianPeople='保加尔统治集团、斯拉夫社群与其他地方居民分别理解；军队称谓不能代替人口普查。';
const bulgarianLanguage='统治集团、地方口语与帝国外交书写不是同一层次；没有可绘制的八世纪各语言人口边界。';
export function regionalPolitiesAt(region:string,year:number):RegionalPolityCard[]{
 if(region==='africa')return africanPolitiesAt(year).map(p=>({...p,siteName:early700LocalPlaces.find(s=>s.id===p.site)!.name}));
 if(year<701||year>800)return [];
 if(region==='italy')return italianStages.filter(p=>p.from<=year&&year<=p.to);
 if(region!=='balkans')return [];
 const change=year<763?'东罗马与保加利亚独立并存，717—718 年的合作不等于两国合并。':year<777?'763 年安基阿洛斯战败后保加利亚国家仍延续，王权继承与对外战争不能概括为国家已经灭亡。':year<792?'卡尔达姆时期保加利亚仍与东罗马分别存在；其统治起点常记 777／778 年，本图不强行认定同一个无争议即位日。':'792 年卡尔达姆在马尔凯莱击败君士坦丁六世；胜利不意味着君士坦丁堡或整个巴尔干同时被吞并。';
 return [card('bulgaria','第一保加利亚国家',701,800,'常用纪年 681—1018 年；此卡只详述 701—800 年','pliska','普利斯卡','下多瑙河以南、黑海以西的东北巴尔干核心，王权中心在普利斯卡。',change,bulgarianPeople,bulgarianLanguage,'earlyBalkans','earlyAnchialosBattle','earlyMarkellaiBattle'),
 card('byzantine-balkans','东罗马的海峡与爱琴海政治空间',701,800,'本卡 701—800 年持续存在；都城始终另行定位','byzantium','君士坦丁堡','海峡都城、色雷斯和爱琴海沿岸据点；其他内陆地方社群不一概视为同等直辖。','保加利亚是相邻的另一个国家；一场战役的胜负不等于全部沿岸城市易主，雅典与塞萨洛尼基也不因保加利亚扩张自动被征服。','帝国城市居民、驻军与周边斯拉夫社群各有不同的身份关系。','希腊文帝国与教会书写不等于全巴尔干只有同一种口语。','earlyBalkans')];
}
export function italyBalkanAnchors(region:string,year:number):[string,string][]{
 if(year<701||year>800)return [];
 if(region==='italy')return [['spoleto','斯波莱托 · 中部公国'],['benevento','贝内文托 · 南部伦巴第中心'],['sutri',year<728?'苏特里 · 罗马以北':'苏特里 · 赠地城市']];
 if(region==='balkans')return [...(year===763?[['anchialos','安基阿洛斯 · 战役地区'] as [string,string]]:[]),...([756,792].includes(year)?[['markellai','马尔凯莱 · 战役地区'] as [string,string]]:[])];
 return [];
}
const geography:Record<string,Source>={spoleto:'earlyLombardCoordinates',benevento:'earlyLombardCoordinates',sutri:'earlySutriLocation',anchialos:'earlyAnchialosLocation',markellai:'earlyMarkellaiLocation'};
const reading=(chapter:number,pages:[number,number],note:string):ReadingReference[]=>[{chapter,pages,note}];
const localCity=(id:string,from:number,to:number,control:string,...sources:Source[]):HistoricalDetail=>{
 const p=italyBalkanPlaces.find(p=>p.id===id)!;const event=id==='anchialos'||id==='markellai';
 return {id:`italybalkan-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind:event?'事件地点':'历史城市',period:from===to?`公元 ${from} 年的事件地区`:`${from}—${to} 年的地方政治阶段`,polity:fact(control,...sources),territory:fact(p.modern+'。代表点帮助找位置，不是疆界或战场范围。',geography[id]),people:fact(event?'本记录区分参战军队、驻军和地方居民，不将战争结果写成整个地区的居民祖源变化。':italianPeople,...sources),language:fact(event?'本事件没有足以核定当地语言比例的资料。':italianLanguage,...(event?[]:['earlyLombardCulture' as const])),nameNote:fact(p.description,geography[id]),related:event?['pliska','byzantium']:['pavia','rome','ravenna'],...(!event?{reading:reading(id==='sutri'?147:141,id==='sutri'?[1231,1238]:[1184,1192],'用于对照课程的意大利政治空间；本城细节据独立资料补充。')}:{}),...(id==='benevento'?{readingNote:'课程第 141 讲以北部征服概括查理的扩张。地图另外保留贝内文托等南部伦巴第权力的延续，不把王国覆亡解释为所有伦巴第居民离开意大利。',readingNoteSource:'earlyBeneventoPolitics' as const}:{})};
};
export const italyBalkanDetails:HistoricalDetail[]=[
 ...italianStages.filter(p=>p.id==='spoleto'||p.id==='benevento').map(p=>localCity(p.site,p.from,p.to,p.control,...p.sources)),
 localCity('sutri',701,727,'东罗马与伦巴第竞争背景中的中部城市；728 年赠地还未发生。','earlySutriHistory'),
 localCity('sutri',728,755,'728 年柳特普兰德将城市和邻近土地给予格列高利二世，是教皇世俗领地形成的一步；不等于 756 年丕平赠地或全意大利转归教皇。','earlySutriHistory'),
 localCity('sutri',756,800,'作为较早赠地城市理解，与 754—756 年法兰克—教皇合作的更大政治背景分别看；本卡未逐年核定全部驻军。','earlySutriHistory','earlyPepinDonation'),
 localCity('anchialos',763,763,'763 年 6 月 30 日，君士坦丁五世一方在安基阿洛斯附近击败特莱茨一方；保加利亚国家并未因此消失。本点不指定双方精确阵位。','earlyAnchialosBattle'),
 localCity('markellai',756,756,'据旅游部和博物馆资料定位 756 年马尔凯莱方向的边境战事，东罗马一方取胜；现存遗址包含多个世纪，不将全部城墙当作本年既有工程。','earlyMarkellaiFrontier','earlyMarkellaiSite'),
 localCity('markellai',792,792,'792 年 7 月 20 日，卡尔达姆击败君士坦丁六世的军队。战果不等于东罗马国家灭亡或当地所有居民替换。','earlyMarkellaiBattle','earlyMarkellaiSite'),
];
