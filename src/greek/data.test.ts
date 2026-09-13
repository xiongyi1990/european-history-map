import {describe,it,expect} from 'vitest';
import {places,searchPlaces,distanceKm} from './data';

describe('Greek reading geography',()=>{
  it('resolves historical and modern aliases to the same place',()=>{
    expect(searchPlaces('拉栖代梦')[0].id).toBe('sparta');
    expect(searchPlaces('科孚')[0].id).toBe('corcyra');
    expect(searchPlaces('  ATHENS ')[0].id).toBe('athens');
    expect(searchPlaces('不存在的地点')).toEqual([]);
  });
  it('uses sourced coordinates inside the sample region and unique identities',()=>{
    expect(new Set(places.map(p=>p.id)).size).toBe(26);
    for(const p of places){expect(p.source).toMatch(/^https:\/\/pleiades.stoa.org\/places\/\d+$/);expect(p.coords[0]).toBeGreaterThan(14);expect(p.coords[0]).toBeLessThan(30);expect(p.coords[1]).toBeGreaterThan(35);expect(p.coords[1]).toBeLessThan(42);}
  });
  it('does not collapse all Peloponnesian cities into the Spartan camp',()=>{
    expect(places.find(p=>p.id==='argos')?.camp).toBe('neutral');
    expect(places.find(p=>p.id==='corinth')?.camp).toBe('sparta');
    expect(places.find(p=>p.id==='olympia')?.camp).toBe('context');
  });
  it('reports a symmetric great-circle distance, not a travel route',()=>{
    const athens=places.find(p=>p.id==='athens')!.coords,sparta=places.find(p=>p.id==='sparta')!.coords;
    expect(distanceKm(athens,sparta)).toBeGreaterThan(150);expect(distanceKm(athens,sparta)).toBeLessThan(160);
    expect(distanceKm(athens,sparta)).toBe(distanceKm(sparta,athens));expect(distanceKm(athens,athens)).toBe(0);
  });
});
