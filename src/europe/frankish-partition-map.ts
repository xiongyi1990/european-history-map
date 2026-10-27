import geometry from './frankish-partition-geometry.json';
import {partitionAt,partitionRealmAt} from './frankish-partitions';
import type {AreaLabel} from '../greek/GreekMap';
export const partitionMapBounds:[[number,number],[number,number]]=[[-4,40.8],[17,55]];
export function partitionAreas(year:number):GeoJSON.FeatureCollection {
 const frame=partitionAt(year);
 return {type:'FeatureCollection',features:!frame?[]:geometry.features.filter(f=>f.properties.year===year).map(f=>{const r=partitionRealmAt(year,f.properties.id)!;return {...f,properties:{...f.properties,name:r.name,atlasId:'partition:'+r.id,atlasColor:r.color,schematic:true}}})} as GeoJSON.FeatureCollection;
}
const labelHints:Record<string,{name:string;coords:[number,number]}>={
 'west-francia':{name:'西法兰克',coords:[1.8,47.2]},
 'middle-francia':{name:'中部王国',coords:[6.1,49.8]},
 'lotharingia':{name:'洛塔林吉亚',coords:[6.1,49.8]},
 'east-francia':{name:'东法兰克',coords:[10.9,52.2]},
 'provence':{name:'普罗旺斯',coords:[4.9,44.5]},
 'italy':{name:'意大利王国',coords:[11.6,44.2]},
};
export function partitionLabels(year:number):AreaLabel[]{return (partitionAt(year)?.realms??[]).map(r=>({id:'partition:'+r.id,name:labelHints[r.id]?.name??r.name,coords:labelHints[r.id]?.coords??r.coords,color:r.color,minZoom:2.5}));}
export function partitionPlaceIds(year:number):string[]{return partitionAt(year)?[...new Set([...partitionAt(year)!.realms.flatMap(r=>r.places.map(([id])=>id)),'arles'])]:[];}
// Some linked cities are comparisons, not members. Never infer political color from a link.
export function partitionCityRealmAt(year:number,id:string){
 if(!partitionAt(year))return undefined;
 const member=id==='paris'?'west-francia':id==='regensburg'?'east-francia':id==='aachen'?(year===843?'middle-francia':year===855?'lotharingia':'east-francia'):id==='pavia'?(year===843?'middle-francia':'italy'):id==='lyon'?(year===843?'middle-francia':year===870?'west-francia':'provence'):id==='arles'?(year===843?'middle-francia':year===870?'italy':'provence'):undefined;
 return member?partitionRealmAt(year,member):undefined;
}
