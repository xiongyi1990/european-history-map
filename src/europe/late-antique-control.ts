import type {courseSources} from './course-sources';

export type ControlMoment='before'|'after';
export const controlPowers={
 dynasty:{name:'狄奥多西王朝的罗马共治',color:'#8a633e'},
 west:{name:'罗马西部朝廷',color:'#a55632'},
 east:{name:'罗马东方朝廷',color:'#7154a1'},
 vandal:{name:'汪达尔王权',color:'#167e79'},
 gothic:{name:'西哥特王权',color:'#a15d83'},
 odoacer:{name:'奥多亚克的意大利王权',color:'#b66d1a'},
 theodoric:{name:'狄奥多里克的意大利王权',color:'#316da6'},
 nepos:{name:'尼波斯的达尔马提亚政权',color:'#687637'},
 persia:{name:'萨珊帝国',color:'#676f82'},
 contested:{name:'战争末段的意大利（逐城控制待核）',color:'#72777e'},
} as const;
export type ControlPower=keyof typeof controlPowers;
export interface ControlAnchor {
 placeId:string;region:string;before:ControlPower;after:ControlPower;note:string;
 changed?:boolean;beforeStatus?:string;afterStatus?:string;
}
export interface ControlTransition {
 year:number;title:string;beforeLabel:string;afterLabel:string;summary:string;
 limit:string;sources:(keyof typeof courseSources)[];anchors:ControlAnchor[];
}
const same=(placeId:string,region:string,power:ControlPower,note:string):ControlAnchor=>({placeId,region,before:power,after:power,note});
const change=(placeId:string,region:string,before:ControlPower,after:ControlPower,note:string):ControlAnchor=>({placeId,region,before,after,note,changed:true});
const eastern=()=>[
 same('byzantium','thrace','east','君士坦丁堡定位罗马东方的宫廷；意大利的政权变化不表示东方朝廷同时结束。'),
 same('alexandria','egypt','east','亚历山大里亚位于埃及，不与迦太基所在的西部北非合成一个政权。'),
 same('antioch','levant','east','安条克是东方地中海的重要城市。点的颜色不表示居民只使用一种语言。'),
];
const rivals=()=>[
 same('nisibis','mesopotamia','persia','尼西比斯自363年交城后属于萨珊；上两河的城市不能整片染成罗马一色。'),
 same('ctesiphon','asoristan','persia','泰西封是萨珊王廷节点，位于今伊拉克两河低地。'),
];
// Curated city control, not territory polygons. No year is silently borrowed or interpolated.
export const controlTransitions:ControlTransition[]=[
 {year:395,title:'两部宫廷继承：西部与东方',beforeLabel:'1月继承前',afterLabel:'继承后',
  summary:'狄奥多西一世去世后，霍诺留与阿卡狄乌斯分别执掌西部和东方。两人此前已经拥有奥古斯都头衔；这里对照的是王朝内的权力继承，不把395年解释为两个现代民族国家突然诞生。',
  limit:'城市点展示两部朝廷的归属。伊利里库姆的行政归属和军政争议需要另核，未据几座城市画出一条精确分界线。',sources:['theodosius4','arcadius400','honorius400','nisibis300'],anchors:[
   ...['rome','milan','ravenna'].map(id=>change(id,'italy','dynasty','west','意大利的西部朝廷由霍诺留继承；395年的常驻宫廷参照是米兰，拉文纳的迁驻在402年。')),
   change('arles','gaul','dynasty','west','高卢的阿尔勒属于西部军政空间；不把418年后的图卢兹王权提前到395年。'),
   change('london','britain','dynasty','west','罗马不列颠属于西部；五世纪初的中央退出尚未发生。'),
   change('carthage','africa','dynasty','west','迦太基属于西部北非；439年的汪达尔夺城尚未发生。'),
   ...eastern().map(a=>({...a,before:'dynasty' as const,changed:true})),
   change('thessaloniki','greece','dynasty','east','塞萨洛尼基定位东方的希腊—马其顿地域；不据此推定整个巴尔干毫无争议。'),...rivals(),
  ]},
 {year:410,title:'罗马被劫掠：攻城与政权更替分开',beforeLabel:'8月劫掠前',afterLabel:'劫掠后',
  summary:'阿拉里克的军队进入并劫掠罗马，随后离开。霍诺留的朝廷仍在拉文纳，罗马没有因此成为永久的西哥特王都。战争事件与城市长期归属分别显示。',
  limit:'本对照不把劫掠路线染成西哥特国土，也不把不列颠及高卢同年的变化强行放在8月同一天。',sources:['honorius400','romeSack410Control'],anchors:[
   {...same('rome','italy','west','劫掠改变城市处境，但不等于持久领土交接。'),changed:true,beforeStatus:'劫掠前',afterStatus:'遭劫掠后'},
   same('ravenna','italy','west','拉文纳仍是霍诺留的朝廷所在；罗马城与西部宫廷不是同一位置。'),
   same('milan','italy','west','米兰是北意大利节点；本专题未重建各支军队的控制前线。'),
   same('carthage','africa','west','迦太基仍属于罗马西部北非；汪达尔渡海与夺城分别在更晚年份。'),...eastern(),...rivals(),
  ]},
 {year:439,title:'迦太基易手：西部失去北非核心城市',beforeLabel:'10月夺城前',afterLabel:'夺城后',
  summary:'盖萨里克取得迦太基。429年进入北非、435年的阶段性安排、439年夺城和442年和约是不同节点；夺取一座核心城市不证明整片北非在同一天易手。',
  limit:'只确认本组城市的政治背景；435年安置区、439年扩张前线、毛里塔尼亚内陆和沿海地方势力不据百年快照推算。',sources:['africaLate','procopius5','vandalTreaty5'],anchors:[
   change('carthage','carthage-region5','west','vandal','迦太基由罗马西部转入盖萨里克王权；442年的和约承认尚未发生。'),
   same('rome','italy','west','意大利仍有西部皇帝；失去迦太基不等于意大利同时退出帝国。'),
   same('ravenna','italy','west','拉文纳的西部朝廷与北非王权分别定位。'),
   same('toulouse','aquitaine5','gothic','图卢兹已是西哥特王权中心；不能把500年的完整版图提前用于439年。'),
   same('arles','provence5','west','阿尔勒仍在罗马西部军政体系；西哥特攻势与最终易手另看。'),...eastern(),...rivals(),
  ]},
 {year:442,title:'北非和约：控制与承认分开',beforeLabel:'和约前',afterLabel:'和约后',
  summary:'罗马与盖萨里克达成新的安排，承认其对北非核心地域的统治。迦太基在439年已经易手，所以本次切换改变的是和约状态，而不是再次夺城。',
  limit:'没有保存一条可直接采用的精确和约界线。本专题不把今突尼斯国界、整个北非或500年的岛屿势力范围当作442年条约范围。',sources:['africaLate','procopius5','vandalTreaty5'],anchors:[
   {...same('carthage','carthage-region5','vandal','439年的城市控制和442年的和约安排分别记录。'),changed:true,beforeStatus:'已控制，和约前',afterStatus:'和约后'},
   same('rome','italy','west','罗马属于意大利的西部军政空间，不是汪达尔王权领土。'),
   same('ravenna','italy','west','西部皇帝的朝廷仍在拉文纳。'),
   same('toulouse','aquitaine5','gothic','图卢兹的西哥特王权与北非和约不是同一统治体系。'),...eastern(),...rivals(),
  ]},
 {year:476,title:'意大利更替：达尔马提亚另看',beforeLabel:'8—9月更替前',afterLabel:'更替后',
  summary:'奥多亚克废黜罗慕路斯后掌握意大利。尼波斯仍在达尔马提亚主张西部皇位，至480年去世；实际控制、皇帝头衔和东方承认不能合成一条结论。',
  limit:'南高卢城市的交接纪年存在475—477年的记载差异，未在这组对照里整片判给一方；意大利外围及岛屿也未按500年轮廓回填。',sources:['romulusControl','neposControl','zeno5','provenance476Control'],anchors:[
   ...['rome','ravenna','milan'].map(id=>change(id,'italy','west','odoacer','意大利的宫廷与王权发生交接；不是所有罗马居民在同一天改变族群、语言或信仰。')),
   same('salona','pannonia','nepos','萨洛纳定位达尔马提亚的尼波斯；476年之后仍保有皇位主张，不能随意大利一起从地图删除。'),
   same('carthage','carthage-region5','vandal','北非核心城市早已由汪达尔王权统治，不随意大利的更替改变归属。'),
   same('toulouse','aquitaine5','gothic','图卢兹仍是西哥特中心；“西罗马结束”不表示所有西部地方从此属于奥多亚克。'),...eastern(),...rivals(),
  ]},
 {year:493,title:'拉文纳交接：狄奥多里克掌握意大利',beforeLabel:'拉文纳交接前',afterLabel:'交接后',
  summary:'经历489年进入意大利及多年战争，493年拉文纳交接，奥多亚克随后被杀，狄奥多里克取得意大利王权。事件前表示战事末段，不能当作奥多亚克仍稳定掌握全意大利。',
  limit:'战争末段各地控制并不一致，未为意大利每座城市强行设置同一天的交接。500年轮廓也不能证明493年所有岛屿和边区已经相同。',sources:['procopiusGothicControl','jordanesEnd5','veronaLate'],anchors:[
   change('ravenna','italy','odoacer','theodoric','事件前为拉文纳围城末段；交接、共同统治安排及杀死奥多亚克依次发生。'),
   {...change('rome','italy','contested','theodoric','罗马定位战争后期的意大利王权；事件前不宣称已核实城市控制，不按拉文纳的最后交接日在城市间机械复制。'),beforeStatus:'控制待核',afterStatus:'王权整合'},
   {...change('verona','italy','contested','theodoric','维罗纳是489年战事节点。事件前的逐城控制未在本组复原；493年的王权整合不是在这里重新打一次同样的交接战。'),beforeStatus:'控制待核',afterStatus:'王权整合'},
   same('carthage','carthage-region5','vandal','迦太基仍由汪达尔王权统治，意大利的王权不能替代北非归属。'),
   same('toulouse','aquitaine5','gothic','西哥特王权与意大利的哥特王权分别显示；“哥特”这个名称不表示两者为一个国家。'),...eastern(),...rivals(),
  ]},
];
export function controlTransitionAt(year:number){return controlTransitions.find(t=>t.year===year)}
export function controlAnchorAt(placeId:string,year:number,moment:ControlMoment){
 const anchor=controlTransitionAt(year)?.anchors.find(a=>a.placeId===placeId);
 if(!anchor)return;
 const power=controlPowers[anchor[moment]],status=moment==='before'?anchor.beforeStatus:anchor.afterStatus;
 return {...anchor,power,color:power.color,status};
}
