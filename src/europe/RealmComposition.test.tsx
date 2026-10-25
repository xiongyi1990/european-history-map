// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup} from '@testing-library/react';
import {RealmComposition} from './RealmComposition';
import {earlyRealms,realmCompositionAt} from './early-realm-composition';
import {earlyRegionAt} from './early-500-regions';
import {courseSources} from './course-sources';
afterEach(cleanup);
const part=(realm:string,year:number,id:string)=>realmCompositionAt(realm,year)!.parts.find(p=>p.id===id)!;
describe('Dated political relationships rather than uniform empire borders',()=>{
 it('has exactly one supported relationship per place for each covered year, with usable sources and camera frames',()=>{
  for(const realm of earlyRealms)for(let year=700;year<=800;year++){
   const view=realmCompositionAt(realm.id,year)!;expect(view.parts.length).toBeGreaterThanOrEqual(7);expect(new Set(view.parts.map(p=>p.id)).size).toBe(view.parts.length);expect(courseSources[view.source].url).toMatch(/^https:/);
   for(const p of view.parts){expect(p.stages.filter(s=>s.from<=year&&year<=s.to)).toHaveLength(1);expect(earlyRegionAt(p.region,year)).toBeDefined();expect(p.stage.sources.length).toBeGreaterThan(0);for(const key of p.stage.sources)expect(courseSources[key]?.url,key).toMatch(/^https:/);expect(p.bounds[0][0]).toBeLessThan(p.bounds[1][0]);expect(p.bounds[0][1]).toBeLessThan(p.bounds[1][1]);expect('geometry' in p).toBe(false);}
  }
  expect(realmCompositionAt('franks',699)).toBeUndefined();expect(realmCompositionAt('franks',801)).toBeUndefined();expect(realmCompositionAt('unknown',760)).toBeUndefined();
 });
 it('separates northern Italy, Bavaria and frontier wars on the dates control changes',()=>{
  expect(part('franks',773,'north-italy').stage.relation).toBe('outside');expect(part('franks',774,'north-italy').stage.relation).toBe('local');expect(part('franks',774,'north-italy').stage.text).toContain('贝内文托');
  expect(part('franks',787,'bavaria').stage.relation).toBe('local');expect(part('franks',788,'bavaria').stage.relation).toBe('core');
  expect(part('franks',771,'saxony').stage.relation).toBe('outside');expect(part('franks',772,'saxony').stage.relation).toBe('war');expect(part('franks',800,'saxony').stage.text).toContain('804');
  expect(part('franks',790,'avar-basin').stage.relation).toBe('outside');expect(part('franks',791,'avar-basin').stage.relation).toBe('war');expect(part('franks',800,'papal-rome').stage.relation).toBe('ally');
 });
 it('does not erase southern Byzantine Italy when Ravenna falls, or make Bulgaria a Byzantine province',()=>{
  expect(part('east-rome',750,'ravenna').stage.relation).toBe('local');expect(part('east-rome',751,'ravenna').stage.relation).toBe('outside');expect(part('east-rome',751,'south-italy').stage.relation).toBe('core');expect(part('east-rome',800,'bulgaria').stage.relation).toBe('outside');
 });
 it('keeps Cordoba, early Baghdad, Kairouan handovers and Aghlabid suzerainty distinct',()=>{
  expect(part('near-east',710,'andalus').stage.relation).toBe('outside');expect(part('near-east',711,'andalus').stage.relation).toBe('war');expect(part('near-east',718,'andalus').stage.relation).toBe('local');expect(part('near-east',750,'andalus').stage.relation).toBe('outside');expect(part('near-east',756,'andalus').stage.text).toContain('独立于东方阿拔斯');
  expect(part('near-east',761,'iraq').stage.text).toContain('要到 762');expect(part('near-east',762,'iraq').stage.text).toContain('新都');expect(part('near-east',796,'iraq').stage.text).toContain('拉卡');
  expect(part('near-east',760,'ifriqiya').stage.relation).toBe('outside');expect(part('near-east',761,'ifriqiya').stage.text).toContain('761／762');expect(part('near-east',772,'ifriqiya').stage.relation).toBe('war');expect(part('near-east',800,'ifriqiya').stage.relation).toBe('nominal');
 });
 it('locates a region without changing year, drills into residents, and explains why neighbors are listed',()=>{
  const onLocate=vi.fn(),onRegion=vi.fn(),onYear=vi.fn();render(<RealmComposition id="franks" year={774} onLocate={onLocate} onRegion={onRegion} onYear={onYear}/>);fireEvent.click(screen.getByText('展开内部地域与控制关系'));
  const italy=screen.getByRole('article',{name:'帕维亚与北意大利王国的控制关系'});expect(within(italy).getByText('地方权力')).toBeTruthy();fireEvent.click(within(italy).getByRole('button',{name:'在地图上找位置'}));expect(onLocate).toHaveBeenCalledWith([[7,43.5],[14,47]]);expect(onYear).not.toHaveBeenCalled();expect(screen.getByRole('status').textContent).toContain('不是疆界');fireEvent.click(within(italy).getByRole('button',{name:'看地域与居民 →'}));expect(onRegion).toHaveBeenCalledWith('italy');expect(screen.getByText('地理对照：不属同一政权')).toBeTruthy();
 });
 it('updates relationships in the same open guide and clears the previous camera notice after changing year',()=>{
  const onYear=vi.fn(),props={id:'franks',onLocate:vi.fn(),onRegion:vi.fn(),onYear};const {rerender}=render(<RealmComposition {...props} year={773}/>);fireEvent.click(screen.getByText('展开内部地域与控制关系'));const italy=screen.getByRole('article',{name:'帕维亚与北意大利王国的控制关系'});expect(within(italy).getByText('另一个政治空间')).toBeTruthy();fireEvent.click(within(italy).getByRole('button',{name:'在地图上找位置'}));fireEvent.click(within(screen.getByRole('navigation',{name:'加洛林法兰克王国关键变化年份'})).getByRole('button',{name:'774'}));expect(onYear).toHaveBeenCalledWith(774);rerender(<RealmComposition {...props} year={774}/>);expect(screen.queryByRole('status')).toBeNull();expect(within(screen.getByRole('article',{name:'帕维亚与北意大利王国的控制关系'})).getByText('地方权力')).toBeTruthy();expect(screen.getByRole('region',{name:'774 年加洛林法兰克王国地域关系'})).toBeTruthy();
 });
});
