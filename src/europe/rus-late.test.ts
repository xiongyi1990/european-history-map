import {describe,it,expect} from 'vitest';
import {rusLateDetails,rusLatePlaces} from './rus-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionBoundsAt,partitionLabels} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import progress from './atlas-progress-summary.json';
describe('Rus political institutions, contested titles and manuscript dates1360-1453',()=>{
 it('adds four separate cores at existing moments and reuses Moscow without inventing missing years',()=>{
  expect(medievalTransitionYears).toHaveLength(27);expect(rusLatePlaces).toHaveLength(8);expect(rusLateDetails).toHaveLength(239);
  for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(37);for(const id of ['moscow-rus','tver-rus','novgorod-rus','pskov-rus'])expect(partitionRealmAt(y,id)).toBeDefined();for(const n of ['特维尔','普斯科夫','诺夫哥罗德'])expect(partitionLabels(y).some(l=>l.name===n)).toBe(true);}
  expect(partitionBoundsAt(1453)[1][0]).toBeGreaterThan(42);expect(partitionAt(1380)).toBeUndefined();expect(partitionRealmAt(1356,'moscow-rus')).toBeUndefined();expect(ancientPlaces.filter(p=>p.id==='moscow')).toHaveLength(1);
  for(const d of rusLateDetails){expect(historicalDetail(d.placeId,d.from)?.id,d.id).toBe(d.id);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const field of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const k of field.sources)expect(historySources[k]?.url,k).toMatch(/^https:/);}
  expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);
 });
 it('distinguishes the two Dmitrys, title grants and Tver autonomy',()=>{
  expect(partitionRealmAt(1360,'moscow-rus')?.ruler).toContain('康斯坦丁诺维奇');expect(partitionRealmAt(1360,'novgorod-rus')?.status).toContain('苏兹达尔');expect(partitionRealmAt(1364,'moscow-rus')?.ruler).toContain('并有弗拉基米尔');expect(partitionRealmAt(1377,'tver-rus')?.status).toContain('仍保有自己的王公');expect(partitionRealmAt(1397,'tver-rus')?.ruler).toContain('米哈伊尔');expect(partitionRealmAt(1399,'tver-rus')?.ruler).toContain('伊凡');expect(partitionRealmAt(1429,'tver-rus')?.ruler).toContain('鲍里斯');
 });
 it('keeps1380 victory,1382 sack and1389 accession in their own times',()=>{
  expect(historicalDetail('kulikovo',1378)).toBeUndefined();expect(historicalDetail('kulikovo',1381)?.polity.text).toContain('1382年攻陷莫斯科尚未发生');expect(historicalDetail('kulikovo',1385)?.polity.text).toContain('随后纳贡关系继续');expect(partitionRealmAt(1385,'moscow-rus')?.ruler).toContain('尚非现任大公');expect(partitionRealmAt(1389,'moscow-rus')?.status).toContain('汗使');
 });
 it('records a temporary northern transfer without annexing the republic or extending its reading core',()=>{
  expect(partitionRealmAt(1396,'novgorod-rus')?.status).toContain('尚属诺夫哥罗德');expect(partitionRealmAt(1397,'novgorod-rus')?.status).toContain('本年暂转莫斯科');expect(partitionRealmAt(1399,'novgorod-rus')?.status).toContain('1398年德维纳已归还');expect(historicalDetail('novgorod',1453)?.polity.text).toContain('1478并入莫斯科尚未发生');expect(historicalDetail('novgorod',1450)?.polity.text).toContain('不直接等于共和国唯一统治者');
 });
 it('does not turn a1431 petition into1432 judgment or ignore interrupted reigns and late co-rule',()=>{
  expect(partitionRealmAt(1431,'moscow-rus')?.status).toContain('1432年的裁决已经完成');expect(partitionRealmAt(1435,'moscow-rus')?.status).toContain('1436年才');expect(partitionRealmAt(1444,'moscow-rus')?.status).toContain('1446');expect(partitionRealmAt(1450,'moscow-rus')?.ruler).toContain('伊凡');expect(partitionRealmAt(1453,'moscow-rus')?.ruler).toContain('共治');
 });
 it('preserves manuscript date ranges, Pskov legal layers and city communities',()=>{
  expect(historicalDetail('pskov',1397)?.polity.text).toContain('现存完整法典已一次颁成');expect(historicalDetail('pskov',1397)?.language.sources).toContain('rusPskovManuscript');expect(historicalDetail('novgorod',1397)?.language.text).toContain('1392尼布尔和约');expect(historicalDetail('novgorod',1389)?.language.text).not.toContain('1392尼布尔和约');expect(historicalDetail('staraya-russa',1415)?.language.text).toContain('1410—1420');expect(historicalDetail('staraya-russa',1389)?.people.text).toContain('婚礼');expect(historicalDetail('tver',1431)?.people.sources).toContain('rusTverMuseum');expect(historicalDetail('moscow',1409)?.language.sources).not.toContain('rusMoscowBirch');
 });
 it('does not copy later monastery buildings or conflate Vladimir and Novgorod names',()=>{
  expect(historicalDetail('trinity-sergius',1378)?.polity.text).toContain('早期木构');expect(historicalDetail('trinity-sergius',1409)?.polity.text).toContain('重建阶段');expect(historicalDetail('trinity-sergius',1414)?.polity.text).toContain('1422石三一教堂尚未');expect(historicalDetail('trinity-sergius',1422)?.polity.text).toContain('16世纪石墙');expect(historicalDetail('vladimir-on-klyazma',1410)?.nameNote.text).toContain('克利亚济马');expect(historicalDetail('novgorod',1410)?.nameNote.text).toContain('下诺夫哥罗德');
 });
});
