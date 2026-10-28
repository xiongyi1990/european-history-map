import {describe,it,expect} from 'vitest';
import {partitionAt,partitionFrames,partitionYears,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionPlaceIds,partitionCityRealmAt} from './frankish-partition-map';
import {ancientPlaces} from './model';
describe('event-year partition atlas',()=>{
 it('has matching clickable areas, labels and real gazetteer anchors at all four stages',()=>{
  for(const [i,year] of partitionYears.filter(y=>y<900).entries()){
   const frame=partitionAt(year)!;
   expect(frame.realms.length).toBe([3,5,3,4][i]);
   expect(partitionAreas(year).features.map(f=>f.properties?.atlasId).sort()).toEqual(partitionLabels(year).map(l=>l.id).sort());
   for(const f of partitionAreas(year).features){expect(f.properties?.year).toBe(year);expect(f.properties?.precision).toBe('schematic');expect(f.properties?.schematic).toBe(true);expect(f.properties?.name).toBeTruthy();}
   for(const id of partitionPlaceIds(year))expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);
  }
 });
 it('does not borrow event-year geometry, polities or cities for an unreviewed year',()=>{
  for(const y of [842,844,854,856,869,871,879,881,901,912,926,963,988,1001]){expect(partitionAt(y)).toBeUndefined();expect(partitionAreas(y).features).toEqual([]);expect(partitionLabels(y)).toEqual([]);expect(partitionPlaceIds(y)).toEqual([]);expect(partitionCityRealmAt(y,'aachen')).toBeUndefined();}
  expect(partitionRealmAt(855,'middle-francia')).toBeUndefined();
 });
 it('distinguishes linked comparison cities from membership and preserves actual transitions',()=>{
  expect(partitionCityRealmAt(843,'lyon')?.id).toBe('middle-francia');
  expect(partitionCityRealmAt(855,'lyon')?.id).toBe('provence');
  expect(partitionCityRealmAt(870,'lyon')?.id).toBe('west-francia');
  expect(partitionCityRealmAt(870,'arles')?.id).toBe('italy');
  expect(partitionCityRealmAt(880,'lyon')?.id).toBe('provence');
  expect(partitionCityRealmAt(843,'aachen')?.id).toBe('middle-francia');
  expect(partitionCityRealmAt(855,'aachen')?.id).toBe('lotharingia');
  expect(partitionCityRealmAt(880,'aachen')?.id).toBe('east-francia');
  for(const year of partitionYears)expect(partitionCityRealmAt(year,'rome')).toBeUndefined();
 });
 it('exposes course background separately from external event sources and 880 composite kingship',()=>{
  for(const frame of partitionFrames.filter(f=>f.year<900)){expect(frame.reading.map(r=>r.chapter)).toEqual([143,144]);expect(frame.note).toContain('概略示意');}
  expect(partitionAt(880)?.note).toContain('没有细分');
  expect(partitionRealmAt(880,'italy')?.dates).toContain('881');
  expect(partitionRealmAt(880,'provence')?.ruler).toBe('博索');
 });
});
