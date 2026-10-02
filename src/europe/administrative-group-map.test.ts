import {describe,it,expect} from 'vitest';
import {administrativeReadingGroups} from './administrative-groups-395';
import {administrativeGroupView,searchAdministrativeGroups} from './administrative-group-map';
import {ancientPlaces} from './model';
describe('administrative reading map navigation',()=>{
 it('fits every group around its referenced cities without generating borders',()=>{
  for(const g of administrativeReadingGroups){
   const view=administrativeGroupView(g,ancientPlaces)!;expect(view).toBeDefined();
   expect(view.points).toHaveLength(g.cities.length);
   for(const p of view.points)for(const axis of [0,1]){expect(p[axis]).toBeGreaterThan(view.bounds[0][axis]);expect(p[axis]).toBeLessThan(view.bounds[1][axis]);}
   expect('geometry' in view).toBe(false);
  }
 });
 it('finds a province inside its administrative group, including ambiguous repeated names',()=>{
  expect(searchAdministrativeGroups('  贝提卡 ')[0].group.id).toBe('spains');
  expect(searchAdministrativeGroups('第一、第二亚美尼亚')[0].group.id).toBe('pontic-provinces');
  expect(searchAdministrativeGroups('默西亚').map(m=>m.group.id)).toEqual(['dacian-provinces','thracian-provinces']);
  expect(searchAdministrativeGroups('')).toEqual([]);expect(searchAdministrativeGroups('不存在的行省')).toEqual([]);
 });
});
