import {millenniumRealmFrames} from './millennium-realms';
import type {courseSources} from './course-sources';
type Source=keyof typeof courseSources;
export interface RealmRegion {name:string;location:string;status:string;places:[string,string][]}
export interface MedievalRealm {id:string;name:string;dates:string;status:string;regions:RealmRegion[];people:string;language:string;sources:Source[]}
export interface MedievalRealmFrame {year:number;title:string;note:string;realms:MedievalRealm[]}
const region=(name:string,location:string,status:string,...places:[string,string][]):RealmRegion=>({name,location,status,places});
const realm=(id:string,name:string,dates:string,status:string,regions:RealmRegion[],sources:Source[],people='统治者、驻军、教会与本地社会不是同一类身份；本卡没有全境人口比例。',language='没有可核对的全境语言分界；行政书写、宗教语言与日常口语分别理解。'):MedievalRealm=>({id,name,dates,status,regions,sources,people,language});
const noBorders='地域名称用于理解构成，城市仅作定位；不是完整属地清单、行政省界或新绘制的疆界。';
export const medievalRealmFrames:MedievalRealmFrame[]=[
 ...millenniumRealmFrames,
 {year:600,title:'600 年：东罗马、西哥特与伦巴第',note:noBorders,realms:[
 realm('eastern-rome','东罗马帝国','承接罗马帝国传统；本卡为 600 年状态','南部行省尚在；不能提前套用七世纪征服后的格局。',[
 region('海峡都城与安纳托利亚','博斯普鲁斯两岸与小亚细亚','帝国政治中心与东方腹地',['byzantium','君士坦丁堡'],['nicaea','尼西亚']),
 region('黎凡特与埃及','地中海东岸与尼罗河流域','重要南部行省，随后经历萨珊和阿拉伯征服',['jerusalem','耶路撒冷'],['alexandria','亚历山大里亚']),
 region('意大利与北非据点','亚得里亚海西岸及今天突尼斯沿海','非整片意大利或整个马格里布统一直辖',['ravenna','拉文纳'],['rome','罗马'],['carthage','迦太基']),
 ],['earlySouthernProvinces','earlyBalkans','gregoryEarly','africaVandal'],'基督教内部有多种传统，犹太社群亦存在；官方信仰不能代替居民构成。','约六世纪末至七世纪，希腊语在国家与教会事务中逐渐占主导；不代表每个行省都说同一种口语。'),
 realm('lombard','伦巴第王国','568—774 年的北部王权线索','帕维亚是王权中心，东罗马据点仍穿插其中。',[region('意大利北部','波河平原','不等于现代伦巴第大区或整个意大利',['pavia','帕维亚'],['milan','米兰'])],['paviaEarly','italyEarly']),
 realm('visigoth','西哥特王国','本卡为 600 年；711 年后进入征服与瓦解','王都在托莱多，仍跨比利牛斯保有纳博讷地区。',[region('伊比利亚内陆','塔霍河流域','王权中心',['toledo','托莱多']),region('山脉以北的沿海地带','今天法国南部','说明王国不能套用现代西班牙边界',['narbonne','纳博讷'])],['toledoEarly']),
 ]},
 {year:700,title:'700 年：东罗马收缩与南岸新秩序',note:noBorders,realms:[
 realm('eastern-rome','东罗马帝国','本卡为 700 年状态','埃及和黎凡特已脱离；拉文纳总督体系仍在。',[region('海峡与安纳托利亚','小亚细亚西北与博斯普鲁斯','朝廷及核心地域',['byzantium','君士坦丁堡'],['nicaea','尼西亚']),region('意大利据点','意大利东北与中部','拉文纳至 751 年仍是东罗马总督中心；不是全意大利',['ravenna','拉文纳'],['rome','罗马'])],['earlySouthernProvinces','earlyRavenna']),
 realm('umayyad','倭马亚哈里发国','东方王朝：661—750 年','朝廷在大马士革；此年尚未开始 711 年的伊比利亚征服。',[region('叙利亚与巴勒斯坦','地中海东岸','王朝腹地与宗教中心',['damascus','大马士革'],['jerusalem','耶路撒冷']),region('埃及','尼罗河三角洲','亚历山大里亚是港口，不能当作王朝首都',['alexandria','亚历山大里亚']),region('伊弗里基亚','今天突尼斯一带','凯鲁万内陆基地与迦太基原沿海中心不同',['kairouan','凯鲁万'],['carthage','迦太基'])],['timelineUmayyad','timelineEgypt','earlyCarthage'],'阿拉伯穆斯林统治集团与原有基督教、犹太等社群并存，不把居民整体归为一种祖源。','阿拉伯语成为官方语言，不能推出地方所有居民都以阿拉伯语为母语。'),
 realm('bulgaria','第一保加利亚国家','常用存续线索：681—1018 年','多瑙河以南形成独立政治中心。',[region('巴尔干东北部','多瑙河以南、黑海以西','王都普利斯卡；并非东罗马的一个普通行省',['pliska','普利斯卡'])],['earlyBalkans'],'保加尔人、斯拉夫社群等共同构成国家，政权名称不能替代全体居民祖源。'),
 realm('visigoth','西哥特王国','本卡为 700 年，711 年征服尚未发生','仍以托莱多为王权中心。',[region('伊比利亚与纳博讷地带','比利牛斯两侧','保留跨山脉的空间联系',['toledo','托莱多'],['narbonne','纳博讷'])],['toledoEarly']),
 ]},
 {year:750,title:'750 年：东方王朝更替',note:'按阿拔斯革命之后说明；巴格达此时尚未建立。'+noBorders,realms:[
 realm('abbasid','阿拔斯哈里发国','巴格达分支常用线索：750—1258 年','取代东方倭马亚朝廷，政治重心转向伊拉克。',[region('叙利亚与埃及','东地中海及尼罗河流域','地方政治归属变化；大马士革不再代表新的朝廷中心',['damascus','大马士革'],['alexandria','亚历山大里亚'])],['abbasid','timelineEgypt'],'宫廷与军事集团改变，不表示叙利亚、埃及居民同时更换。'),
 realm('franks','法兰克的墨洛温王权','墨洛温王朝在本地区延续至 751 年','丕平正式成为国王还在下一年。',[region('高卢的法兰克地区','今天法国及邻接地区','巴黎只作腹地城市参照，不认定为唯一首都',['paris','巴黎'])],['earlyFrankish']),
 realm('lombard','伦巴第王国','北部王权至 774 年','帕维亚是王都；拉文纳的最终征服在 751 年。',[region('意大利北部','波河平原','王权中心与下一年的征服目标分别定位',['pavia','帕维亚'])],['paviaEarly','earlyRavenna']),
 ]},
 {year:800,title:'800 年：多个权力中心并存',note:'按查理曼加冕之后说明；罗马加冕不等于恢复一个统一的地中海罗马帝国。'+noBorders,realms:[
 realm('carolingian','查理曼统治的法兰克与意大利王国','800 年加冕；843 年后形成分国格局','亚琛是宫廷中心，罗马是加冕地点。',[region('法兰克北部与西部','莱茵流域、高卢及邻接地区','王国地域与王室宫廷网络',['aachen','亚琛'],['paris','巴黎']),region('意大利王国部分','阿尔卑斯以南的意大利北部','774 年征服后的王权部分；不是全半岛',['pavia','帕维亚'])],['carolingian','italyEarly'],'法兰克王权覆盖不同地方社群；帝国称号不表示全境都是法兰克人。','宫廷、教会及学术书写使用拉丁文；这不是全体居民的母语统计。'),
 realm('abbasid','阿拔斯哈里发国','750—1258 年的王朝线索，实权随时期变化','巴格达已建立；萨迈拉迁都尚未发生。',[region('伊拉克与东方政治中心','底格里斯河流域','巴格达是新都',['baghdad','巴格达']),region('埃及','尼罗河流域','尚未进入 868 年开始的图伦地方王朝阶段',['alexandria','亚历山大里亚'])],['abbasid','timelineEgypt']),
 realm('cordoba','科尔多瓦埃米尔国','756—929 年的埃米尔称号阶段','独立于阿拔斯朝廷；不能提前称哈里发国。',[region('安达卢斯','伊比利亚半岛南部与相关控制区','不等于整个半岛',['cordoba','科尔多瓦'])],['umayyad']),
 realm('aghlabid','阿格拉布地方王朝','800—909 年；本卡为建立之后','治理伊弗里基亚，保留阿拔斯的名义权威。',[region('伊弗里基亚','今天突尼斯及邻接地区','地方王朝与巴格达宗主关系分开',['kairouan','凯鲁万'])],['africaVandal']),
 ]},
 {year:843,title:'843 年：凡尔登三分与东罗马',note:'三个加洛林分国是王朝权力分配，不是现代民族国界。'+noBorders,realms:[
 realm('west-francia','西法兰克','843 年分割后的西部王国','由秃头查理掌握；巴黎只是定位城市。',[region('西部高卢地域','中部王国以西','不要用今天法国边界直接替代',['paris','巴黎'])],['verdun']),
 realm('middle-francia','中部王国','843—855 年；855 年再次分割','洛泰尔一世获得皇帝称号与南北延伸的地域。',[region('低地与莱茵—默兹之间的北部地域','北海向南延伸','亚琛是北部王权中心',['aachen','亚琛']),region('勃艮第与罗讷河方向','连接北部与阿尔卑斯','里昂是位置参照',['lyon','里昂']),region('意大利王国部分','阿尔卑斯以南','帕维亚与亚琛同属一个中部政治体系，并非两个现代国家',['pavia','帕维亚'])],['verdun']),
 realm('east-francia','东法兰克','843 年分割后的东部王国','由日耳曼人路易掌握，不等于普鲁士或现代德国。',[region('莱茵以东与巴伐利亚等地域','多瑙河上游及邻接地区','雷根斯堡是宫廷与交通参照点',['regensburg','雷根斯堡'])],['verdun','regensburg']),
 realm('eastern-rome','东罗马帝国','本卡仅补 843 年都城与宗教政策','君士坦丁堡恢复圣像敬礼，与法兰克分国是两条同时发生的线索。',[region('博斯普鲁斯海峡都城','巴尔干与安纳托利亚相接处','这里只展开都城，不代表帝国全部属地',['byzantium','君士坦丁堡'])],['earlyIcons','earlyBalkans']),
 ]},
 {year:855,title:'855 年：只展开原中部王国的三个继承部分',note:'西、东法兰克继续存在；本组专门拆解原中部王国，不是本年全部欧洲政权。'+noBorders,realms:[
 realm('lotharingia','洛泰尔二世的北部王国','855 年分国后；869 年继承危机','后来称洛塔林吉亚，范围大于今天洛林。',[region('北海到阿尔卑斯的北部部分','低地、莱茵与默兹等地域','亚琛是定位点',['aachen','亚琛'])],['prum']),
 realm('provence','查理的普罗旺斯—勃艮第部分','855 年分国后的罗讷河地域','与北部王国、意大利分别继承。',[region('罗讷河地域与里昂','今天法国东南部方向','里昂用于定位，不画成现代行政大区',['lyon','里昂'],['arles','阿尔勒'])],['prum']),
 realm('italy','路易二世的意大利王国','855 年分国后的意大利部分','王国部分与皇帝称号相关，不能吞并整片意大利半岛来画。',[region('意大利北部王权地域','波河平原','帕维亚是王权中心',['pavia','帕维亚'])],['prum','paviaItalian']),
 ]},
 {year:870,title:'870 年：梅尔森分割后的对照',note:'这里记录洛塔林吉亚分配与意大利对照，不能理解为所有原中部地域都在本年被分完。'+noBorders,realms:[
 realm('west-francia','西法兰克及分得的西部地域','870 年条约之后的西部一方','秃头查理取得洛塔林吉亚的一部分。',[region('西法兰克腹地','今天法国北部方向','巴黎作背景定位，不代表条约签署地',['paris','巴黎'])],['timelineMeerssen']),
 realm('east-francia','东法兰克及分得的东部地域','870 年条约之后的东部一方','日耳曼人路易取得含亚琛的东半部分。',[region('新获北部地域','莱茵附近','亚琛归属发生变化',['aachen','亚琛']),region('原东部王国腹地','多瑙河上游','雷根斯堡作对照',['regensburg','雷根斯堡'])],['timelineMeerssen','regensburg']),
 realm('italy','意大利王国','本卡为 870 年的独立对照','仍由路易二世掌握，不属于梅尔森分割洛塔林吉亚的同一部分。',[region('意大利北部','波河平原','不要把北方继承争议直接外推到这里',['pavia','帕维亚'])],['prum','paviaItalian']),
 ]},
 {year:929,title:'929 年：三个哈里发权威竞争',note:'这不是一个统一“阿拉伯帝国”的三个省，而是相互竞争的政治中心。'+noBorders,realms:[
 realm('cordoba','科尔多瓦哈里发国','929 年称哈里发，1031 年终结','后倭马亚从埃米尔改称哈里发。',[region('安达卢斯','伊比利亚南部','不包括整个半岛所有北方王国',['cordoba','科尔多瓦'])],['umayyad']),
 realm('abbasid','阿拔斯哈里发国','750—1258 年的巴格达王朝线索','哈里发权威与地方实际控制逐渐分离。',[region('伊拉克都城','底格里斯河流域','巴格达宫廷中心，不自动代表整个伊斯兰世界实控',['baghdad','巴格达'])],['abbasid']),
 realm('fatimid','法蒂玛哈里发国','909 年兴起；969 年才取得埃及','本年主要在北非，不能提前以开罗为首都。',[region('伊弗里基亚','今天突尼斯及邻接地区','凯鲁万用于地域定位，不冒充王朝宫城或唯一驻地',['kairouan','凯鲁万'])],['africaVandal'],'法蒂玛王朝的什叶派立场不能推定全境居民都属于同一宗派。'),
 ]},
].sort((a,b)=>a.year-b.year);
export function medievalRealmFrameAt(year:number){return medievalRealmFrames.find(frame=>frame.year===year);}
export function medievalRealmPlaceIds(year:number){return [...new Set(medievalRealmFrameAt(year)?.realms.flatMap(r=>r.regions.flatMap(g=>g.places.map(([id])=>id)))??[])];}
