import {describe,it,expect} from 'vitest';
import {salianFrames} from './salian-relations';
import {partitionAt,partitionRealmAt,partitionStageYears,partitionTopic} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionPlaceIds,partitionCityRealmAt} from './frankish-partition-map';
import {ancientPlaces} from './model';
import {historicalDetail} from './history-details';
describe('eleventh-century exact-year political relationships',()=>{
 it('matches all ten states, valid geography and real anchors without extending to nearby dates',()=>{
  expect(partitionStageYears(1077)).toEqual([1002,1014,1024,1027,1032,1034,1056,1077,1084,1100]);expect(partitionStageYears(1000)).toHaveLength(14);
  expect(partitionTopic(1077)).toBe('帝国与教皇');
  for(const frame of salianFrames){const areas=partitionAreas(frame.year).features;expect(areas).toHaveLength(5);expect(areas.map(f=>f.properties?.atlasId).sort()).toEqual(partitionLabels(frame.year).map(l=>l.id).sort());for(const id of partitionPlaceIds(frame.year))expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const f of areas){expect(f.properties?.year).toBe(frame.year);expect(f.properties?.spatialScope).toBe('regional-context');}for(const relation of frame.relationships??[])for(const id of relation.realmIds)expect(partitionRealmAt(frame.year,id),id).toBeDefined();}
  for(const year of [1001,1003,1013,1015,1025,1033,1057,1078,1085,1101]){expect(partitionAt(year)).toBeUndefined();expect(partitionAreas(year).features).toEqual([]);expect(partitionCityRealmAt(year,'pavia')).toBeUndefined();}
 });
 it('keeps the contested succession and ruler titles specific to time',()=>{
  expect(partitionRealmAt(1002,'italy')?.ruler).toContain('阿尔杜因');expect(partitionRealmAt(1002,'east-francia')?.ruler).toContain('尚无帝号');
  expect(partitionRealmAt(1014,'italy')?.status).toContain('1015年退出');expect(partitionRealmAt(1024,'east-francia')?.status).toContain('尚不是1027');
  expect(partitionRealmAt(1032,'burgundy')?.name).toContain('继承争夺');expect(partitionRealmAt(1032,'burgundy')?.color).not.toBe(partitionRealmAt(1032,'east-francia')?.color);
  expect(partitionRealmAt(1034,'burgundy')?.color).toBe(partitionRealmAt(1034,'east-francia')?.color);expect(partitionRealmAt(1027,'east-francia')?.ruler).toContain('本年加冕为帝');expect(partitionRealmAt(1056,'burgundy')?.color).toBe(partitionRealmAt(1056,'east-francia')?.color);expect(partitionRealmAt(1056,'east-francia')?.ruler).toContain('阿格尼丝');
  expect(partitionAt(1077)?.eventDate).toContain('3月对立国王选举之前');expect(partitionRealmAt(1077,'east-francia')?.ruler).toContain('1084年才有帝号');expect(partitionRealmAt(1084,'italy')?.status).toContain('克雷芒三世');
  expect(partitionRealmAt(1100,'east-francia')?.ruler).toContain('共同国王');expect(partitionRealmAt(1100,'west-francia')?.ruler).toContain('腓力一世');
 });
 it('locates Canossa without turning the opposing countess into royal direct rule',()=>{
  expect(partitionPlaceIds(1077)).toContain('canossa');expect(partitionCityRealmAt(1077,'canossa')).toBeUndefined();expect(partitionCityRealmAt(1084,'rome')).toBeUndefined();
  expect(historicalDetail('canossa',1077)?.reading?.[0].chapter).toBe(160);expect(historicalDetail('canossa',1077)?.nameNote.text).toContain('1077年国王');expect(historicalDetail('canossa',1078)).toBeUndefined();
 });
});
