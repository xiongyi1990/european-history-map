import {describe,it,expect} from 'vitest';
import {boundary1914Correction,boundary1914Corrections,boundary1914Sources} from './boundary-1914-context';

describe('Political interpretation of the 1914 boundary snapshot',()=>{
 it('applies only to the 1914 source snapshot, never to modern or independence-era snapshots',()=>{
  for(const original of Object.keys(boundary1914Corrections)){
   expect(boundary1914Correction(original,1914)).toBeDefined();
   for(const year of [undefined,1900,1913,1917,1918,1920,2000])expect(boundary1914Correction(original,year)).toBeUndefined();
  }
  expect(boundary1914Correction('France',1914)).toBeUndefined();
 });
 it('shows Finland as an autonomous imperial component with the same sovereign color group as Russia',()=>{
  const finland=boundary1914Correction('Finland',1914)!;
  expect(finland.subject).toBe('Russia');expect(finland.colorSubject).toBe('Russia');
  expect(finland.categoryLabel).toContain('自治大公国');expect(finland.context.membership).toContain('俄罗斯帝国');
  expect(finland.context.note).toContain('1917 年 12 月 6 日');expect(finland.context.note).toContain('未重新核定');
 });
 it('does not backdate Georgian or Azerbaijani independence or modern administrative borders',()=>{
  for(const name of ['Georgia','Azerbaijan']){
   const correction=boundary1914Correction(name,1914)!;
   expect(correction.subject).toBe('Russia');expect(correction.colorSubject).toBe('Russia');
   expect(correction.context.membership).toContain('非独立');expect(correction.categoryLabel).toContain('地域');
  }
  expect(boundary1914Correction('Georgia',1914)!.context.note).toContain('1918 年 5 月 26 日');
  expect(boundary1914Correction('Azerbaijan',1914)!.context.note).toContain('不表示整个历史');
 });
 it('keeps Armenia as cross-imperial reference rather than a sovereign state or wholly Russian territory',()=>{
  const armenia=boundary1914Correction('Armenia',1914)!;
  expect(armenia.kind).toBe('reference');expect(armenia.context.reference).toBe(true);
  expect(armenia.subject).toBeUndefined();expect(armenia.colorSubject).toBeUndefined();
  expect(armenia.context.membership).toContain('俄国、奥斯曼');expect(armenia.context.note).toContain('不能整块涂成俄国直辖');
 });
 it('groups colonial, autonomous and protected areas with their associated powers while retaining distinct status labels',()=>{
  const malta=boundary1914Correction('Malta',1914)!,iceland=boundary1914Correction('Iceland',1914)!,tunisia=boundary1914Correction('Tunisia',1914)!;
  expect(malta.subject).toBe('United Kingdom of Great Britain and Ireland');expect(malta.colorSubject).toBe(malta.subject);expect(malta.categoryLabel).toBe('英国王室殖民地');
  expect(iceland.subject).toBe('Denmark');expect(iceland.colorSubject).toBe('Denmark');expect(iceland.categoryLabel).toContain('自治');expect(iceland.context.note).toContain('1904 年');
  expect(tunisia.subject).toBe('France');expect(tunisia.colorSubject).toBe('France');expect(tunisia.categoryLabel).toContain('保护国');expect(tunisia.context.membership).toContain('贝伊国');expect(tunisia.context.note).toContain('不表示普通法国本土省');
 });
 it('keeps Spanish Morocco as a protectorate relationship, not an independent state or a Spanish home province',()=>{
  const spanish=boundary1914Correction('Spanish Morocco',1914)!;
  expect(spanish.subject).toBe('Spain');expect(spanish.colorSubject).toBe('Spain');expect(spanish.categoryLabel).toContain('保护区');
  expect(spanish.context.membership).toContain('苏丹');expect(spanish.context.note).toContain('不是普通西班牙本土省');expect(spanish.context.note).toContain('原几何未精核');
 });
 it('does not assign all Morocco to France or present a single unverified polygon as the protectorate division',()=>{
  const morocco=boundary1914Correction('Morocco',1914)!;
  expect(morocco.kind).toBe('reference');expect(morocco.context.reference).toBe(true);expect(morocco.subject).toBeUndefined();expect(morocco.colorSubject).toBeUndefined();
  expect(morocco.context.membership).toContain('法国、西班牙');expect(morocco.context.note).toContain('Spanish Morocco');expect(Object.keys(boundary1914Corrections)).toHaveLength(9);
 });
 it('retains an auditable official source and never introduces new polygon geometry',()=>{
  for(const correction of Object.values(boundary1914Corrections)){
   expect(correction.context.source).toMatch(/^https:/);expect(correction.categoryLabel).toBeTruthy();
   expect('geometry' in correction).toBe(false);expect('coordinates' in correction).toBe(false);
  }
  expect(Object.values(boundary1914Sources).every(s=>s.url.startsWith('https:'))).toBe(true);
 });
});
