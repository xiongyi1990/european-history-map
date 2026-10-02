import type {Coordinate} from '../greek/battles';
import {administrativeReadingGroups,type AdministrativeReadingGroup} from './administrative-groups-395';

export const administrativeGroupById=(id:string)=>administrativeReadingGroups.find(g=>g.id===id);
const names:Record<string,string>={britains:'不列颠管区',spains:'西班牙管区',gauls:'高卢诸省','italian-provinces':'意大利诸省','western-illyricum':'西部伊利里库姆','african-provinces':'阿非利加地域','macedonian-provinces':'马其顿管区','dacian-provinces':'南岸达契亚','thracian-provinces':'色雷斯管区','asian-provinces':'亚细亚管区','pontic-provinces':'本都管区','oriental-provinces':'东方管区','egyptian-provinces':'埃及与昔兰尼加'};
export const administrativeGroupMapName=(g:AdministrativeReadingGroup)=>names[g.id]??g.name;

// A camera window around referenced cities. It is never a territorial geometry.
export function administrativeGroupView(g:AdministrativeReadingGroup,places:{id:string;coords:Coordinate}[]){
 const points=g.cities.flatMap(([id])=>{const p=places.find(p=>p.id===id);return p?[p.coords]:[];});
 if(!points.length)return;
 const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const bounds:[Coordinate,Coordinate]=[[Math.min(...xs)-1.5,Math.min(...ys)-1.2],[Math.max(...xs)+1.5,Math.max(...ys)+1.2]];
 const coords:Coordinate=[xs.reduce((a,b)=>a+b,0)/xs.length,ys.reduce((a,b)=>a+b,0)/ys.length];
 return {bounds,coords,points};
}
export function searchAdministrativeGroups(query:string){
 const q=query.trim().toLocaleLowerCase();if(!q)return [];
 return administrativeReadingGroups.flatMap(group=>{
  const province=group.provinces.find(p=>p.toLocaleLowerCase().includes(q));
  return province||[group.name,group.modern].some(t=>t.toLocaleLowerCase().includes(q))?[{group,province}]:[];
 });
}
