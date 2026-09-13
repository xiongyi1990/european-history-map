"""Pack fonts and verify the saved Blender deliverable without rerendering."""
import bpy
import json
from pathlib import Path

root=Path(__file__).resolve().parents[1]
dest=root/'blender'/'greek-reading-atlas.blend'
bpy.ops.wm.open_mainfile(filepath=str(dest))
bpy.context.preferences.filepaths.save_version=0
bpy.ops.file.pack_all()
terrain=next(o for o in bpy.data.objects if o.name.startswith('01 |'))
terrain.data.materials[0].diffuse_color=(0.43,0.50,0.32,1)
bpy.ops.object.select_all(action='DESELECT')
terrain.select_set(True)
bpy.context.view_layer.objects.active=terrain
for area in bpy.context.screen.areas:
    if area.type=='VIEW_3D':
        area.spaces.active.shading.type='SOLID'
        area.spaces.active.shading.color_type='MATERIAL'
        area.spaces.active.region_3d.view_perspective='CAMERA'
pins=[o for o in bpy.data.objects if o.name.startswith('Place |')]
assert len(pins)==24
assert len(terrain.data.vertices)==378000
assert bpy.context.scene.camera
fonts=[f for f in bpy.data.fonts if f.filepath and f.filepath!='<builtin>']
assert all(f.packed_file for f in fonts)
bpy.ops.wm.save_as_mainfile(filepath=str(dest))
result={'blender':bpy.app.version_string,'vertices':len(terrain.data.vertices),'place_markers':len(pins),'fonts_packed':len(fonts),'height_exaggeration':6,'modern_terrain':True,'historical_boundaries':False}
(root/'blender'/'verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result),flush=True)
