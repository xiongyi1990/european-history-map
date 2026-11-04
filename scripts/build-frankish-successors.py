"""Reproducible regional reading envelopes for 900–1356; NOT annual borders.
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
features=[]
for year in [900,911,919,925,936,951,955,962,965,973,983,987,996,1000,1002,1014,1024,1027,1032,1034,1056,1077,1084,1100,1105,1106,1111,1122,1125,1133,1138,1152,1155,1158,1162,1167,1176,1177,1183]+high_years+late_years:
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
    for i,(id,g) in enumerate(realms.items()):
        for other,h in list(realms.items())[i+1:]:assert g.intersection(h).area<1e-7,(year,id,other)
        features.append({'type':'Feature','properties':{'year':year,'id':id,'precision':'schematic','spatialScope':'regional-context','source':('Original editorial reading envelopes; NDB, Golden Bull, Gascon Rolls, HES and Treccani context. See docs/late-medieval.md' if year>=1285 else 'Original editorial envelopes; political context: LVR, NDB, HLS. See docs/frankish-successors.md'),'note':'Fixed reading regions, not annual borders or royal demesne. Shared envelopes do not assert unchanged frontiers. Modern coastline; omitted regions are not ownerless.'},'geometry':mapping(g)})
    checks=[('west-francia',(2.35,48.86)),('west-francia',(5.04,47.32)),('east-francia',(12.1,49.02)),('east-francia',(11.63,52.13)),('lotharingia',(6.0839,50.7747)),('italy',(9.16,45.18)),('burgundy' if year>=951 else 'provence',(4.84,45.76)),('burgundy' if year>=951 else 'provence',(4.63,43.68)),('burgundy' if year>=951 else 'upper-burgundy',(6.14,46.204)),('burgundy' if year>=951 else 'upper-burgundy',(7.59,47.56))]
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
    if year<1285:assert not any(g.covers(Point(14.42,50.08)) for g in realms.values()),(year,'Prague not in earlier core')
    for name,xy in [('Rome',(12.4964,41.9028)),('Gniezno',(17.60,52.54)),('Esztergom',(18.74,47.79)),('Venice',(12.33,45.44)),('Ravenna',(12.20,44.42))]:assert not any(g.covers(Point(xy)) for g in realms.values()),(year,'not direct regional inclusion',name)
output=ROOT/'src/europe/frankish-successor-geometry.json'
output.write_text(json.dumps({'type':'FeatureCollection','features':features},ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
print(f'{len(features)} valid non-overlapping regional envelopes; representative inclusion/exclusion checks passed')
