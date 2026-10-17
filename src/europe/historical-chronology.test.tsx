// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {act,cleanup,fireEvent,render,screen,within} from '@testing-library/react';
import {historicalTurningPoints,chronologyPeriods,turningPointAt} from './historical-chronology';
import {historicalDetail,historicalDetails,historyWindows,historySources} from './history-details';
import {ancientPlaces,placeLabel} from './model';
import {modernHistoryPlaces} from './modern-history-cities';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:({atlas,overlay}:{atlas:{places:{id:string}[]};overlay:{areas:{features:unknown[]}}})=><div><span data-testid="event-map-pins">{atlas.places.map(p=>p.id).join(',')}</span><span data-testid="event-map-areas">{overlay.areas.features.length}</span></div>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:15000});
describe('post-600 dated chronology',()=>{
 it('has ordered, unique, sourced changes and valid map anchors',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id)),years=historicalTurningPoints.map(e=>e.year);
  expect(new Set(years).size).toBe(years.length);expect(years).toEqual([...years].sort((a,b)=>a-b));expect(years.length).toBeGreaterThan(45);
  for(const e of historicalTurningPoints){
   expect(chronologyPeriods.some(p=>p.from<=e.year&&p.to>=e.year)).toBe(true);
   for(const text of [e.title,e.before,e.after,e.spatial,e.people])expect(text.length).toBeGreaterThan(5);
   expect(e.sources.length).toBeGreaterThan(0);for(const source of e.sources)expect(historySources[source].url).toMatch(/^https:\/\//);
   for(const [id] of e.places)expect(ids.has(id),`${e.year}: ${id}`).toBe(true);
   expect(historyWindows.filter(w=>w.year===e.year)).toHaveLength(1);
  }
  expect(turningPointAt(775)).toBeUndefined();
 });
 it('separates conquest, independent emirate and caliphal titles',()=>{
  expect(historicalDetail('cordoba',755)).toBeUndefined();
  expect(historicalDetail('cordoba',756)?.polity.text).toContain('埃米尔');
  expect(historicalDetail('cordoba',928)?.polity.text).toContain('埃米尔');
  expect(historicalDetail('cordoba',929)?.polity.text).toContain('哈里发');
  expect(historicalDetail('pavia',773)?.polity.text).toContain('伦巴第');
  expect(historicalDetail('pavia',774)?.polity.text).toContain('法兰克');
  expect(historicalDetail('pavia',855)?.polity.text).toContain('路易二世');
 });
 it('changes Egyptian local control on the actual dynasty transitions',()=>{
  for(const [year,name] of [[749,'倭马亚'],[750,'阿拔斯'],[867,'阿拔斯'],[868,'图伦'],[904,'图伦'],[905,'阿拔斯'],[934,'阿拔斯'],[935,'伊赫什德'],[968,'伊赫什德'],[969,'法蒂玛']] as const)expect(historicalDetail('alexandria',year)?.polity.text).toContain(name);
  expect(historicalDetail('kairouan',908)?.polity.text).toContain('阿格拉布');expect(historicalDetail('kairouan',909)?.polity.text).toContain('法蒂玛');
  expect(historicalDetail('cairo',968)).toBeUndefined();expect(historicalDetail('cairo',969)?.kind).toBe('早期中心');expect(historicalDetail('cairo',973)?.kind).toBe('帝国都城');
  expect(historicalDetail('baghdad',944)?.polity.text).toContain('阿拔斯');expect(historicalDetail('baghdad',945)?.polity.text).toContain('白益');
 });
 it('preserves specific old records and avoids competing city records',()=>{
  expect(historicalDetail('alexandria',700)?.id).toBe('alexandria-700');
  for(const id of ['damascus','alexandria','kairouan','pavia','baghdad'])for(let year=600;year<=1000;year++)expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=year&&d.to>=year).length,`${id} ${year}`).toBeLessThanOrEqual(1);
 });
 it('navigates exact event years without silently selecting a nearby snapshot',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));history.replaceState(null,'','/?year=711');render(<EuropeApp/>);fireEvent.click(screen.getByRole('button',{name:/^年代$/}));
  expect((screen.getByLabelText('选择资料年代') as HTMLSelectElement).value).toBe('711');expect(screen.getByRole('article',{name:'711 年关键变化'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:/726 →/}));expect(location.search).toContain('year=726');
  fireEvent.click(screen.getByRole('button',{name:/732 →/}));expect(location.search).toContain('year=732');expect(screen.getByRole('article',{name:'732 年关键变化'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:/750 →/}));
  expect(location.search).toContain('year=750');expect(screen.getByRole('article',{name:'750 年关键变化'})).toBeTruthy();expect(screen.queryByRole('article',{name:'711 年关键变化'})).toBeNull();
  fireEvent.change(screen.getByLabelText('选择资料年代'),{target:{value:'774'}});expect(location.search).toContain('year=774');expect(screen.getByTestId('event-map-pins').textContent).toContain('pavia');
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'775'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect((screen.getByLabelText('选择资料年代') as HTMLSelectElement).value).toBe('775');expect(screen.queryByRole('article',{name:'774 年关键变化'})).toBeNull();
  await act(async()=>{});
 });
 it('requires explicit opt-in for borrowed boundaries and resets it on a new year',async()=>{
  const fc={type:'FeatureCollection',features:[{type:'Feature',properties:{name:'Umayyad Caliphate',subject:'Umayyad Caliphate'},geometry:{type:'Polygon',coordinates:[[[10,40],[20,40],[20,50],[10,40]]]}}]};
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>fc})));history.replaceState(null,'','/?year=711');render(<EuropeApp/>);fireEvent.click(screen.getByRole('button',{name:/^年代$/}));
  await act(async()=>{});expect(screen.getByTestId('event-map-areas').textContent).toBe('0');
  const chronology=screen.getByRole('region',{name:'600 年后的关键年份'});fireEvent.click(within(chronology).getByRole('checkbox',{name:/叠加 700 年/}));expect(screen.getByTestId('event-map-areas').textContent).toBe('1');
  fireEvent.change(screen.getByLabelText('选择资料年代'),{target:{value:'774'}});expect(screen.getByTestId('event-map-areas').textContent).toBe('0');await act(async()=>{});
 });
});

describe('modern political transitions and exact navigation',()=>{
 it('uses city names rather than region names in modern comparison',()=>{
  for(const p of modernHistoryPlaces)expect(placeLabel(p,1993,true)).toBe(p.name);
 });
 it('separates Italian unification, annexation and capital relocation',()=>{
  expect(historicalDetail('turin',1861)?.polity.text).toContain('最初首都');
  expect(historicalDetail('rome',1861)?.polity.text).toContain('尚未并入');
  expect(historicalDetail('rome',1870)?.polity.text).toContain('并入');
  expect(historicalDetail('rome',1871)?.polity.text).toContain('政府迁入');
  expect(historicalDetail('rome',1862)).toBeUndefined();
 });
 it('distinguishes occupying forces, siege and statehood',()=>{
  expect(historicalDetail('vienna',1867)?.polity.text).toContain('匈牙利另有');
  expect(historicalDetail('berlin',1867)?.polity.text).toContain('帝国尚未成立');
  expect(historicalDetail('rome',1943)?.polity.text).toContain('德军占领');
  expect(historicalDetail('rome',1944)?.polity.text).toContain('盟军进入');
  expect(historicalDetail('moscow',1941)?.polity.text).toContain('未被德军占领');
  expect(historicalDetail('petersburg',1941)?.title).toBe('列宁格勒');
  expect(historicalDetail('warsaw',1940)?.people.text).toContain('强迫');
 });
 it('does not backdate German unity, EU establishment or euro cash',()=>{
  expect(turningPointAt(1989)?.after).toContain('尚未');
  expect(turningPointAt(1990)?.after).toContain('10 月 3 日');
  expect(turningPointAt(1992)?.after).toContain('1993');
  expect(turningPointAt(1993)?.after).toContain('正式成立');
  expect(turningPointAt(1999)?.after).toContain('2002');
  expect(turningPointAt(1917)?.spatial).toContain('还不能称作');
 });
 it('crosses 1648 and keeps a custom late date free of inherited events',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));history.replaceState(null,'','/?year=1648');render(<EuropeApp/>);fireEvent.click(screen.getByRole('button',{name:/^年代$/}));
  fireEvent.click(screen.getByRole('button',{name:/1660 →/}));expect(location.search).toContain('year=1660');expect(screen.getByRole('article',{name:'1660 年关键变化'})).toBeTruthy();
  fireEvent.change(screen.getByLabelText('选择资料年代'),{target:{value:'1992'}});expect(screen.getByTestId('event-map-pins').textContent).toContain('brussels');expect(screen.getByRole('article',{name:'1992 年关键变化'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:/1993 →/}));expect(location.search).toContain('year=1993');
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'1994'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect((screen.getByLabelText('选择资料年代') as HTMLSelectElement).value).toBe('1994');expect(screen.queryByRole('article',{name:'1993 年关键变化'})).toBeNull();expect(screen.getByRole('region',{name:'600 年后的关键年份'})).toBeTruthy();await act(async()=>{});
 });
});
