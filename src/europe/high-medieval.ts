import states from './high-medieval-states.json';
import {imperialCommuneFrames} from './imperial-communes';
import {highMedievalSources as sources} from './high-medieval-sources';
import {imperialCommuneSources} from './imperial-communes-sources';
import type {PartitionFrame,PartitionRealm} from './frankish-partitions';
const base=Object.fromEntries(imperialCommuneFrames.find(f=>f.year===1183)!.realms.map(r=>[r.id,r]));
const relation=(title:string,text:string,...realmIds:string[])=>({title,text,realmIds});
export const highMedievalYears=states.map(s=>s.year);
export const highMedievalFrames:PartitionFrame[]=states.map(s=>{
 const patch=(id:string,p:Partial<PartitionRealm>):PartitionRealm=>({...base[id],dates:`${s.year}年所标时点；不自动沿用到相邻年份`,...p});
 const west=s.year<1223?'腓力二世':s.year<1226?'路易八世':s.year<1270?'路易九世'+(s.year===1226?'（幼年）；布朗什等治理':''):'腓力三世';
 const english=s.year<1199?'理查一世':s.year<1216?'约翰':s.year<1272?'亨利三世':'爱德华一世';
 const realms:PartitionRealm[]=[
  patch('west-francia',{ruler:west,status:s.westNote??'卡佩王室与诸侯、主教、城市有不同权利。王国阅读范围不等于王室自有领地；诺曼底、安茹、阿基坦的变化另按事件和具体时间理解。',places:s.year===1214?[['bouvines','布汶：本年北方会战'],['paris','巴黎：卡佩王权方向'],['rouen','鲁昂：1204年已易主的诺曼底']]:[['paris','巴黎：卡佩王权方向'],['rouen','鲁昂：诺曼底的不同阶段']]}),
  patch('east-francia',{ruler:s.ruler,status:s.year>=1250?'王位、帝号、诸侯和城市的实际权力分层。所谓大空位不表示帝国地域无人治理；也不把王位竞争者各自全部支持区虚构成两个整齐国家。':s.year>=1220?'皇帝与北侧共同国王、诸侯及主教分别治理。亨利（七世）、康拉德四世的王号，不是他们已成为皇帝。':'本年称号以所标时间为准；北侧王位、罗马帝号与西西里王权分别取得，不能按一家人的继承整体涂成同质直辖。',places:s.year===1212?[['mainz','美因茨：1212年国王加冕'],['konstanz','康斯坦茨：北上时的城市联系'],['aachen','亚琛：1215年再次加冕另看']]:[['aachen','亚琛：王位加冕传统'],['regensburg','雷根斯堡：北侧地域参照']]}),
  patch('lotharingia',{ruler:'帝国联系下的地方公爵、伯爵、主教与城市',status:'低地与洛林不是一个始终统一独立的王国；各地支持、封臣关系和实际治理不同。1214年参战的贵族也不能代表全部地方居民。'}),
  patch('burgundy',{name:'勃艮第王国地域与地方权力',ruler:'帝国王权联系与地方领主、教会',status:'王国地域、勃艮第伯国及法兰西境内的勃艮第公国各有层次。北侧王位争夺不能直接确定本地每个城市或教区的控制。'}),
  patch('italy',{name:'北中部意大利：城市与帝国权利',ruler:s.year>=1250?'城市、地方贵族、主教与不同政治阵营':'皇帝、城市公社、地方贵族与教会',status:'米兰、帕维亚等城市立场和权利各不相同。南部西西里王国单列；教皇权利、城市公社与皇帝主张不能在此合成一套直辖制度。',places:[['milan','米兰：城市公社方向'],['pavia','帕维亚：北意大利政治方向'],['rome','罗马：教皇及帝号关系，另有权利层次']]}),
  {id:'england',name:'英格兰王国',ruler:english,dates:`${s.year}年所标时点`,color:'#ac9dc7',coords:[-1.1,52.1],bounds:[[-5.8,49.8],[2,56]],geography:'英吉利海峡北侧，以伦敦、温彻斯特和英格兰核心地域帮助定位；不等于整个不列颠或现代英国。',parts:['泰晤士河与伦敦方向','温彻斯特等南部王室、教会中心','北部及地方贵族、城镇；威尔士、苏格兰、爱尔兰另须专门展开'],status:s.englandNote??'王室、教会、贵族与城市有不同权利。英格兰国王在大陆持有的领地和封建关系，不等于大陆全部成为英格兰本土。',people:'国王、男爵、骑士、教士、城市居民、自由人与不自由人口具有不同身份；王朝名称不能代替居民分类。',language:'拉丁文书、法语的贵族及法律使用和英语地方口语需要分别理解，不能用一种地图颜色代表全体居民母语。',places:s.year===1215?[['runnymede','兰尼米德：1215年宪章会面'],['london','伦敦：男爵与城市活动'],['winchester','温彻斯特：南部参照']]:[['london','伦敦：城市与王权方向'],['winchester','温彻斯特：南部参照']]},
  {id:'sicily',name:s.year===1282?'西西里岛王权（阿拉贡一方）':'西西里王国：岛屿与南部大陆',ruler:s.sicily,dates:`${s.year}年所标时点；1130年建国，1282年以后海峡两侧分治`,color:s.year===1282?'#d69b73':'#d4b86f',coords:s.year===1282?[14,37.6]:[15.3,39.8],bounds:[[12.2,36.4],[18.8,42.5]],geography:s.year===1282?'意大利靴尖以西的西西里岛；与那不勒斯方向的大陆王权分开。':'西西里岛加意大利半岛南部：王国名虽叫西西里，却不仅是一座岛。',parts:s.year===1282?['巴勒莫与岛上西部','墨西拿及海峡西岸','大陆的安茹查理部分另列']:['西西里岛：巴勒莫、墨西拿方向','南部大陆：坎帕尼亚、普利亚、卡拉布里亚等地域','海峡将两侧相连；岛屿、王国和现代西西里大区不是同一个尺度'],status:s.sicilyStatus,people:'诺曼、霍亨斯陶芬、安茹、阿拉贡是王朝或政治联系；不是当地居民整体被某一种人替换。王室、地方贵族、教士、城市与乡村社会分别看。',language:'这一地域有拉丁、希腊与阿拉伯语等历史传统；诺曼时代遗产只能说明背景，不能直接推出本年居民语言比例。',places:s.year===1231?[['melfi','梅尔菲：王国法典地点'],['palermo','巴勒莫：岛上王权中心'],['naples','那不勒斯：大陆方向']]:s.year===1266?[['benevento','贝内文托：1266年战役'],['palermo','巴勒莫：岛上方向'],['naples','那不勒斯：大陆方向']]:s.year===1268?[['tagliacozzo','塔利亚科佐：战役地域'],['naples','那不勒斯：康拉丁处刑城市'],['palermo','巴勒莫：岛上方向']]:[['palermo','巴勒莫：岛上王权中心'],['messina','墨西拿：海峡位置'],...(s.year===1282?[]:[['naples','那不勒斯：大陆方向'] as [string,string]])]},
 ];
 if(s.year===1282)realms.push({...realms[6],id:'south-italy',name:'南部大陆王权（安茹一方）',ruler:'安茹的查理（查理一世）',color:'#d4b86f',coords:[16,40.7],bounds:[[13,37.7],[18.8,42.5]],geography:'西西里海峡以东的南部大陆；以那不勒斯、普利亚和卡拉布里亚方向定位。',parts:['坎帕尼亚与那不勒斯','普利亚等大陆东南部','卡拉布里亚及海峡东岸；战争中仍有局部变化'],status:'查理失去岛上优势后仍保有大陆部分与西西里国王称号。不能把“西西里晚祷”画成他失去全部领地。',places:[['naples','那不勒斯：大陆王权方向'],['benevento','贝内文托：内陆参照']]});
 const reading:PartitionFrame['reading']=[{chapter:174,pages:[1484,1487],note:'课程提供皇帝、教皇及南部王国背景；王号帝号、1250与1254、大空位和1282年分治另据独立年表核验。'}];
 if(s.chapter&&s.pages)reading.push({chapter:s.chapter,pages:s.pages as [number,number],note:'相关阅读；1204年的诺曼底征服、1214年战役、1215年宪章须按各自日期分开。'});
 return {year:s.year as PartitionFrame['year'],title:`${s.year}年：${s.event}`,treaty:s.event,eventDate:s.moment,summary:s.summary,change:s.change,realms,reading,
  relationships:[relation('北侧王位与南部王国','找到阿尔卑斯，再找西西里海峡：共同君主、竞争王位和分别治理是不同关系。','east-francia','italy','sicily',...(s.year===1282?['south-italy']:[])),relation('英吉利海峡两侧','英格兰的王位与大陆封地并不等于两个现代民族国家之间的一次整体吞并。','england','west-francia')],
  sources:[...Object.values(sources),imperialCommuneSources.philipII],note:'本图展开英格兰、中西欧、北中部意大利及西西里王国的阅读地域，1282年另分岛屿与大陆。色块不是逐年实控疆界；东欧、伊比利亚、北欧与东地中海仍有待扩展。'};
});
