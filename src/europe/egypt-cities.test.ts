import {describe,it,expect} from 'vitest';
import {readingRegionsAt,readingRegionById,readingCityRegionAt} from './reading-centuries';
import {historicalDetails,historicalDetail,historySources} from './history-details';
import {administrativeGroupsAt} from './administrative-groups-395';
import {egyptCityPlaces} from './egypt-cities';

describe('Egyptian gateways and river cities',()=>{
 it('connects dated city records to contemporary parent geography throughout 300–500',()=>{
  for(let y=300;y<=500;y++){
   expect(readingRegionsAt(y).filter(r=>r.id==='egypt-middle')).toHaveLength(1);
   for(const p of egyptCityPlaces){
    const records=historicalDetails.filter(d=>d.placeId===p.id&&d.from<=y&&d.to>=y);expect(records).toHaveLength(1);
    const r=readingRegionById(readingCityRegionAt(p.id,y)!,y)!;expect(r.cities).toContain(p.id);expect(readingRegionById('egypt',y)?.cities).toContain(p.id);
    expect(r.polity).toBe(readingRegionById('egypt',y)?.polity);
    expect(p.coords[0]).toBeGreaterThanOrEqual(r.bounds[0][0]);expect(p.coords[0]).toBeLessThanOrEqual(r.bounds[1][0]);
    expect(p.coords[1]).toBeGreaterThanOrEqual(r.bounds[0][1]);expect(p.coords[1]).toBeLessThanOrEqual(r.bounds[1][1]);
    for(const f of [records[0].polity,records[0].territory,records[0].people,records[0].language,records[0].nameNote]){expect(f.sources.length).toBeGreaterThan(0);for(const s of f.sources)expect(historySources[s]).toBeDefined();}
   }
  }
  for(const y of [299,501]){expect(readingRegionById('egypt-middle',y)).toBeUndefined();for(const p of egyptCityPlaces)expect(historicalDetail(p.id,y)).toBeUndefined();}
 });
 it('keeps reports, languages and eastern political context dated',()=>{
  expect(historicalDetail('oxyrhynchus',314)?.people.text).not.toContain('315');
  expect(historicalDetail('oxyrhynchus',315)?.people.text).toContain('维修');
  expect(historicalDetail('oxyrhynchus',315)?.people.text).not.toContain('提交的伤情');
  expect(historicalDetail('oxyrhynchus',316)?.people.text).toContain('伤情报告');
  expect(historicalDetail('oxyrhynchus',341)?.polity.text).not.toContain('342 年');
  expect(historicalDetail('oxyrhynchus',342)?.polity.text).toContain('赫拉克利奥波利斯写成');
  expect(historicalDetail('oxyrhynchus',341)?.language.text).not.toContain('342 年');
  expect(historicalDetail('oxyrhynchus',342)?.language.text).toContain('拉丁文纪年');
  expect(historicalDetail('pelusium',394)?.polity.text).not.toContain('东部朝廷治理下');
  expect(historicalDetail('pelusium',395)?.polity.text).toContain('东部朝廷治理下');
  expect(historicalDetail('pelusium',395)?.language.text).toContain('四世纪中叶');
  expect(historicalDetail('pelusium',395)?.language.text).toContain('发生地也不同');
  expect(readingRegionById('egypt-middle',314)?.people).not.toContain('315');
  expect(readingRegionById('egypt-middle',341)?.language).not.toContain('342');
  expect(readingRegionById('egypt-middle',342)?.language).toContain('342');
 });
 it('exposes both cities and the middle river window from the 395 administrative directory',()=>{
  const g=administrativeGroupsAt('east',395).find(g=>g.id==='egyptian-provinces')!;
  expect(g.regions.map(([id])=>id)).toContain('egypt-middle');
  for(const p of egyptCityPlaces)expect(g.cities.map(([id])=>id)).toContain(p.id);
  expect(egyptCityPlaces.find(p=>p.id==='oxyrhynchus')?.description).toContain('约 2 千米');
  expect(egyptCityPlaces.find(p=>p.id==='pelusium')?.description).toContain('ODC-By 1.0');
 });
});
