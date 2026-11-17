import states from './south-balkan-late-states.json';
import type {PartitionFrame,PartitionRealm} from './frankish-partitions';
export const southBalkanReading:PartitionFrame['reading']=[{chapter:206,pages:[1759,1761],note:'课程提供君士坦丁堡与米斯特拉的空间线索；1453首都陷落不等于摩里亚当年一并陷落。地方年表另据文书与学术研究。'}];
export const southBalkanState=(year:number)=>states.find(s=>s.year===year);
export function southBalkanRealms(year:number,moment:string):PartitionRealm[]{
 const s=southBalkanState(year);if(!s)return [];
 return [{id:'morea-late',name:'东罗马摩里亚：米斯特拉核心',ruler:s.morea,status:s.moreaNote,color:'#b6a4cc',coords:[22.4,37.15],bounds:[[21.75,36.6],[23.1,37.7]],dates:'1348／1349形成专制君主治理阶段，1460陷落；当前时点：'+moment.split('，')[0],geography:'摩里亚是伯罗奔尼撒半岛的中世纪名称。米斯特拉在半岛东南、泰格特山脉东麓，斯巴达以西；北面的科林斯与帕特雷、西南的莫东另作比较点。',parts:['只画米斯特拉周边固定阅读核心，不是整个伯罗奔尼撒的年度疆界','专制君主是东罗马宫廷称号，不是另一个皇帝或现代意义的独裁者','科林斯地峡、拉丁亚该亚与威尼斯港口分别看；同一家族诸兄弟也有分区'],people:'王族、贵族、主教、修士、商人和手工业者身份不同；教会与作坊遗存说明城市社会，不能由王朝姓氏推断全部居民祖源。',language:'希腊文文化与抄写活动有具体作品依据；作者、文书、教会礼仪与全体居民的口语分布不是同一件事。',places:[['mystras','米斯特拉：1453之后仍存'],['acorinth','科林斯卫城：领有与驻军'],['hexamilion','六英里长墙：地峡与战事'],['patras','帕特雷：城镇与城堡不同步'],['methoni','莫东：威尼斯港口比较'],['koroni','科龙：另一处威尼斯港口']]},
 {id:'wallachia-late',name:'瓦拉几亚：喀尔巴阡山与多瑙河之间',ruler:s.wallachia,status:s.wallachiaNote,color:'#a5b98e',coords:[25.15,44.95],bounds:[[24.15,44.35],[26.15,45.55]],dates:'14世纪形成的王公领国；本段没有以纳贡作为全境灭亡年；当前时点：'+moment.split('，')[0],geography:'喀尔巴阡山南麓、多瑙河以北。阿尔杰什在山麓，特尔戈维什泰在东侧；久尔久位于更南的多瑙河岸。瓦拉几亚不是特兰西瓦尼亚，也不是整个现代罗马尼亚。',parts:['阿尔杰什—特尔戈维什泰中央阅读核心，不是领国全部疆域','多瑙河港口驻军、奥斯曼纳贡和匈牙利王冠的主张另看','多布罗加、塞韦林、奥尔特河以西与摩尔达维亚没有被本核心全部覆盖'],people:'王公、波雅尔贵族、教士、商人与村落居民权利不同。沃伊沃德为统治与军事称号，不是国王或皇帝；政治宗主关系不能当作全体居民民族身份。',language:'中世纪教会斯拉夫语文书与地方口语分开。使用西里尔字母不能据此把全部居民认作斯拉夫人；现代罗马尼亚语行政地名仅作定位。',places:[['curtea-de-arges','库尔泰亚德阿尔杰什：山麓王廷'],['targoviste','特尔戈维什泰：王廷与1403文书'],['giurgiu','久尔久：多瑙河港口与驻军']]}
 ];
}
