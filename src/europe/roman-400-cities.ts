import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {courseSources} from './course-sources';
import {reading400} from './roman-400';
type Source=keyof typeof courseSources;
const fact=(text:string,...sources:Source[]):HistoricalFact=>({text,sources});
const city=(placeId:string,title:string,polity:string,territory:string,people:string,language:string,sources:Source[],related:string[]):HistoricalDetail=>({
 id:`${placeId}-ad400`,placeId,title,from:400,to:400,focusYear:400,period:'400 年：城市、朝廷与地方社会',kind:'历史城市',
 polity:fact(polity,...sources),territory:fact(territory,...sources),people:fact(people,...sources),language:fact(language,...sources),
 nameNote:fact(`${title}为本条采用的历史名称；下方现代位置用于古今对照，城市代表点不表示古代城墙范围。`,...sources),reading:reading400,related,
});
export const cities400:HistoricalDetail[]=[
 city('milan','米兰','西部皇帝霍诺留的主要宫廷驻地。斯提利科是重要军事掌权者；皇帝与将领不是两个独立国家的君主。','波河平原北部，南通意大利城市，向北连阿尔卑斯山口；402 年迁拉文纳尚未发生。','宫廷人员、官员、军人、主教与普通城市居民具有不同身份，不能从将领的出身推定全城族群。','拉丁语用于西部行政与教会；宫廷和军队的流动带来多地语言接触，未收录人口比例。',['honorius400','inscriptions300'],['rome','ravenna','aquileia']),
 city('rome','罗马','属于霍诺留统治的西部；皇帝主要驻米兰，罗马仍保有元老院、城市行政及重要宗教地位。','奥斯提亚与台伯河把罗马连接到海路；罗马城、意大利与整个西部帝国是不同尺度。410 年城破还在十年后。','元老家族、平民、获释者、奴隶、教士及移民并存。基督教影响加强不代表传统信仰或其他宗教社群即时消失。','拉丁语在城市公共生活和教会中重要，希腊语及移民语言也存在；不按政治归属划单一语言区。',['honorius400','religionLaw4','inscriptions300'],['ostia','carthage','milan','hippo']),
 city('ravenna','拉文纳','400 年为罗马西部城市，尚不是霍诺留的常驻宫廷；迁驻节点是 402 年。','位于亚得里亚海西岸低地，联系港口与北意大利；现存晚期古代建筑不能全部倒推到 400 年。','当地居民、港口服务人口与军政活动群体并存；493 年后的东哥特王廷和驻军不能提前放入此年。','拉丁语属于地方罗马行政文化背景；没有可用的逐城语言比例。',['honorius400','ravenna'],['milan','rome','aquileia']),
 city('byzantium','君士坦丁堡','东方皇帝阿卡狄乌斯的宫廷。皇后欧多克西亚与宫廷官员具有影响力；400 年盖纳斯的军政危机不等于另建一个哥特国家。','位于海峡欧洲岸，连接黑海、爱琴海、色雷斯与小亚细亚。城内事件、海峡通道和帝国疆域分别观察。','居民、驻军和军官的政治立场并不随族名自动一致。盖纳斯危机中的杀戮不能表述为全体哥特人的整体行动。','希腊语城市生活与拉丁语帝国制度并存；教会内部也有不同传统，不能简化成一种语言、一种信仰的居民。',['arcadius400','gainas400','inscriptions300'],['hadrianople','thessaloniki','nicomedia','alexandria']),
 city('carthage','迦太基','属于罗马西部。397—398 年吉尔多反叛已经结束；439 年汪达尔夺城尚未发生。','今天突尼斯附近的港口与城市中心，联系北非农业腹地、西西里和意大利；不能把整个北非都叫迦太基。','罗马化地方精英、城镇居民、农业劳动者、军队与不同基督教社群并存；“罗马”是政治身份的一层。','拉丁语在行政、教育与教会中重要；北非地方语言传统继续存在，城乡不应视为完全一致。',['honorius400','africaLate','inscriptions300'],['hippo','ostia','lepcis','rome']),
 city('hippo','希波','罗马西部的北非城市；奥古斯丁已经担任主教。430 年围城是后续事件。','今阿尔及利亚安纳巴附近，在迦太基以西；它是另一座城市，而非迦太基的别名。','主教、信众与其他城市居民不是一个层次。北非教会中存在多纳徒争议，不能以“基督徒”抹平内部差异。','奥古斯丁主要以拉丁语写作和讲道；其较晚的约 423 年书信还提及附近布匿语需求。这是地域语言延续的旁证，不是 400 年人口普查。',['africaLate','augustineLanguage400'],['carthage','rome']),
 city('lepcis','大莱普提斯','属于西部的的黎波里塔尼亚行省空间；不能随现代利比亚国界整体归给东罗马。','今利比亚西北沿海，隔海联系意大利，向西接迦太基方向；与更东的昔兰尼分开定位。','沿海城市、庄园与内陆社群往来；地域性的布匿、地方北非与罗马文化经历不能合成单一族群。','拉丁语铭文传统与布匿及地方语言背景并存；遗存文字不能直接等同居民母语比例。',['notitia400','inscriptions300'],['carthage','cyrene','rome']),
 city('cyrene','昔兰尼','处于罗马东部的昔兰尼加空间，与埃及行政体系联系；不是西部的的黎波里塔尼亚。','今利比亚东北山地靠海地区，隔海对望克里特；400 年处在 365 年地震之后的城市阶段。','希腊传统城市社会与当地北非居民交织；震后改变不等于整个地区变成无人区。','希腊语文化传统重要，地方语言继续存在；城市碑铭并非全体居民的语言统计。',['notitia400','cyrene300','inscriptions300'],['lepcis','alexandria','gortyn']),
 city('alexandria','亚历山大里亚','罗马东部的埃及大城市；行政官员与主教各有权力，不能把主教区当成独立国家。','尼罗河三角洲西侧的地中海港口，向内陆联系谷地，向海上联系东地中海。','希腊文化城市居民、埃及地方社群、犹太人、基督徒及其他群体并存；具体政治和宗教事件不会使居民瞬间同质化。','希腊语公共文化与埃及语、科普特语书写传统交错，拉丁语具有帝国行政背景。',['notitia400','inscriptions300','gainas400'],['byzantium','cyrene','jerusalem']),
 city('thessaloniki','塞萨洛尼基','属于罗马东部。它帮助定位马其顿及东部伊利里库姆空间，与君士坦丁堡不是同一座都城。','爱琴海北岸港口，连接巴尔干内陆与海路；阿拉里克活动于巴尔干，不等于此城变成图卢兹式王都。','地方城市社会、商人、官员、军人和教会社群并存；巴尔干战争会扰动生活，但不自动改变全部居民身份。','希腊语在城市文化中突出，拉丁语军政传统和人口流动并存。',['notitia400','arcadius400','galerius'],['byzantium','hadrianople','sirmium']),
 city('ctesiphon','泰西封','萨珊帝国由伊嗣俟一世统治，399 年即位；不是百年前的纳尔塞或沙普尔二世。','底格里斯河畔的王廷城市群，在今天伊拉克，连接两河低地与伊朗高原；不是现代伊朗首都德黑兰。','王廷人员与两河本地城镇、宗教社群并存；伊朗王朝统治不代表全城居民都是同一血缘的波斯人。','中古波斯语具有王朝背景，阿拉米语及叙利亚语等地方书写传统继续存在。',['yazdegerd400','asoristan300','aramaic300'],['nisibis','edessa','bishapur','susa']),
 city('nisibis','尼西比斯','400 年由萨珊帝国控制，363 年罗马交城的结果已经延续；不是阿卡狄乌斯的东方边城。','位于两国接触地带的上两河区域；和更西面的罗马埃德萨分开标示。','363 年交城伴随居民迁离与安置；不能把交城前的城市人口原样复制到 400 年，也没有可靠比例可补。','阿拉米语的叙利亚语传统与伊朗王朝政治环境相遇；政权更换不等于语言即时替换。',['nisibis300','yazdegerd400','edessa4'],['edessa','amida','ctesiphon']),
 city('edessa','埃德萨','仍属罗马东方的奥斯若恩空间；363 年尼西比斯交给萨珊没有把埃德萨同时交出。','今天尚勒乌尔法一带，位于尼西比斯以西；两城是理解政治边界与文化联系不同步的对照。','本地居民和来自尼西比斯的移居者背景交织；以法莲在 373 年已去世，不能把他当成 400 年仍在活动的人物。','叙利亚语基督教书写传统突出，与希腊语及罗马行政文化接触。',['edessa4','notitia400'],['nisibis','antioch','amida']),
 city('arles','阿雷拉特（阿尔勒）','属于罗马西部的高卢。四世纪城市的重要性不等于它已是所有后世行政机构的固定首府。','罗讷河下游连接高卢内陆与地中海；相较莱茵河畔的特里尔，它更靠近南方海路。','港口、城市精英、教会社群与地方劳作者共同构成城市社会；314 年会议是既往背景。','拉丁语公共文化和高卢地方社会相联系，不以今天法语国界回填古代语言。',['arles4','notitia400','inscriptions300'],['trier','lyon','massilia','toulouse']),
 city('toulouse','托洛萨（图卢兹）','400 年仍在罗马西部高卢体系内；418 年以后的西哥特王权中心身份尚未出现。','加龙河畔、比利牛斯山北侧；向南才进入伊比利亚半岛，不能把图卢兹定位在西班牙。','地方高卢—罗马城市社会为背景；不把后来西哥特军事统治集团提前当成本年全城居民。','拉丁语文化与高卢地方语言背景并存，未收录城市人口比例。',['honorius400','toulouseLate','inscriptions300'],['arles','lyon','tarraco']),
 city('tournai','图尔奈','400 年按罗马高卢城市背景理解；希尔德里克、克洛维的王权中心属于五世纪后期。','斯海尔德河畔，今比利时西部；邻近法兰克活动方向，不代表已是统一法兰克王国都城。','当地罗马化社会与边境军队、迁居群体有联系；王朝名称不能替代本年的居民记录。','拉丁公共书写与北高卢、邻近日耳曼语言环境接触，不把现代法语、荷兰语界线倒推到 400 年。',['notitia400','tournaiLate','inscriptions300'],['cologne','trier','paris']),
];

// Split old intervals around the selected year. Preserve both neighbours and clamp their navigation target.
export function applyCities400(base:HistoricalDetail[]):HistoricalDetail[]{
 const ids=new Set(cities400.map(d=>d.placeId));
 const records=base.flatMap(d=>{
  if(!ids.has(d.placeId)||d.from>400||d.to<400)return [d];
  const segment=(from:number,to:number):HistoricalDetail=>({...d,id:`${d.id}-segment-${from}-${to}`,from,to,focusYear:Math.max(from,Math.min(to,d.focusYear??from)),period:`${d.period}（本条覆盖 ${from}—${to} 年）`});
  return [...(d.from<400?[segment(d.from,399)]:[]),...(d.to>400?[segment(401,d.to)]:[])];
 });
 return [...records,...cities400.map(d=>{const seed=base.find(b=>b.placeId===d.placeId&&b.from<=400&&b.to>=400);return {...d,displayName:seed?.displayName,nameNote:seed?.nameNote??d.nameNote};})];
}
