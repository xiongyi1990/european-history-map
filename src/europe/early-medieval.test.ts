import {describe,it,expect} from 'vitest';
import {historicalDetail,historicalDetails} from './history-details';
import {ancientPlaces} from './model';
import {earlyMedievalDetails} from './early-medieval';
import {periodGuides} from './LateAntiquityGuide';
import {easternRegionStatus} from './eastern-context';

describe('sixth and seventh century reading coverage',()=>{
 it('keeps the western kingdoms before the conquests and their cards within the covered years',()=>{
  expect(historicalDetail('toledo',700)?.polity.text).toContain('西哥特');
  expect(historicalDetail('toledo',711)).toBeUndefined();
  expect(historicalDetail('pavia',700)?.polity.text).toContain('伦巴第');
  expect(historicalDetail('pavia',774)).toBeUndefined();
  expect(historicalDetail('kairouan',600)).toBeUndefined();
  expect(historicalDetail('kairouan',700)?.polity.text).toContain('670 年');
 });
 it('changes Egypt from Eastern Roman to Umayyad between the century anchors',()=>{
  expect(historicalDetail('alexandria',600)?.polity.text).toContain('395 年以后处于东部朝廷一侧');
  expect(historicalDetail('alexandria',700)?.polity.text).toContain('倭马亚');
  expect(easternRegionStatus('egypt',600)).toContain('仍属帝国');
  expect(easternRegionStatus('egypt',700)).toContain('不再属东罗马');
  expect(easternRegionStatus('east-africa',600)).toContain('仍属帝国');
  expect(easternRegionStatus('east-africa',700)).toContain('丧失迦太基');
 });
 it('gives every guided destination exactly one detail at the selected year',()=>{
  const placeIds=new Set(ancientPlaces.map(p=>p.id));
  for(const year of [300,400,500,600,700])for(const [id] of periodGuides[year].places){
   expect(placeIds.has(id),`${id} map position`).toBe(true);
   expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=year&&d.to>=year),`${id} at ${year}`).toHaveLength(1);
  }
  for(const d of earlyMedievalDetails){expect(d.polity.sources.length).toBeGreaterThan(0);for(const id of d.related)expect(placeIds.has(id)).toBe(true);}
 });
});
