import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const blackSeaPlaces:GazetteerPlace[]=[
 point('akroinon','阿克罗伊农地区','土耳其 · 阿菲永卡拉希萨尔、安纳托利亚西部内陆',['Akroinon','Akroinos','Acroinon','Afyonkarahisar','阿克罗伊诺恩','阿菲永卡拉希萨尔'],[30.5387,38.7569],'earlyAkroinonLocation','采用现代城市代表点帮助寻找 740 年战事地区；不是已经核定的会战中心、军队阵位或阿拉伯军营地。'),
 point('cherson-taurica','赫尔松古城（克里米亚）','克里米亚半岛西南、黑海北岸的塞瓦斯托波尔附近',['Cherson','Chersonesos','Chersonesus','Tauric Chersonese','Korsun','科尔孙','陶里克赫尔松'],[33.491389,44.610833],'earlyChersonLocation','采用 UNESCO 陶里克赫尔松古城代表坐标。这里不是第聂伯河畔的现代赫尔松市；遗产点范围也不能直接当作八世纪政治边界。'),
 point('dvin','德温','亚美尼亚 · 阿拉拉特平原、埃里温以南',['Dvin','Dwin','Dowin','Dabil','德文','德汶','德芬'],[44.57627,40.00388],'earlyDvinLocation','采用德温考古遗址代表点，而非邻近现代同名村庄。遗迹跨多个世纪，不把所有宫殿、市场与教堂都认定为八世纪同年既存；UNESCO 页面属预备名单。'),
 point('derbent','德尔本特','今俄罗斯达吉斯坦 · 里海西岸、山海之间的狭长通道',['Derbent','Darband','达尔班德','Bāb al-Abwāb','Bab al-Abwab','巴布阿布瓦布'],[48.282778,42.055833],'earlyDerbentLocation','采用 UNESCO 古城与城堡代表点。城防包含萨珊工程与后世修筑，不等于整条高加索边界，也不是山脉中央的达里亚尔山口。'),
 point('ardabil','阿尔达比勒地区','伊朗西北 · 高加索以南、里海南侧方向',['Ardabil','Ardebil','Ardebīl','阿尔达比尔'],[48.2972,38.2516],'earlyArdabilLocation','现代城市代表点，用于寻找 730 年战事地区；不是已核定的会战现场或整个伊朗的统治中心。'),
];
const people='帝国、哈里发或可萨军政集团与地方居民须分别理解；贵族、军队、教会的身份和祖源不能代替全体人口的统计。';
const language='本条没有足以核定当地各口语人数与边界的资料；行政、宗教书写与居民日常语言分别理解。';
const geography:Record<string,Source>={akroinon:'earlyAkroinonLocation','cherson-taurica':'earlyChersonLocation',dvin:'earlyDvinLocation',derbent:'earlyDerbentLocation',ardabil:'earlyArdabilLocation'};
const local=(id:string,from:number,to:number,kind:HistoricalDetail['kind'],control:string,...sources:Source[]):HistoricalDetail=>{
 const p=blackSeaPlaces.find(p=>p.id===id)!;
 return {id:`blacksea-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind,period:from===to?`公元 ${from} 年的事件地区`:`${from}—${to} 年的政治背景`,polity:fact(control,...sources),territory:fact(p.modern+'。点位用于定位，不能推出国家或城市的完整疆界。',geography[id]),people:fact(id==='dvin'?'亚美尼亚地方贵族与教会、城市居民和哈里发军政人员分别理解；地方教会延续不等于政治上始终独立，帝国宗主关系也不等于居民全部换族。':people,...sources),language:fact(language),nameNote:fact(p.description,geography[id],...(id==='dvin'?['earlyDvinResearch' as const]:id==='derbent'?['earlyDerbentHistory' as const]:[])),related:['byzantium','nicaea','cherson-taurica','dvin','derbent','ardabil'].filter(x=>x!==id),...(['akroinon','cherson-taurica'].includes(id)?{reading:[{chapter:123,pages:[1035,1041],note:'课程提供八世纪东罗马背景；本地点纪年和定位据独立史料补充，不表示课程逐一讲过这些地点。'}] as ReadingReference[]}:{})};
};
export const blackSeaDetails:HistoricalDetail[]=[
 local('akroinon',740,740,'事件地点','740 年利奥三世与当时已为共治皇帝的君士坦丁五世一方击败阿拉伯入侵军的一支。巴塔勒等将领战死；不能把史料中的兵数视作人口统计，也不能据此写成全部阿拉伯边防从此消失。','earlyAkroinonBattle','earlyAkroinonName'),
 local('cherson-taurica',701,704,'历史城市','查士丁尼二世流亡与复位前的克里米亚政治背景：城市、可萨和东罗马宫廷之间有交涉；不能据流亡者在场推定全克里米亚都由他统治。','earlyJustinianII','earlyChersonHistory'),
 local('cherson-taurica',705,710,'历史城市','705 年查士丁尼二世在保加利亚支持下复位之后，克里米亚城市与帝国朝廷、可萨仍有复杂关系。复位的朝廷在君士坦丁堡，不是赫尔松改成帝国首都。','earlyJustinianII','earlyChersonHistory'),
 local('cherson-taurica',711,711,'事件地点','711 年菲利皮科斯在赫尔松被拥立，帝国派出的部队倒向反对查士丁尼二世的一方，并与可萨交涉。地方拥立、取得君士坦丁堡与全克里米亚控制不是同一件事。','earlyPhilippikos','earlyJustinianII'),
 local('cherson-taurica',712,800,'历史城市','作为东罗马在黑海北岸的重要城市联系点理解，与可萨及克里米亚其他地方权力相邻。本条未逐年核定全部官员、驻军或内陆控制，不用一个港口覆盖全半岛。','earlyChersonHistory','earlyKhazars'),
 local('dvin',701,749,'历史城市','倭马亚时代高加索军政背景中的重要行政与教会城市；亚美尼亚地方贵族、教会组织和哈里发统治不是同一层次，不把更早萨珊行政中心地位写成萨珊王朝仍在。','earlyDvinHistory','earlyCaucasus'),
 local('dvin',750,800,'历史城市','阿拔斯时代的高加索行政与地方社会背景；地方贵族、教会和城市生活有延续。九世纪以后独立王国的版图不能回填到本期，考古遗址也不代表百年内始终不变的城墙或驻军。','earlyDvinHistory','earlyCaucasus','earlyDvinResearch'),
 local('derbent',701,736,'历史城市','倭马亚与可萨竞争中的里海西岸关口，城市的萨珊城防继续有战略用途。本段只说明战争与边防背景，未逐年核定每次攻守后的驻军，不把整段写成一方永久稳定直辖。','earlyDerbentHistory','earlyKhazars'),
 local('derbent',737,749,'历史城市','737 年马尔万远征使可萨受挫之后，关口与北方军事空间继续相接；不能把可萨政权标为就此灭亡，也不能从少数精英改宗叙述推定所有居民同年改宗。','earlyKhazars','earlyDerbentHistory'),
 local('derbent',750,800,'历史城市','东方阿拔斯取代倭马亚后的边防与城市背景，北方可萨和高加索地方社群继续存在。城市关口、山地王权与整个哈里发国不应视为一套同质空间；本条没有逐年完整地方官表。','earlyKhazars','earlyDerbentHistory','abbasid'),
 local('ardabil',730,730,'事件地点','730 年可萨军在阿尔达比勒方向击败阿拉伯军，此后反攻继续。这里在高加索以南，不是大马士革，也不能由一次胜利推出可萨征服整个伊朗。','earlyKhazars'),
];
export const byzantineCourtStages:[number,number,string][]=[
 [701,704,'提比略三世朝廷；查士丁尼二世尚在复位以前。'],
 [705,710,'705 年查士丁尼二世在保加利亚支持下复位，至 711 年再次被推翻。宫廷恢复不等于帝国重新建立。'],
 [711,716,'从菲利皮科斯到阿纳斯塔修斯二世、狄奥多西三世的更替阶段；本段保留政局不稳，不将一位皇帝贯穿全部六年。'],
 [717,739,'利奥三世在位，717—718 年守住都城，随后继续面对边境战争和圣像争论。726 年等宗教政策标志不直接生成新国界。'],
 [740,740,'利奥三世仍为在位皇帝，君士坦丁五世当时是共治皇帝；阿克罗伊农胜利不是君士坦丁已独掌朝廷。'],
 [741,774,'君士坦丁五世的统治阶段包含早期争位；754 年希耶里亚会议与边境、巴尔干战争分别理解，宗教立场不能替代疆界。'],
 [775,779,'775 年君士坦丁五世去世后的利奥四世阶段；本年采用继承后的状态，不表示全年只有一位皇帝。'],
 [780,786,'780 年利奥四世去世后，君士坦丁六世继位，伊琳娜作为母亲参与摄政；皇帝年幼不表示东罗马帝国已经灭亡。'],
 [787,796,'君士坦丁六世在位，伊琳娜的摄政、共同统治地位与双方权力竞争随年份变化；787 年尼西亚会议属于这一阶段，不能理解为新建一个国家。'],
 [797,800,'797 年君士坦丁六世被废黜、致盲后，伊琳娜独掌朝廷。她统治至 802 年；800 年查理在罗马获西方帝号，没有让东方国家消失。'],
];
export function completeBlackSea(existing:HistoricalDetail[]):HistoricalDetail[]{
 const template=existing.find(d=>d.placeId==='byzantium'&&d.from<=701&&d.to>=800);
 if(!template)throw new Error('Missing continuous Byzantine city record');
 const preserved=existing.flatMap(d=>d.placeId!=='byzantium'||d.to<701||d.from>800?[d]:[
  ...(d.from<701?[{...d,to:700,period:`${d.from}—700 年：东罗马都城`,focusYear:Math.min(d.focusYear??700,700)}]:[]),
  ...(d.to>800?[{...d,id:d.id+'-after800',from:801,period:`801—${d.to} 年：东罗马都城`,focusYear:Math.max(d.focusYear??801,801)}]:[]),
 ]);
 return [...preserved,...byzantineCourtStages.map(([from,to,control]):HistoricalDetail=>({...template,id:`constantinople-court-${from}`,from,to,focusYear:from,period:`${from}—${to} 年：东罗马都城与朝廷`,polity:fact('东罗马朝廷：'+control,'earlyByzantineRulers',...(from>=780?['earlyIrene' as const]:from<=716?['earlyJustinianII' as const]:['earlyAkroinonBattle' as const])),reading:[{chapter:123,pages:[1035,1041],note:'课程八世纪东罗马背景与 PBE 皇帝纪年分别标注。'}],readingNote:'课程第 122 讲的 642 年属于叙事分期，不能当作帝国重新建国；第 123 讲 1040 页概述 750 年东方换朝，巴格达新都实际始建于 762 年，边境战争也并未就此消失。',readingNoteSource:'abbasid',related:['nicaea','akroinon','cherson-taurica','dvin','derbent']}))];
}
const frame=(id:string,name:string,year:number,where:string,control:string,bounds:[number,number][],locationLabel:string,...sources:Source[]):RegionalPolityCard=>({id,name,from:701,to:800,dates:`本卡详述公元 ${year} 年所处阶段；不是完整王朝年表`,site:'',siteName:'',where,control,people,language,bounds,locationLabel,sources});
const city=(id:string,name:string,year:number,site:string,siteName:string,where:string,control:string,...sources:Source[]):RegionalPolityCard=>({id,name,from:701,to:800,dates:`本卡详述公元 ${year} 年所处阶段`,site,siteName,where,control,people,language,sources});
export function blackSeaPolitiesAt(region:string,year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 const khazar=frame('khazar-north','可萨与北高加索、草原政治空间',year,'黑海与里海北侧、北高加索和下伏尔加方向；不覆盖整个东欧。',year<737?'可萨与哈里发沿高加索通道竞争；730 年向南作战不等于征服整个伊朗。':'737 年远征后可萨仍延续；统治精英改宗纪年有争议，不把 740 年写成全民同日改宗。',[[35,43],[50,49]],'可萨与北高加索方向','earlyKhazars');
 if(region==='east')return [khazar,city('byzantine-crimea','黑海北岸的赫尔松与东罗马联系',year,'cherson-taurica','赫尔松古城（克里米亚）','克里米亚西南的海港，与东部刻赤海峡、北方草原分开。',year===711?'本年发生赫尔松拥立菲利皮科斯和帝国远征军转向的事件；城市政治变化不等于整个黑海同时易主。':'城市与东罗马、可萨及地方社会联系；不能把一个港口当作全克里米亚始终由同一政府直接治理的证据。','earlyChersonHistory','earlyPhilippikos','earlyKhazars')];
 if(region==='anatolia')return [
 city('byzantine-court','东罗马朝廷与马尔马拉海峡核心',year,'byzantium','君士坦丁堡','都城在博斯普鲁斯海峡欧洲一侧，安纳托利亚在海峡以东。',byzantineCourtStages.find(([a,b])=>a<=year&&year<=b)![2],'earlyByzantineRulers','earlyIrene'),
 frame('anatolian-core','安纳托利亚腹地与帝国军政空间',year,'爱琴海沿岸、西北尼西亚与内陆高原属于不同地理带；阿克罗伊农在西部内陆。',year===740?'740 年阿克罗伊农战事是入侵军一支的失败，不能直接推定全部边防战争结束或所有城市同日更换居民。':'东罗马仍以小亚细亚为核心空间；军政组织、地方治理和圣像争论不等于一张可以跨百年照搬的军区界线。',[[26,36],[36,41.5]],'安纳托利亚腹地','earlyCaucasus','earlyAkroinonBattle'),
 frame('caliphal-frontier',year<750?'倭马亚与东罗马的东南边境':'阿拔斯与东罗马的东南边境',year,'安纳托利亚东南、陶鲁斯山方向，与叙利亚和两河北部交通相接。',year<750?'哈里发军队进攻、袭掠和围城不等于所到之处都被永久设为稳定直辖省；717—718 年围城也未取得君士坦丁堡。':'750 年东方换朝后，阿拔斯与东罗马仍是两个政治体系；762 年巴格达新都与边境军事活动分别理解，不因朝廷东移就抹去战争。',[[33,35],[41.5,39]],'东南边地','earlyCaucasus','timelineUmayyad','abbasid'),
 ];
 if(region!=='caucasus')return [];
 return [
 city('armenian-dvin',year<750?'倭马亚体系与亚美尼亚地方社会':'阿拔斯体系与亚美尼亚地方社会',year,'dvin','德温','亚美尼亚高地及阿拉拉特平原；德温与更南方伊朗、北方山脉通道分别看。','德温的行政功能、地方贵族和亚美尼亚教会并存。地方社会延续不能证明始终政治独立，也不能提前套入九世纪巴格拉提德王国。','earlyDvinHistory','earlyDvinResearch','earlyCaucasus'),
 city('caspian-gate','德尔本特与里海关口',year,'derbent','德尔本特','高加索东端，山地与里海西岸之间；不是中央的达里亚尔山口。','哈里发边防、可萨进攻与地方城市社会交错；古老城防继续使用，不表示萨珊帝国仍存在。本卡未逐年核定所有驻军交接。','earlyDerbentHistory','earlyKhazars'),
 khazar,
 frame('georgian-local','格鲁吉亚方向的地方贵族与黑海联系',year,'黑海东侧、库拉河与山地谷地之间；现代格鲁吉亚只作方位参照。','地方贵族与教会受到不同帝国和哈里发影响，宗主关系不等于现代国家统一行政；不能把整个高加索写成一个王国或一套同质居民。',[[39.5,40.5],[46.8,43.6]],'格鲁吉亚与黑海东岸方向','earlyCaucasus','earlyKhazars'),
 ];
}
export function blackSeaAnchors(region:string,year:number):[string,string][]{
 if(year<701||year>800)return [];
 if(region==='anatolia')return year===740?[['akroinon','阿克罗伊农 · 会战地区']]:[];
 if(region==='east')return [['cherson-taurica',year===711?'赫尔松古城 · 拥立事件':'赫尔松古城 · 黑海北岸']];
 if(region==='caucasus')return [['dvin','德温 · 行政与教会城市'],['derbent','德尔本特 · 里海关口'],...(year===730?[['ardabil','阿尔达比勒 · 南向会战地区'] as [string,string]]:[])];
 return [];
}
