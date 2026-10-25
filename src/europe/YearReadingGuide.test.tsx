// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup,act} from '@testing-library/react';
import {yearReadingAt,yearReadingLabels} from './year-reading';
import {YearReadingGuide,YearBoundaryKey} from './YearReadingGuide';
import {earlyRegionAt} from './early-500-regions';
import {historySources} from './history-details';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:({overlay,command,onAreaSelect}:{overlay:{labels:{id:string;name:string}[]};command:{coordinates?:number[][]};onAreaSelect:(id:string)=>void})=><div data-testid="reading-map"><output data-testid="reading-camera">{JSON.stringify(command.coordinates)}</output>{overlay.labels.map(l=><button key={l.id} onClick={()=>onAreaSelect(l.id)}>{l.name}</button>)}</div>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:20000});
describe('Beginner year reading and honest boundary dates',()=>{
 it('has valid political reading groups and dated sources for every year 500-800',()=>{
  for(let y=500;y<=800;y++){
   const r=yearReadingAt(y)!;expect(r.powers).toHaveLength(9);expect(yearReadingLabels(y)).toHaveLength(9);expect(new Set(yearReadingLabels(y).map(l=>l.id)).size).toBe(9);
   for(const p of r.powers)for(const id of p.regions){const a=earlyRegionAt(id,y)!;expect(a).toBeDefined();expect(a.phase.from<=y&&a.phase.to>=y).toBe(true);for(const key of [...a.sources,...a.phase.sources])expect(historySources[key]?.url,key).toMatch(/^https:/);}
   expect(r.recent?.year).toBeLessThanOrEqual(y);expect(r.next?.year).toBeGreaterThan(y);
  }
  expect(yearReadingAt(499)).toBeUndefined();expect(yearReadingAt(801)).toBeUndefined();
 });
 it('does not backdate a dynasty, emperor title, independent emirate or Baghdad',()=>{
  const get=(y:number,id:string)=>yearReadingAt(y)!.powers.find(p=>p.id===id)!;
  expect(get(750,'franks').title).toContain('墨洛温');expect(get(751,'franks').title).toContain('加洛林');expect(get(799,'franks').title).toContain('王国');expect(get(800,'franks').title).toContain('帝国');
  expect(get(755,'iberia').title).not.toContain('埃米尔国');expect(get(756,'iberia').title).toContain('埃米尔国');expect(get(761,'near-east').remember).toContain('762 年才建立');expect(get(762,'near-east').remember).toContain('巴格达是');
  expect(get(773,'italy').title).toContain('伦巴第');expect(get(774,'italy').title).toContain('法兰克');expect(yearReadingAt(750)?.headline).toContain('尚未换成');expect(yearReadingAt(755)?.headline).toContain('尚未建立');
 });
 it('always pairs legend names with current-year reading groups, without replacing polygons',()=>{
  const labels=yearReadingLabels(760);expect(labels.find(l=>l.id==='early500:gaul')?.name).toBe('1 · 法兰克王国');expect(labels.find(l=>l.id==='early500:anatolia')?.name).toBe('2 · 东罗马帝国');expect(labels.find(l=>l.id==='early500:mesopotamia')?.name).toBe('3 · 阿拔斯哈里发国');
  for(const l of labels)expect('geometry' in l).toBe(false);
 });
 it('states a 40-year mismatch explicitly and requires a deliberate borrowed-boundary choice',()=>{
  const change=vi.fn();const {rerender}=render(<YearBoundaryKey year={760} boundaryYear={800} borrowed={false} onBorrowed={change}/>);
  expect(screen.getByText(/目前未叠加 800 年/)).toBeTruthy();fireEvent.click(screen.getByRole('checkbox',{name:'叠加 800 年疆界参考'}));expect(change).toHaveBeenCalledWith(true);
  rerender(<YearBoundaryKey year={760} boundaryYear={800} borrowed={true} onBorrowed={change}/>);expect(screen.getByText(/相差 40 年/)).toBeTruthy();expect(screen.getByText(/不是 760 年的版图/)).toBeTruthy();
  rerender(<YearBoundaryKey year={800} boundaryYear={800} borrowed={false} onBorrowed={change}/>);expect(screen.queryByRole('checkbox')).toBeNull();expect(screen.getByText(/不是精确国界测绘/)).toBeTruthy();
  rerender(<YearBoundaryKey year={760} borrowed={false} onBorrowed={change}/>);expect(screen.queryByRole('checkbox')).toBeNull();expect(screen.getByText(/没有可用的疆界参考/)).toBeTruthy();
 });
 it('locates three different geographic anchors while preserving the selected year',()=>{
  const locate=vi.fn(),region=vi.fn(),year=vi.fn();render(<YearReadingGuide year={760} onRegion={region} onYear={year} onLocate={locate}/>);
  const nav=screen.getByRole('navigation',{name:'三步认识当年地图'});const buttons=within(nav).getAllByRole('button');fireEvent.click(buttons[0]);expect(locate).toHaveBeenLastCalledWith(earlyRegionAt('gaul',760)?.bounds);fireEvent.click(buttons[1]);expect(locate).toHaveBeenLastCalledWith(earlyRegionAt('anatolia',760)?.bounds);fireEvent.click(buttons[2]);expect(locate).toHaveBeenLastCalledWith(earlyRegionAt('mesopotamia',760)?.bounds);expect(year).not.toHaveBeenCalled();expect(region).not.toHaveBeenCalled();
  expect(screen.getByRole('status').textContent).toContain('第 3 步');fireEvent.click(screen.getByRole('button',{name:'读懂法兰克王国的位置与居民 →'}));expect(region).toHaveBeenCalledWith('gaul');
 });
 it('clears the walk selection on a new year and labels recent changes as background',()=>{
  const {rerender}=render(<YearReadingGuide year={760} onRegion={vi.fn()} onYear={vi.fn()} onLocate={vi.fn()}/>);fireEvent.click(within(screen.getByRole('navigation',{name:'三步认识当年地图'})).getAllByRole('button')[0]);expect(screen.getByRole('status')).toBeTruthy();
  expect(screen.getByText(/此前最近的大转折 · 756 年/)).toBeTruthy();expect(screen.getByText(/不把相邻年份的事件套入 760 年/)).toBeTruthy();rerender(<YearReadingGuide year={774} onRegion={vi.fn()} onYear={vi.fn()} onLocate={vi.fn()}/>);expect(screen.queryByRole('status')).toBeNull();expect(screen.getByText(/本年的大转折 · 774 年/)).toBeTruthy();
 });
 it('reopens the whole year from a deep regional URL and drills back into the same year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=760&earlyRegion=north');render(<EuropeApp/>);expect(screen.queryByRole('region',{name:'760 年新手总览'})).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'新手读懂 760 年全局 →'}));expect(location.search).toContain('year=760');expect(location.search).not.toContain('earlyRegion=');expect(screen.getByRole('region',{name:'760 年新手总览'})).toBeTruthy();expect(screen.getByTestId('reading-camera').textContent).toContain('[[-11,24],[50,64]]');
  fireEvent.click(within(screen.getByTestId('reading-map')).getByRole('button',{name:'1 · 法兰克王国'}));expect(location.search).toContain('earlyRegion=gaul');
  fireEvent.click(screen.getByRole('button',{name:'← 返回 14 个地域'}));expect(screen.getByRole('region',{name:'760 年新手总览'})).toBeTruthy();expect(location.search).toContain('year=760');await act(async()=>{});
 });
});
