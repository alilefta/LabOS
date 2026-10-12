const {Client}=require('pg');
const assert=require('node:assert/strict');
const {writeFileSync}=require('node:fs');
const out=[];let sequence=0;
const url='postgresql://postgres@127.0.0.1:55472/suffix_success_f61cebf8';
const record=(id,pass,detail={})=>{const row={id,status:pass?'PASS':'FAIL',...detail};out.push(row);console.log(JSON.stringify(row));if(!pass)process.exitCode=1};
async function attempt(db,id,body,success=false,code='23514'){
  await db.query('BEGIN');let error;
  try{await body();await db.query('COMMIT')}catch(e){error=e;await db.query('ROLLBACK')}
  record(id,success?!error:error?.code===code,{observedCode:error?.code??null});
}
async function grant(db,suffix,id,key){
 const fields=['id','organizationId','labId','createdByMemberId','boundaryId','purpose','targetType','targetId','provider','providerFileKey','correlationId','caseClinicalValidatedSuffix','createdAt','updatedAt','expiresAt'];
 const values=[id,'suffix-org','suffix-lab','suffix-member','N-FILE-110','case.asset.add.stage','case','suffix-case','UPLOADTHING',key,'corr-'+id,suffix];
 return db.query(`INSERT INTO "FileUploadGrant" (${fields.map(x=>'"'+x+'"').join(',')}) VALUES (${values.map((_,i)=>'$'+(i+1)).join(',')},(now() at time zone 'UTC')-interval '1 minute',(now() at time zone 'UTC'),(now() at time zone 'UTC')+interval '1 hour')`,values)
}
async function evidence(db,id,key,suffix){
 const fields=['uploadGrantId','organizationId','labId','caseId','provider','providerObjectKey','clinicalPurpose','verifiedFormat','validatedSuffix','measuredSizeBytes','width','height','contentSha256','validationProfile','validatorVersion','codecBackend','codecPackageVersion','codecLibraryVersion','codecRuntimeSha256','sourceComponents','isProgressive','validatedAt'];
 const values=[id,'suffix-org','suffix-lab','suffix-case','UPLOADTHING',key,'CLINICAL_REFERENCE_PHOTOGRAPH','JPEG',suffix,1234,16,16,'a'.repeat(64),'JPEG_CLINICAL_V1_S001','LABOS_S001_JULUSIAN_V1','JULUSIAN_TURBOJPEG','3.0.1','3.1.3','b'.repeat(64),3,false,new Date()];
 return db.query(`INSERT INTO "CaseClinicalUploadEvidence" (${fields.map(x=>'"'+x+'"').join(',')}) VALUES (${fields.map((_,i)=>'$'+(i+1)).join(',')})`,values)
}
(async()=>{const db=new Client({connectionString:url});await db.connect();try{
 const state=await db.query(`SELECT current_database() db,inet_server_addr()::text addr,inet_server_port() port,(SELECT count(*)::int FROM "_prisma_migrations" WHERE finished_at IS NOT NULL) migrations,(SELECT count(*)::int FROM "_prisma_migrations" WHERE migration_name='20261004120000_case_checked_suffix_handoff' AND finished_at IS NOT NULL) candidate,(SELECT count(*)::int FROM "FileUploadGrant" WHERE id='suffix-old-case' AND "caseClinicalValidatedSuffix" IS NULL) historical,(SELECT count(*)::int FROM "FileUploadGrant" WHERE id='suffix-noncase' AND "caseClinicalValidatedSuffix" IS NULL) noncase`);
 const s=state.rows[0];record('forward-history',s.db==='suffix_success_f61cebf8'&&s.addr==='127.0.0.1/32'&&s.port===55472&&s.migrations===52&&s.candidate===1&&s.historical===1&&s.noncase===1,s);
 const catalog=await db.query(`SELECT (SELECT count(*)::int FROM information_schema.columns WHERE table_name='FileUploadGrant' AND column_name='caseClinicalValidatedSuffix' AND is_nullable='YES' AND column_default IS NULL) col,(SELECT count(*)::int FROM pg_constraint WHERE conname='FileUploadGrant_case_suffix_scope' AND convalidated) scope,(SELECT count(*)::int FROM pg_trigger WHERE tgrelid='"FileUploadGrant"'::regclass AND tgname='FileUploadGrant_case_identity' AND NOT tgisinternal) guard,(SELECT count(*)::int FROM pg_trigger WHERE tgrelid='"CaseClinicalUploadEvidence"'::regclass AND tgname='CaseClinicalUploadEvidence_grant_binding' AND NOT tgisinternal) evidence_guard`);
 record('installed-shape',Object.values(catalog.rows[0]).every(x=>x===1),catalog.rows[0]);
 for(const suffix of ['JPG','JPEG']){const id='suffix-repair2-'+suffix.toLowerCase();await attempt(db,'new-'+suffix,()=>grant(db,suffix,id,'key-'+id),true)}
 await attempt(db,'new-null-case',()=>grant(db,null,'suffix-null-repair','key-null-new'));
 await attempt(db,'noncase-with-suffix',()=>db.query(`UPDATE "FileUploadGrant" SET "caseClinicalValidatedSuffix"='JPG' WHERE id='suffix-noncase'`));
 await attempt(db,'jpg-to-jpeg',()=>db.query(`UPDATE "FileUploadGrant" SET "caseClinicalValidatedSuffix"='JPEG' WHERE id='suffix-repair2-jpg'`));
 await attempt(db,'jpeg-to-jpg',()=>db.query(`UPDATE "FileUploadGrant" SET "caseClinicalValidatedSuffix"='JPG' WHERE id='suffix-repair2-jpeg'`));
 await attempt(db,'suffix-to-null',()=>db.query(`UPDATE "FileUploadGrant" SET "caseClinicalValidatedSuffix"=NULL WHERE id='suffix-repair2-jpg'`));
 await attempt(db,'historical-null-to-jpg',()=>db.query(`UPDATE "FileUploadGrant" SET "caseClinicalValidatedSuffix"='JPG' WHERE id='suffix-old-case'`));
 await attempt(db,'historical-null-to-jpeg',()=>db.query(`UPDATE "FileUploadGrant" SET "caseClinicalValidatedSuffix"='JPEG' WHERE id='suffix-old-case'`));
 await attempt(db,'historical-status-lifecycle',()=>db.query(`UPDATE "FileUploadGrant" SET "updatedAt"=now() WHERE id='suffix-old-case'`),true);
 await attempt(db,'mismatch-evidence',()=>evidence(db,'suffix-repair2-jpg','key-suffix-repair2-jpg','JPEG'));
 await attempt(db,'null-history-evidence',()=>evidence(db,'suffix-old-case','suffix-old-object','JPG'));
 await attempt(db,'wrong-provider-key-fk',()=>evidence(db,'suffix-repair2-jpg','foreign-key','JPG'),false,'23514');
 await attempt(db,'matching-evidence-and-transition',async()=>{await evidence(db,'suffix-repair2-jpg','key-suffix-repair2-jpg','JPG');await db.query(`UPDATE "FileUploadGrant" SET status='UPLOADED',"uploadedAt"=now(),"updatedAt"=now() WHERE id='suffix-repair2-jpg'`)},true);
 await attempt(db,'immutable-evidence-update',()=>db.query(`UPDATE "CaseClinicalUploadEvidence" SET width=17 WHERE "uploadGrantId"='suffix-repair2-jpg'`));
 await attempt(db,'immutable-evidence-delete',()=>db.query(`DELETE FROM "CaseClinicalUploadEvidence" WHERE "uploadGrantId"='suffix-repair2-jpg'`));
 const final=await db.query(`SELECT (SELECT count(*)::int FROM "CaseClinicalUploadEvidence" WHERE "uploadGrantId"='suffix-repair2-jpg' AND "validatedSuffix"='JPG' AND width=16) evidence,(SELECT count(*)::int FROM "FileUploadGrant" WHERE id='suffix-repair2-jpg' AND status='UPLOADED' AND "caseClinicalValidatedSuffix"='JPG') grant_count`);
 record('final-integrity',final.rows[0].evidence===1&&final.rows[0].grant_count===1,final.rows[0]);
}finally{await db.end();writeFileSync(process.argv[2],out.map(x=>JSON.stringify(x)).join('\n')+'\n')}})().catch(e=>{console.error(JSON.stringify({fatal:e.message,code:e.code}));process.exitCode=1});
