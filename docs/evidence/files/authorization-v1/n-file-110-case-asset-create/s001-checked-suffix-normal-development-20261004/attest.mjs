import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import pg from 'pg';

const phase=process.argv[2]; if(!['pre','post'].includes(phase)) throw new Error('phase');
dotenv.config({path:'.env',quiet:true});
const root=process.cwd();
const evidence=path.join(root,'docs/evidence/files/authorization-v1/n-file-110-case-asset-create/s001-checked-suffix-normal-development-20261004');
const candidate='20261004120000_case_checked_suffix_handoff';
const expectedHash='3e150d41429c58d44a902473ff4b9d4fbc4c0d9afb29955e8d124f899e6bd23d';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const report={phase,at:new Date().toISOString(),status:'BLOCKED',target:{},source:{},ledger:{},schema:{},data:{},issues:[]};
let client;
try{
  const rawUrl=process.env.DIRECT_URL;if(!rawUrl)throw new Error('DIRECT_URL_ABSENT');
  const url=new URL(rawUrl);const port=Number(url.port||5432);const database=decodeURIComponent(url.pathname.slice(1));const schema=url.searchParams.get('schema')||'public';
  report.target={hostSha256Prefix:sha(url.hostname).slice(0,12),port,database,schema};
  if(report.target.hostSha256Prefix!=='eb0d823953fe'||port!==5432||database!=='postgres'||schema!=='public'||url.protocol!=='postgresql:')throw new Error('NOT_ESTABLISHED_DEVELOPMENT_TARGET');
  const migrations=path.join(root,'prisma/migrations');
  const names=fs.readdirSync(migrations,{withFileTypes:true}).filter(x=>x.isDirectory()&&/^\d{14}_/.test(x.name)).map(x=>x.name).sort();
  const manifest=names.map(name=>{const raw=fs.readFileSync(path.join(migrations,name,'migration.sql'));const lf=Buffer.from(raw.toString('utf8').replace(/\r\n/g,'\n'));return{name,rawSha256:sha(raw),canonicalLfSha256:sha(lf),crlf:raw.includes(Buffer.from('\r\n'))}});
  report.source={count:manifest.length,candidate:manifest.at(-1),manifest};
  if(manifest.length!==52||manifest.at(-1)?.name!==candidate||manifest.at(-1)?.rawSha256!==expectedHash||manifest.at(-1)?.canonicalLfSha256!==expectedHash)throw new Error('CANDIDATE_OR_CHAIN_MISMATCH');
  client=new pg.Client({host:url.hostname,port,user:decodeURIComponent(url.username),password:decodeURIComponent(url.password),database,ssl:{rejectUnauthorized:false},connectionTimeoutMillis:15000});
  await client.connect();await client.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');await client.query("SET LOCAL statement_timeout = '15000ms'");
  const identity=(await client.query("SELECT current_database() AS database,current_schema() AS schema,current_setting('server_version_num') AS version,pg_is_in_recovery() AS recovery,current_setting('transaction_read_only') AS read_only")).rows[0];
  report.target={...report.target,...identity};
  if(identity.database!==database||identity.schema!=='public'||identity.recovery!==false||identity.read_only!=='on'||!identity.version.startsWith('17'))throw new Error('LIVE_TARGET_MISMATCH');
  const ledger=(await client.query('SELECT migration_name,checksum,finished_at,rolled_back_at FROM "_prisma_migrations" ORDER BY started_at,migration_name')).rows;
  const expected=phase==='pre'?51:52;
  report.ledger={count:ledger.length,successful:ledger.filter(x=>x.finished_at&&!x.rolled_back_at).length,failed:ledger.filter(x=>!x.finished_at||x.rolled_back_at).map(x=>x.migration_name),candidateRows:ledger.filter(x=>x.migration_name===candidate).length,candidateChecksum:ledger.find(x=>x.migration_name===candidate)?.checksum??null,mismatches:ledger.filter((x,i)=>x.migration_name!==manifest[i]?.name||x.checksum!==manifest[i]?.canonicalLfSha256).map(x=>x.migration_name),entries:ledger.map(x=>({name:x.migration_name,checksum:x.checksum,successful:!!x.finished_at&&!x.rolled_back_at}))};
  if(report.ledger.count!==expected||report.ledger.successful!==expected||report.ledger.failed.length||report.ledger.mismatches.length||report.ledger.candidateRows!==(phase==='pre'?0:1))throw new Error('MIGRATION_HISTORY_MISMATCH');
  const columns=(await client.query("SELECT column_name,data_type,udt_name,is_nullable,column_default FROM information_schema.columns WHERE table_schema='public' AND table_name='FileUploadGrant' ORDER BY ordinal_position")).rows;
  const suffix=columns.filter(x=>x.column_name==='caseClinicalValidatedSuffix');
  const scope=(await client.query("SELECT conname,convalidated,pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid='\"FileUploadGrant\"'::regclass AND conname='FileUploadGrant_case_suffix_scope'")).rows;
  const functions=(await client.query("SELECT proname,pg_get_functiondef(oid) AS definition FROM pg_proc WHERE proname IN ('FileUploadGrant_case_identity_guard','CaseClinicalUploadEvidence_validate_grant') ORDER BY proname")).rows.map(x=>({name:x.proname,sha256:sha(x.definition),hasSuffix:x.definition.includes('caseClinicalValidatedSuffix'),definition:x.definition}));
  const grantTriggers=(await client.query("SELECT tgname,tgenabled,pg_get_triggerdef(oid) AS definition FROM pg_trigger WHERE tgrelid='\"FileUploadGrant\"'::regclass AND NOT tgisinternal ORDER BY tgname")).rows;
  const evidenceTriggers=(await client.query("SELECT tgname,tgenabled,tgdeferrable,tginitdeferred,pg_get_triggerdef(oid) AS definition FROM pg_trigger WHERE tgrelid='\"CaseClinicalUploadEvidence\"'::regclass AND NOT tgisinternal ORDER BY tgname")).rows;
  const fks=(await client.query("SELECT conname,pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid='\"CaseClinicalUploadEvidence\"'::regclass AND contype='f' ORDER BY conname")).rows;
  report.schema={grantColumnCount:columns.length,suffix,scope,functions,grantTriggers,evidenceTriggers,fks};
  if(functions.length!==2||grantTriggers.length<1||evidenceTriggers.length!==3||evidenceTriggers.some(x=>x.tgenabled!=='O')||!evidenceTriggers.some(x=>x.tgname==='CaseClinicalUploadEvidence_uploaded'&&x.tgdeferrable&&x.tginitdeferred)||!fks.some(x=>x.definition.includes('providerObjectKey')&&x.definition.includes('providerFileKey')))throw new Error('PREDECESSOR_GUARD_OR_TRIGGER_MISMATCH');
  if(phase==='pre'){
    if(suffix.length||scope.length||functions.some(x=>x.hasSuffix))throw new Error('CONFLICTING_PARTIAL_CANDIDATE_OBJECT');
  }else{
    if(suffix.length!==1||suffix[0].udt_name!=='CaseClinicalValidatedSuffix'||suffix[0].is_nullable!=='YES'||suffix[0].column_default!==null||scope.length!==1||!scope[0].convalidated||functions.some(x=>!x.hasSuffix))throw new Error('INSTALLED_SUFFIX_SHAPE_MISMATCH');
    const grantGuard=functions.find(x=>x.name==='FileUploadGrant_case_identity_guard')?.definition||'';
    const evidenceGuard=functions.find(x=>x.name==='CaseClinicalUploadEvidence_validate_grant')?.definition||'';
    if(!grantGuard.includes('NEW."caseClinicalValidatedSuffix" IS DISTINCT FROM OLD."caseClinicalValidatedSuffix"')||!grantGuard.includes('NEW."caseClinicalValidatedSuffix" IS NULL')||!evidenceGuard.includes('NEW."validatedSuffix" IS DISTINCT FROM grant_row."caseClinicalValidatedSuffix"'))throw new Error('INSTALLED_FUNCTION_SEMANTICS_MISMATCH');
  }
  const tables=['organization','Lab','Case','CaseAssetFile','FileUploadGrant','StoredFile','CaseAssetFileVersion','CaseClinicalUploadEvidence'];
  const counts={},fingerprints={};
  for(const name of tables){const expression=phase==='post'&&name==='FileUploadGrant'?"to_jsonb(t)-'caseClinicalValidatedSuffix'":'to_jsonb(t)';const order=name==='CaseClinicalUploadEvidence'?'"uploadGrantId"':'id';const row=(await client.query(`SELECT count(*)::int n,md5(coalesce(string_agg((${expression})::text,'|' ORDER BY ${order}),'')) digest FROM "${name}" t`)).rows[0];counts[name]=row.n;fingerprints[name]=row.digest}
  const caseGrantStatuses=(await client.query("SELECT status::text,count(*)::int n FROM \"FileUploadGrant\" WHERE \"boundaryId\"='N-FILE-110' AND purpose='case.asset.add.stage' GROUP BY status ORDER BY status")).rows;
  const nullSuffix=(phase==='post')?(await client.query("SELECT count(*)::int n FROM \"FileUploadGrant\" WHERE \"caseClinicalValidatedSuffix\" IS NOT NULL")).rows[0].n:null;
  report.data={counts,fingerprints,caseGrantStatuses,caseGrantCount:caseGrantStatuses.reduce((a,x)=>a+x.n,0),evidenceCount:counts.CaseClinicalUploadEvidence,nonNullSuffixCount:nullSuffix};
  if(phase==='post'&&nullSuffix!==0)throw new Error('MIGRATION_POPULATED_SUFFIX');
  await client.query('ROLLBACK');report.status='PASS';
}catch(e){if(client)await client.query('ROLLBACK').catch(()=>{});report.issues.push(e.code?`SQL_${e.code}`:e.message)}finally{if(client)await client.end().catch(()=>{});fs.writeFileSync(path.join(evidence,`${phase}flight.json`),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({phase,status:report.status,target:report.target,ledger:{count:report.ledger.count,candidateRows:report.ledger.candidateRows,mismatches:report.ledger.mismatches},schema:{suffix:report.schema.suffix?.length,scope:report.schema.scope?.length,evidenceTriggers:report.schema.evidenceTriggers?.length},data:{counts:report.data.counts,caseGrantStatuses:report.data.caseGrantStatuses,nonNullSuffixCount:report.data.nonNullSuffixCount},issues:report.issues}));if(report.status!=='PASS')process.exitCode=1}
