// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {act,cleanup,fireEvent,render,screen,within} from '@testing-library/react';
import {historicalTurningPoints,chronologyPeriods,turningPointAt} from './historical-chronology';
import {historicalDetail,historicalDetails,historyWindows,historySources} from './history-details';
import {ancientPlaces} from './model';
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
