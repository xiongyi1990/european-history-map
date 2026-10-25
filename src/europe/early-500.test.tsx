// @vitest-environment jsdom
import {afterEach,describe,it,expect,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,within} from '@testing-library/react';
import {early500Regions,earlyRegionsAt,earlyRegionAt,early500Labels,early500PlaceIds} from './early-500-regions';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {historicalTurningPoints,turningPointAt} from './historical-chronology';
import {ancientPlaces} from './model';
import {courseDetails} from './course-details';
import {EuropeApp} from './EuropeApp';
vi.mock('../greek/GreekMap',()=>({GreekMap:({overlay,onAreaSelect}:{overlay:{labels:{id:string;name:string}[];areas:{features:unknown[]}};onAreaSelect:(id:string)=>void})=><div data-testid="early-map"><span data-testid="early-area-count">{overlay.areas.features.length}</span>{overlay.labels.map(l=><button key={l.id} onClick={()=>onAreaSelect(l.id)}>{l.name}</button>)}</div>}));
HTMLDialogElement.prototype.showModal=function(){this.open=true};
HTMLDialogElement.prototype.close=function(){this.open=false};
afterEach(()=>{cleanup();vi.unstubAllGlobals();history.replaceState(null,'','/')});
vi.setConfig({testTimeout:15000});
describe('AD 500–800 continuous regional reading',()=>{
 it('covers every year exactly once in each region and keeps evidence and anchors valid',()=>{
  const ids=new Set(ancientPlaces.map(p=>p.id));
  for(let y=500;y<=800;y++){
   expect(earlyRegionsAt(y)).toHaveLength(14);
   for(const r of early500Regions)expect(r.phases.filter(p=>y>=p.from&&y<=p.to),r.id+':'+y).toHaveLength(1);
  }
  expect(earlyRegionsAt(499)).toEqual([]);expect(earlyRegionsAt(801)).toEqual([]);
  for(const r of early500Regions){
   expect(r.bounds[0][0]).toBeLessThan(r.bounds[1][0]);
   for(const [id] of r.places)expect(ids.has(id),r.id+':'+id).toBe(true);
   for(const key of [...r.sources,...r.phases.flatMap(p=>p.sources)])expect(historySources[key]?.url,key).toMatch(/^https:/);
  }
  expect(early500PlaceIds(669)).not.toContain('kairouan');
  expect(early500PlaceIds(670)).toContain('kairouan');
  expect(early500PlaceIds(680)).not.toContain('pliska');
  expect(early500PlaceIds(681)).toContain('pliska');
  expect(early500Labels(533).map(l=>l.id)).toContain('early500:africa');
 });
 it('does not anticipate conquests or confuse city capture with the end of a kingdom',()=>{
  expect(earlyRegionAt('africa',533)?.phase.control).toContain('抵抗');
  expect(earlyRegionAt('africa',534)?.phase.control).toContain('东罗马');
  expect(earlyRegionAt('italy',540)?.phase.control).toContain('抵抗');
  expect(earlyRegionAt('italy',568)?.phase.control).toContain('仍有');
  expect(earlyRegionAt('balkans',680)?.phase.name).not.toContain('保加利亚与');
  expect(earlyRegionAt('balkans',681)?.phase.name).toContain('保加利亚与');
  expect(earlyRegionAt('gaul',700)?.phase.control).toContain('墨洛温');
  expect(turningPointAt(602)?.after).toContain('603');
  expect(turningPointAt(577)).toBeUndefined();
 });
 it('distinguishes eighth century political transitions and new capitals',()=>{
  expect(earlyRegionAt('iberia',710)?.people).not.toContain('征服军');
  expect(earlyRegionAt('iberia',711)?.people).toContain('征服军');
  expect(earlyRegionAt('gaul',750)?.phase.control).toContain('墨洛温');
  expect(earlyRegionAt('gaul',751)?.phase.control).toContain('丕平');
  expect(earlyRegionAt('italy',750)?.phase.control).toContain('拉文纳');
  expect(earlyRegionAt('italy',751)?.phase.control).toContain('转入伦巴第');
  expect(earlyRegionAt('italy',774)?.phase.control).toContain('兼伦巴第王号');
  expect(earlyRegionAt('iberia',755)?.phase.control).toContain('竞争');
  expect(earlyRegionAt('iberia',756)?.phase.control).toContain('政治上独立');
  expect(earlyRegionAt('mesopotamia',761)?.phase.control).toContain('尚不能');
  expect(earlyRegionAt('mesopotamia',762)?.phase.control).toContain('巴格达');
  expect(early500PlaceIds(761)).not.toContain('baghdad');
  expect(early500PlaceIds(762)).toContain('baghdad');
  expect(earlyRegionAt('africa',800)?.phase.control).toContain('阿格拉布');
  expect(earlyRegionAt('north',793)?.phase.control).toContain('不能当作');
  expect(earlyRegionAt('east',740)?.phase.control).toContain('有争议');
  expect(earlyRegionAt('central',800)?.phase.control).toContain('九世纪初');
  expect(historicalDetail('narbonne',758)?.polity.text).toContain('穆斯林');
  expect(historicalDetail('narbonne',759)?.polity.text).toContain('丕平');
  expect(historicalDetail('ravenna',755)?.polity.text).toContain('伦巴第');
  expect(historicalDetail('ravenna',756)?.polity.text).toContain('赠地');
  expect(historicalDetail('regensburg',787)?.polity.text).toContain('塔西洛');
  expect(historicalDetail('regensburg',788)?.polity.text).toContain('被废');
  for(const y of [714,717,718,730,737,740,741,754,757,759,772,778,785,788,791,793,796])expect(turningPointAt(y),String(y)).toBeDefined();
 });
 it('validates the added city evidence, anchors and nonoverlapping ranges',()=>{
  const extra=courseDetails.filter(d=>d.id.startsWith('early700-'));
  const ids=new Set(ancientPlaces.map(p=>p.id));
  expect(extra.length).toBeGreaterThan(20);
  for(const d of extra){
   expect(ids.has(d.placeId)).toBe(true);
   expect(d.from).toBeGreaterThanOrEqual(701);expect(d.to).toBeLessThanOrEqual(800);
   expect(d.polity.sources.length).toBeGreaterThan(0);
   for(const key of [...d.polity.sources,...d.people.sources,...d.language.sources])expect(historySources[key]?.url,key).toMatch(/^https:/);
   for(let y=d.from;y<=d.to;y++)expect(historicalDetails.filter(other=>other.placeId===d.placeId&&other.from<=y&&other.to>=y),d.id+':'+y).toHaveLength(1);
  }
  console.info(JSON.stringify({newCityRecords700800:extra.length,events700800:historicalTurningPoints.filter(e=>e.year>=700&&e.year<=800).length}));
 });
 it('keeps a shared region selected across 700 and 701 and returns from an eighth century city',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=700&earlyRegion=italy');render(<EuropeApp/>);
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'701'}});
  fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(location.search).toContain('year=701');expect(location.search).toContain('earlyRegion=italy');
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});
  fireEvent.click(within(guide).getByRole('button',{name:/774—800/}));
  expect(location.search).toContain('year=774');
  fireEvent.click(guide.querySelector('.h-site-links button')!);
  expect(location.search).toContain('place=ravenna');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 774 年的地域与政权'}));
  expect(location.search).toContain('earlyRegion=italy');expect(location.search).not.toContain('place=');
  await act(async()=>{});
 });
 it('returns from Baghdad to the dated Mesopotamian guide after the city is added in 762',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=762&earlyRegion=mesopotamia');render(<EuropeApp/>);
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});
  fireEvent.click(within(guide).getByRole('button',{name:/巴格达 · 阿拔斯新都/}));
  expect(location.search).toContain('place=baghdad');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 762 年的地域与政权'}));
  expect(location.search).toContain('earlyRegion=mesopotamia');expect(location.search).not.toContain('place=');
  await act(async()=>{});
 });
 it('fills city gaps while preserving existing dated evidence and avoiding overlaps',()=>{
  expect(historicalDetail('carthage',533)?.id).toBe('carthage-533');
  expect(historicalDetail('carthage',577)?.polity.text).toContain('东罗马');
  expect(historicalDetail('lyon',533)?.polity.text).toContain('勃艮第');
  expect(historicalDetail('lyon',534)?.polity.text).toContain('法兰克');
  expect(historicalDetail('toulouse',506)?.polity.text).toContain('西哥特');
  expect(historicalDetail('toulouse',507)?.polity.text).toContain('法兰克');
  expect(historicalDetail('ravenna',539)?.polity.text).toContain('东哥特');
  expect(historicalDetail('ravenna',540)?.polity.text).toContain('东罗马');
  expect(historicalDetail('pavia',572)?.polity.text).toContain('伦巴第');
  expect(historicalDetail('antioch',540)?.polity.text).toContain('迁');
  expect(historicalDetail('antioch',620)?.polity.text).toContain('萨珊');
  expect(historicalDetail('antioch',650)?.polity.text).toContain('哈里发');
  expect(historicalDetail('ctesiphon',636)?.polity.text).toContain('萨珊');
  expect(historicalDetail('ctesiphon',637)?.polity.text).toContain('阿拉伯');
  const extra=courseDetails.filter(d=>d.id.startsWith('early500-'));
  for(const d of extra)for(let y=d.from;y<=d.to;y++)expect(historicalDetails.filter(other=>other.placeId===d.placeId&&other.from<=y&&other.to>=y)).toHaveLength(1);
  console.info(JSON.stringify({regions:early500Regions.length,phases:early500Regions.reduce((n,r)=>n+r.phases.length,0),newCityRecords:extra.length,events500700:historicalTurningPoints.filter(e=>e.year>=500&&e.year<=700).length,totalEvents:historicalTurningPoints.length}));
 });
 it('restores shared regional links, changes phase and returns from a city without changing the year',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=533&earlyRegion=africa');
  render(<EuropeApp/>);
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});
  expect(within(guide).getByRole('heading',{name:'北非：伊弗里基亚与马格里布'})).toBeTruthy();
  fireEvent.click(within(guide).getByRole('button',{name:/534—646/}));
  expect(location.search).toContain('year=534');expect(location.search).toContain('earlyRegion=africa');
  fireEvent.click(within(guide).getByRole('button',{name:/^迦太基/}));
  expect(location.search).toContain('place=carthage');expect(location.search).toContain('year=534');
  fireEvent.click(screen.getByRole('button',{name:'← 返回公元 534 年的地域与政权'}));
  expect(location.search).not.toContain('place=');
  expect(screen.getByRole('region',{name:'500—800 年连续地域导览'})).toBeTruthy();
  await act(async()=>{});
 });
 it('opens a region from its map label at an ordinary year without borrowing nearby borders',async()=>{
  vi.stubGlobal('fetch',vi.fn(async()=>({ok:true,json:async()=>({type:'FeatureCollection',features:[]})})));
  history.replaceState(null,'','/?year=577');
  render(<EuropeApp/>);
  fireEvent.click(screen.getByRole('button',{name:'4 · 意大利：伦巴第等'}));
  expect(location.search).toContain('year=577');expect(location.search).toContain('earlyRegion=italy');
  const guide=screen.getByRole('region',{name:'500—800 年连续地域导览'});
  expect(within(guide).getByRole('heading',{name:'帕维亚王权与东罗马飞地'})).toBeTruthy();
  expect(screen.getByTestId('early-area-count').textContent).toBe('0');
  fireEvent.change(screen.getByLabelText('输入历史年份'),{target:{value:'801'}});
  fireEvent.click(screen.getByLabelText('前往输入年份'));
  expect(location.search).not.toContain('earlyRegion');
  expect(screen.queryByRole('region',{name:'500—800 年连续地域导览'})).toBeNull();
  await act(async()=>{});
 });
});
