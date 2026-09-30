import {fourthRegionsAt,cityRegionAt} from './fourth-century';
import {fifthRegionsAt,fifthCityRegions} from './fifth-century-regions';
import {fifthLocalCityRegions} from './fifth-century-subregions';
export const inReadingCenturies=(y:number)=>y>=300&&y<=500;
export const readingRegionsAt=(y:number)=>y<=400?fourthRegionsAt(y):fifthRegionsAt(y);
export const readingRegionById=(id:string,y:number)=>readingRegionsAt(y).find(r=>r.id===id);
export const readingCityRegionAt=(id:string,y:number)=>y<=400?cityRegionAt(id,y):fifthLocalCityRegions[id]??fifthCityRegions[id];
