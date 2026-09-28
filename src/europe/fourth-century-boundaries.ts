import type {Area} from './model';
import {fourthPhaseAt,inFourthCentury} from './fourth-century';
import {courseSources} from './course-sources';

// Keep the source geometry intact; intermediate-year descriptions must never borrow its rulers.
export function dateFourthAreas(areas:Area[],year:number,snapshotYear?:number):Area[]{
 if(!inFourthCentury(year)||year===snapshotYear||!snapshotYear)return areas;
 const phase=fourthPhaseAt(year)!;
 return areas.map(a=>{
  let name=a.name;
  if(a.original.startsWith('Rome ('))name=a.name.replace('帝国 ·','').replace('分掌区','地域');
  if(year<395&&a.original==='Western Roman Empire')name='罗马西部地域';
  if(year<395&&a.original==='Eastern Roman Empire')name='罗马东部地域';
  if(a.original==='Hunnic Empire'&&year<370)name='草原区域（后期匈人轮廓）';
  return {...a,name:`${name}（${snapshotYear} 年参考）`,context:{name, membership:`所选 ${year} 年：${phase.title}。轮廓来自 ${snapshotYear} 年，不是当年实控图。`,note:'中间年份未进行疆界插值；资料快照中的君主、族群和内部划分不能直接套用于所选年份。请通过当前地域标签、城市和关键事件查看当年背景。',places:[['rome','罗马'],['byzantium',year<330?'拜占庭城':'君士坦丁堡'],['nisibis','尼西比斯的分期归属']],source:courseSources[phase.source].url}};
 });
}
