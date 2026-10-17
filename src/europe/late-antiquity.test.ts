import {describe,it,expect} from 'vitest';
import {historicalDetail,historicalDetails} from './history-details';
import {ancientPlaces} from './model';
import {lateAntiqueDetails} from './late-antiquity';

describe('late antique transitions',()=>{
 it('shows one Carthage authority at each handover and uses separately sourced successor records after the old snapshot limit',()=>{
  expect(historicalDetail('carthage',438)?.polity.text).toContain('罗马');
  expect(historicalDetail('carthage',439)?.polity.text).toContain('盖萨里克');
  expect(historicalDetail('carthage',500)?.polity.text).toContain('特拉萨蒙德');
  expect(historicalDetail('carthage',439)?.id).not.toBe(historicalDetail('carthage',500)?.id);
  expect(historicalDetail('carthage',533)?.id).toBe('carthage-533');
  expect(historicalDetail('carthage',534)?.polity.text).toContain('东罗马');
  for(const year of [438,439,500,532,533])expect(historicalDetails.filter(d=>d.placeId==='carthage'&&d.from<=year&&d.to>=year)).toHaveLength(1);
 });
 it('keeps later kingdoms out of 400 and uses explicit new evidence after their recorded control',()=>{
  for(const id of ['toulouse','tournai'])expect(historicalDetail(id,400)?.polity.text).toContain('罗马');
  expect(historicalDetail('toulouse',500)?.polity.text).toContain('西哥特');
  expect(historicalDetail('lyon',500)?.polity.text).toContain('勃艮第');
  expect(historicalDetail('toulouse',507)?.polity.text).toContain('法兰克');
  expect(historicalDetail('lyon',534)?.polity.text).toContain('法兰克');
 });
 it('has real map destinations and sourced political facts for the new records',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  for(const d of lateAntiqueDetails){expect(ids.has(d.placeId)).toBe(true);expect(d.polity.sources.length).toBeGreaterThan(0);for(const id of d.related)expect(ids.has(id)).toBe(true);}
 });
});
