import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingRegionById,readingCityRegionAt} from './reading-centuries';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {administrativeGroupsAt} from './administrative-groups-395';
import {administration395ById} from './administration-395';
describe('Libyan coastal reading geography',()=>{
 it('extends both existing regional ids through 300–500 with unique, dated city records',()=>{
  for(let y=300;y<=500;y++)for(const id of ['tripolitania400','cyrenaica400']){
   expect(readingRegionsAt(y).filter(r=>r.id===id)).toHaveLength(1);
   const r=readingRegionById(id,y)!;
   for(const city of r.cities){
    expect(readingCityRegionAt(city,y)).toBe(id);
    expect(readingRegionById('libya',y)?.cities).toContain(city);
    const records=historicalDetails.filter(d=>d.placeId===city&&d.from<=y&&d.to>=y);
    expect(records,`${y}:${city}`).toHaveLength(1);
    for(const f of [records[0].polity,records[0].territory,records[0].people,records[0].language,records[0].nameNote])for(const source of f.sources)expect(historySources[source]).toBeDefined();
   }
  }
  for(const y of [299,501])for(const id of ['sabratha','apollonia-cyrenaica'])expect(historicalDetail(id,y)).toBeUndefined();
 });
 it('separates western Africa from the Egyptian directory and preserves earthquake chronology',()=>{
  const west=administrativeGroupsAt('italy',395).find(g=>g.id==='african-provinces')!;
  const east=administrativeGroupsAt('east',395).find(g=>g.id==='egyptian-provinces')!;
  expect(west.regions.map(([id])=>id)).toContain('tripolitania400');
  expect(east.regions.map(([id])=>id)).toContain('cyrenaica400');
  expect(west.regions.map(([id])=>id)).not.toContain('cyrenaica400');
  expect(east.regions.map(([id])=>id)).not.toContain('tripolitania400');
  expect(administration395ById('italy')?.regions.map(([id])=>id)).toContain('tripolitania400');
  expect(administration395ById('east')?.regions.map(([id])=>id)).toContain('cyrenaica400');
  expect(historicalDetail('sabratha',364)?.people.text).not.toContain('365 年地震');
  expect(historicalDetail('sabratha',365)?.people.text).toContain('365 年地震');
  expect(historicalDetail('sabratha',429)?.polity.text).toContain('不能把渡海之年');
  expect(historicalDetail('apollonia-cyrenaica',439)?.polity.text).toContain('不意味着这里同时转入汪达尔');
  expect(historicalDetail('apollonia-cyrenaica',395)?.polity.text).not.toContain('439 年');
 });
});
