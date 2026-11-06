import {describe,it,expect} from 'vitest';
import {nordicLateDetails,nordicLatePlaces} from './nordic-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionBoundsAt,partitionLabels} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import progress from './atlas-progress-summary.json';
describe('Nordic crowns, shared rulers and local control1360-1453',()=>{
 it('adds one explicit union moment and three distinguishable cores without interpolating neighboring years',()=>{
  expect(medievalTransitionYears).toContain(1397);expect(partitionAt(1397)?.eventDate).toContain('6月17日');expect(partitionAreas(1397).features).toHaveLength(25);expect(partitionAt(1398)).toBeUndefined();expect(partitionRealmAt(1356,'norway-late')).toBeUndefined();expect(partitionBoundsAt(1397)[1][1]).toBeGreaterThan(64);
  for(const y of medievalTransitionYears){for(const id of ['denmark-late','norway-late','sweden-late'])expect(partitionRealmAt(y,id)).toBeDefined();for(const n of ['丹麦','挪威','瑞典'])expect(partitionLabels(y).some(l=>l.name===n)).toBe(true);}
  expect(nordicLatePlaces).toHaveLength(12);for(const d of nordicLateDetails){expect(historicalDetail(d.placeId,d.from)?.id,d.id).toBe(d.id);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const k of d.polity.sources)expect(historySources[k].url).toMatch(/^https:/);}
  expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);
 });
 it('does not promote victory or royal recognition into early Stockholm occupation',()=>{
  expect(historicalDetail('stockholm',1389)?.polity.text).toContain('1398年才');expect(historicalDetail('stockholm',1397)?.polity.text).toContain('梅克伦堡');expect(historicalDetail('stockholm',1399)?.polity.text).not.toContain('仍由梅克伦堡');expect(partitionRealmAt(1396,'sweden-late')?.ruler).toContain('共同加冕尚未');expect(historicalDetail('kalmar',1397)?.polity.text).toContain('法律性质有研究分歧');
 });
 it('keeps co-rule, inheritance and country-specific deposition timing separate',()=>{
  expect(partitionRealmAt(1360,'norway-late')?.ruler).toContain('马格努斯七世分治');expect(partitionRealmAt(1381,'norway-late')?.ruler).toContain('1380年继承');expect(partitionRealmAt(1381,'denmark-late')?.ruler).toContain('奥拉夫四世');expect(partitionRealmAt(1439,'denmark-late')?.ruler).toContain('被废黜');expect(partitionRealmAt(1439,'norway-late')?.ruler).toContain('仍有王号');expect(partitionRealmAt(1440,'norway-late')?.status).toMatch(/1440.*1441.*1442.*来源差别/);expect(partitionRealmAt(1450,'sweden-late')?.ruler).toContain('已放弃挪威');expect(partitionRealmAt(1450,'norway-late')?.ruler).toContain('克里斯蒂安');
 });
 it('does not confuse regents and commanders with later kings or merge different coronations',()=>{
  expect(partitionRealmAt(1435,'sweden-late')?.ruler).toContain('军政高官');expect(partitionRealmAt(1439,'sweden-late')?.ruler).toContain('尚非卡尔八世');expect(partitionRealmAt(1440,'sweden-late')?.status).toContain('1441年9月13日');expect(partitionRealmAt(1444,'sweden-late')?.status).toContain('1441年');expect(historicalDetail('ribe',1444)?.polity.text).toContain('1443年里伯');expect(historicalDetail('oslo',1444)?.polity.text).toContain('1442年');
 });
 it('separates ports, islands, overseas ties and church transitions from royal map colors',()=>{
  expect(historicalDetail('bergen',1410)?.polity.text).toContain('汉萨商人港区');expect(historicalDetail('bergen',1410)?.people.sources).toContain('nordicBergen');expect(historicalDetail('visby',1399)?.polity.text).toContain('条顿骑士团');expect(historicalDetail('visby',1440)?.polity.text).toContain('仍控制维斯堡');expect(historicalDetail('visby',1453)?.polity.text).toContain('丹麦');expect(historicalDetail('turku',1397)?.polity.text).toContain('不是卡尔马联合内第四个');expect(historicalDetail('copenhagen',1415)?.polity.text).toContain('1417年才');expect(historicalDetail('copenhagen',1417)?.polity.text).toContain('1417年以后');expect(historicalDetail('uppsala',1431)?.polity.text).toContain('已是主教座');
 });
 it('keeps1397 southern rulers explicit and removes future royal titles from earlier frames',()=>{
  expect(partitionRealmAt(1397,'west-francia')?.ruler).toBe('查理六世');expect(partitionRealmAt(1397,'england')?.ruler).toBe('理查二世');expect(partitionRealmAt(1397,'sicily')?.ruler).toContain('玛丽与小马丁');expect(partitionRealmAt(1397,'south-italy')?.ruler).toContain('路易二世');expect(partitionRealmAt(1397,'aragon-crown')?.ruler).toContain('马丁一世');expect(partitionRealmAt(1397,'poland')?.ruler).toContain('雅德维加');expect(partitionRealmAt(1386,'west-francia')?.ruler).not.toContain('王太子查理的阵营');expect(partitionRealmAt(1360,'east-francia')?.ruler).not.toContain('瓦茨拉夫');
 });
});
