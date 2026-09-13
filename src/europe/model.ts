import chineseNames from './chinese-names.json';
import {boundarySnapshots} from '../atlas-data/historical-boundaries';
import {places as greekPlaces,sourceWar} from '../greek/data';
import {romanPlaces,romanPeriods,placeName,placeGroup,groupNames} from '../roman/data';
import {battles} from '../greek/battles';
import {romanBattles} from '../roman/battles';
import type {Coordinate} from '../greek/battles';
import {bronzePlaces,historicalDetail,historySources} from './history-details';
import {coursePlaces} from './course-details';

export const EMPTY:GeoJSON.FeatureCollection={type:'FeatureCollection',features:[]};
export const BOUNDS=[-25,24,55,72] as const;
export const HISTORY_SOURCE='https://github.com/aourednik/historical-basemaps';
export const MODERN_SOURCE='https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/';
export const yearLabel=(y:number)=>`${y<0?'公元前':'公元'} ${Math.abs(y)} 年`;
export function parseYear(raw:string):number|undefined {
 const s=raw.trim().replace(/\s/g,'');
 const match=s.match(/^(公元前|前|BCE?|公元|AD|CE)?(-?\d{1,5})(年|BCE?|AD|CE)?$/i);
 if(!match)return;
 let n=Number(match[2]);if(/前|BC/i.test((match[1]??'')+(match[3]??'')))n=-Math.abs(n);
 return Number.isInteger(n)&&n!==0&&n>=-50000&&n<=2026?n:undefined;
}
export function snapshotFor(year:number){
 if(year<boundarySnapshots[0].year||year>boundarySnapshots[boundarySnapshots.length-1].year)return;
 return boundarySnapshots.reduce((best,p)=>Math.abs(p.year-year)<Math.abs(best.year-year)?p:best);
}
export const eras=[
 {year:-1500,title:'克里特与早期迈锡尼',hint:'区分宫殿中心、考古文化与政治疆界。'},
 {year:-1300,title:'迈锡尼宫殿与书写',hint:'比较大陆宫殿中心与克里特的书写证据。'},
 {year:-431,title:'伯罗奔尼撒战争开端',hint:'城邦、领土与盟友关系分别查看。'},
 {year:-500,title:'城邦与波斯',hint:'从爱琴海两岸开始，看城市、海峡与大帝国的尺度。'},
 {year:100,title:'罗马的地中海',hint:'先找到意大利，再看罗马的范围如何环绕地中海。'},
 {year:400,title:'东、西部罗马',hint:'比较意大利与海峡两侧的位置，区分城市和帝国。'},
 {year:800,title:'中世纪的格局',hint:'从西欧、东地中海和南岸三个方向观察政治格局。'},
 {year:1492,title:'走向大西洋',hint:'把目光移向伊比利亚西岸，再回看地中海。'},
 {year:1815,title:'十九世纪欧洲',hint:'观察中欧密集的政治单位，不把今天的国界带入过去。'},
 {year:1914,title:'大战前的欧洲',hint:'先辨认欧洲主要政权；此概览不表示年内每一次边界变化。'},
];
const names:Record<string,string>={ 'Bosporian Kingdom':'博斯普鲁斯王国',
 'Roman Empire':'罗马帝国','Western Roman Empire':'西罗马帝国','Eastern Roman Empire':'东罗马帝国','Byzantine Empire':'拜占庭帝国','Rome':'罗马','Carthaginian Empire':'迦太基','Achaemenid Empire':'阿契美尼德帝国','Parthian Empire':'帕提亚帝国','Persi':'波斯（原资料名称）','Carolingian Empire':'加洛林帝国','Holy Roman Empire':'神圣罗马帝国','Ottoman Empire':'奥斯曼帝国','Russian Empire':'俄罗斯帝国','Austrian Empire':'奥地利帝国','Austro-Hungarian Empire':'奥匈帝国','German Empire':'德意志帝国','Hunnic Empire':'匈人帝国','Abbasid Caliphate':'阿拔斯哈里发国','Emirate of Córdoba':'科尔多瓦埃米尔国','Papal States':'教皇国','Prussia':'普鲁士','Bavaria':'巴伐利亚','Saxony':'萨克森','Kingdom of Sardinia':'撒丁王国','Kingdom of the Two Sicilies':'两西西里王国','Kingdom of Naples':'那不勒斯王国','Kingdom of Sicily':'西西里王国','France':'法国','England':'英格兰','Scotland':'苏格兰','Scottland':'苏格兰','Spain':'西班牙','Portugal':'葡萄牙','Castille':'卡斯蒂利亚','Aragón':'阿拉贡','Navarre':'纳瓦拉','Venice':'威尼斯','Denmark-Norway':'丹麦—挪威','Sweden–Norway':'瑞典—挪威','Denmark':'丹麦','Norway':'挪威','Sweden':'瑞典','Finland':'芬兰','Russia':'俄罗斯','Poland':'波兰','Poland-Lithuania':'波兰—立陶宛','Grand Duchy of Moscow':'莫斯科大公国','Imperial Hungary':'匈牙利王国','Hungary':'匈牙利','Armenia':'亚美尼亚','Dacia':'达契亚','Meroe':'麦罗埃','Saka Kingdom':'塞种王国','Nabatean Kingdom':'纳巴泰王国','Himyarite Kingdom':'希木叶尔王国','Kushan Empire':'贵霜帝国','Gupta Empire':'笈多帝国','United Kingdom':'英国','United Kingdom of Great Britain and Ireland':'大不列颠及爱尔兰联合王国','United Kingdom of Netherlands':'尼德兰联合王国','Netherlands':'荷兰','Belgium':'比利时','Switzerland':'瑞士','Swiss Confederation':'瑞士邦联','Germany':'德国','Italy':'意大利','Austria':'奥地利','Greece':'希腊','Turkey':'土耳其','Persia':'波斯','Iran':'伊朗','Serbia':'塞尔维亚','Romania':'罗马尼亚','Bulgaria':'保加利亚','Albania':'阿尔巴尼亚','Montenegro':'黑山','Luxembourg':'卢森堡','Georgia':'格鲁吉亚','Cyprus':'塞浦路斯','Egypt':'埃及','Morocco':'摩洛哥','Tunisia':'突尼斯','Algeria':'阿尔及利亚','Syria':'叙利亚','Iraq':'伊拉克','Ireland':'爱尔兰','Iceland':'冰岛','Wessex':'威塞克斯','Mercia':'麦西亚','Kent':'肯特','Essex':'埃塞克斯','Nothumbria':'诺森布里亚','Asturias':'阿斯图里亚斯','Golden Horde':'金帐汗国','Teutonic Knights':'条顿骑士团','Mamluke Sultanate':'马穆鲁克苏丹国','Soviet Union':'苏联',
 'Greek city-states':'希腊城邦（合并区域）','Saami':'萨米人区域','Sámi':'萨米人区域','Franks':'法兰克人区域','Visigoths':'西哥特人区域','Alamans':'阿勒曼尼人区域','Burgunds':'勃艮第人区域','Etrurians':'伊特鲁里亚人区域','Illyrians':'伊利里亚人区域','Slavic tribes':'斯拉夫部落区域','Slavonic tribes':'斯拉夫部落区域','Baltic tribes':'波罗的海部落区域','Finno-Ugric taiga hunter-gatherers':'芬兰—乌戈尔森林狩猎采集区域','Paleo-Siberian hunter-gatherers':'古西伯利亚狩猎采集区域','Arctic marine mammal hunters':'北极海兽狩猎区域','Saharan Pastoral Nomads':'撒哈拉游牧区域','Alans':'阿兰人区域','Scythians':'斯基泰人区域','Guanches':'关切人区域','Blemmyes':'布莱米人区域',
};
const nonPolities=new Set(['Greek city-states','Saami','Sámi','Franks','Visigoths','Alamans','Burgunds','Etrurians','Illyrians','Slavic tribes','Slavonic tribes','Baltic tribes','Finno-Ugric taiga hunter-gatherers','Paleo-Siberian hunter-gatherers','Arctic marine mammal hunters','Saharan Pastoral Nomads','Alans','Scythians','Guanches','Blemmyes']);
export function classify(name:string):'polity'|'reference'{return !nonPolities.has(name)&&(!!names[name]||/Empire|Kingdom|Caliphate|Sultanate|Emirate|Republic|Duchy/.test(name))?'polity':'reference'}
export const translate=(name:string)=>names[name.trim()]??(chineseNames as Record<string,string>)[name.trim()]??(name.trim()==='?'||/^\d*$/.test(name.trim())?'未命名区域':name);
const palette=['#e9ba78','#8fc6bb','#c6adc9','#92b2d3','#d9a193','#bfc38c','#dcb47b','#a1c8ce'];
export function colorFor(name:string){return palette[[...name].reduce((v,c)=>(v*31+c.charCodeAt(0))>>>0,0)%palette.length]}
type AreaGeometry=GeoJSON.Polygon|GeoJSON.MultiPolygon;
export interface Area {id:string;name:string;original:string;subject:string;kind:'polity'|'reference';color:string;coords:Coordinate;bounds:[Coordinate,Coordinate];feature:GeoJSON.Feature<AreaGeometry>;source:string}
function rings(g:AreaGeometry){return g.type==='Polygon'?[g.coordinates[0]]:g.coordinates.map(p=>p[0])}
export function areaLocation(g:AreaGeometry):{coords:Coordinate;bounds:[Coordinate,Coordinate]}|undefined {
 // Prefer a substantial polygon intersecting the atlas; overseas pieces do not move France away from Europe.
 const candidates=rings(g).map(r=>{const xs=r.map(p=>p[0]),ys=r.map(p=>p[1]);const x0=Math.max(-25,Math.min(...xs)),x1=Math.min(55,Math.max(...xs)),y0=Math.max(24,Math.min(...ys)),y1=Math.min(72,Math.max(...ys));return {r,x0,x1,y0,y1,score:Math.max(0,x1-x0)*Math.max(0,y1-y0)}}).filter(c=>c.score>0).sort((a,b)=>b.score-a.score);
 const c=candidates[0];if(!c)return;
 let best:{width:number;coords:Coordinate}|undefined;
 for(const ratio of [.5,.35,.65,.2,.8]){const y=c.y0+(c.y1-c.y0)*ratio;const xs:number[]=[];
  for(let i=0,j=c.r.length-1;i<c.r.length;j=i++){const a=c.r[j],b=c.r[i];if((a[1]>y)!==(b[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}
  xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2){const left=Math.max(xs[i],c.x0),right=Math.min(xs[i+1],c.x1),width=right-left;if(width>0&&(!best||width>best.width))best={width,coords:[(left+right)/2,y]};}
 }
 return {coords:best?.coords??[(c.x0+c.x1)/2,(c.y0+c.y1)/2],bounds:[[c.x0,c.y0],[c.x1,c.y1]]};
}
export function makeAreas(fc:GeoJSON.FeatureCollection,modern=false):Area[]{
 return fc.features.flatMap((f,i)=>{
  if(f.geometry.type!=='Polygon'&&f.geometry.type!=='MultiPolygon')return [];
  const location=areaLocation(f.geometry);if(!location)return [];
  const p=f.properties??{}, original=String(modern?p.ADMIN:p.name),subject=String(modern?p.ADMIN:p.subject??p.name);
  const id=`${modern?'modern':'history'}:${i}`,kind=modern?'polity':classify(subject);
  const name=modern?String(p.NAME_ZH||p.NAME||original):translate(original),color=kind==='polity'?colorFor(subject):'#9ca9a4';
  return [{id,name,original,subject,kind,color,...location,feature:{...f,properties:{...p,atlasId:id,atlasColor:color}} as GeoJSON.Feature<AreaGeometry>,source:modern?MODERN_SOURCE:HISTORY_SOURCE}];
 });
}
export interface GazetteerPlace {id:string;name:string;modern:string;aliases:string[];coords:Coordinate;description:string;source:string;kind:string;viewBounds?:[Coordinate,Coordinate]}
export const geographicPlaces:GazetteerPlace[]=[{id:'north-africa',name:'北非',modern:'非洲北部 · 地中海南岸',aliases:['North Africa','Northern Africa','非洲北部','北部非洲'],coords:[10,31],viewBounds:[[-17,24],[36,38]],kind:'地理区域',description:'北非就在地中海的南岸，与西班牙、意大利、希腊隔海相望。读欧洲史时，可先从西向东找到摩洛哥、阿尔及利亚、突尼斯、利比亚、埃及：迦太基在今天突尼斯附近，亚历山大里亚在埃及。北非不是一个国家，也不是单一人群。不同书籍使用的范围有差异，联合国统计分区还包括苏丹和西撒哈拉；本地图镜头聚焦地中海南岸，不是北非的严格边界。',source:'https://digitallibrary.un.org/record/4025087/files/1386802EN.pdf'}];
const merged=new Map<string,GazetteerPlace>();
for(const p of greekPlaces)merged.set(p.id,{...p,aliases:[p.latin,...p.aliases],kind:'古代地点参考'});
for(const p of romanPlaces){const prior=merged.get(p.id);merged.set(p.id,{...p,aliases:[p.latin,...(prior?.aliases??[]),...(p.id==='byzantium'?['君士坦丁堡','Constantinople','Istanbul','拜占庭']:[])],kind:'古代地点参考'});}
export const ancientPlaces=[...merged.values(),...bronzePlaces,...coursePlaces];
export function modernPlaces(fc:GeoJSON.FeatureCollection):GazetteerPlace[]{
 return fc.features.flatMap((f,i)=>{
  if(f.geometry.type!=='Point')return [];const [x,y]=f.geometry.coordinates;
  if(x<BOUNDS[0]||x>BOUNDS[2]||y<BOUNDS[1]||y>BOUNDS[3])return [];
  const p=f.properties??{};if(Number(p.SCALERANK)>4)return [];
  return [{id:`ne:${i}`,name:String(p.NAME_ZH||p.NAME),modern:translate(String(p.ADM0NAME)),aliases:[String(p.NAME),String(p.NAMEASCII??'')],coords:[x,y] as Coordinate,description:'现代城市参考位置。此标记用于古今定位，不表示它在所选历史年份已经建城，或使用相同名称。',source:'https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-populated-places/',kind:'现代地点参考'}];
 });
}
export function placeContext(id:string,year:number){
 const detail=historicalDetail(id,year);if(detail)return {title:detail.title,text:detail.polity.text,source:detail.polity.sources[0]?historySources[detail.polity.sources[0]].url:HISTORY_SOURCE};
 const rp=romanPlaces.find(p=>p.id===id),period=({[-218]:'punic',[117]:'trajan',[395]:'division'} as const)[year as -218|117|395];
 if(rp&&period){const group=placeGroup(rp,period);if(group)return {title:placeName(rp,period),text:groupNames[group]+ '。'+(period==='punic'?rp.punicNote??'':period==='division'?rp.lateNote??'':''),source:romanPeriods.find(p=>p.id===period)!.source};}
 const gp=greekPlaces.find(p=>p.id===id);if(gp&&year===-431)return {title:gp.name,text:gp.relation,source:sourceWar};
 return undefined;
}
export function placeLabel(place:GazetteerPlace,year:number,modern=false){
 return modern?(place.modern.includes(' · ')?place.modern.split(' · ').pop()!:place.name):placeContext(place.id,year)?.title??place.name;
}
export const allBattles=[...battles,...romanBattles];
export const battleYears:Record<string,number>={marathon:-490,thermopylae:-480,salamis:-480,sicily:-415,hannibal:-218,'caesar-civil-war':-49,actium:-31};
