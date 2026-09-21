# 欧洲时空地图 · European History Map

**让读欧洲史的人，看清故事发生在哪里。**

一个中文、开源的欧洲历史交互地图：选择年代，寻找帝国与城市，对照古今地名，理解政权、地域、居民、语言和战役之间的关系。

An open-source, Chinese-language historical atlas of Europe, built with React, TypeScript and MapLibre GL JS. Contributions to historical research, cartography and accessibility are welcome.

[在线体验](https://european-history-map.tangallen96.chatgpt.site/?year=843) · [参与贡献](CONTRIBUTING.md) · [报告史实或地图问题](https://github.com/xiongyi1990/european-history-map/issues/new/choose) · [建设路线](ROADMAP.md)

## 可以做什么

- 在统一地图上切换年代，查看历史参考疆界、政权名称、城市和现代地理对照。
- 阅读地点的古今名称、当时归属、居民与语言说明，并返回资料来源核查。
- 查看东、西罗马帝国的组成地域，以及晚期罗马、早期中世纪、加洛林分裂、千年之交和诺曼扩张的阅读导览。
- 通过三维山脉、海洋、河流和分阶段战役路线建立空间感。
- 分享指定年代和地点，例如 [公元 500 年的拉文纳](https://european-history-map.tangallen96.chatgpt.site/?year=500&place=ravenna)。

这是持续建设中的历史阅读工具。当前提供从公元前 2000 年到公元 2000 年的若干疆界快照，详细资料的密度因时期而异。**任意输入年份，不代表已有该年的精确疆界**：缺少精确资料时，界面标明所用参考年代。现代地形不等于古代海岸线；政治疆界也不能直接解释居民族群、语言或身份。未收录区域不代表无人居住。

《企鹅欧洲史》《顾衡讲透欧洲史》等是阅读线索；本项目不是这些出版物的官方产品，不分发课程 PDF、全文或配图。课程页码只用于读者查找，历史说明应结合可核查资料独立撰写。

## 最新补充

- 公元 1066、1071、1100 年：诺曼底与英格兰、南意大利与西西里、东罗马与耶路撒冷的空间对照。
- 新增鲁昂、佩文西、巴特尔战场、巴里、曼齐刻尔、巴勒莫，以及 9 条时点资料。
- [1066 年诺曼征服路线](https://european-history-map.tangallen96.chatgpt.site/?year=1066&battle=norman-conquest)：三个阶段，明确区分路线示意与精确行军轨迹。
- 这是地点、导览与路线的补充，没有新增未经核实的逐年疆界。

## 本地运行

需要 Node.js **22.12+**（推荐 Node 22 LTS）、npm，以及支持 WebGL 的浏览器。网站不需要 API 密钥或 Blender。

```sh
git clone https://github.com/xiongyi1990/european-history-map.git
cd european-history-map
npm ci
npm run dev
```

打开终端显示的本地地址，通常为 `http://127.0.0.1:5173`。文字、历史疆界和主体地形已随仓库提供。

### 补齐高倍率地形图块

仓库包含欧洲高程图块到第 7 级，表面设色原始图块仅包含第 0–5 级；本地第 6–7 级缓存、旧希腊/罗马专题图块及 Blender 二进制文件不纳入 Git。放大地图前，请下载缺少的公开地形数据，否则可能出现局部地形加载提示：

```sh
python -m pip install numpy pillow
python scripts/prepare-europe-assets.py
```

该脚本访问 AWS 公开高程数据和 Natural Earth，写入 `public/`，已有缓存可复用。下载量与网络速度影响耗时。仅编辑历史文字、运行测试和构建时不必执行。

需要运行早期专题 `?atlas=greece` / `?atlas=rome` 时，再执行：

```sh
python scripts/prepare-greek-surface.py
python scripts/prepare-roman-terrain.py
```

Blender 脚本位于 `scripts/build-*-blender.py`，用于离线场景制作；部分脚本使用 Windows 字体路径，其他系统需要调整。

## 验证与部署

```sh
npm test
npm run build
npm run preview
```

静态网站输出到 `dist/`，可部署到支持站点根路径的静态托管服务。完整地形请先执行上面的数据准备脚本。仓库中的 `.openai/hosting.json` 属于现有演示站；自行部署时请使用自己的项目配置。GitHub 的代码更新不会自动发布到演示站。

提交 Pull Request 前请执行测试与构建。测试检查数据引用、年代范围和交互行为，不等于全部史实已经专家审定。

## 从哪里参与

不必会写代码：提供“哪一年、哪个地点、哪里有误、依据是什么”就是有价值的贡献。

| 你擅长什么 | 可以先做什么 |
| --- | --- |
| 欧洲史、古典学、中世纪史 | 核对一座城市的归属、存续时间、古今名称与来源 |
| 地图与 GIS | 补充有来源的疆界，注明年代、比例尺与不确定性 |
| 翻译与中文编辑 | 补齐中文名称、异名、搜索词，避免不同城市混名 |
| 前端与设计 | 改善手机阅读、键盘操作、加载体验与地图性能 |
| 教学与阅读 | 用一本书的具体段落反馈“地图还缺什么才能看懂” |

请先读 [贡献指南](CONTRIBUTING.md)。可从 [good first issue](https://github.com/xiongyi1990/european-history-map/labels/good%20first%20issue) 开始，或直接提交问题。较大的重构先用 Issue 说明方案，便于协调。

## 代码导航

| 路径 | 内容 |
| --- | --- |
| `src/europe/` | 统一地图、地点资料、帝国组成、年代导览 |
| `src/europe/history-details.ts` | 历史资料类型与汇总 |
| `src/europe/course-details.ts` | 分时期的地点资料汇总 |
| `src/europe/course-sources.ts` | 资料来源和阅读关联 |
| `src/greek/`、`src/roman/` | 早期专题、共享地图与战役资料 |
| `public/historical-boundaries/` | 历史参考疆界、许可证与来源清单 |
| `public/europe-reference/` | 现代地理对照数据 |
| `scripts/` | 地形、地图数据和 Blender 场景准备脚本 |

早期 `README-*.md` 保留阶段性开发记录；当前运行和参与方式以本文件为准。

## 开源与数据署名

项目原创代码及原创文档采用 **GNU GPL v3.0 only**，见 [LICENSE](LICENSE)。第三方数据、软件和引用材料保留各自授权，不能统一当作本项目原创代码再授权。

感谢 A. Ourednik 与 historical-basemaps 贡献者、Pleiades contributors、Natural Earth，以及 Mapzen/Tilezen 和各高程数据提供方。完整来源、修改说明与授权区别见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。


### 公元 300 年补充

- 修复四帝共治的四块罗马区域被误归为参考层、默认不显示的问题。使用统一帝国颜色，点击后可查看分掌者、制度时段和相关地域城市。
- 新增 10 个当年地点条目，覆盖不列颠、高卢、西班牙、西西里、希腊、北非，以及泰西封和尼西比斯；增加六组地域导览和第 98—99 讲阅读关联。
- 纠正原数据 `Rome (Constantinus)` 在 300 年被译为君士坦丁的错误：当时的副帝是君士坦提乌斯一世。保留原始名称供核对。
- 300 年原快照错误标为帕提亚的波斯轮廓降为可选参考，不冒充重新核实的萨珊疆界；200 年帕提亚记录不受影响。
- 新增地点使用现有地名库或约略城市坐标。没有新增精确行省边界，也不以帝国颜色推定居民族群比例。
- 测试使用实际 `world_300.geojson`，覆盖默认图层显示、年份隔离、原始几何保留与阅读链接有效性。
