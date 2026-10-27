"""Original editorial envelopes; schematic relationships, never surveyed borders.
See docs/frankish-partitions.md. Modern land is public-domain Natural Earth.
"""
import json
from pathlib import Path
from shapely.geometry import Polygon, MultiPolygon, Point, box, shape, mapping
from shapely.ops import unary_union
ROOT=Path(__file__).resolve().parents[1]
def poly(r):
 p=Polygon(r)
 assert p.is_valid
 return p
# Internal seams are shared; coordinates are hand-authored broad corridors.
wm=[(3.8,51.7),(3.3,50.8),(4.25,50),(4.7,49.7),(5.15,48.8),(5.45,47.7),(5.15,47),(4.65,46.2),(4.65,45.2),(4.1,44.7),(4.3,43.8),(4.5,43.1)]
me=[(7.2,53.7),(7,52.5),(6.8,51.9),(6.3,50.9),(6.75,50.5),(7.4,49.9),(8.35,49.6),(8.2,48.8),(7.9,48),(7.55,47.6)]
alps=[(7.55,47.6),(8.4,47.1),(9.5,47.2),(10.5,46.8),(12.4,46.7),(13.4,46.3)]
west=poly([*wm,(3.5,42.1),(2.15,41.35),(1.3,41.8),(.2,42.8),(-1.7,43.3),(-2.2,46),(-1.65,47.3),(-1.5,48.5),(-2,49.5),(.5,50.4),(2,51.5)])
north=poly([*wm[:8],(6.7,46.2),*reversed(me),(5.6,53.8),(4.4,53)])
prov=poly([*wm[7:],(7.5,42.7),(7.5,43.7),(6.8,44.5),(7.1,45.2),(6.7,46.2)])
italy=poly([(6.7,46.2),(7.55,47.6),*alps[1:],(13.3,45.8),(12.1,45.5),(11.5,44.7),(12.6,43.5),(12.25,43),(11.5,42.6),(10.6,42.8),(8.8,43.8),(7.5,43.7),(6.8,44.5),(7.1,45.2)])
east=poly([*me,*alps[1:],(15.7,46.6),(16.1,48),(14.6,48.9),(13,49.5),(12.2,50.5),(12,51.6),(11.6,52.6),(10.6,53.6),(9.8,54.1),(8.6,54.2)])
# 870: eastern/northern allotment; do not use a modern country's silhouette.
seam870=[(5.5,54),(5.6,52.2),(5.5,51.5),(5.7,50.7),(5.9,50),(6.2,49.3),(6.5,48.4),(6.8,47.5),(7.3,46.2)]
east870=north.intersection(poly([*seam870,(20,46.2),(20,55),(5.5,55)]))
west870=north.difference(east870)
# Lyon/Vienne stay separate from southern Provence inherited by Italy in 863.
upper_prov=prov.intersection(box(-10,44.5,20,60))
lower_prov=prov.difference(upper_prov)
# Deliberately unresolved band, not a third polity or an uninhabited strip.
jura=poly([(5.6,46.2),(6.7,46.2),(7,47.1),(6.1,47.4),(5.6,46.9)])
frames={
843:{'west-francia':west,'middle-francia':unary_union([north,prov,italy]),'east-francia':east},
855:{'west-francia':west,'lotharingia':north,'provence':prov,'italy':italy,'east-francia':east},
870:{'west-francia':unary_union([west,west870,upper_prov]).difference(jura),'east-francia':unary_union([east,east870]).difference(jura),'italy':unary_union([italy,lower_prov])},
880:{'west-francia':west,'east-francia':unary_union([east,north]).difference(jura),'italy':italy,'provence':prov},
}
land=unary_union([shape(f['geometry']) for f in json.loads((ROOT/'public/europe-reference/ne_50m_admin_0_countries.geojson').read_text(encoding='utf-8'))['features']]).simplify(.018,preserve_topology=True)
features=[]
for year,realms in frames.items():
 for id,g in realms.items():
  clipped=g.intersection(land)
  pieces=list(clipped.geoms) if hasattr(clipped,'geoms') else [clipped]
  g=MultiPolygon([p for p in pieces if p.geom_type=='Polygon' and p.area>.003])
  assert g.is_valid and not g.is_empty,(year,id)
  realms[id]=g
  features.append({'type':'Feature','properties':{'year':year,'id':id,'precision':'schematic','source':'INSEI 843; LVR Lothar II; Wallonie atlas 870/880; Schneider 2018','note':'Original editorial reading envelopes. Modern coastline. Unresolved Jura band in 870/880; omitted peripheral areas are not ownerless.'},'geometry':mapping(g)})
 for i,(id,g) in enumerate(realms.items()):
  for other,h in list(realms.items())[i+1:]:assert g.intersection(h).area<1e-7,(year,id,other)
 # Representative, source-supported cities catch misplaced political seams.
 for id,xy in [('west-francia',(2.35,48.86)),('east-francia',(12.1,49.02)),('middle-francia' if year==843 else 'italy',(9.16,45.18)),('middle-francia' if year==843 else 'lotharingia' if year==855 else 'east-francia',(6.0839,50.7747)),('middle-francia' if year==843 else 'provence' if year in [855,880] else 'west-francia',(4.84,45.76))]:assert realms[id].covers(Point(xy)),(year,id,xy)
 assert not any(g.covers(Point(12.4964,41.9028)) for g in realms.values()),'Do not color Rome as royal direct land'
 assert not any(g.covers(Point(14.42,50.08)) for g in realms.values()),'Do not include Prague'
(ROOT/'src/europe/frankish-partition-geometry.json').write_text(json.dumps({'type':'FeatureCollection','features':features},ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
print(f'{len(features)} non-overlapping, land-clipped schematic areas; city checks passed')
