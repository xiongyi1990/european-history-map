import records from './pleiades.json';

export type Camp = 'athens' | 'sparta' | 'neutral' | 'context';
export type Layer = 'places' | 'alliances' | 'territory';
export const sourceWar = 'https://classics.mit.edu/Thucydides/pelopwar.2.second.html';
export const campNames: Record<Camp, string> = { athens: '雅典一方', sparta: '斯巴达一方', neutral: '开战时中立', context: '地理参考点' };
export const campColors: Record<Camp, string> = { athens: '#216e83', sparta: '#ae543b', neutral: '#998047', context: '#657269' };
export interface Place {
  id: string; pid: string; name: string; latin: string; modern: string; aliases: string[];
  coords: [number, number]; camp: Camp; kind: string; region: string; description: string;
  relation: string; territory: string; people: string; source: string; precision: string;
}

type Entry = [string, keyof typeof records, string, string, string, Camp, string, string, string, string];
const entries: Entry[] = [
  ['athens','579885','雅典','Athens','雅典','athens','城邦','阿提卡','从这里开始认识希腊：先找比雷埃夫斯港，再看西边的地峡和南面的伯罗奔尼撒。','雅典是这一方的主要领导者；其盟友不能全部视作雅典直接领土。'],
  ['sparta','570685','斯巴达','Sparta','斯巴达','sparta','城邦','拉科尼亚','把地图倾斜，观察城市所在的河谷和西侧的泰格托斯山脉，再与雅典的海岸位置比较。','斯巴达领导伯罗奔尼撒一方；联盟成员保有各自的政治共同体。'],
  ['corinth','570182','科林斯','Corinth','古科林斯','sparta','城邦','科林斯地峡','找到连接希腊中部与伯罗奔尼撒的狭窄地峡，比较东西两侧的海湾。','修昔底德 2.9 将科林斯列为斯巴达一方的舰船提供者。'],
  ['thebes','541138','底比斯','Thebes','底比斯','sparta','城邦','维奥蒂亚','与南面的普拉提亚一起定位：两地相近，却处在敌对阵营。','维奥蒂亚一方支持斯巴达；底比斯袭击普拉提亚见修昔底德 2.2–6。'],
  ['argos','570106','阿尔戈斯','Argos','阿尔戈斯','neutral','城邦','阿尔戈利斯','它也在伯罗奔尼撒。观察它的位置，检验“同处一个半岛就属于同一阵营”的直觉。','修昔底德 2.9 明确将阿尔戈斯列为开战时的中立者。'],
  ['megara','570468','麦加拉','Megara','梅加拉','sparta','城邦','麦加里斯','位于雅典与科林斯之间；适合与两地同时对照，理解邻近关系。','修昔底德 2.9 将麦加拉列入斯巴达一方。'],
  ['plataea','541063','普拉提亚','Plataea','普拉泰斯附近','athens','城邦','维奥蒂亚','公元前 431 年，底比斯军队进入这里。把两城放在同一画面，再读战争开端。','雅典的盟友，见修昔底德 2.2–6、2.9；不是雅典城的一部分。'],
  ['naupactus','540960','瑙帕克托斯','Naupactus','纳夫帕克托斯','athens','港口城市','科林斯湾北岸','先找到海湾西侧入口，再观察这个港口与伯罗奔尼撒北岸的关系。','修昔底德 2.9 列出居住于此的美塞尼亚人为雅典一方。'],
  ['corcyra','530834','科西拉','Corcyra','科孚','athens','城邦','伊奥尼亚海','位于希腊西侧海域。和东面的爱琴海一起看，理解战事的空间范围。','修昔底德 2.9 将科西拉列为雅典一方的舰船提供者。'],
  ['chios','550496','希俄斯','Chios','希俄斯','athens','城邦','爱琴海东部','靠近小亚细亚海岸，隔海与希腊本土相望。','修昔底德 2.9 将希俄斯列为雅典一方的舰船提供者。'],
  ['mytilene','550763','米提利尼','Mytilene','米蒂利尼','athens','城邦','莱斯博斯岛','位于莱斯博斯岛东南岸；岛名和城名需要分开辨认。','开战时归入莱斯博斯的雅典盟友；此处不把这一状态延用到后来的叛乱时期。'],
  ['melos','570474','米洛斯','Melos','米洛斯岛古城','neutral','城邦','基克拉泽斯群岛','在雅典以南的群岛中寻找它：群岛不能直接涂成一个政治整体。','修昔底德 2.9 将米洛斯排除在雅典的基克拉泽斯盟友之外；此处只展示开战状态。'],
  ['thera','599971','锡拉','Thera','圣托里尼古锡拉遗址','neutral','城邦','基克拉泽斯群岛','古代城市标记与今天圣托里尼岛的中心不是同一位置。','修昔底德 2.9 将锡拉排除在雅典的基克拉泽斯盟友之外。'],
  ['tegea','570707','忒革亚','Tegea','阿莱阿附近','sparta','城邦','阿卡迪亚','在伯罗奔尼撒内陆，与斯巴达一起观察南北方向的山地。','按修昔底德 2.9 对伯罗奔尼撒成员的地域性列举归类；不是逐城点名。'],
  ['sicyon','570668','西库昂','Sicyon','西基翁遗址','sparta','城邦','伯罗奔尼撒北部','位于科林斯以西，面向科林斯湾。地点是跨时期代表点，不是公元前 431 年城墙中心。','修昔底德 2.9 将西库昂列为斯巴达一方的舰船提供者。'],
  ['elis','570220','埃利斯','Elis','古埃利斯遗址','sparta','城邦','伯罗奔尼撒西北部','与奥林匹亚一起定位，区分城市、地区和圣地三个概念。','修昔底德 2.9 将埃利斯人列为斯巴达一方的舰船提供者。'],
  ['piraeus','580062','比雷埃夫斯','Piraeus','比雷埃夫斯','athens','港口','阿提卡','雅典的港口。用“两地比较”观察雅典城与海港之间的实际距离。','属于雅典的港口；与地图上的独立盟邦使用不同的文字说明。'],
  ['marathon','580021','马拉松','Marathon','马拉松','athens','聚落','阿提卡','先定位在阿提卡东北部的聚落，再阅读与马拉松平原有关的历史。标记不是战场边界。','阿提卡地点，归于雅典；不是单独的联盟成员。'],
  ['salamis','580100','萨拉米斯','Salamis','萨拉米斯岛古城','athens','聚落','萨罗尼克湾','标记指古代聚落。海战发生的海峡与聚落位置需要区分。','雅典控制的岛上地点；不是独立盟邦。'],
  ['delphi','540726','德尔斐','Delphi','德尔斐遗址','context','圣地','帕尔纳索斯山南坡','观察山坡上的圣地位置。参考地点不自动归入某一战争阵营。','本版仅用于圣地定位，不据其地理位置推定阵营。'],
  ['olympia','570531','奥林匹亚','Olympia','奥林匹亚遗址','context','圣地','伯罗奔尼撒西部','它是圣地标记，不能与奥林匹斯山混淆，也不应作为独立城邦涂色。','本版仅用于圣地定位；不能把圣地参与活动的群体视为一个政权。'],
  ['delos','599587','提洛','Delos','提洛岛遗址','context','圣地与聚落','基克拉泽斯群岛','找到这个小岛，再回到雅典；它能帮助你记住“提洛同盟”名称中的地理线索。','本版作为地理参考点，不以标记推定独立城邦成员身份。'],
  ['samos','599925','萨摩斯','Samos','毕达哥利翁附近','context','城邦','爱琴海东部','城市位于萨摩斯岛南岸。古今地名对照显示的是遗址附近的现代名称。','具体控制关系需要补充本地史料，本版暂不着阵营色。'],
  ['miletus','599799','米利都','Miletus','巴拉特附近','context','城邦','小亚细亚西岸','古代港口环境与今天不同。底图使用现代海岸，不可据此判断当时离海多远。','本版提供地点定位，公元前 431 年具体政治状态待补充核对。'],
  ['ephesus','599612','以弗所','Ephesus','塞尔丘克附近','context','城邦','小亚细亚西岸','同样要留意海岸变迁；这里的代表点涵盖遗址，不是逐年重建的城市中心。','本版提供地点定位，公元前 431 年具体政治状态待补充核对。'],
  ['syracuse','462503','叙拉古','Syracuse','锡拉库萨','context','城邦','西西里东岸','向西寻找西西里：读到后来的远征时，可以先用它建立距离感。','本版作为后续阅读的参考地点，不套用后来参战时的状态。'],
];

export const places: Place[] = entries.map(([id,pid,name,latin,modern,camp,kind,region,description,relation]) => {
  const record = records[pid];
  const aliases = [record.title, modern, latin];
  if (id === 'sparta') aliases.push('拉栖代梦','拉刻代蒙','Lacedaemon');
  if (id === 'plataea') aliases.push('普拉蒂亚','普拉泰亚');
  if (id === 'megara') aliases.push('梅加拉');
  if (id === 'corcyra') aliases.push('克基拉','Kerkyra','Corfu');
  return { id,pid,name,latin,modern,aliases,coords:record.coords as [number,number],camp,kind,region,description,relation,source:record.url,precision:record.precision,
    territory: id === 'athens' ? '阿提卡是雅典城邦的核心领地，但雅典城、阿提卡和雅典的盟友范围不能画成同一个对象。本版尚无经过核实的公元前 431 年疆界多边形。' : id === 'sparta' ? '阅读时应区分斯巴达城、拉科尼亚、美塞尼亚与伯罗奔尼撒同盟。本版尚无经过核实的公元前 431 年疆界多边形。' : '本版已提供地点代表点；尚未录入经过核实的公元前 431 年城邦领土范围。代表点不能推导城墙或国界。',
    people: id === 'naupactus' ? '修昔底德 2.9 特别提到居住于此的美塞尼亚人。这是群体居住的记载，不等于一份当地人口比例统计。' : '本版暂不提供当地族群比例或人口分布图。语言、文化认同、公民身份和政治归属需要分别核对，不能由阵营颜色推断。',
  };
});

export const readingSteps = [
  { title:'先认清山与海', subtitle:'从阿提卡到伯罗奔尼撒', text:'找到雅典和斯巴达，再找科林斯地峡。切换 3D，看地形怎样组织你的空间印象。', focus:['athens','sparta','corinth'], layer:'places' as Layer },
  { title:'两城，不止两方', subtitle:'领土和同盟是不同的关系', text:'蓝色与赭色表示开战时的阵营关系。连线连接本版选取的成员，既不是疆界，也不是行军路线。', focus:['athens','sparta'], layer:'alliances' as Layer },
  { title:'从普拉提亚读起', subtitle:'公元前 431 年 · 战争开端', text:'底比斯军队进入普拉提亚，后者与雅典结盟。先比较两城位置，再回到书中读事件经过。', focus:['thebes','plataea'], layer:'alliances' as Layer },
];

export function searchPlaces(query: string) {
  const q = query.trim().toLocaleLowerCase();
  return places.filter(p => !q || [p.name,p.region,p.latin,...p.aliases].some(n => n.toLocaleLowerCase().includes(q)));
}

export function distanceKm(a: [number,number], b: [number,number]) {
  const r = Math.PI / 180;
  const h = Math.sin((b[1]-a[1])*r/2)**2 + Math.cos(a[1]*r)*Math.cos(b[1]*r)*Math.sin((b[0]-a[0])*r/2)**2;
  return Math.round(6371 * 2 * Math.asin(Math.sqrt(Math.min(1,h))));
}
