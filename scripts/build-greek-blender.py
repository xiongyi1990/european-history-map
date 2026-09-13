"""Run via Blender --background --python; generates an editable atlas and preview."""
import bpy
import json
import math
import numpy as np
from pathlib import Path
from mathutils import Vector

root=Path(__file__).resolve().parents[1]
out=root/'blender'
meta=json.loads((out/'terrain-meta.json').read_text(encoding='utf-8'))
heights=np.load(out/'elevation.npy')
west,south,east,north=meta['bounds']
rows,cols=heights.shape
coslat=math.cos(math.radians(38.2))
def xy(lon,lat):return ((lon-(west+east)/2)*111.32*coslat/100,(lat-(south+north)/2)*111.32/100)
def altitude(lon,lat):
    r=min(rows-1,max(0,round((lat-south)/(north-south)*(rows-1))))
    c=min(cols-1,max(0,round((lon-west)/(east-west)*(cols-1))))
    return max(0,float(heights[r,c]))/100000*6

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for d in list(bpy.data.collections):
    if d.name!='Collection':bpy.data.collections.remove(d)
scene=bpy.context.scene
scene.render.engine='CYCLES'
scene.cycles.samples=32
scene.cycles.use_denoising=True
scene.render.resolution_x=1800
scene.render.resolution_y=1400
scene.render.resolution_percentage=100
scene.world.color=(0.65,0.7,0.72)
scene.world.use_nodes=True
background=next(n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND')
background.inputs['Color'].default_value=(0.62,0.68,0.72,1)
background.inputs['Strength'].default_value=0.3
scene.view_settings.view_transform='AgX'
scene.view_settings.look='AgX - Medium High Contrast'

def mat(name,color,rough=0.75,metal=0):
    m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
    bs=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bs.inputs['Base Color'].default_value=(*color,1);bs.inputs['Roughness'].default_value=rough;bs.inputs['Metallic'].default_value=metal
    return m
sea=mat('Sea | muted Aegean blue',(0.10,0.28,0.33),0.60)
paper=mat('Atlas plinth | warm limestone',(0.73,0.68,0.55))
ink=mat('Type | charcoal',(0.008,0.022,0.018))
blue=mat('Athens | blue',(0.03,0.30,0.39),0.42,0.2)
red=mat('Sparta | terracotta',(0.57,0.18,0.10),0.45,0.15)
gold=mat('Neutral | ochre',(0.57,0.41,0.14),0.5)
soft=mat('Reference | slate',(0.25,0.31,0.28))
white=mat('Labels | parchment',(0.97,0.92,0.78))

terrain_mat=bpy.data.materials.new('Terrain | elevation palette');terrain_mat.use_nodes=True
nodes=terrain_mat.node_tree.nodes;links=terrain_mat.node_tree.links
bs=next(n for n in nodes if n.type=='BSDF_PRINCIPLED');bs.inputs['Roughness'].default_value=0.95
attr=nodes.new('ShaderNodeAttribute');attr.attribute_name='height_color'
links.new(attr.outputs['Color'],bs.inputs['Base Color'])

xs=np.linspace(xy(west,south)[0],xy(east,north)[0],cols)
ys=np.linspace(xy(west,south)[1],xy(east,north)[1],rows)
gx,gy=np.meshgrid(xs,ys)
hz=np.where(heights>1,heights/100000*6,-0.018)
verts=np.stack([gx,gy,hz],axis=-1).reshape(-1,3)
faces=[]
for r in range(rows-1):
    for c in range(cols-1):
        i=r*cols+c;faces.append((i,i+1,i+cols+1,i+cols))
mesh=bpy.data.meshes.new('Real elevation grid | WGS84 sampled')
mesh.from_pydata(verts.tolist(),[],faces);mesh.update()
obj=bpy.data.objects.new('01 | Greek terrain — height ×6',mesh);scene.collection.objects.link(obj);obj.data.materials.append(terrain_mat)
obj['source']='Mapzen / AWS Open Data Terrarium; cached source tiles in public/greek-terrain'
obj['vertical_exaggeration']=6
obj['historical_note']='Modern elevation and coastline reference. Not a reconstruction of 431 BCE coastline.'
colors=mesh.color_attributes.new(name='height_color',type='FLOAT_COLOR',domain='POINT')
h=np.clip(heights.flatten()/2000,0,1)
low=np.array([0.24,0.32,0.19]);high=np.array([0.58,0.49,0.32]);rgb=low[None,:]*(1-h[:,None])+high[None,:]*h[:,None]
rgba=np.column_stack([rgb,np.ones(len(h))]).astype(np.float32)
colors.data.foreach_set('color',rgba.flatten())
for p in mesh.polygons:p.use_smooth=True

def cube(name,loc,scale,material,bevel=0):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=scale;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(material)
    if bevel:m=o.modifiers.new('Soft atlas edges','BEVEL');m.width=bevel;m.segments=3;o.modifiers.new('Weighted normals','WEIGHTED_NORMAL')
    return o
w=xs[-1]-xs[0];height=ys[-1]-ys[0]
cube('02 | Atlas base',(0,0,-0.15),(w+0.12,height+0.12,0.28),paper,0.04)
cube('03 | Aegean sea',(0,0,-0.006),(w,height,0.022),sea)
cube('Ground',(0,0,-0.44),(200,200,0.3),mat('Background',(0.86,0.84,0.78)))

font_path=Path('C:/Windows/Fonts/msyh.ttc')
font=bpy.data.fonts.load(str(font_path)) if font_path.exists() else None
def text(name,body,loc,size,material,align='LEFT'):
    curve=bpy.data.curves.new(name,'FONT');curve.body=body;curve.size=size;curve.align_x=align;curve.extrude=0.001;curve.space_character=1.08
    if font:curve.font=font
    o=bpy.data.objects.new(name,curve);scene.collection.objects.link(o);o.location=loc;o.data.materials.append(material);return o
def line(name,points,material,radius=0.009):
    cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.bevel_depth=radius;cu.bevel_resolution=2
    spline=cu.splines.new('POLY');spline.points.add(len(points)-1)
    for p,v in zip(spline.points,points):p.co=(*v,1)
    ob=bpy.data.objects.new(name,cu);scene.collection.objects.link(ob);ob.data.materials.append(material)

records=json.loads((root/'src/greek/pleiades.json').read_text(encoding='utf-8'))
specs=[('579885','雅典','Athens',blue,(0.28,-0.03)),('570685','斯巴达','Sparta',red,(-0.22,-0.28)),('570182','科林斯','Corinth',red,(-0.75,0.20)),('541138','底比斯','Thebes',red,(-0.40,0.42)),('570106','阿尔戈斯','Argos',gold,(-0.80,-0.18)),('530834','科西拉','Corcyra',blue,None),('550496','希俄斯','Chios',blue,(0.18,0.1)),('550763','米提利尼','Mytilene',blue,(-0.55,0.23)),('599799','米利都','Miletus',soft,(0.20,-0.08)),('599612','以弗所','Ephesus',soft,(0.20,0.07)),('570474','米洛斯','Melos',gold,(-0.45,-0.28)),('599971','锡拉','Thera',gold,(0.15,-0.14)),('540960','瑙帕克托斯','Naupactus',blue,(-0.85,0.20)),('540726','德尔斐','Delphi',soft,(-0.55,0.24))]
specified={s[0]:s for s in specs}
athens_ids={'579885','541063','540960','530834','550496','550763','580062','580021','580100'}
sparta_ids={'570685','570182','541138','570468','570707','570668','570220'}
neutral_ids={'570106','570474','599971'}
for pid,record in records.items():
    lon,lat=record['coords']
    if not(west<lon<east and south<lat<north):continue
    x,y=xy(lon,lat);z=altitude(lon,lat)
    spec=specified.get(pid);material=blue if pid in athens_ids else red if pid in sparta_ids else gold if pid in neutral_ids else soft
    bpy.ops.mesh.primitive_cylinder_add(vertices=16,radius=0.024 if spec else 0.016,depth=0.08,location=(x,y,z+0.055))
    pin=bpy.context.object;pin.name='Place | '+record['title'];pin.data.materials.append(material);pin['pleiades_url']=record['url'];pin['location_precision']=record['precision']
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=0.035 if spec else 0.023,location=(x,y,z+0.10));bpy.context.object.data.materials.append(material)
    if spec and spec[4]:
        dx,dy=spec[4];tz=max(0.24,z+0.16)
        line('Label leader | '+spec[2],[(x,y,z+0.11),(x+dx,y+dy,tz)],material,0.005)
        text('Label | '+spec[2],spec[1],(x+dx,y+dy,tz+0.01),0.14,ink)
        text('Latin | '+spec[2],spec[2].upper(),(x+dx,y+dy-0.105,tz+0.01),0.055,ink)

text('Sea label','爱  琴  海',(*xy(25.1,38.5),0.025),0.24,white,'CENTER')
text('Sea label English','A E G E A N   S E A',(*xy(25.1,38.22),0.025),0.075,white,'CENTER')
text('Region label','伯 罗 奔 尼 撒',(*xy(21.6,36.25),0.07),0.12,ink)
text('Map title','古希腊 · 山海之间',(-w/2+0.22,height/2-0.32,0.40),0.22,ink)
text('Map subtitle','431 BCE  /  A READING ATLAS',(-w/2+0.22,height/2-0.56,0.40),0.095,ink)
text('North','N',(-w/2+0.20,height/2-0.93,0.38),0.13,ink)
line('North arrow',[(-w/2+0.25,height/2-1.4,0.36),(-w/2+0.25,height/2-1.02,0.36)],ink)
text('Scale and caution','现代地形参考 · 高度放大 6 倍 · 未绘制城邦疆界',(-w/2+0.22,-height/2+0.20,0.14),0.087,ink)
for i,(name,material) in enumerate([('雅典一方',blue),('斯巴达一方',red),('开战时中立',gold),('地理参考点',soft)]):
    x=-w/2+0.25+i*1.35;y=-height/2+0.48
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=0.03,location=(x,y,0.15));bpy.context.object.data.materials.append(material)
    text('Legend | '+name,name,(x+0.08,y-0.015,0.16),0.08,ink)
text('Attribution','TERRAIN  Mapzen / AWS   •   PLACES  Pleiades contributors (CC BY 3.0)',(-w/2+0.22,-height/2+0.06,0.14),0.051,ink)

bpy.ops.object.light_add(type='AREA',location=(-3,-4,9));key=bpy.context.object;key.name='Soft north-west light';key.data.energy=1100;key.data.shape='DISK';key.data.size=5
bpy.ops.object.light_add(type='AREA',location=(5,3,7));bpy.context.object.data.energy=400;bpy.context.object.data.size=6
bpy.ops.object.camera_add(location=(0,-10.5,11.8));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=9.3;scene.camera=cam
scene['read_me']='Greek reading atlas. 431 BCE topic; not a complete 431 BCE political reconstruction. Modern elevation ×6. Pleiades representative place positions; sources on marker custom properties.'
for area in bpy.context.screen.areas:
    if area.type=='VIEW_3D':area.spaces.active.region_3d.view_perspective='CAMERA'
scene.render.filepath=str(out/'greek-reading-atlas.png')
bpy.ops.wm.save_as_mainfile(filepath=str(out/'greek-reading-atlas.blend'))
bpy.ops.render.render(write_still=True)
print('BLENDER_ATLAS_COMPLETE',flush=True)
