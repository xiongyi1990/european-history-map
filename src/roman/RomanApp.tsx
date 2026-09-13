import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Bookmark,Compass,ExternalLink,LocateFixed,Mountain,Search,X} from 'lucide-react';
import {GreekMap,type Camera,type MapCommand} from '../greek/GreekMap';
import {BattleExplorer} from '../greek/BattleExplorer';
import {romanBattles} from './battles';
import {romanPeriods,romanMapAtlas,periodPlaces,placeName,placeGroup,searchRoman,groupNames,groupColors,type RomanPeriodId,type RomanGroup} from './data';
import '../greek/greek.css';
import '../greek/terrain-theme.css';
import './roman.css';

const key='roman-reading-atlas:bookmark:v1';
const noComparison:string[]=[];
function validPeriod(value:unknown):value is RomanPeriodId{return romanPeriods.some(p=>p.id===value)}
export function RomanApp(){
 const initial=new URLSearchParams(location.search);
 const [period,setPeriod]=useState<RomanPeriodId>(()=>{const p=initial.get('period');return validPeriod(p)?p:'punic'});
 const [selected,setSelected]=useState<string|undefined>(()=>periodPlaces(period).find(p=>p.id===initial.get('city'))?.id);
 const [battleMode,setBattleMode]=useState(()=>initial.has('battle'));
 const [threeD,setThreeD]=useState(true),[modern,setModern]=useState(false);
 const [query,setQuery]=useState(''),[searchOpen,setSearchOpen]=useState(false),[sourceOpen,setSourceOpen]=useState(false),[message,setMessage]=useState('');
 const [command,setCommand]=useState<MapCommand>({ids:selected?[selected]:[],nonce:0});
 const camera=useRef<Camera|undefined>(undefined),dialog=useRef<HTMLDialogElement>(null),search=useRef<HTMLDivElement>(null);
 const atlas=useMemo(()=>romanMapAtlas(period),[period]);
 const scene=romanPeriods.find(p=>p.id===period)!;
 const visible=periodPlaces(period),current=visible.find(p=>p.id===selected),results=searchRoman(query,period);
 const groups=[...new Set(visible.map(p=>placeGroup(p,period)!))];
 const index=romanPeriods.indexOf(scene);
 const move=useCallback((ids:string[],view?:Camera)=>setCommand(c=>({ids,nonce:c.nonce+1,camera:view})),[]);
 const onCamera=useCallback((c:Camera)=>{camera.current=c},[]);
 const select=useCallback((id:string)=>{setSelected(id);setSearchOpen(false);setQuery('');move([id])},[move]);
 function choosePeriod(p:RomanPeriodId){setPeriod(p);setSelected(undefined);setQuery('');setSearchOpen(false);move([])}
 function enterBattle(id:string){const u=new URL(location.href);u.searchParams.set('battle',id);u.searchParams.set('stage','0');history.replaceState(null,'',u);setBattleMode(true)}
 useEffect(()=>{if(battleMode)return;document.title='古罗马 · 读史地图';const u=new URL(location.href);u.searchParams.set('atlas','rome');u.searchParams.set('period',period);if(selected)u.searchParams.set('city',selected);else u.searchParams.delete('city');['year','battle','stage'].forEach(k=>u.searchParams.delete(k));history.replaceState(null,'',u)},[period,selected,battleMode]);
 useEffect(()=>{if(sourceOpen)dialog.current?.showModal();else dialog.current?.close()},[sourceOpen]);
 useEffect(()=>{if(!message)return;const t=setTimeout(()=>setMessage(''),4200);return()=>clearTimeout(t)},[message]);
 useEffect(()=>{const close=(e:PointerEvent)=>{if(!search.current?.contains(e.target as Node))setSearchOpen(false)};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close)},[]);
 function save(){try{localStorage.setItem(key,JSON.stringify({version:1,period,selected,threeD,modern,camera:camera.current}));setMessage('已保存罗马地图的时期、地点与视角。')}catch{setMessage('浏览器暂时无法保存书签。')}}
 function restore(){try{const v=JSON.parse(localStorage.getItem(key)??'null');if(v?.version!==1||!validPeriod(v.period))throw Error();const id=periodPlaces(v.period).find(p=>p.id===v.selected)?.id;const c=v.camera as Camera|undefined;const valid=c&&Array.isArray(c.center)&&c.center.length===2&&[...c.center,c.zoom,c.pitch,c.bearing].every(Number.isFinite)&&c.zoom>=2.8&&c.zoom<=11&&c.pitch>=0&&c.pitch<=72;setPeriod(v.period);setSelected(id);setThreeD(!!v.threeD);setModern(!!v.modern);move(id?[id]:[],valid?c:undefined);setMessage('已恢复罗马地图书签。')}catch{setMessage('还没有可用的罗马地图书签，请先保存。')}}
 if(battleMode)return <BattleExplorer collection={romanBattles} atlasKey="rome" mapAtlas={atlas} onExit={()=>{setBattleMode(false);move(selected?[selected]:[])}}/>;
 return <main className="g-app r-app">
  <header className="g-header"><a className="g-brand" href="?atlas=rome"><Compass size={29} strokeWidth={1.3}/><span>读史地图<small>ROMA · READING ATLAS</small></span></a>
   <div className="g-search" ref={search}><form onSubmit={e=>{e.preventDefault();if(results[0])select(results[0].id);else setMessage('本时期未收录这个地点，可切换时期再搜索。')}}><Search size={17}/><input aria-label="搜索罗马古今地名" placeholder="罗马、迦太基、伦敦…" value={query} onFocus={()=>setSearchOpen(true)} onChange={e=>{setQuery(e.target.value);setSearchOpen(true)}} onKeyDown={e=>{if(e.key==='Escape')setSearchOpen(false)}}/><button type="submit">定位</button></form>
   {searchOpen&&<div className="g-results"><p>{scene.date} · {results.length} 处地点</p>{results.map(p=><button key={p.id} onClick={()=>select(p.id)}><span>{placeName(p,period)}<small>{p.latin} · {p.region}</small></span><ArrowRight size={14}/></button>)}{!results.length&&<p>本时期未收录，试试其他译名或时期。</p>}</div>}</div>
   <div className="g-header-actions"><a className="r-era-link" href="?atlas=greece">古希腊</a><button className="g-enter-battles" onClick={()=>enterBattle(romanBattles[0].id)}>战役路线 →</button><button aria-label="资料说明" onClick={()=>setSourceOpen(true)}><BookOpen size={16}/></button><button aria-label="保存罗马书签" onClick={save}><Bookmark size={16}/></button></div>
  </header>
  <div className="g-workspace"><aside className="g-reading"><div className="g-reading-top"><span className="g-kicker">欧洲史伴读 / 02</span><h1>古罗马<span>走向地中海</span></h1><p className="g-intro">从台伯河畔，<br/>到环绕一片海的世界。</p><div className="g-rule"/></div>
   <div className="g-reading-body"><p className="g-section-label">三个观察时点</p><nav className="g-steps" aria-label="罗马历史时期">{romanPeriods.map((p,i)=><button key={p.id} className={period===p.id?'active':''} aria-pressed={period===p.id} onClick={()=>choosePeriod(p.id)}><span className="g-step-number">0{i+1}</span><span><strong>{p.title}</strong><small>{p.date}</small></span><ArrowRight size={14}/></button>)}</nav><p className="g-step-note">{scene.intro}</p><div className="g-place-shortcuts"><span className="g-section-label">战役与行动路线</span>{romanBattles.map(b=><button key={b.id} onClick={()=>enterBattle(b.id)}>{b.title}<ArrowRight size={13}/></button>)}</div></div>
   <div className="g-reading-bottom"><BookOpen size={17}/><div>地点、地形与历史行动<small>25 处地点 · 三个时期 · 三个战役专题</small></div><button className="g-restore" onClick={restore}>恢复书签</button></div></aside>
   <section className="g-stage" aria-label="罗马地图阅读区"><GreekMap atlas={atlas} threeD={threeD} modern={modern} layer="places" selected={selected} compare={noComparison} command={command} onSelect={select} onCamera={onCamera}/>
    <div className="g-map-tools"><select className="g-battle-select r-period-select" aria-label="选择罗马时期" value={period} onChange={e=>choosePeriod(e.target.value as RomanPeriodId)}>{romanPeriods.map(p=><option key={p.id} value={p.id}>{p.date} · {p.title}</option>)}</select><button className={modern?'g-tool active':'g-tool'} aria-pressed={modern} onClick={()=>setModern(v=>!v)}>古今对照</button><button className={threeD?'g-tool active':'g-tool'} aria-pressed={threeD} onClick={()=>setThreeD(v=>!v)}><Mountain size={16}/>{threeD?'切回俯视':'3D 地形'}</button><button className="g-tool" aria-label="回到罗马全景" onClick={()=>{setSelected(undefined);move([])}}><LocateFixed size={17}/></button></div>
    <div className="g-legend r-legend"><strong>{scene.date} · 已收录 {visible.length} 处</strong><div>{groups.map(g=><span key={g}><i style={{background:groupColors[g]}}/>{groupNames[g]}</span>)}</div><small>点色表示地点归属，不是疆界</small></div>
    {modern&&<div className="g-modern-note">现代地名与国界，仅用于位置对照</div>}
    {current?<aside className="g-detail r-detail" aria-label={`${placeName(current,period)}地点详情`}><button className="g-close" aria-label="关闭地点详情" onClick={()=>setSelected(undefined)}><X size={18}/></button><span className="g-kicker">{scene.date} / {current.region}</span><h2>{placeName(current,period)}</h2><p className="g-latin">{current.latin}</p><div className="g-camp" style={{color:groupColors[placeGroup(current,period) as RomanGroup]}}>{groupNames[placeGroup(current,period)!]}</div><p>{current.description}</p>{(period==='punic'?current.punicNote:period==='division'?current.lateNote:undefined)&&<p>{period==='punic'?current.punicNote:current.lateNote}</p>}<dl><dt>对应今天</dt><dd>{current.modern}</dd><dt>位置精度</dt><dd>Pleiades {current.precision==='rough'?'近似代表点':'地点代表点'}</dd></dl><div className="g-detail-source"><a href={current.source} target="_blank" rel="noreferrer">地点原始记录<ExternalLink size={12}/></a><a href={scene.source} target="_blank" rel="noreferrer">时期背景资料<ExternalLink size={12}/></a></div></aside>:<aside className="g-detail r-scene"><span className="g-kicker">ROMA / {String(index+1).padStart(2,'0')}</span><h2>{scene.title}</h2><p>{scene.reading}</p><button className="g-compare-add" onClick={()=>select(period==='division'?'byzantium':'rome')}>从{period==='division'?'君士坦丁堡':'罗马'}开始 <ArrowRight size={15}/></button></aside>}
    {message&&<div className="g-toast" role="status">{message}</div>}
   </section></div>
  <footer className="g-footer"><div className="g-time-label"><span className="g-kicker">当前历史场景</span><strong>{scene.date}</strong></div><div className="g-time-track"><span className="g-time-line"/><div className="g-time-point"><i/><strong>{scene.title}</strong><small>三个资料场景 · 不作逐年疆界插值</small></div></div><div className="g-step-control"><button aria-label="上一个罗马时期" disabled={index===0} onClick={()=>choosePeriod(romanPeriods[index-1].id)}><ArrowLeft size={17}/></button><span>{index+1} / 3</span><button aria-label="下一个罗马时期" disabled={index===2} onClick={()=>choosePeriod(romanPeriods[index+1].id)}><ArrowRight size={17}/></button><button className="r-mobile-restore" aria-label="恢复罗马书签" onClick={restore}><Bookmark size={15}/></button></div></footer>
  <dialog ref={dialog} className="g-source-dialog" onClose={()=>setSourceOpen(false)}><button className="g-close" aria-label="关闭资料说明" autoFocus onClick={()=>setSourceOpen(false)}><X size={20}/></button><span className="g-kicker">资料与覆盖范围</span><h2>罗马地图，第一组阅读场景</h2><p>共 25 处地点：前 218 年显示 17 处，117 年与 395 年各显示 25 处。另有汉尼拔、凯撒内战与亚克兴三个行动专题，共 13 个阶段。</p><ul><li><a href="https://pleiades.stoa.org/downloads" target="_blank" rel="noreferrer">Pleiades 古代地名资料</a><p>2026-09-09 提取；CC BY 3.0，Pleiades contributors。代表坐标用于定位，不是城市或行省边界。</p></li><li>时期背景与战役文献<p>前 218 年参考波利比乌斯第三卷；凯撒、亚克兴参考普鲁塔克相应传记。战役卡片提供各阶段章节链接。帝国时期背景可从地点详情进入博物馆资料。</p></li><li><a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noreferrer">现代地形与水深数据</a><p>覆盖西经 11° 至东经 43°、北纬 25° 至 57°。共 1,701 张地形图块及 1,701 张原始高程图块，缓存至第 8 级。高度放大 4 倍，颜色不代表古代植被或精确海岸。</p></li></ul><p>本版没有逐年疆界、完整行省和居民分布。路线连接文献中的主要节点，山口、登陆点与战场范围有不确定性，不能用作精确行军轨迹。希腊单元仍保留，尚未覆盖全部古希腊历史。</p><p className="g-detail-fine">网页版直接生成交互地形；既有 Blender 文件仍是独立的古希腊场景。</p></dialog>
 </main>;
}
