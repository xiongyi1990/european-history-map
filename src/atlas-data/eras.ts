import type { Era } from "./types";

export const eras: Era[] = [
  { id: "bronze-age", name_zh: "青铜时代近东", name_en: "Bronze Age Near East", anchor_year: -1600, range: [-2000, -1200], chapter_ref: "欧洲史前史背景", focus: [34, 35], zoom: 3.05 },
  { id: "greek-archaic", name_zh: "古希腊古风期", name_en: "Archaic Greece", anchor_year: -650, range: [-800, -500], chapter_ref: "希腊城邦兴起", focus: [25, 38], zoom: 3.35 },
  { id: "greek-classical", name_zh: "古希腊古典期", name_en: "Classical Greece", anchor_year: -450, range: [-500, -323], chapter_ref: "波希战争与伯罗奔尼撒战争", focus: [27, 38], zoom: 3.35 },
  { id: "alexander", name_zh: "亚历山大与希腊化", name_en: "Alexander and Hellenistic Age", anchor_year: -323, range: [-336, -30], chapter_ref: "希腊化世界", focus: [35, 36], zoom: 2.8 },
  { id: "roman-republic", name_zh: "罗马共和国", name_en: "Roman Republic", anchor_year: -146, range: [-509, -27], chapter_ref: "罗马扩张", focus: [15, 39], zoom: 3.25 },
  { id: "roman-empire", name_zh: "罗马帝国盛期", name_en: "Roman Empire", anchor_year: 117, range: [-27, 284], chapter_ref: "帝国秩序", focus: [18, 41], zoom: 2.75 },
  { id: "late-antiquity", name_zh: "晚期古典世界", name_en: "Late Antiquity", anchor_year: 476, range: [284, 600], chapter_ref: "罗马转型", focus: [20, 43], zoom: 2.8 },
  { id: "charlemagne", name_zh: "查理曼时代", name_en: "Carolingian Europe", anchor_year: 800, range: [700, 900], chapter_ref: "中世纪开端", focus: [12, 47], zoom: 3.05 },
  { id: "crusades", name_zh: "十字军时代", name_en: "Age of Crusades", anchor_year: 1099, range: [1095, 1291], chapter_ref: "十字军与地中海", focus: [25, 39], zoom: 3.0 },
  { id: "mongol-contact", name_zh: "蒙古西征冲击", name_en: "Mongol Contact", anchor_year: 1241, range: [1206, 1368], chapter_ref: "欧亚连通", focus: [38, 47], zoom: 2.65 },
  { id: "renaissance", name_zh: "文艺复兴意大利", name_en: "Renaissance Italy", anchor_year: 1453, range: [1300, 1500], chapter_ref: "城市与人文主义", focus: [15, 43], zoom: 3.25 },
  { id: "reformation", name_zh: "宗教改革", name_en: "Reformation", anchor_year: 1517, range: [1517, 1648], chapter_ref: "宗教改革与战争", focus: [10, 50], zoom: 3.05 },
  { id: "westphalia", name_zh: "威斯特伐利亚后", name_en: "Post-Westphalia", anchor_year: 1648, range: [1648, 1789], chapter_ref: "主权国家体系", focus: [10, 49], zoom: 3.0 },
  { id: "napoleonic", name_zh: "拿破仑时代", name_en: "Napoleonic Europe", anchor_year: 1812, range: [1789, 1815], chapter_ref: "革命与帝国", focus: [12, 50], zoom: 2.95 },
  { id: "wwi", name_zh: "一战前夜", name_en: "Before World War I", anchor_year: 1914, range: [1871, 1914], chapter_ref: "民族国家与帝国竞争", focus: [15, 51], zoom: 2.9 },
  { id: "cold-war", name_zh: "冷战欧洲", name_en: "Cold War Europe", anchor_year: 1961, range: [1945, 1991], chapter_ref: "冷战秩序", focus: [15, 52], zoom: 2.9 },
];
