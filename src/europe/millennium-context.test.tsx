// @vitest-environment jsdom
import {afterEach,describe,it,expect,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,within} from '@testing-library/react';
import {EuropeApp} from './EuropeApp';
import {ancientPlaces} from './model';
import {millenniumContexts,millenniumContextAt,millenniumContextLabels,millenniumContextPlaceIds,validMillenniumContext,millenniumContextBounds} from './millennium-context';
vi.mock('../greek/GreekMap',()=>({GreekMap:({overlay,onAreaSelect,atlas,command}:any)=><div data-testid="context-map" data-command={JSON.stringify(command)} data-places={JSON.stringify(atlas.places.map((p:any)=>p.id))}><span data-testid="context-polygons">{overlay.areas.features.length}</span>{overlay.labels.filter((l:any)=>l.id.startsWith('contemporary:')).map((l:any)=><button key={l.id} onClick={()=>onAreaSelect(l.id)}>{l.name}</button>)}</div>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};HTMLDialogElement.prototype.close=function(){this.open=false};
const empty={type:'FeatureCollection',features:[]};
function setup(url:string){history.replaceState(null,'',url);vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>empty})));render(<EuropeApp/>);}
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
describe('1000 contemporaries navigation',()=>{
 it('uses real gazetteer anchors and never applies context to adjacent dates',()=>{
  for(const c of millenniumContexts){expect(c.sources.length).toBeGreaterThan(0);for(const [id] of c.places)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);}
  for(const year of [900,962,987,999,1001]){expect(millenniumContextLabels(year)).toEqual([]);expect(millenniumContextPlaceIds(year)).toEqual([]);expect(validMillenniumContext(year,'all')).toBeUndefined();expect(millenniumContextAt(year,'england')).toBeUndefined();}
  expect(validMillenniumContext(1000,'invented')).toBeUndefined();
 });
 it('opens six clickable labels without inventing six polygons; links cities back to the same context',async()=>{
  setup('/?year=1000&view=partitions&kingdom=west-francia');
  fireEvent.click(screen.getByRole('button',{name:'同时代欧洲：看英格兰、伊比利亚与东方 →'}));
  expect(location.search).toContain('context=all');expect(location.search).not.toContain('kingdom=');
  expect(within(screen.getByTestId('context-map')).getAllByRole('button')).toHaveLength(6);expect(screen.getByTestId('context-polygons').textContent).toBe('5');
  for(const c of millenniumContexts){fireEvent.click(within(screen.getByTestId('context-map')).getByRole('button',{name:c.mapName}));expect(location.search).toContain('context='+c.id);expect(screen.getByRole('article',{name:'同期地域详情'}).textContent).toContain(c.power);expect(JSON.parse(screen.getByTestId('context-map').getAttribute('data-command')!).coordinates).toEqual(c.bounds);}
  fireEvent.click(within(screen.getByRole('article',{name:'同期地域详情'})).getByRole('button',{name:/埃斯泰尔戈姆/}));expect(location.search).toContain('place=esztergom');expect(location.search).toContain('context=hungary');
  fireEvent.click(screen.getByRole('button',{name:'← 返回 1000 年同期欧洲'}));expect(location.search).not.toContain('place=');expect(screen.getByRole('article',{name:'同期地域详情'}).textContent).toContain('1000年末／1001年初');
  fireEvent.click(screen.getByRole('button',{name:'查看六个方向全景 →'}));expect(JSON.parse(screen.getByTestId('context-map').getAttribute('data-command')!).coordinates).toEqual(millenniumContextBounds);
  fireEvent.click(screen.getByRole('button',{name:'查看六个方向全景 →'}));expect(JSON.parse(screen.getByTestId('context-map').getAttribute('data-command')!).coordinates).toEqual(millenniumContextBounds);
  fireEvent.click(screen.getByRole('button',{name:'← 返回中西欧王权地图'}));expect(location.search).not.toContain('context=');expect(within(screen.getByTestId('context-map')).queryAllByRole('button')).toHaveLength(0);await act(async()=>{});
 });
 it('restores a shared context and clears it on a year change',async()=>{
  setup('/?year=1000&view=partitions&context=england');expect(screen.getByRole('article',{name:'同期地域详情'}).textContent).toContain('埃塞尔雷德二世');
  expect(JSON.parse(screen.getByTestId('context-map').getAttribute('data-places')!)).toContain('winchester');
  fireEvent.click(within(screen.getByRole('group',{name:'地图分国年份'})).getByRole('button',{name:'962'}));expect(location.search).not.toContain('context=');expect(screen.queryByRole('region',{name:'1000年同期欧洲'})).toBeNull();expect(within(screen.getByTestId('context-map')).queryAllByRole('button')).toHaveLength(0);await act(async()=>{});
 });
 it('does not restore a stale context in another year or modern mode',async()=>{
  setup('/?year=987&view=partitions&context=england');expect(location.search).not.toContain('context=');expect(screen.queryByRole('region',{name:'1000年同期欧洲'})).toBeNull();
  fireEvent.click(within(screen.getByRole('group',{name:'地图分国年份'})).getByRole('button',{name:'1000'}));fireEvent.click(screen.getByRole('button',{name:'展开分国与地域资料 →'}));fireEvent.click(screen.getByRole('button',{name:'同时代欧洲：看英格兰、伊比利亚与东方 →'}));
  fireEvent.click(screen.getByRole('button',{name:'现代对照'}));expect(location.search).not.toContain('context=');expect(screen.queryByRole('region',{name:'1000年同期欧洲'})).toBeNull();await act(async()=>{});
 });
});
