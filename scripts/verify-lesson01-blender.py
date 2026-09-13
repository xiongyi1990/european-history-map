"""Reopen the saved atlas to check the actual deliverable, not build state."""
import bpy,json
from pathlib import Path
root=Path(__file__).resolve().parents[1];out=root/'blender'/'lesson-01'
bpy.ops.wm.open_mainfile(filepath=str(out/'顾衡欧洲史-第01讲-空间地图.blend'))
expected={'01-europe':646000,'02-straits':547200,'03-memory':561000}
assert set(bpy.data.scenes.keys())==set(expected)
result=[]
for name,count in expected.items():
 scene=bpy.data.scenes[name];assert scene.camera
 terrain=next(o for o in scene.objects if o.name.startswith('Terrain /'))
 assert len(terrain.data.vertices)==count
 assert terrain.data.color_attributes.get('Relief palette')
 assert scene['course_url'].endswith('vWbYRP1mxqd2VGdzQwJQjM096EBkr8')
 assert (out/f'{name}.png').stat().st_size>100000
 result.append({'scene':name,'vertices':count,'camera':scene.camera.name,'objects':len(scene.objects)})
fonts=[f for f in bpy.data.fonts if f.filepath and f.filepath!='<builtin>']
assert fonts and all(f.packed_file for f in fonts)
assert bpy.context.scene.name=='01-europe'
verification={'saved_file_reopened':True,'blender':bpy.app.version_string,'scenes':result,'fonts_packed':len(fonts),'course_read':True,'historical_boundaries':False}
(out/'verification.json').write_text(json.dumps(verification,ensure_ascii=False,indent=2),encoding='utf-8')
print('VERIFIED_LESSON_01',json.dumps(verification,ensure_ascii=True),flush=True)
