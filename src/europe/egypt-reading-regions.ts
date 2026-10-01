import type {Region300} from './roman-300-regions';

// Reading geographies, not a reconstruction of Roman provincial boundaries.
// Political context comes from the parent at the selected year, never from 395 alone.
export function egyptReadingRegions(regions:Region300[],year:number):Region300[]{
 const parent=regions.find(r=>r.id==='egypt');
 if(!parent||year<300||year>500)return regions;
 const common={...parent,parent:'egypt',sources:[...parent.sources,'philaeLate'] as Region300['sources']};
 return [...regions,
  {...common,id:'egypt-delta',name:'下埃及：三角洲与地中海沿岸',mapName:'下埃及 · 北部三角洲',coords:[31,30.8],bounds:[[28.7,29.6],[32.6,31.8]],
   modern:'今埃及北部尼罗河三角洲及相邻地中海沿岸。亚历山大里亚在三角洲西侧海岸，不在上游阿斯旺附近。',
   parts:'“下”指尼罗河下游，所以位置在北。把沿海港口、三角洲和通往南方的河谷分开看；这是阅读地域，不是某一个罗马行省的精确边界。',
   change:parent.change+' 尼罗河总体由南向北流，沿河向南是上溯，向北才是走向河口。',cities:['alexandria']},
  {...common,id:'egypt-upper',name:'上埃及：南部河谷与阿斯旺边区',mapName:'上埃及 · 南部河谷',coords:[32.5,25.9],bounds:[[30.1,23.7],[34.2,28.2]],
   modern:'今埃及中南部尼罗河谷；南端以叙恩（今阿斯旺）和第一瀑布附近定位。菲莱在阿斯旺以南约 7 公里。',
   parts:'“上”指上游，所以位置在南。这里把河谷和阿斯旺边区连成阅读入口；不等于每个时期名为底比斯的行政区，也不包括整个撒哈拉或现代苏丹。',
   people:parent.people+' 菲莱的基督教社群与传统神庙活动曾并存；边防也没有阻断与南方社群的往来。',
   language:parent.language+(year>=394?' 菲莱留有纪年为 394 年的象形文字铭文；一种文字的最后已知记录不能代表全体居民同时更换语言。':''),
   change:'戴克里先时期罗马从更南面的十二舍努地区撤退，边防退至菲莱一带。'+(year>=451?'451／452 年的协议涉及南方社群到菲莱祭祀的通行权；跨境宗教往来不等于领土合并。':'边防线与宗教、人员往来的范围需要分别理解。'),cities:['syene']},
 ];
}
