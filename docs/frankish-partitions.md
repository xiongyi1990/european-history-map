# 法兰克分裂地图：843、855、870、880 年

本专题补入统一欧洲时空地图，默认在四个事件年显示条约后的分国关系。它不代表逐年地图，也没有完成顾衡课程的全部地图。

## 阅读路径

- `?year=843&view=partitions`：西、中、东三分；沿中部王国从北海、亚琛到意大利。
- `?year=855&view=partitions`：中部分为洛塔林吉亚、普罗旺斯与意大利；东西两国继续存在。
- `?year=870&view=partitions`：洛塔林吉亚被东西分割；里昂/维埃纳与南部普罗旺斯区别显示。意大利未被此次分割取消。
- `?year=880&view=partitions`：洛塔林吉亚归东部王权，另辨博索的王权与意大利。图层没有画西部两王和东部诸王的所有内部领地。
- `kingdom=west-francia|middle-francia|east-francia|lotharingia|provence|italy` 按事件年校验，失效名称自动清除。
- `view=reference` 退出专题；原有邻近百年疆界仍需明确选择叠加。844 等未核年份不会自动套用843的分国图。

点击色块/名称可查看统治者、年代、地域构成、古今定位、居民与语言证据。城市链接含比较地点，并非每个链接都表示该城归属该国。例如罗马是教皇关系对照，始终不按意大利直辖着色。亚琛、里昂、阿尔勒的点色按所选事件年单独指定；不能从链接或现代国籍推断。

## 来源与取舍

顾衡《顾衡讲透欧洲史》第143讲（PDF1199—1207页）、第144讲（1208—1215页）提供王权继承与欧洲地域的课程阅读背景。页码从用户PDF第一页计。四次分国细节由下面来源补充，不把课程目录或一张查理曼图当作四个时期均已完成。

1. [INSEI：凡尔登843](https://www.insei.fr/ressources/le-partage-de-verdun-en-843)，核对三分、统治者与代表城市。
2. [LVR：洛泰尔二世](https://www.rheinische-geschichte.lvr.de/Persoenlichkeiten/lothar-ii./DE-2086/lido/57c943a7f37ea7.34457744)，核对855继承。
3. [Wallonie：梅尔森870](https://connaitrelawallonie.wallonie.be/histoire-et-symboles/histoire/atlas-historique/le-partage-du-royaume-de-lothaire-ii-le-traite-de)，核对洛塔林吉亚、863普罗旺斯继承层次。
4. [Wallonie：里伯蒙880](https://connaitrelawallonie.wallonie.be/histoire-et-symboles/histoire/atlas-historique/entre-francie-et-germanie-le-traite-de-ribemont-880)，核对洛塔林吉亚与博索。
5. [Jens Schneider 2018](https://journals.openedition.org/cem/15084)，原始研究明确讨论汝拉/勃艮第空间重建的不确定性。
6. [瑞士历史辞典：胖子查理](https://hls-dhs-dss.ch/de/articles/020774/2010-04-01/)、[德国传记](https://www.deutsche-biographie.de/sfz53391.html)，区分879取得意大利王权、880受膏、881帝号及882统一东部。
7. [斯特拉斯堡教育资料](https://pedagogie.ac-strasbourg.fr/fileadmin/pedagogie/lettres/Dossier_dyslexie_2/Exposition_-_Serments_de_Strasbourg.pdf)，只说明誓约及文书语言证据，不据此计算居民比例。

原创中文概括与手工坐标包络；没有复制出版社、INSEI或Wallonie原图像素或矢量。参考图没有随发布打包。生成数据沿用项目 GPL-3.0 许可；Natural Earth 现代陆地为公有领域。

## 几何精度与未覆盖部分

`scripts/build-frankish-partitions.py` 用共享内缘形成15个色块，再与Natural Earth现代陆地裁切。坐标是编辑概括，并非地理配准或测绘国界。岛屿、布列塔尼、教皇属地、边疆臣属和城镇层面的控制没有完整绘出。边缘只说明地域大势，不表达直辖、臣属和争议控制的所有差别；留白不表示无人或无主。

870、880的汝拉部分留白，不能把争议当成一条确定国界。880博索色块为罗讷河—普罗旺斯王权的阅读范围，不等于其所有主张都已稳定实现。843和855里昂、870亚琛等代表城市用于核对整体关系；没有新增或臆造条约会址坐标。

图层只为4个确切事件年生成，不进行年份插值。大陆尺度适用；放大不会提高史料精度。北部洛塔林吉亚、意大利等名称是政治地域，不是单一“人种”或现代民族。

## 复现与检查

`python -X utf8 scripts/build-frankish-partitions.py`（需要shapely）验证几何有效、非空、同年不重叠及巴黎、亚琛、里昂、帕维亚、雷根斯堡的代表点；排除罗马直辖和误画布拉格。

Vitest验证四个阶段的数据/色块/标签一一对应、城市索引存在、关联城市与归属区别、不外推未核年份，以及主界面切年、分享链接、搜索、城市返回和现代模式隔离。地图视觉效果另在浏览器当前窄屏视口检查；该视口检查不代替所有设备的兼容验证。
