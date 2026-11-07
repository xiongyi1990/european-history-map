import states from './balkan-late-states.json';
import type {PartitionRealm,PartitionFrame} from './frankish-partitions';
export const balkanLateReading:PartitionFrame['reading']=[
 {chapter:154,pages:[1295,1295],note:'早期斯拉夫迁徙的地理背景，不能用作本阶段疆界或人口标签。'},
 {chapter:155,pages:[1304,1305],note:'文字与教会背景；字母、礼仪语、地方口语不等同。'},
 {chapter:206,pages:[1759,1761],note:'1369个人改宗、1439教会联合和1453围城的叙事背景；不是巴尔干所有地方政权的年表。'},
];
export const balkanLateState=(year:number)=>states.find(s=>s.year===year);
export function balkanLateRealms(year:number,moment:string):PartitionRealm[]{
 const s=balkanLateState(year);if(!s)return [];
 const make=(id:string,name:string,ruler:string,status:string,color:string,coords:[number,number],bounds:PartitionRealm['bounds'],geography:string,parts:string[],places:PartitionRealm['places'],dates:string,people:string,language:string):PartitionRealm=>({id,name,ruler,status,color,coords,bounds,geography,parts,places,dates:dates+'；当前时点：'+moment.split('，')[0],people,language});
 return [
 make('serbia-late','塞尔维亚：摩拉瓦与多瑙河地域',s.serbia,s.serbiaNote,'#bd9288',[20.9,43.7],[[19,42.8],[22.5,44.9]],'巴尔干内陆，摩拉瓦河向北注入多瑙河；克鲁舍瓦茨在内陆，斯梅代雷沃在北面的多瑙河畔。贝尔格莱德在更西北，单列城市比较。',['摩拉瓦方向的固定阅读核心，不是整个塞尔维亚帝国疆界','斯梅代雷沃随年份有新建、失守与恢复阶段','新布尔多、普里兹伦与科索沃战场在南侧，属于比较点，不据链接视作同一君主直辖'],[['krusevac','克鲁舍瓦茨：拉扎尔的政治中心'],...(year>=1381?[['smederevo','斯梅代雷沃：从旧聚落到新王城'] as [string,string]]:[]),['belgrade','贝尔格莱德：匈牙利与斯特凡的不同阶段'],['novo-brdo','新布尔多：矿城与1439之后的抵抗'],['prizren','普里兹伦：王庭与商人'],...(year>=1389?[['kosovo-field','科索沃：1389会战位置'] as [string,string]]:[])],'帝国阶段1346—1371；摩拉瓦地方政权与1402授号另分；1459最后失守在本段以后','王公、地方领主、教士、矿工、商人及乡村居民权利不同。新布尔多有正教和天主教教堂遗存及商旅网络；不据统治家族推导所有居民祖源。','西里尔字母、教会与事务书写需要分别看。1412矿业法现存较晚抄本，不当作每一年全地域居民的母语调查。'),
 make('bosnia-late','波斯尼亚：班、王权与地方领主',s.bosnia,s.bosniaNote,'#b7ac7d',[17.8,44.5],[[16.3,43.4],[19.2,45]],'亚得里亚海以东的山地内陆，以波斯纳河流域的维索科、博博瓦茨和更西侧亚伊采定位。海岸的杜布罗夫尼克另有制度。',['中部山地的阅读核心，不含全部王国领地与临海主张','维索科山下商镇、山上城堡与王廷驻地分开','地方家族领地、王号和奥斯曼影响不能合成统一直辖'],[['visoko','维索科：商镇、城堡与议会'],['bobovac','博博瓦茨：王城遗址'],...(year>=1396?[['jajce','亚伊采：河谷、城堡与王廷'] as [string,string]]:[]),['dubrovnik','杜布罗夫尼克：独立制度比较点']],'1377由班的称号转入王国阶段；1463征服尚未发生','石碑墓葬传统见于天主教、东正教和波斯尼亚教会社群。共享文化不等于一种祖源，更不能把本阶段居民全部写成现代穆斯林身份。','1404赫瓦尔抄本提供教会斯拉夫语波斯尼亚抄写传统样本，使用西里尔字母；不是现代国家语言分布，也不倒填为1360已存在的抄本。'),
 make('tarnovo-late','特尔诺沃：保加利亚王权与奥斯曼',s.tarnovo,s.tarnovoNote,'#91ada2',[25.3,43.3],[[24.3,42.6],[26.7,44]],'巴尔干山脉北侧，特尔诺沃在扬特拉河曲附近；多瑙河沿岸的尼科波利斯在西北，黑海岸瓦尔纳更偏东。',['特尔诺沃王权与教会中心的固定阅读核心','维丁另列，不把地方帝号合成唯一统治者','尼科波利斯为沿河事件点，瓦尔纳是东侧比较点'],[['tarnovo','特尔诺沃：王权、抄写与1393陷落'],...(year>=1396?[['nicopolis-1396','尼科波利斯：1396会战'] as [string,string]]:[]),...(year>=1444?[['varna','瓦尔纳：1444会战'] as [string,string]]:[]),['vidin','维丁：另一处地方王权']],'本王权中心1393陷落；希什曼1395死亡，两个终点分开','王廷、教会人员、手工业者及乡村居民分别存在。奥斯曼征服不等于全体居民同日变成土耳其人或改宗。','1355—1356四福音书是古教会斯拉夫语和西里尔字母书写样本，可能抄于特尔诺沃但地点未证实；不能据此统计全城口语。'),
 make('vidin-late','维丁：地方王权与奥斯曼',s.vidin,s.vidinNote,'#b5a0bf',[23.1,44.1],[[22.1,43.4],[24.3,44.5]],'在特尔诺沃以西、多瑙河南岸，面对通往中欧的河道。维丁不是特尔诺沃的另一个名字，也不是尼科波利斯战场同一地点。',['维丁城市与多瑙河方向的阅读核心','1365—1369匈牙利占领与1396前后奥斯曼征服分别理解','王号延续的争论不直接画成独立国家实控疆界'],[['vidin','维丁：地方王权、征服与争议'],['tarnovo','特尔诺沃：比较另一中心'],['belgrade','贝尔格莱德：多瑙河上游比较']],'14世纪地方王权；通常以1396作为征服转折，延续主张有研究分歧','地方宫廷、教士与商旅各有身份；王朝和教会隶属变化不等于整城人口更换。','维丁文集有1360题记传统，但现存根特MS408可能为15世纪初抄本。题记、保存抄本和本年口语不是同一层证据。'),
 ];
}
