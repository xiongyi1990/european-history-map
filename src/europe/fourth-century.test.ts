import {describe,it,expect} from 'vitest';
import {fourthPhases,fourthPhaseAt,fourthRegionsAt,fourthEvents,fourthCityRegions} from './fourth-century';
import {fourthPlaces} from './fourth-century-cities';
import {historicalDetails,historicalDetail,detailsAt,historySources} from './history-details';
import {ancientPlaces,allBattles,battleYears,makeAreas} from './model';
import {dateFourthAreas} from './fourth-century-boundaries';
import {fourthBattles} from './fourth-century-battles';
import raw400 from '../../public/historical-boundaries/world_400.geojson?raw';
describe('continuous fourth-century atlas',()=>{
 it('covers every year with exactly one political phase and a dated record for every retained city',()=>{
  const cities=Object.keys(fourthCityRegions);
  for(let year=300;year<=400;year++){
   expect(fourthPhases.filter(p=>year>=p.from&&year<=p.to),String(year)).toHaveLength(1);
   const records=detailsAt(year);
   for(const id of cities)expect(records.filter(d=>d.placeId===id),`${year}:${id}`).toHaveLength(1);
   for(const r of fourthRegionsAt(year)){
    for(const id of r.cities)expect(records.some(d=>d.placeId===id),`${year}:${r.id}:${id}`).toBe(true);
    for(const id of r.sources)expect(historySources[id],id).toBeDefined();
   }
  }
  expect(fourthPhaseAt(299)).toBeUndefined();expect(fourthPhaseAt(401)).toBeUndefined();
  for(const p of fourthPlaces){expect(ancientPlaces.filter(a=>a.id===p.id)).toHaveLength(1);expect(historicalDetail(p.id,401)).toBeUndefined()}
 });
 it('changes names and political control at the actual transitions without inventing a single daily state',()=>{
  expect(historicalDetail('byzantium',329)?.title).toBe('拜占庭城');
  expect(historicalDetail('byzantium',330)?.title).toBe('君士坦丁堡');
  expect(historicalDetail('nisibis',362)?.polity.text).toContain('罗马帝国');
  expect(historicalDetail('nisibis',363)?.polity.text).toContain('本年和议前');
  expect(historicalDetail('nisibis',364)?.polity.text).toContain('萨珊帝国控制');
  expect(historicalDetail('edessa',364)?.polity.text).toContain('罗马帝国');
  expect(historicalDetail('edessa',364)?.people.text).toContain('流亡者');
  expect(fourthRegionsAt(369).some(r=>r.id==='huns4')).toBe(false);
  expect(fourthRegionsAt(376).find(r=>r.id==='goths')?.polity).toContain('已进入罗马巴尔干');
  expect(fourthRegionsAt(387).find(r=>r.id==='armenia')?.polity).toContain('分区');
  expect(fourthPhaseAt(400)?.west).toContain('402');
 });
 it('resolves every event, source, region and battle with no orphaned links',()=>{
  expect(new Set(fourthEvents.map(e=>e.year)).size).toBe(fourthEvents.length);
  for(const e of fourthEvents){
   expect(historySources[e.source]).toBeDefined();
   for(const id of e.places)expect(historicalDetail(id,e.year),`${e.year}:${id}`).toBeDefined();
   for(const id of e.regions)expect(fourthRegionsAt(e.year).some(r=>r.id===id),`${e.year}:${id}`).toBe(true);
   if(e.battle)expect(allBattles.some(b=>b.id===e.battle),e.battle).toBe(true);
  }
  for(const b of fourthBattles){expect(battleYears[b.id]).toBeGreaterThanOrEqual(300);expect(b.stages.length).toBeGreaterThan(1);for(const s of b.stages)for(const [lon,lat] of [...s.path,...s.stops.map(p=>p.coords)]){expect(lon).toBeGreaterThan(-25);expect(lon).toBeLessThan(55);expect(lat).toBeGreaterThan(24);expect(lat).toBeLessThan(72)}}
 });
 it('labels borrowed geometry with its evidence year and never calls the 350 context a 395 division',()=>{
  const original=makeAreas(JSON.parse(raw400),false,400),dated=dateFourthAreas(original,360,400);
  expect(dated.map(a=>a.feature.geometry)).toEqual(original.map(a=>a.feature.geometry));
  const west=dated.find(a=>a.original==='Western Roman Empire')!;
  expect(west.name).toBe('罗马西部地域（400 年参考）');expect(west.context?.membership).toContain('360');
  expect(dateFourthAreas(original,400,400)).toBe(original);
 });
 it('keeps generated records inside the requested century',()=>{
  for(const d of historicalDetails.filter(d=>d.id.includes('-fourth-'))){expect(d.from).toBeGreaterThanOrEqual(300);expect(d.to).toBeLessThanOrEqual(400)}
 });
});
