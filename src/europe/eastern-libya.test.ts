import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingRegionById,readingCityRegionAt} from './reading-centuries';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {administrativeGroupsAt} from './administrative-groups-395';
import {easternLibyaPlaces} from './eastern-libya';
describe('Eastern Libyan coastal connections',()=>{
 it('keeps both dated cities, their geography and sources connected throughout 300–500',()=>{
  for(let y=300;y<=500;y++){
   const regions=readingRegionsAt(y);expect(regions.filter(r=>r.id==='marmarica')).toHaveLength(1);
   for(const p of easternLibyaPlaces){
    const records=historicalDetails.filter(d=>d.placeId===p.id&&d.from<=y&&d.to>=y);expect(records).toHaveLength(1);
    const r=readingRegionById(readingCityRegionAt(p.id,y)!,y)!;expect(r.cities).toContain(p.id);expect(readingRegionById(r.parent!,y)?.cities).toContain(p.id);
    expect(p.coords[0]).toBeGreaterThanOrEqual(r.bounds[0][0]);expect(p.coords[0]).toBeLessThanOrEqual(r.bounds[1][0]);
    expect(p.coords[1]).toBeGreaterThanOrEqual(r.bounds[0][1]);expect(p.coords[1]).toBeLessThanOrEqual(r.bounds[1][1]);
    for(const f of [records[0].polity,records[0].territory,records[0].people,records[0].language,records[0].nameNote])for(const s of f.sources)expect(historySources[s]).toBeDefined();
   }
  }
  for(const y of [299,501]){expect(readingRegionById('marmarica',y)).toBeUndefined();for(const p of easternLibyaPlaces)expect(historicalDetail(p.id,y)).toBeUndefined();}
 });
 it('uses the eastern directory and dates the letter without inventing a capital transfer',()=>{
  const group=administrativeGroupsAt('east',395).find(g=>g.id==='egyptian-provinces')!;
  expect(group.regions.map(([id])=>id)).toContain('marmarica');for(const p of easternLibyaPlaces)expect(group.cities.map(([id])=>id)).toContain(p.id);
  expect(historicalDetail('ptolemais-libya',410)?.people.text).not.toContain('411 年');
  expect(historicalDetail('ptolemais-libya',411)?.people.text).toContain('411 年');
  expect(historicalDetail('ptolemais-libya',300)?.polity.text).toContain('确切年份有争议');
  expect(historicalDetail('paraetonium',394)?.polity.text).not.toContain('罗马东方');
  expect(historicalDetail('paraetonium',395)?.polity.text).toContain('罗马东方');
  expect(historicalDetail('paraetonium',500)?.nameNote.text).toContain('不是下埃及三角洲');
 });
});
