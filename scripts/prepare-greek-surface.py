"""Cache real Terrarium elevations for both depth coloring and sea-level 3D terrain."""
import concurrent.futures
import io
import json
import math
import pathlib
import time
import urllib.request
import numpy as np
from PIL import Image

PUBLIC = pathlib.Path(__file__).resolve().parents[1] / 'public'
BOUNDS = (13, 33, 31, 43)

def xy(lon, lat, z):
    n = 2 ** z
    return int((lon + 180) / 360 * n), int((1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n)

jobs = set()
for z in range(10):
    bounds = (-16, 23, 48, 56) if z < 6 else BOUNDS
    x0, y0 = xy(bounds[0], bounds[3], z)
    x1, y1 = xy(bounds[2], bounds[1], z)
    jobs.update((z,x,y) for x in range(x0,x1+1) for y in range(y0,y1+1))

def download(job):
    z, x, y = job
    raw = PUBLIC / 'greek-surface' / str(z) / str(x) / f'{y}.png'
    terrain = PUBLIC / 'greek-terrain' / str(z) / str(x) / f'{y}.png'
    if raw.exists() and terrain.exists():
        return True
    for attempt in range(3):
        try:
            data = raw.read_bytes() if raw.exists() else urllib.request.urlopen(
                f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',timeout=25).read()
            im = Image.open(io.BytesIO(data)).convert('RGB')
            if im.size != (256,256):
                raise ValueError('Unexpected DEM dimensions')
            raw.parent.mkdir(parents=True,exist_ok=True)
            raw.write_bytes(data)
            pixels = np.asarray(im).copy()
            pixels[pixels[:,:,0]<128]=[128,0,0]
            terrain.parent.mkdir(parents=True,exist_ok=True)
            Image.fromarray(pixels).save(terrain)
            return True
        except Exception as e:
            if attempt == 2:
                print(f'FAILED {job}: {e}',flush=True)
                return False
            time.sleep(0.5)

print(f'Preparing {len(jobs)} elevation tiles through zoom 9',flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=14) as pool:
    pending = [pool.submit(download,j) for j in sorted(jobs,reverse=True)]
    completed = 0
    failed = 0
    for future in concurrent.futures.as_completed(pending):
        failed += not future.result()
        completed += 1
        if completed % 80 == 0:
            print(f'{completed}/{len(jobs)} completed, {failed} failed',flush=True)
if failed:
    raise SystemExit(1)
manifest={'source':'https://registry.opendata.aws/terrain-tiles/','attribution':'Mapzen / AWS Open Data; underlying providers: https://github.com/tilezen/joerd/blob/master/docs/attribution.md',
          'bounds':BOUNDS,'maxzoom':9,'tileSize':256,'tiles':len(jobs),'surface':'Original elevation including negative seabed values; color-relief represents elevation, not vegetation or ancient coastlines.',
          'terrain':'Below sea level clamped to zero for a flat sea surface; visual vertical exaggeration is configured in the app.'}
(PUBLIC/'greek-surface'/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Complete: {len(jobs)} surface + {len(jobs)} terrain tiles',flush=True)
