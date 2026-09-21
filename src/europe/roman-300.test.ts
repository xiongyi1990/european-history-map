import {describe,it,expect} from 'vitest';
import raw300 from '../../public/historical-boundaries/world_300.geojson?raw';
import {makeAreas,ancientPlaces} from './model';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {roman300Details} from './roman-300';
import {roman300Boundaries,tetrarchNames} from './roman-300-boundaries';
const snapshot=JSON.parse(raw300) as GeoJSON.FeatureCollection;
describe('AD 300 real boundary snapshot and reading content',()=>{
 it('shows all four Roman divisions by default as one empire and preserves original geometry',()=>{
  const areas=makeAreas(snapshot,false,300);
  const roman=areas.filter(a=>tetrarchNames.includes(a.original));
  expect(roman).toHaveLength(4);
  expect(roman.every(a=>a.kind==='polity'&&a.name.startsWith('罗马帝国'))).toBe(true);
  expect(new Set(roman.map(a=>a.color)).size).toBe(1);
  for(const a of roman)expect(a.feature.geometry).toEqual(snapshot.features.find(f=>f.properties?.name===a.original)?.geometry);
  expect(roman.find(a=>a.original==='Rome (Constantinus)')?.context?.membership).toContain('君士坦提乌斯一世');
  expect(areas.find(a=>a.original==='Saami')?.kind).toBe('reference');
 });
 it('quarantines the stale Parthian outline only in the 300 snapshot',()=>{
  const corrected=makeAreas(snapshot,false,300).find(a=>a.original==='Parthian Empire')!;
  expect(corrected.kind).toBe('reference');expect(corrected.name).toContain('待核对');
  expect(corrected.context?.membership).toContain('萨珊帝国');
  const earlier=makeAreas(snapshot,false,200).find(a=>a.original==='Parthian Empire')!;
  expect(earlier.kind).toBe('polity');expect(earlier.name).toBe('帕提亚帝国');expect(earlier.context).toBeUndefined();
 });
 it('resolves all regional links at the same year without duplicate records',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  for(const context of Object.values(roman300Boundaries))for(const [id] of context.places){
   expect(ids.has(id),id).toBe(true);
   expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=300&&d.to>=300),id).toHaveLength(1);
  }
  for(const d of roman300Details){
   expect(ids.has(d.placeId)).toBe(true);
   for(const id of d.related)expect(ids.has(id),id).toBe(true);
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]).toBeDefined();
  }
 });
 it('distinguishes Byzantium before 330 and the Roman border from Sasanian territory',()=>{
  expect(historicalDetail('byzantium',300)?.title).toBe('拜占庭城');
  expect(historicalDetail('byzantium',400)?.title).toBe('君士坦丁堡');
  expect(historicalDetail('nisibis',300)?.polity.text).toContain('罗马帝国');
  expect(historicalDetail('ctesiphon',300)?.polity.text).toContain('萨珊帝国');
  expect(historicalDetail('ctesiphon',299)).toBeUndefined();
 });
});
