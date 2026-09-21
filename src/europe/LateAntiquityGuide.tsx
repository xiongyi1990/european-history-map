import {roman300Guide} from './roman-300';
import {courseSources} from './course-sources';
import {carolingianGuides} from './carolingian-details';
import {millenniumGuides} from './turn-of-millennium';
import {normanGuides} from './norman-century';
export interface ReadingGuide {
 title:string;orientation:string;people:string;reading:string;source:keyof typeof courseSources;places:[string,string][];
 realms?:{name:string;time:string;regions:string;source:keyof typeof courseSources;places:[string,string][]}[];
}
export const periodGuides:Record<number,ReadingGuide>={
 ...carolingianGuides,
 ...millenniumGuides,
 ...normanGuides,
 600:{title:'600 年：意大利分治，西哥特王都在托莱多',orientation:'在意大利先看帕维亚的伦巴第王权、拉文纳的东罗马总督和罗马主教，再向西找到伊比利亚内陆的托莱多。地中海南岸的迦太基和埃及此时仍属东罗马。',people:'教士、地方罗马居民与伦巴第统治集团并存；国王的身份不能代替当地全部人口。罗马教会参与救济和交涉，也不意味着八世纪的教皇国已提前建立。',reading:'第 135 讲「大格列高利」、第 145 讲「意大利 600 年」、第 148 讲「西班牙」· PDF 1137—1143、1216—1222、1238—1246 页',source:'gregoryEarly',places:[['pavia','伦巴第王权 → 帕维亚'],['ravenna','东罗马总督 → 拉文纳'],['rome','大格列高利 → 罗马'],['toledo','西哥特王都 → 托莱多'],['carthage','东罗马北非 → 迦太基'],['alexandria','东罗马埃及 → 亚历山大里亚']]},
 700:{title:'700 年：东地中海南岸易主，伊比利亚尚未被征服',orientation:'大马士革是倭马亚王朝的政治中心，亚历山大里亚、耶路撒冷已不属东罗马，北非内陆出现凯鲁万。托莱多仍属西哥特王国，711 年的征服尚未发生；君士坦丁堡的东罗马继续存在。',people:'政治归属改变后，基督徒、犹太人及不同地方社群仍持续存在。阿拉伯语的行政地位、伊斯兰信仰的传播和居民身份变化不能画成同一条边界。',reading:'第 148 讲「西班牙」、第 149 讲「阿拉伯帝国」、第 150 讲「迪旺制」· PDF 1238—1246、1247—1255、1256—1263 页',source:'transitionEarly',places:[['damascus','倭马亚都城 → 大马士革'],['alexandria','埃及港口 → 亚历山大里亚'],['jerusalem','圣城 → 耶路撒冷'],['kairouan','北非内陆基地 → 凯鲁万'],['toledo','西哥特仍存 → 托莱多'],['pavia','伦巴第仍存 → 帕维亚'],['byzantium','东罗马继续 → 君士坦丁堡']]},
 300:roman300Guide,
 400:{title:'400 年：把两部朝廷与区域中心一起看',orientation:'西部朝廷仍在米兰，402 年才迁往拉文纳；东部中心在君士坦丁堡。迦太基、亚历山大里亚位于地中海南岸，安条克位于东岸。不列颠的罗马行政统治尚未结束。',people:'希波的主教、北非城市居民、帝国官员和军队属于不同社会群体。宗教、语言与帝国归属在地图上分别说明。',reading:'第 99 讲「君士坦丁（上）」与第 113 讲「狄奥多西」· PDF 799—805、955—962 页',source:'byzantine',places:[['milan','米兰：西部朝廷'],['byzantium','君士坦丁堡：东部朝廷'],['carthage','迦太基：北非港口'],['hippo','希波：奥古斯丁'],['alexandria','亚历山大里亚：埃及'],['antioch','安条克：叙利亚'],['london','伦底尼乌姆：不列颠']]},
 500:{title:'500 年：西部诸王国与延续的东罗马',orientation:'沿地图从北向南比较：图尔奈的法兰克、里昂的勃艮第、图卢兹的西哥特、拉文纳的东哥特，再跨海到迦太基的汪达尔。君士坦丁堡仍是东罗马的都城。',people:'新王国的统治集团与地方罗马社会并存。例如汪达尔统治者仍依靠罗马化的北非精英维持地方制度；阿里乌派是宗教派别，不是人种。',reading:'第 133 讲「蛮族王国」与第 138 讲「墨洛温王朝」· PDF 1123—1129、1159—1168 页',source:'africaVandal',places:[['tournai','法兰克 → 图尔奈'],['lyon','勃艮第 → 里昂'],['toulouse','西哥特 → 图卢兹'],['ravenna','东哥特 → 拉文纳'],['carthage','汪达尔 → 迦太基'],['byzantium','东罗马 → 君士坦丁堡']]},
};
export function LateAntiquityGuide({year,onPlace,onYear}:{year:number;onPlace:(id:string)=>void;onYear:(year:number)=>void}){
 const guide=periodGuides[year];if(!guide)return null;
 return <section className="late-guide" aria-label="古代晚期与中世纪阅读导览">
  <h2>{guide.title}</h2><p>{guide.orientation}</p>
  <div className="h-site-links">{guide.places.map(([id,name])=><button key={id} onClick={()=>onPlace(id)}>{name}<span>定位并阅读 →</span></button>)}</div>
  {guide.realms&&<section aria-label="政权与地域组成" className="late-realms"><h3>政权包含哪些地域？</h3>{guide.realms.map(realm=><article key={realm.name}>
   <h4>{realm.name}</h4><small>{realm.time}</small><p>{realm.regions}</p>
   <div className="h-site-links">{realm.places.map(([id,label])=><button key={id} onClick={()=>onPlace(id)}>{label}<span>定位并阅读 →</span></button>)}</div>
   <a href={courseSources[realm.source].url} target="_blank" rel="noreferrer">地域资料 ↗</a>
  </article>)}</section>}
  <h3>当时的居民</h3><p>{guide.people}</p><p className="late-reading">顾衡课程关联：{guide.reading}</p>
  <a href={courseSources[guide.source].url} target="_blank" rel="noreferrer">核对资料：{courseSources[guide.source].title} ↗</a>
  <p>比较已补充的时点</p><div className="late-year-links">{Object.keys(periodGuides).map(Number).sort((a,b)=>a-b).map(y=><button key={y} aria-pressed={year===y} onClick={()=>onYear(y)}>{y} 年</button>)}</div>
  <small>地点详情按适用年代显示；地图色块仍是参考疆界，未新增精确行政区或族群分布边界。</small>
 </section>;
}
