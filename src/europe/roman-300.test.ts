import {roman300Rulers,ruler300ById} from './roman-300-rulers';
import {roman300Frontiers,frontier300Lines} from './roman-300-frontiers';
import {describe,it,expect} from 'vitest';
import raw300 from '../../public/historical-boundaries/world_300.geojson?raw';
import {makeAreas,ancientPlaces} from './model';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {roman300Details} from './roman-300';
import {roman300Boundaries,tetrarchNames} from './roman-300-boundaries';
import {roman300Regions,cityRegions300,region300ById} from './roman-300-regions';
import {roman300ExtraPlaces,roman300ExtraDetails} from './roman-300-cities';
const snapshot=JSON.parse(raw300) as GeoJSON.FeatureCollection;
describe('AD 300 real boundary snapshot and reading content',()=>{
 it('keeps Sasanian constituent regions within their empire and their cities outside Roman rule',()=>{
  const children=roman300Regions.filter(r=>r.parent==='persia');
  expect(children.map(r=>r.id).sort()).toEqual(['asoristan','khuzestan','pars']);
  for(const region of children){
   expect(region300ById(region.parent!)).toBeDefined();
   for(const id of region.cities){
    expect(cityRegions300[id]).toBe(region.id);
    expect(historicalDetail(id,300)?.polity.text).toContain('萨珊帝国');
    expect(historicalDetail(id,400)).toBeUndefined();
   }
  }
  expect(cityRegions300.nisibis).toBe('mesopotamia');
 });
 it('connects each tetrarch to the snapshot, counterpart and dated geography',()=>{
  expect(roman300Rulers.map(r=>r.original).sort()).toEqual([...tetrarchNames].sort());
  for(const r of roman300Rulers){
   expect(ruler300ById(r.partner)?.partner).toBe(r.id);
   expect(r.cities).toContain(r.seat);
   for(const id of r.cities)expect(historicalDetail(id,300),r.id+': '+id).toBeDefined();
   for(const id of r.regions)expect(region300ById(id),id).toBeDefined();
   for(const id of r.frontiers)expect(roman300Frontiers.some(f=>f.id===id),id).toBe(true);
   for(const key of r.sources)expect(historySources[key],key).toBeDefined();
  }
  expect(ruler300ById('constantius')?.role).toBe('西方副帝');
  expect(ruler300ById('galerius')?.role).toBe('东方副帝');
 });
 it('keeps frontier reading geometry dated and all cross-links resolvable',()=>{
  const lines=frontier300Lines(300,false,true);
  expect(lines.features).toHaveLength(4);
  for(const f of roman300Frontiers){
   for(const id of f.cities)expect(historicalDetail(id,300),f.id+': '+id).toBeDefined();
   for(const id of f.regions)expect(region300ById(id),f.id+': '+id).toBeDefined();
   for(const source of f.sources)expect(historySources[source],source).toBeDefined();
   expect(f.path.length).toBeGreaterThan(1);
   for(const [lon,lat] of f.path){expect(lon).toBeGreaterThan(-25);expect(lon).toBeLessThan(55);expect(lat).toBeGreaterThan(24);expect(lat).toBeLessThan(72)}
  }
  expect(frontier300Lines(400,false,true).features).toHaveLength(0);
  expect(frontier300Lines(300,true,true).features).toHaveLength(0);
  expect(frontier300Lines(300,false,false).features).toHaveLength(0);
  expect(lines.features.find(f=>f.properties?.atlasId==='frontier300:eastern-contact')?.properties?.kind).toBe('relation');
 });
 it('connects every region and new city without leaking geography or affiliations to other years',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  expect(new Set(roman300Regions.map(r=>r.id)).size).toBe(roman300Regions.length);
  for(const r of roman300Regions){
   expect(r.sources.length,r.id).toBeGreaterThan(0);
   expect(r.bounds[0][0]).toBeLessThan(r.bounds[1][0]);expect(r.bounds[0][1]).toBeLessThan(r.bounds[1][1]);
   for(const id of r.cities){expect(ids.has(id),`${r.id}: ${id}`).toBe(true);expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=300&&d.to>=300),`${r.id}: ${id} at 300`).toHaveLength(1)}
   for(const key of r.sources)expect(historySources[key]).toBeDefined();
  }
  for(const d of roman300ExtraDetails){expect(d.from).toBe(300);expect(d.to).toBe(300);expect(region300ById(cityRegions300[d.placeId]),d.id).toBeDefined()}
  for(const p of roman300ExtraPlaces){expect(p.coords[0]).not.toBe(0);expect(p.coords[1]).toBeGreaterThan(20);expect(ancientPlaces.filter(a=>a.id===p.id)).toHaveLength(1)}
  expect(historicalDetail('volubilis',300)?.polity.text).toContain('不宜继续标为罗马直接控制');
  expect(historicalDetail('jerusalem',300)?.title).toContain('埃利亚');
  expect(historicalDetail('gortyn',300)?.polity.text).toContain('罗马');
  expect(historicalDetail('gortyn',400)).toBeUndefined();
 });
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
