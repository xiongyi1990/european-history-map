// Vite copies ignored local terrain caches too. Publish only versioned public assets.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const gitRoot=execFileSync('git',['rev-parse','--show-toplevel'],{cwd:root,encoding:'utf8'}).trim();
if(fs.realpathSync(gitRoot)!==fs.realpathSync(root))throw new Error('Run in the atlas repository.');
const dist=path.join(root,'dist');
if(!fs.existsSync(path.join(dist,'index.html')))throw new Error('Build the atlas before preparing Sites assets.');
const tracked=new Set(execFileSync('git',['ls-files','-z','--','public'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean));
let removed=0,bytes=0;
function walk(directory){
 for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
  const filename=path.join(directory,entry.name),relative=path.relative(dist,filename);
  if(relative.startsWith('..')||path.isAbsolute(relative)||entry.isSymbolicLink())throw new Error('Build output must stay inside dist without symlinks.');
  if(entry.isDirectory()){walk(filename);if(!fs.readdirSync(filename).length)fs.rmdirSync(filename);continue}
  const key=relative.split(path.sep).join('/');
  if(key==='index.html'||key.startsWith('assets/')||key.startsWith('.openai/')||tracked.has(`public/${key}`))continue;
  bytes+=fs.statSync(filename).size;fs.unlinkSync(filename);removed++;
 }
}
walk(dist);
console.log(JSON.stringify({removed_local_cache_files:removed,removed_bytes:bytes}));
