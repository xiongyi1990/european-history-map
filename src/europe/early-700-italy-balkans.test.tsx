// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {italyBalkanPlaces,italyBalkanDetails,regionalPolitiesAt} from './early-700-italy-balkans';
import {earlyRegionAt,early500PlaceIds} from './early-500-regions';
import {historicalDetail,historicalDetails,historySources} from './history-details';
import {turningPointAt,historicalTurningPoints} from './historical-chronology';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:()=> <div/>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:15000});
describe('eighth century Italy and Balkan political spaces',()=>{
 it('keeps the northern conquest distinct from southern continuity and dated papal land',()=>{
  expect(regionalPolitiesAt('italy',700)).toEqual([]);
  expect(regionalPolitiesAt('italy',801)).toEqual([]);
  expect(regionalPolitiesAt('italy',727).find(p=>p.id==='papal')?.control).toContain('尚未发生');
  expect(regionalPolitiesAt('italy',728).find(p=>p.id==='papal')?.site).toBe('sutri');
  expect(historicalDetail('spoleto',728)?.polity.text).toContain('自主性');
  expect(historicalDetail('spoleto',729)?.polity.text).toContain('729');
  expect(historicalDetail('spoleto',774)?.polity.text).toContain('法兰克控制');
  expect(historicalDetail('benevento',774)?.polity.text).toContain('没有');
  expect(historicalDetail('benevento',787)?.polity.text).toContain('质子');
  for(let year=701;year<=800;year++){
   const cards=regionalPolitiesAt('italy',year);
   expect(cards,`Italy ${year}`).toHaveLength(5);
   expect(new Set(cards.map(p=>p.id)).size).toBe(5);
   for(const id of ['spoleto','benevento','sutri']){
    expect(early500PlaceIds(year)).toContain(id);
    expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=year&&d.to>=year),id+year).toHaveLength(1);
   }
  }
 });
 it('locates both battles only in their evidenced years and preserves the two states',()=>{
  expect(early500PlaceIds(762)).not.toContain('anchialos');
  expect(early500PlaceIds(763)).toContain('anchialos');
  expect(early500PlaceIds(764)).not.toContain('anchialos');
  expect(early500PlaceIds(756)).toContain('markellai');
  expect(early500PlaceIds(791)).not.toContain('markellai');
  expect(early500PlaceIds(792)).toContain('markellai');
  expect(early500PlaceIds(793)).not.toContain('markellai');
  expect(earlyRegionAt('balkans',763)?.phase.control).toContain('君士坦丁五世');
  expect(earlyRegionAt('balkans',792)?.phase.control).toContain('君士坦丁六世');
  expect(regionalPolitiesAt('balkans',763)).toHaveLength(2);
  expect(regionalPolitiesAt('balkans',776)[0].control).not.toContain('卡尔达姆时期');
  expect(regionalPolitiesAt('balkans',777)[0].control).toContain('777／778');
  for(const year of [728,729,763,792])expect(turningPointAt(year)).toBeDefined();
  expect(turningPointAt(774)?.places.map(([id])=>id)).toContain('benevento');
  expect(turningPointAt(787)?.places.map(([id])=>id)).toEqual(expect.arrayContaining(['nicaea','benevento']));
  expect(new Set(historicalTurningPoints.map(e=>e.year)).size).toBe(historicalTurningPoints.length);
 });
 it('keeps coordinate precision, course references and independent sources attached',()=>{
  for(const p of italyBalkanPlaces){expect(p.source).toMatch(/^https:/);expect(p.description).toMatch(/代表|参照|参考/)}
  for(const d of italyBalkanDetails){
   expect(d.polity.sources.length).toBeGreaterThan(0);
   for(const f of [d.polity,d.territory,d.nameNote,d.language,d.people])for(const source of f.sources)expect(historySources[source]?.url,source).toMatch(/^https:/);
  }
  expect(historicalDetail('benevento',774)?.reading?.[0].chapter).toBe(141);
  expect(historicalDetail('sutri',728)?.reading?.[0].chapter).toBe(147);
  expect(historicalDetail('anchialos',763)?.nameNote.text).toContain('不是 763 年会战中心');
  expect(historicalDetail('markellai',792)?.nameNote.text).toContain('不是 756／792 年战场中心');
 });
 it('opens southern Italy after 774 and returns without losing the selected year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=774&earlyRegion=italy');render(<EuropeApp/>);
  const local=screen.getByRole('region',{name:'意大利地方政权详解'});
  expect(within(local).getAllByRole('article')).toHaveLength(5);
  fireEvent.click(within(local).getByRole('button',{name:'定位贝内文托并查看资料 →'}));
  expect(location.search).toContain('place=benevento');expect(location.search).toContain('year=774');
  expect(screen.getByRole('heading',{name:'贝内文托'})).toBeTruthy();
  expect(screen.getByText(/课程第 141 讲以北部征服/)).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 774 年的地域与政权'}));
  expect(location.search).toContain('earlyRegion=italy');expect(location.search).not.toContain('place=');
  await act(async()=>{});
 });
 it('follows the Balkan region into the correct battle and back',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=763&earlyRegion=balkans');render(<EuropeApp/>);
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});
  fireEvent.click(within(guide).getByRole('button',{name:/安基阿洛斯 · 战役地区/}));
  expect(location.search).toContain('place=anchialos');expect(location.search).toContain('year=763');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 763 年的地域与政权'}));
  const next=screen.getByRole('region',{name:'500—800 年连续地域导览'});
  fireEvent.click(within(next).getByRole('button',{name:/792\s*马尔凯莱/}));
  expect(location.search).toContain('year=792');expect(location.search).toContain('earlyRegion=balkans');
  fireEvent.click(within(next).getByRole('button',{name:/马尔凯莱 · 战役地区/}));
  expect(location.search).toContain('place=markellai');
  await act(async()=>{});
 });
});
