import {describe,it,expect} from 'vitest';
import {iberianLateDetails,iberianLatePlaces} from './iberian-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionBoundsAt} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import progress from './atlas-progress-summary.json';
describe('late medieval Iberian crowns and local institutions',()=>{
 it('adds five distinct cores and their resolvable Chinese cities only to reviewed moments',()=>{
  expect(iberianLatePlaces).toHaveLength(13);for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(22);for(const id of ['castile-crown','aragon-crown','portugal-late','navarre-late','granada-late'])expect(partitionRealmAt(y,id)).toBeDefined();expect(partitionLabels(y).some(l=>l.name==='葡萄牙')).toBe(true);}
  expect(partitionBoundsAt(1385)[0][0]).toBeLessThan(-9);expect(partitionRealmAt(1356,'castile-crown')).toBeUndefined();expect(partitionAt(1384)).toBeUndefined();
  for(const d of iberianLateDetails){expect(historicalDetail(d.placeId,d.from)?.id,d.id).toBe(d.id);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const key of [...d.polity.sources,...d.language.sources,...d.people.sources])expect(historySources[key].url).toMatch(/^https:/);}
  expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);
 });
 it('distinguishes the Portuguese crisis, March1386 and a later overseas outpost',()=>{
  expect(partitionRealmAt(1381,'portugal-late')?.ruler).toContain('费尔南多');expect(partitionRealmAt(1385,'portugal-late')?.ruler).toContain('若昂');expect(historicalDetail('lisbon',1386)?.polity.text).toContain('5月9日尚未');expect(historicalDetail('ceuta',1414)).toBeUndefined();expect(historicalDetail('ceuta',1415)?.territory.text).toContain('北非');expect(historicalDetail('ceuta',1415)?.polity.text).toContain('葡萄牙');expect(partitionRealmAt(1450,'portugal-late')?.ruler).toContain('亲政');
 });
 it('separates the Aragonese vacancy, Caspe, coronation and later succession',()=>{
  expect(partitionRealmAt(1410,'aragon-crown')?.ruler).toContain('王位空缺');expect(partitionRealmAt(1414,'aragon-crown')?.ruler).toContain('1412—1416');expect(historicalDetail('caspe',1414)?.polity.text).toContain('1412年6月28日');expect(partitionRealmAt(1417,'aragon-crown')?.ruler).toContain('1416—1458');expect(partitionRealmAt(1402,'castile-crown')?.ruler).toContain('恩里克三世');expect(partitionRealmAt(1402,'castile-crown')?.status).toContain('恩里克三世');expect(partitionRealmAt(1453,'castile-crown')?.ruler).toContain('胡安二世');
 });
 it('changes Pamplona municipal structure without erasing the Navarre inheritance dispute',()=>{
  expect(historicalDetail('pamplona',1422)?.territory.text).toContain('联合之前');expect(historicalDetail('pamplona',1429)?.territory.text).toContain('联合文书后');expect(partitionRealmAt(1444,'navarre-late')?.ruler).toContain('卡洛斯');expect(partitionRealmAt(1453,'navarre-late')?.status).toContain('内战');expect(partitionRealmAt(1453,'navarre-late')?.geography).toContain('山北');
 });
 it('keeps uncertain Granadan transitions explicit and confines languages and community evidence to their scope',()=>{
  expect(partitionRealmAt(1360,'granada-late')?.ruler).toContain('待核');expect(partitionRealmAt(1389,'granada-late')?.ruler).toContain('穆罕默德五世');expect(partitionRealmAt(1409,'granada-late')?.ruler).toContain('优素福三世');expect(partitionRealmAt(1429,'granada-late')?.ruler).toContain('须细核');expect(partitionRealmAt(1453,'granada-late')?.ruler).toContain('年内更替');expect(historicalDetail('granada',1435)?.language.sources).toContain('iberianArabic');expect(historicalDetail('barcelona',1435)?.language.sources).toContain('iberianAragonese');expect(historicalDetail('toledo',1364)?.people.sources).toContain('iberianToledo');
 });
});
