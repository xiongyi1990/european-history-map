import {readFileSync,writeFileSync} from 'node:fs';
import {historicalDetails} from '../src/europe/history-details';
import {courseDetails,coursePlaces} from '../src/europe/course-details';
import {courseDocument} from '../src/europe/course-sources';
const folder=new URL('../artifacts/europe-atlas/course-material/',import.meta.url);
const index=JSON.parse(readFileSync(new URL('course-index.json',folder),'utf8'));
if(index.sha256!==courseDocument.sha256||index.pages!==courseDocument.pages)throw new Error('PDF source version mismatch');
const mapped=new Set<number>();
for(const d of historicalDetails)for(const r of d.reading??[]){
 const chapter=index.chapters.find((c:{number:number})=>c.number===r.chapter);
 if(!chapter||r.pages[0]<chapter.page||r.pages[1]>chapter.endPageInclusive)throw new Error(`Page range outside chapter: ${d.id}, ${r.chapter}`);
 mapped.add(r.chapter);
}
const report={sourceHash:index.sha256,indexedChapters:index.indexedChapters,chaptersLinkedToMap:[...mapped].sort((a,b)=>a-b),
 newPlaces:coursePlaces.map(p=>({id:p.id,name:p.name,coords:p.coords,source:p.source})),
 newRecords:courseDetails.length,totalPeriodRecords:historicalDetails.length,placesWithPeriodRecords:new Set(historicalDetails.map(d=>d.placeId)).size,
 records:historicalDetails.map(d=>({id:d.id,placeId:d.placeId,title:d.title,from:d.from,to:d.to,reading:d.reading})),
 limits:['Chapter index is not a claim that all chapters have been integrated or verified.','No new historical boundary polygons were added.','Political roles over a period are not a reconstruction of every year inside that period.']};
writeFileSync(new URL('coverage-audit.json',folder),JSON.stringify(report,null,2));
console.log(JSON.stringify({indexedChapters:report.indexedChapters,linkedChapters:mapped.size,newPlaces:coursePlaces.length,newRecords:report.newRecords,totalRecords:report.totalPeriodRecords,places:report.placesWithPeriodRecords}));
