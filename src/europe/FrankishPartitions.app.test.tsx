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
   fireEvent.change(within(nav).getByRole('combobox',{name:'跳转继承诸国年份'}),{target:{value:String(year)}});
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
 it('opens 965 directly and preserves city evidence with its political map',async()=>{
  const fetcher=setup('/?year=965');expect(location.search).toContain('view=partitions');
  expect(screen.getByRole('combobox',{name:'跳转继承诸国年份'}).querySelectorAll('option')).toHaveLength(14);
  fireEvent.click(screen.getByRole('button',{name:'展开分国与地域资料 →'}));
  expect(screen.getByRole('heading',{name:'965年：帝国、洛林分治与城市社会'})).toBeTruthy();
  expect(screen.getByText('本年事件：马格德堡特许状中的犹太人与商人')).toBeTruthy();
  fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:'地图：东部王国（东法兰克—德意志）'}));
  const card=screen.getByRole('article',{name:'分国地域详情'});expect(card.textContent).toContain('奥托二世（共同国王）');expect(card.textContent).toContain('968年大主教区尚未建立');
  fireEvent.click(within(card).getByRole('button',{name:/马格德堡/}));expect(location.search).toContain('year=965');expect(location.search).toContain('place=magdeburg');
  fireEvent.click(screen.getByRole('button',{name:'← 返回 965 年法兰克继承诸国'}));expect(location.search).toContain('kingdom=east-francia');
  fireEvent.click(screen.getByRole('button',{name:'下一个已核对节点'}));expect(location.search).toContain('year=973');expect(screen.getByRole('heading',{name:/973年：奥托一世去世/})).toBeTruthy();
  await act(async()=>{});expect(fetcher.mock.calls.flat().some(u=>String(u).includes('historical-boundaries'))).toBe(false);
 });
 it('moves through all new reviewed dates and drops regional IDs that change',async()=>{
  setup('/?year=936&view=partitions&kingdom=upper-burgundy');
  for(const [year,count] of [[951,5],[955,5],[965,5],[973,5],[983,5],[996,5],[919,6],[936,6]]){
   fireEvent.change(screen.getByRole('combobox',{name:'跳转继承诸国年份'}),{target:{value:String(year)}});
   expect(location.search).toContain('year='+year);expect(location.search).not.toContain('kingdom=upper-burgundy');expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(count);
  }
  await act(async()=>{});
 });

 it('connects the eleventh-century stage, city return, timeline and clean stage exit',async()=>{
  const fetcher=setup('/?year=1000&view=partitions&kingdom=italy');
  fireEvent.click(screen.getByRole('button',{name:'1002—1100 帝国与教皇'}));expect(location.search).toContain('year=1002');expect(location.search).not.toContain('kingdom=');
  expect(screen.getByRole('navigation',{name:'帝国与教皇关键年份'})).toBeTruthy();
  const nav=screen.getByRole('combobox',{name:'跳转帝国与教皇年份'});expect(nav.querySelectorAll('option')).toHaveLength(10);
  for(const year of [1014,1024,1027,1032,1034,1056,1077,1084,1100]){fireEvent.change(nav,{target:{value:String(year)}});expect(location.search).toContain('year='+year);expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(5);}
  fireEvent.change(nav,{target:{value:'1077'}});fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:/地图：意大利王国/}));
  fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/卡诺莎/}));expect(location.search).toContain('place=canossa');expect(location.search).toContain('kingdom=italy');
  fireEvent.click(screen.getByRole('button',{name:'← 返回 1077 年帝国与教皇'}));expect(location.search).not.toContain('place=');expect(screen.getByRole('article',{name:'分国地域详情'}).textContent).toContain('玛蒂尔达支持教皇');
  fireEvent.click(screen.getByRole('button',{name:'900—1000 继承诸国'}));expect(location.search).toContain('year=900');expect(screen.queryByRole('combobox',{name:'跳转帝国与教皇年份'})).toBeNull();
  await act(async()=>{});expect(fetcher.mock.calls.flat().some(u=>String(u).includes('historical-boundaries'))).toBe(false);
 });
 it('keeps 1000-only comparisons out of a shared eleventh-century URL and exits unreviewed years',async()=>{
  setup('/?year=1032&view=partitions&context=poland&kingdom=burgundy');expect(location.search).not.toContain('context=');expect(screen.getByRole('article',{name:'分国地域详情'}).textContent).toContain('继承争夺');
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'1033'}});fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(location.search).not.toContain('view=partitions');expect(screen.getByTestId('partition-map').textContent).toBe('');await act(async()=>{});
 });

 it('connects the fourth stage, all fifteen dates, treaty cities and return to the previous stage',async()=>{
  const fetcher=setup('/?year=1100&view=partitions&kingdom=italy');
  fireEvent.click(screen.getByRole('button',{name:'1105—1183 帝国与城市'}));expect(location.search).toContain('year=1105');expect(location.search).not.toContain('kingdom=');
  expect(screen.getByRole('navigation',{name:'帝国与城市关键年份'})).toBeTruthy();
  const nav=screen.getByRole('combobox',{name:'跳转帝国与城市年份'});expect(nav.querySelectorAll('option')).toHaveLength(15);
  for(const year of [1106,1111,1122,1125,1133,1138,1152,1155,1158,1162,1167,1176,1177,1183]){fireEvent.change(nav,{target:{value:String(year)}});expect(location.search).toContain('year='+year);expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(5);}
  fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:/地图：意大利王国/}));
  fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/康斯坦茨/}));expect(location.search).toContain('place=konstanz');expect(location.search).toContain('kingdom=italy');
  expect(screen.getByText(/签约地在博登湖畔、阿尔卑斯北侧/)).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回 1183 年帝国与城市'}));expect(location.search).not.toContain('place=');expect(location.search).toContain('kingdom=italy');
  fireEvent.click(screen.getByRole('button',{name:'1002—1100 帝国与教皇'}));expect(location.search).toContain('year=1002');expect(screen.queryByRole('combobox',{name:'跳转帝国与城市年份'})).toBeNull();
  await act(async()=>{});expect(fetcher.mock.calls.flat().some(u=>String(u).includes('historical-boundaries'))).toBe(false);
 });
 it('restores a 1122 deep link and never carries the concordat map into 1123',async()=>{
  setup('/?year=1122&view=partitions&kingdom=east-francia&context=poland');expect(location.search).not.toContain('context=');
  fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/沃尔姆斯/}));expect(location.search).toContain('place=worms');expect(screen.getByText(/不是两国划定新边界/)).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'← 返回 1122 年帝国与城市'}));
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'1123'}});fireEvent.click(screen.getByLabelText('前往输入年份'));expect(location.search).not.toContain('view=partitions');expect(location.search).not.toContain('kingdom=');expect(screen.getByTestId('partition-map').textContent).toBe('');await act(async()=>{});
 });

 it('connects the 1190-1282 stage and preserves the Sicilian island on city return',async()=>{
  const fetcher=setup('/?year=1183&view=partitions&kingdom=italy');fireEvent.click(screen.getByRole('button',{name:'1190—1282 诸王国与继承'}));expect(location.search).toContain('year=1190');expect(location.search).not.toContain('kingdom=');
  const nav=screen.getByRole('combobox',{name:'跳转诸王国与继承年份'});expect(nav.querySelectorAll('option')).toHaveLength(28);
  for(const year of [1194,1198,1204,1214,1215,1220,1231,1250,1254,1266,1268,1273]){fireEvent.change(nav,{target:{value:String(year)}});expect(location.search).toContain('year='+year);expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(7);}
  fireEvent.change(nav,{target:{value:'1282'}});expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(8);fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:/地图：西西里岛王权/}));expect(location.search).toContain('kingdom=sicily');
  fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/巴勒莫/}));expect(location.search).toContain('place=palermo');expect(screen.getByText(/佩德罗三世及康斯坦丝的岛上王权/)).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'← 返回 1282 年诸王国与继承'}));expect(location.search).not.toContain('place=');expect(location.search).toContain('kingdom=sicily');
  fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:/地图：南部大陆王权/}));expect(screen.getByRole('article',{name:'分国地域详情'}).textContent).toContain('安茹的查理');fireEvent.change(nav,{target:{value:'1273'}});expect(location.search).not.toContain('kingdom=south-italy');
  fireEvent.click(screen.getByRole('button',{name:'1105—1183 帝国与城市'}));expect(location.search).toContain('year=1105');expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(5);await act(async()=>{});expect(fetcher.mock.calls.flat().some(u=>String(u).includes('historical-boundaries'))).toBe(false);
 });
 it('opens the English charter location and does not borrow it into an unreviewed year',async()=>{
  setup('/?year=1215&view=partitions&kingdom=england');fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/兰尼米德/}));expect(location.search).toContain('place=runnymede');expect(screen.getByText(/自由人和不自由人口/)).toBeTruthy();fireEvent.click(screen.getByRole('button',{name:'← 返回 1215 年诸王国与继承'}));
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'1217'}});fireEvent.click(screen.getByLabelText('前往输入年份'));expect(location.search).not.toContain('view=partitions');expect(screen.getByTestId('partition-map').textContent).toBe('');await act(async()=>{});
 });

 it('enters 1285-1356, changes regions and preserves city return without borrowing an unreviewed year',async()=>{
  const fetcher=setup('/?year=1282&view=partitions&kingdom=sicily');fireEvent.click(screen.getByRole('button',{name:'1285—1356 战争与教廷'}));expect(location.search).toContain('year=1285');
  const nav=screen.getByRole('combobox',{name:'跳转战争与教廷年份'});expect(nav.querySelectorAll('option')).toHaveLength(21);
  for(const year of [1291,1295,1297,1302,1303,1306,1308,1309,1312,1314,1317,1322,1327,1328,1337,1346,1347,1348,1355,1356]){fireEvent.change(nav,{target:{value:String(year)}});expect(location.search).toContain('year='+year);expect(within(screen.getByTestId('partition-map')).getAllByRole('button')).toHaveLength(12);}
  fireEvent.click(within(screen.getByTestId('partition-map')).getByRole('button',{name:/地图：波希米亚/}));fireEvent.click(within(screen.getByRole('article',{name:'分国地域详情'})).getByRole('button',{name:/布拉格/}));expect(location.search).toContain('place=prague');fireEvent.click(screen.getByRole('button',{name:'← 返回 1356 年战争、教廷与选帝'}));expect(location.search).toContain('kingdom=bohemia');expect(location.search).not.toContain('place=');
  fireEvent.click(screen.getByRole('button',{name:'1190—1282 诸王国与继承'}));expect(location.search).toContain('year=1190');expect(location.search).not.toContain('kingdom=bohemia');
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'1357'}});fireEvent.click(screen.getByLabelText('前往输入年份'));expect(location.search).not.toContain('view=partitions');expect(screen.getByTestId('partition-map').textContent).toBe('');await act(async()=>{});expect(fetcher.mock.calls.flat().some(u=>String(u).includes('historical-boundaries/1356'))).toBe(false);
 });
 it('opens each 1356 elector location and keeps the selected Bohemian region on return',async()=>{
  setup('/?year=1356&view=partitions&kingdom=bohemia');
  for(const [label,id] of [['美因茨大主教','mainz'],['特里尔大主教','trier'],['科隆大主教','cologne'],['波希米亚国王','prague'],['莱茵行宫伯爵','heidelberg'],['萨克森公爵','wittenberg'],['勃兰登堡边侯','brandenburg']]){
   const electors=screen.getByRole('region',{name:'1356年七位选帝侯'});expect(within(electors).getAllByRole('button')).toHaveLength(7);fireEvent.click(within(electors).getByRole('button',{name:new RegExp(label)}));expect(location.search).toContain('place='+id);fireEvent.click(screen.getByRole('button',{name:'← 返回 1356 年战争、教廷与选帝'}));expect(location.search).toContain('kingdom=bohemia');
  }
  await act(async()=>{});
 });

});
