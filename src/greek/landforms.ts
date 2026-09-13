import type {Coordinate} from './battles';
export interface Landform {
  id:string; name:string; latin:string; kind:'mountain'|'plain'|'sea'; coords:Coordinate;
  zoom:number; minZoom:number; maxZoom?:number; bearing:number; text:string; source:string;
}
const terrain='https://registry.opendata.aws/terrain-tiles/';
export const landforms:Landform[]=[
  {id:'taygetos',name:'泰格托斯山脉',latin:'TAYGETOS',kind:'mountain',coords:[22.35,36.96],zoom:9.2,minZoom:5.4,bearing:-24,text:'观察斯巴达西侧的山脊与山谷，再回到城邦地图找斯巴达。地形的高低，比两个城市之间的一条直线包含更多信息。',source:'https://www.visitpeloponnese.com/el/prdct/o-taygetos'},
  {id:'pindus',name:'品都斯山脉',latin:'PINDUS',kind:'mountain',coords:[21.15,39.6],zoom:8.2,minZoom:4.8,bearing:-22,text:'向东看，可以发现起伏的山地逐渐过渡到色萨利低地。两者的反差，是认识希腊大陆地貌的一处入口。',source:'https://visitthessaly.gr/en/suggestions/pineios-delta'},
  {id:'thessaly',name:'色萨利平原',latin:'THESSALIAN PLAIN',kind:'plain',coords:[22.2,39.55],zoom:8,minZoom:5.6,bearing:-15,text:'浅绿色低地铺展在群山之间。绿色用于表示较低的海拔，不是对古代植被、农田范围或土地利用的复原。',source:'https://visitthessaly.gr/en/suggestions/pineios-delta'},
  {id:'penteli',name:'彭特利山',latin:'PENTELIKON',kind:'mountain',coords:[23.875,38.079],zoom:10.2,minZoom:7.5,bearing:-30,text:'山体就在雅典与马拉松之间。旋转视角，看清山脊、山脚与东侧滨海低地；路线折线只是行动方向，不代表穿山的古道。',source:'https://www.thisisathens.org/activities/sports-outdoors/athens-marathon-guide'},
  {id:'marathon-plain',name:'马拉松滨海平原',latin:'MARATHON PLAIN',kind:'plain',coords:[23.982,38.143],zoom:10.3,minZoom:8.6,bearing:18,text:'从海湾向内陆看，低地与背后的山坡形成鲜明对照。现代海岸仅作参照，不能当作前 490 年的精确登陆岸线。',source:'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D6'},
  {id:'kallidromo',name:'卡利德罗莫山',latin:'KALLIDROMO',kind:'mountain',coords:[22.525,38.746],zoom:10.1,minZoom:7.5,bearing:15,text:'温泉关靠近这片山地。现代海岸已向外推进；古代关口“山与海之间”的狭窄关系，需要结合战役说明理解。',source:'https://2500years.culture.gov.gr/en/chapters/i-machi-ton-thermopilon/anopaia-atrapos'},
  {id:'malian',name:'马利亚湾',latin:'MALIAN GULF',kind:'sea',coords:[22.68,38.86],zoom:9.4,minZoom:7.7,bearing:0,text:'海湾与温泉关相邻。这里呈现的是现代地形与水深设色，古代海岸位置仍需单独复原。',source:'https://2500years.culture.gov.gr/en/chapters/i-machi-ton-thermopilon/anopaia-atrapos'},
  {id:'saronic',name:'萨罗尼克湾',latin:'SARONIC GULF',kind:'sea',coords:[23.65,37.77],zoom:8.6,minZoom:6.7,bearing:-20,text:'从海湾望向阿提卡，观察岛屿、半岛和水道。萨拉米斯战役专题可以接着查看舰队接近海峡的方向。',source:'https://visitgreece.gr/inspirations/athens-riviera/'},
  {id:'aegean',name:'爱 琴 海',latin:'AEGEAN SEA',kind:'sea',coords:[25,37.6],zoom:6.6,minZoom:4,maxZoom:7.2,bearing:-15,text:'群岛、海湾与半岛共同构成希腊世界的空间。由浅到深的蓝色表示现代高程数据中的海底深度，不表示古代水深或航行安全。',source:terrain},
  {id:'ionian',name:'伊奥尼亚海',latin:'IONIAN SEA',kind:'sea',coords:[19.3,37.5],zoom:6.5,minZoom:4,maxZoom:7.5,bearing:-10,text:'希腊西岸与意大利之间的水域。西西里远征穿过这片海；图上有方向的航线仍是概括示意。',source:terrain},
];
export function landformPresets(battleId?:string){
  const ids=battleId==='marathon'?['penteli','marathon-plain','saronic']:battleId==='thermopylae'?['kallidromo','thessaly','malian']:battleId==='salamis'?['penteli','marathon-plain','saronic']:['taygetos','thessaly','ionian'];
  return ids.map(id=>landforms.find(p=>p.id===id)!);
}
