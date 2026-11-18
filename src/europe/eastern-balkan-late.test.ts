import {describe,it,expect} from 'vitest';
import {easternBalkanPlaces,easternBalkanDetails} from './eastern-balkan-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionPlaceIds,partitionCityRealmAt,partitionLabels} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
const r=(y:number,id:string)=>partitionRealmAt(y,id)!;
const d=(id:string,y:number)=>historicalDetail(id,y)!;
describe('Albanian local powers and Moldavian central courts',()=>{
 it('connects both cores and all seven cities only at the existing moments',()=>{
  expect(easternBalkanPlaces).toHaveLength(7);expect(easternBalkanDetails).toHaveLength(189);
  for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(44);expect(partitionPlaceIds(y)).toEqual(expect.arrayContaining(easternBalkanPlaces.map(p=>p.id)));for(const name of ['阿尔巴尼亚：克鲁亚','摩尔达维亚'])expect(partitionLabels(y).some(l=>l.name===name)).toBe(true);}
  for(const p of easternBalkanPlaces)expect(ancientPlaces.filter(x=>x.id===p.id),p.id).toHaveLength(1);
  for(const c of easternBalkanDetails){expect(d(c.placeId,c.from).id,c.id).toBe(c.id);for(const k of c.related)expect(ancientPlaces.some(p=>p.id===k),k).toBe(true);for(const field of [c.polity,c.territory,c.people,c.language,c.nameNote])for(const k of field.sources)expect(historySources[k]?.url,k).toMatch(/^https:/);}
  expect(partitionAt(1443)).toBeUndefined();expect(partitionRealmAt(1356,'albania-late')).toBeUndefined();
 });
 it('keeps mercenary interruption and the three Venetian city transfers distinct',()=>{
  expect(d('durres',1364).polity.text).toContain('1368才');expect(d('durres',1377).polity.text).toContain('路易同年已死');expect(d('durres',1378).polity.text).toContain('待核');expect(d('durres',1381).polity.text).toContain('连续占城');expect(d('durres',1385).polity.text).toContain('9月败亡之后');
  expect(d('shkoder',1386).polity.text).toContain('乔治二世');
  for(const y of medievalTransitionYears.filter(y=>y>=1396)){expect(d('durres',y).polity.text).toContain('1392');expect(d('shkoder',y).polity.text).toContain('1396');expect(d('lezhe',y).polity.text).toContain('1393');for(const id of ['durres','shkoder','lezhe'])expect(partitionCityRealmAt(y,id)).toBeUndefined();}
 });
 it('does not turn Ottoman suzerainty, office or a tax register into uniform control',()=>{
  expect(d('kruja',1396).polity.text).toContain('地方代理');expect(d('kruja',1409).polity.text).toContain('待核');expect(d('kruja',1415).polity.text).toContain('重占');expect(d('kruja',1431).polity.text).toContain('希齐尔');expect(d('kruja',1439).polity.text).toContain('体系内任职');expect(d('kruja',1440).polity.text).toContain('转任');
  expect(d('kruja',1429).people.text).toContain('本节点之后');expect(d('kruja',1431).people.text).toContain('税役类别');expect(d('kruja',1435).people.text).toContain('不代表所有居民');
 });
 it('distinguishes alliance leadership, failed siege and a real foreign garrison',()=>{
  expect(d('lezhe',1444).polity.text).toContain('威尼斯莱什');expect(d('lezhe',1444).polity.text).toContain('而非全境国王');expect(d('kruja',1450).polity.text).toContain('10月26日撤离');expect(d('kruja',1453).polity.text).toContain('加泰罗尼亚驻军');expect(d('kruja',1453).polity.text).toContain('不证明全阿尔巴尼亚');expect(partitionCityRealmAt(1453,'kruja')?.id).toBe('albania-late');
 });
 it('preserves early dating, numbering and Moldavian divisions instead of annexing by homage',()=>{
  expect(r(1360,'moldavia-late').status).toContain('不强行');expect(r(1364,'moldavia-late').status).toContain('1360—1365');expect(r(1386,'moldavia-late').status).toContain('1387');expect(r(1389,'moldavia-late').status).toContain('不是波兰直接');expect(r(1399,'moldavia-late').ruler).toBe('尤加');
  expect(r(1435,'moldavia-late').status).toContain('8月26日');expect(r(1439,'moldavia-late').status).toContain('大印和小印');expect(r(1444,'moldavia-late').ruler).toBe('斯特凡二世');expect(r(1450,'moldavia-late').ruler).toBe('博格丹二世');expect(r(1453,'moldavia-late').ruler).toContain('亚历山德鲁二世');expect(d('siret',1453).polity.text).toContain('不是已在锡雷特');
 });
 it('dates documentary, church and archaeological evidence without inventing populations',()=>{
  expect(d('suceava',1360).polity.text).toContain('不倒填1360');expect(d('suceava',1386).language.text).toContain('在本节点之后');expect(d('suceava',1389).language.text).toContain('不证明所有居民');expect(d('suceava',1399).people.sources).not.toContain('eastMoldaviaChurch');expect(d('suceava',1402).people.text).toContain('现代译文');
  expect(d('siret',1364).people.text).toContain('晚于本节点');expect(d('siret',1377).language.text).toContain('不意味着所有居民');expect(d('siret',1420).polity.text).toContain('尚未发生');expect(d('siret',1422).polity.text).toContain('终身');expect(d('baia',1410).people.text).toContain('确切建年未知');expect(d('baia',1414).people.text).toContain('调查命令');expect(d('baia',1431).language.text).toContain('反胡斯派书信');
 });
});
