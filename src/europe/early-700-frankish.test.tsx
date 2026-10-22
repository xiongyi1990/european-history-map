// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {frankishPlaces,frankishDetails,frankishPolitiesAt} from './early-700-frankish';
import {regionalPolitiesAt} from './early-700-italy-balkans';
import {earlyRegionAt,early500PlaceIds,early500Regions} from './early-500-regions';
import {historicalDetail,historicalDetails,historySources} from './history-details';
import {turningPointAt,historicalTurningPoints} from './historical-chronology';
import {Early500Guide} from './Early500Guide';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:()=> <div/>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:15000});
describe('Frankish courts and central European political layers',()=>{
 it('changes dynasty and dukedom by date while retaining distinct regional powers',()=>{
  expect(frankishPolitiesAt('central',700)).toEqual([]);
  expect(frankishPolitiesAt('gaul',801)).toEqual([]);
  expect(regionalPolitiesAt('gaul',750)[0].name).toContain('墨洛温');
  expect(regionalPolitiesAt('gaul',751)[0].name).toContain('丕平');
  expect(regionalPolitiesAt('gaul',768)[0].name).toContain('分掌');
  expect(historicalDetail('soissons',768)?.polity.text).toContain('卡洛曼在苏瓦松');
  expect(historicalDetail('soissons',771)?.polity.text).toContain('771');
  expect(regionalPolitiesAt('central',787).find(p=>p.id==='bavaria')?.name).toContain('公爵');
  expect(regionalPolitiesAt('central',788).find(p=>p.id==='bavaria')?.name).toContain('更直接');
  expect(regionalPolitiesAt('central',800).find(p=>p.id==='avars')?.control).toContain('不能把全体');
  expect(regionalPolitiesAt('central',785).find(p=>p.id==='saxony')?.control).toContain('804');
  for(let year=701;year<=800;year++){
   expect(regionalPolitiesAt('central',year)).toHaveLength(4);
   expect(regionalPolitiesAt('gaul',year)).toHaveLength(3);
   expect(historicalDetails.filter(d=>d.placeId==='soissons'&&d.from<=year&&year<=d.to)).toHaveLength(1);
  }
 });
 it('shows evidenced event locations at the correct times without confusing two Verden cities',()=>{
  expect(early500PlaceIds(775)).not.toContain('paderborn');
  expect(early500PlaceIds(776)).toContain('paderborn');
  expect(early500PlaceIds(787)).not.toContain('ingelheim');
  expect(early500PlaceIds(788)).toContain('ingelheim');
  expect(early500PlaceIds(781)).not.toContain('verden-aller');
  expect(early500PlaceIds(782)).toContain('verden-aller');
  expect(early500PlaceIds(783)).not.toContain('verden-aller');
  expect(historicalDetail('verden-aller',782)?.polity.text).toContain('不是已核定');
  expect(frankishPlaces.find(p=>p.id==='verden-aller')?.aliases).not.toContain('凡尔登');
  expect(turningPointAt(751)?.places.map(([id])=>id)).toContain('soissons');
  expect(turningPointAt(768)?.places.map(([id])=>id)).toContain('soissons');
  expect(turningPointAt(777)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['paderborn','tahert','kairouan']));
  expect(turningPointAt(788)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['ingelheim','regensburg','volubilis']));
  for(const year of [776,782,799])expect(turningPointAt(year)).toBeDefined();
  expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
 });
 it('preserves continuous phases and source precision with no overlapping city details',()=>{
  for(let year=500;year<=800;year++)for(const r of early500Regions)expect(r.phases.filter(p=>p.from<=year&&year<=p.to),r.id+year).toHaveLength(1);
  expect(earlyRegionAt('central',782)?.phase.from).toBe(782);
  expect(earlyRegionAt('central',785)?.phase.from).toBe(785);
  for(const d of frankishDetails){
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);
   for(let year=d.from;year<=d.to;year++)expect(historicalDetails.filter(a=>a.placeId===d.placeId&&a.from<=year&&year<=a.to),d.id+year).toHaveLength(1);
   expect(d.reading?.[0].chapter).toBe(d.placeId==='soissons'?140:141);
  }
  expect(historicalDetail('soissons',751)?.nameNote.text).toContain('位置未知');
  expect(historicalDetail('paderborn',777)?.nameNote.text).toContain('十一世纪');
  expect(historicalDetail('ingelheim',788)?.nameNote.text).toContain('不是 788 年审判');
 });
 it('uses a camera frame for Avar and Saxon regional geography rather than inventing a capital',()=>{
  const onPlace=vi.fn(),onLocate=vi.fn();
  render(<Early500Guide year={791} selected="central" onRegion={vi.fn()} onYear={vi.fn()} onPlace={onPlace} onLocate={onLocate}/>);
  const local=screen.getByRole('region',{name:'莱茵以东与中多瑙河地方政权详解'});
  expect(within(local).getAllByRole('article')).toHaveLength(4);
  fireEvent.click(within(local).getByRole('button',{name:'在地图上查看阿瓦尔中多瑙河方向 →'}));
  expect(onLocate).toHaveBeenCalledWith([[15,45],[23,49]]);expect(onPlace).not.toHaveBeenCalled();
  expect(within(local).getAllByText(/镜头范围仅帮助找位置/)).toHaveLength(2);
 });
 it('opens the actual trial city and returns to the same regional year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=788&earlyRegion=central');render(<EuropeApp/>);
  const local=screen.getByRole('region',{name:'莱茵以东与中多瑙河地方政权详解'});
  fireEvent.click(within(local).getByRole('button',{name:'定位英格尔海姆并查看资料 →'}));
  expect(location.search).toContain('place=ingelheim');expect(location.search).toContain('year=788');
  expect(screen.getByRole('heading',{name:'英格尔海姆'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 788 年的地域与政权'}));
  expect(location.search).toContain('earlyRegion=central');expect(location.search).not.toContain('place=');
  await act(async()=>{});
 });
});
