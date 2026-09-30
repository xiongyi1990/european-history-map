import {describe,it,expect} from 'vitest';
import {controlTransitions,controlTransitionAt,controlAnchorAt} from './late-antique-control';
import {ancientPlaces} from './model';
import {courseSources} from './course-sources';
import {readingRegionById} from './reading-centuries';

describe('event-specific city control',()=>{
 it('uses only its own six event years with valid places, regions and sources',()=>{
  expect(controlTransitions.map(t=>t.year)).toEqual([395,410,439,442,476,493]);
  for(const t of controlTransitions){
   expect(new Set(t.anchors.map(a=>a.placeId)).size).toBe(t.anchors.length);
   for(const a of t.anchors){expect(ancientPlaces.find(p=>p.id===a.placeId),`${t.year}:${a.placeId}`).toBeDefined();expect(readingRegionById(a.region,t.year),a.region).toBeDefined()}
   for(const id of t.sources)expect(courseSources[id]?.url).toMatch(/^https:\/\//);
  }
  for(const year of [300,394,396,438,440,475,477,492,494,500,600])expect(controlTransitionAt(year)).toBeUndefined();
 });
 it('does not turn a sack or treaty recognition into a second city conquest',()=>{
  expect(controlAnchorAt('rome',410,'before')?.after).toBe('west');
  expect(controlAnchorAt('rome',410,'after')?.status).toBe('遭劫掠后');
  expect(controlAnchorAt('carthage',439,'before')?.before).toBe('west');
  expect(controlAnchorAt('carthage',439,'after')?.after).toBe('vandal');
  expect(controlAnchorAt('carthage',442,'before')?.before).toBe('vandal');
  expect(controlAnchorAt('carthage',442,'after')?.after).toBe('vandal');
 });
 it('keeps Nepos, eastern Rome, Vandal Africa and Gothic Italy separate at handover',()=>{
  expect(controlAnchorAt('ravenna',476,'before')?.before).toBe('west');
  expect(controlAnchorAt('ravenna',476,'after')?.after).toBe('odoacer');
  expect(controlAnchorAt('salona',476,'after')?.after).toBe('nepos');
  expect(controlAnchorAt('byzantium',476,'after')?.after).toBe('east');
  expect(controlAnchorAt('carthage',493,'after')?.after).toBe('vandal');
  expect(controlAnchorAt('toulouse',493,'after')?.after).toBe('gothic');
  expect(controlAnchorAt('ravenna',493,'after')?.after).toBe('theodoric');
  expect(controlAnchorAt('rome',493,'before')?.before).toBe('contested');
  expect(controlTransitionAt(493)?.limit).toContain('未为意大利每座城市');
 });
});
