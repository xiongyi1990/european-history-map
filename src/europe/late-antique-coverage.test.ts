import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingCityRegionAt} from './reading-centuries';
import {fourthCityRegions,fourthEvents,fourthPhases,sasanianRulerAt} from './fourth-century';
import {fifthCityRegions,fifthRegionsAt} from './fifth-century-regions';
import {fifthWest,fifthEvents} from './fifth-century';
import {historicalDetail,detailsAt,historySources} from './history-details';
import {fifthBattles,fifthBattleYears,fifthBattleEvents} from './fifth-century-battles';
import {allBattles,battleYears,ancientPlaces} from './model';
import {lateAntiqueCities} from './late-antique-city-profiles';
import {fourthBattles} from './fourth-century-battles';

describe('fourth and fifth century coverage as one atlas',()=>{
 it('keeps the new route cities searchable and separates temporary presence, attack and lasting handover',()=>{
  for(const place of lateAntiqueCities){
   expect(ancientPlaces.filter(p=>p.id===place.id)).toHaveLength(1);
   for(let y=300;y<=500;y++){
    const record=historicalDetail(place.id,y)!;
    expect(record,`${y}:${place.id}`).toBeDefined();
    for(const f of [record.polity,record.territory,record.people,record.language,record.nameNote]){
     expect(f.sources.length).toBeGreaterThan(0);
     for(const source of f.sources)expect(historySources[source],`${y}:${place.id}:${source}`).toBeDefined();
    }
   }
   expect(historicalDetail(place.id,299)).toBeUndefined();expect(historicalDetail(place.id,501)).toBeUndefined();
  }
  expect(historicalDetail('narbonne',412)?.polity.text).toContain('约412／413年');
  expect(historicalDetail('narbonne',414)?.polity.text).toContain('三个不同节点');
  expect(historicalDetail('narbonne',461)?.polity.text).toContain('尚未发生');
  expect(historicalDetail('narbonne',462)?.polity.text).toContain('本年阿格里皮努斯');
  expect(historicalDetail('narbonne',500)?.polity.text).toContain('西哥特');
  expect(readingCityRegionAt('narbonne',462)).toBe('narbonensis5');
  expect(readingRegionsAt(462).find(r=>r.id==='narbonensis5')?.parent).toBe('gaul');
  expect(historicalDetail('metz',451)?.polity.text).toContain('永久行政区');
  expect(historicalDetail('verona',312)?.relatedBattles).toContain('milvian-312');
  expect(historicalDetail('verona',489)?.polity.text).toContain('不能把493年');
  expect(historicalDetail('reims',496)?.polity.text).toContain('498年或更晚');
  expect(historicalDetail('reims',500)?.polity.text).toContain('不能证明');
 });
 it('connects the missing civil war and migration phases to their original years and keeps geographic uncertainty visible',()=>{
  expect(fourthEvents.find(e=>e.year===394)?.battle).toBe('frigidus-394');
  expect(fourthBattles.find(b=>b.id==='frigidus-394')?.caveat).toContain('未标定');
  const rhine=fifthBattles.find(b=>b.id==='rhine-406')!;
  expect(rhine.caveat).toContain('渡河年代和具体渡点有讨论');
  expect(rhine.stages).toHaveLength(3);
  const northAfrica=fifthBattles.find(b=>b.id==='vandals-429')!;
  expect(northAfrica.stages.map(s=>s.date)).toEqual(['429 年','430—431 年','435 年','439—442 年']);
  expect(fifthEvents.find(e=>e.year===435)?.source).toBe('vandalTreaty5');
  expect(fifthBattleEvents[439]).toBe('vandals-429');
  for(const id of ['frigidus-394','rhine-406','vandals-429'])expect(allBattles.filter(b=>b.id===id)).toHaveLength(1);
 });
 it('keeps every inherited reading space and city available across the century boundary',()=>{
  expect(Object.keys(fourthCityRegions)).toHaveLength(70);
  expect(Object.keys(fifthCityRegions)).toHaveLength(74);
  const inherited=readingRegionsAt(400).map(r=>r.id);
  for(let y=401;y<=500;y++){
   const regions=readingRegionsAt(y);
   expect(regions).toHaveLength(50);
   expect(new Set(regions.map(r=>r.id)).size).toBe(regions.length);
   for(const id of inherited)expect(regions.some(r=>r.id===id),`${y}:${id}`).toBe(true);
   const details=detailsAt(y);
   for(const id of Object.keys(fifthCityRegions)){
    expect(details.filter(d=>d.placeId===id),`${y}:${id}`).toHaveLength(1);
    expect(regions.some(r=>r.id===readingCityRegionAt(id,y)),`${y}:${id}`).toBe(true);
   }
  }
  expect(fifthRegionsAt(501)).toEqual([]);
 });
 it('separates frontier alliances, Caucasus changes and Sasanian internal regions',()=>{
  const region=(id:string,y:number)=>readingRegionsAt(y).find(r=>r.id===id)!;
  expect(region('huns4',434).polity).toContain('共同领导');
  expect(region('huns4',445).polity).toContain('单独领导');
  expect(region('huns4',453).polity).toContain('继承者争权');
  expect(region('huns4',500).polity).toContain('不能把');
  expect(region('armenia',427).polity).toContain('仍保留阿尔沙克王权');
  expect(region('armenia',428).polity).toContain('总督');
  expect(region('armenia',451).polity).toContain('阿瓦赖尔');
  expect(region('armenia',484).polity).toContain('和解');
  expect(region('franks',482).polity).toContain('继承');
  expect(region('ireland',500).polity).toContain('未成为罗马行省');
  expect(region('north',500).polity).toContain('不是维京时代');
  for(const id of ['asoristan','pars','khuzestan']){
   expect(region(id,500).parent).toBe('persia');
   expect(region(id,500).polity).toContain('卡瓦德');
   expect(region('persia',500).cities).toEqual(expect.arrayContaining(region(id,500).cities));
  }
  expect(readingCityRegionAt('ctesiphon',500)).toBe('asoristan');
  expect(historicalDetail('housesteads',500)?.polity.text).toContain('旧堡址');
  expect(historicalDetail('volubilis',500)?.polity.text).toContain('撤出');
  for(const y of [301,330,395,400])for(const id of ['ravenna','hippo','toulouse','tournai','clermont5'])expect(historicalDetail(id,y),`${y}:${id}`).toBeDefined();
 });
 it('states same-year succession without backdating rulers or distant events',()=>{
  expect(sasanianRulerAt(302)).toContain('交接');
  expect(sasanianRulerAt(309)).toContain('即位');
  expect(sasanianRulerAt(379)).toContain('去世');
  expect(sasanianRulerAt(383)).toContain('交接');
  expect(sasanianRulerAt(388)).toContain('去世');
  expect(sasanianRulerAt(399)).toContain('继位');
  expect(fifthWest(421)).toContain('共治');
  expect(fourthPhases.find(p=>308>=p.from&&308<=p.to)?.east).toContain('受立');
  expect(readingRegionsAt(365).find(r=>r.id==='asia')?.polity).toContain('普罗科皮乌斯');
  expect(fifthEvents.find(e=>e.year===451)?.regions).toContain('armenia');
  for(const e of fourthEvents){expect(historySources[e.source]).toBeDefined();expect(e.places.every(id=>historicalDetail(id,e.year))).toBe(true);}
 });
 it('connects sourced fifth-century routes to events without inventing unknown battle positions',()=>{
  expect(fifthBattles).toHaveLength(8);
  expect(fifthBattles.flatMap(b=>b.stages)).toHaveLength(25);
  for(const b of fifthBattles){
   expect(allBattles.filter(v=>v.id===b.id)).toHaveLength(1);
   expect(battleYears[b.id]).toBe(fifthBattleYears[b.id]);
   for(const s of b.stages){
    expect(Object.values(historySources).some(v=>v.url===s.source)).toBe(true);
    for(const [lon,lat] of [...s.path,...s.stops.map(p=>p.coords)]){expect(lon).toBeGreaterThan(-25);expect(lon).toBeLessThan(55);expect(lat).toBeGreaterThan(24);expect(lat).toBeLessThan(72);}
   }
  }
  for(const [y,id] of Object.entries(fifthBattleEvents)){expect(fifthEvents.some(e=>e.year===Number(y))).toBe(true);expect(allBattles.some(b=>b.id===id)).toBe(true)}
  expect(fifthBattles.find(b=>b.id==='attila-gaul-451')?.caveat).toContain('地点有争论');
  expect(ancientPlaces.filter(p=>p.id==='clermont5')).toHaveLength(1);
  for(const r of readingRegionsAt(500))for(const source of r.sources)expect(historySources[source],source).toBeDefined();
 });
});
