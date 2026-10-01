import {describe,it,expect} from 'vitest';
import {administrativeReadingGroups,administrativeGroupsAt} from './administrative-groups-395';
import {administrations395} from './administration-395';
import {readingRegionById} from './reading-centuries';
import {ancientPlaces} from './model';

describe('administrative reading groups near 395',()=>{
 it('keeps every locator connected to existing dated reading regions and cities',()=>{
  expect(new Set(administrativeReadingGroups.map(g=>g.id)).size).toBe(administrativeReadingGroups.length);
  for(const division of administrations395){
   const groups=administrativeGroupsAt(division.id,395);expect(groups.length).toBeGreaterThan(0);
   for(const g of groups){
    expect(g.source).toMatch(/^https:\/\/www\.intratext\.com\//);
    for(const [id] of g.regions)expect(readingRegionById(id,395),`${g.id}:${id}`).toBeDefined();
    for(const [id] of g.cities)expect(ancientPlaces.find(p=>p.id===id),`${g.id}:${id}`).toBeDefined();
   }
  }
 });
 it('does not reuse this directory as another year\'s administration or sovereignty',()=>{
  for(const year of [300,394,396,400,410,476,500]){
   for(const division of administrations395)expect(administrativeGroupsAt(division.id,year)).toEqual([]);
  }
  expect(administrativeGroupsAt('unknown',395)).toEqual([]);
  expect(administrativeReadingGroups.every(g=>!('geometry' in g))).toBe(true);
 });
});
