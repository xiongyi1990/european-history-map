import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {historicalDetails,historyWindows} from '../src/europe/history-details';
import {historicalTurningPoints} from '../src/europe/historical-chronology';
import {partitionAt,partitionYears} from '../src/europe/frankish-partitions';
import {partitionAreas,partitionPlaceIds} from '../src/europe/frankish-partition-map';
import {ancientPlaces,allBattles} from '../src/europe/model';
import {boundarySnapshots} from '../src/atlas-data/historical-boundaries';
import {medievalRealmFrames} from '../src/europe/medieval-realms';
import {courseDocument} from '../src/europe/course-sources';
import ranges from '../src/europe/course-chapter-ranges.json';
const root=new URL('../',import.meta.url);
const read=(path:string)=>JSON.parse(readFileSync(new URL(path,root),'utf8'));
const ledger=read('docs/atlas-review-ledger.json');
if(ranges.sourceHash!==courseDocument.sha256)throw new Error('Course reference version differs');
const placeIds=new Set(ancientPlaces.map(p=>p.id));
const duplicatePlaceIds=[...new Set(ancientPlaces.filter((p,i,a)=>a.findIndex(q=>q.id===p.id)!==i).map(p=>p.id))];
const issues:{kind:string;id:string;detail:string}[]=[];
const links=new Map<number,Set<string>>();
function reference(id:string,refs:{chapter:number;pages:[number,number]}[]|undefined){for(const r of refs??[]){const c=ranges.chapters.find(c=>c.number===r.chapter);if(!c||r.pages[0]<c.page||r.pages[1]>c.endPageInclusive)issues.push({kind:'course-page',id,detail:`chapter${r.chapter} pages${r.pages.join('-')}`});if(!links.has(r.chapter))links.set(r.chapter,new Set());links.get(r.chapter)!.add(id);}}
for(const d of historicalDetails){if(!placeIds.has(d.placeId))issues.push({kind:'missing-place',id:d.id,detail:d.placeId});reference(d.id,d.reading);}
for(const year of partitionYears){const f=partitionAt(year)!;reference(`partition:${year}`,f.reading);for(const id of partitionPlaceIds(year))if(!placeIds.has(id))issues.push({kind:'missing-place',id:`partition:${year}`,detail:id});const ids=f.realms.map(r=>r.id).sort(),geo=partitionAreas(year).features.map(f=>f.properties?.id).sort();if(JSON.stringify(ids)!==JSON.stringify(geo))issues.push({kind:'geometry-membership',id:String(year),detail:'Data and polygons do not match'});}
const targetYears=[...new Set([...historyWindows.map(x=>x.year),...historicalTurningPoints.map(x=>x.year),...partitionYears,...boundarySnapshots.map(x=>x.year),...historicalDetails.flatMap(x=>x.focusYear?[x.focusYear]:[]),...ledger.plannedYears])].sort((a,b)=>a-b);
const facets=['polity','geography','communities','events','geometry','novice'];
function reviewed(review:any){return review?.status==='reviewed'&&facets.every(key=>{const f=review.facets?.[key];return f&&(f.status==='reviewed'||f.status==='not_applicable')&&typeof f.note==='string'&&f.note.length>20&&Array.isArray(f.sources)&&f.sources.length>0;});}
const nodes=targetYears.map(year=>{const frame=partitionAt(year),exact=historicalDetails.filter(d=>d.from===year&&d.to===year),period=historicalDetails.filter(d=>d.from<=year&&d.to>=year&&d.from!==d.to),turn=historicalTurningPoints.find(t=>t.year===year),manual=ledger.yearReviews[String(year)];return {year,status:reviewed(manual)?'reviewed':frame||exact.length||period.length||turn?'partial':'pending',evidence:{regionalFrame:frame?{title:frame.title,realmIds:frame.realms.map(r=>r.id),precision:'reading-envelope-not-annual-control'}:null,exactCityRecordIds:exact.map(d=>d.id),periodCityRecordCount:period.length,turningPoint:turn?.title??null,referenceSnapshot:boundarySnapshots.some(s=>s.year===year),realmGuide:medievalRealmFrames.some(f=>f.year===year)},review:manual??null};});
const chapters=ranges.chapters.map(c=>{const manual=ledger.chapterReviews[String(c.number)];const done=manual?.status==='reviewed'&&typeof manual.note==='string'&&manual.note.length>30&&Array.isArray(manual.nodeYears)&&manual.nodeYears.every((y:number)=>nodes.some(n=>n.year===y&&n.status==='reviewed'));const na=manual?.status==='not_applicable'&&typeof manual.note==='string'&&manual.note.length>40;return {chapter:c.number,pages:[c.page,c.endPageInclusive],status:done?'reviewed':na?'not_applicable':links.has(c.number)||manual?'partial':'pending',linkedEvidenceCount:links.get(c.number)?.size??0,review:manual??null};});
const summary={schemaVersion:1,scope:'Current atlas targets and course geographic leads; not all integer years',courseChapters:chapters.length,chaptersReferenced:links.size,chaptersReviewed:chapters.filter(c=>c.status==='reviewed'||c.status==='not_applicable').length,targetYears:nodes.length,reviewedYears:nodes.filter(n=>n.status==='reviewed').length,partialYears:nodes.filter(n=>n.status==='partial').length,pendingYears:nodes.filter(n=>n.status==='pending').length,politicalReadingYears:partitionYears.length,coursePeriodRecords:historicalDetails.length,routeTopics:allBattles.length,unresolvedReferenceIssues:issues.length,allReviewed:nodes.every(n=>n.status==='reviewed')&&chapters.every(c=>c.status==='reviewed'||c.status==='not_applicable')&&issues.length===0};
const inputHash=createHash('sha256').update(JSON.stringify({nodes,chapters,summary,issues})).digest('hex');
const report={...summary,inputHash,completionRule:'All year facets and all course geographic leads need explicit review; links and record counts never imply completion',duplicatePlaceIds,referenceIssues:issues,priorityQueue:ledger.priorityQueue,nodes,chapters};
mkdirSync(new URL('artifacts/europe-atlas/',root),{recursive:true});
for(const path of ['docs/atlas-node-progress.json','artifacts/europe-atlas/update-progress.json'])writeFileSync(new URL(path,root),JSON.stringify(report,null,2)+'\n');
writeFileSync(new URL('src/europe/atlas-progress-summary.json',root),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary));if(issues.length){console.error(JSON.stringify(issues));process.exitCode=1;}
