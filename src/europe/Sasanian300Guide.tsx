import {courseSources} from './course-sources';

export function Sasanian300Guide({onRuler,onFrontier}:{onRuler:(id:string)=>void;onFrontier:(id:string)=>void}){
 return <section aria-label="300 年罗马与萨珊对照">
  <h3>此时的君主：纳尔塞</h3>
  <div className="h-period"><strong>萨珊王朝：224—651 年</strong><span>纳尔塞在位：293—约 302／303 年。300 年仍在其统治期间；其退位年代存在纪年差异。</span></div>
  <p>西面是四帝共治的罗马帝国；东面是由“万王之王”统治的萨珊帝国。纳尔塞不是罗马的第五位共治皇帝，也不是帕提亚国王。</p>
  <h3>宫廷中心与王朝故乡不在同一处</h3>
  <p>泰西封在两河低地、今伊拉克境内，是王廷的重要驻地。法尔斯在更东南的伊朗山地，是王朝发源地；胡齐斯坦位于二者之间的西南低地。今天的伊拉克—伊朗国界不能当成古代帝国边界。</p>
  <h3>边境刚经历了什么？</h3>
  <p>纳尔塞与罗马交战，伽列里乌斯获胜，298／299 年和议后罗马在北部两河与亚美尼亚方向的地位加强。尼西比斯在 300 年属于罗马，泰西封属于萨珊；尼西比斯到 363 年才在另一场和议后转归萨珊。</p>
  <div className="h-related">
   <button onClick={()=>onRuler('galerius')}>罗马对手：伽列里乌斯<span>东方副帝与相关地域 →</span></button>
   <button onClick={()=>onRuler('diocletian')}>东方正帝：戴克里先<span>罗马东方的统治框架 →</span></button>
   <button onClick={()=>onFrontier('eastern-contact')}>罗马—萨珊接触地带<span>定位城市与和议前后变化 →</span></button>
  </div>
  <p className="e-note">王朝与居民分开理解：王室支持的祆教传统，并不意味着境内所有社群信奉同一宗教；语言背景见各地域卡片。</p>
  <details><summary>君主与边境资料</summary>{(['narseh300','nisibis300','sasanian300'] as const).map(key=><p key={key}><a href={courseSources[key].url} target="_blank" rel="noreferrer">{courseSources[key].title} ↗</a></p>)}</details>
 </section>;
}
