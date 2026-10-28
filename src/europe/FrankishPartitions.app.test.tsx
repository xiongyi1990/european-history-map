// @vitest-environment jsdom
import {afterEach,describe,it,expect,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,within} from '@testing-library/react';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:({overlay,onAreaSelect}:{overlay:{areas:GeoJSON.FeatureCollection};onAreaSelect:(id:string)=>void})=><div data-testid="partition-map">{overlay.areas.features.map(f=><button key={f.properties?.atlasId} onClick={()=>onAreaSelect(f.properties?.atlasId)}>地图：{f.properties?.name}</button>)}</div>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};HTMLDialogElement.prototype.close=function(){this.open=false};
const empty={type:'FeatureCollection',features:[]};
function setup(url:string){history.replaceState(null,'',url);const fetcher=vi.fn(async()=>({ok:true,json:async()=>empty}));vi.stubGlobal('fetch',fetcher);render(<EuropeApp/>);return fetcher;}
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
describe('Frankish atlas integration',()=>{
 it('connects both centuries and keeps the selected realm through city detail',async()=>{
  const fetcher=setup('/?year=880&view=partitions&kingdom=provence');
  fireEvent.click(screen.getByRole('button',{name:'900—1000 继承诸国'}));
  expect(location.search).toContain('year=900');expect(location.search).not.toContain('kingdom=');
  expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(6);
  const nav=screen.getByRole('group',{name:'地图分国年份'});
  for(const [year,count] of [[911,6],[925,6],[962,5],[987,5],[1000,5]]){
   fireEvent.click(within(nav).getByRole('button',{name:String(year)}));
   expect(location.search).toContain('year='+year);
   expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(count);
   expect(screen.getByRole('region',{name:'此时的政治关系'})).toBeTruthy();
  }
  fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:/意大利/}));
  expect(location.search).toContain('kingdom=italy');
  fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/罗马/}));
  expect(location.search).toContain('place=rome');expect(location.search).toContain('kingdom=italy');
  fireEvent.click(screen.getByRole('button',{name:'← 返回 1000 年法兰克继承诸国'}));
  expect(location.search).not.toContain('place=');expect(location.search).toContain('kingdom=italy');
  fireEvent.click(screen.getByRole('button',{name:'843—880 分国'}));expect(location.search).toContain('year=843');
  expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(3);
  await act(async()=>{});expect(fetcher.mock.calls.flat().some(u=>String(u).includes('historical-boundaries'))).toBe(false);
 });
 it('clears extinct realm IDs and leaves the topic on an unreviewed year',async()=>{
  setup('/?year=962&view=partitions&kingdom=upper-burgundy');
  expect(location.search).not.toContain('kingdom=');
  fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:/勃艮第王国/}));
  expect(location.search).toContain('kingdom=burgundy');
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'963'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(location.search).not.toContain('view=partitions');expect(location.search).not.toContain('kingdom=');
  expect(screen.getByTestId('partition-map').textContent).toBe('');await act(async()=>{});
 });

 it('opens the correct default geometry without fetching an 800/900-year substitute',async()=>{
  const fetcher=setup('/?year=843');await act(async()=>{});
  expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(3);
  expect(fetcher.mock.calls.flat().some(u=>String(u).includes('historical-boundaries'))).toBe(false);
  fireEvent.click(screen.getByRole('button',{name:'地图：中部王国（中法兰克）'}));
  expect(location.search).toContain('view=partitions');expect(location.search).toContain('kingdom=middle-francia');
  expect(screen.getByRole('article',{name:'分国地域详情'}).textContent).toContain('由哪些地域组成');
 });
 it('switches event geometry and clears a kingdom that no longer exists',async()=>{
  setup('/?year=843&view=partitions&kingdom=middle-francia');
  const nav=screen.getByRole('group',{name:'地图分国年份'});
  for(const [y,count] of [[855,5],[870,3],[880,4]]){fireEvent.click(within(nav).getByRole('button',{name:String(y)}));expect(location.search).toContain('year='+y);expect(location.search).not.toContain('kingdom=');expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(count);}
  fireEvent.click(screen.getByRole('button',{name:'地图：普罗旺斯—罗讷河王权'}));expect(screen.getByText('博索',{exact:true})).toBeTruthy();await act(async()=>{});
 });
 it('preserves year and kingdom through city detail, return and a reload link',async()=>{
  setup('/?year=855&view=partitions&kingdom=lotharingia');
  fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/亚琛/}));
  expect(location.search).toContain('place=aachen');expect(location.search).toContain('kingdom=lotharingia');
  fireEvent.click(screen.getByRole('button',{name:'← 返回 855 年法兰克分国'}));
  expect(location.search).not.toContain('place=');expect(screen.getByRole('article',{name:'分国地域详情'}).textContent).toContain('洛泰尔二世');await act(async()=>{});
 });
 it('exits into the explicitly labeled reference view and never carries a partition into 844 or modern',async()=>{
  setup('/?year=843&kingdom=middle-francia');fireEvent.click(screen.getByRole('button',{name:'返回欧洲概览 →'}));
  expect(location.search).toContain('view=reference');expect(screen.getByTestId('partition-map').textContent).toBe('');
  fireEvent.click(screen.getByRole('button',{name:'查看法兰克分裂示意 →'}));
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'844'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(screen.getByTestId('partition-map').textContent).toBe('');expect(location.search).not.toContain('partitions');
  fireEvent.click(screen.getByRole('button',{name:'现代对照'}));expect(location.search).toContain('mode=modern');await act(async()=>{});
 });
 it('searches a realm in the current event year and ignores a stale deep-link kingdom',async()=>{
  setup('/?year=880&kingdom=middle-francia');expect(location.search).not.toContain('kingdom=');
  const input=screen.getByLabelText('搜索地点、政权或战役');fireEvent.focus(input);fireEvent.change(input,{target:{value:'博索'}});fireEvent.submit(screen.getByRole('search'));
  expect(location.search).toContain('kingdom=provence');expect(screen.getByRole('article',{name:'分国地域详情'}).textContent).toContain('879—887');await act(async()=>{});
 });
});
