import data from './medieval-transition-place-data.json';
import states from './medieval-transition-states.json';
import {medievalTransitionFrames} from './medieval-transition';
import {medievalTransitionSources as sources} from './medieval-transition-sources';
import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
// Rounded original reference points, not surveyed battlefield positions or city borders.
export const medievalTransitionPlaces:GazetteerPlace[]=data.map(p=>({id:p.id,name:p.name,modern:p.modern,aliases:p.aliases,coords:p.coords as [number,number],source:sources[p.key as keyof typeof sources].url,kind:'中世纪地点参考',description:'中文历史地点与现代地域对照。坐标用于阅读定位，战役点不表示精确阵位；点开对应年份看政治关系和来源。'}));
const fact=(text:string,...sources:HistorySource[])=>({text,sources});
export const medievalTransitionDetails:HistoricalDetail[]=medievalTransitionFrames.flatMap(f=>{
 const s=states.find(s=>s.year===f.year)!,y=f.year;
 const realm=(id:string)=>f.realms.find(r=>r.id===id)!;
 const entry=(id:string,name:string,polity:string,territory:string,keys:HistorySource[],related:string[],kind:HistoricalDetail['kind']='历史城市'):HistoricalDetail=>({id:`${id}-transition-${y}`,placeId:id,from:y,to:y,focusYear:y,period:f.eventDate,title:name,displayName:name,kind,polity:fact(polity,...keys),territory:fact(territory,...keys),people:fact('政治承认、宫廷、贵族、城市团体与其他居民的身份不同；本条尚无完整居民祖源或比例调查。'),language:fact('地方口语、教会和行政书写分别理解；没有从君主或地图颜色推断全体居民母语。'),nameNote:fact('以通行中文历史名称配合现代位置；同名王号、现代国家与当时城市控制分开。'),reading:f.reading,readingNote:'课程页码提供主题线索；东部王权、具体日期和纠误由所列独立来源支持。仅适用于所标时点。',related});
 const city=(id:string,name:string,rid:string,keys:HistorySource[],related:string[],text?:string)=>{const r=realm(rid);return entry(id,name,text??`${r.ruler}。${r.status}`,r.geography,keys,related);};
 const paris=y>=1422&&y<=1435?'英格兰—勃艮第阵营治理下的城市，亨利六世主张法国王号；查理七世在其他地域称王。巴黎1436年才被收复。':y>=1439?'1436年后回到查理七世阵营；本城的变化不能代替全法国前线。':`${s.france}。${realm('west-francia').status}`;
 const rouen=y>=1420&&y<1450?'1419年被亨利五世军队攻取后，由英方治理。1431年贞德在本城受审并被处死；不能把兰斯加冕放在鲁昂。':y>=1450?'1449年鲁昂回归查理七世；1450诺曼底战役继续完成其他据点的收复。':'法兰西诺曼底城市；阿金库尔战役没有让鲁昂在1415年立即被英军攻取，英方攻取本城在1419年。';
 const papal=y<1377?'教皇驻阿维尼翁；罗马与城市领有的关系另看。':y===1377?'格列高利十一已回罗马；阿维尼翁仍为教皇拥有的城市，驻地改变不等于城市出售。':y===1378?'克雷芒七世本年在丰迪当选，1379年才到阿维尼翁；不得提前写成本年已在这里就职驻留。':y<1396?'克雷芒七世在阿维尼翁的竞争性教廷，与罗马承认线并存。':y<=1402?'本笃十三的阿维尼翁教廷，与罗马一方竞争；政治承认不是居民族群划界。':y<=1410?'本笃十三仍保有竞争性教皇主张，但1403年已离开阿维尼翁；传统名称不等于本人仍住本城。':y<=1417?'阿维尼翁承认传统与本笃十三的持续主张分别看；不能从传统名称推断本人驻此。':'本城仍有教皇权利与治理；不能把罗讷河整块地域都称作教皇直辖。';
 const rome=y<1377?'教廷主要驻阿维尼翁；罗马的教皇权利和地方治理另看。':y===1377?'格列高利十一1月17日回到罗马。':y===1378?'乌尔班六世在罗马当选；丰迪的克雷芒七世是另一条竞争承认线。':y<1396?'罗马系教皇与阿维尼翁的克雷芒七世竞争；不能按阵营名称判断本人每年住在哪里。':y<=1410?'罗马承认线与本笃十三竞争；1409比萨会议选出的第三位也没有使争议立即结束。':y===1414?'罗马系格列高利十二、比萨系约翰二十三及本笃十三三方主张并存。':y===1415?'格列高利十二7月4日自愿退位；约翰二十三被罢免，本笃十三继续主张。':y===1417?'马丁五世在康斯坦茨当选，本人直到1420年9月才进入罗马。':y<=1429?'马丁五世；1420年9月以后已进入罗马。':y<=1444?'尤金四世；巴塞尔会议与佛罗伦萨会议在1439年形成对立，斐理五世也提出教皇主张。':'尼古拉五世；斐理五世1449年已退位。';
 const ds:HistoricalDetail[]=[
 entry('rome','罗马',rome,'台伯河畔城市；丰迪、阿维尼翁、比萨、康斯坦茨、巴塞尔和佛罗伦萨是另外的事件地点。',['transitionReturn','transitionGregory','transitionMartinV','transitionEugenius'],['fondi','avignon','konstanz'],'教廷驻地'),
 city('london','伦敦','england',[y<1377?'lateEdwardIII':y<1399?'transitionRichard':y<1414?'transitionHenryIV':y<1422?'transitionHenryV':'transitionHenryVI'],['paris','edinburgh','bordeaux']),
 city('paris','巴黎','west-francia',['transitionWar',...(y>=1420?['transitionTroyes' as HistorySource,'transitionHenryVI' as HistorySource]:[])],['rouen','reims','troyes'],paris),
 entry('calais','加来','1347年后由英王控制的海峡港口；1453年仍未随波尔多一起归法，1558年才由法国收复。','英吉利海峡东端，法国北部海岸；城镇与周边据点不是整个法国北部。',['transitionCalais'],['london','paris','bordeaux']),
 city('rouen','鲁昂','west-francia',['transitionWar','transitionHenryV'],['paris','reims','orleans5'],rouen),
 city('bordeaux','波尔多','gascony',['lateGascon','transitionBordeaux','transitionHenryVI'],['bayonne','london','castillon']),
 city('edinburgh','爱丁堡','scotland',[y<1377?'lateDavid':y<1396?'transitionRobertII':y<1409?'transitionRobertIII':y<1439?'transitionJamesI':'transitionJamesII'],['stirling','london']),
 city('prague','布拉格','bohemia',['transitionWenceslaus','transitionSigismund','transitionLadislaus'],['konstanz','frankfurt']),
 city('dijon','第戎','burgundy-duchy',['transitionBurgundy','transitionDukes','transitionArras'],['ghent','avignon']),
 city('ghent','根特','flanders',['lateFlanders','transitionBurgundy'],['dijon','bruges']),
 city('krakow','克拉科夫','poland',['transitionPoland','transitionJogaila','transitionJadwiga','transitionCasimir'],['vilnius','gniezno','buda']),
 city('trakai','特拉凯','lithuania',['transitionLithuania','transitionJogaila'],['vilnius','krakow'],'立陶宛核心中的城市参照。'+s.lithuania+'；大公头衔不等于已核验每座城堡在本年的驻军。'),
 city('vilnius','维尔纽斯','lithuania',['transitionLithuania','transitionJogaila','transitionSvitrigaila','transitionCasimir'],['krakow','trakai']),
 city('buda','布达','hungary',['transitionKings','transitionHungary','transitionHunyadi'],['esztergom','krakow','varna']),
 city('palermo','巴勒莫','sicily',[y<1377?'lateFrederickIV':y<1402?'transitionMaria':y<1414?'transitionMartin':'transitionAlfonso'],['messina','naples']),
 city('naples','那不勒斯','south-italy',[y<1381?'lateJoanna':y<=1410?'transitionNaples':y<=1440?'transitionJoannaII':'transitionAlfonso'],['palermo','messina','rome']),
 entry('avignon','阿维尼翁',papal,'罗讷河左岸城市；与罗马、丰迪、比萨不同。传统承认线名称不能当成本年本人所在地。',['transitionClement','transitionReturn','transitionGregory','transitionMartinV','avignonHistory'],['rome','fondi','pisa'],'教廷驻地'),
 entry('byzantium',y===1453?'君士坦丁堡（陷城后）':'君士坦丁堡',s.byzantium+'。'+realm('straits').status,'博斯普鲁斯海峡南口，今土耳其伊斯坦布尔历史半岛。城市控制不同于海峡两侧整片地域。',['transitionMehmedI','transitionMuradII','transitionMehmedII'],['hadrianople','bursa'],'帝国都城'),
 entry('hadrianople','埃迪尔内（阿德里安堡）',y<=1364?'色雷斯城市；奥斯曼取得该城的早期纪年存在讨论，本条不据此断定本年驻军。':s.ottoman+'。'+(y<=1410&&y>=1402?'欧洲一侧的权力中心也卷入继承争夺，不同于亚洲的布尔萨。':'奥斯曼在欧洲一侧的城市中心；君士坦丁堡的东罗马城市王权另看。'),'色雷斯内陆，马里查河方向；古代阿德里安堡、今土耳其埃迪尔内是同一城市的历史名称。',['transitionBayezid','transitionMehmedI','transitionMuradII'],['bursa','byzantium']),
 entry('bursa','布尔萨',s.ottoman+'。'+(y>=1402&&y<=1410?'诸子在亚洲一侧争夺的中心，具体占领随战争变化。':'奥斯曼在安纳托利亚西北的中心之一；君士坦丁堡在1453年前仍另有东罗马王权。'),'马尔马拉海南侧内陆；埃迪尔内在欧洲一侧，不是同一城市。',['transitionOrhan','transitionMehmedI','transitionMuradII'],['hadrianople','byzantium']),
 ];
 for(const focus of f.focusPlaces??[]){if(ds.some(d=>d.placeId===focus.placeId))continue;
 const note=focus.placeId==='aachen'?'西吉斯蒙德1414年11月在亚琛取得王冠；皇帝称号要到1433年。':focus.placeId==='arras'?'1435年9月21日查理七世与腓力善良和解，英勃联盟终结；巴黎到1436年才收复。':focus.placeId==='castillon'?'1453年7月17日卡斯蒂永战役；10月19日英军撤离波尔多，加来仍归英王。':focus.placeId==='reims'?'1429年7月17日查理七世在此加冕。巴黎的亨利六世加冕在1431年、另一座城市。':focus.placeId==='rome'?papal+' 罗马是另一座城市，具体驻留与竞争主张必须另分。':s.summary+' '+s.change;
 const keys:HistorySource[]=focus.placeId==='aachen'?['transitionSigismund']:focus.placeId==='arras'?['transitionArras']:focus.placeId==='castillon'?['transitionCastillon','transitionBordeaux','transitionCalais']:['grunwald','krevo'].includes(focus.placeId)?['transitionJogaila','transitionGrunwald']:['varna'].includes(focus.placeId)?['transitionVarna','transitionMuradII']:['ankara','kosovo-field','nicopolis-1396'].includes(focus.placeId)?['transitionBayezid','transitionMehmedI']:['fondi','pisa','konstanz','basel','florence','rome'].includes(focus.placeId)?['transitionClement','transitionGregory','transitionMartinV','transitionEugenius']:['transitionWar','transitionTroyes','transitionHenryVI'];
 const label=data.find(p=>p.id===focus.placeId)?.name??({orleans5:'奥尔良',reims:'兰斯',konstanz:'康斯坦茨',aachen:'亚琛',rome:'罗马'} as Record<string,string>)[focus.placeId]??focus.label;
 ds.push(entry(focus.placeId,label,note,'本年阅读事件的地点参照。城镇、会场、战役地域与行军线路是不同尺度；未复原精确部队路线。',keys,['paris','krakow','byzantium'],'事件地点'));
 }
 return ds;
});
