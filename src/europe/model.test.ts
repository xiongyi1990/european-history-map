import {describe,it,expect} from 'vitest';
import {parseYear,snapshotFor,makeAreas,areaLocation,placeContext,battleYears,allBattles} from './model';

describe('a year is a query, not an invented historical reconstruction',()=>{
 it('accepts Chinese and western dates and rejects year zero or malformed dates',()=>{
  expect(parseYear('公元前 431 年')).toBe(-431);expect(parseYear('431 BCE')).toBe(-431);
  expect(parseYear('1453')).toBe(1453);expect(parseYear('-218')).toBe(-218);
  for(const bad of ['0','公元前0年','1.5','1453abc','Infinity','-50001','2027',''])expect(parseYear(bad)).toBeUndefined();
 });
 it('reports a neighboring snapshot and refuses to extrapolate outside coverage',()=>{
  expect(snapshotFor(117)?.year).toBe(100);expect(snapshotFor(395)?.year).toBe(400);
  expect(snapshotFor(150)?.year).toBe(100);expect(snapshotFor(-50000)).toBeUndefined();expect(snapshotFor(2026)).toBeUndefined();
 });
 it('does not carry city affiliations across time',()=>{
  expect(placeContext('byzantium',395)?.title).toBe('君士坦丁堡');
  expect(placeContext('byzantium',400)?.title).toBe('君士坦丁堡');
  expect(placeContext('byzantium',1454)).toBeUndefined();
  expect(placeContext('athens',-431)?.text).toContain('盟友');
  expect(placeContext('athens',-430)).toBeUndefined();
 });
});
describe('geographic records preserve category and source distinctions',()=>{
 const polygon:GeoJSON.Polygon={type:'Polygon',coordinates:[[[10,40],[20,40],[20,50],[10,50],[10,40]]]};
 it('does not convert cultural membership into political authority',()=>{
  const fc:GeoJSON.FeatureCollection={type:'FeatureCollection',features:[
   {type:'Feature',geometry:polygon,properties:{name:'Saami',subject:'Saami',partOf:'Finno-Ugric'}},
   {type:'Feature',geometry:polygon,properties:{name:'Roman Empire',subject:'Roman Empire',partOf:'Mediterranean'}}]};
  const [culture,polity]=makeAreas(fc);expect(culture.kind).toBe('reference');expect(polity.kind).toBe('polity');
  expect(culture.subject).toBe('Saami');expect(polity.feature.properties?.partOf).toBe('Mediterranean');
 });
 it('places a label in the atlas region even for a country with overseas geometry',()=>{
  const p:GeoJSON.MultiPolygon={type:'MultiPolygon',coordinates:[polygon.coordinates,[[[-80,-10],[-50,-10],[-50,10],[-80,10],[-80,-10]]]]};
  const location=areaLocation(p)!;expect(location.coords[0]).toBeGreaterThanOrEqual(10);expect(location.coords[0]).toBeLessThanOrEqual(20);expect(location.coords[1]).toBeGreaterThanOrEqual(40);
 });
 it('every route has an explicit opening year',()=>{for(const b of allBattles)expect(Number.isInteger(battleYears[b.id])).toBe(true)});
});
