// @vitest-environment jsdom
import {afterEach,describe,it,expect,vi} from 'vitest';
import {cleanup,render,screen,within,fireEvent} from '@testing-library/react';
import {AdministrativeSociety395} from './AdministrativeSociety395';
import {administrativeReadingGroups} from './administrative-groups-395';
import {readingRegionById} from './reading-centuries';
import {courseSources} from './course-sources';
afterEach(cleanup);
describe('administrative society reading',()=>{
 it('shows each group\'s dated regions separately with their evidence and onward navigation',()=>{
  for(const group of administrativeReadingGroups){
   const onRegion=vi.fn();render(<AdministrativeSociety395 group={group} onRegion={onRegion}/>);
   for(const [id,name] of group.regions){
    const region=readingRegionById(id,395)!;
    const card=screen.getByText(name,{selector:'strong'}).closest('details')!;
    expect(within(card).getByText(region.people)).toBeTruthy();
    expect(within(card).getByText(region.language)).toBeTruthy();
    for(const key of region.sources)expect(within(card).getByRole('link',{name:courseSources[key].title+' ↗',hidden:true}).getAttribute('href')).toBe(courseSources[key].url);
    fireEvent.click(within(card).getByRole('button',{name:`展开${name}的政治背景与城市 →`,hidden:true}));
    expect(onRegion).toHaveBeenLastCalledWith(id);
   }
   cleanup();
  }
 });
 it('keeps the Egyptian regions distinct and the 395 evidence free of later events',()=>{
  render(<AdministrativeSociety395 group={administrativeReadingGroups.find(g=>g.id==='egyptian-provinces')!} onRegion={()=>{}}/>);
  const upper=screen.getByText('上埃及河谷',{selector:'strong'}).closest('details')!;
  expect(upper.textContent).toContain('394 年');expect(upper.textContent).not.toContain('451');
  expect(upper.textContent).toContain('南方社群');
  expect(screen.getByText('下埃及三角洲',{selector:'strong'})).toBeTruthy();
 });
});
