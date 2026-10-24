// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {readFileSync} from 'node:fs';
import {europeLandforms} from './geography';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {balticPlaces,balticDetails,balticPolitiesAt,balticAnchors} from './early-700-baltic';
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
describe('Baltic east coast and river settlements, without premature Rus borders',()=>{
 it('renders the modern lake separately from the city on its southern river approach',()=>{
  const lake=JSON.parse(readFileSync('public/europe-reference/ne_10m_ladoga.geojson','utf8'));expect(lake.features).toHaveLength(1);expect(lake.features[0].properties.wikidataid).toBe('Q15288');
  const inside=(point:number[],ring:number[][])=>{let result=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>point[1])!==(b[1]>point[1])&&point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])result=!result;}return result;};
  const g=lake.features[0].geometry;const polys=g.type==='Polygon'?[g.coordinates]:g.coordinates;const withinWater=(p:number[])=>polys.some((poly:number[][][])=>inside(p,poly[0])&&!poly.slice(1).some(r=>inside(p,r)));
  const label=europeLandforms.find(p=>p.id==='ladoga-lake')!;expect(label.kind).toBe('lake');expect(withinWater(label.coords)).toBe(true);expect(withinWater(balticPlaces.find(p=>p.id==='staraya-ladoga')!.coords)).toBe(false);
 });
 it('shows archaeological sites only from their selected evidence windows',()=>{
  expect(balticAnchors('east',700)).toEqual([]);expect(balticPolitiesAt(801)).toEqual([]);expect(balticAnchors('north',753)).toEqual([]);
  expect(early500PlaceIds(701)).toContain('grobina');
  for(const [id,year] of [['salme-ships',750],['staraya-ladoga',753]] as const){expect(early500PlaceIds(year-1)).not.toContain(id);expect(early500PlaceIds(year)).toContain(id);}
  expect(historicalDetail('salme-ships',775)?.kind).toBe('事件地点');expect(historicalDetail('salme-ships',776)?.kind).toBe('附属地点');
  expect(historicalDetail('salme-ships',750)?.polity.text).toContain('不表示连续作战');
  expect(historicalDetail('staraya-ladoga',753)?.polity.text).toContain('不晚于 753');expect(historicalDetail('grobina',701)?.polity.text).toContain('非建城年');
 });
 it('retains southern Khazar and Cherson contexts alongside the new northern points',()=>{
  for(const year of [701,737,750,753,776,800]){
   const cards=regionalPolitiesAt('east',year);expect(cards.some(p=>p.id==='khazar-north')).toBe(true);expect(cards.some(p=>p.site==='cherson-taurica')).toBe(true);
   expect(cards).toHaveLength(year<750?3:year<753?4:5);
   const region=earlyRegionAt('east',year)!;
   for(const p of balticPolitiesAt(year)){
    expect(region.places.map(p=>p[0])).toContain(p.site);
    const coords=ancientPlaces.find(a=>a.id===p.site)!.coords;
    expect(coords[0]).toBeGreaterThanOrEqual(region.bounds[0][0]);expect(coords[0]).toBeLessThanOrEqual(region.bounds[1][0]);expect(coords[1]).toBeGreaterThanOrEqual(region.bounds[0][1]);expect(coords[1]).toBeLessThanOrEqual(region.bounds[1][1]);
   }
  }
  expect(earlyRegionAt('east',700)?.name).toBe('东欧森林、河流与黑海北方');
 });
 it('has one region phase for every year and one applicable record for each visible new site',()=>{
  for(let year=701;year<=800;year++){
   for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=year&&year<=p.to),r.id+' '+year).toHaveLength(1);
   for(const p of balticPolitiesAt(year))expect(historicalDetails.filter(d=>d.placeId===p.site&&d.from<=year&&year<=d.to)).toHaveLength(1);
  }
  expect(earlyRegionAt('east',752)?.phase.to).toBe(752);expect(earlyRegionAt('east',753)?.phase.from).toBe(753);
 });
 it('keeps all places, aliases, related references and evidence sources resolvable',()=>{
  for(const p of balticPlaces){expect(ancientPlaces.filter(x=>x.id===p.id)).toHaveLength(1);expect(p.aliases.length).toBeGreaterThan(2);}
  for(const d of balticDetails){for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);}
  expect(historicalDetail('grobina',750)?.nameNote.text).toContain('预备名单');expect(historicalDetail('salme-ships',750)?.people.text).toContain('不代表全岛');
 });
 it('merges approximate 750 evidence without losing the original caliphal or northern places',()=>{
  expect(historicalTurningPoints.filter(e=>e.year===750)).toHaveLength(1);const e=turningPointAt(750)!;
  for(const id of ['kufa','harran','wasit','birka','hovgarden','grobina','salme-ships'])expect(e.places.map(p=>p[0])).toContain(id);
  expect(e.after).toContain('约 750—775');expect(turningPointAt(753)?.places[0][0]).toBe('staraya-ladoga');
  expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
  console.log({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),events:historicalTurningPoints.length,eighthCentury:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length});
 });
 it('offers five different places or political spaces and a geographic camera without inventing borders',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();render(<Early500Guide year={753} selected="east" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'波罗的海东岸与东欧地方政权详解'});expect(within(local).getAllByRole('article')).toHaveLength(5);
  fireEvent.click(within(local).getByRole('button',{name:'定位旧拉多加并查看资料 →'}));expect(onPlace).toHaveBeenCalledWith('staraya-ladoga');
  fireEvent.click(screen.getByRole('button',{name:'在地图上查看这个地域 →'}));expect(onLocate).toHaveBeenCalledWith([[20,43],[50,62]]);
 });
 it('returns from Salme to the same year and follows the later river settlement',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=753&earlyRegion=east');render(<EuropeApp/>);
  fireEvent.click(within(screen.getByRole('region',{name:'波罗的海东岸与东欧地方政权详解'})).getByRole('button',{name:'定位萨尔梅船葬并查看资料 →'}));expect(location.search).toContain('place=salme-ships');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 753 年的地域与政权'}));
  fireEvent.click(within(screen.getByRole('region',{name:'波罗的海东岸与东欧地方政权详解'})).getByRole('button',{name:'定位旧拉多加并查看资料 →'}));expect(location.search).toContain('place=staraya-ladoga');expect(location.search).toContain('year=753');await act(async()=>{});
 });
});
