import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Compass, ExternalLink, LocateFixed, Mountain, Pause, Play, RotateCcw } from 'lucide-react';
import { GreekMap, type Camera, type MapCommand, type MapAtlas } from './GreekMap';
import { battles as greekBattles, battleCoordinates, clampBattleStep, type Battle } from './battles';


const noop=()=>{};
const noComparison:string[]=[];
export function BattleExplorer({onExit,collection=greekBattles,atlasKey='greece',mapAtlas}:{onExit:()=>void;collection?:Battle[];atlasKey?:'greece'|'rome';mapAtlas?:MapAtlas}){
  const battles=collection;
  const bookmarkKey=atlasKey==='rome'?'roman-reading-atlas:battle-bookmark:v1':'greek-reading-atlas:battle-bookmark:v1';
  const isRome=atlasKey==='rome';
  const query=new URLSearchParams(location.search);
  const [id,setId]=useState(()=>battles.find(b=>b.id===query.get('battle'))?.id??battles[0].id);
  const battle=battles.find(b=>b.id===id)!;
  const [step,setStep]=useState(()=>clampBattleStep(battle,query.get('stage')));
  const [playing,setPlaying]=useState(false);
  const [threeD,setThreeD]=useState(true);
  const [modern,setModern]=useState(false);
  const [message,setMessage]=useState('');
  const camera=useRef<Camera|undefined>(undefined);
  const [command,setCommand]=useState<MapCommand>(()=>({ids:[],nonce:0,coordinates:battleCoordinates(battle)}));
  const stage=battle.stages[step];
  const onCamera=useCallback((c:Camera)=>{camera.current=c},[]);
  const overview=()=>setCommand(c=>({ids:[],nonce:c.nonce+1,coordinates:battleCoordinates(battle)}));
  const locate=(index:number)=>setCommand(c=>({ids:[],nonce:c.nonce+1,coordinates:[...battle.stages[index].path,...battle.stages[index].stops.map(p=>p.coords)]}));
  function chooseStage(index:number){setPlaying(false);setStep(index)}
  function chooseBattle(next:string){const b=battles.find(b=>b.id===next)!;setPlaying(false);setId(next);setStep(0);setCommand(c=>({ids:[],nonce:c.nonce+1,coordinates:battleCoordinates(b)}))}
  useEffect(()=>{const u=new URL(location.href);u.searchParams.set('atlas',atlasKey);u.searchParams.set('battle',id);u.searchParams.set('stage',String(step));u.searchParams.delete('city');u.searchParams.delete('year');history.replaceState(null,'',u);document.title=`${battle.title} · 读史地图`;},[id,step,battle.title,atlasKey]);
  useEffect(()=>{if(!playing)return;const timer=setTimeout(()=>{if(step>=battle.stages.length-1)setPlaying(false);else setStep(s=>s+1)},6500);return()=>clearTimeout(timer)},[playing,step,battle.stages.length]);
  useEffect(()=>{if(playing&&step===battle.stages.length-1)setPlaying(false)},[playing,step,battle.stages.length]);
  useEffect(()=>{if(!message)return;const t=setTimeout(()=>setMessage(''),4000);return()=>clearTimeout(t)},[message]);
  function save(){try{localStorage.setItem(bookmarkKey,JSON.stringify({id,step,threeD,modern,camera:camera.current}));setMessage('已保存战役、阶段与地图视角。')}catch{setMessage('浏览器无法保存书签。')}}
  function restore(){try{
    const v=JSON.parse(localStorage.getItem(bookmarkKey)??'null');const b=battles.find(b=>b.id===v?.id);if(!b)throw Error();
    setPlaying(false);setId(b.id);setStep(clampBattleStep(b,v.step));setThreeD(!!v.threeD);setModern(!!v.modern);
    const c=v.camera as Camera|undefined;
    const valid=c&&Array.isArray(c.center)&&c.center.length===2&&[...c.center,c.zoom,c.pitch,c.bearing].every(Number.isFinite)&&c.zoom>=(mapAtlas?.minZoom??4)&&c.zoom<=11&&c.pitch>=0&&c.pitch<=72;
    setCommand(old=>({ids:[],nonce:old.nonce+1,coordinates:battleCoordinates(b),camera:valid?c:undefined}));setMessage('已恢复战役书签。');
  }catch{setMessage('还没有可用的战役书签，请先保存。')}}
  return <main className="g-app g-battles">
    <header className="g-header"><button className="g-battle-back" onClick={onExit}><ArrowLeft size={17}/><span>{isRome?'返回罗马地图':'返回城邦地图'}</span></button><div className="g-battle-brand"><Compass size={23}/>读史地图 <span>/ 战役路线</span></div><div className="g-header-actions"><button aria-label="恢复战役书签" onClick={restore}><RotateCcw size={17}/></button><button className="g-battle-save" aria-label="保存书签" onClick={save}><Bookmark size={17}/><span>保存书签</span></button></div></header>
    <div className="g-workspace">
      <aside className="g-reading"><div className="g-reading-top"><span className="g-kicker">{isRome?'古罗马 / 战争与扩张':'欧洲史伴读 / 战争与地理'}</span><h1>循迹而读<span>战役与远征</span></h1><p className="g-intro">先找到战场，<br/>再跟随行动的方向。</p><div className="g-rule"/></div>
        <div className="g-reading-body"><nav className="g-steps" aria-label="战役专题">{battles.map((b,i)=><button key={b.id} className={id===b.id?'active':''} aria-pressed={id===b.id} onClick={()=>chooseBattle(b.id)}><span className="g-step-number">0{i+1}</span><span><strong>{b.title}</strong><small>{b.period} · {b.stages.length} 个阶段</small></span><ArrowRight size={14}/></button>)}</nav><p className="g-step-note">{battle.question}</p><p className="g-step-note">粗线：当前阶段<br/>淡线：此前阶段<br/>箭头：行动方向<br/>全部路线均为示意连线</p></div>
        <div className="g-reading-bottom">古代文献记述 × 现代地形参考<br/>右上角回转箭头可恢复战役书签</div>
      </aside>
      <section className="g-stage" aria-label="战役路线地图">
        <GreekMap atlas={mapAtlas} threeD={threeD} modern={modern} layer="places" compare={noComparison} command={command} onSelect={noop} onCamera={onCamera} battle={battle} battleStep={step}/>
        <div className="g-map-tools"><select className="g-battle-select" aria-label="选择战役" value={id} onChange={e=>chooseBattle(e.target.value)}>{battles.map(b=><option key={b.id} value={b.id}>{b.period} · {b.title}</option>)}</select><button className={threeD?'g-tool active':'g-tool'} aria-pressed={threeD} onClick={()=>setThreeD(v=>!v)}><Mountain size={16}/>{threeD?'切回俯视':'3D 地形'}</button><button className={modern?'g-tool active':'g-tool'} aria-pressed={modern} onClick={()=>setModern(v=>!v)}>现代国界</button><button className="g-tool g-home" aria-label="查看整场战役路线" onClick={overview}><LocateFixed size={17}/></button></div>
        <article className="g-battle-card" aria-label="当前战役阶段"><div className="g-battle-card-heading"><span className="g-kicker">{stage.date}</span><span className="g-battle-count">{step+1} / {battle.stages.length}</span></div><h2>{stage.title}</h2><div className="g-battle-side"><i style={{background:stage.color}}/>{stage.side} · 示意方向</div><p>{stage.text}</p><div className="g-battle-stops">{stage.stops.map((p,i)=><span key={`${p.name}-${i}`}><b style={{background:stage.color}}>{i+1}</b>{p.name}</span>)}</div><div className="g-battle-card-actions"><a href={stage.source} target="_blank" rel="noreferrer">{stage.sections}<ExternalLink size={12}/></a><button onClick={()=>locate(step)}>定位本阶段</button></div><details><summary>路线精度与史料说明</summary><p>{battle.caveat}</p><p>编号点为编者选取的近似地理参考位置；曲线折点只服务于示意，不是史料确认的经停点。箭头不表示速度、兵力或精确阵线。播放每 6.5 秒换页，不表示历史时间比例。</p></details></article>
        {message&&<div className="g-toast" role="status">{message}</div>}
      </section>
    </div>
    <footer className="g-footer g-battle-footer"><div className="g-time-label"><span className="g-kicker">当前战役 · {battle.period}</span><strong>{battle.title}</strong></div><nav className="g-battle-progress" aria-label="战役阶段">{battle.stages.map((s,i)=><button key={s.title} className={step===i?'active':i<step?'passed':''} aria-label={`第 ${i+1} 阶段：${s.title}`} aria-current={step===i?'step':undefined} onClick={()=>chooseStage(i)}><b>{i+1}</b><span>{s.title}</span></button>)}</nav><div className="g-battle-play"><button aria-label="上一战役阶段" disabled={step===0} onClick={()=>chooseStage(step-1)}><ArrowLeft size={17}/></button><button aria-label={playing?'暂停播放':'播放战役路线'} onClick={()=>{if(step===battle.stages.length-1)setStep(0);setPlaying(v=>!v)}}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><button aria-label="下一战役阶段" disabled={step===battle.stages.length-1} onClick={()=>chooseStage(step+1)}><ArrowRight size={17}/></button></div></footer>
  </main>;
}
