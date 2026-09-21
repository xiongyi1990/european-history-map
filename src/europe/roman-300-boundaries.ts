// Corrections apply only to the 300 snapshot, never to earlier Parthian borders.
export interface BoundaryContext {name:string;membership:string;note:string;places:[string,string][];source:string;reference?:boolean}
const source='https://www.livius.org/articles/concept/tetrarchy/';
export const tetrarchNames=['Rome (Constantinus)','Rome (Maximian)','Rome (Galerius)','Rome (Diocletianus)'];
const common='第一轮四帝共治为 293—305 年：两位正帝与两位副帝共同治理一个罗马帝国。色块是分掌方向的概览，内部线条不是四个独立国家的国界，也不是逐年核实的行政界线。';
export const roman300Boundaries:Record<string,BoundaryContext>={
 'Rome (Constantinus)':{name:'罗马帝国 · 西北分掌区',membership:'罗马帝国 · 君士坦提乌斯一世（副帝）',note:common+' 西北方向联系不列颠、高卢与莱茵边防。原资料的 Constantinus 容易与其子君士坦丁混淆；300 年的副帝是父亲君士坦提乌斯一世。',places:[['trier','特里尔：副帝驻地'],['london','不列颠：伦底尼乌姆'],['lyon','高卢：卢格杜努姆']],source},
 'Rome (Maximian)':{name:'罗马帝国 · 西部分掌区',membership:'罗马帝国 · 马克西米安（正帝）',note:common+' 以意大利为重要中心，并联系西班牙与北非。米兰是宫廷驻地，罗马保有传统地位；驻地不等于所有地域只有一个行政中心。',places:[['milan','米兰：正帝驻地'],['rome','意大利：罗马'],['tarraco','西班牙：塔拉科'],['carthage','北非：迦太基']],source},
 'Rome (Galerius)':{name:'罗马帝国 · 巴尔干分掌区',membership:'罗马帝国 · 伽列里乌斯（副帝）',note:common+' 巴尔干和多瑙河防线是重要活动方向。皇帝会移动驻地；塞萨洛尼基的宫殿不意味着它始终是唯一首都。',places:[['thessaloniki','塞萨洛尼基：宫廷中心'],['athens','希腊：雅典']],source},
 'Rome (Diocletianus)':{name:'罗马帝国 · 东方分掌区',membership:'罗马帝国 · 戴克里先（正帝）',note:common+' 从小亚细亚到叙利亚、埃及均有重要城市。尼科米底亚在今伊兹米特，拜占庭城此时尚未成为君士坦丁堡新都。',places:[['nicomedia','尼科米底亚：正帝驻地'],['antioch','叙利亚：安条克'],['alexandria','埃及：亚历山大里亚'],['nisibis','边防：尼西比斯']],source},
 'Parthian Empire':{name:'波斯地区（旧轮廓待核对）',membership:'300 年应为萨珊帝国；旧轮廓不作其疆界',note:'帕提亚王朝已在 224 年被萨珊王朝取代。原始快照仍写作帕提亚，且轮廓尚未重新核实，因此降为参考层。请通过泰西封查看萨珊帝国，通过尼西比斯了解罗马东方边防。',places:[['ctesiphon','萨珊中心：泰西封'],['nisibis','罗马边城：尼西比斯']],source:'https://www.metmuseum.org/essays/the-sasanian-empire-224-651-a-d',reference:true},
};
