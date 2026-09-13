"""Sample the cached Terrarium DEM into a projected regional grid for Blender."""
import json
import math
from pathlib import Path
import numpy as np
from PIL import Image

root=Path(__file__).resolve().parents[1]
dest=root/'blender'
dest.mkdir(exist_ok=True)
west,south,east,north=20.1,35.6,28.8,40.8
cols,rows=700,540
lng=np.linspace(west,east,cols)
lat=np.linspace(south,north,rows)
xx,yy=np.meshgrid(lng,lat)
z=8
px=(xx+180)/360*(2**z)*256
py=(1-np.arcsinh(np.tan(np.radians(yy)))/np.pi)/2*(2**z)*256
tx=(px//256).astype(int)
ty=(py//256).astype(int)
heights=np.zeros_like(xx)
for x,y in set(zip(tx.flatten(),ty.flatten())):
    tile=np.asarray(Image.open(root/'public'/'greek-terrain'/str(z)/str(x)/f'{y}.png')).astype(float)
    mask=(tx==x)&(ty==y)
    c=tile[(py[mask]%256).astype(int),(px[mask]%256).astype(int)]
    heights[mask]=c[:,0]*256+c[:,1]+c[:,2]/256-32768
np.save(dest/'elevation.npy',heights.astype(np.float32))
(dest/'terrain-meta.json').write_text(json.dumps(dict(bounds=[west,south,east,north],rows=rows,cols=cols,projection='Local equirectangular, latitude origin 38.2 degrees; 1 Blender unit = 100 km',height_exaggeration=6,source='https://registry.opendata.aws/terrain-tiles/',data='Mapzen Terrarium elevation tiles; modern terrain, not ancient coastline'),indent=2),encoding='utf-8')
print('Elevation grid:',cols,rows,'max m:',float(heights.max()))
