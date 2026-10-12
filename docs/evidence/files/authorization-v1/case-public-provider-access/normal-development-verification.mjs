import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import pg from 'pg';

const phase = process.argv[2];
if (!['pre','post'].includes(phase)) throw new Error('expected pre or post');
dotenv.config({ path: '.env', quiet: true });
const targetUrl = process.env.DIRECT_URL;
const root = process.cwd();
const evidence = path.join(root,'docs/evidence/files/authorization-v1/case-public-provider-access');
const output = path.join(evidence,`normal-development-${phase}check-20260930.json`);
const expected = {
  hostHashPrefix:'eb0d823953fe', port:5432, database:'postgres', schema:'public',
  c2:'92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80',
  evidence:'e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b',
  candidate:'a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668',
};
const migrationRoot=path.join(root,'prisma/migrations');
const candidateName='20260929120000_case_public_provider_access_contract';
const c2Name='20260927120000_c2_case_file_persistence';
const evidenceName='20260927130000_case_clinical_upload_evidence';
const result={phase,status:'BLOCKED',at:new Date().toISOString(),target:{},migration:{},data:{},issues:[]};
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const normalized=b=>Buffer.from(b.toString('utf8').replace(/\r\n/g,'\n'),'utf8');
const dirs=fs.readdirSync(migrationRoot,{withFileTypes:true}).filter(x=>x.isDirectory()&&/^\d{14}_/.test(x.name)).map(x=>x.name).sort();
const manifest=dirs.map(name=>{const raw=fs.readFileSync(path.join(migrationRoot,name,'migration.sql'));const canon=normalized(raw);return {name,rawHash:sha(raw),canonicalLfHash:sha(canon),hasCrLf:raw.includes(Buffer.from('\r\n')),hasLoneCr:canon.includes(Buffer.from('\r'))};});
result.migration.sourceCount=manifest.length;
result.migration.sourceManifest=manifest;
const get=name=>manifest.find(x=>x.name===name);
for(const [name,h] of [[candidateName,expected.candidate],[c2Name,expected.c2],[evidenceName,expected.evidence]]) if(get(name)?.rawHash!==h) result.issues.push(`PINNED_SOURCE_HASH:${name}`);
if(manifest.length!==50||manifest.at(-1)?.name!==candidateName||manifest.some(x=>x.hasLoneCr)) result.issues.push('MIGRATION_SOURCE_SHAPE');
if(!targetUrl) result.issues.push('DIRECT_URL_ABSENT');
let db;
try {
  if(result.issues.length) throw new Error('local preflight failed');
  const u=new URL(targetUrl);
  const port=Number(u.port||5432), database=decodeURIComponent(u.pathname.replace(/^\//,''));
  const hostHash=sha(u.hostname).slice(0,12), schema=u.searchParams.get('schema')||'public';
  result.target={hostHash,port,database,schema,tls:true};
  if(hostHash!==expected.hostHashPrefix||port!==expected.port||database!==expected.database||schema!==expected.schema) result.issues.push('WRONG_TARGET_IDENTITY');
  if(result.issues.length) throw new Error('target identity failed');
  db=new pg.Client({host:u.hostname,port,user:decodeURIComponent(u.username),password:decodeURIComponent(u.password),database,ssl:{rejectUnauthorized:false},connectionTimeoutMillis:15000});
  await db.connect();
  await db.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');
  await db.query("SET LOCAL statement_timeout = '15000ms'");
  const identity=(await db.query(`SELECT current_database() AS db,current_schema() AS schema,current_setting('server_version_num') AS version,pg_is_in_recovery() AS recovery,current_setting('transaction_read_only') AS read_only`)).rows[0];
  result.target={...result.target,serverVersionNum:identity.version,recovery:identity.recovery,readOnly:identity.read_only};
  if(identity.db!==expected.database||identity.schema!==expected.schema||identity.recovery!==false||identity.read_only!=='on'||!identity.version.startsWith('17')) result.issues.push('LIVE_TARGET_ATTESTATION');
  const ledger=(await db.query('SELECT migration_name,checksum,finished_at,rolled_back_at,logs FROM _prisma_migrations ORDER BY started_at,migration_name')).rows;
  const expectedInstalled=phase==='pre'?49:50;
  result.migration.installedCount=ledger.length;
  result.migration.finishedCount=ledger.filter(x=>x.finished_at&&!x.rolled_back_at).length;
  result.migration.failedOrRolledBack=ledger.filter(x=>!x.finished_at||x.rolled_back_at).map(x=>x.migration_name);
  result.migration.names=ledger.map(x=>x.migration_name);
  result.migration.checksumMismatches=ledger.filter((x,i)=>x.migration_name!==manifest[i]?.name||x.checksum!==manifest[i]?.canonicalLfHash).map(x=>x.migration_name);
  result.migration.candidateRows=ledger.filter(x=>x.migration_name===candidateName).length;
  result.migration.installedCandidateChecksum=ledger.find(x=>x.migration_name===candidateName)?.checksum??null;
  if(ledger.length!==expectedInstalled||result.migration.finishedCount!==expectedInstalled||result.migration.failedOrRolledBack.length||result.migration.checksumMismatches.length||result.migration.candidateRows!==(phase==='pre'?0:1)) result.issues.push('MIGRATION_LEDGER');
  const names=['organization','Lab','Case','CaseAssetFile','FileUploadGrant','StoredFile','CaseAssetFileVersion','CaseClinicalUploadEvidence','CaseFileAccessAudit','WorkType','Product','Dentist'];
  const counts={},fingerprints={};
  for(const name of names){
    const order=name==='CaseClinicalUploadEvidence'?'"uploadGrantId"':'id';
    const exclude=phase==='post'&&name==='StoredFile'?`to_jsonb(t)-'providerAccess'`:'to_jsonb(t)';
    const row=(await db.query(`SELECT count(*)::int AS n, md5(coalesce(string_agg((${exclude})::text,'|' ORDER BY ${order}),'') ) AS digest FROM "${name}" t`)).rows[0];
    counts[name]=row.n;fingerprints[name]=row.digest;
  }
  result.data={counts,fingerprints};
  const integrity=(await db.query(`SELECT
   (SELECT count(*)::int FROM "Lab" l WHERE l."organizationId" IS NULL OR NOT EXISTS(SELECT 1 FROM "organization" o WHERE o.id=l."organizationId")) AS unlinked_labs,
   (SELECT count(*)::int FROM "Case" c JOIN "Lab" l ON l.id=c."labId" WHERE l."organizationId" IS NULL) AS broken_case_lab,
   (SELECT count(*)::int FROM "CaseAssetFile" a LEFT JOIN "Case" c ON c.id=a."dentalCaseId" AND c."labId"=a."labId" WHERE c.id IS NULL) AS broken_asset_case,
   (SELECT count(*)::int FROM "CaseAssetFile" WHERE "storageMode"='MANAGED_PRIVATE') AS private_assets,
   (SELECT count(*)::int FROM "CaseAssetFile" WHERE "storageMode"='LEGACY_URL_UNVERIFIED') AS legacy_assets,
   (SELECT count(*)::int FROM "CaseAssetFile" WHERE "storageMode"='LEGACY_URL_UNVERIFIED' AND ("documentUrl" IS NULL OR "fileExtension" IS NULL OR "currentVersionId" IS NOT NULL)) AS invalid_legacy,
   (SELECT count(*)::int FROM "FileUploadGrant" g JOIN "Lab" l ON l.id=g."labId" WHERE l."organizationId" IS DISTINCT FROM g."organizationId") AS broken_grant_tenant`)).rows[0];
  result.data.integrity=integrity;
  if(integrity.unlinked_labs||integrity.broken_case_lab||integrity.broken_asset_case||integrity.invalid_legacy||integrity.broken_grant_tenant) result.issues.push('DEVELOPMENT_DATA_INTEGRITY');
  const column=(await db.query(`SELECT is_nullable,column_default FROM information_schema.columns WHERE table_schema='public' AND table_name='StoredFile' AND column_name='providerAccess'`)).rows;
  result.data.providerAccessColumn=column;
  if(phase==='pre'&&column.length!==0) result.issues.push('CANDIDATE_PARTIAL_SCHEMA');
  if(phase==='post'){
    if(column.length!==1||column[0].is_nullable!=='YES'||column[0].column_default!==null) result.issues.push('PROVIDER_ACCESS_COLUMN');
    const modes=(await db.query(`SELECT enumlabel::text AS label FROM pg_enum e JOIN pg_type t ON t.oid=e.enumtypid WHERE t.typname='CaseAssetStorageMode' ORDER BY e.enumsortorder`)).rows.map(x=>x.label);
    const access=(await db.query(`SELECT enumlabel::text AS label FROM pg_enum e JOIN pg_type t ON t.oid=e.enumtypid WHERE t.typname='StoredFileProviderAccess' ORDER BY e.enumsortorder`)).rows.map(x=>x.label);
    result.data.enums={modes,access};
    if(JSON.stringify(modes)!==JSON.stringify(['LEGACY_URL_UNVERIFIED','MANAGED_PRIVATE','MANAGED_PUBLIC'])||JSON.stringify(access)!==JSON.stringify(['PUBLIC_READ','PRIVATE'])) result.issues.push('INSTALLED_ENUMS');
    const classified=(await db.query(`SELECT "providerAccess"::text AS access,count(*)::int AS n FROM "StoredFile" GROUP BY "providerAccess" ORDER BY 1 NULLS FIRST`)).rows;
    result.data.storedFileAccessCounts=classified;
    const triggers=(await db.query(`SELECT tgname,tgenabled,tgdeferrable,tginitdeferred,pg_get_triggerdef(oid) AS definition FROM pg_trigger WHERE tgrelid IN ('"CaseAssetFile"'::regclass,'"StoredFile"'::regclass) AND NOT tgisinternal ORDER BY tgname`)).rows;
    result.data.triggers=triggers;
    for(const name of ['CaseAssetFile_final_storage_mode','CaseAssetFile_clinical_purpose','StoredFile_require_provider_access_on_insert','StoredFile_allow_live_member_null_transition_only']) if(!triggers.some(x=>x.tgname===name&&x.tgenabled==='O')) result.issues.push(`MISSING_TRIGGER:${name}`);
    for(const name of ['CaseAssetFile_final_storage_mode','CaseAssetFile_clinical_purpose']) if(!triggers.some(x=>x.tgname===name&&x.tgdeferrable&&x.tginitdeferred)) result.issues.push(`NOT_DEFERRED:${name}`);
    const functions=(await db.query(`SELECT p.proname,pg_get_functiondef(p.oid) AS definition FROM pg_proc p WHERE p.proname=ANY($1::text[]) AND pg_function_is_visible(p.oid) ORDER BY p.proname`,[['CaseAssetFile_validate_final_storage_mode','CaseAssetFile_clinical_purpose_final_state','StoredFile_require_provider_access_on_insert','StoredFile_allow_live_member_null_transition_only']])).rows;
    result.data.functions=functions;
    if(functions.length!==4) result.issues.push('CANDIDATE_FUNCTIONS');
    const constraints=(await db.query(`SELECT c.conname,c.contype,c.convalidated,pg_get_constraintdef(c.oid) AS definition FROM pg_constraint c WHERE c.conrelid IN ('"CaseAssetFile"'::regclass,'"StoredFile"'::regclass,'"CaseAssetFileVersion"'::regclass,'"CaseClinicalUploadEvidence"'::regclass) ORDER BY c.conname`)).rows;
    result.data.constraints=constraints;
    for(const name of ['CaseAssetFile_dentalCaseId_labId_fkey','CaseAssetFile_currentVersionId_id_labId_fkey','StoredFile_labId_organizationId_fkey','StoredFile_sourceUploadGrantId_organizationId_labId_fkey','CaseAssetFileVersion_storedFileId_organizationId_labId_fkey']) if(!constraints.some(x=>x.conname===name&&x.convalidated)) result.issues.push(`MISSING_CONSTRAINT:${name}`);
  }
  await db.query('ROLLBACK');
} catch(e) {
  if(db) await db.query('ROLLBACK').catch(()=>{});
  result.issues.push(e.code?`SQL_${e.code}`:'PREFLIGHT_ERROR');
} finally { if(db) await db.end().catch(()=>{}); }
result.status=result.issues.length?'BLOCKED':'PASS';
fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');
process.stdout.write(JSON.stringify({phase,status:result.status,issues:result.issues,target:result.target,migration:{installedCount:result.migration.installedCount,finishedCount:result.migration.finishedCount,checksumMismatches:result.migration.checksumMismatches,candidateRows:result.migration.candidateRows},counts:result.data.counts})+'\n');
if(result.status!=='PASS') process.exitCode=1;
