import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingRegionById,readingCityRegionAt} from './reading-centuries';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import {administrativeGroupsAt} from './administrative-groups-395';
describe('Numidian coastal and inland geography',()=>{
 it('resolves the existing shared region id throughout 300–500 with linked cities and valid sources',()=>{
  for(let year=300;year<=500;year++){
   const regions=readingRegionsAt(year),r=readingRegionById('numidia5',year)!;
   expect(regions.filter(r=>r.id==='numidia5')).toHaveLength(1);
   expect(r.cities).toEqual(['hippo','cirta','cuicul','timgad']);
   for(const id of r.cities){
    expect(readingCityRegionAt(id,year)).toBe(r.id);
    expect(regions.find(r=>r.id==='africa')?.cities).toContain(id);
    expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=year&&d.to>=year),`${year}:${id}`).toHaveLength(1);
   }
   for(const id of ['cirta','cuicul']){
    const d=historicalDetail(id,year)!;
    for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]).toBeDefined();
   }
  }
  for(const id of ['cirta','cuicul']){
   expect(ancientPlaces.filter(p=>p.id===id)).toHaveLength(1);
   for(const y of [299,501])expect(historicalDetail(id,y)).toBeUndefined();
  }
 });
 it('keeps coastal siege evidence separate from inland control and disambiguates modern names',()=>{
  expect(readingRegionById('numidia5',430)?.polity).toContain('希波遭围城');
  expect(historicalDetail('cirta',430)?.polity.text).toContain('尚未确定其具体交接年份');
  expect(historicalDetail('cuicul',439)?.polity.text).toContain('不是本城同年陷落');
  expect(historicalDetail('cirta',442)?.polity.text).toContain('逐年实控尚未核定');
  expect(historicalDetail('cirta',395)?.nameNote.text).toContain('不是博斯普鲁斯海峡');
  expect(historicalDetail('cuicul',395)?.nameNote.text).toContain('突尼斯的杰姆');
  const group=administrativeGroupsAt('italy',395).find(g=>g.id==='african-provinces')!;
  expect(group.regions.some(([id])=>id==='numidia5')).toBe(true);
  for(const id of ['hippo','cirta','cuicul','timgad'])expect(group.cities.some(([key])=>key===id)).toBe(true);
 });
});
