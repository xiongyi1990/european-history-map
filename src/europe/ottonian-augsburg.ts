import type {GazetteerPlace} from './model';
import type {HistoricalDetail} from './history-details';
import {courseSources} from './course-sources';
export const ottonianPlaces:GazetteerPlace[]=[{id:'augsburg',name:'奥格斯堡',modern:'德国 · 巴伐利亚 · 奥格斯堡',aliases:['Augsburg','Augusta Vindelicum','莱希河','Lechfeld'],coords:[10.90,48.37],source:courseSources.ottonianLechfeld.url,kind:'战役区域参照城市',description:'位于阿尔卑斯以北、莱希河附近。955年战役发生在城外周边；标记为现代城市中心的近似位置，不是已确定的精确战场。'}];
const fact=(text:string)=>({text,sources:['ottonianLechfeld' as const]});
export const ottonianAugsburgDetails:HistoricalDetail[]=[{id:'augsburg-955',placeId:'augsburg',title:'奥格斯堡',displayName:'奥格斯堡',from:955,to:955,focusYear:955,period:'955年8月10日战役之后',kind:'事件地点',polity:fact('奥托一世的东部王权背景；围城和城外战事在955年8月发生。此时奥托还没有962年才取得的皇帝称号。'),territory:fact('城市位于阿尔卑斯北侧、莱希河附近。官方地域资料明确表示精确战场位置仍不确定，因此只标示参照城市，不绘制精确会战阵地。'),people:fact('参战军队、保卫城市的人员与地方居民并非同一群体；不能把马扎尔军队标签当作周边居民的族群普查。'),language:{text:'本条未提供城市全部居民的口语分布或比例。',sources:[]},nameNote:fact('Augsburg今译奥格斯堡；本点为城市位置参照。莱希河战场不能简单等同现代名为Lechfeld地区的全部范围。'),related:['regensburg','magdeburg','aachen']}];
