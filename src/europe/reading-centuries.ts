import {addByzacena} from './byzacena';
import {fourthRegionsAt,cityRegionAt} from './fourth-century';
import {fifthRegionsAt,fifthCityRegions} from './fifth-century-regions';
import {fifthLocalCityRegions} from './fifth-century-subregions';
import {egyptReadingRegions} from './egypt-reading-regions';
export const inReadingCenturies=(y:number)=>y>=300&&y<=500;
export const readingRegionsAt=(y:number)=>addByzacena(egyptReadingRegions(y<=400?fourthRegionsAt(y):fifthRegionsAt(y),y),y);
export const readingRegionById=(id:string,y:number)=>readingRegionsAt(y).find(r=>r.id===id);
export const readingCityRegionAt=(id:string,y:number)=>inReadingCenturies(y)&&['hadrumetum','thysdrus'].includes(id)?'byzacena':inReadingCenturies(y)&&id==='syene'?'egypt-upper':inReadingCenturies(y)&&id==='alexandria'?'egypt-delta':y<=400?cityRegionAt(id,y):fifthLocalCityRegions[id]??fifthCityRegions[id];
