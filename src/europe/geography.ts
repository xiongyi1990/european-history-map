import type {Landform} from '../greek/landforms';
import {landforms as greekLandforms} from '../greek/landforms';
import {romanLandforms} from '../roman/data';
const source='https://registry.opendata.aws/terrain-tiles/';
export const europeLandforms:Landform[]=[...romanLandforms,...greekLandforms,
 {id:'scandinavia',name:'斯堪的纳维亚山脉',latin:'SCANDINAVIAN MOUNTAINS',kind:'mountain',coords:[12,64],zoom:5.9,minZoom:3.5,bearing:15,text:'将视线从挪威海岸移向半岛内陆，比较山地与东侧较低的地势。先辨认地形，再阅读两侧地区的联系。',source},
 {id:'carpathians',name:'喀尔巴阡山脉',latin:'CARPATHIANS',kind:'mountain',coords:[24.5,47],zoom:6.7,minZoom:4.8,bearing:15,text:'观察弧形山系与内侧低地的位置。山脉、盆地和周围通道，是在地图上辨认中东欧的一组线索。',source},
 {id:'caucasus',name:'高加索山脉',latin:'CAUCASUS',kind:'mountain',coords:[44.5,42.6],zoom:7,minZoom:4.2,bearing:15,text:'先找到黑海和里海，再观察两海之间的高山带。这里用地形帮助定位，不规定唯一的欧亚洲界。',source},
 {id:'north-plain',name:'欧洲北部平原',latin:'NORTH EUROPEAN PLAIN',kind:'plain',coords:[16,53],zoom:5.5,minZoom:3.6,bearing:0,text:'从低地向南观察高程的变化，再切换历史边界，比较自然地理与政治区划的不同。',source},
 {id:'black-sea',name:'黑 海',latin:'BLACK SEA',kind:'sea',coords:[34,43.2],zoom:5.7,minZoom:3.4,maxZoom:7,bearing:0,text:'从黑海西南方向寻找博斯普鲁斯海峡，再沿马尔马拉海、达达尼尔海峡观察通往爱琴海的水路。',source},
 {id:'baltic-sea',name:'波 罗 的 海',latin:'BALTIC SEA',kind:'sea',coords:[19.5,57.8],zoom:5,minZoom:3.4,maxZoom:6.7,bearing:0,text:'把斯堪的纳维亚半岛与波罗的海南岸放在同一视野中。放大观察海湾、岛屿和海峡的位置。',source},
 {id:'north-sea',name:'北 海',latin:'NORTH SEA',kind:'sea',coords:[3,56.5],zoom:5,minZoom:3.3,maxZoom:6.8,bearing:0,text:'先找到不列颠，再看它与欧洲大陆之间的海域。位置上的分隔与交通上的联系，可以同时存在。',source},
];
export const geographyTours=[
 {id:'alps',title:'山脉如何改变路线？',text:'放大阿尔卑斯山，再接着看汉尼拔的行军专题。'},
 {id:'mediterranean',title:'罗马为什么围绕一片海？',text:'把意大利、北非与东地中海放到同一画面。'},
 {id:'black-sea',title:'海峡连接了什么？',text:'从黑海向西南寻找通往爱琴海的出口。'},
 {id:'north-plain',title:'欧洲的低地在哪里？',text:'观察从山地到北方平原的高程变化。'},
];
