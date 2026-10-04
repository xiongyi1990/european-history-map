import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingRegionById,readingCityRegionAt} from './reading-centuries';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import {administrativeGroupsAt} from './administrative-groups-395';

describe('Byzacena across the fourth and fifth centuries',()=>{
 it('connects both cities to their dated region without gaps, duplicate records or missing sources',()=>{
  for(let year=300;year<=500;year++){
   const region=readingRegionById('byzacena',year)!;
   expect(region.parent).toBe('africa');expect(region.cities).toEqual(['hadrumetum','thysdrus']);
   for(const id of region.cities){
    expect(readingCityRegionAt(id,year)).toBe('byzacena');
    const records=historicalDetails.filter(d=>d.placeId===id&&d.from<=year&&d.to>=year);
    expect(records,`${year}:${id}`).toHaveLength(1);
    expect(records[0].polity.text).toBe(region.polity);
    for(const fact of [records[0].polity,records[0].territory,records[0].people,records[0].language,records[0].nameNote])for(const source of fact.sources)expect(historySources[source]).toBeDefined();
   }
  }
  for(const id of ['hadrumetum','thysdrus']){
   expect(ancientPlaces.filter(p=>p.id===id)).toHaveLength(1);
   expect(historicalDetail(id,299)).toBeUndefined();expect(historicalDetail(id,501)).toBeUndefined();
  }
  for(const y of [299,501])expect(readingRegionsAt(y).some(r=>r.id==='byzacena')).toBe(false);
 });
 it('separates imperial administration, warfare, conquest and treaty recognition',()=>{
  expect(readingRegionById('byzacena',394)?.polity).toContain('尚不能套用');
  expect(readingRegionById('byzacena',395)?.polity).toContain('西部朝廷');
  expect(readingRegionById('byzacena',428)?.polity).not.toContain('汪达尔王国');
  expect(readingRegionById('byzacena',429)?.polity).toContain('尚未逐年确定');
  expect(readingRegionById('byzacena',439)?.polity).toContain('后续节点');
  expect(readingRegionById('byzacena',442)?.polity).toContain('442 年和约承认');
  const directory=administrativeGroupsAt('italy',395).find(g=>g.id==='african-provinces')!;
  expect(directory.regions.some(([id])=>id==='byzacena')).toBe(true);
  expect(directory.cities.some(([id])=>id==='hadrumetum')).toBe(true);
 });
});
