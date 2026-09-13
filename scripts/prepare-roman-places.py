"""Find and extract Roman reading places from attributed Pleiades GIS records."""
import csv,io,json,pathlib,urllib.request,zipfile,sys
root=pathlib.Path(__file__).resolve().parents[1]
cache=root/'scripts'/'.roman-place-source.json'
if cache.exists():rows=json.loads(cache.read_text(encoding='utf-8'))
else:
    data=urllib.request.urlopen('https://atlantides.org/downloads/pleiades/gis/pleiades_gis_data.zip',timeout=90).read()
    z=zipfile.ZipFile(io.BytesIO(data));name=next(n for n in z.namelist() if n.endswith('/places.csv') or n=='places.csv')
    rows=list(csv.DictReader(io.TextIOWrapper(z.open(name),encoding='utf-8-sig')))
    cache.write_text(json.dumps(rows),encoding='utf-8')
if len(sys.argv)==1:
    terms=['Roma','Carthago','Alexandria','Alexandreia','Byzantium','Byzantion','Massilia','Londinium','Lugdunum','Tarraco','Gades','Mediolanum','Ravenna','Antiochia','Antioch','Brundisium','Capua','Neapolis','Utica','Augusta Treverorum','Eburacum','Corinth','Athenae','Syracusae']
    for r in rows:
        if any(t.casefold() in r['title'].casefold() for t in terms) and r.get('representative_longitude'):
            lon=float(r['representative_longitude']);lat=float(r['representative_latitude'])
            if -11<lon<43 and 25<lat<57:print(json.dumps([r['id'],r['title'],round(lon,4),round(lat,4)],ensure_ascii=True))
else:
    wanted=sys.argv[1:];by={r['id']:r for r in rows};out={}
    for pid in wanted:
        r=by[pid];out[pid]={'title':r['title'],'coords':[float(r['representative_longitude']),float(r['representative_latitude'])],'precision':r['location_precision'],'description':r['description'],'url':f'https://pleiades.stoa.org/places/{pid}','retrieved':'2026-09-09','license':'CC BY 3.0; Pleiades contributors'}
    dest=root/'src'/'roman'/'pleiades.json';dest.parent.mkdir(exist_ok=True);dest.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8');print(f'Extracted {len(out)} places')
