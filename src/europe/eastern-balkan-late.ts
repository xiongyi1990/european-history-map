import states from './eastern-balkan-late-states.json';
import type {PartitionFrame,PartitionRealm} from './frankish-partitions';
export const easternBalkanReading:PartitionFrame['reading']=[{chapter:206,pages:[1764,1764],note:'本页的巴尔干征服概括需按地方核对；阿尔巴尼亚与摩尔达维亚的城市时序来自独立资料，不是本页逐年记载。'}];
export const easternBalkanState=(year:number)=>states.find(s=>s.year===year);
export function easternBalkanRealms(year:number,moment:string):PartitionRealm[]{
 const s=easternBalkanState(year);if(!s)return [];
 return [{id:'albania-late',name:'阿尔巴尼亚地域：克鲁亚与沿海诸城',ruler:s.albania,status:s.albaniaNote,color:'#b9b6b0',coords:[19.98,41.55],bounds:[[19.35,41.25],[20.3,42.2]],dates:'14世纪地方领主、奥斯曼与威尼斯权力并存；1444结盟不等于建国；当前时点：'+moment.split('，')[0],geography:'亚得里亚海东岸、巴尔干半岛西侧。克鲁亚在山地；都拉斯在其西南海边，莱什在西北，斯库台更靠北。这里只用克鲁亚附近小块定位，三座沿海城另点开比较。',parts:['克鲁亚附近固定阅读核心，不是现代阿尔巴尼亚国界','斯库台、莱什、都拉斯各有不同交接时间，连接城市不表示它们同属克鲁亚','莱什盟会、个人效忠、贡赋和城堡驻军是不同层次'],people:'地方家族、城堡守军、负有特殊义务的家庭、港口商人及教会社群身份不同。不能把斯坎德培的盟友全部视为同一国家公民，也不据城堡归属推断居民祖源。',language:'地方口语、教会、外交与税册的书写语分别研究。本轮税册提供行政类别，尚不足以重建各城家庭语言；人名也不能换算成母语比例。',places:[['kruja','克鲁亚：山城、围攻与驻军'],['durres','都拉斯：安茹、托皮亚与威尼斯'],['shkoder','斯库台：巴尔沙与威尼斯'],['lezhe','莱什：威尼斯城市中的1444盟会']]},
 {id:'moldavia-late',name:'摩尔达维亚：苏恰瓦与锡雷特河地域',ruler:s.moldavia,status:s.moldaviaNote,color:'#b4b995',coords:[26.4,47.7],bounds:[[23.75,45.05],[30.75,50.15]],dates:'14世纪形成的喀尔巴阡山东侧王公领国；1453仍存；当前时点：'+moment.split('，')[0],geography:'喀尔巴阡山东侧、瓦拉几亚东北、波兰王国东南，以苏恰瓦、锡雷特、巴亚三处定位；沿河看霍京与白堡，再比较多瑙河基利亚支汊。历史摩尔达维亚横跨今日罗马尼亚与摩尔多瓦等地域，不能缩成今天的摩尔多瓦共和国。',parts:['仅画苏恰瓦—锡雷特—巴亚的内陆阅读核心，不是公国全部疆域','波兰或匈牙利宗主关系、王公职位和地方贵族权利分开','霍京河堡、白堡河口、基利亚河港与利沃夫贸易端点为块外比较点，各自控制另看'],people:'王公、波雅尔贵族、教士、城市商旅和乡村居民权利不同。现代国名不能倒推中世纪居民国籍；王公的宗主关系也不是人口族属。',language:'地方口语与教会、外交及贸易书写语分开；本图没有核验各城市完整母语分布，不以西里尔字母或宗教归属替代居民身份。',places:[['suceava','苏恰瓦：王廷与城堡'],['siret','锡雷特：河流、城镇与教会'],['baia','巴亚：早期城镇与商贸'],['khotyn','霍京：河堡与地方阵营'],['cetatea-alba','白堡：河口与地方官'],['chilia','基利亚：驻军、税关与定位争论'],['lviv','利沃夫：块外商路端点']]}
 ];
}
