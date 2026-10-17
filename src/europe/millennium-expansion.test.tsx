// @vitest-environment jsdom
import {afterEach,describe,it,expect,vi} from 'vitest';
import {cleanup,render,screen,fireEvent,within} from '@testing-library/react';
import {MedievalRealms} from './MedievalRealms';
import {medievalRealmFrameAt,medievalRealmPlaceIds} from './medieval-realms';
import {historicalDetail} from './history-details';
import {turningPointAt} from './historical-chronology';
import {ancientPlaces,placeLabel} from './model';
afterEach(cleanup);
describe('tenth and eleventh century reading transitions',()=>{
 it('separates Nicaea Seljuq rule, Byzantine recovery and the later exile empire',()=>{
  expect(historicalDetail('nicaea',1081)?.polity.text).toContain('鲁姆');
  expect(historicalDetail('nicaea',1097)?.polity.text).toContain('恢复东罗马');
  expect(historicalDetail('nicaea',1100)?.polity.text).toContain('1204');
  expect(turningPointAt(1097)?.after).toContain('没有');
  expect(turningPointAt(1082)).toBeUndefined();
 });
 it('keeps Toledo conquest separate from southern Almoravid control',()=>{
  expect(historicalDetail('toledo',1031)?.polity.text).toContain('泰法');
  expect(historicalDetail('toledo',1085)?.polity.text).toContain('阿方索');
  expect(historicalDetail('toledo',1100)?.polity.text).toContain('阿方索');
  expect(historicalDetail('cordoba',1100)?.polity.text).toContain('穆拉比特');
  expect(medievalRealmFrameAt(1031)?.realms[0].status).toContain('并非');
 });
 it('preserves changing English kings and does not extend Henry rule across the Channel prematurely',()=>{
  expect(historicalDetail('london',1016)?.polity.text).toContain('克努特');
  expect(historicalDetail('london',1042)?.polity.text).toContain('爱德华');
  expect(historicalDetail('london',1066)?.id).toBe('london-1066');
  const divided=medievalRealmFrameAt(1100)!.realms.find(r=>r.id==='england-normandy')!;
  expect(divided.status).toContain('分别掌权');
  expect(divided.status).toContain('1106');
 });
 it('retains Preslav after the capital changes and uses Chinese medieval city names',()=>{
  expect(historicalDetail('preslav',893)?.polity.text).toContain('迁都');
  expect(historicalDetail('preslav',971)?.polity.text).toContain('约安诺波利斯');
  expect(historicalDetail('preslav',970)).toBeUndefined();
  expect(placeLabel(ancientPlaces.find(p=>p.id==='mainz')!,1096)).toBe('美因茨');
  expect(turningPointAt(1018)?.spatial).toContain('基辅');
 });
 it('exposes the 1100 composition and preserves the selected year in city navigation',()=>{
  const onYear=vi.fn(),onPlace=vi.fn(),onLocate=vi.fn();
  render(<MedievalRealms year={1100} onYear={onYear} onPlace={onPlace} onLocate={onLocate}/>);
  const guide=screen.getByRole('region',{name:'政权与地域导览'});
  const summary=within(guide).getByText('东罗马帝国的尼西亚恢复线索',{exact:true});
  fireEvent.click(summary);
  const card=summary.closest('details')!;
  fireEvent.click(within(card).getByRole('button',{name:'尼西亚 ↗'}));
  expect(onPlace).toHaveBeenCalledWith('nicaea');
  fireEvent.click(within(card).getByRole('button',{name:'定位这些地域的参考城市 →'}));
  expect(onLocate).toHaveBeenCalledWith(['byzantium','nicaea']);
  fireEvent.click(within(guide).getByRole('button',{name:'1018'}));
  expect(onYear).toHaveBeenCalledWith(1018);
  expect(medievalRealmPlaceIds(1101)).toEqual([]);
 });
});
