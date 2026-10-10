import type {GazetteerPlace} from './model';
import type {HistoricalDetail,HistoricalFact} from './history-details';
import type {Region300} from './roman-300-regions';
import {courseSources} from './course-sources';
const fact=(text:string,...sources:(keyof typeof courseSources)[]):HistoricalFact=>({text,sources});
export const libyanCoastPlaces:GazetteerPlace[]=[
 {id:'sabratha',name:'萨布拉塔',modern:'利比亚 · 萨布拉塔（的黎波里以西）',aliases:['Sabratha','Sabrata','塞卜拉泰','萨布拉塔'],coords:[12+29/60+6/3600,32+48/60+19.008/3600],kind:'历史地点参考',source:courseSources.sabrathaSite.url,description:'今利比亚西北岸古城，向东联系大莱普提斯，向西联系迦太基。采用 UNESCO 遗址代表坐标，保护区与行省边界不同。'},
 {id:'apollonia-cyrenaica',name:'昔兰尼的阿波罗尼亚',modern:'利比亚 · 苏萨（昔兰尼北侧海岸）',aliases:['Apollonia','Sozousa','Susah','Susa','苏萨','苏苏萨','阿波罗尼亚'],coords:[21.970535,32.902411],kind:'历史地点参考',source:courseSources.apolloniaAtlas.url,description:'昔兰尼北面的海港城市，今苏萨。坐标来自 Johan Åhlfeldt / DARE（CC BY-SA 3.0），原资料约 2 千米精度；不是古代港池岸线。'},
];
export const libyanCoastCityRegions:Record<string,string>={lepcis:'tripolitania400',sabratha:'tripolitania400',cyrene:'cyrenaica400','apollonia-cyrenaica':'cyrenaica400'};
export function libyanCoastPolity(west:boolean,y:number){
 if(y<395)return west?'罗马帝国的的黎波里塔尼亚地域，以西部北非沿岸城市定位；此时不能倒套 395 年后的两部朝廷。':'罗马帝国的昔兰尼加地域，与埃及及克里特有地理联系；晚期行政改革与此前克里特—昔兰尼行省的历史需要分开，不能倒套 395 年后的两部朝廷。';
 if(!west)return '罗马东部的昔兰尼加，晚期行政联系埃及。《官职志》将上、下利比亚列在埃及组；这是制度参照，不是当年逐省实控测绘。'+(y>=439?'439 年迦太基易手不意味着这里同时转入汪达尔统治。':'它与西部的的黎波里塔尼亚分属不同的行政联系。');
 if(y<429)return '罗马西部北非行省空间；《官职志》西方名册将 Tripolis 列在阿非利加组，与东方的昔兰尼加分开理解。';
 if(y<439)return '429 年汪达尔进入北非后的战争阶段；的黎波里塔尼亚的各城交接尚未逐年核定，不能把渡海之年当作萨布拉塔或大莱普提斯陷落之年。';
 if(y<442)return '439 年迦太基易手改变西部北非局势；沿岸各城的经历并不同步，442 年和约仍是后续节点。';
 return '汪达尔扩张与地方势力重组影响的黎波里塔尼亚；442 年和约后各城的控制仍需分别核对，不能把昔兰尼加一并归入西部王国。';
}
const westLanguage='拉丁语公共书写与布匿、北非地方语言传统并存；港口、乡村和内陆之间存在差异，不能由罗马建筑推算母语比例。';
const eastLanguage='希腊语城市文化与北非地方传统并存；罗马政治身份、希腊书写和居民出身是不同层次，不能把海岸标成单一族群。';
const periods:[number,number,string][]=[[300,364,'四世纪前期'],[365,394,'365 年以后'],[395,428,'东西部行政联系'],[429,438,'北非战争背景'],[439,441,'迦太基易手之后'],[442,500,'五世纪地域差异']];
export const libyanCoastDetails:HistoricalDetail[]=libyanCoastPlaces.flatMap(p=>periods.map(([from,to,label])=>{
 const west=p.id==='sabratha';
 return {id:`${p.id}-${from}`,placeId:p.id,title:p.name,displayName:west?'Sabratha':'Apollonia',kind:'历史城市',from,to,focusYear:from,period:`${from}—${to} 年：${label}`,
 polity:fact(libyanCoastPolity(west,from),'byzacenaList','libyaEasternList','procopius5'),
 territory:fact(west?'萨布拉塔位于今天的黎波里以西，属于西北沿海；大莱普提斯在更东面。跨过大苏尔特湾才到昔兰尼加，不能把两端当成同一座城市或一段紧凑城区。':'阿波罗尼亚在昔兰尼北面的海岸，昔兰尼城位于内陆高地；一处看港口，一处看高地城市。再向东联系埃及，向北隔海对望克里特。',west?'sabrathaSite':'apolloniaHarbour'),
 people:fact(west?(from<365?'贸易、城市公共生活与内陆联系构成萨布拉塔的历史背景。二、三世纪的大型建筑是较早阶段的遗存，不能据此假定本年人口规模与繁荣程度相同。':'UNESCO 将 365 年地震列入萨布拉塔衰退的背景，随后五世纪战争也影响城市。遗存中的布匿、罗马与早期基督教层次不能当作此年三种人口的比例；六世纪建筑不回填至本期。'):'阿波罗尼亚早先是昔兰尼的港口，后来成为独立城市，属于昔兰尼加的重要城市之一。港口联系有助于理解社会往来；二世纪铭文中的城市代表不能直接当作四、五世纪的居民构成。',west?'sabrathaSite':'apolloniaHarbour'),
 language:fact(west?westLanguage:eastLanguage,'inscriptions300','provinces300'),
 nameNote:fact(west?'萨布拉塔不等于现代的黎波里市；“的黎波里塔尼亚”在本图是地域名称。':'阿波罗尼亚对应今利比亚苏萨；古代多地同名，本条专指昔兰尼的海港，不是巴尔干的阿波罗尼亚，也不是突尼斯的苏塞。Sozousa 是目录收录的另一历史名称，本条不据此指定改名年。',west?'sabrathaSite':'apolloniaAtlas'),
 related:west?['lepcis','carthage','cyrene','apollonia-cyrenaica']:['cyrene','alexandria','gortyn','sabratha'],relatedBattles:west&&from>=429?['vandals-429']:[]};
}));
// Preserve existing 400/500-era shared ids while extending the reading geography back to 300.
export function addLibyanCoasts(regions:Region300[],year:number):Region300[]{
 const parent=regions.find(r=>r.id==='libya');if(!parent||year<300||year>500)return regions;
 const children:Region300[]=[true,false].map(west=>{
 const id=west?'tripolitania400':'cyrenaica400';
 return {...parent,id,parent:'libya',name:west?'的黎波里塔尼亚：西部沿海':'昔兰尼加：东部高地与海港',mapName:west?'的黎波里塔尼亚':'昔兰尼加',coords:west?[13.5,32.2]:[22,32.3],bounds:west?[[10.5,30],[17,33.5]]:[[19,30],[25.5,33.7]],
 modern:west?'今利比亚西北部，萨布拉塔与大莱普提斯分处现代的黎波里市的西、东两侧；向西接突尼斯。':'今利比亚东北部；昔兰尼在高地，阿波罗尼亚（苏萨）在北侧海岸，向东联系埃及。',
 polity:libyanCoastPolity(west,year),parts:west?'用萨布拉塔和大莱普提斯辨认西部沿岸，城市周围联系农业腹地与内陆。镜头不表示完整行省或控制线。':'用昔兰尼与其海港阿波罗尼亚辨认山地—海岸联系。上、下利比亚是晚期行政名目，不等于现代利比亚国家的南北两半。',
 people:west?'布匿传统、罗马城市生活与地方北非社群相互联系；商旅、城镇居民与内陆社会不能用一种身份概括。':'希腊传统城市、海港往来与本地乡村社群相互联系；城市碑铭不能代表全体居民，行政归于东方也不表示所有人来自东方。',language:west?westLanguage:eastLanguage,
 change:year<365?'以城市与地形辨认东西两段；365 年地震尚未发生，不提前使用震后城市状态。':year<395?'365 年地震影响需要逐城辨别，灾害不是一次帝国疆界变化；各城毁坏程度不可互相代用。':west?'395 年后联系西部北非体系；429 年渡海、439 年迦太基易手和各城交接不是同一事件。':'395 年后联系罗马东方与埃及；西部北非王权变化不能直接复制到昔兰尼加。',
 cities:west?['sabratha','lepcis']:['cyrene','apollonia-cyrenaica'],sources:[...new Set([...parent.sources,'sabrathaSite','apolloniaAtlas','apolloniaHarbour','byzacenaList','libyaEasternList','procopius5'] as Region300['sources'])]};
 });
 return [...regions.filter(r=>!['tripolitania400','cyrenaica400'].includes(r.id)).map(r=>r.id==='libya'?{...r,name:'利比亚沿海：东西两段',mapName:'北非中段',polity:'这是一组跨越的黎波里塔尼亚与昔兰尼加的地理参照；行政及政治背景请分别展开两端，不以现代利比亚国界合并。',parts:'西部沿岸联系迦太基方向，东部高地与海港联系埃及、克里特方向；中间隔着大苏尔特湾。',cities:['sabratha','lepcis','cyrene','apollonia-cyrenaica']}:r),...children];
}
