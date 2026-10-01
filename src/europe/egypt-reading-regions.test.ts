import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingRegionById,readingCityRegionAt} from './reading-centuries';
import {courseSources} from './course-sources';
describe('Egyptian reading regions',()=>{
 it('inherits contemporary political context throughout 300–500 and does not leak later events',()=>{
  for(let y=300;y<=500;y++){
   const parent=readingRegionById('egypt',y)!;
   for(const id of ['egypt-delta','egypt-upper']){
    const r=readingRegionById(id,y)!;expect(r.parent).toBe('egypt');expect(r.polity).toBe(parent.polity);
    for(const s of r.sources)expect(courseSources[s]?.url).toMatch(/^https:/);
   }
   expect(readingCityRegionAt('syene',y)).toBe('egypt-upper');
   expect(readingCityRegionAt('alexandria',y)).toBe('egypt-delta');
  }
  expect(readingRegionById('egypt-upper',393)?.language).not.toContain('394 年');
  expect(readingRegionById('egypt-upper',394)?.language).toContain('394 年');
  expect(readingRegionById('egypt-upper',450)?.change).not.toContain('451／452');
  expect(readingRegionById('egypt-upper',452)?.change).toContain('451／452');
  for(const y of [299,501])expect(readingRegionsAt(y).some(r=>r.id==='egypt-upper'||r.id==='egypt-delta')).toBe(false);
 });
});
