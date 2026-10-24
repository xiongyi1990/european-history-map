// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {readFileSync} from 'node:fs';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {northernPlaces,northernDetails,northernPolitiesAt,northernAnchors} from './early-700-north';
import {regionalPolitiesAt} from './early-700-italy-balkans';
import {earlyRegionAt,early500PlaceIds,early500Regions} from './early-500-regions';
import {historicalDetail,historicalDetails,historySources} from './history-details';
import {turningPointAt,historicalTurningPoints} from './historical-chronology';
import {ancientPlaces} from './model';
import {Early500Guide} from './Early500Guide';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:()=> <div/>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:15000});
describe('Northern political places and archaeological time limits',()=>{
 it('keeps the two referenced islands above the modern lake instead of submerging the site points',()=>{
  const lake=JSON.parse(readFileSync('public/europe-reference/ne_10m_malaren.geojson','utf8'));
  const islands=JSON.parse(readFileSync('public/europe-reference/osm_malaren_islands.geojson','utf8'));
  const inside=(point:number[],ring:number[][])=>{let result=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>point[1])!==(b[1]>point[1])&&point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])result=!result;}return result;};
  for(const [id,island] of [['birka','bjorko'],['hovgarden','adelso']]){
   const p=northernPlaces.find(p=>p.id===id)!;expect(inside(p.coords,lake.features[0].geometry.coordinates[0])).toBe(true);
   const shape=islands.features.find((f:{id:string})=>f.id===island).geometry;const polys=shape.type==='Polygon'?[shape.coordinates]:shape.coordinates;
   expect(polys.some((poly:number[][][])=>inside(p.coords,poly[0])&&!poly.slice(1).some(r=>inside(p.coords,r)))).toBe(true);
  }
  expect(islands.license).toContain('odbl');
 });
 it('does not show a trading settlement or canal before its selected approximate starting point',()=>{
  for(const [id,year] of [['ribe',710],['kanhave',726],['birka',750],['hovgarden',750],['kaupang',800]] as const){
   expect(early500PlaceIds(year-1),id).not.toContain(id);expect(early500PlaceIds(year),id).toContain(id);
  }
  expect(early500PlaceIds(701)).toContain('danevirke');expect(northernAnchors('north',700)).toEqual([]);expect(northernPolitiesAt(801)).toEqual([]);
 });
 it('distinguishes an engineering event from a later archaeological location',()=>{
  expect(historicalDetail('danevirke',737)?.kind).toBe('事件地点');expect(historicalDetail('danevirke',738)?.kind).toBe('附属地点');
  expect(historicalDetail('kanhave',726)?.polity.text).toContain('726—729');
  expect(historicalDetail('kanhave',750)?.polity.text).toContain('退出使用');expect(historicalDetail('kanhave',800)?.polity.text).toContain('精确停航日');
  expect(historicalDetail('kaupang',800)?.polity.text).toContain('不是聚落消失');
 });
 it('keeps Birka and the royal domain on different islands and avoids later monuments',()=>{
  const b=northernPlaces.find(p=>p.id==='birka')!,h=northernPlaces.find(p=>p.id==='hovgarden')!;
  expect(b.coords).not.toEqual(h.coords);expect(h.coords[1]).toBeGreaterThan(b.coords[1]);
  expect(historicalDetail('hovgarden',750)?.nameNote.text).toContain('十三世纪');
  expect(historicalDetail('birka',750)?.nameNote.text).toContain('较早评估');
  expect(historicalDetail('ribe',710)?.polity.text).toContain('全年居住');
 });
 it('preserves continuous regional dates and ensures every local entrance has dated evidence',()=>{
  for(let y=500;y<=800;y++)for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=y&&y<=p.to),r.id+y).toHaveLength(1);
  for(let y=701;y<=800;y++){
   const cards=regionalPolitiesAt('north',y);expect(cards.length).toBeGreaterThanOrEqual(2);
   for(const c of cards){if(!c.bounds)expect(historicalDetail(c.site,y),c.site+y).toBeDefined();for(const key of c.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);}
  }
  expect(regionalPolitiesAt('north',750)).toHaveLength(6);expect(regionalPolitiesAt('north',800)).toHaveLength(7);
  expect(earlyRegionAt('north',800)?.phase.from).toBe(800);
  for(const d of northernDetails)for(let y=d.from;y<=d.to;y++)expect(historicalDetails.filter(x=>x.placeId===d.placeId&&x.from<=y&&y<=x.to),d.id+y).toHaveLength(1);
  console.info(JSON.stringify({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),events:historicalTurningPoints.length,eighthCentury:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length,newPlaces:northernPlaces.length,newLocalDetails:northernDetails.length}));
 });
 it('retains other regions when adding parallel northern events',()=>{
  expect(turningPointAt(710)?.places[0][0]).toBe('ribe');expect(turningPointAt(726)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['byzantium','kanhave']));
  expect(turningPointAt(737)?.places[0][0]).toBe('derbent');expect(turningPointAt(737)?.places.map(([id])=>id)).toContain('danevirke');
  expect(turningPointAt(750)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['kufa','cordoba','birka','hovgarden']));
  expect(turningPointAt(800)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['aachen','rome','kairouan','kaupang']));
  expect(turningPointAt(793)?.places[0][0]).toBe('lindisfarne');
  const ids=new Set(ancientPlaces.map(p=>p.id));expect(ids.size).toBe(ancientPlaces.length);expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
  for(const d of northernDetails){for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);for(const id of d.related)expect(ids.has(id),id).toBe(true);}
 });
 it('locates a coastal political space without treating it as a known kingdom polygon',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();render(<Early500Guide year={750} selected="north" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'北欧地方政权详解'});expect(within(local).getAllByRole('article')).toHaveLength(6);
  expect(within(local).getByText('这一年，北欧的王权、聚落与交通据点在哪里？')).toBeTruthy();
  fireEvent.click(within(local).getByRole('button',{name:'在地图上查看挪威海岸与峡湾方向 →'}));expect(onLocate).toHaveBeenCalledWith([[4,57],[13,66]]);expect(onPlace).not.toHaveBeenCalled();
 });
 it('returns from Birka to the same northern year and follows the royal domain separately',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=750&earlyRegion=north');render(<EuropeApp/>);
  const local=screen.getByRole('region',{name:'北欧地方政权详解'});fireEvent.click(within(local).getByRole('button',{name:'定位比尔卡并查看资料 →'}));expect(location.search).toContain('place=birka');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 750 年的地域与政权'}));
  fireEvent.click(within(screen.getByRole('region',{name:'北欧地方政权详解'})).getByRole('button',{name:'定位霍夫戈登并查看资料 →'}));expect(location.search).toContain('place=hovgarden');expect(location.search).toContain('year=750');
  await act(async()=>{});
 });
});
