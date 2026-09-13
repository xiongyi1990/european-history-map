import type {GazetteerPlace} from './model';
import {yearLabel,placeLabel,allBattles,battleYears} from './model';
import {detailHistory,historySources,type HistoricalDetail,type HistoricalFact} from './history-details';
import {courseDocument} from './course-sources';

function Fact({title,value}:{title:string;value:HistoricalFact}){
 return <section className="h-fact"><h3>{title}</h3><p>{value.text}</p><div className="h-sources">{value.sources.map(id=><a key={id} href={historySources[id].url} target="_blank" rel="noreferrer">{historySources[id].title} ↗</a>)}</div></section>;
}
export function HistoryPeriods({placeId,currentId,onYear}:{placeId:string;currentId?:string;onYear:(y:number)=>void}){
 const periods=detailHistory(placeId);
 if(!periods.length||currentId&&periods.length===1)return null;
 return <section className="h-related h-period-links"><h3>同一地点，不同时期</h3>{periods.map(d=><button key={d.id} className={d.id===currentId?'active':''} onClick={()=>onYear(d.focusYear??(d.from===d.to?d.from:Math.round((d.from+d.to)/2)))}>{d.period}<span>{d.id===currentId?'当前资料':'查看这一时期 →'}</span></button>)}</section>;
}
export function HistoryDetailCard({place,detail,places,year,onYear,onSelect,onBack}:{place:GazetteerPlace;detail:HistoricalDetail;places:GazetteerPlace[];year:number;onYear:(y:number)=>void;onSelect:(id:string)=>void;onBack:()=>void}){
 return <article className="e-detail h-detail"><button className="e-back" onClick={onBack}>← 返回地点索引</button>
  <small>{detail.kind} · {yearLabel(year)}</small><h2>{detail.title}</h2><details><summary>其他语言名称</summary><p>{detail.displayName??place.aliases[0]}</p></details>
  <div className="h-period"><strong>{detail.period}</strong><span>{detail.from===detail.to?'本条不自动沿用到其他年份。':'时段表达此地的主要政治角色；不表示这段时间疆界、居民和制度始终不变。'}</span></div>
  <dl><dt>对应今天</dt><dd>{place.modern}</dd><dt>定位</dt><dd>{place.coords[1].toFixed(3)}° 北纬 · {Math.abs(place.coords[0]).toFixed(3)}°{place.coords[0]<0?'西经':'东经'}</dd></dl>
  <Fact title="名称与古今对应" value={detail.nameNote}/><Fact title="政治共同体与归属" value={detail.polity}/><Fact title="领土、疆界与地图尺度" value={detail.territory}/><Fact title="居民与社会身份" value={detail.people}/><Fact title="语言与书写" value={detail.language}/>
  {detail.reading?.length&&<section className="h-reading"><h3>对照阅读材料</h3><p>《{courseDocument.title}》</p>{detail.reading.map((r,i)=><div key={i}><strong>第 {r.chapter} 讲 · PDF 第 {r.pages[0]}{r.pages[1]!==r.pages[0]?`—${r.pages[1]}`:''} 页</strong>{r.note&&<p>{r.note}</p>}</div>)}{detail.readingNote&&<aside><strong>阅读辨析</strong><p>{detail.readingNote}</p>{detail.readingNoteSource&&<a href={historySources[detail.readingNoteSource].url} target="_blank" rel="noreferrer">核对资料：{historySources[detail.readingNoteSource].title} ↗</a>}</aside>}<small>页码从你提供的 PDF 第一页起算。地图摘要与核对资料分别列出。</small></section>}
  {!!detail.relatedBattles?.length&&<section className="h-related"><h3>相关战役路线</h3><p>打开专题会切换到该战役的起始年份。</p>{detail.relatedBattles.map(id=>{const b=allBattles.find(b=>b.id===id);return b?<p key={id}><a href={`?year=${battleYears[id]}&battle=${id}&stage=0`}>{b.title} · {b.period} →</a></p>:null})}</section>}
  <HistoryPeriods placeId={place.id} currentId={detail.id} onYear={onYear}/>
  <section className="h-related"><h3>一起看，更容易理解</h3>{detail.related.map(id=>{const p=places.find(p=>p.id===id);return p?<button key={id} onClick={()=>onSelect(id)}>{placeLabel(p,year)}<span>{p.modern} →</span></button>:null})}</section>
  <a href={place.source} target="_blank" rel="noreferrer">查看地点定位来源 ↗</a>
 </article>;
}
