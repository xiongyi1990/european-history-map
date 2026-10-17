// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup} from '@testing-library/react';
import {MedievalRealms} from './MedievalRealms';
import {medievalRealmFrames,medievalRealmFrameAt,medievalRealmPlaceIds} from './medieval-realms';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {ancientPlaces,placeLabel} from './model';
import {courseDetails} from './course-details';
afterEach(cleanup);
describe('dated medieval regional composition',()=>{
 it('keeps valid sources and map anchors without inheriting adjacent-year politics',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  expect(new Set(medievalRealmFrames.map(f=>f.year)).size).toBe(medievalRealmFrames.length);
  expect(medievalRealmFrameAt(844)).toBeUndefined();expect(medievalRealmPlaceIds(844)).toEqual([]);
  for(const f of medievalRealmFrames){
   expect(new Set(f.realms.map(r=>r.id)).size).toBe(f.realms.length);
   for(const r of f.realms){
    expect(r.sources.length).toBeGreaterThan(0);
    for(const s of r.sources)expect(historySources[s].url).toMatch(/^https:/);
    for(const g of r.regions)for(const [id] of g.places)expect(ids.has(id),f.year+':'+id).toBe(true);
   }
  }
  expect(courseDetails.filter(d=>d.id.startsWith('medieval-extra-')).length).toBeGreaterThan(15);
 });
 it('keeps Aachen and Italian territories together in 843 and separates the 855 heirs',()=>{
  const middle=medievalRealmFrameAt(843)!.realms.find(r=>r.id==='middle-francia')!;
  expect(middle.regions.flatMap(g=>g.places.map(([id])=>id))).toEqual(expect.arrayContaining(['aachen','lyon','pavia']));
  const heirs=medievalRealmFrameAt(855)!.realms;
  expect(heirs.find(r=>r.id==='lotharingia')!.regions.flatMap(g=>g.places.map(([id])=>id))).toContain('aachen');
  expect(heirs.find(r=>r.id==='provence')!.regions.flatMap(g=>g.places.map(([id])=>id))).toContain('lyon');
  expect(heirs.find(r=>r.id==='italy')!.regions.flatMap(g=>g.places.map(([id])=>id))).toContain('pavia');
  expect(historicalDetail('lyon',855)?.polity.text).toContain('查理');
  expect(placeLabel(ancientPlaces.find(p=>p.id==='lyon')!,855)).toBe('里昂');
 });
 it('separates city destruction, rebuilding and relocation',()=>{
  expect(historicalDetail('pliska',680)).toBeUndefined();
  expect(historicalDetail('pliska',811)?.polity.text).toContain('不意味着');
  expect(historicalDetail('pliska',814)?.polity.text).toContain('重建');
  expect(historicalDetail('pliska',864)?.polity.text).toContain('基督教');
  expect(historicalDetail('pliska',893)?.polity.text).toContain('旧都');
  expect(historicalDetail('pliska',894)).toBeUndefined();
  expect(historicalDetail('alexandria',617)?.polity.text).toContain('罗马帝国');
  expect(historicalDetail('alexandria',618)?.polity.text).toContain('不同纪年');
  expect(historicalDetail('alexandria',628)?.polity.text).toContain('萨珊');
  expect(historicalDetail('alexandria',629)?.polity.text).toContain('恢复控制');
  expect(historicalDetail('alexandria',619)?.polity.text).toContain('萨珊');
  expect(historicalDetail('alexandria',641)?.polity.text).toContain('分阶段撤离');
  expect(historicalDetail('alexandria',642)?.polity.text).toContain('完成撤离');
  expect(historicalDetail('ravenna',750)?.polity.text).toMatch(/东罗马|拜占庭/);
  expect(historicalDetail('ravenna',751)?.polity.text).toContain('伦巴第');
  for(const id of ['pliska','alexandria','ravenna','lyon'])for(let year=600;year<=1000;year++)expect(historicalDetails.filter(d=>d.placeId===id&&d.from<=year&&year<=d.to).length).toBeLessThanOrEqual(1);
 });
 it('locates the parts of a realm and navigates to a dated city',()=>{
  const onYear=vi.fn(),onPlace=vi.fn(),onLocate=vi.fn();
  render(<MedievalRealms year={843} onYear={onYear} onPlace={onPlace} onLocate={onLocate}/>);
  fireEvent.click(screen.getByText('中部王国',{exact:true}));
  const card=screen.getByText('中部王国',{exact:true}).closest('details')!;
  fireEvent.click(within(card).getByRole('button',{name:'定位这些地域的参考城市 →'}));expect(onLocate).toHaveBeenCalledWith(['aachen','lyon','pavia']);
  fireEvent.click(within(card).getByRole('button',{name:'里昂 ↗'}));expect(onPlace).toHaveBeenCalledWith('lyon');
  fireEvent.click(screen.getByRole('button',{name:'855'}));expect(onYear).toHaveBeenCalledWith(855);
 });
 it('does not show an old composition for an unrecorded year',()=>{
  render(<MedievalRealms year={844} onYear={vi.fn()} onPlace={vi.fn()} onLocate={vi.fn()}/>);
  expect(screen.queryByText('中部王国',{exact:true})).toBeNull();
  expect(screen.getByText(/844 年的地域分解尚未逐项整理/)).toBeTruthy();
 });
});
