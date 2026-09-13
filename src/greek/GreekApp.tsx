import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDownLeft, ArrowLeft, ArrowRight, BookOpen, Bookmark, Check, Compass, ExternalLink, Layers, LocateFixed, Map, Mountain, Search, X } from 'lucide-react';
import { GreekMap, type Camera, type MapCommand } from './GreekMap';
import { campColors, campNames, distanceKm, places, readingSteps, searchPlaces, sourceWar, type Layer } from './data';
import './greek.css';
import './terrain-theme.css';
import { BattleExplorer } from './BattleExplorer';

interface SavedView { version:1; selected?:string; threeD:boolean; modern:boolean; layer:Layer; camera?:Camera; step:number }
const bookmarkKey='greek-reading-atlas:bookmark:v1';

export function GreekApp(){
  const [battleMode,setBattleMode]=useState(()=>new URLSearchParams(location.search).has('battle'));
  const initialId=new URLSearchParams(location.search).get('city');
  const [selected,setSelected]=useState<string|undefined>(places.find(p=>p.id===initialId)?.id);
  const [query,setQuery]=useState('');
  const [searchOpen,setSearchOpen]=useState(false);
  const [threeD,setThreeD]=useState(true);
  const [modern,setModern]=useState(false);
  const [layer,setLayer]=useState<Layer>('places');
  const [step,setStep]=useState(0);
  const [compare,setCompare]=useState<string[]>([]);
  const [detailTab,setDetailTab]=useState('位置');
  const [message,setMessage]=useState('');
  const [sourceOpen,setSourceOpen]=useState(false);
  const [saved,setSaved]=useState(()=>{try{return !!localStorage.getItem(bookmarkKey)}catch{return false}});
  const [command,setCommand]=useState<MapCommand>({ids:initialId?[initialId]:[],nonce:0});
  const camera=useRef<Camera|undefined>(undefined);
  const sourceDialog=useRef<HTMLDialogElement>(null);
  const searchRef=useRef<HTMLDivElement>(null);
  const current=places.find(p=>p.id===selected);
  const results=searchPlaces(query);
  const move=useCallback((ids:string[],view?:Camera)=>setCommand(v=>({ids,nonce:v.nonce+1,camera:view})),[]);
  const select=useCallback((id:string)=>{setSelected(id);setDetailTab('位置');setSearchOpen(false);move([id]);},[move]);
  const onCamera=useCallback((value:Camera)=>{camera.current=value},[]);

  useEffect(()=>{if(battleMode)return;document.title='古希腊 · 读史地图';const u=new URL(location.href);u.searchParams.set('atlas','greece');if(selected)u.searchParams.set('city',selected);else u.searchParams.delete('city');u.searchParams.delete('year');u.searchParams.delete('battle');u.searchParams.delete('stage');history.replaceState(null,'',u);},[selected,battleMode]);
  useEffect(()=>{if(!message)return;const t=setTimeout(()=>setMessage(''),4200);return()=>clearTimeout(t)},[message]);
  useEffect(()=>{const click=(e:MouseEvent)=>{if(!searchRef.current?.contains(e.target as Node))setSearchOpen(false)};document.addEventListener('pointerdown',click);return()=>document.removeEventListener('pointerdown',click)},[]);
  useEffect(()=>{if(sourceOpen)sourceDialog.current?.showModal();else sourceDialog.current?.close()},[sourceOpen]);

  function chooseStep(index:number){setStep(index);setLayer(readingSteps[index].layer);setSelected(undefined);setCompare([]);move(readingSteps[index].focus)}
  function addComparison(id:string){
    if(compare.includes(id)){setCompare(compare.filter(p=>p!==id));return;}
    const next=compare.length>=2?[compare[1],id]:[...compare,id];setCompare(next);
    if(next.length===2){move(next);setMessage('');}else setMessage('已选第一处地点，请在地图或搜索中选择第二处。');
  }
  function saveView(){try{const value:SavedView={version:1,selected,threeD,modern,layer,camera:camera.current,step};localStorage.setItem(bookmarkKey,JSON.stringify(value));setSaved(true);setMessage('已保存阅读位置、视角和图层。')}catch{setMessage('浏览器无法保存书签，请检查本地存储设置。')}}
  function restoreView(){try{
    const v:SavedView=JSON.parse(localStorage.getItem(bookmarkKey)??'null');
    if(!v||v.version!==1||!['places','alliances','territory'].includes(v.layer)||!Number.isInteger(v.step)||v.step<0||v.step>2)throw Error();
    const id=places.find(p=>p.id===v.selected)?.id;setSelected(id);setThreeD(!!v.threeD);setModern(!!v.modern);setLayer(v.layer);setStep(v.step);setCompare([]);
    const c=v.camera;const valid=c&&Array.isArray(c.center)&&c.center.length===2&&[...c.center,c.zoom,c.pitch,c.bearing].every(Number.isFinite)&&c.zoom>=4&&c.zoom<=11&&c.pitch>=0&&c.pitch<=72;
    move(id?[id]:[],valid?c:undefined);setMessage('已恢复上次保存的阅读位置。');
  }catch{setMessage('这条书签暂时无法读取，可以重新保存。')}}

  if(battleMode)return <BattleExplorer onExit={()=>{setBattleMode(false);move(selected?[selected]:[])}}/>;
  return <main className="g-app">
    <header className="g-header">
      <a className="g-brand" href="?atlas=greece" aria-label="读史地图首页"><Compass size={29} strokeWidth={1.3}/><span>读史地图<small>A READING ATLAS</small></span></a>
      <div className="g-search" ref={searchRef}>
        <form onSubmit={e=>{e.preventDefault();if(results[0])select(results[0].id);else setMessage('还没有收录这个地点，试试其他译名。')}}>
          <Search size={17}/><input aria-label="搜索古今地名" placeholder="书里读到的地名，从这里找…" value={query} onFocus={()=>setSearchOpen(true)} onChange={e=>{setQuery(e.target.value);setSearchOpen(true)}} onKeyDown={e=>{if(e.key==='Escape')setSearchOpen(false)}}/>
          {query&&<button type="button" aria-label="清空搜索" onClick={()=>setQuery('')}><X size={15}/></button>}
          <button type="submit">定位</button>
        </form>
        {searchOpen&&<div className="g-results"><p>{query?`${results.length} 处匹配地点`:'本单元的 26 处地点'}</p>{results.map(p=><button key={p.id} onClick={()=>{setQuery('');select(p.id)}}><span>{p.name}<small>{p.latin} · {p.region}</small></span><ArrowDownLeft size={14}/></button>)}{!results.length&&<p>尚未收录。可试“拉栖代梦”“阿提卡”或“科孚”。</p>}</div>}
      </div>
      <div className="g-header-actions"><a className="r-era-link" href="?atlas=rome">古罗马 →</a><button className="g-enter-battles" onClick={()=>setBattleMode(true)}>战役路线 →</button><button onClick={()=>setSourceOpen(true)}><BookOpen size={16}/><span>资料说明</span></button><button onClick={saveView}><Bookmark size={16}/><span>保存书签</span></button></div>
    </header>

    <div className="g-workspace">
      <aside className="g-reading">
        <div className="g-reading-top"><span className="g-kicker">欧洲史伴读 / 01</span><h1>古希腊<span>山海之间</span></h1><p className="g-intro">让书中的地名，<br/>在山与海之间找到位置。</p><div className="g-rule"/></div>
        <div className="g-reading-body"><p className="g-section-label">当前专题 <span>雅典与斯巴达</span></p>
          <nav aria-label="阅读引导" className="g-steps">{readingSteps.map((s,i)=><button key={s.title} className={step===i?'active':''} onClick={()=>chooseStep(i)}><span className="g-step-number">0{i+1}</span><span><strong>{s.title}</strong><small>{s.subtitle}</small></span><ArrowRight size={14}/></button>)}</nav>
          <p className="g-step-note">{readingSteps[step].text}</p>
          <div className="g-place-shortcuts"><span className="g-section-label">先找这几个地方</span>{['athens','sparta','corinth','argos','plataea'].map(id=>{const p=places.find(p=>p.id===id)!;return <button key={id} onClick={()=>select(id)}>{p.name}<ArrowRight size={13}/></button>})}</div>
        </div>
        <div className="g-reading-bottom"><BookOpen size={17}/><div>配合《企鹅欧洲史》第一卷<small>顾衡专栏作为辅助阅读 · 暂按专题组织</small></div>{saved&&<button className="g-restore" onClick={restoreView}>恢复书签</button>}</div>
      </aside>

      <section className="g-stage" aria-label="地图阅读区">
        <GreekMap threeD={threeD} modern={modern} layer={layer} selected={selected} compare={compare} command={command} onSelect={select} onCamera={onCamera}/>
        <div className="g-map-tools"><div className="g-segment" aria-label="地图内容">{([['places','地点'],['alliances','同盟'],['territory','领土资料']] as const).map(([v,t])=><button aria-pressed={layer===v} className={layer===v?'active':''} onClick={()=>setLayer(v)} key={v}>{v==='places'&&<Map size={15}/>} {t}</button>)}</div>
          <button className={modern?'g-tool active':'g-tool'} aria-pressed={modern} onClick={()=>setModern(v=>!v)}>古今对照</button>
          <button className={threeD?'g-tool active':'g-tool'} aria-pressed={threeD} onClick={()=>setThreeD(v=>!v)}><Mountain size={16}/>{threeD?'切回俯视':'3D 地形'}</button>
          <button className="g-tool g-home" aria-label="回到希腊全景" onClick={()=>{setSelected(undefined);move([])}}><LocateFixed size={17}/></button>
        </div>

        {layer==='alliances'&&<div className="g-legend"><strong>开战时的阵营关系</strong><div>{Object.entries(campNames).map(([camp,name])=><span key={camp}><i style={{background:campColors[camp as keyof typeof campColors]}}/>{name}</span>)}</div><small>选取部分地点 · 连线表示关系，不表示路线或疆界</small></div>}
        {layer==='territory'&&<div className="g-territory-note"><Layers size={21}/><div><strong>城邦的点，不等于城邦的边界</strong><p>本版没有已核实的前 431 年疆界图层。点击雅典或斯巴达，先分清城市、核心领地与同盟范围。</p></div></div>}
        {modern&&<div className="g-modern-note">现代地名与国界，仅用于位置对照</div>}

        {current&&<aside className="g-detail" aria-label={`${current.name}地点详情`}><button className="g-close" aria-label="关闭地点详情" onClick={()=>setSelected(undefined)}><X size={18}/></button>
          <span className="g-kicker">{current.region} / {current.kind}</span><h2>{current.name}</h2><p className="g-latin">{current.latin}</p><div className="g-camp" style={{color:campColors[current.camp]}}><i style={{background:campColors[current.camp]}}/>{campNames[current.camp]}</div>
          <div className="g-detail-tabs">{['位置','关系','领土','居民'].map(t=><button className={detailTab===t?'active':''} onClick={()=>setDetailTab(t)} key={t}>{t}</button>)}</div>
          {detailTab==='位置'&&<><p>{current.description}</p><dl><dt>对应今天</dt><dd>{current.modern}</dd><dt>位置依据</dt><dd>Pleiades {current.precision==='rough'?'近似代表点':'地点代表点'}，不是城邦疆界</dd></dl></>}
          {detailTab==='关系'&&<><p>{current.relation}</p><p className="g-detail-fine">政治资料限定为开战之初，不自动外推到整个公元前 431 年或其他年份。</p></>}
          {detailTab==='领土'&&<p>{current.territory}</p>}
          {detailTab==='居民'&&<p>{current.people}</p>}
          <div className="g-detail-source"><a href={current.source} target="_blank" rel="noreferrer">地点原始记录<ExternalLink size={12}/></a>{['关系','居民'].includes(detailTab)&&<a href={sourceWar} target="_blank" rel="noreferrer">修昔底德·第二卷<ExternalLink size={12}/></a>}</div>
          <button className="g-compare-add" onClick={()=>addComparison(current.id)}>{compare.includes(current.id)?<Check size={16}/>:<LocateFixed size={16}/>} {compare.includes(current.id)?'已加入比较 · 点击移除':'加入两地比较'}</button>
        </aside>}

        {compare.length>0&&<div className="g-comparison" aria-live="polite"><div><strong>{compare.map(id=>places.find(p=>p.id===id)!.name).join('  ↔  ')}</strong>{compare.length===2?<span>大圆距离约 {distanceKm(places.find(p=>p.id===compare[0])!.coords,places.find(p=>p.id===compare[1])!.coords)} 公里 · 示意连线，不是行程</span>:<span>再选一处地点，点击“加入两地比较”</span>}</div>{compare.length===2&&<button onClick={()=>move(compare)}>同时定位</button>}<button aria-label="清除比较" onClick={()=>setCompare([])}><X size={16}/></button></div>}
        {message&&<div className="g-toast" role="status">{message}</div>}
      </section>
    </div>

    <footer className="g-footer"><div className="g-time-label"><span className="g-kicker">当前历史场景</span><strong>公元前 <b>431</b> 年</strong></div><div className="g-time-track"><span className="g-time-line"/><div className="g-time-point"><i/><strong>伯罗奔尼撒战争开端</strong><small>本版仅含开战之初的一个资料场景</small></div></div><div className="g-step-control"><button aria-label="上一个阅读引导" disabled={step===0} onClick={()=>chooseStep(step-1)}><ArrowLeft size={17}/></button><span>{step+1} / {readingSteps.length}</span><button aria-label="下一个阅读引导" disabled={step===2} onClick={()=>chooseStep(step+1)}><ArrowRight size={17}/></button></div></footer>

    <dialog className="g-source-dialog" ref={sourceDialog} onClose={()=>setSourceOpen(false)}><button className="g-close" autoFocus aria-label="关闭资料说明" onClick={()=>setSourceOpen(false)}><X size={20}/></button><span className="g-kicker">资料与精度</span><h2>让地图有据可查</h2><p>这是一个古希腊伴读样本，收录 26 个地点与开战之初的部分政治关系。地图没有逐年重建的疆界，也没有完整的居民分布。</p><ul><li><a href="https://pleiades.stoa.org/downloads" target="_blank" rel="noreferrer">Pleiades 古代地名资料</a><p>地点代表坐标，2026-09-07 提取；保留原记录的精度分类。CC BY 3.0，署名 Pleiades contributors。</p></li><li><a href={sourceWar} target="_blank" rel="noreferrer">修昔底德《伯罗奔尼撒战争史》第二卷</a><p>2.2–6：普拉提亚事件；2.9：双方盟友；2.13–17：雅典的准备与阿提卡。地域性列举与逐城点名在详情中区分。</p></li><li><a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noreferrer">Mapzen / AWS 地形数据</a><p>现代高程与水深数据，已缓存至第 9 级，共 763 张地形及 763 张原始高程图块。立体高度放大 4 倍；按海拔、水深设色，不代表古代植被、港口或精确海岸。</p></li><li><a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noreferrer">Natural Earth 底图</a><p>区域外陆地底图与现代国界用于空间对照，公共领域；区域内的陆海颜色来自高程数据，不是历史疆界来源。</p></li></ul><p className="g-detail-fine">两套阅读材料暂按主题关联，尚未建立逐章、逐讲对应。中文简介为伴读整理，可返回来源核查。</p></dialog>
  </main>;
}
