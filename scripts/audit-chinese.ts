import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {makeAreas,modernPlaces,translate} from '../src/europe/model';
const root=new URL('../',import.meta.url);
const missing=new Set<string>();let checked=0;
for(const file of readdirSync(new URL('public/historical-boundaries/',root)).filter(f=>f.endsWith('.geojson'))){
 const fc=JSON.parse(readFileSync(new URL(`public/historical-boundaries/${file}`,root),'utf8'));
 for(const a of makeAreas(fc)){checked++;for(const n of [a.name,translate(a.subject)])if(!/[\u3400-\u9fff]/.test(n))missing.add(n);}
}
const cities=modernPlaces(JSON.parse(readFileSync(new URL('public/europe-reference/ne_50m_populated_places.geojson',root),'utf8')));
for(const p of cities)for(const n of [p.name,p.modern])if(!/[\u3400-\u9fff]/.test(n))missing.add(n);
const report={historicalAreaRecords:checked,modernCities:cities.length,untranslated:[...missing].sort(),note:'Checks Chinese display coverage, not scholarly approval of every translation. Original names remain available for lookup.'};
writeFileSync(new URL('artifacts/europe-atlas/chinese-label-audit.json',root),JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
if(missing.size)process.exitCode=1;
