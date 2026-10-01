import {describe,it,expect} from 'vitest';
import {fifthEvents,fifthPhaseAt,fifthEast,fifthWest,fifthPersia} from './fifth-century';
import {fifthCityRegions,fifthRegionsAt} from './fifth-century-regions';
import {fifthPlaces} from './fifth-century-cities';
import {readingRegionsAt,readingCityRegionAt} from './reading-centuries';
import {detailsAt,historicalDetail,historicalDetails,historySources,historyWindows} from './history-details';
import {ancientPlaces,makeAreas} from './model';
import {dateFifthAreas} from './fifth-century-boundaries';
import raw500 from '../../public/historical-boundaries/world_500.geojson?raw';
import {fifthAfrica} from './fifth-century-rulers';
import {fifthVisigoths,fifthSuevi} from './fifth-century-western-kingdoms';

describe('AD 400–500 reading continuity',()=>{
 it('distinguishes royal succession from changing cities and preserves neighbouring periods',()=>{
  for(const [year,text] of [[418,'瓦利亚去世'],[451,'托里斯蒙德'],[453,'狄奥多里克二世'],[466,'466／467'],[467,'466／467'],[484,'阿拉里克二世'],[500,'尚未进入后来的托莱多']] as const){
   expect(fifthVisigoths(year)).toContain(text);
   expect(historicalDetail('toulouse',year)?.polity.text).toContain(text);
   expect(fifthRegionsAt(year).find(r=>r.id==='aquitaine5')?.polity).toContain(text);
  }
  expect(historicalDetail('toulouse',501)?.polity.text).not.toContain('阿拉里克二世');
  expect(historicalDetail('toulouse',500)?.people.text).toBe(historicalDetail('toulouse',501)?.people.text);
  for(const [year,text] of [[438,'雷基拉'],[448,'雷基亚尔'],[456,'被处死'],[460,'分裂'],[464,'464／465'],[465,'464／465'],[469,'雷米斯蒙德'],[500,'资料稀疏']] as const){
   expect(fifthSuevi(year)).toContain(text);expect(historicalDetail('braga5',year)?.polity.text).toContain(text);
   expect(fifthRegionsAt(year).find(r=>r.id==='gallaecia5')?.polity).toContain(text);
  }
 });
 it('keeps Auvergne separate from the Provence occupation, recovery and final handover',()=>{
  expect(readingCityRegionAt('clermont5',475)).toBe('auvergne5');
  expect(historicalDetail('clermont5',474)?.polity.text).toContain('抵抗');
  expect(historicalDetail('clermont5',475)?.polity.text).toContain('和议将奥弗涅让给西哥特');
  expect(historicalDetail('clermont5',400)?.polity.text).toContain('罗马帝国西部');
  expect(historicalDetail('clermont5',400)?.polity.text).not.toContain('让给西哥特');
  for(const city of ['arles','massilia']){
   expect(historicalDetail(city,473)?.polity.text).toContain('随后又被尼波斯短暂收回');
   expect(historicalDetail(city,474)?.polity.text).toContain('短暂恢复');
   expect(historicalDetail(city,475)?.polity.text).toContain('罗马控制');
   expect(historicalDetail(city,476)?.polity.text).toContain('再次转入西哥特');
  }
 });
 it('distinguishes late emperors, contested accession years and vacant western throne',()=>{
  const cases:[number,string][]=[[455,'佩特罗尼乌斯'],[456,'阿维图斯'],[457,'马约里安'],[461,'塞维鲁斯'],[464,'东方不承认'],[465,'皇位再次空缺'],[466,'皇位空缺'],[467,'安特米乌斯'],[472,'仍在世时被拥立'],[473,'格利凯里乌斯'],[474,'尼波斯']];
  for(const [year,text] of cases){
   expect(fifthWest(year)).toContain(text);
   for(const city of ['rome','ravenna'])expect(historicalDetail(city,year)?.polity.text,`${city}:${year}`).toContain(text);
   const region=fifthRegionsAt(year).find(r=>r.id==='italy')!;
   expect(region.polity).toContain(text);
   expect(historicalDetail('ravenna',year)?.polity.sources).toEqual(expect.arrayContaining(region.sources));
  }
  expect(fifthEvents.some(e=>e.year===465)).toBe(true);
  expect(fifthEvents.find(e=>e.year===472)?.places).toContain('rome');
 });
 it('preserves Carthage evidence while adding kings and successor-year handovers',()=>{
  const cases:[number,string][]=[[476,'盖萨里克'],[477,'胡内里克'],[483,'胡内里克'],[484,'贡塔蒙德'],[495,'贡塔蒙德'],[496,'特拉萨蒙德'],[500,'特拉萨蒙德']];
  for(const [year,text] of cases){
   const d=historicalDetail('carthage',year)!;
   expect(d.polity.text).toContain(text);expect(fifthAfrica(year)).toContain(text);
   for(const id of ['africa','carthage-region5'])expect(fifthRegionsAt(year).find(r=>r.id===id)?.polity).toContain(text);
   expect(d.polity.sources).toContain('vandalKings5');
   expect(d.reading?.length).toBeGreaterThan(0);
   expect(d.people.text).toBe(historicalDetail('carthage',501)?.people.text);
  }
  expect(historicalDetail('carthage',501)?.polity.text).not.toContain('特拉萨蒙德');
  expect(historicalDetail('carthage',438)?.polity.text).not.toContain('盖萨里克（汪达尔国王');
 });
 it('keeps local areas geographical and distinguishes asynchronous southern city handovers',()=>{
  for(let year=401;year<=500;year++){
   const regions=readingRegionsAt(year);
   expect(regions).toHaveLength(50);
   for(const r of regions.filter(r=>r.parent)){
    const parent=regions.find(p=>p.id===r.parent)!;
    expect(parent).toBeDefined();
    for(const id of r.cities){expect(parent.cities).toContain(id);expect(readingCityRegionAt(id,year)).toBe(r.id)}
    for(const id of r.sources)expect(historySources[id],id).toBeDefined();
   }
  }
  expect(historicalDetail('arles',475)?.polity.text).toContain('罗马控制继续收缩');
  expect(historicalDetail('arles',476)?.polity.text).toContain('阿尔勒、马赛再次转入西哥特');
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
   expect(new Set(e.places).size,e.title).toBe(e.places.length);
   expect(new Set(e.regions).size,e.title).toBe(e.regions.length);
   for(const id of [e.source,...e.moreSources??[]])expect(historySources[id],id).toBeDefined();
   for(const id of e.places)expect(historicalDetail(id,e.year),`${e.year}:${id}`).toBeDefined();
   for(const id of e.regions)expect(readingRegionsAt(e.year).some(r=>r.id===id),`${e.year}:${id}`).toBe(true);
  }
  expect(readingRegionsAt(400)).toHaveLength(40);
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
