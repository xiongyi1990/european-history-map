"""Extract attributed Pleiades records for the approved Greek reading sample."""
import csv
import io
import json
import pathlib
import urllib.request
import zipfile

root = pathlib.Path(__file__).resolve().parents[1]
cache = root / 'scripts' / '.pleiades-places.json'
if cache.exists():
    rows = json.loads(cache.read_text(encoding='utf-8'))
else:
    data = urllib.request.urlopen('https://atlantides.org/downloads/pleiades/gis/pleiades_gis_data.zip', timeout=60).read()
    z = zipfile.ZipFile(io.BytesIO(data))
    name = next(n for n in z.namelist() if n.endswith('/places.csv') or n == 'places.csv')
    rows = list(csv.DictReader(io.TextIOWrapper(z.open(name), encoding='utf-8-sig')))

ids = ['579885','570685','570182','541138','570106','570468','541063','540960','530834','550496','550763','570474','599971','570707','570668','570220','580062','580021','580100','540726','570531','599587','599925','599799','599612','462503']
by_id = {r['id']: r for r in rows}
result = {}
for id in ids:
    r = by_id[id]
    result[id] = dict(title=r['title'], coords=[float(r['representative_longitude']), float(r['representative_latitude'])], precision=r['location_precision'], description=r['description'], url=f'https://pleiades.stoa.org/places/{id}', retrieved='2026-09-07', license='CC BY 3.0; Pleiades contributors')
dest = root / 'src' / 'greek' / 'pleiades.json'
dest.parent.mkdir(exist_ok=True)
dest.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Extracted {len(result)} attributed place records')
