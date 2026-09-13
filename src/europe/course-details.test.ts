import {describe,it,expect} from 'vitest';
import {courseDetails,coursePlaces} from './course-details';
import {historicalDetail,historicalDetails,detailHistory,historyWindows} from './history-details';
import {ancientPlaces,placeLabel} from './model';
import {courseDocument} from './course-sources';

describe('course material enriches the shared time atlas',()=>{
 it('separates Ravenna actual control from imperial claims',()=>{
  expect(historicalDetail('ravenna',475)?.polity.text).toContain('西部朝廷');
  expect(historicalDetail('ravenna',476)?.polity.text).toContain('奥多亚塞');
  expect(historicalDetail('ravenna',493)?.polity.text).toContain('东哥特');
  expect(historicalDetail('ravenna',540)?.polity.text).toContain('东罗马控制');
  expect(historicalDetail('ravenna',600)?.polity.text).toContain('总督区');
  expect(historicalDetail('ravenna',751)).toBeUndefined();
 });
 it('keeps Roman continuity but changes control at the Latin conquest and restoration',()=>{
  expect(historicalDetail('byzantium',642)?.readingNote).toContain('叙事口径');
  expect(historicalDetail('byzantium',1203)?.polity.text).toContain('东罗马');
  expect(historicalDetail('byzantium',1204)?.polity.text).toContain('拉丁帝国');
  expect(historicalDetail('byzantium',1261)?.polity.text).toContain('恢复东罗马');
  expect(historicalDetail('byzantium',1453)?.polity.text).toContain('奥斯曼');
  expect(historicalDetail('byzantium',1454)).toBeUndefined();
 });
 it('separates an emirate from a caliphate and a papal residence from ownership',()=>{
  expect(historicalDetail('cordoba',928)?.polity.text).toContain('埃米尔国');
  expect(historicalDetail('cordoba',929)?.polity.text).toContain('称哈里发');
  expect(historicalDetail('cordoba',1009)?.polity.text).toContain('内乱');
  expect(historicalDetail('cordoba',1032)).toBeUndefined();
  expect(historicalDetail('avignon',1347)?.polity.text).toContain('尚非教皇购得');
  expect(historicalDetail('avignon',1348)?.polity.text).toContain('购得');
  expect(historicalDetail('avignon',1367)).toBeUndefined();
 });
 it('corrects Nicomedia and does not show the Roman name as early modern London',()=>{
  const p=coursePlaces.find(p=>p.id==='nicomedia')!;
  expect(p.modern).toContain('伊兹米特');expect(p.coords[0]).toBeGreaterThan(29);
  expect(historicalDetail('nicomedia',300)?.readingNote).toContain('校正');
  const london=ancientPlaces.find(p=>p.id==='london')!;
  expect(placeLabel(london,1642)).toBe('伦敦');
  expect(placeLabel(london,117)).toBe('伦底尼乌姆');
 });
 it('has bounded PDF references and navigation dates inside their actual records',()=>{
  expect(new Set(ancientPlaces.map(p=>p.id)).size).toBe(ancientPlaces.length);
  for(const d of historicalDetails){
   for(const r of d.reading??[]){expect(r.chapter).toBeGreaterThan(0);expect(r.chapter).toBeLessThanOrEqual(courseDocument.chapters);expect(r.pages[0]).toBeLessThanOrEqual(r.pages[1]);expect(r.pages[1]).toBeLessThanOrEqual(courseDocument.pages);}
   if(d.focusYear!==undefined){expect(d.focusYear).toBeGreaterThanOrEqual(d.from);expect(d.focusYear).toBeLessThanOrEqual(d.to);}
  }
  for(const w of historyWindows)expect(historicalDetails.some(d=>d.from<=w.year&&d.to>=w.year)).toBe(true);
  expect(detailHistory('byzantium')).toHaveLength(6);
  expect(coursePlaces).toHaveLength(11);
  expect(courseDetails).toHaveLength(54);
 });
});
