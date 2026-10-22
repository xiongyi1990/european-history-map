// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {islandPlaces,islandDetails,islandPolitiesAt} from './early-700-islands';
import {regionalPolitiesAt} from './early-700-italy-balkans';
import {earlyRegionAt,early500PlaceIds,early500Regions} from './early-500-regions';
import {historicalDetail,historicalDetails,historySources} from './history-details';
import {turningPointAt,historicalTurningPoints} from './historical-chronology';
import {ancientPlaces} from './model';
import {Early500Guide} from './Early500Guide';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:()=> <div/>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:15000});
describe('island kingdoms, ecclesiastical networks and dated raids',()=>{
 it('keeps the seven named regions and surrounding powers distinct, without permanent equal sovereignty',()=>{
  expect(islandPolitiesAt(700)).toEqual([]);expect(islandPolitiesAt(801)).toEqual([]);
  for(let y=701;y<=800;y++){
   const cards=regionalPolitiesAt('britain',y);expect(cards).toHaveLength(10);
   expect(new Set(cards.map(p=>p.id)).size).toBe(10);
   for(const c of cards){
    if(c.bounds){expect(c.site).toBe('');expect(c.bounds[0][0]).toBeLessThan(c.bounds[1][0]);}
    else expect(historicalDetail(c.site,y),c.id+':'+y).toBeDefined();
    for(const key of c.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);
   }
  }
  expect(islandPolitiesAt(756)[0].name).toContain('之前');expect(islandPolitiesAt(757)[0].name).toBe('奥法的麦西亚');
  expect(islandPolitiesAt(796)[0].control).toContain('先后去世');expect(islandPolitiesAt(797)[0].name).toContain('之后');
  expect(islandPolitiesAt(795).find(c=>c.id==='wessex')?.control).toContain('871');
  expect(islandPolitiesAt(795).find(c=>c.id==='sussex')?.control).toContain('平等独立');
  expect(islandPolitiesAt(795).find(c=>c.id==='irish-realms')?.control).toContain('并非全岛首都');
 });
 it('distinguishes the 793 and 795 raids and does not turn a church into a royal capital',()=>{
  expect(historicalDetail('iona',794)?.kind).toBe('早期中心');expect(historicalDetail('iona',795)?.kind).toBe('事件地点');
  expect(historicalDetail('iona',796)?.kind).toBe('早期中心');
  expect(historicalDetail('lindisfarne',793)?.kind).toBe('事件地点');
  expect(historicalDetail('tamworth',796)?.polity.text).toContain('数月后');
  expect(historicalDetail('jarrow',731)?.polity.text).toContain('约在 731');
  expect(historicalDetail('clonmacnoise',795)?.polity.text).toContain('不意味着它是全岛首都');
  for(const p of islandPlaces){expect(early500PlaceIds(700)).not.toContain(p.id);expect(early500PlaceIds(701)).toContain(p.id);expect(early500PlaceIds(800)).toContain(p.id);expect(early500PlaceIds(801)).not.toContain(p.id);}
 });
 it('keeps existing parallel events and validates place references throughout the chronology',()=>{
  expect(turningPointAt(731)?.places[0][0]).toBe('jarrow');expect(turningPointAt(795)?.places[0][0]).toBe('iona');
  expect(turningPointAt(757)?.places[0][0]).toBe('tamworth');expect(turningPointAt(796)?.places[0][0]).toBe('tamworth');
  expect(turningPointAt(787)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['nicaea','benevento','byzantium','tamworth']));
  expect(turningPointAt(787)?.spatial).toContain('不指认受膏会场');
  const ids=new Set(ancientPlaces.map(p=>p.id));expect(ids.size).toBe(ancientPlaces.length);
  for(const e of historicalTurningPoints)for(const [id] of e.places)expect(ids.has(id),e.year+':'+id).toBe(true);
  expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
 });
 it('retains continuous time coverage, non-overlapping details and evidence precision',()=>{
  for(let y=500;y<=800;y++)for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=y&&y<=p.to),r.id+y).toHaveLength(1);
  for(const y of [731,732,757,787,793,795,796,797])expect(earlyRegionAt('britain',y)?.phase.from).toBe(y);
  for(const d of islandDetails){
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);
   for(let y=d.from;y<=d.to;y++)expect(historicalDetails.filter(a=>a.placeId===d.placeId&&a.from<=y&&y<=a.to)).toHaveLength(1);
   expect(d.reading?.[0]).toMatchObject({chapter:177,pages:[1504,1515]});
  }
  expect(historicalDetail('iona',795)?.readingNote).toContain('871—899');
  expect(historicalDetail('tamworth',757)?.nameNote.text).toContain('诺曼城堡');
  expect(historicalDetail('dunadd',795)?.nameNote.text).toContain('可能');
  expect(historicalDetail('clonmacnoise',795)?.nameNote.text).toContain('十世纪');
  console.info(JSON.stringify({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),events:historicalTurningPoints.length,eighthCentury:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length,newPlaces:islandPlaces.length,newDetails:islandDetails.length}));
 });
 it('locates East Anglia geographically without inventing a single capital or ethnic boundary',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();render(<Early500Guide year={795} selected="britain" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'不列颠与爱尔兰地方政权详解'});expect(within(local).getAllByRole('article')).toHaveLength(10);
  fireEvent.click(within(local).getByRole('button',{name:'在地图上查看东盎格利亚方向 →'}));
  expect(onLocate).toHaveBeenCalledWith([[0.2,51.9],[1.9,53]]);expect(onPlace).not.toHaveBeenCalled();
 });
 it('returns from Mercia to the selected year and navigates to the Iona event',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=796&earlyRegion=britain');render(<EuropeApp/>);
  const local=screen.getByRole('region',{name:'不列颠与爱尔兰地方政权详解'});
  fireEvent.click(within(local).getByRole('button',{name:'定位塔姆沃思并查看资料 →'}));expect(location.search).toContain('place=tamworth');expect(location.search).toContain('year=796');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 796 年的地域与政权'}));
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});fireEvent.click(within(guide).getByRole('button',{name:/795\s*爱奥那/}));
  expect(location.search).toContain('year=795');expect(location.search).toContain('earlyRegion=britain');
  fireEvent.click(within(guide).getByRole('button',{name:/爱奥那 · 795 年袭击/}));expect(location.search).toContain('place=iona');
  expect(screen.getByRole('heading',{name:'爱奥那修道院'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 795 年的地域与政权'}));expect(location.search).not.toContain('place=');
  await act(async()=>{});
 });
});
