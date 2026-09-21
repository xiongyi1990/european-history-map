import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {ReadingGuide} from './LateAntiquityGuide';
import {courseSources} from './course-sources';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
export const roman300Places:GazetteerPlace[]=[
 {id:'ctesiphon',name:'泰西封',modern:'伊拉克 · 巴格达以南萨勒曼帕克附近',aliases:['Ctesiphon','忒西封','萨珊','Sasanian'],coords:[44.58,33.09],kind:'历史地点参考',source:courseSources.sasanian300.url,description:'底格里斯河畔的萨珊王朝重要宫廷中心。采用遗址附近的约略定位点，不代表城市群或帝国疆域的范围。'},
 {id:'nisibis',name:'尼西比斯',modern:'土耳其 · 努赛宾（叙利亚边境）',aliases:['Nisibis','Nusaybin','努赛宾','尼西比'],coords:[41.22,37.07],kind:'历史地点参考',source:courseSources.nisibis300.url,description:'上美索不达米亚的边防与贸易城市，罗马和萨珊之间多次易手；须结合年份阅读。坐标为现代城市代表点。'},
];
const entry=(placeId:string,title:string,region:string,territory:string,nameNote:string,source:Source,related:string[]):HistoricalDetail=>({
 id:`${placeId}-300`,placeId,title,from:300,to:300,focusYear:300,period:'公元 300 年 · 第一轮四帝共治',kind:'历史城市',
 polity:fact(`罗马帝国的${region}。此时处于四帝共治，不是 395 年以后的东西部朝廷格局。`,'tetrarchy300',source),
 territory:fact(territory,source),
 people:fact('当地居民、罗马公民、军人和往来商人可能具有不同地域背景；罗马政治身份与地方文化并存。本条不提供未经核实的族群人数或比例。','provinces300'),
 language:fact('行政与书面文化、家庭日常语言需要分别理解。本条尚无公元 300 年该城语言比例的可靠统计，不能从皇帝或政权名称推断全城居民语言。'),
 nameNote:fact(nameNote,source),reading:[{chapter:98,pages:[792,798],note:'结合四帝共治的空间背景阅读；地域解释据公开资料独立整理。'}],related,
});
export const roman300Details:HistoricalDetail[]=[
 entry('london','伦底尼乌姆','不列颠城市','在泰晤士河畔、英吉利海峡北侧。不列颠的罗马统治区并不覆盖今天整个英国；这里是城市定位，不是全岛疆界。','古名 Londinium，对应今天伦敦。','britain300',['york','trier']),
 entry('york','埃博拉库姆','不列颠北部军政城市','位于今英格兰北部，从伦敦北上可找到这里，再向北才是哈德良长城方向。约克城不是不列颠整条北部边界。','Eboracum 对应今天约克；306 年君士坦丁在此被拥立发生在本时点之后。','britain300',['london','trier']),
 entry('lyon','卢格杜努姆','高卢城市','位于罗讷河与索恩河交汇处。把内陆的里昂与更东北、靠近莱茵方向的特里尔分开，有助于理解地方中心与皇帝驻地的区别。','Lugdunum 对应今天法国里昂；早期高卢中心的地位不能直接等同于 300 年的皇帝驻地。','lugdunum300',['trier','milan']),
 entry('tarraco','塔拉科','西班牙地区城市','伊比利亚半岛东北部的地中海沿岸，与意大利、北非隔海相连。“西班牙诸行省”是罗马时期的地域概念，不等于今天西班牙的国界。','Tarraco 对应今天西班牙塔拉戈纳；不能把不同时期塔拉科所辖行省当作固定边界。','tarraco300',['milan','carthage']),
 entry('lepcis','大莱普提斯','北非沿海城市','在今利比亚西部沿海、迦太基以东。北非并非只有迦太基一个城市，沿海城市与撒哈拉内陆也不是同一地理环境。','Leptis Magna 位于今天胡姆斯附近，不是黎凡特地区同名的霍姆斯。','provinces300',['carthage','alexandria']),
 entry('syracuse','叙拉古','西西里岛城市','在西西里岛东南部。向北是意大利半岛，向南横跨地中海可以联系北非；岛屿是理解罗马海上联系的重要参照。','Syracusae 对应今天锡拉库萨；300 年已不是古希腊时代的独立叙拉古政权。','provinces300',['rome','carthage']),
 entry('athens','雅典','希腊地区城市','位于阿提卡半岛，在塞萨洛尼基以南、爱琴海西侧。雅典的古典城邦历史不意味着公元 300 年仍是独立国家。','同一座雅典城经历了城邦时代和罗马统治；城市延续与主权独立是两回事。','provinces300',['thessaloniki','byzantium']),
 entry('byzantium','拜占庭城','海峡城市','位于博斯普鲁斯海峡的欧洲岸；尼科米底亚则位于马尔马拉海东端。两座城市不是同一个地方。','300 年称拜占庭城；330 年才成为君士坦丁堡新都。现代对应伊斯坦布尔。','byzantine',['nicomedia','thessaloniki']),
 {...entry('nisibis','尼西比斯','美索不达米亚边防城市','三世纪末罗马与萨珊的和约之后，尼西比斯处于罗马一方，是双方官方贸易与交往的重要通道。不要提前套用 363 年归于萨珊之后的版图。','古名 Nisibis，对应今天土耳其努赛宾。今天土叙国境不能直接充当古代罗马—萨珊边界。','nisibis300',['antioch','ctesiphon']),kind:'历史城市'},
 {id:'ctesiphon-300',placeId:'ctesiphon',title:'泰西封',from:300,to:300,focusYear:300,period:'公元 300 年 · 萨珊帝国（224—651）',kind:'宫廷驻地',
  polity:fact('萨珊帝国的重要宫廷中心。帕提亚王朝已在 224 年被取代，不能仍把 300 年的波斯称为帕提亚帝国。','sasanian300'),
  territory:fact('位于底格里斯河畔、今巴格达以南约 30 千米。向西北看尼西比斯与安条克，可建立波斯腹地、罗马边防、地中海东岸的空间关系；本条不重建萨珊精确边界。','sasanian300'),
  people:fact('萨珊是王朝名称，不能代表帝国内每一位居民的族群。这里分别展示王朝与城市，不推算居民构成或同质的人种区域。'),
  language:fact('王朝名称不能说明两河流域城市居民的全部语言；本条暂未收录 300 年泰西封的居民语言统计。'),
  nameNote:fact('泰西封长期是政治中心；著名的后期宫殿建筑不能全部倒推为 300 年已有的城市形态。','sasanian300'),related:['nisibis','antioch'],reading:[{chapter:98,pages:[792,798],note:'作为罗马东方邻国的补充背景。'}]},
];
export const roman300Guide:ReadingGuide={
 title:'300 年：四帝共治下的罗马，与东方的萨珊',
 orientation:'这是一个罗马帝国，由两位正帝和两位副帝分掌：西部正帝马克西米安、副帝君士坦提乌斯一世；东部正帝戴克里先、副帝伽列里乌斯。第一轮共治为 293—305 年。四块同色区域表示分掌方向，不是四个独立国家。先定位驻地，再沿各地域查看城市。',
 people:'帝国政治身份不等于单一族群。高卢、不列颠、希腊、北非、埃及和叙利亚保留不同的地方文化与语言传统；军队和宫廷的出身也不能替代居民构成。地点卡片把政权、地域、居民、语言和古今地名分开说明。',
 reading:'第 98 讲「四帝共治」、第 99 讲「君士坦丁（上）」· PDF 792—805 页',source:'tetrarchy300',
 places:[['trier','副帝君士坦提乌斯一世 → 特里尔'],['milan','正帝马克西米安 → 米兰'],['nicomedia','正帝戴克里先 → 尼科米底亚'],['thessaloniki','副帝伽列里乌斯 → 塞萨洛尼基']],
 realms:[
  {name:'罗马帝国 · 不列颠与高卢',time:'300 年的西北部地域',regions:'跨过海峡区分不列颠与大陆高卢。特里尔靠近莱茵防线，里昂在罗讷河流域；分掌区轮廓不等于每个行省的边界。',source:'britain300',places:[['london','不列颠南部：伦底尼乌姆'],['york','不列颠北部：埃博拉库姆'],['lyon','高卢内陆：卢格杜努姆']]},
  {name:'罗马帝国 · 意大利、西西里与西班牙',time:'300 年的中西部地域',regions:'意大利是半岛，西西里是岛屿，西班牙诸行省在更西侧的伊比利亚半岛。罗马保有传统地位，米兰则是重要宫廷驻地。',source:'provinces300',places:[['rome','意大利：罗马'],['syracuse','西西里：叙拉古'],['tarraco','西班牙：塔拉科']]},
  {name:'罗马帝国 · 北非沿海',time:'300 年；尚非汪达尔王国',regions:'在地中海南岸，从今突尼斯附近的迦太基向东找到今利比亚的大莱普提斯。北非是一个大地域，不能画成单一行省或单一族群。',source:'provinces300',places:[['carthage','北非中心：迦太基'],['lepcis','向东沿海：大莱普提斯']]},
  {name:'罗马帝国 · 巴尔干与希腊',time:'300 年的东南欧地域',regions:'从爱琴海北端的塞萨洛尼基南下到阿提卡的雅典，再向东北看海峡。拜占庭城尚不是君士坦丁堡新都。',source:'byzantine',places:[['athens','阿提卡：雅典'],['byzantium','海峡欧洲岸：拜占庭城']]},
  {name:'罗马帝国 · 小亚细亚、叙利亚与埃及',time:'300 年；395 年的东西分治尚未发生',regions:'尼科米底亚在小亚细亚西北，安条克在地中海东北，亚历山大里亚在埃及北岸。三者分属不同地域，共同处在罗马帝国之内。',source:'provinces300',places:[['nicomedia','小亚细亚：尼科米底亚'],['antioch','叙利亚：安条克'],['alexandria','埃及：亚历山大里亚']]},
  {name:'东方邻国 · 萨珊帝国与边境通道',time:'萨珊王朝：224—651 年；此处看 300 年',regions:'泰西封在两河流域，属于萨珊；尼西比斯在 300 年属于罗马一方。原快照错误沿用“帕提亚”名称，其旧轮廓已降为可选参考层，不能当成已核实的萨珊疆界。',source:'sasanian300',places:[['ctesiphon','萨珊宫廷：泰西封'],['nisibis','罗马边城：尼西比斯']]},
 ],
};
