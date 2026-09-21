import {describe,it,expect} from 'vitest';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces,allBattles,battleYears} from './model';
import {normanDetails,normanPlaces,normanBattles} from './norman-century';

describe('Norman expansion without an invented pan-European Norman empire',()=>{
 it('separates conquest checkpoints from later kingdoms and reunification',()=>{
  expect(historicalDetail('rouen',1100)?.polity.text).toContain('1106');
  expect(historicalDetail('palermo',1100)?.polity.text).toContain('1130');
  expect(historicalDetail('bari',1071)?.polity.text).toContain('不是征服英格兰的威廉');
  expect(historicalDetail('manzikert',1071)?.territory.text).toContain('不能将战役结果画成全安纳托利亚一夜易主');
  for(const p of normanPlaces)expect(historicalDetail(p.id,1050)).toBeUndefined();
  expect(historicalDetail('battle',1067)).toBeUndefined();
  expect(historicalDetail('palermo',1101)).toBeUndefined();
 });
 it('resolves references and locations for every new historical record',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  for(const d of normanDetails){
   expect(ids.has(d.placeId)).toBe(true);expect(d.polity.sources.length).toBeGreaterThan(0);
   for(const id of d.related)expect(ids.has(id)).toBe(true);
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const id of f.sources)expect(historySources[id]).toBeDefined();
  }
 });
 it('opens the route in 1066 and keeps the inland battlefield separate from the coastal base',()=>{
  const b=normanBattles[0];expect(allBattles.find(v=>v.id===b.id)).toBe(b);expect(battleYears[b.id]).toBe(1066);
  const coast=b.stages[1].stops.find(s=>s.name.includes('沿海'))!;
  const field=b.stages[1].stops.find(s=>s.name.includes('巴特尔'))!;
  expect(field.coords[1]).toBeGreaterThan(coast.coords[1]);
  expect(b.stages[2].text).toContain('不能拿来判断实际进军道路');
  for(const stage of b.stages){
   expect(stage.path[0]).toEqual(stage.stops[0].coords);
   expect(stage.path[stage.path.length-1]).toEqual(stage.stops[stage.stops.length-1].coords);
  }
 });
});
