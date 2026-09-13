"""Verify local geography files and retain hashes; this does not verify historical claims."""
import hashlib,json,math,pathlib,datetime
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]
public=ROOT/'public'
def coordinates(x):
    if isinstance(x[0],(int,float)): yield x
    else:
        for child in x: yield from coordinates(child)
files=[]
for p in sorted((public/'historical-boundaries').glob('world_*.geojson')):
    data=p.read_bytes();fc=json.loads(data);assert fc['type']=='FeatureCollection'
    total=0
    for f in fc['features']:
        assert f['geometry']['type'] in ['Polygon','MultiPolygon']
        assert f['properties']['name'] and f['properties']['subject']
        for point in coordinates(f['geometry']['coordinates']):
            assert len(point)>=2 and all(math.isfinite(n) for n in point[:2])
            assert -180<=point[0]<=180 and -90<=point[1]<=90
            total+=1
    files.append({'file':p.name,'features':len(fc['features']),'coordinates':total,'sha256':hashlib.sha256(data).hexdigest()})
assert len(files)==45
manifest={'source':'https://github.com/aourednik/historical-basemaps','license':'GPL-3.0','original_revision':'Unknown; these are pre-existing transformed project files, not a newly version-pinned upstream import.','review':'Candidate historical reference areas. Shape and coordinate checks do not establish historical accuracy.','transformation':'scripts/generate-historical-boundaries.mjs retains features intersecting a Europe-region bbox; NAME -> name, SUBJECTO -> subject, PARTOF -> partOf, BORDERPRECISION -> borderPrecision. PARTOF denotes cultural association, not political authority.','files':files}
(public/'historical-boundaries'/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
tiles=list((public/'europe-surface').glob('*/*/*.png'));assert len(tiles)==1195
for p in tiles:
    flat=public/'europe-terrain'/p.relative_to(public/'europe-surface');assert flat.exists()
    for file in [p,flat]:
        with Image.open(file) as im: assert im.size==(256,256);im.verify()
reference=json.loads((public/'europe-reference'/'manifest.json').read_text())
for name,entry in reference['files'].items():
    assert hashlib.sha256((public/'europe-reference'/f'{name}.geojson').read_bytes()).hexdigest()==entry['sha256']
report={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'historical_files':len(files),'terrain_pairs':len(tiles),'reference_files':len(reference['files']),'checks':'GeoJSON types, finite geographic coordinates, PNG dimensions/integrity, file hashes','historical_accuracy_verified':False}
out=ROOT/'artifacts'/'europe-atlas';out.mkdir(parents=True,exist_ok=True)
(out/'asset-verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
