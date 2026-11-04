import {describe,it,expect} from 'vitest';
import {highMedievalFrames,highMedievalYears} from './high-medieval';
import {highMedievalDetails,highMedievalPlaces} from './high-medieval-places';
import {partitionAt,partitionRealmAt,partitionStageYears,partitionTopic} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionPlaceIds,partitionBoundsAt,partitionCityRealmAt} from './frankish-partition-map';
import {ancientPlaces} from './model';
import {historicalDetail,historySources} from './history-details';
import progress from './atlas-progress-summary.json';

describe('1190-1282 multi-kingdom spatial reading',()=>{
 it('covers twenty-eight reviewed moments with matching seven/eight distinct reading regions',()=>{
  expect(highMedievalYears).toEqual([1190,1191,1194,1197,1198,1199,1204,1208,1209,1212,1214,1215,1216,1220,1223,1226,1229,1231,1235,1237,1245,1250,1254,1261,1266,1268,1273,1282]);
  expect(partitionStageYears(1282)).toEqual(highMedievalYears);expect(partitionStageYears(1183)).toHaveLength(15);expect(partitionTopic(1282)).toBe('诸王国与继承');
  for(const frame of highMedievalFrames){const areas=partitionAreas(frame.year).features;expect(areas).toHaveLength(frame.year===1282?8:7);expect(areas.map(f=>f.properties?.atlasId).sort()).toEqual(partitionLabels(frame.year).map(l=>l.id).sort());for(const f of areas){expect(f.properties?.year).toBe(frame.year);expect(f.properties?.spatialScope).toBe('regional-context');}for(const id of partitionPlaceIds(frame.year))expect(ancientPlaces.filter(p=>p.id===id),id).toHaveLength(1);for(const r of frame.relationships??[])for(const id of r.realmIds)expect(partitionRealmAt(frame.year,id)).toBeDefined();}
  expect(partitionBoundsAt(1282)[0][1]).toBeLessThan(37);expect(partitionBoundsAt(1077)[0][1]).toBeGreaterThan(40);
  for(const year of [1189,1192,1193,1195,1196,1200,1203,1210,1211,1213,1217,1221,1222,1224,1227,1228,1230,1232,1234,1236,1238,1244,1246,1251,1253,1255,1260,1262,1267,1269,1272,1274,1281,1283])expect(partitionAreas(year).features).toEqual([]);
 });
 it('separates royal titles, competing kings, imperial coronation and local control',()=>{
  expect(partitionRealmAt(1190,'east-francia')?.ruler).toContain('尚未获帝号');expect(partitionRealmAt(1191,'east-francia')?.ruler).toContain('加冕为帝');expect(partitionRealmAt(1194,'sicily')?.ruler).toContain('亨利六世');
  expect(partitionRealmAt(1197,'east-francia')?.ruler).not.toContain('奥托四世');expect(partitionRealmAt(1198,'east-francia')?.ruler).toContain('士瓦本的腓力');expect(partitionRealmAt(1209,'east-francia')?.ruler).toContain('奥托四世');
  expect(partitionAt(1212)?.eventDate).toContain('美因茨');expect(partitionAt(1215)?.eventDate).toContain('8月废止之前');expect(partitionRealmAt(1220,'east-francia')?.ruler).toContain('本年加冕为帝');expect(partitionRealmAt(1235,'east-francia')?.ruler).toContain('已失势');expect(partitionRealmAt(1237,'east-francia')?.ruler).toContain('康拉德四世');
  expect(partitionAt(1245)?.change).toContain('不能在地图上让皇帝本人和全部权力同时消失');expect(partitionRealmAt(1250,'east-francia')?.ruler).toContain('康拉德四世');expect(partitionAt(1254)?.change).toContain('1258年才称王');expect(partitionRealmAt(1273,'east-francia')?.ruler).toContain('没有帝号');
 });
 it('makes island-mainland separation explicit in 1282 without losing the mainland king',()=>{
  expect(partitionRealmAt(1273,'south-italy')).toBeUndefined();expect(partitionRealmAt(1282,'sicily')?.ruler).toContain('佩德罗');expect(partitionRealmAt(1282,'south-italy')?.ruler).toContain('查理');expect(partitionRealmAt(1282,'sicily')?.color).not.toBe(partitionRealmAt(1282,'south-italy')?.color);
  const island=partitionAreas(1282).features.find(f=>f.properties?.id==='sicily'),combined=partitionAreas(1273).features.find(f=>f.properties?.id==='sicily');expect(island?.geometry).not.toEqual(combined?.geometry);expect(partitionLabels(1282).find(l=>l.id==='partition:sicily')?.name).toBe('西西里岛');expect(partitionCityRealmAt(1282,'palermo')).toBeUndefined();
 });
 it('keeps English and French rulers and the 1204/1214 distinction clear',()=>{
  expect(partitionRealmAt(1190,'england')?.ruler).toBe('理查一世');expect(partitionRealmAt(1199,'england')?.ruler).toBe('约翰');expect(partitionRealmAt(1216,'england')?.ruler).toBe('亨利三世');expect(partitionRealmAt(1273,'england')?.ruler).toBe('爱德华一世');
  expect(partitionRealmAt(1223,'west-francia')?.ruler).toBe('路易八世');expect(partitionRealmAt(1226,'west-francia')?.ruler).toContain('布朗什');expect(partitionRealmAt(1273,'west-francia')?.ruler).toBe('腓力三世');expect(historicalDetail('rouen',1199)?.polity.text).toContain('英格兰君主');expect(historicalDetail('rouen',1204)?.polity.text).toContain('1204年征服之后');expect(partitionAt(1214)?.change).toContain('已在1204年');
 });
 it('resolves all new anchors and exact city records with sources, without leaking to neighboring dates',()=>{
  expect(highMedievalPlaces).toHaveLength(6);expect(highMedievalDetails).toHaveLength(125);
  for(const p of highMedievalPlaces)expect(ancientPlaces.filter(q=>q.id===p.id)).toHaveLength(1);
  for(const d of highMedievalDetails){expect(historicalDetail(d.placeId,d.from)?.id).toBe(d.id);expect(d.from).toBe(d.to);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const f of [d.polity,d.territory])for(const key of f.sources)expect(historySources[key].url).toMatch(/^https:/);}
  expect(historicalDetail('tagliacozzo',1268)?.territory.text).toContain('帕伦蒂尼平原');expect(historicalDetail('naples',1268)?.territory.text).toContain('两地不能合成一个点');expect(historicalDetail('runnymede',1215)?.people.text).toContain('不自由人口');expect(historicalDetail('runnymede',1216)).toBeUndefined();expect(historicalDetail('melfi',1232)).toBeUndefined();
 });
 it('never counts links or large record totals as final reviewed coverage',()=>{
  expect(progress.targetYears).toBeGreaterThan(500);expect(progress.courseChapters).toBe(260);expect(progress.chaptersReferenced).toBeGreaterThan(56);expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);expect(progress.reviewedYears).toBeLessThan(progress.targetYears);expect(progress.politicalReadingYears).toBe(71);
 });
});
