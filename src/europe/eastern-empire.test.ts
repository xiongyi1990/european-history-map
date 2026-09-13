import {describe,it,expect} from 'vitest';
import {easternRegions,easternNodes} from './EasternEmpire';
import {ancientPlaces} from './model';
describe('eastern empire navigation data',()=>{
 it('connects every regional city to an existing map place',()=>{
  for(const region of easternRegions){
   expect(region.cities.length).toBe(region.cityNames.length);
   for(const id of region.cities)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);
  }
 });
 it('keeps event nodes chronological including the exile and restoration',()=>{
  const years=easternNodes.map(n=>n.year);expect(years).toEqual([...years].sort((a,b)=>a-b));expect(years).toContain(1204);expect(years).toContain(1261);
 });
});
