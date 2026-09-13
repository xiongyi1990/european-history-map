import maplibregl, { type Map as LibreMap, type GeoJSONSource } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { feature, mesh } from 'topojson-client';
import land from 'world-atlas/land-50m.json';
import countries from 'world-atlas/countries-50m.json';
import { campColors, places, type Layer, type Camp } from './data';
import { battleRoutes, type Battle, type Coordinate } from './battles';
import { landforms, landformPresets, type Landform } from './landforms';
import { Mountain, Waves, Sprout, X, ExternalLink } from 'lucide-react';

const landData = feature(land,land.objects.land) as GeoJSON.FeatureCollection;
const modernBorders = mesh(countries,countries.objects.countries as Parameters<typeof mesh>[1],(a,b) => a !== b);
const empty: GeoJSON.FeatureCollection = {type:'FeatureCollection',features:[]};
export interface Camera { center:[number,number]; zoom:number; pitch:number; bearing:number; padding?:{top:number;bottom:number;left:number;right:number} }
export interface MapCommand { ids:string[]; nonce:number; camera?:Camera; coordinates?:Coordinate[] }
export interface AtlasPlace {id:string; name:string; modern:string; coords:Coordinate; camp?:Camp; color?:string}
export interface MapAtlas {places:AtlasPlace[]; terrainPrefix:string; surfacePrefix:string; bounds:[number,number,number,number]; maxzoom:number; center:Coordinate; zoom:number; minZoom:number; extent:[Coordinate,Coordinate]; landforms:Landform[]; presets:Landform[]; attribution:string; title:string; pitch?:number; bearing?:number; overviewBounds?:[Coordinate,Coordinate]; detailInSidebar?:boolean; theme?:'light'|'dark'}
export interface AreaLabel {id:string;name:string;coords:Coordinate;color:string}
export interface AtlasOverlay {areas:GeoJSON.FeatureCollection; rivers:GeoJSON.FeatureCollection; labels:AreaLabel[]}
interface Props {
  atlas?:MapAtlas;
  threeD:boolean; modern:boolean; layer:Layer; selected?:string; compare:string[]; command:MapCommand;
  onSelect:(id:string)=>void; onCamera:(camera:Camera)=>void;
  battle?:Battle; battleStep?:number;
  overlay?:AtlasOverlay; selectedArea?:string; onAreaSelect?:(id:string)=>void;
}

function connections():GeoJSON.FeatureCollection {
  return {type:'FeatureCollection',features:places.filter(p=>['athens','sparta'].includes(p.camp) && p.id!==p.camp && p.kind==='城邦').map(p=>({
    type:'Feature', properties:{camp:p.camp},geometry:{type:'LineString',coordinates:[places.find(c=>c.id===p.camp)!.coords,p.coords]},
  }))};
}

export function GreekMap({threeD,modern,layer,selected,compare,command,onSelect,onCamera,battle,battleStep=0,atlas,overlay,selectedArea,onAreaSelect}:Props) {
  const mapPlaces:AtlasPlace[]=atlas?.places??places;
  const mapLandforms=atlas?.landforms??landforms;
  const minZoom=atlas?.minZoom??4;
  const light=atlas?.theme==='light';
  const node=useRef<HTMLDivElement>(null);
  const map=useRef<LibreMap|null>(null);
  const handlers=useRef({onSelect,onCamera,onAreaSelect}); handlers.current={onSelect,onCamera,onAreaSelect};
  const [loaded,setLoaded]=useState(false);
  const [error,setError]=useState('');
  const [terrainReady,setTerrainReady]=useState(false);
  const [landform,setLandform]=useState<Landform|undefined>();
  const markerRefs=useRef<maplibregl.Marker[]>([]);
  useEffect(()=>{
    if(!node.current) return;
    let alive=true;
    let m:LibreMap;
    try {
      m=new maplibregl.Map({container:node.current,center:atlas?.center??[23.7,37.8],zoom:atlas?.zoom??6.5,pitch:threeD?(atlas?.pitch??58):0,bearing:threeD?(atlas?.bearing??-20):0,minZoom,maxZoom:11,maxPitch:72,
        maxBounds:atlas?.extent??[[5,28],[38,47]],attributionControl:false,canvasContextAttributes:{preserveDrawingBuffer:true},
        style:{version:8,sky:{'sky-color':'#9ebfc1','horizon-color':'#dae0c9','fog-color':'#c8d3bc','fog-ground-blend':0.85,'horizon-fog-blend':0.25},sources:{
          land:{type:'geojson',data:light?`${location.origin}/europe-reference/ne_50m_admin_0_countries.geojson`:landData},
          elevation:{type:'raster-dem',tiles:[`${location.origin}/${atlas?.terrainPrefix??'greek-terrain'}/{z}/{x}/{y}.png`],tileSize:256,encoding:'terrarium',maxzoom:atlas?.maxzoom??9,bounds:atlas?.bounds??[13,33,31,43],attribution:'地形 © Mapzen / AWS Open Data'},
          relief:{type:'raster-dem',tiles:[`${location.origin}/${atlas?.terrainPrefix??'greek-terrain'}/{z}/{x}/{y}.png`],tileSize:256,encoding:'terrarium',maxzoom:atlas?.maxzoom??9,bounds:atlas?.bounds??[13,33,31,43]},
          surface:{type:'raster-dem',tiles:[`${location.origin}/${atlas?.surfacePrefix??'greek-surface'}/{z}/{x}/{y}.png`],tileSize:256,encoding:'terrarium',maxzoom:atlas?.maxzoom??9,bounds:atlas?.bounds??[13,33,31,43]},
          borders:{type:'geojson',data:modernBorders},
          alliances:{type:'geojson',data:connections()},
          comparison:{type:'geojson',data:empty},
          battleRoutes:{type:'geojson',data:empty},
          atlasAreas:{type:'geojson',data:empty}, atlasRivers:{type:'geojson',data:empty},
        },layers:[
          {id:'sea',type:'background',paint:{'background-color':light?'#79cfdf':'#123f54'}},
          {id:'land',type:'fill',source:'land',paint:{'fill-color':light?'#e4efdf':'#a7ae7c'}},
          {id:'surface',type:'color-relief',source:'surface',paint:{'color-relief-opacity':light?['interpolate',['linear'],['zoom'],3.7,0,4.5,1]:1,'color-relief-color':light?['interpolate',['linear'],['elevation'],-8000,'#79cfdf',-1,'#79cfdf',0,'#e4efdf',250,'#d6ebdb',600,'#c0e3d1',1000,'#b5dcc7',1800,'#dce9d9',2500,'#f0f1e9',3200,'#fafaf6']:['interpolate',['linear'],['elevation'],-8000,'#082e43',-3000,'#0b4059',-1000,'#145b70',-250,'#247a88',-50,'#469d9e',-1,'#96c6b5',0,'#b3be8a',80,'#a1b17d',250,'#92a06d',600,'#8c9468',1000,'#a49b79',1600,'#c6b598',2300,'#e5dcc8',3200,'#f5f0e3']}},
          {id:'relief',type:'hillshade',source:'relief',paint:{'hillshade-exaggeration':light?0.18:0.75,'hillshade-shadow-color':'#243c2e','hillshade-highlight-color':'#fff2c9','hillshade-accent-color':'#636942','hillshade-illumination-direction':315,'hillshade-illumination-anchor':'map'}},
          {id:'atlas-areas',type:'fill',source:'atlasAreas',paint:{'fill-color':['get','atlasColor'],'fill-opacity':light?0.10:0.4}},
          {id:'atlas-area-lines',type:'line',source:'atlasAreas',paint:{'line-color':light?'#657579':['get','atlasColor'],'line-width':light?0.9:2,'line-opacity':1,'line-dasharray':[3,2]}},
          {id:'atlas-area-selected',type:'line',source:'atlasAreas',filter:['==',['get','atlasId'],''],paint:{'line-color':light?'#1a73e8':'#fff0b4','line-width':light?2:3}},
          {id:'atlas-rivers',type:'line',source:'atlasRivers',paint:{'line-color':light?'#8bb7c7':'#73c9da','line-width':['interpolate',['linear'],['zoom'],3,0.7,8,2],'line-opacity':0.9}},
          {id:'borders',type:'line',source:'borders',layout:{visibility:'none'},paint:{'line-color':'#626f64','line-width':1.8,'line-dasharray':[3,3]}},
          {id:'alliances',type:'line',source:'alliances',layout:{visibility:'none'},paint:{'line-color':['match',['get','camp'],'athens',campColors.athens,campColors.sparta],'line-width':1.4,'line-dasharray':[3,4],'line-opacity':0.65}},
          {id:'comparison',type:'line',source:'comparison',paint:{'line-color':'#2d342f','line-width':2,'line-dasharray':[2,2]}},
          {id:'battle-route-shadow',type:'line',source:'battleRoutes',paint:{'line-color':'#092d32','line-width':['case',['get','active'],8,4],'line-opacity':['case',['get','active'],0.4,0.12],'line-blur':2}},
          {id:'battle-routes',type:'line',source:'battleRoutes',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':['get','color'],'line-width':['case',['get','active'],4,2],'line-opacity':['case',['get','active'],1,0.36],'line-dasharray':[3,2]}},
        ]},
      });
    } catch {setError('当前浏览器未能创建地图。请在支持 WebGL 的 Chrome 中打开；左侧地点检索仍可使用。');return;}
    map.current=m;
    m.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'bottom-right');
    m.addControl(new maplibregl.ScaleControl({unit:'metric',maxWidth:110}),'bottom-left');
    m.addControl(new maplibregl.AttributionControl({compact:true,customAttribution:`底图 Natural Earth · ${battle?'战役参考点与路线：编者示意':atlas?.attribution??'地点 Pleiades（CC BY 3.0）'}`}),'bottom-right');
    m.on('load',()=>{if(alive)setLoaded(true)});
    m.on('click','atlas-areas',e=>{const id=e.features?.[0]?.properties?.atlasId;if(id)handlers.current.onAreaSelect?.(String(id))});
    m.on('mouseenter','atlas-areas',()=>{m.getCanvas().style.cursor='pointer'});
    m.on('mouseleave','atlas-areas',()=>{m.getCanvas().style.cursor=''});
    m.on('sourcedata',e=>{if(alive && e.sourceId==='elevation' && e.isSourceLoaded)setTerrainReady(true)});
    m.on('error',e=>{
      if(alive && /greek-terrain|greek-surface|roman-terrain|roman-surface|europe-terrain|europe-surface|404/.test(e.error?.message??'')) setError('部分地形暂时无法加载，地点与平面地图仍可使用。');
    });
    m.on('moveend',()=>{const center=m.getCenter();const p=m.getPadding();handlers.current.onCamera({center:[center.lng,center.lat],zoom:m.getZoom(),pitch:m.getPitch(),bearing:m.getBearing(),padding:{top:p.top??0,bottom:p.bottom??0,left:p.left??0,right:p.right??0}})});
    const resize=new ResizeObserver(()=>m.resize()); resize.observe(node.current);
    return ()=>{alive=false;resize.disconnect();markerRefs.current.forEach(marker=>marker.remove());m.remove();map.current=null;};
  },[]);

  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    (m.getSource('atlasAreas') as GeoJSONSource).setData(overlay?.areas??empty);
    (m.getSource('atlasRivers') as GeoJSONSource).setData(overlay?.rivers??empty);
    m.setFilter('atlas-area-selected',['==',['get','atlasId'],selectedArea??'']);
    const nodes=(overlay?.labels??[]).map(p=>{
      const e=document.createElement('button');e.className='e-area-label';e.textContent=p.name;
      e.setAttribute('aria-label',`区域：${p.name}`);e.style.setProperty('--area',p.color);
      e.onclick=event=>{event.stopPropagation();handlers.current.onAreaSelect?.(p.id)};
      const marker=new maplibregl.Marker({element:e,opacityWhenCovered:1}).setLngLat(p.coords).addTo(m);
      return {p,e,marker};
    });
    const layout=()=>{
      const boxes:{x:number;y:number;w:number}[]=[];
      for(const {p,e} of nodes){const q=m.project(p.coords),w=Math.min(180,Math.max(70,p.name.length*12));
        const visible=p.id===selectedArea||!boxes.some(b=>Math.abs(b.y-q.y)<35&&Math.abs(b.x-q.x)<(b.w+w)/2+8);
        e.style.display=visible?'':'none';if(visible)boxes.push({x:q.x,y:q.y,w});}
    };
    m.on('move',layout);layout();return()=>{m.off('move',layout);nodes.forEach(n=>n.marker.remove())};
  },[loaded,overlay,selectedArea]);

  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    m.setTerrain(threeD?{source:'elevation',exaggeration:4}:null);
    m.easeTo({pitch:threeD?(atlas?.pitch??58):0,bearing:threeD?(atlas?.bearing??-20):0,duration:900});
  },[loaded,threeD]);

  function explore(p:Landform){
    setLandform(p);const m=map.current;if(!m)return;
    m.flyTo({center:p.coords,zoom:p.zoom,bearing:p.bearing,pitch:threeD?62:0,padding:{top:90,bottom:window.innerWidth<=760?240:120,left:40,right:window.innerWidth>1100&&battle?350:70},duration:1800});
  }
  useEffect(()=>{setLandform(undefined)},[command,battle]);
  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    const nodes=mapLandforms.map(p=>{
      const e=document.createElement('button');e.type='button';e.className=`g-landform-label is-${p.kind}`;e.setAttribute('aria-label',`地貌：${p.name}`);
      const name=document.createElement('strong');name.textContent=`${p.kind==='mountain'?'△ ':''}${p.name}`;
      const latin=document.createElement('small');latin.textContent=atlas?.theme==='light'?'':p.latin;e.append(name,latin);e.addEventListener('click',()=>explore(p));
      const marker=new maplibregl.Marker({element:e,anchor:p.kind==='mountain'?'right':'center',offset:p.kind==='mountain'?[-12,-18]:[0,0],opacityWhenCovered:atlas?.pitch!==undefined?1:0.4}).setLngLat(p.coords).addTo(m);
      return {p,e,marker};
    });
    const update=()=>{const z=m.getZoom();for(const {p,e} of nodes){
      const q=m.project(p.coords);const overlaps=battle?.stages[battleStep].stops.some(s=>{const t=m.project(s.coords);return Math.abs(t.x-q.x)<115&&Math.abs(t.y-q.y)<36});
      e.style.display=z>=p.minZoom&&z<=(p.maxZoom??12)&&!overlaps?'':'none';
    }};
    m.on('move',update);update();return()=>{m.off('move',update);nodes.forEach(n=>n.marker.remove())};
  },[loaded,threeD,battle,battleStep,atlas]);

  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    m.setLayoutProperty('borders','visibility',modern?'visible':'none');
    m.setLayoutProperty('alliances','visibility',!atlas&&!battle&&layer==='alliances'?'visible':'none');
  },[modern,layer,loaded,battle,atlas]);

  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    markerRefs.current.forEach(marker=>marker.remove());
    if(battle)return;
    const labelNodes:{node:HTMLElement;coords:[number,number];priority:number}[]=[];
    markerRefs.current=mapPlaces.map(p=>{
      const button=document.createElement('button');
      button.type='button';button.className=`g-map-place ${p.id===selected?'is-selected':''} ${compare.includes(p.id)?'is-compared':''}`;
      if(p.color)button.classList.add('has-record-color');
      button.style.setProperty('--pin',p.color??(layer==='alliances'?campColors[p.camp??'context']:'#385b57'));
      button.setAttribute('aria-label',`地图地点：${p.name}`);button.setAttribute('aria-pressed',String(p.id===selected));
      const dot=document.createElement('i');dot.className='g-map-dot';
      const label=document.createElement('span');label.textContent=modern?p.modern:p.name;
      button.append(dot,label);button.addEventListener('click',()=>handlers.current.onSelect(p.id));
      labelNodes.push({node:label,coords:p.coords,priority:p.id===selected?0:compare.includes(p.id)?1:['athens','sparta','corinth'].includes(p.id)?2:3});
      return new maplibregl.Marker({element:button,anchor:'left',offset:[-5,0],opacityWhenCovered:1}).setLngLat(p.coords).addTo(m);
    });
    const labels:[string,number,number][] = atlas?[]:modern ? [['希腊（今）',22,39.1],['土耳其（今）',28.8,39],['意大利（今）',15.6,38.2]] : [['伯罗奔尼撒',22.1,37.45],['阿提卡',23.95,38.23],['小亚细亚',28.7,38.8],['克里特',24.6,35.12]];
    for(const [text,lng,lat] of labels){const e=document.createElement('span');e.className='g-region-label';e.textContent=text;markerRefs.current.push(new maplibregl.Marker({element:e,opacityWhenCovered:1}).setLngLat([lng,lat]).addTo(m));}
    const layout=()=>{
      const boxes:{x:number;y:number;w:number}[]=[];
      for(const l of [...labelNodes].sort((a,b)=>a.priority-b.priority)){
        const q=m.project(l.coords);const w=(l.node.textContent?.length??4)*13+14;
        const overlap=l.priority>1 && boxes.some(b=>Math.abs(b.y-q.y)<23 && q.x<b.x+b.w && q.x+w>b.x);
        l.node.style.opacity=overlap?'0':'1';
        if(!overlap)boxes.push({x:q.x,y:q.y,w});
      }
    };
    m.on('move',layout);layout();
    return ()=>{m.off('move',layout);markerRefs.current.forEach(marker=>marker.remove());};
  },[loaded,selected,compare,modern,layer,battle,atlas]);

  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    (m.getSource('battleRoutes') as GeoJSONSource).setData(battle?battleRoutes(battle,battleStep):empty);
    if(!battle)return;
    const stage=battle.stages[battleStep];const markers:maplibregl.Marker[]=[];
    const contextNodes:{e:HTMLElement;coords:Coordinate}[]=[];
    const stopLabels:HTMLElement[]=[];
    const seen=new Set(stage.stops.map(p=>p.coords.join(',')));
    const seenNames=new Set(stage.stops.map(p=>p.name));
    for(const p of battle.stages.flatMap(s=>s.stops)){
      if(seen.has(p.coords.join(','))||seenNames.has(p.name))continue;seen.add(p.coords.join(','));seenNames.add(p.name);
      const e=document.createElement('span');e.className='g-battle-context';e.textContent=`· ${p.name}`;
      contextNodes.push({e,coords:p.coords});
      markers.push(new maplibregl.Marker({element:e,anchor:'left',opacityWhenCovered:1}).setLngLat(p.coords).addTo(m));
    }
    stage.stops.forEach((p,i)=>{
      const e=document.createElement('div');e.className='g-battle-stop';
      const number=document.createElement('b');number.textContent=String(i+1);number.style.background=stage.color;
      const label=document.createElement('span');label.textContent=p.name;e.append(number,label);
      stopLabels.push(label);
      markers.push(new maplibregl.Marker({element:e,anchor:'left',offset:[-12,0],opacityWhenCovered:1}).setLngLat(p.coords).addTo(m));
    });
    for(let i=1;i<stage.path.length;i++){
      const a=stage.path[i-1],b=stage.path[i];const lat=(a[1]+b[1])/2;
      const bearing=Math.atan2((b[0]-a[0])*Math.cos(lat*Math.PI/180),b[1]-a[1])*180/Math.PI;
      const e=document.createElement('span');e.className='g-route-arrow';e.textContent='▲';e.style.color=stage.color;e.setAttribute('aria-hidden','true');
      markers.push(new maplibregl.Marker({element:e,rotation:bearing,rotationAlignment:'map',pitchAlignment:'map',opacityWhenCovered:1}).setLngLat([(a[0]+b[0])/2,lat]).addTo(m));
    }
    const layout=()=>{
      const points=stage.stops.map(p=>m.project(p.coords));
      for(const {e,coords} of contextNodes){const q=m.project(coords);e.style.visibility=points.some(p=>Math.abs(p.x-q.x)<150&&Math.abs(p.y-q.y)<42)?'hidden':'visible'}
      stopLabels.forEach((e,i)=>{const close=points.some((p,j)=>i!==j&&Math.abs(p.x-points[i].x)<170&&Math.abs(p.y-points[i].y)<45);e.style.transform=close?`translateY(${i%2?-26:26}px)`:'none'});
    };
    m.on('move',layout);layout();
    return()=>{m.off('move',layout);markers.forEach(marker=>marker.remove())};
  },[battle,battleStep,loaded]);

  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    const ps=compare.map(id=>mapPlaces.find(p=>p.id===id)!).filter(Boolean);
    (m.getSource('comparison') as GeoJSONSource).setData(ps.length===2?{type:'FeatureCollection',features:[{type:'Feature',properties:{},geometry:{type:'LineString',coordinates:ps.map(p=>p.coords)}}]}:empty);
  },[compare,loaded,atlas]);

  useEffect(()=>{
    const m=map.current;if(!m||!loaded)return;
    // MapLibre adds existing edge padding when fitting new bounds. Clear the
    // previous panel's padding so switching from a place to a route still fits.
    if(light){m.stop();m.setPadding({top:0,bottom:0,left:0,right:0});}
    if(command.camera){m.easeTo({...command.camera,padding:command.camera.padding??{top:0,bottom:0,left:0,right:0},duration:600});return;}
    if(command.coordinates?.length){
      const bounds=new maplibregl.LngLatBounds();command.coordinates.forEach(p=>bounds.extend(p));
      const mobile=window.innerWidth<=760;
      m.fitBounds(bounds,{pitch:threeD?(mobile?35:50):0,bearing:threeD?(battle?.id==='thermopylae'?155:-20):0,padding:{top:mobile?125:110,bottom:light?(mobile?Math.min(m.getContainer().clientHeight-220,m.getContainer().clientHeight*(battle ? 0.4 : 0.46)+155):145):mobile&&battle?Math.min(300,m.getContainer().clientHeight*.48):85,left:light&&!mobile?488:mobile?35:55,right:battle&&!mobile&&!light?350:atlas?.detailInSidebar?35:window.innerWidth>1100?365:55},maxZoom:mobile?8.8:10,duration:850});return;
    }
    const ps=command.ids.map(id=>mapPlaces.find(p=>p.id===id)).filter(p=>!!p);
    if(!ps.length){
      if(atlas?.overviewBounds){m.fitBounds(atlas.overviewBounds,{pitch:threeD?(atlas.pitch??42):0,bearing:atlas.bearing??0,padding:{top:light?170:110,bottom:light?150:95,left:25,right:25},duration:600});return;}
      m.easeTo({center:atlas?.center??[23.7,37.8],zoom:light&&window.innerWidth<=760?3.1:atlas?.zoom??6.5,pitch:threeD?(atlas?.pitch??58):0,bearing:threeD?(atlas?.bearing??-20):0,padding:{top:0,bottom:0,left:light&&window.innerWidth>760?72:0,right:0},duration:600});return;}
    if(ps.length===1){m.easeTo({center:ps[0].coords,zoom:Math.max(m.getZoom(),7.8),padding:{top:light?(window.innerWidth<=760?Math.min(280,m.getContainer().clientHeight*.3):125):70,bottom:light?(window.innerWidth<=760?Math.min(m.getContainer().clientHeight-220,m.getContainer().clientHeight*.46+155):145):70,left:light&&window.innerWidth>760?488:35,right:atlas?.detailInSidebar?35:window.innerWidth>1000?350:35},duration:650});return;}
    const bounds=new maplibregl.LngLatBounds();ps.forEach(p=>bounds.extend(p.coords));
    m.fitBounds(bounds,{padding:{top:100,bottom:100,left:65,right:window.innerWidth>1000&&selected?360:65},maxZoom:9,duration:650});
  },[loaded,command]);

  return <div className="g-map-wrap"><div ref={node} className="g-map" aria-label={atlas?.title??"古希腊交互地图"} />
    {!loaded&&!error&&<div className="g-map-status">正在展开地图…</div>}
    {error&&<div className="g-map-error" role="status">{error}</div>}
    <div className="g-relief-dock"><span>读懂地形</span>{(atlas?.presets??landformPresets(battle?.id)).map(p=><button key={p.id} aria-label={`观察${p.kind==='mountain'?'山脉':p.kind==='plain'?'平原':'海洋'}`} onClick={()=>explore(p)}>{p.kind==='mountain'?<Mountain size={16}/>:p.kind==='plain'?<Sprout size={16}/>:<Waves size={16}/>} {p.kind==='mountain'?'山脉':p.kind==='plain'?'平原':'海洋'}</button>)}</div>
    {landform&&<aside className="g-landform-card"><button aria-label="关闭地貌说明" onClick={()=>setLandform(undefined)}><X size={15}/></button><small>地貌观察 / 近似地理参考点</small><h3>{landform.name}</h3><p>{landform.text}</p><a href={landform.source} target="_blank" rel="noreferrer">地理资料<ExternalLink size={11}/></a></aside>}
    <div className="g-elevation-key"><span>深海</span><i/><span>低地</span><i/><span>高山</span></div>
    <span className="g-terrain-status">{threeD?(terrainReady?'立体地形 · 高度 ×4':'立体地形加载中'):'俯视地图'} · 海拔 / 水深设色 · 现代海岸</span>
  </div>;
}
