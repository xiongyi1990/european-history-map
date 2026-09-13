"""Cache Europe terrain and versioned Natural Earth reference geography."""
import concurrent.futures, io, json, math, pathlib, urllib.request, time, hashlib
import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'public'
BOUNDS = (-25, 24, 55, 72)
def fetch(url):
    with urllib.request.urlopen(url, timeout=40) as r: return r.read()
def xy(lon, lat, z):
    return int((lon+180)/360*2**z), int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*2**z)
jobs = set()
for z in range(8):
    x0,y0=xy(BOUNDS[0],BOUNDS[3],z);x1,y1=xy(BOUNDS[2],BOUNDS[1],z)
    jobs.update((z,x,y) for x in range(x0,x1+1) for y in range(y0,y1+1))
def work(j):
    z,x,y=j; rel=pathlib.Path(str(z))/str(x)/f'{y}.png'
    raw=ROOT/'europe-surface'/rel; flat=ROOT/'europe-terrain'/rel
    if raw.exists() and flat.exists(): return True
    for attempt in range(3):
        try:
            existing=next((ROOT/p/rel for p in ['europe-surface','roman-surface','greek-surface'] if (ROOT/p/rel).exists()),None)
            data=existing.read_bytes() if existing else fetch(f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png')
            im=Image.open(io.BytesIO(data)).convert('RGB'); assert im.size==(256,256)
            raw.parent.mkdir(parents=True,exist_ok=True);raw.write_bytes(data)
            p=np.asarray(im).copy();p[p[:,:,0]<128]=[128,0,0]
            flat.parent.mkdir(parents=True,exist_ok=True);Image.fromarray(p).save(flat)
            return True
        except Exception as e:
            if attempt==2: print(f'FAILED {j}: {e}',flush=True); return False
            time.sleep(.5)
print(f'Europe: {len(jobs)} terrain pairs',flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
    results=[]
    for result in pool.map(work,sorted(jobs)):
        results.append(result)
        if len(results)%200==0: print(f'{len(results)}/{len(jobs)}',flush=True)
if not all(results): raise SystemExit('Incomplete terrain cache; rerun safely')
(ROOT/'europe-surface'/'manifest.json').write_text(json.dumps({'bounds':BOUNDS,'maxzoom':7,'tiles':len(jobs),'source':'https://registry.opendata.aws/terrain-tiles/','accessed':'2026-09-10','geometry':'Negative elevations clamped to sea level; original elevations used for colors'},indent=2))

out=ROOT/'europe-reference';out.mkdir(exist_ok=True)
manifest={'version':'Natural Earth v5.1.1','accessed':'2026-09-10','license':'Public domain','note':'Versioned geographic reference; not a live 2026 political map.','files':{}}
for name in ['ne_50m_admin_0_countries','ne_50m_rivers_lake_centerlines','ne_50m_populated_places']:
    url=f'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.1/geojson/{name}.geojson'
    data=fetch(url); fc=json.loads(data); assert fc['type']=='FeatureCollection'
    (out/f'{name}.geojson').write_bytes(data)
    manifest['files'][name]={'url':url,'sha256':hashlib.sha256(data).hexdigest(),'features':len(fc['features'])}
    print(name,len(fc['features']),flush=True)
(out/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print('EUROPE_ASSETS_READY',flush=True)
