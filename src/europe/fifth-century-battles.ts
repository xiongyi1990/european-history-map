import type {Battle,BattleStage,Coordinate} from '../greek/battles';
import {courseSources as sources} from './course-sources';
const stage=(title:string,date:string,text:string,stops:[string,Coordinate][],path:Coordinate[],source:keyof typeof sources):BattleStage=>({title,date,text,side:'五世纪战争与地方社会',color:'#ad673d',stops:stops.map(([name,coords])=>({name,coords})),path,source:sources[source].url,sections:'参照城市与战区方向；古代叙事的偏见、数字及具体战场另须考辨'});
const rome:Coordinate=[12.49,41.89],ostia:Coordinate=[12.29,41.76],ravenna:Coordinate=[12.2,44.42],byz:Coordinate=[28.98,41.01],sirmium:Coordinate=[19.62,44.97],aquileia:Coordinate=[13.37,45.77],milan:Coordinate=[9.19,45.46],verona:Coordinate=[10.99,45.44],carthage:Coordinate=[10.32,36.85],orleans:Coordinate=[1.91,47.9],metz:Coordinate=[6.18,49.12],troyes:Coordinate=[4.07,48.3],tournai:Coordinate=[3.39,50.61],soissons:Coordinate=[3.32,49.38];
const caveat='线条只连接史料提及的城市、战区和方向，省略支队、往返及道路；不是逐日行军、精确战场或疆界。城市代表点不能用来推算军队阵形和居民迁徙比例。';
export const fifthBattles:Battle[]=[
 {id:'alaric-410',title:'阿拉里克围逼罗马与410年城破',period:'408—410 年',question:'为什么拉文纳宫廷与罗马城的处境不同？',caveat,stages:[
  stage('围城与海口供应','408—409 年','阿拉里克集团围逼罗马，港口与粮运是压力来源；拉文纳仍是霍诺留宫廷，谈判、围城和军事控制分别看。',[['罗马',rome],['奥斯提亚海口',ostia],['拉文纳宫廷',ravenna]],[ostia,rome],'honorius400'),
  stage('罗马被劫','410 年 8 月','谈判未能稳定局势，阿拉里克军进入罗马并劫掠；这不是西部皇帝在拉文纳同日被废。',[['罗马',rome]],[],'honorius400'),
  stage('城破之后向意大利南部','410 年后段','集团转向意大利南部，渡海计划没有成功，阿拉里克去世。南部标记仅是布鲁提乌姆方向，不确定墓址或完整退路。',[['罗马',rome],['意大利南部（区域参照）',[16.25,39.3]]],[rome,[16.25,39.3]],'jordanes5'),
 ]},
 {id:'attila-gaul-451',title:'阿提拉进入高卢与卡塔劳努姆会战',period:'451 年',question:'匈人、罗马和西哥特为什么在高卢交战？',caveat:caveat+' 会战地点有争论，东高卢城市只作参照，不标一个虚构的确定战阵。',stages:[
  stage('高卢东北方向','451 年春','阿提拉军进入高卢，格雷戈里记述梅斯受袭；城市节点表示战事扩展，不表示所有军队经过同一条路。',[['梅斯',metz]],[],'gregory5'),
  stage('奥尔良与联军接近','451 年','围逼奥尔良后，阿提拉方面与埃提乌斯、西哥特等联军进入会战阶段；联军不是一种族群的军队。',[['梅斯',metz],['奥尔良',orleans]],[metz,orleans],'jordanes5'),
  stage('东高卢会战与撤出','451 年','卡塔劳努姆会战中西哥特狄奥多里克一世战死；会战精确位置有讨论。特鲁瓦只帮助辨认东高卢，不表示战场就在城市点。',[['奥尔良',orleans],['东高卢参照：特鲁瓦',troyes]],[orleans,troyes],'jordanes5'),
 ]},
 {id:'attila-italy-452',title:'阿提拉进入意大利与撤退',period:'452 年',question:'进攻北意大利是否等于已经占领罗马？',caveat,stages:[
  stage('阿奎莱亚方向','452 年','匈人军进入意大利东北，阿奎莱亚遭攻陷；城市点是历史中心定位，不表示围城阵地。',[['阿奎莱亚',aquileia]],[],'jordanes5'),
  stage('波河平原与北部城市','452 年','战事扩展至意大利北部，包括米兰方向。连接线概括两个战区的关系，不是确定的连续行军路线。',[['阿奎莱亚',aquileia],['米兰',milan]],[aquileia,milan],'jordanes5'),
  stage('使节、撤退与未被攻占的罗马','452 年后段','阿提拉接受包括利奥主教在内的使节后撤军；补给、疾病和军政压力也须考虑，不能只按较晚叙事归因为一个人物。罗马点用于对照，未画成军队已经进城。',[['北意大利参照：米兰',milan],['对照：罗马',rome]],[],'jordanes5'),
 ]},
 {id:'vandal-expedition-468',title:'468年罗马远征汪达尔与邦角失败',period:'468 年',question:'地中海上的多路远征为什么没有收复迦太基？',caveat,stages:[
  stage('东方、意大利与埃及多个方向','468 年','东西部组织海陆远征；君士坦丁堡、意大利和埃及提供不同军政联系，不是一支舰队从三地依次出发。',[['东方宫廷：君士坦丁堡',byz],['意大利：拉文纳',ravenna],['埃及方向：亚历山大里亚',[29.92,31.2]]],[],'leo5'),
  stage('主力接近迦太基','468 年','巴西利斯库斯的舰队抵近北非，邦角附近海域成为关键。海线仅表示东方至北非的方向，未复原航路或舰队停泊区。',[['君士坦丁堡',byz],['邦角附近（海域方向）',[10.95,37.05]],['迦太基',carthage]],[byz,[24,35],[15,36],[10.95,37.05]],'procopius5'),
  stage('舰队失败，北非未被收复','468 年','汪达尔方面的攻击使主力远征失败，其他方向的行动也未实现全面收复；北非不能在本年改涂成罗马已稳定控制的国土。',[['迦太基',carthage],['邦角附近',[10.95,37.05]]],[],'leo5'),
 ]},
 {id:'theodoric-489',title:'狄奥多里克从巴尔干进入意大利',period:'488—493 年',question:'东哥特王权为什么最后以拉文纳为中心？',caveat,stages:[
  stage('芝诺安排与向西迁行','488—489 年','狄奥多里克与芝诺交涉后，集团由巴尔干转向意大利，经过西尔米乌姆方向；不把一路经过都视为永久领土。',[['君士坦丁堡',byz],['西尔米乌姆',sirmium]],[byz,sirmium],'zeno5'),
  stage('意大利东北与维罗纳战事','489 年','在进入意大利后的战争中，狄奥多里克与奥多亚克交战，战事涉及东北通道和维罗纳；不将四年战争压成一次瞬间易主。',[['西尔米乌姆',sirmium],['意大利东北参照：阿奎莱亚',aquileia],['维罗纳',verona]],[sirmium,aquileia,verona],'jordanesEnd5'),
  stage('拉文纳长期围城','490—493 年','双方争夺意大利，奥多亚克据守拉文纳。围城期间还有反复战事，493年才出现最终宫廷交接。',[['维罗纳',verona],['拉文纳',ravenna]],[verona,ravenna],'jordanesEnd5'),
  stage('493年交接后的罗马社会','493 年','奥多亚克死亡，狄奥多里克王权成为意大利政治中心；罗马行政、居民和拉丁文化没有随统治家族改变而全部消失。',[['拉文纳',ravenna],['罗马',rome]],[],'jordanesEnd5'),
 ]},
 {id:'soissons-486',title:'克洛维与西阿格里乌斯的北高卢战争',period:'486 年',question:'苏瓦松转折为什么不等于征服整个高卢？',caveat,stages:[
  stage('北高卢两个政治中心','486 年前后','图尔奈帮助定位克洛维王权，苏瓦松定位西阿格里乌斯的罗马军事势力；两点线是政治空间关系，不是已知行军轨迹。',[['图尔奈',tournai],['苏瓦松',soissons]],[tournai,soissons],'gregory5'),
  stage('战争后的北高卢扩张','486 年','克洛维击败西阿格里乌斯后扩大势力；南方西哥特、东南勃艮第仍存在，507年战争在本专题之外。',[['苏瓦松',soissons],['南方对照：图卢兹',[1.44,43.6]]],[],'gregory5'),
 ]},
];
export const fifthBattleYears:Record<string,number>={'alaric-410':410,'attila-gaul-451':451,'attila-italy-452':452,'vandal-expedition-468':468,'theodoric-489':489,'soissons-486':486};
export const fifthBattleEvents:Record<number,string>={410:'alaric-410',451:'attila-gaul-451',452:'attila-italy-452',468:'vandal-expedition-468',486:'soissons-486',488:'theodoric-489',489:'theodoric-489',493:'theodoric-489'};
