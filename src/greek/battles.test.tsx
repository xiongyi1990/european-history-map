// @vitest-environment jsdom
import {afterEach,describe,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import {battles,battleCoordinates,battleRoutes,clampBattleStep} from './battles';
import {BattleExplorer} from './BattleExplorer';
vi.mock('./GreekMap',()=>({GreekMap:()=> <div>Map preview</div>}));
afterEach(()=>{cleanup();vi.useRealTimers();localStorage.clear();history.replaceState(null,'','/')});

describe('battle reading scenes',()=>{
  it('keeps route geometry within cached terrain and distinguishes an outcome from a march',()=>{
    for(const b of battles){for(const [lon,lat] of battleCoordinates(b)){expect(lon).toBeGreaterThanOrEqual(13);expect(lon).toBeLessThanOrEqual(31);expect(lat).toBeGreaterThanOrEqual(33);expect(lat).toBeLessThanOrEqual(43)}
      for(const s of b.stages){expect(s.source).toMatch(/^https:\/\//);expect(s.sections).toMatch(/(希罗多德|修昔底德) \d+\.\d+/);expect(s.stops.length).toBeGreaterThan(0)}
    }
    const sicily=battles.find(b=>b.id==='sicily')!;expect(sicily.stages[sicily.stages.length-1].path).toEqual([]);
  });
  it('reveals only reached stages and highlights the returning army after the fleet sails',()=>{
    const b=battles[0];expect(battleRoutes(b,0).features).toHaveLength(1);
    const end=battleRoutes(b,3).features;expect(end).toHaveLength(4);
    expect(end.filter(f=>f.properties?.active)).toHaveLength(1);
    const outward=b.stages[1].path;expect(end[3].geometry).toMatchObject({coordinates:[outward[outward.length-1],[23.84,38.035],outward[0]]});
  });
  it('opens a shared battle stage and clamps malformed stage links',()=>{
    const b=battles[1];expect(clampBattleStep(b,'invalid')).toBe(0);expect(clampBattleStep(b,-5)).toBe(0);expect(clampBattleStep(b,999)).toBe(2);
    history.replaceState(null,'','/?battle=thermopylae&stage=999');render(<BattleExplorer onExit={()=>{}}/>);
    expect(screen.getByRole('heading',{name:'山路迂回到后方'})).toBeTruthy();expect(location.search).toContain('stage=2');expect(document.body.textContent).not.toContain('431');
  });
  it('stops playback when changing battle and at the last stage',()=>{
    vi.useFakeTimers();render(<BattleExplorer onExit={()=>{}}/>);
    fireEvent.click(screen.getByRole('button',{name:'播放战役路线'}));act(()=>vi.advanceTimersByTime(6500));
    expect(screen.getByRole('heading',{name:'雅典军前往迎战'})).toBeTruthy();
    fireEvent.change(screen.getByRole('combobox',{name:'选择战役'}),{target:{value:'salamis'}});act(()=>vi.advanceTimersByTime(13000));
    expect(screen.getByRole('heading',{name:'希腊舰队集结于岛侧'})).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'下一战役阶段'}));fireEvent.click(screen.getByRole('button',{name:'播放战役路线'}));act(()=>vi.advanceTimersByTime(6500));
    expect(screen.getByRole('heading',{name:'舰队在狭水域交战'})).toBeTruthy();expect(screen.getByRole('button',{name:'播放战役路线'})).toBeTruthy();
  });
  it('restores battle bookmarks separately from the 431 BCE city-state bookmark',()=>{
    const original='original city bookmark';localStorage.setItem('greek-reading-atlas:bookmark:v1',original);
    render(<BattleExplorer onExit={()=>{}}/>);fireEvent.click(screen.getByRole('button',{name:'下一战役阶段'}));fireEvent.click(screen.getByRole('button',{name:'保存书签'}));
    fireEvent.change(screen.getByRole('combobox',{name:'选择战役'}),{target:{value:'sicily'}});fireEvent.click(screen.getByRole('button',{name:'恢复战役书签'}));
    expect(screen.getByRole('heading',{name:'雅典军前往迎战'})).toBeTruthy();expect(localStorage.getItem('greek-reading-atlas:bookmark:v1')).toBe(original);
  });
});
