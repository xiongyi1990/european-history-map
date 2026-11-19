import {describe,it,expect} from 'vitest';
import {moldavianRiverPlaces,moldavianRiverDetails} from './moldavian-rivers';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionPlaceIds,partitionCityRealmAt} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
const d=(id:string,y:number)=>historicalDetail(id,y)!;
describe('Moldavian river cities: local control and dated evidence',()=>{
 it('connects four comparison cities and all sources without making new European frontiers',()=>{
  expect(moldavianRiverPlaces).toHaveLength(4);expect(moldavianRiverDetails).toHaveLength(118);
  for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(44);expect(partitionPlaceIds(y)).toEqual(expect.arrayContaining(moldavianRiverPlaces.map(p=>p.id)));for(const p of moldavianRiverPlaces)expect(partitionCityRealmAt(y,p.id)).toBeUndefined();}
  for(const p of moldavianRiverPlaces)expect(ancientPlaces.filter(x=>x.id===p.id),p.id).toHaveLength(1);
  for(const c of moldavianRiverDetails){expect(d(c.placeId,c.from).id,c.id).toBe(c.id);for(const id of c.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const field of [c.polity,c.territory,c.people,c.language,c.nameNote])for(const key of field.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);}
  expect(new Set(moldavianRiverDetails.map(c=>c.id)).size).toBe(118);
 });
 it('keeps early uncertainty, document dates and local offices distinct',()=>{
  expect(d('cetatea-alba',1360).people.text).toContain('1361蜂蜜交易在本节点之后');expect(d('cetatea-alba',1389).polity.text).toContain('1390年代');expect(d('cetatea-alba',1402).polity.text).toContain('不能在本节点提前');expect(d('cetatea-alba',1409).polity.text).toContain('全文不明');
  expect(d('cetatea-alba',1440).polity.text).toContain('未进一步限定');expect(d('cetatea-alba',1444).polity.text).toContain('尤尔吉奇');expect(d('cetatea-alba',1450).polity.text).toContain('不冒充1450');expect(d('cetatea-alba',1453).polity.text).toContain('1月26日斯坦丘');
 });
 it('does not equate a promise or a central prince with the Khotyn garrison',()=>{
  expect(d('khotyn',1396).polity.text).toContain('在本节点之后');expect(d('khotyn',1435).polity.text).toContain('还在本节点之后');expect(d('khotyn',1439).polity.text).toContain('未交付');expect(d('khotyn',1444).polity.text).toContain('伊利亚什');expect(d('khotyn',1450).polity.text).toContain('对抗博格丹二世');
  expect(partitionRealmAt(1450,'moldavia-late')?.ruler).toBe('博格丹二世');expect(d('khotyn',1453).territory.text).toContain('1460—1470');expect(d('khotyn',1453).territory.text).toContain('不能称为黑海海港');
 });
 it('keeps Chilia uncertain before1448 and separates military supply from town government',()=>{
  expect(d('chilia',1409).polity.text).toContain('1408—1411');expect(d('chilia',1414).polity.text).toContain('未实际实施');expect(d('chilia',1439).polity.text).toContain('不能提前');expect(d('chilia',1450).polity.text).toContain('瓦拉几亚税关');expect(d('chilia',1453).polity.text).toContain('1453年4月');expect(d('chilia',1453).polity.text).toContain('未直接核原件');
  expect(d('chilia',1360).territory.text).toContain('只代表河段');expect(d('chilia',1360).nameNote.text).toContain('不能无条件合并');expect(d('chilia',1453).language.text).toContain('法文提要');
 });
 it('does not annex Lviv through a trade link or backdate its later buildings',()=>{
  expect(d('lviv',1360).polity.text).toContain('卡齐米日三世');expect(d('lviv',1377).polity.text).toContain('奥波莱');expect(d('lviv',1378).polity.text).toContain('交接月份');expect(d('lviv',1386).polity.text).toContain('1387波兰接收尚未');expect(d('lviv',1389).polity.text).toContain('1387转回');expect(d('lviv',1435).polity.text).toContain('1434');
  expect(d('lviv',1360).territory.text).toContain('不能提前');expect(d('lviv',1439).territory.text).toContain('1437拱廊');expect(d('lviv',1453).people.text).toContain('不能等同现代国籍');
 });
 it('adds five local evidence years while keeping surrounding Europe unreviewed',()=>{
  for(const y of [1408,1436,1448,1465,1484]){expect(partitionAt(y)).toBeUndefined();expect(partitionAreas(y).features).toHaveLength(0);}
  for(const id of ['suceava','lviv','khotyn','cetatea-alba']){expect(d(id,1408).polity.text).toContain('未直接查验原始特许全文');expect(d(id,1408).territory.text).toContain('没有新增全欧洲');}
  expect(d('suceava',1408).nameNote.text).not.toContain('Lviv');expect(d('khotyn',1436).polity.text).toContain('未实施');expect(d('chilia',1448).polity.text).toContain('换取胡尼亚迪军援');expect(d('chilia',1465).polity.text).toContain('1462尝试失败');expect(d('chilia',1465).polity.text).toContain('1479');
  expect(d('chilia',1484).polity.text).toContain('7月');expect(d('cetatea-alba',1484).polity.text).toContain('8月');expect(d('cetatea-alba',1484).polity.text).toContain('不据此自动改变苏恰瓦');
 });
});
