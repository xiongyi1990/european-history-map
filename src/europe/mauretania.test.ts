import {administration395ById} from './administration-395';
import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingRegionById,readingCityRegionAt} from './reading-centuries';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import {administrativeGroupsAt} from './administrative-groups-395';
const ids=['tingis','caesarea-mauretania','sitifis'];
describe('Mauretanian regional distinctions',()=>{
 it('preserves unique records, city links and geographic membership throughout AD 300–500',()=>{
  for(let y=300;y<=500;y++){
   const regions=readingRegionsAt(y),parent=readingRegionById('mauretania',y)!;
   for(const id of ['tingitana','caesariensis','sitifensis']){
    expect(regions.filter(r=>r.id===id)).toHaveLength(1);
    const r=readingRegionById(id,y)!;
    expect(r.parent).toBe(parent.id);
    for(const city of r.cities){
     expect(parent.cities).toContain(city);expect(readingCityRegionAt(city,y)).toBe(id);
     expect(historicalDetails.filter(d=>d.placeId===city&&d.from<=y&&d.to>=y),`${y}:${city}`).toHaveLength(1);
    }
    for(const source of r.sources)expect(historySources[source]).toBeDefined();
   }
   for(const id of ids){
    const d=historicalDetail(id,y)!;
    for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const source of f.sources)expect(historySources[source]).toBeDefined();
   }
  }
  for(const id of ids){
   expect(ancientPlaces.filter(p=>p.id===id)).toHaveLength(1);
   expect(historicalDetail(id,299)).toBeUndefined();expect(historicalDetail(id,501)).toBeUndefined();
  }
  for(const y of [299,501])expect(readingRegionsAt(y).some(r=>['tingitana','caesariensis','sitifensis'].includes(r.id))).toBe(false);
 });
 it('keeps cross-strait administration separate from eastern Africa and from actual city control',()=>{
  expect(administration395ById('gaul')?.regions.map(([id])=>id)).toContain('tingitana');
  expect(administration395ById('gaul')?.regions.map(([id])=>id)).not.toContain('mauretania');
  const spains=administrativeGroupsAt('gaul',395).find(g=>g.id==='spains')!;
  const africa=administrativeGroupsAt('italy',395).find(g=>g.id==='african-provinces')!;
  expect(spains.regions.map(([id])=>id)).toContain('tingitana');
  expect(spains.regions.map(([id])=>id)).not.toContain('caesariensis');
  expect(africa.regions.map(([id])=>id)).toEqual(expect.arrayContaining(['caesariensis','sitifensis']));
  expect(africa.regions.map(([id])=>id)).not.toContain('tingitana');
  expect(historicalDetail('volubilis',395)?.polity.text).toContain('撤出');
  expect(historicalDetail('tingis',395)?.polity.text).toContain('列入西班牙管区');
  expect(historicalDetail('tingis',429)?.polity.text).toContain('不等于各城同时易主');
  expect(historicalDetail('caesarea-mauretania',439)?.polity.text).toContain('迦太基易手发生在更东面');
  expect(historicalDetail('sitifis',442)?.polity.text).toContain('不代表旧行政体系');
  expect(historicalDetail('cirta',395)?.related).toContain('sitifis');
 });
});
