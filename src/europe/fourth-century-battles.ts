import type {Battle,BattleStage,Coordinate} from '../greek/battles';
import {fourthCenturySources as sources} from './fourth-century-sources';
const stage=(title:string,date:string,side:string,text:string,stops:[string,Coordinate][],path:Coordinate[],source:keyof typeof sources):BattleStage=>({title,date,side,text,stops:stops.map(([name,coords])=>({name,coords})),path,source:sources[source].url,sections:'据史料概括关键地点；连接线为阅读示意',color:'#ad673d'});
const trier:Coordinate=[6.64,49.75],turin:Coordinate=[7.68,45.07],verona:Coordinate=[10.99,45.44],rome:Coordinate=[12.467,41.936],adrian:Coordinate=[26.56,41.68],byz:Coordinate=[28.98,41.01],chrys:Coordinate=[29.015,41.026],saverne:Coordinate=[7.36,48.74],strasbourg:Coordinate=[7.75,48.58],antioch:Coordinate=[36.16,36.2],carrhae:Coordinate=[39.03,36.86],circesium:Coordinate=[40.43,35.13],ctesiphon:Coordinate=[44.58,33.09],nisibis:Coordinate=[41.22,37.07],edessa:Coordinate=[38.79,37.16];
const caveat='线条概括已知地点之间的方向与先后关系，省略中间行军、支队和往返；不是复原的古道、精确战场或当年国界。';
export const fourthBattles:Battle[]=[
 {id:'milvian-312',title:'君士坦丁进军意大利与米尔维安桥',period:'312 年',question:'从高卢进入意大利，为什么最后在罗马城北决战？',caveat,stages:[
  stage('从高卢越过阿尔卑斯方向','312 年 · 进军','君士坦丁军','从高卢基地南下进入意大利，在都灵附近作战。路线只表示越山方向，未确定每一处山口与停驻。',[['特里尔',trier],['都灵',turin]],[trier,[6.5,46.1],turin],'constantine4'),
  stage('意大利北部战事','312 年 · 北部','君士坦丁军','北部的战事包括维罗纳；地方城市、道路和补给支持进一步南进。',[['都灵',turin],['维罗纳',verona]],[turin,[9.19,45.46],verona],'constantine4'),
  stage('罗马城北决战','312 年 10 月','君士坦丁与马克森提乌斯','米尔维安桥附近决战，马克森提乌斯败亡。标记是桥址周边定位，不画军队阵形。',[['维罗纳',verona],['米尔维安桥附近',rome]],[verona,[11.35,44.49],[12.39,43.11],rome],'constantine4'),
 ]},
 {id:'licinius-324',title:'君士坦丁与李锡尼的海峡战争',period:'324 年',question:'海峡两岸如何决定罗马帝国的统一？',caveat,stages:[
  stage('阿德里安堡附近交战','324 年 · 色雷斯','两位罗马皇帝','君士坦丁与李锡尼在色雷斯交战；此处是 324 年的内战，不是 378 年的哥特战争。',[['阿德里安堡',adrian]],[],'constantine4'),
  stage('战事转向海峡','324 年 · 海陆联系','罗马双方军队与舰队','拜占庭城和海峡控制成为关键。连接线展示战区相对位置，不表示全部舰队航迹。',[['阿德里安堡',adrian],['拜占庭城',byz]],[adrian,byz],'constantine4'),
  stage('克里索波利斯决战','324 年 · 亚洲岸','君士坦丁与李锡尼','李锡尼在亚洲岸败北，君士坦丁成为唯一皇帝。两岸短线只用于理解位置。',[['拜占庭城',byz],['克里索波利斯（今于斯屈达尔）',chrys]],[byz,chrys],'constantine4'),
 ]},
 {id:'strasbourg-357',title:'尤利安与斯特拉斯堡战役',period:'357 年',question:'莱茵防线为什么需要从高卢腹地恢复？',caveat,stages:[
  stage('从萨韦尔讷方向接近','357 年 · 进军','尤利安军','阿米阿努斯记述军队从 Tres Tabernae 一带接近阿勒曼尼联军。用萨韦尔讷—斯特拉斯堡展示尺度。',[['萨韦尔讷',saverne],['斯特拉斯堡附近',strasbourg]],[saverne,strasbourg],'ammianus16'),
  stage('莱茵西侧交战','357 年 · 会战','罗马与阿勒曼尼联军','罗马军取胜；具体战场范围仍有讨论，城市代表点不等于阵地坐标。',[['斯特拉斯堡附近',strasbourg]],[],'ammianus16'),
 ]},
 {id:'persian-363',title:'尤利安波斯远征与尼西比斯易手',period:'363 年',question:'抵近敌方宫廷，为什么最终却要割让边城？',caveat:caveat+' 退路存在考证问题，不绘制猜测性的尤利安死亡地点。',stages:[
  stage('安条克出发','363 年 · 春','尤利安军','罗马主力从安条克出发，经过卡雷一带向幼发拉底河方向推进。',[['安条克',antioch],['卡雷',carrhae],['基尔凯西翁',circesium]],[antioch,carrhae,circesium],'julian4'),
  stage('沿两河方向抵近泰西封','363 年 · 春末','尤利安军','沿幼发拉底河及运河地带推进，来到泰西封附近，未攻占城市。折线是区域概括，不复原已经改变的古河道。',[['基尔凯西翁',circesium],['泰西封',ctesiphon]],[circesium,[42.5,33.6],[43.5,33.2],ctesiphon],'ammianus24'),
  stage('撤退与换帝','363 年 · 夏','罗马远征军','军队撤退，尤利安负伤死亡，约维安继位。本阶段不将未核实的退路画成一条确定行军线。',[['两河战区参照：泰西封',ctesiphon]],[],'ammianus25'),
  stage('和议改变边界与居民生活','363 年 · 和议之后','尼西比斯居民与边境城市','罗马交出尼西比斯，原居民迁出；部分人前往埃德萨。这条线表示两座相关城市，不是罗马军撤退路线。',[['尼西比斯',nisibis],['埃德萨',edessa]],[nisibis,edessa],'edessa4'),
 ]},
 {id:'gothic-378',title:'哥特渡河、阿德里安堡与安置',period:'376—382 年',question:'入境、战争与定居如何改变巴尔干？',caveat:caveat+' 渡河点为多瑙河下游示意；不代表全体哥特人的唯一迁徙路线。',stages:[
  stage('部分群体渡入帝国','376 年 · 多瑙河下游','哥特群体及家属','部分群体获准渡河，供应与管理问题使局势恶化。两点只标示河北与河南方向。',[['多瑙河北侧（示意）',[27.3,44.5]],['南侧接纳地区（示意）',[27.3,43.6]]],[[27.3,44.5],[27.3,43.6]],'ammianus31'),
  stage('冲突扩展到色雷斯','376—378 年','哥特武装与罗马军队','战事扩展至巴尔干。连接线展示下游接触区与阿德里安堡的位置关系，不是某一军团连续行军。',[['多瑙河下游（示意）',[27.3,43.6]],['阿德里安堡',adrian]],[[27.3,43.6],adrian],'ammianus31'),
  stage('瓦伦斯战败身亡','378 年 8 月','双方会战','阿德里安堡附近会战中，瓦伦斯败亡；随后哥特军队未取得君士坦丁堡。',[['阿德里安堡',adrian],['君士坦丁堡',byz]],[],'ammianus31'),
  stage('安置而非建立独立王国','382 年','狄奥多西与哥特集团','达成安置协议；完整条款及精确安置区不能确定，因此只保留巴尔干的城市参照。',[['阿德里安堡',adrian],['塞萨洛尼基',[22.95,40.63]]],[],'theodosius4'),
 ]},
];
export const fourthBattleYears:Record<string,number>={'milvian-312':312,'licinius-324':324,'strasbourg-357':357,'persian-363':363,'gothic-378':378};
