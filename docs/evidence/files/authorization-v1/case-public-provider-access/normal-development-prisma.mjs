import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import dotenv from 'dotenv';

const operation=process.argv[2];
if(!['status','deploy'].includes(operation)) throw new Error('expected status or deploy');
dotenv.config({path:'.env',quiet:true});
const rawUrl=process.env.DIRECT_URL;
if(!rawUrl) throw new Error('DIRECT_URL missing');
const url=new URL(rawUrl);
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
if(hash(url.hostname).slice(0,12)!=='eb0d823953fe'||Number(url.port)!==5432||url.pathname!=='/postgres'||(url.searchParams.get('schema')||'public')!=='public') throw new Error('not the pinned development target');
const root=process.cwd();
const worktree='C:/Users/alnaseem/.codex/worktrees/case-public-dev-migration/lab-os-project-4';
const migrationRoot=path.join(worktree,'prisma/migrations');
const evidence=path.join(root,'docs/evidence/files/authorization-v1/case-public-provider-access');
const pre=JSON.parse(fs.readFileSync(path.join(evidence,'normal-development-precheck-20260930.json'),'utf8'));
if(pre.status!=='PASS'||pre.target.hostHash!=='eb0d823953fe'||pre.migration.candidateRows!==0) throw new Error('read-only preflight not accepted');
for(const x of pre.migration.sourceManifest){
  const p=path.join(migrationRoot,x.name,'migration.sql');
  if(!fs.existsSync(p)||hash(fs.readFileSync(p))!==x.canonicalLfHash) throw new Error(`LF execution chain mismatch: ${x.name}`);
}
const temp=path.join(root,'prisma','.case-public-dev-execution-20260930');
const exact=path.resolve(root,'prisma','.case-public-dev-execution-20260930');
if(path.resolve(temp)!==exact||!exact.startsWith(path.resolve(root,'prisma')+path.sep)) throw new Error('unsafe run-owned config path');
if(fs.existsSync(temp)) throw new Error('run-owned config path already exists');
fs.mkdirSync(temp,{recursive:true});
const config=path.join(temp,'config.ts');
fs.writeFileSync(config,`import { defineConfig } from 'prisma/config';\nexport default defineConfig({schema:${JSON.stringify(path.join(root,'prisma/schema.prisma').replaceAll('\\','/'))},migrations:{path:${JSON.stringify(migrationRoot.replaceAll('\\','/'))}},datasource:{url:process.env.DIRECT_URL!}});\n`);
const sanitize=value=>String(value||'').replaceAll(rawUrl,'[REDACTED_URL]').replaceAll(url.hostname,'[development-host]').replaceAll(decodeURIComponent(url.password),'[REDACTED_PASSWORD]').replaceAll(decodeURIComponent(url.username),'[REDACTED_USER]');
let record;
try {
  const args=['node_modules/prisma/build/index.js','migrate',operation==='status'?'status':'deploy','--config',config];
  const child=spawnSync(process.execPath,args,{cwd:root,env:{...process.env,DIRECT_URL:rawUrl},encoding:'utf8',maxBuffer:8*1024*1024,timeout:120000});
  record={operation,at:new Date().toISOString(),exitCode:child.status,signal:child.signal,stdout:sanitize(child.stdout),stderr:sanitize(child.stderr),candidate:'20260929120000_case_public_provider_access_contract',candidateSha256:'a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668',canonicalLfChainMatched:50};
  fs.writeFileSync(path.join(evidence,`normal-development-prisma-${operation}-20260930.json`),JSON.stringify(record,null,2)+'\n');
  process.stdout.write(JSON.stringify({operation,exitCode:record.exitCode,stdout:record.stdout.slice(-2000),stderr:record.stderr.slice(-1000)})+'\n');
  if(operation==='deploy'&&child.status!==0) process.exitCode=1;
  if(operation==='status'&&child.status!==0&&!record.stdout.includes('20260929120000_case_public_provider_access_contract')) process.exitCode=1;
} finally {
  if(path.resolve(temp)!==exact||!exact.startsWith(path.resolve(root,'prisma')+path.sep)) throw new Error('unsafe cleanup target');
  fs.rmSync(temp,{recursive:true,force:true});
}
