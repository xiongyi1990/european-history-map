import type {BoundaryContext} from './roman-300-boundaries';

export interface Boundary1914Correction {
 context:BoundaryContext;
 subject?:string;
 colorSubject?:string;
 kind?:'polity'|'reference';
 categoryLabel?:string;
}

export const boundary1914Sources={
 finland:{title:'芬兰官方：自治大公国与1917年独立',url:'https://finland.fi/life-society/main-outlines-of-finnish-history/'},
 georgia:{title:'格鲁吉亚官方法律库：1918年独立法案及俄国统治背景',url:'https://www.matsne.gov.ge/ka/document/view/4801451'},
 armenia:{title:'美国国务院史家办公室：亚美尼亚共和国与此前的俄国、奥斯曼归属',url:'https://history.state.gov/countries/armenia'},
 azerbaijan:{title:'美国国务院史家办公室：俄国解体后的阿塞拜疆独立',url:'https://history.state.gov/countries/azerbaijan'},
 malta:{title:'马耳他议会：1814年英国属地与1964年独立',url:'https://parlament.mt/en/menues/about-parliament/how-parliament-works/historical-background/'},
 iceland:{title:'冰岛议会：1874—1918年与丹麦共同事务及1918年立法权变化',url:'https://www.althingi.is/thingmenn/althingiskosningar/kosningar-og-kosningaurslit/kosningarrettur-kjorgengi-og-kjorsokn/'},
 icelandHomeRule:{title:'冰岛政府：1904—1918年自治时期',url:'https://www.stjornarradid.is/rikisstjorn/sogulegt-efni/heimastjorn-1904-1918/'},
 tunisia:{title:'法国外交档案：保护国下仍保留突尼斯国家',url:'https://www.diplomatie.gouv.fr/fr/archives-bibliotheque/effectuer-des-recherches-genealogiques-ou-familiales/l-etat-civil-des-francais-a-l-etranger'},
 tunisiaDates:{title:'突尼斯政府：1881年保护国与1956年独立',url:'https://www.tunisie.gov.tn/155-d%C3%A9couvrir-la-tunisie.htm'},
 morocco:{title:'西班牙陆军博物馆：1912—1956年法西各自保护区与苏丹政府',url:'https://ejercito.defensa.gob.es/museo/exposiciones/exposicion_temporal/realizadas/exposiciones/espana_en_marruecos.html'},
};

// These annotations repair political interpretation of the 1914 source snapshot.
// The retained source polygons are not newly verified 1914 administrative borders.
export const boundary1914Corrections:Record<string,Boundary1914Correction>={
 Finland:{
  subject:'Russia',colorSubject:'Russia',kind:'polity',categoryLabel:'自治大公国（非独立国家）',
  context:{name:'芬兰大公国（俄国自治）',membership:'俄罗斯帝国下的自治大公国',note:'1809—1917 年为俄国统治下的自治大公国，俄罗斯皇帝兼任芬兰大公，芬兰保有自身制度。1917 年 12 月 6 日的独立不能提前到 1914 年。原轮廓只帮助定位芬兰方向，未重新核定为 1914 年大公国行政边界；不据此判定每一块边地的当年归属。',places:[],source:boundary1914Sources.finland.url},
 },
 Georgia:{
  subject:'Russia',colorSubject:'Russia',kind:'polity',categoryLabel:'帝国治下的历史地域',
  context:{name:'俄国治下的格鲁吉亚地域',membership:'俄罗斯帝国的高加索统治体系；非独立格鲁吉亚国家',note:'1914 年本区处于俄罗斯帝国统治之下，不能把 1918 年 5 月 26 日宣布独立的民主共和国提前显示。格鲁吉亚是这里的历史地域定位名称，不是 1914 年一个同名独立国家或已核定的完整行政区。原几何未按当年省区、边地或现代争议重新划界。',places:[],source:boundary1914Sources.georgia.url},
 },
 Azerbaijan:{
  subject:'Russia',colorSubject:'Russia',kind:'polity',categoryLabel:'帝国治下的高加索地域',
  context:{name:'俄国治下的东外高加索地域',membership:'俄罗斯帝国的高加索统治体系；非独立阿塞拜疆共和国',note:'原资料写作 Azerbaijan，用于寻找今天阿塞拜疆方向。1914 年的政治背景是俄国统治的高加索地域，不把俄国帝国解体后出现的独立共和国提前。现有轮廓不作 1914 年行政省界，也不表示整个历史“阿塞拜疆”地域都属于俄国或居民只有一种身份。',places:[],source:boundary1914Sources.azerbaijan.url},
 },
 Malta:{
  subject:'United Kingdom of Great Britain and Ireland',colorSubject:'United Kingdom of Great Britain and Ireland',kind:'polity',categoryLabel:'英国王室殖民地',
  context:{name:'马耳他（英国王室殖民地）',membership:'大不列颠及爱尔兰联合王国的王室殖民地',note:'1814 年后为英国属地，1914 年不能与英国并列成独立的马耳他国家。1964 年独立与 1974 年共和国属于后续阶段。岛屿轮廓用于地理定位，不表示已逐项复原当年港区、军事设施或地方行政范围。',places:[],source:boundary1914Sources.malta.url},
 },
 Iceland:{
  subject:'Denmark',colorSubject:'Denmark',kind:'polity',categoryLabel:'丹麦统治下的自治地区',
  context:{name:'冰岛（丹麦统治下自治）',membership:'丹麦统治下的冰岛自治；尚非1918年后的主权共君王国',note:'冰岛于 1904 年取得内政自治，部长驻雷克雅未克；1914 年的自治不等于已经取得 1918 年后的主权国家地位。与丹麦的共同事务、1918 年立法权变化及 1944 年共和国另作阶段理解。现有岛屿轮廓不复原当年海域权利或精确行政界线。',places:[],source:boundary1914Sources.iceland.url},
 },
 Tunisia:{
  subject:'France',colorSubject:'France',kind:'polity',categoryLabel:'法国保护国（保留贝伊国层次）',
  context:{name:'突尼斯（法国保护国）',membership:'法国保护下的突尼斯贝伊国；非法国本土省',note:'1881 年建立法国保护关系，同时保留突尼斯国家和贝伊统治层次。与法国同色表达保护关系，不表示普通法国本土省或全体居民身份相同。1956 年独立属于后续阶段；原边缘仍为概略轮廓，未逐项核定当年地方治理。',places:[],source:boundary1914Sources.tunisia.url},
 },
 'Spanish Morocco':{
  subject:'Spain',colorSubject:'Spain',kind:'polity',categoryLabel:'西班牙保护区（保留苏丹层次）',
  context:{name:'西班牙在摩洛哥的保护区（概略）',membership:'西班牙保护关系与苏丹层次并存；非西班牙本土省',note:'1912 年法西在各自影响区建立保护安排，本条按西班牙在摩洛哥的保护区理解。苏丹层次、保护国框架与地方实际治理不同，不是独立的西属摩洛哥国家，也不是普通西班牙本土省。原几何未精核，不代表西班牙全部保护区的准确边缘或稳定军事实控。',places:[],source:boundary1914Sources.morocco.url},
 },
 Morocco:{
  kind:'reference',categoryLabel:'多方保护关系地域（参考）',
  context:{name:'摩洛哥（法西保护关系参考）',membership:'苏丹层次与法国、西班牙各自保护区；非单一国家的整片直辖区',note:'1912 年法西安排形成不同保护区，并保留苏丹政府层次。原资料这一块 Morocco 多边形未核定能否对应某个完整保护区，不能整块据名归为独立国家或法国直辖，降为文化与其他区域参考。本条不重绘法西分界、全部地方实际控制或丹吉尔制度；原图另列的 Spanish Morocco 用单独保护区说明；其他边缘与地方实际控制仍待核查。',places:[],source:boundary1914Sources.morocco.url,reference:true},
 },
 Armenia:{
  kind:'reference',categoryLabel:'跨帝国历史地域（参考）',
  context:{name:'亚美尼亚地域（跨帝国参考）',membership:'历史亚美尼亚地域与社群跨俄国、奥斯曼；非1914年独立国家',note:'1914 年不能按原资料的 Armenia 名称生成一个独立亚美尼亚共和国。历史地域与社群分布跨俄罗斯和奥斯曼帝国，不能整块涂成俄国直辖。1918—1920 年共和国属于后续阶段；现有多边形既不复原两帝国的分界，也不是全部亚美尼亚居民分布，降为文化与其他区域参考。',places:[],source:boundary1914Sources.armenia.url,reference:true},
 },
};

export function boundary1914Correction(original:string,snapshotYear?:number):Boundary1914Correction|undefined {
 return snapshotYear===1914&&Object.prototype.hasOwnProperty.call(boundary1914Corrections,original)?boundary1914Corrections[original]:undefined;
}
