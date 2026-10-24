// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {blackSeaPlaces,blackSeaDetails,byzantineCourtStages,blackSeaPolitiesAt} from './early-700-black-sea';
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
describe('Byzantine court, Black Sea cities and Caucasian gateways',()=>{
 it('refines imperial dates while preserving the older and later city record exactly once',()=>{
  for(let y=330;y<=1203;y++)expect(historicalDetails.filter(d=>d.placeId==='byzantium'&&d.from<=y&&y<=d.to),String(y)).toHaveLength(1);
  expect(historicalDetail('byzantium',700)?.to).toBe(700);expect(historicalDetail('byzantium',801)?.from).toBe(801);
  expect(historicalDetail('byzantium',1203)?.kind).toBe('帝国都城');expect(historicalDetail('byzantium',1204)?.polity.text).toContain('拉丁');
  expect(historicalDetail('byzantium',704)?.polity.text).toContain('提比略三世');
  expect(historicalDetail('byzantium',705)?.polity.text).toContain('复位');
  expect(historicalDetail('byzantium',740)?.polity.text).toContain('共治');
  expect(historicalDetail('byzantium',775)?.polity.text).toContain('利奥四世');
  expect(historicalDetail('byzantium',780)?.polity.text).toContain('摄政');
  expect(historicalDetail('byzantium',796)?.polity.text).toContain('权力竞争');
  expect(historicalDetail('byzantium',797)?.polity.text).toContain('独掌');
  expect(historicalDetail('byzantium',800)?.polity.text).toContain('没有让东方国家消失');
  expect(historicalDetail('byzantium',750)?.readingNote).toContain('762');
 });
 it('keeps actual event areas visible only in their evidenced years and distinguishes two Kherson locations',()=>{
  for(const [id,y] of [['akroinon',740],['ardabil',730]] as const){
   expect(early500PlaceIds(y-1)).not.toContain(id);expect(early500PlaceIds(y)).toContain(id);expect(early500PlaceIds(y+1)).not.toContain(id);
  }
  expect(historicalDetail('cherson-taurica',711)?.kind).toBe('事件地点');expect(historicalDetail('cherson-taurica',712)?.kind).toBe('历史城市');
  const p=blackSeaPlaces.find(p=>p.id==='cherson-taurica')!;expect(p.coords[1]).toBeLessThan(45);expect(p.description).toContain('不是第聂伯河');
  expect(blackSeaPlaces.find(p=>p.id==='dvin')?.description).toContain('预备名单');
  expect(historicalDetail('derbent',737)?.polity.text).toContain('不能把可萨政权标为就此灭亡');
 });
 it('retains same-year Iberian and African events rather than replacing them with eastern ones',()=>{
  expect(turningPointAt(711)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['cherson-taurica','byzantium','cordoba','toledo']));
  expect(turningPointAt(711)?.after).toContain('阿拉伯与柏柏尔');
  expect(turningPointAt(740)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['akroinon','kairouan']));
  expect(turningPointAt(740)?.after).toContain('大规模起事');
  expect(turningPointAt(730)?.places[0][0]).toBe('ardabil');expect(turningPointAt(737)?.places[0][0]).toBe('derbent');
  expect(turningPointAt(705)).toBeDefined();expect(turningPointAt(797)).toBeDefined();
  const ids=new Set(ancientPlaces.map(p=>p.id));expect(ids.size).toBe(ancientPlaces.length);
  for(const e of historicalTurningPoints)for(const [id] of e.places)expect(ids.has(id),e.year+':'+id).toBe(true);
  expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
 });
 it('retains continuous regional years, non-overlapping new details and valid sources',()=>{
  for(let y=500;y<=800;y++)for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=y&&y<=p.to),r.id+y).toHaveLength(1);
  for(const y of [705,711,717,719,740,741,750,754,775,780,787,797])expect(earlyRegionAt('anatolia',y)?.phase.from).toBe(y);
  for(const d of blackSeaDetails){
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);
   for(let y=d.from;y<=d.to;y++)expect(historicalDetails.filter(a=>a.placeId===d.placeId&&a.from<=y&&y<=a.to)).toHaveLength(1);
  }
  for(let y=701;y<=800;y++)for(const [region,count] of [['anatolia',3],['caucasus',4],['east',2]] as const){
   const cards=blackSeaPolitiesAt(region,y);expect(cards).toHaveLength(count);
   for(const c of cards)expect(regionalPolitiesAt(region,y).some(p=>p.id===c.id)).toBe(true);
   for(const c of cards){if(!c.bounds)expect(historicalDetail(c.site,y),c.site+y).toBeDefined();for(const key of c.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);}
  }
  expect(blackSeaPolitiesAt('anatolia',700)).toEqual([]);expect(blackSeaPolitiesAt('east',801)).toEqual([]);
  console.info(JSON.stringify({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),events:historicalTurningPoints.length,eighthCentury:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length,newPlaces:blackSeaPlaces.length,newLocalDetails:blackSeaDetails.length,courtStages:byzantineCourtStages.length}));
 });
 it('uses geography for the Khazar political space without inventing a single capital',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();render(<Early500Guide year={737} selected="caucasus" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'高加索与亚美尼亚地方政权详解'});expect(within(local).getAllByRole('article')).toHaveLength(4);
  fireEvent.click(within(local).getByRole('button',{name:'在地图上查看可萨与北高加索方向 →'}));expect(onLocate).toHaveBeenCalledWith([[35,43],[50,49]]);expect(onPlace).not.toHaveBeenCalled();
 });
 it('navigates from an Anatolian battle to its court and returns to the same year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=740&earlyRegion=anatolia');render(<EuropeApp/>);
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});fireEvent.click(within(guide).getByRole('button',{name:/阿克罗伊农 · 会战地区/}));
  expect(location.search).toContain('place=akroinon');expect(screen.getByRole('heading',{name:'阿克罗伊农地区'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 740 年的地域与政权'}));
  const local=screen.getByRole('region',{name:'安纳托利亚地方政权详解'});fireEvent.click(within(local).getByRole('button',{name:'定位君士坦丁堡并查看资料 →'}));
  expect(location.search).toContain('place=byzantium');expect(location.search).toContain('year=740');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 740 年的地域与政权'}));expect(location.search).toContain('earlyRegion=anatolia');
  await act(async()=>{});
 });
});
