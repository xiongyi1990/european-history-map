import {describe,it,expect} from 'vitest';
import {historicalDetail} from './history-details';
import {classicalCourseDetails} from './classical-course-details';
import {allBattles,battleYears} from './model';

describe('classical political transitions',()=>{
 it('does not extend Alexander control into the succession crisis',()=>{
  expect(historicalDetail('sardis',-335)?.id).toBe('sardis-persian');
  expect(historicalDetail('sardis',-334)?.id).toBe('sardis-alexander');
  expect(historicalDetail('babylon',-332)?.id).toBe('babylon-persian');
  expect(historicalDetail('babylon',-331)?.id).toBe('babylon-alexander');
  expect(historicalDetail('babylon',-323)).toBeUndefined();
  expect(historicalDetail('sardis',-323)).toBeUndefined();
 });
 it('separates defeat, conquest, and a bequest from surrounding years',()=>{
  expect(historicalDetail('alexandria',-31)?.id).toBe('alexandria-ptolemy');
  expect(historicalDetail('alexandria',-30)?.id).toBe('alexandria-roman');
  expect(historicalDetail('alexandria',-29)).toBeUndefined();
  expect(historicalDetail('carthage',-147)?.id).toBe('carthage-siege');
  expect(historicalDetail('carthage',-146)?.id).toBe('carthage-destroyed');
  expect(historicalDetail('pergamon',-133)?.polity.text).toContain('不把遗赠文本');
  expect(historicalDetail('pergamon',-132)).toBeUndefined();
 });
 it('preserves postwar autonomy and leaves unresearched succession years empty',()=>{
  expect(historicalDetail('carthage',-202)?.id).toBe('carthage-hannibal');
  expect(historicalDetail('carthage',-201)?.id).toBe('carthage-post-zama');
  expect(historicalDetail('carthage',-150)?.polity.text).toContain('不驻罗马军队');
  expect(historicalDetail('carthage',-149)?.id).toBe('carthage-siege');
  expect(historicalDetail('antioch',-218)?.polity.text).toContain('塞琉古');
  expect(historicalDetail('antioch',-80)).toBeUndefined();
  expect(historicalDetail('antioch',-64)?.polity.text).toContain('叙利亚行省');
 });
 it('links only to existing battle routes with valid entry years',()=>{
  for(const d of classicalCourseDetails)for(const id of d.relatedBattles??[]){
   expect(allBattles.some(b=>b.id===id&&b.stages.length>0)).toBe(true);
   expect(Number.isFinite(battleYears[id])).toBe(true);
  }
 });
});
