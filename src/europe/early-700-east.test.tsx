// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {easternPlaces,easternDetails,easternPolitiesAt} from './early-700-east';
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
describe('Levant, Egypt and Mesopotamia: cities, foundations and court movements',()=>{
 it('adds separate urban reference points with historical and modern names',()=>{
  expect(easternPlaces).toHaveLength(6);expect(easternDetails).toHaveLength(19);
  const ids=new Set(ancientPlaces.map(p=>p.id));expect(ids.size).toBe(ancientPlaces.length);
  for(const p of easternPlaces){expect(ids.has(p.id)).toBe(true);expect(p.source).toMatch(/^https:/);}
  expect(easternPlaces.find(p=>p.id==='wasit')?.description).toContain('不是现代瓦西特省');
  expect(easternPlaces.find(p=>p.id==='raqqa')?.description).toContain('新建拉菲卡紧邻旧拉卡');
  expect(easternPlaces.find(p=>p.id==='fustat')?.description).toContain('969');
 });
 it('shows foundations only from the explicitly selected approximate dating convention',()=>{
  for(const [id,year] of [['fustat',641],['wasit',702],['ramla',715],['baghdad',762]] as const){
   expect(early500PlaceIds(year-1),id).not.toContain(id);expect(early500PlaceIds(year),id).toContain(id);
  }
  expect(historicalDetail('wasit',702)?.polity.text).toContain('建设阶段');expect(historicalDetail('wasit',705)?.polity.text).toContain('行政与军事');
  expect(historicalDetail('ramla',715)?.polity.text).toContain('715／716');
  expect(historicalDetail('raqqa',771)?.polity.text).toContain('还没有建立');expect(historicalDetail('raqqa',772)?.polity.text).toContain('旧拉卡旁建拉菲卡');
 });
 it('preserves unique dated details and sourced geographic/social fields',()=>{
  for(const d of easternDetails){
   for(let y=d.from;y<=d.to;y++)expect(historicalDetails.filter(x=>x.placeId===d.placeId&&x.from<=y&&y<=x.to),d.id+y).toHaveLength(1);
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);
   for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);
  }
  expect(historicalDetail('kufa',749)?.kind).toBe('事件地点');expect(historicalDetail('kufa',750)?.polity.text).toContain('希拉');
  expect(historicalDetail('fustat',750)?.polity.text).toContain('以北');
 });
 it('separates Damascus from Harran and Baghdad from the actual Raqqa court',()=>{
  for(let y=661;y<=800;y++)expect(historicalDetails.filter(d=>d.placeId==='damascus'&&d.from<=y&&y<=d.to),String(y)).toHaveLength(1);
  expect(historicalDetail('damascus',700)?.kind).toBe('帝国都城');expect(historicalDetail('damascus',743)?.kind).toBe('帝国都城');
  expect(historicalDetail('damascus',744)?.kind).toBe('历史城市');expect(historicalDetail('harran',744)?.kind).toBe('宫廷驻地');
  expect(historicalDetail('damascus',750)?.polity.text).toContain('796');expect(historicalDetail('harran',750)?.kind).toBe('历史城市');
  for(let y=762;y<=900;y++)expect(historicalDetails.filter(d=>d.placeId==='baghdad'&&d.from<=y&&y<=d.to),String(y)).toHaveLength(1);
  expect(historicalDetail('raqqa',795)?.kind).toBe('历史城市');expect(historicalDetail('raqqa',796)?.kind).toBe('宫廷驻地');
  expect(historicalDetail('baghdad',800)?.polity.text).toContain('拉卡');expect(historicalDetail('baghdad',800)?.polity.text).not.toContain('寻找哈里发宫廷');
  expect(historicalDetail('baghdad',843)?.kind).toBe('历史城市');expect(historicalDetail('baghdad',900)?.kind).toBe('帝国都城');
 });
 it('keeps every regional year continuous and every visible local card actionable',()=>{
  for(let y=500;y<=800;y++)for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=y&&y<=p.to),r.id+y).toHaveLength(1);
  for(let y=701;y<=800;y++)for(const region of ['levant','egypt','mesopotamia']){
   const cards=regionalPolitiesAt(region,y);expect(cards.length).toBeGreaterThanOrEqual(region==='mesopotamia'&&y===701?2:3);
   for(const c of cards){if(!c.bounds)expect(historicalDetail(c.site,y),c.site+y).toBeDefined();for(const key of c.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);}
  }
  expect(earlyRegionAt('mesopotamia',749)?.phase.mapName).toContain('仍在抵抗');
  expect(earlyRegionAt('levant',796)?.phase.control).toContain('巴格达');
  expect(easternPolitiesAt('levant',700)).toEqual([]);expect(easternPolitiesAt('egypt',801)).toEqual([]);
  console.info(JSON.stringify({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),events:historicalTurningPoints.length,eighthCentury:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length,newPlaces:easternPlaces.length,newLocalDetails:easternDetails.length}));
 });
 it('retains independent same-year events and valid timeline location references',()=>{
  for(const y of [702,715,744,749])expect(turningPointAt(y)).toBeDefined();
  expect(turningPointAt(705)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['wasit','byzantium','pliska']));
  expect(turningPointAt(772)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['raqqa','aachen']));
  expect(turningPointAt(796)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['raqqa','baghdad','tamworth','york']));
  expect(turningPointAt(750)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['kufa','harran','fustat','cordoba']));
  expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
  for(const e of historicalTurningPoints)for(const [id] of e.places)expect(ancientPlaces.some(p=>p.id===id),e.year+':'+id).toBe(true);
 });
 it('opens an Egyptian city or locates the valley without inventing a border',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();render(<Early500Guide year={750} selected="egypt" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'埃及地方政权详解'});expect(within(local).getAllByRole('article')).toHaveLength(3);
  fireEvent.click(within(local).getByRole('button',{name:'在地图上查看尼罗河三角洲与河谷 →'}));expect(onLocate).toHaveBeenCalledWith([[29,24],[33,31.7]]);
  fireEvent.click(within(local).getByRole('button',{name:'定位福斯塔特并查看资料 →'}));expect(onPlace).toHaveBeenCalledWith('fustat');
 });
 it('returns from the actual court to the same regional year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=796&earlyRegion=levant');render(<EuropeApp/>);
  const local=screen.getByRole('region',{name:'黎凡特地方政权详解'});fireEvent.click(within(local).getByRole('button',{name:'定位拉卡并查看资料 →'}));
  expect(location.search).toContain('place=raqqa');expect(screen.getByRole('heading',{name:'拉卡'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 796 年的地域与政权'}));
  expect(location.search).toContain('earlyRegion=levant');expect(location.search).toContain('year=796');await act(async()=>{});
 });
});
