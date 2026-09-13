"""Build original, editable Blender maps accompanying Gu Heng lesson 02."""
import bpy,json,math
import numpy as np
from pathlib import Path
from mathutils import Vector
root=Path(__file__).resolve().parents[1];out=root/'blender'/'lesson-02'
config=json.loads((root/'scripts'/'lesson02-scenes.json').read_text(encoding='utf-8'))
course=config['source']
bpy.context.preferences.filepaths.save_version=0
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
font=bpy.data.fonts.load('C:/Windows/Fonts/msyh.ttc')
def material(name,color,metal=0,rough=.7,emission=0):
 m=bpy.data.materials.new(name);m.use_nodes=True;m.diffuse_color=(*color,1)
 bs=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');bs.inputs['Base Color'].default_value=(*color,1);bs.inputs['Metallic'].default_value=metal;bs.inputs['Roughness'].default_value=rough
 bs.inputs['Emission Color'].default_value=(*color,1);bs.inputs['Emission Strength'].default_value=emission
 return m
gold=material('Brass / convention',(.95,.66,.25),.3,emission=.15)
white=material('Ivory / labels',(.96,.94,.80),emission=.35)
muted=material('Sage / secondary',(.56,.71,.66),emission=.25)
blue=material('Cyan / water sequence',(.27,.89,.94),.15,emission=.4)
myth=material('Coral / interpretive model',(.99,.40,.30),emission=.35)
dark=material('Deep teal / plinth',(.013,.058,.065),.2)
ground=material('Background',(.008,.022,.028))
specs=[(v['id'],v['title'],v['subtitle'],v['exaggeration']) for v in config['scenes']]
results=[]
for n,(slug,title,subtitle,exag) in enumerate(specs):
 scene=bpy.context.scene if n==0 else bpy.data.scenes.new(slug)
 scene.name=slug;bpy.context.window.scene=scene
 scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True
 scene.render.threads_mode='FIXED';scene.render.threads=8
 scene.render.resolution_x=1800;scene.render.resolution_y=1350;scene.render.resolution_percentage=100
 scene.world=bpy.data.worlds.new('World '+slug);scene.world.use_nodes=True;next(n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND').inputs[0].default_value=(.12,.18,.22,1);next(n for n in scene.world.node_tree.nodes if n.type=='BACKGROUND').inputs[1].default_value=.45
 scene.view_settings.view_transform='AgX';scene.view_settings.look='AgX - Medium High Contrast'
 meta=json.loads((out/f'{slug}.json').read_text());heights=np.load(out/f'{slug}.npy');rows,cols=heights.shape
 west,south,east,north=meta['bounds'];coslat=math.cos(math.radians((north+south)/2));scale=14/((east-west)*111.32*coslat);w=14;h=(north-south)*111.32*scale;cx=-3
 def xy(lon,lat):return (cx+(lon-(west+east)/2)*111.32*coslat*scale,(lat-(south+north)/2)*111.32*scale)
 def alt(lon,lat):
  r=min(rows-1,max(0,round((lat-south)/(north-south)*(rows-1))));c=min(cols-1,max(0,round((lon-west)/(east-west)*(cols-1))))
  return max(0,float(heights[r,c]))/1000*scale*exag
 def cube(name,loc,size,mat,bevel=0):
  bpy.ops.mesh.primitive_cube_add(size=1,location=loc);ob=bpy.context.object;ob.name=name;ob.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);ob.data.materials.append(mat)
  if bevel:mod=ob.modifiers.new('Rounded edges','BEVEL');mod.width=bevel;mod.segments=3
  return ob
 def text(name,body,loc,size=.23,mat=white,align='LEFT'):
  data=bpy.data.curves.new(name,'FONT');data.body=body;data.font=font;data.size=size;data.align_x=align;data.space_line=1.4
  ob=bpy.data.objects.new(name,data);scene.collection.objects.link(ob);ob.location=loc;ob.data.materials.append(mat);return ob
 def line(name,pts,mat=gold,r=.017):
  cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.bevel_depth=r;cu.bevel_resolution=2;s=cu.splines.new('POLY');s.points.add(len(pts)-1)
  for p,v in zip(s.points,pts):p.co=(*v,1)
  ob=bpy.data.objects.new(name,cu);scene.collection.objects.link(ob);ob.data.materials.append(mat);return ob
 def geoline(name,coords,mat=gold,dashed=False):
  for i,(a,b) in enumerate(zip(coords,coords[1:])):
   count=max(5,int(math.dist(xy(*a),xy(*b))*30))
   points=[]
   for t in np.linspace(0,1,count):
    lon=a[0]+(b[0]-a[0])*t;lat=a[1]+(b[1]-a[1])*t;points.append((*xy(lon,lat),alt(lon,lat)+.08))
   if dashed:
    for j in range(0,len(points)-1,6):line(name,points[j:min(j+4,len(points))],mat)
   else:line(name,points,mat)
 def label(name,lon,lat,dx=0,dy=0,mat=white,size=.23,pin=True):
  x,y=xy(lon,lat);z=max(.12,alt(lon,lat)+.13);lx=x+dx;ly=y+dy
  if pin:
   bpy.ops.mesh.primitive_uv_sphere_add(segments=12,ring_count=6,radius=.052,location=(x,y,z));ob=bpy.context.object;ob.name='Reference / '+name;ob.data.materials.append(mat);ob['longitude']=lon;ob['latitude']=lat;ob['precision']='Cartographic reference; not a boundary or archaeological survey'
   if dx or dy:line('Leader / '+name,[(x,y,z),(lx,ly,z+.015)],mat,.008)
  width=max(.5,len(name)*size*.98)
  cube('Label backing / '+name,(lx+width/2,ly+size*.37,z+.025),(width+.14,size*1.32,.018),dark)
  text('Label / '+name,name,(lx,ly,z+.045),size,mat)
  return x,y,z
 xs=np.linspace(cx-w/2,cx+w/2,cols);ys=np.linspace(-h/2,h/2,rows);xx,yy=np.meshgrid(xs,ys)
 zz=np.where(heights>0,heights/1000*scale*exag,-.025);vertices=np.stack([xx,yy,zz],axis=-1).reshape(-1,3)
 grid=np.arange(rows*cols).reshape(rows,cols);a=grid[:-1,:-1].ravel();faces=np.stack([a,a+1,a+cols+1,a+cols],axis=1)
 mesh=bpy.data.meshes.new('DEM '+slug);mesh.from_pydata(vertices.tolist(),[],faces.tolist());mesh.update()
 terrain=bpy.data.objects.new('Terrain / modern DEM',mesh);scene.collection.objects.link(terrain)
 stops=np.array([-8000,-2500,-200,-1,0,300,900,1800,3000,5000]);palette=np.array([[.012,.065,.10],[.018,.14,.20],[.08,.32,.36],[.19,.40,.40],[.22,.34,.22],[.34,.43,.26],[.43,.45,.29],[.54,.49,.36],[.72,.69,.56],[.9,.88,.8]])
 flat=heights.ravel();rgb=np.stack([np.interp(flat,stops,palette[:,c]) for c in range(3)],axis=1)
 color=mesh.color_attributes.new(name='Relief palette',type='FLOAT_COLOR',domain='POINT');color.data.foreach_set('color',np.column_stack([rgb,np.ones(len(flat))]).astype(np.float32).ravel())
 mat=bpy.data.materials.new('Elevation and depth / '+slug);mat.use_nodes=True;bs=next(n for n in mat.node_tree.nodes if n.type=='BSDF_PRINCIPLED');attr=mat.node_tree.nodes.new('ShaderNodeAttribute');attr.attribute_name='Relief palette';mat.node_tree.links.new(attr.outputs['Color'],bs.inputs['Base Color']);bs.inputs['Roughness'].default_value=.74;terrain.data.materials.append(mat);mat.diffuse_color=(.3,.4,.28,1)
 for p in mesh.polygons:p.use_smooth=True
 terrain['source']=meta['source'];terrain['vertical_exaggeration']=exag;terrain['bounds']=meta['bounds']
 cube('Raised atlas plinth',(cx,0,-.25),(w+.10,h+.10,.44),dark,.05)
 cube('Studio ground',(0,0,-.62),(200,200,.3),ground)
 text('Title',title,(cx-w/2,h/2+.95,.18),.52)
 text('Subtitle',subtitle,(cx-w/2,h/2+.49,.18),.19,gold)
 text('Lesson credit','顾衡讲透欧洲史 · 第 02 讲伴读  /  独立制作',(cx-w/2,-h/2-.56,.08),.19,muted)
 text('Terrain credit',f'Mapzen / AWS DEM   ·   现代地形 ×{exag}   ·   北向上',(cx-w/2,-h/2-.91,.08),.16,muted)
 panelx=4.65;py=h/2-.55
 text('Sidebar heading','READ THE MAP',(panelx,py,.12),.20,gold)
 def note(num,heading,body,y):
  text('Section '+num,num,(panelx,y,.13),.32,gold)
  text('Heading '+num,heading,(panelx+.7,y,.13),.29)
  text('Note '+num,body,(panelx+.7,y-.48,.13),.215,muted)
 info=config['scenes'][n]
 colors={'gold':gold,'blue':blue,'white':white,'muted':muted,'myth':myth}
 for route in info['lines']:
  before=set(scene.objects.keys())
  geoline(route['name'],route['coords'],colors[route['color']],route['dashed'])
  for ob in scene.objects:
   if ob.name not in before:
    ob['interpretation']='Generalized model corridor, not a measured trajectory' if route['dashed'] else 'Generalized modern river for geographic reference'
    ob['source_refs']='\n'.join(info['sources'])
 for entry in info['labels']:
  name,lon,lat,dx,dy,color,size,pin=entry
  label(name,lon,lat,dx,dy,colors[color],size,pin)
 for i,(number,heading,body) in enumerate(info['notes']):
  note(number,heading,body,py-1-i*2.45)
 scene['source_refs']='\n'.join(info['sources'])
 # A metric scale, north arrow and separate framing are editable objects.
 km=info['scaleKm']
 x0=cx-w/2+.35;y0=-h/2+.38;length=km*scale
 line('Scale bar',[(x0,y0,.12),(x0+length,y0,.12)],white,.018);text('Scale label',f'{km} km',(x0,y0+.15,.13),.17)
 text('North','N ↑',(cx-w/2+.3,h/2-.55,.7),.24,gold)
 bpy.ops.object.light_add(type='AREA',location=(-8,-6,18));bpy.context.object.data.energy=2600;bpy.context.object.data.size=10
 bpy.ops.object.light_add(type='AREA',location=(8,5,12));bpy.context.object.data.energy=1500;bpy.context.object.data.size=12
 bpy.ops.object.camera_add(location=(0,-11,31));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=25;scene.camera=cam
 scene['course_url']=course;scene['read_me']='Original companion map. Modern terrain, illustrative geographic references. No reconstructed historical borders. Dashed lines = generalized dispersal or farming corridors; solid blue = generalized modern rivers.'
 scene.render.filepath=str(out/f'{slug}.png')
 results.append({'scene':slug,'vertices':len(mesh.vertices),'objects':len(scene.objects),'height_exaggeration':exag,'bounds':meta['bounds']})
bpy.context.window.scene=bpy.data.scenes['01-dispersal']
readme=bpy.data.texts.new('START HERE / 阅读说明');readme.write((out/'使用说明.md').read_text(encoding='utf-8'))
bpy.ops.file.pack_all()
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':
   area.spaces.active.region_3d.view_perspective='CAMERA';area.spaces.active.shading.type='MATERIAL'
bpy.ops.wm.save_as_mainfile(filepath=str(out/config['filename']))
(out/'verification.json').write_text(json.dumps({'blender':bpy.app.version_string,'scenes':results,'fonts_packed':bool(font.packed_file),'course_read':True,'historical_boundaries':False},ensure_ascii=False,indent=2),encoding='utf-8')
for slug,_,_,_ in specs:
 bpy.context.window.scene=bpy.data.scenes[slug];bpy.ops.render.render(write_still=True);print('RENDERED',slug,flush=True)
print('LESSON02_COMPLETE',flush=True)
