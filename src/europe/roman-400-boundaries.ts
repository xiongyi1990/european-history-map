import type {BoundaryContext} from './roman-300-boundaries';
import {roman400Sources as sources} from './roman-400-sources';
const nomads='原始轮廓未经逐年重绘，仅放在“文化与其他区域”参考层。族名、军队联盟与居民分布不能直接对应一个有精确国界的国家；阿提拉的统治在五世纪更晚时候。';
const group=(name:string):BoundaryContext=>({name,membership:'400 年的集团活动背景，原始归属标签待核对',note:nomads,places:[['hadrianople','多瑙河与巴尔干方向'],['panticapaeum','黑海北岸方向']],source:sources.zosimus400.url,reference:true});
export const roman400Boundaries:Record<string,BoundaryContext>={
 Persia:{name:'萨珊帝国',membership:'伊嗣俟一世在位（399—420）；萨珊王朝 224—651',note:'原资料以 Persia / Persi 标记。400 年为萨珊统治，不能按现代伊朗国界理解；精确边缘仍是参考轮廓。',places:[['ctesiphon','泰西封：宫廷'],['nisibis','尼西比斯：萨珊边城'],['edessa','对照罗马埃德萨']],source:sources.yazdegerd400.url},
 'Hunnic Empire':group('匈人诸集团（范围待核对）'),
 Ostrogoths:group('黑海北方哥特诸集团（参考）'),
 Visigoths:{...group('阿拉里克与哥特集团（参考）'),note:'400 年的巴尔干哥特活动不等于 418 年后的图卢兹王国。原始色块不作精确领土。',places:[['thessaloniki','巴尔干城市参照'],['toulouse','图卢兹：尚非西哥特王都']]},
 'Caucasian Alans':group('高加索阿兰诸集团（参考）'),Akatziri:group('阿卡齐里（原图归属待核对）'),Skirii:group('斯基里诸集团（参考）'),Gepids:group('格皮德诸集团（参考）'),
};
