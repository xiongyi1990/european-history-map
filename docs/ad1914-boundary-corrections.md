# 1914 年参考快照的政治归属校订

本轮修正地图对九条区域记录的解释与颜色归组，不修改原 GeoJSON，也不生成新几何。校订仅在读取 **1914 年来源快照** 时生效；不向 1900、1917、1918、1920 年或现代图层外推。这不是全 49 条区域已核实的声明。

## 九项校订

| 原名 | 1914 年的表达 | 处理方式 |
|---|---|---|
| Finland | 俄罗斯帝国下的芬兰自治大公国 | 与原 Russia 色组一致，细分类别保留“自治大公国”，不当作独立国家 |
| Georgia | 俄国治下的格鲁吉亚历史地域 | 与 Russia 同组；不把 1918 年民主共和国提前，也不声称本条是同名完整行政区 |
| Azerbaijan | 俄国治下的东外高加索地域 | 与 Russia 同组；现代方位名称和 1918 年共和国分开，不把整个历史阿塞拜疆都划给俄国 |
| Armenia | 跨俄罗斯、奥斯曼的历史地域与社群背景 | 降为参考层，不将整个历史地域画为俄国直辖或独立国家 |
| Malta | 英国王室殖民地 | 与原“大不列颠及爱尔兰联合王国”色组一致，保留殖民地类别 |
| Iceland | 丹麦统治下的自治地区 | 与 Denmark 同组，1904 年内政自治与 1918 年主权共君王国分开 |
| Tunisia | 法国保护下的突尼斯贝伊国 | 与 France 色组表达保护联系，同时明确不是法国本土省，保留突尼斯国家与贝伊层次 |
| Spanish Morocco | 西班牙在摩洛哥的保护区，保留苏丹层次 | 与 Spain 同色组，不称独立国家或西班牙本土省；原几何仍未精核 |
| Morocco | 苏丹层次及法西不同保护区的背景 | 降为参考层；当前单一多边形不拿来代表全部法国直辖或准确法西分界 |

政治相关色组不是居民身份、人口分布或法律地位完全相同的声明。自治大公国、殖民地、保护国及历史地域在详情类别中分别说明。

## 证据

- [芬兰官方历史介绍](https://finland.fi/life-society/main-outlines-of-finnish-history/)：1809—1917 年自治大公国，俄罗斯皇帝兼任芬兰大公；1917 年 12 月 6 日独立声明。原多边形未按 1914 年大公国边界重新核定。
- [格鲁吉亚官方法律库：独立法案及历史背景](https://www.matsne.gov.ge/ka/document/view/4801451)：附录记录俄国并入、统治及 1918 年独立背景；[国家档案馆](https://ais.archive.gov.ge/en/kviris-dokumenti/saqartvelos-konstitucia)核对 1918 年 5 月 26 日独立法案。
- [美国国务院史家办公室：亚美尼亚](https://history.state.gov/countries/armenia)：1918—1920 年共和国，预期领土此前分属俄罗斯与奥斯曼，承认不等于预定最终边界。这里只记录政治阶段，不接受某个后世领土要求作为 1914 年国界。
- [美国国务院史家办公室：阿塞拜疆](https://history.state.gov/countries/azerbaijan)：俄国帝国解体后出现短暂独立国家；[阿塞拜疆议会的独立宣言介绍](https://meclis.gov.az/news-az.php?id=14&lang=en)核对 1918 年 5 月 28 日。
- [马耳他议会历史](https://parlament.mt/en/menues/about-parliament/how-parliament-works/historical-background/)：1814 年成为英国属地，1964 年独立；[美国国务院史家办公室](https://history.state.gov/countries/malta)明确 1814—1964 年王室殖民地。
- [冰岛政府1904—1918年自治专题](https://www.stjornarradid.is/rikisstjorn/sogulegt-efni/heimastjorn-1904-1918/)与[冰岛议会立法权历史](https://www.althingi.is/thingmenn/althingiskosningar/kosningar-og-kosningaurslit/kosningarrettur-kjorgengi-og-kjorsokn/)：1904 年部长驻冰岛，1874—1918 年共同事务仍与丹麦分层，1918 年立法权与主权地位变化另看。没有依赖直接访问失败的议会 PDF。
- [突尼斯政府历史简介](https://www.tunisie.gov.tn/155-d%C3%A9couvrir-la-tunisie.htm)：1881 年保护关系与 1956 年独立；[法国外交档案](https://www.diplomatie.gouv.fr/fr/archives-bibliotheque/effectuer-des-recherches-genealogiques-ou-familiales/l-etat-civil-des-francais-a-l-etranger)明确保护国体制仍保留突尼斯国家。
- [西班牙陆军博物馆保护国展览](https://ejercito.defensa.gob.es/museo/exposiciones/exposicion_temporal/realizadas/exposiciones/espana_en_marruecos.html)：1912 年法西在各自区域建立保护关系，苏丹政府仍有层次；不由该概述推画精确分界或每年稳定控制。

这些补充是独立史料校订，不伪造顾衡课程讲次或页码。

## 实现接口与验证范围

`boundary1914Correction(original, snapshotYear)` 返回 `context`、可选 `subject`／`colorSubject`、`kind` 及 `categoryLabel`。颜色键沿用原快照的 Russia、Denmark、France 和 United Kingdom of Great Britain and Ireland，不凭翻译后名称另造色组。`Armenia`、`Morocco` 明确为 `reference`；主界面应使用细分类别而非一律“政权类参考”。

新增针对性检查覆盖：仅 1914 生效；芬兰自治与俄国同色组；格鲁吉亚／阿塞拜疆不提前独立；亚美尼亚不整片归俄国；马耳他、冰岛、突尼斯的不同依附身份及色组；摩洛哥多方保护与参考层；西班牙保护区及苏丹层次；来源和无新几何。针对性数据检查已通过；与日期规则、数据转换和完整地图导航合计 88 项不同检查通过，包含一个超时场景的独立复跑。正式构建及桌面、手机浏览器核对通过。

## 仍待校订

原快照含 49 条 feature。Qatar、Kuwait、Rio De Oro、British Protectorate 等条目的具体政治地位、名称和轮廓尚未在本轮全面校订；其他保留条目也不因本模块存在而自动视作已核实。`Spanish Morocco` 本轮仅校订保护关系的解释，不表示其全部几何、地方实控或法西边缘已精确复原。

所有保留多边形仍是来源的概略参考。没有重绘俄国高加索省区、亚美尼亚两帝国边线、法西保护区、丹吉尔制度、芬兰当年行政边界、居民／语言分布或整个 1914 年的年内军事控制变化。
