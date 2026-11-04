import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
import {highMedievalFrames} from './high-medieval';
import {highMedievalSources as source} from './high-medieval-sources';
export const highMedievalPlaces:GazetteerPlace[]=[
 {id:'messina',name:'墨西拿',modern:'意大利 · 西西里岛东北端',aliases:['Messina','墨西纳','墨西拿海峡'],coords:[15.55,38.19],source:source.highPeter.url,kind:'历史港口参考',description:'西西里岛东北端、面对卡拉布里亚的海峡港口。点位是城市近似位置，不是两岸控制边界。'},
 {id:'melfi',name:'梅尔菲',modern:'意大利 · 巴西利卡塔 · 内陆',aliases:['Melfi','梅尔菲法典','Liber Augustalis'],coords:[15.65,41],source:source.highMelfi.url,kind:'历史城市参考',description:'意大利南部内陆的城市，与岛上巴勒莫、海边那不勒斯分开。1231年王国法典以此命名。'},
 {id:'tagliacozzo',name:'塔利亚科佐战役地域',modern:'意大利 · 阿布鲁佐 · 帕伦蒂尼平原',aliases:['Tagliacozzo','Piani Palentini','塔利亚科佐','斯库尔科拉'],coords:[13.37,42.06],source:source.highTagliacozzo.url,kind:'战役地域参考',description:'以塔利亚科佐命名的1268年战役实际涉及帕伦蒂尼平原。坐标只帮助找到地域，不是精确战场或城镇中心。'},
 {id:'bouvines',name:'布汶',modern:'法国 · 里尔附近',aliases:['Bouvines','布汶战役','布维讷'],coords:[3.19,50.58],source:source.highBouvines.url,kind:'战役地域参考',description:'法国北部、里尔附近的城镇，1214年7月27日会战以此命名。这里只定位地域，不复原部队精确阵位。'},
 {id:'runnymede',name:'兰尼米德',modern:'英国 · 泰晤士河畔 · 温莎与斯泰恩斯之间',aliases:['Runnymede','兰尼米德草地','大宪章','Magna Carta'],coords:[-.56,51.44],source:source.highRunnymede.url,kind:'历史事件地域参考',description:'1215年约翰与男爵达成宪章的河畔草地。代表点不是可证明的落印桌位置；不能把现代纪念碑当中世纪现场。'},
 {id:'cortenuova',name:'科尔泰诺瓦',modern:'意大利 · 伦巴第 · 贝加莫东南',aliases:['Cortenuova','Cortenova','科尔泰诺瓦战役'],coords:[9.85,45.54],source:source.highFrederick.url,kind:'战役地域参考',description:'1237年皇帝与伦巴第同盟作战的地域。城市代表点不表示战场界线或全体居民立场。'},
];
const fact=(text:string,...sources:HistorySource[])=>({text,sources});
const englandSource=(year:number):HistorySource=>year<1199?'highRichard':year<1216?'highJohn':year<1272?'highHenryIII':'highEdward';
const franceSource=(year:number):HistorySource=>year<1223?'philipII':year<1226?'highLouisVIII':year<1270?'highLouisIX':'highPhilipIII';
const sicilySource=(year:number):HistorySource=>year<=1197?'highHenryVI':year<=1245?'highFrederick':year<=1254?'highConrad':year===1261?'highManfred':year===1282?'highPeter':'highCharles';
function entry(year:number,placeId:string,title:string,polity:string,territory:string,keys:HistorySource[],related:string[],reading:HistoricalDetail['reading'],extra?:Partial<HistoricalDetail>):HistoricalDetail {
 return {id:`${placeId}-high-${year}`,placeId,title,displayName:title,from:year,to:year,focusYear:year,kind:'历史城市',period:`${year}年：按本专题标注时点阅读`,polity:fact(polity,...keys),territory:fact(territory,...keys),people:fact('统治者、教士、贵族、城市居民和乡村社会有不同身份；本条没有居民祖源比例。'),language:fact('拉丁文书、地方口语以及贵族和教会的语言使用分开理解；本条没有全体居民母语统计。'),nameNote:fact('本条使用所选时代的通行中文地名。王位改变不会让原有居民和地方名称在一天内全部替换。'),reading,readingNote:'本条是单年政治定位说明；没有借此宣称本城市全部社会史、人口与城界已经核验完毕。',related,...extra};
}
export const highMedievalDetails:HistoricalDetail[]=highMedievalFrames.flatMap(f=>{
 const england=f.realms.find(r=>r.id==='england')!,west=f.realms.find(r=>r.id==='west-francia')!,sicily=f.realms.find(r=>r.id==='sicily')!;
 const es=englandSource(f.year),fs=franceSource(f.year),ss=sicilySource(f.year);
 return [
  entry(f.year,'london','伦敦',`英格兰国王为${england.ruler}。${england.status}`,'泰晤士河畔的城市与王权、贵族、教会相互联系；不能把伦敦等同整个不列颠。',[es],['winchester','runnymede','rouen'],f.reading,{people:fact(england.people,'highMagna'),language:fact(england.language)}),
  entry(f.year,'paris','巴黎',`法兰西国王为${west.ruler}。${west.status}`,'巴黎与塞纳河流域的王室核心、其他诸侯领地和王国名义范围是不同尺度。',[fs],['rouen','bouvines','london'],f.reading),
  entry(f.year,'rouen','鲁昂',f.year<1204?'诺曼底与英格兰君主共有王朝联系，但公国与英格兰王国是不同政治地域。':`1204年征服之后的诺曼底城市，现处${west.ruler}治下的法兰西王权联系中；不能沿用征服前的英格兰君主归属。`,'在塞纳河下游、英吉利海峡南侧。1204年鲁昂所在的公国核心易主，不代表海峡北面的英格兰也被法兰西吞并。',['highNormandy',fs,...(f.year<1204?[es]:[])],['paris','london','bouvines'],f.reading),
  entry(f.year,'palermo','巴勒莫',`${sicily.ruler}。${sicily.status}`,'在西西里岛北岸。1194年的加冕地点、王国全部组成、岛上的城市和本年的实际统治需要分别看。',[ss,'highPalermo'],['messina','naples','melfi'],f.reading,{people:fact(sicily.people,'highPalermo'),language:fact(sicily.language,'highPalermo')}),
 ];
});
const add=(year:number,id:string,title:string,polity:string,territory:string,keys:HistorySource[],related:string[],extra?:Partial<HistoricalDetail>)=>highMedievalDetails.push(entry(year,id,title,polity,territory,keys,related,highMedievalFrames.find(f=>f.year===year)!.reading,extra));
add(1191,'rome','罗马','亨利六世于1191年4月15日取得帝号，南部西西里王国尚未被他征服。','罗马加冕与那不勒斯围城受挫分别理解；不以加冕地点推导全半岛实控。',['highHenryVI'],['naples','palermo','aachen']);
add(1212,'mainz','美因茨','腓特烈二世于1212年12月在美因茨加冕为王；奥托四世仍在竞争。','美因茨在莱茵河地区，亚琛是1215年再次加冕地点，罗马则是1220年皇帝加冕地点。',['highFrederick'],['aachen','rome','palermo']);
add(1214,'bouvines','布汶','腓力二世击败包括奥托四世在内的联盟；约翰本人南方行动与此会战分开。','位于法国北部里尔附近；不把1204年诺曼底征服全部挪到1214年此处。',['highBouvines','highFrederick','highOtto'],['paris','rouen','london'],{kind:'事件地点'});
add(1215,'runnymede','兰尼米德','约翰与男爵于6月15日以王印认证宪章。本专题取8月废止以前的时点。','在温莎与斯泰恩斯之间的泰晤士河畔草地；不是诺曼底或伦敦城内。',['highRunnymede','highMagna','highLondon'],['london','winchester'],{kind:'事件地点',people:fact('男爵、教会、自由人和不自由人口的法律地位不同；宪章不是向所有居民授予现代平等选举权。','highMagna')});
add(1220,'rome','罗马','腓特烈二世于1220年11月22日获帝号；其北侧王位与西西里王权分别存在。','共享君主不能把西西里在制度上改为德意志普通省份。',['highFrederick'],['mainz','aachen','palermo']);
add(1231,'melfi','梅尔菲','腓特烈二世公布针对西西里王国的法典。','梅尔菲在意大利南部大陆内陆，王国却还包含海峡另一侧的西西里岛；法典不自动适用于整个帝国。',['highMelfi','highFrederick'],['palermo','naples','messina'],{kind:'事件地点'});
add(1237,'cortenuova','科尔泰诺瓦','腓特烈二世于11月27日击败伦巴第同盟军队，城市争夺并未因此永久结束。','在贝加莫东南、波河平原北缘；不是1176年的莱尼亚诺。',['highFrederick'],['milan','pavia','legnano'],{kind:'事件地点'});
add(1245,'lyon','里昂','英诺森四世在里昂会议上宣告废黜腓特烈二世，皇帝仍继续抵抗。','会议地点与皇帝全部实控范围不同；教皇的宣告不是地图上所有城镇在同日改换政权。',['highFrederick'],['rome','palermo','paris'],{kind:'事件地点'});
add(1266,'benevento','贝内文托','安茹查理击败曼弗雷德，取得南部王国的军事优势。','在意大利南部内陆；1266年王号封授、加冕与战役结果分开。',['highCharles','highManfred'],['naples','palermo','tagliacozzo'],{kind:'事件地点'});
add(1268,'tagliacozzo','塔利亚科佐战役地域','康拉丁于8月23日作战失败，后来在那不勒斯处刑。','实际作战地域涉及帕伦蒂尼平原，不能把塔利亚科佐镇中心或那不勒斯处刑地点直接当作精确战场。',['highTagliacozzo','highTagliacozzoCity','highCharles'],['naples','palermo','benevento'],{kind:'事件地点'});
add(1268,'naples','那不勒斯','安茹查理统治下的南部城市，康拉丁在此被处刑。','那不勒斯是处刑城市；塔利亚科佐战役发生在更北的内陆平原，两地不能合成一个点。',['highNaples','highCharles'],['tagliacozzo','palermo','benevento'],{kind:'事件地点'});
add(1282,'messina','墨西拿','佩德罗介入西西里岛之后，墨西拿与海峡两岸成为争夺方向；查理仍保有大陆部分。','港口在海峡西岸，卡拉布里亚在东岸。岛屿改换王权不等于海峡另一侧全部同时易主。',['highPeter','highCharles'],['palermo','naples'],{kind:'事件地点'});
add(1282,'naples','那不勒斯','安茹查理在失去西西里岛优势后，仍保有意大利南部大陆王权。','本年岛屿和大陆分别着色；“西西里国王”的称号与实际掌握岛屿不能简单等同。',['highCharles','highPeter'],['messina','palermo']);
