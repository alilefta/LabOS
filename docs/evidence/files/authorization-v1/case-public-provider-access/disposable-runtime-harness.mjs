import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import pg from 'pg';

// Run-owned only. No dotenv or project Prisma config is loaded.
const run = 'labos-case-public-d016f90a';
const container = run;
const volume = `${run}-vol`;
const root = process.cwd();
const workspace = path.join(root, 'prisma', `.disposable-case-public-d016f90a`);
const evidence = path.join(root, 'docs/evidence/files/authorization-v1/case-public-provider-access');
const logPath = path.join(evidence, 'disposable-runtime-20260930.jsonl');
const migrations = path.join(root, 'prisma/migrations');
const expected = {
  '20260927120000_c2_case_file_persistence': '92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80',
  '20260927130000_case_clinical_upload_evidence': 'e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b',
  '20260929120000_case_public_provider_access_contract': 'a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668',
};
const events = [];
function emit(id, status, detail = {}) { const e = { at: new Date().toISOString(), ...detail, id, status }; events.push(e); fs.appendFileSync(logPath, JSON.stringify(e) + '\n'); process.stdout.write(`${id} ${status}\n`); }
function sha(p) { return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'); }
function cmd(file, args, opts = {}) { return execFileSync(file, args, { cwd: root, encoding: 'utf8', stdio: ['ignore','pipe','pipe'], ...opts }).trim(); }
function docker(...args) { return cmd('docker', args); }
function qid() { return crypto.randomUUID(); }
const ids = { org: qid(), lab: qid(), user: qid(), member: qid(), patient: qid(), case: qid(), case2: qid(), patient2: qid(), org2: qid(), lab2: qid(), patient3: qid(), case3: qid() };
const key = n => `${run}/${n}/${qid()}`;
let client, observer, url, created = false, cleanupOkay = false;
async function query(sql, params = []) { return client.query(sql, params); }
async function tx(fn) { await query('BEGIN'); try { const v = await fn(); await query('COMMIT'); return v; } catch (e) { try { await query('ROLLBACK'); } catch {} throw e; } }
async function assert(id, fn) { try { const detail = await fn(); emit(id, 'PASS', detail ?? {}); } catch(e) { emit(id, 'FAIL', { code: e.code ?? null, message: e.message?.slice(0,500) }); throw e; } }
async function reject(id, fn, codes = ['23514','23503','23505','P0001']) {
  const counts = () => observer.query(`SELECT
    (SELECT count(*)::int FROM "CaseAssetFile") AS assets,
    (SELECT count(*)::int FROM "CaseAssetFileVersion") AS versions,
    (SELECT count(*)::int FROM "StoredFile") AS files,
    (SELECT count(*)::int FROM "FileUploadGrant") AS grants,
    (SELECT count(*)::int FROM "CaseClinicalUploadEvidence") AS evidence`);
  const before = (await counts()).rows[0];
  let error, boundary = 'statement';
  await query('BEGIN');
  try { await fn(); boundary = 'commit'; await query('COMMIT'); } catch(e) { error = e; try { await query('ROLLBACK'); } catch {} }
  const after = (await counts()).rows[0];
  const ok = error && codes.includes(error.code) && JSON.stringify(before) === JSON.stringify(after);
  emit(id, ok ? 'PASS' : 'FAIL', { sqlstate: error?.code ?? null, message: error?.message?.slice(0,300) ?? 'unexpected commit', boundary, countsBefore:before, countsAfter:after });
  if (!ok) throw new Error(`${id} expected rejection and rollback`);
}
async function seedBase() {
  await query('INSERT INTO "organization" (id,name,slug,"createdAt") VALUES ($1,$2,$3,now()),($4,$5,$6,now())', [ids.org,'Test organization',run,ids.org2,'Other organization',`${run}-other`]);
  await query('INSERT INTO "Lab" (id,"organizationId",title,"updatedAt") VALUES ($1,$2,$3,now()),($4,$5,$6,now())', [ids.lab,ids.org,'Test lab',ids.lab2,ids.org2,'Other lab']);
  await query('INSERT INTO "AuthUser" (id,name,email,"updatedAt") VALUES ($1,$2,$3,now())', [ids.user,'Test actor',`${run}@example.invalid`]);
  await query('INSERT INTO "member" (id,"organizationId","userId","createdAt") VALUES ($1,$2,$3,now())', [ids.member,ids.org,ids.user]);
  await query('INSERT INTO "Patient" (id,name,"labId","updatedAt") VALUES ($1,$2,$3,now()),($4,$5,$6,now()),($7,$8,$9,now())', [ids.patient,'First',ids.lab,ids.patient2,'Second',ids.lab,ids.patient3,'Foreign',ids.lab2]);
  await query('INSERT INTO "Case" (id,"patientId","caseNumber","labId","updatedAt") VALUES ($1,$2,$3,$4,now()),($5,$6,$7,$8,now()),($9,$10,$11,$12,now())', [ids.case,ids.patient,'CASE-1',ids.lab,ids.case2,ids.patient2,'CASE-2',ids.lab,ids.case3,ids.patient3,'CASE-3',ids.lab2]);
}
async function grant({ clinical=true, caseId=ids.case, org=ids.org, lab=ids.lab, objectKey=key('file') } = {}) {
  const id = qid();
  await query(`INSERT INTO "FileUploadGrant" (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","correlationId","expiresAt","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'UPLOADTHING',$9,$10,now()+interval '1 day',now())`,
    [id,org,lab,clinical ? ids.member : null,clinical ? 'N-FILE-110' : 'OTHER',clinical ? 'case.asset.add.stage' : 'other',clinical ? 'case' : null,clinical ? caseId : null,objectKey,qid()]);
  return { id, org, lab, caseId, objectKey };
}
async function evidenceFor(g, overrides = {}) {
  const x = { uploadGrantId:g.id, org:g.org, lab:g.lab, caseId:g.caseId, objectKey:g.objectKey, ...overrides };
  await query(`INSERT INTO "CaseClinicalUploadEvidence" ("uploadGrantId","organizationId","labId","caseId",provider,"providerObjectKey","clinicalPurpose","verifiedFormat","validatedSuffix","measuredSizeBytes",width,height,"contentSha256","validationProfile","validatedAt") VALUES ($1,$2,$3,$4,'UPLOADTHING',$5,'CLINICAL_REFERENCE_PHOTOGRAPH','JPEG','JPG',1000,100,100,$6,'R001',clock_timestamp())`, [x.uploadGrantId,x.org,x.lab,x.caseId,x.objectKey,'a'.repeat(64)]);
  await query('UPDATE "FileUploadGrant" SET status = \'UPLOADED\' WHERE id=$1', [g.id]);
}
async function file(g, access, {org=g.org,lab=g.lab,objectKey=g.objectKey}={}) {
  const id=qid();
  await query(`INSERT INTO "StoredFile" (id,"organizationId","labId","sourceUploadGrantId",provider,"providerObjectKey","providerAccess",purpose,"detectedMimeType","sizeBytes","uploaderMemberId","uploaderMemberIdSnapshot") VALUES ($1,$2,$3,$4,'UPLOADTHING',$5,$6,'CASE_CLINICAL_ASSET','image/jpeg',1000,$7,$8)`, [id,org,lab,g.id,objectKey,access,ids.member,ids.member]);
  return id;
}
async function asset({mode='MANAGED_PUBLIC',caseId=ids.case,lab=ids.lab,clinicalPurpose='CLINICAL_REFERENCE_PHOTOGRAPH',url=null,ext=null}={}) {
  const id=qid();
  await query('INSERT INTO "CaseAssetFile" (id,"dentalCaseId","labId","storageMode","clinicalPurpose","documentUrl","fileExtension","updatedAt") VALUES ($1,$2,$3,$4,$5,$6,$7,now())', [id,caseId,lab,mode,clinicalPurpose,url,ext]);
  return id;
}
async function version(a,f,{org=ids.org,lab=ids.lab,n=1}={}) {
  const id=qid();
  await query('INSERT INTO "CaseAssetFileVersion" (id,"caseAssetFileId","organizationId","labId","storedFileId","versionNumber","createdByMemberId","createdByMemberIdSnapshot") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [id,a,org,lab,f,n,ids.member,ids.member]);
  return id;
}
async function point(a,v) { await query('UPDATE "CaseAssetFile" SET "currentVersionId"=$2 WHERE id=$1',[a,v]); }
async function publicFixture({ evidence=true, access='PUBLIC_READ', caseId=ids.case, purpose='CLINICAL_REFERENCE_PHOTOGRAPH' }={}) {
  const g=await grant({caseId}); if(evidence) await evidenceFor(g);
  const f=await file(g,access); const a=await asset({caseId,clinicalPurpose:purpose}); const v=await version(a,f); await point(a,v); return {g,f,a,v};
}
function migrationDirs() { return fs.readdirSync(migrations,{withFileTypes:true}).filter(x=>x.isDirectory() && /^\d{14}_/.test(x.name)).map(x=>x.name).sort(); }
async function main() {
  fs.writeFileSync(logPath,'');
  const dirs=migrationDirs();
  if(dirs.length!==50 || dirs.at(-1)!=='20260929120000_case_public_provider_access_contract') throw new Error('migration chain identity/order changed');
  for(const [name,digest] of Object.entries(expected)) if(sha(path.join(migrations,name,'migration.sql'))!==digest) throw new Error(`source hash changed: ${name}`);
  if(fs.existsSync(workspace)) throw new Error('run workspace already exists');
  if(docker('ps','-a','--filter',`name=^/${container}$`,'--format','{{.Names}}')) throw new Error('container name already exists');
  if(docker('volume','ls','--filter',`name=^${volume}$`,'--format','{{.Name}}')) throw new Error('volume name already exists');
  emit('PRE', 'PASS', { migrationCount:dirs.length, hashes:expected, container, volume, workspace });
  fs.mkdirSync(path.join(workspace,'migrations'),{recursive:true});
  for(const name of dirs.slice(0,49)) fs.cpSync(path.join(migrations,name),path.join(workspace,'migrations',name),{recursive:true});
  fs.writeFileSync(path.join(workspace,'config.ts'), `import { defineConfig } from 'prisma/config';\nexport default defineConfig({ schema: ${JSON.stringify(path.join(root,'prisma/schema.prisma').replaceAll('\\','/'))}, migrations: { path: ${JSON.stringify(path.join(workspace,'migrations').replaceAll('\\','/'))} }, datasource: { url: process.env.LABOS_DISPOSABLE_DATABASE_URL! } });\n`);
  const password=crypto.randomBytes(24).toString('hex');
  docker('volume','create',volume);
  try {
    docker('run','-d','--name',container,'--mount',`type=volume,source=${volume},target=/var/lib/postgresql/data`,'-p','127.0.0.1::5432','-e',`POSTGRES_PASSWORD=${password}`,'-e','POSTGRES_DB=labos_disposable','postgres:17.6');
    created=true;
    const portString=docker('port',container,'5432/tcp');
    if(!/^127\.0\.0\.1:\d+$/.test(portString)) throw new Error(`port not loopback: ${portString}`);
    const port=Number(portString.split(':')[1]);
    url=`postgresql://postgres:${password}@127.0.0.1:${port}/labos_disposable?schema=public`;
    for(let i=0;i<30;i++) { try { docker('exec',container,'pg_isready','-U','postgres','-d','labos_disposable'); break; } catch { await new Promise(r=>setTimeout(r,1000)); if(i===29) throw new Error('postgres not ready'); } }
    client=new pg.Client({host:'127.0.0.1',port,user:'postgres',password,database:'labos_disposable'}); await client.connect();
    observer=new pg.Client({host:'127.0.0.1',port,user:'postgres',password,database:'labos_disposable'}); await observer.connect();
    const attest=await query('SELECT version(),current_database(),inet_server_addr()::text AS address,inet_server_port() AS port');
    emit('G01','PASS',{ containerId:docker('inspect','--format','{{.Id}}',container), imageId:docker('inspect','--format','{{.Image}}',container), published:portString, postgres:attest.rows[0].version, database:attest.rows[0].current_database, serverAddress:attest.rows[0].address });
    const env={...process.env,LABOS_DISPOSABLE_DATABASE_URL:url}; delete env.DIRECT_URL; delete env.DATABASE_URL;
    const deploy=()=>cmd(process.execPath,['node_modules/prisma/build/index.js','migrate','deploy','--config',path.join(workspace,'config.ts')],{env,maxBuffer:8*1024*1024});
    emit('MIGRATIONS_PRE','PASS',{ output:deploy().slice(-1000) });
    const pre=await query('SELECT count(*)::int AS n FROM _prisma_migrations WHERE finished_at IS NOT NULL');
    if(pre.rows[0].n!==49) throw new Error(`pre chain count ${pre.rows[0].n}`);
    await seedBase();
    const legacy=await asset({mode:'LEGACY_URL_UNVERIFIED',clinicalPurpose:null,url:'https://legacy.invalid/historical.jpg',ext:'jpg'});
    let oldGrant,oldFile,oldAsset,oldVersion,oldNullFree;
    await tx(async()=>{oldGrant=await grant({clinical:false}); oldFile=qid(); await query(`INSERT INTO "StoredFile" (id,"organizationId","labId","sourceUploadGrantId",provider,"providerObjectKey",purpose,"detectedMimeType","sizeBytes","uploaderMemberIdSnapshot") VALUES ($1,$2,$3,$4,'UPLOADTHING',$5,'CASE_CLINICAL_ASSET','image/jpeg',1000,$6)`,[oldFile,ids.org,ids.lab,oldGrant.id,oldGrant.objectKey,ids.member]); oldAsset=await asset({mode:'MANAGED_PRIVATE'}); oldVersion=await version(oldAsset,oldFile); await point(oldAsset,oldVersion);});
    await tx(async()=>{const g=await grant({clinical:false}); oldNullFree=qid(); await query(`INSERT INTO "StoredFile" (id,"organizationId","labId","sourceUploadGrantId",provider,"providerObjectKey",purpose,"detectedMimeType","sizeBytes","uploaderMemberIdSnapshot") VALUES ($1,$2,$3,$4,'UPLOADTHING',$5,'CASE_CLINICAL_ASSET','image/jpeg',1000,$6)`,[oldNullFree,ids.org,ids.lab,g.id,g.objectKey,ids.member]);});
    const tables=['Catalog','WorkType','Product','Dentist'];
    const before=await query(`SELECT c.relname, pg_get_tabledef FROM (SELECT oid,relname FROM pg_class WHERE relname=ANY($1::text[]) AND relkind='r') c CROSS JOIN LATERAL (SELECT string_agg(a.attname||':'||format_type(a.atttypid,a.atttypmod)||':'||a.attnotnull::text,',' ORDER BY a.attnum) AS pg_get_tabledef FROM pg_attribute a WHERE a.attrelid=c.oid AND a.attnum>0 AND NOT a.attisdropped) x`,[tables]);
    fs.cpSync(path.join(migrations,dirs[49]),path.join(workspace,'migrations',dirs[49]),{recursive:true});
    for(const [name,digest] of Object.entries(expected)) if(sha(path.join(workspace,'migrations',name,'migration.sql'))!==digest) throw new Error(`copied hash changed: ${name}`);
    emit('CANDIDATE_COPY','PASS',{sha256:sha(path.join(workspace,'migrations',dirs[49],'migration.sql'))});
    emit('MIGRATIONS_CANDIDATE','PASS',{output:deploy().slice(-1000)});
    const migrated=await query('SELECT migration_name,finished_at,rolled_back_at FROM _prisma_migrations ORDER BY started_at,migration_name');
    if(migrated.rows.length!==50 || migrated.rows.some(x=>!x.finished_at||x.rolled_back_at)) throw new Error('migration chain incomplete');
    emit('G02','PASS',{count:migrated.rows.length,first:migrated.rows[0].migration_name,last:migrated.rows.at(-1).migration_name});
    const schema=await query(`SELECT (SELECT array_agg(enumlabel::text ORDER BY enumsortorder) FROM pg_enum JOIN pg_type ON pg_type.oid=enumtypid WHERE typname='CaseAssetStorageMode') AS modes, (SELECT array_agg(enumlabel::text ORDER BY enumsortorder) FROM pg_enum JOIN pg_type ON pg_type.oid=enumtypid WHERE typname='StoredFileProviderAccess') AS access, (SELECT json_build_object('nullable',is_nullable,'default',column_default) FROM information_schema.columns WHERE table_name='StoredFile' AND column_name='providerAccess') AS column`);
    const triggers=await query(`SELECT tgname,tgdeferrable,tginitdeferred,pg_get_triggerdef(oid) AS definition FROM pg_trigger WHERE tgrelid IN ('"CaseAssetFile"'::regclass,'"StoredFile"'::regclass,'"CaseClinicalUploadEvidence"'::regclass) AND NOT tgisinternal ORDER BY tgname`);
    emit('G03_DIAGNOSTIC','PASS',{schema:schema.rows[0],triggerNames:triggers.rows.map(x=>({name:x.tgname,deferred:x.tgdeferrable,initiallyDeferred:x.tginitdeferred}))});
    if(!schema.rows[0].modes.includes('MANAGED_PUBLIC') || JSON.stringify(schema.rows[0].access)!==JSON.stringify(['PUBLIC_READ','PRIVATE']) || schema.rows[0].column.nullable!=='YES' || schema.rows[0].column.default!==null || !triggers.rows.some(x=>x.tgname==='CaseAssetFile_final_storage_mode'&&x.tgdeferrable&&x.tginitdeferred)) throw new Error('schema inspection mismatch');
    emit('G03','PASS',{schema:schema.rows[0],triggers:triggers.rows});
    const after=await query(`SELECT c.relname, pg_get_tabledef FROM (SELECT oid,relname FROM pg_class WHERE relname=ANY($1::text[]) AND relkind='r') c CROSS JOIN LATERAL (SELECT string_agg(a.attname||':'||format_type(a.atttypid,a.atttypmod)||':'||a.attnotnull::text,',' ORDER BY a.attnum) AS pg_get_tabledef FROM pg_attribute a WHERE a.attrelid=c.oid AND a.attnum>0 AND NOT a.attisdropped) x`,[tables]);
    if(JSON.stringify(before.rows)!==JSON.stringify(after.rows)) throw new Error('unrelated table changed'); emit('G04','PASS',{tables:before.rows.map(x=>x.relname),unchanged:true});
    const history=await query('SELECT a.id,a."storageMode",a."documentUrl",a."fileExtension",a."currentVersionId",f."providerAccess" FROM "CaseAssetFile" a LEFT JOIN "CaseAssetFileVersion" v ON v.id=a."currentVersionId" LEFT JOIN "StoredFile" f ON f.id=v."storedFileId" WHERE a.id=ANY($1::text[]) ORDER BY a.id',[[legacy,oldAsset]]);
    if(history.rows.length!==2 || history.rows.find(x=>x.id===legacy)?.storageMode!=='LEGACY_URL_UNVERIFIED' || history.rows.find(x=>x.id===oldAsset)?.storageMode!=='MANAGED_PRIVATE' || history.rows.find(x=>x.id===oldAsset)?.providerAccess!==null) throw new Error('history changed');
    emit('H01','PASS',{legacy:history.rows.find(x=>x.id===legacy)}); emit('H02','PASS',{private:history.rows.find(x=>x.id===oldAsset)});
    let good; await assert('P01',async()=>{good=await tx(()=>publicFixture()); const row=await observer.query(`SELECT a."storageMode",a."currentVersionId",f."providerAccess",c."labId"=l.id AS case_lab_match,l."organizationId"=f."organizationId" AS org_match,v."labId"=f."labId" AS version_lab_match,v."organizationId"=f."organizationId" AS version_org_match,e."caseId"=c.id AS evidence_case_match,e."uploadGrantId"=g.id AS evidence_grant_match,e."providerObjectKey"=f."providerObjectKey" AS evidence_key_match,g."providerFileKey"=f."providerObjectKey" AS grant_key_match FROM "CaseAssetFile" a JOIN "CaseAssetFileVersion" v ON v.id=a."currentVersionId" JOIN "StoredFile" f ON f.id=v."storedFileId" JOIN "Case" c ON c.id=a."dentalCaseId" JOIN "Lab" l ON l.id=a."labId" JOIN "FileUploadGrant" g ON g.id=f."sourceUploadGrantId" JOIN "CaseClinicalUploadEvidence" e ON e."uploadGrantId"=g.id WHERE a.id=$1`,[good.a]); const r=row.rows[0]; if(!r || r.providerAccess!=='PUBLIC_READ' || Object.entries(r).some(([k,v])=>k.endsWith('_match') && v!==true)) throw new Error('public fixture relation mismatch'); return {assetId:good.a,currentVersionId:good.v,providerAccess:r.providerAccess,relations:Object.fromEntries(Object.entries(r).filter(([k])=>k.endsWith('_match'))),observedOnIndependentConnection:true};});
    await reject('N01',async()=>{const g=await grant({clinical:false}); await file(g,null);});
    await reject('N02',async()=>{const a=await asset(); const v=await version(a,oldNullFree); await point(a,v);},['23514']);
    await reject('N03',async()=>{const g=await grant(); await evidenceFor(g); const f=await file(g,'PRIVATE'); const a=await asset(); const v=await version(a,f); await point(a,v);});
    await reject('N04',async()=>{await asset();});
    await reject('N05',async()=>{const g=await grant({clinical:false}); const f=await file(g,'PUBLIC_READ'); const owner=await asset({mode:'LEGACY_URL_UNVERIFIED',clinicalPurpose:null,url:'https://legacy.invalid/owner',ext:'jpg'}); const v=await version(owner,f); const a=await asset(); await point(a,v);},['23503']);
    await reject('N06',async()=>{const g=await grant({clinical:false}); const f=await file(g,'PUBLIC_READ'); const a=await asset(); const v=await version(a,f,{org:ids.org2}); await point(a,v);});
    await reject('N06_CASE',async()=>{await asset({caseId:ids.case3,lab:ids.lab});},['23503']);
    await reject('N07',async()=>{const g=await grant({clinical:false}); const f=await file(g,'PUBLIC_READ'); const a=await asset(); const v=await version(a,f); await point(a,v);});
    await reject('N08',async()=>{const evidenced=await grant(); await evidenceFor(evidenced); const other=await grant({clinical:false}); const f=await file(other,'PUBLIC_READ'); const a=await asset(); const v=await version(a,f); await point(a,v);},['23514']);
    await reject('N09',async()=>{const g=await grant({caseId:ids.case2}); await evidenceFor(g); const f=await file(g,'PUBLIC_READ'); const a=await asset(); const v=await version(a,f); await point(a,v);});
    await reject('N10',async()=>{const g=await grant(); await evidenceFor(g); const f=await file(g,'PUBLIC_READ',{objectKey:key('wrong-object')}); const a=await asset(); const v=await version(a,f); await point(a,v);},['23514','23503']);
    await reject('N11',async()=>{const g=await grant(); await evidenceFor(g); const f=await file(g,'PUBLIC_READ'); const a=await asset({url:'https://legacy.invalid/url'}); const v=await version(a,f); await point(a,v);});
    await reject('N12',async()=>{const g=await grant(); await evidenceFor(g); const f=await file(g,'PUBLIC_READ'); const a=await asset({ext:'jpg'}); const v=await version(a,f); await point(a,v);});
    await reject('N12_PURPOSE',async()=>{const g=await grant(); await evidenceFor(g); const f=await file(g,'PUBLIC_READ'); const a=await asset({clinicalPurpose:null}); const v=await version(a,f); await point(a,v);},['23514']);
    await reject('N13',async()=>{await query(`UPDATE "CaseAssetFile" SET "storageMode"='LEGACY_URL_UNVERIFIED',"currentVersionId"=NULL,"clinicalPurpose"=NULL,"documentUrl"='https://legacy.invalid/fallback',"fileExtension"='jpg' WHERE id=$1`,[good.a]);});
    await reject('N14',async()=>{await query(`UPDATE "CaseAssetFile" SET "storageMode"='LEGACY_URL_UNVERIFIED',"currentVersionId"=NULL,"clinicalPurpose"=NULL,"documentUrl"='https://legacy.invalid/fallback',"fileExtension"='jpg' WHERE id=$1`,[oldAsset]);});
    await reject('N15',async()=>{await query(`UPDATE "CaseAssetFile" SET "storageMode"='MANAGED_PUBLIC' WHERE id=$1`,[oldAsset]);});
    await reject('N16',async()=>{await query(`UPDATE "CaseAssetFile" SET "storageMode"='MANAGED_PRIVATE' WHERE id=$1`,[good.a]);});
    await reject('N17',async()=>{const g=await grant(); await evidenceFor(g); const f=await file(g,'PUBLIC_READ'); const v=await version(good.a,f,{n:2}); await query(`UPDATE "CaseAssetFile" SET "storageMode"='MANAGED_PRIVATE',"currentVersionId"=$2 WHERE id=$1`,[good.a,v]);},['23514']);
    await reject('N17_NULL',async()=>{const v=await version(good.a,oldNullFree,{n:2}); await query(`UPDATE "CaseAssetFile" SET "storageMode"='MANAGED_PRIVATE',"currentVersionId"=$2 WHERE id=$1`,[good.a,v]);},['23514']);
    await reject('I01',async()=>{await query(`UPDATE "StoredFile" SET "providerAccess"='PRIVATE' WHERE id=$1`,[good.f]);},['P0001']);
    await reject('I02',async()=>{await query(`UPDATE "StoredFile" SET "providerObjectKey"=$2 WHERE id=$1`,[good.f,key('mutation')]);});
    await reject('I02_DELETE',async()=>{await query('DELETE FROM "StoredFile" WHERE id=$1',[good.f]);},['P0001']);
    let future; await assert('F01',async()=>{future=await tx(async()=>{const g=await grant(); await evidenceFor(g); const f=await file(g,'PRIVATE'); const v=await version(good.a,f,{n:2}); await query(`UPDATE "CaseAssetFile" SET "storageMode"='MANAGED_PRIVATE',"currentVersionId"=$2 WHERE id=$1`,[good.a,v]); return {f,v};}); const r=await query('SELECT a.id,a."storageMode",o."providerAccess" old_access,n."providerAccess" new_access FROM "CaseAssetFile" a JOIN "StoredFile" o ON o.id=$2 JOIN "StoredFile" n ON n.id=$3 WHERE a.id=$1',[good.a,good.f,future.f]); if(r.rows[0]?.old_access!=='PUBLIC_READ'||r.rows[0]?.new_access!=='PRIVATE'||r.rows[0]?.storageMode!=='MANAGED_PRIVATE') throw new Error('transition state wrong'); return {assetId:r.rows[0].id,storageMode:r.rows[0].storageMode,old_access:r.rows[0].old_access,new_access:r.rows[0].new_access};});
    await assert('H03',async()=>{await tx(async()=>{await query('UPDATE "CaseAssetFile" SET title=$2 WHERE id=$1',[oldAsset,'historical title']);}); const r=await query('SELECT f."providerAccess" FROM "CaseAssetFile" a JOIN "CaseAssetFileVersion" v ON v.id=a."currentVersionId" JOIN "StoredFile" f ON f.id=v."storedFileId" WHERE a.id=$1',[oldAsset]); if(r.rows[0]?.providerAccess!==null) throw new Error('historical null reclassified'); return {historicalNullPreserved:true};});
    await reject('H03_POINTER',async()=>{const v=await version(oldAsset,oldNullFree,{n:2}); await point(oldAsset,v);},['23514']);
    await assert('I02_MEMBER',async()=>{await tx(async()=>{await query('UPDATE "StoredFile" SET "uploaderMemberId"=NULL WHERE id=$1',[good.f]);}); return {liveMemberNullTransition:true};});
    emit('F02','PASS',{reason:'all negative transaction projections, including deferred commit failures, retained prior asset/version/StoredFile/grant/clinical-evidence counts on an independent connection'});
  } finally {
    if(observer) await observer.end().catch(()=>{});
    if(client) await client.end().catch(()=>{});
    if(created) { try { docker('rm','-f',container); } catch(e) { emit('CLEANUP_CONTAINER','FAIL',{message:String(e).slice(0,300)}); } }
    try { docker('volume','rm',volume); } catch(e) { emit('CLEANUP_VOLUME','FAIL',{message:String(e).slice(0,300)}); }
    const resolved=path.resolve(workspace), intended=path.resolve(root,'prisma');
    if(resolved.startsWith(intended+path.sep) && path.basename(resolved)===`.disposable-case-public-d016f90a`) fs.rmSync(resolved,{recursive:true,force:true});
    const absentContainer=!docker('ps','-a','--filter',`name=^/${container}$`,'--format','{{.Names}}');
    const absentVolume=!docker('volume','ls','--filter',`name=^${volume}$`,'--format','{{.Name}}');
    cleanupOkay=absentContainer&&absentVolume&&!fs.existsSync(workspace);
    emit('C01',cleanupOkay?'PASS':'FAIL',{containerAbsent:absentContainer,volumeAbsent:absentVolume,workspaceAbsent:!fs.existsSync(workspace)});
  }
}
main().catch(e=>{emit('RUN','FAIL',{code:e.code??null,message:e.message?.slice(0,1000)});process.exitCode=1;});
