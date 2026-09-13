// @vitest-environment jsdom
import {afterEach,describe,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import {RomanApp} from './RomanApp';
import {romanPlaces,periodPlaces,placeName,placeGroup,romanMapAtlas} from './data';
import {romanBattles} from './battles';
import {battleCoordinates} from '../greek/battles';
vi.mock('../greek/GreekMap',()=>({GreekMap:()=> <div>Map preview</div>}));
// jsdom has no native dialog implementation; interaction is checked in the browser.
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.useRealTimers();localStorage.clear();history.replaceState(null,'','/')});
describe('Roman reading atlas',()=>{
 it('keeps period-specific cities and alliances distinct',()=>{
  expect(periodPlaces('punic')).toHaveLength(17);expect(periodPlaces('punic').some(p=>['lyon','london','york'].includes(p.id))).toBe(false);
  expect(placeGroup(romanPlaces.find(p=>p.id==='syracuse')!,'punic')).toBe('ally');
  const c=romanPlaces.find(p=>p.id==='carthage')!;expect(['punic','trajan','division'].map(p=>placeGroup(c,p as 'punic'))).toEqual(['carthage','roman','west']);
  const b=romanPlaces.find(p=>p.id==='byzantium')!;expect(placeName(b,'punic')).toBe('拜占庭城');expect(placeName(b,'division')).toBe('君士坦丁堡');
 });
 it('keeps sourced places and routes inside the Roman terrain cache',()=>{
  expect(new Set(romanPlaces.map(p=>p.pid)).size).toBe(25);
  const bounds=romanMapAtlas('trajan').bounds;
  for(const coords of [...romanPlaces.map(p=>p.coords),...romanBattles.flatMap(battleCoordinates)]){expect(coords[0]).toBeGreaterThanOrEqual(bounds[0]);expect(coords[0]).toBeLessThanOrEqual(bounds[2]);expect(coords[1]).toBeGreaterThanOrEqual(bounds[1]);expect(coords[1]).toBeLessThanOrEqual(bounds[3])}
  for(const b of romanBattles)for(const s of b.stages){expect(s.source).toMatch(/^https:\/\/penelope\.uchicago\.edu\//);expect(s.sections).toMatch(/(波利比乌斯|普鲁塔克)/)}
 });
 it('removes a city absent from a period and restores an independent Roman bookmark',()=>{
  localStorage.setItem('greek-reading-atlas:bookmark:v1','greek saved');history.replaceState(null,'','/?atlas=rome&period=punic&city=london');render(<RomanApp/>);expect(location.search).not.toContain('city=');
  fireEvent.change(screen.getByRole('combobox',{name:'选择罗马时期'}),{target:{value:'division'}});fireEvent.click(screen.getByRole('button',{name:'从君士坦丁堡开始'}));expect(location.search).toContain('city=byzantium');
  fireEvent.click(screen.getByRole('button',{name:'保存罗马书签'}));fireEvent.change(screen.getByRole('combobox',{name:'选择罗马时期'}),{target:{value:'punic'}});expect(location.search).not.toContain('city=');
  fireEvent.click(screen.getByRole('button',{name:'恢复罗马书签'}));expect(screen.getByRole('heading',{name:'君士坦丁堡'})).toBeTruthy();expect(location.search).toContain('period=division');expect(localStorage.getItem('greek-reading-atlas:bookmark:v1')).toBe('greek saved');
 });
 it('opens a Roman route, stops playback at its end and returns to the atlas',()=>{
  vi.useFakeTimers();history.replaceState(null,'','/?atlas=rome&battle=actium&stage=1');render(<RomanApp/>);
  fireEvent.click(screen.getByRole('button',{name:'播放战役路线'}));act(()=>vi.advanceTimersByTime(6500));expect(location.search).toContain('stage=2');expect(screen.getByRole('button',{name:'播放战役路线'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'保存书签'}));expect(localStorage.getItem('roman-reading-atlas:battle-bookmark:v1')).toContain('actium');expect(localStorage.getItem('greek-reading-atlas:battle-bookmark:v1')).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'返回罗马地图'}));expect(location.search).not.toContain('battle=');expect(screen.getByRole('combobox',{name:'选择罗马时期'})).toBeTruthy();
 });
});
