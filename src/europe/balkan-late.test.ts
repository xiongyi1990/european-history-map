import {describe,it,expect} from 'vitest';
import {balkanLateDetails,balkanLatePlaces} from './balkan-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionLabels} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import progress from './atlas-progress-summary.json';
const realm=(y:number,id:string)=>partitionRealmAt(y,id)!;
const city=(id:string,y:number)=>historicalDetail(id,y)!;
describe('Balkan local polities, vassalage and distinct city chronology1360-1453',()=>{
 it('resolves four new cores and city/event cards at existing moments without inventing annual borders',()=>{
  expect(medievalTransitionYears).toHaveLength(27);expect(balkanLatePlaces).toHaveLength(11);expect(balkanLateDetails).toHaveLength(327);
  for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(37);for(const id of ['serbia-late','bosnia-late','tarnovo-late','vidin-late'])expect(realm(y,id)).toBeDefined();for(const name of ['波斯尼亚','特尔诺沃','维丁'])expect(partitionLabels(y).some(p=>p.name===name)).toBe(true);}
  expect(partitionAt(1393)).toBeUndefined();expect(partitionRealmAt(1356,'serbia-late')).toBeUndefined();
  for(const p of balkanLatePlaces)expect(ancientPlaces.filter(x=>x.id===p.id)).toHaveLength(1);
  for(const d of balkanLateDetails){expect(city(d.placeId,d.from).id,d.id).toBe(d.id);for(const id of d.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const field of [d.polity,d.territory,d.people,d.language,d.nameNote])for(const k of field.sources)expect(historySources[k]?.url,k).toMatch(/^https:/);}
  expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);
 });
 it('changes imperial, knez and despot titles without treating them as one crown',()=>{
  expect(realm(1360,'serbia-late').ruler).toContain('沙皇');expect(realm(1364,'serbia-late').status).toContain('1365年才');expect(realm(1377,'serbia-late').ruler).toContain('王公');expect(realm(1389,'serbia-late').ruler).toContain('米利察摄政');expect(realm(1399,'serbia-late').ruler).toContain('王公');expect(realm(1402,'serbia-late').ruler).toContain('德斯波特');expect(realm(1402,'serbia-late').status).toContain('约翰七世');
  expect(realm(1409,'serbia-late').status).toContain('南半部');expect(realm(1410,'serbia-late').status).toContain('收回');
 });
 it('keeps Belgrade, Smederevo and Novo Brdo on different control timelines',()=>{
  expect(city('belgrade',1402).polity.text).toContain('尚未发生');expect(city('belgrade',1409).polity.text).toContain('斯特凡');expect(city('belgrade',1429).polity.text).toContain('1427回到匈牙利');expect(city('belgrade',1440).polity.text).toContain('围城失败');
  expect(city('smederevo',1422).polity.text).toContain('尚不存在');expect(city('smederevo',1429).polity.text).toContain('尚在进行');expect(city('smederevo',1439).polity.text).toContain('占领');expect(city('novo-brdo',1439).polity.text).toContain('抵抗至1441');expect(city('novo-brdo',1440).polity.text).toContain('抵抗至1441');expect(city('smederevo',1444).polity.text).toContain('恢复给久拉吉');expect(realm(1453,'serbia-late').status).toContain('不表示本地政权已经灭亡');
 });
 it('distinguishes Bosnia ban, royal title, rivals and Ottoman influence from annexation',()=>{
  expect(realm(1364,'bosnia-late').ruler).toContain('班');expect(realm(1377,'bosnia-late').ruler).toContain('国王');expect(realm(1377,'bosnia-late').status).toContain('不等于统治整个塞尔维亚');expect(realm(1397,'bosnia-late').ruler).toContain('耶莱娜');expect(realm(1420,'bosnia-late').ruler).toContain('仍争位');expect(realm(1435,'bosnia-late').status).toContain('年底又在匈牙利');expect(realm(1444,'bosnia-late').ruler).toContain('托马什');expect(realm(1453,'bosnia-late').status).toContain('不等于波斯尼亚已被直接吞并');
 });
 it('separates1393 city conquest,1395 death and1396 Vidin debate',()=>{
  expect(realm(1389,'tarnovo-late').ruler).toContain('希什曼');expect(realm(1396,'tarnovo-late').ruler).not.toContain('希什曼');expect(realm(1396,'tarnovo-late').status).toContain('1393');expect(realm(1396,'tarnovo-late').status).toContain('1395');expect(realm(1396,'vidin-late').status).toContain('1396／1397');expect(realm(1410,'vidin-late').status).toContain('存在争论');expect(realm(1410,'tarnovo-late').status).toContain('尚未核齐');expect(realm(1422,'vidin-late').status).toContain('已于1422年去世');
 });
 it('does not backdate codices, construction or impose an ethnicity from a polity',()=>{
  expect(city('bobovac',1399).language.text).toContain('尚未出现');expect(city('bobovac',1409).language.sources).toContain('balkanHval');expect(city('novo-brdo',1409).language.text).toContain('不倒填');expect(city('novo-brdo',1414).language.text).toContain('16世纪');expect(city('tarnovo',1360).language.text).toContain('地点未证实');expect(city('vidin',1360).language.text).toContain('可能为15世纪');expect(city('jajce',1396).nameNote.text).toContain('预备名录');expect(city('bobovac',1453).people.sources).toContain('balkanStecci');
 });
 it('connects three distinct battle locations and keeps formal sultan separate from commander',()=>{
  expect(city('kosovo-field',1389).polity.text).toContain('米利察');expect(city('nicopolis-1396',1396).polity.text).toContain('附庸军役');expect(city('varna',1444).polity.text).toContain('名义苏丹');expect(city('varna',1444).territory.text).toContain('黑海西岸');expect(city('varna',1453).polity.text).toContain('1444年的事件');
 });
});
