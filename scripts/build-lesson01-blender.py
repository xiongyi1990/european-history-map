"""Build original, editable Blender maps accompanying Gu Heng lesson 01."""
import bpy,json,math
import numpy as np
from pathlib import Path
from mathutils import Vector
root=Path(__file__).resolve().parents[1];out=root/'blender'/'lesson-01'
course='https://www.dedao.cn/course/article?id=vWbYRP1mxqd2VGdzQwJQjM096EBkr8'
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
myth=material('Coral / myth only',(.99,.40,.30),emission=.35)
dark=material('Deep teal / plinth',(.013,.058,.065),.2)
ground=material('Background',(.008,.022,.028))
specs=[('01-europe','01  欧洲的空间骨架','EUROPE / A CONVENTIONAL DIVIDE',12),('02-straits','02  两海之间的窄门','BLACK SEA / STRAITS / AEGEAN',6),('03-memory','03  地点与共同记忆','AEGEAN / PLACES & MYTH',6)]
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
 text('Lesson credit','顾衡讲透欧洲史 · 第 01 讲伴读  /  独立制作',(cx-w/2,-h/2-.56,.08),.19,muted)
 text('Terrain credit',f'Mapzen / AWS DEM   ·   现代地形 ×{exag}   ·   北向上',(cx-w/2,-h/2-.91,.08),.16,muted)
 panelx=4.65;py=h/2-.55
 text('Sidebar heading','READ THE MAP',(panelx,py,.12),.20,gold)
 def note(num,heading,body,y):
  text('Section '+num,num,(panelx,y,.13),.32,gold)
  text('Heading '+num,heading,(panelx+.7,y,.13),.29)
  text('Note '+num,body,(panelx+.7,y-.48,.13),.215,muted)
 if n==0:
  divide=[(66,69),(62,66),(59.5,62),(59,58),(59,55),(59,53),(58.5,51.5),(56,51.7),(54,51.2),(51.4,51.3),(51.3,49),(51.9,47),(51,44.5),(49,41.5),(46,42),(43,43),(40,43.4),(37,43),(33,42),(29.1,41.2),(29,41),(28,40.7),(26.75,40.4),(26.2,40),(25.9,39.7)]
  geoline('Conventional divide / schematic',divide,dashed=True)
  label('① 乌拉尔山脉',60,62,-2.8,.2,gold)
  label('② 乌拉尔河',54,51.2,.65,.55,gold)
  label('③ 里海',51,43.4,.9,-.45,gold)
  label('④ 高加索山脉',44,43,1.6,1.0,gold)
  label('⑤ 黑海',34,43,-2.3,.35,blue)
  label('⑥ 土耳其海峡',28.5,40.6,-1.2,-1.0,blue)
  label('地 中 海',15,35,-1.2,-.4,blue,.32,False)
  label('大 西 洋',-10,49,-.6,0,blue,.28,False)
  label('北 冰 洋',23,69,-1,0,blue,.28,False)
  label('维也纳',16.37,48.21,-2,.5)
  text('Europe','欧  洲',(*xy(17,56),.14),.62,white,'CENTER')
  text('Asia','亚  洲',(*xy(60,40),.15),.44,muted,'CENTER')
  text('Africa','非  洲',(*xy(8,30.5),.16),.44,muted,'CENTER')
  note('01','先认山海','从北向南追踪金色虚线，\n在山、河、海之间建立位置感。',py-1)
  note('02','这是一种约定','虚线仅作课程所述分界的导览，\n不是国界，也不是唯一划分。\n高加索等地存在不同划法。',py-3.15)
  note('03','放大海峡','博斯普鲁斯—马尔马拉海—\n达达尼尔的细节，请看场景 02。',py-5.75)
  note('04','不要涂“文化边界”','维也纳在课中是认同观念的例子，\n不能据此画一条文明分界线。',py-7.85)
 elif n==1:
  water=[(29.2,41.4),(29.12,41.22),(29.07,41.14),(29.06,41.08),(29.035,41.04),(29.005,41),(28.96,40.94),(28.4,40.78),(27.5,40.7),(26.75,40.43),(26.61,40.34),(26.44,40.2),(26.40,40.14),(26.32,40.06),(26.2,40.03),(25.9,39.7)]
  geoline('Waterway sequence / not a navigation track',water,blue)
  label('黑 海',29.1,42,.4,.1,blue,.34,False)
  label('① 博斯普鲁斯海峡',29.06,41.12,.2,.85,blue,.25)
  label('② 马尔马拉海',28.2,40.75,-1.5,-.70,blue,.25)
  label('③ 达达尼尔海峡',26.4,40.15,-3,-.5,blue,.25)
  label('爱 琴 海',25.6,38.9,-1,.1,blue,.32,False)
  label('伊斯坦布尔',28.98,41.01,1.25,-.1,white,.23)
  label('安纳托利亚',29,39.2,0,0,white,.34,False)
  label('巴尔干方向',25,41.6,-.8,0,white,.28,False)
  note('01','三个名字，一条水系','黑海 → 博斯普鲁斯\n→ 马尔马拉海 → 达达尼尔\n→ 爱琴海。',py-1)
  note('02','两岸都要看','伊斯坦布尔跨越海峡两岸。\n现代土耳其是跨洲国家。',py-3.65)
  note('03','线宽不等于海峡宽度','青色线是识别水系的示意线。\n地形网格不足以测量狭窄水道，\n不能用于航行。',py-5.8)
  note('04','不把多个时代叠成国界','本讲提到历史上的往返争夺，\n此图先定位，未重建历代疆域。',py-8.45)
 else:
  label('雅典',23.73,37.98,-1.5,-.7)
  label('德尔斐',22.50,38.48,-2.45,.55)
  label('底比斯',23.32,38.32,-.2,.90)
  label('萨摩斯岛',26.95,37.75,-1.9,.62)
  label('米利都',27.28,37.53,.5,-.15)
  label('克里特岛',25,35.15,-2,-.48)
  label('腓尼基地域',35.35,33.6,-.9,.65,myth)
  label('爱 琴 海',24.7,36.8,-1.1,-.05,blue,.32,False)
  label('地 中 海',29,33.5,-.6,-.6,blue,.32,False)
  label('安纳托利亚',30,39.5,-.7,0,white,.32,False)
  geoline('MYTH ONLY / Phoenicia to Crete',[(35.35,33.6),(33.5,33.1),(30,33.5),(27.5,34),(25,35.15)],myth,True)
  text('Myth line caption','神话联系 · 非真实行程',(*xy(29,34.45),.16),.23,myth,'CENTER')
  note('01','同一张海图，多种认同','用雅典、米利都和萨摩斯，\n观察海岸位置与文化联系。',py-1)
  note('02','记忆所依附的地点','德尔斐、克里特、底比斯，\n分别承载课中讨论的神话。',py-3.1)
  note('03','红色虚线只讲故事','腓尼基 → 克里特：欧罗巴神话。\n起止点为地域代表，不是港口。\n不把传说画成考证过的迁徙。',py-5.2)
  note('04','这一讲没有统一年份','这是跨时代的空间导读，\n不是某一年的城邦领土地图。',py-7.9)
 # A metric scale, north arrow and separate framing are editable objects.
 km=500 if n==0 else 50 if n==1 else 100
 x0=cx-w/2+.35;y0=-h/2+.38;length=km*scale
 line('Scale bar',[(x0,y0,.12),(x0+length,y0,.12)],white,.018);text('Scale label',f'{km} km',(x0,y0+.15,.13),.17)
 text('North','N ↑',(cx-w/2+.3,h/2-.55,.7),.24,gold)
 bpy.ops.object.light_add(type='AREA',location=(-8,-6,18));bpy.context.object.data.energy=2600;bpy.context.object.data.size=10
 bpy.ops.object.light_add(type='AREA',location=(8,5,12));bpy.context.object.data.energy=1500;bpy.context.object.data.size=12
 bpy.ops.object.camera_add(location=(0,-11,31));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=25;scene.camera=cam
 scene['course_url']=course;scene['read_me']='Original companion map. Modern terrain, illustrative geographic references. No reconstructed historical borders. Coral dashed line = myth only.'
 scene.render.filepath=str(out/f'{slug}.png')
 results.append({'scene':slug,'vertices':len(mesh.vertices),'objects':len(scene.objects),'height_exaggeration':exag,'bounds':meta['bounds']})
bpy.context.window.scene=bpy.data.scenes['01-europe']
readme=bpy.data.texts.new('START HERE / 阅读说明');readme.write('顾衡第一讲伴读地图\n\n顶部 Scene 下拉框切换：01-europe / 02-straits / 03-memory。\n小键盘 0 查看相机；中键旋转，滚轮缩放。\n材质预览查看海陆颜色，F12 渲染当前场景。\n全部标签、虚线、地形和底座均可编辑。\n\n金色虚线为地理分界导览，青色为水系顺序，珊瑚红虚线为神话关系。\n现代高程地形经过高度夸张；并非古代海岸、疆界或精确航路。\n\n课程来源：'+course+'\n地形：Mapzen / AWS Open Data，https://registry.opendata.aws/terrain-tiles/\n署名细项：https://github.com/tilezen/joerd/blob/master/docs/attribution.md\n地图与说明是独立伴读整理，未复制课程全文及配图。')
bpy.ops.file.pack_all()
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':
   area.spaces.active.region_3d.view_perspective='CAMERA';area.spaces.active.shading.type='MATERIAL'
bpy.ops.wm.save_as_mainfile(filepath=str(out/'顾衡欧洲史-第01讲-空间地图.blend'))
(out/'verification.json').write_text(json.dumps({'blender':bpy.app.version_string,'scenes':results,'fonts_packed':bool(font.packed_file),'course_read':True,'historical_boundaries':False},ensure_ascii=False,indent=2),encoding='utf-8')
for slug,_,_,_ in specs:
 bpy.context.window.scene=bpy.data.scenes[slug];bpy.ops.render.render(write_still=True);print('RENDERED',slug,flush=True)
print('LESSON01_COMPLETE',flush=True)
