import geometry from './administration-395-geometry.json';
import type {Coordinate} from '../greek/battles';
export const administration395Source='https://commons.wikimedia.org/wiki/File:Roman_empire_395.jpg';
export const administration395Limit='据 Shepherd 1923 年图集重绘的约 395 年行政大区示意。线条为概略走向，海岸采用现代陆地；不代表逐省精确疆界或居民分布。南部尼罗河谷补至阿斯旺—菲莱附近，河谷宽度和沙漠边缘仍为示意。';
export interface Administration395 {
 id:string;name:string;side:'west'|'east';color:string;coords:Coordinate;bounds:[Coordinate,Coordinate];
 geography:string;parts:string;note:string;regions:[string,string][];cities:[string,string][];
}
export const administrations395:Administration395[]=[
 {id:'gaul',name:'高卢行政大区',side:'west',color:'#c19235',coords:[0.5,46.3],bounds:[[-10,34],[9,56]],
  geography:'横跨不列颠、欧洲大陆西部、伊比利亚半岛和直布罗陀海峡南岸的一小部分。名称中的“高卢”比单独的高卢地域大得多。',
  parts:'原图把不列颠、西班牙和高卢分区列在这个大区下；西班牙分区还包括海峡南岸的廷吉塔纳。它并非只有今天的法国，也不是一个高卢国家。',
  note:'这里沿用图集的概括分组；高卢南部的七省区等更细行政区划不能由这四种颜色直接读出。北不列颠、爱尔兰未因此纳入罗马。',
  regions:[['britain','不列颠'],['gaul','高卢'],['hispania','西班牙诸行省'],['mauretania','毛里塔尼亚：海峡南岸对照']],cities:[['trier','特里尔'],['london','伦底尼乌姆'],['tarraco','塔拉科']]},
 {id:'italy',name:'意大利行政大区',side:'west',color:'#338e9c',coords:[11.5,44.5],bounds:[[-3,29],[21,49.5]],
  geography:'从阿尔卑斯山、多瑙河部分边区，经意大利与岛屿，延伸到北非海岸。地中海把它的多个部分连接起来。',
  parts:'原图列出意大利、罗马城周围地区及阿非利加三个分区组；北部涉及雷提亚、诺里库姆、潘诺尼亚与达尔马提亚，南部包括西西里、撒丁、科西嘉和北非。',
  note:'“阿非利加”不是整个非洲大陆。迦太基与的黎波里方向在西部，昔兰尼加与埃及在东方。巴尔干内部行政边缘是概略分线。',
  regions:[['italy','意大利'],['islands','西地中海岛屿'],['alps','阿尔卑斯山地'],['pannonia','潘诺尼亚与达尔马提亚'],['africa','迦太基与阿非利加'],['libya','的黎波里与昔兰尼加：东西分界']],cities:[['milan','米兰'],['rome','罗马'],['salona','萨洛纳'],['carthage','迦太基']]},
 {id:'illyricum',name:'伊利里库姆行政大区',side:'east',color:'#759444',coords:[21.7,39.7],bounds:[[18,34],[27,45]],
  geography:'位于巴尔干半岛中南部，包括希腊大陆及克里特方向。它既不是整个巴尔干，也不是今天某一个国家。',
  parts:'原图列出马其顿、达契亚两个分区。这里的达契亚在多瑙河南岸，不能画成今天罗马尼亚或已经放弃的河北旧行省。',
  note:'395 年后东西朝廷对伊利里库姆的权利存在争执；此色块表达图集的行政分组，不表示阿拉里克活动期间每一座城市都一直受同一军队控制。',
  regions:[['greece','马其顿与阿该亚'],['crete','克里特'],['thrace','多瑙河南岸地域对照']],cities:[['thessaloniki','塞萨洛尼基'],['athens','雅典'],['serdica','塞尔迪卡'],['gortyn','戈尔廷']]},
 {id:'east',name:'东方行政大区',side:'east',color:'#bd7086',coords:[32.3,38.5],bounds:[[19,23.7],[42,46]],
  geography:'包含色雷斯、小亚细亚、东地中海沿岸，以及埃及和昔兰尼加。大区跨越今天欧洲、亚洲、非洲三洲。',
  parts:'原图列出色雷斯、亚细亚、本都、东方和埃及五个分区。“东方分区”只是“东方行政大区”内部的一部分；君士坦丁堡有特殊的首都行政地位。',
  note:'尼西比斯已于 363 年转属萨珊，不能因位于上两河地区就涂回罗马。沿尼罗河向南可定位到阿斯旺—菲莱边区；不要沿用现代埃及与苏丹的国界。',
  regions:[['thrace','色雷斯'],['asia','亚细亚'],['pontus','本都与卡帕多基亚'],['levant','叙利亚与巴勒斯坦'],['arabia','阿拉伯行省'],['mesopotamia','两河边防'],['egypt','埃及总览'],['egypt-delta','下埃及：北部三角洲'],['egypt-upper','上埃及：南部河谷'],['libya','昔兰尼加：与西部对照'],['cyprus','塞浦路斯']],cities:[['byzantium','君士坦丁堡'],['antioch','安条克'],['alexandria','亚历山大里亚'],['edessa','埃德萨'],['syene','叙恩（阿斯旺）']]},
];
export const administration395ById=(id:string)=>administrations395.find(a=>a.id===id);
export function administration395Areas(year:number):GeoJSON.FeatureCollection {
 if(year!==395)return {type:'FeatureCollection',features:[]};
 return {type:'FeatureCollection',features:geometry.features.map(f=>{const a=administration395ById(f.properties.id)!;return {...f,properties:{...f.properties,name:a.name,atlasId:'admin395:'+a.id,atlasColor:a.color,schematic:true}}})} as GeoJSON.FeatureCollection;
}
