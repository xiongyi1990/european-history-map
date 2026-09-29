import type {Area} from './model';
export function dateFifthAreas(areas:Area[],year:number,snapshotYear?:number):Area[]{
 if(year<=400||year>500||!snapshotYear||year===snapshotYear)return areas;
 return areas.map(a=>{
  // The upstream 500 snapshot retains two Western Roman Empire labels. They cannot date earlier control either.
  const questionable=snapshotYear===500&&a.original==='Western Roman Empire';
  const name=questionable?'西部旧罗马地域（原图归属待核对）':a.name;
  return {...a,kind:questionable?'reference':a.kind,name:`${name}（${snapshotYear} 年轮廓）`,context:{name,membership:`当前阅读 ${year} 年，色块取自 ${snapshotYear} 年参考图，不能当作当年实控范围。`,note:'没有对疆界做线性插值。尤其不能把 500 年的法兰克、东哥特或西哥特版图提前放到五世纪中叶；请打开当前年份的地域和城市条目比较变化。',places:[['ravenna','意大利：拉文纳'],['toulouse','高卢：图卢兹'],['carthage','北非：迦太基'],['byzantium','罗马东方']],source:'https://github.com/xiongyi1990/european-history-map/blob/main/docs/ad400-500-coverage.md'}};
 });
}
