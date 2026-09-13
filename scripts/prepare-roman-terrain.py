"""Regional Roman-world elevation cache, preserving the existing Greek atlas."""
import concurrent.futures, io, json, math, pathlib, urllib.request, time
import numpy as np
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parents[1]/'public'
BOUNDS=(-11,25,43,57)
def xy(lon,lat,z):
    return int((lon+180)/360*2**z),int((1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*2**z)
jobs=set()
for z in range(9):
    x0,y0=xy(BOUNDS[0],BOUNDS[3],z);x1,y1=xy(BOUNDS[2],BOUNDS[1],z)
    jobs.update((z,x,y) for x in range(x0,x1+1) for y in range(y0,y1+1))
def work(j):
    z,x,y=j;rel=pathlib.Path(str(z))/str(x)/f'{y}.png'
    raw=ROOT/'roman-surface'/rel;flat=ROOT/'roman-terrain'/rel
    if raw.exists() and flat.exists():return True
    for attempt in range(3):
        try:
            greek=ROOT/'greek-surface'/rel
            data=raw.read_bytes() if raw.exists() else greek.read_bytes() if greek.exists() else urllib.request.urlopen(f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',timeout=25).read()
            im=Image.open(io.BytesIO(data)).convert('RGB');assert im.size==(256,256)
            raw.parent.mkdir(parents=True,exist_ok=True);raw.write_bytes(data)
            p=np.asarray(im).copy();p[p[:,:,0]<128]=[128,0,0]
            flat.parent.mkdir(parents=True,exist_ok=True);Image.fromarray(p).save(flat)
            return True
        except Exception as e:
            if attempt==2:print(f'FAILED {j}: {e}',flush=True);return False
            time.sleep(.5)
print(f'Roman region: {len(jobs)} tile pairs',flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=14) as pool:
    done=0;failed=0
    for f in concurrent.futures.as_completed([pool.submit(work,j) for j in sorted(jobs,reverse=True)]):
        done+=1;failed+=not f.result()
        if done%150==0:print(f'{done}/{len(jobs)}, failed {failed}',flush=True)
if failed:raise SystemExit(1)
(ROOT/'roman-surface'/'manifest.json').write_text(json.dumps({'bounds':BOUNDS,'maxzoom':8,'tileSize':256,'tiles':len(jobs),'source':'https://registry.opendata.aws/terrain-tiles/','license':'https://github.com/tilezen/joerd/blob/master/docs/attribution.md','geometry':'Negative elevation clamped to sea level; original depth retained for color only.'},indent=2),encoding='utf-8')
print('Roman terrain cache complete',flush=True)
