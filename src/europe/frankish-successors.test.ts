import {describe,it,expect} from 'vitest';
import {partitionAt,partitionRealmAt,partitionStageYears} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionPlaceIds,partitionCityRealmAt,partitionCityLabel} from './frankish-partition-map';
import {ancientPlaces} from './model';
describe('900–1000 regional relationship maps',()=>{
 it('matches reviewed years, regional envelopes and gazetteer anchors',()=>{
  expect(partitionStageYears(962)).toEqual([900,911,925,962,987,1000]);
  expect(partitionStageYears(880)).toEqual([843,855,870,880]);
  expect(partitionCityLabel(962,'lyon')).toBe('里昂');expect(partitionCityLabel(962,'arles')).toBe('阿尔勒');expect(partitionCityLabel(843,'lyon')).toBeUndefined();
  for(const year of partitionStageYears(962)){
   const frame=partitionAt(year)!,areas=partitionAreas(year).features;
   expect(areas).toHaveLength(year<962?6:5);
   expect(areas.map(f=>f.properties?.id).sort()).toEqual(frame.realms.map(r=>r.id).sort());
   expect(areas.map(f=>f.properties?.atlasId).sort()).toEqual(partitionLabels(year).map(r=>r.id).sort());
   for(const f of areas){expect(f.properties?.year).toBe(year);expect(f.properties?.spatialScope).toBe('regional-context');}
   for(const id of partitionPlaceIds(year))expect(ancientPlaces.some(p=>p.id===id),`${year}:${id}`).toBe(true);
   expect(frame.sources?.length).toBeGreaterThan(0);expect(frame.relationships?.length).toBeGreaterThan(0);
   for(const relation of frame.relationships??[])for(const id of relation.realmIds)expect(partitionRealmAt(year,id),id).toBeDefined();
  }
 });
 it('separates region, political affiliation and comparison points',()=>{
  for(const year of partitionStageYears(962)){
   expect(partitionCityRealmAt(year,'aachen')?.id).toBe('lotharingia');
   expect(partitionCityRealmAt(year,'pavia')?.id).toBe('italy');
   for(const id of ['rome','gniezno','esztergom','prague'])expect(partitionCityRealmAt(year,id)).toBeUndefined();
  }
  expect(partitionRealmAt(911,'lotharingia')?.color).toBe(partitionRealmAt(911,'west-francia')?.color);
  expect(partitionRealmAt(925,'lotharingia')?.color).toBe(partitionRealmAt(925,'east-francia')?.color);
  expect(partitionCityRealmAt(925,'arles')?.id).toBe('provence');
  expect(partitionCityRealmAt(962,'arles')?.id).toBe('burgundy');
  expect(partitionRealmAt(962,'upper-burgundy')).toBeUndefined();
 });
 it('does not infer regional membership for unreviewed dates',()=>{
  for(const year of [899,901,910,912,924,926,951,961,963,986,988,999,1001]){
   expect(partitionAt(year)).toBeUndefined();expect(partitionAreas(year).features).toEqual([]);expect(partitionCityRealmAt(year,'aachen')).toBeUndefined();
  }
 });
});
