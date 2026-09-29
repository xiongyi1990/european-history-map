import {describe,it,expect} from 'vitest';
import {cities400} from './roman-400-cities';
import {questions400,west400,east400} from './roman-400';
import {fourthRegionsAt,cityRegionAt} from './fourth-century';
import {detailsAt,historicalDetail,historicalDetails,historySources} from './history-details';
import {ancientPlaces,makeAreas} from './model';
import raw400 from '../../public/historical-boundaries/world_400.geojson?raw';

describe('AD 400 detailed reading layer',()=>{
 it('provides one dated record per city with valid sources and destinations',()=>{
  const places=new Set(ancientPlaces.map(p=>p.id));
  for(const d of cities400){
   expect(detailsAt(400).filter(r=>r.placeId===d.placeId)).toHaveLength(1);
   expect(places.has(d.placeId)).toBe(true);
   for(const fact of [d.polity,d.territory,d.people,d.language,d.nameNote]){
    expect(fact.sources.length).toBeGreaterThan(0);
    for(const source of fact.sources)expect(historySources[source],source).toBeDefined();
   }
   for(const id of d.related)expect(historicalDetail(id,400),id).toBeDefined();
  }
  for(const d of historicalDetails.filter(d=>d.id.includes('-segment-'))){
   expect(d.from).toBeLessThanOrEqual(d.to);
   expect(d.focusYear).toBeGreaterThanOrEqual(d.from);expect(d.focusYear).toBeLessThanOrEqual(d.to);
  }
 });
 it('does not backdate later capitals or replace other years',()=>{
  expect(historicalDetail('ravenna',400)?.polity.text).toContain('尚不是');
  expect(historicalDetail('ravenna',402)?.polity.text).toContain('迁驻拉文纳');
  expect(historicalDetail('toulouse',400)?.polity.text).toContain('仍在罗马');
  expect(historicalDetail('toulouse',401)?.polity.text).toContain('罗马');
  expect(historicalDetail('toulouse',500)?.polity.text).toContain('西哥特');
  expect(historicalDetail('ctesiphon',400)?.polity.text).toContain('伊嗣俟一世');
  expect(historicalDetail('ctesiphon',300)?.polity.text).not.toContain('伊嗣俟一世');
  expect(historicalDetail('nisibis',400)?.polity.text).toContain('萨珊帝国控制');
 });
 it('separates western Tripolitania and eastern Cyrenaica with working city return links',()=>{
  const regions=fourthRegionsAt(400);
  for(const id of [...west400,...east400])expect(regions.some(r=>r.id===id),id).toBe(true);
  expect(new Set([...west400,...east400]).size).toBe(west400.length+east400.length);
  expect(regions.find(r=>r.id==='tripolitania400')?.polity).toContain('罗马西部');
  expect(regions.find(r=>r.id==='cyrenaica400')?.polity).toContain('罗马东部');
  expect(cityRegionAt('lepcis',400)).toBe('tripolitania400');
  expect(cityRegionAt('cyrene',400)).toBe('cyrenaica400');
  expect(cityRegionAt('lepcis',399)).toBe('libya');
  expect(fourthRegionsAt(399).some(r=>r.id==='tripolitania400')).toBe(false);
  for(const q of questions400){
   expect(historySources[q.source]).toBeDefined();
   for(const [id] of q.places)expect(historicalDetail(id,400),id).toBeDefined();
   for(const [id] of q.regions)expect(regions.some(r=>r.id===id),id).toBe(true);
  }
 });
 it('labels uncertain tribal outlines as reference regions without inventing new geometry',()=>{
  const fc=JSON.parse(raw400),areas=makeAreas(fc,false,400);
  expect(areas.find(a=>a.original==='Hunnic Empire')?.kind).toBe('reference');
  expect(areas.find(a=>a.original==='Hunnic Empire')?.name).toContain('诸集团');
  expect(areas.find(a=>a.original==='Persia')?.name).toBe('萨珊帝国');
  expect(areas.map(a=>a.feature.geometry)).toEqual(makeAreas(fc,false,500).map(a=>a.feature.geometry));
  expect(makeAreas(fc,false,500).find(a=>a.original==='Hunnic Empire')?.context).toBeUndefined();
 });
});
