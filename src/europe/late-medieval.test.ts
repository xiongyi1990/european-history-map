import {describe,it,expect} from 'vitest';
import {lateMedievalFrames,lateMedievalYears,goldenBullElectors} from './late-medieval';
import {lateMedievalDetails,lateMedievalPlaces} from './late-medieval-places';
import {partitionAt,partitionRealmAt,partitionStageYears,partitionTopic,partitionYears} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionPlaceIds,partitionBoundsAt,partitionCityRealmAt} from './frankish-partition-map';
import {ancientPlaces} from './model';
import {historicalDetail,historySources} from './history-details';
import progress from './atlas-progress-summary.json';
describe('1285-1356 wars, papacy and election geography',()=>{
 it('connects exact moments and distinct twelve-region geography without interpolating other years',()=>{
  expect(lateMedievalYears).toEqual([1285,1291,1295,1297,1302,1303,1306,1308,1309,1312,1314,1317,1322,1327,1328,1337,1346,1347,1348,1355,1356]);
  expect(partitionStageYears(1356)).toEqual(lateMedievalYears);expect(partitionStageYears(1282)).toHaveLength(28);expect(partitionTopic(1356)).toBe('战争、教廷与选帝');
  for(const f of lateMedievalFrames){expect(partitionAreas(f.year).features).toHaveLength(12);expect(partitionLabels(f.year).map(l=>l.id).sort()).toEqual(partitionAreas(f.year).features.map(g=>g.properties?.atlasId).sort());for(const id of partitionPlaceIds(f.year))expect(ancientPlaces.filter(p=>p.id===id),id).toHaveLength(1);for(const relation of f.relationships??[])for(const id of relation.realmIds)expect(partitionRealmAt(f.year,id),id).toBeDefined();}
  expect(partitionBoundsAt(1356)[1][1]).toBeGreaterThan(59);for(const y of [1283,1286,1292,1300,1304,1310,1313,1315,1316,1320,1329,1340,1350,1357])expect(partitionAreas(y).features,y.toString()).toHaveLength(0);
 });
 it('keeps royal election, coronation and imperial titles at their proper moments',()=>{
  expect(partitionRealmAt(1291,'east-francia')?.ruler).toContain('阿道夫1292年才当选');expect(partitionRealmAt(1308,'east-francia')?.ruler).toContain('尚无帝号');expect(partitionAt(1312)?.eventDate).toContain('拉特朗');expect(partitionRealmAt(1327,'east-francia')?.ruler).toContain('尚无帝号');expect(partitionRealmAt(1328,'east-francia')?.ruler).toContain('城市代表');expect(partitionRealmAt(1346,'east-francia')?.ruler).toContain('波恩');expect(partitionRealmAt(1348,'east-francia')?.ruler).toContain('1355年才');expect(partitionRealmAt(1355,'east-francia')?.ruler).toContain('已获帝号');
  expect(partitionAt(1355)?.eventDate).toContain('11月');expect(partitionRealmAt(1295,'sicily')?.ruler).toContain('1296年才');expect(partitionRealmAt(1322,'sicily')?.ruler).toContain('共同王权');expect(partitionRealmAt(1337,'sicily')?.ruler).toContain('彼得二世');
 });
 it('does not erase contested island cities or invaded mainland castles',()=>{
  expect(historicalDetail('palermo',1355)?.polity.text).toContain('1354年转向安茹');expect(historicalDetail('palermo',1356)?.polity.text).not.toMatch(/^腓特烈四世/);expect(partitionRealmAt(1356,'sicily')?.status).toContain('墨西拿');expect(partitionRealmAt(1348,'south-italy')?.status).toContain('城堡');expect(partitionRealmAt(1356,'south-italy')?.ruler).toContain('塔兰托路易');expect(partitionCityRealmAt(1356,'palermo')).toBeUndefined();
 });
 it('separates migration of the papal court from the purchase and separates Scottish victory from peace',()=>{
  expect(historicalDetail('avignon',1309)?.polity.text).toContain('尚未发生1348年购城');expect(historicalDetail('avignon',1348)?.polity.text).toContain('向乔安娜购得');expect(historicalDetail('anagni',1303)?.territory.text).toContain('罗马东南');
  expect(historicalDetail('stirling',1297)?.polity.text).toContain('不是一位新加冕国王');expect(historicalDetail('bannockburn',1314)?.polity.text).toContain('1328年');expect(partitionRealmAt(1328,'scotland')?.ruler).toContain('承认王权');expect(partitionRealmAt(1346,'scotland')?.ruler).toContain('监国');
 });
 it('locates all seven electors and distinguishes election cities from an imperial seven-province map',()=>{
  expect(goldenBullElectors).toHaveLength(7);expect(new Set(goldenBullElectors.map(e=>e.placeId)).size).toBe(7);expect(partitionAt(1356)?.electors).toEqual(goldenBullElectors);expect(partitionAt(1355)?.electors).toBeUndefined();
  for(const e of goldenBullElectors){expect(partitionPlaceIds(1356)).toContain(e.placeId);expect(historicalDetail(e.placeId,1356)?.from).toBe(1356);}
  expect(historicalDetail('frankfurt',1356)?.polity.text).toContain('不是自动取得皇帝');expect(historicalDetail('poitiers-1356',1356)?.polity.text).toContain('黑太子不是爱德华三世');expect(historicalDetail('poitiers-1356',1356)?.territory.text).toContain('不是732');
 });
 it('resolves new single-year city evidence and sources without fabricating final completion',()=>{
  expect(lateMedievalPlaces).toHaveLength(16);expect(lateMedievalDetails).toHaveLength(204);
  for(const d of lateMedievalDetails){expect(historicalDetail(d.placeId,d.from)?.id,d.id).toBe(d.id);expect(d.to).toBe(d.from);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const f of [d.polity,d.territory,d.people,d.language])for(const key of f.sources)expect(historySources[key].url).toMatch(/^https:/);}
  expect(historicalDetail('bannockburn',1315)).toBeUndefined();expect(historicalDetail('heidelberg',1355)).toBeUndefined();expect(progress.politicalReadingYears).toBe(partitionYears.length);expect(progress.allReviewed).toBe(false);expect(progress.unresolvedReferenceIssues).toBe(0);
 });
});
