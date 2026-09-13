import {describe,it,expect} from 'vitest';
import {bronzePlaces,historicalDetails,historicalDetail,detailsAt,detailHistory,historySources,alignmentAt} from './history-details';
import {ancientPlaces,placeContext} from './model';

describe('historical facts stay attached to their evidence period',()=>{
 it('distinguishes Knossos Linear A from the later Linear B evidence',()=>{
  expect(historicalDetail('knossos',-1500)?.language.text).toContain('线形文字 A');
  expect(historicalDetail('knossos',-1350)?.language.text).toContain('线形文字 B');
  expect(historicalDetail('knossos',-1425)).toBeUndefined();
  expect(placeContext('knossos',100)).toBeUndefined();
  expect(detailHistory('knossos')).toHaveLength(2);
 });
 it('does not backdate the mature Mycenaean palace language record',()=>{
  expect(historicalDetail('mycenae',-1500)?.kind).toBe('早期中心');
  expect(historicalDetail('mycenae',-1500)?.language.text).toContain('不能');
  expect(historicalDetail('mycenae',-1300)?.kind).toBe('宫殿中心');
  expect(historicalDetail('tiryns',-1500)).toBeUndefined();
 });
 it('does not turn an opening-war alliance into a permanent possession',()=>{
  expect(historicalDetail('plataea',-431)?.polity.text).toContain('盟友');
  expect(historicalDetail('plataea',-430)).toBeUndefined();
  expect(alignmentAt('plataea',-431)?.label).toBe('雅典一方');
  expect(alignmentAt('plataea',-430)).toBeUndefined();
  expect(historicalDetail('naupactus',-431)?.people.text).toContain('美塞尼亚人');
  expect(historicalDetail('sparta',-431)?.people.text).toContain('较晚背景');
 });
 it('has no duplicate periods, dangling sources, or related-place IDs',()=>{
  const places=new Set(ancientPlaces.map(p=>p.id));
  expect(new Set(historicalDetails.map(d=>d.id)).size).toBe(historicalDetails.length);
  for(const d of historicalDetails){
   expect(places.has(d.placeId)).toBe(true);expect(d.from).toBeLessThanOrEqual(d.to);
   for(const other of historicalDetails.filter(v=>v!==d&&v.placeId===d.placeId))expect(d.to<other.from||other.to<d.from).toBe(true);
   for(const f of [d.nameNote,d.polity,d.territory,d.people,d.language])for(const id of f.sources)expect(historySources[id].url).toMatch(/^https:\/\//);
   for(const id of d.related)expect(places.has(id)).toBe(true);
  }
  expect(bronzePlaces).toHaveLength(5);
  expect(detailsAt(-1500).map(d=>d.placeId).sort()).toEqual(['knossos','malia','mycenae','phaistos']);
 });
});
