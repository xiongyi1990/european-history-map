# 第三方数据与授权

项目原创代码和原创文档采用 GPL-3.0-only。以下数据及依赖保留各自授权；根目录 LICENSE 不替代其许可条件。链接到的书籍、课程和网页也不因被引用而转为开源。

## 历史疆界

- 来源：[A. Ourednik and contributors — historical-basemaps](https://github.com/aourednik/historical-basemaps)。感谢上游所整理的历史制图资料及贡献者。
- 授权：GNU GPL v3，保留全文于 `public/historical-boundaries/LICENSE`。
- 位置：`public/historical-boundaries/*.geojson`。
- 本项目修改：通过 `scripts/generate-historical-boundaries.mjs` 保留与欧洲范围相交的要素，并转换属性名称。详细字段映射和 SHA-256 见同目录 `manifest.json`。
- 这些是经过转换的参考数据，目前没有可追溯的原始导入 commit；不宣称已完成全部历史精度审核。上游 `PARTOF` 表示文化关联，不能当作统治关系。

## 古代地名

- 来源：[Pleiades](https://pleiades.stoa.org/)，署名 **Pleiades contributors**。
- 授权：[Creative Commons Attribution 3.0 Unported](https://creativecommons.org/licenses/by/3.0/)，参见 [Pleiades 政策](https://pleiades.stoa.org/help/policies)。
- 位置：`src/greek/pleiades.json`、`src/roman/pleiades.json`；保留每个地点的原始记录链接、提取日期和许可字段。
- 本项目选取代表坐标，并添加中文名及独立编写的阅读说明。代表坐标不表示城市或行省边界。

## 现代底图

- 来源：[Natural Earth](https://www.naturalearthdata.com/)，公共领域；[使用条款](https://www.naturalearthdata.com/about/terms-of-use/)。
- 位置：`public/europe-reference/`。数据版本、源 URL、校验值见同目录 `manifest.json`。
- `world-atlas` 提供 Natural Earth 的 TopoJSON 转换；软件包本身的许可见该依赖的 LICENSE。
- 现代政区只作空间对照，不能反推古代疆界。

## 高程与水深

- 来源：[Mapzen Terrain Tiles / AWS Open Data](https://registry.opendata.aws/terrain-tiles/)，由 Tilezen/Joerd 整合多个高程数据来源。
- 位置：`public/europe-terrain/`、`public/europe-surface/` 以及由脚本生成的希腊/罗马专题缓存。
- 原始数据为 Terrarium 编码；三维地形中的负高程被截为海平面，表面设色使用原始高程。高度夸张与设色是本项目的展示处理，不代表原提供方认可历史解释。
- 各来源有各自条款，**并非全部统一采用 GPL**。完整出处及许可链接见 [Tilezen 署名说明](https://github.com/tilezen/joerd/blob/master/docs/attribution.md) 与 [数据来源](https://github.com/tilezen/joerd/blob/master/docs/data-sources.md)。

主要提供方包括：EU-DEM / Copernicus（欧盟资助）、USGS（3DEP、GMTED2010、SRTM）、NOAA（ETOPO1）、Kartverket、奥地利开放数据、英国 Environment Agency、ArcticDEM。低倍率图块可能覆盖欧洲之外区域，亦包含其他来源。完整上游署名清单随仓库提供于 [terrain-attribution.md](docs/terrain-attribution.md)。

## 程序依赖与字体

React、MapLibre GL JS、Vite、TypeScript、Lucide 等依赖按各自许可证提供；具体安装版本和声明见 `package-lock.json` 及对应包的 LICENSE。不得删除其要求保留的通知。

Blender 脚本可能引用操作系统字体；仓库不分发这些商业字体文件。部署或导出时请使用自己有权使用的字体。

## 课程与书籍

《顾衡讲透欧洲史》《企鹅欧洲史》及其他参考资料的名称、章节、页码只用于定位阅读线索。项目不附带课程 PDF、原文全文、课程配图或扫描书籍，也不代表这些作者或出版方背书。贡献者应自行撰写说明，保留事实来源，遵守所引材料的授权范围。
