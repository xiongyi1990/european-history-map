// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {early700LocalPlaces,early700LocalDetails,africanPolitiesAt} from './early-700-localities';
import {earlyRegionAt,early500PlaceIds} from './early-500-regions';
import {historicalDetail,historySources} from './history-details';
import {turningPointAt} from './historical-chronology';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:()=> <div/>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:15000});
describe('eighth century local powers and real event locations',()=>{
 it('separates local polity dates and hides later centers',()=>{
  expect(africanPolitiesAt(756)).toEqual([]);
  expect(africanPolitiesAt(757).map(p=>p.id)).toEqual(['sijilmasa']);
  expect(africanPolitiesAt(776).map(p=>p.id)).not.toContain('rustamid');
  expect(africanPolitiesAt(777).map(p=>p.id)).toContain('rustamid');
  expect(africanPolitiesAt(787).map(p=>p.id)).not.toContain('idrisid');
  expect(africanPolitiesAt(788)).toHaveLength(3);
  expect(africanPolitiesAt(801)).toEqual([]);
  for(const y of [757,777,788])for(const p of africanPolitiesAt(y))expect(early500PlaceIds(y)).toContain(p.site);
  expect(early500PlaceIds(700)).not.toContain('lindisfarne');
  expect(early500PlaceIds(701)).toContain('lindisfarne');
  expect(early500PlaceIds(778)).toContain('roncesvalles');
  expect(early500PlaceIds(779)).not.toContain('roncesvalles');
 });
 it('changes Kairouan control instead of applying an Abbasid label to the whole period',()=>{
  expect(historicalDetail('kairouan',758)?.polity.text).toContain('伊巴德');
  expect(historicalDetail('kairouan',760)?.polity.text).toContain('伊巴德');
  expect(historicalDetail('kairouan',761)?.polity.text).toContain('纪年差异');
  expect(historicalDetail('kairouan',772)?.polity.text).toContain('年内变化');
  expect(historicalDetail('kairouan',777)?.polity.text).toContain('更西面');
  expect(earlyRegionAt('africa',758)?.phase.control).toContain('阿布·哈塔卜');
  expect(earlyRegionAt('africa',777)?.phase.control).toContain('鲁斯塔姆');
  expect(turningPointAt(777)?.after).toContain('776／777');
 });
 it('locates actual targets and marks approximate points and later buildings',()=>{
  expect(turningPointAt(793)?.places.map(([id])=>id)).toContain('lindisfarne');
  expect(turningPointAt(778)?.places.map(([id])=>id)).toContain('roncesvalles');
  expect(historicalDetail('lindisfarne',793)?.kind).toBe('事件地点');
  expect(historicalDetail('lindisfarne',792)?.nameNote.text).toContain('后世');
  expect(historicalDetail('roncesvalles',778)?.nameNote.text).toContain('具体伏击地点');
  expect(historicalDetail('tahert',776)).toBeUndefined();
  expect(historicalDetail('sijilmasa',757)?.nameNote.text).toContain('形成传统');
  for(const p of early700LocalPlaces){expect(p.source).toMatch(/^https:/);expect(p.coords[0]).toBeGreaterThan(-25);expect(p.coords[1]).toBeGreaterThan(24);}
  for(const d of early700LocalDetails)for(const f of [d.polity,d.people,d.language,d.nameNote])for(const key of f.sources)expect(historySources[key]?.url,key).toMatch(/^https:/);
 });
 it('opens a local African capital and returns to the same year and regional guide',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=788&earlyRegion=africa');render(<EuropeApp/>);
  const local=screen.getByRole('region',{name:'北非地方政权详解'});
  expect(within(local).getAllByRole('article')).toHaveLength(3);
  fireEvent.click(within(local).getByRole('button',{name:'定位塔赫尔特并查看资料 →'}));
  expect(location.search).toContain('place=tahert');expect(location.search).toContain('year=788');
  expect(screen.getByRole('heading',{name:'塔赫尔特'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 788 年的地域与政权'}));
  expect(location.search).toContain('earlyRegion=africa');expect(location.search).not.toContain('place=');
  await act(async()=>{});
 });
});
