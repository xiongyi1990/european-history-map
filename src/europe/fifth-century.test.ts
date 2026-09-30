import {describe,it,expect} from 'vitest';
import {fifthEvents,fifthPhaseAt,fifthEast,fifthWest,fifthPersia} from './fifth-century';
import {fifthCityRegions,fifthRegionsAt} from './fifth-century-regions';
import {fifthPlaces} from './fifth-century-cities';
import {readingRegionsAt,readingCityRegionAt} from './reading-centuries';
import {detailsAt,historicalDetail,historicalDetails,historySources,historyWindows} from './history-details';
import {ancientPlaces,makeAreas} from './model';
import {dateFifthAreas} from './fifth-century-boundaries';
import raw500 from '../../public/historical-boundaries/world_500.geojson?raw';

describe('AD 400–500 reading continuity',()=>{
 it('keeps local areas geographical and distinguishes asynchronous southern city handovers',()=>{
  for(let year=401;year<=500;year++){
   const regions=readingRegionsAt(year);
   expect(regions).toHaveLength(23);
   for(const r of regions.filter(r=>r.parent)){
    const parent=regions.find(p=>p.id===r.parent)!;
    expect(parent).toBeDefined();
    for(const id of r.cities){expect(parent.cities).toContain(id);expect(readingCityRegionAt(id,year)).toBe(r.id)}
    for(const id of r.sources)expect(historySources[id],id).toBeDefined();
   }
  }
  expect(historicalDetail('arles',475)?.polity.text).toContain('罗马控制继续收缩');
  expect(historicalDetail('arles',476)?.polity.text).toContain('476 年阿尔勒、马赛转入西哥特');
  expect(historicalDetail('massilia',500)?.polity.text).toContain('此时不归法兰克');
  expect(historicalDetail('tarraco',471)?.polity.text).toContain('罗马行政传统');
  expect(historicalDetail('tarraco',472)?.polity.text).toContain('约 472 年');
  expect(historicalDetail('tarraco',500)?.polity.text).toContain('以图卢兹为中心');
  expect(readingRegionsAt(400).some(r=>r.id==='provence5')).toBe(false);
  expect(fifthEvents.map(e=>e.year)).toEqual([...fifthEvents.map(e=>e.year)].sort((a,b)=>a-b));
 });
 it('covers all added century cities exactly once for each year without claiming coverage beyond 500',()=>{
  for(let year=401;year<=500;year++){
   expect(fifthPhaseAt(year)?.from).toBeLessThanOrEqual(year);
   expect(fifthPhaseAt(year)?.to).toBeGreaterThanOrEqual(year);
   const records=detailsAt(year);
   for(const id of Object.keys(fifthCityRegions))expect(records.filter(d=>d.placeId===id),`${year}:${id}`).toHaveLength(1);
   for(const r of fifthRegionsAt(year))for(const id of r.cities)expect(records.some(d=>d.placeId===id),`${year}:${r.id}:${id}`).toBe(true);
  }
  for(const d of historicalDetails.filter(d=>d.id.includes('-fifth-'))){
   expect(d.from).toBeGreaterThan(400);expect(d.to).toBeLessThanOrEqual(500);
   expect(d.focusYear).toBeGreaterThanOrEqual(d.from);expect(d.focusYear).toBeLessThanOrEqual(d.to);
   expect(d.territory.text).not.toContain('402 年迁拉文纳尚未发生');
   for(const f of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const id of f.sources)expect(historySources[id],id).toBeDefined();
  }
  for(const p of fifthPlaces){expect(ancientPlaces.filter(a=>a.id===p.id)).toHaveLength(1);expect(historicalDetail(p.id,501)).toBeUndefined()}
 });
 it('keeps the separately dated city handovers and late imperial continuity',()=>{
  expect(historicalDetail('carthage',438)?.polity.text).toContain('罗马');
  expect(historicalDetail('carthage',439)?.polity.text).toContain('汪达尔');
  expect(historicalDetail('rome',410)?.polity.text).toContain('阿拉里克');
  expect(historicalDetail('rome',477)?.polity.text).toContain('奥多亚克');
  expect(historicalDetail('rome',493)?.polity.text).toContain('狄奥多里克');
  expect(historicalDetail('byzantium',475)?.polity.text).toContain('巴西利斯库斯');
  expect(historicalDetail('ravenna',491)?.polity.text).toContain('争夺意大利');
  expect(historicalDetail('salona',477)?.polity.text).toContain('尼波斯');
  expect(fifthEast(476)).toContain('芝诺回到');
  expect(fifthWest(476)).toContain('废黜');
  expect(fifthPersia(497)).toContain('贾马斯普');expect(fifthPersia(500)).toContain('卡瓦德');
  expect(historicalDetail('nisibis',450)?.polity.text).toContain('萨珊');
  expect(historicalDetail('edessa',450)?.polity.text).toContain('罗马');
  expect(historicalDetail('soissons5',486)?.polity.text).toContain('本年克洛维击败');
 });
 it('resolves every event and source and keeps the 400 layer intact',()=>{
  expect(new Set(historyWindows.map(e=>e.year)).size).toBe(historyWindows.length);
  for(const e of fifthEvents){
   for(const id of [e.source,...e.moreSources??[]])expect(historySources[id],id).toBeDefined();
   for(const id of e.places)expect(historicalDetail(id,e.year),`${e.year}:${id}`).toBeDefined();
   for(const id of e.regions)expect(readingRegionsAt(e.year).some(r=>r.id===id),`${e.year}:${id}`).toBe(true);
  }
  expect(readingRegionsAt(400)).toHaveLength(38);
  expect(readingCityRegionAt('lepcis',400)).toBe('tripolitania400');
  expect(readingCityRegionAt('braga5',450)).toBe('gallaecia5');
  expect(readingRegionsAt(501)).toEqual([]);
 });
 it('dates borrowed outlines without changing geometry or suggesting the snapshot is actual control',()=>{
  const areas=makeAreas(JSON.parse(raw500),false,500),dated=dateFifthAreas(areas,451,500);
  expect(dated.map(a=>a.feature.geometry)).toEqual(areas.map(a=>a.feature.geometry));
  for(const a of dated){expect(a.name).toContain('500 年轮廓');expect(a.context?.membership).toContain('不能当作当年实控')}
  for(const a of dated.filter(a=>a.original==='Western Roman Empire')){expect(a.kind).toBe('reference');expect(a.name).toContain('原图归属待核对')}
  expect(dateFifthAreas(areas,500,500)).toBe(areas);
 });
});
