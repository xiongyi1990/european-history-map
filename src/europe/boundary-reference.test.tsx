// @vitest-environment jsdom
import {afterEach,describe,expect,it,vi} from 'vitest';
import {render,screen,fireEvent,cleanup,waitFor,act} from '@testing-library/react';
import {EuropeApp} from './EuropeApp';
import {YearBoundaryKey} from './YearReadingGuide';
import {boundaryYearLabel,boundaryYearDistance} from './boundary-reference';
import {makeAreas} from './model';
import raw1914 from '../../public/historical-boundaries/world_1914.geojson?raw';
vi.mock('../greek/GreekMap',()=>({GreekMap:({atlas,overlay}:{atlas:{places:{id:string}[]};overlay:{areas:GeoJSON.FeatureCollection;labels:{id:string;name:string}[]}})=><div><output data-testid="boundary-polygons">{overlay.areas.features.map(f=>f.properties?.name).join(',')}</output><output data-testid="boundary-pins">{atlas.places.map(p=>p.id).join(',')}</output></div>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:20000});
const empty={type:'FeatureCollection',features:[]};
const geometry={type:'Polygon',coordinates:[[[20,35],[30,35],[30,45],[20,45],[20,35]]]};
const fixture=(name:string)=>({type:'FeatureCollection',features:[{type:'Feature',properties:{name,subject:name},geometry}]});
const mockFetch=(name:string)=>vi.stubGlobal('fetch',vi.fn(async(url:string)=>({ok:true,json:async()=>String(url).includes('historical-boundaries')?fixture(name):empty})));
describe('One date rule for all historical eras',()=>{
 it('formats BCE labels and counts the BCE/CE boundary without a year zero',()=>{
  expect(boundaryYearLabel(-400)).toBe('公元前 400 年');expect(boundaryYearDistance(-431,-400)).toBe(31);expect(boundaryYearDistance(-1,1)).toBe(1);expect(boundaryYearDistance(-100,100)).toBe(199);
  render(<YearBoundaryKey year={-431} boundaryYear={-400} borrowed onBorrowed={vi.fn()}/>);expect(screen.getByText(/相差 31 年/)).toBeTruthy();expect(screen.getByRole('checkbox',{name:'叠加 公元前 400 年疆界参考'})).toBeTruthy();expect(screen.getByRole('complementary').textContent).not.toContain('-400');expect(screen.getByRole('complementary').textContent).not.toContain('公元 -431');
 });
 it('keeps the 431 BCE city/ally reference available while hiding the 400 BCE polygons until opt-in',async()=>{
  mockFetch('Achaemenid Empire');history.replaceState(null,'','/?year=-431');render(<EuropeApp/>);fireEvent.click(screen.getByRole('button',{name:'年代'}));await waitFor(()=>expect(screen.getByText(/公元前 431 年 · 邻近疆界未叠加/)).toBeTruthy());expect(screen.getByTestId('boundary-polygons').textContent).toBe('');expect(screen.getByTestId('boundary-pins').textContent).toContain('athens');expect(screen.getByText('雅典一方')).toBeTruthy();fireEvent.click(screen.getByRole('checkbox',{name:'叠加 公元前 400 年疆界参考'}));await waitFor(()=>expect(screen.getByTestId('boundary-polygons').textContent).toContain('Achaemenid Empire'));expect(screen.getByText(/相差 31 年/)).toBeTruthy();expect(location.search).toBe('?year=-431');
 });
 it('also requires deliberate borrowing at Roman dates and resets on another historical year',async()=>{
  mockFetch('Roman Empire');history.replaceState(null,'','/?year=117');render(<EuropeApp/>);fireEvent.click(screen.getByRole('button',{name:'年代'}));await waitFor(()=>expect(screen.getByText(/公元 117 年 · 邻近疆界未叠加/)).toBeTruthy());expect(screen.getByTestId('boundary-polygons').textContent).toBe('');fireEvent.click(screen.getByRole('checkbox',{name:'叠加 100 年疆界参考'}));await waitFor(()=>expect(screen.getByTestId('boundary-polygons').textContent).toContain('Roman Empire'));fireEvent.change(screen.getByRole('textbox',{name:'输入历史年份'}),{target:{value:'118'}});fireEvent.click(screen.getByRole('button',{name:'前往输入年份'}));expect(screen.getByTestId('boundary-polygons').textContent).toBe('');expect((screen.getByRole('checkbox',{name:'叠加 100 年疆界参考'}) as HTMLInputElement).checked).toBe(false);await act(async()=>{});
 });
 it('shows same-year geometry normally and does not label it as borrowed',async()=>{
  mockFetch('Roman Empire');history.replaceState(null,'','/?year=100');render(<EuropeApp/>);fireEvent.click(screen.getByRole('button',{name:'年代'}));await waitFor(()=>expect(screen.getByTestId('boundary-polygons').textContent).toContain('Roman Empire'));expect(screen.queryByRole('checkbox',{name:/叠加/})).toBeNull();expect(screen.getByText(/同年概略疆界/)).toBeTruthy();
 });
 it('does not retain a borrowed snapshot after switching to modern and back',async()=>{
  mockFetch('Achaemenid Empire');history.replaceState(null,'','/?year=-431');render(<EuropeApp/>);fireEvent.click(screen.getByRole('button',{name:'年代'}));fireEvent.click(screen.getByRole('checkbox',{name:'叠加 公元前 400 年疆界参考'}));await waitFor(()=>expect(screen.getByTestId('boundary-polygons').textContent).toContain('Achaemenid Empire'));fireEvent.click(screen.getByRole('button',{name:'现代对照'}));fireEvent.click(screen.getByRole('button',{name:'回到历史'}));expect(screen.getByTestId('boundary-polygons').textContent).toBe('');expect((screen.getByRole('checkbox',{name:'叠加 公元前 400 年疆界参考'}) as HTMLInputElement).checked).toBe(false);await act(async()=>{});
 });
 it('applies 1914 political context and parent colour without changing source geometry or other years',()=>{
  const fc=JSON.parse(raw1914) as GeoJSON.FeatureCollection;const areas=makeAreas(fc,false,1914);const get=(name:string)=>areas.find(a=>a.original===name)!;const russian=get('Russian Empire');
  for(const name of ['Finland','Georgia','Azerbaijan']){expect(get(name).subject).toBe(russian.subject);expect(get(name).color).toBe(russian.color);expect(get(name).categoryLabel).toBeTruthy();expect(get(name).contextYear).toBe(1914);expect(get(name).feature.geometry).toEqual(fc.features.find(f=>f.properties?.name===name)!.geometry);}
  for(const name of ['Armenia','Morocco']){expect(get(name).kind).toBe('reference');expect(get(name).context?.reference).toBe(true);}
  expect(makeAreas(fc,false,1900).find(a=>a.original==='Finland')!.context).toBeUndefined();expect(makeAreas(fc,false,1914).find(a=>a.original==='France')!.categoryLabel).toContain('待逐项核对');
 });
});
