// @vitest-environment jsdom
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,within,fireEvent,cleanup} from '@testing-library/react';
import {FrankishPartitions} from './FrankishPartitions';
import {partitionAt,partitionYears} from './frankish-partitions';

afterEach(cleanup);
const callbacks=()=>({onOpen:vi.fn(),onClose:vi.fn(),onYear:vi.fn(),onSelect:vi.fn(),onPlace:vi.fn()});

describe('Frankish partition reading controls',()=>{
 it('offers the map on an exact covered year without silently opening it',()=>{
  const events=callbacks();render(<FrankishPartitions year={843} active={false} {...events}/>);
  expect(screen.getByRole('region',{name:'法兰克分裂地图'})).toBeTruthy();
  expect(screen.queryByRole('navigation',{name:'法兰克分裂关键年份'})).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'查看法兰克分裂示意 →'}));
  expect(events.onOpen).toHaveBeenCalledOnce();expect(events.onSelect).not.toHaveBeenCalled();
 });
 it('keeps the four historical stages explicit and changes year only on request',()=>{
  const events=callbacks();render(<FrankishPartitions year={843} active {...events}/>);
  const nav=screen.getByRole('navigation',{name:'法兰克分裂关键年份'});
  for(const y of partitionYears){const b=within(nav).getByRole('button',{name:String(y)});expect(b.getAttribute('aria-current')).toBe(y===843?'date':null);fireEvent.click(b);expect(events.onYear).toHaveBeenLastCalledWith(y);}
  expect(events.onSelect).not.toHaveBeenCalled();
 });
 it('connects a selected colored realm to its composition, people, cities and back actions',()=>{
  const events=callbacks(),frame=partitionAt(843)!,realm=frame.realms.find(r=>r.id==='middle-francia')!;
  const {rerender}=render(<FrankishPartitions year={843} active {...events}/>);
  const legend=screen.getByRole('group',{name:'分国颜色与范围'});
  fireEvent.click(within(legend).getByRole('button',{name:new RegExp(realm.name)}));expect(events.onSelect).toHaveBeenLastCalledWith(realm.id);
  rerender(<FrankishPartitions year={843} active selected={realm.id} {...events}/>);
  const detail=screen.getByRole('article',{name:'分国地域详情'});
  expect(within(detail).getByText(realm.geography)).toBeTruthy();
  for(const part of realm.parts)expect(within(detail).getByText(part)).toBeTruthy();
  expect(within(detail).getByText(realm.status)).toBeTruthy();expect(within(detail).getByText(realm.ruler)).toBeTruthy();
  fireEvent.click(within(detail).getByText('居民、身份与语言'));expect(within(detail).getByText(realm.people)).toBeTruthy();expect(within(detail).getByText(realm.language)).toBeTruthy();
  const [id,name]=realm.places[0];fireEvent.click(within(detail).getByRole('button',{name:new RegExp(name)}));expect(events.onPlace).toHaveBeenLastCalledWith(id);
  fireEvent.click(within(detail).getByRole('button',{name:'← 查看全部分国'}));expect(events.onSelect).toHaveBeenLastCalledWith(undefined);
  fireEvent.click(screen.getByRole('button',{name:'返回欧洲概览 →'}));expect(events.onClose).toHaveBeenCalledOnce();
 });
 it('uses the selected stage for political context and course pages',()=>{
  const events=callbacks();const {rerender}=render(<FrankishPartitions year={843} active selected="middle-francia" {...events}/>);
  for(const y of partitionYears){const frame=partitionAt(y)!,realm=frame.realms[0];rerender(<FrankishPartitions year={y} active selected={realm.id} {...events}/>);expect(screen.getByRole('heading',{name:frame.title})).toBeTruthy();expect(screen.getByText(frame.change)).toBeTruthy();expect(screen.getByText(frame.note)).toBeTruthy();
   const detail=screen.getByRole('article',{name:'分国地域详情'});expect(within(detail).getByText(realm.ruler)).toBeTruthy();
   const reading=screen.getByText('对照顾衡课程阅读').parentElement!;for(const r of frame.reading)expect(reading.textContent).toContain(`第 ${r.chapter} 讲 · PDF ${r.pages[0]}`);
  }
 });
 it('does not reuse a neighboring-stage map or stale realm on another year',()=>{
  const events=callbacks();const {rerender,container}=render(<FrankishPartitions year={843} active selected="middle-francia" {...events}/>);
  rerender(<FrankishPartitions year={855} active selected="middle-francia" {...events}/>);expect(screen.queryByRole('article',{name:'分国地域详情'})).toBeNull();
  for(const y of [842,844,854,856,869,871,879,881,900]){rerender(<FrankishPartitions year={y} active {...events}/>);expect(container.textContent).toBe('');}
 });
});
