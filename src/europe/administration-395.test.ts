import {describe,it,expect} from 'vitest';
import {administrations395,administration395Areas} from './administration-395';
import {readingRegionById} from './reading-centuries';
import {ancientPlaces} from './model';

// Ray casting checks selected anchor locations, not the historical precision of a line.
function ringContains(r:number[][],[x,y]:number[]){let inside=false;for(let i=0,j=r.length-1;i<r.length;j=i++){const [xi,yi]=r[i],[xj,yj]=r[j];if((yi>y)!==(yj>y)&&x<(xj-xi)*(y-yi)/(yj-yi)+xi)inside=!inside;}return inside;}
function contains(f:GeoJSON.Feature,p:number[]){const g=f.geometry as GeoJSON.MultiPolygon;return g.coordinates.some(r=>ringContains(r[0],p)&&!r.slice(1).some(h=>ringContains(h,p)));}
describe('395 administrative geography',()=>{
 it('exists only at its source date, with working region and city navigation',()=>{
  for(const year of [300,394,396,400,476,500])expect(administration395Areas(year).features).toHaveLength(0);
  expect(administration395Areas(395).features).toHaveLength(4);
  for(const a of administrations395){
   for(const [id] of a.regions)expect(readingRegionById(id,395),`${a.id}:${id}`).toBeDefined();
   for(const [id] of a.cities)expect(ancientPlaces.find(p=>p.id===id),id).toBeDefined();
  }
 });
 it('keeps principal cities on the intended side, excluding Persia, Ireland and open sea',()=>{
  const areas=administration395Areas(395).features;
  // The 1:50m coast cannot resolve the Golden Horn: use a point inland of Constantinople.
  for(const [id,coords] of [['gaul',[2.35,48.85]],['gaul',[-.12,51.5]],['italy',[12.5,41.9]],['italy',[10.32,36.85]],['illyricum',[23.73,37.98]],['illyricum',[23.32,42.7]],['east',[28.95,41.02]],['east',[31.24,30.04]],['east',[32.65,25.69]],['east',[32.9,24.09]]] as [string,number[]][]){
   expect(areas.filter(f=>contains(f,coords)).map(f=>f.properties?.id),id).toEqual([id]);
  }
  for(const p of [[32.9,22],[35,24],[41.22,37.07],[44.58,33.09],[-5.93,54.6],[-6.26,53.35],[15,35],[10,40]])expect(areas.some(f=>contains(f,p)),String(p)).toBe(false);
 });
});
