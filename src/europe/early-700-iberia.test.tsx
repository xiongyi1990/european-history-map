// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {iberianPlaces,iberianDetails,iberianPolitiesAt} from './early-700-iberia';
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
describe('eighth century Iberian political spaces and court changes',()=>{
 it('changes the northern center without anticipating Oviedo or inventing an Aurelio palace',()=>{
  const north=(year:number)=>regionalPolitiesAt('iberia',year).find(p=>p.id==='asturias');
  expect(iberianPolitiesAt(700)).toEqual([]);expect(iberianPolitiesAt(801)).toEqual([]);
  expect(north(717)).toBeUndefined();expect(north(718)?.site).toBe('cangas-de-onis');
  expect(north(767)?.site).toBe('cangas-de-onis');
  for(const year of [768,773]){expect(north(year)?.site).toBe('');expect(north(year)?.bounds).toBeDefined();}
  for(const year of [774,790])expect(north(year)?.site).toBe('pravia');
  for(const year of [791,800])expect(north(year)?.site).toBe('oviedo');
  expect(historicalDetail('oviedo',760)).toBeUndefined();
  expect(historicalDetail('oviedo',761)?.kind).toBe('早期中心');
  expect(historicalDetail('oviedo',790)?.kind).toBe('早期中心');
  expect(historicalDetail('oviedo',791)?.kind).toBe('王国中心');
  expect(historicalDetail('oviedo',910)).toBeUndefined();
  expect(historicalDetail('cangas-de-onis',768)?.kind).toBe('历史城市');
 });
 it('keeps south, northern mountains, Pyrenees and Septimania separate by year',()=>{
  expect(iberianPolitiesAt(710)[0].site).toBe('toledo');expect(iberianPolitiesAt(711)[0].site).toBe('cordoba');
  expect(iberianPolitiesAt(755)[0].name).toContain('竞争');expect(iberianPolitiesAt(756)[0].name).toContain('埃米尔');
  const sept=(y:number)=>iberianPolitiesAt(y).find(p=>p.id==='septimania');
  expect(sept(718)?.name).toContain('西哥特');expect(sept(719)?.control).toContain('719');expect(sept(719)?.control).toContain('720');expect(sept(719)?.control).toContain('不确定');
  expect(sept(758)?.name).toContain('穆斯林');expect(sept(759)?.name).toContain('法兰克');
  expect(early500PlaceIds(717)).not.toContain('cangas-de-onis');expect(early500PlaceIds(718)).toContain('cangas-de-onis');
  expect(early500PlaceIds(721)).not.toContain('covadonga');expect(early500PlaceIds(722)).toContain('covadonga');
  expect(early500PlaceIds(723)).not.toContain('covadonga');
  expect(early500PlaceIds(760)).not.toContain('oviedo');expect(early500PlaceIds(761)).toContain('oviedo');
  expect(early500PlaceIds(773)).not.toContain('pravia');expect(early500PlaceIds(774)).toContain('pravia');
  for(const id of ['zaragoza','pamplona']){expect(early500PlaceIds(777)).not.toContain(id);expect(early500PlaceIds(778)).toContain(id);expect(early500PlaceIds(779)).not.toContain(id);}
 });
 it('preserves same-year events and links the three expedition locations in narrative order',()=>{
  expect(turningPointAt(778)?.places.slice(0,3).map(([id])=>id)).toEqual(['zaragoza','pamplona','roncesvalles']);
  expect(earlyRegionAt('iberia',778)?.places.map(([id])=>id).filter(id=>['zaragoza','pamplona','roncesvalles'].includes(id))).toEqual(['zaragoza','pamplona','roncesvalles']);
  expect(turningPointAt(722)?.places.map(([id])=>id)).toContain('covadonga');
  for(const [year,ids] of [[761,['kairouan','oviedo']],[774,['pavia','benevento','pravia']],[791,['regensburg','oviedo']]] as const)
   expect(turningPointAt(year)?.places.map(([id])=>id)).toEqual(expect.arrayContaining([...ids]));
  expect(turningPointAt(718)?.places.map(([id])=>id)).toContain('byzantium');
  const ids=new Set(ancientPlaces.map(p=>p.id));
  for(const event of historicalTurningPoints)for(const [id] of event.places)expect(ids.has(id),event.year+':'+id).toBe(true);
  expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
 });
 it('retains continuous regional years, valid sources, non-overlapping details and precision notes',()=>{
  for(let year=500;year<=800;year++)for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=year&&year<=p.to),r.id+year).toHaveLength(1);
  for(const year of [722,759,768,774,778,779,791])expect(earlyRegionAt('iberia',year)?.phase.from).toBe(year);
  for(const d of iberianDetails){
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);
   for(let year=d.from;year<=d.to;year++)expect(historicalDetails.filter(a=>a.placeId===d.placeId&&a.from<=year&&year<=a.to),d.id+year).toHaveLength(1);
  }
  for(let year=701;year<=800;year++)for(const card of iberianPolitiesAt(year)){
   expect(card.bounds||historicalDetail(card.site,year),card.id+year).toBeTruthy();
   for(const source of card.sources)expect(historySources[source]?.url).toMatch(/^https:/);
  }
  expect(new Set(ancientPlaces.map(p=>p.id)).size).toBe(ancientPlaces.length);
  expect(iberianPlaces.find(p=>p.id==='covadonga')?.description).toContain('1877—1901');
  expect(historicalDetail('oviedo',761)?.polity.text).toContain('十二世纪抄本');
  expect(historicalDetail('cangas-de-onis',722)?.readingNote).toContain('北部偏西');
  console.info(JSON.stringify({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),events:historicalTurningPoints.length,eighthCentury:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length,newPlaces:iberianPlaces.length,newDetails:iberianDetails.length}));
 });
 it('locates the uncertain northern court by region without selecting an invented city',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();
  render(<Early500Guide year={768} selected="iberia" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'伊比利亚与纳博讷地方政权详解'});
  expect(within(local).getAllByRole('article')).toHaveLength(4);
  fireEvent.click(within(local).getByRole('button',{name:'在地图上查看纳隆河谷方向 →'}));
  expect(onLocate).toHaveBeenCalledWith([[-5.9,43.15],[-5.45,43.45]]);expect(onPlace).not.toHaveBeenCalled();
 });
 it('opens the 774 court, returns to the region and follows the 778 expedition',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=774&earlyRegion=iberia');render(<EuropeApp/>);
  const local=screen.getByRole('region',{name:'伊比利亚与纳博讷地方政权详解'});
  fireEvent.click(within(local).getByRole('button',{name:'定位普拉维亚并查看资料 →'}));
  expect(location.search).toContain('place=pravia');expect(location.search).toContain('year=774');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 774 年的地域与政权'}));
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});
  fireEvent.click(within(guide).getByRole('button',{name:/778\s*萨拉戈萨/}));
  expect(location.search).toContain('year=778');expect(location.search).toContain('earlyRegion=iberia');
  fireEvent.click(within(guide).getByRole('button',{name:/萨拉戈萨 · 远征受阻/}));
  expect(location.search).toContain('place=zaragoza');
  expect(screen.getByRole('heading',{name:'萨拉戈萨'})).toBeTruthy();
  expect(screen.getByText(/实际守城者立场不同/)).toBeTruthy();
  await act(async()=>{});
 });
});
