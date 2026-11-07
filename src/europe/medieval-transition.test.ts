import {describe,it,expect} from 'vitest';
import {medievalTransitionFrames,medievalTransitionYears} from './medieval-transition';
import {medievalTransitionDetails} from './medieval-transition-places';
import {partitionAt,partitionRealmAt,partitionStageYears} from './frankish-partitions';
import {partitionAreas,partitionPlaceIds} from './frankish-partition-map';
import {ancientPlaces} from './model';
import {historicalDetail,historySources} from './history-details';
import progress from './atlas-progress-summary.json';
describe('1360-1453 political relationships without invented annual fronts',()=>{
 it('connects exact events and twenty-nine regional envelopes with resolvable city and source links',()=>{
  expect(medievalTransitionYears).toHaveLength(27);expect(partitionStageYears(1453)).toEqual(medievalTransitionYears);expect(partitionStageYears(1356)).toHaveLength(21);
  for(const f of medievalTransitionFrames){expect(partitionAreas(f.year).features).toHaveLength(33);for(const id of partitionPlaceIds(f.year))expect(ancientPlaces.filter(p=>p.id===id),id).toHaveLength(1);for(const p of f.focusPlaces??[])expect(historicalDetail(p.placeId,f.year)?.from,p.placeId+f.year).toBe(f.year);for(const r of f.relationships??[])for(const id of r.realmIds)expect(partitionRealmAt(f.year,id)).toBeDefined();}
  expect(partitionAt(1403)).toBeUndefined();expect(partitionAreas(1454).features).toHaveLength(0);
  for(const d of medievalTransitionDetails){expect(historicalDetail(d.placeId,d.from)?.id,d.id).toBe(d.id);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const key of d.polity.sources)expect(historySources[key].url).toMatch(/^https:/);}
  expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);
 });
 it('distinguishes treaty heirs, rival kings and actual Paris and Normandy changes',()=>{
  expect(partitionRealmAt(1420,'west-francia')?.status).toContain('查理六世仍为国王');expect(partitionRealmAt(1420,'england')?.ruler).toContain('亨利五世');
  expect(historicalDetail('paris',1435)?.polity.text).toContain('1436年才');expect(historicalDetail('paris',1439)?.polity.text).toContain('查理七世');expect(historicalDetail('rouen',1450)?.polity.text).toContain('1449');expect(partitionRealmAt(1450,'gascony')?.status).not.toContain('本核心转归');expect(partitionRealmAt(1453,'gascony')?.status).toContain('本核心转归');expect(historicalDetail('calais',1453)?.polity.text).toContain('1558');
 });
 it('does not give a later imperial crown or ignore a vacancy or competing election',()=>{
  expect(partitionRealmAt(1377,'east-francia')?.ruler).toContain('瓦茨拉夫');expect(partitionRealmAt(1402,'bohemia')?.ruler).toContain('失去帝国王号不等于');expect(partitionRealmAt(1410,'east-francia')?.ruler).toContain('约布斯特');expect(partitionRealmAt(1431,'east-francia')?.ruler).toContain('1433年才');expect(partitionRealmAt(1439,'east-francia')?.ruler).toContain('王位空缺');expect(partitionRealmAt(1450,'east-francia')?.ruler).toContain('1452年才');expect(partitionRealmAt(1453,'bohemia')?.ruler).toContain('尚非国王');
 });
 it('keeps joint crowns, infant rivals and the Varna commander separate',()=>{
  expect(partitionRealmAt(1385,'poland')?.ruler).toBe('雅德维加');expect(partitionRealmAt(1386,'poland')?.ruler).toContain('雅德维加与');expect(partitionRealmAt(1386,'hungary')?.ruler).toContain('尚未在1387年');expect(partitionRealmAt(1440,'hungary')?.ruler).toContain('争位');expect(partitionRealmAt(1444,'poland')?.ruler).toContain('王位空缺');expect(partitionRealmAt(1444,'straits')?.ruler).toContain('名义苏丹');expect(partitionRealmAt(1453,'hungary')?.ruler).toContain('1452年结束摄政');
 });
 it('does not turn islands, schism traditions or mixed straits into a uniform control frontier',()=>{
  expect(partitionRealmAt(1410,'sicily')?.ruler).toContain('空缺');expect(partitionRealmAt(1399,'sicily')?.ruler).toContain('玛丽与');expect(partitionRealmAt(1402,'sicily')?.ruler).toContain('1401年已去世');expect(partitionRealmAt(1439,'south-italy')?.ruler).toContain('尚未被阿方索攻取');expect(partitionRealmAt(1444,'south-italy')?.ruler).toContain('1442');
  expect(historicalDetail('avignon',1378)?.polity.text).toContain('1379年才');expect(historicalDetail('avignon',1409)?.polity.text).toContain('1403年已离开');expect(partitionAt(1415)?.change).toContain('退位');expect(partitionRealmAt(1453,'straits')?.status).toContain('复合阅读地域');expect(partitionRealmAt(1453,'straits')?.status).toContain('1461');
 });
});
