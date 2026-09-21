import {describe,it,expect} from 'vitest';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import {millenniumDetails,millenniumPlaces} from './turn-of-millennium';

describe('the millennium reading layer',()=>{
 it('does not backdate royal titles or later conquests',()=>{
  expect(historicalDetail('gniezno',1000)?.polity.text).toContain('1025');
  expect(historicalDetail('winchester',1000)?.polity.text).toContain('1066 年诺曼征服尚未发生');
  expect(historicalDetail('esztergom',1000)?.polity.text).toContain('1001 年 1 月 1 日');
  expect(historicalDetail('paris',1000)?.polity.text).toContain('不再是于格本人在位');
  expect(historicalDetail('kyiv',1000)?.polity.text).toContain('不因此成为东罗马');
 });
 it('keeps the new evidence within its stated checkpoint instead of extrapolating it',()=>{
  for(const p of millenniumPlaces){
   expect(historicalDetail(p.id,999)).toBeUndefined();
   expect(historicalDetail(p.id,1000)).toBeDefined();
   expect(historicalDetail(p.id,1001)).toBeUndefined();
  }
  expect(historicalDetail('rome',962)?.polity.text).toContain('奥托一世');
  expect(historicalDetail('rome',963)).toBeUndefined();
 });
 it('supplies map locations, references and links for every new record',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  for(const d of millenniumDetails){
   expect(ids.has(d.placeId)).toBe(true);expect(d.polity.sources.length).toBeGreaterThan(0);
   for(const id of d.related)expect(ids.has(id)).toBe(true);
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const s of f.sources)expect(historySources[s]).toBeDefined();
  }
  expect(historicalDetail('kyiv',1000)?.readingNote).toContain('巴西尔二世');
 });
});
