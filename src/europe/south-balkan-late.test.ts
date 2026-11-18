import {describe,it,expect} from 'vitest';
import {southBalkanPlaces,southBalkanDetails} from './south-balkan-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionPlaceIds,partitionCityRealmAt,partitionLabels} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
const r=(y:number,id:string)=>partitionRealmAt(y,id)!;
const d=(id:string,y:number)=>historicalDetail(id,y)!;
describe('Mistra and Wallachia: provinces, divided courts and evidence',()=>{
 it('connects every new city and source without manufacturing extra exact years',()=>{
  expect(southBalkanPlaces).toHaveLength(9);expect(southBalkanDetails).toHaveLength(243);
  for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(44);expect(partitionPlaceIds(y)).toEqual(expect.arrayContaining(southBalkanPlaces.map(p=>p.id)));for(const n of ['摩里亚：米斯特拉','瓦拉几亚'])expect(partitionLabels(y).some(l=>l.name===n)).toBe(true);}
  for(const p of southBalkanPlaces)expect(ancientPlaces.filter(x=>x.id===p.id),p.id).toHaveLength(1);
  for(const c of southBalkanDetails){expect(d(c.placeId,c.from).id,c.id).toBe(c.id);for(const k of c.related)expect(ancientPlaces.some(p=>p.id===k),k).toBe(true);for(const field of [c.polity,c.territory,c.people,c.language,c.nameNote])for(const k of field.sources)expect(historySources[k]?.url,k).toMatch(/^https:/);}
  expect(partitionAt(1446)).toBeUndefined();expect(partitionRealmAt(1356,'morea-late')).toBeUndefined();
 });
 it('does not let the capital fall annex the Morea or the Venetian ports',()=>{
  expect(r(1453,'morea-late').ruler).toContain('德米特里奥斯');expect(r(1453,'morea-late').status).toContain('1460才陷落');expect(d('acorinth',1453).polity.text).toContain('1458');
  for(const y of medievalTransitionYears){expect(d('methoni',y).polity.text).toContain('威尼斯');expect(d('koroni',y).polity.text).toContain('1500');expect(partitionCityRealmAt(y,'methoni')).toBeUndefined();expect(partitionCityRealmAt(y,'giurgiu')).toBeUndefined();expect(partitionCityRealmAt(y,'mystras')?.id).toBe('morea-late');}
 });
 it('keeps provisional governance, brothers and later imperial coronation distinct',()=>{
  expect(r(1381,'morea-late').ruler).toContain('马修');expect(r(1381,'morea-late').status).toContain('1382秋');expect(r(1402,'morea-late').status).toContain('取消');expect(d('acorinth',1402).polity.text).toContain('骑士团已持有');
  expect(r(1409,'morea-late').ruler).toContain('二世');expect(r(1429,'morea-late').ruler).toContain('塞奥多罗斯二世');expect(r(1439,'morea-late').status).toContain('不证明全部居民');expect(r(1444,'morea-late').status).toContain('1449年1月6日');expect(r(1450,'morea-late').ruler).not.toContain('塞奥多罗斯二世');
 });
 it('keeps town, fortress, leases and the wall chronology separate',()=>{
  expect(d('patras',1409).polity.text).toContain('五年');expect(d('patras',1414).polity.text).toContain('不能沿用');expect(d('patras',1417).polity.text).toContain('两年');expect(d('patras',1429).polity.text).toContain('城堡尚未');expect(d('patras',1431).polity.text).toContain('1430年5月');
  expect(d('hexamilion',1422).polity.text).toContain('本节点之后');expect(d('hexamilion',1429).polity.text).toContain('1423');expect(d('hexamilion',1444).polity.text).toContain('1446');expect(d('hexamilion',1450).polity.text).toContain('1452突袭仍在');expect(d('hexamilion',1453).polity.text).toContain('1452又有入侵');
 });
 it('uses the actual year moment for Wallachia and keeps contested control visible',()=>{
  expect(r(1364,'wallachia-late').ruler).toContain('弗拉迪斯拉夫一世');expect(r(1386,'wallachia-late').ruler).toContain('丹一世');expect(r(1386,'wallachia-late').status).toContain('3月底');expect(r(1396,'wallachia-late').ruler).toContain('争位');expect(r(1397,'wallachia-late').ruler).toContain('恢复');
  expect(r(1420,'wallachia-late').ruler).toContain('拉杜二世');expect(r(1422,'wallachia-late').ruler).toContain('丹二世');expect(r(1435,'wallachia-late').status).toContain('待核');expect(r(1444,'wallachia-late').status).toContain('巴萨拉布二世间歇');expect(r(1453,'wallachia-late').ruler).toBe('弗拉迪斯拉夫二世');
  expect(d('giurgiu',1417).polity.text).toContain('1417—1420');expect(d('giurgiu',1453).polity.text).toContain('每年同一驻军');
 });
 it('distinguishes literature and document languages from resident ancestry',()=>{
  expect(d('mystras',1414).language.sources).not.toContain('southMazaris');expect(d('mystras',1415).language.text).toContain('讽刺文学');expect(d('methoni',1378).people.text).toContain('1381旅行见闻在本年之后');expect(d('methoni',1381).people.sources).toContain('southRomani');expect(d('koroni',1453).language.text).toContain('不自动等于');
  expect(d('targoviste',1399).polity.text).toContain('1403内部文书尚未');expect(d('targoviste',1409).language.text).toContain('现代译文');expect(d('targoviste',1453).polity.text).toContain('10月4日');
 });
});
