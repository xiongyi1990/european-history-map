export type Coordinate = [number, number];
export interface BattleStop { name:string; coords:Coordinate }
export interface BattleStage {
  title:string; date:string; text:string; side:string; color:string;
  stops:BattleStop[]; path:Coordinate[]; source:string; sections:string;
}
export interface Battle { id:string; title:string; period:string; question:string; caveat:string; stages:BattleStage[] }
const h6='https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D6';
const h7='https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7d%2A.html';
const h8='https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D8';
const t6='https://classics.mit.edu/Thucydides/pelopwar.6.sixth.html';
const t7='https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0200%3Abook%3D7';
const greek='#f4d27d', persian='#f39970';
const stop=(name:string,coords:Coordinate):BattleStop=>({name,coords});
const athens:Coordinate=[23.727,37.975], marathon:Coordinate=[23.978,38.118], phaleron:Coordinate=[23.69,37.925];
const pass:Coordinate=[22.536,38.797], trachis:Coordinate=[22.456,38.797];
const strait:Coordinate=[23.566,37.945], salamis:Coordinate=[23.532,37.949];
const piraeus:Coordinate=[23.633,37.935], corcyra:Coordinate=[19.923,39.613], rhegium:Coordinate=[15.64,38.11], catana:Coordinate=[15.096,37.502], syracuse:Coordinate=[15.284,37.06];

// Coordinates are editorial geographic reference points, not surveyed ancient tracks.
// Only named stops are historical narrative anchors; intermediate path vertices shape schematic lines.
export const battles:Battle[]=[
  {id:'marathon',title:'马拉松战役',period:'前 490 年',question:'海上进攻与陆上回援，怎样形成一场时间竞争？',
    caveat:'马拉松标记代表平原一带，不是现代马拉松城镇，也不是已确认的双方战线。省略波斯舰队接回俘虏等支线；不重建精确登陆点。',stages:[
      {title:'波斯军渡向马拉松',date:'前 490 年 · 战前',side:'波斯军 · 海路',color:persian,text:'攻陷埃雷特里亚后，波斯军渡海来到阿提卡的马拉松一带。先看优卑亚岛与阿提卡之间的距离，再读战役的展开。',stops:[stop('埃雷特里亚',[23.795,38.392]),stop('马拉松平原',marathon)],path:[[23.795,38.392],[24.025,38.34],[24.07,38.2],marathon],source:h6,sections:'希罗多德 6.100–102'},
      {title:'雅典军前往迎战',date:'前 490 年 · 交战',side:'雅典军 · 陆路',color:greek,text:'雅典军前往马拉松，普拉提亚人加入。雅典与普拉提亚联军在平原上击败波斯军；此处只画雅典军前往战场的方向，不画未核实的阵形。',stops:[stop('雅典',athens),stop('马拉松平原',marathon)],path:[athens,[23.84,38.035],marathon],source:h6,sections:'希罗多德 6.103、108、112–114'},
      {title:'舰队绕过苏尼翁角',date:'前 490 年 · 战后',side:'波斯舰队 · 海路',color:persian,text:'战败后，波斯舰队绕过阿提卡南端的苏尼翁角，试图先于雅典军抵达雅典附近。曲折的海路让半岛形状变成理解战局的关键。',stops:[stop('马拉松平原',marathon),stop('苏尼翁角',[24.025,37.651]),stop('法勒隆海域',phaleron)],path:[marathon,[24.08,38.09],[24.14,37.84],[24.07,37.62],[23.98,37.61],[23.76,37.76],phaleron],source:h6,sections:'希罗多德 6.115–116'},
      {title:'雅典军回援城市',date:'前 490 年 · 战后',side:'雅典军 · 陆路',color:greek,text:'希罗多德记述，雅典军及时赶回，早于波斯舰队抵达；舰队在法勒隆外停泊后撤回亚洲。图上两条路线的差别不等于已知行军用时。',stops:[stop('马拉松平原',marathon),stop('雅典',athens)],path:[marathon,[23.84,38.035],athens],source:h6,sections:'希罗多德 6.116'},
    ]},
  {id:'thermopylae',title:'温泉关战役',period:'前 480 年',question:'守住隘口以后，为什么仍会被绕到背后？',caveat:'今天的海岸已不在古代隘口旁。山路只示意“绕过山体、到达守军后方”的关系，折点不代表已定位的阿诺帕亚古道；不要把现代陆地宽度当作古战场宽度。',stages:[
    {title:'波斯军接近隘口',date:'前 480 年 · 战前',side:'波斯军 · 陆路',color:persian,text:'薛西斯的军队来到特拉基斯一带，对面是希腊联军守卫的温泉关。先认识山体与关口的位置，再理解为什么联军选择在此防守。',stops:[stop('特拉基斯一带',trachis),stop('温泉关',pass)],path:[trachis,[22.49,38.807],pass],source:h7,sections:'希罗多德 7.198–203'},
    {title:'联军扼守正面',date:'前 480 年 · 正面交战',side:'希腊联军 · 守势',color:greek,text:'列奥尼达率领的守军包括多个希腊城邦的部队。联军在关口抵挡正面攻击；这里的短线表示面向来敌的防御方向，不是阵列长度。',stops:[stop('关口后方（示意）',[22.552,38.795]),stop('温泉关',pass)],path:[[22.552,38.795],pass],source:h7,sections:'希罗多德 7.202–212'},
    {title:'山路迂回到后方',date:'前 480 年 · 迂回与失守',side:'波斯军 · 山路示意',color:persian,text:'据希罗多德，厄菲阿尔特斯告知山路，许达尔涅斯率军绕行至守军后方。联军部分撤离，留下的守军最终被击败。路线只解释前后夹击，不重建夜行古道。',stops:[stop('特拉基斯一带',trachis),stop('关口后方（示意）',[22.57,38.79])],path:[trachis,[22.445,38.771],[22.49,38.751],[22.545,38.765],[22.57,38.79]],source:h7,sections:'希罗多德 7.213–218、219–225'},
  ]},
  {id:'salamis',title:'萨拉米斯海战',period:'前 480 年',question:'开阔海面与狭窄水道，给舰队带来什么不同？',caveat:'海峡标记代表作战水域的大致位置。舰队具体排列、封锁范围与开战机动仍有争论，本图不画成确定的战术复原。',stages:[
    {title:'希腊舰队集结于岛侧',date:'前 480 年 · 战前',side:'希腊联军舰队',color:greek,text:'从阿耳忒弥西翁撤下后，希腊舰队来到萨拉米斯。本阶段只展示萨拉米斯附近的集结水域与海峡关系，不绘制那段长距离撤航。',stops:[stop('萨拉米斯岛侧水域',salamis),stop('海峡作战水域',strait)],path:[salamis,[23.55,37.956],strait],source:h8,sections:'希罗多德 8.40–48；局部方向为示意'},
    {title:'波斯舰队从法勒隆逼近',date:'前 480 年 · 战前部署',side:'波斯舰队',color:persian,text:'波斯舰队到达法勒隆后，奉命向萨拉米斯出动。看清法勒隆、比雷埃夫斯半岛和海峡之间的位置，便能理解作战水域为何重要。',stops:[stop('法勒隆海域',phaleron),stop('海峡入口',[23.588,37.926])],path:[phaleron,[23.676,37.89],[23.61,37.887],[23.578,37.911],[23.588,37.926]],source:h8,sections:'希罗多德 8.66–70'},
    {title:'舰队在狭水域交战',date:'前 480 年 · 海战',side:'波斯舰队 · 接敌方向',color:persian,text:'双方在萨拉米斯附近交战，希腊舰队获胜。箭头仅表示从外海接近海峡的方向，不代表某一支舰队的精确冲锋轨迹或全部参战船只。',stops:[stop('海峡入口',[23.588,37.926]),stop('海峡作战水域',strait)],path:[[23.588,37.926],strait],source:h8,sections:'希罗多德 8.83–96'},
  ]},
  {id:'sicily',title:'西西里远征',period:'前 415—413 年',question:'雅典为什么会在远离爱琴海的地方遭受重创？',caveat:'这是远征的主要节点摘要，不是两年内每次航行的完整轨迹。跨海折线省略部分停靠与往返；最后阶段只说明结局，不假定已知撤退路线。',stages:[
    {title:'从比雷埃夫斯驶向科西拉',date:'前 415 年 · 出航',side:'雅典及盟军舰队',color:greek,text:'远征军从比雷埃夫斯出发，与盟军在科西拉会合。绕过伯罗奔尼撒的海路在图上作概括表示，先体会这次行动与雅典本土的空间距离。',stops:[stop('比雷埃夫斯',piraeus),stop('科西拉',corcyra)],path:[piraeus,[23.6,37.5],[23.22,36.35],[22.92,36.26],[22.25,36.26],[21.55,36.55],[21.1,37.25],[20.65,38.25],[20.1,39.2],corcyra],source:t6,sections:'修昔底德 6.30–32、42–43'},
    {title:'横渡伊奥尼亚海',date:'前 415 年 · 意大利沿岸',side:'雅典及盟军舰队',color:greek,text:'舰队横渡伊奥尼亚海，经意大利沿岸到达雷吉翁。修昔底德记述沿途城市接纳态度不一，补给与停泊并非理所当然。',stops:[stop('科西拉',corcyra),stop('雷吉翁',rhegium)],path:[corcyra,[18.4,39.75],[17.95,39.8],[17.35,39.1],[17.3,38.85],[16.8,38.35],[16.25,37.85],[15.7,37.84],rhegium],source:t6,sections:'修昔底德 6.43–44；沿岸中间停靠省略'},
    {title:'在卡塔那建立据点',date:'前 415 年 · 抵达西西里',side:'雅典及盟军舰队',color:greek,text:'经过交涉和行动，雅典军得以利用卡塔那作为据点。雷吉翁、卡塔那与叙拉古的位置，构成理解远征初期行动的基础。',stops:[stop('雷吉翁',rhegium),stop('卡塔那',catana)],path:[rhegium,[15.57,38.05],[15.35,37.82],[15.19,37.55],catana],source:t6,sections:'修昔底德 6.50–52；省略中间往返'},
    {title:'逼近叙拉古',date:'前 415 年 · 初期行动',side:'雅典及盟军舰队',color:greek,text:'舰队从卡塔那沿岸行动，来到叙拉古附近。此线概括初期南下航行，不把后续围城、援军到来和多次海战压成一条连续航迹。',stops:[stop('卡塔那',catana),stop('叙拉古',syracuse)],path:[catana,[15.25,37.4],[15.32,37.28],[15.36,37.1],syracuse],source:t6,sections:'修昔底德 6.52'},
    {title:'远征以失败告终',date:'前 413 年 · 结局',side:'雅典远征军',color:greek,text:'经历围城与海战后，雅典军撤退失败，远征遭到毁灭性打击。本阶段保留叙拉古位置，不绘制尚未核实的陆上撤退路径。',stops:[stop('叙拉古',syracuse)],path:[],source:t7,sections:'修昔底德 7.72–87'},
  ]},
];

export function clampBattleStep(battle:Battle,value:unknown){const n=Number(value);return Number.isInteger(n)?Math.max(0,Math.min(battle.stages.length-1,n)):0}
export function battleCoordinates(battle:Battle):Coordinate[]{return battle.stages.flatMap(s=>[...s.path,...s.stops.map(p=>p.coords)])}
export function battleRoutes(battle:Battle,step:number):GeoJSON.FeatureCollection{
  return {type:'FeatureCollection',features:battle.stages.slice(0,clampBattleStep(battle,step)+1).filter(s=>s.path.length>1).map(s=>({type:'Feature',properties:{color:s.color,active:s===battle.stages[step]},geometry:{type:'LineString',coordinates:s.path}}))};
}
