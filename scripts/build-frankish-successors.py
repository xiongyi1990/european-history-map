"""Reproducible regional reading envelopes for 900–1000; NOT annual borders.
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
features=[]
for year in [900,911,925,962,987,1000]:
    realms=base.copy()
    if year>=962:realms['burgundy']=unary_union([realms.pop('upper-burgundy'),realms.pop('provence')])
    for i,(id,g) in enumerate(realms.items()):
        for other,h in list(realms.items())[i+1:]:assert g.intersection(h).area<1e-7,(year,id,other)
        features.append({'type':'Feature','properties':{'year':year,'id':id,'precision':'schematic','spatialScope':'regional-context','source':'Original editorial envelopes; political context: LVR, NDB, HLS. See docs/frankish-successors.md','note':'Fixed reading regions, not annual borders or royal demesne. Shared envelopes do not assert unchanged frontiers. Modern coastline; omitted regions are not ownerless.'},'geometry':mapping(g)})
    checks=[('west-francia',(2.35,48.86)),('west-francia',(5.04,47.32)),('east-francia',(12.1,49.02)),('east-francia',(11.63,52.13)),('lotharingia',(6.0839,50.7747)),('italy',(9.16,45.18)),('burgundy' if year>=962 else 'provence',(4.84,45.76)),('burgundy' if year>=962 else 'provence',(4.63,43.68)),('burgundy' if year>=962 else 'upper-burgundy',(6.14,46.204)),('burgundy' if year>=962 else 'upper-burgundy',(7.59,47.56))]
    for id,xy in checks:assert realms[id].covers(Point(xy)),(year,id,xy)
    for name,xy in [('Rome',(12.4964,41.9028)),('Prague',(14.42,50.08)),('Gniezno',(17.60,52.54)),('Esztergom',(18.74,47.79)),('Venice',(12.33,45.44)),('Ravenna',(12.20,44.42))]:assert not any(g.covers(Point(xy)) for g in realms.values()),(year,'not direct regional inclusion',name)
output=ROOT/'src/europe/frankish-successor-geometry.json'
output.write_text(json.dumps({'type':'FeatureCollection','features':features},ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
print(f'{len(features)} valid non-overlapping regional envelopes; representative inclusion/exclusion checks passed')
