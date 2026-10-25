// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {southernBalticPlaces,southernBalticDetails,southernBalticPolitiesAt,southernBalticAnchors} from './early-700-south-baltic';
import {northernPolitiesAt} from './early-700-north';
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
describe('Southern Baltic settlement phases and relations to northern ports',()=>{
 it('separates early settlement, emporium expansion and later harbor engineering',()=>{
  expect(early500PlaceIds(729)).not.toContain('gross-stromkendorf');expect(early500PlaceIds(730)).toContain('gross-stromkendorf');
  expect(historicalDetail('gross-stromkendorf',759)?.kind).toBe('早期中心');expect(historicalDetail('gross-stromkendorf',760)?.kind).toBe('港口聚落');
  for(const id of ['rostock-dierkow','menzlin']){expect(early500PlaceIds(759)).not.toContain(id);expect(early500PlaceIds(760)).toContain(id);}
  expect(historicalDetail('rostock-dierkow',760)?.polity.text).toContain('约 750 年');expect(historicalDetail('rostock-dierkow',790)?.polity.text).toContain('790 年代');expect(historicalDetail('rostock-dierkow',790)?.polity.text).toContain('不称所有工程');
  expect(historicalDetail('gross-stromkendorf',800)?.polity.text).toContain('不是聚落终结');expect(southernBalticPolitiesAt(801)).toEqual([]);expect(southernBalticAnchors('east',760)).toEqual([]);
 });
 it('preserves northern powers while adding southern shoreline places within the camera',()=>{
  for(let year=701;year<=800;year++){
   const all=regionalPolitiesAt('north',year),region=earlyRegionAt('north',year)!;
   for(const p of northernPolitiesAt(year))expect(all.some(a=>a.id===p.id)).toBe(true);
   expect(new Set(all.map(p=>p.id)).size).toBe(all.length);
   for(const p of southernBalticPolitiesAt(year)){
    expect(all.some(a=>a.site===p.site)).toBe(true);expect(region.places.map(p=>p[0])).toContain(p.site);
    const coords=ancientPlaces.find(a=>a.id===p.site)!.coords;
    expect(coords[0]).toBeGreaterThanOrEqual(region.bounds[0][0]);expect(coords[0]).toBeLessThanOrEqual(region.bounds[1][0]);expect(coords[1]).toBeGreaterThanOrEqual(region.bounds[0][1]);expect(coords[1]).toBeLessThanOrEqual(region.bounds[1][1]);
   }
  }
  expect(earlyRegionAt('north',700)?.name).toBe('斯堪的纳维亚与波罗的海');expect(regionalPolitiesAt('north',760)).toHaveLength(9);expect(regionalPolitiesAt('north',800)).toHaveLength(10);
 });
 it('covers every regional year once and has unique evidence for each active new place',()=>{
  for(let year=701;year<=800;year++){
   for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=year&&year<=p.to),r.id+year).toHaveLength(1);
   for(const c of southernBalticPolitiesAt(year))expect(historicalDetails.filter(d=>d.placeId===c.site&&d.from<=year&&year<=d.to)).toHaveLength(1);
  }
  for(const year of [730,760,790])expect(earlyRegionAt('north',year)?.phase.from).toBe(year);
 });
 it('keeps new sites, related places and evidence sources valid without inventing polity borders',()=>{
  for(const p of southernBalticPlaces)expect(ancientPlaces.filter(a=>a.id===p.id)).toHaveLength(1);
  for(const d of southernBalticDetails){for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id)).toBe(true);}
  expect(historicalDetail('gross-stromkendorf',760)?.nameNote.text).toContain('不是今名 Rerik');expect(historicalDetail('menzlin',760)?.people.text).toContain('不能据此断言');expect(historicalDetail('menzlin',760)?.nameNote.text).toContain('不是北面的现代村中心');
 });
 it('keeps the Caucasian 730 event and uses one approximate 760 reading node',()=>{
  const y730=turningPointAt(730)!;expect(y730.places.map(p=>p[0])).toEqual(expect.arrayContaining(['ardabil','derbent','gross-stromkendorf']));expect(y730.after).toContain('不是已核定的同年建城');
  expect(turningPointAt(760)?.places.map(p=>p[0])).toEqual(expect.arrayContaining(['gross-stromkendorf','rostock-dierkow','menzlin','birka']));expect(turningPointAt(750)?.places.map(p=>p[0])).toContain('salme-ships');expect(new Set(historicalTurningPoints.map(p=>p.year)).size).toBe(historicalTurningPoints.length);
  console.log({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),events:historicalTurningPoints.length,eighthCentury:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length});
 });
 it('offers northern and southern points together and exposes a geographic overview',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();render(<Early500Guide year={760} selected="north" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'北欧地方政权详解'});expect(within(local).getAllByRole('article')).toHaveLength(9);
  fireEvent.click(within(local).getByRole('button',{name:'定位门茨林并查看资料 →'}));expect(onPlace).toHaveBeenCalledWith('menzlin');fireEvent.click(screen.getByRole('button',{name:'在地图上查看这个地域 →'}));expect(onLocate).toHaveBeenCalledWith([[4,53.5],[28,69]]);
 });
 it('returns to the same northern year and follows an existing northern center',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=760&earlyRegion=north');render(<EuropeApp/>);
  fireEvent.click(within(screen.getByRole('region',{name:'北欧地方政权详解'})).getByRole('button',{name:'定位罗斯托克—迪尔科夫并查看资料 →'}));expect(location.search).toContain('place=rostock-dierkow');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 760 年的地域与政权'}));
  fireEvent.click(within(screen.getByRole('region',{name:'北欧地方政权详解'})).getByRole('button',{name:'定位比尔卡并查看资料 →'}));expect(location.search).toContain('place=birka');expect(location.search).toContain('year=760');await act(async()=>{});
 });
});
