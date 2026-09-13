# 古罗马伴读地图

浏览器打开 http://127.0.0.1:5180/?atlas=rome 。本地服务关闭时，在项目文件夹运行 `npm run dev -- --port 5180 --strictPort`。

这是网页版交互地图，支持旋转、缩放、3D 地形和俯视切换。既有 Blender 文件是独立的古希腊沙盘；本次没有生成罗马 `.blend` 文件。

## 已有内容

- 25 处 Pleiades 地点，支持古今地名搜索、来源查看和书签。
- 前 218 年：共和国与迦太基，17 处地点；罗马盟友与直属统治分色。
- 117 年：帝国的地中海世界，25 处地点。
- 395 年：东、西部朝廷，25 处地点；拜占庭城显示为君士坦丁堡。
- 汉尼拔进军意大利：6 阶段，前 218—216 年。
- 凯撒内战从意大利到希腊：4 阶段，前 49—48 年。
- 亚克兴海战：3 阶段，前 31 年。
- 阿尔卑斯山、亚平宁山、比利牛斯山、波河平原和三处海域说明。点击地图左下角“山脉／平原／海洋”可近看地形。

战役支持逐阶段切换、播放、整场概览和定位当前阶段。地图与战役使用独立书签，罗马与希腊书签也分别保存。

## 数据与边界

地点取自 [Pleiades](https://pleiades.stoa.org/downloads)，2026-09-09 提取，CC BY 3.0，Pleiades contributors；每个地点保留原始链接和代表点精度。文化、政体和疆界是不同的概念。

前 218 年与汉尼拔路线参考[波利比乌斯第三卷](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/3%2A.html)。凯撒与亚克兴参考普鲁塔克[《凯撒传》](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Caesar%2A.html)和[《安东尼传》](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Antony%2A.html)，阶段卡片注明章节。帝国时期使用大英博物馆[罗马帝国展厅](https://www.britishmuseum.org/collection/galleries/roman-empire)和[古罗马介绍](https://www.britishmuseum.org/exhibitions/nero-man-behind-myth/introduction-to-ancient-rome)作为背景阅读。

地形来自 [Mapzen / AWS](https://registry.opendata.aws/terrain-tiles/)，[详细署名](https://github.com/tilezen/joerd/blob/master/docs/attribution.md)。西经 11° 至东经 43°、北纬 25° 至 57°，缓存至第 8 级，共 1,701 张几何地形图块及 1,701 张原始高程图块。海面几何高度归零，水深保留供颜色使用。地形高度放大 4 倍；现代海岸和海拔设色不代表古代植被、港口或航道。区域外底图与现代国界使用 Natural Earth 公共领域资料。

**尚未完成：**逐年疆界、完整行省、所有城镇、居民分布和整部罗马史。点色是所选地点的归属分类，不是疆界。汉尼拔山口、卢比孔河渡点、古代战场的具体位置未作精确复原；所有行军线都是主要节点之间的示意，不是测绘路线。三个时期之间不作插值。希腊单元仍为原有 26 地点、前 431 年部分关系与四个战役专题，也不能称为全部古希腊。

## 可复现数据

地形脚本：`scripts/prepare-roman-terrain.py`。地点脚本：`scripts/prepare-roman-places.py`，传入 `src/roman/pleiades.json` 内的 25 个 Pleiades ID 可重新提取；不带参数只列出候选地名供人工辨认，不能把同名城市自动当作同一地点。

校验：`npm test`；生产构建：`npm run build`。
