import {describe,it,expect} from 'vitest';
import {lowCountriesPlaces,lowCountriesDetails} from './low-countries-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionCityRealmAt,partitionLabels} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import progress from './atlas-progress-summary.json';
const r=(y:number,id:string)=>partitionRealmAt(y,id)!;
const d=(id:string,y:number)=>historicalDetail(id,y)!;
describe('Low Countries titles, regencies and cities1360-1453',()=>{
 it('makes the three new cores navigable without inventing other annual maps',()=>{
  expect(medievalTransitionYears).toHaveLength(27);expect(lowCountriesPlaces).toHaveLength(12);expect(lowCountriesDetails).toHaveLength(374);
  for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(40);for(const id of ['brabant-late','holland-late','hainaut-late'])expect(r(y,id)).toBeDefined();for(const name of ['布拉班特','荷兰与泽兰','埃诺'])expect(partitionLabels(y).some(p=>p.name===name)).toBe(true);}
  for(const p of lowCountriesPlaces)expect(ancientPlaces.filter(x=>x.id===p.id),p.id).toHaveLength(1);
  for(const card of lowCountriesDetails){expect(d(card.placeId,card.from)?.id,card.id).toBe(card.id);for(const id of card.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const field of [card.polity,card.territory,card.people,card.language,card.nameNote]){expect(new Set(field.sources).size).toBe(field.sources.length);for(const k of field.sources)expect(historySources[k]?.url,k).toMatch(/^https:/);}}
  expect(partitionAt(1428)).toBeUndefined();expect(partitionRealmAt(1356,'holland-late')).toBeUndefined();expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);
 });
 it('keeps Brabant ducal succession separate from temporary government and namesakes',()=>{
  expect(r(1381,'brabant-late').ruler).toContain('乔安娜');expect(r(1385,'brabant-late').status).toContain('1383');expect(r(1402,'brabant-late').status).toContain('1406');
  expect(r(1414,'brabant-late').ruler).toContain('安托万');expect(r(1415,'brabant-late').ruler).toContain('约翰四世');expect(r(1415,'brabant-late').status).toContain('10月25日');
  expect(r(1420,'brabant-late').ruler).toContain('10月1日起代理');expect(r(1422,'brabant-late').status).toContain('代理已结束');expect(r(1429,'brabant-late').ruler).toContain('圣波尔');expect(r(1429,'brabant-late').status).toContain('不是同名');expect(r(1431,'brabant-late').status).toContain('1430');
 });
 it('separates nominal counts, regents and the1428/1433 transitions',()=>{
  expect(r(1386,'holland-late').ruler).toContain('威廉五世');expect(r(1386,'holland-late').ruler).toContain('威廉三世');expect(r(1389,'holland-late').ruler).toContain('阿尔布雷希特');expect(d('mons',1389).polity.text).toContain('尚不能提前');
  expect(r(1414,'holland-late').ruler).toContain('威廉六世');expect(r(1414,'hainaut-late').ruler).toContain('威廉四世');expect(r(1417,'holland-late').status).toContain('多德雷赫特');
  expect(r(1420,'holland-late').status).toContain('质押');expect(r(1420,'hainaut-late').status).toContain('不能直接证明埃诺');expect(d('mons',1422).polity.text).toContain('1424');
  expect(d('delft',1429).polity.text).toContain('仍为女伯爵');expect(d('delft',1431).polity.text).toContain('1433年4月12日');expect(d('delft',1435).polity.text).toContain('1433杰奎琳放弃');
 });
 it('treats Antwerp, modern borders and city links independently',()=>{
  expect(d('antwerp',1402).polity.text).toContain('佛兰德伯爵');expect(d('antwerp',1409).polity.text).toContain('1405');expect(d('antwerp',1409).polity.text).toContain('1406');expect(partitionCityRealmAt(1402,'antwerp')?.id).toBe('flanders');expect(partitionCityRealmAt(1409,'antwerp')?.id).toBe('brabant-late');
  expect(d('valenciennes',1435).territory.text).toContain('现代法国');expect(d('mons',1453).territory.text).toContain('挪威卑尔根');expect(d('middelburg',1435).polity.text).toContain('泽兰是另一个伯国');
 });
 it('does not backdate peace, war, ducal titles or city rebellion',()=>{
  expect(r(1385,'flanders').status).toContain('尚未签署');expect(r(1386,'flanders').status).toContain('已经达成');expect(r(1409,'flanders').ruler).toContain('1405继佛兰德');
  expect(d('ghent',1381).polity.text).toContain('1382罗斯贝克战败尚未发生');expect(d('bruges',1439).polity.text).toContain('不是本年仍在全面叛乱');expect(d('ghent',1450).polity.text).toContain('1451公开战争');expect(d('ghent',1453).polity.text).toContain('7月23日');expect(d('gavere',1453).territory.text).toContain('Semmerzake');
 });
 it('distinguishes surviving texts, modern translations and resident languages',()=>{
  expect(d('leuven',1360).language.sources).toContain('lowCharter');expect(d('brussels',1410).people.text).not.toContain('1415召集文书');expect(d('brussels',1415).people.text).toContain('不等于全体居民普选');expect(d('the-hague',1360).language.text).toContain('1367印章尚未出现');expect(d('the-hague',1385).language.sources).toContain('lowSeal');expect(d('the-hague',1435).nameNote.text).toContain('现代荷兰语译读');
  expect(d('bruges',1399).language.text).toContain('不能精确锁定');expect(d('bruges',1409).language.text).toContain('约1460');expect(d('mons',1444).language.text).toContain('尚未形成');expect(d('mons',1450).language.sources).toContain('lowHainautBook');expect(d('ypres',1453).nameNote.text).toContain('约1610');
 });
});
