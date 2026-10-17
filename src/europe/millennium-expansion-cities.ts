import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {courseSources} from './course-sources';
import {millenniumExpansionSources} from './millennium-expansion-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
export const millenniumExpansionPlaces:GazetteerPlace[]=[{
 id:'preslav',name:'普雷斯拉夫',modern:'保加利亚 · 大普雷斯拉夫',aliases:['Preslav','Veliki Preslav','普列斯拉夫','大普雷斯拉夫','约安诺波利斯','Joanopolis'],coords:[26.8149542,43.1533503],kind:'中世纪王都遗址参考',source:millenniumExpansionSources.preslavLocation.url,
 description:'第一保加利亚国家的第二王都，在普利斯卡西南。坐标采用考古博物馆的参考 GPS，不是古城中心、宫殿或城墙边界。'
}];
const city=(placeId:string,year:number,title:string,polity:string,source:Source,related:string[]=[],people?:string):HistoricalDetail=>({
 id:`millennium-extra-${placeId}-${year}`,placeId,from:year,to:year,focusYear:year,title,kind:'历史城市',period:`公元 ${year} 年，按所述事件之后`,
 polity:fact(polity,source),territory:fact('本点是城市或遗址位置参考，不代表政权全域、城市城墙或精确行政界线。'),
 people:people?fact(people,source):fact('本条尚无可核对的城市人口比例；王朝和驻军名称不能代替全部居民身份。'),
 language:fact('尚未补齐当地口语与行政、宗教书写语言的对应关系，不根据统治者祖源推定全城母语。'),
 nameNote:fact('采用当时城市的通行中文名称；现代国家仅帮助找位置，不决定历史归属。'),related,
});
const preslav=city('preslav',893,'普雷斯拉夫','893 年从普利斯卡迁都，西美昂一世的王权与宗教文化中心在此发展。','preslavHistory',['pliska','byzantium'],'考古与博物馆研究区分宫廷、贵族住宅、修道院、工艺和普通居民区，不将王都人口只看作军队。');
const additions:HistoricalDetail[]=[
 {...preslav,from:893,to:968,period:'893—968 年：第二王都的主要发展阶段',language:fact('博物馆资料记述斯拉夫／古保加利亚书写在礼拜和政务中的地位，以及从希腊文翻译和本地创作。书写证据不等于全城母语统计。','preslavHistory')},
 city('preslav',971,'普雷斯拉夫（约安诺波利斯）','约翰一世征服后，城市被东罗马改称约安诺波利斯；保加利亚的西部抵抗没有因此全部结束。','preslavHistory',['pliska','byzantium']),
 city('preslav',1018,'普雷斯拉夫','在 1018 年东罗马征服保加利亚的地域背景下定位旧王都。此卡不将旧都认定为本年全部地方行政中心。','millenniumBalkans',['byzantium','pliska']),
 city('aachen',962,'亚琛','奥托王朝统治体系中的王室与加冕城市；奥托一世本年的皇帝加冕发生在罗马，不在亚琛。','ottonian',['rome','magdeburg','pavia']),
 city('magdeburg',962,'马格德堡','奥托一世扶持的重要宗教与王室中心；968 年的大主教区建立不能提前到本年。','ottonian',['aachen','pavia']),
 city('pavia',962,'帕维亚','奥托统治体系内的意大利王国中心。意大利王权与皇帝称号相关，不等于整个意大利半岛统一直辖。','paviaItalian',['rome','aachen']),
 city('magdeburg',965,'马格德堡','965 年特许状记录城市与教会权利；地方权利不等于国家边界。','magdeburgCharter',['aachen'],'文书中出现犹太人与其他商人，是城市多样社会的证据，不能由此推算人口比例。'),
 city('magdeburg',968,'马格德堡','大主教区在本年建立；教会辖区、城市和帝国疆界分别理解。','magdeburg',['gniezno','aachen']),
 city('paris',988,'巴黎','于格·卡佩统治早期的法兰西城市。国王直接控制的王室领地与王国范围并不相同。','capetPower',['aachen','rouen']),
 city('kyiv',988,'基辅','弗拉基米尔推动基督教化并与东罗马联姻；罗斯并未因此成为帝国的直接行省。','kyivVolodymyr',['byzantium','gniezno'],'基辅集体受洗的纪年节点与整个罗斯长期的改宗过程分开；不能据此宣称全境已无其他信仰。'),
 city('london',1016,'伦敦','按年末克努特成为英格兰无竞争国王之后记录；埃塞尔雷德与埃德蒙的年内统治另看。','cnutEngland',['winchester','rouen']),
 city('winchester',1016,'温彻斯特','英格兰王室重要中心，按年末克努特确立王权之后阅读；此时尚未发生 1066 年诺曼征服。','cnutEngland',['london']),
 city('london',1018,'伦敦','克努特治下的英格兰城市；同一君主的多个王国不能理解为统一的中央行政体系。','cnutEngland',['winchester']),
 city('winchester',1018,'温彻斯特','克努特治下的英格兰王室与教会中心，英格兰法律与治理方法继续。','cnutEngland',['london'],'英格兰和丹麦背景的伯爵参与治理；不表示地方居民全部变成同一种祖源。'),
 city('gniezno',1025,'格涅兹诺','皮雅斯特王权与教会中心；波列斯瓦夫一世于本年取得王冠、去世，梅什科二世继位。此点不认定为无争议的精确加冕坐标。','gniezno',['magdeburg','esztergom']),
 city('london',1042,'伦敦','按忏悔者爱德华即位之后记录；北欧王室统治阶段结束，诺曼征服仍在以后。','edwardConfessor',['winchester','rouen']),
 city('winchester',1042,'温彻斯特','忏悔者爱德华治下的英格兰重要王室城市；王位更替并不意味着全城居民更换。','edwardConfessor',['london','rouen']),
 city('rome',1054,'罗马','教皇中心与君士坦丁堡牧首的绝罚成为教会分裂标志；不能把教会关系直接当作两个新帝国的疆界。','millenniumBalkans',['byzantium']),
 city('toledo',1031,'托莱多','安达卢斯的托莱多泰法王朝中心，已不能将它简单写成统一科尔多瓦哈里发朝廷的一部分。','millenniumIberia',['cordoba']),
 city('nicaea',1081,'尼西亚','按博物馆的 1078—1081 年阶段，塞尔柱支系在此建立鲁姆统治中心；不是 1204 年后的东罗马流亡帝国。','seljuqAnatolia',['byzantium','manzikert'],'突厥迁徙和政治控制进入原有东罗马与亚美尼亚基督教传统的空间；不能推定全城居民在同年更换。'),
 city('toledo',1085,'托莱多','按阿方索六世取得城市之后记录，原泰法中心转入其统治；不等于整个安达卢斯同时消失。','millenniumIberia',['cordoba']),
 city('cordoba',1090,'科尔多瓦','在穆拉比特开始接管安达卢斯的阶段中定位南部城市；王朝主朝廷在马拉喀什，不能将科尔多瓦继续标为统一哈里发国首都。','millenniumIberia',['toledo']),
 city('mainz',1096,'美因茨','莱茵地区城市，部分十字军队伍在此迫害犹太社群；这是沿途暴力发生地，与耶路撒冷战场不同。','crusadeMainz',['jerusalem'],'所引约 1140 年写成的希伯来叙述记载犹太社群逃难、抵抗与遇害；不采用其修辞推算全城人口。'),
 city('nicaea',1097,'尼西亚','十字军围城后，城市向东罗马皇帝一方投降，恢复东罗马控制；不是建立拉丁尼西亚王国。','crusadeNicaea',['byzantium','antioch']),
 city('nicaea',1100,'尼西亚','1097 年已恢复东罗马控制的城市；不能继续套用 1081 年塞尔柱中心身份，也不是后来 1204 年的流亡帝国。','crusadeNicaea',['byzantium','jerusalem']),
 city('toledo',1100,'托莱多','1085 年取得之后仍在阿方索六世的统治空间，和南部穆拉比特控制的地域分别看。','millenniumIberia',['cordoba']),
 city('cordoba',1100,'科尔多瓦','处于穆拉比特的安达卢斯统治空间；主要王朝朝廷位于北非马拉喀什，原哈里发称号阶段已结束。','millenniumIberia',['toledo']),
];
/** Existing dated city evidence wins; add only genuinely uncovered years. */
export function completeMillenniumExpansion(existing:HistoricalDetail[]):HistoricalDetail[]{
 const extra:HistoricalDetail[]=[];
 for(const candidate of additions){
  let gaps:[number,number][]=[[candidate.from,candidate.to]];
  for(const d of [...existing,...extra].filter(d=>d.placeId===candidate.placeId))gaps=gaps.flatMap(([a,b])=>d.to<a||d.from>b?[[a,b] as [number,number]]:[...(a<d.from?[[a,d.from-1] as [number,number]]:[]),...(d.to<b?[[d.to+1,b] as [number,number]]:[])]);
  for(const [from,to] of gaps)extra.push({...candidate,id:`${candidate.id}-${from}-${to}`,from,to,focusYear:from});
 }
 return [...existing,...extra];
}
