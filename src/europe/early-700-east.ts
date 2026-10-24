import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const easternPlaces:GazetteerPlace[]=[
 point('kufa','库法','伊拉克 · 纳杰夫以东方向、幼发拉底河流域',['Kufa','Kufah','al-Kufa','Kūfa','库费'],[44.3833,32.0167],'earlyKufaLocation','采用 Getty 城市代表点。库法是七世纪发展的军营城市，749 年阿拔斯拥立在此发生；它不是 762 年建立的新都巴格达，也不是纳杰夫的另一个名字。'),
 point('wasit','瓦西特古城','伊拉克南部 · 库特东南方向、底格里斯河旧河道附近',['Wasit','Wāsiṭ','Wasith','瓦西特遗址'],[46.3,32.1833],'earlyWasitLocation','采用《伊斯兰百科》条目的约略古城位置，不是现代瓦西特省省会库特。底格里斯河道后来变迁，现代河线不能直接代替八世纪城河关系；UNESCO 页面属预备名单。'),
 point('harran','哈兰','土耳其东南 · 尚勒乌尔法以南、上两河方向',['Harran','Ḥarrān','Haran','Carrhae','卡莱','哈兰古城'],[39,36.85],'earlyHarranLocation','采用 Getty 城市代表位置，帮助寻找 744—750 年倭马亚末期朝廷；不是大马士革，也不是已经核定的王宫坐标。古代卡莱与本城历史相联。'),
 point('raqqa','拉卡','叙利亚东北 · 幼发拉底河中游北岸',['Raqqa','al-Raqqa','Ar Raqqah','Rafiqa','al-Rafiqa','拉菲卡','拉卡—拉菲卡'],[39.007,35.952],'earlyRaqqaLocation','采用 Getty 拉卡城市代表点。772 年新建拉菲卡紧邻旧拉卡，796 年后的哈伦宫廷属于相连的双城地区；一个点不复原两城城墙、宫殿和驻军范围。'),
 point('ramla','拉姆拉','地中海东岸 · 雅法与耶路撒冷之间的平原、今以色列中部',['Ramla','Ramle','al-Ramla','Remle','拉姆莱','拉姆勒'],[34.8656,31.9292],'earlyRamlaLocation','采用 Getty 现代城市代表位置寻找早期行政中心。建城在八世纪初，常用约 715 年，也见 715／716 年等记法；不将它提前放入七世纪征服军路线，也不把现代城区当作初建城界。'),
 point('fustat','福斯塔特','埃及 · 今日开罗旧城一带、尼罗河东岸',['Fustat','Fostat','al-Fustat','富斯塔特','福斯塔特城','阿姆尔清真寺'],[31.23877,30.00547],'earlyFustatLocation','采用 GeoNames 经 Mapcarta 的地域代表点。641 年起的福斯塔特与邻近 750 年后的阿斯卡尔、969 年建立的开罗新城分开理解；点位不指认阿斯卡尔已核定的宫署遗址。'),
];
const locations:Record<string,Source>={kufa:'earlyKufaLocation',wasit:'earlyWasitLocation',harran:'earlyHarranLocation',raqqa:'earlyRaqqaLocation',ramla:'earlyRamlaLocation',fustat:'earlyFustatLocation'};
const social:Record<string,{people:string;language:string}>={
 iraq:{people:'阿拉伯军人及其家族、伊朗背景的政治与文化群体、叙利亚基督徒、犹太社群及其他城乡居民并存；749—750 年换朝不是两个现代民族之间的整体人口替换。',language:'阿拉伯文的军政与文化作用增强；叙利亚文宗教传统和伊朗语言背景仍须分别理解。本条不提供各城口语比例。'},
 levant:{people:'穆斯林军政人员、地方基督徒、犹太社群及其他城市居民有不同社会关系；一座圣城或行政中心不能代表整个地区居民的共同祖源。',language:'阿拉伯文行政与宗教书写、希腊文和阿拉米／叙利亚文等地方传统交错；行政变动不等于一夜之间更换所有居民的口语。'},
 egypt:{people:'阿拉伯军政集团与埃及地方居民、科普特基督徒和其他社群分别理解。阿拔斯派驻新军不等于尼罗河谷全体居民迁走或改宗。',language:'阿拉伯文行政地位增强，科普特文及更早的希腊文书传统在七八世纪文书中可见；宗教书写和日常口语、不同地域的转换速度不能合并。'},
};
const read=(chapter:number,pages:[number,number]):ReadingReference[]=>[{chapter,pages,note:'课程提供王朝与制度背景；本城纪年、坐标和宫廷驻地另据独立资料核对。'}];
function cityDetail(id:string,from:number,to:number,kind:HistoricalDetail['kind'],control:string,...sources:Source[]):HistoricalDetail{
 const p=easternPlaces.find(p=>p.id===id)!;const a=id==='fustat'?social.egypt:id==='ramla'?social.levant:social.iraq;
 return {id:`eastern-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind,period:`${from}—${to} 年：城市与权力阶段`,polity:fact(control,...sources),territory:fact(p.modern+'。城市代表点帮助找位置，不生成行省、古城或军队控制边界。',locations[id]),people:fact(a.people,id==='fustat'?'earlyEgyptDocuments':id==='ramla'?'earlyLevant':'earlyIranTimeline'),language:fact(a.language,id==='fustat'?'earlyEgyptDocuments':id==='ramla'?'earlyLevant':'earlyIranTimeline'),nameNote:fact(p.description,locations[id],...sources),reading:read(id==='ramla'||id==='fustat'?150:151,id==='ramla'||id==='fustat'?[1256,1264]:[1264,1272]),related:['damascus','harran','kufa','wasit','baghdad','raqqa','ramla','jerusalem','fustat','alexandria'].filter(x=>x!==id)};
}
export const easternDetails:HistoricalDetail[]=[
 cityDetail('kufa',701,748,'历史城市','倭马亚统治下的重要伊拉克军营城市，也是反对运动与宗教、学术活动中心。大马士革的王朝权威、哈贾吉等伊拉克总督的治理、库法地方政治须分别看。','earlyKufa','earlyWasit'),
 cityDetail('kufa',749,749,'事件地点','749 年阿布·阿拔斯在库法获拥立为哈里发；此时马尔万二世和倭马亚军仍在，750 年的决胜与东方王朝终结尚未完成。不同资料对具体月日有异，本图只采用年份。','earlyKufa'),
 cityDetail('kufa',750,761,'早期中心','阿拔斯初期的行政与政治活动中心之一。萨法赫后来使用希拉等驻地，不能将 750—761 年都写成宫廷始终固定在库法；巴格达新都尚未建立。','earlyKufa'),
 cityDetail('kufa',762,800,'历史城市','巴格达建都后，库法的区域政治中心地位下降，但宗教与学术活动延续。城市不因新都出现而从地图消失，也不应继续当作唯一中央宫廷。','earlyKufa'),
 cityDetail('wasit',702,704,'早期中心','采用常见约 702／703 年开建、705 年完成的记法：哈贾吉建设伊拉克军政中心，以安置叙利亚军队并控制地方。另有更早建城纪年，故本期表示建设阶段，未声称 702 年全城已完工。','earlyWasit'),
 cityDetail('wasit',705,749,'历史城市','倭马亚伊拉克的行政与军事中心，最初驻有叙利亚军队；库法的地方政治与这处总督基地不是同一座城。749 年阿拔斯在库法拥立，不能推定瓦西特同日已经交接。','earlyWasit'),
 cityDetail('wasit',750,800,'历史城市','750 年，倭马亚残余驻军在围城后投降，随后进入阿拔斯时代；本年采用交接后的状态。城址延续，不将后来河道迁移造成的衰落提前到八世纪。','earlyWasit','earlyWasitSite'),
 cityDetail('harran',701,743,'历史城市','倭马亚北部军政空间中的上两河城市。744 年马尔万二世的朝廷阶段尚未开始，不能将整个八世纪都标为帝国首都。','earlyHarran'),
 cityDetail('harran',744,749,'宫廷驻地','马尔万二世在 744 年取得哈里发位后，将朝廷从大马士革移往哈兰。它在上两河方向，不能因为今日属土耳其就当作东罗马首都。','earlyHarran'),
 cityDetail('harran',750,800,'历史城市','750 年东方倭马亚统治终结后，哈兰失去末代朝廷驻地角色，进入阿拔斯政治背景。旧建筑与地方信仰传统不能被解释为王朝仍在继续统治。','earlyHarran','abbasid'),
 cityDetail('raqqa',701,749,'历史城市','倭马亚政治背景中的幼发拉底河城市；旧拉卡已经存在，772 年新建的拉菲卡和后来的哈伦宫廷此时尚未出现。','earlyRaqqa','earlyRaqqaLocation'),
 cityDetail('raqqa',750,771,'历史城市','阿拔斯体系中的旧拉卡，位于叙利亚与上两河交通相接处。772 年曼苏尔在旁建设的新城拉菲卡还没有建立。','earlyRaqqa'),
 cityDetail('raqqa',772,795,'历史城市','772 年曼苏尔命在旧拉卡旁建拉菲卡，形成相邻城市空间；这不是旧拉卡在 772 年首次出现。哈伦后来的主要宫廷驻地另从 796 年标注。','earlyRaqqa'),
 cityDetail('raqqa',796,800,'宫廷驻地','按伊朗百科和 UNESCO 预备名单的 796 年纪年，哈伦·拉希德将主要宫廷移到拉卡—拉菲卡地区。800 年找哈里发宫廷应看这里，同时保留巴格达的城市和行政作用。','earlyHarun','earlyRaqqa'),
 cityDetail('ramla',715,749,'早期中心','采用约 715 年的常用建城节点，也见 715／716 年等记法。苏莱曼建立巴勒斯坦军政区的新中心，接替卢德的行政角色；耶路撒冷的圣城地位是另一种功能。','earlyRamla','earlyRamlaHistory'),
 cityDetail('ramla',750,800,'历史城市','阿拔斯时期仍是巴勒斯坦的重要行政中心。东方王朝更替不等于行政中心自动迁到耶路撒冷，也不能据此推断地方居民同时换族或改宗。','earlyRamlaHistory','earlyRamla'),
 cityDetail('fustat',641,660,'早期中心','采用埃及文物部 641 年建立福斯塔特的记法，作为征服后埃及的新军政中心；亚历山大里亚仍是另一座重要港口，早期港口争夺须逐年另核。','earlyFustat'),
 cityDetail('fustat',661,749,'历史城市','倭马亚时期埃及军政与城市活动的重要中心。尼罗河东岸驻地、河谷征税与地中海港口相联系，不能把以大马士革为中心的帝国朝廷也放在本城。','earlyFustat','earlyAskar'),
 cityDetail('fustat',750,800,'历史城市','750 年后，阿拔斯军政人员在福斯塔特以北发展阿斯卡尔驻地，埃及总督中心随之调整；福斯塔特本城继续发展。本点保留旧城位置，不冒充新驻地精确遗址。','earlyAskar','earlyFustat'),
];
export function completeEasternCities(existing:HistoricalDetail[]):HistoricalDetail[]{
 const template=existing.find(d=>d.placeId==='damascus'&&d.from<=701&&d.to>=743);
 if(!template)throw new Error('Missing Damascus record for refinement');
 const preserved=existing.flatMap(d=>d.placeId!=='damascus'||d.to<701||d.from>800?[d]:[
  ...(d.from<701?[{...d,to:700,focusYear:Math.min(d.focusYear??700,700),period:`${d.from}—700 年：倭马亚政治中心`}]:[]),
  ...(d.to>800?[{...d,id:d.id+'-after800',from:801,focusYear:Math.max(d.focusYear??801,801),period:`801—${d.to} 年：大马士革城市背景`}]:[]),
 ]);
 const stages:[number,number,HistoricalDetail['kind'],string,Source[]][]=[
  [701,743,'帝国都城','倭马亚王朝在叙利亚的政治与行政中心；哈里发也使用其他驻地。715 年前后拉姆拉的建立属于巴勒斯坦地方行政，不能当作全帝国同时迁都。',['timelineUmayyad','earlyRamlaHistory']],
  [744,749,'历史城市','马尔万二世取得哈里发位后把主要朝廷移到哈兰；大马士革仍是叙利亚的重要城市，不能继续把本期宫廷固定在这里。',['earlyHarran']],
  [750,800,'历史城市','阿拔斯统治下的叙利亚城市，已非倭马亚帝国朝廷。749 年库法拥立、762 年巴格达新都、796 年拉卡宫廷是不同时间与地点的变化。',['earlyKufa','abbasid','earlyHarun']],
 ];
 return [...preserved,...stages.map(([from,to,kind,text,sources]):HistoricalDetail=>({...template,id:`damascus-eastern-${from}`,from,to,kind,focusYear:from,period:`${from}—${to} 年：大马士革的城市角色`,polity:fact(text,...sources),related:['harran','ramla','jerusalem','kufa','baghdad','raqqa'],readingNote:'课程第 150—151 讲提供王朝与制度背景；地图另列哈兰末代朝廷、库法拥立、巴格达建都和拉卡驻地，避免将一座都城贯穿全部年代。',readingNoteSource:'earlyHarran'}))];
}
function card(id:string,name:string,site:string,year:number,where:string,control:string,area:keyof typeof social,...sources:Source[]):RegionalPolityCard{
 const p=easternPlaces.find(p=>p.id===site);return {id,name,site,siteName:p?.name??({damascus:'大马士革',jerusalem:'耶路撒冷',alexandria:'亚历山大里亚',baghdad:'巴格达'}[site]??site),from:701,to:800,dates:`本卡详述公元 ${year} 年的城市与地域角色`,where,control,...social[area],sources};
}
const controlAt=(site:string,year:number)=>easternDetails.find(d=>d.placeId===site&&d.from<=year&&year<=d.to)!.polity.text;
export function easternPolitiesAt(region:string,year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 if(region==='egypt')return [
 card('fustat-administration',year<750?'福斯塔特与埃及军政中心':'福斯塔特与北面的阿斯卡尔驻地','fustat',year,'尼罗河东岸、三角洲顶端附近，在今日开罗旧城方向。',controlAt('fustat',year),'egypt','earlyFustat','earlyAskar'),
 card('alexandria-port','亚历山大里亚与地中海港口','alexandria',year,'尼罗河三角洲西侧地中海岸；与内陆福斯塔特不是同一城。','本期属于哈里发埃及政治空间中的港口。港口贸易、教会与城市居民的联系，和埃及总督中心、伊拉克的哈里发朝廷分开理解。','egypt','timelineEgypt','earlyFustat'),
 {id:'nile-valley',name:'尼罗河三角洲与河谷社会',site:'',siteName:'',from:701,to:800,dates:`公元 ${year} 年的地域与文书背景`,where:'地中海沿岸以南，沿尼罗河向上游延伸；三角洲、河谷和西侧沙漠各有地理条件。',control:'地方村落、土地、税务与教会组织联系总督体系；王朝名称不能替代每一处村庄的地方关系。图伦王朝 868 年的地方权力和 969 年开罗新城尚在以后。',...social.egypt,bounds:[[29,24],[33,31.7]],locationLabel:'尼罗河三角洲与河谷',sources:['earlyEgyptDocuments','timelineEgypt']},
 ];
 if(region==='levant')return [
 card('damascus-role',year<744?'大马士革与倭马亚叙利亚核心':'大马士革：朝廷移出后的城市','damascus',year,'地中海东岸以东的内陆绿洲城市，和更北的哈兰、拉卡分开。',year<744?'倭马亚叙利亚政治、行政与王朝网络的核心之一；不能据此认定哈里发每年始终只住在一座城。':year<750?'马尔万二世主要朝廷已移哈兰，大马士革仍是重要城市。':'阿拔斯体系中的叙利亚城市；不再是东方倭马亚朝廷。','levant','earlyHarran','timelineUmayyad'),
 ...(year>=715?[card('palestine-administration','拉姆拉与巴勒斯坦行政中心','ramla',year,'在雅法港通向耶路撒冷的平原通道，邻近较早的卢德。',controlAt('ramla',year),'levant','earlyRamla','earlyRamlaHistory')]:[]),
 card('jerusalem-sacred','耶路撒冷与圣城网络','jerusalem',year,'位于巴勒斯坦山地，拉姆拉在其西北方的平原。','宗教地位、教会和朝圣网络与地方行政中心有不同功能；岩石圆顶已于七世纪末建立，不表示犹太与基督教社群消失。','levant','earlyLevant'),
 card('euphrates-raqqa',year>=796?'拉卡—拉菲卡：哈伦的主要宫廷':'拉卡与幼发拉底河中游','raqqa',year,'叙利亚东北、幼发拉底河中游，与上两河及安纳托利亚边防方向相接。',controlAt('raqqa',year),'iraq','earlyRaqqa','earlyHarun'),
 ];
 if(region!=='mesopotamia')return [];
 return [card('kufa-politics',year===749?'库法：阿拔斯拥立地点':'库法与伊拉克地方政治','kufa',year,'伊拉克南部，幼发拉底河流域、纳杰夫以东。',controlAt('kufa',year),'iraq','earlyKufa'),
 ...(year>=702?[card('wasit-government','瓦西特与伊拉克军政','wasit',year,'伊拉克南部底格里斯河旧河道附近，库法以东，巴格达以南。',controlAt('wasit',year),'iraq','earlyWasit','earlyWasitSite')]:[]),
 card('upper-mesopotamia',year>=744&&year<750?'哈兰：马尔万二世的主要朝廷':'哈兰与上两河交通','harran',year,'今土耳其东南、埃德萨以南；上两河跨越今日多个国家。',controlAt('harran',year),'iraq','earlyHarran'),
 ...(year>=762?[card('baghdad-city','巴格达新都与伊拉克腹地','baghdad',year,'底格里斯河中游；与幼发拉底河上的拉卡是两座城市。',year<796?'762 年曼苏尔建都后的阿拔斯政治与城市中心，旧萨珊泰西封在更东南方向。':'巴格达的都城城市、行政与文化作用延续，哈伦主要宫廷已移拉卡；不把 796 年以后的哈里发始终画在巴格达。','iraq','abbasid','earlyHarun')]:[]),
 ];
}
export function easternAnchors(region:string,year:number):[string,string][]{
 if(region==='egypt'&&year>=641&&year<=800)return [['fustat',year<750?'福斯塔特 · 埃及军政中心':'福斯塔特 · 邻近阿斯卡尔驻地']];
 if(year<701||year>800)return [];
 if(region==='levant')return [...(year>=715?[['ramla','拉姆拉 · 巴勒斯坦行政中心'] as [string,string]]:[]),['raqqa',year>=796?'拉卡 · 哈伦主要宫廷':year>=772?'拉卡—拉菲卡 · 相邻双城':'拉卡 · 幼发拉底河城市']];
 if(region==='mesopotamia')return [['kufa',year===749?'库法 · 阿拔斯拥立地点':'库法 · 伊拉克城市'],...(year>=702?[['wasit',year<=704?'瓦西特 · 约 702／703 年开建':'瓦西特 · 军政城市'] as [string,string]]:[]),['harran',year>=744&&year<750?'哈兰 · 倭马亚末代朝廷':'哈兰 · 上两河城市'],...(year>=796?[['raqqa','拉卡 · 哈伦主要宫廷'] as [string,string]]:[])];
 return [];
}
