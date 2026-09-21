// @vitest-environment jsdom
import raw300 from '../../public/historical-boundaries/world_300.geojson?raw';
import {afterEach,describe,it,expect,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:({overlay}:{overlay:{areas:GeoJSON.FeatureCollection}})=><div data-testid="drawn-areas">{overlay.areas.features.map(f=>f.properties?.name).join(',')}</div>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
const empty={type:'FeatureCollection',features:[]};
function fc(name:string){return {type:'FeatureCollection',features:[{type:'Feature',properties:{name,subject:name},geometry:{type:'Polygon',coordinates:[[[10,40],[20,40],[20,50],[10,50],[10,40]]]}}]}}
const response=(data:unknown)=>({ok:true,json:async()=>data}) as Response;
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
describe('timeline rendering',()=>{
 it('renders the real 300 Roman divisions without enabling reference areas and opens the eastern neighbor',async()=>{
  vi.stubGlobal('fetch',vi.fn(async(url)=>response(String(url).includes('world_300')?JSON.parse(raw300):empty)));
  history.replaceState(null,'','/?year=300');render(<EuropeApp/>);
  await waitFor(()=>expect(screen.getByTestId('drawn-areas').textContent).toContain('Rome (Diocletianus)'));
  expect(screen.getByTestId('drawn-areas').textContent).toContain('Rome (Constantinus)');
  expect(screen.getByTestId('drawn-areas').textContent).not.toContain('Parthian Empire');
  fireEvent.click(screen.getByRole('button',{name:/历史年代/}));
  expect(screen.getByRole('region',{name:'政权与地域组成'}).textContent).toContain('北非沿海');
  fireEvent.click(screen.getByRole('button',{name:/萨珊宫廷：泰西封/}));
  expect(location.search).toContain('year=300');expect(location.search).toContain('place=ctesiphon');
  expect(screen.getByText(/不能仍把 300 年的波斯称为帕提亚帝国/)).toBeTruthy();
 });
 it('opens the Norman century and locates Sicily without creating an early kingdom',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=1066');render(<EuropeApp/>);
  fireEvent.click(screen.getByRole('button',{name:/历史年代/}));
  fireEvent.click(screen.getByRole('button',{name:'1100 年'}));
  expect(screen.getByRole('region',{name:'政权与地域组成'}).textContent).toContain('不同君主');
  fireEvent.click(screen.getByRole('button',{name:/岛屿一侧：巴勒莫/}));
  expect(location.search).toContain('year=1100');expect(location.search).toContain('place=palermo');
  expect(screen.getByText(/西西里王国到 1130 年才成立/)).toBeTruthy();
  expect(screen.getByText('第 164 讲 · PDF 第 1391—1396 页')).toBeTruthy();
  await act(async()=>{});
 });
 it('finds the Norman route and moves from a later year to its dated stages',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=1100');render(<EuropeApp/>);
  fireEvent.focus(screen.getByLabelText('搜索地点、政权或战役'));
  fireEvent.change(screen.getByLabelText('搜索地点、政权或战役'),{target:{value:'诺曼征服'}});
  fireEvent.click(screen.getByRole('button',{name:/诺曼征服与黑斯廷斯战役/}));
  expect(location.search).toContain('year=1066');
  fireEvent.click(screen.getByRole('button',{name:'阶段 3：战役之后：伦敦加冕'}));
  expect(screen.getByRole('button',{name:'阶段 3：战役之后：伦敦加冕'}).getAttribute('aria-current')).toBe('step');
  expect(screen.getByText(/不能拿来判断实际进军道路/)).toBeTruthy();
  await act(async()=>{});
 });
 it('opens the millennium realm comparison and its Polish checkpoint with course references',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=962');render(<EuropeApp/>);
  fireEvent.click(screen.getByRole('button',{name:/历史年代/}));
  fireEvent.click(screen.getByRole('button',{name:'1000 年'}));
  expect(screen.getByRole('region',{name:'政权与地域组成'}).textContent).toContain('法兰西王国与王室领地');
  fireEvent.click(screen.getByRole('button',{name:/查看会晤与王号/}));
  expect(location.search).toContain('year=1000');expect(location.search).toContain('place=gniezno');
  expect(screen.getByText(/1025 年正式加冕为波兰国王是两个节点/)).toBeTruthy();
  expect(screen.getByText('第 155 讲 · PDF 第 1304—1306 页')).toBeTruthy();
  await act(async()=>{});
 });
 it('navigates the partition guide and keeps the selected year when opening its regions',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=800');render(<EuropeApp/>);
  fireEvent.click(screen.getByRole('button',{name:/历史年代/}));
  fireEvent.click(screen.getByRole('button',{name:'843 年'}));
  expect(screen.getByRole('region',{name:'政权与地域组成'}).textContent).toContain('中部王国 · 洛泰尔一世');
  fireEvent.click(screen.getByRole('button',{name:/南段：帕维亚/}));
  expect(location.search).toContain('year=843');expect(location.search).toContain('place=pavia');
  expect(screen.getByText(/它与亚琛同在中部体系/)).toBeTruthy();
  expect(screen.getByText('第 144 讲 · PDF 第 1209—1211 页')).toBeTruthy();
  await act(async()=>{});
 });
 it('switches from 600 to 700 and opens the Umayyad capital with course references',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=600');render(<EuropeApp/>);
  fireEvent.click(screen.getByRole('button',{name:/历史年代/}));
  fireEvent.click(screen.getByRole('button',{name:'700 年'}));
  expect(location.search).toContain('year=700');
  fireEvent.click(screen.getByRole('button',{name:/倭马亚都城 → 大马士革/}));
  expect(location.search).toContain('place=damascus');
  expect(screen.getByText('第 150 讲 · PDF 第 1256—1263 页')).toBeTruthy();
  expect(screen.getByText(/此时还不能使用后来阿拔斯时代的巴格达/)).toBeTruthy();
  await act(async()=>{});
 });
 it('opens a late antique kingdom from the year guide and retains its year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=500');render(<EuropeApp/>);
  fireEvent.click(screen.getByRole('button',{name:/历史年代/}));
  fireEvent.click(screen.getByRole('button',{name:/汪达尔 → 迦太基/}));
  expect(location.search).toContain('year=500');expect(location.search).toContain('place=carthage');
  expect(screen.getByText(/500 年这里已经不受西罗马/)).toBeTruthy();
  expect(screen.getByText('第 133 讲 · PDF 第 1125—1129 页')).toBeTruthy();
  await act(async()=>{});
 });
 it('opens Byzantium by search, retains the topic through 1204 and 1261, and removes obsolete empire boundaries after 1453',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(fc('Byzantine Empire'))));render(<EuropeApp/>);
  fireEvent.focus(screen.getByLabelText('搜索地点、政权或战役'));
  fireEvent.change(screen.getByLabelText('搜索地点、政权或战役'),{target:{value:'拜占庭'}});
  fireEvent.submit(screen.getByRole('search'));
  expect(location.search).toContain('empire=eastern-rome');
  fireEvent.click(screen.getByRole('button',{name:/1204 年.*首都陷落/}));
  expect(screen.getByRole('heading',{name:'首都失陷与多个继承政权'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:/1261 年.*复都/}));
  await waitFor(()=>expect(screen.getByTestId('drawn-areas').textContent).toBe('Byzantine Empire'));
  fireEvent.click(screen.getByRole('button',{name:/1453 年.*君士坦丁堡陷落/}));
  await waitFor(()=>expect(screen.getByTestId('drawn-areas').textContent).toBe(''));
  fireEvent.click(screen.getByRole('button',{name:/埃及与尼罗河谷.*今天埃及/}));
  expect(screen.getByRole('region',{name:'历史地区说明'}).textContent).toContain('七世纪阿拉伯征服后脱离东罗马');
  fireEvent.click(screen.getByRole('button',{name:/亚历山大.*查看城市/}));
  expect(location.search).toContain('place=alexandria');
  await act(async()=>{});
 });

 it('keeps historical regions available after the western empire ends and opens their cities',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(fc('Western Roman Empire'))));history.replaceState(null,'','/?year=400&empire=western-rome');render(<EuropeApp/>);
  await waitFor(()=>expect(screen.getByTestId('drawn-areas').textContent).toBe('Western Roman Empire'));
  fireEvent.click(screen.getByRole('button',{name:/500 年.*帝国结束/}));
  await waitFor(()=>expect(screen.getByTestId('drawn-areas').textContent).toBe(''));
  expect(location.search).toContain('empire=western-rome');
  fireEvent.click(screen.getByRole('button',{name:/意大利.*今天意大利/}));
  expect(screen.getByRole('region',{name:'历史地区说明'}).textContent).toContain('493 年');
  fireEvent.click(screen.getByRole('button',{name:/拉文纳.*查看城市/}));
  expect(location.search).toContain('place=ravenna');expect(location.search).not.toContain('empire=');
  await act(async()=>{});
 });

 it('navigates course periods with page references and offers known periods outside coverage',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=1204&place=byzantium');render(<EuropeApp/>);
  await waitFor(()=>expect(screen.getByText(/按 1204 年十字军攻陷之后记录/)).toBeTruthy());
  expect(screen.getByText('第 165 讲 · PDF 第 1409—1410 页')).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:/东罗马复都：1261—1452 年/}));
  expect(screen.getByText(/1261 年恢复东罗马统治/)).toBeTruthy();expect(location.search).toContain('year=1261');
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'1454'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(screen.getByText(/该地点在这一年的名称与政治归属尚未核实/)).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:/新罗马：330—394 年/}));
  expect(screen.getByText(/330 年新都落成后的罗马帝国政治中心/)).toBeTruthy();expect(location.search).toContain('year=330');
  await act(async()=>{});
 });
 it('changes the selected site evidence when the year changes and does not extrapolate it',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=-1500&place=knossos');render(<EuropeApp/>);
  await waitFor(()=>expect(screen.getByText(/线形文字 A 用于这一时期/)).toBeTruthy());
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'-1350'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(screen.getByText(/线形文字 B 记录早期希腊语/)).toBeTruthy();
  expect(screen.queryByText(/线形文字 A 用于这一时期/)).toBeNull();
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'100'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(screen.queryByText(/线形文字 B 记录早期希腊语/)).toBeNull();
  expect(screen.getByText(/该地点在这一年的名称与政治归属尚未核实/)).toBeTruthy();
  await act(async()=>{});
 });
 it('drops stale boundaries when an older request finishes after a newer request',async()=>{
  let completeOld!:(r:Response)=>void;
  vi.stubGlobal('fetch',vi.fn((url:string)=>url.endsWith('world_100.geojson')?new Promise<Response>(resolve=>{completeOld=resolve}):Promise.resolve(response(url.endsWith('world_400.geojson')?fc('Eastern Roman Empire'):empty))));
  render(<EuropeApp/>);
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'400'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  await waitFor(()=>expect(screen.getByTestId('drawn-areas').textContent).toBe('Eastern Roman Empire'));
  await act(async()=>completeOld(response(fc('Roman Empire'))));
  expect(screen.getByTestId('drawn-areas').textContent).toBe('Eastern Roman Empire');
  expect(location.search).toBe('?year=400');
 });
 it('keeps the requested year separate from the available evidence year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));history.replaceState(null,'','/?year=117');render(<EuropeApp/>);
  await waitFor(()=>expect(screen.getByText(/你选择了公元 117 年/)).toBeTruthy());
  await waitFor(()=>expect(screen.getByText(/公元 100 年资料/)).toBeTruthy());
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'2026'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  await waitFor(()=>expect(screen.getByText('这个年份的疆界尚未收录')).toBeTruthy());
  expect(screen.getByTestId('drawn-areas').textContent).toBe('');
 });
 it('rejects invalid year zero without silently changing the displayed time',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>response(empty)));render(<EuropeApp/>);
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'0'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(screen.getByText(/公元纪年没有 0 年/)).toBeTruthy();expect(location.search).toBe('?year=100');
  await act(async()=>{});
 });
});
