"""Reproducible regional reading envelopes for 900–1453; NOT annual borders.
Original editorial coordinates with public-domain Natural Earth modern land clipping.
See docs/frankish-successors.md. No historical map pixels or traced vectors used.
"""
import json
from pathlib import Path
from shapely.geometry import Polygon, MultiPolygon, Point, box, shape, mapping
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1]
def poly(coords):
    p=Polygon(coords)
    assert p.is_valid
    return p
# Shared seams continue the earlier atlas's reading geography, not treaty measurements.
wm=[(3.8,51.7),(3.3,50.8),(4.25,50),(4.7,49.7),(5.15,48.8),(5.45,47.7),(5.15,47),(4.65,46.2),(4.65,45.2),(4.1,44.7),(4.3,43.8),(4.5,43.1)]
me=[(7.2,53.7),(7,52.5),(6.8,51.9),(6.3,50.9),(6.75,50.5),(7.4,49.9),(8.35,49.6),(8.2,48.8),(7.9,48),(7.55,47.6)]
alps=[(7.55,47.6),(8.4,47.1),(9.5,47.2),(10.5,46.8),(12.4,46.7),(13.4,46.3)]
west=poly([*wm,(3.5,42.1),(2.15,41.35),(1.3,41.8),(.2,42.8),(-1.7,43.3),(-2.2,46),(-1.65,47.3),(-1.5,48.5),(-2,49.5),(.5,50.4),(2,51.5)])
north=poly([*wm[:8],(6.7,46.2),*reversed(me),(5.6,53.8),(4.4,53)])
prov=poly([*wm[7:],(7.5,42.7),(7.5,43.7),(6.8,44.5),(7.1,45.2),(6.7,46.2)])
# Distinguish the old northern corridor from the post-888 upper Burgundian kingdom.
upper=unary_union([north.intersection(box(-10,40,20,47.8)),poly([(6.7,46.2),(7.1,45.2),(7.9,45.6),(8.4,46.2),(8.4,47.1),(8.05,47.8),(7.55,47.8)])])
loth=north.difference(upper)
prov=prov.difference(upper)
italy=poly([(7.1,45.2),(7.9,45.6),(8.4,46.2),(9.5,46.6),(10.5,46.4),(12,46.4),(12.3,46),(11.8,45.6),(11.3,44.8),(11.7,44.3),(12.4,43.4),(11.6,42.8),(10.6,42.8),(8.8,43.8),(7.5,43.7),(6.8,44.5)]).difference(upper)
east=poly([*me,*alps[1:],(14.2,46.7),(14.4,48.1),(13.5,48.7),(12.4,49.4),(12.2,50.5),(12.4,51.6),(12.1,52.6),(10.6,53.6),(9.8,54.1),(8.6,54.2)]).difference(upper).difference(italy)
# Trim a small unresolved coastal/southern fringe, avoiding fabricated control of Iberia.
west=west.intersection(box(-10,42.65,20,60))
land=unary_union([shape(f['geometry']) for f in json.loads((ROOT/'public/europe-reference/ne_50m_admin_0_countries.geojson').read_text(encoding='utf-8'))['features']]).simplify(.018,preserve_topology=True)
def clipped(g):
    c=g.intersection(land)
    pieces=list(c.geoms) if hasattr(c,'geoms') else [c]
    result=MultiPolygon([p for p in pieces if p.geom_type=='Polygon' and p.area>.003])
    assert result.is_valid and not result.is_empty
    return result
base={k:clipped(v) for k,v in {'west-francia':west,'east-francia':east,'lotharingia':loth,'upper-burgundy':upper,'provence':prov,'italy':italy}.items()}
high_years=[s['year'] for s in json.loads((ROOT/'src/europe/high-medieval-states.json').read_text(encoding='utf-8'))]
great_britain=next(g for g in land.geoms if g.covers(Point(-1,52)))
england=clipped(poly([(-5.8,49.8),(-3,49.8),(1.9,50.5),(2,53),(-1.8,55.9),(-2.4,55.8),(-3.5,54.8),(-3.8,54.2),(-3.1,53.4),(-2.7,52.8),(-2.4,51.6),(-3.5,51.1),(-5.8,50.3)]).intersection(great_britain))
sicily=next(g for g in land.geoms if g.covers(Point(14,37.5)))
south=clipped(poly([(12.95,41.35),(13.23,42.2),(15,42.4),(18.8,41.2),(18.7,39.5),(16.5,37.6),(15.6,38),(14.8,39.4),(13.1,40.7)]).difference(sicily))

late_years=[s['year'] for s in json.loads((ROOT/'src/europe/late-medieval-states.json').read_text(encoding='utf-8'))]
scotland=clipped(poly([(-6.8,54.5),(-4.8,54.6),(-3.5,55),(-2.4,55.8),(-1.6,55.85),(-1.6,59.4),(-6.8,59.4)]).intersection(great_britain).difference(england))
flanders=clipped(poly([(2.35,50.45),(3.25,50.45),(4.35,50.8),(4.35,51.6),(2.7,51.65)]))
gascony=clipped(poly([(-1.9,43.2),(-.4,43.2),(.65,43.7),(.65,45.5),(-1.1,45.5),(-1.9,44.7)]).intersection(base['west-francia']))
bohemia=clipped(poly([(12.5,49.1),(13.5,48.5),(15.6,48.6),(16.5,49.3),(16.3,50.6),(14.9,51.1),(13.2,50.8)]).difference(base['east-francia']))
transition_years=[s['year'] for s in json.loads((ROOT/'src/europe/medieval-transition-states.json').read_text(encoding='utf-8'))]
new_regions={
 'burgundy-duchy':clipped(poly([(3.6,46.2),(4.9,46.1),(5.5,47),(5.4,48),(4.1,48),(3.5,47.4)]).intersection(base['west-francia'])),
 'poland':clipped(poly([(16,51.6),(18.6,51),(19.2,49.7),(23.8,49.8),(23.8,53.3),(20.6,53.4),(18,53.2),(16.2,53.1)])),
 'lithuania':clipped(poly([(22.5,53.7),(26.7,53.5),(27.5,54.7),(26.8,56.4),(23,56.3),(22.3,55)])),
 'hungary':clipped(poly([(16.5,46.1),(18,45.6),(21.8,46),(22.8,47.5),(21.3,49.2),(18.5,49.5),(16.5,48.4)])),
 'straits':clipped(poly([(26.2,39.7),(30.8,39.7),(31,42),(28.5,43),(26,42.6),(25.6,41)])),
}
# Iberian mainland reading cores. Mountain-side and disputed edge details are omitted.
navarre_late=clipped(poly([(-2.5,42.5),(-2.3,41.9),(-1.9,41.9),(-.8,41.9),(-.5,42.35),(.4,42.55),(-.5,43.15),(-1.5,43.2),(-2.5,42.9)]).difference(base['west-francia']))
portugal_late=clipped(poly([(-9.6,36.9),(-7.4,36.9),(-7.5,38.7),(-6.9,39.6),(-7.2,41.9),(-8.3,42.15),(-9.5,41.6)]))
granada_late=clipped(poly([(-4.8,36.35),(-1.7,36.6),(-1.5,37.4),(-2.1,38.2),(-4.8,37.8),(-5.3,37.0)]))
aragon_late=clipped(poly([(-1.9,41),(-.9,39.7),(-.9,38.5),(-.5,38.0),(.7,38.9),(3.3,41.3),(3.3,42.55),(.4,42.55),(-.5,42.35),(-.8,41.9),(-1.9,41.9)]).difference(navarre_late))
castile_late=clipped(poly([(-7.3,37.4),(-5.6,36.4),(-4.8,36.9),(-4.8,37.8),(-2.1,38.2),(-1,38.4),(-.9,39.7),(-1.9,41.0),(-2.5,42.6),(-4.4,43.75),(-8.8,43.75),(-9.4,42.2),(-8.3,42.15),(-7.2,41.9),(-6.9,39.6),(-7.5,38.7)]).difference(unary_union([portugal_late,granada_late,aragon_late,navarre_late])))
iberian_late_regions={'castile-crown':castile_late,'aragon-crown':aragon_late,'portugal-late':portugal_late,'navarre-late':navarre_late,'granada-late':granada_late}
# Nordic reading cores use historical relationships, not modern state polygons.
# Denmark includes a Scanian core; Norway and Sweden omit northern/overseas extents.
denmark_late=clipped(unary_union([poly([(7.7,54.7),(10.9,54.7),(11.0,56.2),(10.7,57.9),(9,58),(7.7,57.3)]),box(9.8,54.7,12.65,56.3),poly([(12.35,55.1),(14.8,55.15),(14.65,56.2),(13.2,56.5),(12.55,56.35)])]))
norway_late=clipped(poly([(4.4,58.2),(7.5,57.8),(10,58.4),(11.7,59.5),(11.5,60.5),(11.5,61.9),(12,64.2),(9.4,64.2),(6.9,62.9),(4.2,61.4)]).difference(denmark_late))
sweden_late=clipped(poly([(11.6,56.4),(12.55,56.35),(13.2,56.5),(14.5,56.2),(16,56.1),(17.2,57.2),(18.7,58.8),(19,60.7),(17.8,61.6),(14,62.5),(11.5,61.9),(11.5,60.5),(11.7,59.5),(11.4,58.5)]).difference(unary_union([denmark_late,norway_late])))
nordic_late_regions={'denmark-late':denmark_late,'norway-late':norway_late,'sweden-late':sweden_late}
# Rus reading cores only locate four different political contexts. Northern domains,
# other principalities and annual military control are intentionally not inferred.
moscow_rus=clipped(poly([(36.4,55.0),(40.9,55.0),(41.8,55.6),(41.8,57.0),(38.4,57.2),(36.7,56.5),(36.1,55.6)]))
tver_rus=clipped(poly([(35.45,56.5),(36.6,56.6),(37.1,57.2),(36.4,57.9),(35.4,58.0),(35.35,57.5)]).difference(moscow_rus))
pskov_rus=clipped(poly([(27.55,56.5),(28.9,56.5),(29.45,57.6),(29.3,58.35),(28.0,58.35),(27.55,57.7)]))
novgorod_rus=clipped(poly([(29.6,57.1),(32.8,56.6),(35.25,56.7),(35.3,57.5),(33.9,58.1),(33.6,60.0),(30.0,60.1),(29.6,58.4)]).difference(unary_union([pskov_rus,tver_rus,moscow_rus])))
rus_late_regions={'moscow-rus':moscow_rus,'tver-rus':tver_rus,'novgorod-rus':novgorod_rus,'pskov-rus':pskov_rus}
features=[]
for year in [900,911,919,925,936,951,955,962,965,973,983,987,996,1000,1002,1014,1024,1027,1032,1034,1056,1077,1084,1100,1105,1106,1111,1122,1125,1133,1138,1152,1155,1158,1162,1167,1176,1177,1183]+high_years+late_years+transition_years:
    realms=base.copy()
    if year>=951:realms['burgundy']=unary_union([realms.pop('upper-burgundy'),realms.pop('provence')])
    if year>=1190:
        realms['england']=england
        realms['sicily']=sicily if year>=1282 else unary_union([sicily,south])
        if year>=1282:realms['south-italy']=south
    if year>=1285:
        realms['west-francia']=clipped(realms['west-francia'].difference(flanders).difference(gascony))
        realms['lotharingia']=clipped(realms['lotharingia'].difference(flanders))
        realms.update({'scotland':scotland,'flanders':flanders,'bohemia':bohemia,'gascony':gascony})
    if year>=1360:
        realms['west-francia']=clipped(realms['west-francia'].difference(new_regions['burgundy-duchy']))
        realms.update(new_regions)
        realms.update(iberian_late_regions)
        realms.update(nordic_late_regions)
        realms.update(rus_late_regions)
    for i,(id,g) in enumerate(realms.items()):
        for other,h in list(realms.items())[i+1:]:assert g.intersection(h).area<1e-7,(year,id,other)
        features.append({'type':'Feature','properties':{'year':year,'id':id,'precision':'schematic','spatialScope':'regional-context','source':('Original editorial Rus reading cores, not yearly control or a united Russian state. See docs/rus-late.md' if id in rus_late_regions else 'Original editorial Nordic reading cores; Danish Scanian rights, Swedish eastern regions and overseas lands require separate detail. See docs/nordic-late.md' if id in nordic_late_regions else 'Original editorial Iberian mainland reading cores. See docs/iberian-late.md' if id in iberian_late_regions else 'Original editorial reading regions; not annual control borders. See docs/medieval-transition.md' if year>=1360 else 'Original editorial reading envelopes; NDB, Golden Bull, Gascon Rolls, HES and Treccani context. See docs/late-medieval.md' if year>=1285 else 'Original editorial envelopes; political context: LVR, NDB, HLS. See docs/frankish-successors.md'),'note':'Fixed reading regions, not annual borders or royal demesne. Shared envelopes do not assert unchanged frontiers. Modern coastline; omitted regions are not ownerless.'},'geometry':mapping(g)})
    checks=[('west-francia',(2.35,48.86)),('burgundy-duchy' if year>=1360 else 'west-francia',(5.04,47.32)),('east-francia',(12.1,49.02)),('east-francia',(11.63,52.13)),('lotharingia',(6.0839,50.7747)),('italy',(9.16,45.18)),('burgundy' if year>=951 else 'provence',(4.84,45.76)),('burgundy' if year>=951 else 'provence',(4.63,43.68)),('burgundy' if year>=951 else 'upper-burgundy',(6.14,46.204)),('burgundy' if year>=951 else 'upper-burgundy',(7.59,47.56))]
    for id,xy in checks:assert realms[id].covers(Point(xy)),(year,id,xy)
    if year>=1190:
        assert realms['england'].covers(Point(-.13,51.5))
        assert not realms['england'].covers(Point(-3.18,51.48)),(year,'Cardiff not English reading region')
        assert not realms['england'].covers(Point(-3.19,55.95)),(year,'Edinburgh not English reading region')
        assert realms['sicily'].covers(Point(13.36,38.12))
        assert realms['south-italy' if year>=1282 else 'sicily'].covers(Point(14.27,40.85))
    if year>=1285:
        for id,xy in [('scotland',(-3.219,55.948)),('flanders',(3.27,50.83)),('gascony',(-.58,44.84)),('gascony',(-1.47,43.49)),('bohemia',(14.42,50.08))]:assert realms[id].covers(Point(xy)),(year,id,xy)
        assert not realms['gascony'].covers(Point(1.44,43.6)),(year,'Toulouse is not Gascon core')
    if year<1360:
        for xy in [(17.60,52.54),(18.74,47.79)]:assert not any(g.covers(Point(xy)) for g in realms.values()),(year,xy)
    if year<1285:assert not any(g.covers(Point(14.42,50.08)) for g in realms.values()),(year,'Prague not in earlier core')
    if year>=1360:
        for id,xy in [('moscow-rus',(37.613577,55.75411)),('moscow-rus',(40.41,56.13)),('moscow-rus',(38.13,56.31)),('tver-rus',(35.91,56.86)),('novgorod-rus',(31.28,58.52)),('novgorod-rus',(31.36,57.99)),('novgorod-rus',(34.97,57.04)),('pskov-rus',(28.33,57.82))]:assert realms[id].covers(Point(xy)),(year,id,xy)
        for xy in [(30.52,50.45),(39.74,54.63),(38.67,53.61),(44,60)]:assert not any(g.covers(Point(xy)) for g in rus_late_regions.values()),(year,'other Rus lands/battle comparison excluded',xy)
        assert not novgorod_rus.covers(Point(28.33,57.82)),(year,'Pskov is a distinct core')
        assert not tver_rus.covers(Point(34.97,57.04)),(year,'Torzhok not a Tver membership assertion')
        for id,xy in [('denmark-late',(12.57,55.68)),('denmark-late',(12.09,55.64)),('denmark-late',(12.7,56.05)),('denmark-late',(8.7648,55.3284)),('norway-late',(5.32,60.39)),('norway-late',(10.75,59.91)),('norway-late',(10.4,63.43)),('sweden-late',(18.07,59.33)),('sweden-late',(17.64,59.86)),('sweden-late',(16.36,56.66)),('sweden-late',(13.7,58.19))]:
            # Natural Earth50m omits narrow coastal/archipelago details around these city references.
            # Keep the catalog point unchanged; allow only documented small clipping offsets.
            tolerance={('denmark-late',(12.57,55.68)):.01,('sweden-late',(18.07,59.33)):.015,('sweden-late',(16.36,56.66)):.05}.get((id,xy),0)
            assert realms[id].distance(Point(xy))<=tolerance,(year,id,xy)
        assert not sweden_late.covers(Point(12.7,56.05)),(year,'Scanian core not Swedish mainland envelope')
        for xy in [(18.29,57.64),(22.27,60.45)]:assert not any(g.covers(Point(xy)) for g in nordic_late_regions.values()),(year,'Gotland and eastern territories linked separately')
        for id,xy in [('castile-crown',(-4.02,39.86)),('castile-crown',(-5.99,37.39)),('castile-crown',(-4.77,37.88)),('portugal-late',(-9.2,38.75)),('portugal-late',(-8.61,41.15)),('portugal-late',(-8.43,40.21)),('aragon-crown',(-.88,41.65)),('aragon-crown',(2.17,41.39)),('aragon-crown',(-.38,39.47)),('navarre-late',(-1.644,42.818)),('navarre-late',(-1.61,42.06)),('granada-late',(-3.59,37.17)),('granada-late',(-4.42,36.72)),('granada-late',(-2.46,36.84))]:assert realms[id].covers(Point(xy)),(year,id,xy)
        assert not any(g.covers(Point(2.65,39.57)) for g in iberian_late_regions.values()),'Mallorca is linked separately, not mainland core'
        assert not any(g.covers(Point(-5.32,35.89)) for g in iberian_late_regions.values()),'Ceuta is not Iberian mainland'
        for id,xy in [('poland',(17.6,52.54)),('poland',(19.94,50.06)),('lithuania',(25.28,54.68)),('hungary',(18.74,47.79)),('hungary',(19.04,47.5)),('straits',(28.95,41.02)),('straits',(29.06,40.19)),('straits',(26.56,41.68))]:assert realms[id].covers(Point(xy)),(year,id,xy)
        for name,xy in [('Gdansk',(18.64,54.35)),('Malbork',(19.03,54.04)),('Wroclaw',(17.04,51.11)),('Vienna',(16.37,48.21))]:assert not any(new_regions[k].covers(Point(xy)) for k in ['poland','lithuania','hungary']),(year,name)
    for name,xy in [('Rome',(12.4964,41.9028)),('Venice',(12.33,45.44)),('Ravenna',(12.20,44.42))]:assert not any(g.covers(Point(xy)) for g in realms.values()),(year,'not direct regional inclusion',name)
output=ROOT/'src/europe/frankish-successor-geometry.json'
output.write_text(json.dumps({'type':'FeatureCollection','features':features},ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
print(f'{len(features)} valid non-overlapping regional envelopes; representative inclusion/exclusion checks passed')
