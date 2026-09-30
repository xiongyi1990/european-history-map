import type {FifthSource} from './fifth-century';

// Annual summaries keep successions within a year visible instead of picking one ruler.
export function lateWestAt(year:number):string{
 if(year===455)return '瓦伦提尼安三世遇害后，佩特罗尼乌斯·马克西穆斯短暂在位，随后死亡；阿维图斯于本年被拥立。汪达尔洗劫罗马与这些皇位交接发生在同一年。';
 if(year===456)return '阿维图斯在位至本年秋被推翻；里西默与马约里安参与意大利军事权力重组，随后西部皇位暂缺。';
 if(year===457)return '皇位空缺后，马约里安于本年成为西部皇帝；东方马尔西安与利奥一世的交接另有时间线。';
 if(year<461)return '马约里安（457—461）在位，试图恢复西部在高卢和伊比利亚的影响；皇帝的主张与各城实际控制需分别查看。';
 if(year===461)return '马约里安被里西默推翻并杀害；利比乌斯·塞维鲁斯于本年晚些时候在拉文纳被拥立。东方利奥一世没有承认这位西部皇帝。';
 if(year<465)return '利比乌斯·塞维鲁斯（461—465）在位，依靠里西默支持，权力主要在意大利；东方不承认其皇位，北高卢埃吉迪乌斯也不服从这一朝廷。';
 if(year===465)return '利比乌斯·塞维鲁斯去世，西部皇位再次空缺；里西默仍掌握重要军事权力。皇位空缺不表示意大利的行政和居民消失。';
 if(year===466)return '西部皇位空缺（465—467），里西默仍是意大利的重要军事权力人物；东方利奥一世继续在位，各地军政势力并未统一。';
 if(year===467)return '东方利奥一世支持安特米乌斯进入意大利；安特米乌斯于本年成为西部皇帝，结束皇位空缺。';
 if(year<472)return '安特米乌斯（467—472）在位，由东方利奥一世支持；468 年联合远征汪达尔失败，随后与里西默的关系恶化。';
 if(year===472)return '安特米乌斯与里西默发生内战；奥利布里乌斯在安特米乌斯仍在世时被拥立。安特米乌斯于七月死亡，里西默随后去世，奥利布里乌斯也在本年秋去世，皇位再度空缺。';
 if(year===473)return '格利凯里乌斯由军队首领贡多巴德支持，于本年在拉文纳被拥立；东方利奥一世没有承认他的西部皇位。';
 return '格利凯里乌斯失位，东方支持的尤利乌斯·尼波斯进入意大利并取得西部皇位（474）；格利凯里乌斯转任萨洛纳主教。';
}
export function lateWestSources(year:number):FifthSource[]{
 if(year<455||year>474)return [];
 if(year<=456)return ['avitus5','west5'];
 if(year<=460)return ['majorian5'];
 if(year===461)return ['majorian5','severus5'];
 if(year<=466)return ['severus5'];
 if(year<=471)return ['anthemius5'];
 if(year===472)return ['anthemius5','olybrius5'];
 return ['glycerius5','endWest5'];
}
export function fifthAfrica(year:number):string{
 if(year<429)return '迦太基与希波仍在罗马西部体系，北非港口和农业地域联系意大利。';
 if(year<439)return '盖萨里克率汪达尔集团进入北非，希波经历战争；迦太基仍未易手，不能把 429 年渡海当作已征服全部北非。';
 if(year<477)return '盖萨里克（汪达尔国王，428—477）统治迦太基；439 年夺城、442 年和约、455 年洗劫罗马是不同节点。王权中心在今突尼斯北部，并非统治整个非洲北岸。';
 if(year===477)return '盖萨里克去世，胡内里克继位（477—484）；迦太基仍是汪达尔王权中心，国王更换不等于城市人口被替换。';
 if(year<484)return '胡内里克（477—484）在位，汪达尔王权以迦太基为中心。当地罗马时代居民、拉丁文化和不同教会社群继续存在。';
 if(year===484)return '胡内里克去世，贡塔蒙德继位（484—496）；北非交接与同年萨珊卑路斯战死是两个不同地域的事件。';
 if(year<496)return '贡塔蒙德（484—496）在位；迦太基王廷、北非海岸与内陆地方势力分别观察，不能从国王名称推定全体居民的身份。';
 if(year===496)return '贡塔蒙德去世，特拉萨蒙德继位（496—523）；这一交接不表示汪达尔王国终结，也不等于北非所有地区同日易主。';
 return '特拉萨蒙德（496—523）在位，迦太基仍是汪达尔王权中心；533 年东罗马远征尚未发生。';
}
