import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {RegionalPolityCard} from './early-700-italy-balkans';
import {courseSources,type ReadingReference} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const point=(id:string,name:string,modern:string,aliases:string[],coords:[number,number],source:Source,description:string):GazetteerPlace=>({id,name,modern,aliases,coords,source:courseSources[source].url,description,kind:'历史地点参考'});
export const frankishPlaces:GazetteerPlace[]=[
 point('soissons','苏瓦松','法国 · 巴黎东北、埃纳河沿岸',['Soissons','Suessonae','索松','丕平即位','卡洛曼即位'],[3.32761,49.38376],'earlySoissonsLocation','采用 OpenStreetMap 现代城市代表点。751 年丕平在此成为国王，但城市遗产册明确说具体仪式位置未知；不把点位认定为圣梅达尔修道院内的礼仪现场。'),
 point('paderborn','帕德博恩','德国 · 威斯特法伦东部、威悉河以西',['Paderborn','帕德波恩','帕德堡','777年大会','799年教皇会面'],[8.755278,51.719444],'earlyPaderbornLocation','采用今天皇宫遗址与博物馆区域的参考坐标，不是 777 年大会的精确会场。现存重建馆舍主要反映十一世纪亨利二世宫殿，不能当作查理时代建筑原貌。'),
 point('ingelheim','英格尔海姆','德国 · 莱茵河左岸、美因茨以西',['Ingelheim','Ingelheim am Rhein','因格尔海姆','塔西洛审判'],[8.07155,49.97658],'earlyIngelheimLocation','采用现代皇宫博物馆代表点帮助寻找王宫区域；不是 788 年审判的精确房间。现存萨尔教堂等建筑包含后世工程，不全部回填到查理时期。'),
 point('verden-aller','费尔登（阿勒河）','德国 · 下萨克森、阿勒河沿岸',['Verden','Verden an der Aller','费尔登','弗尔登','782年费尔登'],[9.22843,52.92221],'earlyVerdenLocation','以现代费尔登市政厅作地区位置参照，不指认 782 年处决现场，也不采用后世纪念物作为战场坐标。这里不是 843 年条约所在地法国凡尔登（Verdun）。'),
];
const northPeople='法兰克王室与军事贵族、地方城镇和乡村居民、教士及不同背景社群并存；王朝更替不等于人口整体更换。';
const latin='拉丁文用于教会与书面政务，地方口语另有差异；不能从王廷文书推定全体居民的母语比例。';
const local=(id:string,from:number,to:number,control:string,...sources:Source[]):HistoricalDetail=>{
 const p=frankishPlaces.find(p=>p.id===id)!;
 const geo:Record<string,Source>={soissons:'earlySoissonsLocation',paderborn:'earlyPaderbornLocation',ingelheim:'earlyIngelheimLocation','verden-aller':'earlyVerdenLocation'};
 const chapter=id==='soissons'?140:141;
 const reading:ReadingReference[]=[{chapter,pages:chapter===140?[1176,1184]:[1184,1192],note:'课程提供王朝与扩张背景，本地点的具体纪年和定位据独立地方史与研究补充；不表示课程逐一讲过这些地点。'}];
 return {id:`frankish-${id}-${from}`,placeId:id,title:p.name,from,to,focusYear:from,kind:id==='verden-aller'?'事件地点':id==='soissons'?'历史城市':'宫廷驻地',period:from===to?`公元 ${from} 年的地点记录`:`${from}—${to} 年的政治背景`,polity:fact(control,...sources),territory:fact(p.modern+'。点位帮助建立方位，不代表城墙、驻军阵位或统治边界。',geo[id]),people:fact(id==='verden-aller'?'处决的俘虏、参与战争的集团和当地全部居民须分别理解；传承中的人数不能当作全体萨克森居民的统计。':id==='paderborn'?'法兰克宫廷、驻军、传教者与当地萨克森社群相遇；大会参与者不等于本地区所有居民，归附和抵抗并存。':northPeople,...sources),language:fact(latin,...(id==='soissons'?['earlySoissonsHistory' as const]:id==='paderborn'?['earlyPaderbornMuseum' as const]:id==='ingelheim'?['earlyIngelheimMuseum' as const]:[])),nameNote:fact(p.description,geo[id],...(id==='soissons'?['earlySoissonsHistory' as const]:id==='paderborn'?['earlyPaderbornMuseum' as const]:id==='ingelheim'?['earlyIngelheimPalace' as const]:[])),related:id==='soissons'?['paris','aachen']:id==='verden-aller'?['paderborn','aachen']:['aachen','regensburg','soissons'],reading};
};
export const frankishDetails:HistoricalDetail[]=[
 local('soissons',701,750,'墨洛温王号与宫相实权并存时的北部高卢城市；751 年丕平王位更替尚未发生，不把古代苏瓦松王国套到本期。','earlySoissonsHistory','earlyFrankishRhine'),
 local('soissons',751,751,'751 年 11 月丕平在苏瓦松被拥立为国王，开启加洛林王朝。具体仪式地点未确定；754 年在圣但尼由教皇再次为丕平施行受膏，是另一次事件，不在同一地点。','earlySoissonsHistory','earlyPepinDonation'),
 local('soissons',752,767,'丕平的加洛林王权下的城市与宗教中心；圣梅达尔等修道院网络不等于王国全部领土，也不是唯一固定首都。','earlySoissonsHistory'),
 local('soissons',768,770,'768 年 10 月 9 日卡洛曼在苏瓦松即位，兄长查理在努瓦永即位；兄弟各有王国部分。不能把此时苏瓦松一概写成查理独掌的宫廷。','earlySoissonsHistory'),
 local('soissons',771,800,'771 年卡洛曼去世后，其王国部分进入查理王权。苏瓦松仍是北部高卢的重要城市；800 年西方帝号属于后续称号变化，不是城市重新建立。','earlySoissonsHistory','carolingian'),
 local('paderborn',776,776,'城市资料将查理首次来访及卡尔斯堡、教堂建设记在 776 年。法兰克王廷在萨克森战争中设立据点，不表示全萨克森已稳定归服。','earlyPaderbornHistory','earlyPaderbornMuseum'),
 local('paderborn',777,777,'777 年在此举行法兰克王廷大会，是法兰克王权进入萨克森的可定位节点；地方归附、传教与持续抵抗不能压成一次完成征服。','earlyPaderbornHistory','earlyEinhard'),
 local('paderborn',778,798,'777 年大会之后仍处于长期萨克森战争背景。785 年维杜金德受洗也不是战争结束；本时间段不表示查理每年在城中或每座聚落均被同等直接治理。','earlyPaderbornHistory','earlyFrankishRhine'),
 local('paderborn',799,799,'799 年教皇利奥三世在帕德博恩与查理会面；800 年罗马加冕尚在以后，不能将这次会面本身写成皇帝加冕。','earlyPaderbornHistory','carolingian'),
 local('paderborn',800,800,'799 年教皇会面后的宫廷据点；800 年末加冕发生在罗马，不在帕德博恩。萨克森战争仍有后续，不以帝号出现推定全区已和平统一。','earlyPaderbornHistory','earlyFrankishRhine','carolingian'),
 local('ingelheim',788,788,'788 年查理在英格尔海姆举行大会并审判巴伐利亚公爵塔西洛三世，公爵权位被剥夺。审判地在莱茵河边；巴伐利亚与雷根斯堡在更东南的多瑙河方向。','earlyIngelheimTrial','earlyIngelheimMuseum','earlyEinhard'),
 local('ingelheim',789,800,'作为八世纪末法兰克巡回王廷的宫殿网络理解，与亚琛等驻地并存；不是单一固定首都。宫殿建设的具体起点与现存建筑年代分别看，不把后世教堂完整提前到本期。','earlyIngelheimPalace','earlyIngelheimMuseum'),
 local('verden-aller',782,782,'782 年法兰克军在聚恩特尔山一带战败之后，发生费尔登大规模处决事件。不同编年史的叙述存在差别；4500 人是史料传承中的数目，不是已核定的死亡统计，也不能当作萨克森总人口。精确处决现场未在本图核定。','earlyVerdenAnnals','earlyVerdenHistory'),
];
const framed=(id:string,name:string,_year:number,dates:string,where:string,control:string,people:string,language:string,bounds:[number,number][],locationLabel:string,...sources:Source[]):RegionalPolityCard=>({id,name,from:701,to:800,dates,site:'',siteName:'',where,control,people,language,bounds,locationLabel,sources});
const cityCard=(id:string,name:string,site:string,siteName:string,where:string,control:string,...sources:Source[]):RegionalPolityCard=>({id,name,from:701,to:800,dates:'本卡详述 701—800 年的阶段；随所选年份变化',site,siteName,where,control,people:northPeople,language:latin,sources});
export function frankishPolitiesAt(region:string,year:number):RegionalPolityCard[]{
 if(year<701||year>800)return [];
 if(region==='gaul')return [
 cityCard('frankish-north',year<751?'墨洛温王号下的法兰克核心':year<768?'丕平的加洛林王权':year<771?'查理与卡洛曼分掌的法兰克':year<800?'查理独掌的法兰克王权':'获得西方帝号的法兰克王权','soissons','苏瓦松','北部高卢及莱茵两侧的王廷网络；苏瓦松与巴黎、亚琛分别定位。',year<751?'国王称号与宫相实权须分开；751 年丕平成为国王尚未发生。':year<768?'751 年在苏瓦松发生王位更替；754 年教皇受膏是另一个节点。':year<771?'768 年卡洛曼在苏瓦松、查理在努瓦永即位；两王各掌部分地域。':year<800?'771 年后查理独掌；意大利兼王号、萨克森战争和巴伐利亚治理各有自己的时间。':'按年末罗马加冕后叙述：帝号改变，东罗马仍存在，其他地方权力也不是同日全部取消。','earlySoissonsHistory','earlyFrankishRhine','carolingian'),
 framed('aquitaine','阿基坦与南部高卢',year,'本卡 701—800 年；地方整合随战争与继承变化','今法国西南、卢瓦尔河以南至比利牛斯方向，与东北的莱茵地域不同。','阿基坦的地方公爵、法兰克征服与王室整合是不同阶段。丕平与查理的南方战争不使整个高卢从 701 年起就是同等直辖的行政区；纳博讷另见地中海沿岸。',northPeople,latin,[[-2,42.5],[4,47.5]],'阿基坦方向','earlyEinhard','earlyFrankishRhine'),
 framed('burgundy','勃艮第历史地域',year,'六世纪已进入法兰克体系；本卡详述八世纪地域层次','今法国东部、索恩河—罗讷河方向，不等于今天的整个法国或瑞士。','这是法兰克政治空间内的历史地域与地方网络，不能把早在 534 年结束的勃艮第王国原样复活到八世纪，也不能提前套用后世勃艮第公国国界。',northPeople,latin,[[2,44],[8,48.5]],'勃艮第方向','earlyFrankish','earlyCentral'),
 ];
 if(region!=='central')return [];
 return [
 cityCard('rhine-frankish','莱茵方向的法兰克宫廷网络',year>=788?'ingelheim':'aachen',year>=788?'英格尔海姆':'亚琛','莱茵、默兹及其周边的王廷联系，与北方萨克森、东南巴伐利亚和中多瑙河分开。',year>=788?'英格尔海姆是 788 年塔西洛审判的地点；王廷在多处宫殿之间移动，不能用一个固定首都代表全部统治空间。':'法兰克王廷与贵族、教会网络延展；亚琛只作腹地位置线索，不表示每年都是唯一首都。','earlyIngelheimPalace','earlyIngelheimTrial','earlyFrankishRhine'),
 framed('saxony','萨克森地方集团与战区',year,'772—804 年长期战争；785 年受洗不是结束','主要在今德国西北、威悉河及易北河方向，帕德博恩在其威斯特法伦一侧；不是以德累斯顿为中心的现代萨克森州。',year<772?'地方政治与宗教网络与法兰克王权不同；不能提前显示成查理已完成征服。':year===782?'本年应把聚恩特尔败战与费尔登处决分别理解，不能把 4500 人写成萨克森人口统计。':year<785?'法兰克入侵、驻地、归附与再起交错；777 年大会不能生成整个萨克森稳定国界。':'维杜金德受洗以后战争和抵抗仍继续至 804 年，不能以 785 年抹去所有地方社群。','萨克森是历史集团称谓；首领、战士、受洗者和地方居民不等于一个能按现代国界统计的血缘群体。','当地日耳曼语背景口语与法兰克传教、拉丁文书写分别理解；不推定全体同日改变语言。',[[6.5,50.8],[12.5,54.5]],'早期萨克森方向','earlyFrankishRhine','earlyEinhard','earlyPaderbornMuseum','earlyVerdenAnnals'),
 cityCard('bavaria',year<788?'巴伐利亚公爵权力':'法兰克更直接治理下的巴伐利亚','regensburg','雷根斯堡','多瑙河上游、阿尔卑斯以北的巴伐利亚，核心城市雷根斯堡；不是更东的阿瓦尔盆地。',year<788?'公爵和地方贵族保有权力，与法兰克的臣属及冲突关系变化；788 年塔西洛被废尚未发生。':'788 年在英格尔海姆废除塔西洛权位，巴伐利亚改由伯爵治理；与萨克森征服、阿瓦尔战争不是同一事件。','earlyEinhard','earlyIngelheimTrial'),
 framed('avars','中多瑙河的阿瓦尔政治空间',year,'568 年后盆地政权；八世纪末战争与九世纪初重组','喀尔巴阡盆地、中多瑙河方向，约今匈牙利及邻区；不是现代匈牙利国家，也没有核定唯一王都。',year<791?'阿瓦尔政治权力与西方巴伐利亚、北方萨克森分别存在；626 年远征失败不等于当年灭亡。':'791 年起法兰克战争削弱阿瓦尔权力，随后归附、地方重组与社群延续进入九世纪初。800 年不能把全体阿瓦尔居民从地图上删除。','阿瓦尔统治与军事精英、地方社群及斯拉夫等历史背景分别看；不将阿瓦尔直接等同于后世鞑靼人或现代某一民族。','政治名称和考古遗存不足以给出本区全体居民的母语比例；不画单一语言或祖源色块。',[[15,45],[23,49]],'阿瓦尔中多瑙河方向','earlyAvars','earlyAvarCampaign'),
 ];
}
export function frankishAnchors(region:string,year:number):[string,string][]{
 if(year<701||year>800)return [];
 if(region==='gaul')return [['soissons',year===751?'苏瓦松 · 丕平成为国王':year>=768&&year<=770?'苏瓦松 · 卡洛曼的王权节点':'苏瓦松 · 北部高卢城市']];
 if(region!=='central')return [];
 return [...(year>=776?[['paderborn',year===777?'帕德博恩 · 王廷大会':year===799?'帕德博恩 · 教皇会面':'帕德博恩 · 王廷据点'] as [string,string]]:[]),...(year>=788?[['ingelheim',year===788?'英格尔海姆 · 塔西洛审判':'英格尔海姆 · 巡回王廷'] as [string,string]]:[]),...(year===782?[['verden-aller','费尔登 · 782 年事件地区'] as [string,string]]:[])];
}
