import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
const run=process.argv[2];
const exe=join(run,'r001-codec-probe.exe');
const bytes=await readFile(join(run,'entropy-progressive-25mp.jpg'));
const header=Buffer.alloc(8);header.write('LJ01');header.writeUInt32LE(bytes.length,4);
const frame=Buffer.concat([header,bytes]);
async function one(group,index){
 const start=performance.now();
 const child=spawn(exe,[],{stdio:['pipe','pipe','pipe'],windowsHide:true});
 let out=Buffer.alloc(0),err=Buffer.alloc(0),timedOut=false;
 const timer=setTimeout(()=>{timedOut=true;child.kill();},10000);
 child.stdout.on('data',chunk=>{out=Buffer.concat([out,chunk]);if(out.length>256)child.kill()});
 child.stderr.on('data',chunk=>{err=Buffer.concat([err,chunk]);if(err.length>256)child.kill()});
 child.stdin.end(frame);
 const result=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal}))});
 clearTimeout(timer);
 return {group,index,wallMs:Math.round((performance.now()-start)*1000)/1000,timedOut,...result,stdout:out.toString().trim(),stderr:err.toString().trim()};
}
const records=[];
for(const n of [1,2,4])for(let iteration=0;iteration<3;iteration++){
 const started=performance.now();
 const children=await Promise.all(Array.from({length:n},(_,i)=>one(n,i)));
 records.push({concurrency:n,iteration,groupWallMs:Math.round((performance.now()-started)*1000)/1000,children});
}
// Candidate semaphore behavior is a simulation, not an application implementation.
let active=0,queued=0;const maxActive=2,maxQueue=2;
const admissions=[];
for(let i=0;i<5;i++){
 const disposition=active<maxActive?(active++,'start'):queued<maxQueue?(queued++,'queue'):'reject';
 admissions.push({request:i,disposition,active,queued});
}
await writeFile(join(run,'raw-concurrency.json'),JSON.stringify({fixture:'entropy-progressive-25mp',encodedBytes:bytes.length,records,admissions},null,2));
console.log(JSON.stringify({groups:records.map(r=>({concurrency:r.concurrency,iteration:r.iteration,groupWallMs:r.groupWallMs,childWallMs:r.children.map(c=>c.wallMs),allSuccess:r.children.every(c=>c.code===0&&!c.timedOut&&c.stderr==='')})),admissions}));
