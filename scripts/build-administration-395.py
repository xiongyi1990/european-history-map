"""Build a schematic, land-clipped reading layer, NOT surveyed Roman borders.

Requires shapely. Hand-authored envelopes follow the broad four-prefecture
grouping of Shepherd, Historical Atlas (1923), pp.42–43. Their coordinates are
editorial approximations, not a georeferenced tracing. See docs/administration-395.md.
"""
import json
from pathlib import Path
from shapely.geometry import Polygon, MultiPolygon, shape, mapping
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[1]
# Shared internal edges are defined once to avoid overlaps between envelopes.
gaul_italy = [[7.5,43.7],[7.0,44.4],[6.7,45.2],[7.1,46.0],[8.3,46.5],[8.6,47.6]]
italy_illyricum = [[19.4,41.8],[19.4,42.6],[19.2,43.5],[19.4,44.3],[20.5,44.8]]
illyricum_east = [[24.5,40.7],[24.5,41.3],[24.0,42.0],[23.8,42.9],[23.0,43.8]]
aegean = [[24.5,40.7],[25.5,40],[25.5,36],[26.5,35.5],[26.5,34.7]]
envelopes = {
 'gaul': [
  [[-10,43.9],[-5.5,48.8],[1.5,51.5],[4.5,52.0],[6.2,51.9],[6.8,50.9],[7.7,49.9],[8.5,49.0],[8.6,47.6],*list(reversed(gaul_italy[:-1])),[3.4,41.9],[4.5,39.5],[3.1,38.1],[-1,37.0],[-5.4,35.8],[-10,36]],
  [[-5.6,50],[-5.6,54.6],[-3.2,55.05],[-2.1,55.0],[-1.5,55.1],[2,54],[2,50]],
  [[-6.7,35],[-6.3,36],[-4.6,36],[-4.6,35],[-5.3,34.7]],
 ],
 'italy': [
  [*gaul_italy,[8.6,48.0],[10.0,48.6],[12,49],[13.4,48.6],[16.3,48.3],[18.8,47.8],[19.0,47.0],[18.8,45.6],[20.5,44.8],*list(reversed(italy_illyricum[:-1])),[18.4,39.5],[19,38],[16.5,35.3],[11,36],[7.8,38],[7.5,43.7]],
  [[-2.2,35.3],[1,37.2],[6,37.7],[11.3,37.7],[12.5,33.2],[16,32.3],[19.7,31.5],[19.7,29.7],[16,30.8],[11,32.2],[8.5,34],[4,34.3],[0,34.5],[-2.2,34.7]],
 ],
 'illyricum': [
  [*italy_illyricum,[22.5,44.7],[23,43.8],*list(reversed(illyricum_east[:-1])),*aegean[1:],[22.5,34.6],[19,36],[19.4,41.8]],
 ],
 'east': [
  [*illyricum_east,[25,43.7],[27,44.1],[28.2,45.2],[29.7,45.3],[30,42.2],[34,42.4],[39,41.4],[41.5,41.7],[41.5,39.5],[39.0,38.5],[39.8,37.7],[39.0,36.8],[37.5,36.0],[37.5,33.2],[36.2,31.3],[35.7,29],[35,28.6],[34.7,27.7],[33.8,28.1],[32,27],[32.0,25.8],[30.6,25.8],[28.5,28.6],[25,30],[23,30],[21,29.4],[19.7,29.7],[19.7,31.5],[19,33.5],[28,34.5],*list(reversed(aegean))],
 ],
}
land_data = json.loads((ROOT/'public/europe-reference/ne_50m_admin_0_countries.geojson').read_text(encoding='utf-8'))
land = unary_union([shape(f['geometry']) for f in land_data['features']])
features = []
geometries = []
for key, rings in envelopes.items():
    masks = [Polygon(r) for r in rings]
    assert all(p.is_valid for p in masks), key
    g = unary_union(masks).intersection(land).simplify(.025, preserve_topology=True)
    pieces = list(g.geoms) if hasattr(g,'geoms') else [g]
    g = MultiPolygon([p for p in pieces if p.geom_type == 'Polygon' and p.area > .002])
    assert g.is_valid and not g.is_empty, key
    geometries.append(g)
    features.append({'type':'Feature','properties':{'id':key,'year':395,'precision':'schematic','source':'Shepherd 1923 pp.42–43','southernExtent':'Egypt south of 25.8N omitted'},'geometry':mapping(g)})
for i,a in enumerate(geometries):
    for b in geometries[i+1:]:
        assert a.intersection(b).area < .002, 'Unexpected interior overlap'
out = ROOT/'src/europe/administration-395-geometry.json'
out.write_text(json.dumps({'type':'FeatureCollection','features':features},ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
print(f'{len(features)} schematic administrative areas -> {out.name}')
