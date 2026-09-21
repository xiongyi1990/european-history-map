import {describe,it,expect} from 'vitest';
import {historicalDetail,historicalDetails,historySources} from './history-details';
import {ancientPlaces} from './model';
import {carolingianDetails} from './carolingian-details';
import {periodGuides} from './LateAntiquityGuide';
import {easternRegionStatus} from './eastern-context';

describe('Carolingian and contemporary reading checkpoints',()=>{
 it('changes the caliphal residence without erasing Baghdad during the Samarra period',()=>{
  expect(historicalDetail('baghdad',761)).toBeUndefined();
  expect(historicalDetail('baghdad',800)?.kind).toBe('帝国都城');
  expect(historicalDetail('baghdad',843)?.kind).toBe('历史城市');
  expect(historicalDetail('samarra',835)).toBeUndefined();
  expect(historicalDetail('samarra',843)?.kind).toBe('帝国都城');
  expect(historicalDetail('samarra',892)).toBeUndefined();
  expect(historicalDetail('baghdad',892)?.kind).toBe('帝国都城');
  expect(historicalDetail('baghdad',901)).toBeUndefined();
 });
 it('distinguishes the partitions and ends records at their evidence limits',()=>{
  expect(historicalDetail('aachen',843)?.polity.text).toContain('中部王国');
  expect(historicalDetail('aachen',900)?.polity.text).toContain('幼童路易');
  expect(historicalDetail('aachen',900)?.period).toContain('去世之后');
  expect(historicalDetail('pavia',800)?.polity.text).toContain('加洛林');
  expect(historicalDetail('oviedo',910)).toBeUndefined();
  expect(historicalDetail('cordoba',900)?.polity.text).toContain('埃米尔国');
  expect(easternRegionStatus('balkans',900)).toContain('并未因此成为帝国领土');
  expect(easternRegionStatus('egypt',800)).toContain('不属东罗马');
 });
 it('connects every guide and realm button to exactly one contemporaneous place record',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  for(const [year,guide] of Object.entries(periodGuides)){
   const links=[...guide.places,...(guide.realms??[]).flatMap(r=>r.places)];
   for(const [id] of links){
    expect(ids.has(id),`${id} map position`).toBe(true);
    expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=Number(year)&&d.to>=Number(year)),`${id} at ${year}`).toHaveLength(1);
   }
  }
  for(const d of carolingianDetails){
   expect(d.polity.sources.length).toBeGreaterThan(0);
   for(const id of d.related)expect(ids.has(id)).toBe(true);
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const s of f.sources)expect(historySources[s]).toBeDefined();
  }
 });
});
