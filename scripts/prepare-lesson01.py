"""Prepare modern elevation references for three original lesson companion maps."""
import concurrent.futures,io,json,pathlib,urllib.request
import numpy as np
from PIL import Image
root=pathlib.Path(__file__).resolve().parents[1]
out=root/'blender'/'lesson-01';out.mkdir(parents=True,exist_ok=True)
scenes=[('01-europe',[-14,28,66,72],6,850,760),('02-straits',[24,38,31,42.7],8,720,760),('03-memory',[19,31,37,41.5],8,850,660)]
cache=out/'terrain-cache'
for name,bounds,z,cols,rows in scenes:
    west,south,east,north=bounds
    lon,lat=np.meshgrid(np.linspace(west,east,cols),np.linspace(south,north,rows))
    px=(lon+180)/360*2**z*256;py=(1-np.arcsinh(np.tan(np.radians(lat)))/np.pi)/2*2**z*256
    tx=(px//256).astype(int);ty=(py//256).astype(int)
    jobs=set(zip(tx.flatten().tolist(),ty.flatten().tolist()))
    def tile(job):
        x,y=job;rel=pathlib.Path(str(z))/str(x)/f'{y}.png'
        candidates=[root/'public'/'roman-surface'/rel,root/'public'/'greek-surface'/rel,cache/rel]
        existing=next((p for p in candidates if p.exists()),None)
        if existing:data=existing.read_bytes()
        else:
            for attempt in range(3):
                try:data=urllib.request.urlopen(f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',timeout=25).read();break
                except Exception:
                    if attempt==2:raise
            p=cache/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(data)
        a=np.asarray(Image.open(io.BytesIO(data)).convert('RGB')).astype(float)
        mask=(tx==x)&(ty==y);rgb=a[(py[mask]%256).astype(int),(px[mask]%256).astype(int)]
        return mask,rgb[:,0]*256+rgb[:,1]+rgb[:,2]/256-32768
    heights=np.empty_like(lon)
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        for mask,values in pool.map(tile,jobs):heights[mask]=values
    np.save(out/f'{name}.npy',heights.astype(np.float32))
    (out/f'{name}.json').write_text(json.dumps({'bounds':bounds,'rows':rows,'cols':cols,'zoom':z,'tile_count':len(jobs),'source':'https://registry.opendata.aws/terrain-tiles/','modern_terrain':True}),encoding='utf-8')
    print(name,'ready',len(jobs),'tiles',flush=True)
