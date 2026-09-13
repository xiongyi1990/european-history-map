"""Cache public AWS elevation tiles for the first reading region; no credentials."""
import concurrent.futures
import io
import math
import pathlib
import urllib.request
from PIL import Image
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'public' / 'greek-terrain'

def xy(lon, lat, z):
    n = 2 ** z
    return int((lon + 180) / 360 * n), int((1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n)

jobs = set()
for z in range(9):
    bounds = (-16, 23, 48, 56) if z < 6 else (13, 33, 31, 43)
    x0, y0 = xy(bounds[0], bounds[3], z)
    x1, y1 = xy(bounds[2], bounds[1], z)
    for x in range(x0, x1 + 1):
        for y in range(y0, y1 + 1):
            jobs.add((z, x, y))

def download(job):
    z, x, y = job
    dest = ROOT / str(z) / str(x) / f'{y}.png'
    if dest.exists():
        return True
    for attempt in range(3):
        try:
            data = urllib.request.urlopen(f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png', timeout=20).read()
            if not data.startswith(b'\x89PNG'):
                raise ValueError('not a PNG')
            dest.parent.mkdir(parents=True, exist_ok=True)
            image=Image.open(io.BytesIO(data)).convert('RGB')
            pixels=np.asarray(image).copy()
            below_sea=pixels[:,:,0]<128
            pixels[below_sea]=[128,0,0]
            Image.fromarray(pixels).save(dest)
            return True
        except Exception:
            if attempt == 2:
                print('failed', job, flush=True)
                return False

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool:
    results = list(pool.map(download, sorted(jobs)))
print(f'terrain tiles: {sum(results)}/{len(jobs)}', flush=True)
if not all(results):
    raise SystemExit(1)
