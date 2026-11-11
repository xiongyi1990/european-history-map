import {describe,it,expect} from 'vitest';
import {italyLateDetails,italyLatePlaces} from './italy-late-places';
import {medievalTransitionYears} from './medieval-transition';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import {partitionAreas,partitionLabels,partitionCityRealmAt} from './frankish-partition-map';
import {historicalDetail,historySources} from './history-details';
import {ancientPlaces} from './model';
import progress from './atlas-progress-summary.json';
const r=(y:number,id:string)=>partitionRealmAt(y,id)!;
const d=(id:string,y:number)=>historicalDetail(id,y)!;
describe('Italian city institutions, external lordship and uneven control1360-1453',()=>{
 it('adds four distinct cores at existing dates with unique city and source references',()=>{
  expect(medievalTransitionYears).toHaveLength(27);expect(italyLatePlaces).toHaveLength(8);expect(italyLateDetails).toHaveLength(352);
  for(const y of medievalTransitionYears){expect(partitionAreas(y).features).toHaveLength(37);for(const id of ['milan-late','florence-late','venice-late','genoa-late'])expect(r(y,id)).toBeDefined();for(const name of ['米兰','佛罗伦萨','威尼斯','热那亚'])expect(partitionLabels(y).some(p=>p.name===name)).toBe(true);}
  for(const p of italyLatePlaces)expect(ancientPlaces.filter(x=>x.id===p.id)).toHaveLength(1);
  for(const card of italyLateDetails){expect(d(card.placeId,card.from)?.id,card.id).toBe(card.id);for(const id of card.related)expect(ancientPlaces.some(p=>p.id===id),id).toBe(true);for(const field of [card.polity,card.territory,card.people,card.language,card.nameNote]){expect(new Set(field.sources).size).toBe(field.sources.length);for(const k of field.sources)expect(historySources[k]?.url,k).toMatch(/^https:/);}}
  expect(partitionAt(1395)).toBeUndefined();expect(partitionRealmAt(1356,'milan-late')).toBeUndefined();expect(progress.unresolvedReferenceIssues).toBe(0);expect(progress.allReviewed).toBe(false);
 });
 it('separates Milan lord,1395 title,1402 brothers and1410 Pavia control',()=>{
  expect(r(1360,'milan-late').ruler).toContain('不同支系');expect(r(1378,'milan-late').ruler).toContain('吉安');expect(r(1385,'milan-late').ruler).toContain('尚非公爵');expect(r(1385,'milan-late').status).toContain('11月底');expect(r(1396,'milan-late').status).toContain('未获帝冠');expect(r(1397,'milan-late').status).toContain('伪造');
  expect(d('pavia',1402).polity.text).toContain('伯爵');expect(d('pavia',1409).polity.text).toContain('影响并存');expect(d('pavia',1410).polity.text).toContain('实际权力转入法奇诺');expect(r(1450,'milan-late').status).toContain('安布罗西亚共和国');expect(r(1453,'milan-late').status).toContain('不提前套用1454');expect(partitionCityRealmAt(1439,'pavia')?.id).toBe('milan-late');expect(partitionCityRealmAt(1356,'pavia')?.id).toBe('italy');
 });
 it('does not make Michele a year-end ruler or Cosimo a duke',()=>{
  expect(r(1378,'florence-late').status).toContain('8月末结束');expect(r(1381,'florence-late').status).toContain('1382寡头全面复归尚未到来');expect(r(1431,'florence-late').status).toContain('尚未发生');expect(r(1435,'florence-late').ruler).toContain('共和制度');expect(r(1439,'florence-late').status).toContain('不是国王或公爵');expect(d('florence',1439).polity.text).toContain('不是全体居民即时改宗');
 });
 it('keeps Pisa,Lucca,Livorno and Prato on different timelines',()=>{
  expect(d('pisa',1364).polity.text).toContain('总督');expect(d('lucca',1364).polity.text).toContain('比萨控制');expect(d('lucca',1377).polity.text).toContain('1369');expect(d('lucca',1399).polity.text).toContain('尚非保罗');expect(d('lucca',1429).polity.text).toContain('保罗');expect(d('lucca',1431).polity.text).toContain('未被佛罗伦萨吞并');
  expect(d('pisa',1409).polity.text).toContain('1406');expect(d('livorno',1420).polity.text).toContain('热那亚');expect(d('livorno',1422).polity.text).toContain('1421购买后');expect(d('prato',1360).polity.text).toContain('1351');
 });
 it('keeps foreign lords, doges and the1435 Genoese interim separate',()=>{
  expect(r(1360,'genoa-late').ruler).toContain('博卡内格拉');expect(r(1396,'genoa-late').ruler).toContain('法王');expect(r(1409,'genoa-late').ruler).toContain('特奥多罗');expect(r(1422,'genoa-late').ruler).toContain('外来领主');expect(r(1435,'genoa-late').ruler).toContain('八位自由队长');expect(r(1435,'genoa-late').status).toContain('1436复位尚未发生');expect(r(1439,'genoa-late').ruler).toContain('托马索');expect(r(1450,'genoa-late').status).toContain('9月8日');expect(r(1453,'genoa-late').status).toContain('不等于本城被奥斯曼吞并');
 });
 it('distinguishes Venetian elections, mainland cities, sieges and recovered places',()=>{
  expect(r(1360,'venice-late').ruler).toContain('多尔芬');expect(r(1364,'venice-late').ruler).toContain('切尔西');expect(r(1386,'venice-late').status).toContain('尚未在1388年底回归');expect(d('padua',1389).polity.text).toContain('维斯孔蒂');expect(d('padua',1396).polity.text).toContain('贡赋义务');expect(d('padua',1409).polity.text).toContain('1405');
  expect(d('verona',1364).polity.text).toContain('名义共治');expect(d('brescia',1381).polity.text).toContain('马斯蒂诺');expect(d('brescia',1420).polity.text).toContain('马拉泰斯塔');expect(d('brescia',1422).polity.text).toContain('1421');expect(d('brescia',1429).polity.text).toContain('1426');expect(d('brescia',1439).polity.text).toContain('不等于城市已失守');expect(d('verona',1439).polity.text).toContain('年末并非米兰');
 });
 it('does not backdate war, records or later paintings, and preserves limited social evidence',()=>{
  expect(d('chioggia',1378).polity.text).toContain('1379占领尚未发生');expect(d('chioggia',1381).polity.text).toContain('1380');expect(d('chioggia',1435).language.text).toContain('尚未出现');expect(d('chioggia',1439).language.text).toContain('1439');expect(d('anghiari',1440).nameNote.text).toContain('1503年后');
  expect(d('prato',1381).language.text).toContain('不能把1382以后');expect(d('prato',1414).language.text).toContain('不声称达蒂尼本年仍在世');expect(d('brescia',1414).people.text).toContain('不将1414以后的账簿回填');expect(d('brescia',1417).people.sources).toContain('italyBresciaAccounts');expect(d('florence',1422).people.sources).not.toContain('italyCatasto');expect(d('florence',1429).people.sources).toContain('italyCatasto');expect(d('genoa',1453).language.text).toContain('没有足够');
 });
});
