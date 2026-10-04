import {addMauretania,mauretaniaCityRegions} from './mauretania';
import {addNumidia} from './numidia';
import {addByzacena} from './byzacena';
import {fourthRegionsAt,cityRegionAt} from './fourth-century';
import {fifthRegionsAt,fifthCityRegions} from './fifth-century-regions';
import {fifthLocalCityRegions} from './fifth-century-subregions';
import {egyptReadingRegions} from './egypt-reading-regions';
export const inReadingCenturies=(y:number)=>y>=300&&y<=500;
export const readingRegionsAt=(y:number)=>addMauretania(addNumidia(addByzacena(egyptReadingRegions(y<=400?fourthRegionsAt(y):fifthRegionsAt(y),y),y),y),y);
export const readingRegionById=(id:string,y:number)=>readingRegionsAt(y).find(r=>r.id===id);
export function readingCityRegionAt(id:string,y:number){
 if(inReadingCenturies(y)){
  if(mauretaniaCityRegions[id])return mauretaniaCityRegions[id];
  if(['hippo','cirta','cuicul','timgad'].includes(id))return 'numidia5';
  if(['hadrumetum','thysdrus'].includes(id))return 'byzacena';
  if(id==='syene')return 'egypt-upper';
  if(id==='alexandria')return 'egypt-delta';
 }
 return y<=400?cityRegionAt(id,y):fifthLocalCityRegions[id]??fifthCityRegions[id];
}
