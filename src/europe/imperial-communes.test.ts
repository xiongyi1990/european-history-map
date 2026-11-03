import {describe,it,expect} from 'vitest';
import {imperialCommuneFrames} from './imperial-communes';
import {imperialCommuneDetails,imperialCommunePlaces} from './imperial-communes-places';
import {partitionAt,partitionRealmAt,partitionStageYears,partitionTopic} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionPlaceIds,partitionCityRealmAt} from './frankish-partition-map';
import {ancientPlaces} from './model';
import {historicalDetail,historySources} from './history-details';

describe('1105-1183 political relationships and exact-year event places',()=>{
 it('keeps fifteen reviewed dates in a separate stage, with explicit valid geographic references',()=>{
  expect(partitionStageYears(1122)).toEqual([1105,1106,1111,1122,1125,1133,1138,1152,1155,1158,1162,1167,1176,1177,1183]);
  expect(partitionStageYears(1077)).toHaveLength(10);expect(partitionTopic(1122)).toBe('帝国与城市');
  for(const frame of imperialCommuneFrames){const areas=partitionAreas(frame.year).features;expect(areas).toHaveLength(5);expect(areas.map(f=>f.properties?.atlasId).sort()).toEqual(partitionLabels(frame.year).map(l=>l.id).sort());for(const f of areas){expect(f.properties?.year).toBe(frame.year);expect(f.properties?.spatialScope).toBe('regional-context');}for(const id of partitionPlaceIds(frame.year))expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const relation of frame.relationships??[])for(const id of relation.realmIds)expect(partitionRealmAt(frame.year,id)).toBeDefined();}
  for(const year of [1104,1107,1110,1112,1121,1123,1126,1132,1134,1137,1139,1151,1153,1156,1159,1161,1163,1166,1168,1175,1178,1182,1184]){expect(partitionAt(year)).toBeUndefined();expect(partitionAreas(year).features).toEqual([]);expect(partitionCityRealmAt(year,'pavia')).toBeUndefined();}
 });
 it('distinguishes abdication, death, royal elections and imperial coronations',()=>{
  expect(partitionAt(1105)?.eventDate).toContain('1106年死亡提前');expect(partitionRealmAt(1106,'east-francia')?.ruler).toContain('1111年才取得帝号');
  expect(partitionRealmAt(1111,'east-francia')?.ruler).toContain('本年取得帝号');expect(partitionRealmAt(1125,'east-francia')?.ruler).toContain('尚未取得帝号');
  expect(partitionAt(1133)?.eventDate).toContain('6月4日');expect(historicalDetail('rome',1133)?.territory.text).toContain('拉特朗');
  expect(partitionRealmAt(1138,'east-francia')?.ruler).toContain('未获帝号');expect(partitionRealmAt(1152,'east-francia')?.ruler).toContain('本年为王');
  expect(partitionRealmAt(1155,'east-francia')?.ruler).toContain('本年加冕为帝');expect(partitionRealmAt(1176,'east-francia')?.ruler).toContain('亨利六世');
  expect(partitionRealmAt(1106,'west-francia')?.ruler).toContain('腓力一世');expect(partitionRealmAt(1111,'west-francia')?.ruler).toContain('路易六世');expect(partitionRealmAt(1138,'west-francia')?.ruler).toContain('路易七世');expect(partitionRealmAt(1183,'west-francia')?.ruler).toContain('腓力二世');
 });
 it('does not turn the concordat into territorial cession or erase the regional procedure',()=>{
  expect(partitionAt(1122)?.change).toContain('不是领土被割给教皇');expect(partitionRealmAt(1122,'east-francia')?.status).toContain('禁止买卖圣职和暴力');expect(partitionRealmAt(1122,'italy')?.status).toContain('祝圣后六个月');expect(partitionRealmAt(1122,'burgundy')?.status).toContain('没有因协约变成教皇直辖区');
 });
 it('keeps Milan destruction, rebuilding, battle, truce and final treaty as distinct states',()=>{
  expect(historicalDetail('milan',1158)?.id).toBe('milan-imperial-1158');expect(historicalDetail('milan',1162)?.polity.text).toContain('居民被迫迁出');expect(historicalDetail('milan',1167)?.polity.text).toContain('重新集结');
  expect(partitionAt(1176)?.eventDate).toContain('5月29日');expect(partitionAt(1177)?.summary).toContain('六年停战');expect(partitionAt(1177)?.change).toContain('1183年');expect(partitionAt(1183)?.eventDate).toContain('6月25日');
  expect(historicalDetail('konstanz',1183)?.territory.text).toContain('阿尔卑斯北侧');expect(historicalDetail('milan',1183)?.territory.text).toContain('阿尔卑斯南侧');
 });
 it('links exact-year city details without assigning opponent cities to direct imperial rule',()=>{
  expect(imperialCommunePlaces).toHaveLength(4);expect(imperialCommuneDetails).toHaveLength(11);
  for(const detail of imperialCommuneDetails){expect(historicalDetail(detail.placeId,detail.from)?.id).toBe(detail.id);expect(detail.from).toBe(detail.to);for(const id of detail.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const field of [detail.polity,detail.territory])for(const key of field.sources)expect(historySources[key].url).toMatch(/^https:/);}
  expect(partitionPlaceIds(1122)).toContain('worms');expect(partitionPlaceIds(1176)).toContain('legnano');expect(partitionPlaceIds(1183)).toContain('konstanz');
  for(const [year,id] of [[1176,'legnano'],[1177,'venice'],[1183,'milan'],[1183,'konstanz']] as const)expect(partitionCityRealmAt(year,id)).toBeUndefined();
  expect(historicalDetail('worms',1123)).toBeUndefined();expect(historicalDetail('legnano',1177)).toBeUndefined();expect(historicalDetail('konstanz',1182)).toBeUndefined();
 });
});
