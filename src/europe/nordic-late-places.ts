import data from './nordic-late-place-data.json';
import {nordicLateSources as sources} from './nordic-late-sources';
import {nordicLateReading} from './nordic-late';
import {medievalTransitionFrames} from './medieval-transition';
import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistorySource} from './history-details';
export const nordicLatePlaces:GazetteerPlace[]=data.map(p=>({id:p.id,name:p.name,modern:p.modern,aliases:p.aliases,coords:p.coords as [number,number],source:sources[p.key as keyof typeof sources].url,kind:'中世纪地点参考',description:'城市或会战地域的约略定位点；现代国家帮助找位置，不证明当年归属。城堡、教堂、城市和战场尺度分开。'}));
const fact=(text:string,...sources:HistorySource[])=>({text,sources});
export const nordicLateDetails:HistoricalDetail[]=medievalTransitionFrames.flatMap(f=>{
 const y=f.year,realm=(id:string)=>f.realms.find(r=>r.id===id)!;
 const detail=(id:string,name:string,rid:string,keys:HistorySource[],related:string[],polity?:string,territory?:string,extra:Partial<HistoricalDetail>={}):HistoricalDetail=>{const r=realm(rid);return {id:`${id}-nordic-late-${y}`,placeId:id,from:y,to:y,focusYear:y,title:name,displayName:name,kind:'历史城市',period:f.eventDate.split('，')[0],polity:fact(polity??r.ruler+'。'+r.status,...keys),territory:fact(territory??r.geography,...keys),people:fact(r.people,...(rid==='norway-late'?['nordicBergen' as HistorySource]:rid==='sweden-late'?['nordicStockholm' as HistorySource]:[])),language:fact(r.language),nameNote:fact('现代国家、通行中文名与城市历史角色分开；点位不复原旧城边界或全年驻军。'),related,reading:nordicLateReading,readingNote:'课程只作地理与社会背景；卡尔马、北欧王号和城市具体状态据独立来源。',...extra};};
 const stockholm=y>=1389&&y<=1397?'阿尔布雷希特战败后，斯德哥尔摩仍由梅克伦堡派及后来的汉萨质押安排控制；1398年才交给玛格丽特。不能以瑞典承认埃里克证明本城已交接。':realm('sweden-late').ruler+'。王号和城市驻军不应直接等同；本城为贸易与转运中心，吕贝克商人享有特许。';
 const gotland=y===1360?'1361年丹麦征服尚未发生，本年不能倒填瓦尔德马已经取得哥特兰。':y<=1386?'1361年丹麦瓦尔德马军征服哥特兰，维斯比城外发生会战；后续君主和地方制度须另分期，不以古代瑞典名称推定本年归属。':y<=1397?'梅克伦堡派与海上武装的控制问题须分开；本轮不指定未经核定的逐日交接。':y<1408?'1398—1408年条顿骑士团占领哥特兰；不能因本岛今天属于瑞典，就在本年涂成瑞典王的稳定实控。':y<=1435?'1408年回到玛格丽特、埃里克一方；岛上王权、城市与维斯堡不应直接化成瑞典本土同一行政区。':y<=1444?'埃里克虽失去瑞典王位，仍控制维斯堡与哥特兰；废黜王号没有使岛上控制同时消失。':'1449瑞典军撤岛后，1450、1453年实际由丹麦方面控制；瑞典主张和地方城堡仍应区别。';
 const ds:HistoricalDetail[]=[
 detail('copenhagen','哥本哈根','denmark-late',['nordicCopenhagen','nordicErik'],['roskilde','helsingborg','ribe'],(y<1417?'本年仍与罗斯基勒主教座的城市控制相连，1417年才结束这一阶段。':'1417年以后结束罗斯基勒主教座控制的阶段，王室权利与市政、市场继续分层。')+' 本年丹麦王权：'+realm('denmark-late').ruler,'西兰岛东岸、厄勒海峡西侧。老集市广场是中世纪市场、市政位置参照，不把整座城市当作加冕会场。'),
 detail('roskilde','罗斯基勒','denmark-late',['nordicCopenhagen'],['copenhagen','helsingborg'],'重要主教座；哥本哈根至1417年的控制关系需与丹麦王号分别理解。'+realm('denmark-late').ruler,'西兰岛内的教会城市，哥本哈根在其以东；不是同一城的两个名称。'),
 detail('helsingborg','赫尔辛堡','denmark-late',['nordicDenmark','nordicMortgage'],['copenhagen','roskilde'],realm('denmark-late').ruler+'。'+(y>=1377&&y<=1385?'处在1370—1385斯堪尼亚抵押、市场特权和归还过程的背景中。本轮没有该城堡逐日交接表。':'斯堪尼亚的丹麦王权、城市与海峡城堡分别看；不是按现代瑞典国界判定本年统治。'),'在厄勒海峡东岸、斯堪尼亚西北方向；与西岸丹麦岛屿隔海相望。'),
 detail('ribe','里伯','denmark-late',['nordicChristopherSbl'],['copenhagen','uppsala','oslo'],realm('denmark-late').ruler+'。克里斯托弗的丹麦加冕在1443年里伯；瑞典1441年在乌普萨拉、挪威1442年在奥斯陆，三项仪式不混同。','日德兰西南、北海方向；早期市场遗址、城市与1443年的仪式为不同尺度。'),
 detail('bergen','卑尔根','norway-late',['nordicBergen','nordicHakon','nordicOlav','nordicErik','nordicUnion1450'],['oslo','trondheim','stockholm'],realm('norway-late').ruler+'。布吕根汉萨商人港区在挪威城市内，贸易特权不表示另有一个汉萨国家控制整个挪威。','挪威西岸，布吕根是卑尔根内的港区。现存建筑多经后世火灾重建，不当作本年建筑原貌。',{people:fact('德意志商人、当地商人、渔业和教会人员在港口有不同角色。布吕根的居住、仓储和鱼干贸易证据不构成全国居民祖源比例。','nordicBergen')}),
 detail('oslo','奥斯陆','norway-late',['nordicOslo','nordicChristoffer','nordicHakon'],['bergen','trondheim','copenhagen'],realm('norway-late').ruler+'。本城为中世纪主教驻地；1442年克里斯托弗在此加冕，不是1443丹麦的里伯仪式。','挪威南部峡湾及中世纪城区方向，不把今市中心轮廓当作整个当时城市或统一王都。'),
 detail('trondheim','尼达罗斯（特隆赫姆）','norway-late',['nordicNidaros','nordicOlav','nordicOath1450','nordicChristian'],['oslo','bergen'],realm('norway-late').ruler+'。圣奥拉夫圣地、教会和朝圣角色，与1381拥戴、1450加冕等不同年份的政治仪式分开。','挪威中部海岸的城市；尼达罗斯是历史名称，特隆赫姆是现代通行名，不是两座不同城市。',{nameNote:fact('本段采用尼达罗斯作为历史名称，括注现代特隆赫姆；不将后来建筑形态倒填到中世纪。','nordicNidaros')}),
 detail('stockholm','斯德哥尔摩','sweden-late',['nordicAlbert','nordicStockholm','nordicKarl','nordicChristopherSbl'],['uppsala','kalmar','visby'],stockholm,'波罗的海水道及梅拉伦湖对外方向。商人特许、城市占有、国王头衔是不同层次。'),
 detail('uppsala','乌普萨拉','sweden-late',['nordicUppsala','nordicChristopherSbl'],['stockholm','kalmar'],(y<1435?'本城已是主教座；主教座堂仍有修建过程，1435年祝圣不是教会中心从无到有。':'主教座堂1435年已祝圣；克里斯托弗1441年9月14日在这里获瑞典王冠。')+' 本年瑞典王权：'+realm('sweden-late').ruler,'定位今天乌普萨拉城区，旧名东阿罗斯。13世纪主教座及名称从旧乌普萨拉迁到这里，不把旧乌普萨拉遗址当作本段会场。'),
 detail('kalmar','卡尔马','sweden-late',['nordicKalmar','nordicUnion','nordicCoronation'],['stockholm','copenhagen','oslo'],(y<1397?'1397年的三王国共同加冕尚未发生；本年王权看当前年份，不倒填后来联合仪式。':y===1397?'1397年6月17日埃里克共同加冕，玛格丽特继续治理。文书法律性质有研究分歧，不把三国写成一个已经行政合并的国家。':'1397年共同加冕是过去的事件；本年瑞典与其他王国是否同奉君主须按当前王号分别看。')+' '+realm('sweden-late').ruler,'瑞典东南岸。城堡为谈判地点，加冕在当时城镇教堂；不定位到今天较晚建成的大教堂。',{kind:y===1397?'事件地点':'历史城市'}),
 detail('turku','图尔库（奥布）','sweden-late',['nordicFinland','nordicSwedenList'],['stockholm','uppsala'],'芬兰为瑞典王国东部地域，不是卡尔马联合内第四个独立王国。1362年东部参与选王的地位与1442法律确认，应区别于全境边界或每座城的驻军。','芬兰西南海岸的城市参照，瑞典语地名奥布与芬兰语图尔库指同一城市。本轮未复原王国东部全部边缘。'),
 detail('visby','维斯比','sweden-late',['nordicAlbert','nordicKarl','nordicVisby1361'],['stockholm','kalmar','helsingborg'],gotland,'在波罗的海哥特兰岛上，不位于瑞典大陆。王国阅读核心不包括本岛，点位另说明军事控制。'),
 ];
 if(y>=1389)ds.push(detail('falkoping-late','法尔雪平—奥斯勒会战地域','sweden-late',['nordicFalkoping','nordicAlbert'],['stockholm','kalmar'],'1389年2月24日玛格丽特军获胜，阿尔布雷希特被俘。斯德哥尔摩仍待1398交接；会战胜利不证明本年全国城市同步归服。','法尔雪平东侧奥斯勒附近，用区域点定位；纪念地点不等于已经核定的精确战场边界。',{kind:'事件地点'}));
 return ds;
});
